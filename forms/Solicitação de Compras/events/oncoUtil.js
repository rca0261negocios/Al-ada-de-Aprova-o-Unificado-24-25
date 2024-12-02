//Funcoes de Usuarios ------------------------------------------------->
function buscarUsuarioLogado(){
	return getValue("WKUser");
}


function buscarNomeUsuarioLogado(){
   return buscarNomeUsuario(buscarUsuarioLogado());
}


function buscarMailUsuarioLogado() {
	return buscarMailUsuario(buscarUsuarioLogado());
}


function buscarNomeUsuario(user){
	var userName = "";
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId",user,user,ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague",null,[c1],null);
	if(dataset.rowsCount == 1){
		userName = dataset.getValue(0,"colleagueName");
	}
	return userName;
}

function buscarMailUsuario(mail) {
	var userMail = "";
	var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", mail, mail, ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("colleague", null, [c2], null);
	if (dataset.rowsCount == 1) {
		userMail = dataset.getValue(0, "mail");
	}
	return userMail;
}

//Funcoes de Variaveis TOTVS ------------------------------------------->
function buscarAtividadeAtual(){
	return getValue("WKNumState");
}

/*
 * Rotina que retorna:
 * True para Transferir
 * False para Salvar
 * */
function buscarTarefaCompletada(){ 
	return getValue("WKCompletTask");
}

/*
 * Rotina que retorna:
 * O nÃºmero da PrÃ³xima Atividade
 * */
function buscarProximaAtividade(){
	return getValue("WKNextState");
}

//Funcoes de Data ------------------------------------------------------>
function buscarData(){
	return new Date();
}

function buscarDiaAtual(){
	return buscarData().getDate().toString();
}

function buscarMesAtual(){
	return (buscarData().getMonth()+1).toString();
}

function buscarAnoAtual(){
	return buscarData().getFullYear().toString();
}

function buscarDataAtual(){
	return formatarData(buscarDiaAtual(), buscarMesAtual(), buscarAnoAtual());
}

function formatarData(dia, mes, ano){
	if(dia.length == 1)
		dia = 0+dia;	
	if(mes.length == 1)
		mes = 0+mes;	
	return dia+"/"+mes+"/"+ano;
}

function calendario (){
	 $(function() {
	        $("#calendario").datepicker({
	          dateFormat: 'dd/mm/yy',
	          dayNames: ['Domingo','Segunda','TerÃ§a','Quarta','Quinta','Sexta','SÃ¡bado','Domingo'],
	          dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
	          dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','SÃ¡b','Dom'],
	          monthNames: ['Janeiro','Fevereiro','MarÃ§o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	          monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
	          });
	          });
}
//Funcoes de HTML ----------------------------------------------------->
function injetarJQuery(customHTML){
	customHTML.append('<script src="jquery.js"></script>');
}

function injetarInicioScript(customHTML, nomeCampo){
	customHTML.append('<script>');
	customHTML.append('$(function(){');
	customHTML.append('$(".');
	customHTML.append(nomeCampo);
	customHTML.append('")');
}

function injetarTerminoScript(customHTML){
	customHTML.append('});');
	customHTML.append('</script>');
}


function ocultarCampo(customHTML, nomeCampo){
	injetarInicioScript(customHTML, nomeCampo);
	customHTML.append('.hide()');
	injetarTerminoScript(customHTML);
}

//Torna o campo somente leitura.  
function travarCampo(customHTML, nomeCampo){
	injetarInicioScript(customHTML, nomeCampo);
	customHTML.append('.attr("readonly", true)');
	injetarTerminoScript(customHTML);
}

//TODO Mudar DesebilitaCampoSelect para desebilitarCampo. Sempre com 1a letra minuscula, no infinitivo e generico 
// (nao amarra a Select, porque pode ser usado para qualquer componente)
function DesabilitaCampo (customHTML, nomeCampo){
	injetarInicioScript(customHTML, nomeCampo);
	customHTML.append('.attr("disabled", true)');
	injetarTerminoScript(customHTML);
}

function injetaInicioScriptCombo(customHTML, nomeCampo){
	customHTML.append('<script>');
	customHTML.append(nomeCampo);
}

function injetaTerminoScriptCombo(customHTML){
	customHTML.append('</script>');	
}

function insereFuncaoJavascript (customHTML, nomeCampo){
	injetaInicioScriptCombo(customHTML, nomeCampo);
	injetaTerminoScriptCombo(customHTML);
}

//Funcao ValidadeForm ----------------------------------------------------->
/*
 * MÃ©todo para identificar quando hÃ¡ mudanÃ§a na atividade
 */
function isMudancaAtividade(atividadeAtual, atividadeProxima, tarefa_completada){
	if (atividadeAtual != atividadeProxima) {
		return true;
	} else if (!tarefa_completada) {
		return true;
	} else{
		return false;
	}	
}

function isCampoVazio(form, nomeCampo){
	return (form.getValue(nomeCampo) == null || form.getValue(nomeCampo) ==  "" || form.getValue(nomeCampo) ==  "00");
}

function agruparMensagem(mensagemAgrupada, mensagemEspecifica){
	if (mensagemAgrupada.length == 0){
		mensagemAgrupada = "Os seguintes erros devem ser corrigidos: <br/>";
	}
	mensagemAgrupada += "- " + mensagemEspecifica + "<br/>";
	
	return mensagemAgrupada;
}
