var observacaoClicado = false;
var observacaoFornecClicado = false;
String.prototype.lpad = (function(padString, length) {
	var str = this;
	while (str.length < length)
		str = padString + str;
	return str;
});

function getExpireDateTime(){
	var obj = {date: '', time: ''};
	var currentDate = new Date();
	var newDay = currentDate.getDate()+3;
	var hour = currentDate.getHours();
	var minute = currentDate.getMinutes();
	var day;
	var month;
	var year;

	currentDate.setDate(newDay);

	day = currentDate.getDate();
	month = ((currentDate.getMonth()+1)<10) ? '0'+(currentDate.getMonth()+1) : (currentDate.getMonth()+1);
	year = currentDate.getFullYear();

	obj.date = day+'/'+month+'/'+year;
	obj.time = hour+':'+minute;
	$("#dtValidadeCotacao").val(obj.date);
	$("#hrValidadeCotacao").val(obj.time);
	//return obj;
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        var abaAtiva = $("#tbItens").find(".linhaSelecionada");
        $(abaAtiva).removeClass('linhaSelecionada');
    }
    if (event.target == modalFornec) {
        modalFornec.style.display = "none";
        var abaAtiva = $("#tbFornecs").find(".linhaSelecionada");
        $(abaAtiva).removeClass('linhaSelecionada');
    }
}

var myLoading2 = FLUIGC.loading(window,{message:  '<h2>Aguarde...</h2>'});
function hasOwnProperty(obj, prop) {
	var proto = obj.__proto__ || obj.constructor.prototype;
	return (prop in obj) &&
	(!(prop in proto) || proto[prop] !== obj[prop]);
}

var CURRENT_STATE;
var fornecedores = {};
var fornecedoresVencedores = {};
var itensBionexo;
var itensFiltradosJSON;
var tabelaCotacaoItens;
var indiceGlobal = "";
var ZOOM_TYPE_FORNECEDOR_COMPRA = 'fornecCompras';
var ZOOM_TYPE_PRODUTO = 'produtoCompras';
var customZoom = false;
var mostrouModal = false;
var tabelaItensAglu;
var diasPrazoSLA = 0;
var jsonFinal = [];
var estados = {};
estados['AC'] = { nome: 'Acre'};
estados['AL'] = { nome: 'Alagoas'};
estados['AP'] = { nome: 'Amapá'};
estados['AM'] = { nome: 'Amazonas'};
estados['BA'] = { nome: 'Bahia'};
estados['CE'] = { nome: 'Ceará'};
estados['DF'] = { nome: 'Distrito Federal'};
estados['ES'] = { nome: 'Espírito Santo'};
estados['GO'] = { nome: 'Goiás'};
estados['MA'] = { nome: 'Maranhão'};
estados['MT'] = { nome: 'Mato Grosso'};
estados['MS'] = { nome: 'Mato Grosso do Sul'};
estados['MG'] = { nome: 'Minas Gerais'};
estados['PA'] = { nome: 'Pará'};
estados['PB'] = { nome: 'Paraíba'};
estados['PR'] = { nome: 'Paraná'};
estados['PE'] = { nome: 'Pernambuco'};
estados['PI'] = { nome: 'Piauí'};
estados['RJ'] = { nome: 'Rio de Janeiro'};
estados['RN'] = { nome: 'Rio Grande do Norte	'};
estados['RS'] = { nome: 'Rio Grande do Sul'};
estados['RO'] = { nome: 'Rondônia'};
estados['RR'] = { nome: 'Roraima'};
estados['SC'] = { nome: 'Santa Catarina'};
estados['SP'] = { nome: 'São Paulo'};
estados['SE'] = { nome: 'Sergipe'};
estados['TO'] = { nome: 'Tocantins'};

var meses = {
		"01" : "Janeiro",
		"02" : "Fevereiro",
		"03" : "Março",
		"04" : "Abril",
		"05" : "Maio",
		"06" : "Junho",
		"07" : "Julho",
		"08" : "Agosto",
		"09" : "Setembro",
		"10" : "Outubro",
		"11" : "Novembro",
		"12" : "Dezembro"
};
var indiceCotacao;
$(document).on('click', '#tbFornecs .btnChoice', function(){
	$("#vencedoraCotacao").prop('checked', false);
	var indice = $(this).parent().parent()[0].children[1].children[0].id.split("linhaSelecionadaFornec___")[1];
	indiceCotacao = indice;
	$("#linhaSelecionadaCotacao").val($("#linhaSelecionadaCotacao_hidden___"+indice).val());
	$("#codItemCotacao").val($("#codItemCotacao_hidden___"+indice).val());
	$("#DescItemCotacao").val($("#DescItemCotacao_hidden___"+indice).val());
	$("#ObsItemCotacao").val($("#ObsItemCotacao_hidden___"+indice).val());
	$("#JustificativaItemCotacao").val($("#JustificativaItemCotacao_hidde___"+indice).val());
	$("#cnpjFornCotacao").val($("#cnpjFornCotacao_hidden___"+indice).val());
	$("#SeqItemCotacao").val($("#SeqItemCotacao_hidden___"+indice).val());
	if($("#vencedoraCotacao_hidden___"+indice).val() == "true"){
		$("#vencedoraCotacao").prop('checked', true);
	}

	$("#codFornecedorCotacao").val($("#codFornecedorCotacao_hidden___"+indice).val());
	$("#descFornecedorCotacao").val($("#descFornecedorCotacao_hidden___"+indice).val());
	$("#descFabricante").val($("#descFabricante_hidden___"+indice).val());
	$("#qtdeItemCotacao").val($("#qtdeItemCotacao_hidden___"+indice).val());
	$("#idMmItemCotacao").val($("#idMmItemCotacao_hidden___"+indice).val());
	$("#umItemCotacao").val($("#umItemCotacao_hidden___"+indice).val());
	$("#vlrUnitItemCotacao").val($("#vlrUnitItemCotacao_hidden___"+indice).val());
	$("#vlrTotalItemCotacao").val($("#vlrTotalItemCotacao_hidden___"+indice).val());
	$("#outrasDespItemCotacao").val($("#outrasDespItemCotacao_hidden___"+indice).val());
	$("#vlrIpiItemCotacao").val($("#vlrIpiItemCotacao_hidden___"+indice).val());
	$("#prazoItemCotacao").val($("#prazoItemCotacao_hidden___"+indice).val());
	$("#descCondPgtoItemCotacao").val($("#descCondPgtoItemCotacao_hidden___"+indice).val());
	$("#tabPrecoItemCotacao").val($("#tabPrecoItemCotacao_hidden___"+indice).val());

	$('#myModal').show();
    $('#divChoices').show();
    thefield = $(this).prev();

    jaExisteCotacaoVencedora(indice);
});

function jaExisteCotacaoVencedora(indiceLinha){
	var tabelaOBJ = document.getElementById("tbFornecs");
	var linhas = tabelaOBJ.getElementsByTagName("tr");

	for (var i=0; i<linhas.length; i++) {
		var elementoTag = linhas[i].getElementsByTagName("input");
		//alert(elementoTag.length);
		for (var j=0; j<elementoTag.length; j++) {
			//alert(elementoTag[j]);
			if (elementoTag[j].id.indexOf("vencedoraCotacao_hidden___") != -1) {
				var index = elementoTag[j].id.split("vencedoraCotacao_hidden___")[1];
				if(index != indiceLinha){
					if($("#vencedoraCotacao_hidden___"+index).val() == "true"){
						$("#vencedoraCotacao").attr('disabled', true);
					}
				}
			}
		}
	}
}

$(document).on('click', '.btnselect', function(){
//$docu('.btnselect').on('click', function(){


	//console.log($(this).prev());
	//console.log($(this).prev()[0].children[0].children[0].children[0].children[1].children[0].children[0].children);
	var inputs = $(this).prev()[0].children[0].children[0].children[0].children[1].children[0].children;
	var inputJustificativa = $(this).prev()[0].children[1].children[0].children[1].children[1];
	//console.log($(this).prev()[0].children[0].children[0].children[0].children[1].children[0].children);
	//console.log($(this).prev()[0].children[1].children[0].children[1].children[1].value);
	console.log(inputs);
	console.log($(this).prev()[0].children[0].children[0].children[0].children[1].children[0].children[0]);
	for(var x=0;x<inputs.length;x++){

		for(var y=0;y<inputs[x].children.length;y++){
			if(inputs[x].children[y].id != "vencedoraCotacao"){
				$("#"+inputs[x].children[y].id+"_hidden___"+indiceCotacao).val(inputs[x].children[y].value);
			}else{
				console.log(inputs[x].children[y].checked);
				$("#"+inputs[x].children[y].id+"_hidden___"+indiceCotacao).val(inputs[x].children[y].checked);
			}
		}

	}
	$("#txtJustificacaoCotacao_hidden___"+indiceCotacao).val(inputJustificativa.value);
    theselected = $(this).prev();
    $("#vencedoraCotacao").attr('checked', false);
    thefield.val( theselected.val() );
    $('#divChoices').hide();
    $('#myModal').hide();
})

//$.noConflict();
$(function() {
	CURRENT_STATE = $("#cdAtividade").val();
	buscaDataNecessidadeLimite();
	bindEventosIniciais();
	adicionaLinhasIniciaisTabela();
	adicionaMascara();
	carregarDivsIniciais();
	limpaCampoChangeFilial();
	enableFields();
	selecaoTipoCotacao();
	alimentarFilialEntregaProtheus();
	marcaCamposObrigatorios();
	setZooms();
	getParamsURL()
	if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		$("#rdTipoCotacaoFechada").trigger("click");
		//faz bind na 1a linha do tbForneces que tem uma linha em branco added anteriormente
		setChangeFornecedor(1);
		carregaItensAglu();
		$('[name^="formaPagamento"]').attr("style", "pointer-events: auto;").removeClass('readonly');
	}
	/*
	if(CURRENT_STATE == "14"){
		criaDataTableItensAglutinados([{'numSolicitacao':'','sPrioridadeProduto':'','hiddenPrioridade':'','txtSeqItemProduto':'','txtCodItemProduto':"",'txtDescProduto':'','txtUnidMedProduto':'','txtQuantidadeProduto':'','txtSaldoProduto':'','ConsumoMedio':'','dtNecessidadeProduto':'','txtArmazemProduto':'','txtObsProduto':'','nmFabricante':'','txtCCProduto':'','hiddenCodCC':'','txtContaContabil':''}]);
	}*/
	if(FORM_MODE == "VIEW"){
		$(".form-control, .input-sm").addClass("readonly");
		$(".input-group-addon, .btn").hide();
	}


	$('.btnChoice').on('click', function(){

	})

	$('#target').maskMoney({prefix:'', thousands:'.', decimal:',', affixesStay: true, allowZero : true});

});



function openModalRMLS(){
	$('body').scrollTop(0);

	var idmov = $("#txtIDMOV").val();
	var data = { "IDMOV": idmov };
	var html = Mustache.render($('.template_modal').html(), data);

	FLUIGC.modal({
		title: "Detalhes",
		content: html,
		size: 'large',
		id: 'show-info-modal',
		actions: [{
			'label': "Fechar",
			'classType': 'btn-primary',
			'autoClose': true
		}]
	}, function(err, data) { //funcao callback

		var c1 = DatasetFactory.createConstraint("IDMOV", idmov , idmov, ConstraintType.MUST);
		var dataset = DatasetFactory.getDataset("ds_rmls_oc", null, [c1], null);
		var height = 300;
		try {
			if (parent.$("#workflowView-cardViewer, #workflow-detail-cardViewer")[0] && parent.$("#workflowView-cardViewer, #workflow-detail-cardViewer")[0].clientHeight > 200) {
				height = parent.$("#workflowView-cardViewer, #workflow-detail-cardViewer")[0].clientHeight-200;
			}
		} catch (e) {}

		$(".modal-body").css("max-height",height+"px");
		$(".modal-body").css("height", height+"px");

		FLUIGC.datatable("#tableModal", {
	   		dataRequest:dataset.values,
	   		renderContent: ".templateTableRmls",
	   		header: [  {"title" : 'Id Movimento'},
	   		           {"title" : 'C\u00F3digo do Movimento'},
	   		           {"title" : 'N\u00FAmero do Movimento'},
	   		           {"title" : 'Data de Emiss\u00E7\u00E3o'},
	   		           {"title" : 'Aprovador'},
	   		           {"title" : 'Solicita\u00E7\u00E3o Fluig'},
	   		           {"title": ""}
	   		           ],
	   	    search: {
	   	        enabled: false
	   	    },
	   	    navButtons: {
	   	        enabled: false
	   	    },
	   	    emptyMessage: '<div class="text-center">Registros n&atilde;o encontrados</div>',
	   	    actions: {
	   	        enabled: false
	   	    }
		});
    });
}







function adicionaMascara(){
	$('.data').mask('99/99/9999');
	$('.hora').mask('99:99');
	$('.valor').maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, allowZero : true});
	$('.numero').mask('?999999999999');
	if(CURRENT_STATE == INICIO || CURRENT_STATE == INICIO_1){
		$("#tbItens tbody tr:gt(0) td [name^=dtNecessidadeProduto___]").each(function(){
			adicionaDatePicker($(this).prop("id"));
		});
	}else{
		$("#tbItens tbody tr:gt(0) td [name^=dtNecessidadeProduto___]").each(function(){
			destroyDatePicker($(this).prop("id"));
		});
	}
	if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		adicionaDatePicker('dtValidadeCotacao');
	}else{
		destroyDatePicker('dtValidadeCotacao');
	}
	//aqui foi removida a atividade || CURRENT_STATE == AJUSTAR_DIVIRGENCIA
	if(CURRENT_STATE == PREENCHER_FORMULARIO_CONTRATO ){
		adicionaDatePicker('dtValidadeContrato');
	}else{
		destroyDatePicker('dtValidadeContrato');
	}
	$("div.ui-datepicker").css( { "font-size": "10px" } );
}

function adicionaDataFornecCotacao(fornec, dataEntrega){
	$("#tbCotacoes tbody tr:gt(0)").each(function(){
		var codFornecedor = getClosestByElement($(this),"tr").find("[name^=codFornecedorCotacao___]").val();
		if(codFornecedor == fornec){
			$(this).find("[name^=prazoItemCotacao___]").val(dataEntrega);
		}
	});
}

function bindEventosIniciais(){
	$('#btAdicionaItem').click(function(){
		var index = wdkAddChild('tbItens');
		setZooms();
		MaskEvent.init(); //Atualiza os campos com 'mask'
		alimentaDadosComplementaresItem(index);
	});
	$('#btAdicionaSolic').click(function(){
		incluirSolicAglu();
	});
	$('#btAdicionaFornec').click(function(){
		var index = wdkAddChild('tbFornecs');
		setZooms();
		alimentaDadosComplementaresFornecedores(index);
		setChangeFornecedor(index);
		$("#txtCodFornecCotacao___"+ index).css('width', '100%');
		applyDisabledStyle();
	});
	if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR ){
		$('#btEnviaBionexo').click(function(){
			mostraLoading(enviaCotacaoBionexo);
		});
	}
	//removida a  ||  CURRENT_STATE == INICIO_1
	if(CURRENT_STATE == CORRIGIR_SOLICITACAO || CURRENT_STATE == INICIO_1 || CURRENT_STATE == INICIO){
		$("#tbItens tbody tr:gt(0) td [name^=dtNecessidadeProduto___]").each(function(){
			var index = buscaIndicePaiFilho($(this));
			$("[name=sPrioridadeProduto___"+ index +"]").change(function (){
				var filialNm = $("[name=hiddenFilial]").val();
				var primeiraLinha 		= $('#tbItens tbody tr:gt(0):first');
				var prioridadeItem		= $(primeiraLinha).find('[name^=sPrioridadeProduto___]  option:selected').val();
				var codMaterialItem 	= $(primeiraLinha).find('[name^=tipoProduto___]').val();
				if(codMaterialItem != '' && codMaterialItem != undefined){
					if(!validaMaterialMATMED(codMaterialItem)){
						if(codMaterialItem == "SV"){
							$('#hiddenTipoProduto').val('SRV');
						}else{
							$('#hiddenTipoProduto').val('DIV');
						}
					}else{
						$('#hiddenTipoProduto').val('MAT/MED');
					}
				}else{
					$('#hiddenTipoProduto').val('DIV');
				}
				$('#hiddenPrioridadeSolicitacao').val(prioridadeItem);
			});
			adicionaChangeEventProduto(index);
			adicionaDatePicker($(this).prop("id"));
			$("#"+$(this).prop("id")).change(function(){
				validaPrazoSLA($(this));
			});
		});
	}
	if(CURRENT_STATE == DEFINIR_VENCEDOR){
		$('#tbCotacoes tbody tr:gt(0) td [name^=vencedoraCotacao___]').click(function() {
			selecionaCheckCotacaoVencedora(this);
			calculaTotalCotacoes();
			var linhaSelecionada = getClosestByElement($(this),"tr");
			adicionaMarcadorLinhaSelecionadaProduto(linhaSelecionada[0]);
			if(validaLinhaMenorPreco($(this))){
				$("#txtJustificacaoCotacao").val("");
				disableInputElement($("#txtJustificacaoCotacao"));
			}else{
				var indice = buscaIndicePaiFilho($(this));
				$("#txtJustificacaoCotacao").val($("[name=JustificativaItemCotacao___"+indice+"]").val());

				$("#txtJustificacaoCotacao").unbind("blur");
				$("#txtJustificacaoCotacao").bind("blur",function(){
					$("[name=JustificativaItemCotacao___"+indice+"]").val($("#txtJustificacaoCotacao").val());
				});
				enableInputElement($("#txtJustificacaoCotacao"));
			}
		});
		//Escode campos negociacao ao abrir formulario
		escondeCamposNegociacao();
		$('#totais input[name=rdTeveNegociacao]').change(function(){
			var valNegociacao = $('input[name=rdTeveNegociacao]:checked').val();
			if(valNegociacao == "sim"){
				$("#inputsNegociacao").show();
			}else if(valNegociacao == "nao"){
				escondeCamposNegociacao();
			}
		});
		$('#totais input[name=txtPropostaInic]').blur(function() {
			var propInic = $('#txtPropostaInic').maskMoney('unmasked')[0];
			var valCotacaoTotal = $('#txtTotValCotacao').maskMoney('unmasked')[0];
			if(propInic > valCotacaoTotal){
				var valorDesconto = parseFloat(propInic - valCotacaoTotal);
				$('#txtDesconto').maskMoney('mask', valorDesconto);
			}else{
				$('#txtPropostaInic').val(0);
				$('#txtDesconto').val("R$ 0,00");
			}
		});
		$('input[name^=vencedoraCotacao___]').change(function() {
		    if(this.checked) {
		    	var index = $(this).attr('name').split('___')[1];
	    		validaDadosBancariosVencedor(index, $('[name="rdTipoCotacao"]:checked').val());
		    }
		    validaFornecedoresEmCotacao();
		 });
	}

	if(CURRENT_STATE == APROVACAO_ALCADA){

		$("[name^=rdAprovadoAlcada]").each(function(){
			$(this).click(function(){
				var indice = $(this).prop("name");
				indice = indice.replace("rdAprovadoAlcada","");
				if($(this).val() == "naprov"){
					$("#divMotivoReprovacao"+indice).show();
				}else{
					$("#divMotivoReprovacao"+indice).hide();
				}
			});
		});
		$('[name^="formaPagamento___"]').attr("style", "pointer-events: none;").addClass('readonly');
	}

	if(CURRENT_STATE == ALCADA_4 ||
			CURRENT_STATE == ALCADA_3 ||
			CURRENT_STATE == ALCADA_2 ||
			CURRENT_STATE == ALCADA_1){
		$("[name^=rdAprovadoAlcada]").each(function(){
			$(this).click(function(){
				var indice = $(this).prop("name");
				indice = indice.replace("rdAprovadoAlcada","");
				if($(this).val() == "naprov"){
					$("#divMotivoReprovacao"+indice).show();
				}else{
					$("#divMotivoReprovacao"+indice).hide();
				}
			});
		});
	}
	$('#btRecebeCotacaoBionexo').click(function(){
		if(CURRENT_STATE == COTACAO){
			mostraLoading(buscaCarrinhoCompra);
		}
	});
	$('#tabCotacoes').click(function(){
		var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
		if(tipoCotacao == "aberta"){
			montaDataTableItensFornecedor();
		}
	});
	$(":radio[name='rdTipoCotacao']").click(function(){
		selecaoTipoCotacao();
	});
	$('#btDesvincularItem').click(function(){
		desvincularItens();
	});
	$('#btVincularItem').click(function(){
		vincularItens();
	});
	$(":radio[name='rdTipoCotacao']").click(function(){
		selecaoTipoCotacao();
	});
	$('#btVincularItem').click(function(){
		vincularItens();
	});
	$("#btEmailCotacao").click(function(){
		FLUIGC.modal({
			title: 'Informe os destinatários separando-os por ;',
			content: getModalContent(),
			id: 'modal-email',
			actions: [{
				'label': 'Enviar',
				'classType' : 'btn btn-success',
				'bind' : 'onclick=sendEmailCotacao()'
			},{
				'label': 'Cancelar',
				'autoClose': true
			}]
		});
	});
	$("#btEmailPedido").click(function(){
		FLUIGC.modal({
			title: 'Selecione os destinatários',
			content: getModalContent(),
			id: 'modal-email',
			actions: [{
				'label': 'Enviar',
				'classType' : 'btn btn-success',
				'bind' : 'onclick=sendEmailPedido()'
			},{
				'label': 'Cancelar',
				'autoClose': true
			}]
		});
	});
	$(document).on('change', '[name^=txtCodFornecCotacao]', function(){
	//$("[name^=txtCodFornecCotacao]").change(function(){
		var indice = buscaIndicePaiFilho($(this));
		alimentaCNPJFornecedor(indice, $(this));
		alimentaHiddensCotacao(indice, $(this));
	});
	$(document).on('change', '[name^=txtNomeFornecCotacao]', function(){
	//$("[name^=txtNomeFornecCotacao]").change(function(){
		var indice = buscaIndicePaiFilho($(this));
		$("#descFornecedorCotacao_hidden___"+indice).val($("#txtNomeFornecCotacao___"+indice).val());

	});
	$('[name^="btnZoomFornecedor"]').click(function(){
		alimentaDadosComplementaresFornecedores(index);
	});
}

