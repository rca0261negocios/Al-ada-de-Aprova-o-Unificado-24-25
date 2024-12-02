
/**
 * Retorna um objeco com os aprovadores da alcada
 * @param filialAlcada
 * @parm grupo Grupo da analise de comprador
 * @codCentroCusto código do centodo de custo selecionado
 * @returns
 */
function getAprovadoresAlcada(filialAlcada, grupo, codCentroCusto){
	return buscaAprovadoresObras(filialAlcada,codCentroCusto);
}


/**
 * Busca todos os aprovadores das alçadas de aprovaçao de diversos
 * @param filialSolic - Filial
 * @returns retornar um objeto com os aprovadores, valores de aprovação e flag de somente conhecimento
 */
function buscaAprovadoresObras(filialSolic, codCentroCusto){
	var aprovadores = {
		tipo: 'obras',
		existeAlcada: false,
		UtilizaCentroCusto: '',
		usuarioGerente: [],
		usuarioGerente2: [],
		usuarioGerente3:[],
		usuarioOperacoes:[],
		usuarioFinanceiro:[],
		usuarioGeral: []
	}
	
	//busca o dataset
	var datasetDiversos = DatasetFactory.getDataset("ds_alcadas_obras", new Array(filialSolic), null, null);

	if (datasetDiversos.rowsCount > 0){
		try{
			aprovadores.existeAlcada = true;
			aprovadores.UtilizaCentroCusto = datasetDiversos.getValue(0, "UtilizaCentroCusto");
			aprovadores.usuarioOperacoes.push(datasetDiversos.getValue(0, "usuarioOperacoes"),datasetDiversos.getValue(0, "valorOperacoes"),datasetDiversos.getValue(0, "operacoesSomenteConhecimento") == "true" ? true : false);
			aprovadores.usuarioFinanceiro.push(datasetDiversos.getValue(0, "usuarioFinanceiro"),datasetDiversos.getValue(0, "valorFinanceiro"),datasetDiversos.getValue(0, "financeiroSomenteConhecimento") == "true" ? true : false);
			aprovadores.usuarioGeral.push(datasetDiversos.getValue(0, "usuarioGeral"), datasetDiversos.getValue(0, "geralSomenteConhecimento"));
			if (aprovadores.UtilizaCentroCusto =="sim"){
			    //consulta o centro de custo       
				var constraintCentro = new Array(codCentroCusto+" ");
				var datasetCentro = DatasetFactory.getDataset("ds_alcadas_cc_2", constraintCentro, null, null);
				if(datasetCentro != undefined){
					if (datasetCentro.rowsCount > 0){
						//Verifica se existe um usuario cadastrado para cada centro de custo
						if(datasetCentro.getValue(0, "usuarioGerenteCentro") != "" && datasetCentro.getValue(0, "usuarioGerenteCentro") != undefined && datasetCentro.getValue(0, "usuarioGerenteCentro") != null){
							aprovadores.usuarioGerente.push(datasetCentro.getValue(0, "usuarioGerenteCentro"), datasetCentro.getValue(0, "valorGerenteCentro"),datasetCentro.getValue(0,"gerCentroSomenteConhecimento") == "true" ? true : false,'centroCusto');
						} else {
							aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false,'filial');
						}
						
						if(datasetCentro.getValue(0, "usuarioGerenteCentro2") != "" && datasetCentro.getValue(0, "usuarioGerenteCentro2") != undefined && datasetCentro.getValue(0, "usuarioGerenteCentro2") != null){
							aprovadores.usuarioGerente2.push(datasetCentro.getValue(0, "usuarioGerenteCentro2"), datasetCentro.getValue(0, "valorGerenteCentro2"), datasetCentro.getValue(0, "gerCentroSomenteConhecimento2") == "true" ? true : false,'centroCusto');
						} else {
							aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false,'filial');
						}
						
						if(datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != "" && datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != undefined && datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != null){
							aprovadores.usuarioGerente3.push(datasetCentro.getValue(0, "usuarioDirOperacoesCentro"), datasetDiversos.getValue(0, "valorGerente3"), datasetCentro.getValue(0, "dirOpSomenteConhecimento") == "true" ? true : false);
						} else {
							aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false);
						}
					} else {
						aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false);
						aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false);
						aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false);
					}
				}			
			} else {
				aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false);
				aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false);
				aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false);
			}
		}catch(e){
			log.info("ERRO Class: Busca Aprovadores Alçadas: "+ e)
		}
	}
	return aprovadores;
}