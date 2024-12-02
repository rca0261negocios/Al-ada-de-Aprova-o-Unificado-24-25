var vueApp = null;
var configApp = {
    el: "#app",
    data: {
        atividadeAtual: "",
        edicao: false,
        //Atividades do processo
        process: {
            inicio: 5,
            aprovacaoGestores: 360,
            analiseCompradorCotacao: 6,
            alcadaAprovacaoCompra: 7,
            solucaoInconsistencia: 10,
            correcaoSolicitante: 13,
            aprovSolicitante: 14,
            execaoIntegracao: 16,
            validarPedidoCompra: 19,
            alcadaAprovacaoCartaExce: 20,
            formularioContrato: 26,
            analiseTI: 62,
            alcadaAprovacaoPA: 96,
            execao_anexo_integracao: 111,
            envia_email_fornecedor: 116,
            excecaoGeraTituloPA: 120,
            reavaliarPA: 132,
            analiseRH: 254,
            tratativaErroFornecedor: 277,
            analiseObras: 282,
            aprovTecnica: 295,
            tratativaErroStartAcompanhemento: 310,
            analisarVinculacaoProdFornec: 335,
        },
        //Campos do formulario
        form: {
            nomeSolicitante: $("#nomeSolicitante").val(),
            idSolicitante: $("#idSolicitante").val(),
            emailSolicitante: $("#emailSolicitante").val(),
            emailContatSolicitante: $("#emailContatSolicitante").val(),
            emailComprador: $("#emailComprador").val(),
            centroDeCusto: $("#centroDeCusto").val(),
            localEntrega: $("#localEntrega").val(),
            prioridade: $("#prioridadeHidden").val(),
            sLocalPrestServico: $("#hiddenLocalPrestServico").val(),
            valCotacao: $("#valCotacao").val(),
            tipoCotacao: $("#tipoCotacaoHidden").val(),
            codSolicitacao: $("#codSolicitacao").val(),
            campoIdentificador: $("#campoIdentificador").val(),
            codSolicitacaoVinculada: $("#codSolicitacaoVinculada").val(),
            valorTotalSolicitacao: $("#valorTotalSolicitacao").val(),
            codSolicitacaoDesvinculada: $("#codSolicitacaoDesvinculada").val(),
            numSolicitAbertaFilho: $("#numSolicitAbertaFilho").val(),
            refSolicitacaoDesvinculada: $("#refSolicitacaoDesvinculada").val(),
            justificativaAnaliseComprador: $("#justificativaAnaliseComprador").val(),
            hideReajusteContrato: $("#hideReajusteContrato").val(),
            hideNovoContratoOuAdt: $("#hideNovoContratoOuAdt").val(),
            qtdAnexos: $("#hiddenQtdAnexos").val(),
            qtdCotacoes: $("#hiddenQtdCotacoes").val(),
            qtdAnexoContratos: $("#qtdAnexoContratos").val(),
            isAlcada: $("#isAlcada").val(),
            isFornecedorExclu: $("#hideFornecedorExclu").val(),
            isFornecedorExcluClassica: $("#hideFornecedorExcluClassica").val(),
            setRespCompras: $("#setRespCompras").val(),
            tipoCompra: $("#tipoCompra").val(),
            //alcadaAprovacaoCompras: $('#alcadaAprovacaoCompras').val(),
            //Produto |TI
            isProdutoTI: $("#isProdutoTI").val(),
            motivoAprovAnaliseTI: $("#motivoAprovAnaliseTI").val(),
            decisaoAprovAnaliseTI: $("#decisaoAprovAnaliseTI").val(),

            //Obras
            idAprovAnaliseObras: $("#idAprovAnaliseObras").val(),
            nomeAprovAnaliseObras: $("#nomeAprovAnaliseObras").val(),
            dataAprovAnaliseObras: $("#dataAprovAnaliseObras").val(),
            motivoAprovAnaliseObras: $("#motivoAprovAnaliseObras").val(),
            decisaoAprovAnaliseObras: $("#decisaoAprovAnaliseObras").val(),
            target: $("#target").val(),
            tipoProjeto: $("#tipoProjeto").val(),

            //Aprovação Técnica
            idAprovaprovTecnica: $("#idAprovaprovTecnica").val(),
            nomeAprovaprovTecnica: $("#nomeAprovaprovTecnica").val(),
            dataAprovaprovTecnica: $("#dataAprovaprovTecnica").val(),
            motivoAprovaprovTecnica: $("#motivoAprovaprovTecnica").val(),
            decisaoAprovaprovTecnica: $("#decisaoAprovaprovTecnica").val(),

            // Analise RH
            idAprovAnaliseRH: $("#idAprovAnaliseRH").val(),
            nomeAprovAnaliseRH: $("#nomeAprovAnaliseRH").val(),
            dataAprovAnaliseRH: $("#dataAprovAnaliseRH").val(),
            motivoAprovAnaliseRH: $("#motivoAprovAnaliseRH").val(),
            decisaoAprovAnaliseRH: $("#decisaoAprovAnaliseRH").val(),

            // Alçada de Carta de Exeção
            isAlcadaCarta: $("#isAlcadaCarta").val(),
            isAlcadaCartaComprador: $("#isAlcadaCartaComprador").val(),
            aprovAlcadaAtualCarta: $("#aprovAlcadaAtualCarta").val(),
            maxAlcadaAtualCarta: $("#maxAlcadaAtualCarta").val(),
            contadorAlcadaCarta: $("#contadorAlcadaCarta").val(),
            idAprovAlcadaCarta1: $("#idAprovAlcadaCarta1").val(),
            nomeAprovAlcadaCarta1: $("#nomeAprovAlcadaCarta1").val(),
            dataAprovAlcadaCarta1: $("#dataAprovAlcadaCarta1").val(),
            decisaoAlcadaCarta1: $("#decisaoAlcadaCarta1").val(),
            motivoAprovAlcadaCarta1: $("#motivoAprovAlcadaCarta1").val(),
            idAprovAlcadaCarta2: $("#idAprovAlcadaCarta2").val(),
            nomeAprovAlcadaCarta2: $("#nomeAprovAlcadaCarta2").val(),
            dataAprovAlcadaCarta2: $("#dataAprovAlcadaCarta2").val(),
            decisaoAlcadaCarta2: $("#decisaoAlcadaCarta2").val(),
            motivoAprovAlcadaCarta2: $("#motivoAprovAlcadaCarta2").val(),
            idAprovAlcadaCarta3: $("#idAprovAlcadaCarta3").val(),
            nomeAprovAlcadaCarta3: $("#nomeAprovAlcadaCarta3").val(),
            dataAprovAlcadaCarta3: $("#dataAprovAlcadaCarta3").val(),
            decisaoAlcadaCarta3: $("#decisaoAlcadaCarta3").val(),
            motivoAprovAlcadaCarta3: $("#motivoAprovAlcadaCarta3").val(),
            idAprovAlcadaCarta4: $("#idAprovAlcadaCarta4").val(),
            nomeAprovAlcadaCarta4: $("#nomeAprovAlcadaCarta4").val(),
            dataAprovAlcadaCarta4: $("#dataAprovAlcadaCarta4").val(),
            decisaoAlcadaCarta4: $("#decisaoAlcadaCarta4").val(),
            motivoAprovAlcadaCarta4: $("#motivoAprovAlcadaCarta4").val(),
            idAprovAlcadaCarta5: $("#idAprovAlcadaCarta5").val(),
            nomeAprovAlcadaCarta5: $("#nomeAprovAlcadaCarta5").val(),
            dataAprovAlcadaCarta5: $("#dataAprovAlcadaCarta5").val(),
            decisaoAlcadaCarta5: $("#decisaoAlcadaCarta5").val(),
            motivoAprovAlcadaCarta5: $("#motivoAprovAlcadaCarta5").val(),
            alterouValorCarta: $("#alterouValorCarta").val(),

            // Alçada de Aprvação Diversos
            /* aprovAlcadaAtual: $("#aprovAlcadaAtual").val(),
            isAlcadaDiversos: $("#isAlcadaDiversos").val(),
            isAlcadaMsg: $("#isAlcadaMsg").val(),
            contadorAlcada: $("#contadorAlcada").val(),
            maxAlcadaAtual: $("#maxAlcadaAtual").val(),
            idAprovAlcada: $("#idAprovAlcada").val(),
            nomeAprovAlcada: $("#nomeAprovAlcada").val(),
            dataAprovAlcada: $("#dataAprovAlcada").val(),
            decisaoAlcada: $("#decisaoAlcada").val(),
            motivoAprovAlcada: $("#motivoAprovAlcada").val(),
            sMotivoAprovAlcada: $("#motivoReprovAlcada1Hidden").val(), */

            // Alçada de Aprvação Diversos
            aprovAlcadaAtual: $("#aprovAlcadaAtual").val(),
            isAlcadaDiversos: $("#isAlcadaDiversos").val(),
            isAlcadaMsg: $("#isAlcadaMsg").val(),
            contadorAlcada: $("#contadorAlcada").val(),
            maxAlcadaAtual: $("#maxAlcadaAtual").val(),
            idAprovAlcada1: $("#idAprovAlcada1").val(),
            nomeAprovAlcada1: $("#nomeAprovAlcada1").val(),
            dataAprovAlcada1: $("#dataAprovAlcada1").val(),
            decisaoAlcada1: $("#decisaoAlcada1").val(),
            motivoAprovAlcada1: $("#motivoAprovAlcada1").val(),
            sMotivoAprovAlcada1: $("#motivoReprovAlcada1Hidden").val(),
            idAprovAlcada2: $("#idAprovAlcada2").val(),
            nomeAprovAlcada2: $("#nomeAprovAlcada2").val(),
            dataAprovAlcada2: $("#dataAprovAlcada2").val(),
            decisaoAlcada2: $("#decisaoAlcada2").val(),
            motivoAprovAlcada2: $("#motivoAprovAlcada2").val(),
            sMotivoAprovAlcada2: $("#motivoReprovAlcada2Hidden").val(),
            idAprovAlcada3: $("#idAprovAlcada3").val(),
            nomeAprovAlcada3: $("#nomeAprovAlcada3").val(),
            dataAprovAlcada3: $("#dataAprovAlcada3").val(),
            decisaoAlcada3: $("#decisaoAlcada3").val(),
            motivoAprovAlcada3: $("#motivoAprovAlcada3").val(),
            sMotivoAprovAlcada3: $("#motivoReprovAlcada3Hidden").val(),
            idAprovAlcada4: $("#idAprovAlcada4").val(),
            nomeAprovAlcada4: $("#nomeAprovAlcada4").val(),
            dataAprovAlcada4: $("#dataAprovAlcada4").val(),
            decisaoAlcada4: $("#decisaoAlcada4").val(),
            motivoAprovAlcada4: $("#motivoAprovAlcada4").val(),
            sMotivoAprovAlcada4: $("#motivoReprovAlcada4Hidden").val(),
            idAprovAlcada5: $("#idAprovAlcada5").val(),
            nomeAprovAlcada5: $("#nomeAprovAlcada5").val(),
            dataAprovAlcada5: $("#dataAprovAlcada5").val(),
            decisaoAlcada5: $("#decisaoAlcada5").val(),
            motivoAprovAlcada5: $("#motivoAprovAlcada5").val(),
            sMotivoAprovAlcada5: $("#motivoReprovAlcada5Hidden").val(),
            idAprovAlcada6: $("#idAprovAlcada6").val(),
            nomeAprovAlcada6: $("#nomeAprovAlcada6").val(),
            dataAprovAlcada6: $("#dataAprovAlcada6").val(),
            decisaoAlcada6: $("#decisaoAlcada6").val(),
            motivoAprovAlcada6: $("#motivoAprovAlcada6").val(),
            sMotivoAprovAlcada6: $("#motivoReprovAlcada6Hidden").val(),
            idAprovAlcada7: $("#idAprovAlcada7").val(),
            nomeAprovAlcada7: $("#nomeAprovAlcada7").val(),
            dataAprovAlcada7: $("#dataAprovAlcada7").val(),
            decisaoAlcada7: $("#decisaoAlcada7").val(),
            motivoAprovAlcada7: $("#motivoAprovAlcada7").val(),
            sMotivoAprovAlcada7: $("#motivoReprovAlcada76Hidden").val(),
            idAprovAlcada8: $("#idAprovAlcada8").val(),
            nomeAprovAlcada8: $("#nomeAprovAlcada8").val(),
            dataAprovAlcada8: $("#dataAprovAlcada8").val(),
            decisaoAlcada8: $("#decisaoAlcada8").val(),
            motivoAprovAlcada8: $("#motivoAprovAlcada8").val(),
            sMotivoAprovAlcada8: $("#motivoReprovAlcada86Hidden").val(),


            // Alçada de Aprvação PA
            isPA: $("#hidePA").val(),
            isAlcadaPA: $("#hidePA").val(),
            aprovAlcadaAtualPA: $("#aprovAlcadaAtualPA").val(),
            maxAlcadaAtualPA: $("#maxAlcadaAtualPA").val(),
            contadorAlcadaPA: $("#contadorAlcadaPA").val(),
            idAprovAlcadaPA1: $("#idAprovAlcadaPA1").val(),
            nomeAprovAlcadaPA1: $("#nomeAprovAlcadaPA1").val(),
            dataAprovAlcadaPA1: $("#dataAprovAlcadaPA1").val(),
            decisaoAlcadaPA1: $("#decisaoAlcadaPA1").val(),
            motivoAprovAlcadaPA1: $("#motivoAprovAlcadaPA1").val(),
            idAprovAlcadaPA2: $("#idAprovAlcadaPA2").val(),
            nomeAprovAlcadaPA2: $("#nomeAprovAlcadaPA2").val(),
            dataAprovAlcadaPA2: $("#dataAprovAlcadaPA2").val(),
            decisaoAlcadaPA2: $("#decisaoAlcadaPA2").val(),
            motivoAprovAlcadaPA2: $("#motivoAprovAlcadaPA2").val(),
            idAprovAlcadaPA3: $("#idAprovAlcadaPA3").val(),
            nomeAprovAlcadaPA3: $("#nomeAprovAlcadaPA3").val(),
            dataAprovAlcadaPA3: $("#dataAprovAlcadaPA3").val(),
            decisaoAlcadaPA3: $("#decisaoAlcadaPA3").val(),
            motivoAprovAlcadaPA3: $("#motivoAprovAlcadaPA3").val(),
            idAprovAlcadaPA4: $("#idAprovAlcadaPA4").val(),
            nomeAprovAlcadaPA4: $("#nomeAprovAlcadaPA4").val(),
            dataAprovAlcadaPA4: $("#dataAprovAlcadaPA4").val(),
            decisaoAlcadaPA4: $("#decisaoAlcadaPA4").val(),
            motivoAprovAlcadaPA4: $("#motivoAprovAlcadaPA4").val(),
            idAprovAnaliseTI: $("#idAprovAnaliseTI").val(),
            nomeAprovAnaliseTI: $("#nomeAprovAnaliseTI").val(),
            dataAprovAnaliseTI: $("#dataAprovAnaliseTI").val(),
            motivoAprovAnaliseTI: $("#motivoAprovAnaliseTI").val(),
            idAprovSolicitante: $("#idAprovSolicitante").val(),
            nomeAprovSolicitante: $("#nomeAprovSolicitante").val(),
            dataAprovSolicitante: $("#dataAprovSolicitante").val(),
            decisaoSolicitante: $("#decisaoSolicitante").val(),
            idAprovGestor: $("#idAprovGestor").val(),
            nomeAprovGestor: $("#nomeAprovGestor").val(),
            dataAprovGestor: $("#dataAprovGestor").val(),            
            motivoAprovSolicitante: $("#motivoAprovSolicitante").val(),
            motivoAnaliseComprador: $("#motivoAnaliseComprador").val(),
            decisaoGestor: $("#decisaoGestor").val(),

            chkMinutaContrato: $("#hiddenChkMinutaContrato").val(),
            trataPA: $("#trataPAHidden").val(),
            justificaPA: $("#justificaPA").val(),
            unidadeVigencia: $("#hiddenUnidadeVigencia").val(),
            vigenciaDoContrato: $("#vigenciaDoContrato").val(),
            alteraValorCartaExecao: $("#alteraValorCartaExecao").val(),
            correcaoSolicitacao: $("#correcaoSolicitacao").val(), //false,
            isAglutinar: false,
            isContrato: false,
            isContratoGuardChuva: false,
            isNovoContratoOuAdt: false,
            isReajusteContrato: false,
            isNegociacao: false,
            chkAditivos: false,
            aprovadorRH: false,
            analiseFiscal: false,
        },
        listProdutoFechada: [],
        listVencedorCotacao: [],
        linhaJustificativaCotacao: null,
    },
    created: function () {
        //Configura o modo edição nas atividades necessárias
        this.atividadeAtual = CURRENT_STATE;
        var listEdicao = [0, this.process.inicio, this.process.correcaoSolicitante];
        this.edicao = listEdicao.indexOf(this.atividadeAtual) != -1;
    },
    mounted: function () {
        //Executa quando a aplicação é montada
        var self = this;

        if (MODO_EDICAO == "VIEW") {
            $(".tdItemFor").hide();
            $(".tdItemProd").hide();

            if ($("#prioridadeHidden").val() == "E") {
                $("#msgEmerg").prop("display", "block");
                $("#msgEmerg").show();
                $("#app fieldset legend:first").append(" - EMERGENCIAL");
                $("#bordaEmerg").css({
                    "border-color": "red",
                    "border-width": "3px",
                    border: "solid",
                    padding: "20px",
                });
            }
        }

        if (
            this.atividadeAtual == this.process.inicio ||
            this.atividadeAtual == 0
        ) {            
            $(".fixedTopBar, #page-header", parent.document)
                .find("button:first")
                .bind("click", function () {
                    var codsIss = "";
                    $("[name^=codIss___]").each(function () {
                        codsIss += this.value + "-";
                    });
                    $("#hiddenCodIss").val(codsIss);
                });

            self.form.setRespCompras = "Pool:Group:CD";
            self.form.alterouValorCarta = "nao";
            self.form.contadorAlcada = 0;
            self.form.maxAlcadaAtual = 0;
            self.form.contadorAlcadaCarta = 0;
            self.form.maxAlcadaAtualCarta = 0;
            self.form.isAlcadaCarta = "none";
            self.form.alteraValorCartaExecao = false;
            self.form.isAlcadaCartaComprador = false;
            self.form.contadorAlcadaPA = 0;
            self.form.maxAlcadaAtualPA = 0;
            self.form.isAlcada = "none";
            self.form.correcaoSolicitacao = "false";

            getParamsURL();

            //Seta os dados dos campos fixos e predefinidos
            this.form.nomeSolicitante = parent.WCMAPI.user;
            this.form.idSolicitante = parent.WCMAPI.userCode;
            this.form.emailSolicitante = parent.WCMAPI.userEmail;
            $("#hideProdutoTi").val("false");
            $("#dataSolicitacao").val(getCurrentDate());

            $("input[name=prioridade]").change(function () {
                $("#prioridadeHidden").val($("[name='prioridade']:checked").val());
                $("#dataNecessidade").val("");
                var calendario = FLUIGC.calendar("#dataNecessidade", {
                    pickDate: true,
                    pickTime: false,
                    useCurrent: false,
                });
                var dataAtual = new Date();

                var emergencial = 2;
                var normalProd = 6;
                var normalServ = 10;

                var val = $("#prioridadeHidden").val();
                if (val == "E") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(emergencial));
                    calendario.setMinDate(dataAtual);
                    showMessage(
                        "Atenção!",
                        "Solicitação realizada em caráter de emergência somente poderá assim ser classificada, em casos que possam impactar no atendimento assistencial das unidades ou trazer outros riscos significativos para o Grupo Oncoclínicas, a critério da diretoria, desde que sua necessidade seja devidamente justificada pelo solicitante."
                    );
                }
                if (val == "N" && $("#codServOuProd").val() == "SV") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(normalServ));
                    calendario.setMinDate(dataAtual);
                }
                if (val == "N" && $("#codServOuProd").val() != "SV") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(normalProd));
                    calendario.setMinDate(dataAtual);
                }

                if ($("#prioridadeHidden").val() == "E") {
                    $("#bordaEmerg").addClass("bordaEmergencial");
                    $("#msgEmerg").show();
                    $("#statusPrioridade").val("EMERGENCIAL");
                } else {
                    $("#bordaEmerg").removeClass("bordaEmergencial");
                    $("#msgEmerg").hide();
                    $("#statusPrioridade").val("N");
                }
            });

            $("#itemProd___1").val("1");
            adicionaMascaraMonetaria("valorCompraExclu");

            addEventSendFluig(function () {
                //VALIDA A ALÇADA DE COMPRAS
                self.validarAlcadasCompras();
                //GERA CAMPO IDENTIFICADOR
                var prioridade = "N";
                if (self.form.prioridade == "E") {
                    prioridade = "EMERGENCIAL";
                }

                $("#campoIdentificador").val(defineCampoIdentificador());                                

                if (
                    self.form.isFornecedorExclu == true &&
                    self.form.isProdutoTI == "nao"
                ) {
                    self.setAlcadaAprovacaoCarta();
                } else if (
                    self.form.isFornecedorExclu == true &&
                    self.form.tipoCompra == "5"
                ) {
                    self.setAlcadaAprovacaoCarta();
                }
            });

            // EXIBINDO ALÇADA CARTA EXCEÇÃO EM CASO DE REPROVAÇÃO
            if (
                $("#avancaGestor").val() == "false" &&
                $("#justificaCotacaoMaiorCartaEx").val() == ""
            ) {
                $("#fieldsetAlcadaAprovacao").show();
            }

            $("#target").maskMoney({
                prefix: "R$ ",
                thousands: ".",
                decimal: ",",
                affixesStay: true,
                allowZero: true,
            });

            if ($("#tipoCompra").val() == "5") {
                $("#tomarCienciaObra").val(
                    solicitanteDifGrupoObras(parent.WCMAPI.userCode)
                );
            }

            $("#target").blur(function () {
                var valor = this.value;
                valor = valor.replace(".", "");
                valor = valor.replace(",", ".");
                valor = valor.replace("R$ ", "");
                valor = parseFloat(valor);

                valor > 100000 ?
                    $("#executorAtv282").val("Pool:Group:HOFGES") :
                    $("#executorAtv282").val("Pool:Group:HOFAC");
            });
        } else if (this.atividadeAtual == this.process.analiseCompradorCotacao) {
            if ($("#obsFiscal").val() == "") {
                $("#analiseFiscalH").val("false");
            }

            $("#codEspeciais").prop("readonly", true);
            var self = this;
            this.form.emailComprador = parent.WCMAPI.userEmail;
            $("#codEspeciais").prop("readonly", true);
            FLUIGC.popover(".bs-docs-popover-click", {
                trigger: "click",
                placement: "auto",
            });
            $("#idComprador").val(parent.WCMAPI.userCode);
            if ($("#valorTotalSolicitacao").val() == "") {
                FLUIGC.switcher.isReadOnly("#isNegociacao", true);
            }

            if (MODO_EDICAO != "VIEW") {
                //EVENTOS
                readColumn("codProd", function (row) {
                    addMaskMonetaria("#valIpiProd___" + row);
                    $("#qtdProd___" + row)
                        .add("#valorProd___" + row)
                        .change(function () {
                            var rowChange = $(this).prop("name").split("___")[1];
                            self.somaTotalProduto(rowChange);
                        });
                    self.somaTotalProduto(row);
                });

                readColumn("valIpiProd", function (row) {
                    $("#valIpiProd___" + row).change(function () {
                        self.somaTotalProduto(row);
                    });
                });

                readColumn("codCotacao", function (row) {
                    self.configCotacao(row);
                    $("#valorCotacao___" + row).trigger("change");
                });

                readColumn("codForn", function (row) {
                    self.configFornecedor(row);
                });

                $("[name^=itemProd___]").each(function () {
                    var rowItem = $(this).prop("name").split("___")[1];
                    $("#itemProd___" + rowItem).val(rowItem);
                });

                if (self.form.tipoCotacao == "tabela") {
                    //VERIFICA SE NA SOLICITACAO TABELA PRECO EXISTE PRODUTOS COTACAO FECHADA E OS SEPARA
                    if (self.listProdutoFechada.length > 0) {
                        var dsComprasDivers = getInDataset(
                            "ds_comprasDiversos",
                            ["codSolicitacao"],
                            ["codSolicitacaoVinculada|" + self.form.codSolicitacao]
                        );
                        if (dsComprasDivers.values.length > 0) {
                            self.form.codSolicitacaoVinculada =
                                dsComprasDivers.values[0]["codSolicitacao"];
                        } else {
                            //INICIA SOLICITACAO VINCULADA DA COTACAO FECHADA
                            var xmlNovaSolicitacao = renderXmlSolicitacaoDiversos(
                                self,
                                self.listProdutoFechada,
                                "cotacaoFechada"
                            );
                            self.iniciaNovaSolicitacao(
                                xmlNovaSolicitacao,
                                //SUCCESS
                                function (data) {
                                    $(data)
                                        .find("key")
                                        .each(function (k, v) {
                                            if ($(v).text() == "iProcess") {
                                                self.form.codSolicitacaoVinculada = $(v).next().text();
                                                return false;
                                            }
                                        });
                                    if (self.form.codSolicitacaoVinculada != "") {
                                        FLUIGC.toast({
                                            message: "A solicitação " +
                                                self.form.codSolicitacaoVinculada +
                                                " foi gerada a partir dessa para cotação fechada.",
                                            type: "success",
                                            timeout: "slow",
                                        });
                                    } else {
                                        showMessage(
                                            "ERRO",
                                            "Erro para classificar a solicitação entre fechada e tabela de preço. Atualize a página ou contate o time de TI"
                                        );
                                        console.log(data);
                                    }
                                },
                                //ERROR
                                function (msg) {
                                    showMessage(
                                        "ERRO",
                                        "Erro para classificar a solicitação entre fechada e tabela de preço. Atualize a página ou contate o time de TI"
                                    );
                                    console.log(msg);
                                }
                            );
                        }
                    }
                } else {
                    if ($("#codServOuProd").val() == "SV") {
                        self.form.tipoCotacao = "fechada";
                    }
                    if (self.listProdutoFechada.length == 0) {
                        self.listProdutoFechada = self.getAllItem("Prod");
                    }
                }

                //Formata a data do webservice em dd/mm/aaaa
                $("[name^='data']").each(function () {
                    $(this).val($(this).val().replace(/-/g, "/"));
                });
                $("#listPedidoCompra").val("{}");

                // Adiciona Máscara Monetária
                adicionaMascaraMonetaria("valorIniciProd");
                adicionaMascaraMonetaria("saving");

                //Formata o campo para calendario
                FLUIGC.calendar("#dataVencimentoPA", {
                    pickDate: true,
                    pickTime: false,
                    minDate: new Date(),
                });
            }
            addEventSendFluig(function () {
                if (
                    self.form.correcaoSolicitacao == "false" ||
                    self.form.correcaoSolicitacao == false
                ) {
                    if (self.process.inicio) {

                    }
                    self.validarAlcadasCompras();
                    self.setAlcadaAprovacaoDiversos();
                    if (self.form.isPA == true) {
                        self.setAlcadaAprovacaoPA();
                    }
                    if (
                        self.form.isAlcadaCartaComprador == true ||
                        self.form.isAlcadaCartaComprador == "true"
                    ) {
                        self.setAlcadaAprovacaoCarta();

                    }
                }
            });
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            var contadorAlcada = parseInt(self.form.contadorAlcada) - 1;
            if (
                self.form.isAlcadaDiversos == "true" &&
                $("#decisaoAlcada" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcada li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcada div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            var contadorAlcada = parseInt(self.form.contadorAlcadaCarta) - 1;
            if (
                self.form.isAlcadaCarta == "true" &&
                $("#decisaoAlcadaCarta" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcadaCarta li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcadaCarta div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            var contadorAlcada = parseInt(self.form.contadorAlcadaPA) - 1;
            if (
                self.form.isAlcadaPA == "true" &&
                $("#decisaoAlcadaPA" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcadaPA li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcadaPA div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            //validar se é contrato guarda chuva e já marcar e desativar a opção de contrato
            if ($("#hideContratoGuardChuva").val() == "true") {
                FLUIGC.switcher.setTrue("#isContrato");
                self.form.isContrato = "true";
                FLUIGC.switcher.disable("#isContrato");
            }
            this.form.setRespCompras = "Pool:Group:CD";
        } else if (this.atividadeAtual == this.process.analiseTI) {
            var self = this;
            self.setAlcadaAprovacaoCarta();
            self.form.motivoAprovAnaliseTI = "";
            self.form.decisaoAprovAnaliseTI = "";
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovAnaliseTI = parent.WCMAPI.userCode;
            self.form.nomeAprovAnaliseTI = parent.WCMAPI.user;
            self.form.dataAprovAnaliseTI = getCurrentDate();
            btnAprov(true);
        } else if (this.atividadeAtual == this.process.analiseObras) {
            var self = this;
            self.form.motivoAprovAnaliseObras = "";
            self.form.decisaoAprovAnaliseObras = "";
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovAnaliseObras = parent.WCMAPI.userCode;
            self.form.nomeAprovAnaliseObras = parent.WCMAPI.user;
            self.form.dataAprovAnaliseObras = getCurrentDate();
            btnAprov(true);

            totalProdutosReceber();
        } else if (this.atividadeAtual == this.process.aprovTecnica) {
            var self = this;
            self.form.motivoAprovaprovTecnica = "";
            self.form.decisaoAprovaprovTecnica = "";
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovaprovTecnica = parent.WCMAPI.userCode;
            self.form.nomeAprovaprovTecnica = parent.WCMAPI.user;
            self.form.dataAprovaprovTecnica = getCurrentDate();
            btnAprov(true);
        } else if (this.atividadeAtual == this.process.analiseRH) {
            var self = this;

            addEventSendFluig(function () {
                //buscarGestoresCartaExcecao();
            });

            self.form.motivoAprovAnaliseRH = "";
            self.form.decisaoAprovAnaliseRH = "";
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovAnaliseRH = parent.WCMAPI.userCode;
            self.form.nomeAprovAnaliseRH = parent.WCMAPI.user;
            self.form.dataAprovAnaliseRH = getCurrentDate();
            btnAprov(true);
        } else if (this.atividadeAtual == this.process.alcadaAprovacaoCartaExce) {
            var self = this;
            var contadorAlcadaCarta = parseInt(self.form.contadorAlcadaCarta);

            flagAllBtnAprov();
            btnAprov(true);
            self.form[
                "dataAprovAlcadaCarta" + contadorAlcadaCarta
            ] = getCurrentDate();
            self.form["nomeAprovAlcadaCarta" + contadorAlcadaCarta] =
                parent.WCMAPI.user;
            $(
                    ".navTabsAlcadaCarta li:nth-child(" +
                    contadorAlcadaCarta +
                    "), .navTabsAlcadaCarta div:nth-child(" +
                    contadorAlcadaCarta +
                    ")"
                )
                .addClass("active")
                .show();

            if (
                contadorAlcadaCarta < 5 &&
                self.form["idAprovAlcadaCarta" + contadorAlcadaCarta] ==
                self.form.aprovAlcadaAtualCarta
            ) {
                contadorAlcadaCarta++;
                self.form.aprovAlcadaAtualCarta =
                    self.form["idAprovAlcadaCarta" + contadorAlcadaCarta];
            } else {
                if (contadorAlcadaCarta == 5) {
                    self.form.aprovAlcadaAtualCarta = "";
                }
            }
        } else if (this.atividadeAtual == this.process.reavaliarPA) {
            var self = this;
            flagAllBtnAprov();
            var contadorAlcada = parseInt(self.form.contadorAlcadaPA) - 1;
            if (
                self.form.isAlcadaPA == "true" &&
                $("#decisaoAlcadaPA" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcadaPA li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcadaPA div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            addEventSendFluig(function () {
                if (self.form.trataPA == "J") {
                    self.setAlcadaAprovacaoPA();
                } else if (self.form.trataPA == "S") {
                    FLUIGC.switcher.setFalse("#isPA");
                }
                dadosVencedores();
            });
        } else if (this.atividadeAtual == this.process.alcadaAprovacaoCompra) {

            var self = this;
            var contadorAlcada = parseInt(self.form.contadorAlcada);
            flagAllBtnAprov();
            btnAprov(true);

            //varificar isso depois
            /* var qnt = $("#tbProdAlterados > tbody > tr:not(:first-child)").length
            if (qnt > 0) {
                $("#analiseProdutosAlterados").show();
            } */

            self.form["dataAprovAlcada" + contadorAlcada] = getCurrentDate();
            self.form["nomeAprovAlcada" + contadorAlcada] = parent.WCMAPI.user;
            $(".navTabsAlcada li:nth-child(" + contadorAlcada + "), .navTabsAlcada div:nth-child(" + contadorAlcada + ")").addClass("active").show();
            //let aprovadores = JSON.parse($('#alcadaAprovacaoCompras').val())
            /* if (contadorAlcada < aprovadores.length - 1) {
                self.form.aprovAlcadaAtual = aprovadores[contadorAlcada + 1].ID
            } else {
                self.form.aprovAlcadaAtual = ''
            } */
            
            if (contadorAlcada < 8 && self.form['idAprovAlcada' + contadorAlcada] == self.form.aprovAlcadaAtual) {
                contadorAlcada++;
                self.form.aprovAlcadaAtual = self.form['idAprovAlcada' + contadorAlcada];
            } else {
                if (contadorAlcada == 8) {
                    self.form.aprovAlcadaAtual = "";
                }
            }

            self.bloqueiaCamposAlcada();
            dadosVencedores();

        } else if (this.atividadeAtual == this.process.alcadaAprovacaoPA) {
            var self = this;
            var contadorAlcada = parseInt(self.form.contadorAlcadaPA);

            flagAllBtnAprov();
            btnAprov(true);
            self.form["dataAprovAlcadaPA" + contadorAlcada] = getCurrentDate();
            self.form["nomeAprovAlcadaPA" + contadorAlcada] = parent.WCMAPI.user;
            $(
                    ".navTabsAlcadaPA li:nth-child(" +
                    contadorAlcada +
                    "), .navTabsAlcadaPA div:nth-child(" +
                    contadorAlcada +
                    ")"
                )
                .addClass("active")
                .show();

            if (
                contadorAlcada < 4 &&
                self.form["idAprovAlcadaPA" + contadorAlcada] ==
                self.form.aprovAlcadaAtualPA
            ) {
                contadorAlcada++;
                self.form.aprovAlcadaAtualPA =
                    self.form["idAprovAlcadaPA" + contadorAlcada];
            } else {
                if (contadorAlcada == 4) {
                    self.form.aprovAlcadaAtualPA = "";
                }
            }
            self.bloqueiaCamposAlcada();
        } else if (this.atividadeAtual == this.process.envia_email_fornecedor) {
            json = $("#listPedidoCompra").val();
            obj = JSON.parse(json);
            for (var k in obj) {
                var index = wdkAddChild("tbPedidosGerados");
                $("#numPedidoCompras___" + index).val(obj[k]);
                $("#nomefornecedorPedido___" + index).val(k);
            }

            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();

            //BOTÃO DE ENVIAR
            addEventSendFluig(function () {
                var avancaGestor = $("#avancaGestor").val("false");
                $("#tbPedidosGerados tbody tr:gt(0)").each(function () {
                    var emailFornVencedorProd = $.trim(
                        $(this).find("[name^=emailFornVencedorProd___]").val()
                    );
                    if (emailFornVencedorProd == "") {
                        true; // Entra no validation form;
                    } else if ($("#isPA").is(" :checked") == true) {
                        limpaAlcada(); // Limpando Alçada de Aprovação anterior
                        buscarGestoresPA();
                        $("#avancaGestor").val("true");
                    }
                });
            });

            dadosVencedores();
        } else if (this.atividadeAtual == this.process.aprovSolicitante) {
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            self.form.idAprovSolicitante = parent.WCMAPI.userCode;
            self.form.nomeAprovSolicitante = parent.WCMAPI.user;
            self.form.dataAprovSolicitante = getCurrentDate();
            btnAprov(false);
            //Inicia pesquisa de satisfação
            initPesquisa();
        } else if (this.atividadeAtual == this.process.aprovacaoGestores) {
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            self.form.idAprovGestor = parent.WCMAPI.userCode;
            self.form.nomeAprovGestor = parent.WCMAPI.user;
            self.form.dataAprovGestor = getCurrentDate();

            btnAprov(true);
            altBtnAprov(
                $("#decisaoGestor").val(),
                "btnAprov",
                "btnReprov"
            );

        } else if (this.atividadeAtual == this.process.inconsistencia) {
            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            altBtnAprov(
                $("#decisaoSolicitante").val(),
                "decisaoSolicitanteBtnAprov",
                "decisaoSolicitanteBtnReprov"
            );
        } else if (
            this.atividadeAtual == this.process.tratativaErroStartAcompanhemento
        ) {
            //BOTÃO DE ENVIAR
            addEventSendFluig(function () {
                dadosVencedores();
            });

            dadosVencedores();
        } else if (
            this.atividadeAtual == this.process.analisarVinculacaoProdFornec
        ) {
            $("#fieldsetObsFiscal").show();
        } else if (
            this.atividadeAtual == this.process.correcaoSolicitante
        ) {
            if( $("#decisaoGestor").val() == "nao" ){
                $("#decisaoGestorBtnReprov").addClass("active");                 
            }else if( $("#decisaoGestor").val() == "sim" ){
                $("#decisaoGestorBtnAprov").addClass("active"); 
            }

            //CONFIGURACOES DOS BOTOES DA ALCADA DE APROVACAO
            flagAllBtnAprov();
            var calendario = FLUIGC.calendar("#dataNecessidade", {
                pickDate: true,
                pickTime: false,
                useCurrent: false,
            });
            var dataAtual = new Date();
            var emergencial = 2;
            var normalProd = 6;
            var normalServ = 10;
            var val = $("#prioridade").val();
            if (val == "E") {
                // Define que o valor mínimo a ser selecionado no calendário:
                dataAtual.setDate(dataAtual.getDate() + diasUteis(emergencial));
                calendario.setMinDate(dataAtual);
            }
            if (val == "N" && $("#codServOuProd").val() == "SV") {
                // Define que o valor mínimo a ser selecionado no calendário:
                dataAtual.setDate(dataAtual.getDate() + diasUteis(normalServ));
                calendario.setMinDate(dataAtual);
            }
            if (val == "N" && $("#codServOuProd").val() != "SV") {
                // Define que o valor mínimo a ser selecionado no calendário:
                dataAtual.setDate(dataAtual.getDate() + diasUteis(normalProd));
                calendario.setMinDate(dataAtual);
            }
            $("#prioridade").change(function () {
                $("#dataNecessidade").val("");
                dataAtual = new Date();
                val = $("#prioridade").val();
                if (val == "E") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(emergencial));
                    calendario.setMinDate(dataAtual);
                    showMessage(
                        "Atenção!",
                        "Solicitação realizada em caráter de emergência somente poderá assim ser classificada, em casos que possam impactar no atendimento assistencial das unidades ou trazer outros riscos significativos para o Grupo Oncoclínicas, a critério da diretoria, desde que sua necessidade seja devidamente justificada pelo solicitante."
                    );
                }
                if (val == "N" && $("#codServOuProd").val() == "SV") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(normalServ));
                    calendario.setMinDate(dataAtual);
                }
                if (val == "N" && $("#codServOuProd").val() != "SV") {
                    // Define que o valor mínimo a ser selecionado no calendário:
                    dataAtual.setDate(dataAtual.getDate() + diasUteis(normalProd));
                    calendario.setMinDate(dataAtual);
                }
            });

            var contadorAlcada = parseInt(self.form.contadorAlcada) - 1;
            if (
                self.form.isAlcadaDiversos == "true" &&
                $("#decisaoAlcada" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcada li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcada div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            var contadorAlcada = parseInt(self.form.contadorAlcadaCarta) - 1;
            if (
                self.form.isAlcadaCarta == "true" &&
                $("#decisaoAlcadaCarta" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcadaCarta li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcadaCarta div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }
            var contadorAlcada = parseInt(self.form.contadorAlcadaPA) - 1;
            if (
                self.form.isAlcadaPA == "true" &&
                $("#decisaoAlcadaPA" + contadorAlcada).val() == "nao"
            ) {
                $(
                        ".navTabsAlcadaPA li:nth-child(" +
                        contadorAlcada +
                        "), .navTabsAlcadaPA div:nth-child(" +
                        contadorAlcada +
                        ")"
                    )
                    .addClass("active")
                    .show();
            }

            readColumn("codProd", function (row, item) {
                $("#qtdProd___" + row).change(function () {
                    var qtdProd = $("#qtdProd___" + row).val();
                    readColumn("codCotacao", function (subRow, subItem) {
                        if (subItem.val() == item.val()) {
                            $("#qtdCotacao___" + subRow).val(qtdProd).change;
                        }
                    });
                });
            });
            var tipoCompras = $("#tipoCompra").val();
            var tipoProd = $("#codServOuProd").val();
            if (tipoCompras != "1" || tipoCompras != "3" || tipoCompras != "5") {
                if (tipoProd != "SV") {
                    FLUIGC.switcher.isReadOnly("#analiseFiscal", true);
                }
            }

            // EXIBINDO CAMPOS PARA CORREÇÃO DO SOLICITANTE
            if ($("#alteraValorCartaExecao").val() == "true") {
                $("#fieldsetFornecedorCotac").show();
                $("#exibeJustificativaCartaExc").show();
                $(".valorProdVenc").show();
                $(".valorTotalVenc").show();
                $(".nomeFornecVenc").show();
                $(".valorTotalSolicitacao").show();
                FLUIGC.switcher.isReadOnly("#isNegociacao", true);
                $("#alterouValorCarta").val("sim");
            }

            // EXIBINDO ALÇADA CARTA EXCEÇÃO EM CASO DE REPROVAÇÃO
            if (
                $("#avancaGestor").val() == "false" &&
                $("#justificaCotacaoMaiorCartaEx").val() == ""
            ) {
                $("#fieldsetAlcadaAprovacao").show();
            }

            addEventSendFluig(function () {
                var prioridade = "N";
                if (self.form.prioridade == "E") {
                    prioridade = "EMERGENCIAL";
                }
                $("#campoIdentificador").val(defineCampoIdentificador());                
                if (self.form.correcaoSolicitacao) {
                    //                    self.form.correcaoSolicitacao = false;
                }
                if (
                    self.form.alteraValorCartaExecao == "true" ||
                    self.form.isFornecedorExclu == true
                ) {
                    /// Valida se passara novamente pela carta de exeção
                    self.setAlcadaAprovacaoCarta();
                }
                self.setAlcadaAprovacaoDiversos();
            });
            // ADICIONA MASCARA NO CAMPO MONETARIO DA CARTA
            adicionaMascaraMonetaria("valorCompraExclu");
            if ($("#hideContratoGuardChuva").val() == "true") {
                $("#valorUnitario___1").parent().parent().children().find("i").hide();
            }
        } else if (this.atividadeAtual == this.process.excecaoGeraTituloPA) {
            $(".fieldsetNumSolicitacao").show();
        }
        if (
            this.atividadeAtual != 0 &&
            this.atividadeAtual != this.process.correcaoSolicitante
        ) {
            self.form.correcaoSolicitacao = false;
            // Removendo a Lixeira da tabela Filiais Guarda-Chuva
            if ($("#isContratoGuardChuva").is(" :checked") == true) {
                var removeLixeiraTbFiliaisGuard = $("table")[0].tHead.firstElementChild
                    .children[0];
                removeLixeiraTbFiliaisGuard.hidden = true;
                $("#tbFiliais .bpm-mobile-trash-column").hide();
            }
            localPrestServi();

            $("#target").prop("readonly", true);
            $("#tipoProjeto").prop("readonly", true);
        }

        if (
            this.atividadeAtual != 0 &&
            this.atividadeAtual != this.process.inicio &&
            this.atividadeAtual != this.process.correcaoSolicitante &&
            this.atividadeAtual != this.process.analiseCompradorCotacao
        ) {
            // Removendo a Lixeira da tabela Produto
            var removeLixeiraTbProd = $("table")[1].tHead.firstElementChild
                .children[0];
            removeLixeiraTbProd.hidden = true;
            $("#tbProd .bpm-mobile-trash-column").hide();

            // Bloqueando campos para edição
            $('input[name^="codProd___"]').each(function () {
                $(this).attr("readonly", "readonly");
            });
        }
        if (
            this.atividadeAtual != 0 &&
            this.atividadeAtual != this.process.analiseCompradorCotacao
        ) {
            // Removendo a Lixeira da tabela Fornecedor
            var removeLixeiraTbProd = $("table")[4].tHead.firstElementChild
                .children[0];
            removeLixeiraTbProd.hidden = true;
            $("#tbFornecedor .bpm-mobile-trash-column").hide();

            // Bloqueando campos para edição
            $('input[name^="fornecedorProtheus___"]').each(function () {
                $(this).attr("readonly", "readonly");
            });
            $('input[name^="condForn___"]').each(function () {
                $(this).attr("readonly", "readonly");
            });
        }
        //CONFIGURAÇÃO DOS BOTÕES SWITCHER
        FLUIGC.switcher.init("#isContratoGuardChuva");
        FLUIGC.switcher.init("#isFornecedorExclu");
        FLUIGC.switcher.init("#isAglutinar");
        FLUIGC.switcher.init("#isPA");
        FLUIGC.switcher.init("#isContrato");
        FLUIGC.switcher.init("#isNovoContratoOuAdt");
        FLUIGC.switcher.init("#isReajusteContrato");
        FLUIGC.switcher.init("#isNegociacao");
        FLUIGC.switcher.init("#isFornecedorExcluClassica");
        FLUIGC.switcher.init("#aprovadorRH");
        FLUIGC.switcher.init("#analiseFiscal");

        //CONFIGURAÇÃO DOS BOTÕES SWITCHER DA ATIVIDADE FORMULÁRIO CONTRATO
        FLUIGC.switcher.init("#chkContratoOuEstatuto");
        FLUIGC.switcher.init("#chkMapaCotOuCartaExce");
        FLUIGC.switcher.init("#chkPropostaComercial");
        FLUIGC.switcher.init("#chkCnds");
        FLUIGC.switcher.init("#chkMinutaContrato");
        FLUIGC.switcher.init("#chkContratoPrincipal");
        FLUIGC.switcher.init("#chkAditivos");

        self.form.isContratoGuardChuva = FLUIGC.switcher.getState(
            "#isContratoGuardChuva"
        );
        FLUIGC.switcher.onChange("#isContratoGuardChuva", function (event, state) {
            self.form.isContratoGuardChuva = state;
            $("#hideContratoGuardChuva").val(state);
            if (state == true) {
                showMessage(
                    "Atenção",
                    "Minuta contratual contempla mais de um <b>CNPJ CONTRATANTE</b> para o mesmo <b>CNPJ CONTRATADO</b>. Caso haja dúvidas, gentileza entrar em contato com a Central de Atendimento, <b>(31) 3308-8080 </b> ou <b> atendimento.cso@oncoclinicas.com</b>."
                );
                //clona Filicial da solicitação para a primeira linha do pai/filho do guarda chuva
                var row = wdkAddChild("tbFiliais");
                window["filialGuardChu___" + row].setValue($("#filial").val());
                $("#codFilialGuardChu___" + row).val($("#codFilial").val());
                $("#cnpjFilial___" + row).val($("#cgcFilial").val());
                getDadosEndereço(row, $("#cgcFilial").val());
                $("#filialGuardChu___" + row)
                    .parent()
                    .parent()
                    .children()
                    .find("i")
                    .hide();
                window["filialGuardChu___" + row].disable(true);
            } else {
                $("table[tablename=tbFiliais] tbody tr").not(":first").remove();
                $("#totalPercFilial").val("0");
            }
        });

        self.form.isFornecedorExclu = FLUIGC.switcher.getState(
            "#isFornecedorExclu"
        );
        FLUIGC.switcher.onChange("#isFornecedorExclu", function (event, state) {
            self.form.isFornecedorExclu = state;
            if (state == false) {
                $("#valorIniciProd").val("");
            }
        });

        self.form.isFornecedorExcluClassica = FLUIGC.switcher.getState(
            "#isFornecedorExcluClassica"
        );
        FLUIGC.switcher.onChange(
            "#isFornecedorExcluClassica",
            function (event, state) {
                self.form.isFornecedorExcluClassica = state;
                self.form.isAlcadaCartaComprador = state;
            }
        );

        self.form.isAglutinar = FLUIGC.switcher.getState("#isAglutinar");
        FLUIGC.switcher.onChange("#isAglutinar", function (event, state) {
            self.form.isAglutinar = state;
        });

        self.form.isPA = FLUIGC.switcher.getState("#isPA");
        FLUIGC.switcher.onChange("#isPA", function (event, state) {
            self.form.isPA = state;
        });

        self.form.chkMinutaContrato = FLUIGC.switcher.getState(
            "#chkMinutaContrato"
        );
        FLUIGC.switcher.onChange("#chkMinutaContrato", function (event, state) {
            self.form.chkMinutaContrato = state;
            if (state) {
                $("#codEspeciais").prop("readonly", false);
            } else {
                $("#codEspeciais").prop("readonly", true);
                $("#codEspeciais").val("");
            }
        });

        self.form.isContrato = FLUIGC.switcher.getState("#isContrato");
        FLUIGC.switcher.onChange("#isContrato", function (event, state) {
            self.form.isContrato = state;
            $("#hideContrato").val(state);
            if (state == true) {
                $("#nomeSolicitAbertaFilho").val(
                    "Numéro da Solicitação Aberta no Fluxo Novo Contrato ou Aditivos:"
                );
                $(".numRgContrato").show();
            } else {
                $("#nomeSolicitAbertaFilho").val("");
                $(".numRgContrato").hide();
            }
        });

        self.form.isNovoContratoOuAdt = FLUIGC.switcher.getState(
            "#isNovoContratoOuAdt"
        );
        FLUIGC.switcher.onChange("#isNovoContratoOuAdt", function (event, state) {
            self.form.isNovoContratoOuAdt = state;
            $("#hideNovoContratoOuAdt").val(state);
            FLUIGC.switcher.setFalse("#chkMinutaContrato");
            FLUIGC.switcher.setFalse("#chkContratoPrincipal");
            FLUIGC.switcher.setFalse("#chkAditivos");
        });

        self.form.isReajusteContrato = FLUIGC.switcher.getState(
            "#isReajusteContrato"
        );
        FLUIGC.switcher.onChange("#isReajusteContrato", function (event, state) {
            self.form.isReajusteContrato = state;
            $("#hideReajusteContrato").val(state);
        });

        self.form.aprovadorRH = FLUIGC.switcher.getState("#aprovadorRH");
        FLUIGC.switcher.onChange("#aprovadorRH", function (event, state) {
            self.form.aprovadorRH = state;
            $("#hiddenAprovadorRH").val(state);
        });

        self.form.analiseFiscal = FLUIGC.switcher.getState("#analiseFiscal");
        FLUIGC.switcher.onChange("#analiseFiscal", function (event, state) {
            self.form.analiseFiscal = state;
            $("#analiseFiscalH").val(state);
            if (!state) {
                $("#fornecedorVincular").val("");
            }
        });

        self.form.isNegociacao = FLUIGC.switcher.getState("#isNegociacao");
        FLUIGC.switcher.onChange("#isNegociacao", function (event, state) {
            self.form.isNegociacao = state;
            $("#hideNegociacao").val(state);
            if (state == true) {
                self.calculaSaving();
            }
        });

        self.form.chkAditivos = FLUIGC.switcher.getState("#chkAditivos");
        FLUIGC.switcher.onChange("#chkAditivos", function (event, state) {
            self.form.chkAditivos = state;
            $("#hideAnexoAditivos").val(state);
        });

        //Botoes de anexo formulario de contrato
        FLUIGC.switcher.onChange("#chkContratoOuEstatuto", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });
        FLUIGC.switcher.onChange("#chkPropostaComercial", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });
        FLUIGC.switcher.onChange("#chkCnds", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });
        FLUIGC.switcher.onChange("#chkMinutaContrato", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });
        FLUIGC.switcher.onChange("#chkContratoPrincipal", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });
        FLUIGC.switcher.onChange("#chkAditivos", function (event, state) {
            if (state == true) {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) + 1;
            } else {
                self.form.qtdAnexoContratos = parseInt(self.form.qtdAnexoContratos) - 1;
            }
        });

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
        // Link para abrir a solicitação iniciada no Fluxo filho de Contratos ou PA
        $("#linkNumSolicitacao").on("click", function () {
            var numSolicitacao = $("#numSolicitAbertaFilho").val();
            var origem = window.location.origin;
            var linkProcess =
                origem +
                "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" +
                numSolicitacao;
            window.open(linkProcess);
        });

        $(".compraObra").toggle($("#tipoCompra").val() == "5");
        $(".compraServico").toggle(
            $("#tipoCompra").val() == "1" || $("#tipoCompra").val() == "4"
        );
        $(".compraDiversos").toggle($("#tipoCompra").val() == "2");
        $(".compraTi").toggle($("#tipoCompra").val() == "3");

        configSelectPaiFilho();
    },
    methods: {
        //ADD PAI FILHOS
        addFilial: function () { // Botão para adicionar Filiais
            var tabela = "tbFiliais";
            var index = wdkAddChild(tabela);
        },
        addProduto: function (produto) { // Botão para adicionar Produto
            var self = this;
            if (produto.type != "click") {
                var produtoExistente = false;
                readColumn("codProd", function (rowProduto, item) {
                    if (item.val() == produto.codProd) {
                        produtoExistente = true;
                        var somaQtd =
                            parseInt(produto.qtdProd) +
                            parseInt($("#qtdProd___" + rowProduto).val());
                        $("#qtdProd___" + rowProduto)
                            .val(somaQtd)
                            .change();
                        $("#itemProd___" + rowProduto).val(
                            rowProduto + " - " + produto.codSolicitacao
                        );
                        return false;
                    }
                });
                if (!produtoExistente) {
                    var row = wdkAddChild("tbProd");
                    window["codProd___" + row].setValue(produto.codProd);
                    $("#nomeProd___" + row).val(produto.nomeProd);
                    $("#unidadeProd___" + row).val(produto.unidadeProd);
                    $("#qtdProd___" + row).val(produto.qtdProd);
                    $("#valorProd___" + row).val(produto.valorProd);
                    $("#valorTotalProd___" + row).val(produto.valorTotalProd);
                    $("#valIpiProd___" + row).val(produto.valIpiProd);
                    $("#fabricanteProd___" + row).val(produto.fabricanteProd);
                    $("#contaContabilProd___" + row).val(produto.contaContabilProd);
                    $("#custoMensalProd___" + row).val(produto.custoMensalProd);
                    $("#cnpjVencedorProd___" + row).val(produto.cnpjVencedorProd);
                    $("#fornecedorVencedorProd___" + row).val(
                        produto.fornecedorVencedorProd
                    );
                    $("#itemProd___" + row).val(row + " - " + produto.codSolicitacao);
                    $("#itemProd___" + row)
                        .parent()
                        .removeClass("min-table-field");
                    $("#itemProd___" + row)
                        .parent()
                        .addClass("med-table-field");
                    $("#valorProd___" + row).change(function () {
                        var rowChange = $(this).prop("name").split("___")[1];
                        self.somaTotalProduto(rowChange);
                    });
                    self.somaTotalProduto(row);
                    if (self.form.tipoCotacao == "tabela") {
                        self.carregaValorProduto([
                            "PRODUTO|" + $("#codProd___" + row).val(),
                        ]);
                    }
                }
            } else {
                var row = wdkAddChild("tbProd");
                $("#itemProd___" + row).val(row);
            }
        },
        addAglutinacao: function () {
            var row = wdkAddChild("tbAgl");
            var self = this;
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
                if (codSolicitacao == self.form.codSolicitacao)
                    algutinacaoExistente = true;
                //ALGUTINAÇÃO REPETIDA
                if (algutinacaoExistente) {
                    showMessage(
                        "Atenção",
                        "Essa solicitação já foi aglutinada.",
                        function () {
                            fnWdkRemoveChild($("#codAgl___" + row)[0]);
                        }
                    );
                    //ADICIONA ALGUTINAÇÃO
                } else {
                    try {
                        var idTable = getInDataset(
                            "ds_comprasDiversos",
                            ["documentid"],
                            ["codSolicitacao|" + codSolicitacao]
                        ).values["0"].documentid;
                        var listProduto = getInDataset("ds_comprasDiversos", null, [
                            "documentid|" + idTable,
                            "tablename|tbProd",
                        ]).values;
                        for (var i in listProduto) {
                            var produtoAtual = listProduto[i];
                            produtoAtual.codSolicitacao = codSolicitacao;

                            if (self.form.tipoCotacao == "fechada") {
                                self.addProduto(produtoAtual);
                            }
                        }
                    } catch (e) {
                        console.log("ERRO PARA AGLUTINAR A SOLICITAÇÃO");
                        console.log("ERRO: " + e);
                    }
                }
            });
        },
        addFornecedor: function (codFornecedor) {
            var self = this;
            var row = null;
            if (codFornecedor != "" && codFornecedor != undefined) {
                if (codFornecedor.type != "click") {
                    try {
                        var fornecedorExistente = false;
                        readColumn("codForn", function (rowForn, itemForn) {
                            if (itemForn.val() == codFornecedor) {
                                fornecedorExistente = true;
                                return false;
                            }
                        });
                        if (!fornecedorExistente) {
                            var fornecedor = getInDataset("ds_Fornecedor", null, [
                                "CODIGO|" + codFornecedor,
                            ]).values[0];
                            row = wdkAddChild("tbFornecedor");
                            self.configFornecedor(row);
                            $("#codForn___" + row).val(fornecedor["CODIGO"]);
                            $("#codIssFornec___" + row).val(fornecedor["CODIGOS_ISS"]);
                            $("#nomeForn___" + row).val(fornecedor["DESCRICAO"]);
                            $("#lojaForn___" + row).val(fornecedor["LOJA"]);
                            $("#cnpjForn___" + row)
                                .val(fornecedor["CGC"])
                                .change();
                            $("#codCondForn___" + row).val(fornecedor["COD_COND_PAGTO"]);
                            $("#condForn___" + row).val(fornecedor["DESC_COND_PAGTO"]);
                            $("#formaForn___" + row)
                                .val(fornecedor["COD_FORM_PAGTO"])
                                .change();
                            $("#itemForn___" + row).val(row);
                        }
                    } catch (e) {
                        showMessage(
                            "Erro",
                            "Ocorreu um erro ao tentar buscar o fornecedor. " + e
                        );
                    }
                } else {
                    row = wdkAddChild("tbFornecedor");
                    exibicaoProdutos(row);
                    self.configFornecedor(row);
                    $("#itemForn___" + row).val(row);
                }
                return row;
            } else {
                return false;
            }
        },
        addDesvinculado: function (desvinculado) {
            var row = wdkAddChild("tbDesvinculado");
            $("#codDesvinculado___" + row).val(desvinculado.codigo);
            $("#nomeDesvinculado___" + row).val(desvinculado.nome);
            $("#qtdDesvinculado___" + row).val(desvinculado.qtd);
            $("#valorDesvinculado___" + row).val(desvinculado.valor);
            $("#valorTotalDesvinculado___" + row).val(desvinculado.valorTotal);
            $("#unidadeDesvinculado___" + row).val(desvinculado.unidade);
            $("#ipiDesvinculado___" + row).val(desvinculado.ipi);
            $("#valIpiDesvinculado___" + row).val(desvinculado.valIpi);
            $("#fabricanteDesvinculado___" + row).val(desvinculado.fabricante);
            $("#contaContabilDesvinculado___" + row).val(desvinculado.contaContabil);
            $("#custoMensalDesvinculado___" + row).val(desvinculado.custoMensal);
            $("#cnpjVencedorDesvinculado___" + row).val(desvinculado.cnpjVencedor);
            $("#codFornVencedorProdDesvinculado___" + row).val(
                desvinculado.codFornVencedorProd
            );
            if (desvinculado.isFechada == "on")
                $("#isFechadaDesvinculado___" + row).prop("checked", true);
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
                self.configCotacao(row);
            }
            $("#hiddenQtdCotacoes").val(
                parseInt($("#tbFornecedor").find("tbody tr").length) - 1
            );
            removeFornecedor();
        },
        openCotacao: function (item, tipoTabela) {
            if (MODO_EDICAO == "VIEW") {
                if (tipoTabela == "produto") {
                    var row = $(item)
                        .closest("tr")
                        .find('[name^="nomeProd___"]')
                        .prop("id")
                        .split("___")[1];
                    this.showModalCotacao(
                        "codCotacao",
                        $("span#codProd___" + row).text(),
                        "COTAÇÃO POR PRODUTO",
                        $("span#nomeProd___" + row).text()
                    );
                } else if (tipoTabela == "fornecedor") {
                    var row = $(item)
                        .closest("tr")
                        .find('[name^="codForn___"]')
                        .prop("id")
                        .split("___")[1];
                    if ($("span#cnpjForn___" + row).text() != "") {
                        this.showModalCotacao(
                            "cnpjFornCotacao",
                            $("span#cnpjForn___" + row).text(),
                            "COTAÇÃO POR FORNECEDOR",
                            $("span#nomeForn___" + row).text()
                        );
                    }
                }
            } else {
                if (tipoTabela == "fornecedor") {
                    var row = $(item)
                        .closest("tr")
                        .find('input[name^="codForn___"]')
                        .prop("name")
                        .split("___")[1];
                    if ($("#cnpjForn___" + row).val() != "") {
                        this.showModalCotacao(
                            "cnpjFornCotacao",
                            $("#cnpjForn___" + row).val(),
                            "COTAÇÃO POR FORNECEDOR",
                            $("#nomeForn___" + row).val()
                        );
                    }
                } else if (tipoTabela == "produto") {
                    var row = $(item)
                        .closest("tr")
                        .find('input[name^="nomeProd___"]')
                        .prop("name")
                        .split("___")[1];
                    this.showModalCotacao(
                        "codCotacao",
                        $("#codProd___" + row).val(),
                        "COTAÇÃO POR PRODUTO",
                        $("#nomeProd___" + row).val()
                    );
                }
            }
        },
        closeCotacao: function () {
            var self = this;
            var rowJustificativa = self.linhaJustificativaCotacao;
            if (
                rowJustificativa != null &&
                $("#justificativaCotacao___" + rowJustificativa).val() == ""
            ) {
                showMessage(
                    "Atenção",
                    "Justificativa é obrigatória para cotações alteradas."
                );
            } else {
                $("#contentCotacao").css("display", "none");
                FLUIGC.switcher.isReadOnly("#isNegociacao", false);
                verificaValorCartaExcec();
                verificaQtdMinimaCotacao();
            }
            self.calculaSaving();
        },
        configCotacao: function (row) {
            var self = this;
            addMaskMonetaria("#valorCotacao___" + row);
            $("#valorCotacao___" + row).change(function () {
                var rowChangeValor = $(this).prop("name").split("___")[1];
                var valorAtual = removeMascaraMonetaria($(this).val());
                var codProdutoAtual = $("#codCotacao___" + rowChangeValor).val();
                var menorValor = null;
                var cnpjVencedor = null;
                var fornecedorVencedor = null;
                var linhaVencedora = null;
                var codFornVencedor = null;
                var emailFornVencedor = null;
                //BUSCA MENOR VALOR DA COTACAO
                readColumn("codCotacao", function (rowCotacao, item) {
                    if (codProdutoAtual == item.val()) {
                        valorAtual = removeMascaraMonetaria(
                            $("#valorCotacao___" + rowCotacao).val()
                        );
                        if (
                            valorAtual != 0 &&
                            (valorAtual < menorValor || menorValor == null)
                        ) {
                            menorValor = valorAtual;
                            cnpjVencedor = $("#cnpjFornCotacao___" + rowCotacao).val();
                            fornecedorVencedor = $(
                                "#fornecedorCotacao___" + rowCotacao
                            ).val();
                            codFornVencedor = $(
                                "#codFornecedorCotacao___" + rowCotacao
                            ).val();
                            emailFornVencedor = $("#emailFornecedor___" + rowCotacao).val();
                            linhaVencedora = rowCotacao;
                        }
                    }
                });

                //SETA O VALOR DA COTACAO VENCEDORA
                if (menorValor != null) {
                    self.checkVencedor(linhaVencedora);
                    readColumn("codProd", function (rowProduto, item) {
                        if (item.val() == codProdutoAtual) {
                            $("#fornecedorVencedorProd___" + rowProduto).val(
                                fornecedorVencedor
                            );
                            $("#cnpjVencedorProd___" + rowProduto).val(cnpjVencedor);
                            $("#codFornVencedorProd___" + rowProduto).val(codFornVencedor);
                            $("#valorProd___" + rowProduto)
                                .val(addMascaraMonetaria(menorValor))
                                .change();
                            $("#cotacaoVencedor").val(addMascaraMonetaria(menorValor));
                            return false;
                        }
                    });
                }
            });

            //GARANTE A JUSTIFICATIVA DE COTACAO ALTERADA
            $("#vencedorCotacao___" + row).change(function () {
                var rowChange = $(this).prop("name").split("___")[1];
                var cotacaoAtual = removeMascaraMonetaria($("#cotacaoVencedor").val());
                var valorVencedorAlterado = removeMascaraMonetaria(
                    $("#valorCotacao___" + rowChange).val()
                );
                self.linhaJustificativaCotacao = null;
                readColumn("valorCotacao", function (rowAtual, item) {
                    if (
                        rowChange != rowAtual &&
                        $("#codCotacao___" + rowAtual).val() ==
                        $("#codCotacao___" + rowChange).val()
                    ) {
                        $("#vencedorCotacao___" + rowAtual).prop("checked", false);
                        if (
                            valorVencedorAlterado >
                            cotacaoAtual /*removeMascaraMonetaria(item.val()) && removeMascaraMonetaria(item.val()) != 0.00 || $("#justificativaCotacao___" + rowChange).val() != ''*/
                        ) {
                            $("#justificativaCotacao___" + rowChange).prop("readonly", false);
                            $(".justificativaCotacao").show();
                            self.linhaJustificativaCotacao = rowChange;
                        } else {
                            $("#justificativaCotacao___" + rowChange)
                                .val("")
                                .prop("readonly", true);
                            $(".justificativaCotacao").hide();
                        }
                    }
                });
                //SETA O VALOR DA COTACAO ALTERADA
                var cadastro = "nao";
                var bool = false;
                readColumn("codProd", function (rowProduto, item) {
                    if (item.val() == $("#codCotacao___" + rowChange).val()) {
                        var cnpjAnterior = $("#cnpjVencedorProd___" + rowProduto).val();
                        $("#fornecedorVencedorProd___" + rowProduto).val(
                            $("#fornecedorCotacao___" + rowChange).val()
                        );
                        $("#cnpjVencedorProd___" + rowProduto).val(
                            $("#cnpjFornCotacao___" + rowChange).val()
                        );
                        $("#valorProd___" + rowProduto)
                            .val(addMascaraMonetaria(valorVencedorAlterado))
                            .change();
                        $("#codFornVencedorProd___" + rowProduto).val(
                            $("#codFornecedorCotacao___" + rowChange).val()
                        );
                    }
                    return false;
                });
            });
        },
        setValorCotacao: function (codFornecedor, codProduto, valor) {
            readColumn("codCotacao", function (row, item) {
                if (
                    codProduto == item.val() &&
                    codFornecedor == $("#codFornecedorCotacao___" + row).val()
                ) {
                    $("#valorCotacao___" + row)
                        .val(addMascaraMonetaria(valor))
                        .change();
                    return false;
                }
            });
        },
        configFornecedor: function (row) {
            var self = this;

            $("#formaForn___" + row + " option").remove();
            $("#formaForn___" + row).append(
                '<option value="" disabled="disabled" selected="selected"></option> <option value="1">Boleto</option> <option value="2">Depósito Bancário</option> <option value="3">Ordem de Pagamento</option>'
            );

            if ($("#fornCadastrado___" + row).val() == 2) {
                $("#fornecedorProtheus___" + row).val("");
                $("#codForn___" + row).val("");
                $("#fornecedorProtheus___" + row)
                    .parent()
                    .parent()
                    .hide();
                $("#fornecedorProtheusSemCadastro___" + row)
                    .parent()
                    .parent()
                    .show();
            } else {
                $("#fornCadastrado___" + row).val(1);
                $("#fornecedorProtheus___" + row)
                    .parent()
                    .parent()
                    .show();
                $("#fornecedorProtheusSemCadastro___" + row)
                    .parent()
                    .parent()
                    .hide();
            }

            $("#tipoFornSemCadast___" + row).change(function () {
                $("#tipoFornSemCadastHidden___" + row).val(this.value);
            });

            $("#fornCadastrado___" + row).change(function () {
                $("#fornCadastradoHidden___" + row).val(this.value);
                $("#nomeForn___" + row).val("");
                $("#emailFornecedor___" + row).val("");
                $("#lojaForn___" + row).prop("disabled", false);
                if ($("#fornCadastrado___" + row).val() == "1") {
                    $("#fornecedorProtheus___" + row)
                        .parent()
                        .parent()
                        .show();
                    $("#fornecedorProtheusSemCadastro___" + row)
                        .parent()
                        .parent()
                        .hide();
                    $("#tipoFornSemCadast___" + row).hide();
                    $("#nomeForn___" + row).prop("readonly", true);
                    $("#cnpjForn___" + row).prop("readonly", true);
                    $("#emailFornecedor___" + row).prop("readonly", true);
                    $("#formaForn___" + row + " option[value='3']").prop(
                        "disabled",
                        false
                    );
                    $("#fornecedorProtheusSemCadastro___" + row).val("");
                    $("#cnpjForn___" + row).val("");
                } else {
                    $("#fornecedorProtheusSemCadastro___" + row)
                        .parent()
                        .parent()
                        .show();
                    $("#fornecedorProtheus___" + row)
                        .parent()
                        .parent()
                        .hide();
                    $("#tipoFornSemCadast___" + row).show();
                    $("#nomeForn___" + row).val("");
                    $("#lojaForn___" + row).prop("disabled", false);
                    $("#formaForn___" + row + " option[value='3']").prop(
                        "disabled",
                        true
                    );
                    $("#nomeForn___" + row).prop("readonly", false);
                    $("#cnpjForn___" + row).prop("readonly", false);
                    $("#lojaForn___" + row).val("01");
                    $("#emailFornecedor___" + row).prop("readonly", false);

                    if ($("#fornecedorProtheus___" + row).val() != "") {
                        deleteFornecedor($("#cnpjForn___" + row));
                        window["fornecedorProtheus___" + row].clear();
                        $("#lojaForn___1" + row).val("");
                    }

                    $("#cnpjForn___" + row).val("");
                }
            });

            $("#fornecedorProtheusSemCadastro___" + row).blur(function () {
                $("#cnpjForn___" + row).val(this.value);
                if ($("#fornecedorProtheusSemCadastro___" + row).val().length == 14) {
                    consultaCNPJ(row);
                } else {
                    $("#nomeForn___" + row).blur(function () {
                        var listProduto = self.getAllItem("Prod");
                        var fornecedor = {
                            cnpj: $("#cnpjForn___" + row).val(),
                            nome: $("#nomeForn___" + row).val(),
                            codForn: $("#codForn___" + row).val(),
                        };
                        if ($("#cnpjForn___" + row).val() != "") {
                            deleteCotacao("cnpjFornCotacao", $("#cnpjForn___" + row).val());
                        }
                        self.addCotacao(listProduto, fornecedor);
                    });
                }
            });

            $("#formaForn___" + row).change(function () {
                $("#formaFornHidden___" + row).val(this.value);
                if ($("#formaForn___" + row).val() == "2") {
                    $("#bancoForn___" + row).val($("#hiddenBancoForn___" + row).val());
                    $("#agenciaForn___" + row).val(
                        $("#hiddenAgenciaForn___" + row).val()
                    );
                    $("#contaForn___" + row).val($("#hiddenContaForn___" + row).val());
                    $("#dvContaForn___" + row).val(
                        $("#hiddenDvContaForn___" + row).val()
                    );
                    $("#dvAgenciaForn___" + row).val(
                        $("#hiddenDvAgenciaForn___" + row).val()
                    );
                    if ($("#fornCadastrado___" + row).val() == "2") {
                        $("#bancoForn___" + row).prop("readonly", false);
                        $("#agenciaForn___" + row).prop("readonly", false);
                        $("#dvAgenciaForn___" + row).prop("readonly", false);
                        $("#contaForn___" + row).prop("readonly", false);
                        $("#dvContaForn___" + row).prop("readonly", false);
                    }
                } else {
                    $("#bancoForn___" + row).val("");
                    $("#agenciaForn___" + row).val("");
                    $("#dvAgenciaForn___" + row).val("");
                    $("#contaForn___" + row).val("");
                    $("#dvContaForn___" + row).val("");

                    if ($("#fornCadastrado___" + row).val() == "1") {
                        $("#bancoForn___" + row).prop("readonly", true);
                        $("#agenciaForn___" + row).prop("readonly", true);
                        $("#dvAgenciaForn___" + row).prop("readonly", true);
                        $("#contaForn___" + row).prop("readonly", true);
                        $("#dvContaForn___" + row).prop("readonly", true);
                    }
                }
            });

            $("#tipoFreteForn___" + row).change(function () {
                $("#freteFornHidden___" + row).val($(this).val());
                self.somaTotalProduto();
            });
            $("#valorFreForn___" + row).change(function () {
                self.somaTotalProduto();
            });
            addMaskMonetaria("#valorIniciProd___" + row);
            addMaskMonetaria("#valorFreForn___" + row);
            FLUIGC.calendar("#prazoForn___" + row, {
                pickDate: true,
                pickTime: false,
                minDate: new Date(),
            });
            $("#cnpjForn___" + row).change(function () {
                var listProduto = self.getAllItem("Prod");
                var fornecedor = {
                    cnpj: $("#cnpjForn___" + row).val(),
                    nome: $("#nomeForn___" + row).val(),
                    codForn: $("#codForn___" + row).val(),
                };
                if ($("#cnpjForn___" + row).val() != "") {
                    deleteCotacao("cnpjFornCotacao", $("#cnpjForn___" + row).val());
                }
                self.addCotacao(listProduto, fornecedor);
            });
        },
        comparacaoFornProd: function (row, listProduto, fornecedor) {
            var self = this;
            var compara = false;
            var rowForn = parseInt(
                $("[name^=cnpjForn___").last().attr("name").split("___")[1]
            );
            var rowProd = parseInt(
                $("[name^=codProd___").last().attr("name").split("___")[1]
            );
            if ($("[name^=codCotacao___").length > 0) {
                var rowCot = parseInt(
                    $("[name^=codCotacao___").last().attr("name").split("___")[1]
                );
                if (rowForn * rowProd == rowCot) {
                    for (i = 1; i <= rowCot; i++) {
                        if (
                            ($("#cnpjFornCotacao___" + i).val() ==
                                $("#cnpjForn___" + row).val() ||
                                $("#fornecedorCotacao___" + i).val() ==
                                $("#nomeForn___" + row).val()) &&
                            $("#codFornecedorCotacao___" + i).val() ==
                            $("#codForn___" + row).val()
                        ) {
                            compara = true;
                            $("#fornecedorCotacao___" + i).val($("#nomeForn___" + row).val());
                            $("#cnpjFornCotacao___" + i).val($("#cnpjForn___" + row).val());
                            $("#codFornecedorCotacao___" + i).val(
                                $("#fornecedorProtheus___" + row).val()
                            );
                        }
                    }
                }
            }
            if (!compara) {
                var fornecedor = {
                    cnpj: $("#cnpjForn___" + row).val(),
                    nome: $("#nomeForn___" + row).val(),
                    codForn: $("#fornecedorProtheus___" + row).val(),
                };
                self.addCotacao(listProduto, fornecedor);
            }
        },
        gerarSolicitacaoDesvinculada: function () {
            var self = this;
            //ANTES DE GERAR A SOLICITAÇÃO, VERIFICA SE ELA JÁ NÃO FOI GERADA
            var dsComprasDivers = getInDataset(
                "ds_comprasDiversos",
                ["codSolicitacao"],
                ["refSolicitacaoDesvinculada|" + self.form.codSolicitacao]
            );
            if (dsComprasDivers.values.length > 0) {
                self.form.codSolicitacaoDesvinculada =
                    dsComprasDivers.values[0].codSolicitacao;
                FLUIGC.toast({
                    message: "A solicitação com os itens desvinculados já existe. " +
                        self.form.codSolicitacaoDesvinculada,
                    type: "warning",
                    timeout: "slow",
                });
            } else {
                var xmlSolicitacao = renderXmlSolicitacaoDiversos(
                    self,
                    self.getAllItem("Desvinculado"),
                    "desvinculado"
                );
                self.iniciaNovaSolicitacao(
                    xmlSolicitacao,
                    //Sucesso
                    function (data) {
                        $(data)
                            .find("key")
                            .each(function (k, v) {
                                if ($(v).text() == "iProcess") {
                                    self.form.codSolicitacaoDesvinculada = $(v).next().text();
                                    return false;
                                }
                            });
                        if (self.form.codSolicitacaoDesvinculada != "") {
                            FLUIGC.toast({
                                message: "A solicitação " +
                                    self.form.codSolicitacaoDesvinculada +
                                    " foi gerada a partir dos itens desvinculados.",
                                type: "success",
                                timeout: "slow",
                            });
                        } else {
                            showMessage(
                                "ERRO",
                                "Erro para gerar a solicitação. Atualize a página ou contate o time de TI"
                            );
                            console.log(data);
                        }
                    },
                    //Erro
                    function (mensg) {
                        showMessage(
                            "ERRO",
                            "Erro para gerar a solicitação. Atualize a página ou contate o time de TI"
                        );
                        console.log(mensg);
                    }
                );
            }
        },
        loadFilialFarm: function () { //carrega filial do solicitante que faz parte dos grupos de farmacia
            var dsGruposUsuario = getInDataset(
                "colleagueGroup",
                ["colleagueGroupPK.groupId"],
                ["colleagueGroupPK.colleagueId|" + this.form.idSolicitante],
                false
            );
            var grupoUsuario = "";
            for (var i in dsGruposUsuario.values) {
                var item = dsGruposUsuario.values[i];
                if (item["colleagueGroupPK.groupId"].indexOf("FARM") != -1) {
                    grupoUsuario = item["colleagueGroupPK.groupId"];
                    dsFilialGrupo = getInDataset(
                        "ds_FilialGrupo",
                        ["codFilial"],
                        ["idGrupoFilial|Pool:Group:" + grupoUsuario]
                    );
                    if (dsFilialGrupo.values.length > 0) {
                        this.setFilialByCode(dsFilialGrupo.values[0].codFilial);
                        break;
                    }
                }
            }
        },
        setFilialByCode: function (codFilial) { //Seta filial na view a partir do codigo do protheus
            var dsFilial = getInDataset("cad_Filiais", null, [
                "filial_protheus|" + codFilial,
            ]);
            if (dsFilial.values.length > 0) {
                var filial = dsFilial.values[0];
                this.form.codFilialFluig = filial.codigo;
                this.form.codFilial = filial.filial_protheus;
                this.form.filial = filial.filial;
                this.form.cnpj_filial = filial.cnpj_filial;
                this.form.ufFilial = filial.uf_filial;
            }
        },
        checkVencedor: function (rowVencedor) {
            $("#vencedorCotacao___" + rowVencedor).prop("checked", true);
            $("#vencedorCotacao___" + rowVencedor).val("on");
            var codVencedor = $("#codCotacao___" + rowVencedor).val();
            readColumn("codCotacao", function (row, item) {
                if (rowVencedor != row && codVencedor == item.val()) {
                    $("#vencedorCotacao___" + row).prop("checked", false);
                    $("#vencedorCotacao___" + row).val("");
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
            });
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
                codFornVencedorProd: $(
                    "#codFornVencedorProd" + nomeTabela + "___" + row
                ).val(),
                fornecedorVencedor: $(
                    "#fornecedorVencedor" + nomeTabela + "___" + row
                ).val(),
                isFechada: $("#isFechada" + nomeTabela + "___" + row).prop("checked") == true ?
                    "on" : "",
                item: $("#item" + nomeTabela + "___" + row).val(),
            };
            return produto;
        },
        showModalCotacao: function (orderBy, value, titulo, subTitulo) {
            readColumn(orderBy, function (row, item) {
                if (MODO_EDICAO == "VIEW") {
                    if (item.text() != value) {
                        item.closest("tr").hide();
                    } else {
                        item.closest("tr").show();
                    }
                } else {
                    if (item.val() != value) {
                        item.closest("tr").hide();
                    } else {
                        item.closest("tr").show();
                    }
                }
            });
            $(".cabecarioModalCotacao h2").text(titulo);
            $(".cabecarioModalCotacao h3").text(subTitulo);
            $("#contentCotacao").css("display", "block");
            if (orderBy == "codCotacao") {
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
            if (dsTabelaPreco.values[0].CODIGO != "") {
                var itemAtual = dsTabelaPreco.values[0];
                if (itemAtual != null) {
                    var rowFornecedor = self.addFornecedor(itemAtual.COD_FORNECEDOR);
                    self.setValorCotacao(
                        itemAtual.COD_FORNECEDOR,
                        itemAtual.PRODUTO,
                        itemAtual.VALOR
                    );
                } else {
                    var codProduto = filtro[0].split("|");
                    FLUIGC.toast({
                        message: "Erro para carregar o valor do produto " + codProduto[1] + ".",
                        type: "danger",
                        timeout: "slow",
                    });
                    console.log("VALOR DO PRODUTO NÃO ENCONTRADO");
                }
            } else {
                var codProduto = filtro[0].split("|");
                FLUIGC.toast({
                    message: "O produto " +
                        codProduto[1] +
                        " NÃO foi localizado nas tabelas de preços.",
                    type: "warning",
                    timeout: "slow",
                });
                console.log("VALOR DO PRODUTO NÃO ENCONTRADO");
            }
        },
        validarAlcadasCompras: function () {
            var self = this;


        },
        setAlcadaAprovacaoDiversos: function () {
            var ObjAprovadores = [];
            var self = this;
            var aprovCarta = [];
            var fornecExclusivo = $("#hideFornecedorExclu").val();
            var valor = removeMascaraMonetaria($("#valorTotalSolicitacao").val());
            var correcaoSolicitacao = $("#correcaoSolicitacao").val();
            $("#erroAprovacao").val("false");

            if (correcaoSolicitacao == "false" && valor != "" && valor != "0") {
                var codFilial = $("#codFilial").val();
                var codCentroCusto = $("#codCentroCusto").val();
                $("#alcada").val("diversos");

                let consFilial = new Array()
                consFilial.push(DatasetFactory.createConstraint('codFilial', codFilial, codFilial, ConstraintType.MUST))
                consFilial.push(DatasetFactory.createConstraint('ativa', 'true', 'true', ConstraintType.MUST))
                ds_paiFilial = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, consFilial, null).values;
                consFilial = new Array()
                consFilial.push(DatasetFactory.createConstraint('documentid', ds_paiFilial[0].documentid, ds_paiFilial[0].documentid, ConstraintType.MUST))

                switch ($("#tipoCompra").val()) {
                    case '1': //servicos
                        consFilial.push(DatasetFactory.createConstraint("tablename", "aprovDiversos", "aprovDiversos", ConstraintType.MUST))
                        var endAprovador = 'Diversos'
                        break;
                    case '2': //diversos  
                        consFilial.push(DatasetFactory.createConstraint("tablename", "aprovDiversos", "aprovDiversos", ConstraintType.MUST))
                        var endAprovador = 'Diversos'
                        break;
                    case '3': //ti
                        consFilial.push(DatasetFactory.createConstraint("tablename", "aprovDiversos", "aprovDiversos", ConstraintType.MUST))
                        var endAprovador = 'Diversos'
                        break;
                    case '4':
                        consFilial.push(DatasetFactory.createConstraint("tablename", "codFilial", "codFilial", ConstraintType.MUST))
                        break;
                    case '5': // obras
                        consFilial.push(DatasetFactory.createConstraint("tablename", "aprovObras", "aprovObras", ConstraintType.MUST))
                        var endAprovador = 'Obras'
                        break;
                }
                let ds_alacadaFilial = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, consFilial, null).values;

                for (const key in ds_alacadaFilial) {
                    if (valor >= removeMascaraMonetaria(ds_alacadaFilial[key]['valor' + endAprovador])) {
                        ObjAprovadores.push({
                            ID: ds_alacadaFilial[key]['codAprovador' + endAprovador],
                            NOME: ds_alacadaFilial[key]['aprovador' + endAprovador]
                        })
                    }
                }

                let consCC = new Array()
                consCC.push(DatasetFactory.createConstraint('codCC', codCentroCusto, codCentroCusto, ConstraintType.MUST))
                consCC.push(DatasetFactory.createConstraint('ativa', 'true', 'true', ConstraintType.MUST))
                var ds_alcadaCC = DatasetFactory.getDataset('ds_alcadaAprovacaoCC', null, consCC, null).values;
                consCC = new Array()
                if (ds_alcadaCC != ""){                                        
                consCC.push(DatasetFactory.createConstraint('documentid', ds_alcadaCC[0].documentid, ds_alcadaCC[0].documentid, ConstraintType.MUST))
                consCC.push(DatasetFactory.createConstraint("tablename", "aprovCentroCustos", "aprovCentroCustos", ConstraintType.MUST))
                var ds_alcadaCC = DatasetFactory.getDataset('ds_alcadaAprovacaoCC', null, consCC, null).values;

                for (const key in ds_alcadaCC) {
                    if (valor > removeMascaraMonetaria(ds_alcadaCC[key]['valor'])) {
                        ObjAprovadores.push({
                            ID: ds_alcadaCC[key]['codAprovadorCC'],
                            NOME: ds_alcadaCC[key]['AprovadorCC']
                        })
                    }
                    }
                }

                // Localiza os aprovadores da filial com base no valor informado
                if (ObjAprovadores.length > 0) {
                    if (self.form.isFornecedorExcluClassica == false) {
                        //Insere o gerente financeiro
                        if (valor > 100000) {
                            if (ds_paiFilial[0].diretorCompras == "") {
                                self.form.isAlcadaDiversos = "erro";
                                self.form.isAlcadaMsg =
                                    "Não existe gerente financeiro cadastrado.";
                            } else if (
                                $("#idSolicitante").val() !=
                                ds_paiFilial[0].codDirCompras
                            ) {
                                var aprovador = new Object();
                                aprovador.ID = ds_paiFilial[0].codDirCompras;
                                aprovador.NOME = ds_paiFilial[0].diretorCompras;
                                ObjAprovadores.unshift(aprovador); //Unshift inseri na primeira posição do array
                            }
                        }
                        //Insere o coordenador de compras como primeiro aprovador
                        if (valor > 50000) {
                            if (ds_paiFilial[0].CordenadorCompras == "") {
                                self.form.isAlcadaDiversos = "erro";
                                self.form.isAlcadaMsg =
                                    "Não existe coordenador de compras cadastrado.";
                            } else if (
                                $("#idSolicitante").val() !=
                                ds_paiFilial[0].codCordenadorCompras
                            ) {
                                var aprovador = new Object();
                                aprovador.ID = ds_paiFilial[0].codCordenadorCompras;
                                aprovador.NOME = ds_paiFilial[0].CordenadorCompras;
                                ObjAprovadores.unshift(aprovador); //Unshift inseri na primeira posição do array
                            }
                        }
                    }
                    //Alçada padrão seguindo seus valores

                    var primeiraAlcada = true;

                    // Retornando um array de gestores sem nomes duplicados por wag
                    /* ObjAprovadores = ObjAprovadores.filter(function (a) {
                        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
                    }, Object.create(null))    */                 

                    arrayGestoresUnicos = {};
                    for (var i = 0; i < ObjAprovadores.length; i++) {
                        if (ObjAprovadores[i].ID) {
                            arrayGestoresUnicos[ObjAprovadores[i].ID] = ObjAprovadores[i].ID;
                        }
                    }
                    gestores = [];
                    for (var key in arrayGestoresUnicos) {

                        gestores.push(key);
                    }

                    //verificar se precisa disso
                    if (self.form.isFornecedorExclu == true && ($("#alterouValorCarta").val() == "sim")) {
                        aprovCarta.forEach(
                            function (item, index) {
                                if (gestores.indexOf(item) != -1) {
                                    var i = gestores.indexOf(item);
                                    gestores.splice(i, 1);
                                }
                            }
                        )
                    }

                    if (self.form.isAlcadaDiversos != "erro" && ObjAprovadores.length > 0) {
                        self.form.isAlcadaDiversos = "true";
                        self.form.maxAlcadaAtual = gestores.length;
                        var contAlcada = 1;
                        self.form.contadorAlcada = 1;
                        /* self.form.aprovAlcadaAtual = ObjAprovadores[0].ID
                        self.form.alcadaAprovacaoCompras = JSON.stringify(ObjAprovadores) */

                        if (self.form.maxAlcadaAtual >= contAlcada) { // Seta o primeiro aprovador
                            self.form.idAprovAlcada1 = gestores[0];
                            self.form.aprovAlcadaAtual = gestores[0];
                            contAlcada = contAlcada + 1;
                        } else {
                            self.form.idAprovAlcada1 = "";
                            self.form.decisaoAlcada1 = "";
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada2 = gestores[1];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada2 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada3 = gestores[2];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada3 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada4 = gestores[3];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada4 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada5 = gestores[4];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada5 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada6 = gestores[5];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada6 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada7 = gestores[6];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada7 = "";
                            contAlcada = contAlcada + 1;
                        }
                        if (self.form.maxAlcadaAtual >= contAlcada) {
                            self.form.idAprovAlcada8 = gestores[7];
                            contAlcada = contAlcada + 1;
    
                        } else {
                            self.form.idAprovAlcada8 = "";
                            contAlcada = contAlcada + 1;
                        }
                    }
                }
            }
        },
        setAlcadaAprovacaoCarta: function () {
            var self = this;
            var codFilial = $("#codFilial").val();
            var valor = removeMascaraMonetaria($("#valorCompraExclu").val());

            let cons = new Array()
            cons.push(DatasetFactory.createConstraint('codFilial', codFilial, codFilial, ConstraintType.MUST))
            cons.push(DatasetFactory.createConstraint('ativa', 'true', 'true', ConstraintType.MUST))
            var ds_alcada = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, cons, null).values;
            cons = new Array()
            cons.push(DatasetFactory.createConstraint('documentid', ds_alcada[0].documentid, ds_alcada[0].documentid, ConstraintType.MUST))
            cons.push(DatasetFactory.createConstraint("tablename", "aprovCartaExcecao", "aprovCartaExcecao", ConstraintType.MUST))
            var ds_alcada = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, cons, null).values;

            // Localiza os aprovadores da filial com base no valor informado
            ObjAprovadores = []
            for (const key in ds_alcada) {
                if (valor >= removeMascaraMonetaria(ds_alcada[key].valorCartaExcecao)) {
                    ObjAprovadores.push({
                        ID: ds_alcada[key].codAprovadorCartaExcecao,
                        NOME: ds_alcada[key].aprovadorCartaExcecao
                    })
                }
            }

            // Retornando um array de gestores sem nomes duplicados
            arrayGestoresUnicos = {};
            for (var i = 0; i < ObjAprovadores.length; i++) {
                arrayGestoresUnicos[ObjAprovadores[i].ID] = ObjAprovadores[i].ID;
            }
            gestores = [];
            for (var key in arrayGestoresUnicos) {
                gestores.push(key);
            }
            self.form.isAlcadaCarta = "none";
            if (gestores.length > 0) {
                self.form.isAlcadaCarta = "true";
                self.form.maxAlcadaAtualCarta = gestores.length;
                var contAlcada = 1;
                self.form.contadorAlcadaCarta = 1;
                if (self.form.maxAlcadaAtualCarta >= contAlcada) {
                    // Seta o primeiro aprovador
                    self.form.idAprovAlcadaCarta1 = gestores[0];
                    self.form.aprovAlcadaAtualCarta = gestores[0];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta1 = "";
                    self.form.motivoAprovAlcadaCarta1 = "";
                } else {
                    self.form.idAprovAlcadaCarta1 = "";
                    self.form.aprovAlcadaAtualCarta = "";
                    self.form.decisaoAlcadaCarta1 = "";
                    self.form.motivoAprovAlcadaCarta1 = "";
                }
                if (self.form.maxAlcadaAtualCarta >= contAlcada) {
                    self.form.idAprovAlcadaCarta2 = gestores[1];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta2 = "";
                    self.form.motivoAprovAlcadaCarta2 = "";
                } else {
                    self.form.idAprovAlcadaCarta2 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta2 = "";
                    self.form.motivoAprovAlcadaCarta2 = "";
                }
                if (self.form.maxAlcadaAtualCarta >= contAlcada) {
                    self.form.idAprovAlcadaCarta3 = gestores[2];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta3 = "";
                    self.form.motivoAprovAlcadaCarta3 = "";
                } else {
                    self.form.idAprovAlcadaCarta3 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta3 = "";
                    self.form.motivoAprovAlcadaCarta3 = "";
                }
                if (self.form.maxAlcadaAtualCarta >= contAlcada) {
                    self.form.idAprovAlcadaCarta4 = gestores[3];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta4 = "";
                    self.form.motivoAprovAlcadaCarta4 = "";
                } else {
                    self.form.idAprovAlcadaCarta4 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta4 = "";
                    self.form.motivoAprovAlcadaCarta4 = "";
                }
                if (self.form.maxAlcadaAtualCarta >= contAlcada) {
                    self.form.idAprovAlcadaCarta5 = gestores[4];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta5 = "";
                    self.form.motivoAprovAlcadaCarta5 = "";
                } else {
                    self.form.idAprovAlcadaCarta5 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaCarta5 = "";
                    self.form.motivoAprovAlcadaCarta5 = "";
                }
            } else {
                this.form.isAlcadaCarta = "erro";
            }
        },
        setAlcadaAprovacaoPA: function () {
            var self = this;

            var isPA = $("#hidePA").val();
            var valor = $("#valorTotalSolicitacao").val();

            if (isPA == "true" && valor != "") {
                var self = this;
                var codFilial = $("#codFilial").val();
                var valor = removeMascaraMonetaria($("#valorTotalSolicitacao").val());

                let cons = new Array()
                cons.push(DatasetFactory.createConstraint('codFilial', codFilial, codFilial, ConstraintType.MUST))
                cons.push(DatasetFactory.createConstraint('ativa', 'true', 'true', ConstraintType.MUST))
                var ds_alcada = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, cons, null).values;
                cons = new Array()
                cons.push(DatasetFactory.createConstraint('documentid', ds_alcada[0].documentid, ds_alcada[0].documentid, ConstraintType.MUST))
                cons.push(DatasetFactory.createConstraint("tablename", "aprovPA", "aprovPA", ConstraintType.MUST))
                var ds_alcada = DatasetFactory.getDataset('ds_alcadaAprovacaoFilial', null, cons, null).values;

                // Localiza os aprovadores da filial com base no valor informado

            }
            ObjAprovadores = []
            for (const key in ds_alcada) {
                if (valor >= removeMascaraMonetaria(ds_alcada[key].valorPA)) {
                    ObjAprovadores.push({
                        ID: ds_alcada[key].codAprovadorPA,
                        NOME: ds_alcada[key].aprovadorPA
                    })
                }
            }

            // Retornando um array de gestores sem nomes duplicados
            arrayGestoresUnicos = {};
            for (var i = 0; i < ObjAprovadores.length; i++) {
                arrayGestoresUnicos[ObjAprovadores[i].ID] = ObjAprovadores[i].ID;
            }
            gestores = [];
            for (var key in arrayGestoresUnicos) {
                gestores.push(key);
            }

            if (gestores.length > 0) {
                self.form.isAlcadaPA = "true";
                self.form.maxAlcadaAtualPA = gestores.length;
                var contAlcada = 1;
                self.form.contadorAlcadaPA = 1;

                if (self.form.maxAlcadaAtualPA >= contAlcada) {
                    // Seta o primeiro aprovador
                    self.form.idAprovAlcadaPA1 = gestores[0];
                    self.form.aprovAlcadaAtualPA = gestores[0];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA1 = "";
                    self.form.motivoAprovAlcadaPA1 = "";
                } else {
                    self.form.idAprovAlcadaCPA1 = "";
                    self.form.aprovAlcadaAtualPA = "";
                    self.form.decisaoAlcadaPA1 = "";
                    self.form.motivoAprovAlcadaPA1 = "";
                }
                if (self.form.maxAlcadaAtualPA >= contAlcada) {
                    self.form.idAprovAlcadaPA2 = gestores[1];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA2 = "";
                    self.form.motivoAprovAlcadaPA2 = "";
                } else {
                    self.form.idAprovAlcadaPA2 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA2 = "";
                    self.form.motivoAprovAlcadaPA2 = "";
                }
                if (self.form.maxAlcadaAtualPA >= contAlcada) {
                    self.form.idAprovAlcadaPA3 = gestores[2];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA3 = "";
                    self.form.motivoAprovAlcadaPA3 = "";
                } else {
                    self.form.idAprovAlcadaPA3 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA13 = "";
                    self.form.motivoAprovAlcadaPA3 = "";
                }
                if (self.form.maxAlcadaAtualPA >= contAlcada) {
                    self.form.idAprovAlcadaPA4 = gestores[3];
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA4 = "";
                    self.form.motivoAprovAlcadaPA4 = "";
                } else {
                    self.form.idAprovAlcadaPA4 = "";
                    contAlcada = contAlcada + 1;
                    self.form.decisaoAlcadaPA4 = "";
                    self.form.motivoAprovAlcadaPA4 = "";
                }
            } else {
                self.form.isAlcadaPA = "false";
                self.form.isAlcadaMsg =
                    "Não foi possivel carregar aprovadores para o PA, favor verificar cadastro de aprovadores!";
            }

        },
        carregaraValorAllProdutos: function (event) {
            if (event.target.value == "tabela") {
                var self = this;
                readColumn("codProd", function (row, item) {
                    self.carregaValorProduto(["COD_PRODUTO|" + item.val()]);
                });
            }
        },
        somaTotalProduto: function (rowProduto) {
            var self = this;
            var valorProduto = removeMascaraMonetaria(
                $("#valorProd___" + rowProduto).val()
            );
            var qtdProduto = $("#qtdProd___" + rowProduto).val();
            var total = 0.0;
            var valorFrete = 0.0;
            var tipoFrete = "";

            $("[name^=fornecedorVencedorProd___]").each(function () {
                var indice = this.name.split("___")[1];
                var emp = $("#fornecedorVencedorProd___" + indice).val();
                $("[name^=nomeForn___]").each(function () {
                    var indice2 = this.name.split("___")[1];
                    if ($("#nomeForn___" + indice2).val() == emp) {
                        valorFrete = $("#valorFreForn___" + indice2).val();
                        tipoFrete = $("#freteFornHidden___" + indice2).val();
                    }
                });
            });
            if (valorProduto != 0 && qtdProduto != "") {
                total = qtdProduto * valorProduto;
                $("#valorTotalProd___" + rowProduto).val(addMascaraMonetaria(total));
            }
            var somaTotal = 0;
            readColumn("valorTotalProd", function (row, item) {
                somaTotal += removeMascaraMonetaria(item.val());
            });
            readColumn("valIpiProd", function (row, item) {
                somaTotal += removeMascaraMonetaria(item.val());
            });
            somaTotal += removeMascaraMonetaria(valorFrete);
            self.form.valorTotalSolicitacao = addMascaraMonetaria(somaTotal);
            verificaQtdMinimaCotacao();
            self.calculaSaving();
        },
        openSolicitacao: function (codSolicitacao) {
            var origem = window.location.origin;
            window.open(
                origem +
                "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" +
                codSolicitacao
            );
        },
        validaUnVigencia: function () {
            var self = this;
            if (self.form.unidadeVigencia == 4) {
                self.form.vigenciaDoContrato = "";
            }
        },
        iniciaNovaSolicitacao: function (xml, callbackSuccess, callbackError) {
            //INICIA SOLICITACAO VINCULADA DA COTACAO FECHADA
            parent.WCMAPI.Create({
                url: "/webdesk/ECMWorkflowEngineService?wsdl",
                contentType: "text/xml;charset=utf-8",
                dataType: "xml",
                data: xml,
                timeout: 20000,
                success: callbackSuccess,
                error: callbackError,
            });
        },
        cancelarSolicitacao: function () {
            //Confirmação para cancelar solicitação
            FLUIGC.message.confirm({
                    message: "Tem certeza que deseja CANCELAR/ENCERRAR esta solicitação?",
                    title: "Cancelar Solicitação",
                    labelYes: "Sim",
                    labelNo: "Não",
                },
                function (result, el, ev) {
                    if (result == true) {
                        $("#isCancelarSolicitacao").val("true");
                        //ENVIA A SOLICITACAO AUTOMATICAMENTE
                        $(
                            "#workflowActions > button:first-child",
                            window.parent.document
                        ).click();
                    }
                }
            );
        },
        disabeldFieldPaiFilho(listField) {
            readColumn(listField[0], function (row) {
                for (var i in listField) {
                    var nameField = listField[i] + "___" + row;
                    $("#" + nameField).prop("readonly", "readonly");
                }
            });
        },
        bloqueiaCamposAlcada: function () {
            FLUIGC.switcher.isReadOnly("#chkContratoOuEstatuto", true);
            FLUIGC.switcher.isReadOnly("#chkPropostaComercial", true);
            FLUIGC.switcher.isReadOnly("#chkCnds", true);
            FLUIGC.switcher.isReadOnly("#chkMinutaContrato", true);
            FLUIGC.switcher.isReadOnly("#chkContratoPrincipal", true);
            FLUIGC.switcher.isReadOnly("#chkAditivos", true);
        },
        calculaSaving: function () {
            var self = this;
            if ($("#hideFornecedorExclu").val() != "true") {
                $("#valorIniciProd").prop("readonly", false);
                var valorTotal = removeMascaraMonetaria(
                    self.form.valorTotalSolicitacao
                );
                var valorInicio = removeMascaraMonetaria($("#valorIniciProd").val());
                if (valorInicio > valorTotal) {
                    var saving = valorInicio - valorTotal;
                    var valorSaving = addMascaraMonetaria(saving);
                    $("#saving").val(valorSaving);
                } else {
                    $("#saving").val("NÃO HOUVE SAVING.");
                }
            } else {
                $("#valorIniciProd").val($("#valorCompraExclu").val());
                $("#valorIniciProd").prop("readonly", true);
                var valorTotal = removeMascaraMonetaria(
                    self.form.valorTotalSolicitacao
                );
                var valorInicio = removeMascaraMonetaria($("#valorIniciProd").val());
                if (valorInicio > valorTotal) {
                    var saving = valorInicio - valorTotal;
                    var valorSaving = addMascaraMonetaria(saving);
                    $("#saving").val(valorSaving);
                } else {
                    $("#saving").val("NÃO HOUVE SAVING.");
                }
            }
        }
    },
    computed: {},
};
//Main
$(document).ready(function () {
    vueApp = new Vue(configApp);
    if ($("#inicioViaWs").val() != "sim") {
        $("#divInfoRenovacao").hide();
    }
    if (
        vueApp.atividadeAtual == vueApp.process.inicio ||
        vueApp.atividadeAtual == 0
    ) {
        $("#msgEmerg").hide();
        /* Bloquear essa seção quando getSLA for ativo (?)*/
        var parametros = getParametrosURL();
        if (parametros.tipoCompra) {
            vueApp.form.tipoCompra = parametros.tipoCompra;
            $("#tipoCompra").val(parametros.tipoCompra);
        } else if (!parametros.tipoCompra && $("#inicioViaWs").val() == "sim") {
            vueApp.form.tipoCompra = "4";
        }
    } else {
        if ($("#prioridadeHidden").val() == "E") {
            $("#bordaEmerg").addClass("bordaEmergencial");
            $("#msgEmerg").show();
        } else {
            $("#bordaEmerg").removeClass("bordaEmergencial");
            $("#msgEmerg").hide();
        }
    }

    // Adicionando máscaras
    if ($("#codFilial").val() == "00104") {
        //So liberar o contrato guardachuva para a filial HOLDING SP
        FLUIGC.switcher.enable("#isContratoGuardChuva");
    } else {
        FLUIGC.switcher.setFalse("#isContratoGuardChuva");
        FLUIGC.switcher.disable("#isContratoGuardChuva");
    }

    if (vueApp.atividadeAtual == vueApp.process.analiseCompradorCotacao) {
        regraContratoAnexo4();
    }

    $("#anexo4").change(function () {
        regraContratoAnexo4();
    });

    $("#anexo5").change(function () {
        if (
            $("input[name='anexo5']:checked").val() == "on" ||
            $("input[name='anexo5']:checked").val() == "ON"
        ) {
            $("#anexoOutros").show();
        } else {
            $("#anexoOutros").hide();
        }
    });

    $("#valorCompraExclu").change(function () {
        $("#hiddenValorCompraExclu").val($("#valorCompraExclu").val());
    });
});

