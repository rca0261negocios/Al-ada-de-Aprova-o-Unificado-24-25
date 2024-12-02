var INICIO = 0;
var INICIO1 = 3;
var AVALIACAO_GESTOR = 36;
var CORRIGIR_INCONSISTENCIA = 10;
var TRATATIVA_MEDICAO = 64;
var VALIDACAO_FISCAL = 50;
var PROGRAMACAO_TITULO = 20;
var APROV_SOLICITANTE = 27;
var SOLUCAO_INCONSISTENCIA = 29;
var INCONSISTENCIA_COMPRAS = 151;
var VISUALIZAR_TRATATIVA = 156;
var TRATAVIVA_ERRO_INTEGRACAO = 168;

var PREGUIANDO = 207;
var myLOADING = FLUIGC.loading(window, {
    textmessage: 'Processando...'
});


// DOCUMENT READ
$(document).ready(function () {
    //Inicia pesquisa de satisfação
    //initPesquisa();
    
    // Previne o comportamento padrão do Enter
    $(document).on('keypress', function (e) {
        if (e.which == 13 && e.target.id.indexOf('descProduto') <0) { // Código da tecla Enter e exceção para descProduto
            e.preventDefault(); // Previne o comportamento padrão
        }
    });
    
    //getParamsURL();
    validarCpom();
    $('#indexRateio').val($('#tbRateio').find('tbody tr').length - 1)
    $('#indexProd').val($('#tbProdutos').find('tbody tr').length - 1)

    if(($("#decisaoGestor1Apro").prop('checked') == true || $("#_decisaoGestor1Apro").prop('checked') == true ) && $("#exampleCheckrene").val() != ""){              
        $("#AlertaMultaJuros").show()
    }
    if ($("#dataAprovGestor1").val().indexOf("/") != -1){
        $("#avaliacaoGestor1").show();
    }
    if ($("#statusDDAHide").val() == "ddaSuccess"){
        $(".ddaSuccess").show(); 
    }else if ($("#statusDDAHide").val() == "ddaDanger"){
        $(".ddaDanger").show(); 
    }
    if ($("#statusBoletoHide").val() == "boletoVencido"){
        $(".boletoVencido").show(); 
    }
    if (MODO_EDICAO == "ADD") {
        addEventSendFluig(function () {
            consultaSaldoContrato()  
        });            
    }

    if (MODO_EDICAO == "VIEW") {
        if ($("#dataAprovGestor1").html().indexOf("/") == -1){
            $("#avaliacaoGestor1").hide();
        }
        if ($("#dataAprovGestor2").html().indexOf("/") == -1){
            $("#avaliacaoGestor2").hide();
        }
        if ($("#dataAprovGestor3").html().indexOf("/") == -1){
            $("#avaliacaoGestor3").hide();
        }
        if ($("#dataAprovGestor4").html().indexOf("/") == -1){
            $("#avaliacaoGestor4").hide();
        }
        if ($("#dataAprovGestor5").html().indexOf("/") == -1){
            $("#avaliacaoGestor5").hide();
        }
        if ($("#dataAprovTratativaMedicao").html().indexOf("/") == -1){
            $("#tratativaMedicao").hide();
        }
        if ($("#dataAprovFiscal").html().indexOf("/") == -1){
            $("#validacaoFiscal").hide();
        }
        if ($("#dataAprovTitulo").html().indexOf("/") == -1){
            $("#validacaoTitulo").hide();
        }
        if ($("#dataInconsistencia").html().indexOf("/") == -1){
            $("#inconsistencia").hide();
        }
        if ($("#zoomEspecieNf").html() == "&nbsp;"){
            $("#informacoesFiscais").hide();
        }
        if ($("#solucaoTomada").html() == "&nbsp;"){
            $("#aprovacaoSolucaoFornecedor").hide();
        }
        if ($("#motivoAprovSolicitacao").html() == "&nbsp;"){
            $("#motivoAprovSolicitacao").parent().parent().hide();
        }
        if($("#dataVencimento").html() == "&nbsp;"){            
            $("#dtvenci").hide()
            $("#dtvst").show()
            $(".dda").show()
        }
        if ($("#dataVencimento").html().indexOf("/") != -1){
            $(".dda").hide()
            $("#dtvenci").show()
            $("#dtvst").hide()
        }
        if($("#exampleCheckrene").val() != ""){                
            $("#negociaMultaJuros").show()
            $("#dtvn").show()            
        }else {
            $("#dtvn").hide()
        }
        if($("#codAvaliaForn").html() != ""){                
            $(".solicAvalForn").show()
            $("#divBtPesquisaSatisfacao").show()            
        }
        //$("#iniciarPesquisa").hide()  
    }

    if (!(ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR_INCONSISTENCIA )){
        if (MODO_EDICAO != "VIEW") {
        if($("#_dataVencimento").val() == "" || $("#dataVencimento").val() == ""){            
            $("#dtvenci").hide()
            $("#dtvst").show()
        }
    }
        if($("#exampleCheckrene").val() != ""){                
            $("#negociaMultaJuros").show()
            $("#renegociacaoMulta").prop("checked", true)            
            $("#multaJuros").prop("checked", true)            
            $("#multaJuros").prop("disabled", true)
            $("#renegociacaoMulta").prop("disabled", true)
            if($("#decisaoGestor1Apro").prop('checked') == true){                
                $("#AlertaMultaJuros").show()
            }
        }
        if($("#exampleCheckrene").val() != ""){                
            $("#negociaMultaJuros").show()
            $("#dtvn").show()            
        }else {
            $("#dtvn").hide()
        }
    }

    if (ATIVIDADE == AVALIACAO_GESTOR) {
        if($("#_dataVencimento").val() == ""){            
            $("#dtvenci").hide()
            $("#dtvst").show()
        }
        if($("#exampleCheckrene").val() != ""){                
            $("#negociaMultaJuros").show()
            $("#renegociacaoMulta").prop("checked", true)            
            $("#multaJuros").prop("checked", true)            
            $("#multaJuros").prop("disabled", true)
            $("#renegociacaoMulta").prop("disabled", true)
        }
        if(($("#_dataVencNegociado").val() == "" || $("#_dataVencNegociado").val() == undefined) && ($("#dataVencNegociado").val() == "" || $("#dataVencNegociado").val() == undefined)){                
            $("#dtvn").hide()
        }else{
            $("#dtvn").show()
        }
        if($("#_dataVencNegociadoDeposito").val() != ""){                
            $("#dtvnd").show()
        }
    }

    if (ATIVIDADE == TRATATIVA_MEDICAO || ATIVIDADE == TRATAVIVA_ERRO_INTEGRACAO) {
        if($("#dataVencimento").val() == ""){            
            $("#dtvenci").hide()
            $("#dtvst").show()
        }
        if($("#exampleCheckrene").val() != ""){                
            $("#negociaMultaJuros").show()
        }
        if(($("#_dataVencNegociado").val() == "" || $("#_dataVencNegociado").val() == undefined) && ($("#dataVencNegociado").val() == "" || $("#dataVencNegociado").val() == undefined)){                
            $("#dtvn").hide()
        }else{
            $("#dtvn").show()
        }
        if($("#dataVencNegociadoDeposito").val() != ""){                
            $("#dtvnd").show()
        }
        $('#zmCentroCustosAprov').prop('disabled', 'disabled');


    }

    if (ATIVIDADE == CORRIGIR_INCONSISTENCIA || ATIVIDADE == PREGUIANDO) {
        if (MODO_EDICAO == "MOD") { 
        	
        	var excecao = verificaCCExcecao();
        	if (excecao){        		
        		buscaGestorCC();        		
        	}else{
        		buscaGestor();
        	}
            
            if($("#dataVencimento").val().indexOf("/") != -1){
                $(".dda").hide()
                $("#dtvenci").show()
                $("#dtvst").hide()
            }
            if($("#_dataVencimento").val() == "" || $("#dataVencimento").val() == ""){            
                $("#dtvenci").hide()
                $("#dtvst").show()
                $('#dataVencimentoSemTrava').prop('readonly', true);
            }
            if(($("#_dataVencNegociado").val() == "" || $("#_dataVencNegociado").val() == undefined) && ($("#dataVencNegociado").val() == "" || $("#dataVencNegociado").val() == undefined)){                
                $("#dtvn").hide()
            }else{
                $("#dtvn").show()
            }
            if($("#dataVencNegociadoDeposito").val() != ""){                
                $("#dtvnd").show()
            }
            var lista = $("#atvAtual").val()
            if (lista != 0) {
                if ($("#exampleCheck").val() == "checked") {
                    $("#multaJuros").prop("checked", true)
                }
                if ($("#exampleCheckrene").val() == "checked") {
                    $("#renegociacaoMulta").prop("checked", true)
                }
            }
        }
    }

    if (ATIVIDADE != INICIO && ATIVIDADE != INICIO1 && ATIVIDADE != 0 && ATIVIDADE != CORRIGIR_INCONSISTENCIA) {
        $('#numContrato').prop('readonly', true);
        $('#zoomCompetencia').prop('readonly', true);
        $('#nomeFilial').prop('readonly', true);
        $('#nomeFornecedor').prop('readonly', true);
        $('#justCentral').prop('readonly', true);
        $("#dataVencimento").prop("readonly", true)
        if($("#valorliquido").val().indexOf("R$") == -1){
            $("#valorliquido").parent().hide();
            $("#prioridadepagamento").parent().hide();
        }
        /* if (MODO_EDICAO != "VIEW") {
            if($("#_valorliquido").val().indexOf("R$") == -1){
                $("#_valorliquido").parent().hide();
                $("#_prioridadepagamento").parent().hide();
            }
        } */
    }
    
    if (ATIVIDADE == CORRIGIR_INCONSISTENCIA) {   
        if (MODO_EDICAO == "MOD") {   
        	var excecao = verificaCCExcecao();
        	if (excecao){        		
        		buscaGestorCC();        		
        	}else{
        		buscaGestor();
        	}
            $('.fluig-style-guide').mousemove(function (e) {
                if (mudancaCorrecao == 111) {
                    //reload contrato
                    var c1 = DatasetFactory.createConstraint('CODIGO', $("#codFornecedor").val(), $("#codFornecedor").val(), ConstraintType.MUST);
                    var datasetDs_fornecedor = DatasetFactory.getDataset('ds_fornecedor', null, new Array(c1), null);
                
                    window['nomeFornecedor'].setValue(datasetDs_fornecedor.values[0].FILTRO);
                
                    $("#codFornecedor").val(datasetDs_fornecedor.values[0].CODIGO);
                    $("#codProdFornecedor").val(datasetDs_fornecedor.values[0].CODIGOS_ISS);
                    $("#lojFornecedor").val(datasetDs_fornecedor.values[0].LOJA);
                    $("#nomeFornecedor").val(datasetDs_fornecedor.values[0].FILTRO);
                    $('#cpSimplesNacional').val(datasetDs_fornecedor.values[0].SIMPLES_NACIONAL);
                
                    var cnpj = datasetDs_fornecedor.values[0].CGC;
                    if (cnpj.length <= 11) {
                        cnpj = cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
                    } else {
                        cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
                    }

                    $('#cnpjFornecedor').val(cnpj);
                    $("#numContrato").val("");
                    $("#revContrato").val("");
                    $("#codCondPagto").val("");
                    $("#condPagto").val("");
                    $("#saldoContrato").val("");

                    window['numContrato'].clear()
                    var filtroContrato = "FILIAL, " + $("#codFilial").val() + ", EMAIL, " + $("#emailSolicitante").val() + ", COD_FORNECEDOR, " + $("#codFornecedor").val() + ", LOJA_FORNECEDOR, " + $("#lojFornecedor").val();
                    reloadZoomFilterValues('numContrato', filtroContrato);   
                    
                    FLUIGC.message.alert({
                        message: 'Favor selecionar o contrato novamente!',
                        title: 'Atenção!',
                        label: 'OK'
                    }, function (el, ev) {

                    });
                    mudancaCorrecao = 'dhasjdasj';                             
                    $('.fluig-style-guide').off('mousemove');
                }
            });
        }
    }

    if (MODO_EDICAO != "VIEW") {
        var dataVencimento = FLUIGC.calendar("#dataVencimento");
        var dataMin = new Date()
        dataMin.setDate(dataMin.getDate() + 3)
        dataVencimento.setMinDate(dataMin);
        var dataEmissao = FLUIGC.calendar("#emissaoNota");
    }
    $('#dataVencimento').change(function () {
        var data = $('#dataVencimento').val();
        var dia = data.split("/")[0];
        var mes = data.split("/")[1];
        var ano = data.split("/")[2];
        $("#filtroDataVencimento").val(ano + "" + mes + "" + dia)
        $("#DataVencimentoHide").val(data)
    });

    $('[name^=cpValorRateio___]').change((el) => {
        calculaRateio()
        verificaCentroCusto()
    })
    $('[name^=btnRemoveRateio___]').click((el) => {
        fnWdkRemoveChild(el.target)
        calculaRateio()
    })
    $("#justFornecedor").hide()
    $('#cadFornecedor').blur(function () {
        var aChk = document.getElementsByName("cadFornecedor");
        for (var i = 0; i < aChk.length; i++) {
            if (aChk[i].checked == true) {
                $("#exampleForn").val("checked");
                $("#justFornecedor").show()
            } else {
                $("#exampleForn").val('notchecked');
                $("#justFornecedor").hide()
            }
        }
    });

    //$('#btnAddCC').click(() => {
    $('#btnAddCC').on('click', function(){
        let index = wdkAddChild('tbRateio')
        $('#cpValorRateio___' + index).maskMoney({
            prefix: 'R$ ',
            thousands: '.',
            decimal: ',',
            affixesStay: true,
            allowZero: true
        });
        $('#cpValorRateio___' + index).change((el) => {
            calculaRateio()
        })
        $('#btnRemoveRateio___' + index).click((el) => {
            fnWdkRemoveChild(el.target)
            calculaRateio()
        })
        $('#indexRateio').val($('#tbRateio').find('tbody tr').length - 1)
        $('#indexProd').val($('#tbProdutos').find('tbody tr').length - 1)

    });
    
    $('#cpCSVRateio').change((el) => {
        $('table[tablename=tbRateio] tbody tr').not(':first').remove();
        WdksetNewId('{"tblAprovacao":0}');
        let csvfile = el.target.files[0]
        var reader = new FileReader();
        reader.readAsText(csvfile);
        reader.onload = function (event) {

            var csv = event.target.result;
            var separator = {
                "separator": ";"
            };
            var data = $.csv.toArrays(csv, separator);
            // separa os gestores das filiais
            $.each(data, function (i, linha) {

                if (linha[0] != '' && linha[0] != '') {

                    if (verificaCentroCusto(linha[0])) {
                        //NAO PERMITE CC DUPLICADO NA TABELA
                        if($('[tablename="tbRateio"] tbody tr').length == 1){
                            var indice = wdkAddChild("tbRateio");
                                                       
                        	var c1 = DatasetFactory.createConstraint("CODIGO", linha[0], linha[0], ConstraintType.MUST);                        	
                        	var dataset = DatasetFactory.getDataset("ds_centroCusto", null, new Array(c1), null);	
                        	
                            window['zmCentroCustos___' + indice].setValue(dataset.values[0].FILTRO);
                            $('#cpValorRateio___' + indice).val(linha[1])
                            $('#cpCodCentroCustos___' + indice).val(linha[0]);
                            calculaRateio()
                        }else{
                            var ccRepetido = false;
                            $('[name^=cpCodCentroCustos___]').each((index, el) => {
                                var ccTable = $(el).val()            
                                if(!ccRepetido){
                                    if(linha[0] == ccTable){
                                        FLUIGC.message.alert({
                                            message:    `O centro de custo <b>`+ linha[0] +`</b> está duplicado, favor ajustar o arquivo de importação!`,
                                                title: 'Atenção !!!',
                                                label: 'OK'
                                            }, function (el, ev) {
                                                ccRepetido = true;    
                                                $('table[tablename=tbRateio] tbody tr').not(':first').remove();
                                                WdksetNewId('{"tblAprovacao":0}');     
                                                $('#cpValorTotalRateio').val("R$ 0,00");     
                                                cpValorTotalRateio
                                        })
                                    }
                                }            
                            }) 
                            if(ccRepetido == false){
                                var indice = wdkAddChild("tbRateio");
                                
                                var c1 = DatasetFactory.createConstraint("CODIGO", linha[0], linha[0], ConstraintType.MUST);                        	
                            	var dataset = DatasetFactory.getDataset("ds_centroCusto", null, new Array(c1), null);	
                            	
                                window['zmCentroCustos___' + indice].setValue(dataset.values[0].FILTRO);
                                
                                //window['zmCentroCustos___' + indice].setValue(linha[0])
                                $('#cpValorRateio___' + indice).val(linha[1])
                                $('#cpCodCentroCustos___' + indice).val(linha[0]);
                                calculaRateio()
                            }
                        }                         
                        //FIM CC DUPLICADO
                    } else {
                        mensagemComConfirmacao('Aviso', 'Alguns centro de custos de rateio não foram adicionados por estarem bloqueados!!! Favor procurar a área responsável para desbloqueio ou selecionar outro centro de custo.', null);
                    }
                }
            });
            calculaRateio();
            $('#indexRateio').val($('#tbRateio').find('tbody tr').length - 1)
            $('#indexProd').val($('#tbProdutos').find('tbody tr').length - 1)
        }

    })

    $("#addProduto").on("click", function () {
        addProduto();
    });

    $("#tipoMedicao").on("change", function () {
        if ($("#tipoMedicao").val() == "Medição com Nota") {
            $("#grupoTratativaMedicao").val("Pool:Group:CSO_NOTASABAX");
        } else {
            $("#grupoTratativaMedicao").val("Pool:Group:CSO_NOTAS");
        }
    });

    $("input[name=decisaoAprovSolicitacao]").click(function (e) {
        let valueSelected = this.value;
        if (valueSelected == "Sim") {
            $('#decisaoAprovSol').val($(this).val())
            $('#divBtPesquisaSatisfacao').show();
            $('.pesquisaAvaliacaoFornecedor').show();
        } else {
            $('#decisaoAprovSol').val($(this).val())
            $('#divBtPesquisaSatisfacao').hide();
            $('.pesquisaAvaliacaoFornecedor').hide();

        }
    });

    // Definindo uma nota para o fornecedor na pesquisa de validação
    $(".estrelas").on("change", function () {
        $('.estrelas label i').removeClass('estrelaApagada');
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao").html(val);
        $("#pergunta1_documentos").val(val);
    });

    $(".estrelas2").on("change", function () {
        $('.estrelas2 label i').removeClass('estrelaApagada2');
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao2").html(val);
        $("#pergunta2_equipe").val(val);
    });

    $(".estrelas3").on("change", function () {
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao3").html(val);
        $("#pergunta3_prazo").val(val);
    });

    $(".estrelas4").on("change", function () {
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao4").html(val);
        $("#pergunta4_cobranca").val(val);
    });

    $(".estrelas5").on("change", function () {
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao5").html(val);
        $("#pergunta5_conformidade").val(val);
    });

    $(".estrelas6").on("change", function () {
        $('.estrelas6 label i').removeClass('estrelaApagada6');
        var val = $(this).find('input:checked').val();
        $("#notaAvaliacao6").html(val);
        $("#pergunta6_qualidade").val(val);
    });

    $(".estrelas").on("dblclick", function () {
        $('.estrelas label i').addClass('estrelaApagada');
        $("#pergunta1_documentos").val('');
    });

    $(".estrelas2").on("dblclick", function () {
        $('.estrelas2 label i').addClass('estrelaApagada2');
        $("#pergunta2_equipe").val('');
    });

    $(".estrelas6").on("dblclick", function () {
        $('.estrelas6 label i').addClass('estrelaApagada6');
        $("#pergunta6_qualidade").val('');
    });

    if ($('#atvAtual').val() != APROV_SOLICITANTE) {
        $(".estrelas2").unbind();
        $(".estrelas").unbind();
        $(".estrelas6").unbind();
    }
    if ($('#atvAtual').val() == TRATATIVA_MEDICAO) {
        $("#cpBaseCalculo").val('');

        if ($('#cpSimplesNacional').val() != 'Sim') {
            $('#cpAliqISS').val('00.00');
            $('#cpAliqISS').prop('readonly', true)
        } else {
            $('#cpAliqISS').val('');
            $('#cpAliqISS').prop('readonly', false)
        }

    }
    $('#serieNF').blur(function () {
        let valor = $(this).val();
        valor = valor.replace(/[R$.'",@#$%¨&*()+={}´`^~;.]/g, '');
        if (valor != '' && valor != undefined && valor != null && valor.length < 3) {
            while (valor.length < 3) {
                valor = '0' + valor
            }
            $(this).val(valor)
        } else {
            valor = valor.substring(0, 3);
            $(this).val(valor)
        }
    });

    $('#notaFiscal').blur(function () {
        let valor = $(this).val();
        valor = valor.replace(/[R$.'",@#$%¨&*()+={}´`^~;.]/g, '');
        if (valor != '' && valor != undefined && valor != null && valor.length < 9) {
            while (valor.length < 9) {
                valor = '0' + valor
            }
            $(this).val(valor)
        } else {
            valor = valor.substring(0, 9);
            $(this).val(valor)
        }
    });

    addMascara();
    pegaDataAprovPrevista();
    atualizaRevisao();

    // Setando o valor (das estrelas) inicial como zero na pesquisa de validação fornecedor
    $('input:radio[name="avaliacaoFornecedor"]').filter('[value=""]').attr('checked', true);
    $('input:radio[name="avaliacaoFornecedor2"]').filter('[value=""]').attr('checked', true);
    $('input:radio[name="avaliacaoFornecedor3"]').filter('[value=""]').attr('checked', true);
    $('input:radio[name="avaliacaoFornecedor4"]').filter('[value=""]').attr('checked', true);
    $('input:radio[name="avaliacaoFornecedor5"]').filter('[value=""]').attr('checked', true);
    $('input:radio[name="avaliacaoFornecedor6"]').filter('[value=""]').attr('checked', true);

    $('#tituloParaCentral').blur(function () {
        var tamanho = $('#tituloParaCentral').val()

        if (tamanho.length > 100) {
            alert('Tamanho maximo 100 caracteres');
            $('#tituloParaCentral').val(tamanho.substring(0, 100));
        }
    });

    $('#indexRateio').val($('#tbRateio tbody tr').not(':first').length);

    //Data do Vencimento do Boleto
    var maxDate = new Date();
    var minDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);

    if (MODO_EDICAO != "VIEW") {
        FLUIGC.calendar("#dataVencNegociado", {
            language: 'pt-br',
            minDate: maxDate,
            // maxDate: maxDate,
            pickDate: true,
            pickTime: false,
            daysOfWeekDisabled: [0, 6]
        });
    };
    $("#dataVencNegociado").change(function () {
        var data = $('#dataVencNegociado').val();
        var dia = data.split("/")[0];
        var mes = data.split("/")[1];
        var ano = data.split("/")[2];
        $("#filtroDataVencimento").val(ano + "" + mes + "" + dia)
        $("#DataVencimentoHide").val(data)        
    });   

    // Data Vencimento do Deposito Bancario
    var maxDate = new Date();
    var minDate = new Date();
    maxDate.setDate(maxDate.getDate() + 3);

    if (MODO_EDICAO != "VIEW") {
        FLUIGC.calendar("#dataVencNegociadoDeposito", {
            language: 'pt-br',
            minDate: maxDate,
            //maxDate: maxDate,
            pickDate: true,
            pickTime: false,
            daysOfWeekDisabled: [0, 6]
        });
    };

    //escolhe a forma de pagamento
    $("#prioridadepagamento").change(function () {
        if($("#numContrato").val() != "" && $("#zoomCompetencia").val() != "" && $("#emissaoNota").val() != "" ){
            if (this.value == '2-Deposito Bancario' && $("#tipoPagamentoHide").val() == '1-Boleto' ) {            
                FLUIGC.message.alert({
                    message: 'A alteração da forma de pagamento sem o conhecimento do fornecedor pode ocasionar protesto da Nota Fiscal.',
                    title: 'Atenção!',
                    label: 'OK'
                }, function (el, ev) {

                });
                var validaConta = validaContaBancaria($('#codFornecedor').val());
                var teste = $('#dataVencimentoSemTrava').val().split("-");
                var dataVencimentoDaa = new Date(teste[0], parseInt(teste[1]) - 1, teste[2]);
                var dataHoje = new Date();
                var diferencaDias = comparaData(dataVencimentoDaa, dataHoje);
                var pegaPagamento = $("#prioridadepagamento").val();
                
                $('#negociaMultaJuros').show();
                $("#renegociacaoMulta").prop("checked", true);
                $("#exampleCheckrene").val("checked");
                /* $('#dtvnd').show(); */                
                $('#dtvn').show()
                $("#multaJuros").prop("checked", true);
                $("#exampleCheck").val("checked");
                $("#multaJuros").prop("disabled", true)
                $("#renegociacaoMulta").prop("disabled", true)
                $('.ddaDanger').hide();
                $('.ddaSuccess').hide();
                $('.boletoVencido').hide();
                $("#statusDDAHide").val("");
                $("#statusBoletoHide").val("");
                
                if (validaConta != '') {
                    alert(validaConta)
                }

            }else if(this.value == '2-Deposito Bancario' && $("#tipoPagamentoHide").val() == '2-Deposito Bancario' ) {
                var validaConta = validaContaBancaria($('#codFornecedor').val());
                var teste = $('#dataVencimentoSemTrava').val().split("-");
                var dataVencimentoDaa = new Date(teste[0], parseInt(teste[1]) - 1, teste[2]);
                var dataHoje = new Date();
                var diferencaDias = comparaData(dataVencimentoDaa, dataHoje);            

                if ((dataVencimentoDaa >= dataHoje && diferencaDias < 2) || (dataVencimentoDaa < dataHoje)){
                    $('#negociaMultaJuros').show();
                    $("#renegociacaoMulta").prop("checked", true);
                    $("#exampleCheckrene").val("checked");
                    /* $('#dtvnd').show(); */                
                    $('#dtvn').show();
                    $("#multaJuros").prop("checked", true);
                    $("#exampleCheck").val("checked");
                    $("#multaJuros").prop("disabled", true)
                    $("#renegociacaoMulta").prop("disabled", true)
                    $('.ddaDanger').hide();
                    $('.ddaSuccess').hide();
                    $('.boletoVencido').hide();
                    $("#statusDDAHide").val("");
                    $("#statusBoletoHide").val("");
                }
                if (validaConta != '') {
                    alert(validaConta)
                }
                
            } else {

                if (this.value == '1-Boleto') {
                    var verificaDataVencimento = $('#dataVencimentoSemTrava').val();
                    if (!(verificaDataVencimento == '' || verificaDataVencimento == undefined)) {
                        verificadda();
                    }

                }
            }
        }
    })

    $("#valorliquido").blur(function () {
        var tPagamento = $("#prioridadepagamento").val()
        var codFilial = $("#codFilial").val().substring(0, 3)
        var dtVencimento = $('#dataVencimentoSemTrava').val().replace("-", "").replace("-", "");            
        var valorliquido = removeMascaraMonetaria($('#valorliquido').val())
        var cnpjFornecedor = $("#cnpjFornecedor").val().replace(/[^\d]+/g, '').substring(0, 8)

    if (tPagamento == '1-Boleto' && codFilial && dtVencimento && valorliquido && cnpjFornecedor) {
        verificadda()
        }
    })
    if (MODO_EDICAO != "VIEW") {
        calculaRateio()
    }

    $('[name="form"]').show();
});

function somenteNumeros(num) {
    var er = /[^0-9]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
      campo.value = "";
    }
}
//FILIAIS CADASTRADAS NA NOVA REGRA DDA
function filiaisRegraDDA() {
    var mostrar = $("#codFilial").val()
    if (mostrar == "99999" /* || 
        mostrar == '00101' ||
        mostrar == '00104' ||
        mostrar == '00105' ||
        mostrar == '00301' ||
        mostrar == '00501' ||
        mostrar == '00601' ||
        mostrar == '00701' ||
        mostrar == '00901' ||
        mostrar == '01001' ||
        mostrar == '01101' ||
        mostrar == '01301' ||
        mostrar == '01401' ||
        mostrar == '01501' ||
        mostrar == '01601' ||
        mostrar == '01701' ||
        mostrar == '01801' ||
        mostrar == '01901' ||
        mostrar == '02001' ||
        mostrar == '02101' ||
        mostrar == '02201' ||
        mostrar == '02301' ||
        mostrar == '02501' ||
        mostrar == '02701' ||
        mostrar == '02801' */) {     
        $("#valorliquido").parent().show()
        $("#prioridadepagamento").parent().show()   
        $('#dtvenci').hide()
        $('#dataVencimento').val("")
        $('#dtvst').show()       

    } else {
        $("#valorliquido").parent().hide()
        $("#valorliquido").val("")
        $("#prioridadepagamento").parent().hide() 
        $("#prioridadepagamento").val("") 
        $('#dtvenci').show()
        $('#dtvst').hide()        
        $('#dataVencimentoSemTrava').val("")
        $('.ddaSuccess').hide()
        $('.ddaDanger').hide()
        $('.boletoVencido').hide()
        $('#negociaMultaJuros').hide()
        $("#multaJuros").prop("disabled", false)
        $("#renegociacaoMulta").prop("disabled", false)
        $("#renegociacaoMulta").prop("checked", false)
        $("#exampleCheckrene").val("")        
        $("#multaJuros").prop("checked", false)
        $("#exampleCheck").val("") 
        $("#statusDDAHide").val("");
        $("#statusBoletoHide").val("");
    }

}

function calculaRateio() {
    let valorTotal = $("#valorTotalMedicao").maskMoney("unmasked")[0]
    let valorTotalRateio = 0
    let percentualTotal = 0

    $('[name^=cpValorRateio___]').each((index, el) => {
        let i = el.name.split('___')[1]
        if ($(el).maskMoney("unmasked")[0]) {
            let valor = convertFloat($(el).val())
            valorTotalRateio += valor
            let percent = calculaPercentual(valor, valorTotal)
            var percentFormat = convertFloat(percent.toFixed(2))
            percentualTotal += percentFormat
            percentualTotal = convertFloat(percentualTotal.toFixed(2))
            percent == Infinity ? $('#cpPercentualRateio___' + i).val(0.00) : $('#cpPercentualRateio___' + i).val(percentFormat)
        }
    })
    percentualTotal == Infinity ? $('#cpPercentualTotalRateio').val(0.00) : $('#cpPercentualTotalRateio').val(percentualTotal.toFixed(2))
    $('#cpValorTotalRateio').val(numberToReal(valorTotalRateio))

    //add valor porcentagem se a soma for diferente de 100%
    if(percentualTotal != 100 && $('#cpValorTotalRateio').val() == $('#valorTotalMedicao').val()){
        corrigePorcentagem()
    }   
}

function corrigePorcentagem(){
    var arrayElRat = [];
    $('[name^=cpPercentualRateio___]').each((index, el) => {
        if(el.value != ""){
            arrayElRat.push(el.name); 
        }        
    });  
    var rows = arrayElRat.length;
    var percentualTotal2 = 0;
    for (var z = 0; z < rows; z++) {
        var percent2 = convertFloat($('[name="'+ arrayElRat[z] +'"]').val())
        percent2 = convertFloat(percent2.toFixed(2))
        percentualTotal2 += percent2
        percentualTotal2 = convertFloat(percentualTotal2.toFixed(2))
        if(arrayElRat.lastIndexOf(arrayElRat[z+1]) == -1){

            var valorAtual= convertFloat($('[name="'+ arrayElRat[z] +'"]').val());
            valorAtual = convertFloat(valorAtual.toFixed(2))
            novoValor = 100 - percentualTotal2;
            novoValor = convertFloat(novoValor.toFixed(2))
            var valorFinal = valorAtual + novoValor
            $('[name="'+ arrayElRat[z] +'"]').val(valorFinal.toFixed(2))

        //soma porcentagem
        var totalPorcentagem = 0;  
        $('[name^=cpPercentualRateio___]').each((index, el) => {
            var valorPercent = convertFloat($(el).val())
            valorPercent = convertFloat(valorPercent.toFixed(2))
            totalPorcentagem += valorPercent
            totalPorcentagem = convertFloat(totalPorcentagem.toFixed(2))
        })  
        $('#cpPercentualTotalRateio').val(totalPorcentagem)            
        }
    }    
}

function convertReal(string) {
    if (string != '0' && string != '' && string != undefined && string != NaN) {
        string = convertFloat(string)
        string = parseFloat(string).toFixed(2)
        string = string.split('.');
        string[0] = string[0].split(/(?=(?:...)*$)/).join('.');
        string.join(',');
        return string;
    } else {
        return '0,00'
    }
}

function calculaPercentual(valor, valorTotal) {
    return valor / valorTotal * 100
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

function addProduto() {

    var id = wdkAddChild("tbProdutos");
    $('.fs-md-space').removeClass('fs-md-space');
    var filtroProdutoCodSer = ''
    var iss = $('#codProdFornecedor').val();
    iss = iss.split('-');
    iss.forEach(element => {
        filtroProdutoCodSer += 'COD_ISS,' + element + ','
    });

    //reloadZoomFilterValues('descProduto___' + id, filtroProdutoCodSer);
    addMascara();

};

function addMascara() {

    $("[name^=cpValorRateio]").maskMoney({
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });
    $("#cpValorTotalRateio").maskMoney({
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });

    $("[name^=vlrUnitProduto]").maskMoney({
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });

    $("[name^=quantProduto]").maskMoney({
        prefix: '',
        thousands: '.',
        decimal: ',',
        precision: 4,
        affixesStay: true,
        allowZero: true
    });
    $(".percent").maskMoney({
        prefix: '',
        thousands: '.',
        decimal: '.',
        precision: 2,
        affixesStay: true,
        allowZero: true
    });
    $("[name^=cpBaseCalculo]").maskMoney({
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });

    $("#valorliquido").maskMoney({
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });

}

function removeProduto(element) {
    fnWdkRemoveChild(element);
    somaTotalItem();
};

function calcItem(idElement) {
    var id = idElement.split("___")[1];
    var total = $("#quantProduto___" + id).maskMoney("unmasked")[0] * $("#vlrUnitProduto___" + id).maskMoney("unmasked")[0];
    total = numberToReal(total);
    $("#vlrTotalProduto___" + id).val(total);
    somaTotalItem();
    if($("#cpPercentualTotalRateio").val() != "0"){
        calculaRateio()
    }

};

function somaTotalItem() {
    var total = 0.00;
    $("[name^=vlrTotalProduto]").each(function () {
        total += $(this).maskMoney("unmasked")[0];
    });
    total = numberToReal(total);
    $("#valorTotalMedicao").val(total);
    var excecao = verificaCCExcecao();
	if (excecao){        		
		buscaGestorCC();        		
	}else{
		buscaGestor();
	}
}

function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
};

function setSelectedZoomItem(item) {
    if (item.type) {
        var type = item.type.split("___")[0];
    } else {
        var type = item.inputId.split('___')[0];
        var index = item.inputId.split('___')[1];        
    }

    if (type == "nomeFilial") {
        $("#idFilial").val(item.CODIGO);
        $("#codFilial").val(item.CODIGO);
        $("#nomeFilial").val(item.FILTRO);
        $("#cnpjFilial").val(item.CGC);
        $("#numContrato").val("");
        $("#revContrato").val("");
        window['zoomCompetencia'].clear();
        $("#competencia").val("");
        $("#codCondPagto").val("");
        $("#condPagto").val("");
        $("#saldoContrato").val("");

        var filialRestrita = $('#codFilial').val()
        restricaoFilialUnity(filialRestrita)
// pega codigo filial hospital vila da serra
        if($('#codFilial').val() == "06601"){
            FLUIGC.message.alert({
                message: `Prezado (a) as operações de registro de documentos para pagamentos do Hospital Vila da Serra - HVS que se enquadra neste fluxo ainda não estão sendo realizadas pelo CSO e sim internamente no Hospital, gentileza enviar sua demanda para o e-mail centraldenotas@oncoclinicas.com que direcionaremos sua demanda para o responsável do HVS. `,
                title: `Alerta`,
                label: `OK`
            }, function (el, ev) { });
             window['nomeFilial'].clear();
             $("#cnpjFilial").val("")
        }
        var excecao = verificaCCExcecao();
    	if (excecao){        		
    		buscaGestorCC();        		
    	}else{
    		buscaGestor();
    	}
        atualizaRevisao();
        window['numContrato'].clear()
        //$("#campoIdentificador").val(item.DESCRICAO + " - " + $("#dataSolicitacao").val());
        //var filtroContrato = "FILIAL, " + $("#codFilial").val() + ", EMAIL, " + $("#emailSolicitante").val() + ", COD_FORNECEDOR, " + $("#codFornecedor").val() + ", LOJA_FORNECEDOR, " + $("#lojFornecedor").val();
       
        var filtroContrato = "FILIAL, " + $("#codFilial").val() + ",COD_FORNECEDOR, " + $("#codFornecedor").val() + ", LOJA_FORNECEDOR, " + $("#lojFornecedor").val();
        console.log('filtro: '+filtroContrato);
        reloadZoomFilterValues('numContrato', filtroContrato);
        filiaisRegraDDA();

    } else if (type == "nomeFornecedor") {
        $('#municipioFornecedor').val(item.COD_MUNICIPIO);
        $("#codFornecedor").val(item.CODIGO);
        $("#codProdFornecedor").val(item.CODIGOS_ISS);
        $("#lojFornecedor").val(item.LOJA);
        // $("#nomeFornecedor").val(item.FILTRO);
        $('#cpSimplesNacional').val(item.SIMPLES_NACIONAL);
        $("#nomeFornecedor").val(item.DESCRICAO);
        if ($("#codFilial").val() == "99999" /* || 
            $("#codFilial").val() == '00101' ||
            $("#codFilial").val() == '00104' ||
            $("#codFilial").val() == '00105' ||
            $("#codFilial").val() == '00301' ||
            $("#codFilial").val() == '00501' ||
            $("#codFilial").val() == '00601' ||
            $("#codFilial").val() == '00701' ||
            $("#codFilial").val() == '00901' ||
            $("#codFilial").val() == '01001' ||
            $("#codFilial").val() == '01101' ||
            $("#codFilial").val() == '01301' ||
            $("#codFilial").val() == '01401' ||
            $("#codFilial").val() == '01501' ||
            $("#codFilial").val() == '01601' ||
            $("#codFilial").val() == '01701' ||
            $("#codFilial").val() == '01801' ||
            $("#codFilial").val() == '01901' ||
            $("#codFilial").val() == '02001' ||
            $("#codFilial").val() == '02101' ||
            $("#codFilial").val() == '02201' ||
            $("#codFilial").val() == '02301' ||
            $("#codFilial").val() == '02501' ||
            $("#codFilial").val() == '02701' ||
            $("#codFilial").val() == '02801' */) {
            $("#prioridadepagamento").val(item.FORMA_PAGAMENTO);
            $("#tipoPagamentoHide").val(item.FORMA_PAGAMENTO);
        }    
        var cnpj = item.CGC;
        if (cnpj.length <= 11) {
            cnpj = cnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
        } else {
            cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        }
        $('#cnpjFornecedor').val(cnpj);
        $("#numContrato").val("");
        $("#revContrato").val("");
        $("#competencia").val("");
        $("#codCondPagto").val("");
        $("#condPagto").val("");
        $("#saldoContrato").val("");

        var filtroContrato = "FILIAL, " + $("#codFilial").val() + ",COD_FORNECEDOR, " + $("#codFornecedor").val() + ", LOJA_FORNECEDOR, " + $("#lojFornecedor").val();
        console.log('filtro: '+filtroContrato);
        reloadZoomFilterValues('numContrato', filtroContrato);
        setaFormaPagamento();

    } else if (type == 'zmCentroCustos') {
        $('#cpCodCentroCustos___' + index).val(item.CODIGO)
        let pegaCodFilial = $('#codFilial').val();
        let pegaCodCentroCusto = item.CODIGO       
        // travar abertura de  outro centro de custo que nao esteja entre o cod 30000000 e 69999999 pela filial 05201
        if ((pegaCodFilial == "05201" && pegaCodCentroCusto < "30000000") ||  (pegaCodFilial == "05201" && pegaCodCentroCusto >"69999999"))  {
            FLUIGC.message.alert({
            message:    `Prezado (a), 
            O centro de custo selecionado não faz parte da estrutura de centros de custo do Instituto Oncoclínicas. 
            Ao selecionar esta unidade, por gentileza escolher um centro iniciado pelo número <strong>6</strong>. 
            Caso o lançamento seja referente a um projeto, favor selecionar o projeto em questão entre os centros de custo iniciados em <strong>3, 4 ou 5</strong>.
            Em caso de dúvidas, entre em contato com a Business Controlling através do e-mail equipe.<strong>equipe.businesscontrolling@oncoclinicas.com</strong>`,
                title: 'Atenção !!!',
                label: 'OK'
            }, function (el, ev) {
                window['zmCentroCustos___' + index].clear();
                $('#cpCodCentroCustos___' + index).val('');
            })
        }
        verificaCentroCusto()  
        //RESTRICAO DE CENTRO DE CUSTO DE PROJETO SÓ COLABORADORES SELECIONADOS PODEM UTILIZAR ESSE CC
        //FIM RESTRICAO
        //NAO PERMITE CC DUPLICADO NA TABELA
        
        var excecao = verificaCCExcecao();
    	if (excecao){        		
    		buscaGestorCC();        		
    	}else{
    		buscaGestor();
    	}        
        
        var linha = index;
        var ccRepetido = false;
        $('[name^=cpCodCentroCustos___]').each((index, el) => {
            var ccTable = $(el).val()            
            if(!ccRepetido){
                if(el.name != 'cpCodCentroCustos___' + linha){
                    if(item.CODIGO == ccTable){
                        FLUIGC.message.alert({
                            message:    `O centro de custo já foi selecionado!`,
                                title: 'Atenção !!!',
                                label: 'OK'
                            }, function (el, ev) {
                                window['zmCentroCustos___' + linha].clear();
                                $('#cpCodCentroCustos___' + linha).val('');      
                                ccRepetido = true;              
                        })
                    }
                }
            }            
        }) 
        //FIM CC DUPLICADO
    } else if (type == 'zmCentroCustosAprov') {
        $('#cpCodCentroCustosAprov').val(item.CODIGO)
        var excecao = verificaCCExcecao();
    	if (excecao){        		
    		buscaGestorCC();        		
    	}else{
    		buscaGestor();
    	}
        verificaCentroCusto()
        //RESTRICAO DE CENTRO DE CUSTO DE PROJETO SÓ COLABORADORES SELECIONADOS PODEM UTILIZAR ESSE CC
        //FIM RESTRICAO
    } else if (type == 'zoomEspecieNf') {

        $('#cpCodEspecieNf').val(item.CODIGO)
        

    } else if (type == 'defineGestor') {

        $('#emailGestAvalia').val(item.EMAIL)
        $('#codGestAvalia').val(item.IDUSER)
        

    } else if (type == "descProduto") {
        if(parseInt(item.CODIGO) > 100){
            var id = item.inputId.split("___")[1];
            $("#codProduto___" + id).val(item.CODIGO);
        }else{            
            FLUIGC.message.alert({
                message: 'Este item não pode ser adicionado para medição. Se refere a um serviço prestado(faturamento) e não a um serviço recebido.',
                title: 'Atenção !',
                label: 'Ok!'
            }, function (el, ev) {});            
            var id = item.inputId.split("___")[1];
            window['descProduto___' + id].clear();
            $("#codProduto___" + id).val("");
        }
        
    } else if (type == "numContrato") {
        if (item.MEDICAO_AUTOMATICA == '1') {
            FLUIGC.message.alert({
                message: 'Esse contrato possui medição automática e não pode ser medido.',
                title: 'Atenção !',
                label: 'Sim'
            }, function (el, ev) {});
            $("#numContrato").val('');
            $("#revContrato").val('');
            $("#codCondPagto").val('');
            $("#condPagto").val('');
            $("#saldoContrato").val('');
        } else {
            $("#numContrato").val(item.NUMERO);
            $("#revContrato").val(item.REVISAO);
            $("#codCondPagto").val(item.COD_COND_PAGTO);
            $("#condPagto").val(item.DESC_COND_PAGTO);
            $("#saldoContrato").val(numberToReal(parseFloat(item.SALDO)));
        }

        var filtraCompetencia = "FILIAL, " + $("#codFilial").val() + ", CONTRATO, " + $("#numContrato").val() + ", REVISAO, " + $("#revContrato").val();
        reloadZoomFilterValues('zoomCompetencia', filtraCompetencia);
    } else if (type == "zoomCompetencia") {
        $("#competencia").val(item.COMPETENCIA);
    }
};

//seta valor de forma de pagamento ,verifica conta bancaria
function setaFormaPagamento() {
    if ($("#codFilial").val() == "99999" /* || 
        $("#codFilial").val() == '00101' ||
        $("#codFilial").val() == '00104' ||
        $("#codFilial").val() == '00105' ||
        $("#codFilial").val() == '00301' ||
        $("#codFilial").val() == '00501' ||
        $("#codFilial").val() == '00601' ||
        $("#codFilial").val() == '00701' ||
        $("#codFilial").val() == '00901' ||
        $("#codFilial").val() == '01001' ||
        $("#codFilial").val() == '01101' ||
        $("#codFilial").val() == '01301' ||
        $("#codFilial").val() == '01401' ||
        $("#codFilial").val() == '01501' ||
        $("#codFilial").val() == '01601' ||
        $("#codFilial").val() == '01701' ||
        $("#codFilial").val() == '01801' ||
        $("#codFilial").val() == '01901' ||
        $("#codFilial").val() == '02001' ||
        $("#codFilial").val() == '02101' ||
        $("#codFilial").val() == '02201' ||
        $("#codFilial").val() == '02301' ||
        $("#codFilial").val() == '02501' ||
        $("#codFilial").val() == '02701' ||
        $("#codFilial").val() == '02801' */) {        
        var verificaPrimeiroPagamneto = $("#prioridadepagamento").val();
        if (verificaPrimeiroPagamneto == '2-Deposito Bancario' || verificaPrimeiroPagamneto == '') {
        validaContaBancaria($('#codFornecedor').val())
        }                   
    } else {
        $("#prioridadepagamento").val("")
    }
}

//verifica DDa apos preenchimento da data
function verificaDataDDA() {
    if ($("#prioridadepagamento").val() == '1-Boleto' && $("#codFilial").val() != '' && $('#valorliquido').val() != "" && $('#dataVencimentoSemTrava').val() != "" && $("#cnpjFornecedor").val() != "") {            
        var data = $('#dataVencimentoSemTrava').val();
        var dia = data.split("-")[2];
        var mes = data.split("-")[1];
        var ano = data.split("-")[0];
        $("#filtroDataVencimento").val(data.replaceAll("-", ""));
        $("#DataVencimentoHide").val(dia + "/" + mes + "/" + ano)          
        verificadda();

    } else {
        var teste = $('#dataVencimentoSemTrava').val().split("-")
        var dataVencimentoDaa = new Date(teste[0], parseInt(teste[1]) - 1, teste[2])
        var dataHoje = new Date();
        var diferencaDias = comparaData(dataVencimentoDaa, dataHoje);
        var pegaPagamento = $("#prioridadepagamento").val()

        var data = $('#dataVencimentoSemTrava').val();
        var dia = data.split("-")[2];
        var mes = data.split("-")[1];
        var ano = data.split("-")[0];
        $("#filtroDataVencimento").val(data.replaceAll("-", ""));
        $("#DataVencimentoHide").val(dia + "/" + mes + "/" + ano) 

        if (pegaPagamento == '2-Deposito Bancario') {
            if ((dataVencimentoDaa >= dataHoje && diferencaDias < 2) || (dataVencimentoDaa < dataHoje)) {
            $('#negociaMultaJuros').show(); 
            $("#renegociacaoMulta").prop("checked", true)
            $("#exampleCheckrene").val("checked")            
            $('#dtvn').show()
            $("#multaJuros").prop("checked", true)
            $("#exampleCheck").val("checked")
            $("#multaJuros").prop("disabled", true)            
            }else{
                $('#negociaMultaJuros').hide(); 
                $("#renegociacaoMulta").prop("checked", false)
                $("#exampleCheckrene").val("")
                $("#multaJuros").prop("checked", false)
                $("#exampleCheck").val("")
                $('#dtvn').hide()
                $('#dataVencNegociado').val("")                
            }
        }
    }

};

function verificaDtVencimento(){
    var teste = $('#dataVencimentoSemTrava').val().split("-")
    var dataVencimentoDaa = new Date(teste[0], parseInt(teste[1]) - 1, teste[2])
    var dataHoje = new Date();
    var diferencaDias = comparaData(dataVencimentoDaa, dataHoje);
    var pegaPagamento = $("#prioridadepagamento").val()

    if ((dataVencimentoDaa >= dataHoje && diferencaDias < 2) || (dataVencimentoDaa < dataHoje)) {
        $('#dtvn').show();
        $('#negociaMultaJuros').show();         
        $("#renegociacaoMulta").prop("checked", true)
        $("#exampleCheckrene").val("checked") 
        $("#multaJuros").prop("checked", true)
        $("#exampleCheck").val("checked") 
        $("#multaJuros").prop("disabled", true)
        $("#renegociacaoMulta").prop("disabled", true)
        $('.boletoVencido').show(); 
        $("#statusBoletoHide").val("boletoVencido");

    }else{
        $('#dtvn').hide();
        $('#dtvnd').hide();
        $("#dataVencNegociado").val("");
        $("#dataVencNegociadoDeposito").val("");
        $('#negociaMultaJuros').hide();
        $("#multaJuros").prop("disabled", false)
        $("#renegociacaoMulta").prop("disabled", false)
        $("#renegociacaoMulta").prop("checked", false)
        $("#exampleCheckrene").val("")        
        $("#multaJuros").prop("checked", false)
        $("#exampleCheck").val("") 


    }
}

function multaEjuros(){
    if($("#decisaoGestor1Apro").prop('checked') == true && $("#exampleCheckrene").val() != ""){  
        FLUIGC.message.alert({
            message: 'NF/DOC com entrada em atraso! Os valores acrescidos de multas e juros serão acrescidos ao valor da NF no Centro de Custos da filial. DE ACORDO? ',
            title: 'Atenção!',
            label: 'OK'
        })              
        $("#AlertaMultaJuros").show()
    }else{
        $("#AlertaMultaJuros").hide()
    }
}

function buscaGestor() {
    let codgestor = $('#cpCodCentroCustosAprov').val();
    var valorMedicao = convertFloat($("#valorTotalMedicao").val());
    if ($("#codFilial").val() && codgestor && $("#valorTotalMedicao").val()) {
        var c1 = DatasetFactory.createConstraint("filial", $("#codFilial").val(), $("#codFilial").val(), ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("centroCusto", codgestor, codgestor, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("valor", $("#valorTotalMedicao").val(), $("#valorTotalMedicao").val(), ConstraintType.MUST);

        var constraints = new Array(c1, c2, c3);
        var ds_aprov = DatasetFactory.getDataset("ds_alcadaAprovacaoPagamentos", null, constraints, null);

        $("#proximoAprovador").val("");
        $("#nivelAtualAprovacao").val("0");
        $("#idAprovGestor1").val("");
        $("#idAprovGestor2").val("");
        $("#idAprovGestor3").val("");
        $("#idAprovGestor4").val("");
        $("#idAprovGestor5").val("");
        $("#nivelMaximoAprovacao").val(ds_aprov.values.length);
        
        const fornecedor = $('#cnpjFornecedor').val();
        const blackList = ['65.174.088/0001-03', '05.539.537/0001-48', '20.412.770/0001-59', '06.026.109/0001-84', '02.032.253/0001-7'];
        // 006432 - 
        //var userAprovBlack = '8d3dbb700c46490fb96e8175604d6ff6'; // Luiz Felipe Quites 
        var userAprovWhite2 = 'e6fyuot4k2ngvjzk1552050747537'; // Mais que 15k > Chintia Maria
        var userAprovWhite = 'd5vukvl36mngujvp1475268748097'; // Mariana Araujo Costa, até 15k
                
        let skipLevel2 = blackList.includes(fornecedor);
        
        for (var x = 0; x < ds_aprov.values.length; x++) {
        	
            if ($("#proximoAprovador").val() == "") {            	
            	if (skipLevel2){               		
            		$("#proximoAprovador").val(userAprovWhite);
                    $("#nivelAtualAprovacao").val("1");                	
                }else{
                	$("#proximoAprovador").val(ds_aprov.values[x].IDAPROVADOR);
                    $("#nivelAtualAprovacao").val("1");
                }                
            }
            
            if (skipLevel2){  
            	 $("#idAprovGestor1").val(userAprovWhite);    
            	 if (valorMedicao > 15000) $("#idAprovGestor2").val(userAprovWhite2);            	 
            }else{
            	 $("#idAprovGestor" + (x + 1)).val(ds_aprov.values[x].IDAPROVADOR);             	
            }           
        }        
    }
}

function buscaGestorCC() {
	 	let centroCusto = $('#cpCodCentroCustosAprov').val()
	   
	 	if (centroCusto && $("#valorTotalMedicao").val()) {	    
	    	
	    	var valor = convertFloat($("#valorTotalMedicao").val());
	    		    	
            // defina as constraints para buscar o ds do pai
            var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
            var datasetPai = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(constraintPai), null).values;
            for (var i in datasetPai) {
                //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
                var c1 = DatasetFactory.createConstraint("tablename", "tbCentroCusto", "tbCentroCusto", ConstraintType.MUST);
                var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
                var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
                var c4 = DatasetFactory.createConstraint("CTT_CUSTO", centroCusto + ' ', centroCusto + ' ', ConstraintType.MUST);
                // // Busca o dataset
                var ds_centroCusto = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3, c4), null).values;
            }
	    	
	        $("#proximoAprovador").val("");
	        $("#nivelAtualAprovacao").val("0");
	        $("#idAprovGestor1").val("");
	        $("#idAprovGestor2").val("");
	        $("#idAprovGestor3").val("");
	        $("#idAprovGestor4").val("");
	        $("#idAprovGestor5").val("");	           
	        
	        var ObjAprovadores = new Array();           
            if (ds_centroCusto.length > 0) {
                var aprovador = new Object();
                aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro'];
                aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentroDesc']
                ObjAprovadores.push(aprovador);
                $("#nivelMaximoAprovacao").val('1');

                if (valor > convertFloat(ds_centroCusto[0]['valorGerenteCentro'])){
                    var aprovador = new Object();
                    aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro2'];
                    aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentro2Desc']
                    ObjAprovadores.push(aprovador);
                    $("#nivelMaximoAprovacao").val('2');
                }
                
                if (valor > convertFloat(ds_centroCusto[0]['valorGerenteCentro2'])){
                		var aprovador = new Object();
                        aprovador.ID = ds_centroCusto[0]['usuarioDirOperacoesCentro'];
                        aprovador.NOME = ds_centroCusto[0]['usuarioDirOperacoesCentroDesc']
                        ObjAprovadores.push(aprovador);
                        $("#nivelMaximoAprovacao").val('3');
                 
            	}	        		        
            }
	        for (var x = 0; x < ObjAprovadores.length; x++) {
	        	
	            if ($("#proximoAprovador").val() == "") { 
	                $("#proximoAprovador").val(ObjAprovadores[x].ID);
	                $("#nivelAtualAprovacao").val("1");
	                                
	            }	            
	            
	            $("#idAprovGestor" + (x + 1)).val(ObjAprovadores[x].ID);
	           
	        }
	        
	        
	    }
}

function verificaCCExcecao(){	
	//11060102 - NOVOS NEGOCIOS e 11060103 - NOVOS NEGOCIOS JURIDICO	
	var cc = $("#cpCodCentroCustosAprov").val();	
	if (cc == "11060102" || cc == "11060103"){		
		return true;		
	}else{
		return false;
	}
		
}

function pegaDataAprovPrevista() {
    var dataPrevistaDoFinanceiro = $("#aprovDataPrevista").val();
    $("#aprovDataPrevistaSolici").val(dataPrevistaDoFinanceiro);
    $('#dataPrevista').val(dataPrevistaDoFinanceiro);
}

function removeMascaraMonetaria(mask) {

    if (mask != undefined && mask != null && mask != '') {
        mask = mask.replace(/[^0-9,.]/g, '');
        mask = mask.replace(' ', '');
        mask = mask = mask.replace(/[\.]/g, '');
        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}

function atualizaRevisao() {

    var contratoFormFluig = $("#numContrato").val();
    var revisaoFormFluig = $("#revContrato").val();
    var contratoDataset = "";
    var revisaoDataset = "";

    var constrFilial = DatasetFactory.createConstraint("FILIAL", $("#codFilial").val(), $("#codFilial").val(), ConstraintType.MUST);
    var constrEmail = DatasetFactory.createConstraint("EMAIL", $("#emailSolicitante").val(), $("#emailSolicitante").val(), ConstraintType.MUST);
    var constrFornecedor = DatasetFactory.createConstraint("COD_FORNECEDOR", $("#codFornecedor").val(), $("#codFornecedor").val(), ConstraintType.MUST);
    var constrLoja = DatasetFactory.createConstraint("LOJA_FORNECEDOR", $("#lojFornecedor").val(), $("#lojFornecedor").val(), ConstraintType.MUST);

    var constrContrato = new Array(constrFilial, constrEmail, constrFornecedor, constrLoja);
    var ds_contrato = DatasetFactory.getDataset("ds_contrato", null, constrContrato, null);

    if (ds_contrato != null && ds_contrato.values.length != 0 && ds_contrato.values[0].NUMERO != "") {

        for (var i = 0; i < ds_contrato.values.length; i++) {
            contratoDataset = ds_contrato.values[i].NUMERO;
            revisaoDataset = ds_contrato.values[i].REVISAO;

            if (contratoFormFluig == contratoDataset) {

                if (revisaoDataset != revisaoFormFluig) {
                    $("#revContrato").val(revisaoDataset);
                }
            }
        }
    }
}

function notaNoProtheus() {
    var numNF = $('#notaFiscal').val();
    var msg = '';
    while (numNF.length < 9) {
        numNF = '0' + numNF;
    }

    var c1 = DatasetFactory.createConstraint('FILIAL', $('#codFilial').val(), $('#codFilial').val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('NUMERO', numNF, numNF, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('COD_FORNECEDOR', $('#codFornecedor').val(), $('#codFornecedor').val(), ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('DT_EMISSAO', $('#emissaoNota').val(), $('#emissaoNota').val(), ConstraintType.MUST);
    var notas = DatasetFactory.getDataset('ds_notasFiscaisEntrada', null, new Array(c1, c2, c3, c4), null).values;

    if (notas.length > 0) {
        if (notas[0].COD_FORNECEDOR == '') {
            msg += "lancamento liberado";
        } else {
            notas.forEach(element => {
                msg += '<br>' + element.NUMERO + ", " + element.DT_EMISSAO;
            });
        }
    }
    return msg;
}

function messagem(texto) {

    FLUIGC.message.alert({
        message: 'De acordo com os dados informados, já existem as seguintes notas lançadas: ' + texto,
        title: 'Aviso',
        label: 'OK'
    }, function (el, ev) {});

}

function verificaCentroCusto(codCentroCust) {
    if(!codCentroCust){
        codCC = $("#cpCodCentroCustosAprov").val();
        var c1 = DatasetFactory.createConstraint('CODIGO', codCC, codCC, ConstraintType.MUST);
        var ds_centroCusto = DatasetFactory.getDataset('ds_centroCusto', null, new Array(c1), null).values;
        if (ds_centroCusto.values(0, 'CODIGO') == '') {
            $("#centroCustosBloqueado").val('true');
            mensagemComConfirmacao('Aviso', 'Centro de Custos Principal Bloqueado!!! Favor procurar a área responsável para desbloqueio ou selecionar outro centro de custo.', null);
        } else {
            $("#centroCustosBloqueado").val('false');
        }
    }else{
        var valido = true;
        var constraintDs_centroCusto2 = DatasetFactory.createConstraint('CODIGO', codCentroCust, codCentroCust, ConstraintType.MUST);
        var datasetDs_centroCusto = DatasetFactory.getDataset('ds_centroCusto', null, new Array(constraintDs_centroCusto2), null).values;
        if (datasetDs_centroCusto[0].CODIGO == '') {
            valido = false;
        }
        return valido
    }
}

function mensagemComConfirmacao(titulo, mensagem, functionDone) {
    FLUIGC.message.alert({
        message: mensagem,
        title: titulo,
        label: 'OK'
    }, function (el, ev) {
        if (functionDone != null) {
            functionDone.call();
        }
    })
}

function abreForm() {

    var starsCallback1 = FLUIGC.stars(".my-rating1", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback1.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta1_documentos').val(pos);
    });

    var starsCallback2 = FLUIGC.stars(".my-rating2", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback2.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta2_equipe').val(pos);
    });

    var starsCallback3 = FLUIGC.stars(".my-rating3", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback3.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta3_prazo').val(pos);
    });

    var starsCallback4 = FLUIGC.stars(".my-rating4", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback4.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta4_cobranca').val(pos);
    });

    var starsCallback5 = FLUIGC.stars(".my-rating5", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback5.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta5_conformidade').val(pos);
    });

    var starsCallback6 = FLUIGC.stars(".my-rating6", {
        stars: 5,
        value: 0,
        sizeClass: 'fluigicon-lg',
        text: ['Péssimo', 'Muito ruim', 'Ruim', 'Atende', 'Supera']
    });

    starsCallback6.on("click", function (obj) {
        var pos = $(this).index();
        $('#pergunta6_qualidade').val(pos);
    });


}

