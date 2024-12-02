$(document).ready(function() {
    getParamsURL()
    var solicitante = new Solicitante();
    var alcadaAprovacao = new AlcadaAprovacao();
    
   
    $("#tbProd").tableHeadFixer({ "left": 3 });
    $(".fixedHeader").css('z-index', 3);
    if (CURRENT_STATE == INICIO || CURRENT_STATE == 0) {
        solicitante.init();
        $("#nomeSolicitante").val(solicitante.userName);        
        $('#dataSolicitacao').val(getCurrentDate());
        $("#idFluxo").val(getParametrosURL()); //Seta o id do Fluxo
        $("#emailSolicitante").val(parent.WCMAPI.userEmail)
        if ($("#idFluxo").val() == "FaturamentoComprasOncoprod") {
            $("#localEntrega").val(" ");
            $("#localEntrega").parent().hide();
            $("#prazoEntrega").attr('readonly', false);
            FLUIGC.calendar('#prazoEntrega');
        }
    } else if (CURRENT_STATE == CORRECAO_SOLICITANTE) {
        //Ativa as configurações dos campos
        solicitante.init();
        $("#ufFilial").trigger("change");
        $("[name^='numProd___']").each(function() {
                var indice = $(this).attr('id').split('___');
                solicitante.configRowProd(indice[1]);
            })
            //Exibe o fieldset de reprovação
        showMotivoReprovacao();
        $("#zoomFilial").attr('disabled', 'disabled');
        //Reseta as alcadas de aprovação
        $('#aprovadorAlcadaAtual').val('');
        $('#contadorAlcada').val('1');
        $('#existeAlcada').val('nao');
        if ($("#idFluxo").val() == "FaturamentoComprasOncoprod") {
            $("#localEntrega").parent().hide();
        }
    } else if (CURRENT_STATE == VALIDACAO_CLINICA) {
        $("#nomeAprovadorClinica").val(solicitante.userName);
        $('#dataAprovacaoClinica').val(getCurrentDate());
        configMotivo('[name="aprovacaoClinica"]', '#motivoRepovacaoClinica');
        //Remove a lixeira do paiFilho
        $("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();

        if ($("[name='aprovacaoOncoprod']").val() == 'nao') {
            $("#lblDecisaoClinica").text("Decisão automatica. Solicitação foi reprovada pela oncoprod.");
            $("#lblDecisaoClinica").css('color', '#F44336');
            $("#aprovacaoClinicaNao").attr('checked', 'checked').change();
            $('#fieldsetClinica :radio:not(:checked)').attr('disabled', true);
        }

        if($("#idFluxo").val() != "FaturamentoComprasOncoprod"){
	        var valorTotal = $('#valorTotal').val();
	
	        var dataSetDs_aprovsRemessaOncoprod = DatasetFactory.getDataset('ds_aprovsRemessaOncoprod', null, new Array(), null).values;
	
	        if (removeMascaraMonetaria(valorTotal) >= dataSetDs_aprovsRemessaOncoprod[0].VALOR_SEM_MASCARA) {
	            $('#passarNaAlcada').val('SIM');
	            $('#aprovadorAlcadaAtual').val(dataSetDs_aprovsRemessaOncoprod[0].CODUSUARIO);
	
	        } else {
	            $('#passarNaAlcada').val('NAO');
	            $('#aprovadorAlcadaAtual').val('SEM USUARIO PARA ATRIBUICAO');
	        }
        }

        //Exibe o fieldset de reprovação
        showMotivoReprovacao();
    } else if (CURRENT_STATE == VALIDACAO_ONCOPROD) {
        $("#nomeAprovadorOncoprod").val(solicitante.userName);
        $('#dataAprovacaoOncoprod').val(getCurrentDate());
        configMotivo('[name="aprovacaoOncoprod"]', '#motivoRepovacaoOncoprod');
        $('[name^="motivoRepovacao"]').val("");
        //Remove a lixeira do paiFilho
        $("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
    } else if (CURRENT_STATE == ALCADA_APROVACAO) {
        $('.alcadaApora1').hide();
        $('#fieldset'+$("#contadorAlcada").val()+'Alcada').show();
        $('#nomeAprovadorAlcada1').val(solicitante.userName);
        $('#dataAprovacaoAlcada1').val(getCurrentDate());
        $("#existeAlcada").val("nao");

        if(parseInt($("#contadorAlcada").val()) == 1){
            $('#aprovacaoAlcada1').prop('checked', false);
            $('input[name="aprovacaoAlcada1"]').prop('checked', false);
            $('#aprovadoAlcada').val('2');
        }

        $('[name="aprovacaoAlcada1"]').change(function() {

            if (this.value == 'sim') {
                $('#aprovadoAlcada').val('1');
                $('.alcadaApora1').hide();
            } else if (this.value == 'nao') {
                $('#aprovadoAlcada').val('2');
                $('.alcadaApora1').show();
            }
        });

        //Quando reprovação exibe o campo de motivo
        //configMotivo('[name="aprovacaoAlcada' + alcadaAtual + '"]', '#motivoRepovacaoAlcada' + alcadaAtual);
        //	configMotivo('[name="aprovacaoAlcada1]', '#motivoRepovacaoAlcada' + '1');


        var alcadaAtual = parseInt(alcadaAprovacao.contadorAlcada);
        for (var i = 1; i <= alcadaAtual; i++) {
        	$('#fieldset' + i + 'Alcada').show();
        	if (i == alcadaAtual) {//Seta o nome do aprovador da alcada atual
        		$('#nomeAprovadorAlcada' + i).val(solicitante.userName);
        		$('#dataAprovacaoAlcada' + i).val(getCurrentDate());
        	}
        }
        //Quando reprovação exibe o campo de motivo
        configMotivo('[name="aprovacaoAlcada' + alcadaAtual + '"]', '#motivoRepovacaoAlcada' + alcadaAtual);
        /*var proximaAlcada = parseInt(alcadaAprovacao.contadorAlcada) + 1;
        var proximoAprovador = $("#aprovadorAlcada" + proximaAlcada).val();
        if (proximoAprovador != "") {
        	$('#aprovadorAlcadaAtual').val(proximoAprovador);
        } else {
        	$("#existeAlcada").val("nao");
        }*/
        //Remove a lixeira do paiFilho
        $("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
    } else if (CURRENT_STATE == EXCECAO_INTEGRACAO) {
        //Função executada ao apertar o botão enviar que gera o xml
        $('button[data-send]', parent.document).bind("click", function() {
            console.log('RODOU BTN SEND');
            var pedidoCompra = new PedidoCompra();
            pedidoCompra.createXml();
        });
        showMotivoReprovacao();
    } else if (CURRENT_STATE == ATENDER_PEDIDO) { //ANEXAR NF (FATURAMENTO)
        if ($("#idFluxo").val() == "RemessaComprasOncoprod") {
            $('.atenderPedido').show();
            $('.containerBtnImportCsv').css('display', 'none');
            $('.verificaProdutos').show();
            //Verifica os produtos pendentes
            $("[name^='qtdAtendidoProd']").each(function() {
                $(this).change(function() {
                    var indice = $(this).attr('id').split('___');
                    var qtdAtendidos = parseInt($(this).val());
                    var qtdSolicitada = parseInt($("#caixaProd___" + indice[1]).val());
                    var pendentes = qtdSolicitada - qtdAtendidos;

                    if (pendentes != 0) {
                        $("#pendentesProd___" + indice[1]).addClass('error-field');
                    } else {
                        $("#pendentesProd___" + indice[1]).removeClass('error-field');
                    }
                    $("#pendentesProd___" + indice[1]).val(pendentes);
                    sumTotal("qtdAtendidoProd", "totalQtdAtendidoProd");
                    sumTotal("pendentesProd", "totalPendentesProd");
                });
            });
            //import csv dos produtos atendidos
            FLUIGC.utilities.parseInputFile("#importAtendidos");
            $("#importAtendidos").change(function(event) {
                var reader = new FileReader();
                reader.readAsText(event.target.files[0]);
                reader.onload = function(event) {
                    var csv = event.target.result;
                    var separator = { "separator": ";" };
                    var data = $.csv.toArrays(csv, separator);
                    for (var row in data) {
                        if (data[row][0] == 'COD ONCOPROD') {
                            continue;
                        }
                        var codProtheus = data[row][1];
                        var qtdAtendidos = data[row][4];
                        var obs = data[row][6];
                        $("[name^='numProd']").each(function() {
                            var fieldVal = $(this).val();
                            if (fieldVal != '') {
                                fieldVal = fieldVal.substring(1, fieldVal.length); //remove o primeiro zero do campo.
                                if (fieldVal == codProtheus) {
                                    var indice = $(this).attr('id').split('___');
                                    $("#qtdAtendidoProd___" + indice[1]).val(qtdAtendidos).change();
                                    $("#obsOncoprod___" + indice[1]).val(obs);
                                    return false; //Break for each
                                }
                            }
                        });
                    }
                }
            });


        } else { //FATURAMENTO
            $("#_localEntrega").parent().hide();
        }
        showMotivoReprovacao();
        //Remove a lixeira do paiFilho
        $("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
        $('#numPedido').parent().show();
    } else if (CURRENT_STATE == VERIFICAR_PRODUTOS) { //LANÇAMENTO ABAX (FATURAMENTO)
        if ($("#idFluxo").val() == "RemessaComprasOncoprod") {
            var alcadaAtual = parseInt(alcadaAprovacao.contadorAlcada) - 1;
            for (var i = 1; i <= alcadaAtual; i++) {
                $('#fieldset' + i + 'Alcada').show();
            }
            $("#nomeAprovadorCompras").val(solicitante.userName);
            $('#dataAprovacaoCompras').val(getCurrentDate());
            $('.atenderPedido').show();
            $('.qtdAtendidoProd').show();
            $('.verificaProdutos').show();
            $("[name^='pendentesProd___']").each(function() {
                var indice = $(this).attr('name').split('___');
                indice = indice[1];
                var pendentes = $(this).val();
                if (pendentes != 0) {
                    $(this).addClass('error-field');
                    $("#qtdAguardarProd___" + indice).prop('readonly', '');
                    $("#qtdAguardarProd___" + indice).change(function() {
                        try {
                            if (parseInt($(this).val()) > parseInt($("#pendentesProd___" + indice).val())) {
                                $(this).val("");
                            }
                        } catch (e) {
                            $(this).val("");
                        }
                        sumTotal("qtdAguardarProd", "totalQtdAguardarProd");
                        //Desativa a opção de reprovar quando existe intes a aguardar
                        if (parseInt($('#totalQtdAguardarProd').val()) > 0) {
                            $("#aprovacaoComprasNao").prop('checked', 'checked').change();
                            $('#fieldsetCompras :radio:not(:checked)').attr('disabled', true);
                        } else {
                            $("#aprovacaoComprasNao").prop('checked', false).change();
                            $('#fieldsetCompras :radio:not(:checked)').attr('disabled', false);
                        }
                    });
                } else {
                    $("#qtdAguardarProd___" + indice).val("");
                    sumTotal("qtdAguardarProd", "totalQtdAguardarProd");
                }

            });
            configMotivo('[name="aprovacaoCompras"]', '#motivoRepovacaoCompras', function(val) {
                if (val == 'sim') {
                    $("#content-pesquisa").show();
                } else {
                    $("#content-pesquisa").hide();
                }
            });
        } else { //FATURAMENTO
            $("#_localEntrega").parent().hide();
            //Exibe o fieldset de reprovação
            showMotivoReprovacao();
            $("#nomeAprovadorFaturamento").val(solicitante.userName);
            $('#dataAprovacaoFaturmaneto').val(getCurrentDate());
            configMotivo('[name="aprovacaoFaturamento"]', '#motivoRepovacaoFaturamento', function(val) {
                if (val == 'sim') {
                    $("#content-pesquisa").show();
                } else {
                    $("#content-pesquisa").hide();
                }
            });
        }
        $('#numPedido').parent().show();
        //Remove a lixeira do paiFilho
        $("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
        //Inicia pesquisa de satisfação
        initPesquisa();
    }

    if ($("#idFluxo").val() == "FaturamentoComprasOncoprod") {
        $(".labelQtdCaixa").text('Faturar');
        $("#_localEntrega").parent().hide();
    }

    //ajusta layout do campo pai filho
    $(".fs-md-space").each(function() {
        $(this).removeClass("fs-md-space");
    });
})