function regraContratoAnexo4() {
    if (
        $("input[name='anexo4']:checked").val() == "on" ||
        $("input[name='anexo4']:checked").val() == "ON"
    ) {
        $("#hiddenAnexo4").val("sim");
        $("#numPropComercial").attr("readonly", false);
    } else {
        $("#hiddenAnexo4").val("nao");
        $("#numPropComercial").attr("readonly", true);
    }
}

function consultaCNPJ(row) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        url: "https://receitaws.com.br/v1/cnpj/" +
            $("#fornecedorProtheusSemCadastro___" + row).val(),
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.status == "ERROR") {
                $("#fornecedorProtheusSemCadastro___" + row).val("");
                $("#nomeForn___" + row).val("");
                $("#cnpjForn___" + row).val("");
                FLUIGC.message.alert({
                        message: "CNPJ inválido! Favor verificar.",
                        title: "Aviso",
                        label: "OK",
                    },
                    function (el, ev) {}
                );
            } else {
                $("#nomeForn___" + row).val(data.nome);
                $("#cnpjForn___" + row).val(data.cnpj.replace(/[^\d]+/g, ""));
                $("#cnpjForn___" + row).change();
            }
        },
        error: function (e) {
            $("#fornecedorProtheusSemCadastro___" + row).val("");
            FLUIGC.message.alert({
                    message: "Favor tentar novamente em alguns minutos",
                    title: "Aviso",
                    label: "OK",
                },
                function (el, ev) {}
            );
        },
    });
}

