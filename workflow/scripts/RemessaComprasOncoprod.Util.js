function Util(){

}
//Funcao para remover a mascara monetaria
function removeMascaraMonetaria(mask) {
	if (mask != undefined && mask != '') {
		mask = mask.replace('R$', '');
		mask = mask.replace(' ', '');
		//mask = mask = mask.replace(/[\.]/g, '');

		mask = mask.replace('.', '');
		mask = mask.replace('.', '');
		mask = mask.replace('.', '');

		mask = mask.replace(',', '.');
		return parseFloat(mask);
	} else {
		return 0.00;
	}
}

/*
 * Função que torna anexos obrigatórios em qualquer atividade.
 */
function verificaAnexo() {
	var qtdAnexosCampo = parseInt(hAPI.getCardValue("qtdAnexos"));
	var instanceId = getValue('WKNumProces');
	var constraintProcessAttachment = DatasetFactory.createConstraint('processAttachmentPK.processInstanceId', instanceId, instanceId,ConstraintType.MUST);
	var datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment], null);
	var documentId = datasetProcessAttachment.getValue(0, 'documentId');
	var constraintProcessAttachment2 = DatasetFactory.createConstraint('documentId', documentId, documentId, ConstraintType.MUST_NOT);
	datasetProcessAttachment = DatasetFactory.getDataset('processAttachment', null, [constraintProcessAttachment, constraintProcessAttachment2], null);

	var qtdAnexos = datasetProcessAttachment.rowsCount;
	if (qtdAnexos > qtdAnexosCampo) {
		hAPI.setCardValue("qtdAnexos", qtdAnexos);
	} else {
		throw "É preciso anexar ao menos um documento para continuar o processo";
	}
}

/**
 * Consulta campos de Pai Filho no formulário
 * @param fieldList Array de strings dos atributos "Name" (sem "___") dos campos do pai filho
 * @return Array de objetos, cada index do array corresponde a uma linha do pai filho com o
 * "Name" de cada campo como seletor do atributo
 */
/**
* Consulta campos de Pai Filho no formulário
* @param fieldList Array de strings dos atributos "Name" (sem "___") dos campos do pai filho
* @return Array de objetos, cada index do array corresponde a uma linha do pai filho com o
* "Name" de cada campo como seletor do atributo
*/
function consultaPaiFilho(fildList){
	var resultPaiFilho = [];
	var numProcess = getValue("WKNumProces");
	//Consulta todos os campos do formulário apartir do WKNumProces
	var mapa = hAPI.getCardData(parseInt(numProcess));
	var it = mapa.keySet().iterator();
	//Loop para percorrer todos os campos do formulário
	while (it.hasNext()) {
		var campo = it.next();
		//Verifica se o campo atual do loop pertence a um Pai Filho
		if (campo.indexOf("___") > -1) {
			//Percorre a lista de campos informada como parametro
			var nomeCampo = campo.split("___")[0].trim();
			var indexCampo = parseInt(campo.split("___")[1])-1;
			if(resultPaiFilho[indexCampo] == undefined){
				resultPaiFilho[indexCampo] = {}
			}
			for (var i = 0; i < fildList.length; i++) {
				if(fildList[i] == nomeCampo){
				//Adiciona um atributo com o nome do campo contendo seu valor ao array de resultado
				//Cada linha do array corresponde a uma linha da tabela com a primeira linha sendo o index 0
				 resultPaiFilho[indexCampo][nomeCampo] = mapa.get(campo);
				}
			}
		}
	}
	return resultPaiFilho;
}

/**
 * Recebe uma String como paramentro e a retorna sem os acentos
 * @param string
 * @returns
 */
function removeAcentos(string){
	string = string.replaceAll('Á|À|Â|Ã|Ä','A');
	string = string.replaceAll('É|È|Ê|Ë','E');
	string = string.replaceAll('Í|Ì|Î|Ï','I');
	string = string.replaceAll('Ó|Ò|Ô|Õ|Ö','O');
	string = string.replaceAll('Ú|Ù|Û|Ü','U');
	string = string.replaceAll('Ç','C');
	return string
}


function converteDataProtheus(dataFluig){
	if(dataFluig != undefined){
		var arrayData = dataFluig.split("/");
		var data = '';
		if(arrayData.length == 3){
			var ano = arrayData[2];
			var mes = arrayData[1];
			var dia = arrayData[0];
			data = ano + '' + mes + '' + dia;
		}
		return data;
	}else{
		return '';
	}
}

/**
 * Transforma o objeto do tipo data para uma string no formato de data do protheus
 * @param data Objeto do tipo data  
 * @returns String com a data passada no formato aceito pelo protheus. Retorna Falso se ocorrer algum erro
 */
function formataData(data){
	try{
		var ano =  data.getFullYear()
		var mes = data.getMonth();
		mes = parseInt(mes)+1; //Altera o fato do date considerar 0 como janeiro
		mes = (mes < 10) ? "0"+mes : mes;
		var dia = (data.getDate() < 10) ? "0"+data.getDate() :data.getDate();
		var dateResult = dia+"/"+mes+"/"+ano;
		return dateResult;
	}catch(err){
		return err;
	}
}