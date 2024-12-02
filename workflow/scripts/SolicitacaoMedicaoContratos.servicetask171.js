function servicetask171(attempt, message) {

    var periodicService = ServiceManager.getService("OncoclinicasMatrizFiscal");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsmatrizfiscal_apw.WSMATRIZFISCAL");
    var service = serviceLocator.getWSMATRIZFISCALSOAP();

    var prenota = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wsmatrizfiscal.WSDADOSPRENOTA");

    prenota.setFORNECEDOR(hAPI.getCardValue("codFornecedor"));
    prenota.setFILIAL(hAPI.getCardValue("codFilial"));
    prenota.setLOJA(hAPI.getCardValue("lojFornecedor"));
    prenota.setNUMERO(hAPI.getCardValue('notaFiscal'));
    prenota.setSERIE(normalizeString(hAPI.getCardValue('serieNF')));

    log.info('Processo ' + getValue("WKNumProces"));
    log.info('Objeto para wsclassificamatrizfiscal');
    log.dir(prenota);

    var integracao = service.wsclassificamatrizfiscal(prenota);

    var retorno = integracao.getWSRETMATRIZFISCAL().get(0)


    if (retorno.getSUCESSO() != true &&
        retorno.getSUCESSO() != 'true') {

        throw 'Não Foi possivel classificar automaticamente essa nota, favor verificar a Matriz fiscal!!!\n' + retorno.getMENSAGEM()

    }

}