function trataStarProcess() {
    $("#setRespCompras").val("Pool:Group:CD");
    $("#isProdutoTI").val("nao");
    $("#enviaAnexoContrato").val("true");
    $("#alterouValorCarta").val("nao");
    $("#contadorAlcada").val("0");
    $("#maxAlcadaAtual").val("0");
    $("#contadorAlcadaCarta").val("0");
    $("#maxAlcadaAtualCarta").val("0");
    $("#isAlcadaCarta").val("none");
    $("#alteraValorCartaExecao").val("false");
    $("#isAlcadaCartaComprador").val("false");
    $("#contadorAlcadaPA").val("0");
    $("#maxAlcadaAtualPA").val("0");
    $("#isAlcada").val("none");
    $("#erroAprovacao").val("false");
}

function setSelectedZoomItem(item) {
    var origem = item.inputId.split("___");
    var index = origem[1];
    var name = origem[0];
    var typer = item.inputId;
    //FILIAL
    if (typer == "filial") {
        // if (item.CODIGO == "06601") {
        if( item.DESCRICAO.toLowerCase().indexOf('hospital') >=0) {
            window["filial"].setValue(item.CODIGO + " - " + item.DESCRICAO);
            $("#cgcFilial").val(item.CGC);
            $("#codFilial").val(item.CODIGO);
        } else {
            window["filial"].clear();
        }

    }
    if (typer == "aprovadorArea") {

        $("#codAprovadorArea").val(item.ID);

    }
    //FILIAL PARA CONTRATO GUARDA-CHUVA
    else if (typer == "filialGuardChu___" + index) {
        window["filialGuardChu___" + index].setValue(
            item.CODIGO + " - " + item.DESCRICAO
        );
        $("#codFilialGuardChu___" + index).val(item.CODIGO);
        $("#cnpjFilial___" + index).val(item.CGC);
        // Bloqueia os campos enquanto a consulta é feita.
        if ($("#enderecoFilial___" + index).val() == "") {
            $("#enderecoFilial___" + index).addClass("loadinggif");
        }
        getDadosEndereço(index, item.CGC);
    }
    //CENTRO DE CUSTO
    else if (typer == "centroDeCusto") {
        var codigoCC = item.CODIGO;
        var codFilial = $("#codFilial").val();
        if (
            (codFilial == "00101" || codFilial == "00104") &&
            codigoCC.indexOf("2") == 0
        ) {
            showMessage(
                "Atenção!",
                "Filiais <b>'CSO e HOLDING'</b> não podem selecionar <b>'Centro de Custos'</b> iniciados por 2."
            );
            $("#codCentroCusto").val("").change();
            $("#centroDeCusto").val("").change();
        } else {
            window["centroDeCusto"].setValue(item.CODIGO + " - " + item.DESCRICAO);
            $("#codCentroCusto").val(item.CODIGO);
            vueApp.form.centroDeCusto = item.DESCRICAO;
        }
    }
    //PRODUTO
    else if (typer == $("codProd___" + index).selector) {
        var produtoExistente = false;
        $("[name^=codProd___").each(function () {
            if (item.CODIGO == $(this).val()) {
                produtoExistente = true;
            }
        });
        if (produtoExistente) {
            showMessage(
                "Atenção!",
                "Já foi encontrado o produto <b>" +
                item.CODIGO +
                " - " +
                item.DESCRICAO +
                "</b> na lista de produtos."
            );
            $("#codProd___" + index)
                .val("")
                .change();
        } else {
            var codServOuProd = $("#codServOuProd").val();
            var tipo = item.COD_TIPO; //.toLowerCase();
            var grupo = item.GRUPO;
            //Verifica se o produto é matmed

            if (tipo == "MD" || tipo == "MM" || tipo == "MQ" || tipo == "SO") {
                showMessage(
                    "Atenção!",
                    "Produdos <b>MAT/MED</b> não podem ser selecionados neste fluxo. Favor verificar o produto ou abrir o fluxo de compras MAT/MED."
                );
                window["codProd___" + index].setValue("null");
                $("#nomeProd___" + index)
                    .val("")
                    .change();
                $("#unidadeProd___" + index)
                    .val("")
                    .change();
            } else if ($("#tipoCompra").val() == "1") {
                //Serviço
                if ($("#tbProd tbody tr").length == 2) {
                    codServOuProd = "";
                }
                if (tipo == "SV") {
                    window["codProd___" + index].setValue(item.CODIGO);
                    $("#nomeProd___" + index)
                        .val(item.DESCRICAO)
                        .change();
                    $("#unidadeProd___" + index)
                        .val(item.UM)
                        .change();
                    $("#fabricanteProd___" + index)
                        .val(item.FABRICANTE)
                        .change();
                    $("#contaContabilProd___" + index)
                        .val(item.CCONTABIL)
                        .change();
                    $("#grupoProduto___" + index)
                        .val(item.GRUPO)
                        .change();
                    $("#codServOuProd").val(item.COD_TIPO).change();
                    $("#codIss___" + index)
                        .val(item.COD_ISS)
                        .change();
                    $("#qtdProd___" + index)
                        .val("1")
                        .prop("readonly", true);
                    localPrestServi();
                    existeProdutoTI();
                } else {
                    showMessage(
                        "Atenção!",
                        "Solicitação so permite a inclusão de <b>Serviços</b>."
                    );
                    $("#codProd___" + index)
                        .val("")
                        .change();
                }
            } else if ($("#tipoCompra").val() == "2") {
                //Produto
                if ($("#tbProd tbody tr").length == 2) {
                    codServOuProd = "";
                }
                if (tipo != "SV") {
                    window["codProd___" + index].setValue(item.CODIGO);
                    $("#nomeProd___" + index)
                        .val(item.DESCRICAO)
                        .change();
                    $("#unidadeProd___" + index)
                        .val(item.UM)
                        .change();
                    $("#fabricanteProd___" + index)
                        .val(item.FABRICANTE)
                        .change();
                    $("#contaContabilProd___" + index)
                        .val(item.CCONTABIL)
                        .change();
                    $("#grupoProduto___" + index)
                        .val(item.GRUPO)
                        .change();
                    $("#codServOuProd").val(item.COD_TIPO).change();
                    $("#codIss___" + index)
                        .val(item.COD_ISS)
                        .change();
                    $("#qtdProd___" + index)
                        .val("")
                        .prop("readonly", false);
                    localPrestServi();
                    existeProdutoTI();
                } else {
                    showMessage(
                        "Atenção!",
                        "Solicitação so permite a inclusão de <b>Produtos</b>."
                    );
                    $("#codProd___" + index)
                        .val("")
                        .change();
                }
            } else if ($("#tipoCompra").val() == "3") {
                //TI
                if ($("#tbProd tbody tr").length == 2) {
                    codServOuProd = "";
                }
                if (grupo == "0184") {
                    window["codProd___" + index].setValue(item.CODIGO);
                    $("#nomeProd___" + index)
                        .val(item.DESCRICAO)
                        .change();
                    $("#unidadeProd___" + index)
                        .val(item.UM)
                        .change();
                    $("#fabricanteProd___" + index)
                        .val(item.FABRICANTE)
                        .change();
                    $("#contaContabilProd___" + index)
                        .val(item.CCONTABIL)
                        .change();
                    $("#grupoProduto___" + index)
                        .val(item.GRUPO)
                        .change();
                    $("#codServOuProd").val(item.COD_TIPO).change();
                    $("#codIss___" + index)
                        .val(item.COD_ISS)
                        .change();
                    if (tipo == "SV") {
                        $("#qtdProd___" + index)
                            .val("1")
                            .prop("readonly", true);
                    } else {
                        $("#qtdProd___" + index)
                            .val("")
                            .prop("readonly", false);
                    }
                    localPrestServi();
                    vueApp.form.isProdutoTI = "sim";
                    vueApp.form.decisaoAprovAnaliseTI = "";
                } else {
                    showMessage(
                        "Atenção!",
                        "Solicitação só permite a inclusão de <b>Produtos e Serviços da TI</b>."
                    );
                    $("#codProd___" + index)
                        .val("")
                        .change();
                }
            } else if (
                $("#tipoCompra").val() == "4" ||
                $("#inicioViaWs").val() == "sim"
            ) {
                preencheItemPedido(index, item, tipo);
            } else if ($("#tipoCompra").val() == "5") {
                //Compras Obras
                window["codProd___" + index].setValue(item.CODIGO);
                $("#nomeProd___" + index)
                    .val(item.DESCRICAO)
                    .change();
                $("#unidadeProd___" + index)
                    .val(item.UM)
                    .change();
                $("#fabricanteProd___" + index)
                    .val(item.FABRICANTE)
                    .change();
                $("#contaContabilProd___" + index)
                    .val(item.CCONTABIL)
                    .change();
                $("#grupoProduto___" + index)
                    .val(item.GRUPO)
                    .change();
                $("#codServOuProd").val(item.COD_TIPO).change();
                $("#codIss___" + index)
                    .val(item.COD_ISS)
                    .change();
                localPrestServi();
                existeProdutoTI();
                $("#codIss___" + index).val(item.COD_ISS);

                if (tipo == "SV") {
                    $("#qtdProd___" + index)
                        .val("1")
                        .prop("readonly", true);
                } else {
                    $("#qtdProd___" + index)
                        .val("")
                        .prop("readonly", false);
                }
            } else {
                showMessage(
                    "Atenção!",
                    "Favor abrir solicitação pelo Sistemas de Chamados, selecionado as opções de <b>Produtos</b> ou <b>Serviços</b>"
                );
                $("#codProd___" + index)
                    .val("")
                    .change();
            }
        }
    }
    //FORNECEDOR
    else if (typer == $("fornecedorProtheus___" + index).selector) {
        var aux = $("[id^='codForn___']")
            .toArray()
            .some((e, i, g) => {
                if (e.value == item.CODIGO) {
                    return true;
                }
            });

        if (aux == true) {
            FLUIGC.toast({
                message: "Opção invalida. O c&oacute;digo do fornecedor " +
                    item.CODIGO +
                    " j&aacute; esta na lista de cota&ccedil;&atilde;o.",
                type: "danger",
                timeout: "slow",
            });
            $("#codForn___" + index).val("");
            eval(item.inputId).clear();
        } else {
            $("#codForn___" + index)
                .val(item.CODIGO)
                .change();
            $("#nomeForn___" + index)
                .val(item.DESCRICAO)
                .change();
            $("#lojaForn___" + index)
                .val(item.LOJA)
                .change();
            $("#emailFornecedor___" + index)
                .val(item.EMAIL.trim())
                .change();
            $("#formaForn___" + index)
                .val(item.COD_FORM_PAGTO)
                .change();
            $("#bancoForn___" + index)
                .val(item.BANCO)
                .change();
            $("#agenciaForn___" + index)
                .val(item.AGENCIA)
                .change();
            $("#dvAgenciaForn___" + index)
                .val(item.DV_AGENCIA)
                .change();
            $("#contaForn___" + index)
                .val(item.CONTA)
                .change();
            $("#dvContaForn___" + index)
                .val(item.DV_CONTA)
                .change();
            $("#hiddenBancoForn___" + index)
                .val(item.BANCO)
                .change();
            $("#hiddenAgenciaForn___" + index)
                .val(item.AGENCIA)
                .change();
            $("#hiddenDvAgenciaForn___" + index)
                .val(item.DV_AGENCIA)
                .change();
            $("#hiddenContaForn___" + index)
                .val(item.CONTA)
                .change();
            $("#hiddenDvContaForn___" + index)
                .val(item.DV_CONTA)
                .change();
            $("#cnpjForn___" + index)
                .val(item.CGC)
                .change();
            $("#codIssFornec___" + index)
                .val(item.CODIGOS_ISS)
                .change();
        }
    }
    //FORNECEDOR EXCLUSIVO
    else if (typer == $("fornecedorExclusProtheus").selector) {
        $("#codFornExclus").val(item.CODIGO).change();
        window["fornecedorExclusProtheus"].setValue(item.DESCRICAO);
        // SETANDO INFORMAÇÃO TAMBÉM NA ATIVIDADE DE ANALISE DO COMPRADOR/COTAÇÃO
        var index = "1";
        if ($("#tbFornecedor tbody tr").length == "1") {
            wdkAddChild("tbFornecedor");
            vueApp.configFornecedor(index);
        }
        $("#itemForn___" + index).val(index);
        window["fornecedorProtheus___" + index].setValue(item.CODIGO);
        $("#codForn___" + index)
            .val(item.CODIGO)
            .change();
        $("#nomeForn___" + index)
            .val(item.DESCRICAO)
            .change();
        $("#lojaForn___" + index)
            .val(item.LOJA)
            .change();
        $("#emailFornecedor___" + index)
            .val(item.EMAIL.trim())
            .change();
        $("#formaForn___" + index)
            .val(item.COD_FORM_PAGTO)
            .change();
        $("#bancoForn___" + index)
            .val(item.BANCO)
            .change();
        $("#agenciaForn___" + index)
            .val(item.AGENCIA)
            .change();
        $("#dvAgenciaForn___" + index)
            .val(item.DV_AGENCIA)
            .change();
        $("#contaForn___" + index)
            .val(item.CONTA)
            .change();
        $("#dvContaForn___" + index)
            .val(item.DV_CONTA)
            .change();
        $("#hiddenBancoForn___" + index)
            .val(item.BANCO)
            .change();
        $("#hiddenAgenciaForn___" + index)
            .val(item.AGENCIA)
            .change();
        $("#hiddenDvAgenciaForn___" + index)
            .val(item.DV_AGENCIA)
            .change();
        $("#hiddenContaForn___" + index)
            .val(item.CONTA)
            .change();
        $("#hiddenDvContaForn___" + index)
            .val(item.DV_CONTA)
            .change();
        $("#cnpjForn___" + index)
            .val(item.CGC)
            .change();
        $("#codIssFornec___" + index)
            .val(item.CODIGOS_ISS)
            .change();
    }
    //AGLUTINAÇÃO
    else if (typer == $("codAgl___" + index).selector) {
        if ($("#codAgl___" + index).val() != "") {
            var codAlg = $("#codAgl___" + index).val();
            readColumn("itemProd", function (row, item) {
                if (item.val().indexOf(codAlg) != -1) {
                    fnWdkRemoveChild(item[0]);
                }
            });
        }
        $("#codAgl___" + index)
            .val(item.codSolicitacao)
            .change();
        $("#descAgl___" + index).val(item.campoIdentificador);
    }
    //CONDICAO PAGAMENTO
    else if (typer == $("condForn___" + index).selector) {
        window["condForn___" + index].setValue(item.DESCRICAO);
        $("#codCondForn___" + index)
            .val(item.CODIGO)
            .change();
        // $("#condForn___" + index).val(item.DESCRICAO).change();
    }
    //FORMULARIO DE CONTRATO
    else if (typer == "tipoContrato") {
        $("#codTipoContrato").val(item.CODIGO);
    } else if (typer == "tipoIndice") {
        $("#indice").val(item.CODIGO);
    }
}

