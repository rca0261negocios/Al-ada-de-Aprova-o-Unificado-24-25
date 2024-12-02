function servicetask71(attempt, message) {
	try {
		// SM2CE 02.07.24 - GLPI 591107
		var periodicService = ServiceManager.getService("ws_medicaoContratos");
		var serviceHelper = periodicService.getBean();
		var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120_apw.WSCNTA120");
		var service = serviceLocator.getWSCNTA120SOAP();
		
		log.info(getValue("WKNumProces") + 'parametros indo para wsestmedicao')
		log.info('COD_FILIAL: ' + hAPI.getCardValue("codFilial") + 'MEDICAO: ' + hAPI.getCardValue("medicao"));
		
		var resultObj = service.wsestmedicao(hAPI.getCardValue("codFilial"), hAPI.getCardValue("medicao"));
		
		var result = resultObj.getWSRETCNTA120().get(0);
		var sucesso = result.getSUCESSO();
		var mensagem = result.getMENSAGEM();
		
		hAPI.setCardValue("obsMedicao", mensagem);
		
		if (sucesso == "false") 
			throw "Não foi possível executar o estorno da medição de contrato com o Protheus. \n" + mensagem;

	} catch (e) {
		// FALHA DE COMUNICACAO COM O SERVICO ws_medicaoContratos
		throw "Falha de integração com o Protheus. \n" + e.message;
	}
}
