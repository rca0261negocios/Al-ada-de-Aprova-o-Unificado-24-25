function validateForm(form){
	Array.prototype.contains = function(k) {
		  for ( var p in this)
		    if (this[p] === k)
		      return true;
		  return false;
	};
	var CURRENT_STATE = getValue("WKNumState");
	var NEXT_STATE = getValue("WKNextState");
	var NUMPROC = getValue("WKVersDef");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");
	var objForm = new objFormulario(form);
	var errorMsg = "";
	var lineBreaker = "</br>";

	if(!COMPLETED_TASK || CURRENT_STATE == NEXT_STATE){
		return;
	}

	if(CURRENT_STATE == REGULARIZADORA){

		if (form.getValue("decisaoAprovRegularizadora") == "") {
			throw "Favor aprovar ou reprovar a solicitação!";
		}

		if (form.getValue("decisaoAprovRegularizadora") == "nao" && form.getValue("motivoAprovRegularizadora") == "") {
			throw "Favor justificar o motivo da reprovação!";
		}


	}

	if(CURRENT_STATE == ANALISE_COMPRADOR){
		if(form.getValue("hiddenPrioridadeGeral") != form.getValue("hiddenPrioridadeGeralOrig") ){
			if(form.getValue("motivoAlteracaoPrioridade") == null || form.getValue("motivoAlteracaoPrioridade").isEmpty()){
				errorMsg += "Campo Motivo da troca de prioridade é obrigatório"+lineBreaker;
			}
		}

		if(form.getValue("prioridadeGeral") == "E"){
			if(form.getValue("motivoEmergencial") == ""){
				errorMsg += "Campo Motivo Emergnecial é de preenchimento obrigatório"+lineBreaker;
			}
			
		}
	}

	if(CURRENT_STATE == INICIO_1 || CURRENT_STATE == INICIO){
		// CHAMADO GLPI #0537829 - NAO ESTAVA VALIDANDO A FILIAL PQ O CODIGO ESTAVA COMENTADO
		// SM2CE 04.03.24
		if(form.getValue("filial_protheus") == null || form.getValue("filial_protheus").isEmpty())
			errorMsg += "Campo Filial é obrigatório!"+lineBreaker;
		
		if(form.getValue("grupoAnaliseComprador") == null || form.getValue("grupoAnaliseComprador").isEmpty())
			errorMsg += "Grupo Analise Comprador incorreto, favor contatar a TI"+lineBreaker;
		
		if(form.getValue("poolAbertura") == null || form.getValue("poolAbertura").isEmpty())
			errorMsg += "Pool Abertura Incorreto, favor contatar a TI"+lineBreaker;
		
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty())
			errorMsg += "Campo Local de Entrega é obrigatório!"+lineBreaker;
		
		// CHAMADO GLPI #0537829 - NAO ESTAVA VALIDANDO A FILIAL PQ O CODIGO ESTAVA COMENTADO
		// SM2CE 04.03.24
		if(form.getValue("txtNomeCentroCusto") == null || form.getValue("txtNomeCentroCusto").isEmpty())
			errorMsg += "Campo Centro de Custo é obrigatório!"+lineBreaker;
		
		var indexes = form.getChildrenIndexes("tbItens");

		if(indexes[0] == null || indexes == undefined){
			errorMsg += "Insira ao menos um produto na tabela para cotação";
		}else{
			var grupoAnaliseComprador = form.getValue('grupoAnaliseComprador');
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				var linha = form.getValue("txtSeqItemProduto___"+index);
				if(form.getValue("txtCodItemProduto___"+index) == null || form.getValue("txtCodItemProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Produto é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtUnidMedProduto___"+index) == null || form.getValue("txtUnidMedProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  UN é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtQuantidadeProduto___"+index) == null || form.getValue("txtQuantidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Quant. é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtSaldoProduto___"+index) == null || form.getValue("txtSaldoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Saldo é obrigatório!"+lineBreaker;
				}
				if(form.getValue("dtNecessidadeProduto___"+index) == null || form.getValue("dtNecessidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Necessidade é obrigatório!"+lineBreaker;
				}

				//if(form.getValue("tdSelectPrimeiraCompra___"+index) == null || form.getValue("tdSelectPrimeiraCompra___"+index).isEmpty()){
				//	errorMsg += "[Item "+linha+"] Campo Primeira Compra é obrigatório!"+lineBreaker;
				//}

				//if(grupoAnaliseComprador == form.getValue("poolAbertura")){
					//if(form.getValue("txtArmazemProduto___"+index) == null || form.getValue("txtArmazemProduto___"+index).isEmpty()){
						//errorMsg += "[Item "+linha+"] Campo  Armazém é obrigatório!"+lineBreaker;
					//}
				//}
				
				//#1502017 Validação Cesta da Staples
				if(form.getValue("txtStaples___"+index) == "1"){
					errorMsg += "[Item "+linha+"] está disponível somente através da Cesta da Staples"+lineBreaker;
				}
				if(form.getValue("txtContaContabil___"+index) == null || form.getValue("txtContaContabil___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Conta Contábil é obrigatório!"+lineBreaker;
				}
			}
		}
		if(form.getValue("isProdutoTI") == null || form.getValue("isProdutoTI").isEmpty()){
			errorMsg += "Não foi possível identificar o grupo que o produto pertence."+lineBreaker;
		}

		//Verifica se o aprovador é um solicitante
		if(isSolicitanteAprovador(form)){
			errorMsg += "Não é permitido que o Solicitante "+ buscarNomeUsuario(getValue('WKUser')) + " lance " +
					"um pedido de compra em Centro de Custo ou Filial em que possua alçadas de aprovação.";
		}
	}else if(CURRENT_STATE == GERA_COTACAO_ && NEXT_STATE != CORRECAO_SOLICITACAO){
		if(form.getValue("dtValidadeCotacao") == null || form.getValue("dtValidadeCotacao").isEmpty()){
			errorMsg += "Campo Data de Validade da Cotação é obrigatório!"+lineBreaker;
		}
		if(form.getValue("hrValidadeCotacao") == null || form.getValue("hrValidadeCotacao").isEmpty()){
			errorMsg += "Campo Hora de Validade da Cotação é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdTipoCotacao") == null || form.getValue("rdTipoCotacao").isEmpty()){
			errorMsg += "Campo Tipo Cotação é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdTipoCotacao") == "tabela" || form.getValue("rdTipoCotacao") == "fechada"){
			var indexes = form.getChildrenIndexes("tbFornecs");
			var prioridadeCotacao = 'EN'; //Prioridades que precisam de mais de uma cotação
			if (indexes[0] == null || indexes == undefined) {
				errorMsg += "Insira ao menos um fornecedor na tabela para cotação";
			} else if (prioridadeCotacao.indexOf(form.getValue('hiddenPrioridadeSolicitacao')) != -1 &&
						form.getValue("grupoAnaliseComprador") != form.getValue("poolAbertura") && indexes.length < 3 && form.getValue("rdTipoCotacao") == "fechada" &&
						form.getValue('justificativaFornecedor') == '') { //Cotaçõe normais de diversos e servicos
				errorMsg += "O campo justificativa é obrigatório para cotações fechadas com menos de três fornecedores.";
			}else{
				var result = [];
				for (var i = 0; i < indexes.length; i++) {
					var index = indexes[i];
					if(form.getValue("txtCodFornecCotacao___"+index) == null || form.getValue("txtCodFornecCotacao___"+index).isEmpty()){
						errorMsg += "[Linha "+(i + 1)+"] O Fornecedor é obrigatório!"+lineBreaker;
					}
					for (var o = i+1; o < indexes.length; o++){
						var indexSeguinte = indexes[o];
						if(form.getValue("txtCodFornecCotacao___"+index) == form.getValue("txtCodFornecCotacao___"+indexSeguinte) && !result.contains(o )){
							result.push(o);
						}
					}
				}
				if(result.length > 0){
					errorMsg += "Não são permitidos fornecedores repetidos!"+lineBreaker;
					result = [];
				}
			}
		}else if(form.getValue("rdTipoCotacao") == "aberta"){
			if(form.getValue("txtNrPDC") == null || form.getValue("txtNrPDC").isEmpty()){
				errorMsg += "É obrigatório enviar a cotação dos itens para o Bionexo!"+lineBreaker;
			}
		}
	}else if(CURRENT_STATE == COTACAO){

			if(form.getValue("rdTipoCotacao") == "tabela" || form.getValue("rdTipoCotacao") == "fechada"){
				var indexes = form.getChildrenIndexes("tbFornecs");

				if(indexes[0] == null || indexes == undefined){
					errorMsg += "Insira ao menos um fornecedor na tabela para cotação";
				}else{
					var result = [];
					for (var i = 0; i < indexes.length; i++) {
						var index = indexes[i];
						//if(form.getValue("txtCodFormaPagamentoBionexo___"+index) == null || form.getValue("txtCodFormaPagamentoBionexo___"+index).isEmpty()){
							//errorMsg += "[Linha "+(i + 1)+"] A condição de pagamento é obrigatória!"+lineBreaker;
						//}
						if(form.getValue("sFormaPagamento___"+index) == null || form.getValue("sFormaPagamento___"+index).isEmpty()){
							errorMsg += "[Linha "+(i + 1)+"] A forma de pagamento é obrigatória!"+lineBreaker;
						}
						for (var o = i+1; o < indexes.length; o++){
							var indexSeguinte = indexes[o];
							if(form.getValue("txtCodFornecCotacao___"+index) == form.getValue("txtCodFornecCotacao___"+indexSeguinte) && !result.contains(o )){
								result.push(o);
							}
						}
						if(result.length > 0){
							errorMsg += "Não são permitidos fornecedores repetidos!"+lineBreaker;
							result = [];
						}
					}
				}
			}

			var indexes = form.getChildrenIndexes("tbCotacoes");

			if(indexes[0] == null || indexes[0] == undefined){
				errorMsg += "Insira ao menos uma cotação";
			}else{
				var indexesFornecedores = form.getChildrenIndexes("tbFornecs");
				var indexItens = form.getChildrenIndexes("tbItens");
			
				for (var i = 0; i < indexes.length; i++) {
					var index = indexes[i];
					var codigoItem = form.getValue("codItemCotacao___"+index);
					var descricaoItem = form.getValue("DescItemCotacao___"+index);

					if(form.getValue("vlrUnitItemCotacao___"+index) == null      ||
					   form.getValue("vlrUnitItemCotacao___"+index).isEmpty()    ||
					   converteMoedaFloat(form.getValue("vlrUnitItemCotacao___"+index)) <= 0){
						errorMsg += "[Item "+codigoItem+" - "+ descricaoItem +"] O Valor Unitário é obrigatório!"+lineBreaker;
					}
					//FLUIG-83 Validação de Cotações com o valor total de 0 reais
					if(converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index)) == 0.00){
						errorMsg += "[Item "+codigoItem+" - "+ descricaoItem +"] Não é permitido uma cotação com Valor Total igual a zero!"+lineBreaker;
					}
					if(form.getValue("prazoItemCotacao___"+index) == null ||
					   form.getValue("prazoItemCotacao___"+index) == ""){
						errorMsg += "[Item "+codigoItem+" - "+ descricaoItem +"] O Prazo é obrigatório!"+lineBreaker;
					}
				}
			}
	}else if(CURRENT_STATE == DEFINIR_VENCEDOR){
		var dadosBancariosFornecedor = JSON.parse(form.getValue('dadosBancariosFornecedor'));
		for (var i = 0; i < dadosBancariosFornecedor.length; i++) {
			if(dadosBancariosFornecedor[i].erro == true){
				errorMsg += 'O fornecedor vencedor da cotação não foi encontrado no Protheus, entre em contato com a Central de Cadastros';
			} else {
				if(dadosBancariosFornecedor[i].formaPagto == '2' && (
						dadosBancariosFornecedor[i].banco == ''  ||
						dadosBancariosFornecedor[i].banco == undefined ||
						dadosBancariosFornecedor[i].banco == null ||
						dadosBancariosFornecedor[i].agencia == '' ||
						dadosBancariosFornecedor[i].agencia == undefined ||
						dadosBancariosFornecedor[i].agencia == null ||
						dadosBancariosFornecedor[i].conta == '' ||
						dadosBancariosFornecedor[i].conta == undefined ||
						dadosBancariosFornecedor[i].conta == null ||
						dadosBancariosFornecedor[i].dvconta == '' ||
						dadosBancariosFornecedor[i].dvconta == undefined ||
						dadosBancariosFornecedor[i].dvconta == null)) {

					errorMsg += 'Os dados bancários do fornecedor vencedor da cotação '+
								'não foram cadastrados corretamente no Protheus, entre em contato com o setor de Cadastros para prosseguir<br/>'+
								'<b>Fornecedor:</b> ['+dadosBancariosFornecedor[i].codFornecedor+'] '+dadosBancariosFornecedor[i].descFornecedor+'<br/>'+
								'<b>Banco:</b> '+dadosBancariosFornecedor[i].banco+'<br/>'+
								'<b>Agencia:</b> '+dadosBancariosFornecedor[i].agencia+'<br/>'+
								'<b>Conta:</b> '+dadosBancariosFornecedor[i].conta+'<br/>'+
								'<b>DV-Conta:</b> '+dadosBancariosFornecedor[i].dvconta+'<br/>'
				} else {
					if(form.getValue("rdContrato") == null || form.getValue("rdContrato").isEmpty()){
						errorMsg += "Campo Contrato é obrigatório!"+lineBreaker;
					}

					if(NUMPROC >= 26){
						var teveNegociacao = form.getValue("rdTeveNegociacao");

						if(teveNegociacao == null || teveNegociacao.isEmpty()){
							errorMsg += "Campo Teve Negociação é obrigatório!"+lineBreaker;
						}else{
							if(teveNegociacao == "sim"){
								if(form.getValue("txtPropostaInic") == null || form.getValue("txtPropostaInic").isEmpty()){
									errorMsg += "Campo Proposta Inicial é obrigatório!"+lineBreaker;
								}else{
									var valCotacaoTotal = converteMoedaFloat(form.getValue("txtTotValCotacao"));
									var propInic = converteMoedaFloat(form.getValue("txtPropostaInic"));
									if(propInic <= valCotacaoTotal){
										errorMsg += "Valor preenchido no campo Proposta Inicial deverá ser maior que o campo Valor Total da Cotação"+lineBreaker;
									}else{
										// VALOR TOTAL DA COTACAO NAO PODE ESTAR ZERADA
										if(valCotacaoTotal<=0)
											errorMsg += "Valor Total da Cotação não pode estar zedado"+lineBreaker;
									}
								}
							}
						}
					}
				}
			}
		}
	}else if (CURRENT_STATE == CORRECAO_COTACAO){
		/* if(form.getValue("txtDesconto") == null || form.getValue("txtDesconto").isEmpty()){
			errorMsg += "ERRO DE TESTE!"+lineBreaker;
		} */
		var indexes = form.getChildrenIndexes("tbItens");
		if(indexes[0] != null && indexes != undefined){
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				var linha = form.getValue("txtSeqItemProduto___"+index);
				if(form.getValue("justAjusteCotacao___"+index) != null && !form.getValue("justAjusteCotacao___"+index).isEmpty() && form.getValue("justAjusteCotacao___"+index) != undefined && form.getValue("justAjusteCotacao___"+index) != ""){
					if(form.getValue("aceitaJustificativa___"+index) != "sim" && form.getValue("aceitaJustificativa___"+index) != "nao"){
						errorMsg += "[Item "+linha+"] Campo  Aceita Justificativa é obrigatório!"+lineBreaker;
					}
				}
			}
		}		
	}
	if(CURRENT_STATE == APROVACAO_ALCADA){
		var alcadaAtual = form.getValue('contadorAlcada');
		if(form.getValue("rdAprovadoAlcada"+alcadaAtual) == null || form.getValue("rdAprovadoAlcada"+alcadaAtual).isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada"+alcadaAtual) == "naprov" && (form.getValue("txtJustificativaAlcada"+alcadaAtual) == null || form.getValue("txtJustificativaAlcada"+alcadaAtual).isEmpty())){
			errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada"+alcadaAtual) == "naprov" && (form.getValue("slMotivoReprovacao"+alcadaAtual) == null || form.getValue("slMotivoReprovacao"+alcadaAtual).isEmpty())){
			errorMsg += "Campo Motivo da reprovação é obrigatório!"+lineBreaker;
		}
	}
	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA && NEXT_STATE != ERRO_EMITIR_PEDIDO_PROTHEUS){
		var indexes = form.getChildrenIndexes("tbPedidosGerados");
		if(indexes[0] == null || indexes[0] == undefined){
			errorMsg += "Você deve gerar ao menos um pedido!";
		}else{
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				if(form.getValue("prazoEntregaPedido___"+index) == null || form.getValue("prazoEntregaPedido___"+index).isEmpty()){
					errorMsg += "[Item "+index+"] O Prazo Entrega é obrigatório!"+lineBreaker;
				}

			}
		}
	}else if(CURRENT_STATE == PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE){
		if(form.getValue("txtObjetoContrato") == null || form.getValue("txtObjetoContrato").isEmpty()){
			errorMsg += "Campo Objeto Contrato é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtReajusteContrato") == null || form.getValue("txtReajusteContrato").isEmpty()){
			errorMsg += "Campo Reajuste Contrato é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtRescisaoContrato") == null || form.getValue("txtRescisaoContrato").isEmpty()){
			errorMsg += "Campo Rescisção Contrato é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtValContrato") == null || form.getValue("txtValContrato").isEmpty()){
			errorMsg += "Campo Valor Contrato é obrigatório!"+lineBreaker;
		}
		if(form.getValue("dtValidadeContrato") == null || form.getValue("dtValidadeContrato").isEmpty()){
			errorMsg += "Campo Data Validade Contrato é obrigatório!"+lineBreaker;
		}


	}
	if(CURRENT_STATE == ANEXAR_MINUTA){
		if(form.getValue("ckFaltaDocumentacao") == "on" && form.getValue("txtParecerContrato").isEmpty()){
			errorMsg += "Campo Parecer da documentação é obrigatório!"+lineBreaker;
		}
	}

	if (objForm.isAtividadeInicial(APROVACAO_SOLICITANTE)) {
		validarRegrasECamposAprovacaoDaSolicitacao(objForm);
	}

	if (objForm.isAtividadeInicial(SOLUCAO_INCONSISTENCIA)) {
		validarRegrasECamposSolucaoDaInconsistencia(objForm);
	}
	if(CURRENT_STATE == APROVAR_PRODUTO_TI){
		validarGestorTI(objForm);
	}

	/*
	 * Metodo que liga todas as validações
	 */
	objForm.validar();
	errorMsg += customValidateForm(form);
	if(!errorMsg.isEmpty()){
		throw lineBreaker + errorMsg;
	}
}