function preencheItemPedido(index, item, tipo) {
    window["codProd___" + index].setValue(item.CODIGO);
    $("#nomeProd___" + index)
        .val(item.DESCRICAO)
        .change();
    $("#unidadeProd___" + index)
        .val(item.UM)
        .change();
    $("#fabricanteProd___" + index)
        .val(item.FABRICANTE)
        .change();
    $("#contaContabilProd___" + index)
        .val(item.CCONTABIL)
        .change();
    $("#grupoProduto___" + index)
        .val(item.GRUPO)
        .change();
    $("#codServOuProd").val(item.COD_TIPO).change();
    if (tipo == "SV") {
        $("#qtdProd___" + index)
            .val("1")
            .prop("readonly", true);
    } else {
        $("#qtdProd___" + index)
            .val("")
            .prop("readonly", false);
    }
    localPrestServi();
    existeProdutoTI();
}

function getDadosEndereço(index, cnpj) {
    // Consulta o webservice receitaws.com.br/
    var cnpj = cnpj.replace(/\D/g, "");
    $.ajax({
        type: "get",
        dataType: "jsonp",
        url: "https://receitaws.com.br/v1/cnpj/" + cnpj,
        async: false,
        contentType: "application/json; charset=utf-8",
    }).done(function (data) {
        if (data.status != "ERROR") {
            //Atualiza os campos com os valores da consulta.
            $("#enderecoFilial___" + index).val(
                data.logradouro +
                " " +
                data.numero +
                " - " +
                data.bairro +
                " - " +
                data.municipio +
                "/" +
                data.uf +
                " - " +
                data.cep
            );
        } else {
            showMessage("Erro de CNPJ - ", data.message);
            $("#enderecoFilial___" + index).val("");
        }
        $("#enderecoFilial___" + index).removeClass("loadinggif");
    });
}

