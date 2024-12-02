var objInicSolic = 


function(company ,processId, destinyActivity, colleagueSender, obs, completeTask, managerMode, threadSequence){
	
	/*
	 * VariÃ¡veis de acesso ao Web Service
	 */
	var companyWS;
	var usuarioPublicaDoc = "";
	var senhaPublicaDoc = "";
	var linkWorkflowEngineServiceLocator = "";
	var linkTokenServiceLocator = "";
	
	/*
	 * VariÃ¡veis do WebService
	 */
	var workflowEngineServiceProvider = '';
	var workflowEngineServiceLocator = '';
	var workflowEngineService = '';
	var tokenServiceProvider = '';
	var tokenServiceLocator = '';
	var tokenService = '';
	var tokenGerado = '';
	var attachmets;
	var apointments;
	var cardData;
	var colleagueRecipient;
	var processId;
	var destinyActivity;
	var obs;
	var colleagueSender;
	var completeTask;
	var managerMode;
	var threadSequence;
	var atividadeDestino;
	var listFields;
	
	
	/*
	 * MÃ©todos do Web Service
	 */
	var iniciarWorkflowEngineService = function() {
		workflowEngineServiceProvider = ServiceManager
				.getServiceInstance("WorkflowService");
	};
	var iniciarServiceLocator = function() {
		workflowEngineServiceLocator = workflowEngineServiceProvider
				.instantiate(linkWorkflowEngineServiceLocator);
	};
	var iniciarPortas = function() {
		workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
	};
	
	var getToken = function(){
		iniciarTokenService();
		iniciarServiceLocatorToken();
		iniciarPortasToken();
		instantiateToken();
	};
	
	var iniciarTokenService = function() {
		tokenServiceProvider = ServiceManager
				.getServiceInstance("ECMTokenService");
	};
	
	var iniciarServiceLocatorToken = function() {
		tokenServiceLocator = tokenServiceProvider
				.instantiate(linkTokenServiceLocator);
	};
	
	var iniciarPortasToken = function() {
		tokenService = tokenServiceLocator.getTokenServicePort();
	};
	
	var instantiateToken = function (){
		tokenGerado = tokenService.getToken(usuarioPublicaDoc,senhaPublicaDoc);
	};

	var createAttachments = function(){
		attachmets = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
	};
	
	var createAppointments = function(){
		apointments = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
	};
	
	var createColleagueRecipient = function(){
		colleagueRecipient = workflowEngineServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	};
	
	var createCardData = function(){
		cardData = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");
		cardData.setItem(listFields);
	};
	
	var setParametros = function(companyRef , processIdRef, destinyActivityRef ,colleagueSenderRef, obsRef, completeTaskRef,managerModeRef, threadSequenceRef){
		companyWS = companyRef;
		processId = processIdRef;
		destinyActivity = destinyActivityRef;
		colleagueSender = colleagueSenderRef;
		obs = obsRef;
		completeTask = completeTaskRef;
		managerMode = managerModeRef;
		threadSequence = threadSequenceRef;
		listFields = new Array();
		iniciarWorkflowEngineService();
		iniciarServiceLocator();
		iniciarPortas();
		createColleagueRecipient();
	};
	
	this.setColleagueRecipient = function(colleagueEnrollment){
		var userAux = new Array(colleagueEnrollment);
		colleagueRecipient.setItem(userAux);
	};
	
	this.setCardData = function(campo,valor){
		var keyValueDto = workflowEngineServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
		keyValueDto.setKey(campo);
		keyValueDto.setValue(valor);
		listFields.push(keyValueDto);
		
	};
	
	
	
	this.inicProcess = function(){
		createAppointments();
		createAttachments();
		createCardData();
		log.info("Param user " + usuarioPublicaDoc + " senha " + senhaPublicaDoc + " company " + companyWS + " process " + processId + " atividade " + destinyActivity + " colleagueRec " + colleagueRecipient + " observa " + obs + " colleagueSed " + colleagueSender + " completeTask " + completeTask + " attach " + attachmets + " cardData " + cardData + " appoin " + apointments + " manager " + managerMode);
		var keyValueDtoArrayResult = workflowEngineService.startProcessClassic(usuarioPublicaDoc, senhaPublicaDoc, companyWS, processId, destinyActivity ,colleagueRecipient, obs, colleagueSender, completeTask, attachmets, cardData, apointments, managerMode);
		
	};
	
	var setConfigServer = function() {
		var config = new objDataSet("configServer");
		config.buscar();
		var configServer = config.getDados();

		try {
			for ( var posValues in configServer.values) {
				usuarioPublicaDoc = configServer.getValue(posValues,
						"usuarioPublicaDoc");
				senhaPublicaDoc = configServer.getValue(posValues,
						"senhaPublicaDoc");
				linkTokenServiceLocator = configServer.getValue(posValues,
				"tokenServiceLocator");
				
				linkWorkflowEngineServiceLocator = configServer.getValue(posValues,
				"workflowEngineServiceLocator");

				erroConfigServer = false;
			}
		} catch (e) {
			throw 'Falha ao utilizar o objInicSolic, n~ça encontrado dataSet configServer. CÃ³digo Erro: 40.';
		}
	};
	
	/**
	 * Construtor
	 * 
	 * @author rodrigo.neto
	 */
	__construct = function(company, processId, destinyActivity, colleagueSender, obs ,completeTask, managerMode, threadSequence) {
		setConfigServer();
		getToken();
		setParametros(company, processId, destinyActivity, colleagueSender, obs, completeTask, managerMode, threadSequence);
	}(company, processId, destinyActivity, colleagueSender, obs, completeTask, managerMode, threadSequence);
};