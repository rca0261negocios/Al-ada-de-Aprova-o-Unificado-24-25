/**
 * Objeto com funcionalidade de gerenciar o conteudo do identificador
 * 
 * @param strungCriticidade
 *            Informar a string da Criticidade;
 * @param stringUnidade
 *            Informar a string da Unidade;
 * @param stringDataInicial
 *            Informar a string da DataInicial;
 * @param outrosId
 *            Informar os demais parametros e gravar em um obj do tipo array;
 * 
 */
var objIdentificador = function(strCriticidade, strUnidade, strDataInicial,
		strOutrosParam) {

	var nomeCampo = 'campoIdentificador';
	var strPrefixoDataIniciaL = 'DA ';
	var separador = ' - ';
	var tipoCriticidade = '';
	var nomeUnidade = '';
	var dataInicial = '';
	var listParametros = '';

	/**
	 * Retonar o tipoCriticidade
	 * 
	 * @returns tipoCriticidade Retonar o tipo de Criticidade
	 */
	this.getTipoCriticidade = function() {
		return tipoCriticidade;
	};
	/**
	 * Retornar o nomeUnidade
	 * 
	 * @returns nomeUnidade Retonar a Unidade
	 */
	this.getNomeUnidade = function() {
		return nomeUnidade;
	};
	/**
	 * Retornar a dataInicial
	 * 
	 * @returns dataInicial Retornar a Data Inicial
	 */
	this.getDataInicial = function() {
		return dataInicial;
	};

	var setParametro = function(nomeParametro) {
		if (nomeParametro != "") {
			listParametros += (listParametros != "") ? separador : '';
			listParametros += nomeParametro;
		}
	};

	var setOutrosParam = function(outrosParam) {
		if (typeof outrosParam !== 'undefined' && outrosParam instanceof Array
				&& outrosParam.length > 0) {
			for ( var pos in outrosParam) {
				setParametro(outrosParam[pos]);
			}
		}

		/*
		 * if (outrosParam != null || outrosParam != ""){
		 * setParametro(outrosParam); }
		 */
	};

	var getStrIdentificador = function() {
		return listParametros;
	};

	var setIdentificador = function() {
		hAPI.setCardValue(nomeCampo, listParametros);
	};
	__construct = function(strCriticidade, strUnidade, strDataInicial,
			strOutrosParam) {
		setParametro(strCriticidade);
		setParametro(strUnidade);
		setParametro(strPrefixoDataIniciaL + strDataInicial);

		setOutrosParam(strOutrosParam);

		setIdentificador();

		getStrIdentificador();

	}(strCriticidade, strUnidade, strDataInicial, strOutrosParam);
};