// verifica se  posuui conta bancária do fornecedor
function validaContaBancaria(codFornecedor) {
    var c1 = DatasetFactory.createConstraint('CODIGO', codFornecedor, codFornecedor, ConstraintType.MUST);
    var notas = DatasetFactory.getDataset('ds_fornecedor', null, new Array(c1), null).values;
    var retorno = "";

    if (notas.length > 0) {
        for (element in notas){
            if (notas[element].CONTA == "" || notas[element].FORMA_PAGAMENTO == "") {
                FLUIGC.message.alert({
                    message: 'Dados bancários do fornecedor não cadastrados. Entre em contato com a Central de Atendimento.',
                    title: 'Atenção !!!',
                    label: 'OK'
                });
                limpaCampos()
                $('.ddaDanger').hide();
                $('.ddaSuccess').hide();
                $('.boletoVencido').hide();
                $("#statusDDAHide").val("");
                $("#statusBoletoHide").val("");
            }
        }         
    }
    return retorno
}

function verificadda() {
    var tPagamento = $("#prioridadepagamento").val()
    var codFilial = $("#codFilial").val().substring(0, 3)
    var dtVencimento = $('#dataVencimentoSemTrava').val().replace("-", "").replace("-", "");    
    var valorliquido = removeMascaraMonetaria($('#valorliquido').val())
    var cnpjFornecedor = $("#cnpjFornecedor").val().replace(/[^\d]+/g, '').substring(0, 8)

    if (tPagamento == '1-Boleto' && codFilial && dtVencimento && valorliquido && cnpjFornecedor) {
        var c1 = DatasetFactory.createConstraint("FILIAL", codFilial, codFilial, ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint('DT_VENCIMENTO', dtVencimento, dtVencimento, ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("VALOR", valorliquido, valorliquido, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("CGC", cnpjFornecedor, cnpjFornecedor, ConstraintType.MUST);
        var buscaDda = DatasetFactory.getDataset("ds_dda", null, new Array(c1, c2, c3, c4), null).values;
        if (buscaDda[0].CGC == "" || buscaDda[0] == undefined) {
            $('.ddaDanger').show();
            $('.ddaSuccess').hide();
            $('.boletoVencido').hide();
            $('#dtvnd').hide();
            $('#dtvn').hide();     
            $('#negociaMultaJuros').hide(); 
            $("#multaJuros").prop("disabled", false)
            $("#renegociacaoMulta").prop("disabled", false)
            $("#renegociacaoMulta").prop("checked", false)
            $("#exampleCheckrene").val("")
            $("#multaJuros").prop("checked", false)
            $("#exampleCheck").val("")   
            $("#statusDDAHide").val("ddaDanger");
            $("#statusBoletoHide").val("");  
        } else {

            $('.ddaSuccess').show();
            $('.ddaDanger').hide();
            $("#statusDDAHide").val("ddaSuccess");
            $("#statusBoletoHide").val("");  
            verificaDtVencimento();
        }
    } else{ 
        FLUIGC.message.alert({
            message: 'Favor preencher todos os campos acima corretamente para buscar o DDA!',
            title: 'Atenção !',
            label: 'Ok'
        }, function (el, ev) {});
    }
}
//finalizar
function novaDataPrevista(){
    var teste = $('#dataVencimentoSemTrava').val().split("-")
    var dataVencimentoDaa = new Date(teste[0], parseInt(teste[1]) - 1, teste[2])
    var dataHoje = new Date();
    var diferencaDias = comparaData(dataVencimentoDaa, dataHoje);
    var pegaPagamento = $("#prioridadepagamento").val()
}


function limpaCampos() {
    window['nomeFornecedor'].clear();
    window['nomeFilial'].clear();
    window['zmCentroCustosAprov'].clear();    
	window['numContrato'].clear();
	window['zoomCompetencia'].clear();
	$("#revContrato").val("")
	$("#competencia").val("")
	$("#cpCodCentroCustosAprov").val("")
	$("#saldoContrato").val("")
	$("#condPagto").val("")
    $("#zoomFilial").val("")
    $("#idFilial").val("")
    $("#cnpjFilial").val("")
    $("#codFilial").val("")
    $("#nomeFilial").val("")
    $("#codFornecedor").val("")
    $("#lojFornecedor").val("")
    $("#nomeFornecedor").val("")
    $("#zoomFornecedor").val("")
	$("#codProdFornecedor").val("")
    $("#cnpjFornecedor").val("")
    $("#valorliquido").val("")
    $("#multaJuros").prop("checked", false)
    $("#renegociacaoMulta").prop("checked", false)
    $("#dataVencimentoSemTrava").val("")
    $("#dataVencimento").val("")
    $("#prioridadepagamento").val("")
    $('#filtroDataVencimento').val("")
    $('#filtroDataVenci').val("")
    $('#notaFiscal').val("")
    $('#serieNF').val("")
    $('#emissaoNota').val("")
    $("#dataVencNegociado").val("")
    $("#dataVencNegociadoDeposito").val("")
    $('#dtvn').hide()
    $('#dtvnd').hide()
    $('#dtvst').hide()
    $('#dtvenci').show()    
}

function limpaCamposAposTroca() {
    $("#codFornecedor").val("")
    $("#lojFornecedor").val("")
    $("#nomeFornecedor").val("")
    $("#zoomFornecedor").val("")
    $("#cnpjFornecedor").val("")
    $("#valorliquido").val("")
    $("#prioridadepagamento").val("")
    $("#multaJuros").val("")
    $("#dataVencNegociado").val("")
    $("#dataVencNegociadoDeposito").val("")
    $("#renegociacaoMulta").val("")
    $("#dataVencimento").val("")
    $("#multaJuros").prop("checked", false)
    $("#renegociacaoMulta").prop("checked", false)
    $('#dtvst').hide()
}

function escondeCampos() {
    $("#valorliquido").parent().hide()
    $("#prioridadepagamento").parent().hide()
    $("#multaJuros").parent().hide()
    $("#renegociacaoMulta").parent().hide()
    $('#dataVencimentoSemTrava').parent().hide()
    $("#dataVencimento").parent().show()
    $("#dataVencNegociado").parent().hide()
    $("#dataVencNegociadoDeposito").parent().hide()
}

function escondeCamposOutros() {
    $("#valorliquido").parent().hide()
    $("#prioridadepagamento").parent().hide()
    $("#multaJuros").parent().hide()
    $("#renegociacaoMulta").parent().hide()
    $('#dataVencimentoSemTrava').parent().hide()
    $("#dataVencimento").removeAttr('disabled');
    $("#dataVencNegociado").parent().hide()
    $("#dataVencNegociadoDeposito").parent().hide()
}

function mostrarCampos() {
    exibicampos(["valorliquido", "dataVencimento", "dataVencimentoSemTrava", "dataVencNegociadoDeposito", "dataVencNegociado", "prioridadepagamento"])
    if ($("#exampleCheckrene").val() != '') {
        $("#renegociacaoMulta").parent().show()
    } {
        $("#renegociacaoMulta").parent().hide()
    }
    if ($("#exampleCheck").val() != '') {
        $("#multaJuros").parent().show()
    } else {
        $("#multaJuros").parent().hide()
    }
    $("#multaJuros").prop("disabled", true)
    $("#renegociacaoMulta").prop("disabled", true)
}

function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function comparaData(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays

}

function clicaCiencia() {
    var aChk = document.getElementsByName("cienciaMulta");
    for (var i = 0; i < aChk.length; i++) {
        if (aChk[i].checked == true) {
            $("#exeCiencia").val('1');
        } else {
            $("#exeCiencia").val('');
        }
    }
}

function exibicampos(array) {
    array.forEach(element => {
        if ($("#" + element).val() != '') {
            $("#" + element).parent().show()
            $("#" + element).css('pointer-events', 'none');
        } else {
            $("#" + element).parent().hide()
        }
    });
}

function validarCpom(){
    var municipioFornecedor = $('#municipioFornecedor').val();
    var codFilial = $('#codFilial').val();
    if(municipioFornecedor != '' && codFilial != ''){    
        var listconstraint = [];
        listconstraint.push(DatasetFactory.createConstraint("codFilial", codFilial, codFilial, ConstraintType.MUST));
        var datasetPrincipal = DatasetFactory.getDataset("ds_filial_cpom", null, listconstraint, null);

        if(datasetPrincipal.values.length > 0){
            var cidades = datasetPrincipal.values[0].codMunicipio;
            var filial = datasetPrincipal.values[0].codFilial;

            if(filial == codFilial && cidades != municipioFornecedor){
                $('#mostraCpom').val('');
                $('#slCepom').val('')
                $('#slCepomShow').show()
                $('#cpTesShow').show()
                $('#cpDesBhShow').show()
                

            } else {
                $('#mostraCpom').val('nao');
                $('#slCepom').val('S')
                $('#slCepomShow').hide()
                $('#cpTesShow').show()
                $('#cpDesBhShow').show()
            }
        } else {
            $('#mostraCpom').val('nao');
            $('#slCepom').val('S')
            $('#slCepomShow').hide()
            $('#cpTesShow').show()
            $('#cpDesBhShow').show()
        }
    }
}

function consultaSaldoContrato(){
    var c1 = DatasetFactory.createConstraint('FILIAL', $("#codFilial").val(), $("#codFilial").val(), ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint('COD_FORNECEDOR', $("#codFornecedor").val(), $("#codFornecedor").val(), ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint('EMAIL', $("#emailSolicitante").val(), $("#emailSolicitante").val(), ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint('LOJA_FORNECEDOR', $("#lojFornecedor").val(), $("#lojFornecedor").val(), ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint('NUMERO', window['numContrato'].getSelectedItems()[0], window['numContrato'].getSelectedItems()[0], ConstraintType.MUST);
    var ds_contrato = DatasetFactory.getDataset('ds_contrato', null, new Array(c1, c2, c3, c4, c5), null);


    $("#numContrato").val(ds_contrato.values[0].NUMERO);
    $("#revContrato").val(ds_contrato.values[0].REVISAO);
    $("#codCondPagto").val(ds_contrato.values[0].COD_COND_PAGTO);
    $("#condPagto").val(ds_contrato.values[0].DESC_COND_PAGTO);
    $("#saldoContrato").val(numberToReal(parseFloat(ds_contrato.values[0].SALDO)));
}

function addEventSendFluig(callback) {
    $('.fixedTopBar, #page-header', parent.document).find('button:first').bind("click", function() {
        callback();
    });
}

function addZero(quantidade, numero) {
    numero = numero.toString()
    for (var i = numero.length; i < quantidade; i++) {
        numero = "0" + numero
    }
    return numero;
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
            $("#nomeFilial").val("").change();
            $("#codFilial").val("").change();

            //window['zoomFilial'].clear();
            //$('#cpCodFilial').val("");
        })
    }

}

function verCLASSIFICACAO(qCAMPO) {
    if( CURRENT_STATE > INICIO1 )
        return false;

    myTableFC = '';

    var sortingFields;
    var cntESP = [],
        xDataSet = '';

    campos = ['CODIGO', 'NOME'];
    var xHeader = new Array();
    qualCampoId = qCAMPO.id;
    idCampo = qualCampoId.substring(0, qualCampoId.indexOf('___'));
    if (idCampo == '' || idCampo == null || idCampo == undefined)
        idCampo = qCAMPO.id;

    valANTERIOR = $('#' + qCAMPO.id)[0].value;

    switch (idCampo) {
        case 'armazem':
            var filial = $('#filial_protheus').val();
            sortingFields = new Array("FILIAL");
            xTITULO = 'CONSULTA DE ARMAZÉM';
            xDataSet = 'ds_armazem';
            campos = ['FILIAL', 'FILTRO'];
            cntESP.push(DatasetFactory.createConstraint('FILIAL', filial, filial, ConstraintType.SHOULD));
            xHeader.push({
                'title': 'Filial'
            }, {
                'title': 'Filtro'
            });
            break;

        case 'condicaoPagamento':
            sortingFields = new Array("FILTRO");
            xTITULO = 'CONSULTA DE CONDIÇÃO DE PAGAMENTO';
            xDataSet = 'ds_condicaoPagamento';
            campos = ['FILTRO', 'DESCRICAO'];
            cntESP.push(DatasetFactory.createConstraint('FILTRO', qCAMPO.value, qCAMPO.value, ConstraintType.SHOULD));
            xHeader.push({
                'title': 'Filtro'
            }, {
                'title': 'Descrição'
            });
            break;
        case 'fornecedor':
            sortingFields = new Array("DESCRICAO");
            xTITULO = 'CONSULTA DE FORNECEDOR';
            xDataSet = 'ds_fornecedor';
            campos = ['CODIGO', 'DESCRICAO', 'CGC'];
            var tipoCampo = qCAMPO.value;
            var resultCampo;
            if (typeof tipoCampo === 'string' && !isNaN(tipoCampo) && tipoCampo.length <= 6) {
                resultCampo = 'CODIGO';
            } else if (typeof tipoCampo === 'string' && !isNaN(tipoCampo) && tipoCampo.length === 14) {
                resultCampo = 'CGC';
            } else if (typeof tipoCampo === 'string') {
                resultCampo = 'DESCRICAO';
            }
            cntESP.push(DatasetFactory.createConstraint(resultCampo, qCAMPO.value, qCAMPO.value, ConstraintType.SHOULD));
            xHeader.push({
                'title': 'Código'
            }, {
                'title': 'Descrição'
            }, {
                'title': 'CNPJ'
            });
            break;
          //case 'produto':
          case 'descProduto':
            sortingFields = new Array("FILTRO")
            xTITULO = 'CONSULTA DE PRODUTOS';
            xDataSet = 'ds_produto';
            campos = ['FILTRO', 'FABRICANTE'];
            
            var qUSABILIDADE = ''+$('#FilialUsabilidade').val();
            if(qUSABILIDADE!='1' && qUSABILIDADE!='2' && qUSABILIDADE!='3')
            	qUSABILIDADE = '1';
            
            // 1 - Clinica          > somente 1
            // 2 - Hospital         > somente 2
            // 3 - Farmacia Central > pega todos
            // 5 - Holding          > nenhum
            qUSABILIDADE = '2';

            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'MD'        , 'MD'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'SO'        , 'SO'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'MQ'        , 'MQ'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'MM'        , 'MM'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'LB'        , 'LB'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'DT'        , 'DT'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('COD_TIPO'   , 'VC'        , 'VC'        , ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('FILTRO'     , qCAMPO.value, qCAMPO.value, ConstraintType.SHOULD));
            cntESP.push(DatasetFactory.createConstraint('USABILIDADE', qUSABILIDADE, qUSABILIDADE, ConstraintType.SHOULD));
            xHeader.push({
                'title': 'Produto:'
            }, {
                'title': 'Fabricante:'
            });
            break;

        default:
            xTITULO = 'CONSULTA INVÁLIDA...';
            xDataSet = '';
            break;
    }
    if (xDataSet == '')
        return false;

    // LOADING
    myLOADING.show();
    myModal_CLASSIFICACAO = FLUIGC.modal({
        title: xTITULO,
        content: '<div class="row">' +
            '  <div class="col-md-12 col-xs-12" style="height: 250px;">' +
            '    <div id="tabCONSULTA">' +
            '    </div>' +
            '  </div>' +
            '</div>',
        id: 'fluig-modal4',
        size: 'large', // full | large | small
        actions: [{
            'label': 'Confirma',
            'bind': 'confirma_CLASSIFICACAO'
        }, {
            'label': 'Descartar',
            'autoClose': true
        }]
    }, function (err, data) {
        if (err) {
            avisoWF('Atenção', err);
        } else
            $('#datatable-area').removeAttr('class');
    });
    // CARREGAR TABELA
    var callbackFactory = new Object();
    callbackFactory.success = function (data) {
        // LOADING
        myLOADING.hide();
        var resultado = [];
        if(idCampo == 'produto') { 
            resultado = data.values.filter(function(el) {
                return parseInt(el.CODIGO) >= 50000 && parseInt(el.CODIGO) <= 79000;
            });
        } else {
            resultado = data.values;
        }
        // CARREGAR MODAL
        myTableFC = FLUIGC.datatable('#tabCONSULTA', {
            tableData: null,
            dataInit: null,
            dataRequest: resultado,
            emptyMessage: '<div class="text-center" style="color:red;"><b>Nenhum registro encontrado conforme parâmetros informados.</b></div>',
            renderContent: campos,
            navButtons: {
                enabled: false
            },
            scroll: {
                target: '#tabCONSULTA',
                enabled: true
            },
            classSelected: 'info',
            tableStyle: 'table-hover',
            multiSelect: false,
            header: xHeader,
            selected: function (el, ev) {
                var index = this.myTableFC.selectedRows()[0];
                var selected = this.myTableFC.getRow(index);
            },
            search: {
                enabled: true,
                onlyEnterkey: true,

                onSearch: function (res) {
                    myTableFC.reload(dataAll);
                    var bResult;
                    if (res) {
                        dataAll = myTableFC.getData();
                        var search = dataAll.filter(function (el) {
                            for (var [key, value] of Object.entries(el)) {
                                if (typeof value === "string") {
                                    if (value.toUpperCase().indexOf(res.toUpperCase()) >= 0)
                                        return el;
                                } else {
                                    if (typeof value === "number") {
                                        if (value.toString().toUpperCase().indexOf(res.toUpperCase()) >= 0)
                                            return el;
                                    }
                                }
                            }
                        });
                        // 
                        myTableFC.reload(search);
                        if (search && search.length) {
                            myTableFC.reload(search);
                            bResult = true;
                        } else {
                            bResult = false;
                        }
                    }
                    if (!bResult && res) {
                        FLUIGC.toast({
                            title: 'Procurando por ' + res + ': ',
                            message: 'Não localizado',
                            type: 'warning'
                        });
                    }
                },
            },
        }, function (err, data) {
            // LOADING
            myLOADING.hide();
            if (data)
                dataAll = data;
            if (err) {
                avisoWF('Procurando', 'Falha ao carregar consulta. \n ' + JSON.stringify(err));
            } else
                $('#datatable-area').removeAttr('class');
        });
    }
    // 	
    callbackFactory.error = function (xhr, txtStatus, error) {
        // LOADING
        myLOADING.hide();
        avisoWF('Procurando', 'Falha ao carregar consulta. \n ' + JSON.stringify(error));
    }
    // CHAMAR CONSULTA

    DatasetFactory.getDataset(xDataSet, campos, cntESP, null, callbackFactory);
}
// GRAVAR CLASSIFICACAO
$(document).on("click", "[confirma_CLASSIFICACAO]", function (evCLASSIFICACAO) {
    
    var index = myTableFC.selectedRows();
    var selected = myTableFC.getRow(index);
    if (selected == undefined)
        return false;
    // 
    var x1 = qualCampoId.lastIndexOf('_') + 1;
    x1 = qualCampoId.substring(x1);
    if($("#"+qualCampoId).val() == "" || $("#"+qualCampoId).val() == undefined || $("#"+qualCampoId).val() == null) {
        return false;
    }
    if (qualCampoId.replace('___'+x1, '') == 'descProduto') {
        $("#codProduto___"         +x1).val( selected['CODIGO']    ); 
        $("#descProduto___"        +x1).val( selected['DESCRICAO'] ); 
        
        $("#unidadeProd___"     +x1).val( selected['UM']        );
        $('#grupoProduto___'    +x1).val( selected['GRUPO']     );
        
        /*
        $("#nmFabricante___"      +x1).val( selected['FABRICANTE']); 
        $("#tipoProduto___"       +x1).val( selected['COD_TIPO']  );
        $('#txtIdContaContabil___'+x1).val( selected['CONTA_CONTABIL'] );
        $('#txtContaContabil___'  +x1).val( selected['CONTA_CONTABIL'] );
        */

        /**
	        CLASSE_TASY: ""
	    	CNAE: ""
	    	CODIGO: "050604"
	    	COD_ANVISA: ""
	    	COD_ISS: ""
	    	COD_TIPO: "MD"
	    	COD_TISS: ""
	    	CONTA_CONTABIL: "110501010001"
	    	DESCRICAO: "NAUSEDRON 8MG COMP REV"
	    	DESC_TIPO: "MEDICAMENTO"
	    	FABRICANTE: "CRISTALIA - SANOBIOL PRODUTOS QUIMICOS F"
	    	FILTRO: "050604 - NAUSEDRON 8MG COMP REV - "
	    	GRUPO: "0015"
	    	ID_TASY: ""
	    	IPI: "0"
	    	PRINC_ATIVO: "ONDANsetrona oral"
	    	ULTIMO_PRECO: "5.673"
	    	UM: "CP"
        */

        // SE EXISITIR COTACAO AJUSTAR DADOS
        var qThis = $("#codProd___"+x1)[0];
        //ajustarCodigoItem( qThis );
        //alimentarSaldoProtheus(x1, qThis );
        //alimentarConsumoMedioProtheus(x1, qThis );
        //alimentarUnidadeMedidaProtheus(x1, qThis );
    
    } else if(qualCampoId.replace('___' +x1, '') == 'fornecedor') {
        $("#fornecedor___" +x1).val(selected['FILTRO']);
        $("#txtCodFornecCotacao___"  +x1).val(selected['CODIGO']).change();
        $("#txtNomeFornecCotacao___" +x1).val(selected['DESCRICAO']).change();
        $("#txtLojaFornecCotacao___" +x1).val(selected['LOJA']).change();
        $("#txtCnpjFornecCotacao___" +x1).val(selected['CGC']).change();
    } else if(qualCampoId.replace('___' +x1, '') == 'condicaoPagamento') { 
        $("#condicaoPagamento___"            +x1).val(selected['FILTRO']);
        $("#txtCodFormaPagamentoProtheus___" +x1).val(selected['CODIGO']).change();
        $("#txtNomeFormaPagamentoBionexo___" +x1).val(selected['DESCRICAO']).change();
    } else if (qualCampoId.replace('___' +x1, '') == 'armazem') {
        $("#txtIdArmazemProduto___" +x1).val(selected['CODIGO']).change();
        $("#txtArmazemProduto___"   +x1).val(selected['DESCRICAO']).change();
        $("#armazem___"             +x1).val(selected['FILTRO']);
    }
    else
        // CAMPO CODIGO PADRAO
        if (selected.CODIGO !== undefined)
            $("#" + qualCampoId).val(selected.CODIGO);
    // 
    myModal_CLASSIFICACAO.remove();
});