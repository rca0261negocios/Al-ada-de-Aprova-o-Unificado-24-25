var AlcadaAprovacao = function(){
	this.contadorAlcada = $("#contadorAlcada").val();
	
	
	
	this.getAprovadores = function(filialSolicitacao, valorSolicitacao){
		var listaAprovadores = [];
		valorSolicitacao = removeMascaraMonetaria(valorSolicitacao);
		var datasetMatMed = DatasetFactory.getDataset("ds_alcadas_matmed_2", new Array(filialSolicitacao), null, null);
		if (datasetMatMed.values.length > 0){
			var row = datasetMatMed.values[0];
			//Não foi possível usar um loop pq os dados chegam do dataset de forma errada. 
			//Se fosse alterar o dataset ia ter alterar no fluxo de compras tb.
			//Filtra os aprovadores existente da filial e para valor correspondente 
			if(row.usuarioClinica  != null && row.usuarioClinica != undefined && row.usuarioClinica != ''){
				
				if(valorSolicitacao > removeMascaraMonetaria(row.valorClinica)){
					listaAprovadores.push({
						id: row.usuarioClinica,
						valor: row.valorClinica,
						conhecimento: row.clinicaSomenteConhecimento == "true" ? true : false
					});
				}
			}
			if(row.usuarioCompras  != null && row.usuarioCompras != undefined && row.usuarioCompras != ''){
				if(valorSolicitacao > removeMascaraMonetaria(row.valorCompras) ){
					listaAprovadores.push({
						id: row.usuarioCompras ,
						valor: row.valorCompras,
						conhecimento:row.comprasSomenteConhecimento == "true" ? true : false
					});
				}
			}
			if(row.usuarioDiretores  != null && row.usuarioDiretores  != undefined && row.usuarioDiretores  != ''){
				if(valorSolicitacao > removeMascaraMonetaria(row.valorDiretores) ){
					listaAprovadores.push({
						id: row.usuarioDiretores,
						valor: row.valorDiretores,
						conhecimento: row.diretoresSomenteConhecimento == "true" ? true : false
					});
				}
			}
		}
		
		return listaAprovadores;
	}
	
}