function validateForm(form) {
    var atividade = getValue('WKNumState');
    var erroMsg = ''

    if (atividade == 0 || atividade == 5) {
        erroMsg += validaFormulario(form, erroMsg)
        erroMsg += validaDadosBancarios(form)
    } else if (atividade == validacaoCompras) {
        erroMsg += validaDecisao(form, erroMsg, 'cpDecisaRegularizadora', 'taMotivoRegularizadora')
    } else if (atividade == alcadaAprovacao) {
        erroMsg += validaDecisao(form, erroMsg, 'cpDecisaoGestor', 'taMotivoGestor')
    } else if (atividade == aprovacaoFinanceiro) {
        erroMsg += validaDecisao(form, erroMsg, 'cpDecisaoFinanceiro', 'taMotivoFinanceiro')
    } else if (atividade == verificacaoFiscal) {
        validaCp('slcepom', 'CEPOM', form);
        erroMsg += validaDecisao(form, erroMsg, 'cpDecisaoFiscal', 'taMotivoFiscal')
        if (form.getValue('cpSimplesNacional') != 'Sim' && form.getValue('cpAliqISS') == '') {
            erroMsg += 'Deve ser Informada uma Alíquota de ISS !!!'
        }
        if (form.getValue('cpCodCondPagamento') == '') {
            erroMsg += 'Deve ser informada uma Condição De Pagamento!!!\n'
        }
        if (form.getValue('cpINSS') == '') {
            erroMsg += 'Deve ser Informada uma Alíquota de INSS !!!'
        }
        if(form.getValue('cpTipoSolicitacao') == 'gds'){

            if (form.getValue('slMotivoRejeicao') == '5') {        	
                var itens = form.getChildrenIndexes("aux_tbItensAlterados");
                if (itens.length < 1) {
                //	erroMsg += 'Precisa ter pelo menos a alteração de um produto.'			
                }        	           
            }

        }
       
        
        
    } else if (atividade == corrigirInconsistencia) {
        erroMsg += validaFormulario(form, erroMsg)
        erroMsg += validaDadosBancarios(form)
    } else if (atividade == inconsistenciaPedidoCompras) {
        if (form.getValue('taConsideracaoCompras') == '') {
            erroMsg += 'Deve ser preenchido o campo Condiderações!!!\n'
        }
    } else if (atividade == erroIntegracaoPrenota) {} else if (atividade == erroIntegracaoExtorno) {


    } else if (atividade == coordenadorCompras) {
        if (form.getValue('taConsideracaoCooCompras') == '') {
            erroMsg += 'Deve ser preenchido o campo Condiderações!!!\n'
        }
    } else if (atividade == aprovacaoSolicitante) {
        erroMsg += validaDecisao(form, erroMsg, 'cpDecisaoSolicitante', 'taMotivoSolicitante')
    } else if (atividade == solucaoInconsistencia) {
        if (form.getValue('taSolucaoInconsistencia') == '') {
            erroMsg += 'Deve ser preenchido o campo Condiderações!!!\n'
        }
    }
    // desabilita os btn de aprovação no modo visualização

    if (erroMsg.length > 2) {
        throw erroMsg;
    }
}
// valida o form principal
function validaFormulario(form, erroMsg) {
    if (form.getValue('cpCodFilial') == '') {
        erroMsg += 'Deve ser informada uma Filial!!!\n'
    }
    if (form.getValue('cpCodFornecedor') == '') {
        erroMsg += 'Deve ser informado um fornecedor!!!\n'
    }
    if (form.getValue('cpLocalPres') == '') {
        erroMsg += 'Deve ser informado um local!!!\n'
    }
    if (form.getValue('cpNumNota') == '') {
        erroMsg += 'Deve ser informado o número da nota!!!\n'
    } else if (form.getValue('cpNumNota') == '000000000') {
        erroMsg += 'O numero da nota nao pode ser 000000000!!!\n'
    }
    if (form.getValue('cpNumNota').length() > 9) {
        erroMsg += 'O numero da nota nao pode conter mais que 9 digitos!!!\n'
    }
    if (form.getValue('cpSerieNota') == '') {
        erroMsg += 'Deve ser informada uma serie!!!\n'
    }
    if (form.getValue('dtEmissao') == '') {
        erroMsg += 'Deve ser informada uma data Emissão!!!\n'
    }
    if (form.getValue('dtPagamento') == '' &&
        form.getValue('cpTipoLancamento') == 'AUTONOMIA') {
        erroMsg += 'Deve ser informada uma data de Vencimento negociado!!!\n'
    }
    if (form.getValue('cpCodEspecieNf') == '') {
        erroMsg += 'Deve ser informada uma especie da NF!!!\n'
    }
    if (form.getValue('taDescPagamento') == '') {
        erroMsg += 'Deve ser informada uma Descrição da Solicitação!!!\n'
    }
    if (form.getValue('cpTipoPagamento') == '') {
        erroMsg += 'Deve ser informada uma forma de pagamento!!!\n'
    } if (form.getValue('cpCodFilial') == "06601"){
        throw 'Prezado (a) as operações de registro de documentos para pagamentos do Hospital Vila da Serra - HVS que se enquadra neste fluxo ainda não estão sendo realizadas pelo CSO e sim internamente no Hospital,gentileza enviar sua demanda para o e-mail centraldenotas@oncoclinicas.com que direcionaremos sua demanda para o responsável do HVS.                                                                                                                                                                          ' 
    }

    if (form.getValue('cpTipoSolicitacao') == 'reg' || form.getValue('cpTipoSolicitacao') == 'REGULARIZADORA') {
        if (form.getValue('ddaVencido') == 'true') {
            if (form.getValue('dtVencimento') == '') {
                erroMsg += 'Deve ser informada a <strong>Data Prevista Pagamento</strong>!\n'
            }

            if (form.getValue('justNegociacao') == '') {
                erroMsg += 'Deve ser informado o motivo do atraso.\n'
            }
        }
    }

    if (form.getValue('travaDDA') != 'false') {
        erroMsg += 'Favor revisar o valor do boleto!\n'
    }

    var dataEmissao = form.getValue('dtEmissao');
    dataEmissao = new Date(dataEmissao.split('-')[0], (dataEmissao.split('-')[1] - 1), dataEmissao.split('-')[2])
    if (dataEmissao > new Date()) {
        {
            erroMsg += 'Data de emissão não pode ser maior que a data atual!!!\n'
        }
    }

    if (form.getValue('ddaVencido') == 'true' || form.getValue('prazoMenor2dias') == 'true' ) {
        var vencimentoNegociado = form.getValue('dtVencimento');
        vencimentoNegociado = new Date(vencimentoNegociado.split('-')[0], (vencimentoNegociado.split('-')[1] - 1), vencimentoNegociado.split('-')[2])
        if (vencimentoNegociado < new Date() && (form.getValue('cpTipoLancamento') == 'AUTONOMIA')) {
            {
                erroMsg += 'Vencimento negociado não pode ser menor que a data atual!!!\n'
            }
        }
    } else {

        var vencimentoNegociado = form.getValue('dtVencimento');
        vencimentoNegociado = new Date(vencimentoNegociado.split('-')[0], (vencimentoNegociado.split('-')[1] - 1), vencimentoNegociado.split('-')[2])
        if (vencimentoNegociado < new Date() && (form.getValue('cpTipoLancamento') == 'AUTONOMIA')) {
            {
                erroMsg += 'Vencimento negociado não pode ser menor que a data atual!!!\n'
            }
        }
    }

    if (form.getValue('cpTipoSolicitacao') == 'gds') {
        // valida a tabela de itens do pedido de compra
        var linhas = form.getChildrenIndexes("tbItensGds");
        var existeProduto = false;
        for (let i = 0; i < linhas.length; i++) {
            var index = linhas[i];
            if (form.getValue('cpQuantEntrada___' + index) != '' &&
                form.getValue('cpQuantEntrada___' + index) != '0' &&
                form.getValue('cpQuantEntrada___' + index) != null) {

                if (form.getValue('cpCodCentroCusto___' + index) == '') {
                    erroMsg += 'Pedido sem centro de custo!!! Item: ' + form.getValue('cpItem___' + index);
                }
                existeProduto = true;
                if (form.getValue('cpQuantEntrada___' + index) > form.getValue('cpQuantPedido___' + index)) {
                    erroMsg += 'A quantidade de Entrada nao pode ser maior que a do pedido!!! Item: ' + form.getValue('cpItem___' + index);
                }
            }
        }
        if (existeProduto == false) {
            erroMsg += 'Deve ser informada a quantidade de pelo menos um produto!!!\n'
        }
    } else if (form.getValue('cpTipoSolicitacao') == 'reg') {
        if (form.getValue('cpValorNota') != form.getValue('cpValorTotalRateio') &&
            form.getValue('cpValorTotalRateio') != '') {
            erroMsg += 'Valor do centro de custo deve ser o mesmo do valor total da nota !!!\n'
        }
        if (form.getValue('cpValorNota') == '100.00') {
            erroMsg += 'A Soma dos valores do/dos Centro de custos deve ser de 100% do valor da nota!!!\n'
        }

        linhasRateio = form.getChildrenIndexes("tbRateio");
        for (let index = 0; index < linhasRateio.length; index++) {

            let linhaRateio = linhasRateio[index]
            if (form.getValue('cpCodCentroCustos___' + index) == '') {
                erroMsg += 'Centro de custos em branco na linha!!! linha ' + index + '\n'
            }
            if (form.getValue('cpValorRateio___' + index) == '') {
                erroMsg += 'Centro de custo sem valor informado!!! linha ' + linha + '\n'
            }
        }

        var linhas = form.getChildrenIndexes("tbItensReg");
        var existeProduto = false;
        var linha = 0
        for (let i = 0; i < linhas.length; i++) {
            var index = linhas[i];
            if (form.getValue('cpCodProd___' + index) != null &&
                form.getValue('cpCodProd___' + index) != undefined) {
                linha++
                if (form.getValue('cpCodProd___' + index) != '') {
                    existeProduto = true;
                    if (form.getValue('cpQuant___' + index) < 1) {
                        erroMsg += 'Produto com quantidades inválidas!!! linha ' + linha + '\n'
                    }
                    if (form.getValue('cpValorUnit___' + index) == '') {
                        erroMsg += 'Produto com ausência de valor Unitário!!! linha ' + linha + '\n'
                    }
                } else {
                    erroMsg += 'Existe Linha sem produto informado!!! linha' + linha + '\n'
                }
            }
        }

        if (form.getValue('cpValorTotalNota') != form.getValue('cpValorNota')) {
            erroMsg += 'O valor total da nota e o valor total dos produtos/serviços deve ser o mesmo!!!\n'
        }
        if (existeProduto == false) {
            erroMsg += 'Deve ser informado pelo menos um produto!!!\n'
        }


    }
    if (form.getValue('taMotivo') == '' && form.getValue('cpNotaAtrasada') == 'true') {
        erroMsg += 'Deve ser informado o motivo do atraso!!!\n'
    }
    if (form.getValue('cpNotaAtrasada') == 'true' && form.getValue('cpTipoLancamento') != 'REGULARIZADORA') {
        erroMsg += 'Vencimento negociado nao pode ser menor qque D+2!!!\n'
    }
    erroMsg += validaNotaExistente(form)
    erroMsg += validaContratoFornecedor(form)
    return erroMsg;
}

