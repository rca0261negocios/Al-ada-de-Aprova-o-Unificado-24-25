function displayFields(form, customHTML) {
    
	// REVISAO ALCADAS 24-25 SM2 RCA 09.2024
	var atividade     = getValue("WKNumState");
    var getDocumentId = form.getDocumentId();
	var getVersion    = form.getVersion();

    customHTML.append("<script>");
	customHTML.append("  function getAtividade() { return '" + atividade     + "'; }");
    customHTML.append("  function getDocumentId(){ return '" + getDocumentId + "'};");
	customHTML.append("  function getVersion()   { return '" + getVersion    + "'};");
	customHTML.append("  $('span.fluig-style-guide.fs-md-space').removeClass('fs-md-space');");
	customHTML.append("  var CURRENT_STATE = "+atividade+";");
    customHTML.append("</script>");
	
	var CURRENT_STATE = getValue('WKNumState');
    var MODO_EDICAO = form.getFormMode();
    customHTML.append('<script> var CURRENT_STATE = ' + CURRENT_STATE + '; </script>');
    customHTML.append('<script> var MODO_EDICAO = "' + MODO_EDICAO + '";</script>');
    
   
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
    	
    	
    	
 
    	
    	
    	
    	
    	
    	
    	
    	
    	
    
    
    
    if (CURRENT_STATE == ANALISE_COMPRADOR_COTACAO) {
        var usuarioLogado = getCurrentUser(); //Busca usuário logado;
        var data = getCurrenteDate(); //Busca data do usuário logado

        // Setando os valores do usuário logado nos campos
        form.setValue('codUserCompras', usuarioLogado.id);
        form.setValue('nomeUserCompras', usuarioLogado.nome);
        form.setValue('dataCompras', data);
        form.setEnabled("valorPA", true);
        

        log.info("WKNumState: " + getValue("WKNumState") + " WKNextState: " + getValue("WKNextState") + " WKCompletTask: " + getValue("WKCompletTask"));
    }

    if (CURRENT_STATE == CORRECAO_SOLICITANTE) {
        form.setEnabled('filialGuardChu___1', false);
        form.setEnabled('isFornecedorExclu', true);
        
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
                form.setEnabled('codProd___' + indexes[i], true);
                form.setEnabled('qtdProd___' + indexes[i], true);
            }
        }
    }
    if (CURRENT_STATE == ALCADA_APROVACAO_CARTA)
    	{
    	
    	form.setValue('hiddenUltValorAprovCarta',form.getValue('hiddenValorCompraExclu'));
    	
    	
    	
    	}
    if (CURRENT_STATE == ALCADA_APROVACAO || CURRENT_STATE == ALCADA_APROVACAO_PA || CURRENT_STATE == ALCADA_APROVACAO_CARTA) {
        form.setEnabled("valorTotalSolicitacao", false);
        form.setEnabled("valorUnitario___1", false);
        bloqueiaCamposAlcada(form);
    }

    // if(CURRENT_STATE == ALTERAR_VALOR_PA){
    //     // form.setEnabled("valorTotalSolicitacao", true);
    //     bloqueiaCamposAlcada(form);
    // }

    if (CURRENT_STATE == ENVIO_EMAIL_FORNECEDOR) {
        var data = getCurrenteDate(); //Busca data do usuário logado

        // Setando a data para o Envio de email
        form.setValue('dataEnviaEmailFornec', data);
    }

    if (CURRENT_STATE != 0 && CURRENT_STATE != INICIO && CURRENT_STATE != CORRECAO_SOLICITANTE) {
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
            form.setEnabled("infoAdicionais___" + indice, false);
        }
    }

    if (CURRENT_STATE != ANALISE_COMPRADOR_COTACAO) {
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
            }
        }
    }

    if (CURRENT_STATE == APROVACAO_SOLICITANTE) {
        bloqueiaCamposAlcada(form);
    }

    if (CURRENT_STATE == ANALISE_RH) {
        bloqueiaCamposAlcada(form);
    }

    if (CURRENT_STATE == TRATATIVA_ERRO_START_ACOMP) {
        bloqueiaCamposAlcada(form);
    }

    if (CURRENT_STATE == APROVACAO_TECNICA) {
        bloqueiaCamposAlcada(form);
    }

    // EXIBE NÚMERO DA SOLICITAÇÃO ABERTA EM CONTRATOS/PA	
    if (form.getValue("numSolicitAbertaFilho") != "") {
        form.setVisibleById("fieldsetNumSolicitacao", true);
    }

    if (CURRENT_STATE != REAVALIAR_PA) {
        form.setEnabled('trataPA', false);
    }

    if (CURRENT_STATE != ANALISE_COMPRADOR_COTACAO && MODO_EDICAO != '') {
        form.setEnabled('openCotacao', true);
        form.setEnabled('modalCotacaoProduto', true);
    }
    
    
    //inicio displayfields contrato
    
    
    
    


	//Atribuindo o código da solicitação
	var processo = getValue("WKNumProces");
	form.setValue("codSolicitacao", processo);

	var CURRENT_STATE = getValue('WKNumState');
	form.setValue('CURRENT_STATE', CURRENT_STATE)
	form.setValue('MODO', form.getFormMode())

	if (CURRENT_STATE == INICIO_CONTRATO || CURRENT_STATE == '0') {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeUserCompras', usuarioLogado.nome);
		form.setValue('dataCompras', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('servicoCritico', false);
		//bloqueiaCamposMinutabloqueiaCamposMinuta(form);
		
	} else if (CURRENT_STATE == ANALISE_CONTRATO) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUsuarioAnaliseContrato', usuarioLogado.nome);
		form.setValue('dataAnaliseContrato', data);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('servicoCritico', false);

		var indexes = form.getChildrenIndexes("tbFiliais");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('valorPercent___' + indexes[i], false);
		}
		var indexes = form.getChildrenIndexes("tbItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('txtPrecoProduto___' + indexes[i], false);
		}
		//bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == CORRECAO_SOLICITACAO_COMPRAS) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUsuarioCompras', usuarioLogado.nome);
		form.setValue('dataUsuarioCompras', data);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('aprovaAnalise', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCamposMinuta(form);
		bloqueiaAnaliseContrato(form);
	} else if (CURRENT_STATE == CANCELAR_SOLICITACAO) {
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('aprovaAnalise', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
		bloqueiaCorrecaoCompras(form);
	} else if (CURRENT_STATE == ALCADA_APROVACAO_CONTRATO) {

		customHTML.append("<script>$('#aprovacaoGestor').show();</script>");
		var nivelAtualAprovacao = form.getValue("nivelAtualAprovacao");

		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeAprovGestor' + nivelAtualAprovacao, usuarioLogado.nome);
		form.setValue('dataAprovGestor' + nivelAtualAprovacao, data);
		form.setEnabled("decisaoGestor" + nivelAtualAprovacao, true);
		form.setEnabled("motivoAprovGestor" + nivelAtualAprovacao, true);
		customHTML.append("<script>$('#avaliacaoGestor" + nivelAtualAprovacao + "').show();</script>");

		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('aprovaAnalise', false);
		form.setVisibleById('servicoCritico', false);
		form.setEnabled('filial', false);
		form.setEnabled('cpCc', false);
		form.setEnabled('referenciaEntrega', false);
		form.setEnabled('emailContatSolicitante', false);
		form.setEnabled('telContatSolicitante', false);
		form.setEnabled('objetoContrato', false);
		form.setEnabled('reajusteContrato', false);
		form.setEnabled('tipoIndice', false);
		form.setEnabled('rescisaoContrato', false);
		//form.setEnabled('valorTotalServico', false);
		form.setEnabled('unidadeVigenciaContrato', false);
		form.setEnabled('vigenciaDoContrato', false);
		form.setEnabled('codTipoContrato', false);
		form.setEnabled('contatoComercial', false);
		form.setEnabled('emailComercial', false);
		form.setEnabled('telefoneComercial', false);
		form.setEnabled('sLocalPrestServico', false);
		form.setEnabled('tipoContrato', false);
		form.setEnabled("composicaoPrecos", false);
		form.setEnabled("qtdParcelas", false);
		form.setEnabled("gestorContrato", false);
		// form.setEnabled("numPropTecnica", false); //
		form.setEnabled("numPropComercial", false);
		form.setEnabled("minutaPadrao", false);
		form.setEnabled("dtTermoContrato", false);
		form.setEnabled("dtAssinaContrato", false);
		form.setEnabled("anexo1", false);
		form.setEnabled("anexo2", false);
		form.setEnabled("anexo3", false);
		form.setEnabled("anexo4", false);
		form.setEnabled("anexo5", false);
		form.setEnabled("anexoOutros", false);
		form.setEnabled("codEspeciais", false);
		form.setEnabled("dtPagamento", false);

		var indexes = form.getChildrenIndexes("tbFornecedores");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('fornecedorProtheus___' + indexes[i], false);
			form.setEnabled('condicaoPgto___' + indexes[i], false);
			form.setEnabled('formaPagamento___' + indexes[i], false);
			form.setEnabled('bancoForn___' + indexes[i], false);
			form.setEnabled('agenciaForn___' + indexes[i], false);
			form.setEnabled('dvAgenciaForn___' + indexes[i], false);
			form.setEnabled('contaForn___' + indexes[i], false);
			form.setEnabled('frete___' + indexes[i], false);
			form.setEnabled('VlrFrete___' + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tbItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('txtCodItemProduto___' + indexes[i], false);
			form.setEnabled('txtQuantidadeProduto___' + indexes[i], false);
			form.setEnabled('txtObsProduto___' + indexes[i], false);
			form.setEnabled('txtPrecoProduto___' + indexes[i], false);
		}
		var indexes = form.getChildrenIndexes("tbFiliais");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('valorPercent___' + indexes[i], false);
			form.setEnabled('filialGuardChu___' + indexes[i], false);
		}

		bloqueiaCamposMinuta(form);
		bloqueiaCorrecaoCompras(form);
	} else if (CURRENT_STATE == VALIDACAO_DOCUMENTO) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUsuarioValidaDocumento', usuarioLogado.nome);
		form.setValue('dataValidaDocumento', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == CORRECAO_DOCUMENTO_CONTRATOS) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUserCorrecaoDocumento', usuarioLogado.nome);
		form.setValue('dataCorrecaoDocumento', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('aprovaValidaDoc', false);
		form.setVisibleById('servicoCritico', false);

		bloqueiaCompras(form);
		bloqueiaValidaDocumento(form);
	} else if (CURRENT_STATE == CORRECAO_DOCUMENTO_COMPRAS) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUsuarioCompras', usuarioLogado.nome);
		form.setValue('dataUsuarioCompras', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('servicoCritico', false);
		form.setEnabled("unidadeVigencia", false);
		form.setEnabled("vigenciaDoContrato", false);

		form.setEnabled("realizaAtividade", false);
		form.setEnabled("observacaoCorrecaoDocumento", false);
		form.setEnabled("filial", false);
		form.setEnabled("cpCc", false);
		form.setEnabled("referenciaEntrega", false);
		form.setEnabled("emailContatSolicitante", false);
		form.setEnabled("telContatSolicitante", false);
		form.setEnabled("sLocalPrestServico", false);

		var indexes = form.getChildrenIndexes("tbFiliais");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('filialGuardChu___' + indexes[i], false);
			form.setEnabled('valorPercent___' + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tbItens");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('txtCodItemProduto___' + indexes[i], false);
			form.setEnabled('txtQuantidadeProduto___' + indexes[i], false);
		}

		var indexes = form.getChildrenIndexes("tbFornecedores");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled('fornecedorProtheus___' + indexes[i], false);
		}
		bloqueiaCamposMinuta(form);
	} else if (CURRENT_STATE == CORRECAO_DOCUMENTO_SOLICITANTE) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeSolicitanteCorrecao', usuarioLogado.nome);
		form.setValue('dataSolicitanteCorrecao', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
		bloqueiaCorrecaoDocumento(form);
	} else if (CURRENT_STATE == VALIDACAO_ASSINATURA_FORNECEDOR) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeUserValidaAssinatura', usuarioLogado.nome);
		form.setValue('dataValidaAssinatura', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', true);
		form.setVisibleById('aprovaValidaDoc', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setEnabled("observacaoValidaDocumento", false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == REVISAO_CLAUSULAS) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeUserRevisaoClausulas', usuarioLogado.nome);
		form.setValue('dataRevisaoClausulas', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('aprovaValidaAssinat', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCompras(form);
		bloqueiaValidacao(form);
	} else if (CURRENT_STATE == CHANCELAMENTO_CONTRATO) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeUserChancelamentoContrato', usuarioLogado.nome);
		form.setValue('dataChancelamentoContrato', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setVisibleById('servicoCritico', false);
		bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == ASSINATURA_INTERNA || CURRENT_STATE == ASSINATURA_INTERNA_E_FORN) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeUserAssinaturaInterna', usuarioLogado.nome);
		form.setValue('dataAssinaturaInterna', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', true);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		form.setEnabled("observacaoChancelamento", false);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == INCONSISTENCIA_DADOS_PROTHEUS) {
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('solicitante', false);
		form.setVisibleById('solucaoInconsistencia', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
	} else if (CURRENT_STATE == APROVA_SOLICITANTE) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;
		form.setValue('nomeAprovaSolicitante', usuarioLogado.nome);
		form.setValue('dataAprovaSolicitante', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);

		if (form.getValue('observacaoSolucaoInconsist') == "") {
			form.setVisibleById('solucaoInconsistencia', false);
		}
		bloqueiaSolucaoInconsist(form);
		bloqueiaCompras(form);
		bloqueiaCamposMinuta(form);
	} else if (CURRENT_STATE == SOLUCAO_INCONSISTENCIA) {
		var usuarioLogado = getCurrentUser(); //Busca usuario logado;
		var data = getCurrenteDate(); //Busca data atual;

		form.setValue('nomeUserSolucaoInconsistencia', usuarioLogado.nome);
		form.setValue('dataSolucaoInconsistencia', data);
		form.setVisibleById('analiseContrato', false);
		form.setVisibleById('correcaoCompras', false);
		form.setVisibleById('validacaoDocumento', false);
		form.setVisibleById('correcaoDocumento', false);
		form.setVisibleById('correcaoSolicitante', false);
		form.setVisibleById('validaAssinatura', false);
		form.setVisibleById('revisaoClausulas', false);
		form.setVisibleById('chancelamentoContrato', false);
		form.setVisibleById('assinaturaInterna', false);
		form.setVisibleById('aprovaSoli', false);
		form.setVisibleById('btAddLinha', false);
		form.setVisibleById('btAddLinhaFilial', false);
		bloqueiaCamposMinuta(form);
		bloqueiaCompras(form);
		bloqueiaAprovacaoSolici(form);
	}
	
	//fim display fields de contrato
    
    
    
 
    
    
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

//Inicio Funcoes Contrato





//Funções para bloqueios de cada Área
function bloqueiaCompras(form) {

	var indexFiliais = form.getChildrenIndexes('tbFiliais');
	for (var i = 0; i < indexFiliais.length; i++) {
		var indice = indexFiliais[i];
		form.setEnabled("filialGuardChu___" + indice, false);
		form.setEnabled("valorPercent___" + indice, false);
	}
	var indexProdutos = form.getChildrenIndexes('tbItens');
	for (var i = 0; i < indexProdutos.length; i++) {
		var indice = indexProdutos[i];
		form.setEnabled("txtCodItemProduto___" + indice, false);
		form.setEnabled("txtQuantidadeProduto___" + indice, false);
		form.setEnabled("txtObsProduto___" + indice, false);
	}
	/*
	var indexFornecedores = form.getChildrenIndexes('tbFornecedores');
	for (var i = 0; i < indexFornecedores.length; i++) {
		var indice = indexFornecedores[i];
		form.setEnabled("fornecedorProtheus___" + indice, false);
		form.setEnabled("condicaoPgto___" + indice, false);
		form.setEnabled("formaPagamento___" + indice, false);
		form.setEnabled("prazoEntrega___" + indice, false);
		form.setEnabled("bancoForn___" + indice, false);
		form.setEnabled("agenciaForn___" + indice, false);
		form.setEnabled('dvAgenciaForn___' + indice, false);
		form.setEnabled("contaForn___" + indice, false);
		form.setEnabled("frete___" + indice, false);
		form.setEnabled("VlrFrete___" + indice, false);
	}
	*/
	
	var indexFornecedores = form.getChildrenIndexes('tbFornecedores');
	for (var i = 0; i < indexFornecedores.length; i++) {
		var indice = indexFornecedores[i];
		form.setEnabled("fornecedorProtheusContrato___" + indice, false);
		form.setEnabled("condicaoPgto___" + indice, false);
	
		form.setEnabled("formaPagamento___" + indice, false);
		form.setEnabled("prazoEntregaContrato___" + indice, false);
		form.setEnabled("bancoFornContrato___" + indice, false);
		form.setEnabled("agenciaFornContrato___" + indice, false);
		form.setEnabled('dvAgenciaFornContrato___' + indice, false);
		form.setEnabled("contaFornContrato___" + indice, false);
		form.setEnabled("frete___" + indice, false);
		form.setEnabled("VlrFrete___" + indice, false);
	}
	form.setEnabled("filial", false);
	form.setEnabled("filialcontrato", false);
	form.setEnabled("emailContatSolicitante", false);
	form.setEnabled("emailContatSolicitanteContrato", false);
	form.setEnabled("telContatSolicitante", false);
	form.setEnabled("telContatSolicitanteContrato", false);
	form.setEnabled("sLocalPrestServico", false);
	form.setEnabled("sLocalPrestServicoContrato", false);
	form.setEnabled("cnpjFilial", false);
	form.setEnabled("codProduto", false);
	form.setEnabled("loteProduto", false);
	form.setEnabled("validadeProduto", false);
	form.setEnabled("tipoDesvio", false);
	form.setEnabled("notificacaoNotivisa", false);
	form.setEnabled("aceiteEvidencia", false);
	form.setEnabled("descricaoDesvio", false);
	form.setEnabled("fornecedor", false);
	form.setEnabled("fornecedorContrato", false);
	form.setEnabled("nfProduto", false);
	form.setEnabled("numSeloRastreabilidade", false);
	form.setEnabled("qtdDesvio", false);
	form.setEnabled("cpCc", false);
	form.setEnabled("referenciaEntrega", false);
	form.setEnabled("indice", false);
	form.setEnabled("tipoIndice", false);
	form.setEnabled("tipoContrato", false);
	form.setEnabled("tipoContratoContrato", false);
	
	
	
	form.setEnabled("emailComercial", false);
	form.setEnabled("emailComercialContrato", false);
	form.setEnabled("telefoneComercial", false);
	form.setEnabled("telefoneComercialContrato", false);
	form.setEnabled("contatoComercial", false);
	form.setEnabled("contatoComercialContrato", false);
	form.setEnabled("sPrioridadeProduto", false);
	form.setEnabled("dtNecessidadeProduto", false);
	form.setEnabled("txtObsProduto", false);
	form.setEnabled("txtObsProdutoContrato", false);
	form.setEnabled("objetoContrato", false);
	form.setEnabled("objetoContratoContrato", false);
	form.setEnabled("codTipoContrato", false);
	form.setEnabled("reajusteContrato", false);
	form.setEnabled("reajusteContratoContrato", false);
	form.setEnabled("rescisaoContrato", false);
	form.setEnabled("rescisaoContratoContrato", false);
	//form.setEnabled("valorTotalServico", false);
	form.setEnabled("btAddLinha", false);
	form.setEnabled('btAddLinhaFilial', false);
	form.setEnabled("alteraValor", false);
	form.setEnabled("infoAdicionaisComp", false);
	form.setEnabled("vigenciaDoContrato", false);
	form.setEnabled("vigenciaDoContratoContrato", false);
	form.setEnabled("unidadeVigencia", false);
	form.setEnabled("unidadeVigenciaContrato", false);

	form.setEnabled("composicaoPrecos", false);
	form.setEnabled("composicaoPrecosContrato", false);
	form.setEnabled("qtdParcelas", false);
	form.setEnabled("qtdParcelasContrato", false);
	form.setEnabled("gestorContrato", false);
	form.setEnabled("gestorContratoContrato", false);
	/* form.setEnabled("numPropTecnica", false); */
	form.setEnabled("numPropComercial", false);
	form.setEnabled("numPropComercialContrato", false);
	form.setEnabled("minutaPadrao", false);
	form.setEnabled("dtTermoContrato", false);
	//form.setEnabled("dtAssinaContrato", false);
	form.setEnabled("anexo1Contrato", false);
	form.setEnabled("anexo2Contrato", false);
	form.setEnabled("anexo3Contrato", false);
	form.setEnabled("anexo4Contrato", false);
	form.setEnabled("anexo5Contrato", false);
	form.setEnabled("anexoOutrosContrato", false);
	form.setEnabled("anexo1", false);
	form.setEnabled("anexo2", false);
	form.setEnabled("anexo3", false);
	form.setEnabled("anexo4", false);
	form.setEnabled("anexo5", false);
	form.setEnabled("anexoOutros", false);
	form.setEnabled("codEspeciais", false);
	form.setEnabled("codEspeciaisContrato", false);
	form.setEnabled("dtPagamento", false);
	form.setEnabled("dtPagamentoContrato", false);

}

function bloqueiaAnaliseContrato(form) {
	form.setEnabled("aprovadoAnaliseContrato", false);
	form.setEnabled("reprovadoAnaliseContrato", false);
	form.setEnabled("observacaoAnliseContrato", false);
}

function bloqueiaCorrecaoCompras(form) {
	form.setEnabled("correcaoSolicitacao", false);
	form.setEnabled("observacaoUsuarioCompras", false);
}

function bloqueiaValidaDocumento(form) {
	form.setEnabled("aprovadoValidaDocumento", false);
	form.setEnabled("reprovadoValidaDocumento", false);

	if (form.getValue("observacaoValidaDocumento") != "") {
		form.setEnabled("observacaoValidaDocumento", true);
	} else {
		form.setEnabled("observacaoValidaDocumento", false);
	}
}

function bloqueiaCorrecaoDocumento(form) {
	form.setEnabled("realizaAtividade", false);
	form.setEnabled("observacaoCorrecaoDocumento", false);
	form.setEnabled("filial", false);
	form.setEnabled("cpCc", false);
	form.setEnabled("referenciaEntrega", false);
	form.setEnabled("emailContatSolicitante", false);
	form.setEnabled("telContatSolicitante", false);
	form.setEnabled("sLocalPrestServico", false);
	form.setEnabled("objetoContrato", false);
	form.setEnabled("reajusteContrato", false);
	form.setEnabled("tipoIndice", false);
	form.setEnabled("rescisaoContrato", false);
	form.setEnabled("unidadeVigencia", false);
	form.setEnabled("vigenciaDoContrato", false);
	form.setEnabled("tipoContrato", false);
	form.setEnabled("contatoComercial", false);
	form.setEnabled("emailComercial", false);
	form.setEnabled("telefoneComercial", false);
	form.setEnabled("composicaoPrecos", false);
	form.setEnabled("qtdParcelas", false);
	form.setEnabled("gestorContrato", false);
	/* form.setEnabled("numPropTecnica", false); */
	form.setEnabled("numPropComercial", false);
	form.setEnabled("minutaPadrao", false);
	form.setEnabled("dtTermoContrato", false);
	//form.setEnabled("dtAssinaContrato", false);
	form.setEnabled("anexo1", false);
	form.setEnabled("anexo2", false);
	form.setEnabled("anexo3", false);
	form.setEnabled("anexo4", false);
	form.setEnabled("anexo5", false);
	form.setEnabled("anexoOutros", false);
	form.setEnabled("codEspeciais", false);
	form.setEnabled("dtPagamento", false);


	var indexes = form.getChildrenIndexes("tbFiliais");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled('filialGuardChu___' + indexes[i], false);
		form.setEnabled('valorPercent___' + indexes[i], false);
	}

	var indexes = form.getChildrenIndexes("tbItens");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled('txtCodItemProduto___' + indexes[i], false);
		form.setEnabled('txtQuantidadeProduto___' + indexes[i], false);
	}

	var indexes = form.getChildrenIndexes("tbFornecedores");
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled('fornecedorProtheus___' + indexes[i], false);
	}
}

function bloqueiaValidacao(form) {
	form.setEnabled("observacaoValidaAssinatura", false);
}

function bloqueiaAssinatura(form) {
	form.setEnabled("observacaoAssinaturaInterna", false);
}

function bloqueiaAprovacaoSolici(form) {
	form.setEnabled("numContratoProtheus", false);
	form.setEnabled("aprovadoSolicitante", false);
	form.setEnabled("reprovadoSolicitante", false);
	form.setEnabled("observacaoSolicitante", false);
}

function bloqueiaSolucaoInconsist(form) {
	form.setEnabled("observacaoSolucaoInconsist", false);
}

function bloqueiaCamposMinuta(form) {
	form.setEnabled("nomeTestemunha1", false);
	form.setEnabled("cpfTestemunha1", false);
	form.setEnabled("rgTestemunha1", false);
	form.setEnabled("nomeTestemunha2", false);
	form.setEnabled("cpfTestemunha2", false);
	form.setEnabled("rgTestemunha2", false);

}






























