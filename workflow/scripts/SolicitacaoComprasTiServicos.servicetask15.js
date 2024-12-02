function servicetask15(attempt, message) {
    //MONTA OS XMLs
    var listProduto = consultaPaiFilho(['itemProd', 'codProd', 'qtdProd', 'valorProd', 'valorTotalProd', 'valIpiProd', 'codFornVencedorProd', 'infoAdicionais']);
    var listFornecedor = consultaPaiFilho(['codForn', 'nomeForn', 'lojaForn', 'emailFornecedor', 'prazoForn', 'codCondForn', 'formaForn', 'freteFornHidden', 'valorFreForn']);

    log.info('listProduto');
    log.dir(listProduto);
    log.info('listFornecedor');
    log.dir(listFornecedor);

    for (var i = 0; i < listFornecedor.length; i++) {
        var codFornecedor = listFornecedor[i].codForn;
        var contentPedido = {
            codFornecedor: codFornecedor,
            nomeFornecedor: listFornecedor[i].nomeForn,
            loja: listFornecedor[i].lojaForn,
            emailDoFornecedor: listFornecedor[i].emailFornecedor,
            codCondPagamento: listFornecedor[i].codCondForn,
            codFormaPagamento: listFornecedor[i].formaForn,
            prazoFornecedor: listFornecedor[i].prazoForn,
            tipoFrete: listFornecedor[i].freteFornHidden,
            valorFrete: listFornecedor[i].valorFreForn,
            listProduto: []
        }
        myLog('Valor do frete: -- ', listFornecedor[i].valorFreForn)
        for (var j = 0; j < listProduto.length; j++) {
            if (codFornecedor == listProduto[j].codFornVencedorProd) {
                contentPedido.listProduto.push({
                    item: listProduto[j].itemProd,
                    codProduto: listProduto[j].codProd,
                    qtd: listProduto[j].qtdProd,
                    valor: listProduto[j].valorProd,
                    valorIpi: listProduto[j].valIpiProd,
                    totalProduto: listProduto[j].valorTotalProd,
                    infoAdicionaisComp: hAPI.getCardValue('infoAdicionaisComp'),
                    infoAdicionaisComp: listProduto[j].infoAdicionais,
                })
            }
        }
        //FAZ INTEGRAÇÃO COM PROTHEUS
        try {
            myLog('Iniciando A INTEGRAÇÃO FORNECEDOR: ', contentPedido.nomeFornecedor);
            var campoIntegracao = hAPI.getCardValue('listPedidoCompra');
            if (campoIntegracao == '') {
                campoIntegracao = '{}'
            }
            var pedidosGerados = JSON.parse(campoIntegracao);
            myLog('JSON: ', JSON.stringify(pedidosGerados));
            if (pedidosGerados[contentPedido.nomeFornecedor + "_" + contentPedido.codFornecedor] == undefined) {

                log.info("ENTREI NO IF DO pedidosGerados");
                var xmlAtual = montaXML(contentPedido);
                log.info("xmlAtual " + xmlAtual);

                if (xmlAtual != undefined) {
                    myLog('XML GERADO', xmlAtual);
                    //EMITE PEDIDO DE COMPRAS
                    var dsPedido = DatasetFactory.getDataset('ds_gerarPedidoCompra', new Array(xmlAtual), null, null);
                    var codPedido = dsPedido.getValue(0, "codigoPedido");
                    var statusRetorno = dsPedido.getValue(0, "statusRetorno");
                    myLog('RESULT PEDIDO ', codPedido);
                    if (codPedido == 'ERRO' || codPedido == null || codPedido == 'null') {
                        throw "Erro na integração. \n" + statusRetorno;
                    } else {
                        var row = i + 1;
                        myLog('NUMERO DA LINHA', row);
                        myLog('NOME FORNECEDOR', contentPedido.nomeFornecedor);
                        myLog('CODIGO FORNECEDOR', contentPedido.codFornecedor);
                        myLog('EMAIL FORNECEDOR', contentPedido.emailDoFornecedor);

                        pedidosGerados[contentPedido.nomeFornecedor + "_" + contentPedido.codFornecedor] = "" + codPedido;
                        var stringJson = JSON.stringify(pedidosGerados);
                        myLog('PEDIDOS GERADO STRING', stringJson);
                        hAPI.setCardValue('listPedidoCompra', stringJson);

                        hAPI.setCardValue('fornecedorPedido', contentPedido.nomeFornecedor);
                        hAPI.setCardValue('numeroPedido', codPedido);
                    }
                }

            }
        } catch (e) {
            throw "ERRO PARA INTEGRAR O PEDIDO DE COMPRAS. " + e;
        }
    }
}

