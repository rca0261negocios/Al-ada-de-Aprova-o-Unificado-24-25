class GDE {
    getConfig() {
        var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
        var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, [cst], null).values;
        $('#cpAprovadorRegularizadora').val(dataset[0].cpIdAprovadorRegularizadora);
        $('#cpTetoAutonomia').val(dataset[0].cpTetoRegularizadora)
    }
}

class Gds extends GDE {    
    // Carrega as informaçoes do pedido de compras
    carregarItensPedidoCompras(idPedidoCompras) {        
        var aux = new Auxiliar();
        var cons = [];
        var that = this;
        cons.push(DatasetFactory.createConstraint('PEDIDO', idPedidoCompras, idPedidoCompras, ConstraintType.MUST));
        cons.push(DatasetFactory.createConstraint('FILIAL', $('#cpCodFilial').val(), $('#cpCodFilial').val(), ConstraintType.MUST));
        cons.push(DatasetFactory.createConstraint('COD_FORNECEDOR', $('#cpCodFornecedor').val(), $('#cpCodFornecedor').val(), ConstraintType.MUST));
        var dsPedido = DatasetFactory.getDataset('ds_produtoPedidoCompra', null, cons, null).values;
     
        var despesas = 0;
        var frete = 0;
        var ipi = 0;
        
        for (const i in dsPedido) {
            let pegaCodProd = dsPedido[i].COD_PRODUTO

            if (pegaCodProd < "000100") {
                FLUIGC.message.alert({
                    message: 'Este produto não pode ser adicionado no  processo GDE.Se refere a um serviço prestado(faturamento) e não a um serviço recebido.',
                    title: 'Atenção !!!',
                    label: 'OK'
                }, function (el, ev) {
                    // window['zoomProduto___' + index].clear();
                });
            } else {
                $('#cpPrioridade').val(aux.normalizeString(dsPedido[i].PRIORIDADE))
                $('#cpCodCondPagamento').val(dsPedido[i].COD_COND_PAGTO)
                $('#cpCodCondPagamento_aux').val(dsPedido[i].COD_COND_PAGTO)
                $('#cpCondicaoPagamento').val(aux.normalizeString(dsPedido[i].DESC_COND_PAGTO))
                var index = wdkAddChild("tbItensGds");
                $('.fs-md-space').removeClass('fs-md-space');
                $('#indiceGds').val(index)
                $('#cpItem___' + index).val(dsPedido[i].ITEM);
                $('#cpCodProduto___' + index).val(dsPedido[i].COD_PRODUTO);
                $('#cpProduto___' + index).val(aux.normalizeString(dsPedido[i].DESC_PRODUTO));               
                $('#cpQuantPedido___' + index).val(dsPedido[i].QUANTIDADE);
                $('#cpVlrUnit___' + index).val(aux.convertReal(dsPedido[i].VLR_UNITARIO));
                $('#cpVlrDesc___' + index).val(aux.convertReal(dsPedido[i].VLR_DESCONTO));
                $('#cpCentroCusto___' + index).val(aux.normalizeString(dsPedido[i].DESC_CENTRO_CUSTO));
                $('#cpCodCentroCusto___' + index).val(dsPedido[i].COD_CENTRO_CUSTO);
    
                frete = parseFloat(dsPedido[i].FRETE);
                if (dsPedido[i].IPI != '' && dsPedido[i].IPI != ' ') {
                    var percentual = dsPedido[i].IPI / 100;
                    ipi += (parseFloat(dsPedido[i].VLR_UNITARIO) * percentual)
                    $('#cpIpi').val(ipi)
                };
                if (dsPedido[i].DESPESA != '' && dsPedido[i].DESPESA != ' ') {
                    despesas += parseFloat(dsPedido[i].DESPESA)
                };
                $('#cpQuantEntrada___' + index).change(function () {
                    that.evtTableItens(this)
                })
                $('#cpVlrUnit___' + index).change(function () {
                    that.evtTableItens(this)
                })
            }     
        }
        this.carregarInfoPedido(dsPedido)
        $('#cpVlrDespesas').val(aux.convertReal(despesas));
        $('#cpVlrFrete').val(aux.convertReal(frete))
        $('#cpVlrIpi').val(aux.convertReal(ipi))
        var total = despesas + frete + ipi;
        $('#cpTotal').val(aux.convertReal(total))
    }

