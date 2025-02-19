function afterProcessCreate(processId){
    log.info('\n$$$$$$$$$$ afterProcessCreate SolicitacaoCompras $$$$$$$$$$');
    var primeiraCompra = false;
    var indexesItens = hAPI.getChildrenIndexes("tbItens");
    for(var i = 0; i < indexesItens.length; i++){
        var tdSelectPrimeiraCompra = hAPI.getCardValue("tdSelectPrimeiraCompra___" + indexesItens[i]);
        log.info("Primeira Compra Item " + i + " :" + tdSelectPrimeiraCompra);
        if(tdSelectPrimeiraCompra == "sim"){
            primeiraCompra = true;
        }
    }
    log.info("Primeira Compra: "+primeiraCompra);
    if(primeiraCompra == true){
        var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
        var attachments = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
        var appointment = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
        var colleagueIds = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
        colleagueIds.getItem().add('Pool:Group:GCRN_Assistencial');
        var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
        var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
        var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
        var arrayCampos = [];

        var inputSolicitacaoPrincipal = "inputSolicitacaoPrincipal";
        arrayCampos.push([inputSolicitacaoPrincipal, processId]);

        var inputDataSolicitacao = "inputDataSolicitacao";
        var data = new Date();
        var dia  = data.getDate();
        var mes  = data.getMonth() + 1;
        var ano  = data.getFullYear();
        dia = (dia<=9 ? "0"+dia : dia);
        mes = (mes<=9 ? "0"+mes : mes);
        var dataLocal = dia+"/"+mes+"/"+ano;
        arrayCampos.push([inputDataSolicitacao, dataLocal]);

        var inputCodigoFilial = "inputCodigoFilial";
        var filial_protheus = hAPI.getCardValue("filial_protheus");
        arrayCampos.push([inputCodigoFilial, filial_protheus]);

        var inputNomeFilial = "inputNomeFilial";
        var hiddenFilial = hAPI.getCardValue("hiddenFilial");
        arrayCampos.push([inputNomeFilial, hiddenFilial]);

        var inputCNPJFilial = "inputCNPJFilial";
        var cnpjFilialEnt = hAPI.getCardValue("cnpjFilialEnt");
        arrayCampos.push([inputCNPJFilial, cnpjFilialEnt]);

        var indexes = hAPI.getChildrenIndexes("tbItens");
        for(var i = 0; i < indexes.length; i++){
            var tdSelectPrimeiraCompra = hAPI.getCardValue("tdSelectPrimeiraCompra___" + indexes[i]);
            if(tdSelectPrimeiraCompra == "sim"){
                var txtCodItemProduto = hAPI.getCardValue("txtCodItemProduto___" + indexes[i]);
                var inputTdCodigoProduto = "inputTdCodigoProduto___"+ parseInt(i) + 1;
                arrayCampos.push([inputTdCodigoProduto, txtCodItemProduto]);
                var txtDescProduto = hAPI.getCardValue("txtDescProduto___" + indexes[i]);
                var inputTdNomeProduto = "inputTdNomeProduto___"+ parseInt(i) + 1;
                arrayCampos.push([inputTdNomeProduto, txtDescProduto]);
                var txtQuantidadeProduto = hAPI.getCardValue("txtQuantidadeProduto___" + indexes[i]);
                var inputTdQuantidade = "inputTdQuantidade___"+ parseInt(i) + 1;
                arrayCampos.push([inputTdQuantidade, txtQuantidadeProduto]);
            }
        }
        for(var i = 0; i < arrayCampos.length; i++){
            var campoValor = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
            var campoX = arrayCampos[i][0];
            var valorX = arrayCampos[i][1];
            if(valorX == null) valorX = " ";
            if(!isNaN(valorX)) valorX = valorX.toString();
            campoValor.getItem().add(campoX);
            campoValor.getItem().add(valorX);
            cardData.getItem().add(campoValor);
        }

        log.info("arrayCampos!");
        log.dir(arrayCampos);

        var username = "integrador.fluig@oncoclinicas.com";
        var password = "hUbust*7";
        var companyId = getValue("WKCompany");
        var processIdName = "ativacao_vinculacao_produtos_matmed";
        var choosedState = 0;
        var comments = "Solicitação inicializada pela Solicitação de Compras MatMed";
        var userId = "imwn2dyhbuywfa0f1522083830483";
        var completeTask = true;
        var managerMode = false;
        var response = workflowEngineService.startProcess(
            username,
            password,
            companyId,
            processIdName,
            choosedState,
            colleagueIds,
            comments,
            userId,
            completeTask,
            attachments,
            cardData,
            appointment,
            managerMode
        );
        log.info("\n$$$$$$$$$$ Response $$$$$$$$$$");
        log.dir(response);
        var iProcess = "";
        for(var i = 0; i < response.getItem().size(); i++){
            var item = response.getItem().get(i).getItem();
            var key = item.get(0);
            var value = item.get(1);
            if(key == "iProcess") iProcess = value;
        }
        log.info("\n$$$$$$$$$$ iProcess: "+iProcess);
        var user = getValue("WKUser");
        var obs = "Ativação e Vinculação de Produtos MatMed: "+iProcess;
        hAPI.setTaskComments(user, processId, 0, obs);
    }
}