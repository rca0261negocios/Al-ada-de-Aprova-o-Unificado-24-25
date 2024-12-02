function servicetask212(attempt, message) {
	log.info("### compras.serviceTask212 - Iniciado");
	emitirPedidoCompra();
}
var tbCotacoes;
function emitirPedidoCompra() {
	var arrVencedoresCotacao = [];
	var objvencedores = hAPI.getCardValue('dadosBancariosFornecedor');
	if (objvencedores != undefined && objvencedores != "" && objvencedores != null) {
		if (JSON.parse(objvencedores).length == undefined) {
			arrVencedoresCotacao = [objvencedores];
		} else {
			arrVencedoresCotacao = JSON.parse(objvencedores);
		}
	} else {
		throw 'Falha ao Gerar Pedido de Compras no Protheus, ocorreu um erro ao consultar os dados dos fornecedores vencedores.';
	}
	var numPedido = hAPI.getCardValue('numPedido');
	var arrPedidosCompras = [];
	if (numPedido != null && numPedido != undefined && numPedido != "" && numPedido != "null") {
		arrPedidosCompras = JSON.parse(numPedido);
	}
	log.info("arrVencedoresCotacao DEBUG: " + JSON.stringify(arrVencedoresCotacao));
	log.dir(arrVencedoresCotacao);
	var dataAbertura = new Date();
	var dataAtual = formataTempo(dataAbertura.getDate()) + "/" + formataTempo((dataAbertura.getMonth() + 1)) + "/" + dataAbertura.getFullYear();

	var tbDesvinculado = consultaPaiFilho(['txtCodItemProdutoDesv']);
	log.info("tbDesvinculado DEBUG: " + tbDesvinculado);
	log.dir(tbDesvinculado);
	var tbProduto = consultaPaiFilho([ 'txtCodItemProduto','nmFabricante' ]);
	tbCotacoes = consultaPaiFilho([ 'codItemCotacao',
									'SeqItemCotacao',
									'prioridadeGeral',
									'qtdeItemCotacao',
									'vlrUnitItemCotacao',
									'vlrTotalItemCotacao',
									'vlrIpiItemCotacao',
									'outrasDespItemCotacao',
									'prazoItemCotacao',
									'formaPagamento',
									'codFornecedorCotacao',
									'vencedoraCotacao'
								]);
	
	if(arrVencedoresCotacao.length<=0)
		throw 'Falha ao Gerar Pedido de Compras no Protheus, não consigo localizar os lanctos referente a cotação.';
	else
	for (var i = 0; i < arrVencedoresCotacao.length; i++) {
		// try {
		if (!consultaPedidoExistente(arrVencedoresCotacao[i].codFornecedor)) {
			var xmlPedido = "<PedidoCompra>" +
				"<Operacao>" +
				"<Id>1</Id>" +
				"</Operacao>" +
				"<Cabecalho>" +
				"<C7_FILIAL>" + hAPI.getCardValue("filial_protheus") + "</C7_FILIAL>" +
				"<C7_FORNECE>" + arrVencedoresCotacao[i].codFornecedor + "</C7_FORNECE>" +
				"<C7_LOJA>" + arrVencedoresCotacao[i].loja + "</C7_LOJA>" +
				"<C7_COND>" + arrVencedoresCotacao[i].condPagto + "</C7_COND>" +
				"<C7_TPFRETE>" + arrVencedoresCotacao[i].tpFrete + "</C7_TPFRETE>" +
				"<C7_FRETE>" + arrVencedoresCotacao[i].vlrFrete + "</C7_FRETE>" +
				"<C7_EMISSAO>" + formataDataProtheus(dataAtual) + "</C7_EMISSAO>" +
				"<C7_FILENT>" + hAPI.getCardValue("filial_protheus") + "</C7_FILENT>" +
				"<C7_CONTATO>" + removeAcentos(arrVencedoresCotacao[i].contato) + "</C7_CONTATO>" +
				"<C7_NUM></C7_NUM>" +
				"</Cabecalho>" +
				"<Itens>";

			if (tbDesvinculado[0].txtCodItemProdutoDesv != '' &&
				tbDesvinculado[0].txtCodItemProdutoDesv != undefined &&
				tbDesvinculado[0].txtCodItemProdutoDesv != null) {
				var ultimoIndiceSemDesvinculo = 0;
				for (var k = 0; k < tbCotacoes.length;) {
					var achouDesv = false;
					for (var o = 0; o < tbDesvinculado.length; o++) {
						if (tbCotacoes[k] != undefined &&
							tbCotacoes[k].codItemCotacao != undefined &&
							tbDesvinculado[o].txtCodItemProdutoDesv != undefined &&
							tbCotacoes[k].codItemCotacao == tbDesvinculado[o].txtCodItemProdutoDesv) {
							tbCotacoes.splice(k, 1);
							achouDesv = true;
							break;
						}
					}
					// GLPI 147674
					// considera que ao remover com splice um item do array os indices sao realinhados
					if (!achouDesv) {
						ultimoIndiceSemDesvinculo++;
					}
					k = ultimoIndiceSemDesvinculo;
				}
				log.info("TBDESVINCULADO PEDIDO DE COMPRAS: " + tbDesvinculado);
				log.dir(tbDesvinculado);
				log.info("TBCOTACAO PEDIDO DE COMPRAS: " + tbCotacoes);
				log.dir(tbCotacoes);
			}

			var xAchei=false;
			for (var j = 0; j < tbCotacoes.length; j++) {
				var vencedoraCotacao = tbCotacoes[j].vencedoraCotacao == "on" ? true : false;
				if (arrVencedoresCotacao[i].codFornecedor == tbCotacoes[j].codFornecedorCotacao &&
					vencedoraCotacao) {
					var fabricante = '';
					for (var y = 0; y < tbProduto.length; y++) {
						if (tbCotacoes[j].codItemCotacao == tbProduto[y].txtCodItemProduto) {
							fabricante = removeAcentos(tbProduto[y].nmFabricante);
							break;
						}
					}
					var item       = formataSeqProtheus(tbCotacoes[j].SeqItemCotacao, 4);
					var produto    = tbCotacoes[j].codItemCotacao;
					var prioridade = hAPI.getCardValue("prioridadeGeral");

					if (prioridade == 'N') 
						prioridade = 'NORMAL';
					else 
						if (prioridade == 'E') 
							prioridade = 'EMERGENCIAL';
						else 
							prioridade = 'ONCOPROD';
					
					// 15.03.24 - AJUSTE CASAS DECIMAIS PARA OS CAMPOS DE VALORES
					// var prioridade = tbCotacoes[j].sPrioridadeProduto;
					var quantidade        = tbCotacoes[j].qtdeItemCotacao,
						preco             = formataMoeda(tbCotacoes[j].vlrUnitItemCotacao   ,4),
						total             = formataMoeda(tbCotacoes[j].vlrTotalItemCotacao  ,2),
						valIpi            = formataMoeda(tbCotacoes[j].vlrIpiItemCotacao    ,2),
						despesa           = formataMoeda(tbCotacoes[j].outrasDespItemCotacao,2),
						centroCusto       = hAPI.getCardValue("txtCodCentroCusto"),
						dataPrf           = formataDataProtheus(tbCotacoes[j].prazoItemCotacao),
						solicFluig        = hAPI.getCardValue("txtSolicitacao"),
						infoAdicionais    = removeAcentos(hAPI.getCardValue("txtAInfoAdicionais")),
						localEntrega      = removeAcentos(hAPI.getCardValue("txtLocalEntrega")),
						hashIndicePedido  = Math.floor(Math.random() * 90000) + 10000 + "",
						pedidoCorporativo = hAPI.getCardValue("pedidoCorporativo") == '1' ? '1' : '2';
						
					
					//"<C7_TOTAL>" + total + "</C7_TOTAL>" +
					/**
					 * O CAMPO É C7_ZENVTAS, QUANDO FOR INDIRETOS PODE MANDAR ESSE CAMPO COM S - MANDAR NOS ITENS
					 * 
					 * MD, MM, SO, LB, DT, MQ É TIPO DE PRODUTO Mat/Med -> tipoProduto -> tipoProduto___1 -> tbItens x txtCodItemProduto___1
					 * DEMAIS INDIRETOS
					 * 
					 * PRODUTO QUE COMEÇA COM 050000 ATÉ 075000 É Mat/Med
					 * CODIGOS 049999 PARA BAIXO É INDIRETOS
					 * CÓDIGO INICIA COM 88 TB É INDIRETOS
					 * 
					 */
					var xINDIRETO ='N';
					if(produto.substring(0,2)=='88')
						xINDIRETO ='S';
					else
						if(parseInt(produto)<=49999)
							xINDIRETO ='S';
						else {
							var xTipo = procuraTipoProduto(produto);
							if(xTipo !='MD' &&
							   xTipo !='MM' && 
							   xTipo !='SO' &&
							   xTipo !='LB' &&
							   xTipo !='DT' &&
							   xTipo !='MQ')
								xINDIRETO = 'S'
						}			
					
					xAchei =true;
					var strItem = 
							"<Item>" +
								"<C7_ITEM>"   +item              +"</C7_ITEM>" +
								"<C7_PRODUTO>"+produto           +"</C7_PRODUTO>" +
								"<C7_ZPRIORI>"+prioridade        +"</C7_ZPRIORI>" +
								"<C7_QUANT>"  +quantidade        +"</C7_QUANT>" +
								"<C7_PRECO>"  +preco             +"</C7_PRECO>" +
								"<C7_VALIPI>" +valIpi            +"</C7_VALIPI>" +
								"<C7_DESPESA>"+despesa           +"</C7_DESPESA>" +
								"<C7_CC>"     +centroCusto       +"</C7_CC>" +
								"<C7_DATPRF>" +dataPrf           +"</C7_DATPRF>" +
								"<C7_ZIDFLG>" +solicFluig        +"</C7_ZIDFLG>" +
								"<C7_ZINFADI>"+infoAdicionais    +"</C7_ZINFADI>" +
								"<C7_ZLCENTR>"+localEntrega      +"</C7_ZLCENTR>" +
								"<C7_ZFABRIC>"+fabricante        +"</C7_ZFABRIC>" +
								"<C7_ZSEQ>"   +hashIndicePedido  +"</C7_ZSEQ>" +
								"<C7_XPEDIDA>"+pedidoCorporativo +"</C7_XPEDIDA>" +
								"<C7_ZENVTAS>"+xINDIRETO         +"</C7_ZENVTAS>" +
								"<C7_XFORPAG>"+arrVencedoresCotacao[i].formaPagto+"</C7_XFORPAG>" +
							"</Item>";
					
					xmlPedido += strItem;

					log.info("STRITEM PEDIDO DE COMPRAS: " + strItem);
					log.dir(strItem);
				}
				log.info("TBCOTACAO PEDIDO DE COMPRAS: " + tbCotacoes);
				log.dir(tbCotacoes);
			}
			if(xAchei){
				log.info("TBCOTACAO PEDIDO DE COMPRAS: " + tbCotacoes);
				log.dir(tbCotacoes);
				log.info("STRITEM PEDIDO DE COMPRAS: " + strItem);
				log.dir(strItem);
				
				xmlPedido += "</Itens>" +
					         "</PedidoCompra>";
				
				log.info("XML PEDIDO DE COMPRAS: " + xmlPedido);
				log.dir(xmlPedido);
				try {
					var dsPedido      = DatasetFactory.getDataset('ds_gerarPedidoCompra', [xmlPedido], null, null);
					var codRetorno    = dsPedido.getValue(0, "codigoPedido");
					var statusRetorno = dsPedido.getValue(0, "statusRetorno");
				} catch (e) {
					throw 'Falha ao Gerar Pedido de Compras no Protheus ' + e;
				}
			}
		} else {
			var codRetorno = retornaPedidoExistente(arrVencedoresCotacao[i].codFornecedor);
		}
		if (codRetorno == 'ERRO') {
			throw "Erro na integração. \n" + statusRetorno;
		} else {
			arrPedidosCompras.push(codRetorno + '');
			hAPI.setCardValue("numPedido", JSON.stringify(arrPedidosCompras));
		}
		//	} catch (e) {
		//		throw 'Falha ao Gerar Pedido de Compras no Protheus ' + e;
		//	}
	}
}

