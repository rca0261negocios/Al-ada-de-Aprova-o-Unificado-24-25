var cotacaoClass;
var GERAR_COTACAO_CLASS;

$(document).ready(function(){

	// REVISAO ALCADAS 24-25 SM2 RCA 09.2024
	// SEGURANCA CAMPOS COM DADOS DO FORM PARA APROVACAO
	if( $("#orig_documentid"    ).val()=='' || $("#orig_documentid"    ).val()==null) $('#orig_documentid').val(getDocumentId());    
	if( $("#orig_version"       ).val()=='' || $("#orig_version"       ).val()==null) $('#orig_version'   ).val(getVersion()   );       
	if( $("#orig_docSolicitacao").val()=='' || $("#orig_docSolicitacao").val()==null) $('#orig_docSolicitacao').val('Documento');

	// INICIO
	if(CURRENT_STATE == COTACAO){
		$("#passAtividadeCotacao").val('true');
		cotacaoClass = new CotacaoClass(true);
	}else if($("#passAtividadeCotacao").val() == 'true'){
		cotacaoClass = new CotacaoClass();
		if($("#hiddenPedidoCorporativo").val() == '1'){
			$("#pedidoCorporativo").prop("checked",true);
		}
		cotacaoClass.desativaPedidoCorporativo();
	}
	GERAR_COTACAO_CLASS = new GeraCotacaoClass();

	for(var tabItens = 1; tabItens <= $("#tbItens tbody tr").length; tabItens++){
		var nomeProduto = $("#produto___"+tabItens).val();
		if (nomeProduto == "" || nomeProduto == null){
			$("#produto___"+tabItens).val($("#txtCodItemProduto___"+tabItens).val() + " - " + $("#txtDescProduto___"+tabItens).val());

		}
		var nomeArmazem = $("#armazem___"+tabItens).val();
		if (nomeArmazem == "" || nomeArmazem == null){
			$("#txtIdArmazemProduto___"+tabItens).val("01")
			$("#txtArmazemProduto___"+tabItens).val("FARMACIA")
			$("#armazem___"+tabItens).val("FARMACIA");
		}
	}

	if(CURRENT_STATE != INICIO || CURRENT_STATE != INICIO_1) {
		var tabItensDesvinculados = $("#tbItensDesvinculados tbody tr").length - 1;
		FLUIGC.toast({message: "número de itens desvinculados: " + tabItensDesvinculados, type: "warning"});
		if(tabItensDesvinculados > 0) {
			$("#tabItensDesvinculados").removeClass("hidden");
			$("#tabItensDesvinculados").addClass("show");
		}
	}


	// for(var tabItens = 1; tabItens <= $("#tbFornecs tbody tr").length; tabItens++) {
	// 	var nomeCondicao = $("#condicaoPagamento___"+tabItens).val();
	// 	if (nomeCondicao == "" || nomeCondicao == null){
	// 		$("#condicaoPagamento___"+tabItens).val($("#txtNomeFormaPagamentoBionexo___"+tabItens).val());

	// 	}
	// }

	
	if ($("#zoomFilial").val() == "" || $("#zoomFilial").val() == null || $("#zoomFilial").val() == "null") {
			if($("#hiddenFilial").val() != "" && $("#hiddenFilial").val() != null && $("#hiddenFilial").val() != "null");
			
			// SM2 - RCA 15.02.24
			setTimeout(function(){
            	$('#zoomFilial').prop('disabled', false);
				window['zoomFilial'].value = ($('#hiddenFilial').val());
				if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1) 
					$('#zoomFilial').prop('disabled', true);
			}, 1000);
        	
    }

	if ($("#centroCusto").val() == "" || $("#centroCusto").val() == null || $("#centroCusto").val() == "null") {
		if($("#txtNomeCentroCusto").val() != "" && $("#txtNomeCentroCusto").val() != null && $("#txtNomeCentroCusto").val() != "null")
		setTimeout(function(){
			window['centroCusto'].value = $('#txtCodCentroCusto').val()+'-'+$('#txtNomeCentroCusto').val();
			$('#centroCusto').prop('disabled', true);
		}, 1000);
		
	}

	if(CURRENT_STATE == DEFINIR_VENCEDOR) {
		$(".checkControle").removeAttr("disabled");
	}

	for(var tabItens = 1; tabItens <= $("#tbItens tbody tr").length; tabItens++){
		var nomeProduto = $("#produto___"+tabItens).val();
		if (nomeProduto == "" || nomeProduto == null){
			$("#produto___"+tabItens).val($("#txtCodItemProduto___"+tabItens).val() + " - " + $("#txtDescProduto___"+tabItens).val());

		}
		var nomeArmazem = $("#armazem___"+tabItens).val();
		if (nomeArmazem == "" || nomeArmazem == null){
			$("#txtIdArmazemProduto___"+tabItens).val("01")
			$("#txtArmazemProduto___"+tabItens).val("FARMACIA")
			$("#armazem___"+tabItens).val("FARMACIA");
		}
	}

	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA) {
		var indexes = $("#tbPedidosGerados tbody tr");
		for (var i = 1; i < $("#tbPedidosGerados tbody tr").length; i++) {
			var index = indexes[1].children[2].children[0].id.split("___")[1];
			if($("#pedGerado___"+index).val() == null || $("#pedGerado___"+index).val() == undefined || $("#pedGerado___"+index).val() == "undefined"){ 
				fnWdkRemoveChild($("#pedGerado___"+index)[0]);
				FLUIGC.toast({
					title: '',
					message: 'Pedido de compra não foi gerado corretamente, favor devolver para a etapa de "Erro na Emissão do Pedido"',
					type: 'danger'
				});
			}
		} 
	}

});


