/**
 * Seta os campos para aprovação manual
 * @param alcadaAtual
 * @param aprovadorAtual
 */
function aprovaManual(alcadaAtual,aprovadorAtual){
	var nomeAprovador = buscarNomeUsuario(aprovadorAtual.id);
	hAPI.setCardValue("aprovacaoAutomatica", "nao");
	hAPI.setCardValue("aprovadorAtual", aprovadorAtual.id);
	hAPI.setCardValue("nomeAprovadorAtual",  nomeAprovador);
	hAPI.setCardValue("dataAprovacaoAlcada"+alcadaAtual,dateFormat(new Date()));
	hAPI.setCardValue("nomeAprovadorAlcada"+alcadaAtual, nomeAprovador);
}

/**
 * Seta os campos para aprovação automatica
 * @param aprovadorAtual
 * @param somenteConhecimento
 */
function aprovaAutomatico(alcadaAtual, aprovadorAtual){
	
	var nomeAprovador = buscarNomeUsuario(aprovadorAtual.id);
	hAPI.setCardValue("aprovacaoAutomatica", "sim");
	hAPI.setCardValue("dataAprovacaoAlcada"+alcadaAtual,dateFormat(new Date()));
	hAPI.setCardValue("nomeAprovadorAlcada"+alcadaAtual, nomeAprovador);
	hAPI.setCardValue("nomeAprovadorAlcada"+alcadaAtual, nomeAprovador);
	
	var mensagemAprovacao = "Atividade movimentada automaticamente devido a recorrência do aprovador em alçadas anteriores";
	if(aprovadorAtual.conhecimento == "true"){
		mensagemAprovacao = "Alçada de compra foi aprovada automaticamente através do cadastro de Ciente.";
	}
	hAPI.setCardValue("rdAprovadoAlcada" + alcadaAtual,"aprov");
	hAPI.setCardValue("txtJustificativaAlcada" + alcadaAtual, mensagemAprovacao);
	//Envia email somente conhecimento
	enviaEmailSomenteConhecimento(alcadaAtual, aprovadorAtual);
}

/**
 * Retorna todos aprovadores das alcadas
 * @param aprovadores
 * @returns {Array}
 */
function retornaAprovadores(aprovadores) {
	try {
		var valorTotalSolicitacao = getMoneyValue(hAPI.getCardValue("txtTotValCotacao")); 
		var listaAprovadores = [];
		var ultimoCentroCusto = false;
		for ( var i in aprovadores) {
			if (aprovadores.existeAlcada == true) {
				if (Array.isArray(aprovadores[i])) {
					var usuarioAlcada = aprovadores[i][0];
					var conhecimento = aprovadores[i][aprovadores[i].length -1];
					if (usuarioAlcada != null && usuarioAlcada != undefined && usuarioAlcada != ''){
						if(aprovadores[i] == aprovadores.usuarioGeral){//verifica se é o usuário maximo da alcada
							//Pega o valor do ultimo aprovador da filial e verifica se ele é menor que o valor total da 
							//solicitacao. Se for, adiciona o usuario geral para aprovacao.
							var valorUltimoAprovador = listaAprovadores[listaAprovadores.length -1].valor; 
							if(valorTotalSolicitacao > valorUltimoAprovador){
								listaAprovadores.push({
									id: usuarioAlcada,
									conhecimento:conhecimento
								});
							}
						}else{//Se não for o usuario geral
							var valorUsuario = getMoneyValue(aprovadores[i][1]);
							//informa se o usuário é um aprovador de filial ou de centro de custo
							var origemUsuario = aprovadores[i][3];
							//verifica se a variavel de controle é verdadeira e se o usuário atual é de um centro de custo
							//caso verdadeiro esta volta do loop é avançada de forma que o ultimo aprovador de centro de custo
							//já foi adicionado à lista
							if(ultimoCentroCusto == true && origemUsuario == 'centroCusto'){
								continue;
							}
							listaAprovadores.push({
								id: usuarioAlcada,
								valor: valorUsuario,
								conhecimento:conhecimento
							});
							//A verificação de valores ocorre depois da inseção do usuário pelo fator "valor até" 
							//Caso não seja informado um valor, o aprovador deve aprovar qualquer valor de compra
							//Os aprovadores de centro de custo possuem alçadas separadas dos aprovadores das filiais
							if (valorUsuario != null && valorUsuario != undefined && valorUsuario != ''){
								if(valorUsuario > valorTotalSolicitacao){
									if(origemUsuario == 'centroCusto'){
										//Caso seja verificado o ultimo aprovador de sentro de custo a aprovar a solicitação
										//a variavel é setada para true
										ultimoCentroCusto = true;
									} else {
										break;
									}
								}	
							}
						}
					}
				}
			}
		}
		
		if(listaAprovadores.length == 0){
			hAPI.setCardValue("existeAlcadas", 'false');
		}else{
			hAPI.setCardValue("existeAlcadas", 'true');
		}
		return listaAprovadores;
	} catch (e) {
		log.info("solicitacaoCompras.beforeStateEntry ERRO AO LISTAR APROVADORES DE ALÇADAS: "+e)
	}
}

