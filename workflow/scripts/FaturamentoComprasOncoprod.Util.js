function Util(){

}
//Funcao para remover a mascara monetaria
function removeMascaraMonetaria(mask) {
	if (mask != undefined && mask != '') {
		mask = mask.replace('R$', '');
		mask = mask.replace(' ', '');
		//mask = mask = mask.replace(/[\.]/g, '');

		mask = mask.replace('.', '');
		mask = mask.replace('.', '');
		mask = mask.replace('.', '');

		mask = mask.replace(',', '.');
		return parseFloat(mask);
	} else {
		return 0.00;
	}
}

/*
 * Função que torna anexos obrigatórios em qualquer atividade.
 */
function verificaAnexo() {
	var qtdAnexosCampo = parseInt(hAPI.getCardValue("qtdAnexos"));
	var instanceId = getValue('WKNumProces');
	var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', instanceId, instanceId,ConstraintType.MUST);
	var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment], null);
	var documentId = datasetProcessAttachment.getValue(0, 'documentId');
	var constraintProcessAttachment2 = DatasetFactory.createConstraint('documentId', documentId, documentId, ConstraintType.MUST_NOT);
	datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment, constraintProcessAttachment2], null);

	var qtdAnexos = datasetProcessAttachment.rowsCount;
	if (qtdAnexos > qtdAnexosCampo) {
		hAPI.setCardValue("qtdAnexos", qtdAnexos);
	} else {
		throw "É preciso anexar ao menos um documento para continuar o processo";
	}
}

/**
 * Recebe uma String como paramentro e a retorna sem os acentos
 * @param string
 * @returns
 */
function removeAcentos(string){
	string = string.replaceAll('Á|À|Â|Ã|Ä','A');
	string = string.replaceAll('É|È|Ê|Ë','E');
	string = string.replaceAll('Í|Ì|Î|Ï','I');
	string = string.replaceAll('Ó|Ò|Ô|Õ|Ö','O');
	string = string.replaceAll('Ú|Ù|Û|Ü','U');
	string = string.replaceAll('Ç','C');
	return string
}

/**
 * Verifica se a atividade esta sendo transferida ou salva sem movimentação
 * @returns True se tiver sendo Transferida, false se estiver sendo movimentada 
 */
function isTransferOrSave(){
	 var WKNumState    = getValue("WKNumState");
	 var WKNextState   = getValue("WKNextState");
	 var WKCompletTask = getValue("WKCompletTask");
	 
	 if(WKCompletTask == "false" || WKNumState == WKNextState){
	  return true;
	 }else{
	  return false;
	 }
}