function procuraTipoProduto(qPRODUTO) {
	// NA TABELA tbItens LOCALIZAR O txtCodItemProduto___ PELO qPRODUTO E RETORNAR tipoProduto___ 
	var xTipo = 'XX';
	var produtos = $('#tbItens').find('tr');
	for (var iItem=2; iItem<produtos.length; iItem++) {
		// txtCodItemProduto___[?]
		if (qPRODUTO == produtos[iItem].children[18].children[1].value) {
			xTipo = produtos[iItem].children[18].children[4].value;
			break;
		}
	}
	return xTipo;
}

/**
 * Converte o valor de um campo monetário para o formato aceito pelo Protheus
 * @param valor String do valor informado
 * @returns retorna o valor monetário como float
 */
function formataMoeda(valor,casas) {
	valor = valor.replace("R$",'');
	valor = valor.replace(" " ,'');
	
	while (valor.indexOf(".") != -1) 
		valor = valor.replace('.', '');
	
	valor = valor.replace(",", ".");
	valor = parseFloat(valor).toFixed(casas);
	return valor;
}

/**
 * Consulta campos de Pai Filho no formulário
 * @param fieldList Array de strings dos atributos "Name" (sem "___") dos campos do pai filho
 * @return Array de objetos, cada index do array corresponde a uma linha do pai filho com o
 * "Name" de cada campo como seletor do atributo
 */
