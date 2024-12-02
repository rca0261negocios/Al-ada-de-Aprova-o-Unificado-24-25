function populaCamposHiddenAnalytics(sequenceId){
	var dataInicioEvento = new Date().getTime();
	var dataFimEvento;
	
	var CURRENT_STATE = getValue("WKNumState");
	var expediente = "Default";
	var tipoSolicitacao = hAPI.getCardValue("analyticsTpSolicitacao");
	
	if(CURRENT_STATE != null && CURRENT_STATE != 0){
		if( sequenceId == ATUALIZAR_SLA_CORRECAO_SOLICITACAO ||
		    sequenceId == ATUALIZAR_SLA_APROVACAO_SOLICITANTE ||
			sequenceId == CORRECAO_SOLICITACAO ||
			sequenceId == ENCAMINHAR_COMPRADOR || 
			sequenceId == GERA_COTACAO || 
			sequenceId == COTACAO ||
			sequenceId == DEFINIR_VENCEDOR ||
			sequenceId == PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE ||
			sequenceId == APROVACAO_1A_ALCADA ||
			sequenceId == APROVACAO_2A_ALCADA ||
			sequenceId == APROVACAO_3A_ALCADA ||
			sequenceId == APROVACAO_4A_ALCADA ||
			sequenceId == VALIDAR_PARECER_SOLICITANTE ||
			sequenceId == EMITIR_PEDIDO_DE_COMPRA ||
			sequenceId == ANEXAR_MINUTA ||
			sequenceId == VALIDAR_MINUTA ||
			sequenceId == AJUSTAR_DIVIRGENCIA ||
			sequenceId == RECOLHER_ASSINATURA_E_DIGITALIZAR_CONTRATO ||
			sequenceId == GERAR_CONTRATO_PROTHEUS ||
			sequenceId == SOLUCAO_INCONSISTENCIA){
			populaAnalytics(sequenceId);
		}else if(sequenceId == FIM
				|| sequenceId == FIM__
				|| sequenceId == FIM___
				|| sequenceId == FIM____){
			populaAnalytics(sequenceId);
			finalizarSolicitacao();
		}
	}
	dataFimEvento = new Date().getTime();
}

function finalizarSolicitacao(){
	
		var dataAtual = new Date();
		var dataFormatada = formatarDataAnalytics(dataAtual.getDate(), (dataAtual.getMonth()+1), dataAtual.getFullYear(), dataAtual.getHours(), dataAtual.getMinutes(), dataAtual.getSeconds());
		
		hAPI.setCardValue("analyticsDtFim",dataFormatada.split(" ")[0]);
		hAPI.setCardValue("analyticsHrFim",dataFormatada.split(" ")[1]);
		
}

function populaAnalytics(sequenceId){
	
	var expediente = "Default";
	var dataFormatada = buscaDataFormatada("analyticsDtInicio","analyticsHrInicio");
	var prazoSLA = hAPI.getCardValue("analyticsPrazoSLA");
	var codigoSLA = "";
	var sla;
	var tipoSolicitacao = hAPI.getCardValue("grupoAnaliseComprador");
	var contrato = hAPI.getCardValue("rdContrato");
	
	if(contrato != null && contrato != undefined && contrato == "sim"){
		tipoSolicitacao = "Compra Contrato";		
		codigoSLA = "processoComprasContrato";
	}else if(tipoSolicitacao == hAPI.getCardValue("poolAbertura")){
		tipoSolicitacao = "Compra Mat/Med";
		codigoSLA = "processoComprasMatMed";
	}else if(tipoSolicitacao == "Pool:Group:CD" || tipoSolicitacao == "Pool:Group:CA_Compras"){
		var tipoDiversas = hAPI.getCardValue("campoIdentificador");
		//var tipoDiversas = hAPI.getCardValue("descritorCompras");
		
		// if(tipoDiversas.indexOf("- SRV") != -1){
		// 	tipoSolicitacao = "Compra Serviço";
		// 	codigoSLA = "processoComprasServico";
		// }else{
		// 	tipoSolicitacao = "Compra Diversa";
		// 	codigoSLA = "processoComprasDiverso";
		// }
		
	}
	
	
	// if(prazoSLA == ""){
	// 	var prazosSLA = buscaDatasetPrazosSLA();
	// 	sla = buscaSLA(codigoSLA, prazosSLA);
		
	// 	hAPI.setCardValue("analyticsPrazoSLA",sla.prazo_sla);
	// 	hAPI.setCardValue("analyticsMedidaPrazoSLA",sla.medida_prazo);
		
	// } else {
	// 	sla = {
	// 			codigo_sla : codigoSLA,
	// 			prazo_sla : prazoSLA,
	// 			medida_prazo : hAPI.getCardValue("analyticsMedidaPrazoSLA")
	// 	};
		
	// }
	hAPI.setCardValue("analyticsDtInicio",dataFormatada.split(" ")[0]);
	hAPI.setCardValue("analyticsHrInicio",dataFormatada.split(" ")[1]);

	if(getValue("WKNumState") != sequenceId){		
		hAPI.setCardValue("analyticsTpSolicitacao",tipoSolicitacao);			
		if (sequenceId == ATUALIZAR_SLA_CORRECAO_SOLICITACAO ||
			sequenceId == ATUALIZAR_SLA_APROVACAO_SOLICITANTE ||
			sequenceId == ENCAMINHAR_COMPRADOR || 
			sequenceId == VALIDAR_PARECER_SOLICITANTE || 
			sequenceId == SOLUCAO_INCONSISTENCIA || 
			sequenceId == FIM__) {
			
			var atividadesDescartadas = new Array();
			atividadesDescartadas[0] = INICIO_1;
			atividadesDescartadas[1] = CORRECAO_SOLICITACAO;
			atividadesDescartadas[2] = PARECER_SOLICITANTE;
			atividadesDescartadas[3] = APROVACAO_SOLICITANTE;
			
			var primeirasAtividadesDescartadas = new Array();
			primeirasAtividadesDescartadas[0] = GERA_COTACAO;
			primeirasAtividadesDescartadas[1] = ANALISE_COMPRADOR;
			
			// var prazoConclusao = buscaPrazoConclusao(sla, atividadesDescartadas, primeirasAtividadesDescartadas, dataFormatada.split(" ")[0], dataFormatada.split(" ")[1], sequenceId);
			// hAPI.setCardValue("analyticsDtPrazo",prazoConclusao.split(" ")[0]);
			// hAPI.setCardValue("analyticsHrPrazo",prazoConclusao.split(" ")[1]);
		}
	}
	
}

// function buscaPrazoConclusao(sla, atividadesDescartadas, primeirasAtividadesDescartadas,  dataInicio, horaInicio, sequenceId){
// 	var expediente = "Default";
// 	var dataPrazoConclusao = calculaPrazoConclusao(sla, expediente, atividadesDescartadas,primeirasAtividadesDescartadas, dataInicio, horaInicio, sequenceId);
// 	var dataFormatadaPrazo = formatarDataAnalytics(dataPrazoConclusao.getDate()+"", (dataPrazoConclusao.getMonth() + 1)+"", dataPrazoConclusao.getFullYear()+"", dataPrazoConclusao.getHours()+"",dataPrazoConclusao.getMinutes()+"",dataPrazoConclusao.getSeconds()+"")
	
// 	return dataFormatadaPrazo;
// }