function validaDadosBancariosVencedor(index, cotacao){
	 // Valida dados bancários do fornecedor vencedor

	if($('#dadosBancariosFornecedor').val() == ""){
	 var arrFornecedoresVencedores = [];
	} else if($('#dadosBancariosFornecedor').val() != "" && JSON.parse($('#dadosBancariosFornecedor').val()).length == undefined) {
	 var arrFornecedoresVencedores = [$('#dadosBancariosFornecedor').val()];
	} else {
	 var arrFornecedoresVencedores = JSON.parse($('#dadosBancariosFornecedor').val());
	}

	if(cotacao == 'aberta'){
		var cnpjFornec = $('#cnpjFornCotacao___'+index).val();
		var constraintDs_fornecedor = DatasetFactory.createConstraint('CGC', cnpjFornec.replace(/[^0-9]/g, ''), cnpjFornec.replace(/[^0-9]/g, ''), ConstraintType.MUST);
		var ds_fornecedor = DatasetFactory.getDataset('ds_fornecedores', null, [constraintDs_fornecedor], null);
		var indexTbFornec = $('#tbFornecs input[value="'+cnpjFornec+'"]').prop('name').split('___')[1];
	} else {
		var codFornec = $('#codFornecedorCotacao___'+index).val();
		var constraintDs_fornecedor = DatasetFactory.createConstraint('CODIGO', codFornec, codFornec, ConstraintType.MUST);
		var ds_fornecedor = DatasetFactory.getDataset('ds_fornecedores', null, [constraintDs_fornecedor], null);
		var indexTbFornec = $('#tbFornecs :input[value="'+ds_fornecedor.values[0].CODIGO+'"]').prop('name').split('___')[1];
	}

	if(!ds_fornecedor || !ds_fornecedor.values){
		FLUIGC.modal({
			title: 'Atenção',
			content:'Ocorreu um erro ao buscar os dados do fornecedor vencedor da cotação '+
			'['+$('#descFornecedorCotacao___'+index).val()+'] no Protheus, entre em contato com equipe de TI/ONCOCLINICAS para avaliar a ocorrência.',
			actions: [{
				'label': 'Ok',
				'autoClose': true
			}]
		});

		var dadosBancarios = {'erro':true};
		arrFornecedoresVencedores.push(dadosBancarios)
		$('#dadosBancariosFornecedor').val(JSON.stringify(arrFornecedoresVencedores));
	}else if(ds_fornecedor.values.length > 0){
		var banco = ds_fornecedor.values[0].BANCO;
		var agencia = ds_fornecedor.values[0].AGENCIA;
		var conta = ds_fornecedor.values[0].CONTA;
		var dvconta = ds_fornecedor.values[0].DV_CONTA;
		var loja = ds_fornecedor.values[0].LOJA;

		if($("#sFormaPagamento___"+indexTbFornec).val() == '2' && (banco == '' || agencia == '' || conta == '' || dvconta == '')){
			FLUIGC.modal({
				title: 'Atenção',
				content:'Os dados bancários do fornecedor vencedor da cotação '+
				'não foram cadastrados corretamente no Protheus, entre em contato com o setor de Cadastros para prosseguir<br/>'+
				'<b>Fornecedor:</b>  ['+codFornec+'] '+ds_fornecedor.values[0].DESCRICAO+'<br/>'+
				'<b>Banco:</b> '+banco+'<br/>'+
				'<b>Agencia:</b> '+agencia+'<br/>'+
				'<b>Conta:</b> '+conta+'<br/>'+
				'<b>DV-Conta:</b> '+dvconta+'<br/>',
				actions: [{
					'label': 'Ok',
					'autoClose': true
				}]
			});
		}
		var formaPagto = $("#sFormaPagamento___"+indexTbFornec).val();
		var condPagto = $("#txtCodFormaPagamentoProtheus___"+indexTbFornec).val();
		var tpFrete = $("#sModalidadeFrete___"+indexTbFornec).val();
		var vlrFrete = $("#vlrFrete___"+indexTbFornec).maskMoney('unmasked')[0];
		var contato = removeDiacritics($.trim(alimentaContatoFornPedido(ds_fornecedor.values[0].CODIGO)));
		var dadosBancarios = {
				'descFornecedor':ds_fornecedor.values[0].DESCRICAO,
				'codFornecedor':ds_fornecedor.values[0].CODIGO,
				'loja':loja,
				'banco':banco,
				'agencia':agencia,
				'conta':conta,
				'dvconta':dvconta,
				'formaPagto':formaPagto,
				'condPagto':condPagto,
				'tpFrete':tpFrete,
				'vlrFrete':vlrFrete,
				'contato':contato
		}
		if(arrFornecedoresVencedores.length > 0){
			for (var i = 0; i < arrFornecedoresVencedores.length; i++) {
				if(arrFornecedoresVencedores[i].codFornecedor == ds_fornecedor.values[0].CODIGO){
					break
				} else if(i+1 == arrFornecedoresVencedores.length) {
					arrFornecedoresVencedores.push(dadosBancarios)
					$('#dadosBancariosFornecedor').val(JSON.stringify(arrFornecedoresVencedores));
				}
			}
		} else {
			arrFornecedoresVencedores.push(dadosBancarios)
			$('#dadosBancariosFornecedor').val(JSON.stringify(arrFornecedoresVencedores));
		}
	} else {
		FLUIGC.modal({
			title: 'Atenção',
			content:'O fornecedor vencedor da cotação não foi encontrado no Protheus, entre em contato com a Central de Cadastros',
			actions: [{
				'label': 'Ok',
				'autoClose': true
			}]
		});

		var dadosBancarios = {'erro':true};
		arrFornecedoresVencedores.push(dadosBancarios)
		$('#dadosBancariosFornecedor').val(JSON.stringify(arrFornecedoresVencedores));
	}
}

function validaFornecedoresEmCotacao(){
	var dadosBancarios = JSON.parse($("#dadosBancariosFornecedor").val());
	var fornecedoresEncontrados = [];
	for(var i in dadosBancarios){
		$('input[name^=vencedoraCotacao___]:checked').each(function(){
			var index = $(this).prop("name").split("___")[1];
	        if($("#codFornecedorCotacao___"+index).val() == dadosBancarios[i].codFornecedor){
	        	if(fornecedoresEncontrados.some(function(fornecedor){return fornecedor.codFornecedor == dadosBancarios[i].codFornecedor;}) == false){
	        		fornecedoresEncontrados.push(dadosBancarios[i]);
	        	}
	        }
		});
	}
	$("#dadosBancariosFornecedor").val(JSON.stringify(fornecedoresEncontrados));
}

function buscaFornecedoresProtheusEmissaoPedido(callbackFunction){
	var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
	if(tipoCotacao == "aberta"){
		var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
		var unidade = $("[name=filial_protheus]").val();
		// Informa a tabela
		fornecedorDataSet.setCampo("SA2");
		var queryFornecedores = "";
		$("#tbCotacoes tbody tr:gt(0):has(:checkbox:checked)").each(function(){
			var cnpjQuery = retiraCaracteresCNPJ($(this).find("[name^=cnpjFornCotacao___]").val());
			if(queryFornecedores == ""){
				queryFornecedores = "A2_CGC = '" + cnpjQuery+"'";
			}else {
				if(queryFornecedores.indexOf(cnpjQuery) == -1){
					queryFornecedores = queryFornecedores + " OR A2_CGC = '" + cnpjQuery+"'";
				}
			}
		});
		// Informar o filtro no where
		fornecedorDataSet.setCampo(queryFornecedores);
		// Informa as colunas da query
		fornecedorDataSet.setCampo("A2_COD,A2_NOME,A2_CGC,A2_LOJA");
		fornecedorDataSet.filtrarBusca();
		var dadosFornecedor = fornecedorDataSet.getDados();
		if(dadosFornecedor.values[0].ERRO == undefined){
			$("#tbCotacoes tbody tr:gt(0):has(:checkbox:checked)").each(function(){
				for ( var pos in dadosFornecedor.values) {
					var dados = dadosFornecedor.values[pos];
					var cnpjProtheus  = retiraCaracteresCNPJ(dados.A2_CGC);
					var cnpj = retiraCaracteresCNPJ($(this).find("[name^=cnpjFornCotacao___]").val());
					if(cnpj == cnpjProtheus){
						$(this).find("[name^=codFornecedorCotacao___]").val(dados.A2_COD);
					}
				}
			});
			$("#tbFornecs tbody tr:gt(0)").each(function(){
				for ( var pos in dadosFornecedor.values) {
					var dados = dadosFornecedor.values[pos];
					var cnpjProtheus  = retiraCaracteresCNPJ(dados.A2_CGC);
					var cnpj = retiraCaracteresCNPJ($(this).find("[name^=txtCnpjFornecCotacao___]").val());
					if(cnpj == cnpjProtheus){
						$(this).find("[name^=txtCodFornecCotacao___]").val(dados.A2_COD);
						$(this).find("[name^=txtLojaFornecCotacao___]").val(dados.A2_LOJA);
					}
				}
			});
		}
	}
	callbackFunction();
}

function buscaIndicePaiFilho(campo){
	var nomeCampo = $(campo).prop("name");
	if( $(campo).prop("disabled") == true){
		nomeCampo = nomeCampo.replace("_d","");
	}
	var indice = nomeCampo.substring(nomeCampo.lastIndexOf("_")+1, (nomeCampo+"").length);
	return indice;
}

function preencheIdentificadorEntrega() {
	var texto = '';
	texto = $('#nmFilialEntrega option:selected').text();
	$('#hiddenFilialEntrega').val(texto);
}

function formataCodigoItem(codigo){
	while((codigo+"").length <6){
		codigo = "0" + codigo;
	}
	return codigo;
}

function carregaFornecedoresCotacao(){
	var linhasTabelaFornecedores = $("#tbFornecs tbody tr:gt(0)");
	var arrayFornecedores = new Array();
	if(linhasTabelaFornecedores.length > 0){
		$(linhasTabelaFornecedores).each(function(){
			var objFornecedor = {
					razaoSocial : $(this).find("input[name^='txtNomeFornecCotacao']").val(),
					cnpj : $(this).find("input[name^='txtCnpjFornecCotacao']").val()
			};
			arrayFornecedores.push(objFornecedor);
		});
	}
	populaFornecedoresPaiFilho(arrayFornecedores);
}

function populaFornecedoresPaiFilho(arrayFornecedores){
	$(arrayFornecedores).each(function(){
		if(fornecedores[$(this).prop("cnpj")] == undefined ){
			fornecedores[$(this).prop("cnpj")] = { cnpj: $(this).prop("cnpj"), razaoSocial: $(this).prop("razaoSocial") };
			var index = wdkAddChild('tbFornecs');
			setZooms();
			$("#txtNomeFornecCotacao___"+index).val($(this).prop("razaoSocial"));
			$("#txtCnpjFornecCotacao___"+index).val($(this).prop("cnpj"));
			//sandro 21/05
			var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
			console.log("popula fornecs tipoCotacao = " + tipoCotacao);
			if(tipoCotacao == "aberta"){
				$("#txtCodFormaPagamentoBionexo___"+index).val($(this).prop("idFormaPagamento"));
				$("#txtCodFormaPagamentoProtheus___"+index).val($(this).prop("idFormaPagamentoProtheus"));
				$("#txtNomeFormaPagamentoBionexo___"+index).val($(this).prop("nmFormaPagamento"));
				$("#txtNomeFormaPagamentoBionexo___"+index).val($(this).prop("nmFormaPagamento"));
				var modFrete = $(this).prop("frete");
				if(modFrete == "CIF"){
					$("#sModalidadeFrete___"+index).val("C");
				}else if(modFrete == "FOB"){
					$("#sModalidadeFrete___"+index).val("F");
				}else{
					$("#sModalidadeFrete___"+index).val("");
				}
				var cnpjFornecBio = $(this).prop("cnpj");
				console.log("cnpjFornecBio = " + cnpjFornecBio);
				gravaDadosRelatFornecBionexo(cnpjFornecBio,index);
			}
			alimentaDadosComplementaresFornecedores(index);
			setChangeFornecedor(index);
		}
		if(fornecedoresVencedores[$(this).prop("cnpj")] == undefined && $(this).prop("selecionado") == "true"){
			fornecedoresVencedores[$(this).prop("cnpj")] = { cnpj: $(this).prop("cnpj"), razaoSocial: $(this).prop("razaoSocial") };
		}
	});
}



function adicionaMarcadorLinhaSelecionadaTabela(tabela){
	/*
	 * if(CURRENT_STATE != INICIO &&
			CURRENT_STATE != INICIO_1 &&
			CURRENT_STATE != CORRECAO_SOLICITACAO &&
			CURRENT_STATE != GERA_COTACAO_ ){
	 */
	if(CURRENT_STATE != INICIO &&
			CURRENT_STATE != INICIO_1 &&
			CURRENT_STATE != CORRIGIR_SOLICITACAO &&
			CURRENT_STATE != GERAR_COTACAO_FORNECEDOR ){

		var td = $('#tbItens tbody tr td [name^=txtObsProduto___]');
		td.on('click', function(){
			observacaoClicado = true;
		});
		var td2 = $('#tbFornecs tbody tr td [name^=txtNomeFormaPagamentoBionexo___]');
		td2.on('click', function(){
			observacaoFornecClicado = true;
		});
		var td3 = $("#tbFornecs tbody tr td [name^=sModalidadeFrete___]");
		td3.on('click', function(){
			observacaoFornecClicado = true;
		});
		var td4 = $("#tbFornecs tbody tr td [name^=vlrFrete___]");
		td4.on('click', function(){
			observacaoFornecClicado = true;
		});
		var td5 = $("#tbFornecs tbody tr td [name^=prazoFornec___]");
		td5.on('click', function(){
			observacaoFornecClicado = true;
		});
		var td6 = $("#tbFornecs tbody tr td [id=btZoomFormaPagamento]");
		td6.on('click', function(){
			observacaoFornecClicado = true;
		});
		/*$(document).on('click', '#tbItens tbody tr td [name^=txtObsProduto___]', function(){
			observacaoClicado = true;
			});*/

		var tr = $('#'+tabela+' tbody tr');
		tr.unbind("click");
		tr.on('click', function () {
			if(!observacaoClicado){



				tr.not(this).removeClass('linhaSelecionada');
				if(!observacaoFornecClicado){
					$(this).toggleClass('linhaSelecionada');
				}
				if(tabela == "tbItens"){
					$("#cotacoes").removeClass("hidden");
					$("#cotacoes").addClass("active");
					$(".modal").show();

					mostraAbaCotacoes();

					var abaAtiva = $("ul#tabFornecCot li.active").find('a').attr('href');
					if(tr.hasClass('linhaSelecionada')){
						filtraTabelaCotacao($(this));
						if(abaAtiva == '#cotacoes'){
							mostraObjeto('cotacoes', true)
						}
					}else{
						mostraObjeto('cotacoes', false);
					}
					mostrarJustificativaCotacao($(this));
				}else if(tabela == "tbFornecs"){
					if(!observacaoFornecClicado){
						$(".modalFornec").show();
						calculaTotalCotacoesPorFornecedor($(this));
						alimentarInfoFornece($(this));
					}else{
						observacaoFornecClicado = false;
					}
				}
			}else{
				observacaoClicado = false;
			}
		});


	}
}



$(document).on('click', '#tbItens .btn-ModalPedido', function(){
	$(this).parent().parent().parent().tr.not(this).removeClass('linhaSelecionada');
	$(this).parent().parent().toggleClass('linhaSelecionada');
	if(tabela == "tbItens"){
		$("#cotacoes").removeClass("hidden");
		$("#cotacoes").addClass("active");
		$(".modal").show();
		var tr = $(this).parent().parent();
		mostraAbaCotacoes();

		var abaAtiva = $("ul#tabFornecCot li.active").find('a').attr('href');
		if(tr.hasClass('linhaSelecionada')){
			filtraTabelaCotacao($(this));
			if(abaAtiva == '#cotacoes'){
				mostraObjeto('cotacoes', true)
			}
		}else{
			mostraObjeto('cotacoes', false);
		}
		mostrarJustificativaCotacao($(this));
	}else if(tabela == "tbFornecs"){
		calculaTotalCotacoesPorFornecedor($(this));
		alimentarInfoFornece($(this));
	}

});

$(document).on('click', '#tbFornecs .btn-InfoFornec', function(){
	//$(this).parent().parent().parent().tr.not(this).removeClass('linhaSelecionada');
	//$(this).parent().parent().toggleClass('linhaSelecionada');


		calculaTotalCotacoesPorFornecedor($(this).parent().parent());
		alimentarInfoFornece($(this).parent().parent());
		if($(this).parent().parent().hasClass("linhaSelecionada")){
			//$("#tabInfoFornecedores").trigger("click");
			$(".modalFornec").show();
		}

});

function adicionaMarcadorLinhaSelecionadaProduto(tr){
	var produtoSelecionado = $.trim($(tr).find("[name^=codItemCotacao___]").val());
	var linhasComProduto = $('#tbCotacoes tbody tr:gt(0):has(td input[value^='+produtoSelecionado+'])');
	var indiceSelecionado = buscaIndicePaiFilho($(tr).find("[name]")[0]);
	$(linhasComProduto).each(function(){
		var indice = buscaIndicePaiFilho($(this).find("[name]")[0]);
		if(indice == indiceSelecionado && $(this).find(":checkbox:checked").length > 0){
			$(this).toggleClass('linhaSelecionada');
			$(this).find(":text").removeClass("readonly").addClass("readonlySelected");
			$(this).find("td").removeClass("readonly").addClass("readonlySelected");
		}else{
			$(this).removeClass('linhaSelecionada');
			$(this).find(":text").removeClass("readonlySelected").addClass("readonly");
			$(this).find("td").removeClass("readonlySelected").addClass("readonly");
		}
	});
}