function validaGuardaChuva() {
    var t = 0;
    var a = 0;
    var flg = 0;
    $("[name^=valorUnitario___]").each(function () {
        var indice = this.name.split("___")[1];
        a =
            $("#valorUnitario___" + indice).val() == "" ?
            "0" :
            $("#valorUnitario___" + indice).val();
        t = t + Number(a);
        if (t > 100 && flg == 0) {
            showMessage(
                "Erro",
                "O valor do percentual total das filiais não podem ser maior que 100%."
            );
            $("#valorUnitario___" + indice).val("");
            flg = 1;
        }
        if (flg == 0) {
            $("#totalPercFilial").val(t);
        }
    });
}

function removedZoomItem(removedItem) {
    var auxItemId = removedItem.inputId.split("___");
    if (auxItemId[0] == "fornecedorProtheus") {
        deleteFornecedor($("[id^=" + removedItem.inputId + "]"));
        $("#codForn___" + auxItemId[1]).val("");
    }

    if ($("#hiddenQtdCotacoes").val() != "0") {
        $("#hiddenQtdCotacoes").val(
            parseInt($("#tbFornecedor").find("tbody tr").length) - 1
        );
    }

    if (removedItem.inputId == "tipoContrato") {
        $("#codTipoContrato").val("");
    } else if (removedItem.inputId == "tipoIndice") {
        $("#indice").val("");
    } else if (removedItem.inputId.indexOf("codProd___") != -1) {
        var indice = removedItem.inputId.split("___")[1];
        $("#nomeProd___" + indice).val("");
        $("#unidadeProd___" + indice).val("");
        $("#qtdProd___" + indice).val("");

        var listaVazia = true;
        $("[name^=codProd___]").each(function () {
            if ($(this).val()) {
                console.log("#" + $(this).val() + "#");
                listaVazia = false;
                return false;
            }
        });

        if (listaVazia) {
            $("#codServOuProd").val("");
        }
    }
}

