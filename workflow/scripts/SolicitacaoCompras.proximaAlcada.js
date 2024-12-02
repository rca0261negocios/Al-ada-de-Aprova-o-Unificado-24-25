function proximaAlcada(isParecerSolicitante){
	var retorno = false;
	var alcada = hAPI.getCardValue("contadorAlcada");
	var existeAlacada = hAPI.getCardValue("existeAlcadas");
	var grupoAnaliseComprador = hAPI.getCardValue("grupoAnaliseComprador");
	
	var listaAprovadores = getAprovadoresDom();
	var ultimoAprovadorManual = true;
	
	
	//Se a compra for do tipo MATMED e não tiver aprovador pode ser encaminhado para Emitir Pedido
	for (var i = alcada; i < listaAprovadores.length; i++){
		if(listaAprovadores[i].conhecimento != 'true' && listaAprovadores[i].aprovacaoExistente != 'true'){
			log.info("KAKAROTO AINDA EXISTE APROVADOR");
			ultimoAprovadorManual = false;
		}
	}
	
	if((existeAlacada == 'false') || (tipoMaterial(grupoAnaliseComprador) == tipoMatMed && listaAprovadores.length == 1 && listaAprovadores[0].conhecimento == 'true')){
		log.info("KAKAROTO NAO EXISTE ALCADA");
		retorno = false;
	}else if(ultimoAprovadorManual){
		log.info("KAKAROTO ULTIMO APROVADOR MANUAL: "+ isParecerSolicitante);
		if(isParecerSolicitante){
			log.info("KAKAROTO É PARECER SOLICI");
			retorno =  true;
		}else{
			log.info("KAKAROTO NAO PARECER SOLICI");
			retorno =  false
		}
	}else{
		log.info("KAKAROTO EXISTE ALCADA");
		retorno =  true;
	}
	
	return retorno;
	
}