    //Carrega as informaçoes sobre a data de pagamento
    carregarInfoPedido(dataset) {
        if (dataset[0].PEDIDO != '') {
            // carega as informaçoes dobre o tipo de lançamento
            var cons = [];
            // cria as constraints de produtos
            for (var i in dataset) {
                cons.push(DatasetFactory.createConstraint('CODIGO', dataset[0].COD_PRODUTO, dataset[0].COD_PRODUTO, ConstraintType.MUST));
            }
            var dsProduto = DatasetFactory.getDataset('ds_produto', null, cons, null).values;
            // valida se os produtos sao validos
            var produtosValidos = new Validacao().validaProdutos(dsProduto)

            $('#cpTipoLancamento').val(dsProduto[0].DESC_TIPO)
            if (produtosValidos == false) {
                FLUIGC.message.alert({
                    message: 'O pedido Contém Produtos ou serviços Que Não Podem Ser Utilizados Nessa Solicitação. ',
                    title: 'Atenção !!!',
                    label: 'OK'
                }, function (el, ev) {
                    $('#tbItensReg tbody tr').not(':first').remove();
                    $('#tbItensGds tbody tr').not(':first').remove();
                    window['zoomPedidoComp'].clear();
                    $('#cpVlrMercadoria').val('R$ 0,00');
                    $('#cpDescontoTotais').val('R$ 0,00');
                    $('#cpVlrBruto').val('R$ 0,00');
                    $('#cpCodCondPagamento').val('')
                    $('#cpTipoLancamento').val('')
                });
            }
        }
    }

    // calcula se a nota fiscal esta atrasada ou com menos de 7 dias para o pagamento e abilita os campos de atrazo no formulario
    verificaVencimento() {
        //captura a data de Vencimento e de abertura do chamado
        // var aux = new Auxiliar()
        // if ($('#dtEmissao').val() != '') {
        //     $('#dtPagamento').val('')
        //     var cons = [];
        //     cons.push(DatasetFactory.createConstraint('VALOR', 1, 1, ConstraintType.MUST));
        //     cons.push(DatasetFactory.createConstraint('COD_COND_PAGTO', $('#cpCodCondPagamento').val(), $('#cpCodCondPagamento').val(), ConstraintType.MUST));
        //     var dataEmissao = $('#dtEmissao').val();
        //     dataEmissao = dataEmissao.split('-')[2] + '/' + dataEmissao.split('-')[1] + '/' + dataEmissao.split('-')[0]
        //     cons.push(DatasetFactory.createConstraint('DT_EMISSAO', dataEmissao, dataEmissao, ConstraintType.MUST));
        //     var dsDataVencimento = DatasetFactory.getDataset('ds_dataVencimento', null, cons, null).values;
        //     var dtVencimento = aux.convertStringDate(dsDataVencimento[0].DT_VENCIMENTO);
        //     $('#dtVencimento').val(aux.convertDateString(dtVencimento));

        //     var dia = $('#dtVencimento').val().split('-')[2];
        //     var mes = parseInt($('#dtVencimento').val().split('-')[1]) - 1;
        //     var ano = $('#dtVencimento').val().split('-')[0];
        //     var dtLimite = new Date(ano, mes, dia)

        //     // consulta os prazo definido no fichario
        //     var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
        //     var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, [cst], null).values;
        //     // pega a data de vencimento e decreace os os dias definidos no prazo
        //     var prazoMinimo = parseInt(dataset[0].cpPrazo)
        //     while (prazoMinimo > 0) {
        //         if (dtLimite.getDay() != 6 && dtLimite.getDay() != 0) {
        //             dtLimite.setDate(dtLimite.getDate() - 1)
        //             prazoMinimo--;
        //         } else {
        //             dtLimite.setDate(dtLimite.getDate() - 1)
        //         }
        //     }
        //     // verifica se a cpDataLimite, esta anterior a data atual ou a data de abertura do chamado
        //     if (new Date() > dtLimite) {
        //         var dataPagamento = new Date()
        //         var prazoMinimo = parseInt(dataset[0].cpPrazoAtrasada)
        //         while (prazoMinimo > 0) {
        //             if (dataPagamento.getDay() != 6 && dataPagamento.getDay() != 0) {
        //                 dataPagamento.setDate(dataPagamento.getDate() + 1)
        //                 prazoMinimo--;
        //             } else {
        //                 dataPagamento.setDate(dataPagamento.getDate() + 1)
        //             }
        //         }
        //         if (dataPagamento.getDay() == 6) {
        //             dataPagamento.setDate(dataPagamento.getDate() + 2)
        //         }
        //         if (dataPagamento.getDay() == 0) {
        //             dataPagamento.setDate(dataPagamento.getDate() + 1)
        //         }

        //         dia = dataPagamento.getDate();
        //         (dia < 10) && (dia = '0' + dia);
        //         mes = dataPagamento.getMonth() + 1;
        //         (mes < 10) && (mes = '0' + mes);
        //         ano = dataPagamento.getFullYear()

        //         $('#dtPagamento').val(ano + '-' + mes + '-' + dia)

        //         $('.cpNotaAtrasada').show();
        //         $('.dtPagamento').show();
        //         $('#cpNotaAtrasada').val(true)
        //         FLUIGC.message.alert({
        //             message: 'Nota fiscal está fora do prazo, será paga em até ' + dataset[0].cpPrazoAtrasada + ' dias úteis. Para maiores dúvidas entrar em contato com a Central de Atendimento.',
        //             title: 'Atenção !!!',
        //             label: 'Sim'
        //         }, function (el, ev) {});
        //     } else {
        //         $('.cpNotaAtrasada').hide();
        //         $('.dtPagamento').hide();
        //         $('#cpNotaAtrasada').val(false)
        //         $('#dtPagamento').val('')
        //     }
        // } else {
        //     $('.cpNotaAtrasada').hide();
        //     $('.dtPagamento').hide();
        //     $('#dtVencimento').val('')
        //     $('#dtPagamento').val('')

        // }
    }

