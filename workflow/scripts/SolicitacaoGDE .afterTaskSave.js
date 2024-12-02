function afterTaskSave(colleagueId, nextSequenceId, userList) {
    var atividade = getValue('WKNumState')
    var numeroSolicitacao = getValue("WKNumProces");
    hAPI.setCardValue('cpCodSolicitacao', numeroSolicitacao);

    if (atividade == 68 &&
        hAPI.getCardValue('cpDecisaRegularizadora') != 'sim') {

        comentarDecisao(hAPI.getCardValue('taMotivoRegularizadora'))

    } else if (atividade == 78 &&
        hAPI.getCardValue('cpDecisaoGestor') != 'sim') {

        comentarDecisao(hAPI.getCardValue('taMotivoGestor'))

    }

    if ((nextSequenceId == 36 || nextSequenceId == '36') && hAPI.getCardValue("cpDecisaoSolicitante") != "sim") {

        notificacaoEncerramento(hAPI.getCardValue('emailSolicitante'), hAPI.getCardValue('cpSolicitante'))
    }

}

function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array()
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}

function comentarDecisao(comentario) {
    var user = getValue("WKUser");
    var processo = getValue("WKNumProces");

    hAPI.setTaskComments(user, processo, 0, comentario);
}