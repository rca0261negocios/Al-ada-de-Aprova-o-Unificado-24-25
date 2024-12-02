var vueApp = null;
var primeiraCompra = 0;

var configApp = {
    el: '#app',
    data: {
        atividadeAtual: '',
        edicao: false,
        //Atividades do processo
        process: {
            inicio: 4,
            analiseComprador: 5,
            cotacaoBionexo: 22,
            analiseCotacao: 25,
            alcadaAprovacao: 30,
            pedidoCompras: 57,
            execaoIntegracao: 59,
            aprovSolicitante: 53,
            inconsistencia: 41,
            correcaoSolicitante: 48,
            downloadPedido: 110
        },
        //Campos do formulario
        form: {
            nomeSolicitante: $('#nomeSolicitante').val(),
            idSolicitante: $('#idSolicitante').val(),
            emailSolicitante: $('#emailSolicitante').val(),
            codFilialFluig: $('#codFilialFluig').val(),
            codFilial: $('#codFilial').val(),
            ufFilial: $('#ufFilial').val(),
            filial: $('#filial').val(),
            classificacaoFili: $('#classificacaoFili').val(),
            codCentroCusto: $('#codCentroCusto').val(),
            centroDeCusto: $('#centroDeCusto').val(),
            localEntrega: $('#localEntrega').val(),
            infoAdicionais: $("#infoAdicionais").val(),
            prioridade: $("#prioridadeHidden").val(),
            prioridadeOriginal: $("#prioridadeOriginal").val(),
            responsavelAltPriori: $("#responsavelAltPriori").val(),
            justicativaAltPrioridade: $("#justicativaAltPrioridade").val(),
            valCotacao: $("#valCotacao").val(),
            tipoCotacao: $("#tipoCotacaoHidden").val(),
            codSolicitacao: $("#codSolicitacao").val(),
            campoIdentificador: $("#campoIdentificador").val(),
            codSolicitacaoVinculada: $("#codSolicitacaoVinculada").val(),
            valorTotalSolicitacao: $("#valorTotalSolicitacao").val(),
            codSolicitacaoDesvinculada: $("#codSolicitacaoDesvinculada").val(),
            refSolicitacaoDesvinculada: $("#refSolicitacaoDesvinculada").val(),
            isAlcada: $("#isAlcada").val(),
            contadorAlcada: $("#contadorAlcada").val(),
            aprovAlcadaAtual: $("#aprovAlcadaAtual").val(),
            idAprovAlcada1: $("#idAprovAlcada1").val(),
            nomeAprovAlcada1: $("#nomeAprovAlcada1").val(),
            dataAprovAlcada1: $("#dataAprovAlcada1").val(),
            decisaoAlcada1: $("#decisaoAlcada1").val(),
            motivoAprovAlcada1: $("#motivoAprovAlcada1").val(),
            idAprovAlcada2: $("#idAprovAlcada2").val(),
            nomeAprovAlcada2: $("#nomeAprovAlcada2").val(),
            dataAprovAlcada2: $("#dataAprovAlcada2").val(),
            decisaoAlcada2: $("#decisaoAlcada2").val(),
            motivoAprovAlcada2: $("#motivoAprovAlcada2").val(),
            idAprovAlcada3: $("#idAprovAlcada3").val(),
            nomeAprovAlcada3: $("#nomeAprovAlcada3").val(),
            dataAprovAlcada3: $("#dataAprovAlcada3").val(),
            decisaoAlcada3: $("#decisaoAlcada3").val(),
            motivoAprovAlcada3: $("#motivoAprovAlcada3").val(),
            idAprovSolicitante: $("#idAprovSolicitante").val(),
            nomeAprovSolicitante: $("#nomeAprovSolicitante").val(),
            dataAprovSolicitante: $("#dataAprovSolicitante").val(),
            decisaoSolicitante: $("#decisaoSolicitante").val(),
            motivoAprovSolicitante: $("#motivoAprovSolicitante").val(),
            motivoAnaliseComprador: $("#motivoAnaliseComprador").val(),
            motivoExclusividade: $("#motivoExclusividadeHidden").val(),
            possuiExclusividade: $("#possuiExclusividadeHidden").val(),
            possuiExclusividade: false,
            correcaoSolicitacao: false,
            isAglutinar: false,
            motivoEmergencial:$("#motivoEmergencial").val(),
            ehSugestaoCompras:$("#ehSugestaoCompras").val()
        },
        listTabelaExcecao: {
            "000262": {
                nome: "EUROFARMA",
                filiais: ["GO"],
                tabelaExcecao: '101'
            },
            "000284": {
                nome: "GALENICA",
                filiais: ["MA", "PI", "CE", "BA", "SE", "AL", "PE", "PB", "RN"],
                tabelaExcecao: "026"
            },
            "000489": {
                nome: "ONCO PROD",
                filiais: ["ES", "DF", "RJ", "RS", "SP", "GO", "SC"],
                tabelaExcecao: ["019", "020", "019","017", "040"]
            }
        },
        listProdutoFechada: [],
        listVencedorCotacao: [],
        linhaJustificativaCotacao: null
    },
    created: function () {
        //Configura o modo edição nas atividades necessárias 
        this.atividadeAtual = CURRENT_STATE;
        var listEdicao = [0, this.process.inicio, this.process.correcaoSolicitante]
        this.edicao = listEdicao.indexOf(this.atividadeAtual) != -1;
    },
    mounted: function () { //Executa quando a aplicação é montada
        var self = this;
        if (this.atividadeAtual == this.process.inicio || this.atividadeAtual == 0) {
            /* Bloquear essa seção quando getSLA for ativo (?)*/
            var parametros = getParametrosURL();
            if($("#poolAbertura").val() == ""){
                $("#poolAbertura").val(parametros.poolAbertura);
            }            

            if ($('#ehSugestaoCompras').val() == 'true') {
                setSelectedZoomItem(dadosFilialSugestao($('#codFilial').val()))
                $('#filial').val($('#nomFili').val());
                
                
                if($('[tablename="tbProd"] tbody tr').length == 1){
                    var prods = JSON.parse($('#prodJsonSugest').val());
                    prods.forEach(element => {
                        $('#addProd').click();
                    });
    
                    $('[name^=itemProd___]').each(function () {
                        var indice = this.name.split('___')[1];
                        if (prods[indice - 1] != undefined) {
                            var produtoSugestao = dadosProdutoSugestao(indice, prods[indice - 1].codigo)
                            $('#itemProd___' + indice).val(indice);                        
                            setSelectedZoomItem(produtoSugestao);
                            $('#qtdProd___' + indice).val(prods[indice - 1].qtde);
                            $('#qtdProd___' + indice).prop('readonly', true);
                        }
                    });
                }

                $(".fs-md-space").each(function () {
                    $(this).removeClass("fs-md-space");
                });

                /* $('.fluigicon-trash').hide(); */                
                /* $('#addProd').prop('disabled', true); */
                $('#localEntrega').prop('readonly', true);
                $('#prioridade').prop('readonly', true);
                $('.sugestao').show();
                $('#prioridade').prop('disabled', true);
                /* $('#infoAdicionais').prop('readonly', true); */
                /* $('#addProd').hide(); */
                $('[name^=itemProd___]').each(function () {
                    var indice = this.name.split('___')[1];
                    if ($('#codProd___' + indice).val() == '') {
                        fnWdkRemoveChild($("#itemProd___" + indice)[0]);
                    }
                });
               
				//  addEventSendFluig(function () {         
				//      self.form.filial = $('#nomFili').val()           
				//      self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";                                     
				//  });
                // SEGURANCA CAMPO IDENTIFICADOR
                // SM2 - RCA 28.02.24
                $('button[data-send]', parent.document).bind("click", function() { 
                    //self.form.filial = $('#nomFili').val()
                    //self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";
        	    	$("#campoIdentificador").val( $("prioridade").val()+" - "+$("filial").val()+" - TP" );
                });

            } else {
                //Seta os dados dos campos fixos e predefinidos
                this.form.nomeSolicitante = parent.WCMAPI.user;
                this.form.idSolicitante = parent.WCMAPI.userCode;
                this.form.emailSolicitante = parent.WCMAPI.userEmail;
                //this.form.centroDeCusto = 'DISPENSACAO DE MEDICAMENTOS';
                //this.form.codCentroCusto = '11130216';
                this.loadFilialFarm();
                $("#dataSolicitacao").val(getCurrentDate());
                FLUIGC.calendar("#dataNecessidadeContent", {
                    pickDate: true,
                    pickTime: false,
                    minDate: new Date()
                });


                $('#prioridade').change(function () {
                    $('#prioridadeOriginal').val(this.value);
                });       

                // addEventSendFluig(function () {                    
                //    self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";                                     
                // });
                // SEGURANCA CAMPO IDENTIFICADOR
                // SM2 - RCA 28.02.24
                $('button[data-send]', parent.document).bind("click", function() { 
                    //self.form.filial = $('#nomFili').val()
                    //self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";
        	    	$("#campoIdentificador").val( $("prioridade").val()+" - "+$("filial").val()+" - TP" );
                });

            }

            $(".colcfechada").hide();
            $('#divJustAlteracao').hide();          


        } else if (this.atividadeAtual == this.process.analiseComprador) {
            $('#divJustAlteracao').hide();
            $('#prioridade').prop("disabled", false);
            $('#motivoEmergencial').prop("disabled", false);
            $('#prioridade').change(function () {
                $('#justicativaAltPrioridade').val('');
                if (this.value != $("#prioridadeOriginal").val()) {
                    $('#divJustAlteracao').show();
                    $('#justicativaAltPrioridade').prop('disabled', false);
                    $('#responsavelAltPriori').val(parent.WCMAPI.user)
                } else {
                    $('#divJustAlteracao').hide();
                    $('#justicativaAltPrioridade').prop('disabled', true);
                }

                var valorSelecionado = $("#prioridade option:selected").val()
                if(valorSelecionado == "E"){
                    $('#div_motivoEmergencial').show();
                }else{
                    $('#div_motivoEmergencial').hide();
                }

            });
            readColumn("codCotacao", function (row, item) {
                fnWdkRemoveChild(item[0]);
            });
            //ADICIONA FUNCAO ZOOM QUANDO A SOLICITACAO FOR SALVA
            readColumn("codAgl", function (row) {
                self.zoomAglutinacao(row);
            });          

            
            //EVENTOS 
            readColumn("codProd", function (row) {
                addMaskMonetaria("#valIpiProd___" + row);
                $("#qtdProd___" + row)
                    .add("#valorProd___" + row)
                    .add("#valIpiProd___" + row).change(function () {
                        var rowChange = $(this).prop('name').split('___')[1];
                        self.somaTotalProduto(rowChange);
                    })
                self.somaTotalProduto(row);
            })

            if($("motivoAnaliseComprador") != "" || $("motivoAnaliseComprador") != undefined){
                $("[name^='totalFornecResumo___']").each(function () {
                    $(this).val("");
                });
            }

            readColumn('codCotacao', function (row) {
                self.configCotacao(row);
                $("#valorCotacao___" + row).trigger('change');
            });

            readColumn("codForn", function (row) {
                self.configFornecedor(row);
                //funcao que faz pegar o valor de novos fornecedores
                var listProduto = self.getAllItem("Prod");
                var fornecedor = {
                    cnpj: $("#cnpjForn___" + row).val(),
                    nome: $("#nomeForn___" + row).val(),
                    codForn: $("#codForn___" + row).val()
                }
                self.addCotacao(listProduto, fornecedor);
            });
            self.form.contadorAlcada = 1;

            var listaProdutos = [];

            //VERIFICA O TIPO DA SOLICITCAO
            readColumn("isFechadaProd", function (row, item) {
                if (item.prop('checked') == true) {
                    self.listProdutoFechada.push(self.getItem(row, "Prod"));
                } else {
                    listaProdutos.push("COD_PRODUTO|" + $("#codProd___" + row).val());
                    self.form.tipoCotacao = 'fechado';
                }
            });

            if (listaProdutos.length > 0) {
                self.carregaValorProduto(listaProdutos);
            }

            if (self.form.tipoCotacao == 'tabela') {
                //VERIFICA SE NA SOLICITACAO TABELA PRECO EXISTE PRODUTOS COTACAO FECHADA E OS SEPARA
                if (self.listProdutoFechada.length > 0) {
                    var dsMatMed = getInDataset('ds_comprasMatMed', ['codSolicitacao'], ['codSolicitacaoVinculada|' + self.form.codSolicitacao])
                    if (dsMatMed.values.length > 0) {
                        self.form.codSolicitacaoVinculada = dsMatMed.values[0]['codSolicitacao'];
                        self.removeProdutosCotacaoFechada();
                    } else {
                        //INICIA SOLICITACAO VINCULADA DA COTACAO FECHADA
                        var xmlNovaSolicitacao = renderXmlSolicitacaoMatMed(self, self.listProdutoFechada, 'cotacaoFechada');
                        self.iniciaNovaSolicitacao(xmlNovaSolicitacao,
                            //SUCCESS
                            function (data) {
                                $(data).find("key").each(function (k, v) {
                                    if ($(v).text() == 'iProcess') {
                                        self.form.codSolicitacaoVinculada = $(v).next().text();
                                        return false
                                    }
                                });
                                if (self.form.codSolicitacaoVinculada != '') {
                                    FLUIGC.toast({
                                        message: 'A solicitação ' + self.form.codSolicitacaoVinculada + ' foi gerada a partir dessa para cotação fechada.',
                                        type: 'success',
                                        timeout: "slow"
                                    });
                                    self.removeProdutosCotacaoFechada();
                                } else {
                                    showMessage("ERRO", "Erro para classificar a solicitação entre fechada e tabela de preço. Atualize a página ou contate o time de TI");
                                    console.log(data)
                                }
                            },
                            //ERROR
                            function (msg) {
                                showMessage("ERRO", "Erro para classificar a solicitação entre fechada e tabela de preço. Atualize a página ou contate o time de TI");
                                console.log(msg)
                            }
                        );
                    }
                }
            } else {
                self.form.tipoCotacao = 'fechada';
                if (self.listProdutoFechada.length == 0) {
                    self.listProdutoFechada = self.getAllItem("Prod");
                }
            }

            //Formata a data do webservice em dd/mm/aaaa
            $("[name^='data']").each(function () {
                $(this).val($(this).val().replace(/-/g, '/'));
            });

            $("#listPedidoCompra").val("{}");
            //addEventSendFluig(function () {
               //self.setAlcadaAprovacao();
            //});

            /* $("[name^='prazoForn']").each(function () {
                $(this).addClass("disable-click");
            }); */


        } else if (this.atividadeAtual == this.process.cotacaoBionexo) {

        } else if (this.atividadeAtual == this.process.analiseCotacao) {


        } else if (this.atividadeAtual == this.process.alcadaAprovacao) {

            var contadorAlcada = parseInt(self.form.contadorAlcada);
            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            btnAprov(true);
            $(".navTabsAlcada li:nth-child(" + contadorAlcada + "), .navTabsAlcada div:nth-child(" + contadorAlcada + ")").addClass("active");
            self.form['dataAprovAlcada' + contadorAlcada] = getCurrentDate();

            if (contadorAlcada < 3 && self.form['idAprovAlcada' + contadorAlcada] == self.form.aprovAlcadaAtual) {
                contadorAlcada++;
                self.form.aprovAlcadaAtual = self.form['idAprovAlcada' + contadorAlcada];
            } else {
                if (contadorAlcada == 3) {
                    self.form.aprovAlcadaAtual = "";
                }
            }

            

        } else if (this.atividadeAtual == this.process.pedidoCompras) {

            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();

        } else if (this.atividadeAtual == this.process.execaoIntegracao) {

            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();

        } else if (this.atividadeAtual == this.process.downloadPedido) {

            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            pedidosGerados(codSolicitacao.defaultValue);

        } else if (this.atividadeAtual == this.process.aprovSolicitante) {

            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovSolicitante = parent.WCMAPI.userCode;
            self.form.nomeAprovSolicitante = parent.WCMAPI.user;
            self.form.dataAprovSolicitante = getCurrentDate();
            btnAprov(false);
            //Inicia pesquisa de satisfação
            initPesquisa();

        } else if (this.atividadeAtual == this.process.inconsistencia) {

            FLUIGC.switcher.isReadOnly('#isImportado', true);
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            altBtnAprov($('#decisaoSolicitante').val(), 'decisaoSolicitanteBtnAprov', 'decisaoSolicitanteBtnReprov');

        } else if (this.atividadeAtual == this.process.correcaoSolicitante) {
            var contadorAlcada = parseInt(self.form.contadorAlcada) - 1;
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            $(".navTabsAlcada li:nth-child(" + contadorAlcada + "), .navTabsAlcada div:nth-child(" + contadorAlcada + ")").addClass("active");
            self.form.contadorAlcada = 0;
            self.atividadeAtual = self.process.inicio;

            readColumn('codProd', function (row, item) {
                $('#qtdProd___' + row).change(function () {
                    var qtdProd = $('#qtdProd___' + row).val();
                    readColumn('codCotacao', function (subRow, subItem) {
                        if (subItem.val() == item.val()) {
                            $('#qtdCotacao___' + subRow).val(qtdProd).change;
                        }
                    })
                })
            })
            
            //addEventSendFluig(function () {                    
            //    self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";                             
            //});
            // SEGURANCA CAMPO IDENTIFICADOR
            // SM2 - RCA 28.02.24
            $('button[data-send]', parent.document).bind("click", function() { 
                //self.form.filial = $('#nomFili').val()
                //self.form.campoIdentificador = self.form.prioridade + " - " + self.form.filial + " - TP";
                $("#campoIdentificador").val( $("prioridade").val()+" - "+$("filial").val()+" - TP" );
            });
            $(".colcfechada").hide();
        }

        /*
        if (this.atividadeAtual != this.process.inicio && this.atividadeAtual != 0 
            && this.atividadeAtual != this.process.analiseComprador) {
                $('#div_motivoEmergencial').show();
            $('#motivoEmergencial').attr('disabled', 'disabled');
        }
        */

        //CONFIGURAÇÃO DOS BOTÕES SWITCHER
        FLUIGC.switcher.init('#isImportado');
        FLUIGC.switcher.init('#isAglutinar');
        FLUIGC.switcher.init('#possuiExclusividade');
        self.form.possuiExclusividade = FLUIGC.switcher.getState('#possuiExclusividade');
        FLUIGC.switcher.onChange('#possuiExclusividade', function (event, state) {
            self.form.possuiExclusividade = state;
        });
        self.form.isAglutinar = FLUIGC.switcher.getState('#isAglutinar');
        FLUIGC.switcher.onChange('#isAglutinar', function (event, state) {
            self.form.isAglutinar = state;
        });

        if (($("#prioridadeOriginal").val() != $("#prioridadeHidden").val())) {
            $('#divJustAlteracao').show();
        } else {
            $('#divJustAlteracao').hide();
        }


        //REMOVE ESPACAMENTO ENTRE LINHAS PAI FILHO
        $(".fs-md-space").each(function () {
            $(this).removeClass("fs-md-space");
        });
        //AJUSTE TAMANHO ITEM PRODUTO
        readColumn("itemProd", function (row, item) {
            if (item.val().length > 3) {
                item.parent().removeClass("min-table-field");
                item.parent().addClass("med-table-field");
                return false;
            }
        });
        configSelectPaiFilho();
    },
    methods: {
        //CLICK ZOOM
        zoomFilial: function () {
            if (this.edicao) {
                openZoom(
                    "cad_Filiais",
                    "codigo, ID, filial, Descrição, cnpj_filial, CNPJ",
                    "codigo, filial_protheus, filial, uf_filial, cnpj_filial, tipoClassificacao",
                    "metadata_active,true",
                    "filial");
            }
        },
        zoomCCusto: function () {
            if (this.edicao) {
                openZoom("ds_centroCusto",
                    "CODIGO, Codigo, DESCRICAO, Descrição",
                    "CODIGO, DESCRICAO",
                    "",
                    "centroCusto");
            }
        },
        zoomProduto: function (row) {
            $('#codProd___' + row).next('span').on('click', function () {
                openZoom("ds_produtos_classificacao",
                    "CODIGO, Codigo, DESCRICAO, Descrição, FABRICANTE, Fabricante, PRINC_ATIVO, Princípio Ativo",
                    "CODIGO, DESCRICAO,COD_TIPO,DESC_TIPO,UM,ULTIMO_PRECO,CONTA_CONTABIL,FABRICANTE,IPI",
                    "USABILIDADE," + $('#classificacaoFili').val(),
                    "produto___" + row);
            });
        },
        zoomFornecedor: function (row) {
            $('#nomeForn___' + row).next('span').on('click', function () {
                openZoom("ds_fornecedor",
                    "CODIGO, Codigo, DESCRICAO, Descrição, LOJA, Loja, CGC, CPF/CNPJ",
                    "CODIGO, LOJA, DESCRICAO,CGC,COD_COND_PAGTO,DESC_COND_PAGTO,COD_FORM_PAGTOW",
                    "",
                    "fornecedor___" + row);
            })
        },
        zoomAglutinacao: function (row) {
            var self = this;
            $('#codAgl___' + row).next('span').on('click', function () {
                openZoom("ds_comprasMatMed",
                    "codSolicitacao, Solicitação, campoIdentificador, Identificador",
                    "codSolicitacao, campoIdentificador",
                    "isAlcada,none,tipoCotacaoHidden," + self.form.tipoCotacao + ",metadata_active,true",
                    "algutinacao___" + row);
            })
        },
        zoomCondForn: function (row) {
            $('#condForn___' + row).next('span').on('click', function () {
                openZoom("ds_condicaoPagamento",
                    "CODIGO,Código,DESCRICAO,Descrição",
                    "CODIGO,DESCRICAO", "&filterValues=",
                    'condicaoPagamento___' + row);
            });
        },
        //ADD PAI FILHOS
        addProduto: function (produto) {
            var self = this;
            if (produto.type != "click") {
                var produtoExistente = false;
                readColumn("codProd", function (rowProduto, item) {
                    if (item.val() == produto.codProd) {
                        produtoExistente = true;
                        var somaQtd = parseInt(produto.qtdProd) + parseInt($("#qtdProd___" + rowProduto).val())
                        $("#qtdProd___" + rowProduto).val(somaQtd).change();
                        $("#itemProd___" + rowProduto).val(rowProduto + " - " + produto.codSolicitacao);
                        return false;
                    }
                })
                if (!produtoExistente) {
                    var row = wdkAddChild("tbProd");
                    $("#codProd___" + row).val(produto.codProd);
                    $("#nomeProd___" + row).val(produto.nomeProd);
                    $("#unidadeProd___" + row).val(produto.unidadeProd);
                    $("#qtdProd___" + row).val(produto.qtdProd);
                    $("#valorProd___" + row).val(produto.valorProd);
                    $("#valorTotalProd___" + row).val(produto.valorTotalProd);
                    $("#valIpiProd___" + row).val(produto.valIpiProd);
                    $("#fabricanteProd___" + row).val(produto.fabricanteProd);
                    $("#saldoProd___" + row).val(produto.fabricanteProd);
                    $("#contaContabilProd___" + row).val(produto.contaContabilProd);
                    $("#custoMensalProd___" + row).val(produto.custoMensalProd);
                    $("#cnpjVencedorProd___" + row).val(produto.cnpjVencedorProd);
                    $("#fornecedorVencedorProd___" + row).val(produto.fornecedorVencedorProd);
                    $("#itemProd___" + row).val(row + " - " + produto.codSolicitacao);
                    $("#itemProd___" + row).parent().removeClass("min-table-field");
                    $("#itemProd___" + row).parent().addClass("med-table-field");
                    $("#valorProd___" + row).change(function () {
                        var rowChange = $(this).prop('name').split('___')[1];
                        self.somaTotalProduto(rowChange);
                    })
                    self.somaTotalProduto(row);
                    if (self.form.tipoCotacao == "tabela") {
                        self.carregaValorProduto(["COD_PRODUTO|" + $("#codProd___" + row).val()]);
                    }
                    /* var filtroClassificacao = "USABILIDADE, " + $("#classificacaoFili").val();
                    reloadZoomFilterValues('produto___' + row, filtroClassificacao); */
                }
            } else {
                var row = wdkAddChild("tbProd");
                $("#itemProd___" + row).val(row);
                                // var primeiraCompra = $("#primeiraCompraSim").is(":checked");
                // if(primeiraCompra == true) $("#tdSelectPrimeiraCompra___"+row).val("sim").addClass("disabledSelectPiva");
                $("#tdSelectPrimeiraCompra___"+row).on('change', (event) => {
                    var itemPrimeiraCompra = event.target.value;
                    if(itemPrimeiraCompra == "sim"){
                        primeiraCompra++;
                        if(primeiraCompra == 1) FLUIGC.toast({title: 'Atenção: ',message: 'Os produtos de primeira compra serão ativados e vinculados pela GCRN!',type: 'warning'});
                    }
                });
                this.zoomProduto(row);
            }
        },
        addAglutinacao: function () {
            var row = wdkAddChild("tbAgl");
            var self = this;
            this.zoomAglutinacao(row);
            $("#codAgl___" + row).change(function () {
                var codSolicitacao = $(this).val();
                //VERIFICA SE AGLUTINACAO JÁ EXISTE NA SOLICITACAO
                var algutinacaoExistente = false;
                readColumn("itemProd", function (row, item) {
                    if (item.val().indexOf(codSolicitacao) != -1) {
                        algutinacaoExistente = true;
                        return false;
                    }
                });
                if (codSolicitacao == self.form.codSolicitacao) algutinacaoExistente = true;
                //ALGUTINAÇÃO REPETIDA
                if (algutinacaoExistente) {
                    showMessage("Atenção", "Essa solicitação já foi aglutinada.", function () {
                        fnWdkRemoveChild($("#codAgl___" + row)[0]);
                    })
                    //ADICIONA ALGUTINAÇÃO
                } else {
                    try {
                        var idTable = getInDataset("ds_comprasMatMed", ['documentid'], ["codSolicitacao|" + codSolicitacao]).values["0"].documentid;
                        var listProduto = getInDataset("ds_comprasMatMed", null, ["documentid|" + idTable, "tablename|tbProd"]).values;
                        for (var i in listProduto) {
                            var produtoAtual = listProduto[i];
                            produtoAtual.codSolicitacao = codSolicitacao;
                            if (self.form.tipoCotacao == 'tabela' && self.listTabelaPreco[produtoAtual.fabricanteProd] != undefined) {
                                self.addProduto(produtoAtual);
                            } else if (self.form.tipoCotacao == 'fechada' && self.listTabelaPreco[produtoAtual.fabricanteProd] == undefined) {
                                self.addProduto(produtoAtual);
                            }
                        }
                    } catch (e) {
                        console.log("ERRO PARA AGLUTINAR A SOLICITAÇÃO");
                        console.log("ERRO: " + e);
                    }
                }
            })
        },
        addFornecedor: function (codFornecedor) {
            var self = this;
            var row = null;
            if (codFornecedor != '' && codFornecedor != undefined) {
                if (codFornecedor.type != "click") {
                    try {
                        var fornecedorExistente = false;
                        var rowfornecedorExistente;                        
                        readColumn('codForn', function (rowForn, itemForn) {
                            if (itemForn.val() == codFornecedor) {
                                fornecedorExistente = true;
                                rowfornecedorExistente = rowForn;
                                return false;
                            }
                        })
                        if (!fornecedorExistente) {
                            var fornecedor = getInDataset("ds_Fornecedor", null, ["CODIGO|" + codFornecedor]).values[0];
                            row = wdkAddChild("tbFornecedor");
                            self.configFornecedor(row);
                            $("#codForn___" + row).val(fornecedor["CODIGO"]);
                            $("#nomeForn___" + row).val(fornecedor["DESCRICAO"]);
                            $("#lojaForn___" + row).val(fornecedor["LOJA"]);
                            $("#cnpjForn___" + row).val(fornecedor["CGC"]).change();
                            $("#codCondForn___" + row).val(fornecedor["COD_COND_PAGTO"]);
                            $("#condForn___" + row).val(fornecedor["DESC_COND_PAGTO"]);
                            $("#formaForn___" + row).val(fornecedor["COD_FORM_PAGTO"]).change();
                            $("#itemForn___" + row).val(row);
                        } else {
                            self.configFornecedor(rowfornecedorExistente);
                            $("#cnpjForn___" + rowfornecedorExistente).trigger("change");
                        }
                    } catch (e) {
                        showMessage("Erro", "Ocorreu um erro ao tentar buscar o fornecedor. " + e)
                    }
                } else {
                    row = wdkAddChild("tbFornecedor");
                    self.configFornecedor(row);
                    $("#itemForn___" + row).val(row);
                    this.zoomFornecedor(row);
                }
                return row;
            } else {
                return false;
            }
        },


        addFornecedores: function (listaFornecedor) {
            var self = this;
            var row = null;
            var fornecedores;
            if (listaFornecedor && listaFornecedor.length > 0) {
                try {
                    var buscaFornecedores = [];
                    for (var f in listaFornecedor) {
                        buscaFornecedores.push("CODIGO|" + listaFornecedor[f]);
                    }
                    fornecedores = getInDataset("ds_Fornecedor", null, buscaFornecedores);
                    for (var f in fornecedores.values) {
                        var fornecedor = fornecedores.values[f];                        
                        var achou = false;                        
                        readColumn('codForn', function (rowForn, itemForn) {
                            if (itemForn.val() == fornecedor["CODIGO"]) {
                                achou = true;
                                return false;
                            }
                        })
                        if (!achou) {
                            row = wdkAddChild("tbFornecedor");
                            self.configFornecedor(row);                            
                            $("#codForn___" + row).val(fornecedor["CODIGO"]);
                            $("#nomeForn___" + row).val(fornecedor["DESCRICAO"]);
                            $("#lojaForn___" + row).val(fornecedor["LOJA"]);
                            $("#cnpjForn___" + row).val(fornecedor["CGC"]).change();
                            $("#codCondForn___" + row).val(fornecedor["COD_COND_PAGTO"]);
                            $("#condForn___" + row).val(fornecedor["DESC_COND_PAGTO"]);                            
                            $("#formaForn___" + row).val(fornecedor["FORMA_PAGAMENTO"]).change();
                            $("#itemForn___" + row).val(row);

                            linha = wdkAddChild("tbResumo");
                            $("#codFornecResumo___" + linha).val(fornecedor["CODIGO"]);
                            $("#nomeFornecResumo___" + linha).val(fornecedor["DESCRICAO"]);
                            $("#faturMinResumo___" + linha).val(addMascaraMonetaria(fornecedor["FATURAMENTO_MIN"]));

                            var filial = $("#codFilial").val();
                            var prazos = fornecedor.PRAZOS_ENTREGA;
                            if (prazos != null || prazos != undefined){
                                var prazo = fornecedor.PRAZOS_ENTREGA.split(";");
                                prazo.forEach(element => {
                            
                                    var opcao = element.split('=');                    	        
                                    var fil  = opcao[0] ;
                                    var dias = opcao[1] ;
                                    dias = parseFloat(dias)+1;
                                    
                                    if (filial == fil){                                                          	        	
                                        $("#diasPrazo___" + row).val(dias);                                        
                                        var fds = 0;
                                        var prazoFinal = 0;
                                        // calcula o prazo em dias uteis
                                        for (var x = 1; x <= dias; x++) {
                                            var time = new Date();
                                            time.setDate(time.getDate() + x);
                                            if (time.getDay() == 6 || time.getDay() == 0) {
                                                fds = fds + 1;                                                
                                            }
                                        }
                                        prazoFinal = dias + fds;
                                        time = new Date();
                                        time.setDate(time.getDate() + prazoFinal);
                                        /* if(time.getDay() == 0){    // se cair no domingo 
                                            time = new Date();                                        
                                            time.setDate(time.getDate() + prazoFinal + 1);
                                        }   */                                                                              
                                        var diaIni  = time.getDate();
                                        var mesIni  = time.getMonth()+1;
                                        var anoIni  = time.getFullYear();                    	     	
                                        let dataNova =  ("0"+diaIni).slice(-2) + '/' + ("0"+mesIni).slice(-2) + '/' + anoIni;                    	        	 
                                         $("#prazoForn___" + row).val(dataNova);

                                    } else {
                                        FLUIGC.toast({
                                            message: 'O fornecedor ' + fornecedor["DESCRICAO"] + ' não possui prazo de entrega para a filial ' + filial + '.',
                                            type: 'warning',
                                            timeout: "slow"
                                        });  
                                    }                  	                           	        
                                });                                  
                            }else{
                                $("#diasPrazo___" + row).val("Definir prazo");
                            }                            
                        }else{
                            readColumn('codForn', function (row) {
                                if($("#codForn___" + row).val() == fornecedor["CODIGO"]){
                                    var dias = 0;
                                    var fds = 0;
                                    var prazoFinal = 0;                                    
                                    dias = parseFloat($("#diasPrazo___" + row).val())
                                    for (var x = 1; x <= dias + fds; x++) {
                                        var time = new Date();
                                        time.setDate(time.getDate() + x);
                                        if (time.getDay() == 6 || time.getDay() == 0) {
                                            fds = fds + 1;                                                
                                        }
                                    }
                                    prazoFinal = dias + fds;
                                    time = new Date();
                                    time.setDate(time.getDate() + prazoFinal);
                                    /* if(time.getDay() == 0){    // se cair no domingo 
                                        time = new Date();                                        
                                        time.setDate(time.getDate() + prazoFinal + 1);
                                    } */                                                                                
                                    var diaIni  = time.getDate();
                                    var mesIni  = time.getMonth()+1;
                                    var anoIni  = time.getFullYear();                    	     	
                                    let dataNova =  ("0"+diaIni).slice(-2) + '/' + ("0"+mesIni).slice(-2) + '/' + anoIni;                    	        	 
                                     $("#prazoForn___" + row).val(dataNova);
                                }
                                
                            })

                        }
                    }
                } catch (e) {
                    showMessage("Erro", "Ocorreu um erro ao tentar buscar o fornecedor. " + e)
                }
                return fornecedores;
            } else {
                return false;
            }
        },

        addDesvinculado: function (desvinculado) {
            var row = wdkAddChild("tbDesvinculado");
            $('#codDesvinculado___' + row).val(desvinculado.codigo);
            $('#nomeDesvinculado___' + row).val(desvinculado.nome);
            $('#qtdDesvinculado___' + row).val(desvinculado.qtd);
            $('#valorDesvinculado___' + row).val(desvinculado.valor);
            $('#valorTotalDesvinculado___' + row).val(desvinculado.valorTotal);
            $("#unidadeDesvinculado___" + row).val(desvinculado.unidade);
            $("#ipiDesvinculado___" + row).val(desvinculado.ipi);
            $("#valIpiDesvinculado___" + row).val(desvinculado.valIpi);
            $("#fabricanteDesvinculado___" + row).val(desvinculado.fabricante);
            $("#contaContabilDesvinculado___" + row).val(desvinculado.contaContabil);
            $("#custoMensalDesvinculado___" + row).val(desvinculado.custoMensal);
            $("#cnpjVencedorDesvinculado___" + row).val(desvinculado.cnpjVencedor);
            $("#codFornVencedorProdDesvinculado___" + row).val(desvinculado.codFornVencedorProd);
            if (desvinculado.isFechada == 'on') $("#isFechadaDesvinculado___" + row).prop('checked', true);
            $("#itemDesvinculado___" + row).val(desvinculado.item);
        },
        addCotacao: function (listProduto, fornecedor) {
            var self = this;
            for (var i in listProduto) {
                var produto = listProduto[i];
                var row = wdkAddChild("tbCotacao");
                $("#codCotacao___" + row).val(produto.codigo);
                $("#nomeCotacao___" + row).val(produto.nome);
                $("#qtdCotacao___" + row).val(produto.qtd);
                $("#fornecedorCotacao___" + row).val(fornecedor.nome);
                $("#cnpjFornCotacao___" + row).val(fornecedor.cnpj);
                $("#codFornecedorCotacao___" + row).val(fornecedor.codForn);
                $("#valorCotacao___" + row).val(produto.valor);
                self.configCotacao(row);
            }
        },
        openCotacao: function (item, tipoTabela) {
            if (tipoTabela == 'fornecedor') {
                var row = $(item).closest("tr").find('input[name^="codForn___"]').prop('name').split('___')[1];
                if ($("#cnpjForn___" + row).val() != '') {
                    this.showModalCotacao("cnpjFornCotacao", $("#cnpjForn___" + row).val(), "COTAÇÃO POR FORNECEDOR", $("#nomeForn___" + row).val());
                }
            } else if (tipoTabela == 'produto') {
                var row = $(item).closest("tr").find('input[name^="codProd___"]').prop('name').split('___')[1];
                this.showModalCotacao("codCotacao", $("#codProd___" + row).val(), "COTAÇÃO POR PRODUTO", $("#nomeProd___" + row).val());
            }
        },
        closeCotacao: function () {

            var rowJustificativa = self.linhaJustificativaCotacao;
            if (rowJustificativa != null && $("#justificativaCotacao___" + rowJustificativa).val() == '') {
                showMessage("Atenção", "Justificativa é obrigatória para cotações alteradas.");
            } else {
                $("#contentCotacao").css('display', 'none');
            }
        },
        configCotacao: function (row) {
            var self = this;
            if (self.form.tipoCotacao == 'fechada') {
                addMaskMonetariaZero("#valorCotacao___" + row);
            } else {
                addMaskMonetaria("#valorCotacao___" + row);
            }

            $("#valorCotacao___" + row).change(function () {
                var rowChangeValor = $(this).prop('name').split('___')[1];
                var valorAtual = removeMascaraMonetaria($(this).val());
                var codProdutoAtual = $("#codCotacao___" + rowChangeValor).val();
                var menorValor = null;
                var cnpjVencedor = null;
                var fornecedorVencedor = null;
                var linhaVencedora = null;
                var codFornVencedor = null;
                //BUSCA MENOR VALOR DA COTACAO
                readColumn('codCotacao', function (rowCotacao, item) {
                    if (codProdutoAtual == item.val()) {
                        valorAtual = removeMascaraMonetaria($('#valorCotacao___' + rowCotacao).val());
                        if ((valorAtual != 0) && ((valorAtual < menorValor) || (menorValor == null))) {
                            menorValor = valorAtual;
                            cnpjVencedor = $('#cnpjFornCotacao___' + rowCotacao).val();
                            fornecedorVencedor = $('#fornecedorCotacao___' + rowCotacao).val();
                            codFornVencedor = $('#codFornecedorCotacao___' + rowCotacao).val();
                            linhaVencedora = rowCotacao;
                        }
                    }
                });

                //SETA O VALOR DA COTACAO VENCEDORA
                if (menorValor != null) {
                    self.checkVencedor(linhaVencedora);
                    readColumn("codProd", function (rowProduto, item) {
                        if (item.val() == codProdutoAtual) {
                            $("#fornecedorVencedorProd___" + rowProduto).val(fornecedorVencedor);
                            $("#cnpjVencedorProd___" + rowProduto).val(cnpjVencedor);
                            $("#codFornVencedorProd___" + rowProduto).val(codFornVencedor);
                            $("#valorProd___" + rowProduto).val(addMascaraMonetaria(menorValor)).change();
                            return false;
                        }
                    });


                }
            });
            //GARANTE A JUSTIFICATIVA DE COTACAO ALTERADA
            $('#vencedorCotacao___' + row).change(function () {
                var rowChange = $(this).prop('name').split('___')[1];
                var valorVencedorAlterado = removeMascaraMonetaria($('#valorCotacao___' + rowChange).val());
                self.linhaJustificativaCotacao = null;
                readColumn('valorCotacao', function (rowAtual, item) {
                    if (rowChange != rowAtual && $("#codCotacao___" + rowAtual).val() == $("#codCotacao___" + rowChange).val()) {
                        $('#vencedorCotacao___' + rowAtual).prop('checked', false);
                        if (valorVencedorAlterado > removeMascaraMonetaria(item.val()) && removeMascaraMonetaria(item.val()) != 0.00 || $("#justificativaCotacao___" + rowChange).val() != '') {
                            $("#justificativaCotacao___" + rowChange).prop('readonly', false)
                            $(".justificativaCotacao").show();
                            self.linhaJustificativaCotacao = rowChange;
                        } else {
                            $("#justificativaCotacao___" + rowChange).val("").prop('readonly', true);
                            $(".justificativaCotacao").hide();
                        }
                    }
                });
                //SETA O VALOR DA COTACAO ALTERADA
                readColumn("codProd", function (rowProduto, item) {
                    if (item.val() == $('#codCotacao___' + rowChange).val()) {
                        $("#fornecedorVencedorProd___" + rowProduto).val($('#fornecedorCotacao___' + rowChange).val());
                        $("#cnpjVencedorProd___" + rowProduto).val($('#cnpjFornCotacao___' + rowChange).val());
                        $("#valorProd___" + rowProduto).val(addMascaraMonetaria(valorVencedorAlterado)).change();
                        return false;
                    }
                });
            });
        },

        setValorCotacao: function (codFornecedor, codProduto, valor) {
            readColumn("codCotacao", function (row, item) {
                if (codProduto == item.val() && codFornecedor == $("#codFornecedorCotacao___" + row).val()) {
                    $("#valorCotacao___" + row).val(addMascaraMonetaria(valor)).change();
                    return false;
                }

            })
        },

        configFornecedor: function (row) {
            var self = this;
            self.zoomCondForn(row);
            $("#formaForn___" + row).change(function () {
                $("#formaFornHidden___" + row).val($(this).val())
            });
            $("#tipoFreteForn___" + row).change(function () {
                $("#freteFornHidden___" + row).val($(this).val());
            })
            addMaskMonetaria("#valorFreForn___" + row);
            FLUIGC.calendar("#prazoForn___" + row, {
                pickDate: true,
                pickTime: false,
                minDate: new Date()
            });
            $("#cnpjForn___" + row).change(function () {
                var listProduto = self.getAllItem("Prod");
                var fornecedor = {
                    cnpj: $("#cnpjForn___" + row).val(),
                    nome: $("#nomeForn___" + row).val(),
                    codForn: $("#codForn___" + row).val()
                }
                self.addCotacao(listProduto, fornecedor);
            })
        },
        gerarSolicitacaoDesvinculada: function () {
            var self = this;
            //ANTES DE GERAR A SOLICITAVAÇÃO, VERIFICA SE ELA JÁ NÃO FOI GERADA
            var dsMatMed = getInDataset('ds_comprasMatMed', ['codSolicitacao'], ['refSolicitacaoDesvinculada|' + self.form.codSolicitacao])
            if (dsMatMed.values.length > 0) {
                self.form.codSolicitacaoDesvinculada = dsMatMed.values[0].codSolicitacao;
                FLUIGC.toast({
                    message: 'A solicitação com os itens desvinculados já existe. ' + self.form.codSolicitacaoDesvinculada,
                    type: 'warning',
                    timeout: "slow"
                });
            } else {
                var xmlSolicitacao = renderXmlSolicitacaoMatMed(self, self.getAllItem("Desvinculado"), 'desvinculado');
                self.iniciaNovaSolicitacao(xmlSolicitacao,
                    //Sucesso 
                    function (data) {
                        $(data).find("key").each(function (k, v) {
                            if ($(v).text() == 'iProcess') {
                                self.form.codSolicitacaoDesvinculada = $(v).next().text();
                                return false
                            }
                        });
                        if (self.form.codSolicitacaoDesvinculada != '') {
                            FLUIGC.toast({
                                message: 'A solicitação ' + self.form.codSolicitacaoDesvinculada + ' foi gerada a partir dos itens desvinculados.',
                                type: 'success',
                                timeout: "slow"
                            });
                        } else {
                            showMessage("ERRO", "Erro para gerar a solicitação. Atualize a página ou contate o time de TI");
                            console.log(data)
                        }
                    },
                    //Erro
                    function (mensg) {
                        showMessage("ERRO", "Erro para gerar a solicitação. Atualize a página ou contate o time de TI");
                        console.log(mensg)
                    });
            }
        },
        //carrega filial do solicitante que faz parte dos grupos de farmacia
        loadFilialFarm: function () {
            var dsGruposUsuario = getInDataset('colleagueGroup', ['colleagueGroupPK.groupId'], ['colleagueGroupPK.colleagueId|' + this.form.idSolicitante], false);
            var grupoUsuario = '';
            for (var i in dsGruposUsuario.values) {
                var item = dsGruposUsuario.values[i];
                if (item['colleagueGroupPK.groupId'].indexOf('FARM') != -1) {
                    grupoUsuario = item['colleagueGroupPK.groupId'];
                    dsFilialGrupo = getInDataset('ds_FilialGrupo', ['codFilial'], ['idGrupoFilial|Pool:Group:' + grupoUsuario]);
                    if (dsFilialGrupo.values.length > 0) {
                        this.setFilialByCode(dsFilialGrupo.values[0].codFilial);
                        break
                    }
                }
            }
        },
        //Seta filial na view a partir do codigo do protheus 
        setFilialByCode: function (codFilial) {
            var dsFilial = getInDataset('cad_Filiais', null, ['filial_protheus|' + codFilial]);
            if (dsFilial.values.length > 0) {
                var filial = dsFilial.values[0];
                this.form.codFilialFluig = filial.codigo;
                this.form.codFilial = filial.filial_protheus;
                this.form.filial = filial.filial;
                this.form.cnpj_filial = filial.cnpj_filial;
                this.form.ufFilial = filial.uf_filial;
                this.form.classificacaoFili = filial.tipoClassificacao;                                
            }
        },
        checkVencedor: function (rowVencedor) {
            $('#vencedorCotacao___' + rowVencedor).prop('checked', true);
            var codVencedor = $('#codCotacao___' + rowVencedor).val();
            readColumn('codCotacao', function (row, item) {
                if (rowVencedor != row && codVencedor == item.val()) {
                    $('#vencedorCotacao___' + row).prop('checked', false);
                }
            });
        },
        /**
         * Busca os produtos da tabela informada.
         * Retorna uma lista com objetos de produto.
         *
         */
        getAllItem: function (nomeTabela) {
            var self = this;
            var listProduto = [];
            readColumn("item" + nomeTabela, function (row) {
                listProduto.push(self.getItem(row, nomeTabela));
            })
            return listProduto;
        },
        getItem: function (row, nomeTabela) {
            var produto = {
                codigo: $("#cod" + nomeTabela + "___" + row).val(),
                nome: $("#nome" + nomeTabela + "___" + row).val(),
                qtd: $("#qtd" + nomeTabela + "___" + row).val(),
                unidade: $("#unidade" + nomeTabela + "___" + row).val(),
                valor: $("#valor" + nomeTabela + "___" + row).val(),
                valorTotal: $("#valorTotal" + nomeTabela + "___" + row).val(),
                ipi: $("#ipi" + nomeTabela + "___" + row).val(),
                valorIpi: $("#valIpi" + nomeTabela + "___" + row).val(),
                fabricante: $("#fabricante" + nomeTabela + "___" + row).val(),
                contaContabil: $("#contaContabil" + nomeTabela + "___" + row).val(),
                custoMensal: $("#custoMensal" + nomeTabela + "___" + row).val(),
                cnpjVencedor: $("#cnpjVencedor" + nomeTabela + "___" + row).val(),
                codFornVencedorProd: $("#codFornVencedorProd" + nomeTabela + "___" + row).val(),
                fornecedorVencedor: $("#fornecedorVencedor" + nomeTabela + "___" + row).val(),
                isFechada: $("#isFechada" + nomeTabela + "___" + row).prop('checked') == true ? 'on' : '',
                item: $("#item" + nomeTabela + "___" + row).val()
            }
            return produto;
        },
        removeProdutosCotacaoFechada: function () {
            var self = this;
            readColumn("isFechadaProd", function (row, item) {
                if (item.prop('checked') == true) {
                    fnWdkRemoveChild(item[0]);
                }
                self.somaTotalProduto(row);
            });
        },
        showModalCotacao: function (orderBy, value, titulo, subTitulo) {
            readColumn(orderBy, function (row, item) {
                if (item.val() != value) {
                    item.closest("tr").hide();
                } else {
                    item.closest("tr").show();
                }
            });
            $(".cabecarioModalCotacao h2").text(titulo)
            $(".cabecarioModalCotacao h3").text(subTitulo)
            $("#contentCotacao").css('display', 'block');
            if (orderBy == 'codCotacao') {
                $(".tabProdCotacao").hide();
                $(".tabFornCotacao").show();
                $(".tabVencedorCotacao").show();
            } else {
                $(".tabProdCotacao").show();
                $(".tabFornCotacao").hide();
                $(".tabVencedorCotacao").hide();
            }
        },
        carregaValorProduto: function (filtro) {
            var self = this;
            var dsTabelaPreco = getInDataset("ds_tabelaPrecoCompras", null, filtro);
            var itens = [];
            var listaExcecao = [];
            var fornecedores = [];
            if (dsTabelaPreco.values && dsTabelaPreco.values[0].CODIGO != '') {
                for (var i in dsTabelaPreco.values) {
                    itemAtual = dsTabelaPreco.values[i];
                    var excecao = false;
                    for (var item in itens) {
                        
                        if (itens[item].COD_PRODUTO == itemAtual.COD_PRODUTO) {
                            excecao = true;
                        }
                    }
                    if (!excecao) {
                        var itemExcecao = self.listTabelaExcecao[itemAtual.COD_FORNECEDOR];

                        if (fornecedores.length == 0) {
                            if(self.form.codFilial != '07101' && itemAtual.CODIGO != '101'){
                                fornecedores.push(itemAtual.COD_FORNECEDOR);
                            }else if(self.form.codFilial == '07101'){
                                var eurofarma = false;
                                for (var j in dsTabelaPreco.values) {                      
                                    if(dsTabelaPreco.values[j].CODIGO == "101"){
                                        eurofarma = true;
                                    }
                                }
                                if(eurofarma == true && itemAtual.CODIGO == '101'){
                                    fornecedores.push(itemAtual.COD_FORNECEDOR);
                                }else if(eurofarma == false){
                                    fornecedores.push(itemAtual.COD_FORNECEDOR); 
                                }                                
                            }
                        } else {
                            var achou = false;
                            for (var f in fornecedores) {
                                if (fornecedores[f] == itemAtual.COD_FORNECEDOR) {
                                    achou = true;
                                    break;
                                }
                            }
                            if (!achou) {
                                fornecedores.push(itemAtual.COD_FORNECEDOR);
                            }
                        }

                        //TABELA COM REGRAS ESPECIFICAS
                        if (itemExcecao != undefined && itemExcecao.filiais.indexOf(self.form.ufFilial) != -1) {
                            if (itemExcecao.nome == "ONCO PROD") {
                                if (self.form.ufFilial != "RJ") {
                                    if (self.form.ufFilial == 'RS' && itemAtual.CODIGO == '019' && (self.form.codFilial == '02501' || self.form.codFilial == '01702')) {
                                        itens.push(itemAtual);
                                    } else if (
                                        itemAtual.CODIGO == '019' &&
                                        self.form.ufFilial != "RJ" &&
                                        self.form.ufFilial != "SP" &&
                                        self.form.ufFilial != "RS" &&
                                        self.form.codFilial != '02501' &&
                                        self.form.codFilial != '01702' &&
                                        self.form.codFilial != '07101') {
                                        itens.push(itemAtual);
                                    } else if (self.form.ufFilial == 'SP' && itemAtual.CODIGO == '017'){
                                        itens.push(itemAtual);
                                    } else if (self.form.codFilial == '07101' && itemAtual.CODIGO == '040'){
                                        itens.push(itemAtual);
                                    }

                                } else if (self.form.ufFilial == "RJ" && itemAtual.CODIGO == '020') {
                                    itens.push(itemAtual);
                                }

                            } else if (itemExcecao.nome == "EUROFARMA") {
                                if (self.form.ufFilial == "MA" || self.form.ufFilial == "BA" || self.form.ufFilial == "CE" || self.form.ufFilial == "RN" || self.form.ufFilial == "PB" || self.form.ufFilial == "PE" || self.form.ufFilial == "GO") {
                                    if (self.form.codFilial == '07101' && itemAtual.CODIGO == '101') {
                                        itens.push(itemAtual);
                                    } else if (itemAtual.CODIGO == '021') {
                                        itens.push(itemAtual);
                                    }
                                }

                            } else if (itemExcecao.nome == "GALENICA") {
                                if (self.form.ufFilial != "MA" && self.form.ufFilial != "BA" && self.form.ufFilial != "CE" && self.form.ufFilial != "RN" && self.form.ufFilial != "PB" && self.form.ufFilial != "PE") {
                                    if (itemAtual.CODIGO == '014' &&
                                        itemAtual.COD_FORNECEDOR == '000284') {
                                        itens.push(itemAtual);
                                    } else if (
                                        itemAtual.CODIGO == '026') {
                                        itens.push(itemAtual);

                                    }
                                }




                            } else if (itemAtual.CODIGO == itemExcecao.tabelaExcecao) {
                                itens.push(itemAtual);
                            }
                        } else { //TABELA NORMAIS
                            if(itemAtual.CODIGO != '101'){
                                itens.push(itemAtual);
                            }                            
                        }
                    }
                }

                if (fornecedores != null && fornecedores.length > 0) {
                    var rowFornecedor = self.addFornecedores(fornecedores);
                    //var indexTbFornec = $('#tbFornecedor input[value="' + fornecedores + '"]').prop('name').split('___')[1];
                    if (rowFornecedor && rowFornecedor.values) {
                        for (var i in itens) {
                            for (var f in rowFornecedor.values) {
                                var fornecedor = rowFornecedor.values[f];
                                if (itens[i].COD_FORNECEDOR == fornecedor.CODIGO) {

                                    var indexTbFornec = $('#tbFornecedor input[value="' + fornecedor.CODIGO + '"]').prop('name').split('___')[1];

                                    self.setValorCotacao(itens[i].COD_FORNECEDOR, itens[i].COD_PRODUTO, itens[i].VALOR);

                                    var fornec = $("#codForn___" + indexTbFornec).val();
                                    var fabric = $("#fabricanteProd___" + indexTbFornec).val();
                                    
                                    if ((fornec == "000489" && fabric == "ROCHE")&&(itens[i].CODIGO == '017' || itens[i].CODIGO == '019' || itens[i].CODIGO == '019' || itens[i].CODIGO == '017')){                                    	
                                    	$("#tabelaPrecoForn___" + indexTbFornec).val(itens[i].CODIGO);
                                        $("#codCondForn___" + indexTbFornec).val("274");
                                        $("#condForn___" + indexTbFornec).val("75 DIAS");
                                    } else {
                                        $("#tabelaPrecoForn___" + indexTbFornec).val(itens[i].CODIGO);
                                        $("#codCondForn___" + indexTbFornec).val(itens[i].COD_COND_PAGTO);
                                        $("#condForn___" + indexTbFornec).val(itens[i].DESC_COND_PAGTO);
                                    }


                                }
                            }
                        }
                    } else {
                        $("#tabelaPrecoForn___" + rowFornecedor).val(itemAtual.CODIGO);
                    }
                } else {
                    filtro
                    var codProduto = filtro[0].split('|');
                    FLUIGC.toast({
                        message: 'Erro para carregar o valor do produto ' + codProduto[1] + '.',
                        type: 'danger',
                        timeout: "slow"
                    });
                    console.log("VALOR DO PRODUTO NÃO ENCONTRADO");
                }
            } else {
                var codProduto = filtro[0].split('|');
                FLUIGC.toast({
                    message: 'O produto ' + codProduto[1] + ' NÃO foi localizado nas tabelas de preços.',
                    type: 'warning',
                    timeout: "slow"
                });
                console.log("VALOR DO PRODUTO NÃO ENCONTRADO");
            }
        },

        carregaraValorAllProdutos: function () {
            var self = this;
            readColumn('codProd', function (row, item) {
                self.carregaValorProduto(["COD_PRODUTO|" + item.val()]);
            })
        },

        somaTotalProduto: function (rowProduto) {
            var self = this;
            var valorProduto = removeMascaraMonetaria($("#valorProd___" + rowProduto).val());
            var qtdProduto = $("#qtdProd___" + rowProduto).val();
            var total = 0.00;

            if (valorProduto != 0 && qtdProduto != '') {
                total = qtdProduto * valorProduto;
                $("#valorTotalProd___" + rowProduto).val(addMascaraMonetaria(total));
                $("#checkProd___" + rowProduto).val(""); // tentativa final
            }

            subTotalFornecedor();

            var somaTotal = 0;
            readColumn('valorTotalProd', function (row, item) {
                somaTotal += removeMascaraMonetaria(item.val());                
            })
            somaTotal = somaTotal.toFixed(2);
            self.form.valorTotalSolicitacao = addMascaraMonetaria(somaTotal);
            setTimeout(function () {
                setAlcadaAprovacaoUpdate();
            }, 1000);

        },
        openSolicitacao: function (codSolicitacao) {
            window.open("https://" + location.host + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + codSolicitacao);
        },

        iniciaNovaSolicitacao: function (xml, callbackSuccess, callbackError) {
            //INICIA SOLICITACAO VINCULADA DA COTACAO FECHADA
            parent.WCMAPI.Create({
                url: '/webdesk/ECMWorkflowEngineService?wsdl',
                contentType: 'text/xml;charset=utf-8',
                dataType: 'xml',
                data: xml,
                timeout: 20000,
                success: callbackSuccess,
                error: callbackError
            });
        },
        cancelarSolicitacao: function () {
            //Confirmação para cancelar solicitação
            FLUIGC.message.confirm({
                message: 'Tem certeza que deseja CANCELAR/ENCERRAR esta solicitação?',
                title: 'Cancelar Solicitação',
                labelYes: 'Sim',
                labelNo: 'Não'
            }, function (result, el, ev) {
                if (result == true) {
                    $('#isCancelarSolicitacao').val('true');
                    //ENVIA A SOLICITACAO AUTOMATICAMENTE
                    $("#workflowActions > button:first-child", window.parent.document).click();
                }
            });
        },

        setAlcadaAprovacao: function () {
            var valorTotal = removeMascaraMonetaria(this.form.valorTotalSolicitacao);
            if ($('#ehSugestaoCompras').val() == 'true') {
                setSelectedZoomItem(dadosFilialSugestao($('#codFilial').val()))
                var filialFluigCod = $('#codFilialFluig').val();
            }else{
                var filialFluigCod = this.form.codFilialFluig;
            }            
            var dsAlcada = getInDataset("ds_alcadas_aprov_v2", null, ['tablename|tbAlcadasMatMed', 'F1_FILIAL_MAT |' + filialFluigCod]).values;
            this.form.isAlcada = 'none';
            if (dsAlcada.length > 0) {
                if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorClinica) || FLUIGC.switcher.getState("#isImportado")) {
                    this.form.idAprovAlcada1 = dsAlcada[0].usuarioClinica;
                    this.form.nomeAprovAlcada1 = dsAlcada[0].usuarioClinicaDesc;
                    this.form.isAlcada = 'true';
                    this.form.aprovAlcadaAtual = dsAlcada[0].usuarioClinica;
                } else {
                    this.form.isAlcada = 'false';
                }
                if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorCompras)) {
                    this.form.idAprovAlcada2 = dsAlcada[0].usuarioCompras;
                    this.form.nomeAprovAlcada2 = dsAlcada[0].usuarioComprasDesc;
                }
                if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorDiretores)) {
                    this.form.idAprovAlcada3 = dsAlcada[0].usuarioDiretores;
                    this.form.nomeAprovAlcada3 = dsAlcada[0].usuarioDiretoresDesc;
                }

            } else {
                this.form.isAlcada = 'erro';
                showMessage('ERRO', 'Não foi possivel carregar a alçada de aprovação. Atualize a pagina e tente novamente.')
            }
        },

        disabeldFieldPaiFilho(listField) {
            readColumn(listField[0], function (row) {
                for (var i in listField) {
                    var nameField = listField[i] + "___" + row;
                    $("#" + nameField).prop('readonly', 'readonly');
                }
            })
        },

    },
    computed: {

    }
};
//Main
$(document).ready(function () {
    vueApp = new Vue(configApp);
    getParamsURL()

    window.parent.$("[data-send]").on("click", function() {
        if ($('#ehSugestaoCompras').val() == 'true') {
            $('#filial').val($('#nomFili').val());
        };   
    });
    
    // SEGURANCA CAMPO IDENTIFICADOR
    // SM2 - RCA 05.02.24
    if( $("#prioridade").val() !='' && $("#filial").val() !='')
	    if( $('#campoIdentificador').val() || $('#campoIdentificador').val()==null){
	    	$("#campoIdentificador").val( $("prioridade").val()+" - "+$("filial").val()+" - TP" );
	    }        
})