function deleteProduto(item) {
    if (vueApp.edicao) {
        fnWdkRemoveChild(item);
        if ($("#tbProd tbody tr").length <= 1) {
            $("#codServOuProd").val("");
            localPrestServi();
        }
    } else {
        if ($("[name^=codProd___]").length > 1) {
            var row = $(item)
                .closest("tr")
                .find('input[name^="itemProd___"]')
                .prop("name")
                .split("___")[1];
            vueApp.addDesvinculado(vueApp.getItem(row, "Prod"));
            vueApp.somaTotalProduto();
            //REMOVE PRODUTO DA COTACAO
            if (vueApp.form.tipoCotacao == "fechada") {
                deleteCotacao("codCotacao", $("codProd___" + row).val());
            }
            fnWdkRemoveChild(item);
        } else {
            FLUIGC.message.alert({
                message: "Você não pode desvincular o último item, você precisa possuir ao menos um produto válido para emissão do pedido",
                title: "Alerta de Produtos",
                label: "OK",
            });
        }
    }
    existeProdutoTI();
}

function deleteAglutinacao(item) {
    var row = $(item)
        .closest("tr")
        .find('select[name^="codAgl___"]')
        .prop("name")
        .split("___")[1];
    var codAlg = $("#codAgl___" + row).val();
    readColumn("itemProd", function (row, item) {
        if (item.val().indexOf(codAlg) != -1) {
            fnWdkRemoveChild(item[0]);
        }
    });
    fnWdkRemoveChild(item);
}

