function displayFields(form, customHTML){
	
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
	
	// INICIO
	if(atividade == INICIO){
		form.setValue("idRequisitante", getValue("WKUser"));
		form.setValue("txtNmRequisitante", retornaUsuario(getValue("WKUser")));	
	} else {
		// SEGURANCA CAMPO IDENTIFICADOR - strCriticidade, strUnidade, strDataInicial,strOutrosParam
		// SM2 - RCA 06.02.24
		if( form.getValue("campoIdentificador") == ""   || 
			form.getValue("campoIdentificador") == null ){ 
			var campoIdentificador = form.getValue("prioridadeGeral"      ) +" - "+
									form.getValue("filial"           ) +" - DA "+
									form.getValue("dtEmissao"        ) +" - "+
									form.getValue("hiddenTipoProduto");  
			form.setValue("campoIdentificador", campoIdentificador);
		}
		
	}
	
	if(atividade == INICIO || atividade == INICIO_1 ){
		var cdSolicitante = buscarUsuarioLogado();
		var userMail = buscarMailUsuarioLogado();
		gravarValorCampo(form, "cdSolicitante", cdSolicitante);
		form.setValue("emailSolicitante", userMail);
		var dataAbertura = new Date();
		var dataAtual = formataTempo(dataAbertura.getDate()) + "/" + formataTempo((dataAbertura.getMonth()+1)) + "/" + dataAbertura.getFullYear();
		form.setValue("dtEmissao", dataAtual);
		form.setEnabled('zoomFilial',true);
	}else{
		form.setEnabled('zoomFilial',false);
	}
	if(atividade == APROVAR_PRODUTO_TI){
		form.setValue("nomeGestorTI",buscarNomeUsuarioLogado());
		form.setValue("dataGestorTI",buscarDataAtual());
		
	}
	if(atividade != APROVACAO_SOLICITANTE && atividade != SOLUCAO_INCONSISTENCIA && atividade != FIM__){
		ocultarCampoSolucao(form, customHTML);
		
	}

	if(atividade ==  PARECER_SOLICITANTE && form.getValue("motivoReprovacao") != 'valor'){
		form.setValue("contadorAlcada", "1");
		form.setEnabled('zoomFilial',false)
	}
	
	if(atividade == APROVACAO_SOLICITANTE){
		formularioAprovacaoDaSolucao(form, customHTML);
		form.setEnabled('zoomFilial',false)
	}
	
	if(atividade == ANALISE_COMPRADOR){
		form.setEnabled('zoomFilial',false)
		var numeroFicha = form.getDocumentId();
		form.setValue("numeroFicha", numeroFicha);
		form.setValue("nomeCompradorCotacao", retornaUsuario(getValue("WKUser")));
		form.setValue("analyticsNmResponsavelSLA", retornaUsuario(getValue("WKUser")));
		
	}

	if(atividade == COTACAO){
		form.setEnabled('zoomFilial',false)
		var codigo = getValue("WKUser");
		
		var nomeCompradorCotacao = "";
		var emailCompradorCotacao = "";
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", codigo, codigo, ConstraintType.MUST);
		var constraints = new Array(c1);
		var comprador = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		if (comprador.rowsCount > 0) {
			nomeCompradorCotacao = comprador.getValue(0,"colleagueName");			
			emailCompradorCotacao = comprador.getValue(0,"mail");
			
		}
		
		form.setValue("nomeCompradorCotacao", nomeCompradorCotacao);
		form.setValue("emailCompradorCotacao", emailCompradorCotacao);

		/*
		$("[name^=justAjusteCotacao___]").each(function(){
			enableField($(this), true);
			//form.setEnabled('zoomFilial',true);
		});
		*/
		var indexes = form.getChildrenIndexes("tbItens");	

		for (var i = 0; i < indexes.length; i++) {
			
			form.setVisibleById("justAjusteCotacao___" + indexes[i], true);
			form.setEnabled("justAjusteCotacao___" + indexes[i],true);
			
		}

		/*
		$("[name^=justAjusteCotacao___]").each(function(){
			//enableField($(this), false);
			form.setEnabled('zoomFilial',true)
		});
		*/

		//form.setEnabled('zoomFilial',true)
		
		
	}

	if(atividade == CORRECAO_COTACAO){
		form.setEnabled('zoomFilial',false)
		var codigo = getValue("WKUser");
		
		var nomeCompradorCotacao = "";
		var emailCompradorCotacao = "";
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", codigo, codigo, ConstraintType.MUST);
		var constraints = new Array(c1);
		var comprador = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		if (comprador.rowsCount > 0) {
			nomeCompradorCotacao = comprador.getValue(0,"colleagueName");			
			emailCompradorCotacao = comprador.getValue(0,"mail");
			
		}
		
		form.setValue("nomeCompradorCotacao", nomeCompradorCotacao);
		form.setValue("emailCompradorCotacao", emailCompradorCotacao);

		var indexes = form.getChildrenIndexes("tbItens");	

		for (var i = 0; i < indexes.length; i++) {
			
			form.setVisibleById("justAjusteCotacao___" + indexes[i], true);
			form.setVisibleById("btZoomProduto___" + indexes[i], true);
			
		}

	}

	if (atividade == DEFINIR_VENCEDOR){
		form.setEnabled('zoomFilial',false)
		var qtdItens = form.getChildrenIndexes("tbItens").length;
		var qtdCotacoes = form.getChildrenIndexes("tbCotacoes").length;
		form.setValue("qtdCotacao", (qtdCotacoes/qtdItens)+'');

		var indexes = form.getChildrenIndexes("tbItens");	

		for (var i = 0; i < indexes.length; i++) {
			
			form.setEnabled("txtObsProduto___" + indexes[i], false);
			
		}
	}

	if(atividade == ANEXAR_MINUTA){
		form.setValue("contratoAprovado", "true");
		form.setEnabled('zoomFilial',false);
	}
	
	var dataAbertura = new Date();
	var dataAtual = formataTempo(dataAbertura.getDate()) + "/" + formataTempo((dataAbertura.getMonth()+1)) + "/" + dataAbertura.getFullYear()
	var APROVACAO_ALCADA = 189;
	
	if(atividade == APROVACAO_ALCADA){
		form.setEnabled('zoomFilial',false)
		switch (form.getValue("contadorAlcada")) {
		case 1:
			form.setValue("dataAprovacaoAlcada1", dataAtual);
			break;
		case 2:
			form.setValue("dataAprovacaoAlcada2", dataAtual);
			break;
		case 3:
			form.setValue("dataAprovacaoAlcada3", dataAtual);
			break;
		case 4:
			form.setValue("dataAprovacaoAlcada4", dataAtual);
			break;
		default:
			break;
		}
	}
	
	form.setValue("txtSolicitacao", getValue("WKNumProces"));
	if(getValue("WKNumState") != undefined && getValue("WKNumState") != null){
		form.setValue("cdAtividade", getValue("WKNumState"));
		customHTML.append("<script> var CURRENT_STATE = "+getValue("WKNumState")+";</script>"); 
	}
	customHTML.append("<script> var FORM_MODE = '"+ form.getFormMode() +"';</script>");
	customHTML.append("<script> inicialMobile();</script>");
	
	form.setShowDisabledFields(true);
	
	
	
	if(atividade == REGULARIZADORA){
		form.setEnabled('zoomFilial',false)
		if(form.getFormMode() != "VIEW") {
			form.setValue("nomeAprovRegularizadora", retornaUsuario(getValue("WKUser")));
			form.setValue("dataAprovRegularizadora", dataAtual);
		}
		
	}
	
	if(atividade != REGULARIZADORA){

		form.setEnabled("decisaoAprovRegularizadora", false);
		form.setEnabled("motivoAprovRegularizadora", false);
		if(form.getValue("decisaoAprovRegularizadora") == "sim" || form.getValue("motivoAprovRegularizadora") == ""){
			customHTML.append("<script>$('#aprovacaoRegularizadora').hide();</script>");
		}
		
	}
	
	if(atividade != INICIO && atividade != INICIO_1 ){

		if(form.getValue("prioridadeGeral") == "E"){
			form.setVisibleById("div_motivoEmergencial", true);
		}

	}
	
	
	
}


function formataTempo(i) {
	if (i<10) { i="0" + i; }
	return i;
}

function ocultarCampoSolucao(form, customHTML) {
	ocultarCampo(customHTML, "solucao");
}

function formularioAprovacaoDaSolucao(form, customHTML) {
	if(buscarValorCampo(form, "aceite") == "S"){
		ocultarCampo(customHTML, "complementoSolicitante");
	} else {
		ocultarCampo(customHTML, "divBtnPesquisa");
	}
	if(buscarValorCampo(form, "retorno") == ""){
		ocultarCampo(customHTML, "complementoAnalista");
	}
}
