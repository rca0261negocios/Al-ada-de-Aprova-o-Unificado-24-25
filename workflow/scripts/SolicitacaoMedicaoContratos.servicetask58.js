function servicetask58(attempt, message) {

    var periodicService = ServiceManager.getService("ws_medicaoContratos");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120_apw.WSCNTA120");
    var service = serviceLocator.getWSCNTA120SOAP();

    var listaProduto = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wscnta120.WSPRODSCNTA120');
    var arrayProduto = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wscnta120.ARRAYOFWSPRODCNTA120');
    var listaRateios = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wscnta120.WSRATEIOSCNTA120');
    var arrayRateio = serviceHelper.instantiate('br.com.oncoclinicas.webservices.wscnta120.ARRAYOFWSRATEIOCNTA120');

    var campos = hAPI.getCardData(getValue("WKNumProces")).keySet().toArray();
    var id;
    var produto;

    var properties = {};
    properties["log.soap.messages"] = "true";
    properties["receive.timeout"] = "300000";

    for (var x in campos) {
        var field = campos[x];
        if (field.indexOf("codProduto___") > -1) {

            id = field.split("___")[1];

            produto = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120.WSPRODCNTA120");
            produto.setCODIGO(hAPI.getCardValue("codProduto___" + id));
            produto.setQUANTIDADE(removeMascaraMonetaria(hAPI.getCardValue("quantProduto___" + id)));
            produto.setVALOR(removeMascaraMonetaria(hAPI.getCardValue("vlrUnitProduto___" + id)));
            arrayProduto.getWSPRODCNTA120().add(produto);
        }
    }

    var linhas = hAPI.getCardValue("indexRateio");
    log.info('<<<LINHAS indexRateio >>>' + linhas);

    var vlrRateio = 0
    for (var i = 1; i <= linhas; i++) {
        rateio = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120.WSRATEIOCNTA120");
        rateio.setCCUSTO(hAPI.getCardValue('cpCodCentroCustos___' + i))
        rateio.setPERC(hAPI.getCardValue('cpPercentualRateio___' + i))
        rateio.setITEM(addZero(4, i))
        rateio.setVALOR(removeMascaraMonetaria(hAPI.getCardValue('cpValorRateio___' + i)))
        vlrRateio += parseInt('' + hAPI.getCardValue('cpPercentualRateio___' + i))
        arrayRateio.getWSRATEIOCNTA120().add(rateio)
    }

    if (linhas == 0 || linhas == undefined || linhas == 'undefined') {
        rateio = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120.WSRATEIOCNTA120");
        rateio.setCCUSTO('')
        rateio.setPERC('')
        rateio.setITEM('')
        rateio.setVALOR('')
        arrayRateio.getWSRATEIOCNTA120().add(rateio)
    }

    listaProduto.setPRODUTOS(arrayProduto);
    listaRateios.setRATEIOS(arrayRateio)

        var paraincmedicao = {
            'FILIAL': hAPI.getCardValue("codFilial"),
            'CONTRATO': hAPI.getCardValue("numContrato"),
            'REVISAO': hAPI.getCardValue("revContrato"),
            'COMPETENCIA': hAPI.getCardValue("competencia"),
            'CENTROCUSTO': hAPI.getCardValue("codCentroCusto"),
            'FORNECEDOR': hAPI.getCardValue("codFornecedor"),
            'LOJA': hAPI.getCardValue("lojFornecedor"),
            'listaProduto': listaProduto,
            'listaRateios': listaRateios,
            'FLUIG': getValue("WKNumProces") + ""
        }

        log.info(getValue("WKNumProces") + 'parametros indo para wsincmedicao')
        log.dir(paraincmedicao);

        var resultObj = service.wsincmedicao(
            hAPI.getCardValue("codFilial"),
            hAPI.getCardValue("numContrato"),
            hAPI.getCardValue("revContrato"),
            hAPI.getCardValue("competencia"),
            hAPI.getCardValue("cpCodCentroCustosAprov"),
            hAPI.getCardValue("codFornecedor"),
            hAPI.getCardValue("lojFornecedor"),
            listaProduto,
            listaRateios,
            getValue("WKNumProces") + ""
        );

    var result = resultObj.getWSRETCNTA120().get(0);
    var sucesso = result.getSUCESSO();
    var mensagem = result.getMENSAGEM();
    var pedido = result.getPEDIDO();
    var medicao = result.getMEDICAO();

    hAPI.setCardValue("obsMedicao", mensagem);

    if (sucesso == "false") {
        throw "Erro ao realizar a integração com o Protheus. \n" + mensagem
    } else {
        hAPI.setCardValue("medicao", medicao);
        hAPI.setCardValue("pedidoMedicao", pedido);
    }
}

function removeMascaraMonetaria(mask) {
    if (mask != undefined) {
        mask = mask.replace('R$', '');
        mask = mask.replace(' ', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}

function addZero(quantidade, numero) {
    numero = numero.toString()
    for (var i = numero.length; i < quantidade; i++) {
        numero = "0" + numero
    }
    return numero;
}