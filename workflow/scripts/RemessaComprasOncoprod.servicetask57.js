function servicetask57(attempt, message) {

    try {
        //Anexa o pedido a solicitação
        var codPedido = hAPI.getCardValue('numpedido');
        var codSolicitacao = hAPI.getCardValue('codSolicitacao');
        var codFilial = hAPI.getCardValue('codFilial');
        var relatorio = getRelatorioProtheus(codPedido, codFilial);
        if (relatorio.status == 'true') {
            log.info("ERSSIN DADOS: " + codSolicitacao + " - " + relatorio.result);
            var statusAnexo = enviaAnexoSolicitacao(codSolicitacao, ANEXA_PEDIDO, relatorio.result);
            if (statusAnexo != true) {
                throw statusAnexo + ".";
            }

        } else {
            throw "Erro para buscar o relatório do pedido de compras no Protheus \n" + relatorio.result;
        }

    } catch (e) {

        throw "Erro ao anexar pedido " + e;

    }



}
