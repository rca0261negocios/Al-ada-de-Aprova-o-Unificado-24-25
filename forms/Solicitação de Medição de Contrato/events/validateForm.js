function validateForm(form) {

    var ATIVIDADE = getValue("WKNumState");
    var codFilal = form.getValue("codFilial");

    if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR_INCONSISTENCIA) {

        if (codFilal == '99999' /* || 
            codFilal == "00101" ||
            codFilal == "00104" ||
            codFilal == "00105" ||
            codFilal == "00301" ||
            codFilal == "00501" ||
            codFilal == "00601" ||
            codFilal == "00701" ||
            codFilal == "00901" ||
            codFilal == "01001" ||
            codFilal == "01101" ||
            codFilal == "01301" ||
            codFilal == "01401" ||
            codFilal == "01501" ||
            codFilal == "01601" ||
            codFilal == "01701" ||
            codFilal == "01801" ||
            codFilal == "01901" ||
            codFilal == "02001" ||
            codFilal == "02101" ||
            codFilal == "02201" ||
            codFilal == "02301" ||
            codFilal == "02501" ||
            codFilal == "02701" ||
            codFilal == "02801" */) {
            if (form.getValue("valorliquido") == "R$ 0,00" || form.getValue("valorliquido") == "") {
                throw "A o valor liquido  não pode estar vazia!";
            }
            if (form.getValue("prioridadepagamento") == "") {
                throw "A Forma de pagamento  não pode estar vazia!";
            }

            if (form.getValue("exampleCheckrene") == "checked" && form.getValue("dataVencNegociado") == "") {
                throw "Data de vencimento Negociado Não pode estar vazio";
            }

            /*if(form.getValue("prioridadepagamento") == "1-Boleto"){
                if (form.getValue("statusDDAHide") == "ddaDanger" || form.getValue("statusDDAHide") == "") {
                    throw "O DDA deve estar validado!";
                }
            }*/
        }
        if (codFilal == "06601"){
            throw 'Prezado (a) as operações de registro de documentos para pagamentos do Hospital Vila da Serra - HVS que se enquadra neste fluxo ainda não estão sendo realizadas pelo CSO e sim internamente no Hospital,gentileza enviar sua demanda para o e-mail centraldenotas@oncoclinicas.com que direcionaremos sua demanda para o responsável do HVS.                                                                                                                                                                          ' 
        }
        if (form.getValue("codFilial") == "") {
            throw "A filial não pode estar vazia!";
        }

        if (form.getValue("codFornecedor") == "") {
            throw "O fornecedor não pode estar vazio!";
        }
        if (form.getValue("serieNF") == "") {
            throw "A serie não pode estar vazio!";
        }

        if (form.getValue("numContrato") == "") {
            throw "O número do contrato não pode estar vazio!";
        }

        if (form.getValue("competencia") == "") {
            throw "A competencia não pode estar vazia!";
        }

        if (form.getValue("codCentroCusto___1") == "") {
            throw "O centro de custo não pode estar vazio!";
        }

        if (form.getValue("notaFiscal") != "" && form.getValue("emissaoNota") == "") {
            throw "A data de emissão da nota fiscal não pode estar vazia!";
        }

        if (form.getValue("tipoMedicao") == "") {
            throw "O tipo de medição não pode estar vazio!";
        }        
        if (form.getValue("dataVencimento") == "" && form.getValue("dataVencimentoSemTrava") == "") {
            throw "A data de Vencimento nao pode estar vazia!"
        }

        if (form.getValue("justCentral") == "") {
            throw "O campo Justificativa/Comentários não pode estar vazio!";
        }

        if (form.getValue('valorTotalMedicao') != form.getValue('cpValorTotalRateio') &&
            form.getValue('cpValorTotalRateio') != '') {
            throw 'Valor do centro de custo deve ser o mesmo do valor total da nota !!!\n'
        }
        if (form.getValue("zmCentroCustosAprov") == "") {
            throw "O campo Centro de custos Aprovador não pode estar vazio!";
        }

        var indexTbItens = form.getChildrenIndexes("tbProdutos");

        if (indexTbItens.length == 0) {
            throw "Pelo menos um item deve ser adicionado!";
        }

        linhasRateio = form.getChildrenIndexes("tbRateio");
        if (linhasRateio.length == 0) {
            throw "Pelo menos um centro de custo";
        }

        for (let index = 1; index <= linhasRateio.length; index++) {

            let linhaRateio = linhasRateio[index]
            if (form.getValue('cpCodCentroCustos___' + index) == '' || form.getValue('cpCodCentroCustos___' + index) == 'R$ 0,00') {
                throw 'Centro de custos em branco na linha!!! linha ' + index + '\n'
            }
            if (form.getValue('cpValorRateio___' + index) == '' || form.getValue('cpCodCentroCustos___' + index) == 'R$ 0,00') {
                throw 'Centro de custo sem valor informado!!! linha ' + linha + '\n'
            }
        }

        for (var x = 0; x < indexTbItens.length; x++) {

            var index = indexTbItens[x];

            if (form.getValue("codProduto___" + index) == "") {
                throw "O produto não pode estar vazio!";
            }

            if (form.getValue("quantProduto___" + index) == "") {
                throw "A quantidade não pode estar vazio!";
            }

            if (form.getValue("vlrUnitProduto___" + index) == null || removeMascaraMonetaria(form.getValue("vlrUnitProduto___" + index)) == 0.0 || form.getValue("vlrUnitProduto___" + index) == "") {
                throw "O valor unitário não pode estar vazio!";
            }

        }

        if (form.getValue("proximoAprovador") == "") {
            throw "Ausência de cadastro de Gestor para aprovação do Centro de Custo selecionado. Favor entrar em contato com a Central de Atendimento.";
        }

        if (form.getValue("idSolicitante") == form.getValue("idAprovGestor1")) {
            throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
        }

        if (form.getValue("idSolicitante") == form.getValue("idAprovGestor2")) {
            throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
        }

        if (form.getValue("idSolicitante") == form.getValue("idAprovGestor3")) {
            throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
        }

        if (form.getValue("idSolicitante") == form.getValue("idAprovGestor4")) {
            throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
        }

        if (form.getValue("idSolicitante") == form.getValue("idAprovGestor5")) {
            throw "O solicitante não pode abrir solicitações em que o mesmo está na alçada de aprovação.";
        }

        var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
        var constraints = new Array(c1);
        var dataset = DatasetFactory.getDataset("ds_configMedicaoContratos", null, constraints, null);
        var bloqueio = "";

        if (dataset != null && dataset.rowsCount != 0) {
            bloqueio = dataset.getValue(0, "bloqueio");
        }

        if (bloqueio == "Sim" && form.getValue("emissaoNota") != "" && validaData(form.getValue("emissaoNota"))) {
            throw "A solicitação está fora da política da empresa.";
        }

        if (!vldCondPagto(form.getValue("codCondPagto"))) {
            throw "Condição de Pagamento invalido, favor entrar em contato com a equipe de Contratos e atualizar a solicitação.";
        }
        var checkCiencia = form.getValue("exampleForn");

        if (checkCiencia == "checked" && form.getValue("justFornecedor") == "") {
            throw "Produto que deseje vincular não pode estar vazio"
        }

        var msgCtr = vldSaldoContrato(form);
        if (msgCtr != "") {
            throw msgCtr;
        }

    }

    if (ATIVIDADE == AVALIACAO_GESTOR) {

        var split = form.getValue("exampleCheck")
        var pegaValorCiencia = form.getValue("exeCiencia")
        var checkCiencia = form.getValue("exampleCheckrene")
        if (split == "checked" && pegaValorCiencia == "" || checkCiencia == "checked" && pegaValorCiencia == "") {
            throw "Por favor Marcar o campo Ciente de multa ou Renegociação";
        }


        var nivelAtual = form.getValue("nivelAtualAprovacao");

        var decisaoGestor = form.getValue("decisaoGestor" + nivelAtual);
        var motivoAprovGestor = form.getValue("motivoAprovGestor" + nivelAtual);

        if (decisaoGestor == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }

        if (decisaoGestor == "Nao" && motivoAprovGestor == "") {
            throw "Favor justificar o motivo da reprovação!";
        }

        if (decisaoGestor != "Nao" && !vldCondPagto(form.getValue("codCondPagto"))) {
            throw "Condição de Pagamento invalido, favor entrar em contato com a equipe de Contratos e atualizar a solicitação.";
        }

    }
    if (ATIVIDADE == VALIDACAO_FISCAL_PRODUTO) {


        if (form.getValue("descFornecedor1") == "") {
            throw "Descrição fiscal  não pode estar vazio"
        }

    }

    if (ATIVIDADE == TRATATIVA_MEDICAO) {

        if (form.getValue("slCepom") == "") {
            throw "Favor preencher o CEPOM!";
        }

        if (form.getValue("decisaoTratativaMedicao") == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }
        if (form.getValue("cpAliqISS") == "") {
            throw "O campo aliquota de ISS não pode estar vazio!";
        }

        if (form.getValue("cpINSS") == "") {
            throw "O campo aliquota de INSS não pode estar vazio!";
        }
        if (form.getValue("cpTes") == "") {
            throw "A campo TES não pode estar vazio!";
        }

        if (form.getValue("zoomEspecieNf") == "") {
            throw "O campo  EspecieNf não pode estar vazio!";
        }
        if (form.getValue("decisaoTratativaMedicao") == "Nao" && form.getValue("motivoAprovTratativaMedicao") == "") {
            throw "Favor justificar o motivo da reprovação!";
        }

    }

    if (ATIVIDADE == VALIDACAO_FISCAL) {

        if (form.getValue("decisaoFiscal") == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }

        if (form.getValue("decisaoFiscal") == "Nao" && form.getValue("motivoAprovFiscal") == "") {
            throw "Favor justificar o motivo da reprovação!";
        }


    }

    if (ATIVIDADE == PROGRAMACAO_TITULO) {

        if (form.getValue("decisaoTitulo") == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }
        if (form.getValue("decisaoTitulo") == "Nao" && form.getValue("motivoAprovTitulo") == "") {
            throw "Favor justificar o motivo da reprovação!";
        }
        if (form.getValue("decisaoTitulo") == "Sim" && form.getValue('aprovDataPrevista') == '') {
            throw "</br> O título referente a essa solicitação não foi localizada no Protheus. Gentileza verificar com responsável pelo lançamento. ";
        }
    }
    if (ATIVIDADE == CORRECAO_SOLICITANTE) {

        if (form.getValue("decisaoAprovSol") == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }
        if (form.getValue("decisaoAprovSol") == "Nao" && form.getValue("motivoAprovSolicitacao") == "") {
            throw "Favor justificar o motivo da reprovação!";
        }

        if (form.getValue("decisaoAprovSol") == "Sim") {
            if (form.getValue('emailGestAvalia') == '') {
                throw "Favor selecionar o gestor do contrato para responder a pesquisa de satisfação"
            }
        }
    }

    if (ATIVIDADE == SOLUCAO_INCONSISTENCIA) {

        if (form.getValue("solucaoInconsistencia") == "") {
            throw "Favor preencher a solução de inconsistência!";
        }
    }

    if (ATIVIDADE == INCONSISTENCIA_COMPRAS) {

        if (form.getValue("solucaoTomada") == "") {
            throw "Favor preencher a solução!";
        }
    }

    if (ATIVIDADE == APROV_SOLICITANTE) {

        if (form.getValue("decisaoAprovSol") == "") {
            throw "Favor aprovar ou reprovar a solicitação!";
        }
        if (form.getValue("decisaoAprovSol") == "Nao" && form.getValue("motivoAprovSolicitacao") == "") {
            throw "Favor justificar o motivo da reprovação!";
        }
    }
}

