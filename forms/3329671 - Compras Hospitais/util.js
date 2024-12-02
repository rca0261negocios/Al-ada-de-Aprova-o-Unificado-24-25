/**
 * Adiciona mascara monetaria no campo
 * @param seletor id ou nome do campo. Ex: #idCampo
 */
function addMaskMonetaria(seletor) {
    $(seletor).maskMoney({
        prefix: 'R$ ',
        allowNegative: false,
        thousands: '.',
        decimal: ',',
        affixesStay: true
    });
}

function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = addZero(now.getMonth() + 1, 2);
    var day = addZero(now.getDate(), 2);
    var currentDate = day + '/' + month + '/' + year;
    return currentDate;
}

function addZero(x, n) {
    if (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

var myLOADING = FLUIGC.loading(window, {
    textmessage: 'Processando...'
});

// CONTROLE SELECTED ZOOM
function setSelectedZoomItem(selectedItem) {
    var selected = selectedItem;
    if (selected != null) {
        var id   = selected["id"];

        // Preenche o campo id com o valor do id do registro selecionado
        switch (selectedItem.inputId) {
            case 'aprovadorArea':
                $('#codAprovadorArea').val( selected["ID"]     );
                $('#aprovadorArea'   ).val( selected["FILTRO"] );
                break;

            case 'filial':
                $('#codFilialFluig').val( selected[""] );
                $('#codFilial'     ).val( selected["CODIGO"] );
                $('#cgcFilial'     ).val( selected["CGC"] );
                $('#filial'        ).val( selected["DESCRICAO"] );
                break;
                
            case 'centroCusto':
                $('#codCentroCusto').val( selected["CODCCUSTO"] );
                $('#centroCusto'   ).val( selected["DESCRICAO"] );
                break;

        }
    }
}

function openZoom(datasetId, datafields, resultFields, constraints, type) {
    window.open("/webdesk/zoom.jsp?datasetId=" + datasetId +
        "&dataFields=" + datafields +
        "&resultFields=" + resultFields +
        "&filterValues=" + constraints +
        "&type=" + type, "zoom", "status, scrollbars=no, top=100, left=100, width=900, height=600");
};

function configMotivo(fieldDecisao, fiedMotivo, callback) {
    //Quando reprovação exibe o campo de motivo
    $(fieldDecisao).change(function () {
        if ($(this).val() == 'nao') {
            $(fiedMotivo).parent().show();
            if (callback != null && callback != undefined) {
                callback('nao');
            }
        } else {
            $(fiedMotivo).val('');
            $(fiedMotivo).parent().hide();
            if (callback != null && callback != undefined) {
                callback('sim');
            }
        }
    });
}

function addMascaraMonetaria(valor) {
    if (valor == '' || valor == undefined) {
        return 'R$ 0,00';
    } else {
        var inteiro = null,
            decimal = null,
            c = null,
            j = null;
        var aux = new Array();
        valor = "" + valor;
        c = valor.indexOf(".", 0);
        //encontrou o ponto na string
        if (c > 0) {
            //separa as partes em inteiro e decimal
            inteiro = valor.substring(0, c);
            decimal = valor.substring(c + 1, valor.length);
        } else {
            inteiro = valor;
        }
        //pega a parte inteiro de 3 em 3 partes
        for (j = inteiro.length, c = 0; j > 0; j -= 3, c++) {
            aux[c] = inteiro.substring(j - 3, j);
        }
        //percorre a string acrescentando os pontos
        inteiro = "";
        for (c = aux.length - 1; c >= 0; c--) {
            inteiro += aux[c] + '.';
        }
        //retirando o ultimo ponto e finalizando a parte inteiro
        inteiro = inteiro.substring(0, inteiro.length - 1);
        if (isNaN(decimal) || decimal == null || decimal == undefined) {
            decimal = "00";
        } else if (decimal.length === 1) {
            decimal = decimal + "0";
        }
        valor = "R$ " + inteiro + "," + decimal;
        return valor;
    }
}

// Função responsável pela máscara monetaria
function adicionaMascaraMonetaria(campo) {
    $('#' + campo).maskMoney('destroy');
    $('#' + campo).maskMoney({
        prefix: "R$ ",
        thousands: '.',
        decimal: ',',
        affixesStay: true,
        allowZero: true
    });
}

//Funcao para remover a mascara monetaria
function removeMascaraMonetaria(mask) {
    if (mask != undefined && mask != '') {
        mask = mask.replace('R$', '');
        mask = mask.replace(' ', '');
        //mask = mask = mask.replace(/[\.]/g, '');

        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');

        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}

/**
 * Função que garante somente númeors para campos
 * Deve ser adicionada ao evento keyup do campo
 * @param numero
 */
function somenteNumeros(num) {
    var er = /[^0-9.]/;
    er.lastIndex = 0;
    var campo = num;
    if (er.test(campo.value)) {
        campo.value = "";
    }
}


function showMessage(titulo, mensagem, functionDone) {
    FLUIGC.message.alert({
        message: mensagem,
        title: titulo,
        label: 'OK'
    }, function (el, ev) {
        if (functionDone != null) {
            functionDone.call();
        }
    });
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

//formatar utf8
UTF8 = {
    encode: function (s) {
        for (var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l; s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]);
        return s.join("");
    },
    decode: function (s) {
        for (var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
            ((a = s[i][c](0)) & 0x80) &&
            (s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
                o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
        );
        return s.join("");
    }
};

function showMotivoReprovacao() {
    $('[name^="motivoRepovacao"]').each(function () {
        if ($(this).val() != '') {
            $(this).attr('readonly', 'readonly');
            $(this).closest('fieldset').show();
            $(this).parent().show();
        }
    });
}

/**
 * Busca as informações de um dataset
 * @param {*} nameDataset nome do dataset
 * @param {*} columns array com nome das colunas selicionadas ou null para todas colunas
 * @param {*} filters array com nome do filtro e valor separado por | Ex: nome|Pedro
 */
function getInDataset(nameDataset, columns, filters, active ) {
	if(active==undefined || active==null)
		active= true;
	
    try {
        var listConstraint = [];
        if (Array.isArray(filters) && filters.length > 0) {
            for (var i in filters) {
                var item = filters[i].split('|');
                listConstraint.push(DatasetFactory.createConstraint(item[0], item[1], item[1], ConstraintType.MUST));
            }
        }
        if (active) {
            listConstraint.push(DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST));
        }
        var dataset = DatasetFactory.getDataset(nameDataset, columns, listConstraint, null);
        return dataset;
    } catch (e) {
        console.log('ERRO AO CONSULTAR O DATASET: ' + nameDataset);
        console.error('ERRO: ' + e)
    }
}

//FUNÇÕES DA DECISAO DE APROVAÇÃO
/**
 * Adiciona o evento de click para os botoes de aprovação
 */
function btnAprov(enviarAtividade) {
    $(".btnAprov").on("click", function () {
        var botao = $(this).attr("id").split("Btn")
        var decisao = botao[0];
        var btnAprov = decisao + "BtnAprov";
        var btnReprov = decisao + "BtnReprov";
        var acao = botao[1];

        if (acao == "Aprov") {
            $("#" + decisao).val("sim");
            vueApp.form[decisao] = 'sim';
        } else if (acao == "Reprov") {
            $("#" + decisao).val("nao");
            vueApp.form[decisao] = 'nao';
        }
        altBtnAprov($("#" + decisao).val(), btnAprov, btnReprov);

    });
};
/**
 * Bloqueia todos os botoes de aprovação
 */
function blqAllBtnAprov() {
    $(".btnAprov").each(function () {
        var botao = $(this).attr("id").split("Btn")
        var decisao = botao[0];
        blqBtnAprov(decisao);
    });
    $("[name^='motivoAprovAlcada'").each(function () {
        $(this).prop('readonly', 'readonly');
    });
};
/**
 * bloqueia apenas aprovação do parametro
 */
function blqBtnAprov(decisao) {
    var btnAprov = decisao + "BtnAprov";
    var btnReprov = decisao + "BtnReprov";

    altBtnAprov($("#" + decisao).val(), btnAprov, btnReprov);

    $("#" + btnAprov).prop("disabled", true);
    $("#" + btnReprov).prop("disabled", true);
};

function altBtnAprov(decisao, btnAprov, btnReprov) {
    if (decisao == "sim") {
        $("#" + btnAprov).removeClass("btn-default").addClass("btn-success active");
        $("#" + btnReprov).removeClass("btn-danger active").addClass("btn-default");
    } else if (decisao == "nao") {
        $("#" + btnAprov).removeClass("btn-success active").addClass("btn-default");
        $("#" + btnReprov).removeClass("btn-default").addClass("btn-danger active");
    }
};

function flagAllBtnAprov() {
    $('[name^="decisaoAlcada"]').each(function () {
        var decisao = $(this).prop('id');
        var btnAprov = decisao + "BtnAprov";
        var btnReprov = decisao + "BtnReprov";
        $("#" + btnReprov).removeClass("btn-danger active").addClass("btn-default");
        $("#" + btnAprov).removeClass("btn-success active").addClass("btn-default");
        altBtnAprov($(this).val(), btnAprov, btnReprov);
    })
}

// Limpando campos para nova Alçada de Aprovação
function limpaAlcada() {
    $('[name^="contentAlcada"]').each(function () {
        var id = $(this).prop('id');
        var alcada = id.split("contentAlcada")[1];
        $("#idAprovAlcada" + alcada).val("");
        $("#nomeAprovAlcada" + alcada).val("");
        $("#dataAprovAlcada" + alcada).val("");
        $("#decisaoAlcada" + alcada).val("");
        $("#motivoAprovAlcada" + alcada).val("");
        $("#decisaoAlcada" + alcada + "btnAprov").addClass("btn-default");
        $("#decisaoAlcada" + alcada + "btnReprov").addClass("btn-default");
    })
    $("#contadorAlcada").val("");
    $("#aprovAlcadaAtual").val("");
}


function addEventSendFluig(callback) {
    $('.fixedTopBar, #page-header', parent.document).find('button:first').bind("click", function () {
        callback();
    });
}

function readColumn(nameColumn, callback, fieldValue) {
    if (fieldValue == undefined) {
        $("[name^='" + nameColumn + "___']").each(function () {
            callback($(this).prop('id').split('___')[1], $(this));
        });
    } else {
        $("[name^='" + nameColumn + "___'][value='" + fieldValue + "']").each(function () {
            callback($(this).prop('name').split('___')[1], $(this));
        });
    }

}

function converteDataProtheus(dataFluig) {
    if (dataFluig != undefined) {
        var arrayData = dataFluig.split("/");
        var data = '';
        if (arrayData.length == 3) {
            var ano = arrayData[2];
            var mes = arrayData[1];
            var dia = arrayData[0];
            data = ano + '' + mes + '' + dia;
        }
        return data;
    } else {
        return '';
    }
}

function diasUteis(dias) { // Função retorna a quantidade de dias para adicionar a data atual considerando dias uteis
    var dtLimite = new Date();
    dtLimite.getDate();
    dtLimite.setDate(dtLimite.getDate() - 1)
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

var idCampo = '';
function verCLASSIFICACAO(qCAMPO) {
    if( CURRENT_STATE > configApp.data.process.inicio )
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
        case 'produto':
        case 'nomeProd':
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
    if (qualCampoId.replace('___'+x1, '') == 'nomeProd') {
        $("#codProd___"         +x1).val( selected['CODIGO']    ); 
        $("#nomeProd___"        +x1).val( selected['DESCRICAO'] ); 
        
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

