function beforeStateEntry(sequenceId) {
    if (sequenceId == exclusivoCorrigirSolicitacao) {
        hAPI.setCardValue("setRespCompras", hAPI.getCardValue("idComprador"));
    }

    /* ALTERADO PARA RETRANSFERIR A ATIVIDADE DE COTAÇÃO PARA OUTRA PESSOA DO GRUPO COMPRAS DIVERSOS APÓS MOVIMENTAR */
    if (sequenceId == analiseCompradorCotacao) {
        hAPI.setCardValue("setRespCompras", "Pool:Group:CD");
    }
}