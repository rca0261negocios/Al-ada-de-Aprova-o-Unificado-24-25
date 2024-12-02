function afterTaskSave(colleagueId, nextSequenceId, userList) {

	if ((nextSequenceId == 39 || nextSequenceId == '39') && hAPI.getCardValue("aprovacaoFaturamento") != "sim") {

		notificacaoEncerramento(hAPI.getCardValue('emailSolicitante'), hAPI.getCardValue('codSolicitacao'))

	}
	
	var CURRENT_STATE = getValue('WKNumState');
	var idFluxo = hAPI.getCardValue("idFluxo");
	if (CURRENT_STATE == INICIO || CURRENT_STATE == 0 || CURRENT_STATE == CORRECAO_SOLICITANTE) {
		hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));

		//Busca os aprovadores da solicitação
		var valorTotal = hAPI.getCardValue("valorTotal")
		if (valorTotal != "") {
			var aprovadores = getAprovadores(hAPI.getCardValue("codFilialFluig"), valorTotal);
			hAPI.setCardValue('contadorAlcada', 1);
			if (aprovadores.length > 0) {
				hAPI.setCardValue('existeAlcada', 'sim');
				for (var i in aprovadores) {
					var aprovador = aprovadores[i];
					hAPI.setCardValue("aprovadorAlcada" + (parseInt(i) + 1), aprovador.id);
				}
				hAPI.setCardValue('aprovadorAlcadaAtual', aprovadores[0].id);
			} else {
				hAPI.setCardValue('existeAlcada', 'nao');
			}
			//Limpa os campos que não possue aprovadores
			for (var i = aprovadores.length; i < 4; i++) {
				hAPI.setCardValue("aprovadorAlcada" + (parseInt(i) + 1), '');
			}
		}

	}
}
function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array()
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}