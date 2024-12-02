function Anexo() {

}

/**
 *Envia anexo para uma solicitação
 *@codSolicitacao - Codigo da solicitção
 *@atividade - número da atividade em que será anexado o documento
 *@anexoB64 - Arquivo convertido em base64
 **/
function enviaAnexoSolicitacao(codSolicitacao, atividade, anexoB64, nomeFornecedorComp) {
    log.info("KAKAROTO INICIO DO ANEXO");
    // Obtém a instância do serviço 'WorkflowEngineService'
    var nomeFornecedor = removeCaracteres(nomeFornecedorComp);
    var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
    var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
    var processAttachmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
    var attachment = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
    var keyValueDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.KeyValueDto');
    var keyValueDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.KeyValueDtoArray');
    var processTaskAppointmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDto');
    var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
    var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

    stringArray.getItem().add("15joqaztn156s2hg1491851925301")
    processAttachmentDto.setAttachmentSequence(1);
    processAttachmentDto.setCompanyId(1);
    processAttachmentDto.setFileName("Pedido_Compras_" + nomeFornecedor + ".pdf");
    processAttachmentDto.setDescription("Pedido_Compras_" + nomeFornecedor + ".pdf");
    processAttachmentDto.setNewAttach(true);
    processAttachmentDto.setVersion(1000);
    attachment.setAttach(true);
    attachment.setFileName("Pedido_Compras_" + nomeFornecedor + ".pdf");
    attachment.setFilecontent(java.util.Base64.getDecoder().decode(new java.lang.String(anexoB64).getBytes("UTF-8")));
    processAttachmentDto.getAttachments().add(attachment);
    processAttachmentDtoArray.getItem().add(processAttachmentDto);

    var idIntegrador = 'imwn2dyhbuywfa0f1522083830483';
    if (hAPI.getCardValue('ambiente') == 'devTst') {
        log.info("KAKAROTO ambiente dev");
        idIntegrador = 'imwn2dyhbuywfa0f1522083830483';
    }
    // Instancia o serviço
    var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate("br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService");
    var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
    var servico = workflowEngineService.saveAndSendTaskClassic("integrador.fluig@oncoclinicas.com",
        "hUbust*7",
        1,
        parseInt(codSolicitacao),
        parseInt(atividade),
        stringArray,
        "",
        idIntegrador,
        false,
        processAttachmentDtoArray,
        keyValueDtoArray,
        processTaskAppointmentDtoArray,
        true,
        0);

    //Verifica erro na integração do anexo
    for (var i = 0; i < servico.getItem().size(); i++) {
        log.info("KAKAROTO result: " + servico.getItem().get(i).getKey() + " - " + servico.getItem().get(i).getValue());
        if (servico.getItem().get(i).getKey() == "ERROR") {
            return "Erro para anexar o arquivo. - " + servico.getItem().get(i).getValue();
        }
    }

    return true;
}

//Busca o relatório pdf no Protheus
function getPdfPedidoProtheus(codPedido, codFilial) {
    var c1 = DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('PEDIDO', codPedido, codPedido, ConstraintType.MUST);
    var ds_relatorio = DatasetFactory.getDataset('ds_pdfPedidoCompra', null, [c1, c2], null);
    if (ds_relatorio.getValue(0, "SUCESSO") == "true") {
        return {
            'status': 'true',
            'result': ds_relatorio.getValue(0, "PDF")
        }
    } else {
        return {
            'status': 'false',
            'result': ds_relatorio.getValue(0, "DESCRICAO")
        }
    }
}

function removeCaracteres(string) {
    string = string.split("/").join("");
    string = string.split("|").join("");
    string = string.split("<").join("");
    string = string.split(">").join("");
    string = string.split("*").join("");
    string = string.split(":").join("");
    string = string.split("“").join("");
    return string;
}