function validaDecisao(form, erroMsg, inputDecisao, inputMotivo) {

    if (form.getValue(inputDecisao) == '') {
        erroMsg += 'Deve ser informada uma decisão!!!\n'
    }
    if (form.getValue(inputDecisao) == 'nao' && form.getValue(inputMotivo) == '') {
        erroMsg += 'Deve ser informado um motivo de rejeição!!!\n'
    }
    return erroMsg;
}

function validaNotaExistente(form) {
    // Validacao da Nota
    var erroMsg = ''
    var cpNotaValida = true;
    var cpCodFornecedor = form.getValue('cpCodFornecedor');
    var cpNumNota = form.getValue('cpNumNota');

    var cons = []
    cons.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST));
    cons.push(DatasetFactory.createConstraint('cpCodFornecedor', cpCodFornecedor, cpCodFornecedor, ConstraintType.MUST));
    cons.push(DatasetFactory.createConstraint('cpNumNota', cpNumNota, cpNumNota, ConstraintType.MUST));
    var colunas = new Array('cpCodFilial', 'cpCodFornecedor', 'dtEmissao', 'cpNumNota', 'cpCodSolicitacao', 'metadata#active', 'metadata#id');
    var ds_solicitacaoGde = DatasetFactory.getDataset('ds_solicitacaoGde', colunas, cons, null);
    if (ds_solicitacaoGde.rowsCount > 0) {
        var filtroSolicitacoes = []
        for (var i = 0; i < ds_solicitacaoGde.rowsCount; i++) {
            filtroSolicitacoes.push(DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', ds_solicitacaoGde.getValue(i, "cpCodSolicitacao"), ds_solicitacaoGde.getValue(i, "cpCodSolicitacao"), ConstraintType.SHOULD))
        }

        var cpCodSolicitacao = form.getValue('cpCodSolicitacao');

        filtroSolicitacoes.push(DatasetFactory.createConstraint('active', 'true', 'true', ConstraintType.MUST));
        filtroSolicitacoes.push(DatasetFactory.createConstraint('processInstanceId', cpCodSolicitacao, cpCodSolicitacao, ConstraintType.MUST_NOT));
        var colunasWorkflowProcess = new Array('active', 'workflowProcessPK.processInstanceId');
        var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', colunasWorkflowProcess, filtroSolicitacoes, null);

        if (datasetWorkflowProcess.rowsCount > 0) {
            cpNotaValida = false;
            erroMsg += 'Nota fiscal com as mesmas características já enviada pra pagamento através do GDE ' + datasetWorkflowProcess.getValue(0, 'workflowProcessPK.processInstanceId') + ' !!!' + '\n';
        }
    }
    if (cpNotaValida) {

        var cst = [];

        cst.push(DatasetFactory.createConstraint("COD_FORNECEDOR", cpCodFornecedor, cpCodFornecedor, ConstraintType.MUST));
        cst.push(DatasetFactory.createConstraint("NUMERO", cpNumNota, cpNumNota, ConstraintType.MUST));
        var dataset = DatasetFactory.getDataset("ds_notasFiscaisEntrada", null, cst, null);

        if (dataset.getValue(0, 'NUMERO') != '') {
            cpNotaValida = false;
            erroMsg += 'Nota fiscal com as mesmas características já inserida no Protheus!!!\n';
        } else {
            cpNotaValida = true;
        }
    }
    form.setValue('cpNotaValida', cpNotaValida);
    return erroMsg
}