function validaMenorPreco(codItem, valorTotal, form){
	var indexes = form.getChildrenIndexes("tbCotacoes");
	var menorPreco = null;
	var vlTotalMenorPreco = null;

	for (var i = 0; i < indexes.length; i++) {
		var index = indexes[i];
		if(form.getValue("codItemCotacao___"+index) == codItem){
			if(menorPreco == null){
				menorPreco = converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index));
				vlTotalMenorPreco = form.getValue("vlrTotalItemCotacao___"+index);
			}else if(converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index)) < menorPreco){
				menorPreco = converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index));
				vlTotalMenorPreco = form.getValue("vlrTotalItemCotacao___"+index);
			}
		}
	}


	return (valorTotal == vlTotalMenorPreco);
}

function converteMoedaFloat(valor){
	valor = valor.replace("R$ ",'');

	while(valor.indexOf(".") != -1){
		valor = valor.replace('.','');
	}

	valor = valor.replace(",",".");
	valor = parseFloat(valor);

	return valor;
}
function validarRegrasECamposAprovacaoDaSolicitacao(objForm){
	objForm.setFields("aceite", i18n.translate("label.aceite"));
	objForm.isCampoVazio("aceite", true);
	if(objForm.isCampoIgual("aceite",["N"], false)){
		objForm.setFields("compSolicitante", i18n.translate("label.complemento.solicitante"));
		objForm.isCampoVazio("compSolicitante", true);
	}

}


