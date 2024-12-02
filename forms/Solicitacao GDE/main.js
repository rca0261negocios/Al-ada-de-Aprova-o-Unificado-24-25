$(function () {


    MaskEvent.init();
    var auxiliar = new Auxiliar();
    var validacao = new Validacao();
    // incia os botoes de aprovação
    auxiliar.startAprovBtn('btnAprovGestor', 'btnReprovGestor', 'cpDecisaoGestor');
    auxiliar.startAprovBtn('btnAprovFiscal', 'btnReprovFiscal', 'cpDecisaoFiscal');
    auxiliar.startAprovBtn('btnAprovCompras', 'btnReprovCompras', 'cpDecisaoCompras');
    auxiliar.startAprovBtn('btnAprovSolicitante', 'btnReprovSolicitante', 'cpDecisaoSolicitante');
    auxiliar.startAprovBtn('btnAprovRegularizadora', 'btnReprovRegularizadora', 'cpDecisaRegularizadora');
    auxiliar.startAprovBtn('btnAprovFinanceiro', 'btnReprovFinanceiro', 'cpDecisaoFinanceiro');
    validarCpom()
    $('#iniciarPesquisa').click(function () {
        window.open(
            "http://chatbot.121labs.io/pc_oncoclinicas", "_blank");
    });
    //initPesquisa();
    getParamsURL();
    initGDE();
    getAprovadorCoordCompras();
    $('#idSolicitante').val(parent.WCMAPI.userCode);

    $('#dtVencimento').prop("readonly", false);
    $('#divVencimento').hide()
    $('.dtPagamento').show()
    $('.boletoVencido').hide()
    $('#dtPagamento').prop("readonly", false);

    if ($('#cpTipoLancamento').html() == 'REGULARIZADORA' && MODO == 'VIEW') {
        $('[for="taDescPagamento"]').html("Descrição da solicitação e justificativa - necessário informar qual a Diretoria foi a aprovadora da demanda")
    }else if($('#cpTipoLancamento').val() == 'REGULARIZADORA'){
        $('[for="taDescPagamento"]').html("Descrição da solicitação e justificativa - necessário informar qual a Diretoria foi a aprovadora da demanda")
    }

    if ($('#dtVencimento').val() != '' || (MODO == 'VIEW' && $('#ddaVencido').val() == "true")) {
        $('#divVencimento').show();
        $('#dtVencimento').prop('readonly', true);
    }

    $('input[name="renegociacaoM"]').click(function () {
        if ($(this).prop("checked") == true) {
            $('#renegociacaoMHi').val('checked');
        } else if ($(this).prop("checked") == false) {
            $('#renegociacaoMHi').val('unChecked');
        }
    });

    $('#cpTipoPagamento').change(function () {

        if (this.value == '1') {
            $('.dtVenvBoleto').html('Data Vencimento Boleto');
            let dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0);

            dataAtual.setDate(dataAtual.getDate() + 7);
            if (dataAtual.getDay() == 6) {
                dataAtual.setDate(dataAtual.getDate() + 2)

            } else if (dataAtual.getDay() == 0) {
                dataAtual.setDate(dataAtual.getDate() + 1)
            }

            dataAtual = dataAtual.toISOString().split('T')[0];
            document.getElementsByName("dtVencimento")[0].setAttribute('min', dataAtual);

        } else {
            $('.dtVenvBoleto').html('Vencimento da Nota Fiscal');

            let dataAtual = new Date();
            dataAtual.setHours(0, 0, 0, 0);
            // dataAtual.setDate(dataAtual.getDate() + diasUteis(2));
            dataAtual.setDate(dataAtual.getDate() + diasUteis(3));
            dataAtual = dataAtual.toISOString().split('T')[0];
            document.getElementsByName("dtVencimento")[0].setAttribute('min', dataAtual);
        }

        if ($('#hiddenTipoPagamento').val() != this.value) {
            $('#renegociacaoMHi').val('checked');
            tratativaCheckBox('renegociacaoM', true);
        } else {
            $('#renegociacaoMHi').val('');
            tratativaCheckBox('renegociacaoM', false);
        }

        if ($('#hiddenTipoPagamento').val() == '1' && this.value != $('#hiddenTipoPagamento').val() == '1' && $('#cpTipoSolicitacao').val() == 'reg') {

            $('.divRenegociacao').show();
            FLUIGC.message.alert({
                message: 'A alteração da forma de pagamento sem o conhecimento do fornecedor pode ocasionar protesto da Nota Fiscal.',
                title: 'Atenção!',
                label: 'OK'
            }, function (el, ev) {

            });

        } else {
            $('.divRenegociacao').hide();
        }
    });

    $('#slMotivoRejeicao').change(function () {
        if (this.value == '5') {

            FLUIGC.toast({
                title: ' ATENÇÃO',
                message: "Favor Inserir o novo produto na tabela acima.",
                timeout: 'slow',
                type: 'warning'
            });
            $('.novoProduto').show();
        } else {
            $('.novoProduto').hide();
        }
    });

});

function setZoom() {
    openZoom("ds_produto",
        "FILTRO, Código - Descrição",
        "FILTRO",
        "",
        "zoomProducts");
}

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId +
        "&dataFields=" + datafields +
        "&resultFields=" + resultFields +
        "&filterValues=" + constraints +
        "&type=" + type, "zoom", "status, scrollbars=no, top=100, left=100, width=900, height=600");
};

