/*
 * Arquivo responsável por funções de manipulação comum entre Events e Scripts do Workflow. 
 */


/**
 * Método para retornar os parametros defaults do Fluig
 * 
 * @param servico Nome do serviço do Fluig
 * 
 * @returns Valor do serviço
 * */
function getParametro(servico){
	return getValue(servico);	
}

/**
 * Método para gravar o valor no name informado
 *
 * @param form Informar o form do displayFields e validateForm
 * @param nomeCampo Informar o name do Campo
 * @param valorCampo Infromar o valor do Campo 
 */
function setValorCampo(form, nomeCampo, valorCampo){
	form.setValue(nomeCampo, valorCampo);
}

/**
 * Retorna o Id do Usuário Logado
 * 
 * @returns Id do Usuário logado
 */
function buscarUsuarioLogado() {
	return getParametro("WKUser");
}

/**
 * Retorna Nome do Usuário
 * 
 * @param user Id do Usuário Logado
 * 
 * @returns Nome do Usuário
 */
function buscarNomeUsuario(user) {
	var userName = "";
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,
			user, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	if (dataset.rowsCount == 1) {
		userName = dataset.getValue(0, "colleagueName");
	}
	return userName;
}

/**
 * Retorna Nome do Usuário Logado
 * 
 * @returns Nome do Usuário Logado
 */
function buscarNomeUsuarioLogado() {
	return buscarNomeUsuario(buscarUsuarioLogado());
}

/**
 * Retorna Id da Atividade Atual
 * 
 * @returns Id da Atividade Atual
 */
function buscarAtividadeAtual() {
	return getParametro("WKNumState");
}

/**
 * Retorna: "True" para Transferir "False" para Salvar
 * 
 * @returns Tarefa completada
 */
function buscarTarefaCompletada() {
	return getParametro("WKCompletTask");
}

/**
 * Rotina que retorna: O Id da Próxima Atividade (destino)
 * 
 * @returns Id da Próxima Atividade
 */
function buscarProximaAtividade() {
	return getParametro("WKNextState");
}

/**
 * Retorna o Id da Empresa
 * 
 * @returns Id da Empresa
 */
function buscarEmpresa() {
	return getParametro("WKCompany");
}

/**
 * Retorna o Id da Solicitação
 * 
 * @returns Id da Solicitação
 */
function buscarIdSolicitacao() {
	return getParametro("WKNumProces");
}

/**
 * Retorna o Id do Formulário do Processo
 * 
 * @returns Id do Formulário do Processo
 */
function buscarForm() {
	return getParametro("WKCardId");
}

/**
 * Retorna o Id do Processo
 * 
 * @returns Id do Processo
 */
function buscarIdProcesso() {
	return getParametro("WKDef");
}

/**
 * Buscar Versão do Processo
 * 
 * @returns Versão do Processo
 */
function buscarVersaoProcesso() {
	return getParametro("WKVersDef");
}

/**
 * Retorna o Código da definição de formulário do processo
 * 
 * @returns Código da definição de formulário do processo
 */
function buscarCodDefFormulario() {
	return getParametro("WKFormId");
}

/**
 * Retorna Identificador da Empresa selecionada para Experiências de uso TOTVS
 * 
 * @returns Id da Empresa selecionada para Experiências de uso TOTVS
 */
function buscarIdEmpresaTotvs() {
	return getParametro("WKIdentityCompany");
}

/**
 * Retorna Número da atividade atual (verificar se buscarAtividadeAtual() te
 * atende)
 * 
 * @returns Número da atividade atual
 */
function buscarNumAtividadeAtual() {
	return getParametro("WKCurrentState");
}