/*
 * Arquivo responsável por funções de manipulação de form do events. 
 */

/**
 * Bloqueia o campo para não ser editável no formulário
 */
function bloquearCampo(form, nomeCampo) {
	form.setEnabled(nomeCampo, false);
}

/**
 * Retorna o valor de um campo quando usado o FormValidade
 * 
 * Paramns: * Form, * Nome do Campo
 */
function buscarValorCampo(form, nomeCampo) {
	return form.getValue(nomeCampo);
}

/**
 * Gravar o valor no campo passado
 * 
 * @param form
 *            Parametro do método existente no displayFields
 * @param nomeCampo
 *            Name do Campo que deseja salvar o valor
 * @param valorCampo
 *            Valor que será gravado no campo informado
 */
function gravarValorCampo(form, nomeCampo, valorCampo) {
	form.setValue(nomeCampo, valorCampo);
}

/**
 * Busca e grava o Nome do Usuário Logado no Campo informado
 * 
 * @param form
 *            Parametro do método existente no displayFields
 * @param nomeCampo
 *            Name do Campo que deseja salvar o valor
 */
function setNomeUsuarioLogado(form, nomeCampo) {
	gravarValorCampo(form, nomeCampo, buscarNomeUsuarioLogado());
}

/**
 * Busca e grava a Data atual no Campo informado
 * 
 * @param form
 *            Parametro do método existente no displayFields
 * @param nomeCampo
 *            Name do Campo que deseja salvar o valor
 */
function setDataAtual(form, nomeCampo) {
	gravarValorCampo(form, nomeCampo, buscarDataAtual());
}
