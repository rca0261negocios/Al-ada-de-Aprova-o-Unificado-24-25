function afterTaskSave(colleagueId, nextSequenceId, userList) {
    var CURRENT_STATE = getValue('WKNumState');
    if (CURRENT_STATE == INICIO || CURRENT_STATE == 0 || CURRENT_STATE == CORRECAO_SOLICITANTE) {
        hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));

        //Busca os aprovadores da solicitação
        var valorTotal = hAPI.getCardValue("valorTotal")
        if (valorTotal != "") {
            var aprovadores = getAprovadores(hAPI.getCardValue("codFilialFluig"), valorTotal);
            if (aprovadores.length > 0) {
                hAPI.setCardValue('existeAlcada', 'sim');
                for (var i in aprovadores) {
                    var aprovador = aprovadores[i];
                    hAPI.setCardValue("aprovadorAlcada" + (parseInt(i) + 1), aprovador.id);
                }
                hAPI.setCardValue('aprovadorAlcadaAtual', aprovadores[0].id);
            } else {
                hAPI.setCardValue('existeAlcada', 'nao');
            }
            //Limpa os campos que não possue aprovadores
            for (var i = aprovadores.length; i < 4; i++) {
                hAPI.setCardValue("aprovadorAlcada" + (parseInt(i) + 1), '');
            }
        }
    } else if (CURRENT_STATE == VALIDACAO_CLINICA) {
        //Adiciona os motivos de reprovação nos comentarios da solicitação
        if (hAPI.getCardValue("aprovacaoClinica") == 'nao') {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, "Solicitação Reprovada pela Clínica! \n" + hAPI.getCardValue("motivoRepovacaoClinica"));
        }
    } else if (CURRENT_STATE == VALIDACAO_ONCOPROD) {
        //Adiciona os motivos de reprovação nos comentarios da solicitação
        if (hAPI.getCardValue("aprovacaoOncoprod") == 'nao') {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, "Solicitação Reprovada pela Oncoprod! \n" + hAPI.getCardValue("motivoRepovacaoOncoprod"));
        }
    } else if (CURRENT_STATE == ALCADA_APROVACAO) {
        var contadorAlcada = hAPI.getCardValue('contadorAlcada');
        //Adiciona os motivos de reprovação nos comentarios da solicitação
        if (hAPI.getCardValue("aprovacaoAlcada" + contadorAlcada) == 'nao') {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, "Solicitação Reprovada na Alçada! \n" + hAPI.getCardValue("motivoRepovacaoAlcada" + contadorAlcada));
        }
        hAPI.setCardValue('contadorAlcada', parseInt(contadorAlcada) + 1);

    } else if (CURRENT_STATE == VERIFICAR_PRODUTOS) {
        if (hAPI.getCardValue("aprovacaoCompras") == 'nao') {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, hAPI.getCardValue("motivoRepovacaoCompras"));
        }
    }
}
