function afterTaskSave(colleagueId, nextSequenceId, userList) {

	if ((nextSequenceId == 39 || nextSequenceId == '39') && hAPI.getCardValue("aprovacaoEntrega") != "sim") {

		try {
			//Monta mapa com parâmetros do template
			var parametros = new java.util.HashMap();
			parametros.put("NUMSOLICITACAO", hAPI.getCardValue("codSolicitacao"));
			parametros.put("NOMESOLICITANTE", hAPI.getCardValue("nomeSolicitante"));

			var assuntoEmail = 'ENCERRAMENTO AUTOMÁTICO SOLICITAÇÃO ';
			assuntoEmail += hAPI.getCardValue("codSolicitacao");

			//Este parâmetro é obrigatório e representa o assunto do e-mail
			parametros.put("subject", assuntoEmail);
			//Monta lista de destinatários
			var destinatarios = new java.util.ArrayList();
			//destinatarios.add("ae74d6181db511eabd7a726acb7f424e");
			//destinatarios.add(hAPI.getCardValue("codAprovador"));
			destinatarios.add(hAPI.getCardValue("emailSolicitante"));


			//Envia e-mail
			notifier.notify("imwn2dyhbuywfa0f1522083830483", "notifica_finalizacao_automatica", parametros, destinatarios, "text/html");

		} catch (e) {
			log.info(e);
		}


	}

	var CURRENT_STATE = getValue('WKNumState');

	if (CURRENT_STATE == 0 ||
		CURRENT_STATE == AtividadeEnum.INICIO) {
		preencherIdentificador();
		hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
	}

	if (CURRENT_STATE == AtividadeEnum.ALCADA_APROVACAO) {
		var contadorAlcada = hAPI.getCardValue('contadorAlcada');
		//Adiciona os motivos de reprovação nos comentarios da solicitação
		if (hAPI.getCardValue("aprovacaoAlcada" + contadorAlcada) == 'nao') {
			hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, "Solicitação Reprovada na Alçada! \n" + hAPI.getCardValue("motivoRepovacaoAlcada" + contadorAlcada));
		}
		hAPI.setCardValue('contadorAlcada', parseInt(contadorAlcada) + 1);
	}
}

function preencherIdentificador() {
	var unidade = hAPI.getCardValue("filial");
	var dataInicial = hAPI.getCardValue("dataSolicitacao");
	var outrosParam = [];

	// outrosParam.push(hAPI.getCardValue("hiddenTipoProdSolicitacao"));
	//	outrosParam.push(hAPI.getCardValue("hiddenTipoProduto"));

	var identificador = new objIdentificador("", unidade, dataInicial, outrosParam);
}