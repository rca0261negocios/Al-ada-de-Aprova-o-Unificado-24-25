
/**
 * Adiciona mascara monetaria no campo
 * @param seletor id ou nome do campo. Ex: #idCampo
 */
 function addMaskMonetaria(seletor){
	$(seletor).maskMoney({
						prefix:'R$ ', 
						allowNegative: false,
						thousands:'.', 
						decimal:',', 
						affixesStay: true});
}

function addMaskMonetariaZero(seletor){
	$(seletor).maskMoney({
						prefix:'R$ ', 
						allowZero: true,
						allowNegative: false, 
						thousands:'.', 
						decimal:',', 
						affixesStay: true});
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

function definirDiasPrazo(data){            
	
	dataSelect = data.name;
	novaData = $("#"+dataSelect).val();
	divisaoData = novaData.split("/");
	dia = divisaoData[0];
	mes = divisaoData[1];                
	ano = divisaoData[2];

	dataFormatada = new Date(ano, mes -1, dia);                
	
	//pegar dia de hoje
	hoje = new Date();

	diff = Math.abs(dataFormatada.getTime() - hoje.getTime()); // Subtrai uma data pela outra
	dias = Math.ceil(diff / (1000 * 60 * 60 * 24));

	diasP = dataSelect.split("___")[1];
	$("#diasPrazo___" + diasP).val(dias);
	
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

/**
 * Busca as informações de um dataset
 * @param {*} nameDataset nome do dataset
 * @param {*} columns array com nome das colunas selicionadas ou null para todas colunas
 * @param {*} filters array com nome do filtro e valor separado por | Ex: nome|Pedro
 */
function getInDataset(nameDataset, columns, filters,active=true) {
	try {
		var listConstraint = [];
		if (Array.isArray(filters) && filters.length > 0) {
			for (var i in filters) {
				var item = filters[i].split('|');
				listConstraint.push(DatasetFactory.createConstraint(item[0], item[1], item[1], ConstraintType.MUST));
			}
		}
		if(active){
			listConstraint.push(DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST));
		}
		var dataset = DatasetFactory.getDataset(nameDataset, columns, listConstraint, null);
		return dataset;
	} catch (e) {
		console.log('ERRO AO CONSULTAR O DATASET: ' + nameDataset);
		console.error('ERRO: ' + e)
	}
}


//FUNÇÕES DA DECISAO DE APROVAÇÃO
/**
 * Adiciona o evento de click para os botoes de aprovação
 */
function btnAprov(enviarAtividade) {
	$(".btnAprov").on("click", function () {
		var botao = $(this).attr("id").split("Btn")
		var decisao = botao[0];
		var btnAprov = decisao + "BtnAprov";
		var btnReprov = decisao + "BtnReprov";
		var acao = botao[1];

		if (acao == "Aprov") {
			$("#" + decisao).val("sim");
			vueApp.form[decisao] = 'sim';
			if (enviarAtividade){
				vueApp.$forceUpdate();
				//ENVIA A SOLICITACAO AUTOMATICAMENTE
				$("#workflowActions > button:first-child", window.parent.document).click();
			}
		} else if (acao == "Reprov") {
			$("#" + decisao).val("nao");
			vueApp.form[decisao] = 'nao';
		}
		altBtnAprov($("#" + decisao).val(), btnAprov, btnReprov);
	
	});
};
/**
 * Bloqueia todos os botoes de aprovação
 */
function blqAllBtnAprov() {
	$(".btnAprov").each(function () {
		var botao = $(this).attr("id").split("Btn")
		var decisao = botao[0];
		blqBtnAprov(decisao);
	});
	$("[name^='motivoAprovAlcada'").each(function(){
		$(this).prop('readonly','readonly');
	});
};
/**
 * bloqueia apenas aprovação do parametro
 */
function blqBtnAprov(decisao) {
	var btnAprov = decisao + "BtnAprov";
	var btnReprov = decisao + "BtnReprov";

	altBtnAprov($("#"+decisao).val(), btnAprov, btnReprov);

	$("#" + btnAprov).prop("disabled", true);
	$("#" + btnReprov).prop("disabled", true);
};
function altBtnAprov(decisao, btnAprov, btnReprov) {
	if (decisao == "sim") {
		$("#" + btnAprov).removeClass("btn-default").addClass("btn-success active");
		$("#" + btnReprov).removeClass("btn-danger active").addClass("btn-default");
	} else if (decisao == "nao") {
		$("#" + btnAprov).removeClass("btn-success active").addClass("btn-default");
		$("#" + btnReprov).removeClass("btn-default").addClass("btn-danger active");
	}
};
function flagAllBtnAprov(){
	$('[name^="decisaoAlcada"]').each(function(){
		var decisao = $(this).prop('id');
		var btnAprov = decisao + "BtnAprov";
		var btnReprov = decisao + "BtnReprov";

		altBtnAprov($(this).val(), btnAprov, btnReprov);
	})
}
function addEventSendFluig(callback){
	$('.fixedTopBar, #page-header', parent.document).find('button:first').bind("click", function () {
		callback();
	});
}

function readColumn(nameColumn, callback, fieldValue){
	if(fieldValue == undefined){
		$("[name^='" + nameColumn + "___']").each(function (){
			callback($(this).prop('id').split('___')[1], $(this));
		});
	}else{
		$("[name^='" + nameColumn + "___'][value='" + fieldValue + "']").each(function (){
			callback($(this).prop('id').split('___')[1], $(this));
		});
	}

}

function converteDataProtheus(dataFluig) {
	if (dataFluig != undefined) {
		var arrayData = dataFluig.split("/");
		var data = '';
		if (arrayData.length == 3) {
			var ano = arrayData[2];
			var mes = arrayData[1];
			var dia = arrayData[0];
			data = ano + '' + mes + '' + dia;
		}
		return data;
	} else {
		return '';
	}
}