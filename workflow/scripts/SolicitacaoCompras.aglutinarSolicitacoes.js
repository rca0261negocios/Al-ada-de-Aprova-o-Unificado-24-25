function aglutinarSolicitacoes(){
	// buscar solicitações selecionadas para aglutinação
	if (hAPI.getCardValue("txtNumSolicAdd___1") != null &&
		hAPI.getCardValue("txtNumSolicAdd___1")	!= undefined &&
		hAPI.getCardValue("txtNumSolicAdd___1").trim()	!= ""){
		
		var numProcess = getValue("WKNumProces");
		
		//var obsSolic = "Solicitação gerado a partir dos itens desvinculados na solicitação" + numProcess; 
	    		    
		var mapa = hAPI.getCardData(parseInt(numProcess));
		var card = new java.util.HashMap();
		
		var it = mapa.keySet().iterator();
		while (it.hasNext()) {
		   var campo = it.next();
		 		   
		   if (campo.indexOf("txtNumSolicAdd___") > -1){
			   			   
			   var NumSolicAdd = mapa.get(campo);
			   
			   encerraAglutinada(NumSolicAdd);
			   // se solic escolhida  nao estiver mais no pool fazer throw passando o numero da solicitacao que precisa ser excluida
		   } // if campo
		} // while  
	} // if !=null
} // end function