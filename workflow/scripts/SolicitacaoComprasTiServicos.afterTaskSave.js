function afterTaskSave(colleagueId, nextSequenceId, userList) {
 
    var ATIVIDADE_ATUAL = getValue('WKNumState');

    hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
    hAPI.setCardValue("hiddenQtdAnexos", hAPI.listAttachments().size());
    
    // inicio Atividades de contrato
    
    if (ATIVIDADE_ATUAL == ALCADA_APROVACAO) {
        var proximaAlcada = parseInt(hAPI.getCardValue("nivelAtualAprovacao")) + 1;
        hAPI.setCardValue("nivelAtualAprovacao", proximaAlcada)
    }
    
    // fim Atividades de contrato
    
    if (ATIVIDADE_ATUAL == analiseCompradorCotacao) {
        //Adiciona os motivos de reprovação nos comentarios da solicitação
        if (hAPI.getCardValue("correcaoSolicitacao") == "true") {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"),
                0, "Solicitação reprovada pelo Comprador! \n" + hAPI.getCardValue("motivoAnaliseComprador"));
        }

    }

    if ((nextSequenceId == 11 || nextSequenceId == '11') && hAPI.getCardValue("decisaoSolicitante") != "sim") {
        notificacaoEncerramento(hAPI.getCardValue("emailSolicitante"), hAPI.getCardValue("nomeSolicitante"));
    }

    if (ATIVIDADE_ATUAL == alcadaAprovacaoCarta) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcadaCarta")) + 1;
        hAPI.setCardValue("contadorAlcadaCarta", proximaAlcada);
    }
    if (ATIVIDADE_ATUAL == 7) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcada")) + 1;
        hAPI.setCardValue("contadorAlcada", proximaAlcada);
    }
    if (ATIVIDADE_ATUAL == alcadaAprovacaoPA) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcadaPA")) + 1;
        hAPI.setCardValue("contadorAlcadaPA", proximaAlcada);
    }
}

function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array();
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}