var CotacaoClass = function(runInit){
	this.self = this;
	//Configurações inciais da atividade cotação
	this.init = function(){
		//Ativa pedido Corporativo
		var qtdItens = $('#tbCotacoes tbody tr').length -1;
		//verifica se a quantidade de itens é de um item e se o tipo de produto é diferente de matmed
		if(qtdItens == 1 && $("#grupoAnaliseComprador").val() != $('#poolAbertura').val()){
			$("#divPedidoCorporativo").removeClass("hidden");
			$("#pedidoCorporativo").removeClass("readonly");
			$("#pedidoCorporativo").attr('disabled', false);
			$("#pedidoCorporativo").change(function(){
				var pedidoChecked = $("#pedidoCorporativo:checked").val();
				if(pedidoChecked == undefined){
					$("[name^=qtdeItemCotacao___]").addClass("readonly");
					$("[name^=qtdeItemCotacao___]").attr('readonly', true);
					$("[name^=qtdeItemCotacao___]").val($("#txtQuantidadeProduto___1").val());
					$("[name^=vlrUnitItemCotacao___]").val("R$ 0,0000");
					$("[name^=vlrUnitItemCotacao___]").removeClass("readonly");
					$("[name^=vlrUnitItemCotacao___]").attr('disabled', false);
				}else{
					$("#hiddenPedidoCorporativo").val(pedidoChecked);
					$("[name^=qtdeItemCotacao___]").removeClass("readonly");
					$("[name^=qtdeItemCotacao___]").attr('readonly', false);
					$("[name^=qtdeItemCotacao___]").maskMoney({prefix:'', thousands:'', decimal:'.', affixesStay: true, precision: 2, allowZero: true});
					$("[name^=vlrUnitItemCotacao___]").val("R$ 1,0000");
					$("[name^=vlrUnitItemCotacao___]").addClass("readonly");
					$("[name^=vlrUnitItemCotacao___]").attr('readonly', true);
				}
				calculaTotalLinhaCotacao($("[name^=qtdeItemCotacao___1]"));
			});
		}
	}
	
	this.desativaPedidoCorporativo = function(){
		$("#divPedidoCorporativo").removeClass("hidden");
		$("#pedidoCorporativo").addClass("readonly");
		$("#pedidoCorporativo").attr('disabled', true);
	}
	
	//Executa o método init
	if(runInit){
		this.init();
	}
}