function consultaPaiFilho(fildList) {
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
			var indexCampo = parseInt(campo.split("___")[1]) - 1;
			if (resultPaiFilho[indexCampo] == undefined) {
				resultPaiFilho[indexCampo] = {}
			}
			for (var a = 0; a < fildList.length; a++) {
				if (fildList[a] == nomeCampo) {
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
 * Transforma o objeto do tipo data para uma string no formato de data do protheus
 * @param data String de data DD/MM/YYYY
 * @returns String com a data passada no formato aceito pelo protheus. Retorna Falso se ocorrer algum erro
 */
function formataDataProtheus(data) {
	try {
		data = data.split('/');
		var ano = data[2];
		var mes = data[1];
		var dia = data[0];
		var dateResult = ano + "" + mes + "" + dia;
		return dateResult;
	} catch (err) {
		return false;
	}
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

/**
 * Recebe uma String como paramentro e a retorna sem os acentos
 * @param string
 * @returns
 */
function removeAcentos(string) {
	if (string != '' && string != null && string != undefined) {
		string = new java.lang.String(string);
		string = string.toUpperCase();
		string = string.replaceAll('Á|À|Â|Ã|Ä', 'A');
		string = string.replaceAll('É|È|Ê|Ë', 'E');
		string = string.replaceAll('Í|Ì|Î|Ï', 'I');
		string = string.replaceAll('Ó|Ò|Ô|Õ|Ö', 'O');
		string = string.replaceAll('Ú|Ù|Û|Ü', 'U');
		string = string.replaceAll('Ç', 'C');
		string = string.replaceAll('[^A-Za-z0-9]', '');
	}
	return string
}

function consultaPedidoExistente(fornecedor) {
	var numProcess = hAPI.getCardValue("txtSolicitacao");
	var constraintPedidoCompra = DatasetFactory.createConstraint('FILIAL', hAPI.getCardValue("filial_protheus"), hAPI.getCardValue("filial_protheus"), ConstraintType.MUST);
	var constraintPedidoCompra2 = DatasetFactory.createConstraint('ID_FLUIG', numProcess, numProcess, ConstraintType.MUST);
	var constraintPedidoCompra3 = DatasetFactory.createConstraint('COD_FORNECEDOR', fornecedor, fornecedor, ConstraintType.MUST);
	var ds_pedidoCompra = DatasetFactory.getDataset('ds_produtoPedidoCompra', null, [constraintPedidoCompra, constraintPedidoCompra2, constraintPedidoCompra3], null);
	if (ds_pedidoCompra.getValue(0, "PEDIDO") != null &&
		ds_pedidoCompra.getValue(0, "PEDIDO") != undefined &&
		ds_pedidoCompra.getValue(0, "PEDIDO") != "") {
		return true;
	}
	return false;
}

function retornaPedidoExistente(fornecedor) {
	var numProcess = hAPI.getCardValue("txtSolicitacao");
	var constraintPedidoCompra = DatasetFactory.createConstraint('FILIAL', hAPI.getCardValue("filial_protheus"), hAPI.getCardValue("filial_protheus"), ConstraintType.MUST);
	var constraintPedidoCompra2 = DatasetFactory.createConstraint('ID_FLUIG', numProcess, numProcess, ConstraintType.MUST);
	var constraintPedidoCompra3 = DatasetFactory.createConstraint('COD_FORNECEDOR', fornecedor, fornecedor, ConstraintType.MUST);
	var ds_pedidoCompra = DatasetFactory.getDataset('ds_produtoPedidoCompra', null, [constraintPedidoCompra, constraintPedidoCompra2, constraintPedidoCompra3], null);
	if (ds_pedidoCompra.getValue(0, "PEDIDO") != null &&
		ds_pedidoCompra.getValue(0, "PEDIDO") != undefined &&
		ds_pedidoCompra.getValue(0, "PEDIDO") != "") {
		return ds_pedidoCompra.getValue(0, "PEDIDO");
	}
	return null;
}

function formataTempo(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function seExisteItensCotacao(codFornecedor) {
	for (var j2 = 0; j < tbCotacoes.length; j2++) {
		var vencedoraCotacao = tbCotacoes[j2].vencedoraCotacao == "on" ? true : false;
		if (codFornecedor == tbCotacoes[j2].codFornecedorCotacao && vencedoraCotacao) 
			return true;
	}
	return false;
}