function calculaTotalCotacoesPorFornecedor(linhaFornecedor){
	var codFornecedor = $(linhaFornecedor).find("[name^=txtCodFornecCotacao]").val();
	var selecionado = $(linhaFornecedor).hasClass("linhaSelecionada");
	var valorFrete = $(linhaFornecedor).find("[name^=vlrFrete___]").maskMoney('unmasked')[0];
	var totalItens = 0;
	var totalOutrasDespesas = 0;
	var totalFrete = 0;
	var totalIPI = 0;
	var total = 0;
	var totalItem = 0;
	var cotacoesSelecionadas = $("#tbCotacoes tbody tr:gt(0)").find(":checkbox:checked");
	var arrayFornecs = [];
	totalFrete += valorFrete;
	if(selecionado){
		$(cotacoesSelecionadas).each(function(){
			var fornec = getClosestByElement($(this),"tr").find("[name^=codFornecedorCotacao___]").val();
			if(codFornecedor == fornec){
				var indice = buscaIndicePaiFilho($(this));
				var quantidade = parseInt($("[name=qtdeItemCotacao___"+indice+"]").val());
				var valorUnitario = $("[name=vlrUnitItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
				var valorOutrasDespesas = $("[name=outrasDespItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
				var valorIPI = $("[name=vlrIpiItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
				totalItens = totalItens + (valorUnitario * quantidade);
				totalOutrasDespesas += valorOutrasDespesas;
				totalIPI += valorIPI;
				totalItem += (valorUnitario * quantidade);
			}
		});
	}else{
		calculaTotalCotacoes();
	}
	total = totalItem + (totalIPI + totalFrete + totalOutrasDespesas);
	var totalFinal = total.toFixed(2);
	var totalFinalItens = totalItem.toFixed(2);
	var campoValorTotalFornec = $(linhaFornecedor).find("[name^=valorTotalFornec___]");
	$(campoValorTotalFornec).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$(campoValorTotalFornec).maskMoney('mask', parseFloat(totalFinal+""));
	$("#txtTotValMercadoria").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValDespesas").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValCotacao").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValFrete").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValIPI").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValMercadoria").maskMoney('mask', parseFloat(totalFinalItens+"")); // .val(converteFloatMoeda(totalFinalItens));
	$("#txtTotValDespesas").maskMoney('mask', parseFloat(totalOutrasDespesas+"")); //.val(converteFloatMoeda(totalOutrasDespesas));
	$("#txtTotValCotacao").maskMoney('mask', parseFloat(totalFinal+"")); //.val(converteFloatMoeda(totalFinal));
	$("#txtTotValFrete").maskMoney('mask', parseFloat(totalFrete+"")); //.val(converteFloatMoeda(totalFrete));
	$("#txtTotValIPI").maskMoney('mask', parseFloat(totalIPI+"")); //.val(converteFloatMoeda(totalIPI));
}

function filtraTabelaCotacao(linhaItem){
	var codigoItem = linhaItem.find("[name^=txtCodItemProduto___]").val();
	var sequencialItem = linhaItem.find("[name^=txtSeqItemProduto___]").val();
	var linhasCotacao = $('#tbCotacoes tbody tr:gt(0)');
	linhasCotacao.each(function(){
		var codigoItemCotacao = $(this).find("[name^=codItemCotacao___]").val();
		var codigoSequencialCotacao = $(this).find("[name^=SeqItemCotacao___]").val();
		if($.trim(codigoItem) == $.trim(codigoItemCotacao)){
			$(this).show();
			if($(this).find(":checkbox:checked").length > 0){
				if(validaLinhaMenorPreco($(this).find(":checkbox:checked"))){
					$("#txtJustificacaoCotacao").val("");
					disableInputElement($("#txtJustificacaoCotacao"));
				}else{
					var indice = buscaIndicePaiFilho($(this).find(":checkbox:checked"));
					var textJustificativa = $("[name=JustificativaItemCotacao___"+indice+"]").val();
					$("#txtJustificacaoCotacao").val(textJustificativa);
					$("#txtJustificacaoCotacao").unbind("blur");
					$("#txtJustificacaoCotacao").bind("blur",function(){
						$("[name=JustificativaItemCotacao___"+indice+"]").val($("#txtJustificacaoCotacao").val());
					});
					enableInputElement($("#txtJustificacaoCotacao"));
				}
			}
		}else{
			$(this).hide();
		}
	});
}

function montaDataTableItensFornecedor(){
	var tabela = $('#tbFornecs')
	var linhaSelecionada = $('#tbFornecs tbody tr.linhaSelecionada');
	itensFiltradosJSON = new Array();
	if(linhaSelecionada.length > 0){
		var cnpj = linhaSelecionada.find("input[name^='txtCnpjFornecCotacao']").val();
		var itensFiltrados = new Array();
		$(itensBionexo).each(function(){
			if($(this).prop("cnpj") == cnpj){
				itensFiltrados.push($(this)[0]);
			}
		});
		itensFiltradosJSON= JSON.stringify(itensFiltrados);

	}else{
		itensFiltradosJSON = JSON.stringify(itensBionexo);
	}
}

function criaDataTableItens(data){
	var template = "";
	var cabecalhoTabela;
	/*if(CURRENT_STATE == "4"){
		template = ".templateCotacoesItensSemVencedora";
		cabecalhoTabela = [
		                   {'title' : 'Cód. Fornecedor'},
		                   {'title' : 'Descrição Fornecedor'},
		                   {'title' : 'Fabricante'},
		                   {'title' : 'Validade <br>da cotação'},
		                   {'title' : 'Qtd. '},
		                   {'title' : 'Uni. <br>Medida '},
		                   {'title' : 'Valor <br>Unitário '},
		                   {'title' : 'Outras <br>Despesas '},
		                   {'title' : 'Valor <br>Total '},
		                   {'title' : 'Prazo<br>(dias) '},
		                   {'title' : 'Cond. de <br>Pagamento '}
		                   ];
	}else{*/
		template = ".templateCotacoesItens";
		cabecalhoTabela = [
		                   {'title' : 'Vencedora'},
		                   {'title' : 'Cód. Fornecedor'},
		                   {'title' : 'Descrição Fornecedor'},
		                   {'title' : 'Fabricante'},
		                   {'title' : 'Validade <br>da cotação'},
		                   {'title' : 'Qtd. '},
		                   {'title' : 'Uni. <br>Medida '},
		                   {'title' : 'Valor <br>Unitário '},
		                   {'title' : 'Outras <br>Despesas '},
		                   {'title' : 'Valor <br>Total '},
		                   {'title' : 'Prazo<br>(dias) '},
		                   {'title' : 'Cond. de <br>Pagamento '}
		                   ];
	//}
	/*if(CURRENT_STATE == "14"){
		template = ".templateItensAglu";
		cabecalhoTabela = [
		                   {'title': 'Solicitacao'},
		                   {'title': 'Prioridade'},
		                   {'title': 'Item da SC'},
		                   {'title': 'Produto'},
		                   {'title': 'Descrição'},
		                   {'title': 'Uni. Medida'},
		                   {'title': 'Quantidade'},
		                   {'title': 'Saldo'},
		                   {'title': 'Consumo Medio'},
		                   {'title': 'Necessidade'},
		                   {'title': 'Armazém'},
		                   {'title': 'Prazo Item'},
		                   {'title': 'Observação'},
		                   {'title': 'Fabricante'},
		                   {'title': 'Centro de Custo'},
		                   {'title': 'Conta Contábil'}
		                   ];
		tabelaItensAglu = FLUIGC.datatable('#dataTableItensAglutinados', {
			dataRequest: data,
			renderContent: template,
			header: cabecalhoTabela,
			search: {
				enabled: false
			},
			navButtons: {
				enabled: false,
			},
			classSelected: 'table-bordered',
			emptyMessage: '<div class="Não existem registros de cotação para este item.</div>'
		}, function(err, data) {
			// DO SOMETHING (error or success)
		});
	}*/
	tabelaCotacaoItens = FLUIGC.datatable('#cotacoesAbertas', {
		dataRequest: data,
		renderContent: template,
		header: cabecalhoTabela,
		search: {
			enabled: false
		},
		navButtons: {
			enabled: false,
		},
		classSelected: 'table-bordered',
		emptyMessage: '<div class="Não existem registros de cotação para este item.</div>'
	}, function(err, data) {
		// DO SOMETHING (error or success)
	});
}

function atualizaTabelaItens(valores){
	var valoresJSON = jQuery.parseJSON(valores);
	tabelaCotacaoItens.reload(valoresJSON,".templateCotacoesItens");
}

function limpaTabelaPaiFilho(tabela){
	var linhasTabelaItens = $("#"+tabela+" tbody tr:gt(0)");
	$(linhasTabelaItens).each(function(){
		var img = $(this).find("img");
		fnWdkRemoveChild(img[0]);
	});
	if(tabela == "tbItens" ){
		var index = wdkAddChild(tabela);
		setZooms();
		alimentaDadosComplementaresItem(index);
	}else if((tabela == "tbFornecs" && $("#retornouPDC").val()) == "false"){
		var index = wdkAddChild(tabela);
		setZooms();
		alimentaDadosComplementaresFornecedores(index);
	}
}

function selecaoTipoCotacao(){
	var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
	if(tipoCotacao != null && tipoCotacao != undefined){
		mostraObjeto("tabelaFornecedores",true);
		if(tipoCotacao == "tabela"){
			mostraObjeto("divAddFornecedor",true);
			mostraObjeto("divEnviarBionexo",false);
			mostraObjeto("divReceberBionexo",false);
			mostraObjeto("divPDCCriado",false);
			mostraObjeto("cotacoesFechadas",true);
			mostraObjeto("tbFornecs", true);
			if( String($("#retornouPDC").val()) == "true"){
				limpaTabelaPaiFilho("tbFornecs");
				$("#retornouPDC").val("false");
			}
			redimensionaTabelaFornecedoresBionexo();
		}else if(tipoCotacao == "aberta"){
			mostraObjeto("divAddFornecedor",false);
			mostraObjeto("divEnviarBionexo",true);
			mostraObjeto("divPDCCriado",true);
			mostraObjeto("cotacoesFechadas",true);
			mostraObjeto("tbFornecs", true);
			redimensionaTabelaFornecedoresBionexo();
			if(itensBionexo != null && itensBionexo != undefined){
				fornecedores = {};
				populaFornecedoresPaiFilho(itensBionexo);
				if( String($("#retornouPDC").val()) == "false" ){
					$("#retornouPDC").val("true");
				}
			}
			//removida  || CURRENT_STATE == COTACAO
			if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR || CURRENT_STATE == COTACAO){
				mostraObjeto("tbFornecs", false);
			}
			//if(CURRENT_STATE != "0" && CURRENT_STATE != "1" && CURRENT_STATE != "14" && CURRENT_STATE != "2"){
			if(CURRENT_STATE != "0" && CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != GERAR_COTACAO_FORNECEDOR){
				mostraObjeto("divReceberBionexo",true);
			}
		}else if(tipoCotacao == "fechada"){
			mostraObjeto("divAddFornecedor",true);
			mostraObjeto("divEnviarBionexo",false);
			mostraObjeto("divReceberBionexo",false);
			mostraObjeto("divPDCCriado",false);
			mostraObjeto("cotacoesFechadas",true);
			mostraObjeto("tbFornecs", true);
			if( String($("#retornouPDC").val()) == "true"){
				limpaTabelaPaiFilho("tbFornecs");
				$("#retornouPDC").val("false");
			}
			redimensionaTabelaFornecedoresBionexo();
		}
		if(CURRENT_STATE == COTACAO){ //GERA_COTACAO_
			$("#tbFornecs img").hide();
			mostraObjeto("divAddFornecedor", false);
			$("span.zoomFornec").hide();
		}else if(CURRENT_STATE != GERAR_COTACAO_FORNECEDOR){
			$("#tbFornecs img").addClass("hidden");
			$("#tbFornecs img").removeClass("show");
			mostraObjeto("divAddFornecedor", false);
			$("#tbFornecs span").addClass("hidden");
			$("#tbFornecs span").removeClass("show");
		}
		redimensionaTabelaCotacoesBionexo();
	}
}

function mostraObjeto(objetoParametro, mostra){
	var objeto;
	if(typeof(objetoParametro) === 'string' || objetoParametro instanceof String){
		objeto = $("#"+objetoParametro)
	}else{
		objeto = objetoParametro;
	}
	if(mostra){
		if(objeto.hasClass("hidden"))
			objeto.removeClass("hidden");
		objeto.addClass("show");
	}else{
		if(objeto.hasClass("show"))
			objeto.removeClass("show");
		objeto.addClass("hidden");
	}
}

function adicionaLinhasIniciaisTabela(){
	if($("#tbItens tbody tr:gt(0)").length == 0){
		var index = wdkAddChild('tbItens');
		setZooms();
		MaskEvent.init(); //Atualiza os campos com 'mask'
		alimentaDadosComplementaresItem(index);
	}
	/*if (CURRENT_STATE==14) {
		if($("#tbSolicAglutinadas tbody tr:gt(0)").length == 0){
			var index = wdkAddChild('tbSolicAglutinadas');
			setHandlerChange(index);
		}
	}*/
	if($("#tbFornecs tbody tr:gt(0)").length == 0){
		var index = wdkAddChild('tbFornecs');
		setZooms();
		alimentaDadosComplementaresFornecedores(index);
		setChangeFornecedor(index);
		$("#txtCodFornecCotacao___"+ index).css('width', '100%');
	}
}

function desvincularItens(){
	var radiosSelecionados = $("#tbItens tbody tr:gt(0)").find(":checkbox:checked");
	if(radiosSelecionados.length == 0){
		FLUIGC.message.alert({
				message: "Não foi selecionado nenhum item para desvincular",
				title: 'Desvincular Itens',
				label: 'OK'
			});
	}else{
		mostraObjeto("cotacoes", false);
		$(radiosSelecionados).each(function(){
			$linhaSelecionada = $("#"+$(this).prop("id")).parent().parent();
			var codItem = $linhaSelecionada.find("[name^=txtCodItemProduto___]").val();
			var existePedidoItem = false;
			var pedidosSelecionados = $('#tbPedidosGerados tbody tr:gt(0)');
			$(pedidosSelecionados).each(function(){
				var codItemPedidoGerado = $(this).find("[name^=produtoPedGerado___]").val();
				if($.trim(codItemPedidoGerado) ==  $.trim(codItem)){
					existePedidoItem = true;
				}
			});
			if(existePedidoItem){
					FLUIGC.message.alert({
						message: 'Erro ao desvincular item. Este item já está associado a um pedido de compras. Exclua o pedido para desvincular o item!',
						title: 'Solicitação de Compras',
						label: 'OK'
					});
			}else{
				var index = wdkAddChild('tbItensDesvinculados');
				setZooms();
				var select = $linhaSelecionada.find("select");
				$("#sPrioridadeProdutoDesv___"+index).prop('selectedIndex', $(select).prop('selectedIndex'));
				disableSelect($("#sPrioridadeProdutoDesv___"+index));
				$("[name^=sPrioridadeProdutoDesv___"+index+"]").val($linhaSelecionada.find("[name^=sPrioridadeProduto___]").val());
				var inputs = $linhaSelecionada.find(":text");
				$(inputs).each(function(){
					var name = $(this).prop("name");
					var prefixo = name.substring(0,name.indexOf("_"));
					$("#"+prefixo+"Desv___"+index).val($(this).val());
				});
				var img = $linhaSelecionada.find("img");
				fnWdkRemoveChild(img[0]);
			}
		});
	}
}

function vincularItens(){
	var radiosSelecionados = $("#tbItensDesvinculados tbody tr:gt(0)").find(":checkbox:checked");
	if(radiosSelecionados.length == 0){
			FLUIGC.message.alert({
				message: "Não foi selecionado nenhum item para vincular",
				title: 'Vincular Itens',
				label: 'OK'
			});
	}else{
		$(radiosSelecionados).each(function(){
			var index = wdkAddChild('tbItens');
			setZooms();
			MaskEvent.init(); //Atualiza os campos com 'mask'
			alimentaDadosComplementaresItem(index);
			$linhaSelecionada = $("#"+$(this).prop("id")).parent().parent();
			var select = $linhaSelecionada.find("select");
			$("#sPrioridadeProduto___"+index).prop('selectedIndex', $(select).prop('selectedIndex'));
			$("[name^=sPrioridadeProduto___"+index+"]").val($(select).val());
			$("[name^=sPrioridadeProduto_d___"+index+"]").val($(select).val());
			var inputs = $linhaSelecionada.find(":text");
			$(inputs).each(function(){
				var name = $(this).prop("name");
				var prefixo = name.substring(0,name.indexOf("Desv___"));
				$("#"+prefixo+"___"+index).val($(this).val());
			});
			var img = $linhaSelecionada.find("img");
			fnWdkRemoveChild(img[0]);
			adicionaMarcadorLinhaSelecionadaTabela('tbItens');
		});
		organizaSequenciaItens();
	}
}

function ordenaTabelaItens(indice){
	var sequenciaSelecionada = $("#txtSeqItemProduto___"+indice);
	var linhaSelecionada = sequenciaSelecionada.parent().parent();
	var sequencias = $("#tbItens tbody tr:gt(0)").find(":text[name^='txtSeqItemProduto___']");
	$(sequencias).each(function(index) {
		if(parseInt(sequenciaSelecionada.val()) < parseInt($(this).val())){
			$("#tbItens tbody tr:eq("+index+")").prepend($(linhaSelecionada));
			var img = $(linhaSelecionada).find("img");
			fnWdkRemoveChild(img[0]);
			return false;
		}
	});
}

function buscaSequenciaItens(tabela){
	var valorCampo = "";
	var sequencia = "";
	var indiceUltimaLinha = ($("#"+tabela+" tbody tr").length) -2;
	if(indiceUltimaLinha > 0){
		var campo = $("#"+tabela+" tbody tr:eq("+indiceUltimaLinha+")").find("[name^=txtSeqItemProduto___]");
		valorCampo  = $(campo).val();
	}
	if(valorCampo == "")
		sequencia = "1";
	else
		sequencia = parseInt(valorCampo) + 1;
	return sequencia;
}

function carregarDivsIniciais() {
	//if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRECAO_SOLICITACAO){
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRIGIR_SOLICITACAO){
		mostraObjeto("divSolicitacao", true);
		mostraObjeto("divNrProtheus", true);
		mostraObjeto("tabAglutinacaoSolic", true);
		mostraObjeto("tabAglutinacaoItensSolic", true);
		mostraObjeto("divBtnAddItens", false);
	}
	//if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRECAO_SOLICITACAO && CURRENT_STATE != ANALISE_COMPRADOR){
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRIGIR_SOLICITACAO && CURRENT_STATE != VALIDAR_PROPOSTA){
		mostraObjeto("divContratoImportado", true);
		mostraObjeto("divImportado", true);
		//mostraObjeto("divValidadeCotacao", true);
		//mostraObjeto("divHoraValidadeCotacao", true);
		mostraObjeto("divSolicitacoesAglutinadas", true);
		mostraObjeto("fornecCotacoes", true);
	}
	if(CURRENT_STATE == VALIDAR_PROPOSTA || CURRENT_STATE == CORRIGIR_SOLICITACAO || CURRENT_STATE == VALIDAR_DOCUMENTACAO_TECNICA){
		mostraObjeto("holdingObrasEFacilities", true);
		if(CURRENT_STATE == VALIDAR_PROPOSTA &&
		   $('input[name=aprovado]:checked').val() != undefined &&
		   $('input[name=aprovado]:checked').val() != null &&
		   $('input[name=aprovado]:checked').val() != ""){
			mostraObjeto("gestorHoldingObrasFacilities", true);
			$("input[name=aprovado]").prop("disabled",true);
			$("#parecerAprovacao").prop("disabled",true);
		}
		if(CURRENT_STATE == CORRIGIR_SOLICITACAO || CURRENT_STATE == VALIDAR_DOCUMENTACAO_TECNICA){
			$("input[name=validado]").prop("disabled",true);
			$("#parecerDaValidacao").prop("disabled",true);
			if(CURRENT_STATE == VALIDAR_DOCUMENTACAO_TECNICA){
				mostraObjeto("gestorHoldingObrasFacilities", true);
			}
		}
	}
	//if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRECAO_SOLICITACAO && CURRENT_STATE != ANALISE_COMPRADOR && CURRENT_STATE != GERA_COTACAO_){
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRIGIR_SOLICITACAO && CURRENT_STATE != GERAR_COTACAO_FORNECEDOR){
		mostraAbaCotacoes();
		//mostraObjeto("tabInfFornec", true);
	}
	//if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRECAO_SOLICITACAO && CURRENT_STATE != ANALISE_COMPRADOR && CURRENT_STATE != GERA_COTACAO_ && CURRENT_STATE != COTACAO){
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRIGIR_SOLICITACAO && CURRENT_STATE != GERAR_COTACAO_FORNECEDOR && CURRENT_STATE != COTACAO){
		mostraObjeto("divContratoImportado", true);
		mostraObjeto("divContrato", true);
		mostraObjeto("tabTotais", true);
		$("#btRecebeCotacaoBionexo").prop("disabled",true);
		$("#btRecebeCotacaoBionexo").unbind("click" );
		$("#btRecebeCotacaoBionexo").off();
		$("#btRecebeCotacaoBionexo").addClass("disabledBtnPrimary")
	}

	/*if(CURRENT_STATE != INICIO &&
			CURRENT_STATE != INICIO_1 &&
			CURRENT_STATE != CORRECAO_SOLICITACAO &&
			CURRENT_STATE != ANALISE_COMPRADOR &&
			CURRENT_STATE != GERA_COTACAO_ &&
			CURRENT_STATE != COTACAO &&
			CURRENT_STATE != DEFINIR_VENCEDOR){*/
	if(CURRENT_STATE != INICIO &&
			CURRENT_STATE != INICIO_1 &&
			CURRENT_STATE != CORRIGIR_SOLICITACAO &&
			CURRENT_STATE != GERAR_COTACAO_FORNECEDOR &&
			CURRENT_STATE != COTACAO &&
			CURRENT_STATE != DEFINIR_VENCEDOR){
		mostraObjeto("tabContratos", true);
	}
	if(CURRENT_STATE == DEFINIR_VENCEDOR){
		disableInputElement($("#txtJustificacaoCotacao"));
		mostraObjeto("tabItensDesvinculados", true);
		mostraObjeto("divDesvincularItens", true);
		var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
		definirCotacaoVencedora();
		calculaTotalCotacoes();
		escondeCotacaoTabChange();
		$("#tbItens tbody tr td :checkbox").removeClass("hidden");
	}
	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA){
		var eContrato = $('input[name=rdContrato]:checked').val();
		if(eContrato == "sim"){
			mostrarAbaUltimaAprovacaoAlcada();
		}

		mostraObjeto("tabPedidosGerados", true);
		mostraObjeto("tabItensDesvinculados", true);
		$("#tbItens tbody tr td :checkbox").removeClass("hidden");
		mostraObjeto("divDesvincularItens", true);
		mostraObjeto("divBotoesPedido", true);
		mostraObjeto("divBotaoEnviarEmailPedido", true);
		escondeCotacaoTabChange();
		//Preenche a tabela com o pedido gerado automaticamente na ultima atividade
		preencheTabelaPedidos();
	}
	if(CURRENT_STATE == ANEXAR_MINUTA_PARA_VALIDACAO || CURRENT_STATE == VALIDAR_MINUTA || CURRENT_STATE == CORRIGIR_MINUTA || CURRENT_STATE == RECOLHER_ASSINATURA_DIGITALIZAR_CONTRATO
		|| CURRENT_STATE == GERAR_CONTRATO_PROTHEUS || CURRENT_STATE == APROVACAO_DO_SOLICITANTE || CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		mostrarAbaUltimaAprovacaoAlcada();
		habilitaParecerContrato();
		$("#divDocumentacaoContrato").show();

		var indice = $("#contadorAlcada").val();

		mostraObjeto("tabAprovacao"+indice, false);
	}
	//if(CURRENT_STATE == VALIDAR_MINUTA || CURRENT_STATE == AJUSTAR_DIVIRGENCIA){
	if(CURRENT_STATE == VALIDAR_MINUTA){
		//mostrarAbaUltimaAprovacaoAlcada();
		mostraObjeto("aprovacoesContrato", true);
		$("#rdAcordoEntreAsPartesSim").parent().parent().hide();
		$("#txtDivergenciaEntreAsPartes").parent().parent().hide();
	}
	if(CURRENT_STATE == CORRIGIR_MINUTA){
		//mostrarAbaUltimaAprovacaoAlcada();
		mostraObjeto("aprovacoesContrato", true);
	}
	if(CURRENT_STATE == RECOLHER_ASSINATURA_DIGITALIZAR_CONTRATO){
		mostraObjeto("aprovacoesContrato", true);
	}
	if(CURRENT_STATE == GERAR_CONTRATO_PROTHEUS){
		mostraObjeto("aprovacoesContrato", true);
	}
	if(CURRENT_STATE == APROVACAO_DO_SOLICITANTE){
		var eContrato = $('input[name=rdContrato]:checked').val();
		if(eContrato == "sim"){
			mostraObjeto("aprovacoesContrato", true);

		}
		$("#aprovacaoSolicitante").show();
	}
	if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		mostraObjeto("aprovacoesContrato", true);
		$("#aprovacaoSolicitante").show();
	}
	if(CURRENT_STATE == COTACAO){
		mostraObjeto("divJustificativa", false);
		mostraObjeto("divBotoesCotacao", true);
		carregaTabelaCotacoes();
		escondeCotacaoTabChange();
		var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
		if(tipoCotacao == "fechada" || tipoCotacao == "tabela" ){
			$("[name^=prazoItemCotacao___]").each(function(){
				adicionaDatePicker($(this).prop("id"));
				$(this).prop("readonly",false);
				$(this).removeClass("readonly");
			});
		}
		getExpireDateTime();
	}
	if(CURRENT_STATE != COTACAO && CURRENT_STATE != DEFINIR_VENCEDOR){
		$(".btn-ModalPedido").hide();
		$(".btn-InfoFornec").hide();
	}
	//if(CURRENT_STATE != ANALISE_COMPRADOR){
		mostraObjeto("tabAglutinacaoSolic", false);
		mostraObjeto("tabAglutinacaoItensSolic", false);
	//}
	if(CURRENT_STATE != EMITIR_PEDIDO_DE_COMPRA){
		mostraObjeto("btEmailPedido", false);
	}
	if(CURRENT_STATE ==  DEFINIR_VENCEDOR || CURRENT_STATE == ALCADA_1 ||
			CURRENT_STATE == ALCADA_2 ||
			CURRENT_STATE == ALCADA_3 ||
			CURRENT_STATE == ALCADA_4){
		carregaItensResumo();
	}
	if(CURRENT_STATE == undefined){
		mostraObjeto("tabAglutinacaoSolic", true);
		mostraObjeto("divBtAdicionaSolic", false);
		mostraObjeto("tabAglutinacaoItensSolic", true);
		mostraObjeto("divJustificativa", false);
		mostraObjeto("divBotoesCotacao", false);
		escondeCotacaoTabChange();
		mostrarAbaUltimaAprovacaoAlcada();
		mostraObjeto("tabPedidosGerados", true);
		mostraObjeto("tabItensDesvinculados", true);
		mostraObjeto("divBtVincularItens", false);
		mostraObjeto("divBtDesvincularItens", false);
		mostraObjeto("divDesvincularItens", true);
		mostraObjeto("divBotoesPedido", false);
		mostraObjeto("divBotaoEnviarEmailPedido", false);
		var contrato = $('input[name=rdContrato]:checked').val();
		if(contrato == "sim"){
			mostraObjeto("tabContratos", true);
			mostraObjeto("aprovacoesContrato", true);
		}else{
			mostraObjeto("tabContratos", false);
		}
	}
	mostraAbaAprovacao();
	mostraAbaContratos();
	adicionaMarcadorLinhaSelecionadaTabela("tbItens");
	adicionaMarcadorLinhaSelecionadaTabela("tbFornecs");
	adicionaMarcadorLinhaSelecionadaTabela("tbPedidosGerados");
}