function subTotalFornecedor(item) {

    var item
    var soma = 0;
    var atual = 0;
    
    $('input[id^="codFornVencedorProd___"]').each(function (index, value) {
        var seq = $(this).attr("id").split("___")[1];

        var codForn = $("#codFornVencedorProd___" + seq).val();
        var valor = $("#valorTotalProd___" + seq).val().replace("R$ ", "").replaceAll(".", "").replace(",", ".");
        var check = $("#checkProd___" + seq).val();

        $('input[id^="codFornecResumo___"]').each(function (index, value) {
            var seq2 = $(this).attr("id").split("___")[1];

            var codFornResumo = $("#codFornecResumo___" + seq2).val();

            if ((codForn == codFornResumo && check != "sim" && item == undefined)) {

                var atual = $("#totalFornecResumo___" + seq2).val() != "" ? $("#totalFornecResumo___" + seq2).val().replace("R$ ", "").replaceAll(".", "").replace(",", ".") : 0;
                var soma = parseFloat(atual) + parseFloat(valor);
                soma = soma.toFixed(2);
                $("#totalFornecResumo___" + seq2).val(addMascaraMonetaria(soma));
                $("#checkProd___" + seq).val("sim");

                return false;
            }

            if ((item != undefined)) {
                soma = 0;
                atual = 0;
                soma = parseFloat(atual) + parseFloat(valor);
                soma = soma.toFixed(2);
                $("#totalFornecResumo___" + seq2).val(addMascaraMonetaria(soma));

                return false;
            }

        });
    });

}


