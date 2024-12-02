function displayFields(form, customHTML) {
    var atividade = getValue('WKNumState')
    var usuario = buscarNomeUsuario(getValue('WKUser'));
    var userMail = buscarMailUsuario(getValue('WKUser'));

    // desabilita os btn de aprovação no modo visualização
    if (form.getFormMode() == 'VIEW') {
        execJquery("$('#dtVencimento').show()", customHTML)
        execJquery("$('fieldset').show()", customHTML)
        execJquery("$('button, select').prop('disabled',true)", customHTML)

    } else if (atividade == 0 || atividade == 5) {
        form.setValue('cpSolicitante', usuario)
        form.setValue('emailSolicitante', userMail)
        form.setValue('dtSolicitacao', getDate())
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdFiscal, #fdSolicitante, #fdCompras, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCoordenadorCompras, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("startEvents()", customHTML)
    } else if (atividade == alcadaAprovacao) {
        var linhasRateio = form.getChildrenIndexes("tbRateio").length
        form.setValue('indexRateio', linhasRateio)
        form.setValue('cpAprovGestor', usuario)
        form.setValue('dtAprovGestor', getDate())
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('cpTipoPagamento', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('taMotivo', false)
        form.setValue('cpDecisaoGestor', '')
        form.setValue('taMotivoFinanceiro', '')
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input, .fieldTableReg input,fieldsNF textarea,fieldsNF select').prop('readonly',true)", customHTML)
        execJquery("$('#fdClassificacao ,#fdSolicitante, #fdCompras, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCoordenadorCompras, #fdFiscal, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button, .tbRateio button').prop('disabled', true)", customHTML)
        execJquery("proximoAprovador()", customHTML)
        execJquery("$('.fieldsNF input, .fieldTableGDS input').prop('readonly',true)", customHTML)

    } else if (atividade == validacaoCompras) {
        form.setValue('cpAprovRegularizadora', usuario)
        form.setValue('dtAprovRegularizadora', getDate())
        form.setEnabled('zoomEspecieNf', false)
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('cpTipoPagamento', false)
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input, .fieldTableReg input,fieldsNF textarea,fieldsNF select').prop('readonly',true)", customHTML)
        execJquery("$('#fdClassificacao ,#fdSolicitante, #fdCompras, #fdInconsistencia, #fdGestoresAlcada, #fdCoordenadorCompras, #fdFiscal,#fdCoordenadorCompras, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button , .tbRateio button').prop('disabled', true)", customHTML)
        execJquery("$('.fieldsNF input, .fieldTableGDS input').prop('readonly',true)", customHTML)
    } else if (atividade == aprovacaoFinanceiro) {
        form.setValue('cpAprovFinanceiro', usuario)
        form.setValue('dtAprovFinanceiro', getDate())
        form.setEnabled('zoomEspecieNf', false)
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('cpTipoPagamento', false)
        form.setEnabled('dtPagamento', false)
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input,.fieldsNF textarea,.fieldTableReg input').prop('readonly',true)", customHTML)
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdSolicitante, #fdCompras, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCoordenadorCompras, #fdFiscal').hide()", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button , .tbRateio button').prop('disabled', true)", customHTML)
        form.setValue('cpDecisaFinanceiro', '')

    } else if (atividade == corrigirInconsistencia || atividade == TratativaClassificacao) {
        execJquery("  $('#dtEmissao').blur()", customHTML)
        execJquery("startEvents()", customHTML)
        if (form.getValue('cpTipoSolicitacao') == 'gds') {
            execJquery("$('#fdAprovacaoRegularizadora, #fdGestoresAlcada').hide()", customHTML)
            execJquery("$('#tbItensGds').find('tbody tr').not(':first').remove()", customHTML)
            execJquery("new Gds().carregarItensPedidoCompras($('#cpCodPedidoComp').val())", customHTML)
        } else {
            execJquery("proximoAprovador()", customHTML)
            execJquery("$('#cpNivelAprovacao').val(0)", customHTML)
        }
        execJquery("$('.fdFiscal input,.fdFiscal textarea, .fdAprovacaoRegularizadora textarea, .fdGestoresAlcada textarea, .fdAprovacaoFinanceiro textarea').prop('readonly',true)", customHTML)
        execJquery("$('.fdFiscal  button, .fdAprovacaoRegularizadora button, .fdGestoresAlcada button,.fdFiscal  textarea,.fdFiscal  select, .fdAprovacaoFinanceiro button, .fdAprovacaoFinanceiro').prop('disabled',true)", customHTML)
        execJquery("$('.fdAprovacaoRegularizadora textarea, .fdGestoresAlcada textarea').prop('disabled',true)", customHTML)
        execJquery("$('#fdClassificacao ,#fdSolicitante, #fdCompras, #fdInconsistencia, #fdCoordenadorCompras').hide()", customHTML)
        var recarregar = form.getValue('recarregarTable');
        if (recarregar == true || recarregar == 'true') {
            execJquery("$('#tbItensGds').find('tbody tr').not(':first').remove()", customHTML)
            execJquery("new Gds().carregarItensPedidoCompras($('#cpCodPedidoComp').val())", customHTML)
        }
        execJquery("$('#dtPagamento').prop('readonly',false)", customHTML)
        execJquery("$('.dtPagamento').show()", customHTML)
    } else if (atividade == verificacaoFiscal) {

        form.setEnabled('dtEmissao', true)
        form.setEnabled('cpNumNota', true)
        form.setEnabled('cpSerieNota', true)
        form.setEnabled('dtVencimento', false)

        
        form.setEnabled('zoomPedidoComp', false)
        form.setEnabled('zoomPedidoComp', false)
        form.setEnabled('zoomPedidoComp', false)

        form.setEnabled('cpvlrUnitario', false)
        form.setEnabled('cpValorLiquido', false)
        form.setEnabled('cpIpi', false)
        form.setEnabled('cpDesconto', false)

        form.setEnabled('zoomFornecedor', false)
        form.setEnabled('zoomFilial', false)
        form.setEnabled('cpLocalPres', false)
        form.setEnabled('cpValorNota', false)

        execJquery("$('.tbRateio input').prop('readonly',true)", customHTML) 
        execJquery("$('#tbItensReg input').prop('readonly',true)", customHTML)

        execJquery("$('#tbItensGds input').prop('readonly',true)", customHTML) 

        form.setValue('cpAprovFiscal', usuario)
        form.setValue('dtAprovFiscal', getDate())
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('cpTipoPagamento', false)
        form.setEnabled('dtPagamento', false)
        //execJquery("$('.fieldsNF input, .fieldsNF button, .fieldTableGDS input,.fieldsNF textarea,.fieldTableReg input').prop('readonly',true)", customHTML)    
        execJquery("$('.novoProduto input').prop('readonly',false)", customHTML) 
        execJquery("$('#zoomEspecieNf').prop('readonly',false)", customHTML)
        execJquery("$('#dtVencimento').prop('readonly', true)", customHTML)
        execJquery("$('#divVencimento').show()", customHTML)
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdSolicitante, #fdCompras, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCoordenadorCompras, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldTableReg button ,  .tbRateio button').prop('disabled', true)", customHTML)
        form.setValue('cpDecisaoFiscal', '')
        form.setEnabled('zoomEspecieNf', true)       
    } else if (atividade == coordenadorCompras) {
        form.setValue('cpCoordenadorCompras', usuario)
        form.setValue('dtCoordenadorCompras', getDate())
        form.setEnabled('zoomEspecieNf', false)
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('cpTipoPagamento', false)
        execJquery("$(',fdClassificacao #fdGestoresAlcada, #fdSolicitante, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCompras, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldsNF input, .fieldTableGDS input').prop('readonly',true)", customHTML)
        execJquery("$('.fdFiscal input, .fdFiscal select, .fdFiscal button, .fdFiscal textarea, .fieldsNF button, .fieldTableReg button ,  .tbRateio button').prop('disabled',true)", customHTML)
        execJquery("$('.fieldsNF input, .fieldTableGDS input,fieldsNF textarea,fieldsNF select').prop('readonly',true)", customHTML)
    } else if (atividade == erroIntegracaoPrenota) {

    } else if (atividade == inconsistenciaPedidoCompras) {
        form.setValue('cpCompras', usuario)
        form.setValue('dtCompras', getDate())
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('zoomEspecieNf', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('cpTipoPagamento', false)
        execJquery("$('.fdFiscal input, .fdFiscal button,.fdFiscal select, .fdFiscal textarea').prop('disabled',true)", customHTML)
        execJquery("$('.fieldsNF input, .fieldTableGDS input').prop('readonly',true)", customHTML)
        execJquery("$('.fieldsNF button, .fieldsNF textarea,.fieldTableGDS select, .fdFiscal textarea,.fdFiscal button,.fdGestoresAlcada button,.fdFiscal select, .fdGestoresAlcada textarea').prop('disabled', true)", customHTML)
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdSolicitante, #fdInconsistencia, #fdAprovacaoRegularizadora,#fdCoordenadorCompras, #fdAprovacaoFinanceiro').hide()", customHTML)
        customHTML.append("<script>");
		customHTML.append("$('.novoProduto').show()");	
		customHTML.append("</script>");
    } else if (atividade == aprovacaoSolicitante) {
        getVencimentoProtheus(form, customHTML)
        form.setValue('cpAprovSolicitante', usuario)
        form.setValue('dtAprovSolicitante', getDate())
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('zoomEspecieNf', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('cpTipoPagamento', false)
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdCompras, #fdFiscal,  #fdCoordenadorCompras, #fdAprovacaoRegularizadora, #fdGestoresAlcada, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input,.fieldsNF textarea,.fieldTableReg input').prop('readonly',true)", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button ,  .tbRateio button').prop('disabled', true)", customHTML)
        execJquery("startPesquisaForncedor()", customHTML)
        form.setValue('cpDecisaoSolicitante', '')
    } else if (atividade == solucaoInconsistencia) {
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('dtPagamento', false)
        form.setEnabled('cpTipoPagamento', false)
        execJquery("$('#fdClassificacao ,#fdGestoresAlcada, #fdCompras, #fdFiscal,  #fdCoordenadorCompras, #fdAprovacaoRegularizadora, #fdGestoresAlcada, #fdAprovacaoFinanceiro').hide()", customHTML)
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input,.fieldsNF textarea,.fieldTableReg input').prop('readonly',true)", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button,  .tbRateio button , .fdSolicitante button, .fdSolicitante textarea, .fdSolicitante select').prop('disabled', true)", customHTML)
    } else if (atividade == TratativaClassificacao) {

    } else if (atividade == validacaoFiscal) {
        form.setValue('taMotivoClassificao', '')
        form.setEnabled('cpTipoSolicitacao', false)
        form.setEnabled('cpTipoPagamento', false)
        form.setEnabled('dtPagamento', false)
        execJquery("$('.fieldsNF input, .fieldsNF button, .fieldsNF select, .fieldTableGDS input,.fieldsNF textarea,.fieldTableReg input').prop('readonly',true)", customHTML)
        execJquery("$('#fdGestoresAlcada, #fdSolicitante, #fdCompras, #fdInconsistencia, #fdAprovacaoRegularizadora, #fdCoordenadorCompras, #fdAprovacaoFinanceiro, #fdFiscal').hide()", customHTML)
        execJquery("$('.fieldsNF select, .fieldTableReg button ,.tbRateio button').prop('disabled', true)", customHTML)
    }
    execJquery("var CURRENT_STATE = " + atividade + ";", customHTML);
    execJquery("var MODO = '" + form.getFormMode() + "';", customHTML);

}

// busca o nome do usuario na base do fluig
function buscarNomeUsuario(user) {
    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("colleague", null, [c1], null);
    if (dataset.rowsCount == 1) {
        return dataset.getValue(0, "colleagueName");
    }
}


function buscarMailUsuario(mail) {
    var userMail = "";
    var c2 = DatasetFactory.createConstraint("colleaguePK.colleagueId", mail, mail, ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("colleague", null, [c2], null);
    if (dataset.rowsCount == 1) {
        return dataset.getValue(0, "mail");
    }
    //return userMail;
}

// retorna a data atual no formato YYYY/mm/DD
function getDate() {
    var data = new Date();
    var dia = data.getDate();
    var mes = parseInt(data.getMonth()) + 1;
    var ano = data.getFullYear()
    if (dia < 10) {
        dia = '0' + dia
    }
    if (mes < 10) {
        mes = '0' + mes
    }
    return ano + '-' + mes + '-' + dia
}

function execJquery(string, customHTML) {
    customHTML.append("<script>" + string + "</script>")
}

function getVencimentoProtheus(form, customHTML) {

    var filial = form.getValue("cpCodFilial");
    var numero = form.getValue("cpNumNota");
    var serie = form.getValue("cpSerieNota");
    var codFornecedor = form.getValue("cpCodFornecedor");
    var lojFornecedor = form.getValue("cpLojaFornecedor");

    var c1 = DatasetFactory.createConstraint("FILIAL", filial, filial, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("NUMERO", numero, numero, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("PREFIXO", serie, serie, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("COD_FORNECEDOR", codFornecedor, codFornecedor, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("LOJA_FORNECEDOR", lojFornecedor, lojFornecedor, ConstraintType.MUST);
    var constraints = new Array(c1, c2, c3, c4, c5);

    var ds_contasPagar = DatasetFactory.getDataset("ds_contasPagar", null, constraints, null);
    form.setValue("dataPagamentoPrevista", ds_contasPagar.getValue(0, "DT_VENCTO_REAL"));
    if (ds_contasPagar.getValue(0, "SALDO") == '0') {
        form.setValue("statusPagamento", "Titulo Baixado");
    } else {
        form.setValue("statusPagamento", "Titulo em Aberto");
    }

}