function servicetask119(attempt, message) {
    log.info("--- Processo PA Iniciar");

    // Validando qtde mínima de anexo
    var anexosDosContratos = hAPI.listAttachments();
    var anexos = parseInt(hAPI.getCardValue("anexos"));
    var qtdeAnexos = anexosDosContratos.size() - anexos;

    // OBTENDO VALORES DOS CAMPOS
    var numProcesso = hAPI.getCardValue('codSolicitacao');
    var nomeRequisitanteCompras = hAPI.getCardValue('nomeUserCompras');
    var idSolicitanteCompras = hAPI.getCardValue('codUserCompras');
    var dataRequisitanteCompras = hAPI.getCardValue('dataCompras');
    var filial = hAPI.getCardValue('filial');
    var codFilial = hAPI.getCardValue('codFilial');
    var centroDeCusto = hAPI.getCardValue('centroDeCusto')
    var codCentroCusto = hAPI.getCardValue('codCentroCusto');
    var campoConcatenado = centroDeCusto;
    var valorContrato = hAPI.getCardValue('valorTotalSolicitacao');
    var dataVencimentoPA = hAPI.getCardValue('dataVencimentoPA');
    var idSolicitante = hAPI.getCardValue('idSolicitante');
    var emailContatSolicitante = hAPI.getCardValue('emailContatSolicitante');
    var numPedidoCompras = hAPI.getCardValue('numPedidoCompras');
    var infoAdicionaisComp = hAPI.getCardValue('infoAdicionaisComp');
    var pagtoEmergencial = (hAPI.getCardValue('prioridadeHidden') == 'N' ? '' : 'pagamentoEmergencial');
    var campoIdentificador = hAPI.getCardValue("filial");

    var codSolicitacao = '';

    if (hAPI.getCardValue('prioridadeHidden') == 'E') {
        codSolicitacao = "2416946";
    } else {
        codSolicitacao = "2416945";
    }

    var A2_COD = hAPI.getCardValue('codFornVencedorProd___1');
    var FORNECEDOR_BANCO_DESC = hAPI.getCardValue('fornecedorVencedorProd___1');
    var cnpjFornecedor = hAPI.getCardValue('cnpjVencedorProd___1');



    //OBTENDO O CODIGO DA FILIAL NO FICHARIO "CAD_FILIAIS"
    var filtro1 = DatasetFactory.createConstraint("filial_protheus", codFilial, codFilial, ConstraintType.MUST);
    var filtro2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var constraints = new Array(filtro1, filtro2);
    var dsGestor = DatasetFactory.getDataset("cad_Filiais", null, constraints, null);
    var codCadFiliais = dsGestor.getValue(0, "codigo");
    log.info("--- valores para o PA");
    try {
        log.info("--- Entrou no TRY do PA Iniciar");
        var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
        var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
        var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
        var campos = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
        var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');

        var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
        var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
        var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');

        log.info("--- Pega os anexos do PA Iniciar");
        // ATRIBUINDO TODOS ANEXOS NO OBJETO processAttachmentDtoArray
        for (var i = 0; i < anexosDosContratos.size(); i++) {

            var doc = anexosDosContratos.get(i);

            var nfAttachmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
            nfAttachmentDto.setAttachmentSequence(i);
            nfAttachmentDto.setCompanyId(1);
            nfAttachmentDto.setDocumentType(2);
            nfAttachmentDto.setFileName(doc.getDocumentDescription());
            nfAttachmentDto.setDescription(doc.getDocumentDescription());
            nfAttachmentDto.setNewAttach(true);
            nfAttachmentDto.setVersion(1000);
            nfAttachmentDto.setDocumentId(doc.getDocumentId());

            var attachment = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
            attachment.setAttach(true);
            attachment.setFileName(doc.getDocumentDescription());
            nfAttachmentDto.getAttachments().add(attachment);
            processAttachmentDtoArray.getItem().add(nfAttachmentDto);

        }

        log.info("--- Fim pega anexos do PA Iniciar");
        // ADICIONANDO OS CAMPOS NO CARDDATA
        var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo1.getItem().add("solicitante");
        fieldCampo1.getItem().add(nomeRequisitanteCompras);
        cardData.getItem().add(fieldCampo1);

        var fieldCampo2 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo2.getItem().add("dataSolicitante");
        fieldCampo2.getItem().add(dataRequisitanteCompras);
        cardData.getItem().add(fieldCampo2);

        var fieldCampo3 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo3.getItem().add("cdSolicitante");
        fieldCampo3.getItem().add(idSolicitanteCompras);
        cardData.getItem().add(fieldCampo3);

        var fieldCampo4 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo4.getItem().add("filial");
        fieldCampo4.getItem().add(filial);
        cardData.getItem().add(fieldCampo4);

        var fieldCampo5 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo5.getItem().add("codigo_filial");
        fieldCampo5.getItem().add(codCadFiliais);
        cardData.getItem().add(fieldCampo5);

        var fieldCampo6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo6.getItem().add("hiddenFilial");
        fieldCampo6.getItem().add(filial);
        cardData.getItem().add(fieldCampo6);

        var fieldCampo7 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo7.getItem().add("CTT_CUSTO");
        fieldCampo7.getItem().add(codCentroCusto + " ");
        cardData.getItem().add(fieldCampo7);

        var fieldCampo8 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo8.getItem().add("CTT_DESC01");
        fieldCampo8.getItem().add(centroDeCusto);
        cardData.getItem().add(fieldCampo8);

        var fieldCampo9 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo9.getItem().add("campoConcatenado");
        fieldCampo9.getItem().add(campoConcatenado);
        cardData.getItem().add(fieldCampo9);

        var fieldCampo10 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo10.getItem().add("valorPagamento");
        fieldCampo10.getItem().add(valorContrato);
        cardData.getItem().add(fieldCampo10);

        var fieldCampo11 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo11.getItem().add("dataVencimentoPagtoAntecipado");
        fieldCampo11.getItem().add(dataVencimentoPA);
        cardData.getItem().add(fieldCampo11);

        var fieldCampo12 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo12.getItem().add("motivo");
        fieldCampo12.getItem().add("Pagamento Antecipado");
        cardData.getItem().add(fieldCampo12);

        var fieldCampo13 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo13.getItem().add("codigo");
        fieldCampo13.getItem().add(codCadFiliais);
        cardData.getItem().add(fieldCampo13);

        var fieldCampo14 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo14.getItem().add("filial_protheus");
        fieldCampo14.getItem().add(codFilial);
        cardData.getItem().add(fieldCampo14);

        var fieldCampo15 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo15.getItem().add("numPedidoCompra");
        fieldCampo15.getItem().add(numPedidoCompras);
        cardData.getItem().add(fieldCampo15);

        var fieldCampo16 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo16.getItem().add("cdSolicitanteCompra");
        fieldCampo16.getItem().add(idSolicitante);
        cardData.getItem().add(fieldCampo16);

        var fieldCampo17 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo17.getItem().add("emailContatSolicitante");
        fieldCampo17.getItem().add(emailContatSolicitante);
        cardData.getItem().add(fieldCampo17);

        var fieldCampo18 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo18.getItem().add("infoAdicionaisComp");
        fieldCampo18.getItem().add(infoAdicionaisComp);
        cardData.getItem().add(fieldCampo18);

        var fieldCampo19 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo19.getItem().add("A2_COD");
        fieldCampo19.getItem().add(A2_COD);
        cardData.getItem().add(fieldCampo19);

        var fieldCampo20 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo20.getItem().add("FORNECEDOR_BANCO_DESC");
        fieldCampo20.getItem().add(FORNECEDOR_BANCO_DESC);
        cardData.getItem().add(fieldCampo20);

        var fieldCampo21 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo21.getItem().add("cnpjFornecedor");
        fieldCampo21.getItem().add(cnpjFornecedor);
        cardData.getItem().add(fieldCampo21);

        var fieldCampo22 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo22.getItem().add("pagamentoEmergencialHidden");
        fieldCampo22.getItem().add(pagtoEmergencial);
        cardData.getItem().add(fieldCampo22);

        var fieldCampo24 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo24.getItem().add("campoIdentificador");
        fieldCampo24.getItem().add(campoIdentificador);
        cardData.getItem().add(fieldCampo24);

        var fieldCampo25 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        fieldCampo25.getItem().add("COD_SOLICITACAO");
        fieldCampo25.getItem().add(codSolicitacao);
        cardData.getItem().add(fieldCampo25);


        log.info("--- Inicia o fluxo do PA Iniciar");
        // SERVIÇO DO STARTPROCESS
        var rest = workflowEngineService.startProcess("integrador.fluig@oncoclinicas.com",
            "hUbust*7",
            1,
            "SolicitacaoDePagamentoAntecipado",
            0,
            stringArray,
            "Solicitação iniciada através do Fluxo de Compras Diversos (Nº " + numProcesso + ").",
            idSolicitante,
            true,
            processAttachmentDtoArray,
            cardData,
            processTaskAppointmentDtoArray,
            false);
        log.info("--- Fluxo do PA Iniciado");

        var iProcess = "";
        for (var j = 0; j < rest.getItem().size(); j++) {
            var item = rest.getItem().get(j).getItem();
            var key = item.get(0);
            var value = item.get(1);

            log.info("### Dados do PA gerado: " + key);

            if (key == "iProcess") {
                iProcess = value;

                log.info("####### Número da Solicitação aberta em PA: " + value);
                log.info("####### iProcess: " + iProcess);
                hAPI.setCardValue('numSolicitAbertaFilho', value);
                log.info("####### numSolicitAbertaFilho " + hAPI.getCardValue('numSolicitAbertaFilho'));

                // ADD O NÚMERO DA NOVA SOLIITAÇÃO NOS COMPLEMENTOS
                var usuario = hAPI.getCardValue('idSolicitante'); //getValue('WKUser');
                var mensagem = "Aberto a solicitação de Pagamento Antecipado Nº " + value;

                hAPI.setTaskComments(usuario, numProcesso, 0, mensagem);
                log.info("####### insere MGS - " + usuario + " - " + numProcesso + " - " + mensagem);
            }
        }
    } catch (e) {
        throw "Ocorreu um erro ao tentar criar uma solicitação de PA " + e;
    }
}