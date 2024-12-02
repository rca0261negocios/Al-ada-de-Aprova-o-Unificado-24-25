/*
 * Oculta CLASS (jquery)
 * 
 * Params: customHTML, class
 */
function ocultarCampo(customHTML, seletor) {
	customHTML.append('<script>$("'+seletor+'").hide();</script>');
}

/**
* @param campo: Name do campo no formulario
* @param textoCampo: Nome do campo que será exibido na mensagem de erro 
*/
function campoObrigatorio(form, campo, textoCampo){
	if(form.getValue(campo) == null || form.getValue(campo).isEmpty()){
		errorMsg += "O campo <b>"+textoCampo+"</b> é obrigatório </br>";
	}
}

/**
 * Manipula os campos pai filho do lado do servidor
 * @param form objeto do formulário
 * @param namePaiFilho nome da tabela a ser manipulada
 * @param listFields nome dos campos da tabela sem o ___
 */
function  manipulaPaiFilho(form, namePaiFilho, listFields, listName){
	var indexs =  form.getChildrenIndexes(namePaiFilho);
	for(var i = 0; i < indexs.length; i++ ){
		var indice  = indexs[i];
		for(var j = 0; j < listFields.length; j++){
			var field = listFields[j]+"___"+indice;
				campoObrigatorio(form,field,listName[j]+" na linha "+indice);
		}
		/*if(form.getValue("valorProd___"+indice) == "Não encontrado"){
			errorMsg += "O campo <b> Valor Produto </b> é obrigatório na linha "+ indice+"</br>";
		} */
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


