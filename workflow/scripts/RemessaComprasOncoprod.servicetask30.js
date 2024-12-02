function servicetask30() {
	var xmlPedidoStr = hAPI.getCardValue("xmlPedido");

	try {
		//Calcula o prazo da entrega
		var today = new Date()
		var minutos = 1440;// 8 horas dos 3 dias somadas por 60 minutos
		var segundos = ((today.getMinutes() * 60) + (today.getHours() * 3600));
		var prazo = hAPI.calculateDeadLineTime(today, segundos, minutos, "Default");
		//Converte o prazo retornado para o formato do fluig
		//Formato: "Fri Aug 21 10:43:15 BRT 2018";
		var prazoArray = (prazo[0] + "").split(" ");
		if ((prazoArray[2] + "").indexOf("0") == 0) {
			prazoArray[2] = (prazoArray[2] + "").replace("0", "");
		}
		var dataFluig = prazoArray[2] + "/" + mouthedYear[prazoArray[1]] + "/" + prazoArray[5];
		var dataProtheus = converteDataProtheus(dataFluig);

		//Seta o prazo da entrega para xml e no campo do fluig
		hAPI.setCardValue('prazoEntrega', dataFluig);
		var xmlPedido = new XML(xmlPedidoStr);
		for (var i in xmlPedido.Itens.Iten) {
			xmlPedido.Itens.Iten[i].C7_DATPRF = dataProtheus;
		}

	} catch (e) {
		throw "Erro ao gerar o XML: " + e;
	}

	if (xmlPedido == "") {
		throw "Erro para gerar pedido de compras. \n XML não foi encontrado."
	} else {
		//Emiti o pedido de compras
		var codPedido = hAPI.getCardValue("numPedido");
		if (codPedido == "") {//Garante que o pedido só seja emitido uma vez.
			var dsPedido = DatasetFactory.getDataset('ds_gerarPedidoCompra', new Array(xmlPedido), null, null);
			codPedido = dsPedido.getValue(0, "codigoPedido");
			var statusRetorno = dsPedido.getValue(0, "statusRetorno");
			if (codPedido == 'ERRO') {
				throw "Erro na integração. \n" + statusRetorno;
			} else {
				hAPI.setCardValue("numPedido", codPedido);
			}
		}

	}
}
