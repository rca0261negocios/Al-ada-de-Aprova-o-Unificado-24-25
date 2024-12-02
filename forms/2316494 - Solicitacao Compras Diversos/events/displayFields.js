function displayFields(form, customHTML) {

	// REVISAO ALCADAS 24-25 SM2 RCA 09.2024
	var atividade        = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var completaTarefa   = getValue("WKCompletTask");
    var getDocumentId    = form.getDocumentId();
	var getVersion       = form.getVersion();
    var MODO_EDICAO      = form.getFormMode();

    
    customHTML.append("<script>");
	customHTML.append("  function getAtividade()        { return '" + atividade       + "';}");
    customHTML.append("  function getDocumentId()       { return '" + getDocumentId   + "'};");
	customHTML.append("  function getVersion()          { return '" + getVersion      + "'};");
	customHTML.append("  function getProximaAtividade() { return '" + proximaAtividade+ "'};");
	customHTML.append("  function getCompletaTarefa()   { return '" + completaTarefa  + "'};");

	customHTML.append("  $('span.fluig-style-guide.fs-md-space').removeClass('fs-md-space');");
	customHTML.append("  var CURRENT_STATE = "  + atividade   +";");
    customHTML.append('  var MODO_EDICAO   = "' + MODO_EDICAO +'"');
    customHTML.append("</script>");
     
    var ccusto = form.getValue("codCentroCusto");
    
	if (ccusto == "11080102" || ccusto == "11080114" ) {
		form.setValue("responsavelTI", "Pool:Group:GES_TI_INFRA");

	  } else if (ccusto == "11080103") {
	   form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_SISTEMAS");

	  } else if (ccusto == "11080108") {
		form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_BACKOFFICE");

	  } else if (ccusto == "11080106") {
		form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_BIG_ANALITICS");

	  } else if (ccusto == "11080115" || ccusto == "11080110") { 
		form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_GER_DIGITAL");

	  } else if (ccusto == "11080111") {
		form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_SEGURANCA");

	  } else if (ccusto == "11080104") {
		form.setValue("responsavelTI", "Pool:Group:GESTORES_TI_CENTRAL_SERVICOS");

	  } else {
		form.setValue("responsavelTI", "Pool:Group:GPTI");
	  }
    if (atividade == ANALISE_COMPRADOR_COTACAO) {
        var usuarioLogado = getCurrentUser(); //Busca usuário logado;
        var data = getCurrenteDate(); //Busca data do usuário logado

        // Setando os valores do usuário logado nos campos
        form.setValue('codUserCompras', usuarioLogado.id);
        form.setValue('nomeUserCompras', usuarioLogado.nome);
        form.setValue('dataCompras', data);
        form.setEnabled("valorPA", true);

        log.info("WKNumState: " + getValue("WKNumState") + " WKNextState: " + getValue("WKNextState") + " WKCompletTask: " + getValue("WKCompletTask"));
    }

    if (atividade == CORRECAO_SOLICITANTE) {
        form.setEnabled('filialGuardChu___1', false);
        if (form.getValue("alteraValorCartaExecao") == 'true') {
            form.setEnabled("filial", false);
            form.setEnabled("centroDeCusto", false);
            form.setEnabled("localEntrega", false);
            form.setEnabled("emailContatSolicitante", false);
            form.setEnabled("telContatSolicitante", false);
            form.setEnabled("prioridade", false);
            form.setEnabled("fornecedorExclusProtheus", false);
            form.setEnabled("descDetalhada", false);
            form.setEnabled("excluTecknowhow", false);
            form.setEnabled("excluTecTempoDesenv", false);
            form.setEnabled("excluTecSolucaoTecnica", false);
            form.setEnabled("excluTecOutros", false);

            var indexes = form.getChildrenIndexes("tbProd");
            for (var i = 0; i < indexes.length; i++) {
                form.setEnabled('codProd___' + indexes[i], false);
                form.setEnabled('qtdProd___' + indexes[i], false);
            }
        }
    }
    if (atividade == ALCADA_APROVACAO || atividade == ALCADA_APROVACAO_PA || atividade == ALCADA_APROVACAO_CARTA) {
        form.setEnabled("valorTotalSolicitacao", false);
        form.setEnabled("valorUnitario___1", false);
        bloqueiaCamposAlcada(form);
    }

    // if(atividade == ALTERAR_VALOR_PA){
    //     // form.setEnabled("valorTotalSolicitacao", true);
    //     bloqueiaCamposAlcada(form);
    // }

    if (atividade == ENVIO_EMAIL_FORNECEDOR) {
        var data = getCurrenteDate(); //Busca data do usuário logado

        // Setando a data para o Envio de email
        form.setValue('dataEnviaEmailFornec', data);
    }

    if (atividade != 0 && atividade != INICIO && atividade != CORRECAO_SOLICITANTE) {
        // Bloqueio dos campos de carta-exceção
        form.setEnabled("excluTecknowhow", false);
        form.setEnabled("excluTecTempoDesenv", false);
        form.setEnabled("excluTecSolucaoTecnica", false);
        form.setEnabled("excluTecOutros", false);
        form.setEnabled("prioridade", false);
        form.setEnabled("tipoProjeto", false);

        var indexFiliais = form.getChildrenIndexes('tbFiliais');
        for (var i = 0; i < indexFiliais.length; i++) {
            var indice = indexFiliais[i];
            form.setEnabled("filialGuardChu___" + indice, false);
        }

        var indexProdutos = form.getChildrenIndexes('tbProd');
        for (var i = 0; i < indexProdutos.length; i++) {
            var indice = indexProdutos[i];
            //form.setEnabled("codProd___" + indice, false);
            
            //form.setEnabled("infoAdicionais___" + indice, false);
            
        }

        if (form.getValue("hidePedidoGuardChuva") == "true") {
            form.setVisibleById("divfiliasPedido", true);
            form.setVisibleById("btGerarTbFilialQtdPed", false);
            form.setVisibleById("btAddFilialPedido", false);
            
            var indexFiliaisPedidos = form.getChildrenIndexes('tbFiliaisPedido');
            for (var i = 0; i < indexFiliaisPedidos.length; i++) {
                var indice = indexFiliaisPedidos[i];
                form.setEnabled("filialGuardChuPedido___" + indice, false);
            }

            var indexPedidos = form.getChildrenIndexes('tbFiliaisQtdPedido');
            for (var j = 0; j < indexPedidos.length; j++) {
                var indice2 = indexPedidos[j];
                form.setEnabled("qtdPedido___" + indice2, false);
            }
        }

        
    }
    if(atividade == 0 || atividade == INICIO || atividade == CORRECAO_SOLICITANTE){

        if (form.getValue("hidePedidoGuardChuva") == "true") {
            form.setVisibleById("divfiliasPedido", true);
            
            
            var indexFiliaisPedidos = form.getChildrenIndexes('tbFiliaisPedido');
            for (var i = 0; i < indexFiliaisPedidos.length; i++) {
                var indice = indexFiliaisPedidos[i];
                form.setEnabled("filialGuardChuPedido___" + indice, true);
            }

            var indexPedidos = form.getChildrenIndexes('tbFiliaisQtdPedido');
            for (var j = 0; j < indexPedidos.length; j++) {
                var indice2 = indexPedidos[j];
                form.setEnabled("qtdPedido___" + indice2, true);
            }
        }

    }

    if (atividade != ANALISE_COMPRADOR_COTACAO) {
        // Bloqueio dos campos de carta-exceção
        form.setEnabled("excluClasFabriOuRepresent", false);
        form.setEnabled("excluClasRestricao", false);
        form.setEnabled("excluClasOutros", false);

        var indexFornecedor = form.getChildrenIndexes('tbFornecedor');
        for (var i = 0; i < indexFornecedor.length; i++) {
            var indice = indexFornecedor[i];
            form.setEnabled("formaForn___" + indice, false);
        }

        var indexProdutos = form.getChildrenIndexes("tbProd");
        if (indexFornecedor != '' && indexProdutos != '') {
            var indice = parseInt(indexProdutos.length) * parseInt(indexFornecedor.length);
            for (var i = 1; i <= indice; i++) {
                form.setEnabled('valorCotacao___' + i, false);
                form.setEnabled('vencedorCotacao___' + i, false);
                //form.setEnabled('infoAdicionais___' + i, true);
            }
        }
    }

    if (atividade == APROVACAO_SOLICITANTE) {
        bloqueiaCamposAlcada(form);
    }

    if (atividade == ANALISE_RH) {
        bloqueiaCamposAlcada(form);
    }

    if (atividade == TRATATIVA_ERRO_START_ACOMP) {
        bloqueiaCamposAlcada(form);
    }

    if (atividade == APROVACAO_TECNICA) {
        bloqueiaCamposAlcada(form);
    }

    // EXIBE NÚMERO DA SOLICITAÇÃO ABERTA EM CONTRATOS/PA	
    if (form.getValue("numSolicitAbertaFilho") != "") {
        form.setVisibleById("fieldsetNumSolicitacao", true);
    }

    if (atividade != REAVALIAR_PA) {
        form.setEnabled('trataPA', false);
    }

    if (atividade != ANALISE_COMPRADOR_COTACAO && MODO_EDICAO != '') {
        form.setEnabled('openCotacao', true);
        form.setEnabled('modalCotacaoProduto', true);
    }
    if(atividade == ANALISE_COMPRADOR_COTACAO){
    	
    	
    	var indexProdutos = form.getChildrenIndexes('tbProd');
          for (var i = 1; i <= indexProdutos; i++) {
         
              form.setEnabled('infoAdicionais___' + i, true);
          }
        
        
        
       }
}

