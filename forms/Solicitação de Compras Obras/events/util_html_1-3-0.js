/*
 * Arquivo responsável por funções de manipulação de Html. 
 */

/*
 * Inclui o Jquery no documento Html
 * 
 * Params: customHTML
 */
function injetarJQuery(customHTML) {
	customHTML.append('<script src="jquery.js"></script>');
}

/*
 * Injeta SELETOR para CLASS (jquery)
 * 
 * Params: customHTML, class
 */
function injetarInicioScript(customHTML, classCampo) {
	injetarInicioDocumentReady(customHTML);
	customHTML.append('$(".');
	customHTML.append(classCampo);
	injetarFimDocumentReady(customHTML);
}

/*
 * Injetar o script do Jquery para ser inicializado após a página ser carregada
 * 
 * Params: customHTML
 */
function injetarInicioDocumentReady(customHTML) {
	customHTML.append('<script>');
	customHTML.append('$(function(){');
}

/*
 * Injetar o script do Jquery para ser finalizado após a página ser carregada
 * 
 * Params: customHTML
 */
function injetarFimDocumentReady(customHTML) {
	customHTML.append('")');
}

/*
 * Injeta Termino de Script de Function (javascript)
 * 
 * Params: customHTML
 */
function injetarTerminoScript(customHTML) {
	customHTML.append('});');
	customHTML.append('</script>');
}

/*
 * Oculta CLASS (jquery)
 * 
 * Params: customHTML, class
 */
function ocultarCampo(customHTML, classCampo) {
	injetarInicioScript(customHTML, classCampo);
	customHTML.append('.hide()');
	injetarTerminoScript(customHTML);
}

/*
 * Desabilitar CLASS (jquery) Método pode ser usado para desabilitar um input
 * type button
 * 
 * Params: customHTML, class
 */
function desabilitarCampo(customHTML, classCampo) {
	injetarInicioScript(customHTML, classCampo);
	customHTML.append('.attr("disabled", "disabled");');
	injetarTerminoScript(customHTML);
}

/*
 * Aplica somente Leitura em INPUT, TEXTAREA
 * 
 * Params: customHTML, class
 */
function travarCampo(customHTML, classCampo) {
	injetarInicioScript(customHTML, classCampo);
	customHTML.append('.attr("readonly", true)');
	injetarTerminoScript(customHTML);
}

/*
 * Inclui script de javascript ou jquery
 * 
 * Params: customHTML, script
 */
function injetarInicioScriptCombo(customHTML, script) {
	customHTML.append('<script>');
	customHTML.append(script);
}

/*
 * Fecha script de javascript ou jquery
 * 
 * Params: customHTML
 */
function injetarTerminoScriptCombo(customHTML) {
	customHTML.append('</script>');
}

/*
 * Inclui script completo de javascript ou jquery
 * 
 * Params: customHTML, script
 */
function inserirFuncaoJavascript(customHTML, script) {
	injetarInicioScriptCombo(customHTML, script);
	injetarTerminoScriptCombo(customHTML);
}

/*
 * Inclui mascara monetária
 * 
 * Params: customHTML, class
 */
function inserirMascaraMonetaria(customHTML, classCampo, simbolo,
		separadorDecimal, separadorMilhar) {
	injetarInicioScript(customHTML, classCampo);

	var paramsArray = [];
	var paramsString = '';

	var showSymbol = verificarAspas(simbolo);
	var decimal = verificarAspas(separadorDecimal);
	var thousands = verificarAspas(separadorMilhar);

	if (showSymbol != '') {
		paramsArray.push('showSymbol:' + showSymbol);
	}

	if (decimal != '') {
		paramsArray.push('decimal:' + decimal);
	}
	if (thousands != '') {
		paramsArray.push('thousands:' + thousands);
	}

	if (paramsArray.length > 0) {
		paramsString = '{' + paramsArray.join() + '}';
	}

	customHTML.append('.maskMoney(' + paramsString + ');');
	injetarTerminoScript(customHTML);
}

/*
 * Verifica e inclui aspas caso necessário
 * 
 * Params: campo
 */
function verificarAspas(campo) {
	return (campo === true || campo === false) ? campo : '"' + campo + '"';
}

/**
 * Método para retirar Espaços e conversão para Maiusculo
 * 
 * @param form
 *            Variável passada como parametro no ValidateForm
 * @author sergio.santos
 */
function converterValorDeCampos(form, customHTML) {
	var script = '$("input, textarea").blur(function(){';
	script += 'var zoom = $(this).hasClass("btZoom"); var readonly = ($(this).attr("readonly") == "readonly"); var tipoProibido = ($(this).attr("type") == "radio" || $(this).attr("type") == "checkbox"); ';
	script += 'if(zoom || readonly || tipoProibido){ return;}';
	script += 'var valor = $(this).val();';
	script += 'var novoValor = valor.toUpperCase().trim();';
	script += 'if(valor != novoValor){ $(this).val(novoValor);}';
	script += '});';

	injetarInicioDocumentReady(customHTML);
	customHTML.append(script);
	injetarTerminoScript(customHTML);
}

/*
 * Método de Debug e exibir mensagem ou obj no console do browser e gravar no
 * log do Fluig no displayFields
 */
function debug(customHTML, obj) {
	injetarInicioDocumentReady(customHTML);
	customHTML.append('console.log("' + obj + '");');
	log.info(obj);
	injetarTerminoScript(customHTML);
}

/*
 * Método de Debug para exibir alert no displayFields
 */
function debugAlert(customHTML, string) {
	injetarInicioDocumentReady(customHTML);
	customHTML.append('console.log("' + string + '");');
	log.info(string);
	customHTML.append('alert("' + string + '");');
	injetarTerminoScript(customHTML);
}

/*
 * Método para encerrar fluxo e exibir mensagem de erro na tela.
 */
function debugValidateForm(string) {
	log.info(string);
	throw string;
}