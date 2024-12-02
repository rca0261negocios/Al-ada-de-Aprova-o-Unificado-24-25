function servicetask10(attempt, message) {
    try {
        var periodicService = ServiceManager.getService("OncoclinicasCriacaoTitulos");
        var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.FSWSP001Locator");
        var service = serviceLocator.getFSWSP001SOAP();

        var cabecalho = gerarCabecalhoXML(getValue("WKNumState"));
        if (hAPI.getCardValue('cpTipoSolicitacao') == 'gds') {
            var itens = gerarItensXmlGds()
        } else {
            var itens = gerarItensXmlReg()
        }

        var prenota = cabecalho + itens
        hAPI.setCardValue('cpXML', prenota)

        if (hAPI.getCardValue('cpTipoNota') == '2') {
            log.info('<<<INTEGRACAO NOTA>>>');
            var webService = service.WSINTNF(prenota);

        } else {
            log.info('<<<INTEGRACAO PRE_NOTA>>>');
            var webService = service.WSINTPNF(prenota);
        }

        var mensagem = webService.getMENSAGEM();
        var retorno = webService.getRETORNO();

        if (retorno == 1 || retorno == 2) {
            hAPI.setCardValue("cpXML", prenota);
            // simulaMatrizFiscal()
        } else {
            hAPI.setCardValue("cpXML", prenota);
            throw mensagem + ' || ' + prenota
        }
    } catch (error) {

        var cabecalho = gerarCabecalhoXML(getValue("WKNumState"));
        if (hAPI.getCardValue('cpTipoSolicitacao') == 'gds') {
            var itens = gerarItensXmlGds()
        } else {
            var itens = gerarItensXmlReg()
        }

        throw error + '||' + cabecalho + itens;

    }

}

function simulaMatrizFiscal() {
    var numeroSolicitacao = getValue("WKNumProces");
    hAPI.setCardValue('cpCodSolicitacao', numeroSolicitacao)

    var periodicService = ServiceManager.getService("OncoclinicasMatrizFiscal");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsmatrizfiscal_apw.WSMATRIZFISCAL");
    var service = serviceLocator.getWSMATRIZFISCALSOAP();

    var prenota = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsmatrizfiscal.WSDADOSPRENOTA");

    prenota.setFORNECEDOR(hAPI.getCardValue("cpCodFornecedor"))
    prenota.setFILIAL(hAPI.getCardValue("cpCodFilial"))
    prenota.setLOJA(hAPI.getCardValue("cpLojaFornecedor"))
    prenota.setNUMERO(hAPI.getCardValue('cpNumNota'))
    prenota.setSERIE(normalizeString(hAPI.getCardValue('cpSerieNota')))

    var integracao = service.wssimulamatrizfiscal(prenota);

    var retorno = integracao.getWSRETMATRIZFISCAL().get(0)

    if (!(retorno.getSUCESSO() == true || retorno.getSUCESSO() == 'true')) {

        hAPI.setCardValue('cpLogMatriz', retorno.getMENSAGEM())
        hAPI.setCardValue('cpMatriz', retorno.getSUCESSO());

    } else {

        hAPI.setCardValue('cpMatriz', retorno.getSUCESSO())
    }


}