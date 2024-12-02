function servicetask30() {
	var xmlPedido = hAPI.getCardValue("xmlPedido");
	if(xmlPedido == ""){

		throw "Erro para gerar pedido de compras. \n XML não foi encontrado."

	}else{
		//Emiti o pedido de compras
		var codPedido = hAPI.getCardValue("numPedido");
		if(codPedido == ""){//Garante que o pedido só seja emitido uma vez.
			log.info("KAKAROTO ANTES DE EMITIR O PEDIDO");
			var dsPedido = DatasetFactory.getDataset('ds_gerarPedidoCompra',  new Array(xmlPedido),null, null);
			codPedido = dsPedido.getValue(0, "codigoPedido");
			var statusRetorno = dsPedido.getValue(0, "statusRetorno");
			log.info("KAKAROTO DPS DE EMITIR PEDIDO  "+ codPedido +" - "+ statusRetorno);
			if(codPedido == 'ERRO'){
				throw "Erro na integração. \n"+statusRetorno;
			}else{
		 		hAPI.setCardValue("numPedido", codPedido);

			}
		}
		//Anexa o pedido a solicitação
		var codSolicitacao = hAPI.getCardValue('codSolicitacao');
		var codFilial = hAPI.getCardValue('codFilial');
		var relatorio = getRelatorioProtheus(codPedido, codFilial);
		if (relatorio.status == 'true') {
			log.info("KAKAROTO DADOS: "+codSolicitacao+ " - " +relatorio.result);
			var statusAnexo = enviaAnexoSolicitacao(codSolicitacao, EMITIR_PEDIDO, relatorio.result);
			var qtdAnexos = parseInt(hAPI.getCardValue("qtdAnexos"));
			hAPI.setCardValue("qtdAnexos",qtdAnexos+1+"")
			log.info("KAKAROTO FIM DO ANEXO - "+ statusAnexo);
			if(statusAnexo != true){
				throw statusAnexo+".";
			}
		}else{
			throw "Erro para buscar o realtório do pedido de compras no Protheus \n"+relatorio.result;
		}
	}
}
