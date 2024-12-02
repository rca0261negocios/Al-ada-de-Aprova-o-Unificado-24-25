function beforeStateEntry(sequenceId){
	
	//Seta os dados do próximo aprovador.
	if(sequenceId == ALCADA_APROVACAO){
		LISTA_APROVADORES_DOM = getAprovadoresDom();
		var numProximaAlcada = parseInt(hAPI.getCardValue("contadorAlcada")) +1;
		if(numProximaAlcada <= LISTA_APROVADORES_DOM.length){//garante a existencia da proxima alcada
			aprovaAlcada(numProximaAlcada,LISTA_APROVADORES_DOM,false);
		}
	}
	
	if(sequenceId != INICIO && sequenceId != 0){
		hAPI.setCardValue("targetFloat", getMoneyValue(hAPI.getCardValue("target")));
	}
	if(sequenceId == GERAR_COTACAO_FORNECEDOR && hAPI.getCardValue("targetFloat")<=100000) notifyManager(); //import notifyManager.js
	if(getValue("WKNumState") == EMITIR_PEDIDO_DE_COMPRA && sequenceId == APROVACAO_SOLICITANTE) criarPedido(); //import pedidoCompra.js
	if(sequenceId == FIM_2){
		startPesquisaDeSatisfacao(getValue("WKUser")); //import startPesquisaDeSatisfacao.js
	}
	
	if(sequenceId == EXCLUSIVO_ALCADA_APROVADA){
		var contador = hAPI.getCardValue("contadorAlcada");
		if(hAPI.getCardValue("rdAprovadoAlcada"+contador) == "aprov"){
			hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, '<label style="color: green;"><span class="fluigicon fluigicon-process-decision fluigicon-sm"></span>Aprovado</label>');
		}else if(hAPI.getCardValue("rdAprovadoAlcada"+contador) == "naprov"){
			hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0, '<label style="color: red;"><span class="fluigicon fluigicon-process-remove fluigicon-sm"></span>Reprovado</label>');
		}
	}
}

/**
 * Envia email somente conhecimento
 * @param numeroAlcada O numero da alçada aprovada automaticamente
 * @param responsavelAlcada Número da matricula(Id) do responsavel pela alçada
 */
function enviaEmailSomenteConhecimento(numeroAlcada, responsavelAlcada) {
	var data = buscaDadosEmail();
	var sender = "4s2f7mmb7dfs64qv1452799368975";
	try {
		
		var numProces = getValue("WKNumProces");
		//Parametros de envio
		var parameters = new java.util.HashMap();
		parameters.put("subject", "Notifica\u00E7\u00E3o de Tratativa de Pesquisa de Satisfa\u00E7\u00E3o - "+ String(numProces));
		parameters.put("INSTANCE_ID", String(getValue("WKNumProces")));
		parameters.put("subject", "Aprovação automática de Alçada - " + String(numProces));
		parameters.put("NUM_ALCADA",String(numeroAlcada));
		parameters.put("NUM_SOLICITACAO",String(numProces));
		parameters.put("NOME_FILIAL",data.filial);
		parameters.put("NOME_SOLICITANTE",data.solicitante);
		parameters.put("COD_NAME_CC",data.centroDeCusto);
		parameters.put("VALOR_TOTAL",data.valorTotal);
		//Seta os destinatarios

		var recipients = new java.util.ArrayList();

		recipients.add(responsavelAlcada);
		//envia o email
		notifier.notify(sender, "template_email_somente_conhecimento", parameters, recipients, "text/html");

	} catch (e) {
		log.info("***** Ocorreu um erro ao tentar enviar o e-mail: " + e);
	}
}

//#FLUIG-89 Busca dados da alcada de aprovação.
function buscaDadosEmail(){
	var nomeFilial = hAPI.getCardValue("FilialAlcada");
	var nomeRequisitante = hAPI.getCardValue("txtNmRequisitante");
	var codCentroCutsto = hAPI.getCardValue("txtCodCentroCusto");
	var nomeCentroCusto = hAPI.getCardValue("txtNomeCentroCusto");
	var totalCotacao = hAPI.getCardValue("txtTotValCotacao");
	
	return{
		'filial':nomeFilial,
		'solicitante': nomeRequisitante,
		'centroDeCusto': codCentroCutsto +" "+ nomeCentroCusto,
		'valorTotal':totalCotacao
	}
}

function dateFormat(date){
	var mes = parseInt(date.getMonth())+1;
    mes = (mes < 10) ? "0"+mes : mes;
	return date.getDate()+"/"+ mes +"/"+date.getFullYear();
}
