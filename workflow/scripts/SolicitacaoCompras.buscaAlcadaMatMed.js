function buscaAlcadaMatMed(filialSolic){
	
	var usuarioFarmacia;
	var usuarioClinica;
	var valorClinica;
	var usuarioCompras;
	var valorCompras;
	var usuarioDiretores;
	var valorDiretores;
	var existeAlcada = false;
	var filialparam = new String(filialSolic);
	var filialFiltro = new Array(filialparam); 
	var datasetMatMed = DatasetFactory.getDataset("ds_alcadas_matmed_2", filialFiltro, null, null);
		
	if (datasetMatMed.rowsCount > 0)
		{
			existeAlcada     = true;		
			usuarioFarmacia  = datasetMatMed.getValue(0, "usuarioFarmacia");
			usuarioClinica   = datasetMatMed.getValue(0, "usuarioClinica");
			valorClinica     = datasetMatMed.getValue(0, "valorClinica");
			usuarioCompras   = datasetMatMed.getValue(0, "usuarioCompras");
			valorCompras     = datasetMatMed.getValue(0, "valorCompras");
			usuarioDiretores = datasetMatMed.getValue(0, "usuarioDiretores");
			valorDiretores   = datasetMatMed.getValue(0, "valorDiretores");
		}
	else
		{
			existeAlcada     = false;
			usuarioFarmacia  = "";
			usuarioClinica   = "";
			valorClinica     = "";
			usuarioCompras   = "";
			valorCompras     = "";
			usuarioDiretores = "";
			valorDiretores   = "";
		}
	
	var alcadasMatMed = {"retornoAlcada":    existeAlcada,
			             "usuarioFarmacia":  usuarioFarmacia,
						 "usuarioClinica":   usuarioClinica,
			   			 "valorClinica":     valorClinica,
			   			 "usuarioCompras":   usuarioCompras,
			   			 "valorCompras":     valorCompras,
			   			 "usuarioDiretores": usuarioDiretores,
			   			 "valorDiretores":   valorDiretores};
	return alcadasMatMed;
}