function setSelectedZoomItem(item) {
    //FILIAL
    if (item.type == 'filial') {
        if($('#ehSugestaoCompras').val() == 'true'){
            $("#codFilialFluig").val(item.codigo);
            $("#codFilial").val(item.filial_protheus);
            $("#filial").val(item.filial);
            $("#nomFili").val(item.filial);
            $("#cnpj_filial").val(item.cnpj_filial);
            $("#ufFilial").val(item.uf_filial);  
            $("#classificacaoFili").val(item.classificacaoFili);  
            self.form.codFilialFluig = item.codigo;  
            this.form.codFilial = item.filial_protheus;  
            this.form.filial = item.filial;  
            this.form.cnpj_filial = item.cnpj_filial;  
            this.form.ufFilial = item.uf_filial;  
            this.form.classificacaoFili = item.classificacaoFili;  
   
        }else{
            vueApp.form.codFilialFluig = item.codigo;
            vueApp.form.codFilial = item.filial_protheus;
            vueApp.form.filial = item.filial;
            vueApp.form.cnpj_filial = item.cnpj_filial;
            vueApp.form.ufFilial = item.uf_filial; 
            vueApp.form.classificacaoFili = item.tipoClassificacao; 
        
        }
        //CENTRO DE CUSTO
    } else if (item.type == 'centroCusto') {
        vueApp.form.codCentroCusto = item.CODIGO;
        vueApp.form.centroDeCusto = item.DESCRICAO;
        //PRODUTO
    } else if (item.type.indexOf('produto') != -1) {
        var row = item.type.split('___')[1];
        var tipo = item["COD_TIPO"].toLowerCase();
        //Verifica se o produto é matmed
        if(parseInt(item.CODIGO) >= 99000){
            FLUIGC.message.alert({
              message: 'Os itens de código igual ou superior a 99000 não podem ser selecionados.',
              title: 'Atenção !',
              label: 'Ok!'
            }, function (el, ev) {});  
        }else if (tipo == "md" || tipo == "mm" || tipo == "mq" || tipo == "so" || tipo == "lb" || tipo == "dt") {
            $("#nomeProd___" + row).val(item["DESCRICAO"]);
            $("#unidadeProd___" + row).val(item["UM"]);
            $("#fabricanteProd___" + row).val(item["FABRICANTE"]);
            $("#contaContabilProd___" + row).val(item["CCONTABIL"]);
            $("#codProd___" + row).val(item["CODIGO"]);
            $("#saldoProd___" + row).val(alimentarSaldoProtheus(item["CODIGO"]));
        } else {
            showMessage("Atenção!", "Apenas produdos Matmed podem ser selecionados", null);
        }
        //FORNECEDOR
    } else if (item.type.indexOf('fornecedor') != -1) {
        var row = item.type.split('___')[1];
        $("#codForn___" + row).val(item["CODIGO"]);
        $("#nomeForn___" + row).val(item["DESCRICAO"]);
        $("#lojaForn___" + row).val(item["LOJA"]);
        $("#codCondForn___" + row).val(item["COD_COND_PAGTO"]);
        $("#condForn___" + row).val(item["DESC_COND_PAGTO"]);
        $("#formaForn___" + row).val(item["COD_FORM_PAGTO"]).change();
        if ($("#cnpjForn___" + row).val() != '') {
            deleteCotacao("cnpjFornCotacao", $("#cnpjForn___" + row).val());
        }
        $("#cnpjForn___" + row).val(item["CGC"]).change();
        //AGLUTINAÇÃO
    } else if (item.type.indexOf('algutinacao') != -1) {
        var row = item.type.split('___')[1];
        if ($("#codAgl___" + row).val() != "") {
            var codAlg = $('#codAgl___' + row).val();
            readColumn("itemProd", function (row, item) {
                if (item.val().indexOf(codAlg) != -1) {
                    fnWdkRemoveChild(item[0]);
                }
            })
        }
        $("#codAgl___" + row).val(item["codSolicitacao"]).change();
        $("#descAgl___" + row).val(item["campoIdentificador"]);
        //CONDICAO PAGAMENTO
    } else if (item.type.indexOf('condicaoPagamento') != -1) {
        var row = item.type.split('___')[1];
        $("#codCondForn___" + row).val(item["CODIGO"]);
        $("#condForn___" + row).val(item["DESCRICAO"]);
    }

}

