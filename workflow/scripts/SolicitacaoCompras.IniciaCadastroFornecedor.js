function iniciaCadastroFornecedor(fornecedor, datasetMunicipios){
	
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
	var wsCompany = 1;

	
	var PROCESSO_CADASTRO_FORNECEDOR = "cadastroFornecedor";
	
	var matriculaResponsavel = getValue("WKUser");
	var codMunicipio = " ";
	var nmCidade = "";
	var telefone = "";
	var ddd = "";
	var fax = "";
	var incricaEstadual = "";
	var isento = "";
	var hiddenFilial = hAPI.getCardValue("filial_protheus");
	var filial = hAPI.getCardValue("nmFilial");
	
	
	/*
	 * Inscrição Estadual
	 * 
	 */
	if(fornecedor.has("Inscricao_Estadual")){
		if(fornecedor.get("Inscricao_Estadual") == "" || fornecedor.get("Inscricao_Estadual") == "isento"){
			isento = "on";
		}else{
			incricaEstadual = fornecedor.get("Inscricao_Estadual") ;
		}
	} 

	/*
	 * nome e cód Cidade
	 * 
	 */
	var cidadeFormatada = formataNomeCidade(fornecedor.get("Cidade"));
	codMunicipio = buscaCodigoMunicipio(datasetMunicipios, cidadeFormatada);
	if(fornecedor.has("Cidade") &&  codMunicipio != ""){
		nmCidade = cidadeFormatada;
	}else{
		nmCidade = "";
		codMunicipio = "";
	}
	
	/*
	 * 
	 * Telefone e DDD
	 */
	if(fornecedor.has("Telefone") && fornecedor.get("Telefone") != ""){
		telefone = fornecedor.get("Telefone");
		if(telefone.indexOf("(") > -1){
			ddd = telefone.substring(0,telefone.indexOf(" "));
			ddd = ddd.replace("(","");
			ddd = ddd.replace(")","");
			telefone = telefone.substring(telefone.indexOf(" "),(telefone+"").length -1);
			telefone = tiraEspacoesEmBranco(telefone);
			ddd = tiraEspacoesEmBranco(ddd);
		}
	}

	
	/*
	 * 
	 * Fax
	 * 
	 */
	if(fornecedor.has("Fax") && fornecedor.get("Fax") != ""){
		fax = fornecedor.get("Fax");
		if(fax != null) {
			if(fax.indexOf("(") > -1){
				fax = fax.substring(fax.indexOf(" "),(fax+"").length -1);
				fax = tiraEspacoesEmBranco(fax);
			}
		}
	}
    try {
    	
    	var workflowServiceProvider = ServiceManager.getServiceInstance("WorkflowService");
		var workflowServiceLocator = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceServiceLocator");				
	    var workflowService = workflowServiceLocator.getWorkflowEngineServicePort();
	    var users = workflowServiceProvider.instantiate("net.java.dev.jaxb.array.StringArray");
	    var userAux = new Array(getValue("WKUser"));	    
	    users.setItem(userAux);
	    
	    var keyValueDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray");	    	    
	    var listaCampos = new Array();		
	    
	    var keyValueDto1 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto1.setKey("hiddenFilial");
	    keyValueDto1.setValue(hiddenFilial);
	    listaCampos.push(keyValueDto1);
	    
	    var keyValueDto1a = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto1a.setKey("filial");
	    keyValueDto1a.setValue(filial);
	    listaCampos.push(keyValueDto1a);
	    
	    var keyValueDto1b = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto1b.setKey("analyticsNmFilial");
	    keyValueDto1b.setValue(hiddenFilial);
	    listaCampos.push(keyValueDto1b);
	    
	    var keyValueDto2 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto2.setKey("tipodeSolicitacao");
	    keyValueDto2.setValue("novoFornecedor");
	    listaCampos.push(keyValueDto2);
	    
	    var keyValueDto3 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto3.setKey("A2_TIPO");
	    keyValueDto3.setValue("J");
	    listaCampos.push(keyValueDto3);
	    
	    var A2_CGC = fornecedor.has("CNPJ") ? fornecedor.get("CNPJ") : "";
	    var keyValueDto4 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto4.setKey("A2_CGC_HIDDEN");
	    keyValueDto4.setValue(A2_CGC);
	    listaCampos.push(keyValueDto4);
	    
	    var keyValueDto5 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto5.setKey("A2_CGC");
	    keyValueDto5.setValue(A2_CGC);
	    listaCampos.push(keyValueDto5);
	    
	    var A2_NOME =fornecedor.has("Razao_Social") ? fornecedor.get("Razao_Social") : "";
	    var keyValueDto6 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto6.setKey("A2_NOME");
	    keyValueDto6.setValue(A2_NOME);
	    listaCampos.push(keyValueDto6);
	    
	    var A2_NREDUZ = fornecedor.has("Nome_Fantasia") ? fornecedor.get("Nome_Fantasia") : "";
	    var keyValueDto7 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto7.setKey("A2_NREDUZ");
	    keyValueDto7.setValue(A2_NREDUZ);
	    listaCampos.push(keyValueDto7);

	    var A2_CEP = fornecedor.has("CEP") ? fornecedor.get("CEP") : "";
	    var keyValueDto8 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto8.setKey("A2_CEP_HIDDEN");
	    keyValueDto8.setValue(A2_CEP);
	    listaCampos.push(keyValueDto8);
	    
	    var keyValueDto9 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto9.setKey("A2_CEP");
	    keyValueDto9.setValue(A2_CEP);
	    listaCampos.push(keyValueDto9);
	    
	    
	    var A2_END = fornecedor.has("Logradouro") ? fornecedor.get("Logradouro") : "";
	    var keyValueDto10 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto10.setKey("A2_END");
	    keyValueDto10.setValue(A2_END);
	    listaCampos.push(keyValueDto10);
	
	    var A2_EST = fornecedor.has("Estado_Sigla") ? fornecedor.get("Estado_Sigla") : "";
	    var keyValueDto11 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto11.setKey("A2_EST");
	    keyValueDto11.setValue(A2_EST);
	    listaCampos.push(keyValueDto11);
	    
	    var PAIS_DESC = fornecedor.has("Pais") ? fornecedor.get("Pais") : "";
	    var keyValueDto12 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto12.setKey("PAIS_DESC");
	    keyValueDto12.setValue(PAIS_DESC);
	    listaCampos.push(keyValueDto12);
	    
	    var A2_PAIS = fornecedor.has("Pais_Sigla") ? fornecedor.get("Pais_Sigla") : "";
	    var keyValueDto14 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto14.setKey("A2_PAIS");
	    keyValueDto14.setValue(A2_PAIS);
	    listaCampos.push(keyValueDto14);
	    
	    var A2_EMAIL = fornecedor.has("Email") ? fornecedor.get("Email") : "";
	    var keyValueDto15 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto15.setKey("A2_EMAIL");
	    keyValueDto15.setValue(A2_EMAIL);
	    listaCampos.push(keyValueDto15);
	    
	    var keyValueDto16 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto16.setKey("A2_INSCR");
	    keyValueDto16.setValue(incricaEstadual);
	    listaCampos.push(keyValueDto16);
	    
	    var keyValueDto17 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto17.setKey("isento");
	    keyValueDto17.setValue(isento);
	    listaCampos.push(keyValueDto17);
	    
	    var keyValueDto18 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto18.setKey("MUNICIPIO_DESC");
	    keyValueDto18.setValue(nmCidade);
	    listaCampos.push(keyValueDto18);
	    
	    var keyValueDto19 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto19.setKey("A2_COD_MUN");
	    keyValueDto19.setValue(codMunicipio);
	    listaCampos.push(keyValueDto19);
	    
	    var keyValueDto20 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto20.setKey("A2_DDD");
	    keyValueDto20.setValue(ddd);
	    listaCampos.push(keyValueDto20);
	    
	    var keyValueDto21 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto21.setKey("A2_TEL");
	    keyValueDto21.setValue(telefone);
	    listaCampos.push(keyValueDto21);
	    
		var keyValueDto22 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto22.setKey("A2_TEL_HIDDEN");
	    keyValueDto22.setValue(telefone);
	    listaCampos.push(keyValueDto22);
	    
	    var keyValueDto23 = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.KeyValueDto");
	    keyValueDto23.setKey("A2_FAX");
	    keyValueDto23.setValue(fax);
	    listaCampos.push(keyValueDto23);
	    
	    keyValueDtoArray.setItem(listaCampos);
	    
	    var processTaskAppointmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
	    var processAttachmentDtoArray = workflowServiceProvider.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
	    var keyValueDtoArrayResult = workflowService.startProcessClassic(wsUser, wsPass, wsCompany, PROCESSO_CADASTRO_FORNECEDOR, new java.lang.Integer(40), users, "Processo Iniciado atrav?s da solicita??o de compras "+getValue("WKNumProces"), matriculaResponsavel, false, processAttachmentDtoArray, keyValueDtoArray, processTaskAppointmentDtoArray, false);
	    
	    var iProcess = "";
	    if (keyValueDtoArrayResult.getItem().length > 0) {
		    var listResult = keyValueDtoArrayResult.getItem();
		    for (var i=0; i< listResult.length; i++) {
		    	if (listResult[i].getKey() == "iProcess") {
		    		iProcess = listResult[i].getValue();;
		    	}
		    	
		    }
	    }
	    return iProcess;
    } catch (e) {
    	log.info("_-------------------ERRO------"+e.message);
    }
}

function tiraEspacoesEmBranco(palavra){
	while(palavra.indexOf(" ") > -1){
		palavra = palavra.replace(" ","");
	}
	
	return palavra;
}


function buscaCodigoMunicipio(datasetMunicipios, municipio){
	var codMunicipio = "";
	for (var i = 0; i < datasetMunicipios.length; i++) {
		if(datasetMunicipios[i][1] != undefined && (datasetMunicipios[i][1]).trim() == municipio){
			codMunicipio = datasetMunicipios[i][0];
			break;
		}
	}
	return codMunicipio;
}

function formataNomeCidade(palavra) {
	var nova = "";
	var com_acento = "??????????????????????????????????????????????";
	var sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
	nova = "";
	for(i=0;i<(""+palavra).length;i++) {
	    if (com_acento.indexOf(palavra.substr(i,1))>=0)
	        nova += sem_acento.substr(com_acento.indexOf(palavra.substr(i,1)),1);
	    else 
	        nova += palavra.substr(i,1);
	}
	
	nova = nova.toUpperCase();
	
	return nova;
}