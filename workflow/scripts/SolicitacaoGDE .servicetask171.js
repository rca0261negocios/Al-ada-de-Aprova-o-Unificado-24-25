function servicetask171(attempt, message) {
	
	 //MONTA OS XMLs	
    var listProduto = consultaPaiFilho(['aux_cpItem','aux_cpCodProduto','aux_cpCodCentroCusto','aux_obs','aux_adicionais']);
    
    log.info('listProduto')
    log.dir(listProduto)
   
    var codFornecedor = hAPI.getCardValue("cpCodFornecedor");
    var lojaForn = hAPI.getCardValue("cpLojaFornecedor");
    var nomeForn = hAPI.getCardValue("cpRazaoSocial");   
    
    log.info("condicao pagto:" +hAPI.getCardValue("cpCodCondPagamento_aux"))
           
        var contentPedido = {
            codFornecedor: codFornecedor,
            loja: lojaForn,                 
            nomeFornecedor: nomeForn,            
            listProduto: []
        }
      
        for (var j = 0; j < listProduto.length; j++) {
           
        	contentPedido.listProduto.push({
        		item: listProduto[j].aux_cpItem,               
                codProduto: listProduto[j].aux_cpCodProduto,
                centroCusto: listProduto[j].aux_cpCodCentroCusto,
                obs: listProduto[j].aux_obs,
                adicionais: listProduto[j].aux_adicionais,
            })
            
        }
        //FAZ INTEGRAÇÃO COM PROTHEUS
                        
                log.info("ENTREI NO IF DO pedidosGerados");
                var xmlAtual = montaXML(contentPedido);
                log.info("xmlAtual " + xmlAtual);

                if (xmlAtual != undefined) {
                    log.info('XML GERADO'+ xmlAtual);
                    //EMITE PEDIDO DE COMPRAS
                    var dsPedido = DatasetFactory.getDataset('ds_alterarPedidoCompra', new Array(xmlAtual), null, null);
                    var codPedido = dsPedido.getValue(0, "codigoPedido");
                    var statusRetorno = dsPedido.getValue(0, "statusRetorno");
                    
                    log.info('RESULT PEDIDO '+ codPedido);
                    log.info('MSG PEDIDO '+ statusRetorno);
                    
                    if (codPedido == 'ERRO' || codPedido == null || codPedido == 'null' || codPedido == '3') {
                        throw "Erro na INTEGRAÇÃO. \n" + statusRetorno;
                    } else {
                    	hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 0,statusRetorno ); 
                    }
                }else{
                	
                	 throw "Erro na integração com xml == undefined. \n"
                	
                }

            
       
    
}

function montaXML(contentPedido) {
	
	var solicitacao = getValue("WKNumProces");
    log.info("ENTREI NO montaXML");
    log.info("contentPedido.listProduto.length: " + contentPedido.listProduto.length);
           
    if (contentPedido.listProduto.length > 0) {
        log.info("ENTREI NO IF DO CONTENTPEDIDO");
        var modeloXML = '<PedidoCompra><Operacao><Id>4</Id></Operacao><Cabecalho></Cabecalho><Itens></Itens></PedidoCompra>';
        var xml = new XML(modeloXML);
        xml.Cabecalho.C7_FILIAL = hAPI.getCardValue("cpCodFilialPedido");
        xml.Cabecalho.C7_FORNECE = contentPedido.codFornecedor;
        xml.Cabecalho.C7_LOJA = contentPedido.loja;               
        xml.Cabecalho.C7_FILENT = hAPI.getCardValue("cpCodFilialPedido"); 
        xml.Cabecalho.C7_COND = hAPI.getCardValue("cpCodCondPagamento_aux");
        xml.Cabecalho.C7_NUM = hAPI.getCardValue("cpCodPedidoComp");
       
        log.info("DENTRO DO CONTENTPEDIDO: " + contentPedido.listProduto.length);

        for (var i = 0; i < contentPedido.listProduto.length; i++) {
            var produtoAtual = contentPedido.listProduto[i];
            xml.Itens.Item[i] = '';
            xml.Itens.Item[i].C7_ITEM = produtoAtual.item;          
            xml.Itens.Item[i].C7_PRODUTO = produtoAtual.codProduto;
            xml.Itens.Item[i].C7_ZIDFLG = solicitacao;      
            xml.Itens.Item[i].C7_CC = produtoAtual.centroCusto;
            xml.Itens.Item[i].C7_ZINFADI = produtoAtual.adicionais;         
            xml.Itens.Item[i].C7_OBS = produtoAtual.obs; 
            
            log.info("contador i " + i);
        }
                

        log.info("XML XML XML... " + xml);
        
        hAPI.setCardValue('cpXML',xml);

        return xml;
    }

}

function calcPorcentagem(valor, percentual) {
    if (valor > 0) {
        var valProduto = parseFloat(valor);
        var valPercentual = parseFloat(percentual);
        var vlTotal = parseFloat((valPercentual * 100) / valProduto);
        return vlTotal;
    } else {
        return 0;
    }
}

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
            var nomeCampo = campo.split("___")[0];
            var indexCampo = parseInt(campo.split("___")[1]);

            //Percorre a lista de campos informada como parametro
            for (var i = 0; i < fildList.length; i++) {
                if (fildList[i] == nomeCampo) {
                    if (resultPaiFilho[indexCampo - 1] == undefined) {
                        resultPaiFilho[indexCampo - 1] = {};
                    }
                    //Adiciona um atributo com o nome do campo contendo seu valor ao array de resultado
                    //Cada linha do array corresponde a uma linha da tabela com a primeira linha sendo o index 0
                    resultPaiFilho[indexCampo - 1][nomeCampo] = mapa.get(campo);
                }
            }
        }
    }
    return resultPaiFilho;
}


function removeAcentos(string) {
    if (string != "" && string != null) {
        string = new java.lang.String(string);
        string = string.toUpperCase();
        string = string.replaceAll("Á|À|Â|Ã|Ä", "A");
        string = string.replaceAll("É|È|Ê|Ë", "E");
        string = string.replaceAll("Í|Ì|Î|Ï", "I");
        string = string.replaceAll("Ó|Ò|Ô|Õ|Ö", "O");
        string = string.replaceAll("Ú|Ù|Û|Ü", "U");
        string = string.replaceAll("Ç", "C");
        string = string.replaceAll("/", "-");
        string = string.replaceAll("[^A-Za-z0-9- ]", "");
    }
    return string;
}
	