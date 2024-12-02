var errorMsg = "";

function validateForm(form) {
    if (isTransferOrSave() == false) {
        var idFluxo = form.getValue("idFluxo");
        if (CURRENT_STATE == INICIO || CURRENT_STATE == 0) {
            validaFormPrincipal(form);
        } else if (CURRENT_STATE == CORRECAO_SOLICITANTE) {
            validaFormPrincipal(form);
        } else if (CURRENT_STATE == VALIDACAO_CLINICA) {
            campoObrigatorio(form, 'aprovacaoClinica', 'Decisão');
            if (form.getValue('aprovacaoClinica') == 'nao') {
                campoObrigatorio(form, 'motivoRepovacaoClinica', 'Motivo');
            }
        } else if (CURRENT_STATE == VALIDACAO_ONCOPROD) {
            campoObrigatorio(form, 'aprovacaoOncoprod', 'Decisão');
            if (form.getValue('aprovacaoOncoprod') == 'nao') {
                campoObrigatorio(form, 'motivoRepovacaoOncoprod', 'Motivo');
            }
        } else if (CURRENT_STATE == ALCADA_APROVACAO) {
            /* var numAlcada = form.getValue('contadorAlcada');
            campoObrigatorio(form, 'aprovacaoAlcada' + numAlcada, 'Decisão');
            if (form.getValue('aprovacaoAlcada' + numAlcada) == 'nao') {
            	campoObrigatorio(form, 'motivoRepovacaoAlcada' + numAlcada, 'Motivo');
            } */
        } else if (CURRENT_STATE == ATENDER_PEDIDO) { //ANEXAR NF (FATURAMENTO)
            if (idFluxo == "RemessaComprasOncoprod") {
                var indexs = form.getChildrenIndexes('tbProd');
                for (var i = 0; i < indexs.length; i++) {
                    var indice = indexs[i];
                    campoObrigatorio(form, "qtdAtendidoProd___" + indice, 'Atendidos' + " na linha " + indice);
                    if (form.getValue("pendentesProd___" + indice) != '0') {
                        campoObrigatorio(form, 'obsOncoprod___' + indice, 'Observação Oncoprod' + " na linha " + indice);
                    }
                }
            }
        } else if (CURRENT_STATE == VERIFICAR_PRODUTOS) { //ANEXAR NF (FATURAMENTO)
            if (idFluxo == "RemessaComprasOncoprod") {
                campoObrigatorio(form, 'aprovacaoCompras', 'Decisão');
                if (form.getValue('aprovacaoCompras') == 'nao') {
                    campoObrigatorio(form, 'motivoRepovacaoCompras', 'Motivo');
                }
                var indexs = form.getChildrenIndexes('tbProd');
                for (var i = 0; i < indexs.length; i++) {
                    var indice = indexs[i];
                    if (form.getValue("pendentesProd___" + indice) != '0') {
                        campoObrigatorio(form, 'qtdAguardarProd___' + indice, 'Qtd. a Aguardar' + " na linha " + indice);
                    }
                }
            } else {
                campoObrigatorio(form, 'aprovacaoFaturamento', 'Decisão');
                if (form.getValue('aprovacaoFaturamento') == 'nao') {
                    campoObrigatorio(form, 'motivoRepovacaoFaturamento', 'Motivo');
                }
            }
        }
        if (errorMsg != '') {
            throw errorMsg;
        }
    }
}

function validaFormPrincipal(form) {
    campoObrigatorio(form, 'filial', 'Filial');
    campoObrigatorio(form, 'fornecedor', 'Fornecedor');
    campoObrigatorio(form, 'centroDeCusto', 'Centro De Custo');
    campoObrigatorio(form, 'infoAdicionais', 'Informações Adicionais');
    campoObrigatorio(form, 'tabelaPreco', 'Tabela de Preço');
    campoObrigatorio(form, 'prazoPagamento', 'Prazo de Pagamento');
    campoObrigatorio(form, 'localEntrega', 'Local da entrega');
    campoObrigatorio(form, 'valorTotal', 'Valor Total dos Produtos');
    campoObrigatorio(form, 'dataContagem', 'Data da Contagem');
    if (form.getValue("idFluxo") == "FaturamentoComprasOncoprod") {
        campoObrigatorio(form, 'prazoEntrega', 'Prazo da Entrega');
    }

    //Verifica se existe produtos e valida a zoom
    var qtdProdutos = form.getChildrenIndexes('tbProd').length;
    if (qtdProdutos > 0) {
        var fieldsProdutos = ["numProd", "nomeProd", "unidadeProd", "inventarioProd", "qtdProd",
            "caixaProd", "valorProd", "valorTotalProd", "custoMensalProd",
            "fabricanteProd", "saldoAberto"
        ];
        var nameFieldsProdutos = ["Produto", "Nome Produto", "Unidade", "Inventário", "Quantidade",
            "Caixa", "Valor Produto", "Valor Total", "C.M.Mensal",
            "Fabricante", "Saldo Aberto"
        ];    	
    		    
        manipulaPaiFilho(form, 'tbProd', fieldsProdutos, nameFieldsProdutos);

        var indexes = form.getChildrenIndexes('tbProd');
        for (var qtd in indexes) {
            var index = indexes[qtd];
            if (parseInt(form.getValue("qtdProd___" + index)) <= 0) {
                errorMsg += 'Não é permitido item com Quantidade zero.</br>';
            }
            
            if (form.getValue("numProd___" + index) == "") {
                errorMsg += 'Favor informar o produto na tabela.</br>';
            }
            
           /* if (parseInt(form.getValue("custoMensalProd___" + index)) <= 0) {
                errorMsg += 'Não é permitido item com Custo Médio zerado na linha ' + index+'</br>';
            }
            */
            if (form.getValue("valorTotalProd___" + index) == "R$ 0,00") {
                errorMsg += 'Não é permitido item com valor zerado.</br>';
            }
            
            if (form.getValue("valorTotalProd___" + index) == "R$ NaN,00") {
                errorMsg += 'Não é permitido item com valor zerado.</br>';
            }
            
            
            
        }
    } else {
        errorMsg += 'Produtos são obrigatórios na solicitação.</br>';

    }


}