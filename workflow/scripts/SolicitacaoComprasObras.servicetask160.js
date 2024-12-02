function servicetask160(attempt, message) {
  var arrPedidosCompras = JSON.parse(hAPI.getCardValue('numPedido'));
  anexarPedido(arrPedidosCompras);
}

function anexarPedido(arrPedidosCompras){
  var numProcess = getValue("WKNumProces");
  var numFilial = hAPI.getCardValue("filial_protheus");
  var arrBase64 = [];
  for (var i = 0; i < arrPedidosCompras.length; i++) {
    var constraintDs_pdfPedidoCompra = DatasetFactory.createConstraint('FILIAL', numFilial, numFilial, ConstraintType.MUST);
    var constraintDs_pdfPedidoCompra1 = DatasetFactory.createConstraint('PEDIDO', arrPedidosCompras[i], arrPedidosCompras[i], ConstraintType.MUST);
    var ds_pdfPedidoCompra = DatasetFactory.getDataset('ds_pdfPedidoCompra', null, [constraintDs_pdfPedidoCompra,constraintDs_pdfPedidoCompra1], null);
    if (ds_pdfPedidoCompra) {
      arrBase64.push(ds_pdfPedidoCompra.getValue(0, 'PDF'));
    } else {
      throw 'Erro ao consultar o pedido de compra ['+arrPedidosCompras[i]+'] no protheus';
    }
  }
  enviaAnexoSolicitacao(numProcess, '160', arrBase64, arrPedidosCompras, numFilial);
}


/**
*Envia anexo para uma solicitação
*@codSolicitacao - Codigo da solicitção
*@atividade - número da atividade em que será anexado o documento
*@anexoB64 - Arquivo convertido em base64
**/
function enviaAnexoSolicitacao(codSolicitacao, atividade, arrBase64, arrPedidosCompras, numFilial){
  try{
    // Obtém a instância do serviço 'WorkflowEngineService'
  	var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
  	var processAttachmentDtoArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
  	var keyValueDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.KeyValueDtoArray');
  	var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
  	var stringArray =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

    //Consulta o DataSet ProcessTask para recuperar o usuário executor da aitivade de Definir Vencedor,
    //Que de acordo com o diagrama deve ser o responsavel pela atividade de Enviar E-mail com Pedido de Compras
    var constraintDsProcessTask = DatasetFactory.createConstraint('processTaskPK.processInstanceId', codSolicitacao, codSolicitacao, ConstraintType.MUST);
    var constraintDsProcessTask2 = DatasetFactory.createConstraint('choosedSequence', 32, 32, ConstraintType.MUST);
    var arrConstraintsDsProcessTask = [constraintDsProcessTask,constraintDsProcessTask2]
    var dsProcessTask = DatasetFactory.getDataset('processTask', null, arrConstraintsDsProcessTask, null);
    var usuarioResponsavel = dsProcessTask.getValue(0, 'processTaskPK.colleagueId');
  	stringArray.getItem().add(usuarioResponsavel);


    for (var o = 0; o < arrPedidosCompras.length; o++) {
      var pedidoCompraAttachmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
      pedidoCompraAttachmentDto.setAttachmentSequence(1);
    	pedidoCompraAttachmentDto.setCompanyId(1);
      pedidoCompraAttachmentDto.setFileName("Pedido_Compras_"+numFilial+"_"+arrPedidosCompras[o]+".pdf");
      pedidoCompraAttachmentDto.setDescription("Pedido_Compras_"+numFilial+"_"+arrPedidosCompras[o]+".pdf");
    	pedidoCompraAttachmentDto.setNewAttach(true);
    	pedidoCompraAttachmentDto.setVersion(1000);
      var attachment =  workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
    	attachment.setAttach(true);
    	attachment.setFileName("Pedido_Compras_"+numFilial+"_"+arrPedidosCompras[o]+".pdf");
    	attachment.setFilecontent(java.util.Base64.getDecoder().decode(new java.lang.String(arrBase64[o]).getBytes("UTF-8")));
    	pedidoCompraAttachmentDto.getAttachments().add(attachment);
    	processAttachmentDtoArray.getItem().add(pedidoCompraAttachmentDto);
    }

    var constraintColleague = DatasetFactory.createConstraint('mail', 'integrador.fluig@oncoclinicas.com', 'integrador.fluig@oncoclinicas.com', ConstraintType.MUST);
    var ds_colleague = DatasetFactory.getDataset('colleague', null, [constraintColleague], null);
    var userIntegrador = ds_colleague.getValue(0, "colleaguePK.colleagueId");

    if(userIntegrador == undefined || userIntegrador == null || userIntegrador == ''){
      throw 'Falha ao consultar o Usuário Integrador do Fluig, contate a equipe de Sistemas';
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
  		   	userIntegrador,//DEV & TST:m8a5hsboaihse9u31522084847088; Produção:imwn2dyhbuywfa0f1522083830483
  		   	false,
  		  	processAttachmentDtoArray,
  			 	keyValueDtoArray,
  				processTaskAppointmentDtoArray,
  				true,
  				0);

  	//Verifica erro na integração do anexo
      for (var i = 0; i < servico.getItem().size(); i++) {
      	if(servico.getItem().get(i).getKey() == "ERROR:"){
      		throw "Erro para anexar o arquivo. - "+ servico.getItem().get(i).getValue();
      	}
  	}

  	return true;
  } catch (e) {
    throw "Erro ao anexar pedidos de compras na solicitação "+codSolicitacao+" :"+e;
  }
}
