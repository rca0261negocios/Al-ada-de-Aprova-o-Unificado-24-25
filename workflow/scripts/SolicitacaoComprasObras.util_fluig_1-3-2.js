/*
 * Arquivo respons�vel por fun��es de manipula��o comum entre Events e Scripts do Workflow. 
 */

/**
 * M�todo para retornar os parametros defaults do Fluig
 * 
 * @param servico
 *            Nome do servi�o do Fluig
 * 
 * @returns Valor do servi�o
 */
function getParametro(servico) {
	return getValue(servico);
}

/**
 * M�todo para gravar o valor no name informado
 * 
 * @param form
 *            Informar o form do displayFields e validateForm
 * @param nomeCampo
 *            Informar o name do Campo
 * @param valorCampo
 *            Infromar o valor do Campo
 */
function setValorCampo(form, nomeCampo, valorCampo) {
	form.setValue(nomeCampo, valorCampo);
}

/**
 * Método para retornar valor de campo do formulario
 * 
 * @param form
 * 			Informar o form do displayFields e validateForm
 * @param nomeCampo
 * 			Informar o name do Campo
 * @returns
 * 		Valor do campo solicitado
 */
function getValorCampo(form, nomeCampo) {
	return form.getValue(nomeCampo);
}

/**
 * Método para retornar o valor de um campo de formulário em scripts de workflow
 * 
 * @param nomeCampo
 * 				Nome do campo que se deseja recuperar o valor
 * 
 * @returns Valor do campo solicitado
 */
function getWFParametro(nomeCampo){
	return hAPI.getCardValue(nomeCampo);
}

/**
 * Método para setar o valor de um campo de formulário em scripts de workflow
 * 
 * @param nomeCampo
 * 				Nome do campo que se deseja setar o valor
 * @param valorCampo
 * 				Valor do campo
 * 
 * @returns Campo do formulário com o valor setado
 */
function setWFParametro(nomeCampo, valorCampo){
	return hAPI.setCardValue(nomeCampo, valorCampo);
}

/**
 * Retorna o Id do Usu�rio Logado
 * 
 * @returns Id do Usu�rio logado
 */
function buscarUsuarioLogado() {
	return getParametro("WKUser");
}

/**
 * Retorna Nome do Usu�rio
 * 
 * @param user
 *            Id do Usu�rio Logado
 * 
 * @returns Nome do Usu�rio
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
 * Retorna Nome do Usu�rio Logado
 * 
 * @returns Nome do Usu�rio Logado
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
 * Rotina que retorna: O Id da Pr�xima Atividade (destino)
 * 
 * @returns Id da Pr�xima Atividade
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
 * Retorna o Id da Solicita��o
 * 
 * @returns Id da Solicita��o
 */
function buscarIdSolicitacao() {
	return getParametro("WKNumProces");
}

/**
 * Retorna o Id do Formul�rio do Processo
 * 
 * @returns Id do Formul�rio do Processo
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
 * Buscar Vers�o do Processo
 * 
 * @returns Vers�o do Processo
 */
function buscarVersaoProcesso() {
	return getParametro("WKVersDef");
}

/**
 * Retorna o C�digo da defini��o de formul�rio do processo
 * 
 * @returns C�digo da defini��o de formul�rio do processo
 */
function buscarCodDefFormulario() {
	return getParametro("WKFormId");
}

/**
 * Retorna Identificador da Empresa selecionada para Experi�ncias de uso TOTVS
 * 
 * @returns Id da Empresa selecionada para Experi�ncias de uso TOTVS
 */
function buscarIdEmpresaTotvs() {
	return getParametro("WKIdentityCompany");
}

/**
 * Retorna N�mero da atividade atual (verificar se buscarAtividadeAtual() te
 * atende)
 * 
 * @returns N�mero da atividade atual
 */
function buscarNumAtividadeAtual() {
	return getParametro("WKCurrentState");
}

/**
 * Retorna C�digo do modo do form
 * 
 * @returns C�digo do modo do form
 */
function buscarModoFormulario(form) {
	return form.getFormMode();
}

/**
 * Retorna dia, m�s e ano atual (verificar se buscarAtividadeAtual() te atende)
 * 
 * @returns N�mero da Data Atual
 */

function buscarData() {
	return new Date();
}

function buscarDiaAtual() {
	return buscarData().getDate().toString();
}

function buscarMesAtual() {
	return (buscarData().getMonth() + 1).toString();
}

function buscarAnoAtual() {
	return buscarData().getFullYear().toString();
}

function buscarDataAtualSistema() {
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano) {
	if (dia.length == 1)
		dia = 0 + dia;
	if (mes.length == 1)
		mes = 0 + mes;
	return dia + "/" + mes + "/" + ano;
}

function retiraEspacoTag() {
	var retirarEspaco = hAPI.getCardValue("solicitante");
	return retirarEspaco.replace(" ", "_");
}