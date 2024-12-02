function criarPedido(){
	var pedidoCompras = new PedidoCompras();
	pedidoCompras.criaDesvinculados();
}

var PedidoCompras = function() {
	var self = this;
	var numProcess = getValue("WKNumProces");
	var nomeProcesso = "SolicitacaoComprasObras";
	var atividadeDestino = "";
	
	this.criaDesvinculados = function() {
		atividadeDestino = 74;
		if (self.itensDesvinculados())	{ // verificar se item itensDesvinculados
			try {
				var solicitacao = new Solicitacao();
				var dados = self.getJsonCampos();
				var obsSolic = "Solicitação gerada a partir dos itens desvinculados na solicitação " + numProcess; 
				solicitacao.nova(nomeProcesso, atividadeDestino, dados, obsSolic);
				//solicitacao.nova({"campos": self.getCampos(), "arrayCampos" : self.getArrayCampos(), "prefixos" : self.getPrefixoPaiFilho()});
			} catch (e) {
				log.info("   ------ ERRO WEBSERVICE STARTPROCESS DESVINCULADO ------   "+e.message);
			}
		} else {
			log.info("==========atividadeEmitirPedidoCompra=====semDesvinc ");
		}
	};

	this.itensDesvinculados = function() {
		var codItemDesv = hAPI.getCardValue("txtCodItemProdutoDesv___1")
		return (codItemDesv != "" || codItemDesv != null); 
	};
	
	this.itensAglutinados = function() {
		var numSolic = hAPI.getCardValue("txtNumSolicAdd___1"); 
		return (numSolic != null && numSolic != undefined && numSolic.trim() != "");
	};
	
	this.aglutinarSolicitacoes = function(){
		if (self.itensAglutinados()){	    
			var mapa = hAPI.getCardData(parseInt(numProcess));
			var card = new java.util.HashMap();
			var it = mapa.keySet().iterator();
			while (it.hasNext()) {
				var campo = it.next();	   
				if (campo.indexOf("txtNumSolicAdd___") > -1){	   
					var NumSolicAdd = mapa.get(campo);
					self.encerraAglutinada(NumSolicAdd);
					// se solic escolhida  nao estiver mais no pool fazer throw passando o numero da solicitacao que precisa ser excluida
				} 
			}   
		}
	};
	
	this.encerraAglutinada = function (numSolicitacao) {
		atividadeDestino = 17;
		var solicitacao = new Solicitacao();
		solicitacao.encerra(numSolicitacao, atividadeDestino);
	};
	
	this.getCampos = function() {
		return {
			"sPrioridadeProdutoDesv": "sPrioridadeProduto",
		    "hiddenPrioridadeDesv": "hiddenPrioridade",
		    "txtSeqItemProdutoDesv": "txtSeqItemProduto",	
		    "txtCodItemProdutoDesv": "txtCodItemProduto",
		    "txtDescProdutoDesv": "txtDescProduto",
		    "txtUnidMedProdutoDesv" :"txtUnidMedProduto",
		    "txtQuantidadeProdutoDesv":"txtQuantidadeProduto",
		    "dtNecessidadeProdutoDesv": "dtNecessidadeProduto",
		    "txtArmazemProdutoDesv": "txtArmazemProduto",
		    "prazoProdutoDesv": "prazoProduto",				       
		    "txtObsProdutoDesv" : "txtObsProduto",					   
			"nmFabricanteDesv": "nmFabricante",
			"txtConsumoMedioDesv": "txtConsumoMedio",
		    "txtContaContabilDesv": "txtContaContabil"
		};
	};
	
	this.getArrayCampos = function() {
		var campos = new Array("nmFilial"				, "hiddenFilial"		, "txtNmRequisitante"		, "txtComprador"		, 
							   "hiddenComprador"		, "txtCodCentroCusto"	, "txtNomeCentroCusto"		, "nmFilialEntrega"		, 
							   "hiddenFilialEntrega"	, "txtLocalEntrega"		, "rdContrato_d"				, "ckImportado"			,
							   "dtValidadeCotacao"		, "txtCodFormaPagamento", "txtNomeFormaPagamento"	, "hrValidadeCotacao"	, 
							   "grupoAnaliseComprador"	, "dtEmissao"			, "FilialAlcada"			, "filial_protheus"		, 
							   "hiddenTipoProduto"		, "codigo_filial"		, "filial"					, "codigo"				, 
							   "analyticsNmFilial"		, "cdSolicitante"		, "idRequisitante");
		return campos;
	};

	this.getPrefixoPaiFilho = function() {
		var prefixo = new Array("sPrioridadeProdutoDesv___"		, "hiddenPrioridadeDesv___"			, "txtSeqItemProdutoDesv___"	, "txtCodItemProdutoDesv___"	, 
								"txtDescProdutoDesv___"			, "txtQuantidadeProdutoDesv___"		, "dtNecessidadeProdutoDesv___"	, "dtEmissaoProdutoDesv___"		, 
								"prazoProdutoDesv___"			, "txtObsProdutoDesv___"			, "txtContaContabilDesv___"		, "txtUnidMedProdutoDesv___"	, 
								"txtArmazemProdutoDesv___"		, "nmFabricanteDesv___"				, "txtConsumoMedioDesv___");
		return prefixo;
	};

	this.getJsonCampos = function() {	    	    
		var jsonCampos = {};		
		var numProcess = getValue("WKNumProces");
		var obsSolic = "Solicitação gerada a partir dos itens desvinculados na solicitação " + numProcess; 
		log.info(obsSolic);
		var mapa = hAPI.getCardData(parseInt(numProcess));
		var it = mapa.keySet().iterator();
		var arrCampos = self.getCampos();
		while (it.hasNext()) {
			var campo = it.next();
			log.info("==========itensDesvinculados:campo procurado: "+campo);
			if(self.checaCampo(campo, self.getArrayCampos(), self.getPrefixoPaiFilho())){
				var chave = self.getCampo(campo, arrCampos);
				log.info("==========itensDesvinculados:campo "+chave +" - "+ mapa.get(campo));
				jsonCampos[chave] = mapa.get(campo);
			}
		}
		return jsonCampos;
	};
	
	this.getCampo = function (campo, arrCampos) {
		if (campo.indexOf("___") > -1) {
			var nomeCampo = campo.split("___")[0];
			var sufixo = campo.split("___")[1];	 			 
			var campoSolicNova = arrCampos[nomeCampo] + "___" + sufixo; 
			return campoSolicNova;
		} else {
			return campo;
		}
	};
	
	this.checaCampo = function(campo, campos, prefixos) {	
		log.info("index encontrado: " + campos.indexOf(campo));
		for(var i = 0; i < campos.length; i++) {
			if(campos[i].indexOf(campo) != -1)
				return true;
		}
		for(var i = 0; i < prefixos.length; i++) {
			if(campo.indexOf(prefixos[i]) > -1) 
				return true;
		}
		return false;
	};
	
}

