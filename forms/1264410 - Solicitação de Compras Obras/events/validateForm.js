function validateForm(form){
	log.info("===============================validateForm");
	var CURRENT_STATE = getValue("WKNumState");
	var NEXT_STATE = getValue("WKNextState");
	var NUMPROC = getValue("WKVersDef");
	var COMPLETED_TASK = (getValue("WKCompletTask")=="true");

	log.info("===============================validateForm:CURRENT_STATE "+CURRENT_STATE);
	log.info("===============================validateForm:NEXT_STATE "+NEXT_STATE);
	log.info("===============================validateForm:COMPLETED_TASK "+COMPLETED_TASK);

	var objForm = new objFormulario(form);
	var errorMsg = "";
	var lineBreaker = "</br>";

	if(!COMPLETED_TASK || CURRENT_STATE == NEXT_STATE){
		return;
	}
	//1.1
	if(CURRENT_STATE == INICIO){

		//itens novos

		if(form.getValue("emailSolicitante") == null || form.getValue("emailSolicitante").isEmpty()){
			errorMsg += "Campo E-mail do solicitante é obrigatório!"+lineBreaker;
		}
		if(form.getValue("telefoneRamal") == null || form.getValue("telefoneRamal").isEmpty()){
			errorMsg += "Campo Telefone/Ramal é obrigatório!"+lineBreaker;
		}
		if(form.getValue("target") == null || form.getValue("target").isEmpty()){
			errorMsg += "Campo Target é obrigatório!"+lineBreaker;
		}

		//fim itens novos
		log.info("===============================validateForm:VALIDANDO ATIVIDADE 1 ");

		/*if(form.getValue("nmFilial") == null || form.getValue("nmFilial").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		if(form.getValue("nmFilialEntrega") == null || form.getValue("nmFilialEntrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}*/

		if(form.getValue("filial_protheus") == null || form.getValue("filial_protheus").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		/*if(form.getValue("filial_protheus_entrega") == null || form.getValue("filial_protheus_entrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}*/
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}

		var indexes = form.getChildrenIndexes("tbItens");

		if(indexes[0] == null || indexes == undefined){
			errorMsg += "Insira ao menos um produto na tabela para cotação";
		}else{
			var grupoAnaliseComprador = form.getValue('grupoAnaliseComprador');
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				var linha = form.getValue("txtSeqItemProduto___"+index);
				if(form.getValue("sPrioridadeProduto___"+index) == null || form.getValue("sPrioridadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo Prioridade é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtCodItemProduto___"+index) == null || form.getValue("txtCodItemProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Produto é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtUnidMedProduto___"+index) == null || form.getValue("txtUnidMedProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  UN é obrigatório!"+lineBreaker;
				}*/ //removida a obrigatoriedade
				if(form.getValue("txtQuantidadeProduto___"+index) == null || form.getValue("txtQuantidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Quant. é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtSaldoProduto___"+index) == null || form.getValue("txtSaldoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Saldo é obrigatório!"+lineBreaker;
				}*/
				if(form.getValue("dtNecessidadeProduto___"+index) == null || form.getValue("dtNecessidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Necessidade é obrigatório!"+lineBreaker;
				}

				if(grupoAnaliseComprador == "Pool:Group:CM"){
					/*if(form.getValue("txtArmazemProduto___"+index) == null || form.getValue("txtArmazemProduto___"+index).isEmpty()){
						errorMsg += "[Item "+linha+"] Campo  Armazém é obrigatório!"+lineBreaker;
					}*/
				}


				/*

				if(form.getValue("dtEmissaoProduto___"+index) == null || form.getValue("dtEmissaoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Emissão é obrigatório!"+lineBreaker;
				}
				*/

//				if(form.getValue("prazoProduto___"+index) == null || form.getValue("prazoProduto___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Prazo Item é obrigatório!"+lineBreaker;
//				}



//				if(form.getValue("hiddenCodCC___"+index) == null || form.getValue("hiddenCodCC___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Centro de Custo é obrigatório!"+lineBreaker;
//				}
				/*if(form.getValue("txtContaContabil___"+index) == null || form.getValue("txtContaContabil___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Conta Contábil é obrigatório!"+lineBreaker;
				}*/
			}
		}


	}

	//2.1
	else if(CURRENT_STATE == VALIDAR_PROPOSTA){
		if(form.getValue("validado") == "" || form.getValue("validado").isEmpty()){
			errorMsg += "Campo Validado é obrigatório!";
		}
		if(form.getValue("validado") == "nao" || form.getValue("validado") == "cancelado"){

			if(form.getValue("parecerDaValidacao") == null || form.getValue("parecerDaValidacao").isEmpty()){
				errorMsg += "Campo Parecer da Validação é obrigatório!"+lineBreaker;
			}
		}
	}

	//1.2
	else if(CURRENT_STATE == CORRIGIR_SOLICITACAO){
//itens novos

		if(form.getValue("emailSolicitante") == null || form.getValue("emailSolicitante").isEmpty()){
			errorMsg += "Campo E-mail do solicitante é obrigatório!"+lineBreaker;
		}
		if(form.getValue("telefoneRamal") == null || form.getValue("telefoneRamal").isEmpty()){
			errorMsg += "Campo Telefone/Ramal é obrigatório!"+lineBreaker;
		}
		if(form.getValue("target") == null || form.getValue("target").isEmpty()){
			errorMsg += "Campo Target é obrigatório!"+lineBreaker;
		}

		//fim itens novos
		log.info("===============================validateForm:VALIDANDO ATIVIDADE 1 ");

		/*if(form.getValue("nmFilial") == null || form.getValue("nmFilial").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		if(form.getValue("nmFilialEntrega") == null || form.getValue("nmFilialEntrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}*/

		if(form.getValue("filial_protheus") == null || form.getValue("filial_protheus").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		/*if(form.getValue("filial_protheus_entrega") == null || form.getValue("filial_protheus_entrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}*/
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}

		var indexes = form.getChildrenIndexes("tbItens");

		if(indexes[0] == null || indexes == undefined){
			errorMsg += "Insira ao menos um produto na tabela para cotação";
		}else{
			var grupoAnaliseComprador = form.getValue('grupoAnaliseComprador');
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				var linha = form.getValue("txtSeqItemProduto___"+index);
				if(form.getValue("sPrioridadeProduto___"+index) == null || form.getValue("sPrioridadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo Prioridade é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtCodItemProduto___"+index) == null || form.getValue("txtCodItemProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Produto é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtUnidMedProduto___"+index) == null || form.getValue("txtUnidMedProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  UN é obrigatório!"+lineBreaker;
				}*/ //removida a obrigatoriedade
				if(form.getValue("txtQuantidadeProduto___"+index) == null || form.getValue("txtQuantidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Quant. é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtSaldoProduto___"+index) == null || form.getValue("txtSaldoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Saldo é obrigatório!"+lineBreaker;
				}*/
				if(form.getValue("dtNecessidadeProduto___"+index) == null || form.getValue("dtNecessidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Necessidade é obrigatório!"+lineBreaker;
				}

				if(grupoAnaliseComprador == "Pool:Group:CM"){
					/*if(form.getValue("txtArmazemProduto___"+index) == null || form.getValue("txtArmazemProduto___"+index).isEmpty()){
						errorMsg += "[Item "+linha+"] Campo  Armazém é obrigatório!"+lineBreaker;
					}*/
				}


				/*

				if(form.getValue("dtEmissaoProduto___"+index) == null || form.getValue("dtEmissaoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Emissão é obrigatório!"+lineBreaker;
				}
				*/

//				if(form.getValue("prazoProduto___"+index) == null || form.getValue("prazoProduto___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Prazo Item é obrigatório!"+lineBreaker;
//				}



//				if(form.getValue("hiddenCodCC___"+index) == null || form.getValue("hiddenCodCC___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Centro de Custo é obrigatório!"+lineBreaker;
//				}
				/*if(form.getValue("txtContaContabil___"+index) == null || form.getValue("txtContaContabil___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Conta Contábil é obrigatório!"+lineBreaker;
				}*/
			}
		}
	}

	//3.1
	else if(CURRENT_STATE == VALIDAR_DOCUMENTACAO_TECNICA){

		if(form.getValue("aprovado") == null || form.getValue("aprovado").isEmpty()){
			errorMsg += "Campo Aprovado? é obrigatório!"+lineBreaker;
		}
		if(form.getValue("aprovado") == "nao" && (form.getValue("parecerAprovacao") == null || form.getValue("parecerAprovacao").isEmpty())){
			errorMsg += "Campo Parecer da Obrigação é obrigatório!"+lineBreaker;
		}

		//itens novos

		if(form.getValue("emailSolicitante") == null || form.getValue("emailSolicitante").isEmpty()){
			errorMsg += "Campo E-mail do solicitante é obrigatório!"+lineBreaker;
		}
		if(form.getValue("telefoneRamal") == null || form.getValue("telefoneRamal").isEmpty()){
			errorMsg += "Campo Telefone/Ramal é obrigatório!"+lineBreaker;
		}
		if(form.getValue("target") == null || form.getValue("target").isEmpty()){
			errorMsg += "Campo Target é obrigatório!"+lineBreaker;
		}

		//fim itens novos
		log.info("===============================validateForm:VALIDANDO ATIVIDADE 1 ");

		/*if(form.getValue("nmFilial") == null || form.getValue("nmFilial").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		if(form.getValue("nmFilialEntrega") == null || form.getValue("nmFilialEntrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}*/

		if(form.getValue("filial_protheus") == null || form.getValue("filial_protheus").isEmpty()){
			errorMsg += "Campo  Filial é obrigatório!"+lineBreaker;
		}
		/*if(form.getValue("filial_protheus_entrega") == null || form.getValue("filial_protheus_entrega").isEmpty()){
			errorMsg += "Campo  Filial de entrega é obrigatório!"+lineBreaker;
		}*/
		if(form.getValue("txtLocalEntrega") == null || form.getValue("txtLocalEntrega").isEmpty()){
			errorMsg += "Campo  Local de Entrega é obrigatório!"+lineBreaker;
		}
		if(form.getValue("txtCodCentroCusto") == null || form.getValue("txtCodCentroCusto").isEmpty()){
			errorMsg += "Campo  Centro de Custo é obrigatório!"+lineBreaker;
		}

		var indexes = form.getChildrenIndexes("tbItens");

		if(indexes[0] == null || indexes == undefined){
			errorMsg += "Insira ao menos um produto na tabela para cotação";
		}else{
			var grupoAnaliseComprador = form.getValue('grupoAnaliseComprador');
			for (var i = 0; i < indexes.length; i++) {
				var index = indexes[i];
				var linha = form.getValue("txtSeqItemProduto___"+index);
				if(form.getValue("sPrioridadeProduto___"+index) == null || form.getValue("sPrioridadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo Prioridade é obrigatório!"+lineBreaker;
				}
				if(form.getValue("txtCodItemProduto___"+index) == null || form.getValue("txtCodItemProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Produto é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtUnidMedProduto___"+index) == null || form.getValue("txtUnidMedProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  UN é obrigatório!"+lineBreaker;
				}*/ //removida a obrigatoriedade
				if(form.getValue("txtQuantidadeProduto___"+index) == null || form.getValue("txtQuantidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Quant. é obrigatório!"+lineBreaker;
				}
				/*if(form.getValue("txtSaldoProduto___"+index) == null || form.getValue("txtSaldoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Saldo é obrigatório!"+lineBreaker;
				}*/
				if(form.getValue("dtNecessidadeProduto___"+index) == null || form.getValue("dtNecessidadeProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Necessidade é obrigatório!"+lineBreaker;
				}

				if(grupoAnaliseComprador == "Pool:Group:CM"){
					/*if(form.getValue("txtArmazemProduto___"+index) == null || form.getValue("txtArmazemProduto___"+index).isEmpty()){
						errorMsg += "[Item "+linha+"] Campo  Armazém é obrigatório!"+lineBreaker;
					}*/
				}


				/*

				if(form.getValue("dtEmissaoProduto___"+index) == null || form.getValue("dtEmissaoProduto___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Dt. Emissão é obrigatório!"+lineBreaker;
				}
				*/

//				if(form.getValue("prazoProduto___"+index) == null || form.getValue("prazoProduto___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Prazo Item é obrigatório!"+lineBreaker;
//				}



//				if(form.getValue("hiddenCodCC___"+index) == null || form.getValue("hiddenCodCC___"+index).isEmpty()){
//					errorMsg += "[Item "+linha+"] Campo  Centro de Custo é obrigatório!"+lineBreaker;
//				}
				/*if(form.getValue("txtContaContabil___"+index) == null || form.getValue("txtContaContabil___"+index).isEmpty()){
					errorMsg += "[Item "+linha+"] Campo  Conta Contábil é obrigatório!"+lineBreaker;
				}*/
			}
		}
	}

	//4.1
	else if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		if(form.getValue("rdTipoCotacao") == null || form.getValue("rdTipoCotacao").isEmpty()){
			errorMsg += "Campo Tipo Cotação é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdTipoCotacao") == "tabela" || form.getValue("rdTipoCotacao") == "fechada"){
			var indexes = form.getChildrenIndexes("tbFornecs");

			if(indexes[0] == null || indexes == undefined){
				errorMsg += "Insira ao menos um fornecedor na tabela para cotação";
			}else{
				var result = [];
				for (var i = 0; i < indexes.length; i++) {
					var index = indexes[i];
					if(form.getValue("txtCodFornecCotacao___"+index) == null || form.getValue("txtCodFornecCotacao___"+index).isEmpty()){
						errorMsg += "[Linha "+(i + 1)+"] O Fornecedor é obrigatório!"+lineBreaker;
					}
					if(form.getValue("formaPagamento___"+index) == null || form.getValue("formaPagamento___"+index).isEmpty()){
						errorMsg += "[Linha "+(i + 1)+"] A forma de pagamento é obrigatória!"+lineBreaker;
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

	}

	else if(CURRENT_STATE == COTACAO){


			if(form.getValue("rdTipoCotacao") == "tabela" || form.getValue("rdTipoCotacao") == "fechada"){
				var indexes = form.getChildrenIndexes("tbFornecs");

				if(indexes[0] == null || indexes == undefined){
					errorMsg += "Insira ao menos um fornecedor na tabela para cotação";
				}else{
					for (var i = 0; i < indexes.length; i++) {
						var index = indexes[i];
						if(form.getValue("txtCodFormaPagamentoProtheus___"+index) == null || form.getValue("txtCodFormaPagamentoProtheus___"+index).isEmpty()){
							errorMsg += "[Linha "+(i + 1)+"] A condição de pagamento é obrigatória!"+lineBreaker;
						}
					}
				}
			}





			var indexes = form.getChildrenIndexes("tbCotacoes");

			if(indexes[0] == null || indexes[0] == undefined){
				errorMsg += "Insira ao menos uma cotação";
			}else{
				for (var i = 0; i < indexes.length; i++) {
					var index = indexes[i];

					var codigoItem = form.getValue("codItemCotacao___"+index);
					var descricaoItem = form.getValue("DescItemCotacao___"+index);

					if(form.getValue("vlrUnitItemCotacao___"+index) == null ||
							form.getValue("vlrUnitItemCotacao___"+index).isEmpty() ||
							converteMoedaFloat(form.getValue("vlrUnitItemCotacao___"+index)) <= 0){

						codigoItem = form.getValue("codItemCotacao___"+index);
						descricaoItem = form.getValue("DescItemCotacao___"+index);

						errorMsg += "[Item "+codigoItem+" - "+ descricaoItem +"] O Valor Unitário é obrigatório!"+lineBreaker;
					}
					if(form.getValue("prazoItemCotacao___"+index) == null ||
							form.getValue("prazoItemCotacao___"+index) == ""){
						errorMsg += "[Item "+codigoItem+" - "+ descricaoItem +"] O Prazo é obrigatório!"+lineBreaker;
					}


				}
			}


	}

	//4.2
	else if(CURRENT_STATE == DEFINIR_VENCEDOR){

		log.info("#### VALIDATEFORM CURRENTSTATE == DEFINIR_VENCEDOR");
		if(form.getValue("rdContrato") == null || form.getValue("rdContrato").isEmpty()){
			errorMsg += "Campo Contrato é obrigatório!"+lineBreaker;
		}

		//removida a lógica do numproc >= 26
		//if(NUMPROC >= 26){
			var teveNegociacao = form.getValue("rdTeveNegociacao");
			log.info("#### Campo Teve Negociacao: " + teveNegociacao);

			if(teveNegociacao == null || teveNegociacao.isEmpty()){
				errorMsg += "Campo Teve Negociação é obrigatório!"+lineBreaker;
			}else{
				if(teveNegociacao == "sim"){
					log.info("#### Teve Negociacao = SIM");
					if(form.getValue("txtPropostaInic") == null || form.getValue("txtPropostaInic").isEmpty()){
						errorMsg += "Campo Proposta Inicial é obrigatório!"+lineBreaker;
					}else{
						var valCotacaoTotal = converteMoedaFloat(form.getValue("txtTotValCotacao"));
						log.info("#### Valor Total da Cotacao: " + valCotacaoTotal);
						var propInic = converteMoedaFloat(form.getValue("txtPropostaInic"));
						log.info("#### Valor da Proposta Inicial: " + propInic);
						if(propInic <= valCotacaoTotal){
							log.info("#### Valor da Proposta Inicial é MENOR ou IGUAL ao valor da COTACAO");
							errorMsg += "Valor preenchido no campo Proposta Inicial deverá ser maior que o campo Valor Total da Cotação"+lineBreaker;
						}
					}
				}
			}
		//}


//		var indexesItens = form.getChildrenIndexes("tbItens");
//		var indexesCotacoes = form.getChildrenIndexes("tbCotacoes");

//		for (var i = 0; i < indexesItens.length; i++) {
//			var indexItem = indexesItens[i];
//			var existeCotacao = false;
//
//			for (var j = 0; j < indexesCotacoes.length; j++) {
//				var indexCotacao = indexesCotacoes[j];
//				log.info("=============================validateForm "+indexItem+" - "+indexCotacao);
//				log.info("=============================validateForm "+form.getValue("txtCodItemProduto___"+indexItem)+" - "+form.getValue("codItemCotacao___"+indexCotacao)+" - "+form.getValue("vencedoraCotacao___"+indexCotacao));
//				if(form.getValue("txtCodItemProduto___"+indexItem) == form.getValue("codItemCotacao___"+indexCotacao) && form.getValue("vencedoraCotacao___"+indexCotacao) == "on"){
//					var menorPreco = validaMenorPreco(form.getValue("codItemCotacao___"+indexCotacao) , form.getValue("vlrTotalItemCotacao___"+indexCotacao), form )
//					log.info("=============================validateForm menorPreco"+menorPreco+" - Justificativa: "+form.getValue("JustificativaItemCotacao___"+indexCotacao));
//					if(!menorPreco && (form.getValue("JustificativaItemCotacao___"+indexCotacao) == null || form.getValue("JustificativaItemCotacao___"+indexCotacao).isEmpty())){
//						errorMsg += "Não existe justificativa para o produto "+form.getValue("txtCodItemProduto___"+indexItem)+"!"+lineBreaker;
//					}
//
//					existeCotacao = true;
//					break;
//				}
//			}
//
//			if(existeCotacao == false){
//				errorMsg += "Não existe cotação vencedora para o produto "+form.getValue("txtCodItemProduto___"+indexItem)+"!"+lineBreaker;
//			}
//		}
	}

	//4.4
	else if(CURRENT_STATE == PREENCHER_FORMULARIO_CONTRATO){

	}

	if(CURRENT_STATE == ALCADA_1){
		if(form.getValue("rdAprovadoAlcada1") == null || form.getValue("rdAprovadoAlcada1").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada1") == "naprov" && (form.getValue("txtJustificativaAlcada1") == null || form.getValue("txtJustificativaAlcada1").isEmpty())){
			errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada1") == "naprov" && (form.getValue("slMotivoReprovacao1") == null || form.getValue("slMotivoReprovacao1").isEmpty())){
			errorMsg += "Campo Motivo da reprovação é obrigatório!"+lineBreaker;
		}
	}
	if(CURRENT_STATE == ALCADA_2){
		if(form.getValue("rdAprovadoAlcada2") == null || form.getValue("rdAprovadoAlcada2").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada2") == "naprov" && (form.getValue("txtJustificativaAlcada2") == null || form.getValue("txtJustificativaAlcada2").isEmpty())){
			errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada2") == "naprov" && (form.getValue("slMotivoReprovacao2") == null || form.getValue("slMotivoReprovacao2").isEmpty())){
			errorMsg += "Campo Motivo da reprovação é obrigatório!"+lineBreaker;
		}

	}
	if(CURRENT_STATE == ALCADA_3){
		if(form.getValue("rdAprovadoAlcada3") == null || form.getValue("rdAprovadoAlcada3").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada3") == "naprov" && (form.getValue("txtJustificativaAlcada3") == null || form.getValue("txtJustificativaAlcada3").isEmpty())){
			errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada3") == "naprov" && (form.getValue("slMotivoReprovacao3") == null || form.getValue("slMotivoReprovacao3").isEmpty())){
			errorMsg += "Campo Motivo da reprovação é obrigatório!"+lineBreaker;
		}
	}
	if(CURRENT_STATE == ALCADA_4){
		if(form.getValue("rdAprovadoAlcada4") == null || form.getValue("rdAprovadoAlcada4").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada4") == "naprov" && (form.getValue("txtJustificativaAlcada4") == null || form.getValue("txtJustificativaAlcada4").isEmpty())){
			errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoAlcada4") == "naprov" && (form.getValue("slMotivoReprovacao4") == null || form.getValue("slMotivoReprovacao4").isEmpty())){
			errorMsg += "Campo Motivo da reprovação é obrigatório!"+lineBreaker;
		}
	}

	//4.6
	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA){
		log.info('EMITIR PEDIDO NETO');
		var indexes = form.getChildrenIndexes("tbPedidosGerados");
		log.info('INDEXES ' + indexes[0]);
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
	}

	//5.3
	if(CURRENT_STATE == PARECER_DO_SOLICITANTE){
		if(form.getValue("rdAprovadoAlcada1") == "naprov"){
			if(form.getValue("txtParecerSolicitante1") == null || form.getValue("txtParecerSolicitante1").isEmpty()){
				errorMsg += "Campo Parecer do Solicitante é obrigatório!"+lineBreaker;
			}
		}
		if(form.getValue("rdAprovadoAlcada2") == "naprov"){
			if(form.getValue("txtParecerSolicitante2") == null || form.getValue("txtParecerSolicitante2").isEmpty()){
				errorMsg += "Campo Parecer do Solicitante é obrigatório!"+lineBreaker;
			}
		}
		if(form.getValue("rdAprovadoAlcada3") == "naprov"){
			if(form.getValue("txtParecerSolicitante3") == null || form.getValue("txtParecerSolicitante3").isEmpty()){
				errorMsg += "Campo Parecer do Solicitante é obrigatório!"+lineBreaker;
			}
		}
		if(form.getValue("rdAprovadoAlcada4") == "naprov"){
			if(form.getValue("txtParecerSolicitante4") == null || form.getValue("txtParecerSolicitante4").isEmpty()){
				errorMsg += "Campo Parecer do Solicitante é obrigatório!"+lineBreaker;
			}
		}
	}
	if(CURRENT_STATE == PREENCHER_FORMULARIO_CONTRATO){
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
	//6.1
	if(CURRENT_STATE == ANEXAR_MINUTA_PARA_VALIDACAO){
		if(form.getValue("ckFaltaDocumentacao") == "on" && form.getValue("txtParecerContrato").isEmpty()){
			errorMsg += "Campo Parecer da documentação é obrigatório!"+lineBreaker;
		}
	}
	//7.1
	if(CURRENT_STATE == VALIDAR_MINUTA){
		if(form.getValue("rdAprovadoContrato") == "" || form.getValue("rdAprovadoContrato").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoContrato") == "naprov"){
			if(form.getValue("txtJustificaContrato") == null || form.getValue("txtJustificaContrato").isEmpty()){
				errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
			}
		}
	}

	//6.2
	if(CURRENT_STATE == CORRIGIR_MINUTA){
		if(form.getValue("rdAcordoEntreAsPartes") == "" || form.getValue("rdAcordoEntreAsPartes").isEmpty()){
			errorMsg += "Campo Acordo entre as partes é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAcordoEntreAsPartes") == "nao"){
			if(form.getValue("txtDivergenciaEntreAsPartes") == null || form.getValue("txtDivergenciaEntreAsPartes").isEmpty()){
				errorMsg += "Campo Divergência entre as partes é obrigatório!"+lineBreaker;
			}
		}
	}
	if(CURRENT_STATE == RECOLHER_ASSINATURA_DIGITALIZAR_CONTRATO){
		if(form.getValue("rdAcordoEntreAsPartes") == "" || form.getValue("rdAcordoEntreAsPartes").isEmpty()){
			errorMsg += "Campo Acordo entre as partes é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAcordoEntreAsPartes") == "nao"){
			if(form.getValue("txtDivergenciaEntreAsPartes") == null || form.getValue("txtDivergenciaEntreAsPartes").isEmpty()){
				errorMsg += "Campo Divergência entre as partes é obrigatório!"+lineBreaker;
			}
		}
	}
//	if(CURRENT_STATE == VALIDAR_MINUTA){
//	}
//	if(CURRENT_STATE == AJUSTAR_DIVIRGENCIA){
//	}
//	if(CURRENT_STATE == RECOLHER_ASSINATURA_E_DIGITALIZAR_CONTRATO){
//	}
//	if(CURRENT_STATE == GERAR_CONTRATO_PROTHEUS){
//	}
//	if(CURRENT_STATE == FIM){
//	}
//	if(CURRENT_STATE == FIM){
//	}
//	if(CURRENT_STATE == TERMINO_APROVACAO_SISTEMA){
//	}
	//1.10
	if (objForm.isAtividadeInicial(APROVACAO_DO_SOLICITANTE)) {
		if(form.getValue("rdAprovadoSolicitante") == "" || form.getValue("rdAprovadoSolicitante").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoSolicitante") == "naprov"){
			if(form.getValue("txtJustificativaSolicitante") == null || form.getValue("txtJustificativaSolicitante").isEmpty()){
				errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
			}
		}
		//validarRegrasECamposAprovacaoDaSolicitacao(objForm);

	}
	//alterado de solucao_inconsistencia para CORRIGIR_INCONSISTENCIA
	if (objForm.isAtividadeInicial(CORRIGIR_INCONSISTENCIA)) {
		//validarRegrasECamposSolucaoDaInconsistencia(objForm);
		if(form.getValue("rdAprovadoSolicitante") == "" || form.getValue("rdAprovadoSolicitante").isEmpty()){
			errorMsg += "Campo Aprovado é obrigatório!"+lineBreaker;
		}
		if(form.getValue("rdAprovadoSolicitante") == "naprov"){
			if(form.getValue("txtJustificativaSolicitante") == null || form.getValue("txtJustificativaSolicitante").isEmpty()){
				errorMsg += "Campo Justificativa é obrigatório!"+lineBreaker;
			}
		}
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
	log.info("=============================validaMenorPreco ================================================");
	log.info("=============================validaMenorPreco : codItem: "+codItem);
	log.info("=============================validaMenorPreco : valorTotal: "+valorTotal);
	var indexes = form.getChildrenIndexes("tbCotacoes");
	var menorPreco = null;
	var vlTotalMenorPreco = null;

	for (var i = 0; i < indexes.length; i++) {
		log.info("========================================validaMenorPreco : inicio For");
		var index = indexes[i];
		log.info("=============================validaMenorPreco : codItemCotacao: "+form.getValue("codItemCotacao___"+index) +" - "+ codItem+" - "+(form.getValue("codItemCotacao___"+index) == codItem));
		if(form.getValue("codItemCotacao___"+index) == codItem){
			if(menorPreco == null){
				log.info("=============================menorPreco == null " + form.getValue("SeqItemCotacao___"+index));
				menorPreco = converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index));
				vlTotalMenorPreco = form.getValue("vlrTotalItemCotacao___"+index);
			}else if(converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index)) < menorPreco){
				log.info("=============================menorPreco != null "+ form.getValue("SeqItemCotacao___"+index));
				menorPreco = converteMoedaFloat(form.getValue("vlrTotalItemCotacao___"+index));
				vlTotalMenorPreco = form.getValue("vlrTotalItemCotacao___"+index);
			}
			log.info("=============================validaMenorPreco : menorPreco: "+menorPreco);
			log.info("=============================validaMenorPreco : seqMenorPreco: "+vlTotalMenorPreco);
		}
		log.info("========================================validaMenorPreco : fim For");
	}

	log.info("=============================validaMenorPreco : retorno: " + (valorTotal == vlTotalMenorPreco));
	log.info("============================= FIM validaMenorPreco =========================================");

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
