
/**
 * Adiciona mascara monetaria no campo
 * @param seletor id ou nome do campo. Ex: #idCampo
 */
function addMaskMonetaria(seletor){
	$(seletor).maskMoney({prefix:'R$ ', allowNegative: false, thousands:'.', decimal:',', affixesStay: true});
}

function getCurrentDate(){
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = addZero(now.getMonth()+1,2);
    var day     = addZero(now.getDate(),2);
    var currentDate = day+'/'+month+'/'+year;
    return currentDate;
}

function addZero(x,n) {
    if (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function openZoom(datasetId, datafields, resultFields, constraints, type) {
	window.open("/webdesk/zoom.jsp?datasetId=" + datasetId
			+ "&dataFields=" + datafields
			+ "&resultFields=" + resultFields
			+ "&filterValues=" + constraints
			+ "&type=" + type, "zoom", "status, scrollbars=no, top=100, left=100, width=900, height=600");
};

function configMotivo(fieldDecisao, fiedMotivo, callback){
	//Quando reprovação exibe o campo de motivo
	$(fieldDecisao).change(function(){
		if($(this).val() == 'nao'){
			$(fiedMotivo).parent().show();
			if(callback != null && callback != undefined){
				callback('nao');
			}
		}else{
			$(fiedMotivo).val('');
			$(fiedMotivo).parent().hide();
			if(callback != null && callback != undefined){
				callback('sim');
			}
		}
	});
}
function addMascaraMonetaria(valor){
	if(valor == '' || valor == undefined){
		  return 'R$ 0,00';
	}else{
		  var inteiro = null, decimal = null, c = null, j = null;
		  var aux = new Array();
		  valor = ""+valor;
		  c = valor.indexOf(".",0);
		  //encontrou o ponto na string
		  if(c > 0){
		     //separa as partes em inteiro e decimal
		     inteiro = valor.substring(0,c);
		     decimal = valor.substring(c+1,valor.length);
		  }else{
		     inteiro = valor;
		  }
		  //pega a parte inteiro de 3 em 3 partes
		  for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
		     aux[c]=inteiro.substring(j-3,j);
		  }
		  //percorre a string acrescentando os pontos
		  inteiro = "";
		  for(c = aux.length-1; c >= 0; c--){
		     inteiro += aux[c]+'.';
		  }
		  //retirando o ultimo ponto e finalizando a parte inteiro
		  inteiro = inteiro.substring(0,inteiro.length-1);
		  if(isNaN(decimal) || decimal == null || decimal == undefined){
		      decimal = "00";
		  } else if(decimal.length === 1){
		      decimal = decimal+"0";
		  }
		  valor = "R$ "+inteiro+","+decimal;
		  return valor;
	}
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

/**
 * Função que garante somente númeors para campos
 * Deve ser adicionada ao evento keyup do campo
 * @param numero
 */
function somenteNumeros(num) {
	var er = /[^0-9.]/;
	er.lastIndex = 0;
	var campo = num;
	if (er.test(campo.value)) {
	  campo.value = "";
	}
}


function showMessage(titulo, mensagem, functionDone) {
	FLUIGC.message.alert({
		message: mensagem,
		title: titulo,
		label: 'OK'
	}, function(el, ev) {
		if(functionDone != null){
			functionDone.call();
		}
	});
}

/**
* Adiciona zeros a esquerda até que a string tenha 4 caracteres, para que se adeque ao padrão do Protheus
* @param number String que receberá os zeros a esquerda
* @param length Número de caracteres que a string deverá ter
* @returns String com os zeros adicinados a esquerda
*/
function formataSeqProtheus(number, length) {
   var str = '' + number;
   while (str.length < length) {
       str = '0' + str;
   }
   return str;
}

//formatar utf8
UTF8 = {
	encode: function(s){
		for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
			s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
		);
		return s.join("");
	},
	decode: function(s){
		for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
			((a = s[i][c](0)) & 0x80) &&
			(s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
			o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
		);
		return s.join("");
	}
};

function showMotivoReprovacao(){
	$('[name^="motivoRepovacao"]').each(function(){
	if($(this).val() != ''){
			$(this).attr('readonly','readonly');
			$(this).closest('fieldset').show();
			$(this).parent().show();
		}
	});
}

function escondeZoom(){
	$("[name^=zoomProd]").hide();
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}