var Solicitacao = function() {
	var wsUser = "";
	var wsPass = "";
	var wsCompany = 1;
	var nomeProcesso = "";
	var idAtividade = "";
	var usuarioDestino = null;
	var obsSolic = "";
	var usuarioAbertura = "";
	
	var workflowServiceProvider = ServiceManager.getServiceInstance("WorkflowService");
	var workflowServiceLocator = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceServiceLocator");;
	var workflowService = workflowServiceLocator.getWorkflowEngineServicePort();
	
	var processTaskAppointmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
	var processAttachmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
	
	var keyValueDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");
		
	this.nova = function(nome, atividade, obj, obsSolic) {
		nomeProcesso = nome;
		idAtividade = atividade;
		try{
			if(getCredenciais()) {	
				getUsuarios();
				var listaCampos = getCampos(obj);
				keyValueDtoArray.setItem(listaCampos);
				var keyValueDtoArrayResult = workflowService.startProcessClassic(wsUser, wsPass, wsCompany, nomeProcesso, idAtividade, usuarioDestino, obsSolic, usuarioAbertura, true,processAttachmentDtoArray, keyValueDtoArray, processTaskAppointmentDtoArray, false);
				return keyValueDtoArrayResult;
			}
		} catch (e) {
			log.info(" ------   ERRO WEBSERVICE STARTPROCESS   ------ "+e.message);
		}
	};
	
	this.encerra = function(numSolicitacao, atividadeFim) { //atividadeFim aglutina é 17
		//var userEncerrador = "xlzrr9xyj4fn8ifd1411396974426";
		var userEncerrador = hAPI.getCardValue("idRequisitante");
		try{
			if(getCredenciais()) {
				var workflow = { 
					userId : wsUser,
					password : wsPass,
					companyId : wsCompany,
					processId : parseInt(numSolicitacao),
					choosedState : atividadeFim, // fim
					colleaguesRecipient : workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray"),
					comment : "Solicitação aglutinada na solicitação número ",
					colleagueSender : userEncerrador,
					completeTask : true,
					atachments : processAttachmentDtoArray,
					cardData : workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArrayArray"),
					apointment : processTaskAppointmentDtoArray,
					managerMode : true,
					threadSequence : 0,
					service : workflowServiceLocator.getWorkflowEngineServicePort()
				};
				
				var userAux = new Array(userEncerrador);		
				workflow.colleaguesRecipient.setItem(userAux);	
				
				var wsMessage = workflow.service.saveAndSendTask(
						workflow.userId, workflow.password, workflow.companyId, workflow.processId, workflow.choosedState,
						workflow.colleaguesRecipient, workflow.comment, workflow.colleagueSender, workflow.completeTask,
						workflow.atachments, workflow.cardData, workflow.apointment, workflow.managerMode, workflow.threadSequence);
				log.info("Dados da solicitacao: " + workflow);
				log.info("Resultado do encerramento: " + wsMessage);
				log.info("Solicitação finalizada por " + userEncerrador);
			}
		} catch (e) {
			log.info("_-------------------ERRO WEBSERVICE ENDPROCESS ------"+e.message);
		}
	};
	
	var getCredenciais = function() {
		var config = new objDataSet("configServer");
		config.buscar();
		var configServer = config.getDados();
		try {
			wsUser = configServer.getValue(0,"usuarioPublicaDoc");
			wsPass = configServer.getValue(0,"senhaPublicaDoc");
			return true;
		} catch (e) {
			log.error("Falha ao utilizar o dataSet configServer.");
			return false;
		}
	};
	
	var getUsuarios = function() {
		var grupoAnaliseComprador = hAPI.getCardValue("grupoAnaliseComprador");
		var usuarioDestino = workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
		var userAux = new Array(grupoAnaliseComprador);		   
		usuarioDestino.setItem(userAux);
		usuarioAbertura = hAPI.getCardValue("idRequisitante");	
	}
	
	var getCampos = function(obj) {	    	    
		var listaCampos = new Array();		
		for (item in obj){
			var keyValueDto1 = getValueDTO(item, obj[item]);
			log.info("==========itensDesvinculados:getCampos ["+item +" : "+ obj[item] + "]");
			listaCampos.push(keyValueDto1);
		};
		
		return listaCampos;
	};
		
	var getValueDTO = function (chave, valor) {
		log.info("getValueDTO: chave = " + chave + " valor = " + valor);
		var keyValueDto = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
		keyValueDto.setKey(chave);
		keyValueDto.setValue(valor);
		return keyValueDto;
	};
	
};