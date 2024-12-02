function beforeCancelProcess(colleagueId, processId) {
    var periodicService = ServiceManager.getService("OncoclinicasCriacaoTitulos");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.FSWSP001Locator");
    var service = serviceLocator.getFSWSP001SOAP();

    var cabecalho = gerarCabecalhoXML(1);
    if (hAPI.getCardValue('cpTipoSolicitacao') == 'gds') {
        var itens = gerarItensXmlGds()
    } else {
        var itens = gerarItensXmlReg()
    }

    var webService = service.WSINTPNF(cabecalho + itens);
    var mensagem = webService.getMENSAGEM();
    var retorno = webService.getRETORNO();
}