// seta os valores nos campos com base nos dados selecionados do dataSet
function setSelectedZoomItem(selectedItem) {
    var id = selectedItem.inputId.split('___')[0];
    var index = selectedItem.inputId.split('___')[1];

    var regularizadora = new AutonomiaRegularizadora()
    var gds = new Gds();
    var validacao = new Validacao();
    var auxiliar = new Auxiliar();

    if (id == 'zoomFilial') {

        $('#cpCodFilial').val(selectedItem.CODIGO);
        $('#cpLocalPres').val(selectedItem.DESCRICAO);
        $('#cpCnpjFilial').val(auxiliar.formatCgc(selectedItem.CGC));
        var c1 = DatasetFactory.createConstraint("filial_protheus", selectedItem.CODIGO, selectedItem.CODIGO, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
        // // Busca o dataset
        var ds_cadFilial = DatasetFactory.getDataset("cad_Filiais", null, [c1, c2], null).values;
        $('#cpCodCadFilial').val(ds_cadFilial[0].codigo)

        if ($('#cpCodFornecedor').val() != '' && $('#cpTipoSolicitacao').val() == 'gds') {
            $('#pedidoCompras').show();
            reloadZoomFilterValues('zoomPedidoComp', 'FILIAL,' + selectedItem.CODIGO + ',COD_FORNECEDOR,' + $('#cpCodFornecedor').val() + ',STATUS,PENDENTE');
        }
        regularizadora.setAlcadaAprovacao()
        if ($('#cpTipoSolicitacao').val() != 'gds' && $('#cpCnpjForncedor').val() != "" && $('#cpCodFilial').val() != "" && $('#cpValorNota').val() != "" && $('#dtVencimento').val() != "") {
            var validacao = new Validacao();
            validacao.verificacaoDDA();
        }

        if ($('#cpCodFilial').val() == "06601") {
            FLUIGC.message.alert({
                message: `Prezado (a) as operações de registro de documentos para pagamentos do Hospital Vila da Serra - HVS que se enquadra neste fluxo ainda não estão sendo realizadas pelo CSO e sim internamente no Hospital, gentileza enviar sua demanda para o e-mail centraldenotas@oncoclinicas.com que direcionaremos sua demanda para o responsável do HVS. `,
                title: `Alerta`,
                label: `OK`
            }, function (el, ev) {});
            window['zoomFilial'].clear();
            $("#cpCnpjFilial").val("")
        }

        var filialRestrita = $('#cpCodFilial').val()
        restricaoFilialUnity(filialRestrita)
    } else if (id == 'zoomFornecedor') {
        $('#municipioFornecedor').val(selectedItem.COD_MUNICIPIO);

        if (selectedItem.CGC.length > 11) {

            $('#cpCodFornecedor').val(selectedItem.CODIGO)
            $('#cpEstado').val(selectedItem.ESTADO);
            $('#cpMunicipio').val(selectedItem.DESC_MUNICIPIO);
            $('#cpRazaoSocial').val(selectedItem.DESCRICAO);
            $('#cpEndereco').val(selectedItem.ENDERECO);
            $('#cpEstadoFornecedor').val(selectedItem.ESTADO);
            $('#cpTelefone').val(selectedItem.TELEFONE);
            $('#cpCnpjForncedor').val(auxiliar.formatCgc(selectedItem.CGC));
            $('#cpCnpj').val(auxiliar.formatCgc(selectedItem.CGC));
            $('#cpInsEstadual').val(selectedItem.INSCRICAO_ESTADUAL);
            $('#cpCidadeFornecedor').val(selectedItem.DESC_MUNICIPIO);
            $('#cpEstadoFornecedor').val(selectedItem.ESTADO);
            $('#cpLojaFornecedor').val(selectedItem.LOJA);
            $('#cpSimplesNacional').val(selectedItem.SIMPLES_NACIONAL);
            $('#cnaeFornecedor').val(selectedItem.CNAES);
            $('#cpCodIss').val(selectedItem.CODIGOS_ISS);
            $('#hiddenTipoPagamento').val(selectedItem.FORMA_PAGAMENTO.split("-")[0]);
            $('#cpTipoPagamento').val(selectedItem.FORMA_PAGAMENTO.split("-")[0]);
            $('#cpBancoFornecedor').val(selectedItem.BANCO);
            $('#cpAgFornecedor').val(selectedItem.AGENCIA);
            $('#cpCCFornecedor').val(selectedItem.CONTA);
            $('#ddaCGCForn').val(selectedItem.CGC);
            $('#municipioFornecedor').val(selectedItem.COD_MUNICIPIO);


            if ($('#cpTipoPagamento').val() == "" || ($('#cpTipoPagamento').val() == "2" && ($('#cpBancoFornecedor').val() == "" || $('#cpAgFornecedor').val() == "" || $('#cpCCFornecedor').val() == ""))) {

                $('.dtVenvBoleto').html('Vencimento da Nota Fiscal');
                $("#zoomFornecedor").val("");
                $("#cpCnpjForncedor").val("");
                $("#cpCodFornecedor").val("");
                $("#cpEstado").val("");
                $("#cpMunicipio").val("");
                $("#zoomFilial").val("");
                $("#cpCnpjFilial").val("");
                $("#cpTipoPagamento").val("");
                $('#hiddenTipoPagamento').val("");
                $("#lbValorNota").val("");
                $("#cpValorLiquido").val("");
                $("#lbDataEmissao").val("");
                $("#dtPagamento").val("");
                $("#cpLocalPres").val("");

                FLUIGC.message.alert({
                    message: 'Informações Bancárias não encontradas. Entre em contato com a Central de Atendimento.',
                    title: 'Atenção !!!',
                    label: 'Sim'
                }, function (el, ev) {});


                /* FLUIGC.toast({
                    title: 'Atenção',
                    message: 'Informações Bancárias não encontradas. Entre em contato com a Central de Atendimento.',
                    type: 'warning'
                }); */

                window['zoomFornecedor'].clear();
            } else {
                $('.dtVenvBoleto').html('Data Vencimento Boleto');
            }

            if ($('#cpCodFilial').val() != '' && $('#cpTipoSolicitacao').val() == 'gds') {
                $('#pedidoCompras').show();
                reloadZoomFilterValues('zoomPedidoComp', 'FILIAL,' + $('#cpCodFilial').val() + ',COD_FORNECEDOR,' + selectedItem.CODIGO + ',STATUS,PENDENTE')
            }

            if ($('#cpTipoSolicitacao').val() != 'gds' && $('#cpCnpjForncedor').val() != "" && $('#cpCodFilial').val() != "" && $('#cpValorNota').val() != "" && $('#dtVencimento').val() != "") {
                var validacao = new Validacao();
                validacao.verificacaoDDA();
            }

            if ($('#cpTipoPagamento').val() == "2") {
                $('#cpTipoPagamento option[value=""]').prop('disabled', true);
                $('#cpTipoPagamento option[value="1"]').prop('disabled', true);
            } else {
                $('#cpTipoPagamento option[value=""]').prop('disabled', false);
                $('#cpTipoPagamento option[value="1"]').prop('disabled', false);
            }

        } else {
            FLUIGC.message.alert({
                message: 'Esse tipo de fluxo so pode ser utiliado para pessoa juridica!!!',
                title: 'Atenção !!!',
                label: 'OK'
            }, function (el, ev) {
                window['zoomFornecedor'].clear();
            });
        }


    } else if (id == 'zoomEspecieNf') {

        $('#cpCodEspecieNf').val(selectedItem.CODIGO);

    } else if (id == 'zoomPedidoComp') {

        $('#cpCodPedidoComp').val(selectedItem.PEDIDO);
        $('#cpTotalPedido').val(auxiliar.convertReal(selectedItem.VLR_TOTAL));
        $('#cpCodFilialPedido').val(selectedItem.FILIAL);
        gds.carregarItensPedidoCompras(selectedItem.PEDIDO);

        if ($('#dtEmissao').val() != '') {

            gds.verificaVencimento()
        }
    } else if (id == 'zmCentroCustos') {


        

        $('#cpCodCentroCustos___' + index).val(selectedItem.CODIGO)
        
        let pegaCodFilial = $('#cpCodFilial').val();
        let pegaCodCentroCusto = selectedItem.CODIGO
        var nomeSolic = $('#idSolicitante').val();

        var c1 = DatasetFactory.createConstraint('IDRESPONSAVEL', nomeSolic, nomeSolic, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('CODCENTRODECUSTO', pegaCodCentroCusto, pegaCodCentroCusto, ConstraintType.MUST);
        var datasetPrincipal = DatasetFactory.getDataset('ds_restricao_codCusto_prj', null, new Array(c1, c2), null).values;

        var checkStatus = false

        for (var i = 0; i < datasetPrincipal.length; i++) {
            var codIdSol = datasetPrincipal[i]["IDRESPONSAVEL"];
            var codIDCen = datasetPrincipal[i]["CODCENTRODECUSTO"];

            if (pegaCodCentroCusto == "30000179" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
                checkStatus = true
                break;
            }

            if (pegaCodCentroCusto == "30000192" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
                checkStatus = true
                break;
            }

            if (pegaCodCentroCusto == "30000209" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
                checkStatus = true
                break;
            }

            if (pegaCodCentroCusto == "30000210" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
                checkStatus = true
                break;
            }

            if (pegaCodCentroCusto == "30000217" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
                checkStatus = true
                break;
            } else {
                checkStatus = false
            }
        }

        if ((checkStatus == false && pegaCodCentroCusto == "30000179") || (checkStatus == false && pegaCodCentroCusto == "30000192") || (checkStatus == false && pegaCodCentroCusto == "30000209") || (checkStatus == false && pegaCodCentroCusto == "30000210") || (checkStatus == false && pegaCodCentroCusto == "30000217")) {

            
            FLUIGC.message.alert({
                message: 'Centro de custo restrito, você não possuí o acesso a este centro de custo. Gentileza solicitar acesso a este centro de custo entrando em contato com o Coordenador de obras, Alan de Lima Santos (alan.santos@oncoclinicas.com)',
                title: 'Atenção !!!',
                label: 'OK'
            }, function (el, ev) {
                window['zmCentroCustos___' + index].clear();
                    $('#cpCodCentroCustos___' + index).val('')


            })
        }

        

        
        // travar abertura de  outro centro de custo que nao esteja entre o cod 30000000 e 69999999 pela filial 05201
        if ((pegaCodFilial == "05201" && pegaCodCentroCusto < "30000000") ||  (pegaCodFilial == "05201" && pegaCodCentroCusto >"69999999"))  {
            FLUIGC.message.alert({
            message:    `Prezado (a), 
            O centro de custo selecionado não faz parte da estrutura de centros de custo do Instituto Oncoclínicas. 
            Ao selecionar esta unidade, por gentileza escolher um centro iniciado pelo número <strong>6</strong>. 
            Caso o lançamento seja referente a um projeto, favor selecionar o projeto em questão entre os centros de custo iniciados em <strong>3, 4 ou 5</strong>.
            Em caso de dúvidas, entre em contato com a Controladoria através do e-mail equipe.<strong>controladoria@oncoclinicas.com</strong>`,
                title: 'Atenção !!!',
                label: 'OK'
            }, function (el, ev) {
                 window['zmCentroCustos___' + index].clear();
                $('#cpCodCentroCustos___' + index).val('')
            })
        }
        regularizadora.setAlcadaAprovacao()
    } else if (id == 'zoomProduto') {

        if (validacao.validaProdutos([selectedItem])) {
            $('#cpCodProd___' + index).val(selectedItem.CODIGO)
            $('#cnaeProduto___' + index).val(selectedItem.CNAE)
            $('#cpCodIssForn___' + index).val(selectedItem.COD_ISS)

            let pegaValorCod = $('#cpCodProd___' + index).val()
            if (pegaValorCod < "000100") {

                FLUIGC.message.alert({
                    message: 'Este produto não pode ser adicionado no  processo GDE.Se refere a um serviço prestado(faturamento) e não a um serviço recebido.',
                    title: 'Atenção !!!',
                    label: 'OK'
                }, function (el, ev) {
                    window['zoomProduto___' + index].clear();
                    $('#cpCodProd___' + index).val('')
                })


            }

        } else {
            FLUIGC.message.alert({
                message: 'Não É Permitida A Entrada Deste Produto Nessa Solicitação.',
                title: 'Atenção !!!',
                label: 'OK'
            }, function (el, ev) {
                window['zoomProduto___' + index].clear();
            });
        }
    } else if (id == 'zoomCondicaoPagamento') {

        $('#cpCodCondPagamento').val(selectedItem.CODIGO)
    } else if (id == 'novoProduto') {
        $('#cpNovoCodProduto___' + index).val(selectedItem.CODIGO)
    }
}

// oculta o campo do pedido de compras quando for removido o fornecedor ou filial
function removedZoomItem(removedItem) {
    var id = removedItem.inputId.split('___')[0];
    var index = removedItem.inputId.split('___')[1];
    if (id == 'zoomFilial') {

        $('#cpCodFilial').val('');
        $('#pedidoCompras').hide();
        $('#tbItensReg tbody tr').not(':first').remove();
        $('#tbItensGds tbody tr').not(':first').remove();
        $('#zoomPedidoComp').val('')
        $('#cpVlrMercadoria').val('R$ 0,00');
        $('#cpDescontoTotais').val('R$ 0,00');
        $('#cpVlrBruto').val('R$ 0,00');
        $('#cpCodCondPagamento').val('')
    } else if (id == 'zoomFornecedor') {

        $('#cpCodFornecedor').val('')
        $('#cpEstado').val('');
        $('#cpMunicipio').val('');
        $('#pedidoCompras').hide();
        $('#tbItensReg tbody tr').not(':first').remove();
        $('#tbItensGds tbody tr').not(':first').remove();
        $('#zoomPedidoComp').val('')
        $('#cpVlrMercadoria').val('R$ 0,00');
        $('#cpDescontoTotais').val('R$ 0,00');
        $('#cpVlrBruto').val('R$ 0,00');
        $('#cpCodCondPagamento').val('')

    } else if (id == 'zoomPedidoComp') {

        $('#tbItensReg tbody tr').not(':first').remove();
        $('#tbItensGds tbody tr').not(':first').remove();
        $('#cpVlrMercadoria').val('R$ 0,00');
        $('#cpDescontoTotais').val('R$ 0,00');
        $('#cpVlrBruto').val('R$ 0,00');
        $('#cpCodCondPagamento').val('')
        $('#cpTipoLancamento').val('')

    } else if (id == 'zoomEspecieNf') {

        $('#cpCodEspecieNf').val('');

    } else if (id == 'zoomCentroCusto') {

        $('#cpCodCentroCustos___' + index).val('')

    } else if (id == 'zoomProduto') {

        $('#cpCodProd___' + index).val('')
        $('#cnaeProduto___' + index).val('')

    } else if (id == 'zoomCondicaoPagamento') {

        $('#cpCodCondPagamento').val('')

    }
}

// funçao que seta o proximo aprovador
function proximoAprovador() {
    var aprovadores = JSON.parse($('#cpAprovadores').val());
    var nivel = parseInt($('#cpNivelAprovacao').val());
    if (aprovadores.length > nivel + 1) {
        $('#cpAprovador').val(aprovadores[nivel + 1].ID)
    }
}
// seta os valores na tabela de pesquisa de satisfaçao do fornecedo
function startPesquisaForncedor() {
    $('#tbSatisfacaoFornecedor tbody tr').not(':first').remove();
    var cst = [];
    cst.push(DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST));
    cst.push(DatasetFactory.createConstraint("tablename", "tabelaPesquisa", "tabelaPesquisa", ConstraintType.MUST));
    var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, cst, null).values;

    dataset.forEach(pergunta => {
        var index = wdkAddChild("tbSatisfacaoFornecedor");
        $('#cpPergunta___' + index).val(pergunta.pergunta)
    });
}
// verifica se a nota ja se encontra no protheus ou se a mesma ja esta inserida por outro gde
function verificaNotaExistente() {
    var numero = $('#cpNumNota').val()
    numero = numero.replace(/[eE.,]/g, '')
    for (var i = numero.length; i < 9; i++) {
        numero = "0" + numero
    }
    $('#cpNumNota').val(numero)
}