    //starta os eventos de on change das quantidades de valores da tabela GDS
    evtTableItens(that) {
        let aux = new Auxiliar();
        var index = that.id.split('___')[1]
        var quantidade = $('#cpQuantEntrada___' + index).val();
        var cpVlrUnit = aux.convertFloat($('#cpVlrUnit___' + index).val());
        var total = quantidade * cpVlrUnit;
        $('#cpVlrTotal___' + index).val(aux.convertReal(total))
        // verifica se os valores da despesa sao validos e soma aos totais
        var vlrDespesas = 0
        $('[name^=cpQuantEntrada]').each(function () {
            var index = this.id.split('___')[1]
            if ($('#cpQuantEntrada___' + index) != '' && $('#cpQuantEntrada___' + index) != '0' && index != undefined) {
                vlrDespesas += aux.convertFloat($('#cpVlrDesc___' + index).val())
            }
        });
        $('#cpDescontoTotais').val(aux.convertReal(vlrDespesas));
        // calcula o valor total das mercadorias
        var linhas = parseInt($('#indiceGds').val())
        var vlrMercadoria = 0;
        for (var i = 1; i <= linhas; i++) {
            var val = $('#cpVlrTotal___' + i).val()
            if (val != '' && val != 'R$ 0,00' && val != undefined) {
                vlrMercadoria += aux.convertFloat(val);
            }
        }
        var ipi = $('#cpIpi').val()
        var ipi = quantidade * ipi
        $('#cpVlrMercadoria').val(aux.convertReal(vlrMercadoria))
        $('#cpVlrBruto').val(aux.convertReal(vlrMercadoria - vlrDespesas + ipi))

        var valorNota = $("#cpVlrBruto").val().replace(".", "").replace(",", ".");
        var valorPedido = $("#cpVlrPedido").val().replace(".", "").replace(",", ".");

        valorNota = parseFloat(valorNota);
        valorPedido = parseFloat(valorPedido);

        if (valorNota > valorPedido) {

            FLUIGC.toast({
                title: 'Diferença: ',
                message: "O valor total da NF é maior que o valor do pedido de compras, entre em contato com o time de suprimentos do CSO.",
                type: 'danger'
            });

            $('#valorMaior').val("sim");
        } else {
            $('#valorMaior').val("nao");
        }
    }

    // chamada para iniciar os campos ocultos do fomulario
    init() {
        $('.reg').hide()
        $('.gds').show()
        
        if ($('#cpDecisaoFiscal').val() == 'nao') {
            $('.destinoVerificacao').show()
        } else {
            $('.destinoVerificacao').hide()
        }
        if ($('#cpDecisaoSolicitante').val() == 'sim') {
            $('#iniciarPesquisa').show()
        } else {
            $('#iniciarPesquisa').hide()
        }
        if ($('#cpCodFornecedor').val() == '' && $('#cpCodFilial').val() == '') {
            $('#pedidoCompras').hide()
        }
        if ($('#cpNotaAtrasada').val() == 'true') {
            $('.cpNotaAtrasada,.dtPagamento').show();
        } else {
            $('.cpNotaAtrasada,.dtPagamento').hide();
        }
        $('#labelDataPrevista').text("Pagamento Aprox.")
        $('#dtPagamento').prop('readonly', true);
    }

}

class AutonomiaRegularizadora extends GDE {