function montaXML(contentPedido) {
    log.info("ENTREI NO montaXML");
    log.info("contentPedido.listProduto.length: " + contentPedido.listProduto.length);
    if (contentPedido.listProduto.length > 0) {
        log.info("ENTREI NO IF DO CONTENTPEDIDO");
        var modeloXML = '<PedidoCompra><Operacao><Id>1</Id></Operacao><Cabecalho></Cabecalho><Itens></Itens></PedidoCompra>';
        var xml = new XML(modeloXML);
        xml.Cabecalho.C7_FILIAL = hAPI.getCardValue("codFilial");
        xml.Cabecalho.C7_FORNECE = contentPedido.codFornecedor;
        xml.Cabecalho.C7_LOJA = contentPedido.loja;
        xml.Cabecalho.C7_COND = contentPedido.codCondPagamento;
        xml.Cabecalho.C7_EMISSAO = converteDataProtheus(getCurrentDate());
        xml.Cabecalho.C7_FILENT = hAPI.getCardValue("codFilial");
        xml.Cabecalho.C7_CONTATO = 'N.A';
        xml.Cabecalho.C7_NUM = '';
        xml.Cabecalho.C7_TPFRETE = contentPedido.tipoFrete;
        xml.Cabecalho.C7_FRETE = removeMascaraMonetaria(contentPedido.valorFrete);

        log.info("DENTRO DO CONTENTPEDIDO: " + contentPedido.listProduto.length);

        for (var i = 0; i < contentPedido.listProduto.length; i++) {
            var produtoAtual = contentPedido.listProduto[i];
            xml.Itens.Item[i] = '';
            xml.Itens.Item[i].C7_ITEM    = produtoAtual.item;
            xml.Itens.Item[i].C7_XFORPAG = contentPedido.codFormaPagamento;
            xml.Itens.Item[i].C7_PRODUTO = produtoAtual.codProduto;
            xml.Itens.Item[i].C7_QUANT   = produtoAtual.qtd;
            xml.Itens.Item[i].C7_PRECO   = removeMascaraMonetaria(produtoAtual.valor);
            xml.Itens.Item[i].C7_TOTAL   = removeMascaraMonetaria(produtoAtual.totalProduto);
            xml.Itens.Item[i].C7_ZSEQ    = Math.floor((Math.random() * 90000) + 10000) + '';
            xml.Itens.Item[i].C7_CC      = hAPI.getCardValue("codCentroCusto");
            xml.Itens.Item[i].C7_DATPRF  = converteDataProtheus(contentPedido.prazoFornecedor);
            xml.Itens.Item[i].C7_ZIDFLG  = hAPI.getCardValue("codSolicitacao");
            xml.Itens.Item[i].C7_ZMAIL   = hAPI.getCardValue("emailContatSolicitante");
            xml.Itens.Item[i].C7_ZINFADI = removeAcentos(hAPI.getCardValue('infoAdicionaisComp'));
            xml.Itens.Item[i].C7_ZLCENTR = removeAcentos(hAPI.getCardValue("localEntrega"));
            xml.Itens.Item[i].C7_OBS     = removeAcentos(produtoAtual.infoAdicionaisComp);
            xml.Itens.Item[i].C7_IPI     = calcPorcentagem(removeMascaraMonetaria(produtoAtual.totalProduto), removeMascaraMonetaria(produtoAtual.valorIpi));
            log.info("KAKAROTO IPI: " + removeMascaraMonetaria(produtoAtual.valorIpi));
        }

        log.info("XML XML XML... " + xml);

        return xml;
    }

}

function calcPorcentagem(valor, percentual) {
    if (valor > 0) {
        var valProduto = parseFloat(valor);
        var valPercentual = parseFloat(percentual);
        var vlTotal = parseFloat((valPercentual * 100) / valProduto);
        return vlTotal;
    } else {
        return 0;
    }
}