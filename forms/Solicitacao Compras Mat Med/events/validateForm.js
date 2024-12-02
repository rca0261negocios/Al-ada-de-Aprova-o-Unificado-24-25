var errorMsg = "";

function validateForm(form) {
    var CURRENT_STATE = getValue('WKNumState');
    if (isTransferOrSave() == false) {

        if (CURRENT_STATE == INICIO || CURRENT_STATE == 0) {

            if (form.getValue("ehSugestaoCompras") != 'true') {
                campoObrigatorio(form, "prioridade", "Prioridade");
            }
            campoObrigatorio(form, "filial", "Filial");
            campoObrigatorio(form, "centroDeCusto", "Centro De Custo");
            campoObrigatorio(form, "localEntrega", "Local Entrega");
            campoObrigatorio(form, "infoAdicionais", "Informações Adicionais");
            campoObrigatorio(form, "dataNecessidade", "Data Necessidade");

            if(form.getValue("prioridade") == "E"){
                campoObrigatorio(form, "motivoEmergencial", "Motivo Emergencial");
            }

            // Pegar valores do PaiFilho Produtos 
            var indexProd = form.getChildrenIndexes('tbProd');
            if (indexProd.length < 1) {
                errorMsg += "É obrigatório adicionar um ou mais produtos na solicitação.";
            } else {
                for (var i = 0; i < indexProd.length; i++) {
                    var indice = indexProd[i];
                    campoObrigatorio(form, "codProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "qtdProd___" + indice, "Quantidade na linha " + indice);
                    campoObrigatorio(form, "tdSelectPrimeiraCompra___" + indice, "Primeira Compra na linha " + indice);
                }
            }
        } else if (CURRENT_STATE == ANALISE_COMPRADOR) {

            if(form.getValue("prioridade") == "E"){
                campoObrigatorio(form, "motivoEmergencial", "Motivo Emergencial");
            }
            
            if (form.getValue("prioridadeOriginal") != form.getValue("prioridadeHidden")) {
                campoObrigatorio(form, "justicativaAltPrioridade", "Justificativa alteração de prioridade");
            }

            if (form.getValue("correcaoSolicitacao") != 'true') {
                var tipoCotacao = form.getValue("tipoCotacaoHidden");
                campoObrigatorio(form, "infoAdicionais", "Informações Adicionais");

                if (tipoCotacao == "tabela") {
                    // Monta Array com os fornecedores da tabela
                    var listaFornecedores = [];
                    var indexForn = form.getChildrenIndexes('tbFornecedor');
                    for (var i = 0; i < indexForn.length; i++) {
                        var codFornecedor = form.getValue("codForn___" + indexForn[i]);
                        listaFornecedores.push(form.getValue("nomeForn___" + indexForn[i]));
                        if (codFornecedor == "008979") { //TABELA SAMTYL PARA GALENICA
                            listaFornecedores.push("GALENICA COMERCIO INTERNACIONAL LTDA");
                        } else if (codFornecedor == "001316") { //TABELA UNI PARA EUROFARMA
                            listaFornecedores.push("EUROFARMA LABORATORIOS S.A.");
                        }
                    }
                    // Pegar referencia do PaiFilho Produtos 
                    var indexProd = form.getChildrenIndexes('tbProd');
                    for (var i = 0; i < indexProd.length; i++) {
                        var indice = indexProd[i];
                        if (form.getValue("valorProd___" + indice) == '') {
                            errorMsg += "Necessário cadastrar o valor do produto <b>" + form.getValue("nomeProd___" + indice) + "</b> na tabela de preços </br>";
                        }
                    }
                }

                if (tipoCotacao == "fechada") {
                    // Pegar referencia do PaiFilho Cotação 
                    var indexCot = form.getChildrenIndexes('tbCotacao');
                    var fornecedor = "";
                    if (indexCot.length > 0) {
                        for (var i = 0; i < indexCot.length; i++) {
                            var indice = indexCot[i];
                            if (form.getValue("valorCotacao___" + indice) == '') {
                                if (fornecedor != form.getValue("fornecedorCotacao___" + indice)) {
                                    fornecedor = form.getValue("fornecedorCotacao___" + indice);
                                    errorMsg += "Não existe cotação do fornecedor <b>" + fornecedor + "</b> para os Produtos: </br>";
                                }
                                var produto = form.getValue("nomeCotacao___" + indice);
                                errorMsg += "- " + produto + "<br>";
                            }
                        }
                    } else {
                        errorMsg += "Não existe <b>fornecedor</b> cadastrado.</br>";
                    }
                }

                // Pegar referencia do PaiFilho Fornecedor 
                var indexForn = form.getChildrenIndexes('tbFornecedor');
                for (var i = 0; i < indexForn.length; i++) {
                    var indice = indexForn[i];
                    campoObrigatorio(form, "nomeForn___" + indice, "Fornecedor na linha " + indice);
                    campoObrigatorio(form, "prazoForn___" + indice, "Prazo na linha " + indice);
                    campoObrigatorio(form, "condForn___" + indice, "Condição de Pagamento na linha " + indice);
                    campoObrigatorio(form, "formaForn___" + indice, "Forma de Pagamento na linha " + indice);
                }
            } else {
                campoObrigatorio(form, "motivoAnaliseComprador", "Motivo para correção");
            }

            if (form.getValue('possuiExclusividadeHidden') == 'true') {
                campoObrigatorio(form, "motivoExclusividadeHidden", "Necessário informar o Motivo Exclusividade");
                if (form.getValue("motivoExclusividadeHidden") == 'outros') {
                    campoObrigatorio(form, "txtMotivoExclusividade", "Necessário informar a Justificativa da Exclusividade");
                }
            }
        } else if (CURRENT_STATE == ALCADA_APROVACAO) {
            var contadorAlcada = form.getValue("contadorAlcada");

            campoObrigatorio(form, "decisaoAlcada" + contadorAlcada, "Aprovar ou reprovar a solicitação");
            if (form.getValue("decisaoAlcada" + contadorAlcada) == "nao") {
                campoObrigatorio(form, "motivoAprovAlcada" + contadorAlcada, "Motivo da reprovação");
            }

        } else if (CURRENT_STATE == APROVACAO_SOLICITANTE) {
            campoObrigatorio(form, "decisaoSolicitante", "Aprovar ou reprovar a solicitação");

            if (form.getValue("decisaoSolicitante") == "nao") {
                campoObrigatorio(form, "motivoAprovSolicitante", "Motivo da reprovação");
            }

        }

        if (errorMsg != '') {
            throw "<br>" + errorMsg;
        }
    }
}