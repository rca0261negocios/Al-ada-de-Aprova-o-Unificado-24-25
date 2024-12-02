function criaDesvinculados() {
    
        var processId = "SolicitacaoCompras";
        var ativDest = 0;
        //var COLABORADOR = new Array(hAPI.getCardValue('idRequisitante'));
        //SM2 alterado a forma de declaração do usuário solicitante 16.02.24
        var COLABORADOR = new java.util.ArrayList();
        COLABORADOR.add(hAPI.getCardValue('idRequisitante'));

        var SOLICITACAO = getValue('WKNumProces');
            SOLICITACAO = SOLICITACAO.toString();
        var obs = "Aberto a solicitação de Compras dos itens desvinculados Nº " + SOLICITACAO + ".";
        var campos = hAPI.getCardData(SOLICITACAO);

        var completarTarefa = true;
        var modoGestor = false;

        // MAPA COM OS VALORES DO FORMULÁRIO DO PROCESSO
        var valoresForm = new java.util.HashMap();

        valoresForm.put('cntProcesso', SOLICITACAO);

        valoresForm.put('filial', hAPI.getCardValue("filial"));
        valoresForm.put('filial_protheus', hAPI.getCardValue("filial_protheus"));
        valoresForm.put('idRequisitante', hAPI.getCardValue("idRequisitante"));
        valoresForm.put('txtNmRequisitante', hAPI.getCardValue("txtNmRequisitante"));
        valoresForm.put('cdSolicitante', hAPI.getCardValue("cdSolicitante"));
        valoresForm.put('hiddenFilial', hAPI.getCardValue("hiddenFilial"));
        valoresForm.put('zoomFilial', hAPI.getCardValue("zoomFilial"));
        valoresForm.put('txtCodCentroCusto', hAPI.getCardValue("txtCodCentroCusto"));
        valoresForm.put('txtNomeCentroCusto', hAPI.getCardValue("txtNomeCentroCusto"));
        valoresForm.put('nmFilial', hAPI.getCardValue("nmFilial"));
        valoresForm.put('txtNmRequisitante', hAPI.getCardValue("txtNmRequisitante"));
        valoresForm.put('txtComprador', hAPI.getCardValue("txtComprador"));
        valoresForm.put('hiddenComprador', hAPI.getCardValue("hiddenComprador"));
        valoresForm.put('nmFilialEntrega', hAPI.getCardValue("nmFilialEntrega"));
        valoresForm.put('hiddenFilialEntrega', hAPI.getCardValue("hiddenFilialEntrega"));
        valoresForm.put('txtLocalEntrega', hAPI.getCardValue("txtLocalEntrega"));
        valoresForm.put('rdContrato', hAPI.getCardValue("rdContrato"));
        valoresForm.put('ckImportado', hAPI.getCardValue("ckImportado"));
        valoresForm.put('dtValidadeCotacao', hAPI.getCardValue("dtValidadeCotacao"));
        valoresForm.put('txtCodFormaPagamento', hAPI.getCardValue("txtCodFormaPagamento"));
        valoresForm.put('txtNomeFormaPagamento', hAPI.getCardValue("txtNomeFormaPagamento"));
        valoresForm.put('hrValidadeCotacao', hAPI.getCardValue("hrValidadeCotacao"));
        valoresForm.put('grupoAnaliseComprador', hAPI.getCardValue("grupoAnaliseComprador"));
        valoresForm.put('dtEmissao', hAPI.getCardValue("dtEmissao"));
        valoresForm.put('FilialAlcada', hAPI.getCardValue("FilialAlcada"));
        valoresForm.put('codigo_filial', hAPI.getCardValue("codigo_filial"));
        valoresForm.put('codigo', hAPI.getCardValue("codigo"));
        valoresForm.put('analyticsNmFilial', hAPI.getCardValue("analyticsNmFilial"));
        valoresForm.put('cdSolicitante', hAPI.getCardValue("cdSolicitante"));
        valoresForm.put('prioridadeGeral', hAPI.getCardValue("prioridadeGeral"));
        valoresForm.put('hiddenPrioridadeGeral', hAPI.getCardValue("hiddenPrioridadeGeral"));
        valoresForm.put('hiddenPrioridadeGeralOrig', hAPI.getCardValue("hiddenPrioridadeGeralOrig"));
        valoresForm.put('isProdutoTI', hAPI.getCardValue("isProdutoTI"));
        valoresForm.put('txtAInfoAdicionais', hAPI.getCardValue("txtAInfoAdicionais"));
        valoresForm.put('poolAbertura', hAPI.getCardValue("poolAbertura"));

        var contador = campos.keySet().iterator();
        var count = 0;

        while (contador.hasNext()) {
            var id = contador.next();

            if (id.match(/txtCodItemProdutoDesv___/)) {
                var seq = id.split("___");

                valoresForm.put("sPrioridadeProduto___" + seq[1], hAPI.getCardValue("sPrioridadeProdutoDesv___" + seq[1]));
                valoresForm.put("hiddenPrioridade___" + seq[1], hAPI.getCardValue("hiddenPrioridadeDesv___" + seq[1]));
                valoresForm.put("txtSeqItemProduto___" + seq[1], hAPI.getCardValue("txtSeqItemProdutoDesv___" + seq[1]));
                valoresForm.put("txtCodItemProduto___" + seq[1], hAPI.getCardValue("txtCodItemProdutoDesv___" + seq[1]));
                //valoresForm.put("tdSelectPrimeiraCompra___" + seq[1], hAPI.getCardValue("tdSelectPrimeiraCompra___" + seq[1]));
                valoresForm.put("txtDescProduto___" + seq[1], hAPI.getCardValue("txtDescProdutoDesv___" + seq[1]));
                valoresForm.put("txtUnidMedProduto___" + seq[1], hAPI.getCardValue("txtUnidMedProdutoDesv___" + seq[1]));
                valoresForm.put("txtQuantidadeProduto___" + seq[1], hAPI.getCardValue("txtQuantidadeProdutoDesv___" + seq[1]));
                valoresForm.put("txtSaldoProduto___" + seq[1], hAPI.getCardValue("txtSaldoProdutoDesv___" + seq[1]));
                valoresForm.put("dtNecessidadeProduto___" + seq[1], hAPI.getCardValue("dtNecessidadeProdutoDesv___" + seq[1]));
                valoresForm.put("txtArmazemProduto___" + seq[1], hAPI.getCardValue("txtArmazemProdutoDesv___" + seq[1]));
                valoresForm.put("prazoProduto___" + seq[1], hAPI.getCardValue("prazoProdutoDesv___" + seq[1]));
                valoresForm.put("txtObsProduto___" + seq[1], hAPI.getCardValue("txtObsProdutoDesv___" + seq[1]));
                valoresForm.put("nmFabricante___" + seq[1], hAPI.getCardValue("nmFabricanteDesv___" + seq[1]));
                valoresForm.put("txtConsumoMedio___" + seq[1], hAPI.getCardValue("txtConsumoMedioDesv___" + seq[1]));
                valoresForm.put("txtContaContabil___" + seq[1], hAPI.getCardValue("txtContaContabilDesv___" + seq[1]));
                valoresForm.put("tipoProduto___" + seq[1], hAPI.getCardValue("tipoProdutoDesv___" + seq[1]))

                count++;
            }
        }

        log.info('servicetask228 - criaDesvinculados SC: ' + processId + '/' + ativDest + '/' + COLABORADOR + '/' + obs + '/' + completarTarefa + '/' + valoresForm + '/' + modoGestor);

        // INICIAR NOVO PROCESSO
    try {
        hAPI.startProcess(processId, ativDest, COLABORADOR, obs, completarTarefa, valoresForm, modoGestor);
    } catch (error) {
        log.error("servicetask228 - criaDesvinculados SC: ");
        log.dir(error);
        throw "Falha na criação da nova solicitação de itens desvinculados! Favor acionar o suporte (servicetask228 - criaDesvinculados) " + error.message;
    }
}

