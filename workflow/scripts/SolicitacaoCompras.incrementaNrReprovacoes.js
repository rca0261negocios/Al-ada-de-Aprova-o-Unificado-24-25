function incrementaNrReprovacoes(){
	var nrReprovacoes = getWFParametro("nrReprovacoes");
	if(nrReprovacoes == ""){
		nrReprovacoes = 0;
	}else{
		nrReprovacoes = parseInt(nrReprovacoes);
	}
	nrReprovacoes++;
	setWFParametro("nrReprovacoes", nrReprovacoes);
}