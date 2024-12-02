function enableFields(form) {
	
	bloquearImpostos(form);
	
}



function bloquearImpostos(form){
	
	var indexes = form.getChildrenIndexes("tbProd");

	for (var i=0; i<indexes.length; ++i){ 
		form.setEnabled("qtdProd___"+indexes[i], false); 
		form.setEnabled("valorProd___"+indexes[i], false);					
	} 	
	
}