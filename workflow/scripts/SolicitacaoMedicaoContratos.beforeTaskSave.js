function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	GETSLA()
	var ATIVIDADE = getValue("WKNumState");

	//log.info("Valor da nota: " + hAPI.getCardValue("pergunta1_documentos"));

	if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR_INCONSISTENCIA) {

		var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
		var constraints = new Array(c1);
		var dataset = DatasetFactory.getDataset("ds_configMedicaoContratos", null, constraints, null);
		var bloqueio = "";

		if (dataset != null && dataset.rowsCount != 0) {
			bloqueio = dataset.getValue(0, "bloqueio");
		}

		if (bloqueio != "Sim") {

			var anexos = hAPI.listAttachments();
			var qtdAnexos = anexos.size();

			if (qtdAnexos == 0) {
				throw "É preciso anexar ao menos um documento para continuar o processo";
			}

		}

	}

	if (ATIVIDADE == CORRIGIR_INCONSISTENCIA) {

		hAPI.setCardValue("nomeAprovGestor1", "");
		hAPI.setCardValue("dataAprovGestor1", "");
		hAPI.setCardValue("decisaoGestor1", "");
		hAPI.setCardValue("motivoAprovGestor1", "");

		hAPI.setCardValue("nomeAprovGestor2", "");
		hAPI.setCardValue("dataAprovGestor2", "");
		hAPI.setCardValue("decisaoGestor2", "");
		hAPI.setCardValue("motivoAprovGestor2", "");

		hAPI.setCardValue("nomeAprovGestor3", "");
		hAPI.setCardValue("dataAprovGestor3", "");
		hAPI.setCardValue("decisaoGestor3", "");
		hAPI.setCardValue("motivoAprovGestor3", "");

		hAPI.setCardValue("nomeAprovGestor4", "");
		hAPI.setCardValue("dataAprovGestor4", "");
		hAPI.setCardValue("decisaoGestor4", "");
		hAPI.setCardValue("motivoAprovGestor4", "");

		hAPI.setCardValue("nomeAprovGestor5", "");
		hAPI.setCardValue("dataAprovGestor5", "");
		hAPI.setCardValue("decisaoGestor5", "");
		hAPI.setCardValue("motivoAprovGestor5", "");

		hAPI.setCardValue("nomeAprovTratativaMedicao", "");
		hAPI.setCardValue("dataAprovTratativaMedicao", "");
		hAPI.setCardValue("decisaoTratativaMedicao", "");
		hAPI.setCardValue("motivoAprovTratativaMedicao", "");

		hAPI.setCardValue("nomeAprovFiscal", "");
		hAPI.setCardValue("dataAprovFiscal", "");
		hAPI.setCardValue("decisaoFiscal", "");
		hAPI.setCardValue("motivoAprovFiscal", "");

		hAPI.setCardValue("nomeAprovTitulo", "");
		hAPI.setCardValue("dataAprovTitulo", "");
		hAPI.setCardValue("decisaoTitulo", "");
		hAPI.setCardValue("motivoAprovTitulo", "");

		hAPI.setCardValue("nomeAprovSolicitacao", "");
		hAPI.setCardValue("dataAprovSolicitacao", "");
		hAPI.setCardValue("decisaoAprovSolicitacao", "");
		hAPI.setCardValue("motivoAprovSolicitacao", "");

		hAPI.setCardValue("nomeInconsistencia", "");
		hAPI.setCardValue("dataInconsistencia", "");
		hAPI.setCardValue("solucaoInconsistencia", "");

		hAPI.setCardValue("medicao", "");
		hAPI.setCardValue("pedidoMedicao", "");
		hAPI.setCardValue("obsMedicao", "");

	}

	if (ATIVIDADE == AVALIACAO_GESTOR) {
		hAPI.setCardValue("nivelAtualAprovacao", parseInt('' + hAPI.getCardValue("nivelAtualAprovacao")) + 1);
	}

	if (ATIVIDADE == TRATATIVA_MEDICAO) {

		hAPI.setCardValue("nomeAprovFiscal", "");
		hAPI.setCardValue("dataAprovFiscal", "");
		hAPI.setCardValue("decisaoFiscal", "");
		hAPI.setCardValue("motivoAprovFiscal", "");

		hAPI.setCardValue("nomeAprovTitulo", "");
		hAPI.setCardValue("dataAprovTitulo", "");
		hAPI.setCardValue("decisaoTitulo", "");
		hAPI.setCardValue("motivoAprovTitulo", "");

		hAPI.setCardValue("nomeAprovSolicitacao", "");
		hAPI.setCardValue("dataAprovSolicitacao", "");
		hAPI.setCardValue("decisaoAprovSolicitacao", "");
		hAPI.setCardValue("motivoAprovSolicitacao", "");

		hAPI.setCardValue("nomeInconsistencia", "");
		hAPI.setCardValue("dataInconsistencia", "");
		hAPI.setCardValue("solucaoInconsistencia", "");

	}

	if (ATIVIDADE == VALIDACAO_FISCAL) {

		hAPI.setCardValue("nomeAprovTitulo", "");
		hAPI.setCardValue("dataAprovTitulo", "");
		hAPI.setCardValue("decisaoTitulo", "");
		hAPI.setCardValue("motivoAprovTitulo", "");

		hAPI.setCardValue("nomeAprovSolicitacao", "");
		hAPI.setCardValue("dataAprovSolicitacao", "");
		hAPI.setCardValue("decisaoAprovSolicitacao", "");
		hAPI.setCardValue("motivoAprovSolicitacao", "");

		hAPI.setCardValue("nomeInconsistencia", "");
		hAPI.setCardValue("dataInconsistencia", "");
		hAPI.setCardValue("solucaoInconsistencia", "");

	}

}