var GeraCotacaoClass = function(){
	
	this.init = function(){
		//Se atividade atual for depois da atividade gerar cotacao
		if($('#performedGeraCotacao').val() == 'true'){
			this.runAfterActivity();
		}//Se a atividade atual for gerar cotação
		else if(CURRENT_STATE == GERA_COTACAO_){
			this.runThisActivity();
		}
	}
	
	/**
	 * Método executado somente na atividade de gerar cotação
	 */
	this.runThisActivity = function(){
		var tipoSolicitacao = $('#grupoAnaliseComprador').val();
		//Verifica se é uma solicitação de matmed
		if(tipoSolicitacao == $('#poolAbertura').val()){
			
		}else{
			$('.icms_matmed').hide();
		}
		
		//seta como executado a atividade de gerar cotação
		$('#performedGeraCotacao').val('true');
	}
	
	/**
	 * Método executado em todas atividades apos gerar cotação
	 */
	this.runAfterActivity = function(){
		var tipoSolicitacao = $('#grupoAnaliseComprador').val();
		//Verifica se é uma solicitação de matmed
		if(tipoSolicitacao == $('#poolAbertura').val()){
			
		}else{
			$('.icms_matmed').hide();
		}
	}
	
	
	/**
	 * Adiciona os eventos dos campos que competem a atividade de gerar cotação
	 */
	this.addEvents = function(){
	}
	
	/**
	 * 
	 */
	this.consultaIcmsProtheus = function(codFornecedor, indice){
		var dsConsultaProtheus = new objDataSet("consultaDadosProtheus");
		var unidade = $("[name=filial_protheus]").val();
		// Informa a tabela
		dsConsultaProtheus.setCampo("AIA");

		// Informar o filtro no where
		dsConsultaProtheus.setCampo('AIA_CODFOR = '+codFornecedor);

		// Informa as colunas da query
		dsConsultaProtheus.setCampo("AIA_DESCRI,AIA_CODTAB");

		dsConsultaProtheus.filtrarBusca();
		var dadosIcms = dsConsultaProtheus.getDados();
			
		if(dadosIcms.columns["0"] == 'ERRO'){
			$('#icms_matmed___'+indice).hide();
			return false;
		}else{
			for(var i in dadosIcms.values){
				$('#icms_matmed___'+indice).append($('<option>',{
					value:dadosIcms.values[i].AIA_CODTAB+" - "+dadosIcms.values[i].AIA_DESCRI,
					text:dadosIcms.values[i].AIA_CODTAB+" - "+dadosIcms.values[i].AIA_DESCRI
				}));
			}
			if(dadosIcms.values.length == 1){
				$('#icms_matmed___'+indice).val(dadosIcms.values[0].AIA_CODTAB+" - "+dadosIcms.values[0].AIA_DESCRI);
			}
			
			$('#icms_matmed___'+indice).change(function(){
				$('#icms_matmed_field___'+indice).val($(this).val());
			});
			
		}
	}
	this.init();
}