//Busca o Usuário logado
function getCurrentUser() {
    var user = {};
    user.id = getValue('WKUser');

    var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', user.id, user.id, ConstraintType.MUST);
    var constraints = new Array(c1);
    var ds_colleague = DatasetFactory.getDataset('colleague', null, constraints, null);
    user.nome = ds_colleague.getValue(0, 'colleagueName');

    return user;
}

//Busca a data atual
function getCurrenteDate() {
    var dia = new Date().getDate().toString();
    var mes = (new Date().getMonth() + 1).toString();
    var ano = new Date().getFullYear().toString();

    if (dia.length == 1)
        dia = 0 + dia;
    if (mes.length == 1)
        mes = 0 + mes;

    return dia + "/" + mes + "/" + ano
}

function exibeCampo(html, idCampo) {
    html.append("<script>$('#" + idCampo + "').show();</script>");
}

function ocultaCampo(html, idCampo) {
    html.append("<script>$('#" + idCampo + "').hide();</script>");
}

function bloqueiaCamposAlcada(form) {
    form.setEnabled("tipoContrato", false);
    form.setEnabled("rescisaoContrato", false);
    form.setEnabled("objetoContrato", false);
    form.setEnabled("unidadeVigencia", false);
    form.setEnabled("vigenciaDoContrato", false);
    form.setEnabled("contatoComercial", false);
    form.setEnabled("emailComercial", false);
    form.setEnabled("telefoneComercial", false);
    form.setEnabled("tipoIndice", false);

    form.setEnabled("composicaoPrecos", false);
    form.setEnabled("qtdParcelas", false);
    form.setEnabled("gestorContrato", false);
    //form.setEnabled("numPropTecnica", false);
    form.setEnabled("numPropComercial", false);
    form.setEnabled("dtTermoContrato", false);
    form.setEnabled("dtTermoContrato", false);
    form.setEnabled("dtPagamento", false);
    form.setEnabled("codEspeciais", false);
    form.setEnabled("anexo1", false);
    form.setEnabled("anexo2", false);
    form.setEnabled("anexo3", false);
    form.setEnabled("anexo4", false);
    form.setEnabled("anexo5", false);
    form.setEnabled("anexoOutros ", false);

}