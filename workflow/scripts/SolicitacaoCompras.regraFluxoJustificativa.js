function regraFluxoJustificativa(){
	var indexes = hAPI.getChildrenIndexes("tbItens");	

	var result = 0;
	for (var i = 0; i < indexes.length; i++) {
		
		if(hAPI.getCardValue("justAjusteCotacao___" + indexes[i]) != ""){
			result = 1;
			break;
		}
		
	}

	return result;
}