function selecionaCheckCotacaoVencedora(campo){
	var indiceSelecionado = buscaIndicePaiFilho(campo);
	var codProdutoSelecionado = $("#codItemCotacao___"+indiceSelecionado).val();
	$('#tbCotacoes tbody tr:gt(0) :checkbox').each(function(){
		var indiceAtual = buscaIndicePaiFilho($(this));
		var codProdutoAtual = $("#codItemCotacao___"+indiceAtual).val();
		if(codProdutoSelecionado == codProdutoAtual && indiceSelecionado != indiceAtual){
			$("#vencedoraCotacao___"+indiceAtual).prop('checked', false);
		}
	});
}

function calculaTotalLinhaCotacao(campo){
	var indice 			= buscaIndicePaiFilho(campo);
	var valorUnit 		= $("#vlrUnitItemCotacao___"+indice).maskMoney('unmasked')[0];
	var qtd 			= parseInt($("#qtdeItemCotacao___"+indice).val());
	var valorTotal 		= (valorUnit  * qtd);
	$("#vlrTotalItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#vlrTotalItemCotacao___"+indice).maskMoney('mask', parseFloat(valorTotal));
}

function mostraTudo(){
	$(".hidden").removeClass("hidden");
}

function mostraAbaContratos(){
	var contrato = $('input[name=rdContrato]:checked').val();
	if(contrato == "sim"){
		mostraObjeto("tabContratos", true);
	}else{
		mostraObjeto("tabContratos", false);
	}
}

function validaFornecedoresCadastrados(dadosFornecedor){
	var erro = dadosFornecedor.values[0].ERRO;
	if(dadosFornecedor.values[0].ERRO == undefined){
		var dados = '';
		for ( var pos in dadosFornecedor.values) {
			dados = dadosFornecedor.values[pos];
			var cnpj  = formataCnpj(dados.A2_CGC);
			if(fornecedores[cnpj] != undefined ){
				var linha = $('#tbCotacoes tbody tr:gt(0):has(td input[value="'+$.trim(cnpj)+'"])');
				$(linha).each(function(){
					var codFornecedorCotacao = $(this).find("input[name^=codFornecedorCotacao___]");
					$(codFornecedorCotacao).val(dados.A2_COD);
				});
				var linhaFornec = $('#tbFornecs tbody tr:gt(0):has(td input[value="'+$.trim(cnpj)+'"])');
				$(linhaFornec).each(function(){
					var codFornecedor = $(this).find("input[name^=txtCodFornecCotacao___]");
					$(codFornecedor).prop("readonly", false);
					$(codFornecedor).val(dados.A2_COD);

				});
				delete fornecedores[cnpj];
			}
			if(fornecedoresVencedores[cnpj] != undefined ){
				delete fornecedoresVencedores[cnpj];
			}
		}
	}
	var cnpjFornecedores = "";
	$.each(fornecedoresVencedores, function(index,value){
		if(cnpjFornecedores == ""){
			cnpjFornecedores = index;
		}else{
			cnpjFornecedores = cnpjFornecedores +","+index;
		}
	})
	if(cnpjFornecedores != ""){
		buscaDadosFornecedoresBionexo(cnpjFornecedores);
	}
}

function carregaItensResumo(){
	if($("#txtFilialResumo1").val() == ""){
		$("#txtFilialResumo1").val($("#hiddenFilial").val());
		$("#txtNumeroSolicResumo1").val($("#txtSolicitacao").val());
		$("#txtRequisitanteResumo1").val($("#txtNmRequisitante").val());
		$("#txVlTotalPedidoResumo1").val($("#txtTotValCotacao").val());
		var cotacoesSelecionadas = $('#tbCotacoes tbody tr:gt(0):has(:checkbox:checked)');
		$(cotacoesSelecionadas).each(function(){
			var indice = wdkAddChild("tbItensAprovacao");
			setZooms();
			var codigoProduto = $.trim($(this).find("[name^=codItemCotacao___]").val());
			var linhasItem = $('#tbItens tbody tr:gt(0):has(td input[value^='+codigoProduto+'])');
			var fornecedor = $(this).find("[name^=descFornecedorCotacao___]").val();
			var consumoMedio = $(linhasItem).find("[name^=txtConsumoMedio___]").val();
			var saldo = $(linhasItem).find("[name^=txtSaldoProduto___]").val();
			var descricaoProduto = $.trim($(linhasItem).find("[name^=txtDescProduto___]").val());
			var qtd = $(this).find("[name^=qtdeItemCotacao___]").val();
			var valorTotal = $(this).find("[name^=vlrTotalItemCotacao___]").val();
			$("[name^=fornecItensPed___"+indice+"]").val(fornecedor);
			$("[name^=produtoItensPed___"+indice+"]").val(descricaoProduto);
			$("[name^=produtoConsumo___"+indice+"]").val(consumoMedio);
			$("[name^=saldoItensPed___"+indice+"]").val(saldo);
			$("[name^=qtdeItensPed___"+indice+"]").val(qtd);
			$("[name^=vlrTotalItensPed___"+indice+"]").val(valorTotal);
		});
	}
}

/********************************************************************
 * 						Alçada Aprovação							*
 ********************************************************************/
/* TODO Alçada Aprovação */
function mostraAbaAprovacao(atividadeParametro){
	var atividade;
	var indice;
	if(atividadeParametro == undefined || atividadeParametro == null)
		atividade = CURRENT_STATE;
	else
		atividade = atividadeParametro;
	/*if(atividade == ALCADA_1){
		indice = "1";
	}
	else if(atividade == ALCADA_2){
		indice = "2";
	}
	else if(atividade == ALCADA_3){
		indice = "3"
	}
	else if(atividade == ALCADA_4){
		indice = "4"
	}
	else if(atividade == PARECER_DO_SOLICITANTE){
		indice = $("#cdNivelAtualAprovacao").val();
	}else{
		return;
	}*/

	if(atividadeParametro == undefined || atividadeParametro == null)
		atividade = CURRENT_STATE;
	else
		atividade = atividadeParametro;

	if(atividade == PARECER_SOLICITANTE || atividade == APROVACAO_ALCADA || atividade == APROVACAO_AUTOMATICA || atividade == GERAR_COTACAO_FORNECEDOR){
		if(atividade == GERAR_COTACAO_FORNECEDOR && indice == "0"){
			return;
		}
		indice = $("#contadorAlcada").val();
	}else{
		return;
	}

	mostraObjeto("aprovacoesCotacoes1", true);
	if(CURRENT_STATE != ANEXAR_MINUTA_PARA_VALIDACAO){
		mostraObjeto("tabAprovacao"+indice, true);
	}
	$("#tituloSecaoAprovacoes").html("<b>Aprovação das Cotações - Nível "+indice+"</b>");
	montaHistoricoAprovacao();
	if($("#rdAprovadoAlcadaNao"+indice).prop("checked") == true){
		$("#divMotivoReprovacao"+indice).show();
	}
	$("#slMotivoReprovacao"+indice+" option:first").prop('selected', true);

	if(atividade == PARECER_SOLICITANTE){
		$("#divMotivoReprovacao"+indice).hide();
		$("#divParecerSolicitante"+indice).show();
	}
}

function montaHistoricoAprovacao(atividadeParametro){

	var atividade;

	if(atividadeParametro == undefined || atividadeParametro == null)
		atividade = CURRENT_STATE;
	else
		atividade = atividadeParametro;

	var tabela = "";

	if(atividade == APROVACAO_ALCADA){
		for (var i = 1; i <= $("#contadorAlcada").val(); i++) {
			tabela = tabela + montaLinhaHistoricoAlcada(i);
		}
	}else if(atividade == PARECER_SOLICITANTE){
		var indice = parseInt($("#contadorAlcada").val());
		indice--;
		for(var i = indice; i > 0; i-- ){
			tabela = tabela + montaLinhaHistoricoAlcada(i+"");
		}
	}

	if(tabela != ""){
		tabela = '<table class="table table-striped table-bordered "><tbody>' + tabela + '</tbody></table>';
		$("#divHistoricoAprovacao").html(tabela);
		mostraObjeto("divHistoricoAprovacao", false);
	}

	mostraObjeto("divHistoricoAprovacao", true);

}

function montaLinhaHistoricoAlcada(alcada){
	var retorno = "";
	var matMed = $("#grupoAnaliseComprador").val();
	if($('input[name=rdAprovadoAlcada'+alcada+']:checked').val() != null && $('input[name=rdAprovadoAlcada'+alcada+']:checked').val() != undefined){
		retorno = '<tr class="pointer" onclick="mostraMotalAprovacao('+alcada+')"><td>'+alcada+'ª Alçada de aprovação: Aprovado por '+$("#nomeAprovadorAlcada"+alcada).val()+' - '+$("#dataAprovacaoAlcada"+alcada).val() +'</td></tr>'
	}
	return retorno;
}

function mostrarAbaUltimaAprovacaoAlcada(){
	mostraAbaAprovacao(APROVACAO_ALCADA);
	montaHistoricoAprovacao(APROVACAO_ALCADA);
}

function mostraMotalAprovacao(aprovacao){
	FLUIGC.modal({
		title: aprovacao+'ª Alçada de aprovação',
		content:
			'<table class="table "><tbody>'+
			'<tr><td><label>Aprovado por :</label></td><td><label>'+$("#nomeAprovadorAlcada"+aprovacao).val()+'</label></td></tr>'+
			'<tr><td><label>Justificativa:</label></td><td><label>'+$("#txtJustificativaAlcada"+aprovacao).val()+'</label></td></tr>'+
			'</tbody></table>'
			,
			id: 'fluig-modal'
	});
}

/********************************************************************
 * 						Aglutinação									*
 ********************************************************************/
/* TODO Aglutinação */
function setHandlerChange(index){
	$('#txtNumSolicAdd___' + index).change(function() {
		carregaItAglu();
	});
}

function carregaItAglu() {
	jsonFinal = [];
	$("input[name^='txtNumSolicAdd___']").each( function () {
		var numSolic = this.value;
		var solic = new String(numSolic);
		if(solic != ""){
			var camposSolic = new Array(solic, "DIV");
			var datasetItensAlgu = DatasetFactory.getDataset("ds_itens_compra", camposSolic, null, null).values;
			var jsonString = JSON.stringify(datasetItensAlgu);
			var jsonObjeto = jQuery.parseJSON(jsonString);
			jsonFinal = jsonFinal.concat(jsonObjeto);
		}
	});
	criaDataTableItensAglutinados(jsonFinal);
}

function incluirSolicAglu()
{
	var index = wdkAddChild('tbSolicAglutinadas');
	setZooms();
	setHandlerChange(index);
}

function excluiSolicAglu(oElement){
	// Chamada a funcao padrao, NAO RETIRAR
	fnWdkRemoveChild(oElement);
	carregaItAglu();
	//refaze datatable//
}

function carregaItensAglu(){
	$("#txtSolicitacoesAdd").val("");
	$("input[name^='txtNumSolicAdd___']").each( function () {
		var numSolic = Number(this.value);
		var listaSolics = $("#txtSolicitacoesAdd").val();
		if (listaSolics=="")
			listaSolics = numSolic;
		else
			listaSolics = listaSolics + "," + numSolic;
		$("#txtSolicitacoesAdd").val(listaSolics);
		if(numSolic > 0){
			var solic = numSolic + '';
			var camposSolic = [];
			camposSolic.push(solic, "DIV");
			var datasetItensCompra = DatasetFactory.getDataset("ds_itens_compra", camposSolic, null, null);
			console.log("datasetItensCompra = " + datasetItensCompra);
			if(datasetItensCompra != null && datasetItensCompra != undefined)
			{
				var datasetItensAlgu = datasetItensCompra.values;
				for (var x = 0; x < datasetItensAlgu.length; x++) {
					var rowItem = datasetItensAlgu[x];
					var indexItemExistente = buscaItemExistente(rowItem["produto"]);
					if (indexItemExistente == 0){
						var index = wdkAddChild('tbItens');
						setZooms();
						MaskEvent.init(); //Atualiza os campos com 'mask'
						$("#sPrioridadeProduto___"+index).val(rowItem["prioridade"]);
						$("#txtSeqItemProduto___"+index).val(rowItem["itemSC"]);
						$("#txtCodItemProduto___"+index).val(rowItem["produto"]);
						$("#txtDescProduto___"+index).val(rowItem["descricao"]);
						$("#txtUnidMedProduto___"+index).val(rowItem["unMedida"]);
						$("#txtQuantidadeProduto___"+index).val(rowItem["quantidade"]);
						$("#txtSaldoProduto___"+index).val(rowItem["saldo"]);
						$("#dtNecessidadeProduto___"+index).val(rowItem["necessidade"]);
						$("#txtArmazemProduto___"+index).val(rowItem["armazem"]);
						$("#txtObsProduto___"+index).val(rowItem["observacao"]);
						$("#txtCCProduto___"+index).val(rowItem["centroCusto"]);
						$("#txtContaContabil___"+index).val(rowItem["contaContabil"]);
						$("#txtConsumoMedio___"+index).val(rowItem["ConsumoMedio"]);
						$("#nmFabricante___"+index).val(rowItem["nmFabricante"]);
					}
					else
					{
						atualizaItemExistente(indexItemExistente,rowItem["quantidade"]);
					}
				}
				organizaSequenciaItens();
			}
		}
	});
}

function criaDataTableItensAglutinados(data){
	var itensAglutinados = FLUIGC.datatable('#dataTableItensAglutinados', {
		    dataRequest: data,
		    renderContent: '.templateItensAglu',
		    header: [
		                     {'title': 'Solicitação'},
		                     {'title': 'Prioridade'},
		                     {'title': 'Item da SC'},
		                     {'title': 'Produto'},
		                     {'title': 'Descrição'},
		                     {'title': 'Uni. Medida'},
		                     {'title': 'Quantidade'},
		                     {'title': 'Saldo'},
		                     {'title': 'Consumo Medio'},
		                     {'title': 'Necessidade'},
		                     {'title': 'Armazém'},
		                     {'title': 'Prazo Item'},
		                     {'title': 'Observação'},
		                     {'title': 'Fabricante'},
		                     {'title': 'Centro de Custo'},
		                     {'title': 'Conta Contábil'}
		                 ]
	}, function(err, data) {
		    // DO SOMETHING (error or success)
	});
}

/********************************************************************
 * 						Cotação										*
 ********************************************************************/
/* TODO Cotação */

function definirCotacaoVencedora(){
	var linhasTabelaItens = $("#tbItens tbody tr:gt(0)");

	$("#tbItens tbody tr:gt(0)").each(function(){
		var linhaMenorPreco = null;
		var produtoSelecionado = $.trim($(this).find("[name^=txtCodItemProduto___]").val());
		var linhasComProduto = $('#tbCotacoes tbody tr:gt(0):has(td input[value^='+produtoSelecionado+'])');
		$(linhasComProduto).each(function(){
			if(linhaMenorPreco == null){
				linhaMenorPreco = $(this);
			}else{
				var menorValor = $(linhaMenorPreco).find("[name^=vlrTotalItemCotacao___]").maskMoney("unmasked")[0];
				var valorAtual = $(this).find("[name^=vlrTotalItemCotacao___]").maskMoney("unmasked")[0];
				if( valorAtual < menorValor)
					linhaMenorPreco = $(this);
			}
		})
		if(linhaMenorPreco != undefined || linhaMenorPreco != null){
			linhaMenorPreco.addClass('linhaSelecionada');
		}
		$(linhaMenorPreco).find("[name^=vencedoraCotacao___]").prop("checked",true).change();
		$(linhaMenorPreco).find(":text").removeClass("readonly").addClass("readonlySelected");
		$(linhaMenorPreco).find("td").removeClass("readonly").addClass("readonlySelected");
		if(linhaMenorPreco){
			var index = $(linhaMenorPreco).find("[name^=vencedoraCotacao___]").attr('name').split('___')[1];
			validaDadosBancariosVencedor(index, $('[name="rdTipoCotacao"]:checked').val());
		}
	});
}

function validaLinhaMenorPreco(element){
	var linhaSelecionada = getClosestByElement($(element),"tr");
	var produtoSelecionado = $.trim( getClosestByElement($(element),"tr").find("[name^=codItemCotacao___]").val());
	var linhaMenorPreco = null;
	var linhasComProduto = $('#tbCotacoes tbody tr:gt(0):has(td input[value^='+produtoSelecionado+'])');
	$(linhasComProduto).each(function(){
		if(linhaMenorPreco == null){
			linhaMenorPreco = $(this);
		}else{
			var menorValor = $(linhaMenorPreco).find("[name^=vlrTotalItemCotacao___]").maskMoney("unmasked")[0];
			var valorAtual = $(this).find("[name^=vlrTotalItemCotacao___]").maskMoney("unmasked")[0];
			if( valorAtual < menorValor)
				linhaMenorPreco = $(this);
		}
	})
	return ($(linhaMenorPreco).find("[name^=vlrTotalItemCotacao___]").val() ==  $(linhaSelecionada).find("[name^=vlrTotalItemCotacao___]").val())
}

function mostraAbaCotacoes(){
	var linhaSelecionada = $("#tbItens tbody tr.linhaSelecionada");

	if(linhaSelecionada.length > 0){
		$("#cotacoes").removeClass("hidden");
		$(".modal").show();
		//mostraObjeto("tabCotacoes", true);

	}else{
		mostraObjeto("tabCotacoes", false);
	}
}

function carregaTabelaCotacoes(){
	var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
	if(tipoCotacao == "fechada" || tipoCotacao == "tabela"){
		var tbItens = $("#tbItens tbody tr:gt(0)");
		var tbFornecs = $("#tbFornecs tbody tr:gt(0)");
		var tbCotacoes = $("#tbCotacoes tbody tr:gt(0)");
		if(tbCotacoes.length > 0){
			redimensionaTabelaCotacoesBionexo();
			for ( var i =0; i < tbCotacoes.length; i++) {
				var linhaCotacao = tbCotacoes[i];
				var indice = buscaIndicePaiFilho($(linhaCotacao).find("input:first"));

				$('.valor').maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true});
				$("#vlrUnitItemCotacao___"+indice).blur(function() {
					calculaTotalLinhaCotacao(this);
				});
				$("#outrasDespItemCotacao___"+indice).blur(function() {
					calculaTotalLinhaCotacao(this);
				});
				$("#vlrIpiItemCotacao___"+indice).blur(function() {
					calculaTotalLinhaCotacao(this);
				});
				$("#outrasDespItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
				$("#vlrTotalItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
				$("#vlrIpiItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
				$('#vlrUnitItemCotacao___'+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 4, allowZero: true});
			}
		}else{
			limpaTabelaPaiFilho("tbCotacoes");
			redimensionaTabelaCotacoesBionexo();
			for ( var i =0; i < tbItens.length; i++) {
				var linhaItem = tbItens[i];
				for ( var j = 0 ; j < tbFornecs.length; j++) {
					var linhaFornec = tbFornecs[j];
					var nmCondPgto = $(linhaFornec).find("[name^=txtNomeFormaPagamentoBionexo___]").val()
					var indice = wdkAddChild("tbCotacoes");
					setZooms();
					$('.valor').maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true});
					console.log("Preço Unitario 1 "+$("#vlrUnitItemCotacao___"+indice).val());
					$("#vlrUnitItemCotacao___"+indice).blur(function() {
						calculaTotalLinhaCotacao(this);
					});
					$("#outrasDespItemCotacao___"+indice).blur(function() {
						calculaTotalLinhaCotacao(this);
					});
					$("#vlrIpiItemCotacao___"+indice).blur(function() {
						calculaTotalLinhaCotacao(this);
					});
					var txtCodFornecCotacao 	= $(linhaFornec).find("[name^=txtCodFornecCotacao___]").val();
					var txtLojaFornecCotacao 	= $(linhaFornec).find("[name^=txtLojaFornecCotacao___]").val();
					var txtNomeFornecCotacao 	= $(linhaFornec).find("[name^=txtNomeFornecCotacao___]").val();
					var cnpjFornCotacao 		= $(linhaFornec).find("[name^=txtCnpjFornecCotacao__]").val();
					var txtQuantidadeProduto 	= $(linhaItem).find("[name^=txtQuantidadeProduto___]").val();
					var txtUnidMedProduto 		= $(linhaItem).find("[name^=txtUnidMedProduto___]").val();
					var codItemCotacao 			= $(linhaItem).find("[name^=txtCodItemProduto___]").val();
					var codSequenciaCotacao 	= $(linhaItem).find("[name^=txtSeqItemProduto___]").val();
					var txtSeqItemProduto = $(linhaItem).find("[name^=txtSeqItemProduto___]").val();
					var txtDescProduto = $(linhaItem).find("[name^=txtDescProduto___]").val();
					var txtObsProduto = $(linhaItem).find("[name^=txtObsProduto___]").val();
					var nmFabricante = $(linhaItem).find("[name^=nmFabricante___]").val();
					$("#SeqItemCotacao___"+indice).val(txtSeqItemProduto);
					$("#DescItemCotacao___"+indice).val(txtDescProduto);
					$("#ObsItemCotacao___"+indice).val(txtObsProduto);
					$("#descFabricante___"+indice).val(nmFabricante);
					$("#SeqItemCotacao___"+indice).val(codSequenciaCotacao);
					$("#cnpjFornCotacao___"+indice).val(cnpjFornCotacao);
					$("#codItemCotacao___"+indice).val(codItemCotacao);
					$("#codFornecedorCotacao___"+indice).val(txtCodFornecCotacao);
					$("#descFornecedorCotacao___"+indice).val(txtNomeFornecCotacao);
					$("#qtdeItemCotacao___"+indice).val(txtQuantidadeProduto);
					$("#umItemCotacao___"+indice).val(txtUnidMedProduto);
					$("#descCondPgtoItemCotacao___"+indice).val(nmCondPgto);
					$("#outrasDespItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#vlrTotalItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#vlrIpiItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$('#outrasDespItemCotacao___' + indice).maskMoney('mask', 0.00);
					$('#vlrTotalItemCotacao___' + indice).maskMoney('mask', 0.00);
					$('#vlrIpiItemCotacao___' + indice).maskMoney('mask', 0.00);
					if(tipoCotacao == 'fechada'){
						$('#vlrUnitItemCotacao___'+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 4, allowZero: true});
						$('#vlrUnitItemCotacao___' + indice).maskMoney('mask', 0.0000);
					}else{
						var cDadosFornecItemTabPreco = '';
						var fieldsTabPreco 	= [];
						var tabPrecoItem;
						var tabPreco 		= '';
						cDadosFornecItemTabPreco = $.trim(codItemCotacao) + '|' + txtCodFornecCotacao + '|' + txtLojaFornecCotacao + ';';
						fieldsTabPreco.push(cDadosFornecItemTabPreco);
						var datasetBuscaDadosTabPreco = DatasetFactory.getDataset('consultaTabPreco', fieldsTabPreco, null, null).values;
						tabPrecoItem = datasetBuscaDadosTabPreco[0]['precoCodTab'];
						var tabPrecoFinal = parseFloat(tabPrecoItem).toFixed(4);
						tabPreco = datasetBuscaDadosTabPreco[0]['codTabPreco'];
						var outrasDespesas 	= $("#outrasDespItemCotacao___"+indice).maskMoney('unmasked')[0];
						var vlIPI			= $("#vlrIpiItemCotacao___"+indice).maskMoney('unmasked')[0];
						var qtd 			= parseFloat($("#qtdeItemCotacao___"+indice).val());
						var valorTotal 		= (tabPrecoFinal * qtd );
						$("#vlrTotalItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
						$("#vlrTotalItemCotacao___"+indice).maskMoney('mask', valorTotal);
						$("#vlrUnitItemCotacao___"+indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 4, allowZero: true});
						$('#vlrUnitItemCotacao___' + indice).maskMoney('mask', tabPrecoItem);
						$('#tabPrecoItemCotacao___' + indice).val(tabPreco);
					}
					adicionaMascara();
				}
			}
		}
	}
}

