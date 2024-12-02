function startPesquisaDeSatisfacao(targetUserCode){
	var processId = buscarIdProcesso();
	var processIdPesquisa = "PesquisaDeSatisfacao";
	var numProcess = buscarIdSolicitacao();
	var empresa = buscarEmpresa();
	var atividadeDestino = 2;
	var usuarioEnvio = targetUserCode;
	var atividadeCompletada = true;
	var modoGestor = false;
	var sequenciaThread = 0;
//	var pesquisaCardData = new java.util.HashMap();
	
	var processName = getProcessName(processId);
	var obs = "Solicitação iniciada automaticamente pelo processo " + processName + " Nº " + numProcess;
	var inicSolic = new objInicSolic(empresa, processIdPesquisa, atividadeDestino, usuarioEnvio, obs, atividadeCompletada, modoGestor, sequenciaThread);
	
	inicSolic.setColleagueRecipient(targetUserCode);
	
	var fieldFrom = null;
	var fieldTo = null;
	var fieldFromValue = null;

	var parentFields = null;
	var parentConstraints = [];
	var parentOrder = null;

	parentConstraints.push(DatasetFactory.createConstraint("metadata#active","true","true",ConstraintType.MUST));
	parentConstraints.push(DatasetFactory.createConstraint("processoOrigem",processId,processId,ConstraintType.MUST));

	var parentDataset = DatasetFactory.getDataset("ds_de_para_pesquisa_satisfacao",parentFields,parentConstraints,parentOrder);

	if(parentDataset != null && parentDataset.rowsCount > 0){
		var id = parentDataset.getValue(0, "metadata#id");
		var version = parentDataset.getValue(0, "metadata#version");
		
		var childFields = null;
		var childConstraints = [];
		var childOrder = null;

		childConstraints.push(DatasetFactory.createConstraint("metadata#id",id,id,ConstraintType.MUST));
		childConstraints.push(DatasetFactory.createConstraint("metadata#version",version,version,ConstraintType.MUST));
		childConstraints.push(DatasetFactory.createConstraint("tablename","campos","campos",ConstraintType.MUST));

		var childDataset = DatasetFactory.getDataset("ds_de_para_pesquisa_satisfacao",childFields,childConstraints,childOrder);
		
		if(childDataset != null && childDataset.rowsCount > 0){
			for(var i = 0; i < childDataset.rowsCount; i++){
				fieldFrom = childDataset.getValue(i, "campoOrigem");
				fieldTo = childDataset.getValue(i, "campoDestino");
				fieldFromValue = hAPI.getCardValue(fieldFrom);
				if(fieldFromValue == null) fieldFromValue = "";
				inicSolic.setCardData(fieldTo, fieldFromValue);
				//pesquisaCardData.put(fieldTo,fieldFromValue);
			}
		}
	}


	
	inicSolic.setCardData("nrProcessoOrigem",java.lang.String.valueOf(numProcess));
	inicSolic.setCardData("nmProcessoOrigem",processName);
	inicSolic.setCardData("pesquisaRespondida","N");
//	pesquisaCardData.put("nrProcessoOrigem",java.lang.String.valueOf(numProcess));
//	pesquisaCardData.put("nmProcessoOrigem",processName);
//	pesquisaCardData.put("pesquisaRespondida","N");
	
//	var listaColab = new java.util.ArrayList();
//	listaColab.add(targetUserCode);
//	
//	var obs = "Solicitação iniciada automaticamente pelo processo " + processName + " Nº " + numProcess;
//	
//	hAPI.startProcess("PesquisaDeSatisfacao", 2, listaColab, obs, true, pesquisaCardData, false);
	try{	
		inicSolic.inicProcess();
	} catch (e) {	
		log.info("-------------------ERRO WEBSERVICE STARTPROCESS NOVA SOLIC ------"+e.message);
	}	
}

function getProcessName(processId){
	var processName = "";
	var fields = null;
	var constraints = [];
	var order = null;

	constraints.push(DatasetFactory.createConstraint("processDefinitionPK.processId",processId,processId,ConstraintType.MUST));

	var dataset = DatasetFactory.getDataset("processDefinition",fields,constraints,order);
	
	if(dataset != null && dataset.rowsCount > 0){
		processName = dataset.getValue(0,"processDescription");
	}
	
	return processName;
}