    // chamada para iniciar os campos ocultos do fomulario
    init() {
        let aux = new Auxiliar();
        $('.gds').hide()
        $('.reg').show()
        $('#cpValorNota').change()
        super.getConfig()        
        $('.flagVencimento').hide();
        
    }
    // calcula o vencimento com base no fichario de configuracao
    calculaVencimento() {
        if ($('#dtEmissao').val() != '') {
            var aux = new Auxiliar();
            $('dtPagamento').val('');
            var dtEmissao = $('#dtEmissao').val().split('-');
            var dia = dtEmissao[2];
            var mes = aux.convertFloat(dtEmissao[1]) - 1;
            var ano = dtEmissao[0];
            var dtEmissao = new Date(ano, mes, dia);

            // consulta as codiçoes no fichario de de configuração
            var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
            var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, [cst], null).values;
            var dtVencimento = dtEmissao;

            dtVencimento.setDate(dtEmissao.getDate() + parseInt(dataset[0].cpPrazoRegularizadora));
            $('#dtVencimento').val(aux.convertDateString(dtVencimento))

            var prazoMinimo = parseInt(dataset[0].cpPrazo)
            while (prazoMinimo > 0) {
                if (dtVencimento.getDay() != 6 && dtVencimento.getDay() != 0) {
                    dtVencimento.setDate(dtVencimento.getDate() - 1)
                    prazoMinimo--;
                } else {
                    dtVencimento.setDate(dtVencimento.getDate() - 1)
                }
            }
            
            $('#dtVencimento').attr('readonly','readonly');

            // verifica se a cpDataLimite, esta anterior a data atual ou a data de abertura do chamado
            if (new Date().getTime() > dtVencimento.getTime()) {
                $('.dtPagamento').show();
                FLUIGC.message.alert({
                    message: 'Nota fiscal está fora do prazo. Gentileza atentar para a data de vencimento. Para maiores dúvidas entrar em contato com a Central de Atendimento.',
                    title: 'Atenção !!!',
                    label: 'Sim'
                }, function (el, ev) {});
                $('.cpNotaAtrasada').show();
                $('#cpNotaAtrasada').val(true)
            } else {
                $('.dtPagamento').hide();
                $('.cpNotaAtrasada').hide();
                $('#cpNotaAtrasada').val(false)

            }
        }
        event.stopPropagation();
    }

    // starta os eventos da tabela de produtos
    evtTableItens(that) {
        var aux = new Auxiliar();
        var indice = that.name.split('___')[1];

        var quantidade = aux.convertFloat($('[name^=cpQuant___' + indice + ']').val());
        var vlrUnitario = aux.convertFloat($('[name^=cpValorUnit___' + indice + ']').val());
        var vlrIpi = aux.convertFloat($('[name^=cpValorIpi___' + indice + ']').val());
        var vlrDesconto = aux.convertFloat($('[name^=cpValorDesconto___' + indice + ']').val());

        var VlrTotal = ((quantidade * vlrUnitario) + vlrIpi) - vlrDesconto;
        $('[name^=cpValorTotal___' + indice + ']').val(aux.convertReal(VlrTotal))
        this.calculaTotalNota()
        $('#cpAlcada').val(true);
    }


    // calcula o valor total da nota juntamente com o valor total do ipi e dos descontos
    calculaTotalNota() {
        var aux = new Auxiliar();
        var totalIpi = 0;
        var totalDesconto = 0;
        var totalProdutos = 0

        $('[name^=cpValorIpi___]').each(function () {
            totalIpi += aux.convertFloat($(this).val())
        })

        $('[name^=cpValorDesconto___]').each(function () {
            totalDesconto += aux.convertFloat($(this).val())
        })

        $('[name^=cpValorTotal___]').each(function () {
            totalProdutos += aux.convertFloat($(this).val())
        })

        $('#cpTotalIpi').val(aux.convertReal(totalIpi))
        $('#cpTotalDescontos').val(aux.convertReal(totalDesconto))
        $('#cpValorTotalNota').val(aux.convertReal(totalProdutos)).change()
    }
       
    // procura e define os aprovadores e define quem sera o primeiro
    setAlcadaAprovacao() {
        let CodFilial = $('#cpCodCadFilial').val()
        let codCentroCusto = $('#tbRateio').find('tbody tr').not(':first').find('input')
        codCentroCusto.length > 0 ? codCentroCusto = codCentroCusto[0].value : codCentroCusto = '';
        let valor = $('#cpValorNota').val();        
        
        var blackList = this.verificaBlackList();        
        var excecao = this.verificaCCExcecao(codCentroCusto);
        
        if (blackList){
        	
        	var auxiliar = new Auxiliar();
        	valor = auxiliar.convertFloat(valor);
        	
        	var userAprovWhite2 = 'e6fyuot4k2ngvjzk1552050747537'; // Mais que 15k > Chintia Maria
            var userAprovWhite = 'd5vukvl36mngujvp1475268748097'; // Mariana Araujo Costa, até 15k
        	
        	var ObjAprovadores = new Array();  
            var aprovador = new Object();
            aprovador.ID = userAprovWhite;
            aprovador.NOME = 'Mariana Araujo Costa';
            ObjAprovadores.push(aprovador);

            if (valor > 15000) {
            	var aprovador = new Object();
            	aprovador.ID = userAprovWhite2;
                aprovador.NOME = 'Chintia Maria';
                ObjAprovadores.push(aprovador);
            }
            
            
            if (ObjAprovadores.length > 0) {
                $('#cpAprovadores').val(JSON.stringify(ObjAprovadores));
                $('#cpNivelAprovacao').val(0);
                $('#quantAprovadores').val(ObjAprovadores.length)
                $('#cpAprovador').val(ObjAprovadores[0].ID)
            }   
        
        }else if (excecao){
        	
        	var auxiliar = new Auxiliar()
            // defina as constraints para buscar o ds do pai
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
            
            var ObjAprovadores = new Array();
            valor = auxiliar.convertFloat(valor);
            if (ds_centroCusto.length > 0) {
                var aprovador = new Object();
                aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro'];
                aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentroDesc']
                ObjAprovadores.push(aprovador);

                if (valor > auxiliar.convertFloat(ds_centroCusto[0]['valorGerenteCentro']) &&
                    this.existeGestor(ObjAprovadores, ds_centroCusto[0]['usuarioGerenteCentro2']) == false) {
                    var aprovador = new Object();
                    aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro2'];
                    aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentro2Desc']
                    ObjAprovadores.push(aprovador);
                }
                
                if (valor > auxiliar.convertFloat(ds_centroCusto[0]['valorGerenteCentro2']) &&
                		this.existeGestor(ObjAprovadores, ds_centroCusto[0]['usuarioDirOperacoesCentro']) == false) {
                        var aprovador = new Object();
                        aprovador.ID = ds_centroCusto[0]['usuarioDirOperacoesCentro'];
                        aprovador.NOME = ds_centroCusto[0]['usuarioDirOperacoesCentroDesc']
                        ObjAprovadores.push(aprovador);
                 }                                           
                
            }
            
            if (ObjAprovadores.length > 0) {
                $('#cpAprovadores').val(JSON.stringify(ObjAprovadores));
                $('#cpNivelAprovacao').val(0);
                $('#quantAprovadores').val(ObjAprovadores.length)
                $('#cpAprovador').val(ObjAprovadores[0].ID)
            }    
        	
        }else if (CodFilial != '') {

            var auxiliar = new Auxiliar()
            // defina as constraints para buscar o ds do pai
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
            for (var i in datasetPai) {
                //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
                var c1 = DatasetFactory.createConstraint("tablename", "tbAlcadasDiversos", "tbAlcadasDiversos", ConstraintType.MUST);
                var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
                var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
                var c4 = DatasetFactory.createConstraint("F1_FILIAL_DIV", CodFilial, CodFilial, ConstraintType.MUST);
                // // Busca o dataset
                var ds_aprovadores = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3, c4), null).values;
            }


            // localiza os aprovadores do centro de custo com base no valor
            var ObjAprovadores = new Array();
            valor = auxiliar.convertFloat(valor);
            if (ds_centroCusto.length > 0) {
                var aprovador = new Object();
                aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro'];
                aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentroDesc']
                ObjAprovadores.push(aprovador);

                if (valor > auxiliar.convertFloat(ds_centroCusto[0]['valorGerenteCentro']) &&
                    this.existeGestor(ObjAprovadores, ds_centroCusto[0]['usuarioGerenteCentro2']) == false) {
                    var aprovador = new Object();
                    aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro2'];
                    aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentro2Desc']
                    ObjAprovadores.push(aprovador);
                }
            }


            // localiza os aprovadores da filial com base no valor informado
            if (ds_aprovadores.length > 0 &&
                this.existeGestor(ObjAprovadores, ds_aprovadores[0]['usuarioGerente3']) == false) {
                var aprovador = new Object();
                aprovador.ID = ds_aprovadores[0]['usuarioGerente3'];
                aprovador.NOME = ds_aprovadores[0]['usuarioGerente3Desc']
                ObjAprovadores.push(aprovador);

                if (valor > auxiliar.convertFloat(ds_aprovadores[0]['valorGerente3']) &&
                    this.existeGestor(ObjAprovadores, ds_aprovadores[0]['usuarioOperacoes']) == false) {
                    var aprovador = new Object();
                    aprovador.ID = ds_aprovadores[0]['usuarioOperacoes'];
                    aprovador.NOME = ds_aprovadores[0]['usuarioOperacoesDesc']
                    ObjAprovadores.push(aprovador);
                }
                if (valor > auxiliar.convertFloat(ds_aprovadores[0]['valorOperacoes']) &&
                    this.existeGestor(ObjAprovadores, ds_aprovadores[0]['usuarioFinanceiro']) == false) {
                    var aprovador = new Object();
                    aprovador.ID = ds_aprovadores[0]['usuarioFinanceiro'];
                    aprovador.NOME = ds_aprovadores[0]['usuarioFinanceiroDesc']
                    ObjAprovadores.push(aprovador);
                }
                if (valor > auxiliar.convertFloat(ds_aprovadores[0]['valorFinanceiro']) &&
                    this.existeGestor(ObjAprovadores, ds_aprovadores[0]['usuarioGeral']) == false) {
                    var aprovador = new Object();
                    aprovador.ID = ds_aprovadores[0]['usuarioGeral'];
                    aprovador.NOME = ds_aprovadores[0]['usuarioGeralDesc']
                    ObjAprovadores.push(aprovador);
                }
            }


            // seta a alçada de aprovação
            if (ObjAprovadores.length > 0) {
                $('#cpAprovadores').val(JSON.stringify(ObjAprovadores));
                $('#cpNivelAprovacao').val(0);
                $('#quantAprovadores').val(ObjAprovadores.length)
                $('#cpAprovador').val(ObjAprovadores[0].ID)
            }

        }
    }
    
    verificaBlackList(){	//verifica fornecedores
    	
    	 var fornecedor = $('#cpCnpjForncedor').val();
         const blackList = ['65.174.088/0001-03', '05.539.537/0001-48', '20.412.770/0001-59', '06.026.109/0001-84', '02.032.253/0001-7'];   
                           
         let skipLevel2 = blackList.includes(fornecedor);         
         return skipLevel2;    	    		
    }
    
    
    verificaCCExcecao(cc){	//11060102 - NOVOS NEGOCIOS e 11060103 - NOVOS NEGOCIOS JURIDICO
		
    	if (cc == "11060102" || cc == "11060103"){		
    		return true;		
    	}else{
    		return false;
    	}
    		
    }


    // verifica se existem aprovadores repetidos ou sem as informaçoes de ID
    existeGestor(array, idGestor) {
        var existe = false
        array.forEach(element => {
            if (element.ID == idGestor || idGestor == '') {
                existe = true
            }
        });
        return existe
    }

    calculaRateio() {
        if ($('#cpValorNota').val()) {
            let aux = new Auxiliar();
            let valorTotal = aux.convertFloat($('#cpValorNota').val())
            let valorTotalRateio = 0
            let percentualTotal = 0
            $('[name^=cpValorRateio___]').each((index, el) => {

                let i = el.name.split('___')[1]
                if ($(el).val()) {

                    let valor = aux.convertFloat($(el).val())
                    valorTotalRateio += valor
                    let percent = aux.calculaPercentual(valor, valorTotal)
                    percentualTotal += percent
                    $('#cpPercentualRateio___' + i).val(percent.toFixed(2))

                }

            })
            $('#cpPercentualTotalRateio').val(percentualTotal.toFixed(2))
            $('#cpValorTotalRateio').val(aux.convertReal(valorTotalRateio))
        }
    }
}

