function beforeTaskSave(colleagueId, nextSequenceId, userList) {

    GETSLA()
    var ATIVIDADE_ATUAL = getValue('WKNumState');
    var CURRENT_STATE =  getValue('WKNumState');
    
    
/*

    if(CURRENT_STATE == ANALISE_CONTRATO)
    	
    	{
    	
    	
    	   // Validando qtde mínima de anexo
        var anexosDosContratos = hAPI.listAttachments();
        var anexos = parseInt(hAPI.getCardValue("anexos"));
        var qtdeAnexos = anexosDosContratos.size() - anexos;

        // OBTENDO VALORES DOS CAMPOS
        var numProcesso = hAPI.getCardValue('codSolicitacao');
        var nomeRequisitanteCompras = hAPI.getCardValue('nomeSolicitante');
        var idSolicitante = hAPI.getCardValue('idSolicitante');
        var dataRequisitanteCompras = hAPI.getCardValue('dataSolicitacao');
        var filial = hAPI.getCardValue('filial');
        var codFilial = hAPI.getCardValue('codFilial');
        var centroDeCusto = hAPI.getCardValue('centroDeCusto')
        var codCentroCusto = hAPI.getCardValue('codCentroCusto');
        var localEntrega = hAPI.getCardValue('localEntrega');
        var emailContatoSolicitante = hAPI.getCardValue('emailContatSolicitante');
        var telContatSolicitante = hAPI.getCardValue('telContatSolicitante');
        var prioridade = hAPI.getCardValue('prioridade');
        var prioridadeHi = hAPI.getCardValue('prioridadeHidden');
        var dataNecessidade = hAPI.getCardValue('dataNecessidade');
        var sLocalPrestServico = hAPI.getCardValue('sLocalPrestServico');
        var hiddenLocalPrestServico = hAPI.getCardValue('hiddenLocalPrestServico');
        var hideFornecedorExclu = hAPI.getCardValue('hideFornecedorExclu');
        var setRespCompras = hAPI.getCardValue('setRespCompras');
        var infoAdicionaisComp = hAPI.getCardValue('infoAdicionaisComp');
        var codServOuProd = hAPI.getCardValue('codServOuProd');
        var emailSolicitante = hAPI.getCardValue('emailSolicitante');
        var cgcFilial = hAPI.getCardValue('cgcFilial');
        var numeroAdivo = hAPI.getCardValue("numeroAdivo");
        var campoIdentificador = hAPI.getCardValue("filial");
        var tipoCompra = hAPI.getCardValue('tipoCompra');
        var codSolicitacao = '';

        
        
        var indice = hAPI.getCardValue('indice');
        var tipoIndice = hAPI.getCardValue('tipoIndice');
        var rescisaoContrato = hAPI.getCardValue('rescisaoContrato');
        var objetoContrato = hAPI.getCardValue('objetoContrato');
        var unidadeVigencia = hAPI.getCardValue('unidadeVigencia');
        var vigenciaDoContrato = hAPI.getCardValue('vigenciaDoContrato');
        var codTipoContrato = hAPI.getCardValue('codTipoContrato');
        var tipoContrato = hAPI.getCardValue('tipoContrato');
        var contatoComercial = hAPI.getCardValue('contatoComercial');
        var emailComercial = hAPI.getCardValue('emailComercial');
        var telefoneComercial = hAPI.getCardValue('telefoneComercial');
        var valorContrato = hAPI.getCardValue('valorTotalSolicitacao');
        var composicaoPrecos = hAPI.getCardValue('composicaoPrecos');
        var qtdParcelas = hAPI.getCardValue('qtdParcelas');
        var gestorContrato = hAPI.getCardValue('gestorContrato');
        var numPropComercial = hAPI.getCardValue('numPropComercial');
        var dtTermoContrato = hAPI.getCardValue('dtTermoContrato');
        var dtPagamento = hAPI.getCardValue('dtPagamento');
        var codEspeciais = hAPI.getCardValue('codEspeciais');
        var anexo1 = hAPI.getCardValue('anexo1');
        var anexo2 = hAPI.getCardValue('anexo2');
        var anexo3 = hAPI.getCardValue('anexo3');
        var anexo4 = hAPI.getCardValue('anexo4');
        var anexo5 = hAPI.getCardValue('anexo5');
        var anexoOutros = hAPI.getCardValue('anexoOutros');
        var minutaPadrao = (hAPI.getCardValue('hiddenChkMinutaContrato') == "true") ? 'false' : 'true';
        var natureza = hAPI.getCardValue('selectTipoPessoa');

        // CONDIÇÕES
        var contratoGuardChuva;
        if (hAPI.getCardValue('hideContratoGuardChuva') == "true") {
            contratoGuardChuva = "on";
        } else {
            contratoGuardChuva = "";
        }
        var novoContratoOuAdt;
        if (hAPI.getCardValue('hideNovoContratoOuAdt') == "true") {
            novoContratoOuAdt = "Aditivo";
        } else {
            novoContratoOuAdt = "Novo Contrato";
        }
        var hideReajusteContrato;
        if (hAPI.getCardValue('hideReajusteContrato') == "true") {
            hideReajusteContrato = "1";
        } else {
            hideReajusteContrato = "2";
        }
    	  	
   	   	
        
        
        // OBTENDO O ÚLTIMO NÚMERO DE REGISTRO DO CONTRATO"
        var filtro1 = DatasetFactory.createConstraint("FILIAL", hAPI.getCardValue('codFilial'), hAPI.getCardValue('codFilial'), ConstraintType.MUST);
        var filtro2 = DatasetFactory.createConstraint("EMAIL", "liberaracesso", "liberaracesso", ConstraintType.MUST);
        var filtro3 = DatasetFactory.createConstraint("LOJA", "01", "01", ConstraintType.MUST);
        var constraints = new Array(filtro1, filtro2, filtro3);
        var dsContrato = DatasetFactory.getDataset("ds_contrato", null, constraints, null);

        log.info("### dsContrato: " + dsContrato.rowsCount);

        var arrayNumeroRG = new Array();
        for (var c = 0; c < dsContrato.rowsCount; c++) {

            log.info("### ENTREI NO PRIMEIRO FOR DO DSCONTRATO: " + dsContrato.getValue(c, "NUM_RG"));

            if (dsContrato.getValue(c, "NUM_RG") != "") {
                arrayNumeroRG.push(dsContrato.getValue(c, "NUM_RG"));
            }
        }

        log.info("### arrayNumeroRG: " + arrayNumeroRG.length);

        if (arrayNumeroRG.length == "" || arrayNumeroRG.length == "0") {
            var data = new Date();
            var ano = data.getFullYear();

            log.info("### ENTREI NO IF DO NUMERO RG. O ANO É: " + ano);

            if (hAPI.getCardValue("hideNovoContratoOuAdt") == "true") {
                hAPI.setCardValue("numRgContrato", ano + "000000000000001-" + hAPI.getCardValue("numeroAdivo"));
                log.info("### hideNovoContratoOuAdt == true ");
            } else {
                hAPI.setCardValue("numRgContrato", ano + "000000000000001");
                log.info("### hideNovoContratoOuAdt == false ");
            }
        } else {
            log.info("### ENTREI NO ELSE DO NUMERO RG.");

            var novoNumRgContrato = 0;

            // Obtendo o maior número do RG de contrato e somando mais 1
            for (var b = 0; b < arrayNumeroRG.length; b++) {

                log.info("### ENTREI NO FOR DOS NUMEROS RG.");
                log.info("### arrayNumeroRG[b]: " + arrayNumeroRG[b]);
                log.info("### novoNumRgContrato: " + novoNumRgContrato);

                if (arrayNumeroRG[b] > novoNumRgContrato) {

                    log.info("### ENTRE NO arrayNumeroRG[b] É maior que novoNumRgContrato ");

                    var geraData = new Date();
                    var anoAtual = geraData.getFullYear();
                    var numeroRgString = arrayNumeroRG[b].toString;

                    log.info("### numeroRgString " + numeroRgString);

                    if (numeroRgString == 9) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 8) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "0000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 7) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "00000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 6) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "000000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 5) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "0000000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 4) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "00000000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 3) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "000000000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 2) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "0000000000000" + arrayNumeroRG[b] + 1);
                    } else if (numeroRgString == 1) {
                        hAPI.setCardValue("numRgContrato", anoAtual + "00000000000000" + arrayNumeroRG[b] + 1);
                    }
                }
            }
        }

        log.info("### Valor aplicado em Numero do contrato: " + hAPI.getCardValue("numRgContrato"));
        
        
        
    	
    	hAPI.setCardValue("nomeUserComprasContrato", nomeRequisitanteCompras);
    	hAPI.setCardValue("codUserComprasContrato", idSolicitante);
    	hAPI.setCardValue("dataComprasContrato", dataRequisitanteCompras);
    	hAPI.setCardValue("numSolicitacao", numProcesso);
    	hAPI.setCardValue("codFilialFluigContrato", codFilial);
    	hAPI.setCardValue("filialContrato", filial);
    	hAPI.setCardValue("cpCc", centroDeCusto);
    	hAPI.setCardValue("CTT_CUSTO", codCentroCusto);
    	hAPI.setCardValue("tipoContratoCompras", novoContratoOuAdt);
    	hAPI.setCardValue("sPrioridadeProduto", prioridadeHi);
    	hAPI.setCardValue("dtNecessidadeProduto", dataNecessidade);
    	hAPI.setCardValue("reajusteContrato", hideReajusteContrato);
    	hAPI.setCardValue("indiceContrato", indice);
    	hAPI.setCardValue("rescisaoContratoContrato", rescisaoContrato);
    	hAPI.setCardValue("objetoContratoContrato", objetoContrato);
    	hAPI.setCardValue("unidadeVigenciaContrato", unidadeVigencia);
    	hAPI.setCardValue("vigenciaDoContratoContrato", vigenciaDoContrato);
    	
    	hAPI.setCardValue("codTipoContratoContrato", codTipoContrato);
    	hAPI.setCardValue("contatoComercialContrato", contatoComercial);
    	hAPI.setCardValue("emailComercialContrato", emailComercial);
    	hAPI.setCardValue("telefoneComercialContrato", telefoneComercial);
    	hAPI.setCardValue("valorTotalServico", valorContrato);
    	hAPI.setCardValue("referenciaEntrega", localEntrega);
    	hAPI.setCardValue("sLocalPrestServicoContrato", hiddenLocalPrestServico);
    	hAPI.setCardValue("isContratoGuardChuvaContrato", contratoGuardChuva);
    	hAPI.setCardValue("emailContatSolicitanteContrato", emailContatoSolicitante);
    	hAPI.setCardValue("telContatSolicitanteContrato", telContatSolicitante);
    	hAPI.setCardValue("hiddenPrioridade", prioridadeHi);
    	hAPI.setCardValue("COD_SOLICITACAO", codSolicitacao);
    	hAPI.setCardValue("hiddenLocalPrestServico", hiddenLocalPrestServico);
    	//hAPI.setCardValue("numRgContrato", numRgContrato);
    	hAPI.setCardValue("tipoContratoContrato", tipoContrato);
    	hAPI.setCardValue("tipoIndiceContrato", tipoIndice);
    	hAPI.setCardValue("setRespComprasContrato", setRespCompras);
    	hAPI.setCardValue("infoAdicionaisComp", infoAdicionaisComp);
    	hAPI.setCardValue("codServOuProdContrato", codServOuProd);
    	hAPI.setCardValue("emailSolicitanteContrato", emailSolicitante);
    	hAPI.setCardValue("composicaoPrecosContrato", composicaoPrecos);
    	hAPI.setCardValue("qtdParcelasContrato", qtdParcelas);
    	hAPI.setCardValue("gestorContratoContrato", gestorContrato);
    	hAPI.setCardValue("numPropComercialContrato", numPropComercial);
    	hAPI.setCardValue("dtTermoContratoContrato", dtTermoContrato);
    	
    	hAPI.setCardValue("dtPagamentoContrato", dtPagamento);
    	hAPI.setCardValue("codEspeciaisContrato", codEspeciais);
    	hAPI.setCardValue("anexo1Contrato", anexo1);
    	hAPI.setCardValue("anexo2Contrato", anexo2);
    	hAPI.setCardValue("anexo3Contrato", anexo3);
    	hAPI.setCardValue("anexo4Contrato", anexo4);
    	hAPI.setCardValue("anexo5Contrato", anexo5);
    	
    	hAPI.setCardValue("anexoOutrosContrato", anexoOutros);
    	hAPI.setCardValue("cgcFilialContrato", cgcFilial);
    	hAPI.setCardValue("numeroAdivoContrato", numeroAdivo);
    	hAPI.setCardValue("campoIdentificador", campoIdentificador);
    	hAPI.setCardValue("minutaPadrao", minutaPadrao);
    	hAPI.setCardValue("natureza", natureza);
    	





        // TRANTANDO DE TODAS AS TABELAS PAIXFILHO DO PROCESSO 
        var campos = hAPI.getCardData(getValue("WKNumProces")).keySet().toArray();
        var arrayCodFornVencedor = new Array();

        log.info("#### arrayCodFornVencedor: " + arrayCodFornVencedor);
        log.info("#### TODOS OS CAMPOS: " + campos);

        for (var x in campos) {
            field = campos[x];

            log.info("#### FIELD: " + field);

            // TABELA PRODUTOS
            if (field.indexOf("codProd___") > -1) {
                index = field.split("___")[1];

                log.info("#### INDEX PRODUTO: " + index);

                // Add produtos na tabela filha de contratos tbItens
                
                
               
                
                var camposItens = new java.util.HashMap();
                
                camposItens.put("txtCodItemProduto", hAPI.getCardValue('codProd___' + index));
                camposItens.put("txtDescProduto", hAPI.getCardValue('nomeProd___' + index));
                camposItens.put("txtUnidMedProduto", hAPI.getCardValue('unidadeProd___' + index));        
                camposItens.put("txtQuantidadeProduto", hAPI.getCardValue('qtdProd___' + index));
                camposItens.put("txtObsProduto", hAPI.getCardValue('infoAdicionais___' + index));
                camposItens.put("txtSeqItemProduto", hAPI.getCardValue('itemProd___' + index));
                camposItens.put("txtPrecoProduto", hAPI.getCardValue('valorProd___' + index));     
                
                hAPI.addCardChild("tbItens", camposItens);
      
                








          

                var codFornVencedorProd = hAPI.getCardValue('codFornVencedorProd___' + index);
                log.info("#### codFornVencedorProd: " + codFornVencedorProd);
                arrayCodFornVencedor.push(codFornVencedorProd);
            }

            // TABELA FORNECEDOR
            if (field.indexOf("codForn___") > -1) {
                index = field.split("___")[1];

                log.info("#### TABELA FORNECEDOR + CODIGO DO FORNECEDOR VENCEDOR: " + arrayCodFornVencedor);
                log.info("#### hAPI.getCardValue('codForn___' + index) " + hAPI.getCardValue('codForn___' + index));

                for (var j in arrayCodFornVencedor) {
                    codigoFornecedor = arrayCodFornVencedor[j];

                    log.info("#### ENTREI NO ARRAY GRAÇAS A DEUS: " + codigoFornecedor);

                    if (codigoFornecedor == hAPI.getCardValue('codForn___' + index)) {

                        log.info("#### INDEX FORNECEDOR: " + index);

                        // Add Fornecedor
                        
                        var camposForn = new java.util.HashMap();
                        
                        camposForn.put("codFornecedorProtheusContrato", hAPI.getCardValue('codForn___' + index));
                        camposForn.put("nomeFornecedor", hAPI.getCardValue('nomeForn___' + index));
                        camposForn.put("codLojaFornecedor", hAPI.getCardValue('lojaForn___' + index));
                        camposForn.put("cnpjFornecedor", hAPI.getCardValue('cnpjForn___' + index));
                        camposForn.put("codCondPagamento", hAPI.getCardValue('codCondForn___' + index));
                        camposForn.put("condicaoPgto", hAPI.getCardValue('condForn___' + index));
                        camposForn.put("formaPagamento", hAPI.getCardValue('formaForn___' + index));
                        camposForn.put("prazoEntrega", hAPI.getCardValue('prazoForn___' + index));
                        camposForn.put("frete", hAPI.getCardValue('tipoFreteForn___' + index));
                        camposForn.put("VlrFrete", hAPI.getCardValue('valorFreForn___' + index));
                        camposForn.put("formaFornHidden", hAPI.getCardValue('formaFornHidden___' + index));
                        camposForn.put("fornecedorProtheusContrato", hAPI.getCardValue('codForn___' + index));
                        camposForn.put("bancoFornContrato", hAPI.getCardValue('bancoForn___' + index));
                        camposForn.put("agenciaFornContrato", hAPI.getCardValue('agenciaForn___' + index));
                        camposForn.put("contaFornContrato", hAPI.getCardValue('contaForn___' + index));
                        camposForn.put("dvAgenciaFornContrato", hAPI.getCardValue('dvAgenciaForn___' + index));

   
                        
                        hAPI.addCardChild("tbFornecedores", camposForn);
                        






                    }
                }
            }

            // TABELA FILIAL PARA CONTRATOS GUARDA-CHUVAS
            if (contratoGuardChuva == "on" && field.indexOf("filialGuardChu___") > -1) {
                index = field.split("filialGuardChu___")[1];

                log.info("#### INDEX FILIAL GUARDA-CHUVA: " + index);
                
                
                var camposChamaChuva = new java.util.HashMap();
                
                camposChamaChuva.put("filialGuardChuContrato", hAPI.getCardValue('filialGuardChu___' + index));
                camposChamaChuva.put("cnpjFilialContrato", hAPI.getCardValue('cnpjFilial___' + index));
                camposChamaChuva.put("enderecoFilialContrato", hAPI.getCardValue('enderecoFilial___' + index));
                
                camposChamaChuva.put("valorUnitarioContrato", formatMoney(parseFloat(removeMascaraMonetaria(hAPI.getCardValue('valorTotalSolicitacao')) * (parseInt(hAPI.getCardValue('valorUnitario___' + index)) / 100))));
                camposChamaChuva.put("codFilialGuardChu", hAPI.getCardValue('codFilialGuardChu___' + index));
                camposChamaChuva.put("hideContratoGuardChuvaContrato", hAPI.getCardValue('hideContratoGuardChuva___' + index));
                camposChamaChuva.put("valorPercentContrato", hAPI.getCardValue('valorUnitario___' + index));


                
                hAPI.addCardChild("tbFiliaisContrato", camposChamaChuva);
                
            }
        }
    	
    	
    	
    	}
    
    //inicio atividades contrato
	if (ATIVIDADE_ATUAL == ANALISE_CONTRATO) {
		hAPI.setCardValue("setRespCompras", "Pool:Group:CT");
	}
	if (ATIVIDADE_ATUAL == CORRECAO_DOCUMENTO_CONTRATOS) {
		hAPI.setCardValue("setRespCompras", "Pool:Group:CT");
	}
	if (ATIVIDADE_ATUAL == ASSINATURA_INTERNA_E_FORN) {
		hAPI.setCardValue("setRespCompras", "Pool:Group:CT");
	}
	//fim atividades contrato

    if (ATIVIDADE_ATUAL == inicio || ATIVIDADE_ATUAL == 0 || ATIVIDADE_ATUAL == 1 || ATIVIDADE_ATUAL == correcaoSolicitante) {
        var tipoCompra = hAPI.getCardValue('tipoCompra');
        var prioridade = hAPI.getCardValue('prioridadeHidden');
        if (prioridade == 'E') {
            if (tipoCompra == '1') {
                hAPI.setCardValue("COD_SOLICITACAO", '2417719'); //2416905
            } else if (tipoCompra == '2') {
                hAPI.setCardValue("COD_SOLICITACAO", '2417779'); // 2417781
            } else if (tipoCompra == '3') {
                hAPI.setCardValue("COD_SOLICITACAO", '2416942'); //2416906
            } else {
                hAPI.setCardValue("COD_SOLICITACAO", '2417785'); //2417786
            }

            GETSLA()
        }
    }

    if (ATIVIDADE_ATUAL == anexaSolicitacao) {
        // Enviando a qtde de arquivos anexados de pedidos de compras para o campo "anexos".
        var anexo = hAPI.listAttachments();
        hAPI.setCardValue("anexos", hAPI.listAttachments().size());
    }

    if (ATIVIDADE_ATUAL == analiseCompradorCotacao) {
        var qtdAnexos = hAPI.listAttachments();
        if (hAPI.getCardValue("correcaoSolicitacao") != "true") {
            if (qtdAnexos.size() < hAPI.getCardValue("hiddenQtdCotacoes")) {
                throw "É obrigatório anexar as " + hAPI.getCardValue("hiddenQtdCotacoes") + " cotações realizadas.";
            }
        }
        if (hAPI.getCardValue("hiddenChkMinutaContrato") == "true") {
            if (qtdAnexos.size() < parseInt(hAPI.getCardValue("hiddenQtdCotacoes")) + 1) {
                throw "É obrigatório anexar a minuta do fornecedor.";
            }
        }
        // Se o tipo de Contrato for Novo exige-se no mínimo 4
        if (hAPI.getCardValue("hideNovoContratoOuAdt") == "false" && qtdAnexos < 4) {
            throw "É preciso anexar no minimo 4 arquivos nesta atividade para continuar o processo!";
        }
        // Se o tipo de Contrato for Aditivo exige-se no mínimo 5
        if (hAPI.getCardValue("hideNovoContratoOuAdt") == "true") {
            if ((hAPI.getCardValue("hideAnexoAditivos") == "false" || hAPI.getCardValue("hideAnexoAditivos") == "") && qtdAnexos < 4) {
                throw "É preciso anexar no mínimo 4 arquivos nesta atividade para continuar o processo!";
            }
            if (hAPI.getCardValue("hideAnexoAditivos") == "true" && qtdAnexos < 5) {
                throw "É preciso anexar no mínimo 5 arquivos nesta atividade para continuar o processo!";
            }
        }
    }
    
    
    */
}