function updateQuantProduto(qCAMPO) {  
	// SM2 - AJUSTES CONF PROJETO EM 19.02.24
	// AJUSTAR QTDE DO PRODUTO
	var position1			= qCAMPO.name.split("___")[1];
	var qtd 				= qCAMPO.value;
	var qtdProduto 			= $("#txtQuantidadeProduto___"+position1).val();
	var qtdItemCotacao 		= $("#qtdeItemCotacao___"     +position1).val();
	
	// vlrUnitItemCotacao 	= $("#vlrUnitItemCotacao___"+index).val().maskMoney('unmasked')[0];
	// vlrTotalItemCotacao = $("#vlrTotalItemCotacao___"+index).val().maskMoney('unmasked')[0];
	
	var vlrUnitItemCotacao 	= $("#vlrUnitItemCotacao___" +position1).val().replace('R$ ','').replace('.','').replace(',','.');
	var vlrTotalItemCotacao = $("#vlrTotalItemCotacao___"+position1).val().replace('R$ ','').replace('.','').replace(',','.');

	if(qtd != "" && qtd != null && qtd != undefined){
		qtd 					= parseFloat(qtd);
		qtdProduto 				= parseFloat(qtdProduto);
		qtdItemCotacao 			= parseFloat(qtdItemCotacao);
		vlrUnitItemCotacao 		= parseFloat(vlrUnitItemCotacao);
		vlrTotalItemCotacao 	= parseFloat(vlrTotalItemCotacao);
		
		// VALOR TOTAL DO ITEM
		vlrTotalItemCotacao     = vlrUnitItemCotacao *qtd;

		// SE TEM COTACAO FECHADA - AJUSTAR QTDE DA COTACAO
		/// var original = $('#origCodItemProduto___'+position1).val();
		var original = $('#txtCodItemProdutoIni___'+position1).val(); //  $('#origCodItemProduto___'+index).val(); // origCodItemProduto___19
		var indexes  = $("#tbCotacoes tbody tr");
		for (var i = 1; i < $("#tbCotacoes tbody tr").length; i++) {
			var index = indexes[i].children[2].children[0].id.split("___")[1];

	        // 12.04.24 GLPI 555105/554737/555199/555598
	        // SM2CE - CONTROLE DE CAMPOS EDITAVEIS PARA ALTERACAO DE QTDE A SER ALTERADA 
			// NA ATIVIDADE 245-Validação de Cotação
			var qualCodigo = $('#codItemCotacao___'+index).val();
			if(qualCodigo=='' || qualCodigo==null)
				qualCodigo=$('#codItemCotacao___'+index)[0].innerHTML;
			
			if(qualCodigo== original){
				// gravar novos valores
				$("#qtdeItemCotacao___"		+index).val( qtdProduto );
				$("#vlrUnitItemCotacao___"	+index).maskMoney({prefix:'R$ ', thousands:'', decimal:'.', affixesStay: true, precision: 2, allowZero: true});
				$("#vlrUnitItemCotacao___"	+index).change();
				
				$("#vlrTotalItemCotacao___"	+index).val( 'R$ '+vlrTotalItemCotacao.toFixed(2).replace('.',',') );
				$("#vlrTotalItemCotacao___"	+index).maskMoney({prefix:'R$ ', thousands:'', decimal:'.', affixesStay: true, precision: 2, allowZero: true});
				$("#vlrTotalItemCotacao___"	+index).change();
			}
		}	
	}

}

function ajustarCodigoItem(qCAMPO) {
	// SM2 - AJUSTES CONF PROJETO EM 19.02.24
	// ALTERAR CODIGO DA COTACAO FECHADA
	var index 	       = qCAMPO.name.split("___")[1];
	var original       = $('#txtCodItemProdutoIni___'+index).val(); //  $('#origCodItemProduto___'+index).val(); // origCodItemProduto___19
	var novaDescricao  = $('#txtDescProduto___'      +index).val();
	var novoFabricante = $('#nmFabricante___'        +index).val();

	// localizar origItemCotacao___
	var indexes = $("#tbCotacoes tbody tr");
	var linhas  = $("#tbCotacoes tbody tr").length;
	for (var i=1; i<linhas; i++) {
		// 14.03.24 alteracao nova validacao quando origCodItemProduto estiver vazio
		// 11.06.24 alteracao correcao codigo da cotacao
		var posicao = indexes[i].children[2].children[0].id.split("___")[1];
		var atual   = $('#codItemCotacao___' +posicao).val();
		if(original ==atual ){ 
			
			// ITENS DA COTACAO - SOMENTE ORIGINAL SE NAO INFORMADO
			if($('#origItemCotacao___'+posicao).val()=='' || $('#origItemCotacao___'+posicao).val()==null)
			   $('#origItemCotacao___'+posicao).val(original);
			
			// ITENS COTACAO
			$('#codItemCotacao___' +posicao).val(qCAMPO.value);
			$('#DescItemCotacao___'+posicao).val(novaDescricao);
			$('#descFabricante___' +posicao).val( novoFabricante );
			$('#qtdeItemCotacao___'+posicao).prop('title',novaDescricao);
			break;
		}
	}
	
}