/**
 * Seta para o HTML os dados dos aprovadores
 * @param listaAprovadores lista de aprovadores retornado para dataset
 */
function setAprovadoresDOM(listaAprovadores){
	for (var i in listaAprovadores){	
		var alcadaAprovador = parseInt(i)+1;
		log.info("Abner listaAprovadores[i].id:"+listaAprovadores[i].id);
		if(alcadaAprovador != 6){
			hAPI.setCardValue("aprovadorAlcada"+alcadaAprovador, listaAprovadores[i].id);
			hAPI.setCardValue("valorAprovadorAlcada"+alcadaAprovador, listaAprovadores[i].valor);
			hAPI.setCardValue("aprovAlcadaConhecimento"+alcadaAprovador, listaAprovadores[i].conhecimento);
		}else{
			hAPI.setCardValue("aprovadorAlcada"+alcadaAprovador, listaAprovadores[i].id);
			hAPI.setCardValue("aprovAlcadaConhecimento"+alcadaAprovador, listaAprovadores[i].conhecimento);
		}
	}
}
/**
 * Busca todos aprovadores existentes no DOM
 * @Return listaAprovadores com objetos aprovadores
 */
function getAprovadoresDom(){
	var listaAprovador = [];
	for (var alcada = 1; alcada <=6; alcada++ ){
		var idAprovador = hAPI.getCardValue("aprovadorAlcada"+alcada);
		if(idAprovador != ""&& idAprovador != undefined && idAprovador != null){
			var aprovadorConhecimento = hAPI.getCardValue("aprovAlcadaConhecimento"+alcada);
			var aprovExistente = false;
			//verifica se o aprovador já exite na liste de aprovação
			for(var j = 0; j < listaAprovador.length; j++){
				if(listaAprovador[j].id == idAprovador){
					aprovExistente =  true;
					break;
				}
			}
			if(alcada != 6){
				var aprovadorValor = hAPI.getCardValue("valorAprovadorAlcada"+alcada);
				listaAprovador.push({
					id: idAprovador,
					valor: aprovadorValor,
					conhecimento:aprovadorConhecimento,
					aprovacaoExistente: aprovExistente
				})
			}else{
				listaAprovador.push({
					id: idAprovador,
					conhecimento:aprovadorConhecimento,
					aprovacaoExistente:aprovExistente
				})
			}
		}
	}
	
	return listaAprovador;
}


function aprovaAlcada(alcada, listaAprovador, primeiraAlcada){
	try{ 
		var fimAprovacao = false;
		while(!fimAprovacao){
			var posicaoAlcada = parseInt(alcada) -1;
			var aprovadorAtual = listaAprovador[posicaoAlcada];
			var aprovadorRepitido = false;
			for(var x = 0; x < posicaoAlcada; x++){
				if(listaAprovador[x].id == aprovadorAtual.id){
					aprovadorRepitido = true;
					break;
				}
			}
			if(aprovadorAtual.conhecimento != 'true' && aprovadorAtual.aprovacaoExistente != 'true' &&  aprovadorRepitido != true ){
				aprovaManual(alcada, aprovadorAtual);
				fimAprovacao = true;
			}else{
				//Aprovação automatica que sera chamada no beforeTaskSave
				alcada++;
				if(primeiraAlcada == true){
					aprovaAutomatico(parseInt(alcada)-1, aprovadorAtual);
					hAPI.setCardValue("contadorAlcada", parseInt(alcada));
				}else if (alcada-1 >= listaAprovador.length){
					if(aprovadorRepitido == true && alcada-1 == listaAprovador.length){
						aprovaAutomatico(parseInt(alcada)-1, aprovadorAtual);
					}

					hAPI.setCardValue("existeAlcadas", 'false');
				}
			}
			//Garante que o loop será encerrado quando estiver na ultima alcada
			if(parseInt(alcada) > listaAprovador.length){
				fimAprovacao = true;
			}
		}
	}catch(err){
		//throw "Um erro ocorrecu na aprovação da Alcada. "+err;
	}
}