function escondeCotacaoTabChange(){
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var target = $(e.target).attr("href"); // activated tab
		if(target != '#cotacoes'){
			mostraObjeto('cotacoes', false);
		}else{
			mostraObjeto('cotacoes', true);
		}
	});
}

function mostrarJustificativaCotacao(linhaItem){
	var produtoSelecionado = $.trim($(linhaItem).find("[name^=txtCodItemProduto___]").val());
	var linhasComProduto = $('#tbCotacoes tbody tr:gt(0):has(td input[value^='+produtoSelecionado+'])');
	var checkboxMelhorPreco = $(linhasComProduto).find(":checkbox:checked");
	if(checkboxMelhorPreco.length > 0){
		var linhaSelecionada = getClosestByElement($(checkboxMelhorPreco),"tr");
		if(validaLinhaMenorPreco($(checkboxMelhorPreco))){
			disableInputElement($("#txtJustificacaoCotacao"));
			$("#txtJustificacaoCotacao").val("");
		}else{
			$("#txtJustificacaoCotacao").val($(linhaSelecionada).find("[name^=JustificativaItemCotacao___]").val());
			$("#txtJustificacaoCotacao").bind("blur",function(){
				$(linhaSelecionada).find("[name^=JustificativaItemCotacao___]").val($("#txtJustificacaoCotacao").val());
			});
			if(CURRENT_STATE == DEFINIR_VENCEDOR){
				enableInputElement($("#txtJustificacaoCotacao"));
			}else{
				disableInputElement($("#txtJustificacaoCotacao"));
			}
		}
	}
}

function calculaTotalCotacoes(){
	var totalItens = 0;
	var totalOutrasDespesas = 0;
	var totalFrete = 0;
	var totalIPI = 0;
	var total = 0;
	var totalItem = 0;
	var cotacoesSelecionadas = $("#tbCotacoes tbody tr:gt(0)").find(":checkbox:checked");
	var arrayFornecs = [];
	$(cotacoesSelecionadas).each(function(){
		var indice = buscaIndicePaiFilho($(this));
		var quantidade = parseInt($("[name=qtdeItemCotacao___"+indice+"]").val());
		var valorUnitario = $("[name=vlrUnitItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
		var valorOutrasDespesas = $("[name=outrasDespItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
		var valorIPI = $("[name=vlrIpiItemCotacao___"+indice+"]").maskMoney('unmasked')[0];
		totalItens = totalItens + (valorUnitario * quantidade);
		totalOutrasDespesas += valorOutrasDespesas;
		totalIPI += valorIPI;
		totalItem += (valorUnitario * quantidade);
		var fornec = $("[name=codFornecedorCotacao___"+ indice +"]").val();
		if(arrayFornecs.length == 0){
			arrayFornecs.push(fornec);
		}
		for(var x = 0; x < arrayFornecs.length; x++){
			if(fornec != arrayFornecs[x]){
				arrayFornecs[x] = fornec;
			}
		}
	});
	for(var y = 0; y < arrayFornecs.length; y++){
		$("#tbFornecs tbody tr:gt(0)").each(function(){
			var fornecedor = $(this).find("[name^=txtCodFornecCotacao___]").val();
			if(fornecedor == arrayFornecs[y]){
				var valorFrete = $(this).find("[name^=vlrFrete___]").maskMoney('unmasked')[0];
				totalFrete += valorFrete;
			}
		});
	}
	total = totalItem + (totalIPI + totalFrete + totalOutrasDespesas);
	var totalFinal = total.toFixed(2);
	var totalFinalItens = totalItem.toFixed(2);
	$("#txtTotValMercadoria").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValDespesas").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValCotacao").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValFrete").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValIPI").maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
	$("#txtTotValMercadoria").maskMoney('mask', parseFloat(totalFinalItens+"")); // .val(converteFloatMoeda(totalFinalItens));
	$("#txtTotValDespesas").maskMoney('mask', parseFloat(totalOutrasDespesas+"")); //.val(converteFloatMoeda(totalOutrasDespesas));
	$("#txtTotValCotacao").maskMoney('mask', parseFloat(totalFinal+"")); //.val(converteFloatMoeda(totalFinal));
	$("#txtTotValFrete").maskMoney('mask', parseFloat(totalFrete+"")); //.val(converteFloatMoeda(totalFrete));
	$("#txtTotValIPI").maskMoney('mask', parseFloat(totalIPI+"")); //.val(converteFloatMoeda(totalIPI));
}

/*******************************************************************
 * 						Envio Email
 *
 *******************************************************************/
/* TODO Envio Email*/

function getModalContent(){
	var content = $("#modal-content").prop("outerHTML");
	content = content.replace("emailList","email-list-modal");
	return content;
}

function sendEmailPedido(){

	var tabela = $('#tbPedidosGerados')
	var linhaSelecionada = $('#tbPedidosGerados tbody tr.linhaSelecionada');

	if(linhaSelecionada.length > 0){
		var pedidoGerado = linhaSelecionada.find("input[name^='pedGerado']").val();
		var codFilial = $('#filial_protheus').val();
		var listaRelatorio = $("#listaEmailsRelat").val().split(';');
		if(listaRelatorio != ''){
			var constraintDs_pdfPedidoCompra = DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST);
			var constraintDs_pdfPedidoCompra1 = DatasetFactory.createConstraint('PEDIDO', pedidoGerado, pedidoGerado, ConstraintType.MUST);
			var ds_pdfPedidoCompra = DatasetFactory.getDataset('ds_pdfPedidoCompra', null, [constraintDs_pdfPedidoCompra,constraintDs_pdfPedidoCompra1], null);
			var base64PdfCompras = 'data:application/pdf;base64,' + ds_pdfPedidoCompra.values[0].PDF;
			for (var i = 0; i < listaRelatorio.length; i++) {
				Email.sendWithAttachment("fluig@oncoclinicas.com",
						listaRelatorio[i].replace(/\s/g, ''),
						"Relatorio de Pedido Compra",
						"Prezados(as),</br>"+
						"Em anexo pedido de compra com autorização de fornecimento dos materiais e/ou serviços.</br>"+
						"Informar o número do pedido de compra na nota fiscal.</br>"+
						"Enviar boleto bancário juntamente à nota fiscal e/ou informar dados bancários para crédito em conta.</br>",
						"smtp-relay.gmail.com",
						"",
						"",
						base64PdfCompras,
						function done(message) {
							if(message == 'OK'){
								FLUIGC.toast({title: 'Sucesso', message: 'Email enviado com sucesso', type: 'success'});
							} else {
								FLUIGC.toast({title: 'Erro', message: 'Ocorreu um erro ao enviar o e-mail', type: 'danger'});
								console.log("Ocorreu um erro ao enviar o e-mail: "+message);
							}
						}
				);
			}
		} else {
			FLUIGC.message.alert({
				message: "Por Favor informe ao menos um destinatário para o email",
				title: 'Nenhum Destinatário Informado',
				label: 'OK'
			});
		}

	} else {
		FLUIGC.message.alert({
			message: "Por Favor selecione ao menos um pedido de compra para enviar por e-mail",
			title: 'Nenhum Pedido de Compras Selecionado',
			label: 'OK'
		});
	}
}

function sendEmailCotacao(){
	var tabela = $('#tbFornecs')
	var linhaSelecionada = $('#tbFornecs tbody tr.linhaSelecionada');
	if(linhaSelecionada.length > 0){
		var CodFornecCotacao = linhaSelecionada.find("input[name^='txtCodFornecCotacao']").val();
		var numeroFicha = $("#numeroFicha").val();
		var urlRelatorio = parent.WCMAPI.serverURL + "/birtOnco/frameset?__report=cotacao.rptdesign&documentId=" + numeroFicha + "&codFornecedor=" + CodFornecCotacao;
		console.log(">>urlRelatorio = " + urlRelatorio);
		var listaRelatorio = $("#listaEmailsRelat").val();
		console.log("listaRelatorio = " + listaRelatorio);
		var emailData = {
				"to" : listaRelatorio,
				"from" : "oncoclinicas@cloudtotvs.com.br",
				"subject" : "Relatorio de Cotacao",
				"templateId" : "tpl_teste",
				"dialectId"  : "pt_BR",
				"param" : {"link": urlRelatorio}
		}
		parent.WCMAPI.Create({
			url: parent.WCMAPI.serverURL + "/api/public/alert/customEmailSender",
			contentType: "application/json",
			dataType: "json",
			data: emailData,
			async: true,
			success: function(data){
				console.log(data);
				FLUIGC.toast({title: 'Sucesso', message: 'Email enviado', type: 'success'});
			},
			error : function(data){
				console.log(data);
				FLUIGC.toast({title: 'Erro', message: 'Email n?o enviado', type: 'danger'});
			}
		});
	}
}

function listaEmails(lista){
	$("#listaEmailsRelat").val(lista.value);
}

/*******************************************************************
 * 						Bionexo
 *
 *******************************************************************/
/* TODO Bionexo */

function buscaDadosFornecedoresBionexo(cnpjFornecedores){
	var objBio = new objBionexo();
	var datasetBuscaDadosFornecedor = objBio.buscaDadosFornecedores(cnpjFornecedores, $("#filial_protheus").val());
	if(datasetBuscaDadosFornecedor[0]["status"] == "sucesso"){
		$("#xmlDadosFornecedores").val(datasetBuscaDadosFornecedor[0]["mensagem"]);
	}else if(datasetBuscaDadosFornecedor[0]["status"] == "erro"){
		FLUIGC.message.alert({
			message: "Ocorreram erros na integração com o Bionexo:<br>-" + datasetBuscaDadosFornecedor[0]["mensagem"],
			title: 'Busca Dados do Fornecedor Bionexo',
			label: 'OK'
		});
	}
}

