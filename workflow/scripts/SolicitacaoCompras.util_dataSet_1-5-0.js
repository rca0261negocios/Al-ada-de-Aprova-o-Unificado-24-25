/**
 * Objeto para efetuar a consulta de DataSet's
 * 
 * @param nomeDataSet
 *            Informar o Nome do DataSet que deseja efetuar a busca
 * @author sergio.santos
 */
 var objDataSet = function(nomeDataSet) {
	var metodoFiltroAnd = '';
	var metodoFiltroOr = '';
	var nameDataSet = '';
	var filtros = [];
	var ordenacao = [];
	var campos = [];
	var dados = '';

	var setMetodoFiltro = function() {
		metodoFiltroAnd = ConstraintType.MUST;
		metodoFiltroOr = ConstraintType.SHOULD;
	};
	var setNameDataSet = function(nomeDataSet) {
		if (nomeDataSet == '') {
			throw 'Nome do dataSet não informado.';
		}

		nameDataSet = nomeDataSet;
	};
	/**
	 * M?todo para cadastrar filtro na busca do DataSet
	 * 
	 * @param nomeColuna
	 *            Informar a string com o Nome da coluna que ser? usado para
	 *            filtro
	 * @param filtroInicio
	 *            Informar o valor que seja filtrar, se omitido o filtroFim ser?
	 *            filtrado com valor ?nico
	 * @param filtroFim
	 *            Informar o valor que seja filtrar como fim de
	 *            intervalo/between, n?o obrigat?rio, caso deseja filtro com
	 *            valor ?nico. Exemplo: carro = 1
	 * @param metodoFiltroAnd
	 *            Informar True ou False, em caso de omiss?o ser? conderado True
	 * @author sergio.santos
	 */
	this.setFiltro = function(nomeColuna, filtroInicio, filtroFim, condicaoAnd) {
		if (nomeColuna == '') {
			throw 'Nome da Coluna não informado.';
		}

		/*
		 * Em caso de n?o ser informado o metodo do Filtro ser? atribuido a
		 * condi??o AND
		 */
		var metodoFiltro = (condicaoAnd || condicaoAnd == null) ? metodoFiltroAnd
				: metodoFiltroOr;

		if (filtroFim == null && filtroInicio != null) {
			filtroFim = filtroInicio;
		}

		filtros.push(DatasetFactory.createConstraint(nomeColuna, filtroInicio,
				filtroFim, metodoFiltro));
	};
	var clearFiltro = function() {
		filtros = [];
	};
	/**
	 * M?todo para cadastrar a ordem desejada
	 * 
	 * @param order
	 *            Informar a ordem desejada
	 * @author sergio.santos
	 */
	this.setOrdenacao = function(order) {
		if (order == '') {
			throw 'Order não informado.';
		}

		ordenacao.push(order);
	};
	/**
	 * M?todo para cadastrar os campos que deseja exibi??o
	 * 
	 * @param nomeCampo
	 *            Informar o Nome do Campo
	 * @author sergio.santos
	 */
	this.setCampo = function(nomeCampo) {
		/*
		 * if (nomeCampo == '') { throw 'Nome do Campo n?o informado.'; }
		 */

		campos.push(nomeCampo);
	};
	/**
	 * M?todo para buscar os dados do DataSet
	 * 
	 * @author sergio.santos
	 */
	this.buscar = function() {
		/*
		 * campos = null; filtros = null;
		 */
		ordenacao = null;

		dados = DatasetFactory.getDataset(nameDataSet, campos, filtros,
				ordenacao);
	};
	/**
	 * M?todo para filtrar os dados do DataSet no "Server Client" conforme
	 * solicitado no setFilter, como o sistema n?o est? filtrando nativamente
	 * este m?todo faz o filtro ap?s o retorno completo do dataSet.
	 * 
	 * @author sergio.santos
	 */
	this.filtrarBusca = function() {
		this.buscar();

		var novoDados = [];
		var nomeCampos = [];
		var valorDataSet = '';
		var nomeCampoFiltrado = '';

		if (filtros.length > 0) {
			for ( var i in filtros) {
				if (filtros[i]._type == 1) {
					nomeCampoFiltrado = filtros[i]._field;

					for ( var posValues in dados.values) {
						valorDataSet = eval("dados.values[posValues]."
								+ nomeCampoFiltrado);

						if (filtros[i]._initialValue == filtros[i]._finalValue
								&& valorDataSet == filtros[i]._initialValue) {
							novoDados.push(dados.values[posValues]);
						} else if (valorDataSet >= filtros[i]._initialValue
								&& valorDataSet <= filtros[i]._finalValue) {
							novoDados.push(dados.values[posValues]);
						}
					}
				}
			}

			dados.values = novoDados;
		}

		return dados;
	};
	/**
	 * Metodo de uso interno para retirar os campos que não foram passados como
	 * parametro
	 */
	this.filtrarCampos = function() {

	};
	/**
	 * M?todo de uso interno para retirar os campos do filtro
	 * 
	 * @author sergio.santos
	 */
	popularDadosFiltrados = function() {

		return;
	};
	/**
	 * M?todo para buscar o valor de um campo
	 * 
	 * @param campoBuscar
	 *            string com nome do campo que ir? informar o valor do filtro
	 * @param valorBuscar
	 *            string com o valor do campo que deseja filtrar
	 * @param campoRetorno
	 *            string com o nome do campo que deseja o retorno
	 * @returns string com valor do campo
	 * @author sergio.santos
	 */
	this.buscarCampo = function(campoBuscar, valorBuscar, campoRetorno) {
		var encontrado = false;
		var valorRetornado = '';
		this.setCampo(campoRetorno);

		this.buscar();

		dadosLoop: for ( var posValues in dados.values) {
			if (dados.getValue(posValues, campoBuscar) == valorBuscar) {
				valorRetornado = dados.getValue(posValues, campoRetorno);
				encontrado = true;
				break dadosLoop;
			}
		}

		if (!encontrado) {
			return false;
		}

		return valorRetornado;
	};
	/**
	 * M?todo para verificar se valor informado existe no dataSet. Este m?todo
	 * limpa todo o filtro de dataSet e inicia novamente em caso de chamar mais
	 * de uma vez o mesmo objeto.
	 * 
	 * @param nomeCampo
	 *            Informar o nome do campo que deseja verificar
	 * @param valorCampoArray
	 *            Informar um array com o valor ou valores de campos que dejesa
	 *            que seja encontrado, qualquer identifica??o ser? retornado
	 *            true
	 * @returns Ser? retornado se o campo informado foi localizado na lista do
	 *          dataSet
	 * @author sergio.santos
	 */
	this.isExists = function(nomeCampo, valorCampoArray) {
		clearFiltro();

		var existe = false;

		for ( var posCampo in valorCampoArray) {
			this.setFiltro(nomeCampo, valorCampoArray[posCampo],
					valorCampoArray[posCampo], false);
		}

		this.buscar();

		dadosLoop: for ( var posValues in dados.values) {
			for ( var posCampo in valorCampoArray) {
				if (dados.getValue(posValues, nomeCampo) == valorCampoArray[posCampo]) {
					existe = true;
					break dadosLoop;
				}
			}
		}

		clearFiltro();

		return existe;
	};
	/**
	 * M?todo para buscar a ?ltima atividade executada. Lembrando que se existir
	 * Exclusivo dever? ser contado na hora de informar o campo numPosicao
	 * 
	 * @param solicitacaoId
	 *            C?digo da Solicita??o
	 * @param numPosicao
	 *            Informar o n?mero de posi??es que devemos localizar, caso
	 *            queira a atual informar 0, ?ltima informar 1, penultima
	 *            informar 2 e etc.
	 * @returns valor Retonar o valor do campo solicitado, em caso de n?o
	 *          identificado ? retornado NULL
	 * @author sergio.santos
	 */
	this.getAtividadeIdAnterior = function(solicitacaoId, numPosicao) {
		if (nomeDataSet == '') {
			return false;
		}

		clearFiltro();

		this.setFiltro('processHistoryPK.processInstanceId', solicitacaoId,
				solicitacaoId, true);

		this.setCampo('stateSequence');

		this.setOrdenacao('processHistoryPK.movementSequence');

		this.buscar();

		var qtd = dados.values.length;
		var posicao;

		clearFiltro();

		posicao = qtd - numPosicao - 1;

		if (posicao < 0) {
			return null;
		}

		return dados.getValue(posicao, 'stateSequence');
	};
	this.getDados = function() {
		return dados;
	}
	var __construct = function(nomeDataSet) {
		setMetodoFiltro();
		setNameDataSet(nomeDataSet);
	}(nomeDataSet);
};