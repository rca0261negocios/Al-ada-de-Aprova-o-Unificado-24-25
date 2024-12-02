/**
 * Atualiza o campo que contem a quantidade total de anexos da solicitacao.
 * 
 * @returns void.
 */
function updateTotalAttachment(){
	var nrAttachment = hAPI.listAttachments().size();
	
	log.info("validateAttachment/updateTotalAttachment: nrAttachment = "+nrAttachment);
	log.info("teste");
	log.info(hAPI.listAttachments());
	hAPI.setCardValue("nrAnexo", nrAttachment);
	log.info("teste2");
}


/**
 * Valida se foi enviado anexos na atividade.
 * 
 * @returns void.
 */
function validateAttachment(){
	var nrAttachmentPrevious = hAPI.getCardValue("nrAnexo");
	log.info("nrAttachmentPrevious");
	log.info(nrAttachmentPrevious);
	var nrAttachmentCurrent = hAPI.listAttachments().size();
	log.info("nrAttachmentCurrent");
	log.info(nrAttachmentCurrent);
	if(nrAttachmentPrevious >= nrAttachmentCurrent) throw "O envio de anexos \u00E9 obrigat\u00F3rio nesta atividade!";
	else updateTotalAttachment();
}