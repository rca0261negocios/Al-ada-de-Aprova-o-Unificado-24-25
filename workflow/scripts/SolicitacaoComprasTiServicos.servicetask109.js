function servicetask109(attempt, message) {
    myLog("SERVICO DE ANEXO");
    myLog("CAMPO PEDIDO: ", hAPI.getCardValue('listPedidoCompra'));
    if (hAPI.getCardValue('listPedidoCompra') == '') {

        throw "Nenhum pedido de compra encontrado no fluig para anexar."

    } else {
        var pedidosGerados = JSON.parse(hAPI.getCardValue('listPedidoCompra'));
        for (var nomeFornecedor in pedidosGerados) {

            log.info("ENTREI NO FOR DO pedidosGerados: " + pedidosGerados);
            if (!existeAnexoByName("Pedido_Compras_" + nomeFornecedor + ".pdf")) {

                log.info("ENTREI NO IF DA NEGATIVA existeAnexoByName: " + nomeFornecedor);
                anexaPdfFluig(pedidosGerados[nomeFornecedor], nomeFornecedor);
            }
        }
    }
}

function anexaPdfFluig(codPedido, nomeFornecedor) {
    //BUSCA O ANEXO DO PEDIDO
    var codSolicitacao = hAPI.getCardValue('codSolicitacao');
    var codFilial = hAPI.getCardValue('codFilial');
    var resultPdfProtheus = getPdfPedidoProtheus(codPedido, codFilial);
    myLog('RESULT PDF ', resultPdfProtheus.result);
    if (resultPdfProtheus.status != 'true') {
        throw "Erro para buscar o realtório do pedido de compras no Protheus \n" + resultPdfProtheus.result;
    } else {
        myLog("PARM ENVIA ANEXO: ", codSolicitacao + nomeFornecedor);
        //ENVIA O ANEXO PARA O FLUIG
        var statusAnexo = enviaAnexoSolicitacao(codSolicitacao, anexaSolicitacao, resultPdfProtheus.result, nomeFornecedor + " - " + codFilial + " - " + codPedido);
        myLog('RESULT ANEXO FLUIG ', statusAnexo);
        if (statusAnexo != true) {
            throw statusAnexo + ".";
        } else {
            myLog("PEDIDO GERADO: ", codPedido);
        }
    }
}

function existeAnexoByName(nomeAnexo) {
    var attachments = hAPI.listAttachments();
    var existeAnexo = false;
    var nomePossivelAnexo = nomeAnexo;
    for (var i = 0; i < attachments.size(); i++) {
        var attachment = attachments.get(i);
        if (attachment.getDocumentDescription() == nomePossivelAnexo) {
            existeAnexo = true;
        }
    }
    return existeAnexo;
}