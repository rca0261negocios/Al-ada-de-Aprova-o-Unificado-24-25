function displayFields(form,customHTML){
	var CURRENT_STATE = getValue('WKNumState');
	customHTML.append('<script>var NUM_PROCES = '+getValue("WKNumProces")+'; '+
						'var CURRENT_STATE = '+CURRENT_STATE+'; </script>');

	if(CURRENT_STATE == INICIO || CURRENT_STATE == 0){
		oucultaFieldsets(customHTML,["#fieldsetClinica","#fieldsetOncoprod","#fieldset1Alcada","#fieldset2Alcada",
						  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
	}else if(CURRENT_STATE == CORRECAO_SOLICITANTE){
		oucultaFieldsets(customHTML,["#fieldsetClinica","#fieldsetOncoprod","#fieldset1Alcada","#fieldset2Alcada",
			  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledAprovacoes(form);
	}else if(CURRENT_STATE == VALIDACAO_CLINICA){
		oucultaFieldsets(customHTML,["#fieldset1Alcada","#fieldset2Alcada",
			  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledInformacoes(form);
		disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		disbledAprovacoes(form,"aprovacaoClinica");
	}else if(CURRENT_STATE == VALIDACAO_ONCOPROD){
		oucultaFieldsets(customHTML,["#fieldsetClinica","#fieldset1Alcada","#fieldset2Alcada",
			  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledInformacoes(form);
		disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		disbledAprovacoes(form,"aprovacaoOncoprod");
	}else if(CURRENT_STATE == ALCADA_APROVACAO){
		oucultaFieldsets(customHTML,["#fieldset1Alcada","#fieldset2Alcada","#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledInformacoes(form);
		disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		disbledAprovacoes(form,"aprovacaoAlcada"+form.getValue("contadorAlcada"));
	}else if(CURRENT_STATE == EXCECAO_INTEGRACAO){
		oucultaFieldsets(customHTML,["#fieldset1Alcada","#fieldset2Alcada",
			  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledInformacoes(form);
		disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		disbledAprovacoes(form);
	}else if(CURRENT_STATE == ATENDER_PEDIDO){// OU ANEXAR NF(Faturmanto)
		if(form.getValue("idFluxo") == "RemessaComprasOncoprod"){
			disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		}else{//Faturamento
			disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
		}
		oucultaFieldsets(customHTML,["#fieldsetClinica","#fieldsetOncoprod","#fieldset1Alcada","#fieldset2Alcada",
			  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras","#fieldsetValidacaoFaturamento"]);
		disbledInformacoes(form);
		disbledAprovacoes(form);
	}else if(CURRENT_STATE == VERIFICAR_PRODUTOS){// OU LANCAMENTO ABAX (Faturmanto)
		if(form.getValue("idFluxo") == "RemessaComprasOncoprod"){
			oucultaFieldsets(customHTML,["#fieldset1Alcada","#fieldset2Alcada","#fieldset3Alcada","#fieldset4Alcada","#fieldsetValidacaoFaturamento"]);
			disbledAprovacoes(form,"aprovacaoCompras");
		}else{//FATURAMENTO
			disbledAprovacoes(form,"aprovacaoFaturamento");
			oucultaFieldsets(customHTML,["#fieldsetClinica","#fieldsetOncoprod","#fieldset1Alcada","#fieldset2Alcada",
				  "#fieldset3Alcada","#fieldset4Alcada","#fieldsetCompras"]);
		}
		disbledInformacoes(form);
		disabledPaiFilho(form,customHTML,'tbProd',['prazoEntregaProd','saldoAberto','caixaProd','qtdAtendidoProd','obsOncoprod','qtdProd','valorProd','dtNecessidadeProd','custoMensalProd','inventarioProd', 'obsProd']);
	}
}
function oucultaFieldsets(customHTML,listFieldset){
	for(var i in listFieldset){
		ocultarCampo(customHTML,listFieldset[i])
	}
}
function disbledInformacoes(form){
	form.setEnabled('zoomFilial',false);
	form.setEnabled('fornecedor',false);
	form.setEnabled('zoomCentroCusto',false);
	form.setEnabled('infoAdicionais',false);
	form.setEnabled('localEntrega',false);
	form.setEnabled('prazoEntrega',false);
	form.setEnabled('dataContagem',false);
}

/**
 * Manipula os campos pai filho do lado do servidor
 * @param form objeto do formulário
 * @param namePaiFilho nome da tabela a ser manipulada
 * @param listFields nome dos campos da tabela sem o ___
 */
function  disabledPaiFilho(form,customHTML,namePaiFilho, listFields){
	var indexs =  form.getChildrenIndexes(namePaiFilho);
	for(var i = 0; i < indexs.length; i++ ){
		var indice  = indexs[i];
		for(var j = 0; j < listFields.length; j++){
			var field = listFields[j]+"___"+indice;
			form.setEnabled(field,false);
			customHTML.append('<script>$("#_'+field+'").addClass("readonly");</script>');
		}
	}
}

function disbledAprovacoes(form,excessao){
	log.info('DISABLE APROVACOES');
	form.setEnabled('aprovacaoClinica',false);
	form.setEnabled('aprovacaoOncoprod',false);
	form.setEnabled('aprovacaoAlcada1',false);
	form.setEnabled('aprovacaoAlcada2',false);
	form.setEnabled('aprovacaoAlcada3',false);
	form.setEnabled('aprovacaoAlcada4',false);
	form.setEnabled('aprovacaoCompras',false);
	form.setEnabled('aprovacaoFaturamento',false);
	if(excessao != '' || excessao != null){
		form.setEnabled(excessao,true);
	}
}
