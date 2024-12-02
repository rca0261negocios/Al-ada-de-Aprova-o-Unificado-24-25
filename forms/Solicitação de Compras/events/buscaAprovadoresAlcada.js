/**
*Busca os aprovadores de alçada
*
*/
var tipoMatMed = 'matmed';
var tipoDiversos = 'diversos';

/**
 * Retorna um objeco com os aprovadores da alcada
 * @param filialAlcada
 * @parm grupo Grupo da analise de comprador
 * @codCentroCusto código do centodo de custo selecionado
 * @returns
 */
function getAprovadoresAlcada(filialAlcada, grupo, codCentroCusto){
	
	var tipo = tipoMaterial(grupo);
	
	if(tipo == tipoMatMed){
		return buscaAprovadoresMatMed(filialAlcada);
	}else if(tipo == tipoDiversos){
		return buscaAprovadoresDiversos(filialAlcada,codCentroCusto);
	}
}

/**
 * Função já existente que verifica se o produto é matmed ou diversos.
 * @returns {String} informando se matmed ou diversos
 */
function tipoMaterial(grupo){
	if(grupo == "Pool:Group:MEMBER_Demandas-Suprimentos-Diretos" || grupo == "Pool:Group:MEMBER_Demandas-Oncoprod"){
		return "matmed";
	}else{
		return "diversos";
	}
}

/**
 * Busca todos os aprovadores das alçadas de aprovaçao de matme
 * @param filialSolic - Filial
 * @returns retornar um objeto com os aprovadores, valores de aprovação e flag de somente conhecimento
 */
function buscaAprovadoresMatMed(filialSolic){
		
	var aprovadores = {
		tipo: 'matmed',
		existeAlcada: false,
		usuarioFarmacia: '',
		usuarioClinica: [],
		usuarioCompras: [],
		usuarioDiretor: []
	}

	var datasetMatMed = DatasetFactory.getDataset("ds_alcadas_matmed_2", new Array(filialSolic), null, null);
	if (datasetMatMed.rowsCount > 0){
		aprovadores.existeAlcada     = true;		
		aprovadores.usuarioFarmacia  = datasetMatMed.getValue(0, "usuarioFarmacia");
		aprovadores.usuarioClinica.push(datasetMatMed.getValue(0, "usuarioClinica"), datasetMatMed.getValue(0, "valorClinica"), datasetMatMed.getValue(0, "clinicaSomenteConhecimento") == "true" ? true : false);
		aprovadores.usuarioCompras.push(datasetMatMed.getValue(0, "usuarioCompras"), datasetMatMed.getValue(0, "valorCompras"), datasetMatMed.getValue(0, "comprasSomenteConhecimento") == "true" ? true : false);
		aprovadores.usuarioDiretor.push(datasetMatMed.getValue(0, "usuarioDiretores"), datasetMatMed.getValue(0, "valorDiretores"),datasetMatMed.getValue(0, "diretoresSomenteConhecimento") == "true" ? true : false);
	}
	
	return aprovadores;
}

/**
 * Busca todos os aprovadores das alçadas de aprovaçao de diversos
 * @param filialSolic - Filial
 * @returns retornar um objeto com os aprovadores, valores de aprovação e flag de somente conhecimento
 */
function buscaAprovadoresDiversos(filialSolic, codCentroCusto){
	var aprovadores = {
		tipo: 'diversos',
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
	var datasetDiversos = DatasetFactory.getDataset("ds_alcadas_diversos_2", new Array(filialSolic), null, null);

	if (datasetDiversos.rowsCount > 0){
		try{
			aprovadores.existeAlcada = true;
			aprovadores.UtilizaCentroCusto = datasetDiversos.getValue(0, "UtilizaCentroCusto");
			aprovadores.usuarioOperacoes.push(datasetDiversos.getValue(0, "usuarioOperacoes"),datasetDiversos.getValue(0, "valorOperacoes"),datasetDiversos.getValue(0, "operacoesSomenteConhecimento") == "true" ? true : false);
			aprovadores.usuarioFinanceiro.push(datasetDiversos.getValue(0, "usuarioFinanceiro"),datasetDiversos.getValue(0, "valorFinanceiro"),datasetDiversos.getValue(0, "financeiroSomenteConhecimento") == "true" ? true : false);
			aprovadores.usuarioGeral.push(datasetDiversos.getValue(0, "usuarioGeral"), datasetDiversos.getValue(0, "geralSomenteConhecimento"));
			if (aprovadores.UtilizaCentroCusto =="sim"){
			    //consulta o centro de custo       
				var constraintCentro = new Array(codCentroCusto);		
				var datasetCentro = DatasetFactory.getDataset("ds_alcadas_cc_2", constraintCentro, null, null);
				if(datasetCentro != undefined){
					if (datasetCentro.rowsCount > 0){
						//Verifica se existe um usuario cadastrado para cada centro de custo
						if(datasetCentro.getValue(0, "usuarioGerenteCentro") != "" && datasetCentro.getValue(0, "usuarioGerenteCentro") != undefined && datasetCentro.getValue(0, "usuarioGerenteCentro") != null){
							aprovadores.usuarioGerente.push(datasetCentro.getValue(0, "usuarioGerenteCentro"), datasetDiversos.getValue(0, "valorGerenteCentro"),datasetCentro.getValue(0,"gerCentroSomenteConhecimento") == "true" ? true : false,'centroCusto');
						} else {
							aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false,'filial');
						}
						
						if(datasetCentro.getValue(0, "usuarioGerenteCentro2") != "" && datasetCentro.getValue(0, "usuarioGerenteCentro2") != undefined && datasetCentro.getValue(0, "usuarioGerenteCentro2") != null){
							aprovadores.usuarioGerente2.push(datasetCentro.getValue(0, "usuarioGerenteCentro2"), datasetDiversos.getValue(0, "valorGerenteCentro2"), datasetCentro.getValue(0, "gerCentroSomenteConhecimento2") == "true" ? true : false,'centroCusto');
						} else {
							aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false,'filial');
						}
						
						if(datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != "" && datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != undefined && datasetCentro.getValue(0, "usuarioDirOperacoesCentro") != null){
							aprovadores.usuarioGerente3.push(datasetCentro.getValue(0, "usuarioDirOperacoesCentro"), datasetDiversos.getValue(0, "valorGerente3"), datasetCentro.getValue(0, "dirOpSomenteConhecimento") == "true" ? true : false,'centroCusto');
						} else {
							aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false,'filial');
						}
					} else {
						aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false,'filial');
						aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false,'filial');
						aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false,'filial');
					}
				}
			} else {
				aprovadores.usuarioGerente.push(datasetDiversos.getValue(0, "usuarioGerente"), datasetDiversos.getValue(0, "valorGerente"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento")  == "true" ? true : false,'filial');
				aprovadores.usuarioGerente2.push(datasetDiversos.getValue(0, "usuarioGerente2"),datasetDiversos.getValue(0, "valorGerente2"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento2") == "true" ? true : false,'filial');
				aprovadores.usuarioGerente3.push(datasetDiversos.getValue(0, "usuarioGerente3"), datasetDiversos.getValue(0, "valorGerente3"), datasetDiversos.getValue(0, "gerenteSomenteConhecimento3") == "true" ? true : false,'filial');
			}
		}catch(e){
			log.info("ERRO Class: Busca Aprovadores Alçadas: "+ e)
		}
	}
	
	return aprovadores;
}