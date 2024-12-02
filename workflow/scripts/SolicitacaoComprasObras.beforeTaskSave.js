function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	GETSLA()
	var CURRENT_STATE = getValue("WKNumState");

	if ((nextSequenceId == VALIDAR_PROPOSTA && CURRENT_STATE != CORRIGIR_SOLICITACAO) &&
		(nextSequenceId == VALIDAR_PROPOSTA && CURRENT_STATE != APROVADO) ||
		nextSequenceId == VALIDAR_MINUTA) {
		validateAttachment(); //import validateAttachment.js
	} else if (nextSequenceId == VALIDAR_PROPOSTA &&
		(CURRENT_STATE == CORRIGIR_SOLICITACAO || CURRENT_STATE == APROVADO)) {
		log.info("hAPI.listAttachments().size():" + hAPI.listAttachments().size())
		if (hAPI.listAttachments().size() < 0) {
			validateAttachment();
		}
	}

	if (CURRENT_STATE == DEFINIR_VENCEDOR && getValue("WKCompletTask") == "true") {
		//Busca todos os aprovadores das alcadas e seta no DOM
		var aprovadores = getAprovadoresAlcada(hAPI.getCardValue("FilialAlcada"), hAPI.getCardValue("grupoAnaliseComprador"), hAPI.getCardValue("txtCodCentroCusto"));
		var listaAprovadores = retornaAprovadores(aprovadores);

		if (listaAprovadores.length > 0) {
			setAprovadoresDOM(listaAprovadores);
			aprovaAlcada(hAPI.getCardValue("contadorAlcada"), getAprovadoresDom(), true);
		} else {
			throw "Nehnuma Alçada ou Centro de custo cadastrado para filial.";
		}

		if (hAPI.getCardValue("rdTeveNegociacao") == "sim") validateAttachment();
	}
	//FLUIG-93 Auto incremento para a ativide de repetição de aprovação de alçadas
	if (CURRENT_STATE == ALCADA_APROVACAO) {
		var LISTA_APROVADORES_DOM = getAprovadoresDom();
		var alcada = hAPI.getCardValue("contadorAlcada");
		if (hAPI.getCardValue("rdAprovadoAlcada" + alcada) != "naprov") {
			if (parseInt(alcada) < LISTA_APROVADORES_DOM.length) {
				var contadorAlcada = 1;
				for (var i = alcada; i < LISTA_APROVADORES_DOM.length; i++) {
					var proximoAprovador = LISTA_APROVADORES_DOM[i];
					var proximaAlcada = parseInt(alcada) + contadorAlcada;
					var aprovadorRepitido = false;
					for (var x = 0; x < alcada; x++) {
						if (LISTA_APROVADORES_DOM[x].id == proximoAprovador.id) {
							aprovadorRepitido = true;
							break;
						}
					}
					if (proximoAprovador.conhecimento == 'true' || proximoAprovador.aprovacaoExistente == 'true' || aprovadorRepitido == true) {
						aprovaAutomatico(proximaAlcada, proximoAprovador);
						contadorAlcada++;
					} else {
						break;
					}
				}
				hAPI.setCardValue("contadorAlcada", parseInt(alcada) + contadorAlcada);
			}
		}
	}
}