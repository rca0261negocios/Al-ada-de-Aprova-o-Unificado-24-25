function buscaAlcadaDiversos(filialSolic){

	var usuarioGerente;
	var valorGerente;
	var usuarioOperacoes;
	var valorOperacoes;
	var usuarioFinanceiro;
	var valorFinanceiro;
	var usuarioGeral;
	var UtilizaCentroCusto;
		
	//var filialSolic = hAPI.getCardValue("hiddenFilial");	
	
	
	var existeAlcada = false;
	
	var filialparam = new String(filialSolic);
	var filialFiltro = new Array(filialparam); 
	var datasetDiversos = DatasetFactory.getDataset("ds_alcadas_diversos_2", filialFiltro, null, null);
	if (datasetDiversos.rowsCount > 0)
		{
				
			existeAlcada       = true;		
			usuarioGerente     = datasetDiversos.getValue(0, "usuarioGerente");
			valorGerente       = datasetDiversos.getValue(0, "valorGerente");
			usuarioOperacoes   = datasetDiversos.getValue(0, "usuarioOperacoes");
			valorOperacoes     = datasetDiversos.getValue(0, "valorOperacoes");
			usuarioFinanceiro  = datasetDiversos.getValue(0, "usuarioFinanceiro");
			valorFinanceiro    = datasetDiversos.getValue(0, "valorFinanceiro");
			usuarioGeral 	   = datasetDiversos.getValue(0, "usuarioGeral");
			UtilizaCentroCusto = datasetDiversos.getValue(0, "UtilizaCentroCusto");
			if (UtilizaCentroCusto=="sim"){
				var codCentroCusto = hAPI.getCardValue("txtCodCentroCusto");

			    //var consCentro = DatasetFactory.createConstraint("CTT_CUSTO", CodCentroCusto, CodCentroCusto, ConstraintType.MUST);        
				var constraintCentro = new Array(codCentroCusto);		
				var datasetCentro = DatasetFactory.getDataset("ds_alcadas_cc_2", constraintCentro, null, null);

				
				if (datasetCentro.rowsCount > 0){
					usuarioGerente = datasetCentro.getValue(0, "usuarioGerenteCentro");
					usuarioOperacoes = datasetCentro.getValue(0, "usuarioDirOperacoesCentro");
				}
			}
		}
	else
		{
			existeAlcada       = false;
			usuarioGerente     = "";
			valorGerente       = "";
			usuarioOperacoes   = "";
			valorOperacoes     = "";
			usuarioFinanceiro  = "";
			valorFinanceiro    = "";
			usuarioGeral 	   = "";
			UtilizaCentroCusto = "";
		}
	
	var alcadasDiversos = {"retornoAlcada":     existeAlcada,
						   "usuarioGerente":    usuarioGerente,
						   "valorGerente":      valorGerente,
						   "usuarioOperacoes":  usuarioOperacoes,
						   "valorOperacoes":    valorOperacoes,
						   "usuarioFinanceiro": usuarioFinanceiro,
						   "valorFinanceiro":   valorFinanceiro,
						   "usuarioGeral": 	    usuarioGeral};
	return alcadasDiversos;
}