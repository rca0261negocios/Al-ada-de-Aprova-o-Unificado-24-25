function verificaUltmoAprovador(){
	// VERIFICA SE O ULTIMO APROVADOR EXECTOU A APROVACAO SIM = TRUE OU NAO = FALSE NA TABELA targetAprovadores
   	var nomeTabela   = "targetAprovadores";
   	var numeroLinhas = hAPI.getChildrenIndexes(nomeTabela);
	var indice       = numeroLinhas[ numeroLinhas.length-1 ];
	
	// Pegue os valores de cada coluna
	var campo1 = hAPI.getCardValue("apvStatus___" + indice);

	log.info("### verificaUltmoAprovador:");
	log.info("### verificaUltmoAprovador 1- "+numeroLinhas);
	log.info("### verificaUltmoAprovador 2- "+indice);
	log.info("### verificaUltmoAprovador 3- "+campo1);

	// Verifique se o campo é igual a "nao_confirmado"
	if(campo1 == "nao_confirmado")
		return false;
	else
		return true;
}

function verificaSeCargaAprovadores(){
	// CONFIRMAR SE A TABELA DE APROVADORES FOI CARREGADA COM SUSCESSO
   	// Identifique o nome do campo da tabela pai-filho
   	var nomeTabela = "targetAprovadores";

   	// Obtenha o número de linhas da tabela
   	var numeroLinhas = hAPI.getChildrenIndexes(nomeTabela);
   	if(numeroLinhas.length<=0)
   		return false;
   	else
   		return true;
}
