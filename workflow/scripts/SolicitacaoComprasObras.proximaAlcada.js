function proximaAlcada(isParecerSolicitante){
	var retorno = false;
	var alcada = hAPI.getCardValue("contadorAlcada");
	var existeAlacada = hAPI.getCardValue("existeAlcadas");
	
	var listaAprovadores = getAprovadoresDom();
	var ultimoAprovadorManual = true;
	
	for (var i = alcada; i < listaAprovadores.length; i++){
		if(listaAprovadores[i].conhecimento != 'true' && listaAprovadores[i].aprovacaoExistente != 'true'){
			ultimoAprovadorManual = false;
		}
	}
	
	if(existeAlacada == 'false'){
		retorno = false;
	}else if(ultimoAprovadorManual){
		if(isParecerSolicitante){
			retorno =  true;
		}else{
			retorno =  false
		}
	}else{
		retorno =  true;
	}
	
	return retorno;
}

