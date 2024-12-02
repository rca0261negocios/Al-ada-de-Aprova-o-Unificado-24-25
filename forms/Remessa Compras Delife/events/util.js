/**
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
* @param campoNumerico: Nome do campo que será exibido na mensagem de erro  
*/
function campoObrigatorio(form, campo, textoCampo, campoNumerico){
	if(campoNumerico){
		if(form.getValue(campo) == null || form.getValue(campo).isEmpty() || form.getValue(campo) == "NaN" ||
				converteMoedaFloat(form.getValue(campo)) <= 0 ){
			errorMsg += "O campo <b>"+textoCampo+"</b> é obrigatório e precisa de um valor positivo </br>";
		}
	}else{
		if(form.getValue(campo) == null || form.getValue(campo).isEmpty()){
			errorMsg += "O campo <b>"+textoCampo+"</b> é obrigatório </br>";
		}
	}
}

/**
 * Valida obrigatoriedade do campos pai filho
 * @param form objeto do formulário
 * @param namePaiFilho nome da tabela a ser manipulada
 * @param camposTextos nome dos campos da tabela sem o ___
 * @param camposNumericos nome dos campos numéricos da tabela sem o ___ para validar valores acima de zero
 */
function campoObrigatorioPaiFilho(form, namePaiFilho, camposTextos, campoIndice, camposNumericos){
	var indexs =  form.getChildrenIndexes(namePaiFilho);
	
	var idIndice;
	for(idIndice in campoIndice);
	
	for(var i = 0; i < indexs.length; i++ ){
		var indice  = indexs[i];
		for(var name in camposTextos){
			var field = name+"___"+indice;
			var fieldIndice = idIndice+"___"+indice;
			campoObrigatorio(form,field,camposTextos[name]+" "+campoIndice[idIndice]+" "+form.getValue(fieldIndice));
		}
		for(var name in camposNumericos){
			var field = name+"___"+indice;
			var fieldIndice = idIndice+"___"+indice;
			campoObrigatorio(form,field,camposNumericos[name]+" "+campoIndice[idIndice]+" "+form.getValue(fieldIndice), true);
		}
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

/**
 * Recebe um valor de campo string-monetário e converte para o tipo float
 * @param string com mascara monetária
 * @returns valor float sem mascara
 */
function converteMoedaFloat(valor){
	valor = valor.replace("R$ ",'');

	while(valor.indexOf(".") != -1){
		valor = valor.replace('.','');
	}

	valor = valor.replace(",",".");
	valor = parseFloat(valor);

	return valor;
}