function validarRegrasECamposSolucaoDaInconsistencia(objForm){
	objForm.setFields("retorno", i18n.translate("label.complemento.analista"));
	objForm.isCampoVazio("retorno", true);
}
function validarGestorTI(objForm){
	objForm.setFields("aprovacaoTI", 'Aprovação');
	objForm.isCampoVazio("aprovacaoTI", true);
	if(objForm.isCampoIgual("aprovacaoTI",["nao"], false)){
		objForm.setFields("motivoGestorTI", "Motivo");
		objForm.isCampoVazio("motivoGestorTI", true);
	}
}
//#FLUIG-85 Verifica se o solicitante esta presente em alguma alçada de aprovação
function isSolicitanteAprovador(form){
	var isSolicitanteAprovador = false;
	var aprovadores = getAprovadoresAlcada(form.getValue('FilialAlcada'), form.getValue('grupoAnaliseComprador'), form.getValue('txtCodCentroCusto'));
	for(var i in aprovadores){
		if(aprovadores.existeAlcada == true){
			if(Array.isArray(aprovadores[i])){//sempre que for array a é um aprovador de alcada ou cc
				var usuarioAlcada = aprovadores[i][0];//pega a primeira posição do array referente a matricula do usuario
				if(usuarioAlcada != null && usuarioAlcada != undefined && usuarioAlcada != ''){
					if(getValue('WKUser') == usuarioAlcada){
						isSolicitanteAprovador = true;
					}
				}
			}
		}
	}
	return isSolicitanteAprovador;
}
