function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    GETSLA()
    var ATIVIDADE_ATUAL = getValue('WKNumState');

    if (ATIVIDADE_ATUAL == inicio || ATIVIDADE_ATUAL == 0 || ATIVIDADE_ATUAL == 1 || ATIVIDADE_ATUAL == correcaoSolicitante) {
        var tipoCompra = hAPI.getCardValue('tipoCompra');
        var prioridade = hAPI.getCardValue('prioridadeHidden');
        if (prioridade == 'E') {
            if (tipoCompra == '1') {
                hAPI.setCardValue("COD_SOLICITACAO", '2417719'); //2416905
            } else if (tipoCompra == '2') {
                hAPI.setCardValue("COD_SOLICITACAO", '2417779'); // 2417781
            } else if (tipoCompra == '3') {
                hAPI.setCardValue("COD_SOLICITACAO", '2416942'); //2416906
            } else {
                hAPI.setCardValue("COD_SOLICITACAO", '2417785'); //2417786
            }

            GETSLA()
        }
    }

    if (ATIVIDADE_ATUAL == anexaSolicitacao) {
        // Enviando a qtde de arquivos anexados de pedidos de compras para o campo "anexos".
        var anexo = hAPI.listAttachments();
        hAPI.setCardValue("anexos", hAPI.listAttachments().size());
    }

    if (ATIVIDADE_ATUAL == analiseCompradorCotacao) {
        var qtdAnexos = hAPI.listAttachments();
        if (hAPI.getCardValue("correcaoSolicitacao") != "true") {
            if (qtdAnexos.size() < hAPI.getCardValue("hiddenQtdCotacoes")) {
                throw "É obrigatório anexar as " + hAPI.getCardValue("hiddenQtdCotacoes") + " cotações realizadas.";
            }
            if (hAPI.getCardValue("hiddenChkMinutaContrato") == "true") {
                if (qtdAnexos.size() < parseInt(hAPI.getCardValue("hiddenQtdCotacoes")) + 1) {
                    throw "É obrigatório anexar a minuta do fornecedor.";
                }
            }
            // Se o tipo de Contrato for Novo exige-se no mínimo 4
            if (hAPI.getCardValue("hideNovoContratoOuAdt") == "false" && qtdAnexos < 4) {
                throw "É preciso anexar no minimo 4 arquivos nesta atividade para continuar o processo!";
            }
            // Se o tipo de Contrato for Aditivo exige-se no mínimo 5
            if (hAPI.getCardValue("hideNovoContratoOuAdt") == "true") {
                if ((hAPI.getCardValue("hideAnexoAditivos") == "false" || hAPI.getCardValue("hideAnexoAditivos") == "") && qtdAnexos < 4) {
                    throw "É preciso anexar no mínimo 4 arquivos nesta atividade para continuar o processo!";
                }
                if (hAPI.getCardValue("hideAnexoAditivos") == "true" && qtdAnexos < 5) {
                    throw "É preciso anexar no mínimo 5 arquivos nesta atividade para continuar o processo!";
                }
            }
        }

    }
}