function deleteProduto(item) {
    if (vueApp.edicao) {
        deleteProdutoWag(item);
        fnWdkRemoveChild(item);

    } else {
    	var row = $(item).closest("tr").find('input[name^="itemProd___"]').prop('name').split('___')[1];
    	vueApp.addDesvinculado(vueApp.getItem(row, "Prod"));
        deleteProdutoWag(item);
        //REMOVE PRODUTO DA COTACAO
        if (vueApp.form.tipoCotacao == 'fechada') {
            deleteCotacao("codCotacao", $("codProd___" + row).val());
        }
        fnWdkRemoveChild(item);
        vueApp.somaTotalProduto();

        
        /* subTotalFornecedor(item); */ //comentar essa linha

    }

}

function deleteProdutoWag(item) {
    var row = $(item).closest("tr").find('input[name^="itemProd___"]').prop('name').split('___')[1];
    var valor = $(item).closest("tr").find('input[name^="valorTotalProd___"]').val();
    var codForn = $(item).closest("tr").find('input[name^="codFornVencedorProd___"]').val();
    readColumn("codFornecResumo", function (row) {
        if ($("#codFornecResumo___" + row).val() == codForn ) {
            valorItem = valor.replace("R$ ", "").replaceAll(".", "").replace(",", ".");
            subTotalForn = $("#totalFornecResumo___" + row).val().replace("R$ ", "").replaceAll(".", "").replace(",", ".");
            valorFinal = parseFloat(subTotalForn) - parseFloat(valorItem); 
            valorFinal = valorFinal.toFixed(2);               
            if( valorFinal == 0){
                fnWdkRemoveChild($("#codFornecResumo___" + row)[0]);
                readColumn("codForn", function (row) {
                    if ($("#codForn___" + row).val() == codForn ) {
                        fnWdkRemoveChild($("#codForn___" + row)[0]);
                    }
                })
            }else{
                $("#totalFornecResumo___" + row).val(addMascaraMonetaria(valorFinal));
            }
        }
    })    
}

