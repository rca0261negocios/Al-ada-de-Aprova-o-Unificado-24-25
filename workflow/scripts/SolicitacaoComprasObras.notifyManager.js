function notifyManager(){
	var mails = getMailsOfGroup("HOFGES");
	var receivers = new java.util.ArrayList();
	var parameters = new java.util.HashMap();
	
	for(var i=0; i<mails.rowsCount; i++) receivers.add(mails.getValue(i, "colleaguePK.colleagueId"));	
	
	parameters.put("subject", "Nova solicitação de compras de obras aprovada");
	parameters.put("TARGET", hAPI.getCardValue("target"));
	parameters.put("NR_SOLIC", hAPI.getCardValue("txtSolicitacao"));
	
	log.info("notifyManager: receivers.size() = "+receivers.size());
	
	notifier.notify(getValue("WKUser"), "template_gestor_compras_obras", parameters, receivers, "text/html");
}

function getMailsOfGroup(groupId){
	var colleagueIds = getDatasetColleagueGroup(groupId);
	var fields = new Array("colleaguePK.colleagueId");
	var constraints = createConstraints(colleagueIds);
	
	log.info("getMailsOfGroup: constraints.length = "+constraints.length);
		
	var dataset = DatasetFactory.getDataset("colleague", fields, constraints, null);	
	
	log.info("getMailsOfGroup: groupId = "+groupId);
	log.info("getMailsOfGroup: dataset.rowsCount = "+dataset.rowsCount);
	
	return dataset;
}

/**
 * Retorna os usuarios pertencentes a um grupo.
 * 
 * @param groupId: Codigo do grupo
 * @returns Dataset.
 */
function getDatasetColleagueGroup(groupId){
	var fields = new Array("colleagueGroupPK.colleagueId");
	var constraints = new Array(DatasetFactory.createConstraint("colleagueGroupPK.groupId", groupId, groupId, ConstraintType.MUST));
	var dataset = DatasetFactory.getDataset("colleagueGroup", fields, constraints, null);
	
	log.info("getDatasetColleagueGroup: groupId = "+groupId);
	log.info("getDatasetColleagueGroup: dataset.rowsCount = "+dataset.rowsCount);
	
	return dataset;
}


function createConstraints(dataset){
	var constraints = new Array();
	
	for(var i=0; i<dataset.rowsCount; i++){
		var colleagueId = dataset.getValue(i, "colleagueGroupPK.colleagueId");
		
		log.info("createConstraints: colleagueId = "+colleagueId);
		
		constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.SHOULD));
	}
	
	log.info("createConstraints: constraints.length = "+constraints.length);
	
	return constraints;
}