var beforeSendValidate = function(numState,nextState){
	if(numState == AtividadeEnum.VALIDACAO_ONCOPROD || 
	   numState == AtividadeEnum.EXCECAO_INTEGRACAO ){
		var pedidoCompra = new PedidoCompra();
		pedidoCompra.createXml();
	}
}

var PedidoCompra =  function(){

	var self = this;
	this.codFilial = $("#codFilial").val();
	this.codfornecedor = $("#codFornecedor").val();
	this.loja = $("#lojFornecedor").val();
	this.codCC = $("#codCentroCusto").val();
	this.dtEmissao = getCurrentDate();
	this.codPrazo = $("#codPrazoPagamento").val();
	this.contato = "N.A";
	this.codSolicitacao=  $("#codSolicitacao").val();
	this.infoAdicional = ($("#infoAdicionais").val()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");//Remove acentos
	this.localEntrega = ($("#localEntrega").val()).normalize('NFD').replace(/[\u0300-\u036f]/g, "");//Remove acentos
	this.prazo = $("#prazoEntrega").val();
	this.itens = [];
	this.hashProduto = Math.floor(Math.random() * 90000) + 10000 + ""//lógica existente na integração do pedido de compras
	//Carrega os itens/produtos
	$("[name^='codProd___']").each(function(){
		var indice = $(this).attr('id').split('___');
		indice = indice[1];
		var produto = {
			item: $("#itemProd___"+indice).val(),
			codProduto: $("#codProd___"+indice).val(),
			quantidade: $("#qtdProd___"+indice).val(),
			valor: removeMascaraMonetaria($("#valProd___"+indice).val()),
			valorTotal: removeMascaraMonetaria($("#valTotalProd___"+indice).val()),
			fabricante: $("#fabricanteProd___"+indice).val()
		};
		var produtoRepetido = false;
		for(var p in self.itens){
			if(produto.codProduto == self.itens[p].codProduto){
				self.itens[p].quantidade = parseInt(self.itens[p].quantidade) + parseInt(produto.quantidade);
				self.itens[p].valorTotal = self.itens[p].valorTotal + produto.valorTotal;
				produtoRepetido = true;
				break;
			}
		}
		if(!produtoRepetido){
			self.itens.push(produto);
		}
	});

	//Cria XML do pedido de compras
	this.createXml = function(){
		try{
	        var xml = $($.parseXML('<?xml version="1.0" encoding="utf-8" ?><PedidoCompra />'));
	        $('PedidoCompra',xml).append($('<Operacao />', xml).append($('<Id />',xml).text("1")));//Operação
	       	$('PedidoCompra',xml).append($('<Cabecalho />',xml));
        	$('Cabecalho',xml).append($('<C7_FILIAL />',xml).text(self.codFilial));
        	$('Cabecalho',xml).append($('<C7_FORNECE />',xml).text(self.codfornecedor));
        	$('Cabecalho',xml).append($('<C7_LOJA />',xml).text(self.loja));
        	$('Cabecalho',xml).append($('<C7_COND />',xml).text(self.codPrazo));
        	$('Cabecalho',xml).append($('<C7_EMISSAO />',xml).text(self.converteDataProtheus(self.dtEmissao)));
        	$('Cabecalho',xml).append($('<C7_FILENT />',xml).text(self.codFilial));
        	$('Cabecalho',xml).append($('<C7_CONTATO />',xml).text(self.contato));
        	$('Cabecalho',xml).append($('<C7_NUM />',xml));
	        //Insere os produtos
    		$('PedidoCompra',xml).append($('<Itens />',xml));
        	for(var i in self.itens){
        		var produto = self.itens[i];
    		 	$('Itens',xml).append($('<Iten />',xml));
    		 	$('Itens',xml).find('Iten').last().append($('<C7_ITEM />',xml).text(formataSeqProtheus(produto.item,4)));
    		 	$('Itens',xml).find('Iten').last().append($('<C7_XFORPAG />',xml).text("1"));
        		$('Itens',xml).find('Iten').last().append($('<C7_PRODUTO />',xml).text(produto.codProduto));
        		$('Itens',xml).find('Iten').last().append($('<C7_QUANT />',xml).text(produto.quantidade));
        		$('Itens',xml).find('Iten').last().append($('<C7_PRECO />',xml).text(produto.valor));
        		$('Itens',xml).find('Iten').last().append($('<C7_TOTAL />',xml).text(produto.valorTotal));
        		$('Itens',xml).find('Iten').last().append($('<C7_ZFABRIC />',xml).text(produto.fabricante));
        		$('Itens',xml).find('Iten').last().append($('<C7_ZSEQ />',xml).text(self.hashProduto));
        		$('Itens',xml).find('Iten').last().append($('<C7_CC />',xml).text(self.codCC));
        		$('Itens',xml).find('Iten').last().append($('<C7_DATPRF />',xml).text(self.converteDataProtheus(self.prazo)));
        		$('Itens',xml).find('Iten').last().append($('<C7_ZIDFLG />',xml).text(self.codSolicitacao));
        		$('Itens',xml).find('Iten').last().append($('<C7_ZINFADI />',xml).text(self.removeCaracteres(self.infoAdicional)));
        		$('Itens',xml).find('Iten').last().append($('<C7_ZLCENTR />',xml).text(self.localEntrega));
        	}
			var strXml = new XMLSerializer().serializeToString(xml.context);
	        $('#xmlPedido').val(strXml.substr(38,strXml.length));//Seta o xml pro campo, para ser carregado no servidor
		}catch(e){
			console.log(e)
		}
	}
	//Converte data normal em data para integração com Protheus
	this.converteDataProtheus = function(dataFluig){
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
	this.createXml();
	
	this.removeCaracteres = function(str){
		str = str.replaceAll("/", "-");
		str = str.replaceAll(" ", " ");
		return str;
	}
}
