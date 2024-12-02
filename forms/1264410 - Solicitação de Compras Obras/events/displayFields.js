function displayFields(form, customHTML){
	var atividade = getValue("WKNumState");

	customHTML.append("<script>$('span.fluig-style-guide.fs-md-space').removeClass('fs-md-space');</script>");
	form.setEnabled('formaPagamento',false);
	if(atividade == INICIO_1){
		form.setValue("idRequisitante", getValue("WKUser"));
		form.setValue("txtNmRequisitante", retornaUsuario(getValue("WKUser")));
	}

	if(atividade == INICIO || atividade == INICIO_1 || atividade == ''){
		var cdSolicitante = buscarUsuarioLogado();
		gravarValorCampo(form, "cdSolicitante", cdSolicitante);
		var dataAbertura = new Date();
		var dataAtual = formataTempo(dataAbertura.getDate()) + "/" + formataTempo((dataAbertura.getMonth()+1)) + "/" + dataAbertura.getFullYear();

		form.setValue("dtEmissao", dataAtual);
	}
	if(atividade != APROVACAO_DO_SOLICITANTE && atividade != FIM_2){
		ocultarCampoSolucao(form, customHTML);
	}

	if(atividade == APROVACAO_DO_SOLICITANTE){
		formularioAprovacaoDaSolucao(form, customHTML);
	}

	//removido pois a atividade análise comprador não existe mais no processo.
	/*if(atividade == ANALISE_COMPRADOR){

		var numeroFicha = form.getDocumentId();

		log.info(">>>numeroFicha (ANALISE_COMPRADOR) = " + numeroFicha);
		form.setValue("numeroFicha", numeroFicha);
		form.setValue("nomeCompradorCotacao", retornaUsuario(getValue("WKUser")));
		form.setValue("analyticsNmResponsavelSLA", retornaUsuario(getValue("WKUser")));

	}*/

	 //alterado de atividade COTACAO para atividade GERAR_COTACAO_FORNECEDOR
	if(atividade == GERAR_COTACAO_FORNECEDOR){

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
		form.setEnabled('formaPagamento',true);

	}

	if(atividade == COTACAO){

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


	}

	/*
	if(form.getFormMode() == "VIEW")  {
		form.setHideDeleteButton(true);
	}
	if(atividade == COTACAO){
		form.setHideDeleteButton(true);
	}
	if(atividade == GERA_COTACAO_){
		form.setHideDeleteButton(true);
	}
	*/

	if(atividade == ANEXAR_MINUTA_PARA_VALIDACAO){
		form.setValue("contratoAprovado", "true");
	}


	var dataAbertura = new Date();
	var dataAtual = formataTempo(dataAbertura.getDate()) + "/" + formataTempo((dataAbertura.getMonth()+1)) + "/" + dataAbertura.getFullYear()
	var APROVACAO_ALCADA = 137;

	if(atividade == APROVACAO_ALCADA){
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


	if(atividade == COTACAO){
		form.setValue("contadorAlcada", "1");
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
	}
	if(buscarValorCampo(form, "retorno") == ""){
		ocultarCampo(customHTML, "complementoAnalista");
	}
}