class Auxiliar {
    // converte uma string no formato DD/mm/AAAA para um objeto Date
    convertStringDate(date) {
        if (date != '' || date != undefined) {
            var dia = date.split('/')[0];
            var mes = parseInt(date.split('/')[1]) - 1;
            var ano = date.split('/')[2]
            if (ano.length < 3) {
                var ano = '20' + date.split('/')[2]
            } else {
                var ano = date.split('/')[2]
            }
            var data = new Date(ano, mes, dia)
            return data
        }

    }
    // converte uma um obj Date para uma string no formato DD-mm-YYYY
    convertDateString(date) {
        var ano = date.getFullYear();
        var mes = date.getMonth() + 1
        var dia = date.getDate();
        if (mes < 10) {
            mes = '0' + mes
        }
        if (dia < 10) {
            dia = '0' + dia
        }
        return ano + '-' + mes + '-' + dia;
    }
    // calcula o valor dos descontos
    calculaDescontos(ipi, frete) {
        var total = 0;
        if (ipi > 0) {
            total += parseFloat(ipi)
        }
        if (frete > 0) {
            total += parseFloat(frete)
        }
        return total
    }
    // transforma um float em um string com mascara monetaria
    convertReal(string) {
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
    // transforma um valor com mascara em um float sem mascara
    convertFloat(valor) {
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
    // formata o cgc seja para o formato de cpf ou cpCnpj
    formatCgc(cgc) {
        if (cgc != null && cgc != undefined) {
            if (cgc.length <= 11) {
                cgc = cgc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
            } else {
                cgc = cgc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
            }
        }
        return cgc
    }
    // atribui aos botoes de aprovaçao seus eventos
    startAprovBtn(BtnAprov, BtnReprov, input) {
        $('.' + BtnAprov).hide()
        $('.' + BtnReprov).hide()

        if ($('#' + input).val() == 'sim') {

            $('.' + BtnAprov).show()

        } else if ($('#' + input).val() == 'nao') {

            $('.' + BtnReprov).show()

        }

        $('#' + BtnAprov).click(function () {

            $('#' + input).val('sim').change()
            $('.' + BtnAprov).show()
            $('.' + BtnReprov).hide()

        });
        $('#' + BtnReprov).click(function () {

            $('#' + input).val('nao').change()
            $('.' + BtnReprov).show()
            $('.' + BtnAprov).hide()

        });
    }
    // retorna a data atual no formato YYYY-mm-DD
    currentDate() {
        var data = new Date();
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();
        if (dia < 10) {
            dia = "0" + dia
        }
        if (mes < 10) {
            mes = "0" + mes
        }
        return ano + '-' + mes + '-' + dia;
    }
    // remove todos os caracteres especias
    normalizeString(string) {
        string = string.toUpperCase()
        string = string.replace(/[ÁÀÂÃÄ]/g, "A")
        string = string.replace(/[ÉÈÊË]/g, "E")
        string = string.replace(/[ÍÌÎÏ]/g, "I")
        string = string.replace(/[ÓÒÔÕÖ]/g, "O")
        string = string.replace(/[ÚÙÛÜ]/g, "U")
        string = string.replace(/[Ç]/g, "C")
        return string
    }
    calculaPercentual(valor, valorTotal) {
        return valor / valorTotal * 100
    }
}

class Validacao {

    validaProdutos(produtos) {
        var validos = true;
        var cst = []
        cst.push(DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST));
        cst.push(DatasetFactory.createConstraint("tablename", "tabelaTipoProduto", "tabelaTipoProduto", ConstraintType.MUST));
        var TiposProdInvalidos = DatasetFactory.getDataset("ds_configuracaoGDE", null, cst, null).values;

        var cst = []
        cst.push(DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST));
        cst.push(DatasetFactory.createConstraint("tablename", "tabelaProduto", "tabelaProduto", ConstraintType.MUST));
        var ProdutosInvalidos = DatasetFactory.getDataset("ds_configuracaoGDE", null, cst, null).values;

        produtos.forEach(produto => {
            TiposProdInvalidos.forEach(tipo => {
                if (produto.COD_TIPO == tipo.cpCodTipoProd) {
                    validos = false
                }
            });
            ProdutosInvalidos.forEach(produtoInvalido => {
                if (parseInt(produto.CODIGO) == parseInt(produtoInvalido.cpCodProd)) {
                    validos = false
                }
            });
        });

        return validos
    }

