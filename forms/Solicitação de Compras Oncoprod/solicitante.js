var Solicitante = function() {

    var self = this; 
    this.userId = parent.WCMAPI.userCode;
    this.userName = parent.WCMAPI.user;
    this.tabelaPreco;
    this.init = function() {
            FLUIGC.calendar('#dataContagem');
            $('#addProd').click(function() {
                if ($("#filial").val() != '') {
                    var indice = wdkAddChild("tbProd");
                    $("#numProd").parent().attr('style', '');
                    $("#numProd").parent().prev().attr('style', '');                   
                    self.configRowProd(indice);
                    $("#tbProd").tableHeadFixer({ "left": 3 });
                    $(".fixedHeader").css('z-index', 3);
                } else {
                    showMessage("Atenção!", "Selecione a Filial antes de adicionar um produto.", null);
                }
            }).parent().removeClass('hidden');

            $("#btnApagaItens").click(function() {
                //Apaga todos os intens de um Pai Filho
                FLUIGC.message.confirm({
                    message: 'Deseja remover TODOS os produtos?',
                    title: 'Remover Produtos',
                    labelYes: 'Remover',
                    labelNo: 'Cancelar'
                }, function(result, el, ev) {
                    if (result == true) {
                        $('#tbProd tbody tr').not(':first').each(function(count, tr) {
                            fnWdkRemoveChild($(this).find('input')[0]);
                        });
                    }
                });
            }).parent().removeClass('hidden');
            $("tbProd").attr("nodeletebutton", "false");
            //As clinicasdoEspirito Santo e Distrito Federal usarãoa tabela de 17% ICMS,
            //a tabela de 20% para as que estão  localizadas  no Rio  de  Janeiro  e
            //as  demais clinicas  a  tabela de  18%.
            $("#ufFilial").change(function() {
                //Seta o grupo responsavel pela atividade da clinica
                var codFilial = $('#codFilial').val();
                var filtro = DatasetFactory.createConstraint('codFilial', codFilial, codFilial, ConstraintType.MUST);
                var dsRegistros = DatasetFactory.getDataset('ds_FilialGrupo', ['idGrupoFilial'], [filtro], null);
                if (dsRegistros != undefined && dsRegistros.values.length > 0) {
                    $("#grupoFilial").val(dsRegistros.values[0].idGrupoFilial);
                    //seta o código da filial fluig para que seja possível buscar os aprovadores
                    $("#btnImportCsv").closest('div').removeClass("hidden");
                    var codFilial = $("#codFilial").val();
                    var filtro = [DatasetFactory.createConstraint("filial_protheus", codFilial, codFilial, ConstraintType.MUST)];
                    var datasetFilialFluig = DatasetFactory.getDataset("filiais", ["codigo"], filtro, null);
                    if (datasetFilialFluig.values.length > 0) {
                        $("#codFilialFluig").val(datasetFilialFluig.values[0].codigo);
                    } else {
                        showMessage("Atenção.", "Filial não cadastrada para Alcaçada de aprovação.\n" +
                            "Contate a Gestão de Melhorias.", null);
                    }

                    var uf = $(this).val();
                    if (codFilial == '03001'){
                        var uf = 'SP'
                    }
                    var fornecedor = $('#codFornecedor').val();
                    var loja = $('#lojFornecedor').val();
                    
                    
                    var codigoTabelaPreco = getTabeladePrecos();                    
            

                    var f1 = DatasetFactory.createConstraint('COD_FORNECEDOR', fornecedor, fornecedor, ConstraintType.MUST);
                    var f2 = DatasetFactory.createConstraint('LOJA_FORNECEDOR', loja, loja, ConstraintType.MUST);
                    var f3 = DatasetFactory.createConstraint('CODIGO', codigoTabelaPreco, codigoTabelaPreco, ConstraintType.MUST);
                    self.tabelaPreco = DatasetFactory.getDataset('ds_tabelaPrecoCompras', null, new Array(f1, f2, f3), null).values;
                    $("#tabelaPreco").val(self.tabelaPreco[0].DESCRICAO);
                    $("#numICMS").val(codigoTabelaPreco);
                } else {
                    showMessage("Atenção!", "O Grupo responsavel pela filial não foi cadastrado.\n Contate a Gestão de Melhorias ", function() {
                        $("#codFilial").val('');
                        $("#filial").val('');
                        $("#cnpjFilial").val('');
                        $("#ufFilial").val('');
                    });

                }

            });
            //Configuarção import csv
            FLUIGC.utilities.parseInputFile("#btnImportCsv");
            $("#btnImportCsv").change(function(event) {
                self.readCSV(event.target.files[0]);
            });
            //Busca o ambiente do fluig
            if (window.location.host == 'oncoclinicas.fluig.com') {
                $('#ambiente').val('producao');
            } else {
                $('#ambiente').val('devTst');
            }
            configZoom();
        }
        //Seta as configuarções dos campos da tabela de produtos
    this.configRowProd = function(indice) {
        //ajusta layout do campo pai filho
        $(".fs-md-space").each(function() {
            $(this).removeClass("fs-md-space");
        });
        $("#itemProd___" + indice).val(indice);
        //addMaskMonetaria("#valorProd___" + indice); 
               
        $("#numProd___" + indice).next("span").on("click", function() {
            openZoom("ds_produtos_classificacao",
                "CODIGO, Codigo, DESCRICAO, Descrição",
                "CODIGO, DESCRICAO,COD_TIPO,DESC_TIPO,UM,ULTIMO_PRECO,CONTA_CONTABIL,FABRICANTE",
                "USABILIDADE," + $('#classificacaoFili').val(),
                "produto___" + indice);
        });
        $("#qtdProd___" + indice).change(function() {
            $(this).removeClass("error-field");
            var qtd = $(this).val();
            var valor = $("#valorProd___" + indice).val();
            if (qtd == "") {
                qtd = 0;
                valor = "R$ 0,00";
                $("#qtdProd___" + indice).val(qtd);
                //$("#qtdProd___" + indice).attr('readonly','readonly'); andre 19/04
            }
            if (valor == "" || valor == "Não encontrado") {
                valor = "R$ 0,00";               
                //$("#qtdProd___" + indice).attr('readonly','readonly'); andre 19/04
            }
            valor = removeMascaraMonetaria(valor);

            $("#valorTotalProd___" + indice).val(addMascaraMonetaria((valor * qtd).toFixed(2)));
            //Seta o valor total da solicitacao
            sumTotal("qtdProd", "totalQtdProd");           
            $("#valorTotal").val(sumTotal("valorTotalProd", "totalValorTotalProd", true));                       

        });                      
        
        
        $("#valorProd___" + indice).change(function() {
        	        	
        	   //$("#valorProd___" + indice).attr('readonly','readonly'); andre 21/03 
        	    var valor = convertReal($("#valorProd___" + indice).val());        	    
        	    $("#valorProd___" + indice).val(valor);       	    
        	    
                var valor = $(this).val();                        	            	
          
            	$(this).removeClass('error-field');
	            if (valor == "" || valor == "Não encontrado") {
	                valor = 0;
	                $(this).addClass('error-field');
	                //$("#qtdProd___" + indice).attr('readonly','readonly'); andre
	            }
	            var qtd = parseInt($("#qtdProd___" + indice).val());
	            if (qtd != "" && qtd != 0) {
	                valor = removeMascaraMonetaria(valor);
	                $("#valorTotalProd___" + indice).val(addMascaraMonetaria((valor * qtd).toFixed(2)));
	                //Seta o valor total da solicitacao
	                sumTotal("valorProd", "totalValorProd", true);
	                $("#valorTotal").val(sumTotal("valorTotalProd", "totalValorTotalProd", true));
	            }else{
	            	//$("#qtdProd___" + indice).attr('readonly','readonly'); andre 19/04
	            }            	            
	           
        });
        
        
        $("#numProd___" + indice).change(function() {
            //Define o prazo de pagamento
            //var fabricante = $("#fabricanteProd___" + indice).val();
            //var valorICMS = $("#numICMS").val();
            var codigo = $(this).val();
            //if (fabricante == "ROCHE" && valorICMS != '020') {
            //$('#prazoPagamento').val("75 DIAS");
            //$('#codPrazoPagamento').val("274");
            //} else {
            //$('#prazoPagamento').val("90 DIAS");
            //$('#codPrazoPagamento').val("011");
            //}
            var valorProduto = self.getValorProduto(codigo);
            if (valorProduto != null) {
                //busca valor do produto            	
                //$("#valorProd___" + indice).val(addMascaraMonetaria(valorProduto)).change();          
            	$("#valorProd___" + indice).val(convertReal(valorProduto));
            } else {
                $("#valorProd___" + indice).val("Não encontrado");
                $("#valorProd___" + indice).addClass("error-field");                
                $("#qtdProd___" + indice).val("0");
                //$("#qtdProd___" + indice).attr('readonly','readonly'); andre 16/06
                //$("#valorProd___" + indice).attr('readonly','readonly'); andre 19/04
                //$("#valorProd___" + indice).prop('readonly',true);andre 19/04
                //$("#valorProd___" + indice).prop('disabled',true);andre 19/04
            }
            
           

            //Calcula a quantidade de produto por caixa
            var filtro = DatasetFactory.createConstraint('numProd', codigo, codigo, ConstraintType.MUST);
            var ds_fatorCaixa = DatasetFactory.getDataset('ds_fatorCaixa', null, new Array(filtro), null);
            if (ds_fatorCaixa.values.length > 0) {
                var undInBox = ds_fatorCaixa.values[0].unidade;
                if (undInBox > 0) {
                    var qtdCaixa = $('#caixaProd___' + indice).val();
                    $('#qtdProd___' + indice).val(undInBox * qtdCaixa).change();
                } else {
                    //$("#qtdProd___" + indice).addClass("error-field"); andre 16/03
                }
            } else {
                //$("#qtdProd___" + indice).addClass("error-field"); andre 16/03
            }
        });

        $("#saldoAberto___" + indice).change(function() {
            sumTotal("saldoAberto", "totalSaldoAberto");
        });
        $("#inventarioProd___" + indice).change(function() {
            sumTotal("inventarioProd", "totalInventarioProd");
        });
        $("#custoMensalProd___" + indice).change(function() {
            sumTotal("custoMensalProd", "totalCustoMensalProd");
        });
        $("#caixaProd___" + indice).change(function() {
            sumTotal("caixaProd", "totalCaixaProd");
        });

        
       

    }

    this.getValorProduto = function(codProduto) {
        if (self.tabelaPreco != undefined) {
            for (var i in self.tabelaPreco) {
                var produto = self.tabelaPreco[i];
                if (codProduto == produto.COD_PRODUTO) {
                    return produto.VALOR;
                }
            }
        }
        return null;
    }

    this.readCSV = function(csvfile) {
        $("#fieldsetProd").hide();
        var reader = new FileReader();
        reader.readAsText(csvfile);
        reader.onload = function(event) {
            var csv = event.target.result;
            var separator = { "separator": ";" };
            var data = $.csv.toArrays(csv, separator);
            var listProdCsv = new Array();
            var listConstraintProd = new Array();
            //Altera a coluna de leitura entre remessa e faturamento conforme o fluxo
            var colRemFat = 0;
            if ($("#idFluxo").val() == "RemessaComprasOncoprod") {
                colRemFat = 19;
            } else {
                colRemFat = 18;
            }
            for (var row in data) {
                if (data[row][0] == 'ITEM') {
                    continue;
                }
                var qtdRemessa = data[row][colRemFat].trim();
                var codProd = data[row][2].trim();
                if (qtdRemessa != "" && qtdRemessa != '0') {
                    listProdCsv.push({
                        codOncoprod: data[row][1],
                        codProd: codProd,
                        inventario: data[row][16],
                        qtdRemessa: qtdRemessa,
                        cMedioMensal: data[row][9],
                        saldoAberto: data[row][11]
                    });
                    if (codProd != '') {
                        listConstraintProd.push(DatasetFactory.createConstraint('CODIGO', codProd, codProd, ConstraintType.SHOULD));
                    }

                }
            }
            runTable();
            self.addProdByCsv(listProdCsv, listConstraintProd);
            $("#tbProd").tableHeadFixer({ "left": 3 });
            $(".fixedHeader").css('z-index', 3);
            $("#fieldsetProd").show();
        }
    };
    this.addProdByCsv = function(listProdCsv, listConstraintProd) {
        var ds_Produto = DatasetFactory.getDataset('ds_produtos_classificacao', null, listConstraintProd, null).values;
        for (var i in listProdCsv) {
            var indice = wdkAddChild("tbProd");
            self.configRowProd(indice);
            $("#caixaProd___" + indice).val(listProdCsv[i].qtdRemessa).change();
            $("#inventarioProd___" + indice).val(listProdCsv[i].inventario).change();
            $("#custoMensalProd___" + indice).val(listProdCsv[i].cMedioMensal).change();
            $("#saldoAberto___" + indice).val(listProdCsv[i].saldoAberto).change();
            $("#codOncoprod___" + indice).val(listProdCsv[i].codOncoprod);
            for (var j in ds_Produto) {
                var codProdutoDs = ds_Produto[j]["CODIGO"].substring(1, ds_Produto[j]["CODIGO"].length);
                if (listProdCsv[i].codProd == codProdutoDs) {
                    $("#nomeProd___" + indice).val(ds_Produto[j]["DESCRICAO"]);
                    $("#unidadeProd___" + indice).val(ds_Produto[j]["UM"]);
                    $("#fabricanteProd___" + indice).val(ds_Produto[j]["FABRICANTE"]);
                    $("#contaContabilProd___" + indice).val(ds_Produto[j]["CONTA_CONTABIL"]);
                    $("#numProd___" + indice).val(ds_Produto[j]["CODIGO"]).change();
                    break;
                }
            }
        }runTable();
    }

    this.sumTotal = function(nomeCampoPaiFilho, campoTotal, addMaskMonetareia) {
        var total = 0;
        $('[name^="' + nomeCampoPaiFilho + '"]').each(function() {
            total += removeMascaraMonetaria($(this).val());
        })
        if (addMaskMonetareia == true) {
            total = addMascaraMonetaria(total.toFixed(2));
            $("#" + campoTotal).val(total);
            return total;
        } else {
            $("#" + campoTotal).val(total);
            return total;
        }
    }

    //Função executada ao apertar o botão enviar que gera o xml
    $('button[data-send]', parent.document).bind("click", function() {
        var pedidoCompra = new PedidoCompra();
        pedidoCompra.createXml();
    });
    //Seta o valor total da solicitacao
    sumTotal("saldoAberto", "totalSaldoAberto");
    sumTotal("inventarioProd", "totalInventarioProd");
    sumTotal("custoMensalProd", "totalCustoMensalProd");
    sumTotal("caixaProd", "totalCaixaProd");
    sumTotal("valorProd", "totalValorProd", true);
    sumTotal("qtdProd", "totalQtdProd");
    $("#valorTotal").val(sumTotal("valorTotalProd", "totalValorTotalProd", true));
    sumTotal("qtdAtendidoProd", "totalQtdAtendidoProd");
    sumTotal("pendentesProd", "totalPendentesProd");
    sumTotal("qtdAguardarProd", "totalQtdAguardarProd");
}