function deleteFornecedor(item) {
    var row = $(item)
        .closest("tr")
        .find('input[name^="codForn___"]')
        .prop("name")
        .split("___")[1];
    var cnpjForn = $("#cnpjForn___" + row).val();
    //Caso o fornecedor deletado seja o vencedor ele é removido
    readColumn("cnpjVencedorProd", function (rowProduto, item) {
        if (item.val() == cnpjForn) {
            $("#fornecedorVencedorProd___" + rowProduto).val("");
            $("#cnpjVencedorProd___" + rowProduto).val("");
            $("#valorProd___" + rowProduto)
                .val(addMascaraMonetaria("0"))
                .change();
        }
    });
    //    cnpjFornCotacao___
    //Deleta todas as cotações do fornecedor
    if (vueApp.form.tipoCotacao == "fechada") {
        deleteCotacao("cnpjFornCotacao", cnpjForn);
    }
    if (cnpjForn != "") {
        if (
            $("#hiddenQtdCotacoes").val() != "0" &&
            $("#fornecedorProtheus___" + row).val() != null
        ) {
            $("#hiddenQtdCotacoes").val(
                parseInt($("#tbFornecedor").find("tbody tr").length) - 1
            );
        }
    }
    fnWdkRemoveChild(item);
    verificaQtdMinimaCotacao();
}