function startEvents() {
    let regularizadora = new AutonomiaRegularizadora();
    let gds = new GDE();
    // let validacao = new Validacao()

    $('#cpTipoPagamento').change(function () {
        evtTipoPagamento(this, regularizadora)
    })

    $('#cpValorNota').change(function () {

        let aux = new Auxiliar();
        let total = aux.convertFloat($(this).val())

        if (total <= $('#cpTetoAutonomia').val()) {
            $('[for="taDescPagamento"]').html("Descrição da solicitação")
            $('#cpTipoLancamento').val("AUTONOMIA");
            $('#labelDataPrevista').text("Vencimento Negociado");
            $('#dtPagamento').prop('readonly', false);
            $('.cpNotaAtrasada').show();
            $('#divVencimento').hide()
            $('.dtPagamento').show()

        } else if ($("#cpCodFilial").val() == "07301"){
        	
        	$('[for="taDescPagamento"]').html("Descrição da solicitação")
            $('#cpTipoLancamento').val("AUTONOMIA");
            $('#labelDataPrevista').text("Vencimento Negociado");
            $('#dtPagamento').prop('readonly', false);
            $('.cpNotaAtrasada').show();
            $('#divVencimento').hide()
            $('.dtPagamento').show()
        	
        } else {
            $('[for="taDescPagamento"]').html("Descrição da solicitação e justificativa - necessário informar qual a Diretoria foi a aprovadora da demanda")
            $('#cpTipoLancamento').val('REGULARIZADORA');
            $('#labelDataPrevista').text("Pagamento Aprox.");
            $('#divVencimento').show();
            $('.dtPagamento').show()
	        $('#dtPagamento').val('');
	        $('#dtPagamento').prop('readonly', true);	   
	        $('#dtVencimento').prop('readonly', false);
	        regularizadora.calculaVencimento();
        }

        if ($('#cpTipoPagamento').val() == "2") {
            $('.dtVenvBoleto').html('Vencimento da Nota Fiscal');
        }

        $('#cpAlcada').val(true);
        regularizadora.setAlcadaAprovacao()
        regularizadora.calculaRateio()

    })
    $('#cpValorLiquido').change(function () {

        var validacao = new Validacao();
        validacao.verificacaoDDA();
    })

    $('#dtPagamento').change(function () {

        let dataAtual = new Date();
        dataAtual.setHours(0, 0, 0, 0);
        console.log(dataAtual);

        let dtEscolhida = (this.value).split("-");
        dtEscolhida = new Date(dtEscolhida[0], dtEscolhida[1] - 1, dtEscolhida[2]);

        var auxEscolha = dtEscolhida;


        $('#prazoMenor2dias').val('false');
        $('.divRenegociacao').hide();
        $('#flagVencimento').val("");
        tratativaCheckBox('renegociacaoMultaJur', false)
        tratativaCheckBox('renegociacaoM', false)

        if ($('#cpTipoSolicitacao').val() != 'gds' && $('#cpTipoPagamento').val() == '1' && $('#cpCnpjForncedor').val() != "" && $('#cpCodFilial').val() != "" && $('#cpValorNota').val() != "" && $('#dtVencimento').val() != "") {
            var validacao = new Validacao();
            validacao.verificacaoDDA();
        } else {

            var dataAux = dataAtual;

            //dataAux.setDate(dataAux.getDate() +  3);
            dataAux.setDate(dataAux.getDate() + diasUteis(1));

            if (dtEscolhida >= dataAux) {
                $('#divVencimento').hide();
                $('#ddaVencido').val('false')

                $('#prazoMenor2dias').val('false');
            } else {
                $('#ddaVencido').val('true')
                $('#divVencimento').show();

                $('#prazoMenor2dias').val('true');



                let dataVencimento = $('#dtVencimento').val().split("-");
                dataVencimento = new Date(dataVencimento[0], dataVencimento[1] - 1, dataVencimento[2]);

                if (dataAtual > dataVencimento) {
                    $('.dtPagamento').show();
                    $('.flagVencimento').show();
                    $('#flagVencimento').val("multa");




                    tratativaCheckBox('renegociacaoMultaJur', true)

                    dataAtual.setDate(dataAtual.getDate() + 2);
                    dataAtual = dataAtual.toISOString().split('T')[0];
                    document.getElementsByName("dtVencimento")[0].setAttribute('min', dataAtual);
                } else {

                    $('.divRenegociacao').show();
                    $('#flagVencimento').val("multa");
                    tratativaCheckBox('renegociacaoMultaJur', true)
                    tratativaCheckBox('renegociacaoM', true)

                    let dataX = new Date();
                    dataX.setHours(0, 0, 0, 0);
                    dataX.setDate(dataX.getDate() + diasUteis(1));
                    // dataX.setDate(dataX.getDate() + diasUteis(3));
                    dataX = dataX.toISOString().split('T')[0];
                    document.getElementsByName("dtVencimento")[0].setAttribute('min', dataX);

                }
            }
        }
    })

    $('#btnRemoveIten').click(function () {
        fnWdkRemoveChild(this);
        regularizadora.calculaTotalNota();
        event.stopPropagation();

    })

    $('#btnAddItem').click(function () {

        let indice = wdkAddChild("tbItensReg")
        $('#indiceReg').val(indice);
        $('.fs-md-space').removeClass('fs-md-space');
        $('#cpQuant___' + indice +
            ',#cpValorUnit___' + indice +
            ',#cpValorIpi___' + indice +
            ',#cpValorDesconto___' + indice).change(function () {

            regularizadora.evtTableItens(this)

        })
        MaskEvent.init();
        exibicaoProdutos(indice);

    })

    $('[name^=cpQuant___],[name^=cpValorUnit___],[name^=cpValorIpi___],[name^=cpValorDesconto___]').change(function () {

        var aux = new Auxiliar();
        var indice = this.name.split('___')[1];

        var quantidade = aux.convertFloat($('[name^=cpQuant___' + indice + ']').val());
        var vlrUnitario = aux.convertFloat($('[name^=cpValorUnit___' + indice + ']').val());
        var vlrIpi = aux.convertFloat($('[name^=cpValorIpi___' + indice + ']').val());
        var vlrDesconto = aux.convertFloat($('[name^=cpValorDesconto___' + indice + ']').val());

        var VlrTotal = ((quantidade * vlrUnitario) + vlrIpi) - vlrDesconto;
        $('[name^=cpValorTotal___' + indice + ']').val(aux.convertReal(VlrTotal))
        regularizadora.calculaTotalNota()
        $('#cpAlcada').val(true);

    })

    $('#cpValorTotalNota').change(function () {
        evtTipoPagamento(this, regularizadora)
    })

    $('#cpTipoSolicitacao').change(function () {
        evtCpTipoSolicitacao(this)
    })

    $('#dtEmissao').blur(function () {
        evtDtEmissao(this)
    })

    $('#cpSerieNota').blur(function () {
        evtCpSerie(this)
    })

    $('#cpNumNota').change(function () {
        var validacao = new Validacao();
        validacao.verificaNotaExistente(this)
    })

    $('[name^=cpQuantEntrada___]').change(function () {

        let aux = new Auxiliar();
        var index = this.id.split('___')[1]
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

    })

    $('#dtVencimento').blur(function () {

        let dataVencimento = $(this).val().split('-');
        dataVencimento = new Date(dataVencimento[0], (dataVencimento[1] - 1), dataVencimento[2])

        var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
        var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, [cst], null).values;
        let dataLimite = new Date()
        dataLimite.setHours(0, 0, 0, 0)
        var prazoMinimo = parseInt(dataset[0].cpPrazo)
        if ($('#cpTipoLancamento').text() == 'AUTONOMIA') {
            prazoMinimo = 2
        }
        while (prazoMinimo > 0) {

            if (dataLimite.getDay() != 6 && dataLimite.getDay() != 0) {

                dataLimite.setDate(dataLimite.getDate() + 1)
                prazoMinimo--;

            } else {

                dataLimite.setDate(dataLimite.getDate() + 1)

            }
        }

        if (dataVencimento < dataLimite) {

            $('#cpDataLimite').val(pad(dataLimite.getUTCDate()) + "/" + pad(dataLimite.getUTCMonth() + 1) + "/" + dataLimite.getUTCFullYear());

            FLUIGC.message.alert({
                //message: 'Nota fiscal está fora do prazo. Gentileza atentar para a data de vencimento. Para maiores dúvidas entrar em contato com a Central de Atendimento.',
                message: 'Vencimento negociado não poderá ser menor e igual a data ' + pad(dataLimite.getUTCDate()) + '/' + pad(dataLimite.getUTCMonth() + 1) + '/' + dataLimite.getUTCFullYear() + '.\nPara maiores dúvidas entrar em contato com a Central de Atendimento.',
                title: 'Atenção !!!',
                label: 'Sim'
            }, function (el, ev) {});

            $('#cpNotaAtrasada').val(true)
            $('.cpNotaAtrasada').show();

        } else {

            $('#cpNotaAtrasada').val(false)
            $('.cpNotaAtrasada').hide();

        }

        if ($('#cpTipoPagamento').val() == '1') {
            var validacao = new Validacao()
            validacao.verificacaoDDA()

        }
    })

    $('.nav-item').on('click', function (evento) {
        $('.active').removeClass('active')
        $(evento.target).addClass('active')
        $('.tab-pane').hide()
        $($(evento.target).prop('hash')).show()
        $(this).tab('show')
    })
    $('[name^=cpValorRateio___]').change(() => {
        regularizadora.calculaRateio()
    })

    $('#btnAddCC').click(() => {
        let index = wdkAddChild('tbRateio')
        MaskEvent.init()
        $('#cpValorRateio___' + index).change((el) => {
            regularizadora.calculaRateio()
        })
        $('#btnRemoveRateio___' + index).click((el) => {
            fnWdkRemoveChild(el.target)
            regularizadora.calculaRateio()
        })

    })

    $('#cpCSVRateio').change((el) => {
        let aux = new Auxiliar();
        let csvfile = el.target.files[0]
        var reader = new FileReader();
        reader.readAsText(csvfile);
        reader.onload = function (event) {

            var csv = event.target.result;
            var separator = {
                "separator": ";"
            };
            var data = $.csv.toArrays(csv, separator);
            $('#tbRateio').find('tbody tr').not(':first').remove();
            // separa os gestores das filiais
            $.each(data, function (i, linha) {

                if (i != 0 && linha[0] != '' && linha[0] != '') {
                    var indice = wdkAddChild("tbRateio");
                    $('#cpValorRateio___' + indice).change((el) => {
                        regularizadora.calculaRateio()
                    })
                    $('#btnRemoveRateio___' + indice).click((el) => {
                        fnWdkRemoveChild(el.target)
                        regularizadora.calculaRateio()
                    })
                    $('#cpCodCentroCustos___' + indice).val(linha[0]);
                    window['zmCentroCustos___' + indice].setValue(linha[0])
                    $('#cpValorRateio___' + indice).val(aux.convertReal(linha[1]))
                }
            });
            regularizadora.calculaRateio()
        }

    })

    $('[name^=btnRemoveRateio]').click((el) => {
        fnWdkRemoveChild(el)
        regularizadora.calculaRateio()
    })

}
// calcula o a data de vencimento do gds
function evtDtEmissao() {
    // let validacao = new Validacao();
    $('#dtPagamento').val('');
    if ($('#cpTipoSolicitacao').val() == "gds") {
        let gds = new Gds();
        gds.verificaVencimento()
        validacao.verificaNotaExistente()
    } else {
        if ($('#cpTipoLancamento').val() == 'REGULARIZADORA') {
            let reg = new AutonomiaRegularizadora()
            reg.calculaVencimento();
        }
        var validacao = new Validacao()
        validacao.verificaNotaExistente()
    }
    event.stopPropagation();
};
// define a aparencia do bota de tipo e renderiza os elementos necessarios para a solicitacao
function evtCpTipoSolicitacao(that) {
    var tipoSolicitacao = $(that).val()
    if (tipoSolicitacao == 'reg') {
        let regularizadora = new AutonomiaRegularizadora()
        $('#dtEmissao').val('');
        $('#dtPagamento').val('');        
        regularizadora.init()

    } else {
        let gds = new Gds();
        $('#dtEmissao').val('');
        $('#dtPagamento').val('');
        $('#cpTipoLancamento').val('')
        $('#divVencimento').show()
        $('.dtPagamento').show()
        $('#dtVencimento').prop("readonly", false);
        gds.verificaVencimento()
        gds.init();
    }

    event.stopPropagation();
};
// padroniza o numero da serie para o padrao do protheus
function evtCpSerie(that) {
    let valor = $(that).val();
    valor = new Auxiliar().normalizeString(valor)
    valor = valor.replace(/[R$.'",@#$%¨&*()+={}´`^~;.]/g, '');
    if (valor != '' &&
        valor != undefined &&
        valor != null &&
        valor.length < 3) {


        while (valor.length < 3) {
            valor = '0' + valor
        }
        $(that).val(valor)

    } else {

        valor = valor.substring(0, 3);
        $(that).val(valor)

    }

}

function evtTipoPagamento(that, objReg) {
    if ($('#cpTipoSolicitacao').val() != 'gds' && $('#cpTipoPagamento').val() == "2" && $('#cpBancoFornecedor').val() == "" && $('#cpAgFornecedor').val() == "" && $('#cpCCFornecedor').val() == "") {
        FLUIGC.message.alert({
            message: 'Dados bancários do fornecedor não cadastrados',
            title: 'Atenção !!!',
            label: 'OK'
        });
        $("#zoomFornecedor").val("")
        $("#cpCnpjForncedor").val("")
        $("#cpEstado").val("")
        $("#cpMunicipio").val("")
        $("#zoomFilial").val("")
        $("#cpCnpjFilial").val("")
        $("#cpTipoPagamento").val("")
        $("#lbValorNota").val("")
        $("#cpValorLiquido").val("")
        $("#lbDataEmissao").val("")
        $("#dtPagamento").val("")
        $("#cpLocalPres").val("")
    }

    $('.dda').hide();
    if ($('#cpTipoSolicitacao').val() == 'reg' &&
        $('#cpCodCadFilial').val() != '' &&
        $('#cpValorTotalNota').val() != '' &&
        $('#cpCodCentroCustos').val() != '') {
        objReg.setAlcadaAprovacao()
    }
    event.stopPropagation();
}

function pad(num) {
    var num_formatado = num;

    if (num < 10) {
        num_formatado = "0" + num;
    }

    return num_formatado;
};

function initGDE() {
    let regularizadora = new AutonomiaRegularizadora()
    let gds = new Gds();


    if ($('#cpTipoSolicitacao').val() == 'gds' ||
        $('#cpTipoSolicitacao').text() == 'GDS') {
        $('#labelDataPrevista').text("Pagamento Aprox.")
        gds.init();
    } else {
        if ($('#cpTipoLancamento').val() == 'REGULARIZADORA' ||
            $('#cpTipoLancamento').text() == 'REGULARIZADORA') {
            $('#labelDataPrevista').text("Pagamento Aprox.")

        } else {

            $('#labelDataPrevista').text("Vencimento Negociado")

        }
        regularizadora.init()
    }

    // adiciona funçao que da show/hide no botao da pesquisa de satisfação
    $('#cpDecisaoSolicitante').change(function () {
        if ($('#cpDecisaoSolicitante').val() == 'sim') {
            $('#iniciarPesquisa').show()
        } else {
            $('#iniciarPesquisa').hide()
        }
    });

    if ($('#cpMatriz').val() == 'false' ||
        $('#cpMatriz').val() == false) {

        $('#msgMatriz').text($('#cpLogMatriz').val());
        $('.alert').removeClass('alert-success')
        $('.alert').addClass('alert-danger')

    } else {

        $('#msgMatriz').text('Nota Apta a ser Classificada Automaticamente');
        $('.alert').addClass('alert-success')
        $('.alert').removeClass('alert-danger')

    }
    // adiciona funçao ao botao de aprovaçao do fiscal monstrando os motivos de reprovaçao
    $('#cpDecisaoFiscal').change(function () {
        if ($('#cpDecisaoFiscal').val() == 'sim') {
            $('.destinoVerificacao').hide()
        } else {
            $('.destinoVerificacao').show()
        }
    });

    $('#cpAliqISS, #cpINSS').change(function () {
        let valor = $(this).val()
        valor = valor.replace('.', '')
        if (valor.length > 4) {
            valor = valor.substring(0, 3);
        } else {
            while (valor.length < 4) {
                valor = '0' + valor;
            }
        }
        $(this).val(valor)
        MaskEvent.init()

    });
    if ($('#cpSimplesNacional').val() != 'Sim') {
        $('#cpAliqISS').val('00.00');
        $('#cpAliqISS').prop('readonly', true)
    } else {
        $('#cpAliqISS').val('');
        $('#cpAliqISS').prop('readonly', false)
    }
    if ($('#cpDecisaoFiscal').val() == 'sim') {
        $('.destinoVerificacao').show()
    }

}

function exibicaoProdutos(indice) {
    var filtro = '';
    var indice2 = indice
    var codServIssProd = $("#cpCodIss").val();

    if (codServIssProd.indexOf("-") == -1) {
        filtro = 'COD_ISS,' + codServIssProd;
    } else {
        var teste = codServIssProd;
        var tester = teste.split("-")

        for (let index = 0; index < tester.length; index++) {
            filtro += 'COD_ISS,' + tester[index] + ',';
        }
        filtro = filtro.substring(0, filtro.length - 1)
    }
    reloadZoomFilterValues("zoomProduto___" + indice2, filtro);

}

function tratativaCheckBox(idCampo, status) {
    $("#" + idCampo).prop("disabled", !status);
    $("#" + idCampo).prop("checked", status);
    $("#" + idCampo).prop("disabled", status);
}

function diasUteis(dias) { // Função retorna a quantidade de dias para adicionar a data atual considerando dias uteis
    var dtLimite = new Date();
    dtLimite.getDate();
    // dtLimite.setDate(dtLimite.getDate() - 1)
    dtLimite.setDate(dtLimite.getDate())
    var prazoMinimo = dias;
    var prazoMaximo = dias + 1;
    while (prazoMinimo >= 0) {
        if (dtLimite.getDay() == 6 || dtLimite.getDay() == 0) {
            dtLimite.setDate(dtLimite.getDate() + 1)
            prazoMaximo++;
        } else {
            dtLimite.setDate(dtLimite.getDate() + 1)
            prazoMinimo--;
        }
    }
    if (dtLimite.getDay() == 6) {
        prazoMaximo = prazoMaximo + 2;
    } else if (dtLimite.getDay() == 0) {
        prazoMaximo = prazoMaximo + 1;
    }
    return prazoMaximo;
}

function getAprovadorCoordCompras() {


    var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var datasetPai = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(constraintPai), null).values;
    for (var i in datasetPai) {
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
        var c1 = DatasetFactory.createConstraint("tablename", "tbCoordCompras", "tbCoordCompras", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
        // // Busca o dataset
        var ds_aprovador = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3), null).values;
    }

    var matrAprovador = ds_aprovador[0]['usuarioCoordCompras'];

    $("#matrCordCompras").val(matrAprovador);


}