function deleteRateio(oElement) {
    if (CURRENT_STATE == INICIO || CURRENT_STATE == 0 || CURRENT_STATE == CORRECAO_SOLICITANTE) {
        //Apaga linha
        fnWdkRemoveChild(oElement);
        //Seta o valor total da solicitacao
        sumTotal("saldoAberto", "totalSaldoAberto");
        sumTotal("inventarioProd", "totalInventarioProd");
        sumTotal("custoMensalProd", "totalCustoMensalProd");
        sumTotal("caixaProd", "totalCaixaProd");
        sumTotal("valorProd", "totalValorProd", true);
        sumTotal("qtdProd", "totalQtdProd");
        $("#valorTotal").val(sumTotal("valorTotalProd", "totalValorTotalProd", true));
    }
}

function getTabeladePrecos(){	

	var estado = $("#ufFilial").val();
	var tabela = "017"
				
	var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var datasetPai = DatasetFactory.getDataset("ds_wf_tabela_filial", null, new Array(constraintPai), null).values;	    	   
	    
	    for (var i in datasetPai) {
	        //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
	        var c1 = DatasetFactory.createConstraint("tablename", "tbFilialTabela", "tbFilialTabela", ConstraintType.MUST);        
	        var c2 = DatasetFactory.createConstraint("estado", estado, estado, ConstraintType.MUST);	      
	        // // Busca o dataset
	        var dataset = DatasetFactory.getDataset("ds_wf_tabela_filial", null, new Array(c1,c2), null).values;
	        
	        if (dataset.length > 0) { 
	        	tabela = dataset[0]['tabela'];  	        	
	        }        
	    } 		
	
	return tabela;
	
}

