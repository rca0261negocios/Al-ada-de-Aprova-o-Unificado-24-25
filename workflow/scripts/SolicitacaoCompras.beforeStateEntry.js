var LISTA_APROVADORES_DOM = getAprovadoresDom();

function beforeStateEntry(sequenceId) {

    populaCamposHiddenAnalytics(sequenceId);

    var ATIVIDADE_FIM = 94;
    var ATIVIDADE_TERMINO_APROVACAO = 141;
    var currentState = parseInt(getValue("WKNumState"));
    var NUMPROC = getValue("WKVersDef");
    var EMITIR_PEDIDO_COMPRA = 10;
    var PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE = 39;
    var ANEXAR_MINUTA = 42;
    var E_CONTRATO = 86;
    var EXC_APROVACAO = 117;
    var PARECER_SOLICITANTE = 149;
    var F = 189;
    var EXCLUSIVO_ALCADA_APROVADA = 191;
    var VERIFICA_TIPO_APROVACAO = 211;
    var APROVACAO_AUTOMATICA = 209;

    var isMobile = getValue("WKMobile");
    var eContrato = hAPI.getCardValue("rdContrato");

    if (NUMPROC >= 26 &&
        (sequenceId == PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE || (sequenceId == EXC_APROVACAO && eContrato == "nao"))) {
        validaAnexo();
    }

    if (sequenceId == SOLUCAO_INCONSISTENCIA &&
        sequenceId != buscarAtividadeAtual()) {
        // solucao da inconsistencia
        incrementaNrReprovacoes();
    }

    if (currentState == 4 && sequenceId == 6) {
        var xml = hAPI.getCardValue("xmlDadosFornecedores");
        if (xml != "") {
            if (xml != "false") {
                var processoCriados = parseFornecedores(xml);
            }
        }
    }

    if (sequenceId == 4) {
        aglutinarSolicitacoes();
    }


    if (sequenceId == 43) {
        var nProcess = getValue("WKNumProces");
        var processId = DatasetFactory.createConstraint(
            "processAttachmentPK.processInstanceId", nProcess, nProcess,
            ConstraintType.MUST);
        var companyId = DatasetFactory.createConstraint(
            "processAttachmentPK.companyId", getValue("WKCompany"),
            getValue("WKCompany"), ConstraintType.MUST);

        // Define os campos para ordenação
        var sortingFields = new Array("originalMovementSequence");

        var attach = DatasetFactory.getDataset("processAttachment", null,
            new Array(processId, companyId), sortingFields);

        var formId = getValue("WKCardId");

        var ultimoMovimento = 0;
        var qtdAnexoMov = 0;

        var movimentoCurr = 0;

        for (var j = 0; j < attach.rowsCount; j++) {
            movimentoCurr = attach.getValue(j, "originalMovementSequence");
            if (movimentoCurr != ultimoMovimento) {
                ultimoMovimento = movimentoCurr;
                qtdAnexoMov = 0;
            }
            if (attach.getValue(j, "documentId") != formId) {
                qtdAnexoMov = qtdAnexoMov + 1;
            }

        }
    }

    if (sequenceId == 44) {
        var nProcess = getValue("WKNumProces");
        var processId = DatasetFactory.createConstraint(
            "processAttachmentPK.processInstanceId", nProcess, nProcess,
            ConstraintType.MUST);
        var companyId = DatasetFactory.createConstraint(
            "processAttachmentPK.companyId", getValue("WKCompany"),
            getValue("WKCompany"), ConstraintType.MUST);

        // Define os campos para ordenação
        var sortingFields = new Array("originalMovementSequence");

        var attach = DatasetFactory.getDataset("processAttachment", null,
            new Array(processId, companyId), sortingFields);

        var formId = getValue("WKCardId");

        var ultimoMovimento = 0;
        var qtdAnexoMov = 0;
        var movimentoCurr = 0;

        for (var j = 0; j < attach.rowsCount; j++) {
            movimentoCurr = attach.getValue(j, "originalMovementSequence");
            if (movimentoCurr != ultimoMovimento) {
                ultimoMovimento = movimentoCurr;
                qtdAnexoMov = 0;
            }

            if (attach.getValue(j, "documentId") != formId) {

                qtdAnexoMov = qtdAnexoMov + 1;
            }
        }

        if (qtdAnexoMov == 0) {
            throw "É necessário anexar contrato assinado!";
        }
    }

    //Seta os dados do próximo aprovador.
    if (sequenceId == 189) {
        LISTA_APROVADORES_DOM = getAprovadoresDom();
        var numProximaAlcada = parseInt(hAPI.getCardValue("contadorAlcada")) + 1;
        if (numProximaAlcada <= LISTA_APROVADORES_DOM.length) { //garante a existencia da proxima alcada
            aprovaAlcada(numProximaAlcada, LISTA_APROVADORES_DOM, false);
        }
    }

}


function dateFormat(date) {
    var mes = parseInt(date.getMonth()) + 1;
    mes = (mes < 10) ? "0" + mes : mes;
    return date.getDate() + "/" + mes + "/" + date.getFullYear();
}