var beforeSendValidate = function (numState, nextState) {

    var solicitacao = $("#cpCodSolicitacao").val();

    if (numState == 51) { //atv aprovar alteração pedido de vendas

        if ($("#cpDecisaoCompras").val() == "sim") {

            var fluig = $('#cpCodSolicitacao').val();

            $('input[id^="cpCodProduto___"]').each(function (index, value) {
                var seq = $(this).attr("id").split("___")[1];

                var item = $('#cpItem___' + seq).val();
                var codProduto = $('#cpCodProduto___' + seq).val();
                var nomeProduto = $('#novoProduto___' + seq).val();
                var codCentroCusto = $('#cpCodCentroCusto___' + seq).val();
                var nomeProdutoAntigo = $('#cpProduto___' + seq).val();

                var newProduto = $('#cpNovoCodProduto___' + seq).val();
                console.log("newProduto: " + newProduto)
                if (newProduto != "") {

                    var row = wdkAddChild("aux_tbItensAlterados");
                    $('#aux_cpItem___' + row).val(item);
                    $('#aux_cpProduto___' + row).val(nomeProduto);
                    $('#aux_cpCodProduto___' + row).val(newProduto);
                    $('#aux_cpCodCentroCusto___' + row).val(codCentroCusto);
                    $('#aux_obs___' + row).val("FLUIG: " + solicitacao + " - Produto: " + nomeProdutoAntigo + " substituido pelo: " + nomeProduto);
                    $('#aux_adicionais___' + row).val("FLUIG: " + solicitacao + " - Produto: " + nomeProdutoAntigo + " substituido pelo: " + nomeProduto);

                }
            });
        }

    }


}

