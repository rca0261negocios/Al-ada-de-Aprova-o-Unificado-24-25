function tipoMaterial(){
		
	var grupo = hAPI.getCardValue("grupoAnaliseComprador");
	
	if (grupo == hAPI.getCardValue("poolAbertura"))
		return "matmed";
	else
		return "diversos";
	
}