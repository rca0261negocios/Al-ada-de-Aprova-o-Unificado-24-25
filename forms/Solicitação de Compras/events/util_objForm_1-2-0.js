var objFormulario =
/**
 * Classe responsável por controlar o Formulário e Validações
 * 
 * @author sergio.santos
 */
function(form) {
	var formulario = '';
	var atividadeAtual = '';
	var atividadeInicial = 0;
	var atividadeVazia = '';
	var atividadeProxima = '';
	var tarefa_completada = '';
	var fields = [];
	var indiceField = [];
	var validacaoErro = false;
	var validacaoMsg = '<br>' + i18n.translate("objForm.exibicaoDeErros")
			+ ' <br>';
	var setFormulario = function(paramForm) {
		formulario = paramForm;
	};
	/**
	 * Retorna a Atividade Atual
	 * 
	 * @return atividadeAtual Retorna o Id da Atividade Atual
	 * @author sergio.santos
	 */
	this.getAtividadeAtual = function() {
		return atividadeAtual;
	};
	/**
	 * Verificar se Atividade informada é a Atividade Inicial
	 * 
	 * @returns Se Atividade é Inicial
	 */
	this.isAtividadeInicial = function(atividadeId) {
		if (atividadeAtual == atividadeInicial
				|| atividadeAtual == atividadeVazia
				|| atividadeAtual == atividadeId) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * Verificar se Atividade informada é a Atividade Atual
	 * 
	 * @returns Se Atividade é Atual
	 */
	this.isAtividadeAtual = function(atividadeId) {
		if (atividadeAtual == atividadeId) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * Verificar se formulário irá mudar de Atividade.
	 * 
	 * @returns Se formulário irá mudar de Atividade
	 */
	this.isMudancaAtividade = function() {
		if (atividadeAtual != atividadeProxima) {
			return true;
		} else if (!tarefa_completada) {
			return true;
		} else {
			return false;
		}
	};
	/**
	 * Adicionar Campo no objForm
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param stringLabelCampo
	 *            Informar o label do campo
	 */
	this.setFields = function(stringNomeCampo, stringLabelCampo) {
		if (getFields(stringNomeCampo) !== false) {
			debugValidateForm("<br>- Erro ao utilizar o objForm.setFields, declaração repetida para o campo: '"
					+ stringNomeCampo + "'!");
		}

		fields
				.push(new objField(formulario, stringNomeCampo,
						stringLabelCampo));

		setIndiceField(stringNomeCampo);
	};
	var getFields = function(stringNomeCampo) {
		for ( var i = 0; i < fields.length; i++) {
			if (fields[i].getNomeCampo() == stringNomeCampo) {
				return i;
			}
		}

		return false;
	};
	var setIndiceField = function(stringNomeCampo) {
		var indice = getFields(stringNomeCampo);

		if (indice !== false) {
			indiceField[stringNomeCampo] = indice;
		} else {
			debugValidateForm("<br>- Erro ao utilizar o objForm.setIndiceFields para o campo: '"
					+ stringNomeCampo + "'!");
		}
	};
	var getIndiceField = function(stringNomeCampo) {
		if (indiceField[stringNomeCampo] != undefined) {
			return indiceField[stringNomeCampo];
		} else {
			debugValidateForm("<br>- Erro ao utilizar método sem executar obj.setFields para o campo: '"
					+ stringNomeCampo + "'!");
		}
	};
	/**
	 * Verificar se campo digitado é Vazio
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Se campo digitado é Vazio
	 */
	this.isCampoVazio = function(stringNomeCampo, validacao) {
		validacao = (validacao !== true) ? false : true;

		var indice = getIndiceField(stringNomeCampo);
		var isVazio = fields[indice].isVazio(validacao);

		if (isVazio && validacao) {
			agruparMensagem(fields[indice].getValidacaoFieldMsg());
		}

		return isVazio;
	};
	/**
	 * Verificar se campo digitado é diferente de informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação de Diferença
	 */
	this.isCampoDiferente = function(stringNomeCampo, listaValoresComparar,
			validacao) {
		validacao = (validacao !== true) ? false : true;

		var indice = getIndiceField(stringNomeCampo);
		var isCampoDiferente = fields[indice].isDiferenteField(
				listaValoresComparar, validacao);
		if (!isCampoDiferente && validacao) {
			agruparMensagem(fields[indice].getValidacaoFieldMsg());
		}

		return isCampoDiferente;
	};
	/**
	 * Verificar se campo digitado é Igual ao informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação da igualdade
	 */
	this.isCampoIgual = function(stringNomeCampo, listaValoresComparar,
			validacao) {
		validacao = (validacao !== true) ? false : true;

		var indice = getIndiceField(stringNomeCampo);
		var isCampoIgual = fields[indice].isIgualField(listaValoresComparar,
				validacao);

		if (!isCampoIgual && validacao) {
			agruparMensagem(fields[indice].getValidacaoFieldMsg());
		}

		return isCampoIgual;
	};
	var redirectIsCampoMaiorOuMenor = function(stringNomeCampo, condicao,
			labelCondicao, listaCamposComparar, validacao) {
		validacao = (validacao !== true) ? false : true;

		var indice = getIndiceField(stringNomeCampo);
		var isCampoMaiorOuMenor = fields[indice].isCampoMaiorOuMenor(condicao,
				labelCondicao, listaCamposComparar, validacao);

		if (!isCampoMaiorOuMenor && validacao) {
			agruparMensagem(fields[indice].getValidacaoFieldMsg());
		}

		return isCampoMaiorOuMenor;
	};
	/**
	 * Verificar se campo digitado é Maior ao informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação se campo maior
	 */
	this.isCampoMaior = function(stringNomeCampo, listaCamposComparar,
			validacao) {
		var condicao = ' > ';
		var labelCondicao = i18n.translate("objForm.deveSerMaiorDe");

		return redirectIsCampoMaiorOuMenor(stringNomeCampo, condicao,
				labelCondicao, listaCamposComparar, validacao);
	};
	/**
	 * Verificar se campo digitado é Maior ou Igual ao informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação se campo maior ou igual
	 */
	this.isCampoMaiorOuIgual = function(stringNomeCampo, listaCamposComparar,
			validacao) {
		var condicao = ' >= ';
		var labelCondicao = i18n.translate("objField.deveSerMaiorOuIgual");

		return redirectIsCampoMaiorOuMenor(stringNomeCampo, condicao,
				labelCondicao, listaCamposComparar, validacao);
	};
	/**
	 * Verificar se campo digitado é Menor ao informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação se campo menor
	 */
	this.isCampoMenor = function(stringNomeCampo, listaCamposComparar,
			validacao) {
		var condicao = ' < ';
		var labelCondicao = i18n.translate("objForm.deveSerMenorDe");

		return redirectIsCampoMaiorOuMenor(stringNomeCampo, condicao,
				labelCondicao, listaCamposComparar, validacao);
	};
	/**
	 * Verificar se campo digitado é Menor ou Igual ao informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["8"] ou ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação se campo menor ou igual
	 */
	this.isCampoMenorOuIgual = function(stringNomeCampo, listaCamposComparar,
			validacao) {
		var condicao = ' <= ';
		var labelCondicao = i18n.translate("objForm.deveSerMenorOuIgual");

		return redirectIsCampoMaiorOuMenor(stringNomeCampo, condicao,
				labelCondicao, listaCamposComparar, validacao);
	};
	/**
	 * Verificar se campo digitado está no intervalo da lista de valores
	 * informado
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param condicaoIgual
	 *            True para condição inclusive e False para maior ou menor
	 * @param listaValoresComparar
	 *            Informar o array de valores. Ex.: ["5","10"]
	 * @param validacao
	 *            True para ativar a validação dos campos e False para efeito de
	 *            comparação apenas
	 * @returns Verificação se campo está no intervalo
	 */
	this.isCampoEntre = function(stringNomeCampo, condicaoIgual,
			listaValoresComparar, validacao) {

		verificarBoolean(stringNomeCampo, condicaoIgual, "isCampoEntre");

		if (listaValoresComparar.length != 2) {
			debugValidateForm("<br>- Erro ao utilizar o objForm.isCampoEntre, parametro listaValoresComparar para o campo: '"
					+ stringNomeCampo + "'!");
		}

		var condicao = (condicaoIgual) ? '=' : '';
		var indice = getIndiceField(stringNomeCampo);
		var isCampoEntre = fields[indice].isBetweenField(condicao,
				listaValoresComparar, validacao);

		if (!isCampoEntre && validacao) {
			agruparMensagem(fields[indice].getValidacaoFieldMsg());
		}

		return isCampoEntre;
	};
	var verificarBoolean = function(stringNomeCampo, param, nomeMetodo) {
		if (param !== true && param !== false) {
			debugValidateForm("<br>- Erro ao utilizar o objForm." + nomeMetodo
					+ ", parametro boolean para o campo: '" + stringNomeCampo
					+ "'!");
		}
	};
	/**
	 * Salvar o Nome do Usuário logado no campo informado.
	 * 
	 * @param nomeCampo
	 *            Informar o name do campo para ser gravado com o Nome do
	 *            Usuário Logado
	 */
	this.setNomeUsuarioLogado = function(nomeCampo) {
		var nomeUsuarioLogado = buscarNomeUsuarioLogado();

		setValorCampo(form, nomeCampo, nomeUsuarioLogado);
	};
	/**
	 * 
	 * 
	 */
	this.setDataAtual = function(nomeCampo) {
		var dataAtual = buscarDataAtual();

		setValorCampo(form, nomeCampo, dataAtual);
	};
	/**
	 * Executar a verificação das validações efetuadas anteriormente. Necessário
	 * ter passado validacao = True em algum método comparativo anterior a essa
	 * execução
	 */
	this.validar = function() {
		if (validacaoErro) {
			debugValidateForm(validacaoMsg);
		}
	};
	var agruparMensagem = function(novaMensagem) {
		validacaoErro = true;
		validacaoMsg += novaMensagem;
	};
	/**
	 * Adicionar mensagem de erro customizada, sendo exibido a mensagem de erro
	 * e parando a execução ao executar o método validar().
	 * 
	 * @param stringNomeCampo
	 *            Informar o name do campo
	 * @param stringNovaMensagem
	 *            Informar a noma mensagem para ser adicionada ao final das
	 *            mensagens de erro.
	 */
	this.setMensagemErro = function(stringNomeCampo, stringNovaMensagem) {
		var indice = getIndiceField(stringNomeCampo);
		var labelCampo = fields[indice].getLabelCampo();

		validacaoErro = true;
		validacaoMsg += '<br>- ' + labelCampo + ' ' + stringNovaMensagem;
	};
	__construct = function(form) {
		setFormulario(form);
		atividadeAtual = buscarAtividadeAtual();
		atividadeProxima = buscarProximaAtividade();
		tarefa_completada = buscarTarefaCompletada();
	}(form);
};