function validarCpom() {

    var municipioFornecedor = $('#municipioFornecedor').val();
    var codFilial = $('#cpCodFilial').val();

    if (municipioFornecedor != '' && codFilial != '') {


        var listconstraint = [];
        listconstraint.push(DatasetFactory.createConstraint("codFilial", codFilial, codFilial, ConstraintType.MUST));
        var datasetPrincipal = DatasetFactory.getDataset("ds_filial_cpom", null, listconstraint, null);

        if (datasetPrincipal.values.length > 0) {
            var cidades = datasetPrincipal.values[0].codMunicipio;
            var filial = datasetPrincipal.values[0].codFilial;

            if (filial == codFilial && cidades != municipioFornecedor) {
                $('#mostraCpom').val('');
                $('#slCepom').val('')
                $('.cpom').show()

            } else {
                $('#mostraCpom').val('nao');
                $('#slCepom').val('S')
                $('.cpom').hide()
            }
        } else {
            $('#mostraCpom').val('nao');
            $('#slCepom').val('S')
            $('.cpom').hide()
        }
    }
}

function restricaoCustoPRJ(nomeSolic, pegaCodCentroCusto) {

    var c1 = DatasetFactory.createConstraint('IDRESPONSAVEL', nomeSolic, nomeSolic, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('CODCENTRODECUSTO', pegaCodCentroCusto, pegaCodCentroCusto, ConstraintType.MUST);
    var datasetPrincipal = DatasetFactory.getDataset('ds_restricao_codCusto_prj', null, new Array(c1, c2), null).values;

    var checkStatus = false

    for (var i = 0; i < datasetPrincipal.length; i++) {
        var codIdSol = datasetPrincipal[i]["IDRESPONSAVEL"];
        var codIDCen = datasetPrincipal[i]["CODCENTRODECUSTO"];

        if (pegaCodCentroCusto == "30000179" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
            checkStatus = true
            break;
        }

        if (pegaCodCentroCusto == "30000192" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
            checkStatus = true
            break;
        }

        if (pegaCodCentroCusto == "30000209" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
            checkStatus = true
            break;
        }

        if (pegaCodCentroCusto == "30000210" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
            checkStatus = true
            break;
        }

        if (pegaCodCentroCusto == "30000217" && nomeSolic == codIdSol && codIDCen == pegaCodCentroCusto) {
            checkStatus = true
            break;
        } else {
            checkStatus = false
        }
    }

    if ((checkStatus == false && pegaCodCentroCusto == "30000179") || (checkStatus == false && pegaCodCentroCusto == "30000192") || (checkStatus == false && pegaCodCentroCusto == "30000209") || (checkStatus == false && pegaCodCentroCusto == "30000210") || (checkStatus == false && pegaCodCentroCusto == "30000217")) {

         
        FLUIGC.message.alert({
            message: 'Centro de custo restrito, você não possuí o acesso a este centro de custo. Gentileza solicitar acesso a este centro de custo entrando em contato com o Coordenador de obras, Alan de Lima Santos (alan.santos@oncoclinicas.com)',
            title: 'Atenção !!!',
            label: 'OK'
        }, function (el, ev) {
            $("#cpCodCentroCustosAprov").val("").change();
            $("#zmCentroCustosAprov").val("").change();


        })
    }

}

function verificaFilial(){
	
	var filial = $("#cpCodFilial").val();
	
	if (filial == "07301"){
		
		$(".dtPagamento").show();
		
	}
	
}
function restricaoFilialUnity(pegaCodFilial) {

    var c1 = DatasetFactory.createConstraint('CODFILIAL', pegaCodFilial, pegaCodFilial, ConstraintType.MUST);
    var datasetPrincipal = DatasetFactory.getDataset('ds_restricao_filiais', null, new Array(c1), null).values;

    var checkStatus = false

    for (var i = 0; i < datasetPrincipal.length; i++) {
        var codIDFilial = datasetPrincipal[i]["CODFILIAL"];
        if (pegaCodFilial == codIDFilial) {
            checkStatus = false
            break;
        }  else {
            checkStatus = true
        }
    }

    if (checkStatus == false) {


        FLUIGC.message.alert({
            message: 'Prezado (a) as operações de registro de documentos para pagamentos desta empresa ainda não estão sendo realizadas por este fluxo no CSO. Favor entrar em contato com o setor de fiscal para maiores informações.',
            title: 'Atenção !!!',
            label: 'OK'
        }, function (el, ev) {
            $("#zoomFilial").val("").change();
            $("#cpCodFilial").val("").change();

            //window['zoomFilial'].clear();
            //$('#cpCodFilial').val("");
        })
    }

}