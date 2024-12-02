function servicetask381(attempt, message) {
	
	geraContrato();
	
}


function geraContrato() {

    var index = '';
    var periodicService = ServiceManager.getService("ws_contrato");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscontrato_apw.WSCONTRATO");
    var service = serviceLocator.getWSCONTRATOSOAP();
    var objContrato = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscontrato.WSDADOSCONTRATO");

    objContrato.setAREARESPONSAVEL(hAPI.getCardValue('codAreaResponsavel'));
    objContrato.setAVISOPREVIO(hAPI.getCardValue('avisoPrevio'));
    objContrato.setCONTRATOFISICO(hAPI.getCardValue('contratoFisico'));
    objContrato.setDATAINICIO(hAPI.getCardValue('dataIniContrato'));
    objContrato.setDATAASSINATURA(hAPI.getCardValue('dataAssinaContrato'));
    objContrato.setINDICE(hAPI.getCardValue('indice'));
    objContrato.setMULTA(hAPI.getCardValue('multa'));
    objContrato.setOBJCONTRATUAL(hAPI.getCardValue('objetoContrato'));
    objContrato.setREAJUSTE(hAPI.getCardValue('reajusteContrato'));
    objContrato.setRENOVACAO(hAPI.getCardValue('renovacao'));
    objContrato.setTIPOCONTRATO(hAPI.getCardValue('codTipoContrato'));
    objContrato.setTIPOPLANILHA("999");
    objContrato.setUNIDADEVIGENCIA(hAPI.getCardValue('unidadeVigencia'));
    objContrato.setVIGENCIA(hAPI.getCardValue('vigenciaDoContrato'));
    objContrato.setEMAIL(hAPI.getCardValue('emailContatSolicitante'));
    objContrato.setIDFLUIG(hAPI.getCardValue('codSolicitacao'));
    objContrato.setNUMERORG(hAPI.getCardValue('numRgContrato'));
    objContrato.setSERVICOCRITICO(hAPI.getCardValue('servicoCritico'));
    objContrato.setNATUREZA("");

    if (hAPI.getCardValue('hideContratoGuardChuva') == "true") {
        index = hAPI.getCardValue('indiceCriacaoContrato');
        log.info(getValue('WKNumProces') + 'INDEXXX: ' + index);
        log.info("entrei21");
        log.dir(hAPI.getCardValue('valorUnitarioContrato___' + index));
        objContrato.setFILIAL(hAPI.getCardValue('codFilialContrato___' + index));
        objContrato.setVALOR(removeMascaraMonetaria(hAPI.getCardValue('valorUnitarioContrato___' + index)));
    } else {
        log.info("entrei22");
        log.dir(hAPI.getCardValue('valorTotalServico'));
        objContrato.setFILIAL(hAPI.getCardValue('codFilialFluigContrato'));
        objContrato.setVALOR(removeMascaraMonetaria(hAPI.getCardValue('valorTotalServico')));
    }

    // Para um ou mais de um fornecedor
    var campos = hAPI.getCardData(getValue("WKNumProces")).keySet().toArray();
    log.info("dadosForm");
    log.dir(campos);
    for (var f in campos) {
        field = campos[f];
        log.info("dadosForm2");
        log.dir(field);
        if (field.indexOf("fornecedorProtheusContrato___") > -1) {
            log.info("entrei no if1");
            log.dir(field);
            index2 = field.split("___")[1];
            objContrato.setCODFORNECEDOR(hAPI.getCardValue('fornecedorProtheusContrato___' + index2));
            objContrato.setCONDPAGTO(hAPI.getCardValue('codCondPagamento___' + index2));
            objContrato.setFORMAPAGAMENTO(hAPI.getCardValue('formaPagamento___' + index2));
            objContrato.setLOJFORNECEDOR(hAPI.getCardValue('codLojaFornecedor___' + index2));
        }
    }

    log.info("CONTRATO xml");
    log.dir(objContrato);

    var webService = service.wsgeracontrato(objContrato).getWSRETCONTRATO().get(0);
    log.info("Retorno do contrato");
    log.dir(webService);

    var contrato = webService.getCONTRATO();
    var mensagem = webService.getMENSAGEM();
    var sucesso = webService.getSUCESSO();

    log.info("CONTRATO : " + contrato);
    log.info("CONTRATO SUCESSO: " + sucesso);

    if (sucesso == "false") {
        log.info("MENSAGEM DE ERRO AO SALVAR OS DADOS");
        throw mensagem;
    }

    var filial = (hAPI.getCardValue('hideContratoGuardChuva') == "true") ? hAPI.getCardValue('filialGuardChu___' + index) : hAPI.getCardValue('filial');
    (hAPI.getCardValue('hideContratoGuardChuva') == "true") ? (log.info("Filial Guarda : " + filial)) : log.info("Filial sem Guarda : " + filial);

    log.info("CONTRATO FILIAL: " + filial);

    // Adiciona na tabela paiXfilho
    var childData = new java.util.HashMap();
    childData.put("numContratoProtheus", contrato);
    childData.put("filialContratoContrato", filial);
    childData.put("acessoContrato", mensagem);
    hAPI.addCardChild("tbAcessoContrato", childData);

    var indiceCriacaoContrato = parseInt(hAPI.getCardValue('indiceCriacaoContrato'));
    log.info(getValue('WKNumProces') + ' indiceCriacaoContrato ' + indiceCriacaoContrato);

    if (hAPI.getCardValue('hideContratoGuardChuva') == "true") {
        hAPI.setCardValue("indiceCriacaoContrato", indiceCriacaoContrato + 1)
        log.info('Novo indice guarda: ' + hAPI.getCardValue('indiceCriacaoContrato'));
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