function pad(num) {
    var numRet = num;
    if (parseInt(num) <= 9)
        numRet = "0" + num;
    return numRet;
}

function formatDate(date) {
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}

function criaDesvinculados_old() {
    var processo = getValue("WKNumProces");
    var campos = hAPI.getCardData(processo);
    var idRequisitante = hAPI.getCardValue('idRequisitante');

    var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
    var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
    var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
    // var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
    // stringArray.getItem().add(hAPI.getCardValue('cdSolicitante'));

    // Lista das matrículas de usuários que irão receber a atividade. Normalmente é um usuário, mas no caso de um consenso podem ser vários
    var colleagueIds = serviceHelper.instantiate('br.com.oncoclinicas.fluig.StringArray');
    colleagueIds.getItem().add(hAPI.getCardValue('cdSolicitante'));

    var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
    var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
    var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');

    var arrayCampos = [];
    arrayCampos.push(['filial', hAPI.getCardValue("filial")]);
    arrayCampos.push(['filial_protheus', hAPI.getCardValue("filial_protheus")]);
    arrayCampos.push(['hiddenFilial', hAPI.getCardValue("hiddenFilial")]);
    arrayCampos.push(['zoomFilial', hAPI.getCardValue("zoomFilial")]);
    arrayCampos.push(['txtCodCentroCusto', hAPI.getCardValue("txtCodCentroCusto")]);
    arrayCampos.push(['txtNomeCentroCusto', hAPI.getCardValue("txtNomeCentroCusto")]);
    arrayCampos.push(['nmFilial', hAPI.getCardValue("nmFilial")]);
    arrayCampos.push(['txtNmRequisitante', hAPI.getCardValue("txtNmRequisitante")]);
    arrayCampos.push(['txtComprador', hAPI.getCardValue("txtComprador")]);
    arrayCampos.push(['hiddenComprador', hAPI.getCardValue("hiddenComprador")]);
    arrayCampos.push(['nmFilialEntrega', hAPI.getCardValue("nmFilialEntrega")]);
    arrayCampos.push(['hiddenFilialEntrega', hAPI.getCardValue("hiddenFilialEntrega")]);
    arrayCampos.push(['txtLocalEntrega', hAPI.getCardValue("txtLocalEntrega")]);
    arrayCampos.push(['rdContrato', hAPI.getCardValue("rdContrato")]);
    arrayCampos.push(['ckImportado', hAPI.getCardValue("ckImportado")]);
    arrayCampos.push(['dtValidadeCotacao', hAPI.getCardValue("dtValidadeCotacao")]);
    arrayCampos.push(['txtCodFormaPagamento', hAPI.getCardValue("txtCodFormaPagamento")]);
    arrayCampos.push(['txtNomeFormaPagamento', hAPI.getCardValue("txtNomeFormaPagamento")]);
    arrayCampos.push(['hrValidadeCotacao', hAPI.getCardValue("hrValidadeCotacao")]);
    arrayCampos.push(['grupoAnaliseComprador', hAPI.getCardValue("grupoAnaliseComprador")]);
    arrayCampos.push(['dtEmissao', hAPI.getCardValue("dtEmissao")]);
    arrayCampos.push(['FilialAlcada', hAPI.getCardValue("FilialAlcada")]);
    arrayCampos.push(['codigo_filial', hAPI.getCardValue("codigo_filial")]);
    arrayCampos.push(['codigo', hAPI.getCardValue("codigo")]);
    arrayCampos.push(['analyticsNmFilial', hAPI.getCardValue("analyticsNmFilial")]);
    arrayCampos.push(['cdSolicitante', hAPI.getCardValue("cdSolicitante")]);
    arrayCampos.push(['prioridadeGeral', hAPI.getCardValue("prioridadeGeral")]);
    arrayCampos.push(['hiddenPrioridadeGeral', hAPI.getCardValue("hiddenPrioridadeGeral")]);
    arrayCampos.push(['hiddenPrioridadeGeralOrig', hAPI.getCardValue("hiddenPrioridadeGeralOrig")]);
    arrayCampos.push(['isProdutoTI', hAPI.getCardValue("isProdutoTI")]);
    arrayCampos.push(['txtAInfoAdicionais', hAPI.getCardValue("txtAInfoAdicionais")]);
    arrayCampos.push(['poolAbertura', hAPI.getCardValue("poolAbertura")]);

    var contador = campos.keySet().iterator();
    var count = 0;

    while (contador.hasNext()) {
        var id = contador.next();

        if (id.match(/txtCodItemProdutoDesv___/)) {
            var campo = campos.get(id);
            var seq = id.split("___");

            arrayCampos.push(["sPrioridadeProduto___" + seq[1], hAPI.getCardValue("sPrioridadeProdutoDesv___" + seq[1])]);
            arrayCampos.push(["hiddenPrioridade___" + seq[1], hAPI.getCardValue("hiddenPrioridadeDesv___" + seq[1])]);
            arrayCampos.push(["txtSeqItemProduto___" + seq[1], hAPI.getCardValue("txtSeqItemProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtCodItemProduto___" + seq[1], hAPI.getCardValue("txtCodItemProdutoDesv___" + seq[1])]);
            //arrayCampos.push(["tdSelectPrimeiraCompra___" + seq[1], hAPI.getCardValue("tdSelectPrimeiraCompra___" + seq[1])]);
            arrayCampos.push(["txtDescProduto___" + seq[1], hAPI.getCardValue("txtDescProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtUnidMedProduto___" + seq[1], hAPI.getCardValue("txtUnidMedProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtQuantidadeProduto___" + seq[1], hAPI.getCardValue("txtQuantidadeProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtSaldoProduto___" + seq[1], hAPI.getCardValue("txtSaldoProdutoDesv___" + seq[1])]);
            arrayCampos.push(["dtNecessidadeProduto___" + seq[1], hAPI.getCardValue("dtNecessidadeProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtArmazemProduto___" + seq[1], hAPI.getCardValue("txtArmazemProdutoDesv___" + seq[1])]);
            arrayCampos.push(["prazoProduto___" + seq[1], hAPI.getCardValue("prazoProdutoDesv___" + seq[1])]);
            arrayCampos.push(["txtObsProduto___" + seq[1], hAPI.getCardValue("txtObsProdutoDesv___" + seq[1])]);
            arrayCampos.push(["nmFabricante___" + seq[1], hAPI.getCardValue("nmFabricanteDesv___" + seq[1])]);
            arrayCampos.push(["txtConsumoMedio___" + seq[1], hAPI.getCardValue("txtConsumoMedioDesv___" + seq[1])]);
            arrayCampos.push(["txtContaContabil___" + seq[1], hAPI.getCardValue("txtContaContabilDesv___" + seq[1])]);
            arrayCampos.push(["tipoProduto___" + seq[1], hAPI.getCardValue("tipoProdutoDesv___" + seq[1])]);

            count++;
        }
    }

    log.info("#### " + processo + " TOTAL DE FILHOS: " + count);

    for (var index = 0; index < arrayCampos.length; index++) {
        var campoValor = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        var campoX = arrayCampos[index][0]
        var valorX = arrayCampos[index][1]

        campoValor.getItem().add(campoX);
        campoValor.getItem().add(valorX);
        cardData.getItem().add(campoValor);
    }

    log.info(processo + ' colleagueIds');
    log.dir(colleagueIds);
    log.info('___________________________')
    log.info(processo + '  Dados para gerar itens devinculados:');
    log.dir(cardData);


    var rest = workflowEngineService.startProcess(
        "integrador.fluig@oncoclinicas.com",    // matrícula do usuário integrador
        "hUbust*7",                             // senha do usuário
        1,                                      // código da empresa
        "SolicitacaoCompras",                   // código do processo
        1,                                      // código da atividade para qual a solicitação vai ser movimentada
        colleagueIds,
        "Aberto a solicitação de Compras dos itens desvinculados Nº " + processo + ".", // Comentário da movimentação
        idRequisitante,                         // Usuário que ficará como o inicializador da solicitação. O usuário integrador precisa ter personificação caso seja um usuário diferente do integrador                           
        true,                                   // Se vai completar a tarefa inicial (true) ou não, vai apenas salvar a solicitação para gerar um código e preencher o formulário, anexos e comentários
        processAttachmentDtoArray,              // Lista de anexos. Mesmo que não seja enviado nenhum, é necessário enviar a lista vazia
        cardData,                               // Dados do formulário. Mesmo que não tenha formulário ou não seja preenchido, é necessário enviar a lista vazia
        processTaskAppointmentDtoArray,         // Apontamentos da solicitação. Não é mais utilizado, mas por compatibilidade é necessário enviar a lista vazia
        false                                   // Se a movimentação é feita como usuário responsável pela atividade ou como gestor do processo
    );

    var iProcess = "";
    for (var j = 0; j < rest.getItem().size(); j++) {
        var item = rest.getItem().get(j).getItem();
        var key = item.get(0);
        var value = item.get(1);
        if (key == "iProcess") {
            iProcess = value;
        }
    }

    if (parseInt(iProcess) > 0)
        log.info(processo + ' gerou SolicitacaoCompras: ' + iProcess);
    else {
        log.error("servicetask228 - criaDesvinculados SC: " + processo);
        log.dir(rest);
        var retorno = stringArrayArrayToSimpleObject(rest);
        throw "Falha na criação da nova solicitação de itens desvinculados! Favor acionar o suporte (servicetask228 - criaDesvinculados) " + retorno.ERROR;
    }
}

function stringArrayArrayToSimpleObject(stringArrayArray) {
    var objeto = {};
    for (var i = 0; i < stringArrayArray.getItem().size(); i++) {
        var item = stringArrayArray.getItem().get(i).getItem();
        objeto[item.get(0)] = item.get(1);
    }

    return objeto;
}