function configZoom() {


    //Ativia os campos zoons
    $("#zoomFilial").on("click", function() {
        if (CURRENT_STATE != CORRECAO_SOLICITANTE) {
            openZoom("cad_Filiais",
                "codigo, ID, filial, Descrição, cnpj_filial, CNPJ",
                "codigo, filial_protheus, filial, uf_filial, cnpj_filial, tipoClassificacao",
                "metadata_active,true",
                "filial");
        } else {
            showMessage("Atenção!", "A Filial não pode ser alterada. Reinicie o fluxo caso necessário", null);
        }
    });

}

function setSelectedZoomItem(item) {
    if (item.type == "filial") {
        $("#codFilial").val(item.filial_protheus);
        $("#filial").val(item.filial);
        $("#cnpjFilial").val(item.cnpj_filial);
        $("#classificacaoFili").val(item.tipoClassificacao);
        $("#ufFilial").val(item.uf_filial).change();

    } else if (item.type.indexOf('produto') != -1) {
        var indexRow = item.type.split('___');
        var tipo = item["COD_TIPO"];
        //Verifica se o produto é matmed
        if (tipo == "MD" || tipo == "MM" || tipo == "MQ" || tipo == "so" || tipo == "vc") {
            $("#nomeProd___" + indexRow[1]).val(item["DESCRICAO"]);
            $("#unidadeProd___" + indexRow[1]).val(item["UM"]);
            $("#fabricanteProd___" + indexRow[1]).val(item["FABRICANTE"]);
            $("#contaContabilProd___" + indexRow[1]).val(item["CONTA_CONTABIL"]);
            $("#numProd___" + indexRow[1]).val(item["CODIGO"]).change();
        } else {
            showMessage("Atenção!", "Apenas produdos Matmed podem ser selecionados", null);
        }
    }
}