function validaContratoFornecedor(form) {

    let codFornecedor = form.getValue('cpCodFornecedor')
    let codFilial = form.getValue('cpCodFilial')
    if (codFornecedor != '' &&
        codFilial != '' &&
        form.getValue('cpTipoSolicitacao') == 'reg') {

        let cons = new Array()
        cons.push(DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('EMAIL', 'liberaracesso', 'liberaracesso', ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('COD_FORNECEDOR', codFornecedor, codFornecedor, ConstraintType.MUST))
        let ds_contrato = DatasetFactory.getDataset('ds_contrato', null, cons, null);

        if (ds_contrato.getValue(0, 'NUMERO') != '') {
            return 'Esse fornecedor possui contrato nessa Filial!!! Gentileza abir o processo de <b> Medição de Contratos'
        }
        return ''

    } else {
        return ''
    }

}

function validaDDA(form) {
    var msg = "";

    var tipoSolicitacao = form.getValue("cpTipoSolicitacao");
    var tipoPagamento = form.getValue("cpTipoPagamento");
    var codFilial = form.getValue("cpCodFilial");
    var cnpjFornecedor = form.getValue("cpCnpjForncedor");
    var dtVencimento = form.getValue("dtVencimento");
    var valorNota = form.getValue("cpValorLiquido");


    if (tipoSolicitacao != 'gds' && tipoPagamento == '1' && codFilial != '' && cnpjFornecedor != '' && dtVencimento != '' && valorNota != '') {

        codFilial = codFilial.substring(0, 3);
        cnpjFornecedor = cnpjFornecedor.split("/")[0].replace(".", "").replace(".", "");
        dtVencimento = dtVencimento.replace("-", "").replace("-", "");
        //valorNota = form.getValue("cpValorNota");

        var cons = new Array()

        cons.push(DatasetFactory.createConstraint('CGC', form.getValue("ddaCGCForn"), form.getValue("ddaCGCForn"), ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('FILIAL', codFilial, codFilial, ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('DT_VENCIMENTO', dtVencimento, dtVencimento, ConstraintType.MUST))
        cons.push(DatasetFactory.createConstraint('VALOR', valorNota, valorNota, ConstraintType.MUST))
        var ds_dda = DatasetFactory.getDataset('ds_dda', null, cons, null);

        if (ds_dda.getValue(0, "CGC") == "") {
            msg += "DDA não localizado.\n"
        }
    }

    return msg;
}

function validaDadosBancarios(form) {

    var msg = "";
    var tipoSolicitacao = form.getValue("cpTipoSolicitacao");
    var tipoPagamento = form.getValue("cpTipoPagamento");
    var banco = form.getValue("cpBancoFornecedor");
    var agencia = form.getValue("cpAgFornecedor");
    var conta = form.getValue("cpCCFornecedor");

    if (tipoSolicitacao != 'gds' && tipoPagamento == "2" && banco == "" && agencia == "" && conta == "") {
        msg += 'Dados bancários do fornecedor não cadastrados.\n'
    }

    return msg;
}

function validaCp(inputName, mensagem, form) {
    if (form.getValue(inputName) == '' ||
        form.getValue(inputName) == null) {
        throw '<b>' + mensagem + '</b> nao pode ficar em branco!!!'
    }
}