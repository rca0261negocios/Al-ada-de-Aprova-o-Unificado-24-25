function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	GETSLA()
	var ATIVIDADE_INICIO = 0;
	var ATIVIDADE_INICIO_1 = 1;
	var ATIVIDADE_COTACAO = 4;
	var ATIVIDADE_DEFINIR_VENCEDOR = 6;
	var ATIVIDADE_ANALISE_COMPRADOR = 14;
	var ATIVIDADE_ANEXAR_MINUTA = 42;
	var ATIVIDADE_VALIDAR_MINUTA = 43;
	var ATIVIDADE_RECOLHER_ASSINATURA_E_DIGITALIZAR_CONTRATO = 49;
	var ATIVIDADE_GERAR_CONTRATO_PROTHEUS = 50;
	var PARECER_USUARIO = 149;
	var ATIVIDADE_EMITIR_PEDIDO_COMPRA = 10;
	var ATIVIDADE_FIM_PEDIDO_COMPRA = 62;
	var ATIVIDADE_E_CONTRATO = 38;
	var ATIVIDADE_TERMINO_APROVACAO = 103;
	var ATIVIDADE_APROVACAO_ALCADA = 189;

	var currentState = parseInt(getValue("WKNumState"));

	hAPI.setCardValue("txtSolicitacao", getValue("WKNumProces"));

	if (currentState == ATIVIDADE_INICIO || currentState == ATIVIDADE_INICIO_1) {
		if (hAPI.getCardValue("isRegularizadora") == "sim") {
			var anexos = hAPI.listAttachments();
			var qtdAnexos = anexos.size();
			if (qtdAnexos == 0) {
				throw "É preciso anexar ao menos um documento para continuar o processo";
			}
		}
		hAPI.setCardValue("contadorAlcada", "1");
	}
	if (currentState == ATIVIDADE_COTACAO) {
		//Verifica anexo obrigatório para cotação fechada
		/* var prioridadeCotacao = 'EN';
		if (prioridadeCotacao.indexOf(hAPI.getCardValue('hiddenPrioridadeSolicitacao')) != -1 && hAPI.getCardValue('rdTipoCotacao') == 'fechada' && hAPI.getCardValue("grupoAnaliseComprador") != hAPI.getCardValue("poolAbertura")) {
			var list_anexo = hAPI.listAttachments();
			var anexoCotacao = false;
			for (var i = 0; i < list_anexo.size(); i++) {
				var row = list_anexo.get(i);
				if (row.getDocumentDescription().indexOf('Mapa de Cotação') != -1 &&
					row.getDocumentDescription().indexOf('pdf') != -1) {
					anexoCotacao = true;
					break;
				}
			}
			if (!anexoCotacao) {
				throw "É preciso anexar o Mapa de Cotação em pdf contendo o nome: Mapa de Cotação";
			}
		} */
	}
	if (currentState == ATIVIDADE_DEFINIR_VENCEDOR && getValue("WKCompletTask") == "true") {
		//Busca todos os aprovadores das alcadas e seta no DOM
		if (buscaTodosAprovadoresAlcadas() == true) {
			aprovaAlcada(hAPI.getCardValue("contadorAlcada"), getAprovadoresDom(), true);
		}
	} else if (currentState == PARECER_SOLICITANTE && getValue("WKCompletTask") == "true" &&
		(hAPI.getCardValue("motivoReprovacao") == "centroCusto" || hAPI.getCardValue("motivoReprovacao") == "filial" ||
			hAPI.getCardValue("motivoReprovacao") == "parecerSolicitante")) {
		//Busca todos os aprovadores das alcadas e seta no DOM
		if (buscaTodosAprovadoresAlcadas() == true) {
			// reinicia alçada
			hAPI.setCardValue("contadorAlcada", 1);
			aprovaAlcada(1, getAprovadoresDom(), true);
		}
	} else if (currentState == PARECER_SOLICITANTE && getValue("WKCompletTask") == "true") {
		var alcada = hAPI.getCardValue("contadorAlcada");
		//seta o aprovador atual para o aprovador que reprovou
		hAPI.setCardValue("aprovadorAtual", LISTA_APROVADORES_DOM[alcada - 1].id);
	}

	//FLUIG-93 Auto incremento para a ativide de repetição de aprovação de alçadas
	if (currentState == ATIVIDADE_APROVACAO_ALCADA) {
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

function buscaTodosAprovadoresAlcadas() {
	var grupoAnaliseComprador = hAPI.getCardValue("grupoAnaliseComprador");
	//Busca todos os aprovadores das alcadas e seta no DOM
	var aprovadores = getAprovadoresAlcada(hAPI.getCardValue("FilialAlcada"), grupoAnaliseComprador, hAPI.getCardValue("txtCodCentroCusto"));
	console.log("aprovadores");
	console.log(aprovadores);
	var listaAprovadores = retornaAprovadores(aprovadores);
	console.log("listaAprovadores");
	console.log(listaAprovadores);
	console.log("tipoMatMed");
	console.log(tipoMatMed);
	if (listaAprovadores.length > 0) {
		setAprovadoresDOM(listaAprovadores);
		return true;
		//		aprovaAlcada(hAPI.getCardValue("contadorAlcada"), getAprovadoresDom(), true);
	} else if (tipoMaterial(grupoAnaliseComprador) == tipoMatMed) {
		var existeAlcada = false;
		for (var i in aprovadores) {
			log.info("aprovadores for")
			
			if (aprovadores.existeAlcada == true) {
				existeAlcada = true;
				break;
			}
		}
		if (!existeAlcada) {
			throw "Nehnuma Alçada de Mat/Med cadastrado para filial.";
		}
	} else {
		throw "Nehnuma Alçada ou Centro de custo cadastrado para filial.";
	}
}

/*
 * Função que torna anexos obrigatórios em qualquer atividade.
 */
function verificaAnexo(mensgem) {
	var qtdAnexosCampo = parseInt(hAPI.getCardValue("qtdAnexos"));
	var instanceId = getValue('WKNumProces');
	var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', instanceId, instanceId, ConstraintType.MUST);
	var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment], null);
	var documentId = datasetProcessAttachment.getValue(0, 'documentId');
	var constraintProcessAttachment2 = DatasetFactory.createConstraint('documentId', documentId, documentId, ConstraintType.MUST_NOT);
	datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment, constraintProcessAttachment2], null);

	var qtdAnexos = datasetProcessAttachment.rowsCount;
	if (qtdAnexos > qtdAnexosCampo) {
		hAPI.setCardValue("qtdAnexos", qtdAnexos);
	} else {
		throw mensgem;
	}
}