//sandro - 21/05
function gravaDadosRelatFornecBionexo(cnpjFornCotacao, linhaTabela){
	console.log("gravaDadosRelatFornecBionexo>>>>inicio");
	console.log("cnpjFornCotacao = " + cnpjFornCotacao);
	console.log("linhaTabela = " + linhaTabela);
	var objBio = new objBionexo();
	var datasetBuscaDadosFornecedor = objBio.buscaFornecedores(cnpjFornCotacao, $("#filial_protheus").val());
	console.log("razaoSocial > " + datasetBuscaDadosFornecedor[0]["razaoSocial"]);
	$('#RazaoFantasiaFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["razaoSocial"]);
	$('#CnpjFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["cnpj"]);
	$('#LogradouroFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["logradouro"]);
	$('#CidadeFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["cidade"]);
	$('#EstadoFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["estado"]);
	$('#PaisFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["pais"]);
	$('#ContatoFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["contato"]);
	$('#TelefoneFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["telefone"]);
	$('#MailFornec___' + linhaTabela).val(datasetBuscaDadosFornecedor[0]["email"]);
	console.log("gravaDadosRelatFornecBionexo>>>>fim");
}

function redimensionaTabelaFornecedoresBionexo(){
	var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
	var colunaCodFornecedor;
	var colunaloja;
	var indiceColunaCodFornecedor;
	var indiceColunaLoja;
	var colunaFormaPagto;
	var colunaModalFrete;
	var colunaVlrFrete;
	var colunaVlrTotal;
	var colunaPrazoEntrega;
	var indiceColunaFormaPagto;
	var indiceColunaModalFrete;
	var indiceColunaVlrFrete;
	var indiceColunaVlrTotal;
	var indiceColunaPrazoEntrega;
	colunaCodFornecedor = getClosestByElement($("[name^=txtCodFornecCotacao___]"),"td");
	colunaloja = getClosestByElement($("[name^=txtLojaFornecCotacao___]"),"td");
	colunaFormaPagto = getClosestByElement($("[name^=txtCodFormaPagamentoProtheus___]"),"td");
	colunaModalFrete = getClosestByElement($("[name^=sModalidadeFrete___]"),"td");
	colunaVlrFrete = getClosestByElement($("[name^=vlrFrete___]"),"td");
	colunaVlrTotal = getClosestByElement($("[name^=vlrTotalFornecedor___]"),"td");
	colunaPrazoEntrega = getClosestByElement($("[name^=prazoFornec___]"),"td");
	indiceColunaCodFornecedor =  $(colunaCodFornecedor).parent().children().index($(colunaCodFornecedor));
	indiceColunaLoja =  $(colunaloja).parent().children().index($(colunaloja));
	indiceColunaFormaPagto =  $(colunaFormaPagto).parent().children().index($(colunaFormaPagto));
	indiceColunaModalFrete =  $(colunaModalFrete).parent().children().index($(colunaModalFrete));
	indiceColunaVlrFrete =  $(colunaVlrFrete).parent().children().index($(colunaVlrFrete));
	indiceColunaVlrTotal = $(colunaVlrTotal).parent().children().index($(colunaVlrTotal));
	indiceColunaPrazoEntrega = $(colunaPrazoEntrega).parent().children().index($(colunaPrazoEntrega));
	if(tipoCotacao == "aberta"){
		$("#tbFornecs tr").each(function(){
			$(this).children().eq(indiceColunaCodFornecedor).hide();
			$(this).children().eq(indiceColunaLoja).hide();
			if(CURRENT_STATE == COTACAO){
				$("#tbFornecs tbody tr:gt(0) td [name^=prazoFornec___]").each(function(){
					adicionaDatePicker($(this).prop("id"));
					$("#"+$(this).prop("id")).change(function(){
						var codFornecedor = getClosestByElement($(this),"tr").find("[name^=txtCodFornecCotacao]").val();
						var dataEntrega = $(this).val();
						adicionaDataFornecCotacao(codFornecedor,dataEntrega);
					});
				});
			}else{
				$("#tbFornecs tbody tr:gt(0) td [name^=prazoFornec___]").each(function(){
					destroyDatePicker($(this).prop("id"));
				});
			}
		});
	}else if (tipoCotacao == "fechada" || tipoCotacao == "tabela"){
		if(CURRENT_STATE == COTACAO){
			adicionaMascara();
			$("#tbFornecs tr").each(function(){
				$(this).children().eq(indiceColunaFormaPagto).show();
				$(this).children().eq(indiceColunaModalFrete).show();
				$(this).children().eq(indiceColunaVlrFrete).show();
				$(this).children().eq(indiceColunaPrazoEntrega).show();
				$("#tbFornecs tbody tr:gt(0) td [name^=prazoFornec___]").each(function(){
					adicionaDatePicker($(this).prop("id"));
					$("#"+$(this).prop("id")).change(function(){
						var codFornecedor = getClosestByElement($(this),"tr").find("[name^=txtCodFornecCotacao]").val();
						var dataEntrega = $(this).val();
						adicionaDataFornecCotacao(codFornecedor,dataEntrega);
					});
				});
			});
			//GERAR_COTACAO_FORNECEDOR
			//if(CURRENT_STATE == GERA_COTACAO_ || CURRENT_STATE == INICIO || CURRENT_STATE == INICIO_1 || CURRENT_STATE == INICIO ||CURRENT_STATE == ANALISE_COMPRADOR){
		}else if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR || CURRENT_STATE == INICIO || CURRENT_STATE == INICIO_1){
			$("#tbFornecs tr").each(function(){
				$(this).children().eq(indiceColunaCodFornecedor).show();
				$(this).children().eq(indiceColunaLoja).show();
				$(this).children().eq(indiceColunaFormaPagto).hide()
				$(this).children().eq(indiceColunaModalFrete).hide();
				$(this).children().eq(indiceColunaVlrFrete).hide();
				$(this).children().eq(indiceColunaPrazoEntrega).hide();
			});
			$("#tbFornecs tbody tr:gt(0) td [name^=prazoFornec___]").each(function(){
				destroyDatePicker($(this).prop("id"));
			});
		}
		$("#tbFornecs tbody tr:gt(0)").each(function(){
			var indice = buscaIndicePaiFilho($(this).find("[name]")[0]);
			if(indice == "1"){
				$("#txtCodFornecCotacao___"+indice).css('width', '100%');
			}
			$(this).children().eq(indiceColunaCodFornecedor).show();
			$(this).children().eq(indiceColunaLoja).show();
		});
	}
	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA || CURRENT_STATE == DEFINIR_VENCEDOR){
		$("#tbFornecs tr").each(function(){
			$(this).children().eq(indiceColunaVlrTotal).show();
		});
	}else{
		$("#tbFornecs tr").each(function(){
			$(this).children().eq(indiceColunaVlrTotal).hide();
		});
	}
	$("#tbFornecs").removeClass("show");
}

function redimensionaTabelaCotacoesBionexo(){
	var tipoCotacao = $('input[name=rdTipoCotacao]:checked').val();
	if(tipoCotacao == 'fechada' || tipoCotacao == "tabela"){
		if(tipoCotacao == 'fechada')
			$("#tbCotacoes thead tr th:eq("+ ($('#tbCotacoes thead tr th').length -1 ) +")").hide();
		var indiceColuna;
		if(CURRENT_STATE == COTACAO){
			indiceColuna = 1;
		}else{
			indiceColuna = 0;
		}
		$("#tbCotacoes thead tr th:eq(0)").hide();
		$("#tbCotacoes tbody tr").each(function(){
			if(tipoCotacao == 'fechada')
				$(this).children().eq(($(this).children().length -1)).hide();
			$(this).children().eq(indiceColuna).hide();
			var selecionado = ($(this).find(":checkbox:checked").length > 0);
			$(this).find("td").each(function(){
				if($(this).find(":text.readonly").length > 0 && selecionado){
					$(this).addClass("readonlySelected");
				}
				else if($(this).find(":text.readonly").length > 0 && !selecionado){
					$(this).addClass("readonly");
				}
			});
		});
	}else if(tipoCotacao == "aberta"){
		if(CURRENT_STATE == COTACAO){
			adicionaMascara();
			$("#tbCotacoes thead tr td:eq(0)").hide();
			$("#tbCotacoes thead tr th:eq(0)").hide();
			$("#tbCotacoes thead tr th:eq("+($("#tbCotacoes thead tr th").length -1)+")").hide();
			$("#tbCotacoes tbody tr").each(function(){
				$(this).children().eq(0).hide();
				$(this).children().eq(1).hide();
				$(this).children().eq(($(this).children().length -1)).hide();
				disableInputElement($(this).find(":checkbox"))
				$(this).find("td").addClass("readonly");
			});
			$("[name^=prazoItemCotacao___]").each(function(){
				$(this).prop("readonly",false);
				$(this).removeClass("readonly");
				adicionaDatePicker($(this).prop("id"));
			});
		}else{
			$("#tbCotacoes thead tr td:eq(0)").hide();
			$("#tbCotacoes thead tr th:eq("+($("#tbCotacoes thead tr th").length -1)+")").hide();
			$("#tbCotacoes tbody tr").each(function(){
				$(this).children().eq(0).hide();
				$(this).children().eq(($(this).children().length -1)).hide();
				disableInputElement($(this).find(":checkbox"))
				$(this).find("td").addClass("readonly");
			});
		}
		adicionaMarcadorLinhaSelecionadaTabela("tbFornecs");
	}
}

function buscaCarrinhoCompra(){
	var nrPDC = $("#txtNrPDC").val();
	var filial_protheus = $("#filial_protheus").val();
	var objBio = new objBionexo();
	var datasetPedidoCompra = objBio.buscaCarrinho(nrPDC, filial_protheus);
	itensBionexo = datasetPedidoCompra;
	if(datasetPedidoCompra != null && datasetPedidoCompra != undefined){
		if(datasetPedidoCompra[0]["status"] == "sucesso"){
			limpaTabelaPaiFilho("tbFornecs");
			limpaTabelaPaiFilho("tbCotacoes");
			fornecedores = {};
			fornecedoresVencedores = {};
			populaFornecedoresPaiFilho(datasetPedidoCompra);
			carregaTabelaCotacoesBionexo(datasetPedidoCompra);
			mostraObjeto("tbFornecs", true);
			redimensionaTabelaFornecedoresBionexo();
			$("#retornouPDC").val("true");
			consultaFornecedorProtheus();
			escondeLoading();
		}else if(datasetPedidoCompra[0]["status"] == "erro"){
			escondeLoading();
			FLUIGC.message.alert({
				message: "Erro ao buscar dados do carrinho de compras:<br>"+datasetPedidoCompra[0]["mensagem"],
				title: 'Buscar Carrinho de compras',
				label: 'OK'
			});
		}else if(datasetPedidoCompra[0]["status"] == "vazio"){
			escondeLoading();
			FLUIGC.message.alert({
				message: "A consulta ao PDC "+nrPDC+" não retornou nenhuma cotação",
				title: 'Buscar Carrinho de compras',
				label: 'OK'
			});
		}
	}else{
		escondeLoading();
		FLUIGC.message.alert({
			message: "Erro ao buscar dados do carrinho de compras",
			title: 'Buscar Carrinho de compras',
			label: 'OK'
		});
	}
}

function carregaTabelaCotacoesBionexo(datasetPedidoCompra){
	$(datasetPedidoCompra).each(function(){
		// sandro - 21/05
		var linhasItens = $('#tbItens tbody tr:gt(0)');
		var linhaItem = '';
		var itemBio = $(this).prop("cdProduto");
		console.log("carregaTabelaCotacoesBionexo >> itemBio = " + itemBio);
		var item = itemBio.lpad(0,6);
		// codigo do item volta do bionexo sem 0 a esquerda
		console.log("carregaTabelaCotacoesBionexo >> item = " + item);
		$(linhasItens).each(function(){
			var indiceLinha = buscaIndicePaiFilho($(this).find("[name]")[0]);
			var codItemLinha = document.getElementById('txtCodItemProduto___'+indiceLinha).value;
			console.log("carregaTabelaCotacoesBionexo >> indiceLinha = " + indiceLinha);
			console.log("carregaTabelaCotacoesBionexo >> codItemLinha = " + codItemLinha);
			if(codItemLinha == item){
				linhaItem = indiceLinha;
			}
		});
		console.log("carregaTabelaCotacoesBionexo >> linhaItem = " + linhaItem);
		var codSequencia = $("#txtSeqItemProduto___"+ linhaItem).val();
		var DescProduto = $("#txtDescProduto___"+ linhaItem).val();
		var ObsProduto = $("#txtObsProduto___"+ linhaItem).val();
		var indice = wdkAddChild("tbCotacoes");
		setZooms();
		var txtNomeFornecCotacao 	= $(this).prop("razaoSocial")
		var txtQuantidadeProduto 	= $(this).prop("quantidade");
		var txtUnidMedProduto 		= $(this).prop("embalagem");
		var codItemCotacao 			= $(this).prop("cdProduto");
		var codCondPgto 			= $(this).prop("idFormaPagamento");
		var nmCondPgto 				= $(this).prop("nmFormaPagamento");
		var precoUnitario	  		= $(this).prop("precoUnitario");
		var precoTotal		  		= $(this).prop("precoTotal");
		var marca		  			= $(this).prop("fabricante");
		var prazo		  			= $(this).prop("prazoEntrega");
		var selecionado		  		= $(this).prop("selecionado");
		var cnpjFornCotacao		  	= $(this).prop("cnpj");
		$("#codItemCotacao___"+indice).val(formataCodigoItem(codItemCotacao));
		$("#descFornecedorCotacao___"+indice).val(txtNomeFornecCotacao);
		$("#qtdeItemCotacao___"+indice).val(txtQuantidadeProduto);
		$("#umItemCotacao___"+indice).val(txtUnidMedProduto);
		$("#descCondPgtoItemCotacao___"+indice).val(nmCondPgto);
		$('#outrasDespItemCotacao___' + indice).val("R$ 0,00");
		$('#vlrIpiItemCotacao___' + indice).val("R$ 0,00");
		$("#vlrUnitItemCotacao___" + indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 4, allowZero: true});
		$('#vlrUnitItemCotacao___' + indice).maskMoney('mask', parseFloat(precoUnitario+""));
		$("#vlrTotalItemCotacao___" + indice).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
		$('#vlrTotalItemCotacao___' + indice).maskMoney('mask', parseFloat(precoTotal+""));
		$('#descFabricante___' + indice).val(marca);
		$('#prazoItemCotacao___' + indice).val(prazo);
		if(selecionado == "true" || selecionado == true){
			$("#vencedoraCotacao___"+ indice).prop("checked",selecionado);
		}
		$("#cnpjFornCotacao___"+ indice).val(cnpjFornCotacao);
		$("#SeqItemCotacao___"+ indice).val(codSequencia);
		/// sandro - 21/05
		$("#DescItemCotacao___"+indice).val(DescProduto);
		$("#ObsItemCotacao___"+indice).val(ObsProduto);
		console.log("carregaTabelaCotacoesBionexo >> prazoItemCotacao___ = " + $("#prazoItemCotacao___"+indice).val());
		getClosestByElement($("#codItemCotacao___"+indice),"tr").find(":text").each(function(){
			$(this).prop("readonly",true);
			if(!$(this).hasClass("readonly")){
				$(this).addClass("readonly");
			}
		});
		redimensionaTabelaCotacoesBionexo();
	});
	calculaTotalCotacoes();
}

function enviaCotacaoBionexo(){
	var requisicao = $("#txtSolicitacao").val();
	var dataValidadeCotacao = $('#dtValidadeCotacao').val();
	var horaValidadeCotacao = $('#hrValidadeCotacao').val();
	var observacoes = $('#txtResumoSolicitacao').val();
	var linhasTabelaItens = $("#tbItens tbody tr:gt(0)");
	var msgRetorno = "";
	if(dataValidadeCotacao != "" && horaValidadeCotacao != "" && linhasTabelaItens.length > 0){
		var objBio = new objBionexo();
		objBio.setCabecalhoXml(requisicao, dataValidadeCotacao, horaValidadeCotacao, observacoes);
		var indice = 1;
		$(linhasTabelaItens).each(function(){
			var codItemProduto = $(this).find("input[name^='txtCodItemProduto']").val();
			if(codItemProduto == "")
				msgRetorno = msgRetorno + "-[Linhas "+indice+"] É obrigatorio a seleção de um produto para a cotação<br>";
			var quantidadeProduto = $(this).find("input[name^='txtQuantidadeProduto']").val();
			if(quantidadeProduto == "")
				msgRetorno = msgRetorno + "-[Linhas "+indice+"] É obrigatorio informar uma quantidade para a cotação<br>";
			var dtNecessidadeProduto = $(this).find("input[name^='dtNecessidadeProduto']").val();
			if(dtNecessidadeProduto == "")
				msgRetorno = msgRetorno + "-[Linhas "+indice+"] É obrigatorio informar uma data de Necessidade para a cotação<br>";
			var descItemProduto = $(this).find("input[name^='txtDescItemProduto']").val();
			objBio.setItemRequisicao(codItemProduto, descItemProduto, quantidadeProduto, dtNecessidadeProduto);
			indice++;
		});
		if(msgRetorno == ""){
			var filialProtheus = $("#filial_protheus").val();
			var datasetEnvioCotacao = objBio.enviaCotacao(filialProtheus);
			if(datasetEnvioCotacao[0]["status"] == "sucesso"){
				msgRetorno = "O PDC "+datasetEnvioCotacao[0]["mensagem"]+" foi gerado";
				$("#txtNrPDC").val(datasetEnvioCotacao[0]["mensagem"]);
				$("#btEnviaBionexo").prop("disabled",true);
				$("#btEnviaBionexo").unbind("click" );
				$("#btEnviaBionexo").off();
				$("#btEnviaBionexo").addClass("disabledBtnPrimary");
			}else if(datasetEnvioCotacao[0]["status"] == "erro"){
				msgRetorno = "[ERRO] Ocorreram erros na integração com o Bionexo:<br>-" + datasetEnvioCotacao[0]["mensagem"];
			}
		}
	}else{
		msgRetorno = "Os campos abaixo são obrigatórios para o envio de cotação<br>";
		if(dataValidadeCotacao == "" )
			msgRetorno = msgRetorno +"-Data de Validade da Cotação<br>";
		if(horaValidadeCotacao == "")
			msgRetorno = msgRetorno +"-Hora de Validade da Cotação<br>";
		if(linhasTabelaItens.length == 0)
			msgRetorno = msgRetorno +"-Inisira pelo menos 1 item para cotação<br>";
	}
	escondeLoading();
	FLUIGC.message.alert({
		message: msgRetorno,
		title: 'Enviar Cotação Bionexo',
		label: 'OK'
	});
}

/*******************************************************************
 * 						Mascaras e validadores
 *
 *******************************************************************/
/* TODO Mascaras e validadores */
function adicionaDatePicker(campo){
	$('#'+campo).datepicker({
		dateFormat: 'dd/mm/yy',
		dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'],
		dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
	});
}

function destroyDatePicker(campo){
	$('#'+campo).datepicker("destroy");
}

function retiraCaracteresCNPJ(cnpj){
	cnpj = cnpj.replace(/\./g,'');
	cnpj = cnpj.replace(/\-/g,'');
	cnpj = cnpj.replace(/\//g,'');
	return cnpj;
}

function formataCnpj(cnpj){
	//Remove tudo o que não é dígito
	cnpj=cnpj.replace(/\D/g,"")
	//Coloca ponto entre o segundo e o terceiro dígitos
	cnpj=cnpj.replace(/^(\d{2})(\d)/,"$1.$2")
	//Coloca ponto entre o quinto e o sexto dígitos
	cnpj=cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
	//Coloca uma barra entre o oitavo e o nono dígitos
	cnpj=cnpj.replace(/\.(\d{3})(\d)/,".$1/$2")
	//Coloca um hífen depois do bloco de quatro dígitos
	cnpj=cnpj.replace(/(\d{4})(\d)/,"$1-$2")
	return cnpj
}

function converteMoedaFloat(valor) {
	if(valor == undefined || valor == "")
		valor = "0";
	if(!(typeof valor === 'string'))
		valor = valor+"";
	valor = valor.replace("R$ ",'');
	if(valor.indexOf(",") > -1){
		valor = valor.replace(/\./g,'');
		valor = valor.replace(",",".");
	}
	valor = parseFloat(valor);
	return valor;
}

function converteFloatMoeda(valor){
	var inteiro = null;
	var decimal = null;
	var c = null;
	var j = null;
	var aux = new Array();
	valor = "" + valor;
	c = valor.indexOf(".",0);
	//encontrou o ponto na string<br>
	if(c > 0){
		//separa as partes em inteiro e decimal
		inteiro = valor.substring(0,c);
		decimal = valor.substring(c+1,valor.length);
	}else{
		inteiro = valor;
	}
	//pega a parte inteiro de 3 em 3 partes<br>
	for (j = inteiro.length, c = 0; j > 0; j-=3, c++){
		aux[c]=inteiro.substring(j-3,j);
	}
	//percorre a string acrescentando os pontos<br>
	inteiro = "";
	for(c = aux.length-1; c >= 0; c--){
		inteiro += aux[c]+'.';
	}
	//retirando o ultimo ponto e finalizando a parte inteiro<br>
	inteiro = inteiro.substring(0,inteiro.length-1);
	if(inteiro == ""){
		inteiro = "0";
	}
	decimal = parseInt(decimal);
	if(isNaN(decimal)){
		decimal = "00";
	}else{
		decimal = ""+decimal;
		if(decimal.length === 1){
			decimal = "0" + decimal;
		}
	}
	valor = "R$ "+ inteiro +","+decimal;
	return valor;
}

/*******************************************************************
 * 						Zoom
 *
 *******************************************************************/

function openZoom() {
	customZoom = true;
	window.open('/webdesk/zoom.jsp?datasetId=colleague&dataFields=colleagueName,Nome,mail,E-mail&resultFields=mail,colleagueName&type=colleague&filterValues=active,true', 'zoom', 'status, scrollbars=no, width=600, height=350, top=0, left=0');
}

/*******************************************************************
 * 						Consultas Protheus
 *
 *******************************************************************/

/*
 * Busca dados do fornecedor
 *
 */
function alimentarInfoFornece(linhaFornecedor) {
	var codigoFornecedor = $(linhaFornecedor).find("[name^=txtCnpjFornecCotacao___]").val();
	var selecionado = $(linhaFornecedor).hasClass("linhaSelecionada");
	if(selecionado == false){
		$("#txtStatusFornec").val("");
		$("#txtRazaoFantasiaFornec").val("");
		$("#txtCnpjFornec").val("");
		$("#txtInscEstadFornec").val("");
		$("#txtCepFornec").val("");
		$("#txtLogradouroFornec").val("");
		$("#txtCidadeFornec").val("");
		$("#txtFornecEndereco").val("");
		$("#txtCidadeFornec").val("");
		$("#txtEstadoFornec").val("");
		$("#txtEstadoSiglaFornec").val("");
		$("#txtPaisSiglaFornec").val("");
		$("#txtTelefoneFornec").val("");
		$("#txtFaxFornec").val("");
		$("#txtContatoFornec").val("");
		$("#txtMailFornec").val("");
		$("#txtTipoFornec").val("");
		$("#txtCategoriaFornec").val("");
	}else{
		var codigoFornecedorFormatado = codigoFornecedor.replace(/\./g,'');
		codigoFornecedorFormatado = codigoFornecedorFormatado.replace(/\-/g,'');
		codigoFornecedorFormatado = codigoFornecedorFormatado.replace(/\//g,'');
		var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
		// Informa a tabela
		fornecedorDataSet.setCampo("SA2");
		// Informar o filtro no where
		fornecedorDataSet.setCampo("A2_CGC = '" + codigoFornecedorFormatado+"' ");
		// Informa as colunas da query
		fornecedorDataSet.setCampo("A2_MSBLQL,A2_NOME,A2_CGC,A2_INSCR,A2_CEP,A2_END,A2_MUN,A2_ESTADO,A2_CONTATO,A2_EST,A2_PAIS,A2_TEL,A2_FAX,A2_EMAIL,A2_TIPO,A2_ULTCOM");
		fornecedorDataSet.filtrarBusca();
		var dadosFornecedor = fornecedorDataSet.getDados();
		var erro = dadosFornecedor.values[0].ERRO;
		if(erro == undefined){
			var dados = '';
			for ( var pos in dadosFornecedor.values) {
				dados = dadosFornecedor.values[pos];
				$("#txtStatusFornec").val(dados.A2_MSBLQL == "1"? "Bloquado" : "Ativo"); //1 = BLOQUEADO 2 = ATIVO
				$("#txtRazaoFantasiaFornec").val(dados.A2_NOME);
				$("#txtCnpjFornec").val(dados.A2_CGC);
				$("#txtInscEstadFornec").val(dados.A2_INSCR);
				$("#txtCepFornec").val(dados.A2_CEP);
				$("#txtLogradouroFornec").val(dados.A2_END);
				$("#txtCidadeFornec").val(dados.A2_MUN);
				$("#txtFornecEndereco").val(dados.A2_END);
				$("#txtCidadeFornec").val(dados.A2_TEL);
				$("#txtEstadoFornec").val(estados[dados.A2_EST].nome);
				$("#txtEstadoSiglaFornec").val(dados.A2_EST);
				$("#txtPaisSiglaFornec").val(dados.A2_PAIS);
				$("#txtTelefoneFornec").val(dados.A2_TEL);
				$("#txtFaxFornec").val(dados.A2_FAX);
				$("#txtContatoFornec").val(dados.A2_CONTATO);
				$("#txtMailFornec").val(dados.A2_EMAIL);
				$("#txtTipoFornec").val(dados.A2_TIPO == "J" ? "Jurídico" : (dados.A2_TIPO == "F" ? "Físico" : "Outros"));
				$("#txtCategoriaFornec").val(dados.A2_ULTCOM != "" ? dados.A2_ULTCOM.substr(6,2)+"/"+dados.A2_ULTCOM.substr(4,2)+"/"+dados.A2_ULTCOM.substr(0,4) : "");
				alimentarPaisFornece(dados.A2_PAIS);
			}
		}else{
			var objBio = objBionexo();
			var datasetFornecedoresBionexo = objBio.buscaFornecedores(codigoFornecedor, $("#filial_protheus").val());
			if(datasetFornecedoresBionexo.length > 0){
				$("#txtStatusFornec").val("Não cadastrado no Protheus"); //1 = BLOQUEADO 2 = ATIVO
				$("#txtRazaoFantasiaFornec").val(datasetFornecedoresBionexo[0]['razaoSocial']);
				$("#txtCnpjFornec").val(datasetFornecedoresBionexo[0]['cnpj']);
				$("#txtInscEstadFornec").val(datasetFornecedoresBionexo[0]['inscricaoEstadual']);
				$("#txtCepFornec").val(datasetFornecedoresBionexo[0]['cep']);
				$("#txtLogradouroFornec").val(datasetFornecedoresBionexo[0]['logradouro']);
				$("#txtCidadeFornec").val(datasetFornecedoresBionexo[0]['cidade']);
				$("#txtEstadoFornec").val(datasetFornecedoresBionexo[0]['estado']);
				$("#txtEstadoSiglaFornec").val(datasetFornecedoresBionexo[0]['estadoSigla']);
				$("#txtPaisSiglaFornec").val(datasetFornecedoresBionexo[0]['paisSigla']);
				$("#txtPaisFornec").val(datasetFornecedoresBionexo[0]['pais']);
				$("#txtTelefoneFornec").val(datasetFornecedoresBionexo[0]['telefone']);
				$("#txtFaxFornec").val(datasetFornecedoresBionexo[0]['fax']);
				$("#txtContatoFornec").val(datasetFornecedoresBionexo[0]['contato']);
				$("#txtMailFornec").val(datasetFornecedoresBionexo[0]['email']);
			}
		}
	}
}

function alimentarPaisFornece(codPais) {
	if( codPais == null || codPais == undefined || codPais.trim() == ""){
		return;
	}
	var paisDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	paisDataSet.setCampo("SYA");
	// Informar o filtro no where
	paisDataSet.setCampo("YA_CODGI = " + codPais);
	// Informa as colunas da query
	paisDataSet.setCampo("YA_DESCR");
	paisDataSet.filtrarBusca();
	var dadosPais = paisDataSet.getDados();
	var dados = '';
	for ( var pos in dadosPais.values) {
		dados = dadosPais.values[pos];
		$("#txtPaisFornec").val(dados.YA_DESCR);
	}
}

function alimentaFilial() {
	$("[name=codigo]").change(function () {
        var filialId = $("[name=codigo]").val();
        var filialDataSet = new objDataSet("filiais");
        filialDataSet.setCampo("filial");
        filialDataSet.setFiltro("codigo", filialId, filialId, true);
        filialDataSet.filtrarBusca();
        var dadosFilialProtheus = filialDataSet.getDados();
        var unidade = dadosFilialProtheus.values[0].filial;
        $("[name=hiddenFilial]").val(unidade);
		$('#analyticsNmFilial').val(unidade);
    });
}

function limpaCampoChangeFilial() {
    $("[name=codigo]").change(function () {
        $("[name=CTT_DESC01]").val("");
        $("[name=CTT_CUSTO]").val("");
        $("[name=NNR_CODIGO]").val("");
        $("[name=NNR_DESCRI]").val("");
    });
}

function alimentarUnidadeProtheus() {
    $("[name=codigo]").change(function () {
        var filialId = $("[name=codigo]").val();
        var filialDataSet = new objDataSet("filiais");
        filialDataSet.setCampo("filial_protheus");
        filialDataSet.setFiltro("codigo", filialId, filialId, true);
        filialDataSet.filtrarBusca();
        var dadosFilialProtheus = filialDataSet.getDados();
        var filialProtheusId = dadosFilialProtheus.values[0].filial_protheus;
        $("[name=filial_protheus]").val(filialProtheusId);
        $("[name=codigo_filial]").val(filialId);
        $("[name=F1_FILIAL]").val(filialProtheusId);
        $('#FilialAlcada').val(filialId);
		var filial = dadosFilialProtheus.values[0].filial;
		var endereco_filial = dadosFilialProtheus.values[0].endereco_filial;
		var cidade_filial = dadosFilialProtheus.values[0].cidade_filial;
		var uf_filial = dadosFilialProtheus.values[0].uf_filial;
		var cnpj_filial = dadosFilialProtheus.values[0].cnpj_filial;
		$("#nomeFilialEnt").val(filial);
		$("#endFilialEnt").val(endereco_filial);
		$("#cidFilialEnt").val(cidade_filial);
		$("#ufFilialEnt").val(uf_filial);
		$("#cnpjFilialEnt").val(cnpj_filial);
    });
}

function alimentarUnidadeProtheusEntrega() {
	$("[name=nmFilialEntrega]").change(function() {
		var filialId = $("[name=nmFilialEntrega] option:selected").val();
		var filialDataSet = new objDataSet("filiais");
		filialDataSet.setCampo("filial_protheus");
		filialDataSet.setCampo("codigo");
		filialDataSet.setFiltro("codigo", filialId, filialId, true);
		filialDataSet.filtrarBusca();
		var dadosFilialProtheus = filialDataSet.getDados();
		var filialProtheusId = dadosFilialProtheus.values[0].filial_protheus;
		$("[name=filial_protheus_entrega]").val(filialProtheusId);
	});
}

function alimentaDadosComplementaresFornecedores(index){
	$("[name=txtCodFornecCotacao___"+index+"]").change(function(){
		alimentaCNPJFornecedor(index, $(this));
	});
}

function alimentaHiddensCotacao(index, campo){
	$("#codFornecedorCotacao_hidden___"+index).val($("#txtCodFornecCotacao___"+index).val());

}

function alimentaCNPJFornecedor(index, campo){
	var cdFornecedor = campo.val();
	var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
	var unidade = $("[name=filial_protheus]").val();
	// Informa a tabela
	fornecedorDataSet.setCampo("SA2");
	// Informar o filtro no where
	fornecedorDataSet.setCampo("A2_COD = " + cdFornecedor+" ");
	// Informa as colunas da query
	fornecedorDataSet.setCampo("A2_CGC,A2_LOJA");
	fornecedorDataSet.filtrarBusca();
	var dadosConsumoMedio = fornecedorDataSet.getDados();
	var dados = '';
	for ( var pos in dadosConsumoMedio.values) {
		dados = dadosConsumoMedio.values[pos];
		$("[name=txtLojaFornecCotacao___"+index+"]").val($.trim(dados.A2_LOJA));
		$("[name=txtCnpjFornecCotacao___"+index+"]").val($.trim(dados.A2_CGC));
	}
}

function alimentaDadosComplementaresItem(index){
	if($('input[name*="txtSeqItemProduto___"]').length <= 1) $('[name=hiddenTipoProduto]').val('COMPRAS');
	adicionaDatePicker("dtNecessidadeProduto___" + index);
	$("dtNecessidadeProduto___" + index).change(function(){
		validaPrazoSLA($(this));
	});
	$("[name=sPrioridadeProduto___"+ index +"]").change(function (){
		var filialNm = $("[name=hiddenFilial]").val();
		var primeiraLinha 		= $('#tbItens tbody tr:gt(0):first');
		var prioridadeItem		= $(primeiraLinha).find('[name^=sPrioridadeProduto___]  option:selected').val();
		var codMaterialItem 	= $(primeiraLinha).find('[name^=tipoProduto___]').val();
		if(codMaterialItem != '' && codMaterialItem != undefined){
			if(!validaMaterialMATMED(codMaterialItem)){
				if(codMaterialItem == "SV"){
					$('[name=hiddenTipoProdSolicitacao]').val('SRV');
					$('[name=hiddenTipoProduto]').val('SRV');
				}else{
					$('[name=hiddenTipoProdSolicitacao]').val('DIV');
					$('[name=hiddenTipoProduto]').val('DIV');
				}
			}else{
				$('[name=hiddenTipoProdSolicitacao]').val('MAT/MED');
				$('[name=hiddenTipoProduto]').val('MAT/MED');
			}
		}else{
			$('[name=hiddenTipoProdSolicitacao]').val('DIV');
			$('[name=hiddenTipoProduto]').val('COMPRAS');
		}
		$('[name=hiddenPrioridadeSolicitacao]').val(prioridadeItem);
	});
	var sequencia = buscaSequenciaItens("tbItens");
	$("#txtSeqItemProduto___"+index).val(sequencia);
	$("#txtIdArmazemProduto___"+index).val("01");
	$("#txtArmazemProduto___"+index).val("FARMACIA");
	$('#txtQuantidadeProduto___'+index).mask('?999999999999');
	adicionaChangeEventProduto(index);
}

function adicionaChangeEventProduto(index){
	console.log("teste");
	$("[name=txtCodItemProduto___"+index+"]").change(function() {
		$(this).val($.trim($(this).val()));
		var codProduto = $(this).val();
		var produtoExiste = validaItemExistente($(this));
		if(produtoExiste){
			alimentarSaldoProtheus(index, $(this));
			alimentarConsumoMedioProtheus(index, $(this));
			alimentarUnidadeMedidaProtheus(index, $(this));
			var filialNm = $("[name=hiddenFilial]").val();
			var primeiraLinha 		= $('#tbItens tbody tr:gt(0):first');
			var codMaterialItem 	= $(primeiraLinha).find('[name^=tipoProduto___]').val();
			var prioridadeItem		= $(primeiraLinha).find('[name^=sPrioridadeProduto___]  option:selected').val();
			console.log('Primeira linha ' + codMaterialItem);
			var materialCorrente 	= $('[name=tipoProduto___'+index+']').val();
			console.log('Corrente ' + materialCorrente);
			if(codMaterialItem != '' || codMaterialItem != undefined){
				if(validaMaterialMATMED(materialCorrente)){
					if(!validaMaterialMATMED(codMaterialItem)){
						setTimeout(function(){
							limpaDadosItem(index);
						}, 500);
						$("[name=txtCodItemProduto___"+index+"]").val('');
						$("[name=txtSaldoProduto___"+index+"]").val('');
						$("[name=txtConsumoMedio___"+index+"]").val('');
						$("[name=txtUnidMedProduto___"+index+"]").val('');
						$("[name=nmFabricante___"+index+"]").val('');
						$("[name=txtContaContabil___"+index+"]").val('');
						$("[name=tipoProduto___"+index+"]").val('');
						$("[name=txtQuantidadeProduto___"+index+"]").val('');
						$("[name=txtObsProduto___"+index+"]").val('');
						$("[name=dtNecessidadeProduto___"+index+"]").val('');

						FLUIGC.message.alert({
							message: 'Tipo de material da solicitação é Diversos - Você não deve incluir itens do tipo mat/med com itens do tipo diversos ',
							title: 'Solicitação de Compras',
							label: 'OK'
						}, function(el, ev) {});
					}else{
						$('#hiddenPrioridadeSolicitacao').val(prioridadeItem);
						$('#hiddenTipoProduto').val('MAT/MED');
						$('#grupoAnaliseComprador').val('Pool:Group:CM');
					}
				}else{
					if(validaMaterialMATMED(codMaterialItem)){
						setTimeout(function(){
							limpaDadosItem(index);
						}, 500);
						$("[name=txtCodItemProduto___"+index+"]").val('');
						$("[name=txtSaldoProduto___"+index+"]").val('');
						$("[name=txtConsumoMedio___"+index+"]").val('');
						$("[name=txtUnidMedProduto___"+index+"]").val('');
						$("[name=nmFabricante___"+index+"]").val('');
						$("[name=txtContaContabil___"+index+"]").val('');
						$("[name=tipoProduto___"+index+"]").val('');
						$("[name=txtQuantidadeProduto___"+index+"]").val('');
						$("[name=txtObsProduto___"+index+"]").val('');
						$("[name=dtNecessidadeProduto___"+index+"]").val('');
						FLUIGC.message.alert({
							message: 'Tipo de material da solicitação é Mat/Med - Você não deve incluir itens do tipo diversos com itens do tipo mat/med ',
							title: 'Solicitação de Compras',
							label: 'OK'
						}, function(el, ev) {});
					}else{
						if(codMaterialItem == "SV"){
							$('#hiddenPrioridadeSolicitacao').val(prioridadeItem);
							$('#hiddenTipoProduto').val('SRV');
						}else{
							$('#hiddenPrioridadeSolicitacao').val(prioridadeItem);
							$('#hiddenTipoProduto').val('DIV');
						}
						$('#grupoAnaliseComprador').val('Pool:Group:CD');
					}
				}
				var todasLinhas			= $('#tbItens tbody tr:gt(1)');
				$(todasLinhas).each(function (){
					var el = $(this).find("[name^=txtCodItemProduto___]");
					var indexLinha = buscaIndicePaiFilho(el);
					var codMaterialLinha = $(this).find('[name^=tipoProduto___]').val();
					console.log('linha for atual ' + codMaterialLinha);
					if((validaMaterialMATMED(codMaterialItem)) && (!validaMaterialMATMED(codMaterialLinha))){
						if(codMaterialLinha != codMaterialItem){
							setTimeout(function(){
								limpaDadosItem(indexLinha);
							}, 500);
							$(this).find("[name^=txtCodItemProduto___]").val('');
							$(this).find("[name^=txtSaldoProduto___]").val('');
							$(this).find("[name^=txtConsumoMedio___]").val('');
							$(this).find("[name^=txtUnidMedProduto___]").val('');
							$(this).find("[name^=nmFabricante___]").val('');
							$(this).find("[name^=txtContaContabil___]").val('');
							$(this).find("[name^=tipoProduto___]").val('');
							$(this).find("[name^=txtQuantidadeProduto___]").val('');
							$(this).find("[name^=prazoProduto___]").val('');
							$(this).find("[name^=txtObsProduto___]").val('');
							$(this).find("[name^=dtNecessidadeProduto___]").val('');
						}
					}else if(!validaMaterialMATMED(codMaterialItem)){
						if(validaMaterialMATMED(codMaterialLinha)){
							setTimeout(function(){
								limpaDadosItem(indexLinha);
							}, 500);
							$(this).find("[name^=txtCodItemProduto___]").val('');
							$(this).find("[name^=txtSaldoProduto___]").val('');
							$(this).find("[name^=txtConsumoMedio___]").val('');
							$(this).find("[name^=txtUnidMedProduto___]").val('');
							$(this).find("[name^=nmFabricante___]").val('');
							$(this).find("[name^=txtContaContabil___]").val('');
							$(this).find("[name^=tipoProduto___]").val('');
							$(this).find("[name^=txtQuantidadeProduto___]").val('');
							$(this).find("[name^=prazoProduto___]").val('');
							$(this).find("[name^=txtObsProduto___]").val('');
							$(this).find("[name^=dtNecessidadeProduto___]").val('');
						}
					}
				});
			}
			var grupoAnaliseComprador = $('#grupoAnaliseComprador').val();
			if(grupoAnaliseComprador == "Pool:Group:CM"){
				aplicaEstiloObrigatorioTabela($("#tbItens"),["Armazém"]);
			}else{
				retiraEstiloObrigatorioTabela($("#tbItens"),["Armazém"]);
			}
		}else{
			var indice = buscaIndicePaiFilho($(this));
			if(mostrouModal == false){
				mostrouModal = true;
				setTimeout(function(){
					limpaDadosItem(indice);
					FLUIGC.message.alert({
						message: "Já existe um produto com o código "+$.trim(codProduto)+" para a cotação "+indice,
						title: 'Adicionar Produto',
						label: 'OK'
					});
				}, 500);
			}else{
				mostrouModal = false;
			}
		}
	});
}

function limpaDadosItem(indice){
	$("#txtDescProduto___"+indice).val('');
	$("#txtCodItemProduto___"+indice).val('');
	$("#txtSaldoProduto___"+indice).val('');
	$("#txtConsumoMedio___"+indice).val('');
	$("#txtUnidMedProduto___"+indice).val('');
	$("#nmFabricante___"+indice).val('');
	$("#txtContaContabil___"+indice).val('');
	$("#tipoProduto___"+indice).val('');
	$("#txtArmazemProduto___"+indice).val('');
	$("#txtIdArmazemProduto___"+indice).val('');
}

function validaItemExistente(campoCodProduto){
	var count = 0;
	$("#tbItens tbody tr:gt(0)").each(function(){
		var valorCampoCodPRoduto = $.trim($(campoCodProduto).val());
		var valorCodProdutoLinha = $.trim($(this).find("[name^=txtCodItemProduto___]").val());
		if( valorCodProdutoLinha == valorCampoCodPRoduto)
			count++;
	});
	return (count < 2);
}

function alimentarSaldoProtheus(index, campo) {
	var cdProduto = $(campo).val();
	var unidade = $("[name=filial_protheus]").val();
	var consumoMedioDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	consumoMedioDataSet.setCampo("SB2___" + unidade);
	// Informar o filtro no where
	consumoMedioDataSet.setCampo("B2_COD = " + "'"+cdProduto+"' ");
	// Informa as colunas da query
	consumoMedioDataSet.setCampo("B2_QATU");
	consumoMedioDataSet.filtrarBusca();
	var dadosConsumoMedio = consumoMedioDataSet.getDados();
	var dados = '';
	var saldoTotal = 0;
	for ( var pos in dadosConsumoMedio.values) {
		dados = dadosConsumoMedio.values[pos];
		var saldo = $.trim(dados.B2_QATU);
		if(saldo == "") saldo = "0";
		saldoTotal = saldoTotal + parseInt(saldo);

	}
	$("[name=txtSaldoProduto___"+index+"]").val(parseInt(saldoTotal));
}

function alimentarConsumoMedioProtheus(index, campo) {
	var unidade = $("[name=filial_protheus]").val();
	var cdProduto = $(campo).val();
	var consumoMedioDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	consumoMedioDataSet.setCampo("SB3___"+unidade);
	// Informar o filtro no where
	consumoMedioDataSet.setCampo("B3_COD = " + "'"+cdProduto+"' ");
	// Informa as colunas da query
	consumoMedioDataSet.setCampo("B3_MEDIA");
	consumoMedioDataSet.filtrarBusca();
	var dadosConsumoMedio = consumoMedioDataSet.getDados();
	var dados = '';
	for ( var pos in dadosConsumoMedio.values) {
		dados = dadosConsumoMedio.values[pos];
		var media = $.trim(dados.B3_MEDIA);
		if(media == "") media = "0";
		$("[name=txtConsumoMedio___"+index+"]").val(media);
	}
}

function alimentarUnidadeMedidaProtheus(index, campo){
	var cdProduto = $(campo).val();
	var consumoMedioDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	consumoMedioDataSet.setCampo("SB1");
	// Informar o filtro no where
	consumoMedioDataSet.setCampo("B1_COD = " + "'" + cdProduto + "' ");
	// Informa as colunas da query
	consumoMedioDataSet.setCampo("B1_UM,B1_FABRIC,B1_CONTA,B1_TIPO");
	consumoMedioDataSet.filtrarBusca();
	var dadosConsumoMedio = consumoMedioDataSet.getDados();
	var dados = '';
	for ( var pos in dadosConsumoMedio.values) {
		dados = dadosConsumoMedio.values[pos];
		$("[name=txtUnidMedProduto___"+index+"]").val($.trim(dados.B1_UM));
		$("[name=nmFabricante___"+index+"]").val($.trim(dados.B1_FABRIC));
		$("[name=txtContaContabil___"+index+"]").val($.trim(dados.B1_CONTA));
		$("[name=tipoProduto___"+index+"]").val($.trim(dados.B1_TIPO));
	}
}

function validaUnidadeSelecionada(botao){
	var filialId = $("[name=codigo]").val();
	if(filialId == null || filialId == "" || filialId == "00"){
		FLUIGC.message.alert({
			message: "É preciso selecionar a filial antes de escolher o produto",
			title: 'Filial Selecionada',
			label: 'OK'
		});
	}else{
		openZoomCustom(botao,true);
	}
}

function consultaFornecedorProtheus(){
	var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
	var unidade = $("[name=filial_protheus]").val();
	// Informa a tabela
	fornecedorDataSet.setCampo("SA2");
	var queryFornecedores = "";
	$.each(fornecedoresVencedores, function(index,value){
		var cnpj = index.replace(/\./g,'');
		cnpj = cnpj.replace(/\-/g,'');
		cnpj = cnpj.replace(/\//g,'');
		if(queryFornecedores == ""){
			queryFornecedores = "A2_CGC = '" + cnpj+"'";
		}else {
			queryFornecedores = queryFornecedores + " OR A2_CGC = '" + cnpj+"'";
		}
	});
	// Informar o filtro no where
	fornecedorDataSet.setCampo(queryFornecedores);
	// Informa as colunas da query
	fornecedorDataSet.setCampo("A2_COD,A2_NOME,A2_CGC");
	fornecedorDataSet.filtrarBusca();
	var dadosFornecedor = fornecedorDataSet.getDados();
	validaFornecedoresCadastrados(dadosFornecedor);
}

function listaCampos(){
	$('[name]').each(function(){
		console.log($(this).prop("name"));
	});
}

function alimentarFilialEntregaProtheus() {
	$("[name=nmFilialEntrega]").change(function() {
		var filialId = $("[name=nmFilialEntrega] option:selected").val();
		var filialDataSet = new objDataSet("filiais");
		filialDataSet.setCampo("filial_protheus");
		filialDataSet.setFiltro("codigo", filialId, filialId, true);
		filialDataSet.filtrarBusca();
		var dadosFilialProtheus = filialDataSet.getDados();
		var filialProtheusId = dadosFilialProtheus.values[0].filial_protheus;
		var filial = dadosFilialProtheus.values[0].filial;
		var endereco_filial = dadosFilialProtheus.values[0].endereco_filial;
		var cidade_filial = dadosFilialProtheus.values[0].cidade_filial;
		var uf_filial = dadosFilialProtheus.values[0].uf_filial;
		var cnpj_filial = dadosFilialProtheus.values[0].cnpj_filial;
		$("[name=hiddenFilialEntrega]").val(filialProtheusId);
		$("#nomeFilialEnt").val(filial);
		$("#endFilialEnt").val(endereco_filial);
		$("#cidFilialEnt").val(cidade_filial);
		$("#ufFilialEnt").val(uf_filial);
		$("#cnpjFilialEnt").val(cnpj_filial);
	});
}

function setChangeFornecedor(index){
	$('#txtCodFornecCotacao___' + index).change(function() {
		alimentarDadosFornec(this);
	});
}

function alimentaContatoFornPedido(fornec){
	var codigoFornecedor = fornec;
	var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	fornecedorDataSet.setCampo("SA2");
	// Informar o filtro no where
	fornecedorDataSet.setCampo("A2_COD = " + codigoFornecedor);
	// Informa as colunas da query
	fornecedorDataSet.setCampo("A2_CONTATO");
	fornecedorDataSet.filtrarBusca();
	var dadosFornecedor = fornecedorDataSet.getDados();
	var dados = '';
	dados = dadosFornecedor.values[0];
	return dados.A2_CONTATO;
}

function alimentarDadosFornec(fornec) {
	var codigoFornecedor = fornec.value;
	var linha = fornec.id.split("___")[1];
	var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
	//	Informa a tabela
	fornecedorDataSet.setCampo("SA2");
	//	Informar o filtro no where
	fornecedorDataSet.setCampo("A2_COD = " + codigoFornecedor);
	//	Informa as colunas da query
	fornecedorDataSet.setCampo("A2_STATUS,A2_NOME,A2_CGC,A2_INSCR,A2_CEP,A2_END,A2_MUN,A2_ESTADO,A2_EST,A2_PAIS,A2_TEL,A2_FAX,A2_EMAIL,A2_TIPO,A2_ULTCOM");
	fornecedorDataSet.filtrarBusca();
	var dadosFornecedor = fornecedorDataSet.getDados();
	var dados = '';
	for ( var pos in dadosFornecedor.values) {
		dados = dadosFornecedor.values[pos];
		$('#RazaoFantasiaFornec___' + linha).val(dados.A2_NOME);
		$('#CnpjFornec___' + linha).val(dados.A2_CGC);
		$('#LogradouroFornec___' + linha).val(dados.A2_END);
		$('#CidadeFornec___' + linha).val(dados.A2_MUN);
		$('#EstadoFornec___' + linha).val(dados.A2_ESTADO);
		$('#PaisFornec___' + linha).val(dados.A2_PAISDES);
		$('#ContatoFornec___' + linha).val(dados.A2_CONTATO);
		$('#DeptoFornec___' + linha).val("");
		$('#TelefoneFornec___' + linha).val(dados.A2_TEL);
		$('#MailFornec___' + linha).val(dados.A2_EMAIL);
	}
}

function buscaItemExistente(produto){
	var index = 0;
	var paramProduto = $.trim(produto);
	var itens = $('#tbItens tbody tr:gt(0):has(:text[value^='+ paramProduto +'])');
	$(itens).each(function(){
		var itemCurr = $(this).find("[name^=txtCodItemProduto___]").attr('name');
		index = itemCurr.split("___")[1];
	});
	return index;
}

function atualizaItemExistente(indexItem,quantidade){
	var qtdAtual = $("#txtQuantidadeProduto___" + indexItem).val();
	qtdAtual = Number(qtdAtual) + Number(quantidade);
	$("#txtQuantidadeProduto___" + indexItem).val(qtdAtual);
}

function marcaCamposObrigatorios(){
	//if(CURRENT_STATE == INICIO || CURRENT_STATE == INICIO_1 || CURRENT_STATE == CORRECAO_SOLICITACAO){
	if(CURRENT_STATE == INICIO || CURRENT_STATE == INICIO_1 || CURRENT_STATE == CORRIGIR_SOLICITACAO){
		aplicaEstiloObrigatorio([$("#codigo"),$("#txtCodCentroCusto"),$("#nmFilialEntrega"),$("#txtResumoSolicitacao"),$("#txtLocalEntrega")]);
		aplicaEstiloObrigatorioTabela($("#tbItens"),["Prioridade","Produto","Descrição","UN","Quant.","Saldo","Cons. Médio","Dt. Necessidade","Fabricante","CTA Contábil"]);
	}else if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		aplicaEstiloObrigatorio([$("#dtValidadeCotacao"),$("#hrValidadeCotacao"),$("#rdTipoCotacaoTabela")]);
	}else if(CURRENT_STATE == COTACAO){
		aplicaEstiloObrigatorio([$("#hrValidadeCotacao"),$("#rdTipoCotacaoTabela")]);
	}else if(CURRENT_STATE == DEFINIR_VENCEDOR){
		aplicaEstiloObrigatorio([$("#rdContratoNao")]);
	}else if(CURRENT_STATE == PREENCHER_FORMULARIO_CONTRATO){
		aplicaEstiloObrigatorio([$("#txtObjetoContrato"),$("#txtReajusteContrato"),$("#txtRescisaoContrato"),$("#txtValContrato"),$("#dtValidadeContrato")]);
	}else if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA ){
		aplicaEstiloObrigatorioTabela($("#tbPedidosGerados"),["Prazo Entrega"]);
	}else if(CURRENT_STATE == APROVACAO_DO_SOLICITANTE ){
		aplicaEstiloObrigatorio([ $("[name=aceite]") ]);
		bindChangeAceiteSolucao();
		ocultarMsgNovaSc();
	}else if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA ){
		aplicaEstiloObrigatorio([ $("#retorno")]);
	}
}

function bindChangeAceiteSolucao(){
	$("input[name='aceite']").change(function(){
		if($(this).val() == "N"){
			$(".reqCompSolicitente").show();
			$(".oculto").hide();
		}else{
			$(".reqCompSolicitente").hide();
			$(".oculto").show();
		}
	});
}

function ocultarMsgNovaSc(){
	var x = $("#aceiteSim:checked").val();
	if(x == "S"){
		$(".oculto").show();
	}
}

function aplicaEstiloObrigatorio(campos){
	for(var i = 0; i < campos.length; i++){
		var div = getClosestByClass($(campos[i]),'form-group');
		$(div).addClass("required");
	}
}

function aplicaEstiloObrigatorioTabela(tabela,campos){
	$(tabela).find("thead tr th").each(function(){
		var valorColuna = $(this);
		for(var i =0; i< campos.length; i++){
			var textoValorColuna = $.trim($(this).text()).replace(":","");
			var textoValorCampoAtual = campos[i];
			if(textoValorColuna == textoValorCampoAtual){
				$(valorColuna).html($(valorColuna).text() + "<span style='color:red'>*</span>");
				break;
			}
		}
	});
}

function retiraEstiloObrigatorioTabela(tabela,campos){
	$(tabela).find("thead tr th").each(function(){
		var valorColuna = $(this);
		for(var i =0; i< campos.length; i++){
			var textoValorColuna = $.trim($(this).text()).replace(":","").replace(" *","");
			var textoValorCampoAtual = campos[i];
			if(textoValorColuna == textoValorCampoAtual){
				$(valorColuna).html($(valorColuna).text().replace("(<span([^>]+)>([^>]+)<\/span>)","").replace(" *",""));
				break;
			}
		}
	});
}

function excluiItemPaiFilho(img){
	fnWdkRemoveChild(img);
	organizaSequenciaItens();
}

function organizaSequenciaItens(){
	var tbItens = $("#tbItens tbody tr:gt(0)");
	var indice = 1;
	tbItens.each(function(){
		$(this).find("[name^=txtSeqItemProduto___]").val(indice);
		indice++;
	});
}

//fim de semana 17/05
function gravaDadosFornecPed(fornec, linha) {
	var codigoFornecedor = fornec;
	var fornecedorDataSet = new objDataSet("consultaDadosProtheus");
	// Informa a tabela
	fornecedorDataSet.setCampo("SA2");
	// Informar o filtro no where
	fornecedorDataSet.setCampo("A2_COD = " + codigoFornecedor);
	// Informa as colunas da query
	fornecedorDataSet.setCampo("A2_STATUS,A2_NOME,A2_CGC,A2_INSCR,A2_CEP,A2_END,A2_MUN,A2_ESTADO,A2_EST,A2_PAIS,A2_TEL,A2_FAX,A2_EMAIL,A2_TIPO,A2_ULTCOM");
	fornecedorDataSet.filtrarBusca();
	var dadosFornecedor = fornecedorDataSet.getDados();
	var dados = '';
	for ( var pos in dadosFornecedor.values) {
		dados = dadosFornecedor.values[pos];
		$('#RazaoFantasiaFornecPed___' + linha).val(dados.A2_NOME);
		$('#CnpjFornecPed___' + linha).val(dados.A2_CGC);
		$('#LogradouroFornecPed___' + linha).val(dados.A2_END);
		$('#CidadeFornecPed___' + linha).val(dados.A2_MUN);
		$('#EstadoFornecPed___' + linha).val(dados.A2_ESTADO);
		$('#PaisFornecPed___' + linha).val(dados.A2_PAISDES);
		$('#ContatoFornecPed___' + linha).val(dados.A2_CONTATO);
		$('#DeptoFornecPed___' + linha).val("");
		$('#DeptoFornecPed___' + linha).val(dados.A2_TEL);
		$('#MailFornecPed___' + linha).val(dados.A2_EMAIL);
	}
}

function mostraLoading(funcao){
	myLoading2.show();
	if(funcao != undefined){
		setTimeout(function(){
			funcao();
		}, 300);
	}
}

function escondeLoading(){
	myLoading2.hide();
}

function removeDiacritics (str) {
	var defaultDiacriticsRemovalMap = [
	                                   {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
	                                   {'base':'AA','letters':/[\uA732]/g},
	                                   {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
	                                   {'base':'AO','letters':/[\uA734]/g},
	                                   {'base':'AU','letters':/[\uA736]/g},
	                                   {'base':'AV','letters':/[\uA738\uA73A]/g},
	                                   {'base':'AY','letters':/[\uA73C]/g},
	                                   {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
	                                   {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
	                                   {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
	                                   {'base':'DZ','letters':/[\u01F1\u01C4]/g},
	                                   {'base':'Dz','letters':/[\u01F2\u01C5]/g},
	                                   {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E\u0026]/g},
	                                   {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
	                                   {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
	                                   {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
	                                   {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
	                                   {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
	                                   {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
	                                   {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
	                                   {'base':'LJ','letters':/[\u01C7]/g},
	                                   {'base':'Lj','letters':/[\u01C8]/g},
	                                   {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
	                                   {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
	                                   {'base':'NJ','letters':/[\u01CA]/g},
	                                   {'base':'Nj','letters':/[\u01CB]/g},
	                                   {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
	                                   {'base':'OI','letters':/[\u01A2]/g},
	                                   {'base':'OO','letters':/[\uA74E]/g},
	                                   {'base':'OU','letters':/[\u0222]/g},
	                                   {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
	                                   {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
	                                   {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
	                                   {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
	                                   {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
	                                   {'base':'TZ','letters':/[\uA728]/g},
	                                   {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
	                                   {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
	                                   {'base':'VY','letters':/[\uA760]/g},
	                                   {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
	                                   {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
	                                   {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
	                                   {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
	                                   {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
	                                   {'base':'aa','letters':/[\uA733]/g},
	                                   {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
	                                   {'base':'ao','letters':/[\uA735]/g},
	                                   {'base':'au','letters':/[\uA737]/g},
	                                   {'base':'av','letters':/[\uA739\uA73B]/g},
	                                   {'base':'ay','letters':/[\uA73D]/g},
	                                   {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
	                                   {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
	                                   {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
	                                   {'base':'dz','letters':/[\u01F3\u01C6]/g},
	                                   {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD\u0026]/g},
	                                   {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
	                                   {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
	                                   {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
	                                   {'base':'hv','letters':/[\u0195]/g},
	                                   {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
	                                   {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
	                                   {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
	                                   {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
	                                   {'base':'lj','letters':/[\u01C9]/g},
	                                   {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
	                                   {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
	                                   {'base':'nj','letters':/[\u01CC]/g},
	                                   {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
	                                   {'base':'oi','letters':/[\u01A3]/g},
	                                   {'base':'ou','letters':/[\u0223]/g},
	                                   {'base':'oo','letters':/[\uA74F]/g},
	                                   {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
	                                   {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
	                                   {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
	                                   {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
	                                   {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
	                                   {'base':'tz','letters':/[\uA729]/g},
	                                   {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
	                                   {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
	                                   {'base':'vy','letters':/[\uA761]/g},
	                                   {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
	                                   {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
	                                   {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
	                                   {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g},
	                                   {'base':'','letters':/[\u0021\u0022\u0023\u0024\u0025\u0027\u0028\u0029\u002A\u002B\u002F\u003A\u003B\u003C\u003D\u003E\u003F\u0040\u005B\u005C\u005D\u005E\u005F\u0060\u007B\u007C\u007D\u007E\u00A6\u00A9\u00A8\u00AA\u00AC\u00B0\u00B2\u00B3\u00B4\u00BA\u2122\u00AE\u00B0\u00B2\u00B3\u2010\u2012\u00B0\u20AC\uFF04\u201E\u201A\u201C\u2018]/g}
	                                   ];
	for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
		str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
	}
	for(var j=0; j<str.length; j++) {
		var existe = false;
		var letra = str.substring(j, j+1);
		for(var i=0; i<defaultDiacriticsRemovalMap.length; i++) {
			if(defaultDiacriticsRemovalMap[i].base == letra){
				existe = true;
			}
		}
		if(existe == false){
			str = str.replace(letra," ");
		}
	}
	return str;
}

function contaCampos(){
	var count = 0;
	$("input:enabled,textarea:enabled,select:enabled").each(function(){
		count++;
	})
	console.log("Total de campos: "+count)
}

function getClosestByElement(element, selector){
	var max = 10;
	returnElement = undefined;
	while(returnElement == null && max >= 0){
		if($(element).is(selector)){
			returnElement = element;
		}else{
			element = element.parent();
		}
		max--;
	}
	return returnElement;
}

function getClosestByClass(element, selector){
	var max = 10;
	returnElement = undefined;
	while(returnElement == null && max >= 0){
		if($(element).hasClass(selector)){
			returnElement = element;
		}else{
			element = element.parent();
		}
		max--;
	}
	return returnElement;
}

function buscaDataNecessidadeLimite(){
	var cAtivo = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var cCodigoSLA = DatasetFactory.createConstraint("codigo_sla", "processoCompras", "processoCompras", ConstraintType.MUST);
	var datasetSLA = DatasetFactory.getDataset("ds_prazo_sla_form", null, new Array(cAtivo, cCodigoSLA), null).values;
	if(datasetSLA.length > 0){
		diasPrazoSLA = parseInt(datasetSLA[0]["prazo_sla"])
	}
}

function validaPrazoSLA(campo){
	var dataAtual = new Date();
	var dataLimite = new Date();
	for(var i = 0 ; i < diasPrazoSLA; i++){
		if(dataLimite.getDay() == 0 || dataLimite.getDay() == 6){
			i--;
		}
		dataLimite.setDate(dataLimite.getDate() + 1);
	}
	console.log("Data Limite "+dataLimite.getDate()+"/"+dataLimite.getMonth()+"/"+dataLimite.getFullYear());
}

function escondeCamposNegociacao(){
	$('#txtPropostaInic').maskMoney('mask', 0.00);
	$('#txtDesconto').maskMoney('mask', 0.00);
	$("#inputsNegociacao").hide();
}

function defineMotivoReprovacao(campo){
	var valorSelecionado = $("#"+campo.id+" option:selected").val()
	$("#motivoReprovacao").val(valorSelecionado);
}

function habilitaParecerContrato(){
	if( $("#ckFaltaDocumentacao").prop("checked") == true){
		$("#txtParecerContrato").prop("readonly",false);
		$("#txtParecerContrato").removeClass("readonly")
	}else{
		$("#txtParecerContrato").prop("readonly",true);
		if(!$("#txtParecerContrato").hasClass("readonly")){
			$("#txtParecerContrato").addClass("readonly")
		}
	}
}

String.prototype.extenso = function(c){
	var ex = [
	          ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
	          ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
	          ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
	          ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
	          ];
	var a, n, v, i, n = this.split("."), e = " e ", $ = "real", d = "centavo", sl;
	for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
		j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
		if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
		for(a = -1, l = v.length; ++a < l; t = ""){
			if(!(i = v[a] * 1)) continue;
			i % 100 < 20 && (t += ex[0][i % 100]) ||
			i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
			s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
					((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
		}
		a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
		a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
	}
	return r.join(e);
}

// Não deletar este método, apenas utilizado no mobile
function inicialMobile(){
}


function setZooms(){
	if(CURRENT_STATE == INICIO_1 || CURRENT_STATE == INICIO || CURRENT_STATE == CORRIGIR_SOLICITACAO){
		$(".zoomCentroCusto,.zoomFilial,.zoomProduto,.zoomArmazem").show();
		//Cria zoom de filiais
		$(".zoomFilial").on("click", function(event) {
			openZoom("filiais",
					"codigo,Código,filial,Filial,cnpj_filial,CNPJ",
					"codigo,filial,cnpj_filial,filial_protheus,cidade_filial,endereco_filial,uf_filial", "&filterValues=",
					event.target.id + '|filial');
		})

		//Cria zoom de centros de custo
		$(".zoomCentroCusto").on("click", function(event) {
			openZoom("ds_centroCusto",
					"CODIGO,Código,DESCRICAO,Centro de Custo",
					"CODIGO,DESCRICAO", "&filterValues=",
					event.target.id + '|centroCusto');
		})

		//Cria zoom de usuários do Fluig
		$(".zoomProduto").on("click", function(event) {
			openZoom("ds_produtos",
					"CODIGO,Código,DESCRICAO,Produto,UM,Unid.Medida,FABRICANTE,Fabricante",
					"CODIGO,DESCRICAO,UM,FABRICANTE", "&filterValues=",
					$(event.target).closest('td').last().find('input').attr('name').split('___')[1] + '|produto');
		})

		//Cria zoom de usuários do Fluig
		$(".zoomArmazem").on("click", function(event) {
			var filial = $('#filial_protheus').val();
			if(filial == ''){
				if(mostrouModal == false){
					mostrouModal = true;
					FLUIGC.message.alert({
						message: 'A Filial deve ser informada antes do Armazem',
						title: 'Atenção',
						label: 'OK'
					});
				}else{
					mostrouModal = false;
				}
			} else {
				openZoom("ds_armazem",
						 "CODIGO,Código,DESCRICAO,Descrição",
						 "CODIGO,DESCRICAO", "&filterValues=FILIAL," + filial,
						 $(event.target).closest('td').last().find('input').attr('name').split('___')[1] + '|armazem');
			}
		})

	} else {
		$(".zoomCentroCusto,.zoomFilial,.zoomProduto,.zoomArmazem").hide();
	}

	if(CURRENT_STATE == '28'){
		$(".zoomFornecedor").show();
		//Cria zoom de usuários do Fluig
		$(".zoomFornecedor").on("click", function(event) {
			openZoom("ds_fornecedores",
					"CODIGO,Código,DESCRICAO,Fornecedor,LOJA,Loja,CGC,CPF/CNPJ",
					"CODIGO,DESCRICAO,LOJA,CGC", "&filterValues=",
					$(event.target).closest('td').last().find('input').attr('name').split('___')[1] + '|fornecedor');
		})

	} else {
		$(".zoomFornecedor").hide();
	}

	if(CURRENT_STATE == '128'){
		$(".zoomFormaPagamento").show();
		//Cria zoom de usuários do Fluig
		$(".zoomFormaPagamento").on("click", function(event) {
			openZoom("ds_condicaoPagamento",
					"CODIGO,Código,DESCRICAO,Descrição",
					"CODIGO,DESCRICAO", "&filterValues=",
					$(event.target).closest('td').last().find('input').attr('name').split('___')[1] + '|condicaoPagamento');
		})
	} else {
		$(".zoomFormaPagamento").hide();
	}

	if(CURRENT_STATE == '14'){
		$(".zoomSolicitacao").show();
		//Cria zoom de usuários do Fluig
		$(".zoomSolicitacao").on("click", function(event) {
			openZoom("ds_solic_pool",
					"numSolicitacao,Código",
					"Pool%20=%20%22Pool:Group:CD%22,100,numSolicitacao", "&filterValues=&likeField=Pool&likeValue=Pool:Group:CD",
					$(event.target).closest('td').last().find('input').attr('name').split('___')[1] + '|solicitacoesCompras');
		})
	} else {
		$(".zoomSolicitacao").hide();
	}
}

function openZoom(datasetId, datafields, resultFields, constraints, type) {
	var position = getPositionCenter(900,600);
	window.open("/webdesk/zoom.jsp?datasetId=" + datasetId + "&dataFields=" + datafields + "&resultFields=" + resultFields + constraints + "&type=" + type, "zoom",
			"status, scrollbars=no,top="+position[1]+", left="+position[0]+",width=900, height=600");
}


/**
* Retorna o eixo x e y em um array
*/
function getPositionCenter(widthDiv, heightDiv){
	var alturaTela  = screen.height;
	var larguraTela = screen.width;
    var posicaoX = (larguraTela / 2) - (widthDiv  / 2); /*Explicado logo abaixo.*/
    var posicaoY = (alturaTela  / 2) - (heightDiv / 2);
    return [posicaoX, posicaoY];
}

function setSelectedZoomItem(item) {
	var origem = item.type.split('|')[1];
	item.type = item.type.split('|')[0];

	if(origem == 'filial'){
		var constraintDs_filial = DatasetFactory.createConstraint('CODIGO', item.filial_protheus, item.filial_protheus, ConstraintType.MUST);
		var datasetDs_filial = DatasetFactory.getDataset('ds_filiais', null, [constraintDs_filial], null);
		var result = datasetDs_filial.values[0];

		$('#filial_protheus').val(result.CODIGO);
		$('#filial').val(item.filial);
		$('#hiddenFilial').val(item.filial);
        $("[name=F1_FILIAL]").val(result.CODIGO);
        $('#FilialAlcada').val(item.codigo);
        $("#nomeFilialEnt").val(item.filial);
		$("#endFilialEnt").val(result.ENDERECO);
		$("#cidFilialEnt").val(result.CIDADE);
		$("#ufFilialEnt").val(result.ESTADO);
		$("#cnpjFilialEnt").val(result.CGC);
		$("[name=filial_protheus_entrega]").val(result.CODIGO);
	} else if(origem == 'centroCusto') {
		$('#txtCodCentroCusto').val(item.CODIGO);
		$('#txtNomeCentroCusto').val(item.DESCRICAO);
		
		getAprovadorCentroCusto(item.CODIGO);
	} else if(origem == 'produto') {
		var index = item.type;
		$('#txtCodItemProduto___'+index).val(item.CODIGO).change();
		$('#txtDescProduto___'+index).val(item.DESCRICAO).change();
	} else if(origem == 'fornecedor') {
		var index = item.type;
		$('#txtCodFornecCotacao___'+index).val(item.CODIGO).change();
		$('#txtNomeFornecCotacao___'+index).val(item.DESCRICAO).change();
		$('#txtLojaFornecCotacao___'+index).val(item.LOJA).change();
		$('#txtCnpjFornecCotacao___'+index).val(item.CGC).change();
	} else if(origem == 'solicitacoesCompras'){
		var index = item.type;
		$('#txtNumSolicAdd___'+index).val(item.numSolicitacao).change();
	} else if(origem == 'condicaoPagamento'){
		var index = item.type;
		$('#txtCodFormaPagamentoProtheus___'+index).val(item.CODIGO).change();
		$('#txtNomeFormaPagamentoBionexo___'+index).val(item.DESCRICAO).change();
	} else if(origem == 'armazem'){
		var index = item.type;
		$('#txtIdArmazemProduto___'+index).val(item.CODIGO).change();
		$('#txtArmazemProduto___'+index).val(item.DESCRICAO).change();
	} else if(origem == 'emails'){
		var list = $('#email-list-modal').val();
		if(list != '' && list[list.length-1] != ';'){
			list += ';' + item.mail;
		} else {
			list += item.mail;
		}
		$('#email-list-modal').val(list).change();
	}
}


function preencheTabelaPedidos(){
	var filial =  $('#filial_protheus').val();
	if($('#numPedido').val() == ""){
	 	var arrPedidosCompras = [];
	 } else if($('#numPedido').val() != "" && JSON.parse($('#numPedido').val()).length == undefined) {
	 	var arrPedidosCompras = [$('#numPedido').val()];
	 } else {
 		var arrPedidosCompras = JSON.parse($('#numPedido').val());
	 }
 	for (var i = 0; i < arrPedidosCompras.length; i++) {
		if(arrPedidosCompras[i] != ""){
			var constraintFilial = DatasetFactory.createConstraint('FILIAL', filial, filial, ConstraintType.MUST);
			var constraintNumPedido = DatasetFactory.createConstraint('PEDIDO', arrPedidosCompras[i], arrPedidosCompras[i], ConstraintType.MUST);
			var consultaPedidoCompra = DatasetFactory.getDataset('ds_produtoPedidoCompra', null, [constraintFilial,constraintNumPedido], null);
			var valorTotalPedido = 0;

			if(consultaPedidoCompra.values != undefined){
				for (var o = 0; o < consultaPedidoCompra.values.length; o++) {
					var indicePedido = wdkAddChild('tbPedidosGerados');
					$("#tbPedidosGerados tr").each(function(){
						$(this).children().eq(0).hide();
					});
					$("[name=seqItemPedGerado___"+indicePedido +"]").val(indicePedido);
					$("[name=pedGerado___"+indicePedido +"]").val(arrPedidosCompras[i]);
					$("[name=produtoPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].COD_PRODUTO);
					$("[name=descProdutoPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].DESC_PRODUTO);
					$("[name=descFornecPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].DESC_FORNECEDOR);
					$("[name=entregaItemPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].LOCAL_ENTREGA);
					$("#precoItemPedGerado___"+indicePedido).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#precoItemPedGerado___"+indicePedido).maskMoney('mask', parseFloat(consultaPedidoCompra.values[o].VLR_UNITARIO));
					$("[name=qtdItemPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].QUANTIDADE);
					$("#VlrFreteItemPedGerado___"+indicePedido).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#VlrFreteItemPedGerado___"+indicePedido).maskMoney('mask', parseFloat(consultaPedidoCompra.values[o].FRETE));
					$("#VlrIpiItemPedGerado___"+indicePedido).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#VlrIpiItemPedGerado___"+indicePedido).maskMoney('mask',parseFloat(consultaPedidoCompra.values[o].IPI));
					$("#VlrDespPedGerado___"+indicePedido).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#VlrDespPedGerado___"+indicePedido).maskMoney('mask', parseFloat(consultaPedidoCompra.values[o].DESPESA));
					$("#totalItemPedGerado___"+indicePedido).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
					$("#totalItemPedGerado___"+indicePedido).maskMoney('mask', parseFloat(consultaPedidoCompra.values[o].VLR_TOTAL));
					$("[name=ObsItemPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].OBSERVACAO);
					$("[name=hashIndicePedido___"+indicePedido +"]").val(consultaPedidoCompra.values[o].SEQ_ID_FLUIG);
					$("[name=FabItemPedGerado___"+indicePedido +"]").val(consultaPedidoCompra.values[o].FABRICANTE);
					$("[name=prazoEntregaPedido___"+indicePedido +"]").val(consultaPedidoCompra.values[o].DT_ENTREGA);
					valorTotalPedido = valorTotalPedido + parseFloat(consultaPedidoCompra.values[o].VLR_TOTAL);
					gravaDadosFornecPed(consultaPedidoCompra.values[o].COD_FORNECEDOR, indicePedido);
					$("#ckEliminaPedido___"+indicePedido).click(function(){
						var pedido 		= $(this).find("[name^=pedGerado___]").val();
						if($(this).checked){
							var pedidos = $('#tbPedidosGerados tbody tr:gt(0):has(:text[value='+ pedido +'])');
							$(pedidos).each(function(){
								$(this).find("[name^=ckEliminaPedido___]").prop("checked", true);
							});
						}else{
							var pedidos = $('#tbPedidosGerados tbody tr:gt(0):has(:text[value='+ pedido +'])');
							$(pedidos).each(function(){
								$(this).find("[name^=ckEliminaPedido___]").prop("checked", false);
							});
						}
					});
				}
				var campoValorTotalFornec = $(this).find("[name^=valorTotalFornec___]");
				$(campoValorTotalFornec).maskMoney({prefix:'R$ ', thousands:'.', decimal:',', affixesStay: true, precision: 2, allowZero: true});
				$(campoValorTotalFornec).maskMoney('mask', parseFloat(valorTotalPedido));
				var valorPorExtenso = valorTotalPedido.toString().extenso(true);
				$(this).find("[name^=valorPorExtenso___]").val(valorPorExtenso);
			} else {
				FLUIGC.modal({
					title: 'Atenção',
					content:'Ocorreu um erro ao consultar o Pedido de Compras gerado no Protheus',
					actions: [{
						'label': 'Ok',
						'autoClose': true
					}]
				});
			}
		}	else {
			FLUIGC.modal({
				title: 'Atenção',
				content:'Ocorreu um erro ao consultar o Pedido de Compras gerado no Protheus',
				actions: [{
					'label': 'Ok',
					'autoClose': true
				}]
			});
		}
	}
}

function validaMaterialMATMED(codMaterial){
	return codMaterial == 'MQ' || codMaterial == 'MD' || codMaterial == 'SO' || codMaterial == 'MM' || codMaterial == 'LB';
}

function getAprovadorCentroCusto(codCentroCusto){
	
	var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var datasetPai = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(constraintPai), null).values;
    for (var i in datasetPai) {
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
        var c1 = DatasetFactory.createConstraint("tablename", "tbCentroCusto", "tbCentroCusto", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("CTT_CUSTO", codCentroCusto + ' ', codCentroCusto + ' ', ConstraintType.MUST);
        // // Busca o dataset
        var ds_centroCusto = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3, c4), null).values;
    }
       
    if (ds_centroCusto.length > 0) {
        
        var aprovador = ds_centroCusto[0]['usuarioGerenteCentro'];                                                      
        
    }else{
    	
    	FLUIGC.toast({
            message: "Não identificada alçada de aprovação para este centro de custo nesta unidade. Gentileza acionar o time de Experiência do Cliente responsável pelo Processo de Gestão das Alçadas de Aprovação",
            type: "danger",
            timeout: "slow",
          });
    	
    	window["centroCusto"].clear();
    	
    }         	
	
}