function deleteAglutinacao(item) {

    var row = $(item).closest("tr").find('input[name^="codAgl___"]').prop('name').split('___')[1];
    var codAlg = $('#codAgl___' + row).val();
    readColumn("itemProd", function (row, item) {
        if (item.val().indexOf(codAlg) != -1) {
            fnWdkRemoveChild(item[0]);
        }
    })
    fnWdkRemoveChild(item);
}

function deleteFornecedor(item) {
    var row = $(item).closest("tr").find('input[name^="codForn___"]').prop('name').split('___')[1];
    var cnpjForn = $('#cnpjForn___' + row).val();
    //Caso o fornecedor deletado seja o vencedor ele é removido
    readColumn("cnpjVencedorProd", function (rowProduto, item) {
        if (item.val() == cnpjForn) {
            $("#fornecedorVencedorProd___" + rowProduto).val('');
            $("#cnpjVencedorProd___" + rowProduto).val('');
            $("#valorProd___" + rowProduto).val(addMascaraMonetaria('0')).change();
        }
    });
    //Deleta todas as cotações do fornecedor
    if (vueApp.form.tipoCotacao == 'fechada') {
        deleteCotacao("cnpjFornCotacao", cnpjForn);
    }
    fnWdkRemoveChild(item);
}

function deleteCotacao(nomeCampo, valor) {
    var linhaAtiva = '';
    readColumn(nomeCampo, function (row, item) {
        if (item.val() == valor) {
            fnWdkRemoveChild(item[0]);

        } else {
            linhaAtiva = row;
        }
    });
    $("#valorCotacao___" + linhaAtiva).trigger('change');
}

