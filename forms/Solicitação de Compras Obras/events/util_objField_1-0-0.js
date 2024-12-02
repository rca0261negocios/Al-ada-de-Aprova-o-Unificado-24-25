var objField =
/**
 * (Classe de utilização interna do objForm)
 * Classe responsável por controlar ações nos campos
 *  
 * @param paramForm
 *            Inserir parametro form do ValidadeForm.js
 * @param paramNomeCampo
 * @param paramLabelCampo
 * @author sergio.santos
 */
function(paramForm, paramNomeCampo, paramLabelCampo) {
	var formObjField = '';
	var nomeCampo = '';
	var labelCampo = '';
	var valorCampo = '';
	var valorCampoConverter = '';
	var listaValoresConverter = '';
	var validacaoFieldMsg = '';
	this.getNomeCampo =
	/**
	 * Retornar nomeCampo
	 * 
	 * @returns {nomeCampo}
	 */
	function() {
		return nomeCampo;
	};
	this.getLabelCampo = function() {
		return labelCampo;
	};
	var setValorCampo = function() {
		valorCampo = buscarValorCampo(formObjField, nomeCampo);
	};
	this.getValidacaoFieldMsg = function() {
		return validacaoFieldMsg;
	};
	this.isVazio = function(validacao) {
		if (isCampoVazio()) {
			if (validacao) {
				validacaoFieldMsg = "<br>- " + labelCampo
						+ " não pode ser vazio.";
			}

			return true;
		} else {
			return false;
		}
	};
	var isCampoVazio = function() {
		return (valorCampo === null || valorCampo == '' || valorCampo == '00');
	};
	var isComparaField = function(condicao, listaValoresComparar, separador,
			aspas) {
		separador = (separador == undefined) ? ' && ' : separador;
		aspas = (aspas == undefined) ? '"' : aspas;

		var stringCondicoes = '';

		// Variáveis para controle de quando usar campo convertido (datas)
		var listaValores = (listaValoresConverter[0] != undefined) ? listaValoresConverter
				: listaValoresComparar;
		var valor = (listaValoresConverter[0] != undefined) ? valorCampoConverter
				: valorCampo;

		for ( var i = 0; i < listaValores.length; i++) {
			stringCondicoes += (stringCondicoes != '') ? separador : " ";
			stringCondicoes += aspas + valor + aspas + condicao + aspas
					+ listaValores[i] + aspas;
		}

		return eval(stringCondicoes);
	};
	this.isDiferenteField = function(listaValoresComparar, validacao) {
		var condicao = ' !== ';
		var separador = ' && ';

		if (isComparaField(condicao, listaValoresComparar, separador)) {
			return true;
		} else {
			if (validacao) {
				validacaoFieldMsg = "<br>- " + labelCampo
						+ " não é diferente de "
						+ arrayToString(listaValoresComparar, ' ou ') + ".";
			}

			return false;
		}
	};
	this.isIgualField = function(listaValoresComparar, validacao) {
		var condicao = ' === ';
		var separador = ' || ';

		if (isComparaField(condicao, listaValoresComparar, separador)) {
			return true;
		} else {
			if (validacao) {
				validacaoFieldMsg = "<br>- " + labelCampo + " não é igual a "
						+ arrayToString(listaValoresComparar, ' ou ') + ".";
			}

			return false;
		}
	};
	this.isCampoMaiorOuMenor = function(condicao, labelCondicao,
			listaValoresComparar, validacao) {
		var separador = ' && ';
		var aspas = '';

		/*
		 * Valida se campos passados como validação são data ou numérico
		 */
		if (!verificarCampos(listaValoresComparar)) {
			return false;
		}

		if (isComparaField(condicao, listaValoresComparar, separador, aspas)) {
			return true;
		} else {
			if (validacao) {
				validacaoFieldMsg = "<br>- " + labelCampo + " " + labelCondicao
						+ ' ' + arrayToString(listaValoresComparar, ' ou ')
						+ ".";
			}

			return false;
		}

	};
	this.isBetweenField = function(condicaoIgual, listaValoresComparar,
			validacao) {
		var stringCondicoes = '';

		/*
		 * Valida se campos passados como validação são data ou numérico
		 */
		if (!verificarCampos(listaValoresComparar)) {
			return false;
		}

		// Variáveis para controle de quando usar campo convertido (datas)
		var listaValores = (listaValoresConverter[0] != undefined) ? listaValoresConverter
				: listaValoresComparar;
		var valor = (listaValoresConverter[0] != undefined) ? valorCampoConverter
				: valorCampo;

		// Validação se preenchimento das datas estão na ordem correta
		if (listaValores[0] > listaValores[1]) {
			validacaoFieldMsg = "<br>- Erro ao utilizar o objForm.isCampoEntre, parametro listaValoresComparar invertido ou igual para o campo: '"
					+ nomeCampo + "'!";

			return false;
		}

		stringCondicoes = valor + ' >' + condicaoIgual + ' ' + listaValores[0];
		stringCondicoes += ' && ';
		stringCondicoes += valor + ' <' + condicaoIgual + ' ' + listaValores[1];

		if (eval(stringCondicoes)) {
			return true;
		} else {
			if (validacao) {
				if (condicaoIgual) {
					validacaoFieldMsg = "<br>- " + labelCampo + " "
							+ ' deve ser maior ou igual a '
							+ listaValoresComparar[0] + ' e menor ou igual a '
							+ listaValoresComparar[1] + ".";
				} else {
					validacaoFieldMsg = "<br>- " + labelCampo + " "
							+ ' deve ser maior que ' + listaValoresComparar[0]
							+ ' e menor que ' + listaValoresComparar[1] + ".";
				}
			}

			return false;
		}
	};
	var verificarCampos = function(listaValoresComparar) {
		// Rotina para Data
		if (isCampoData(listaValoresComparar)) {
			var isDataValorCampo = isCampoData(valorCampo);

			if (!isDataValorCampo) {
				/*
				 * Mensagem de erro no formato de data
				 */
				validacaoFieldMsg = "<br>- " + labelCampo + " inválida.";

				return false;
			}
			// Rotina para converter string em TimeStamp
			else {
				converterDatas(listaValoresComparar);

				return true;
			}
		}
		// Rotina para não Data
		else {
			validarNumerioVazio();

			return true;
		}
	};
	var validarNumerioVazio = function() {
		if (valorCampo == '') {
			valorCampo = 0;
		}
	};
	var isCampoData = function(campoData) {
		var isCampoData = true;

		if (campoData instanceof Array) {
			for ( var item in campoData) {
				if (!verificarFormatoData(campoData[item])) {
					isCampoData = false;
				}
			}
		} else if (!verificarFormatoData(campoData)) {
			isCampoData = false;
		}

		return isCampoData;
	};
	var verificarFormatoData = function(strData) {
		var regex = new RegExp(
				"((0[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})/(0[1-9]{1}|1[0-2]{1})/[1-2]{1}[0-9]{3})");

		return regex.test(strData);
	};
	var converterDatas = function(listaValoresComparar) {
		listaValoresConverter = [];
		// Pode ser que de erro

		valorCampoConverter = converterDataToTimeStamp(valorCampo, true);

		listaValoresConverter[0] = converterDataToTimeStamp(
				listaValoresComparar[0], true);

		if (listaValoresComparar[1] != undefined) {
			listaValoresConverter[1] = converterDataToTimeStamp(
					listaValoresComparar[1], false);
		}
	};
	var converterDataToTimeStamp = function(dataStr, timeInicio) {
		var dataTime = '';

		if (timeInicio == undefined || timeInicio == true) {
			dataTime = '00:00:00';
		} else if (timeInicio == false) {
			dataTime = '23:59:59';
		}

		var myDate = dataStr.split("/");
		var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2] + " "
				+ dataTime;

		return new Date(newDate).getTime();
	};
	var arrayToString = function(listaValoresComparar, separador) {
		if ((separador == undefined || separador.trim() == ',')) {
			return listaValoresComparar.join();
		} else {
			var lista = '';
			var qtd = listaValoresComparar.length;

			for ( var i = 0; i < qtd; i++) {
				if (i != 0) {
					if (i == (qtd - 1)) {
						lista += separador;
					} else {
						lista += ', ';
					}
				}

				lista += "'" + listaValoresComparar[i] + "'";
			}

			return lista;
		}
	};
	/**
	 * Método construtor da classe 
	 */
	var construtor = function(paramForm, paramNomeCampo, paramLabelCampo) {
		if (paramNomeCampo == '' || paramLabelCampo == '') {
			debugValidateForm("<br/>- Erro ao utilizar o objField para o campo: '"
					+ paramNomeCampo + "'!");
		}

		formObjField = paramForm;
		nomeCampo = paramNomeCampo;
		labelCampo = paramLabelCampo;

		setValorCampo();
	}(paramForm, paramNomeCampo, paramLabelCampo);
};