    verificaNotaExistente() {
        var numero = $('#cpNumNota').val()
        if (numero != '') {
            numero = numero.replace(/[eE.,]/g, '')
            for (var i = numero.length; i < 9; i++) {
                numero = "0" + numero
            }
            numero.length > 9 ? numero = numero.substring(0, 9) : numero = numero
            $('#cpNumNota').val(numero)
            $('#cpNotaValida').val(true);
        }

    }

    verificacaoDDA() {
        let aux = new Auxiliar()
        let tipoSolicitacao = $('#cpTipoSolicitacao').val();
        let tipoPagamento = $('#cpTipoPagamento').val();
        let codFilial = $('#cpCodFilial').val().substring(0, 3);
        let cnpjFornecedor = $('#cpCnpjForncedor').val().split("/")[0].replace(".", "").replace(".", "");
        let dtVencimento = $('#dtPagamento').val().replace("-", "").replace("-", "");
        let valorNota = aux.convertFloat($('#cpValorLiquido').val())

        $('#cpCodFilial').val() == '00101' || 
        $('#cpCodFilial').val() == '02201' || 
        $('#cpCodFilial').val() == '01501' || 
        $('#cpCodFilial').val() == '01502' || 
        $('#cpCodFilial').val() == '01503' || 
        $('#cpCodFilial').val() == '05301' || 
        $('#cpCodFilial').val() == '02301' || 
        $('#cpCodFilial').val() == '06501' || 
        /* $('#cpCodFilial').val() == '06502' || */ 
        $('#cpCodFilial').val() == '06503' || 
        $('#cpCodFilial').val() == '06504' || 
        $('#cpCodFilial').val() == '03901' || 
        $('#cpCodFilial').val() == '06201' || 
        $('#cpCodFilial').val() == '00901' || 
        $('#cpCodFilial').val() == '00902' || 
        $('#cpCodFilial').val() == '05401' || 
        $('#cpCodFilial').val() == '00301' || 
        $('#cpCodFilial').val() == '03401' || 
        $('#cpCodFilial').val() == '00701' || 
        $('#cpCodFilial').val() == '03801' || 
        $('#cpCodFilial').val() == '03802' || 
        $('#cpCodFilial').val() == '03803' || 
        $('#cpCodFilial').val() == '03804' || 
        $('#cpCodFilial').val() == '02501' || 
        $('#cpCodFilial').val() == '02101' || 
        $('#cpCodFilial').val() == '02102' ||
        $('#cpCodFilial').val() == '00102' ||
        $('#cpCodFilial').val() == '00103' || 
        $('#cpCodFilial').val() == '00104' ||
        $('#cpCodFilial').val() == '00105' ||
        $('#cpCodFilial').val() == '00106' ||
        $('#cpCodFilial').val() == '01001' ||
        $('#cpCodFilial').val() == '01002' ||
        $('#cpCodFilial').val() == '01003' ||
        $('#cpCodFilial').val() == '01004' ||
        $('#cpCodFilial').val() == '01005' ||
        $('#cpCodFilial').val() == '01006' ||
        $('#cpCodFilial').val() == '01007' ||
        $('#cpCodFilial').val() == '01008' ||
        $('#cpCodFilial').val() == '03001' ||
        $('#cpCodFilial').val() == '03002' ||
        $('#cpCodFilial').val() == '03003' ||
        $('#cpCodFilial').val() == '03004' ||
        $('#cpCodFilial').val() == '03201' ||
        $('#cpCodFilial').val() == '00601' ||
        $('#cpCodFilial').val() == '00602' ||
        $('#cpCodFilial').val() == '00603' ||
        $('#cpCodFilial').val() == '00604' ||
        $('#cpCodFilial').val() == '00605' ||
        $('#cpCodFilial').val() == '00606' ||
        $('#cpCodFilial').val() == '01301' ||
        $('#cpCodFilial').val() == '01101' ||
        $('#cpCodFilial').val() == '05701' ||
        $('#cpCodFilial').val() == '05702' ||
        $('#cpCodFilial').val() == '04801' ||
        $('#cpCodFilial').val() == '04802' ||
        $('#cpCodFilial').val() == '04803' ||
        $('#cpCodFilial').val() == '03301' ||
        $('#cpCodFilial').val() == '02701' || 
        $('#cpCodFilial').val() == '02702' || 
        $('#cpCodFilial').val() == '05401' || 
        $('#cpCodFilial').val() == '04301' || 
        $('#cpCodFilial').val() == '04201' || 
        $('#cpCodFilial').val() == '00501' || 
        /* $('#cpCodFilial').val() == '02901' || */ 
        $('#cpCodFilial').val() == '04601' || 
        $('#cpCodFilial').val() == '04602' || 
        $('#cpCodFilial').val() == '04603' || 
        $('#cpCodFilial').val() == '04701' || 
        $('#cpCodFilial').val() == '04901' || 
        $('#cpCodFilial').val() == '04902' ||
        $('#cpCodFilial').val() == '04903' ||
        $('#cpCodFilial').val() == '04904' ||
        $('#cpCodFilial').val() == '04905' ||
        $('#cpCodFilial').val() == '04906' ||
        $('#cpCodFilial').val() == '04907' ||
        $('#cpCodFilial').val() == '04908' ||
        $('#cpCodFilial').val() == '04101' || 
        $('#cpCodFilial').val() == '04102' || 
        $('#cpCodFilial').val() == '01701' ||
        $('#cpCodFilial').val() == '01702' ||
        $('#cpCodFilial').val() == '01703' ||
        $('#cpCodFilial').val() == '01704' || 
        $('#cpCodFilial').val() == '05501' || 
        $('#cpCodFilial').val() == '03101' ||
        $('#cpCodFilial').val() == '02001' || 
        $('#cpCodFilial').val() == '04501' || 
        $('#cpCodFilial').val() == '05201' ? 
        codFilial = codFilial : codFilial = ''

        if (tipoPagamento == '1' && codFilial && cnpjFornecedor && dtVencimento && valorNota) {
            let aux = new Auxiliar()
            var cons = new Array()

            cons.push(DatasetFactory.createConstraint('CGC', cnpjFornecedor, cnpjFornecedor, ConstraintType.MUST))
            cons.push(DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST))
            cons.push(DatasetFactory.createConstraint('DT_VENCIMENTO', dtVencimento, dtVencimento, ConstraintType.MUST))
            cons.push(DatasetFactory.createConstraint('VALOR', valorNota, valorNota, ConstraintType.MUST))
            var ds_dda = DatasetFactory.getDataset('ds_dda', null, cons, null).values;
            if (ds_dda[0].CGC == "") {
                $('.dda').show()
                $('.dda').find('div').removeClass('alert-info')
                $('.dda').find('div').addClass('alert-danger')
                $('.dda').find('div').text('DDA não localizado')
                $('.boletoVencido').hide();

                FLUIGC.message.alert({
                    message: 'DDA não localizado! Favor revisar o valor do boleto.',
                    title: '',
                    label: 'OK'
                }, function (el, ev) {
                    $('#travaDDA').val('true');
                    $('#cpNumNota').prop('readonly', true);
                    $('#cpSerieNota').prop('readonly', true);
                    $('#btnAddCC').prop('disabled', true);
                    $('#btnImportCSV').prop('disabled', true);
                    $('#btnAddItem').prop('disabled', true);
                })


            } else {
                $('#cpNumNota').prop('readonly', false);
                $('#cpSerieNota').prop('readonly', false);
                $('#btnAddCC').prop('disabled', false);
                $('#btnImportCSV').prop('disabled', false);
                $('#btnAddItem').prop('disabled', false);

                $('#travaDDA').val('false');
                $('.dda').find('div').addClass('alert-info')
                $('.dda').find('div').removeClass('alert-danger')
                $('.dda').find('div').text('DDA localizado')
                $('.dda').show()
                let dataVencimento = $('#dtPagamento').val().split("-");
                dataVencimento = new Date(dataVencimento[0], dataVencimento[1] - 1, dataVencimento[2]);


                let dataAtual = new Date();
                dataAtual.setHours(0, 0, 0, 0);

                if (dataAtual > dataVencimento) {

                    $('.dtPagamento').show();
                    $('.flagVencimento').show();
                    $('#divVencimento').show();
                    $('#flagVencimento').val("multa");
                    tratativaCheckBox('renegociacaoMultaJur', true)
                    $('#ddaVencido').val('true');
                    $('#vencNegociadoDDA').prop("readonly", false);
                    $('#dtPagamento').prop("readonly", true);
                    $('.boletoVencido').show()

                    dataAtual.setDate(dataAtual.getDate() + 2);
                    dataAtual = dataAtual.toISOString().split('T')[0];

                    document.getElementsByName("dtVencimento")[0].setAttribute('min', dataAtual);
                } else {

                    if( $('#prazoMenor2dias').val() == 'true'){
                        $('#divVencimento').show();
                        $('.boletoVencido').show();
                    }else{
                        $('#divVencimento').hide();
                        $('.boletoVencido').hide()
                    }
                    $('#ddaVencido').val('false');
                    $('.flagVencimento').hide();
                    $('#flagVencimento').val("");
           
                   // $('.boletoVencido').hide()
                    $('#dtPagamento').prop("readonly", false);

                }
            }
        }
        if (tipoSolicitacao == 'gds' && $('#flagVencimento').val() == 'multa') {
            var reg = new AutonomiaRegularizadora()
            reg.setAlcadaAprovacao()
            $('#cpNivelAprovacao').val(0);
            $('#quantAprovadores').val(1)
        }

    }

}