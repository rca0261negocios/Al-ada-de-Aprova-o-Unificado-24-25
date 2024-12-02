function displayFields(form, customHTML) {
	var CURRENT_STATE = getValue("WKNumState") ? getValue("WKNumState") : 0;

	customHTML.append('<script>' +
		' var NUM_PROCES = ' + getValue("WKNumProces") + '; ' +
		' var CURRENT_STATE = ' + CURRENT_STATE + '; ' +
		' var AtividadeEnum = ' + JSON.stringify(AtividadeEnum) + ';' +
		'</script>');

	if (CURRENT_STATE == 0 ||
		CURRENT_STATE == AtividadeEnum.INICIO ||
		CURRENT_STATE == AtividadeEnum.CORRECAO_SOLICITANTE) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
		disabledAprovacoes(form);
	} else if (CURRENT_STATE == AtividadeEnum.VALIDACAO_ONCOPROD) {
		ocultaFieldsets(customHTML, ["#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
		disabledInformacoes(form);
	} else if (CURRENT_STATE == AtividadeEnum.ALCADA_APROVACAO) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
		disabledInformacoes(form);
		var alcada = form.getValue("contadorAlcada")
		disabledAprovacoes(form, "aprovacaoAlcada" + alcada);
		customHTML.append("<script>$('#fieldset" + alcada + "Alcada').show()</script>")
	} else if (CURRENT_STATE == AtividadeEnum.EXCECAO_INTEGRACAO) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
	} else if (CURRENT_STATE == AtividadeEnum.ANEXAR_NF) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
		disabledAprovacoes(form);
	} else if (CURRENT_STATE == AtividadeEnum.VALIDACAO_ENTREGA) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada"]);
	} else if (CURRENT_STATE == AtividadeEnum.FIM) {
		ocultaFieldsets(customHTML, ["#fieldsetOncoprod",
			"#fieldset1Alcada",
			"#fieldset2Alcada",
			"#fieldset3Alcada",
			"#fieldset4Alcada",
			"#fieldsetEntrega"]);
	}
}
function ocultaFieldsets(customHTML, listFieldset) {
	for (var i in listFieldset) {
		ocultarCampo(customHTML, listFieldset[i])
	}
}
function disabledInformacoes(form) {
	form.setEnabled('zoomFilial', false)
	form.setEnabled('zoomEmail', false)
	form.setEnabled('zoomEmail', false);
	form.setEnabled('fornecedor', false);
	form.setEnabled('zoomCentroCusto', false);
	form.setEnabled('infoAdicionais', false);
	form.setEnabled('localEntrega', false);
	form.setEnabled('prazoEntrega', false);
	form.setEnabled('dataContagem', false);
}

/**
 * Manipula os campos pai filho do lado do servidor
 * @param form objeto do formulário
 * @param namePaiFilho nome da tabela a ser manipulada
 * @param listFields nome dos campos da tabela sem o ___
 */
function disabledPaiFilho(form, customHTML, namePaiFilho, listFields) {
	var indexs = form.getChildrenIndexes(namePaiFilho);
	for (var i = 0; i < indexs.length; i++) {
		var indice = indexs[i];
		for (var j = 0; j < listFields.length; j++) {
			var field = listFields[j] + "___" + indice;
			form.setEnabled(field, false);
			customHTML.append('<script>$("#_' + field + '").addClass("readonly");</script>');
		}
	}
}

function disabledAprovacoes(form, excessao) {
	form.setEnabled('aprovacaoOncoprod', false);
	form.setEnabled('aprovacaoAlcada1', false);
	form.setEnabled('aprovacaoAlcada2', false);
	form.setEnabled('aprovacaoAlcada3', false);
	form.setEnabled('aprovacaoAlcada4', false);
	form.setEnabled('aprovacaoEntrega', false);
	if (excessao != '' || excessao != null) {
		form.setEnabled(excessao, true);
		form.setVisible(excessao, true)
	}
}
