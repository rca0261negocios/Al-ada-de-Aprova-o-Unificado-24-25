function Aprovador(){
	
	''
	
}
/**
 * Busca todos os aprovadores das alçadas de aprovaçao de matme
 * @param filialSolic - Filial
 * @returns retornar um objeto com os aprovadores, valores de aprovação e flag de somente conhecimento
 */
function getAprovadores(filialSolic, valorSolicitacao){
	var listaAprovadores = [];
	valorSolicitacao = removeMascaraMonetaria(valorSolicitacao);
	var datasetMatMed = DatasetFactory.getDataset("ds_alcadas_matmed_2", new Array(filialSolic), null, null);
	log.info("KAKAROTO "+datasetMatMed.rowsCount);
	if (datasetMatMed.rowsCount > 0){
		//Não foi possível usar um loop pq os dados chegam do dataset de forma errada. 
		//Se fosse alterar o dataset ia ter alterar no fluxo de compras tb.
		var usuarioClinica = datasetMatMed.getValue(0, "usuarioClinica");
		var usuarioCompras = datasetMatMed.getValue(0, "usuarioCompras");
		var usuarioDiretor = datasetMatMed.getValue(0, "usuarioDiretores");
		var valorAprovadorClinica = removeMascaraMonetaria(datasetMatMed.getValue(0, "valorClinica"));
		var valorAprovadorCompras = removeMascaraMonetaria(datasetMatMed.getValue(0, "valorCompras"));
		var valorAprovadorDiretores = removeMascaraMonetaria(datasetMatMed.getValue(0, "valorDiretores"));
		//Filtra os aprovadores existente da filial e para valor correspondente 
		if(usuarioClinica  != null && usuarioClinica != undefined && usuarioClinica != ''){
			if(valorSolicitacao > valorAprovadorClinica ){
				listaAprovadores.push({
					id: usuarioClinica,
					valor: valorAprovadorClinica,
					conhecimento:datasetMatMed.getValue(0, "clinicaSomenteConhecimento") == "true" ? true : false
				});
			}
		}
		if(usuarioCompras  != null && usuarioCompras != undefined && usuarioCompras != ''){
			if(valorSolicitacao > valorAprovadorCompras ){
				listaAprovadores.push({
					id: usuarioCompras,
					valor: valorAprovadorCompras,
					conhecimento:datasetMatMed.getValue(0, "comprasSomenteConhecimento") == "true" ? true : false
				});
			}
		}
		if(usuarioDiretor  != null && usuarioDiretor != undefined && usuarioDiretor != ''){
			if(valorSolicitacao > valorAprovadorDiretores ){
				listaAprovadores.push({
					id: usuarioDiretor,
					valor: valorAprovadorDiretores,
					conhecimento:datasetMatMed.getValue(0, "diretoresSomenteConhecimento") == "true" ? true : false
				});
			}
		}
	}
	
	return listaAprovadores;
}