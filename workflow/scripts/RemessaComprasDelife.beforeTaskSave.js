function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    var CURRENT_STATE = getValue('WKNumState');
    GETSLA()
    if (CURRENT_STATE == 0 ||
        CURRENT_STATE == AtividadeEnum.INICIO) {
        preencherIdentificador();
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
    }

    if (hAPI.getCardValue("qtdAnexos") != "true" &&
        CURRENT_STATE == AtividadeEnum.ANEXAR_NF &&
        getValue("WKCompletTask") == "true") {
        var tbProd = consultaPaiFilho(["cpfPaciente"]);
        var tbCpfUnicos = [];
        for (var i = 0; i < tbProd.length; i++) {
            var achouCPF = false;
            for (var j = 0; j < tbCpfUnicos.length; j++) {
                if (tbProd[i].cpfPaciente == tbCpfUnicos[j]) {
                    achouCPF = true;
                }
            }
            if (!achouCPF) {
                tbCpfUnicos.push(tbProd[i].cpfPaciente);
            }
        }
        if (verificaAnexo(tbCpfUnicos.length)) {
            throw "<br><br><b>Atenção:</b> É necessário que seja anexado um comprovante de entrega para cada paciente.";
        }
    }
}