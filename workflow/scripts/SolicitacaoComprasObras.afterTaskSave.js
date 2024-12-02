function afterTaskSave(colleagueId, nextSequenceId, userList) {

    if ((nextSequenceId == 81 || nextSequenceId == '81') && hAPI.getCardValue("rdAprovadoSolicitante") != "aprov") {

        notificacaoEncerramento(hAPI.getCardValue('emailSolicitante'), hAPI.getCardValue('txtNmRequisitante'))

    }

    var currentId = getValue("WKNumState");
    if (nextSequenceId == 12 || nextSequenceId == 13) {
        preencherIdentificador();
    }
}

function preencherIdentificador() {
    var prioridade = hAPI.getCardValue("hiddenPrioridadeSolicitacao");

    var unidade = hAPI.getCardValue("hiddenFilial");
    var dataInicial = hAPI.getCardValue("dtEmissao");
    var outrosParam = [];

    // outrosParam.push(hAPI.getCardValue("hiddenTipoProdSolicitacao"));
    outrosParam.push(hAPI.getCardValue("hiddenTipoProduto"));

    var identificador = new objIdentificador(prioridade, unidade, dataInicial,
        outrosParam);

}

function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array()
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}