function configSelectPaiFilho() {
    //Select forma pagamento e frete
    readColumn('formaForn', function (row, item) {
        item.val($("#formaFornHidden___" + row).val());
        item.change(function () {
            $("#formaFornHidden___" + row).val($(this).val())
        })
        $("#tipoFreteForn___" + row).change(function () {
            $("#freteFornHidden___" + row).val($(this).val())
        })
    });
}

function pedidosGerados(codSolicitacao) {
    var constraintPedidoGerado = [];
    var ct = DatasetFactory.createConstraint('ID_FLUIG', codSolicitacao, codSolicitacao, ConstraintType.SHOULD);
    constraintPedidoGerado.push(ct);
    var ds_pedidoGerado = DatasetFactory.getDataset('ds_produtoPedidoCompra', null, constraintPedidoGerado, null);
    for (var i in ds_pedidoGerado.values) {
        var row = wdkAddChild("tbPedidosGerados");
        $("#pedGeradoCod___" + row).val(row);
        $("#pedGeradoPedido___" + row).val(ds_pedidoGerado.values[i].PEDIDO);
        $("#pedGeradoProduto___" + row).val(ds_pedidoGerado.values[i].COD_PRODUTO);
        $("#pedGeradoDescricao___" + row).val(ds_pedidoGerado.values[i].DESC_PRODUTO);
        $("#pedGeradoFornecedor___" + row).val(ds_pedidoGerado.values[i].DESC_FORNECEDOR);
        $("#pedGeradoQuantidade___" + row).val(ds_pedidoGerado.values[i].QUANTIDADE);
        $("#pedGeradoTotal___" + row).val("R$ " + ds_pedidoGerado.values[i].VLR_TOTAL);
    }
}

