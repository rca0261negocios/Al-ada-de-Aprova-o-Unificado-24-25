function servicetask198(attempt, message) {

    var properties = {};
    properties["log.soap.messages"] = "true";
    properties["receive.timeout"] = "300000";

    var arrayCampos = [];
    var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
    var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
    var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
    var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
    var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
    var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
    var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray'); 
    stringArray.getItem().add("imwn2dyhbuywfa0f1522083830483"); 

    arrayCampos.push(["nomeSolic", hAPI.getCardValue("solicitante") + ""]);
    arrayCampos.push(["codSolic", hAPI.getCardValue("idSolicitante") + ""]);
    arrayCampos.push(["emailSolic", hAPI.getCardValue("emailSolicitante") + ""]);
    arrayCampos.push(["dataSolicitacao", dataHoraFluig()]);
    arrayCampos.push(["solicOrigem", hAPI.getCardValue("codSolicitacao") + ""]);
    arrayCampos.push(["nomeFilial", hAPI.getCardValue("nomeFilial") + ""]);
    arrayCampos.push(["cnpjFilial", hAPI.getCardValue("cnpjFilial") + ""]);
    arrayCampos.push(["codFilial", hAPI.getCardValue("codFilial") + ""]);
    arrayCampos.push(["nomeFornecedor", hAPI.getCardValue("nomeFornecedor") + ""]);
    arrayCampos.push(["cnpjFornecedor", hAPI.getCardValue("cnpjFornecedor") + ""]);
    arrayCampos.push(["codFornecedor", hAPI.getCardValue("codFornecedor") + ""]);
    arrayCampos.push(["lojFornecedor", hAPI.getCardValue("lojFornecedor") + ""]);
    arrayCampos.push(["dataEmissao", hAPI.getCardValue("emissaoNota") + ""]);
    arrayCampos.push(["valTotalBruto", hAPI.getCardValue("valorTotalMedicao") + ""]);
    arrayCampos.push(["numDocumento", hAPI.getCardValue("notaFiscal") + ""]);
    arrayCampos.push(["serie", hAPI.getCardValue("serieNF") + ""]);
    arrayCampos.push(["numContrato", hAPI.getCardValue("numContrato") + ""]);
    arrayCampos.push(["zoomCompetencia", hAPI.getCardValue("zoomCompetencia") + ""]);
    arrayCampos.push(["zoomCentroCusto", hAPI.getCardValue("zmCentroCustosAprov") + ""]);
    arrayCampos.push(["codCentroCusto", hAPI.getCardValue("cpCodCentroCustosAprov") + ""]);
    arrayCampos.push(["descricaoSolic", hAPI.getCardValue("justCentral") + ""]);
    arrayCampos.push(["valorTotalItem", hAPI.getCardValue("valorTotalMedicao") + ""]);

    var campos = hAPI.getCardData(getValue("WKNumProces")).keySet().toArray();
    var id;

    for (var x in campos) {
        var field = campos[x];
        if (field.indexOf("quantProduto___") > -1) {
            id = field.split("___")[1];
            arrayCampos.push(["zoomProduto___" + id, hAPI.getCardValue("descProduto___" + id) + ""]);
            arrayCampos.push(["codItemProtheus___" + id, hAPI.getCardValue("codProduto___" + id) + ""]);
            arrayCampos.push(["qtdItem___" + id, hAPI.getCardValue("quantProduto___" + id) + ""]);
            arrayCampos.push(["vlrUniItem___" + id, hAPI.getCardValue("vlrUnitProduto___" + id) + ""]);
            arrayCampos.push(["vlrTotalItem___" + id, hAPI.getCardValue("vlrTotalProduto___" + id) + ""]);
        }
    } 
 
    for (var index = 0; index < arrayCampos.length; index++) {
        var campoValor = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        var campoX = arrayCampos[index][0]
        var valorX = arrayCampos[index][1]
 
        campoValor.getItem().add(campoX);
        campoValor.getItem().add(valorX);
        cardData.getItem().add(campoValor);
    }
    log.info("--- arrayCampos V360 AVALIACAO FORNECEDOR ---")
    log.dir(arrayCampos)
 
    var rest = workflowEngineService.startProcess(
        "integrador.fluig@oncoclinicas.com",
        "hUbust*7",
        1,
        "avaliacaoDeFornecedor",
        4,
        stringArray,
        "Iniciado automaticamente pelo fluxo Medição de Contratos, " + getValue("WKNumProces"),
        hAPI.getCardValue("codGestAvalia"),
        false,
        processAttachmentDtoArray,
        cardData,
        processTaskAppointmentDtoArray,
        true);
 
    var iProcess = "";
    var error = "";
    for (var j = 0; j < rest.getItem().size(); j++) {
        var item = rest.getItem().get(j).getItem();
        var key = item.get(0);
        var value = item.get(1);
        if (key == "iProcess") {
            iProcess = value;
        }
        if (key == "ERROR") {
            error = value;
        }
    }

    if(error != ""){
        throw "Erro na abertura da solicitacao: " + error;
    }else{
        hAPI.setCardValue('codAvaliaForn', iProcess)    
        hAPI.setTaskComments("imwn2dyhbuywfa0f1522083830483", getValue("WKNumProces"), 0, 'Iniciado processo: ' + iProcess);  
    }  
       
}

function dataHoraFluig(){
    dataHoje = java.util.Calendar.getInstance().getTime(); 
    var dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
    var formatdata = dateFormat.format(dataHoje);
    var array = formatdata.split(" ");
    var arrayData = array[0].split("-");
    var ano = arrayData[0]; 
    var mes = arrayData[1];
    var dia = arrayData[2];

    dataFluig = dia + "/" + mes + "/" + ano + " " + array[1];

    return dataFluig;

}

