function servicetask23(attempt, message) {
	var xmlPedidoStr = hAPI.getCardValue("xmlPedido");

	try{
		//Calcula o prazo da entrega
		var today = new Date()
		var minutos = 1440;// 8 horas dos 3 dias somadas por 60 minutos
		var segundos =  ((today.getMinutes() * 60) +  (today.getHours() * 3600));
		var prazo = hAPI.calculateDeadLineTime(today, segundos, minutos, "Default");
		//Converte o prazo retornado para o formato do fluig
		//Formato: "Fri Aug 21 10:43:15 BRT 2018";
		var prazoArray = (prazo[0]+"").split(" ");
		if((prazoArray[2]+"").indexOf("0") == 0){
			prazoArray[2] = (prazoArray[2]+"").replace("0","");
		}
		var dataFluig = prazoArray[2]+"/"+mouthedYear[prazoArray[1]]+"/"+prazoArray[5];
		var dataProtheus = converteDataProtheus(dataFluig);

		//Seta o prazo da entrega para xml e no campo do fluig
		hAPI.setCardValue('prazoEntrega',dataFluig);
		var xmlPedido = new XML(xmlPedidoStr);
		for(var i in xmlPedido.Itens.Iten){
			xmlPedido.Itens.Iten[i].C7_DATPRF = dataProtheus;
		}

	}catch(e){
		throw "Erro ao gerar o XML: "+e;
	}

	if(xmlPedido == ""){
		throw "Erro para gerar pedido de compras. \n XML não foi encontrado."
	}else{
		//Emiti o pedido de compras
		var codPedido = hAPI.getCardValue("numPedido");
		if(codPedido == ""){//Garante que o pedido só seja emitido uma vez.
			var dsPedido = DatasetFactory.getDataset('ds_gerarPedidoCompra',  new Array(xmlPedido),null, null);
			codPedido = dsPedido.getValue(0, "codigoPedido");
			var statusRetorno = dsPedido.getValue(0, "statusRetorno");
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
			var statusAnexo = enviaAnexoSolicitacao(codSolicitacao, AtividadeEnum.EMITIR_PEDIDO_COMPRA, relatorio.result, codPedido, codFilial);
			if(statusAnexo != true){
				throw statusAnexo+".";
			}

		}else{
			throw "Erro para buscar o realtório do pedido de compras no Protheus \n"+relatorio.result;
		}
	}
}

/**
*Envia anexo para uma solicitação
*@codSolicitacao - Codigo da solicitção
*@atividade - número da atividade em que será anexado o documento
*@anexoB64 - Arquivo convertido em base64
**/
function enviaAnexoSolicitacao(codSolicitacao, atividade, anexoB64, codPedido, codFilial){
	log.info("KAKAROTO INICIO DO ANEXO");
	// Obtém a instância do serviço 'WorkflowEngineService'
	var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
	var processAttachmentDtoArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
	var processAttachmentDto =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
	var attachment =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
	var keyValueDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.KeyValueDto');
	var keyValueDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.KeyValueDtoArray');
	var processTaskAppointmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDto');
	var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
	var stringArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
	stringArray.getItem().add("15joqaztn156s2hg1491851925301")

	processAttachmentDto.setAttachmentSequence(1);
	processAttachmentDto.setCompanyId(1);
	processAttachmentDto.setFileName("Pedido_Compras_"+codFilial+"_"+codPedido+".pdf");
	processAttachmentDto.setDescription("Pedido_Compras_"+codFilial+"_"+codPedido+".pdf");
	processAttachmentDto.setNewAttach(true);
	processAttachmentDto.setVersion(1000);

	attachment.setAttach(true);
	attachment.setFileName("Pedido_Compras_"+codFilial+"_"+codPedido+".pdf");
	attachment.setFilecontent(java.util.Base64.getDecoder().decode(new java.lang.String(anexoB64).getBytes("UTF-8")));
	processAttachmentDto.getAttachments().add(attachment);
	processAttachmentDtoArray.getItem().add(processAttachmentDto);

	var idIntegrador = 'imwn2dyhbuywfa0f1522083830483';
	if(hAPI.getCardValue('ambiente') == 'devTst'){
		log.info("=== Pedido ambiente dev ===");
		idIntegrador = 'imwn2dyhbuywfa0f1522083830483';
	}
	// Instancia o serviço
	var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService");
	var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
	var servico = workflowEngineService.saveAndSendTaskClassic("integrador.fluig@oncoclinicas.com",
			   	"hUbust*7",
			   	1,
			   	parseInt(codSolicitacao),
			   	parseInt(atividade),
			  	stringArray,
			   	"",
			   	idIntegrador,
			   	false,
			  	processAttachmentDtoArray,
			 	keyValueDtoArray,
				processTaskAppointmentDtoArray,
				true,
				0);

	//Verifica erro na integração do anexo
    for (var i = 0; i < servico.getItem().size(); i++) {
    	log.info("KAKAROTO result: "+servico.getItem().get(i).getKey() + " - "+ servico.getItem().get(i).getValue());
    	if(servico.getItem().get(i).getKey() == "ERROR"){
    		return "Erro para anexar o arquivo. - "+ servico.getItem().get(i).getValue();
    	}
	}

	return true;
}
//Busca o relatório pdf no Protheus
function getRelatorioProtheus(codPedido, codFilial){
	var c1 = DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('PEDIDO', codPedido, codPedido, ConstraintType.MUST);
    var ds_relatorio = DatasetFactory.getDataset('ds_pdfPedidoCompra', null, [c1,c2], null);
   	if(ds_relatorio.getValue(0,"SUCESSO") == "true"){
   		return {
   				'status':'true',
   				'result':ds_relatorio.getValue(0,"PDF")
				}
   	}else{
   		return {
   				'status': 'false',
   				'result':ds_relatorio.getValue(0,"DESCRICAO")
   				}
	}
}