function deleteCotacao(nomeCampo, valor) {
    var linhaAtiva = "";
    readColumn(nomeCampo, function (row, item) {
        if (item.val() == valor) {
            fnWdkRemoveChild(item[0]);
        } else {
            linhaAtiva = row;
        }
    });
    $("#valorCotacao___" + linhaAtiva).trigger("change");
}

function configSelectPaiFilho() {
    //Select forma pagamento e frete
    readColumn("formaForn", function (row, item) {
        item.val($("#formaFornHidden___" + row).val());
        item.change(function () {
            $("#formaFornHidden___" + row).val($(this).val());
        });
        $("#tipoFreteForn___" + row).change(function () {
            $("#freteFornHidden___" + row).val($(this).val());
        });
    });
}

// Realiza o Cálculo dos valores de cada filial
function calcValorFilial(oElement) {
    fnWdkRemoveChild(oElement); // Função padrão da lixeira
    validaGuardaChuva();
    var valores = 0;
}

// Exibe campo local de prestação de serviços
function localPrestServi() {
    if ($("#codServOuProd").val() == "SV") {
        $(".classLocalPrestServico").show();
    } else {
        $(".classLocalPrestServico").hide();
    }
}

/**
 * Verifica na tabela se existe algum produto relacionado a TI. Se existir o
 * campo isProdutoTI no formulário é setado TRUE
 *
 */
function existeProdutoTI() {
    var idGrupoTI = "0184";
    var isProdutoTI = false;
    $("#tbProd tbody tr:gt(0)").each(function () {
        var grupoAtual = $.trim($(this).find("[name^=grupoProduto___]").val());
        if (grupoAtual == idGrupoTI) {
            isProdutoTI = true;
        }
    });
    if (isProdutoTI) {
        vueApp.form.isProdutoTI = "sim";
        vueApp.form.decisaoAprovAnaliseTI = "";
    } else {
        vueApp.form.isProdutoTI = "nao";
    }
}

function verificaQtdMinimaCotacao() {
    var somaTotal = removeMascaraMonetaria($("#valorTotalSolicitacao").val());
    var rowTbFornecedor = $("#tbFornecedor tbody tr:gt(0)").length;
    if (
        ((somaTotal > 1000 && somaTotal <= 10000 && rowTbFornecedor < "2") ||
            (somaTotal >= 10000 && rowTbFornecedor <= "2")) &&
        /*vueApp.form.isFornecedorExclu == false*/
        $(
            "#hideFornecedorExclu"
        ).val() == "false"
    ) {
        $("#exibeCpJustificativaComprador").show();
    } else {
        $("#exibeCpJustificativaComprador").hide();
    }
}

// BLOQUEANDO O CAMPO DESCRIÇÃO AO MARCAR A OPÇÃO 'OUTROS' DA CARTA DE EXCEÇÃO
function alteraCampoDescri(campo) {
    var idCampo = campo.id;
    var campoDescricao = idCampo.split("exclu")[1];
    if ($("#" + idCampo).is(" :checked") == true) {
        $("#descriExclu" + campoDescricao).prop("readonly", false);
        $("#descriExclu" + campoDescricao).val("");
    } else {
        $("#descriExclu" + campoDescricao).prop("readonly", true);
        $("#descriExclu" + campoDescricao).val("");
    }
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

function verificaValorCartaExcec() {
    var valorCompraExclu = removeMascaraMonetaria($("#valorCompraExclu").val());
    var valorTotalSolicitacao = removeMascaraMonetaria(
        $("#valorTotalSolicitacao").val()
    );

    if (
        valorTotalSolicitacao > valorCompraExclu &&
        $("#hideFornecedorExclu").val() == "true"
    ) {
        vueApp.form.alteraValorCartaExecao = "true";
        $("#exibeJustificativaCartaExc").show();
        vueApp.form.alterouValorCarta = "sim";
    } else {
        vueApp.form.alteraValorCartaExecao = "false";
        $("#exibeJustificativaCartaExc").hide();
        vueApp.form.alterouValorCarta = "nao";
    }
}

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validacaoEmail(field) {
    const todosEmailsValidos = (field && field.value && field.value.split(';').every((email => email.length > 0 && emailValido(email.trim()))));
    const campoValidaEmail = $("#validaEmail");
    if (todosEmailsValidos) {
        campoValidaEmail && campoValidaEmail.val("E-mail válido");
    } else {
        FLUIGC.toast({
            title: "E-mail inválido.",
            message: "Favor verificar.",
            type: 'warning',
            timeout: 5000
        });
        campoValidaEmail && campoValidaEmail.val("");
        if (field && field.value) {
            field.value = "";
        }
    }
}

function solicitanteDifGrupoObras(userId) {
    var resultado = true;
    var c1 = DatasetFactory.createConstraint(
        "colleagueGroupPK.groupId",
        "HOFAC",
        "HOFAC",
        ConstraintType.MUST
    );
    var c2 = DatasetFactory.createConstraint(
        "colleagueGroupPK.colleagueId",
        userId,
        userId,
        ConstraintType.MUST
    );
    var datasetColleagueGroup = DatasetFactory.getDataset(
        "colleagueGroup",
        null,
        new Array(c1, c2),
        null
    ).values;

    if (datasetColleagueGroup.length == 1) {
        resultado = false;
    }

    return resultado;
}

// Envio de email para o fornecedor vencedor
function sendEmailCotacao() {
    var tbPedidosGerados = $("#tbPedidosGerados tbody tr:gt(0)").length;
    if (tbPedidosGerados > 0) {
        $("#tbPedidosGerados tbody tr:gt(0)").each(function () {
            var codFilial = $("#codFilial").val();
            var pedidoGerado = $.trim($(this).find("[name^=numPedidoCompras]").val());
            var nomeFornecedor = $.trim(
                $(this).find("[name^=nomefornecedorPedido]").val()
            );
            var emailFornecedor = $.trim(
                $(this).find("[name^=emailFornVencedorProd]").val()
            );
            var copiaEmailSolicitante = $("#emailContatSolicitante").val();
            if (emailFornecedor != "") {
                enviaCorpoEmail(
                    codFilial,
                    pedidoGerado,
                    emailFornecedor + ";" + copiaEmailSolicitante,
                    nomeFornecedor
                );
            } else {
                FLUIGC.message.alert({
                    message: "Favor informar ao menos um destinatário para o email",
                    title: "Nenhum Destinatário Informado",
                    label: "OK",
                });
            }
        });
    } else {
        FLUIGC.message.alert({
            message: "Favor selecionar ao menos um pedido de compra para enviar por e-mail",
            title: "Nenhum Pedido de Compras Selecionado",
            label: "OK",
        });
    }

    function enviaCorpoEmail(codFilial, pedidoGerado, email, nomeFornecedor) {
        let json = {
            assunto: "Pedido Compras Oncoclinicas",
            destinatario: email.split(";"),
            template: "templateEmailPadrao",
            sender: parent.WCMAPI.userCode,
            html: `<p>Prezados(as),</p
            <p>Segue abaixo pedido de compras conforme proposta negociada. </p>
            <p>Favor conferir todos os dados cadastrais e comerciais.</p>
            <p>Atenção:</p>
            <p>1) Não aceitamos notas fiscais com divergência de valores, prazo de pagamento, tipo de frete, CNPJ, CFOP e impostos.</p>
            <p>2) É Obrigatório inserir o número deste pedido de compras na nota fiscal.</p>
            <p>3) Notas fiscais de serviços devem ser emitidas somente até o dia 21 do mês corrente, notas entre os dias 21 e 31 não serão aceitas.</p>
            <p>Em caso de dúvidas favor contatar o time de Compras Diversas através do e-mail: comprasdiversas@oncoclinicas.com, ou (31) 3308-8080.</p>`,
        };
        var nomePedido =
            "Pedido Compras " +
            nomeFornecedor +
            " - " +
            codFilial +
            " - " +
            pedidoGerado +
            ".pdf";

        var anexos = parent.ECM.WKFViewAttachment.attachmentsDocs;
        for (const key in anexos) {
            if (Object.hasOwnProperty.call(anexos, key)) {
                const element = anexos[key];
                if (element.description.indexOf("Pedido_Compras_") > -1) {
                    var documentId = element.documentId;
                }
            }
        }
        var link;
        $.ajax({
            async: false,
            type: "GET",
            dataType: "json",
            url: window.location.origin +
                "/api/public/2.0/documents/getDownloadURL/" +
                documentId,
        }).done(function (doc) {
            var anexo =
                '<a href="' +
                doc.content +
                '" download="' +
                nomePedido +
                '">' +
                nomePedido +
                "</a>";
            json.html += anexo;
        });

        var cons = DatasetFactory.createConstraint(
            "JSON",
            JSON.stringify(json),
            "",
            ConstraintType.MUST
        );
        var ds_envioEmail = DatasetFactory.getDataset(
            "ds_envioEmail",
            null,
            [cons],
            null
        ).values;

        if (ds_envioEmail[0].SUCESSO == "TRUE") {
            FLUIGC.toast({
                title: "Sucesso",
                message: "Email enviado com sucesso",
                type: "success",
            });
            $("#emailEnviado").val("true");
            $("#enviarEmailCotacao").attr("disabled", "disabled");
        } else {
            FLUIGC.toast({
                title: "Erro",
                message: "Ocorreu um erro ao enviar o e-mail",
                type: "danger",
            });
        }
    }
}

function totalProdutosReceber() {
    var totalProd = 0;
    $("[name^=codProd___]").each(function () {
        totalProd++;
    });

    $("#totalLinhaProdutos").val(totalProd);
}

function dadosVencedores() {
    var dadosGerarAcompanhamento = [];
    var excluisvosFornecedores = [];
    var acompanhementos = [];

    $("[name^=cnpjVencedorProd___]").each(function () {
        var indice = this.name.split("___")[1];
        var fornecedor = buscaNomePrazoEntregaVencedor(this.value);
        var vencedor = {
            codFornecedor: this.value,
            fornecedor: fornecedor.descricao,
            codProduto: $("#codProd___" + indice).val(),
            descProduto: $("#nomeProd___" + indice).val(),
            prazoEntrega: fornecedor.prazo,
            quantidade: $("#qtdProd___" + indice).val(),
            unidade: $("#unidadeProd___" + indice).val(),
        };

        dadosGerarAcompanhamento.push(vencedor);
    });

    dadosGerarAcompanhamento.forEach((element) => {
        if (!excluisvosFornecedores.includes(element.codFornecedor)) {
            excluisvosFornecedores.push(element.codFornecedor);
        }
    });

    excluisvosFornecedores.forEach((element) => {
        var fltro = dadosGerarAcompanhamento.filter(function (map) {
            if (map.codFornecedor == element) {
                return map;
            }
        });
        acompanhementos.push(fltro);
    });

    $("#qtdeAcompAGerar").val(acompanhementos.length);
    $("#jsonAcompanhamento").val(JSON.stringify(acompanhementos));
    $("#linkParaChamadoCompras").val("" + window.location.origin);
}

function buscaNomePrazoEntregaVencedor(params) {
    var retorno = {
        prazo: "",
        descricao: "",
    };

    $("[name^=cnpjForn___]").each(function () {
        var indice = this.name.split("___")[1];
        if (this.value == params) {
            retorno.prazo = $("#prazoForn___" + indice).val();
            retorno.descricao = $("#nomeForn___" + indice).val();
            return retorno;
        }
    });

    return retorno;
}

function removeFornecedor() {
    var todosFornecedores = [];
    $("[name^=cnpjForn___]").each(function () {
        var indice = this.name.split("___")[1];
        if (this.value != "") {
            todosFornecedores.push(this.value);
        }
    });

    $("[name^=cnpjFornCotacao___]").each(function () {
        var indice = this.name.split("___")[1];
        console.log("cnpjFornCotacao___" + indice + " - " + this.value);
        if (!(todosFornecedores.indexOf(this.value) > -1)) {
            deleteCotacao("cnpjFornCotacao", this.value);
        }
    });
}

function exibicaoProdutos(row) {
    var arrayFiltroIss = [];
    var filtro = "";

    $("[name^=codIss___]").each(function () {
        var indice = this.name.split("___")[1];
        if (!arrayFiltroIss.includes(this.value)) {
            arrayFiltroIss.push(this.value);
        }
    });

    arrayFiltroIss.forEach((element) => {
        filtro += "CODIGOS_ISS," + element + ",";
    });

    reloadZoomFilterValues("fornecedorProtheus___" + row, filtro);
}

function definePrioridade() {

    var dataSelecionada = $("#dataNecessidade").val();

    $("input[name=prioridade]").change(function () {
        $('#prioridadeHidden').val($("[name='prioridade']:checked").val())
        $("#dataNecessidade").val("");

        var calendario = FLUIGC.calendar("#dataNecessidade", {
            pickDate: true,
            pickTime: false,
            useCurrent: false
        });

        var dataAtual = new Date();
        var emergencial = 2;
        var normalProd = 6;
        var normalServ = 10;

        var val = $("#prioridadeHidden").val();
        if (val == "E") {
            // Define que o valor mínimo a ser selecionado no calendário:
            dataAtual.setDate(dataAtual.getDate() + diasUteis(emergencial));
            calendario.setMinDate(dataAtual);
            showMessage("Atenção!", "Solicitação realizada em caráter de emergência somente poderá assim ser classificada, em casos que possam impactar no atendimento assistencial das unidades ou trazer outros riscos significativos para o Grupo Oncoclínicas, a critério da diretoria, desde que sua necessidade seja devidamente justificada pelo solicitante.");
        }
        if (val == "N" && $("#codServOuProd").val() == "SV") {
            // Define que o valor mínimo a ser selecionado no calendário:
            dataAtual.setDate(dataAtual.getDate() + diasUteis(normalServ));
            calendario.setMinDate(dataAtual);
        }
        if (val == "N" && $("#codServOuProd").val() != "SV") {
            // Define que o valor mínimo a ser selecionado no calendário:
            dataAtual.setDate(dataAtual.getDate() + diasUteis(normalProd));
            calendario.setMinDate(dataAtual);
        }

        if ($('#prioridadeHidden').val() == 'E') {
            $('#bordaEmerg').addClass('bordaEmergencial')
            $("#msgEmerg").show();
            $("#statusPrioridade").val('EMERGENCIAL');
        } else {
            $('#bordaEmerg').removeClass('bordaEmergencial')
            $("#msgEmerg").hide();
            $("#statusPrioridade").val('N');
        }

        $("#campoIdentificador").val(defineCampoIdentificador());

    });

    $("input[name=prioridade]").change();
    $("#dataNecessidade").val(dataSelecionada);
}

function defineCampoIdentificador() {

    let idTipoCompra = $("#tipoCompra").val();
    let tipoCompra = '';
    let prioridade = 'N';
    if ($('#statusPrioridade').val() == 'EMERGENCIAL') {
        prioridade = 'E'
    }
    if (idTipoCompra == '1') {
        tipoCompra = 'Serviço'
    } else if (idTipoCompra == '2') {
        tipoCompra = 'Material'
    } else if (idTipoCompra == '3') {
        tipoCompra = 'TI'
    } else if (idTipoCompra == '5') {
        tipoCompra = 'Obras'
    }

    return (prioridade + " - " + $('#filial').val() + ' - ' + tipoCompra);
}