function removeMascaraMonetaria(mask) {
    if (mask != undefined) {
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

function validaData(data) {

    var dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    var diaEmissao = data.split('-')[2];
    var mesEmissao = data.split('-')[1] - 1; //Subtraindo 1 do mes, uma vez que são considerados meses de 0 a 11
    var anoEmissao = data.split('-')[0];

    var dataEmissao = new Date(anoEmissao, mesEmissao, diaEmissao);

    return dataEmissao < dataAtual;

}

function vldCondPagto(codigo) {

    var ret = false;
    var c1 = DatasetFactory.createConstraint("CODIGO", codigo, codigo, ConstraintType.MUST);

    var constraints = new Array(c1);
    var ds_condicaoPagamento = DatasetFactory.getDataset("ds_condicaoPagamento", null, constraints, null);

    if (ds_condicaoPagamento != null && ds_condicaoPagamento.rowsCount != 0 && ds_condicaoPagamento.getValue(0, "DESCRICAO") != "") {
        ret = true;
    }

    return ret

}

function vldSaldoContrato(form) {

    var mensagem = "";
    var contratoForm = form.getValue("numContrato");
    var revisaoForm = form.getValue("revContrato");
    var contratoDataset = "";
    var revisaoDataset = "";
    var localizouContrato = false;

    var cntFilial = DatasetFactory.createConstraint("FILIAL", form.getValue("codFilial"), form.getValue("codFilial"), ConstraintType.MUST);
    var cntEmail = DatasetFactory.createConstraint("EMAIL", 'liberaracesso', 'liberaracesso', ConstraintType.MUST);
    var cntFornecedor = DatasetFactory.createConstraint("COD_FORNECEDOR", form.getValue("codFornecedor"), form.getValue("codFornecedor"), ConstraintType.MUST);
    var cntLoja = DatasetFactory.createConstraint("LOJA_FORNECEDOR", form.getValue("lojFornecedor"), form.getValue("lojFornecedor"), ConstraintType.MUST);

    var cntContrato = new Array(cntFilial, cntEmail, cntFornecedor, cntLoja);
    var ds_contrato = DatasetFactory.getDataset("ds_contrato", null, cntContrato, null);

    if (ds_contrato != null && ds_contrato.rowsCount != 0 && ds_contrato.getValue(0, "NUMERO") != "") {

        for (var i = 0; i < ds_contrato.rowsCount; i++) {
            contratoDataset = ds_contrato.getValue(i, "NUMERO");
            revisaoDataset = ds_contrato.getValue(i, "REVISAO");

            if (contratoForm == contratoDataset) {

                localizouContrato = true;
                var novoSaldoContrato = removeMascaraMonetaria(ds_contrato.getValue(i, "SALDO"));

                if (novoSaldoContrato != removeMascaraMonetaria(form.getValue("saldoContrato")) && novoSaldoContrato < removeMascaraMonetaria(form.getValue("valorTotalMedicao"))) {
                    mensagem += "O saldo do contrato foi alterado e possui um valor inferior ao valor da medição.";
                }

                if (removeMascaraMonetaria(form.getValue("saldoContrato")) < removeMascaraMonetaria(form.getValue("valorTotalMedicao"))) {
                    mensagem += "Saldo do contrato inferior ao valor da medição.";
                }

                if (revisaoDataset != revisaoForm) {
                    mensagem += "A revisão do contrato foi alterada. Favor verificar.";
                }

            }
        }

        if (!localizouContrato) {
            mensagem += "Contrato " + contratoForm + " não localizado.";
        }

    } else {
        mensagem += "Não foi localizado nenhum contrato para o fornecedor selecionado.";
    }

    return mensagem;

}