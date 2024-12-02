function util(){}
/*
 * Oculta CLASS (jquery)
 * 
 * Params: customHTML, class
 */
function ocultarCampo(customHTML, seletor) {
	customHTML.append('<script>$("'+seletor+'").hide();</script>');
}
/*
 * Mostra CLASS (jquery)
 * 
 * Params: customHTML, class
 */
function mostrarCampo(customHTML, seletor) {
	customHTML.append('<script>$("'+seletor+'").show();</script>');
}
/*
 * Valida data.
 * 
 * Params:
 */
function validaData(data1, data2) {
    dataS1 = data1.split("/");
    dataS2 = data2.split("/");
    var dataF1 = new Date(dataS1[2], dataS1[1], dataS1[0]);
    var dataF2 = new Date(dataS2[2], dataS2[1], dataS2[0]);
    return dataF1 >= dataF2;
}

/**
* @param campo: Name do campo no formulario
* @param textoCampo: Nome do campo que será exibido na mensagem de erro 
*/
function campoObrigatorio(form, campo, textoCampo){
	if (form.getValue(campo) == null || form.getValue(campo).isEmpty() || form.getValue(campo) == 'R$ 0,00') {
		errorMsg += "O campo <b>"+textoCampo+"</b> é obrigatório </br>";
	}
}
// Função para validar os campos de checkbox
function validacaoObrigatorio(form, campo, textoCampo){
	var validado = form.getValue(campo);
	if (validado == "") {
		errorMsg += "O campo <b>"+textoCampo+"</b> deve ser preenchido e anexado seu arquivo </br>";
	}
}
// Função para validar os campos de checkbox
function validacaoObrigatorioCampos(form, campo, textoCampo){
	var validado = form.getValue(campo);
	if (validado == "") {
		errorMsg += "O campo <b>"+textoCampo+"</b> deve ser preenchido.</br>";
	}
}
/**
 * Verifica se a atividade esta sendo transferida ou salva sem movimentação
 * @returns True se tiver sendo Transferida, false se estiver sendo movimentada 
 */
function isTransferOrSave(){
	 var WKNumState    = getValue("WKNumState");
	 var WKNextState   = getValue("WKNextState");
	 var WKCompletTask = getValue("WKCompletTask");
	 
	 if(WKCompletTask == "false" || WKNumState == WKNextState){
	  return true;
	 }else{
	  return false;
	 }
}