function parseFornecedores(xml) {

    var arrayRetornoFornecedores = new Array();
    var parser = new org.json.XML.toJSONObject(xml);
    var root = parser.get("Empresas"); // root
    var processoCriados = "";

    if (root.has("Empresa")) {

        var datasetMunicipios = consultaMunicipios(xml);
        var fornecedores = root.get("Empresa");

        if (fornecedores.getClass() == org.json.JSONArray) {
            // array
            for (var i = 0; i < fornecedores.length(); i++) {
                var fornecedor = fornecedores.get(i);
                var iProcess = iniciaCadastroFornecedor(fornecedor,
                    datasetMunicipios);
                if (processoCriados == "") {
                    processoCriados = iProcess;
                } else {
                    processoCriados = processoCriados + ", " + iProcess;
                }
            }
        } else {
            // objeto
            var iProcess = iniciaCadastroFornecedor(fornecedores,
                datasetMunicipios);
            processoCriados = iProcess;
        }
    }
    return processoCriados;
}

function tiraEspacoesEmBranco(palavra) {
    while (palavra.indexOf(" ") > -1) {
        palavra = palavra.replace(" ", "");
    }

    return palavra;
}

function consultaMunicipios(xml) {
    var arrayRetornoFornecedores = new Array();
    var parser = new org.json.XML.toJSONObject(xml);
    var root = parser.get("Empresas"); // root
    var queryCidades = "";

    if (root.has("Empresa")) {
        var fornecedores = root.get("Empresa");
        if (fornecedores.getClass() == org.json.JSONArray) {
            // array
            for (var i = 0; i < fornecedores.length(); i++) {
                var cidade = fornecedores.get(i).has("Cidade") ? fornecedores
                    .get(i).getString("Cidade") : "";
                // "+cidade);
                if (cidade != "") {
                    cidade = formataNomeCidade(cidade);
                    if (queryCidades == "") {
                        queryCidades = "CC2_MUN = '" + cidade + "'";
                    } else {
                        queryCidades = queryCidades + " OR CC2_MUN = '" +
                            cidade + "'";
                    }
                }
            }
        } else {
            // objeto
            var cidade = fornecedores.has("Cidade") ? fornecedores
                .getString("Cidade") : "";
            if (cidade != "") {
                cidade = formataNomeCidade(cidade);
                queryCidades = "CC2_MUN = '" + cidade + "'";

            }
        }

    }

    var municipios = DatasetFactory.getDataset("consultaDadosProtheus", [
        "CC2", queryCidades, "CC2_CODMUN,CC2_MUN"
    ], null, null);
    return municipios.values;
}

function formataNomeCidade(palavra) {
    var nova = "";
    var com_acento = "??????????????????????????????????????????????";
    var sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
    nova = "";
    for (var i = 0; i < ("" + palavra).length; i++) {
        if (com_acento.indexOf(palavra.substr(i, 1)) >= 0)
            nova += sem_acento.substr(com_acento.indexOf(palavra.substr(i, 1)),
                1);
        else
            nova += palavra.substr(i, 1);
    }

    nova = nova.toUpperCase();

    return nova;
}

function validaAnexo() {
    var teveNegociacao = hAPI.getCardValue("rdTeveNegociacao");

    if (teveNegociacao == "sim") {
        var verificarAnexo = new checkAnexo();
        verificarAnexo.executar("comprovante de valor negociado");
    }
}

/**
 * Envia email somente conhecimento
 * @param numeroAlcada O numero da alçada aprovada automaticamente
 * @param responsavelAlcada Número da matricula(Id) do responsavel pela alçada
 */
function enviaEmailSomenteConhecimento(numeroAlcada, responsavelAlcada) {
    var data = buscaDadosEmail();
    var sender = "4s2f7mmb7dfs64qv1452799368975";
    try {
        //Parametros de envio
        var parameters = new java.util.HashMap();
        parameters.put("subject",
            "Notifica\u00E7\u00E3o de Tratativa de Pesquisa de Satisfa\u00E7\u00E3o - " +
            String(getValue("WKNumProces")));
        parameters.put("INSTANCE_ID", String(getValue("WKNumProces")));
        parameters.put("TYPE", getType());
        parameters.put("subject", "Aprovação automática de Alçada - " + String(getValue("WKNumProces")));
        parameters.put("NUM_ALCADA", String(numeroAlcada));
        parameters.put("NUM_SOLICITACAO", String(getValue("WKNumProces")));
        parameters.put("NOME_FILIAL", data.filial);
        parameters.put("NOME_SOLICITANTE", data.solicitante);
        parameters.put("COD_NAME_CC", data.centroDeCusto);
        parameters.put("VALOR_TOTAL", data.valorTotal);
        //Seta os destinatarios
        var recipients = new java.util.ArrayList();
        recipients.add(responsavelAlcada);
        //envia o email
        notifier.notify(sender, "template_email_somente_conhecimento", parameters, recipients, "text/html");
    } catch (e) {
        log.info("***** Ocorreu um erro ao tentar enviar o e-mail: " + e);
    }
}

//#FLUIG-89 Busca dados da alcada de aprovação.
function buscaDadosEmail() {
    var nomeFilial = hAPI.getCardValue("FilialAlcada");
    var nomeRequisitante = hAPI.getCardValue("txtNmRequisitante");
    var codCentroCutsto = hAPI.getCardValue("txtCodCentroCusto");
    var nomeCentroCusto = hAPI.getCardValue("txtNomeCentroCusto");
    var totalCotacao = hAPI.getCardValue("txtTotValCotacao");

    return {
        'filial': nomeFilial,
        'solicitante': nomeRequisitante,
        'centroDeCusto': codCentroCutsto + " " + nomeCentroCusto,
        'valorTotal': totalCotacao
    }
}