function alimentarSaldoProtheus(cdProduto) {

    var unidade = $("#codFilial").val();

    var consumoMedioDataSet = new objDataSet("consultaDadosProtheus");

    // Informa a tabela
    consumoMedioDataSet.setCampo("SB2___" + unidade);

    // Informar o filtro no where
    consumoMedioDataSet.setCampo("B2_COD = " + "'" + cdProduto + "' ");

    // Informa as colunas da query
    consumoMedioDataSet.setCampo("B2_QATU");

    consumoMedioDataSet.filtrarBusca();
    var dadosConsumoMedio = consumoMedioDataSet.getDados();
    var dados = '';

    var saldoTotal = 0;
    for (var pos in dadosConsumoMedio.values) {
        dados = dadosConsumoMedio.values[pos];
        var saldo = $.trim(dados.B2_QATU);
        if (saldo == "") saldo = "0";
        saldoTotal = saldoTotal + parseInt(saldo);

    }
    return saldoTotal;
}

function fnCustomDelete(oElement) {

    subTotalFornecedor(); // andre
    fnWdkRemoveChild(oElement);

}

function duas_casas(numero) {
    if (numero <= 9) {
        numero = "0" + numero;
    }
    return numero;
}

function somarDiasUteis(qtdDias) {

    var now = new Date();

    for (var x = 1; x <= qtdDias; x++) {

        if (now.getDay() == 6 || now.getDay() == 0) {
            now.setDate(now.getDate() + 1);
            x--;
        } else {
            now.setDate(now.getDate() + 1);
        }
    }

    if (now.getDay() == 6) {
        now.setDate(now.getDate() + 2);
    } else if (now.getDay() == 0) {
        now.setDate(now.getDate() + 1);
    }

    var dia = duas_casas(now.getDate());
    var mes = duas_casas(now.getMonth() + 1);
    var ano = now.getFullYear();

    return dia + "/" + mes + "/" + ano;
}


