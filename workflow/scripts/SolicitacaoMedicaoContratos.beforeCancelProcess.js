function beforeCancelProcess(colleagueId,processId){  
    var ATIVIDADE_ATUAL = getValue("WKNumState");
    if (ATIVIDADE_ATUAL == 27  || 
        ATIVIDADE_ATUAL == 29  ||
        ATIVIDADE_ATUAL == 151 ||
        ATIVIDADE_ATUAL == 156 
        ) { 
        throw 'Voce não pode finalizar a solicitação nesta atividade, favor solicitar o cancelamento da medição para o setor responsável: contratos e fiscal, anexar as evidencias e finalizar o processo corretamente.';
    }else{
        cancelaRateio();
    }
}

function cancelaRateio() {

    var periodicService = ServiceManager.getService("ws_medicaoContratos");
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.webservices.wscnta120_apw.WSCNTA120");
    var service = serviceLocator.getWSCNTA120SOAP();

    log.info(getValue("WKNumProces") + 'parametros indo para wsestmedicao')
    log.info('COD_FILIAL: ' + hAPI.getCardValue("codFilial") + 'MEDICAO: ' + hAPI.getCardValue("medicao"));

    var resultObj = service.wsestmedicao(hAPI.getCardValue("codFilial"), hAPI.getCardValue("medicao"));

    var result = resultObj.getWSRETCNTA120().get(0);
    var sucesso = result.getSUCESSO();
    var mensagem = result.getMENSAGEM();

    hAPI.setCardValue("obsMedicao", mensagem);

    if (sucesso == "false") {
        throw "Erro ao realizar a integração com o Protheus. \n" + mensagem
    }
};