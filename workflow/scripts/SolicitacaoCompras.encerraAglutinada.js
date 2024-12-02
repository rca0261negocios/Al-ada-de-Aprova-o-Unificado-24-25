function encerraAglutinada(numSolicitacao){
	
	
	// se solic escolhida  nao estiver mais no pool fazer throw passando o numero da solicitacao que precisa ser removida do pai x filho
	    
    var config = new objDataSet("configServer");
    config.buscar();
    var configServer = config.getDados();
    try {
	     for ( var posValues in configServer.values) {
	      var wsUser = configServer.getValue(posValues,"usuarioPublicaDoc");
	      var wsPass = configServer.getValue(posValues,"senhaPublicaDoc");
	     }
    } catch (e) {
    	log.error("Falha ao utilizar o objAnexo, não encontrado dataSet configServer.");
    }
    
    
    var idcolleague = findColleagueIDByMail(wsUser);
    
    if(!idcolleague){
    	throw "Não foi encontrado usuário integrador responsável pela finalização da solicitação aglutinada "+numSolicitacao+"!";
    }
    
    var wsCompany = 1;
	var serviceProvider = ServiceManager.getServiceInstance("WorkflowService");
	var serviceLocator = serviceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceServiceLocator");
	
	var workflow = { 
		userId : wsUser,
		password : wsPass,
		companyId : wsCompany,
		processId : parseInt(numSolicitacao),
		choosedState : FIM_AGLUTINADA, // fim
		colleaguesRecipient : serviceProvider.instantiate("net.java.dev.jaxb.array.StringArray"),
		comment : "Solicitação aglutinada na solicitação número "+numSolicitacao,
		colleagueSender : idcolleague,
		completeTask : true,
		atachments : serviceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray"),
		cardData : serviceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray"),
		apointment : serviceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray"),
		managerMode : true,
		threadSequence : 0,
		service : serviceLocator.getWorkflowEngineServicePort()
	};
		
    var userAux = new Array(idcolleague);		
	workflow.colleaguesRecipient.setItem(userAux);	
	
	try{
		var wsMessage = workflow.service.saveAndSendTask(
			workflow.userId, workflow.password, workflow.companyId, workflow.processId, workflow.choosedState,
			workflow.colleaguesRecipient, workflow.comment, workflow.colleagueSender, workflow.completeTask,
			workflow.atachments, workflow.cardData, workflow.apointment, workflow.managerMode, workflow.threadSequence
		);

	} catch(e){
		log.error("AGLUTINACAO - saveAndSendTask - Teste a movimentação no soapUI - " + workflow + " - "  + e);
	}

	// se solic escolhida  nao estiver mais no pool fazer throw passando o numero da solicitacao que precisa ser removida do pai x filho
	
}

function findColleagueIDByMail(mail){
	var userMail = DatasetFactory.createConstraint("mail", mail, mail,	ConstraintType.MUST);
    var userCompanyId = DatasetFactory.createConstraint("colleaguePK.companyId", getValue("WKCompany"),	getValue("WKCompany"), ConstraintType.MUST);
    
    // Define os campos para ordenação
    var sortingFields = new Array("colleaguePK.colleagueId");
    
    var colleague = DatasetFactory.getDataset("colleague", null,new Array(userCompanyId,userMail), sortingFields);
    if(colleague && colleague.rowsCount > 0 && colleague.getValue(0, "colleaguePK.colleagueId")){
    	return colleague.getValue(0, "colleaguePK.colleagueId");
    }else{
    	return null;
    }
}