function dadosProdutoSugestao(item, codProduto) {

    var c1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('CODIGO', codProduto, codProduto, ConstraintType.MUST);
    var datasetDs_produto = DatasetFactory.getDataset('ds_produto', null, new Array(c1, c2), null).values;

    var produto = {
        CODIGO: datasetDs_produto[0].CODIGO,
        COD_TIPO: datasetDs_produto[0].COD_TIPO,
        CONTA_CONTABIL: datasetDs_produto[0].CONTA_CONTABIL,
        DESCRICAO: datasetDs_produto[0].DESCRICAO,
        DESC_TIPO: datasetDs_produto[0].DESC_TIPO,
        FABRICANTE: datasetDs_produto[0].FABRICANTE,
        IPI: datasetDs_produto[0].IPI,
        ULTIMO_PRECO: datasetDs_produto[0].ULTIMO_PRECO,
        UM: datasetDs_produto[0].UM,
        type: ("produto___" + item + '')
    }

    return produto;

}

function dadosFilialSugestao(codFilial) {

    var constraintDs_filial1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
    var constraintDs_filial2 = DatasetFactory.createConstraint('CODIGO', codFilial, codFilial, ConstraintType.MUST);
    var datasetDs_filial = DatasetFactory.getDataset('ds_filial', null, new Array(constraintDs_filial1, constraintDs_filial2), null).values;

    var filial = {
        cnpj_filial: datasetDs_filial[0].CGC,
        codigo: datasetDs_filial[0].CODIGO_FLUIG,
        filial: datasetDs_filial[0].DESCRICAO,
        filial_protheus: datasetDs_filial[0].CODIGO,
        type: "filial",
        uf_filial: datasetDs_filial[0].ESTADO,
        classificacaoFili: datasetDs_filial[0].CLASSIFICAÇÃO,
    }

    return filial;

}

// Pegar valores do get e reotor um array
function getParametrosURL() {
    var partes = parent.window.location.href
      .slice(parent.window.location.href.indexOf("?") + 1)
      .split("&");
    var data = {};
    partes.forEach(function (parte) {
      var chaveValor = parte.split("=");
      var chave = chaveValor[0];
      var valor = chaveValor[1];
      data[chave] = valor;
    });
    return data;
  }

  function setAlcadaAprovacaoUpdate() {
    debugger;
    var valorTotal = removeMascaraMonetaria($("#valorTotalSolicitacao").val());
    if ($('#ehSugestaoCompras').val() == 'true') {
        setSelectedZoomItem(dadosFilialSugestao($('#codFilial').val()))
        var filialFluigCod = $('#codFilialFluig').val();
    } else {
        var filialFluigCod = $('#codFilialFluig').val();
    }
    var dsAlcada = getInDataset("ds_alcadas_aprov_v2", null, ['tablename|tbAlcadasMatMed', 'F1_FILIAL_MAT |' + filialFluigCod]).values;
    $('#isAlcada').val('erro')
    if (dsAlcada.length > 0) {
        if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorClinica) || FLUIGC.switcher.getState("#isImportado")) {
            $("#idAprovAlcada1").val(dsAlcada[0].usuarioClinica);
            $("#nomeAprovAlcada1").val(dsAlcada[0].usuarioClinicaDesc); 
            $('#isAlcada').val('true');
            $("#aprovAlcadaAtual").val(dsAlcada[0].usuarioClinica); 
        } else {
            $('#isAlcada').val('false'); 
        }
        if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorCompras)) {
            $("#idAprovAlcada2").val(dsAlcada[0].usuarioCompras); 
            $("#nomeAprovAlcada2").val(dsAlcada[0].usuarioComprasDesc); 
        }
        if (valorTotal > removeMascaraMonetaria(dsAlcada[0].valorDiretores)) {
            $("#idAprovAlcada3").val(dsAlcada[0].usuarioDiretores); 
            $("#nomeAprovAlcada3").val(dsAlcada[0].usuarioDiretoresDesc); 
        }

    } else {
        $("#isAlcada").val('erro');
        showMessage('ERRO', 'Não foi possivel carregar a alçada de aprovação. Atualize a pagina e tente novamente.')
    }
}