function sumTotal(nomeCampoPaiFilho, campoTotal, addMaskMonetareia) {
    var total = 0;
    $('[name^="' + nomeCampoPaiFilho + '"]').each(function() {
        total += removeMascaraMonetaria($(this).val());
    })
    if (addMaskMonetareia == true) {
        total = addMascaraMonetaria(total.toFixed(2));
        $("#" + campoTotal).val(total);
        return total;
    } else {
        $("#" + campoTotal).val(total);
        return total;
    }
}

function runTable(){
	
	$('input[id^="itemProd___"]').each(function(index, value){
		var seq = $(this).attr("id").split("___")[1];
					
		var qnt = $('#qtdProd___'+seq).val();
		
		if (qnt == "" || qnt == "0" || qnt == "Não encontrado"){
			//$('#qtdProd___'+seq).attr('readonly','readonly');	 andre 16/03
		}else{
			$('#qtdProd___'+seq).removeAttr('readonly');
		}
		
		//$("#valorProd___" + seq).prop('readonly', true);		
				
		//$('#valorProd___'+seq).attr('readonly','readonly');
		//$("#valorProd___" + seq).prop('disabled',true);
	});		
	
}

function alteraQnt(campo){
			
	var indice = campo.id.split('___')[1];	
		
	$("#qtdProd___" + indice).change(function() {
        $(this).addClass("error-field");       
       
    }); 	
	
}

//transforma um float em um string com mascara monetaria
function convertReal_(string) {
	if (string != '0' && string != '' && string != undefined && string != NaN) {
		string = this.convertFloat(string)
		string = parseFloat(string).toFixed(2)
		string = string.split('.');
		string[0] = string[0].split(/(?=(?:...)*$)/).join('.');
		string.join(',');
		return string;
	} else {
		return '0,00'
	}
}

function convertReal(string) {
	if (string != '0' && string != '' && string != undefined && string != NaN) {
		string = this.convertFloat(string)
		string = parseFloat(string).toFixed(2)
		string = string.split('.');
		string[0] = string[0].split(/(?=(?:...)*$)/).join('.');
		string.join(',');
		return "R$ " + string;
	} else {
		return 'R$ 0,00'
	}
}
// transforma um valor com mascara em um float sem mascara
function convertFloat(valor) {
	if (valor != 0 && valor != undefined && valor != null) {
		valor = valor.toString()
		if (valor.indexOf(',') != -1) {

			valor = valor.replace(/[R$.]/g, '');
			valor = valor.replace(',', '.');
			return parseFloat(valor);

		} else {

			valor = valor.replace(/[R$]/g, '');
			return parseFloat(valor);

		}
	}
	return 0;

}