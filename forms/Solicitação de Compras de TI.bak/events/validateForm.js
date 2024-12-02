var errorMsg = "";

function validateForm(form) {

    var CURRENT_STATE = getValue('WKNumState');
    if (isTransferOrSave() == false) {

        if (form.getValue("isAlcadaCarta") == "erro") {
            throw form.getValue("isAlcadaMsg");
        }

        if (form.getValue("isAlcadaDiversos") == "erro") {
            throw form.getValue("isAlcadaMsg");
        }

        if (form.getValue("isAlcadaPA") == "erro") {
            throw form.getValue("isAlcadaMsg");
        }

        if (CURRENT_STATE == INICIO || CURRENT_STATE == 0) {
            campoObrigatorio(form, "codFilial", "Filial");
            campoObrigatorio(form, "centroDeCusto", "Centro De Custo");
            campoObrigatorio(form, "emailContatSolicitante", "Email de Contato");
            campoObrigatorio(form, "telContatSolicitante", "Telefone para o Contato");
            campoObrigatorio(form, "prioridade", "Tipo");
            campoObrigatorio(form, "dataNecessidade", "Data Necessidade");

            var tipoCompra = form.getValue("tipoCompra");
            if (tipoCompra == "1") {
                campoObrigatorio(form, "descreveEscopoServ", "Descreva o escopo completo do serviço");
                campoObrigatorio(form, "pqCompraNecessariaServ", "Porque esta compra é necessária");
                campoObrigatorio(form, "ondeRealizadoServ", "Onde será realizado o serviço");
                campoObrigatorio(form, "quandoIniciadoServ", "Quando deverá ser iniciado e concluído o serviço");
                campoObrigatorio(form, "quaisCriteriosForServ", "Quais os critérios mínimos o fornecedor precisa atender");
                campoObrigatorio(form, "exigenciasServPrestado", "Há exigências especificas de como o serviço deve ser prestado");
                campoObrigatorio(form, "expectativaPrecoServ", "Informar o valor aprovado em orçamento.");
                campoObrigatorio(form, "visitaServ", "Informe nome, telefone, email e horários disponiveis pararecebimento da visita técnica");
                campoObrigatorio(form, "uniContratoAtivo", "A unidade já possui algum contrato ativo para esse serviço");


            }

            if (tipoCompra == "2") {
                campoObrigatorio(form, "caracMaterial", "Observações");
                campoObrigatorio(form, "pqCompraNecessariaDiversos", "Porque esta compra é necessária");
                campoObrigatorio(form, "ondeMaterialEntregue", "Onde o material será entregue");
                campoObrigatorio(form, "quandoMeterialEntregue", "Quando deverá ser entregue o material");
                campoObrigatorio(form, "quemRecebeDiversos", "Quem vai receber o material");
                campoObrigatorio(form, "CriteriosFornecedorDiversos", "Quais os critérios mínimos o fornecedor precisa atender");
                campoObrigatorio(form, "exigenciasMaterial", "Há exigências especificas de como o material deve ser entregue");
                campoObrigatorio(form, "expectativaPrecoDiversos", "Informar o valor aprovado em orçamento.");

            }

            if (tipoCompra == "3") {
                campoObrigatorio(form, "descrevaTi", "Descreva o escopo completo do serviço ou descrição detalhada do materiaial");
                campoObrigatorio(form, "pqCompraNecessariaTi", "Porque esta compra é necessária");
                campoObrigatorio(form, "ondeEntregaTi", "Onde será realizado o serviço ou entregue o material");
                campoObrigatorio(form, "quandoMeterialEntregueTi", "Quando deverá ser iniciado e concluído o serviço ou quando deverá ser entregue o material");
                campoObrigatorio(form, "CriteriosFornecedorTi", "Quais os critérios mínimos o fornecedor precisa atender");
                campoObrigatorio(form, "exigenciasServicoTI", "Há exigências especificas de como o serviço deve ser prestado ou o material entregue");
                campoObrigatorio(form, "expectativaPrecoTi", "Informar o valor aprovado em orçamento.");
                campoObrigatorio(form, "quemRecebeTi", "Quem vai receber o material");

            }

            if (form.getValue("tipoCompra") == '5') {
                campoObrigatorio(form, "target", "Target");
                campoObrigatorio(form, "tipoProjeto", "Tipo Projeto");
                campoObrigatorio(form, "descEscopoServ", "Descreva o escopo completo do serviço ou descrição detalhada do material");
                campoObrigatorio(form, "pqCompraNecessaria", "Porque esta compra é necessária");
                campoObrigatorio(form, "ondeReliazadoServ", "Onde será realizado o serviço ou entregue o material");
                campoObrigatorio(form, "quandoInicioConclusao", "Quando deverá ser iniciado e concluído o serviço ou quando deverá ser entregue o material");
                campoObrigatorio(form, "CriteriosFornecedor", "Quais os critérios mínimos o fornecedor precisa atender");
                campoObrigatorio(form, "exigenciasEspecificas", "Há exigências especificas de como o serviço deve ser prestado ou o material entregue");
                campoObrigatorio(form, "expectativaPreco", "Informar o valor aprovado em orçamento.");
                campoObrigatorio(form, "visitaTecnicaObras", "Informe nome, telefone, email e horários disponiveis para recebimento de visita tecnica");
            }

            if (form.getValue("hideContratoGuardChuva") == 'true') {
                if (form.getValue("totalPercFilial") != 100) {
                    throw "O valor do percentual total das filiais tem que ser igual a 100%.";
                }
                // Validar valores da tabela Filiais (PaiFilho)
                var indexFiliais = form.getChildrenIndexes('tbFiliais');
                if (indexFiliais.length <= 1) {
                    throw "É obrigatório adicionar uma ou mais <b>Filiais</b> na solicitação.";
                } else {
                    var filiais = [];
                    for (var i = 0; i < indexFiliais.length; i++) {
                        var indice = indexFiliais[i];
                        var filial = form.getValue("codFilialGuardChu___" + indice);
                        filiais.push.filial;

                        if (filial == "") {
                            throw "O campo <b>Filial</b> não pode estar vazio!";
                        }
                        if (indexFiliais.length > 1 && form.getValue("valorUnitario___" + indice) == "") {
                            throw "O campo <b>% Filial</b> da filial " + form.getValue("filialGuardChu___" + indice) + " não pode estar vazio!";
                        }

                        for (var f = 0; f < filiais.length; f++) {
                            if (filial == filiais[f]) {
                                throw "A Filial <b>" + filial + "</b> esta duplicada. Favor remover uma delas!";
                            }
                        }
                    }
                }

            }

            // Validar valores da tabela Produtos (PaiFilho) 
            var indexProd = form.getChildrenIndexes('tbProd');
            if (indexProd.length < 1) {
                errorMsg += "É obrigatório adicionar um ou mais produtos na solicitação.";
            } else {
                for (var i = 0; i < indexProd.length; i++) {
                    var indice = indexProd[i];
                    campoObrigatorio(form, "codProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "nomeProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "qtdProd___" + indice, "Quantidade na linha " + indice);
                }
            }

            if (form.getValue("codServOuProd") == 'SV') {
                campoObrigatorio(form, "sLocalPrestServico", "Local Prestação de Servico");
            }

            if (form.getValue("hideFornecedorExclu") == 'true') {
                campoObrigatorio(form, "fornecedorExclusProtheus", "Fornecedor Exclusivo");
                campoObrigatorio(form, "valorCompraExclu", "Valor Total da Compra Exclusiva");
                var qtdeCaracteresCampoDescri = form.getValue("descDetalhada");
                if (qtdeCaracteresCampoDescri.length() < 30) {
                    throw "Favor descrever no minimo 30 caracteres no campo de <b>Descrição</b>."
                }
                if (form.getValue("excluTecknowhow") == '' && form.getValue("excluTecTempoDesenv") == '' && form.getValue("excluTecSolucaoTecnica") == '' && form.getValue("excluTecOutros") == '') {
                    throw "Favor selecionar uma ou mais opções para a Exclusividade Técnica.</br>";
                }
                if (form.getValue("excluTecOutros") != '' && form.getValue("descriExcluTecOutros") == '') {
                    throw "Ao selecionar a opção <b>Outros</b>, é necessário descrever a Exclusividade Técnica."
                }
                var qtdeExcluTecOutros = form.getValue("descriExcluTecOutros");
                if (form.getValue("descriExcluTecOutros") != '' && qtdeExcluTecOutros.length() < 30) {
                    throw "Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>."
                }
            }

            // EVENTO FORMULÁRIO
            var validado = form.getValue("excluTecOutros") == "on" ? true : false;

        } else if (CURRENT_STATE == CORRECAO_SOLICITANTE) {
            if (form.getValue("hideFornecedorExclu") == 'true') {
                campoObrigatorio(form, "fornecedorExclusProtheus", "Fornecedor Exclusivo");
                campoObrigatorio(form, "valorCompraExclu", "Valor Total da Compra Exclusiva");
                var qtdeCaracteresCampoDescri = form.getValue("descDetalhada");
                if (qtdeCaracteresCampoDescri.length() < 30) {
                    throw "Favor descrever no minimo 30 caracteres no campo de <b>Descrição</b>."
                }
                if (form.getValue("excluTecknowhow") == '' && form.getValue("excluTecTempoDesenv") == '' && form.getValue("excluTecSolucaoTecnica") == '' && form.getValue("excluTecOutros") == '') {
                    throw "Favor selecionar uma ou mais opções para a Exclusividade Técnica.</br>";
                }
                if (form.getValue("excluTecOutros") != '' && form.getValue("descriExcluTecOutros") == '') {
                    throw "Ao selecionar a opção <b>Outros</b>, é necessário descrever a Exclusividade Técnica."
                }
                var qtdeExcluTecOutros = form.getValue("descriExcluTecOutros");
                if (form.getValue("descriExcluTecOutros") != '' && qtdeExcluTecOutros.length() < 30) {
                    throw "Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>."
                }
            }
            // Validar valores da tabela Produtos (PaiFilho) 
            var indexProd = form.getChildrenIndexes('tbProd');
            if (indexProd.length < 1) {
                errorMsg += "É obrigatório adicionar um ou mais produtos na solicitação.";
            } else {
                for (var i = 0; i < indexProd.length; i++) {
                    var indice = indexProd[i];
                    campoObrigatorio(form, "codProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "nomeProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "qtdProd___" + indice, "Quantidade na linha " + indice);
                }
            }

            // Validar valores da tabela Produtos (PaiFilho) 
            var indexProd = form.getChildrenIndexes('tbProd');
            if (indexProd.length < 1) {
                errorMsg += "É obrigatório adicionar um ou mais produtos na solicitação.";
            } else {
                for (var i = 0; i < indexProd.length; i++) {
                    var indice = indexProd[i];
                    campoObrigatorio(form, "codProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "nomeProd___" + indice, "Produto na linha " + indice);
                    campoObrigatorio(form, "qtdProd___" + indice, "Quantidade na linha " + indice);
                }
            }

        } else if (CURRENT_STATE == ANALISE_COMPRADOR_COTACAO) {
            if (form.getValue("correcaoSolicitacao") != 'true') {

            	var indexForn = form.getChildrenIndexes('tbFornecedor');
            	
                if (form.getValue("hidePA") == "true" && form.getValue("dataVencimentoPA") == "") {
                    throw "Necessário informar a <b>Data de Vencimento PA</b>.</br>";
                }
                if (form.getValue("hidePA") == "true" && form.getValue("valorPA") == "") {
                    throw "Necessário informar o <b>Valor do PA</b>.</br>";
                }
                if (form.getValue("tipoCotacaoHidden") == "") {
                    throw "Necessário informar o <b>Tipo de Cotação</b>.</br>";
                }
                if (form.getValue("hideNegociacao") == 'true' && form.getValue("valorIniciProd") == '') {
                    throw "Se houve negociação, favor informar o <b>Valor Inicial do Produto</b>.</br>";
                }
                if (form.getValue("hideFornecedorExcluClassica") == 'true') {
                    if (form.getValue("excluClasOutros") != '' && form.getValue("descriExcluClasOutros") == '') {
                        throw "Ao selecionar a opção <b>Outros</b>, é necessário descrever a <b>Exclusividade Clássica</b>."
                    }
                    var qtdeExcluTecOutros = form.getValue("descriExcluClasOutros");
                    if (form.getValue("descriExcluClasOutros") != '' && qtdeExcluTecOutros.length() < 30) {
                        throw "Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>."
                    }
                    
                    if (indexForn.length > 1) {                    	
                    	 throw "Favor selecionar apenas um fornecedor quando for exclusivo."                    	                    	
                    }   
                }
                
                if (form.getValue('hideFornecedorExclu') == 'true') {                	
                	if (indexForn.length > 1) {                    	
                   	 throw "Favor selecionar apenas um fornecedor quando for exclusivo."                    	                    	
                   }                    
                }
                
                
                if (form.getValue("alteraValorCartaExecao") == 'true' && form.getValue("justificaCotacaoMaiorCartaEx") == '') {
                    throw "Favor descrever a justificativa pelo valor da Cotação ser maior que a Carta de Exceção."
                }
                if (form.getValue("infoAdicionaisComp") == "") {
                    campoObrigatorio(form, "infoAdicionaisComp", "Informações Adicionais");
                }

                // Pegar referencia do PaiFilho Fornecedor 
               
                var analiseFiscal = form.getValue("analiseFiscalH");
                if ((analiseFiscal == false) || (analiseFiscal == 'false')) {
                    if (indexForn.length > 0) {
                        for (var i = 0; i < indexForn.length; i++) {
                            var indice = indexForn[i];

                            if (form.getValue("fornCadastrado___" + indice) == '1') {
                                campoObrigatorio(form, "fornecedorProtheus___" + indice, "Fornecedor na linha " + indice);
                            } else {
                                campoObrigatorio(form, "fornecedorProtheusSemCadastro___" + indice, "Fornecedor na linha " + indice);
                                campoObrigatorio(form, "tipoFornSemCadastHidden___" + indice, "Tipo fornecedor (Jurídico, Fisico ou Outros) na linha " + indice);
                            }

                            campoObrigatorio(form, "emailFornecedor___" + indice, "Email fornecedor na linha " + indice);
                            campoObrigatorio(form, "prazoForn___" + indice, "Prazo na linha " + indice);
                            campoObrigatorio(form, "condForn___" + indice, "Condição de Pagamento na linha " + indice);
                            campoObrigatorio(form, "codCondForn___" + indice, "Condição de Pagamento na linha " + indice);
                            campoObrigatorio(form, "formaFornHidden___" + indice, "Forma de Pagamento na linha " + indice);

                            if (form.getValue("fornCadastrado___" + indice) == '1') {
                                campoObrigatorio(form, "fornecedorProtheus___" + indice, "Fornecedor na linha " + indice);
                            }
                            var item = form.getValue("itemForn___" + indice);
                            if (form.getValue("fornCadastrado___" + indice) == '1' &&
                                form.getValue("formaFornHidden___" + indice) == '2' &&
                                (form.getValue("bancoForn___" + indice) == '' ||
                                    form.getValue("agenciaForn___" + indice) == '' ||
                                    form.getValue("contaForn___" + indice) == '')) {
                                throw "Ao se tratar de <b>Depósito Bancário</b> no item " + item + ", é obrigatorio que o fornecedor tenha os dados bancários cadastrados no <b>PROTHEUS</b> (Banco, Agência, Conta e o Digíto da Conta). Favor realizar o cadastro no Protheus para prosseguir.";
                            }
                            if (form.getValue("valorFreForn___" + indice) != '' && form.getValue("tipoFreteForn___" + indice) == '') {
                                campoObrigatorio(form, "tipoFreteForn___" + indice, "Tipo do Frete na linha " + indice + ", devido a existir valor de frete ele");
                            }
                        }
                    } else {
                        throw "Não existe <b>Fornecedor</b> cadastrado.</br>";
                    }
                } else {
                    if (form.getValue("fornecedorVincular") == "") {
                        throw "Necessário informar o fornecedor que deseja vincular</b>.</br>";
                    }
                }

                if (form.getValue("tipoCotacaoHidden") == "tabela") {
                    // Pegar referencia do PaiFilho Produtos 
                    var indexProd = form.getChildrenIndexes('tbProd');
                    for (var i = 0; i < indexProd.length; i++) {
                        var indice = indexProd[i];
                        if (form.getValue("valorProd___" + indice) == '') {
                            throw "Necessário cadastrar o valor do produto <b>" + form.getValue("nomeProd___" + indice) + "</b> na tabela de preços </br>";
                        }
                    }
                }

                if (form.getValue("tipoCotacaoHidden") == "fechada") {
                    // Pegar referencia do PaiFilho Cotação 
                    var indexCot = form.getChildrenIndexes('tbCotacao');
                    var fornecedor = "";
                    var valorTotalProd = removeMascaraMonetaria(form.getValue("valorTotalSolicitacao"));
                    log.info("valorTotalProd: "+valorTotalProd);
                    if (indexCot.length > 0) {
                        var achouCotacao = false;
                        for (var i = 0; i < indexCot.length; i++) {
                            var indice = indexCot[i];
                            log.info("Abner valorCotacao___" + indice + " = " + form.getValue("valorCotacao___" + indice));
                            if (form.getValue("valorCotacao___" + indice) != '') {
                                achouCotacao = true;
                            }
                        }
                        if (!achouCotacao) {
                            throw "Não foram encontrados cotações aos Produtos selecionados.";
                        }
                    }
                    
                    if (form.getValue('hideFornecedorExclu') == 'false' && form.getValue('hideFornecedorExcluClassica') == 'false' ) {
                              if ((valorTotalProd > 5000 && valorTotalProd <= 10000 && indexForn.length < 2)) {
                                  throw "O valor total das Cotações está entre R$5.001 à R$10.000. É necessário ter no mínimo 2 fornecedores. </br>";
                              }
                              
                              if ((valorTotalProd > 10000 && indexForn.length < 3 ))  {
                                  throw "O valor total das Cotações é maior que R$10.000. É necessário ter no mínimo 3 fornecedores. </br>";
                              }
                    }
                    // foi tratado no beforesendvalidate
                  //  if (form.getValue('hideFornecedorExclu') == 'false') {
                  //      if ((valorTotalProd > 1000 && valorTotalProd <= 10000 && indexForn.length < 2)) {
                  //          throw "O valor total das Cotações está entre R$1.001 à R$10.000. É necessário ter no mínimo 2 fornecedores. </br>";
                 //       }
                        
                 //       if ((valorTotalProd > 10000 && indexForn.length < 3 ))  {
                   //         throw "O valor total das Cotações é maior que R$10.000. É necessário ter no mínimo 3 fornecedores. </br>";
                 //       }
                        
                        /*if (form.getValue("justificativaAnaliseComprador") == "") {
                            throw "É necessário justificar o motivo de não ter o mínimo de fornecedores exigidos de acordo com as regras. </br>";
                        }*/
                 //   }
                	
                }

                if (form.getValue("hideContratoGuardChuva") == "true" || form.getValue("hideContrato") == "true") {
                    if (form.getValue("hideReajusteContrato") == "true" && form.getValue("indice") == null) {
                        campoObrigatorio(form, "indice", "Indice");
                    }
                    campoObrigatorio(form, "rescisaoContrato", "Rescisão de Contrato");
                    campoObrigatorio(form, "objetoContrato", "Objeto de Contrato");
                    campoObrigatorio(form, "unidadeVigencia", "Unidade de Vigência");
                    if (form.getValue("hiddenUnidadeVigencia") != 4) {
                        campoObrigatorio(form, "vigenciaDoContrato", "Vigência Do Contrato");
                    }
                    campoObrigatorio(form, "codTipoContrato", "Tipo Contrato");

                    if(form.getValue("codTipoContrato") == "017"){
                        campoObrigatorio(form, "selectTipoPessoa", "Tipo de Pessoa");
                    }

                    campoObrigatorio(form, "contatoComercial", "Contato Comercial");
                    campoObrigatorio(form, "emailComercial", "E-mail Comercial");
                    campoObrigatorio(form, "telefoneComercial", "Telefone Comercial");

                    campoObrigatorio(form, "composicaoPrecos", "Composição de Preços");
                    campoObrigatorio(form, "qtdParcelas", "Quantidade Parcelas");
                    campoObrigatorio(form, "gestorContrato", "Gestor Contratante");

                    if (form.getValue("hiddenAnexo4") == "sim") {
                        campoObrigatorio(form, "numPropComercial", "Proposta da Contratada");
                    }

                }
                var indexProd = form.getChildrenIndexes('tbProd');
                log.info("Abner indexProd:" + indexProd.length);
                if (indexProd.length < 1) {
                    errorMsg += "É obrigatório possuir um ou mais produtos na solicitação.";
                }
            } else {
                campoObrigatorio(form, "motivoAnaliseComprador", "Motivo para correção");
            }

        } else if (CURRENT_STATE == ALCADA_APROVACAO) {
            var contadorAlcada = form.getValue("contadorAlcada");
            var nivel = parseInt(form.getValue("nivel")) + 1;

            if (form.getValue("decisaoAlcada" + contadorAlcada) == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAlcada" + contadorAlcada) == "nao") {
                if (CURRENT_STATE == ALCADA_APROVACAO && form.getValue("sMotivoReprovAlcada" + contadorAlcada) == null) {
                    errorMsg += "Selecione uma das opções para o <b>Motivo</b> da reprovação.</br>";
                }
                if (form.getValue("motivoAprovAlcada" + contadorAlcada) == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == ALCADA_APROVACAO_CARTA) {
            var contadorAlcada = form.getValue("contadorAlcadaCarta");
            var nivel = parseInt(form.getValue("nivel")) + 1;

            if (form.getValue("decisaoAlcadaCarta" + contadorAlcada) == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAlcadaCarta" + contadorAlcada) == "nao") {
                if (form.getValue("motivoAprovAlcadaCarta" + contadorAlcada) == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == ALCADA_APROVACAO_PA) {
            var contadorAlcada = form.getValue("contadorAlcadaPA");
            var nivel = parseInt(form.getValue("nivel")) + 1;

            if (form.getValue("decisaoAlcadaPA" + contadorAlcada) == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAlcadaPA" + contadorAlcada) == "nao") {
                if (form.getValue("motivoAprovAlcadaPA" + contadorAlcada) == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == ENVIO_EMAIL_FORNECEDOR) {

            var indexPedido = form.getChildrenIndexes('tbPedidosGerados');
            if (indexPedido.length > 0) {
                for (var i = 0; i < indexPedido.length; i++) {
                    var indice = indexPedido[i];
                    if (form.getValue("emailFornVencedorProd___" + indice) == '') {
                        throw "O campo de <b>Email</b> do fornecedor " + form.getValue("nomefornecedorPedido___" + indice) + " é obrigatório.";
                    }
                }
            }
            if (form.getValue("emailEnviado") != 'true' && form.getValue("codFilial") != '06601') {
                throw "É necessário encaminhar o <b>Email para Cotação</b>. Favor clicar no botão <b>Enviar E-mail</b> e aguardar o retorno de 'Sucesso'.";
            }
        } else if (CURRENT_STATE == APROVACAO_SOLICITANTE) {
            campoObrigatorio(form, "decisaoSolicitante", "Aprovar ou reprovar a solicitação");
            if (form.getValue("decisaoSolicitante") == "nao") {
                campoObrigatorio(form, "motivoAprovSolicitante", "Motivo da reprovação");
            }
        } else if (CURRENT_STATE == REAVALIAR_PA) {
            campoObrigatorio(form, "justificaPA", "Obrigatório a justificativa do Pagamento antecipado");
        } else if (CURRENT_STATE == ANALISE_TI) {
            if (form.getValue("decisaoAprovAnaliseTI") == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAprovAnaliseTI") == "nao") {
                if (form.getValue("motivoAprovAnaliseTI") == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == GOVERNANCA_SLA) {
            if (form.getValue("defineSLAHidden") == "") {
                errorMsg += "Seleciona uma das opções de <b>Definir Complexidade</b>";
            } 
        } else if (CURRENT_STATE == ANALISE_RH) {
            if (form.getValue("decisaoAprovAnaliseRH") == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAprovAnaliseRH") == "nao") {
                if (form.getValue("motivoAprovAnaliseRH") == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == ANALISE_OBRAS) {
            if (form.getValue("decisaoAprovAnaliseObras") == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAprovAnaliseObras") == "nao") {
                if (form.getValue("motivoAprovAnaliseObras") == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        } else if (CURRENT_STATE == APROVACAO_TECNICA) {
            if (form.getValue("decisaoAprovaprovTecnica") == "") {
                errorMsg += "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoAprovaprovTecnica") == "nao") {
                if (form.getValue("motivoAprovaprovTecnica") == "") {
                    errorMsg += "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        }
        if (errorMsg != '') {
            throw "<br>" + errorMsg;
        }

    } else if (CURRENT_STATE == ANALISE_COMPRADOR_COTACAO) {
        form.setValue("setRespCompras", "Pool:Group:CD");
    }
    
    
    
    //inicio validade contratos
    
    
    
    
    

    if (isTransferOrSave() == false) {

        var CURRENT_STATE = getValue("WKNumState");

        if (CURRENT_STATE == INICIO_CONTRATO || CURRENT_STATE == 0) {
            if (form.getValue("numSolicitacao") == "") {
                var indexFiliais = form.getChildrenIndexes('tbFiliais');

                if (indexFiliais.length < 1 && form.getValue('isContratoGuardChuva') == 'on') {
                    throw "É obrigatório adicionar uma ou mais <b>Filiais</b> na solicitação.";
                } else {
                    var filiais = [];
                    for (var i = 0; i < indexFiliais.length; i++) {
                        var indice = indexFiliais[i];
                        var filial = form.getValue("codFilial___" + indice);
                        filiais.push.filial;

                        if (filial == "") {
                            throw "O campo <b>Filial</b> não pode estar vazio!";
                        }
                        if (indexFiliais.length > 1 && form.getValue("valorUnitario___" + indice) == "") {
                            throw "O campo <b>Valor Unitário</b> da filial " + form.getValue("filialGuardChu___" + indice) + " não pode estar vazio!";
                        }

                        for (var f = 0; f < filiais.length; f++) {
                            if (filial == filiais[f]) {
                                throw "A Filial <b>" + filial + "</b> esta duplicada. Favor remover uma delas!";
                            }
                        }
                    }
                }

                //$("#hideContratoGuardChuva").val("true")


                if (form.getValue("CTT_CUSTO") == "") {
                    throw "O campo <b>Centro de Custo</b> não pode estar vazio!";
                }

                if (form.getValue("referenciaEntrega") == "") {
                    throw "O campo <b>Referencia Local de Entrega</b> não pode estar vazio!";
                }

                if (form.getValue("objetoContrato") == "") {
                    throw "O campo <b>Objeto de Contrato</b> não pode estar vazio!";
                }

                if (form.getValue("reajusteContrato") == "") {
                    throw "O campo <b>Reajuste de Contrato</b> não pode estar vazia!";
                }

                if (form.getValue("reajusteContrato") == "1" && form.getValue("indice") == "000") {
                    throw "O campo <b>Indice</b> não pode estar vazio!";
                }

                if (form.getValue("rescisaoContrato") == "") {
                    throw "O campo <b>Rescisão Contrato</b> não pode estar vazio!";
                }

                if (form.getValue("valorTotalServico") == "" || form.getValue("valorTotalServico") == "R$ 0,00") {
                    throw "O campo <b>Valor Total do Serviço</b> não pode estar vazio!";
                }

                if (form.getValue("unidadeVigencia") == "0") {
                    throw "O campo <b>Unidade da Vigência de Contrato</b> não pode estar vazio!";
                }

                if (form.getValue("vigenciaDoContrato") == "") {
                    throw "O campo <b>Vigência de Contrato</b> não pode estar vazio!";
                }

                if (form.getValue("codTipoContrato") == "000") {
                    throw "O campo <b>Tipo de Contrato</b> não pode estar vazio!";
                }

                if (form.getValue("contatoComercial") == "") {
                    throw "O campo <b>Nome do contato Comercial</b> não pode estar vazio!";
                }

                if (form.getValue("emailComercial") == "") {
                    throw "O campo <b>Email Do Comercial</b> não pode estar vazio!";
                }

                if (form.getValue('validaEmail') == "") {
                    throw "O email está inválido. Favor verificar se contém os caracteres <b> '@' </b> e <b> '.com' </b> !";
                }

                if (form.getValue("telefoneComercial") == "") {
                    throw "O campo <b>Telefone Comercial</b> não pode estar vazio!";
                }

                if (form.getValue("codFornecedorProtheus___1") == "") {
                    throw "Na aba de fornecedores, o campo <b>Código do Fornecedor</b> não pode estar vazio!";
                }

                if (form.getValue("codCondPagamento___1") == "") {
                    throw "O campo <b>Condição de Pagamento</b> não pode estar vazio!";
                }

                if (form.getValue("formaPagamento___1") == "" || form.getValue("formaPagamento___1") == null) {
                    throw "O campo <b>Forma de Pagamento</b> não pode estar vazio!";
                }

                if (form.getValue("frete___1") == "" || form.getValue("frete___1") == null) {
                    throw "O campo <b>Frete</b> não pode estar vazio!";
                }

                if (form.getValue("prazoEntrega___1") == "") {
                    throw "O campo <b>Prazo Entrega</b> não pode estar vazio!";
                }

            }
        }

        if (CURRENT_STATE == CORRECAO_SOLICITACAO_COMPRAS) {

            if (form.getValue("correcaoSolicitacao") == "") {
                throw "Favor selecionar uma opção de <b>correção</b>!";
            }

            if (form.getValue("valorTotalServico") != form.getValue("alteraValor") && form.getValue("correcaoSolicitacaoContrato") != "valor") {
                throw "Houve alteração no <b>'Valor Total de Serviços'</b>. Favor selecionar a opção de correção para Valor!";
            }

            if (form.getValue("valorTotalServico") == form.getValue("alteraValor") && form.getValue("correcaoSolicitacaoContrato") == "valor") {
                throw "Não houve alteração no campo de <b>'Valor Total de Serviços'</b>. Favor verificar a opção correta ou altere o Valor inicial do serviço!";
            }
        }


        if (CURRENT_STATE == ANALISE_CONTRATO) {

            if (form.getValue("aprovaAnaliseContrato") == "") {
                throw "Selecione uma das opções de <b>Aprovação</b>!";
            }
            if (form.getValue("aprovaAnaliseContrato") == "nao" && form.getValue("observacaoAnliseContrato") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da reprovação!";
            }
            if (form.getValue("dtAssinaContrato") == "") {
                throw "Favor informar a <b>Data Assinatura Contrato</b>!";
            }
        }


        if (CURRENT_STATE == VALIDACAO_DOCUMENTO) {

            if (form.getValue("aprovaValidaDocumento") == "") {
                throw "Selecione uma das opções de <b>Aprovação</b>!";
            }
            if (form.getValue("aprovaValidaDocumento") == "nao" && form.getValue("observacaoValidaDocumento") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da reprovação!";
            }
        }

        if (CURRENT_STATE == CORRECAO_DOCUMENTO_COMPRAS) {

            if (form.getValue("observacaoUsuarioCompras") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da correção!";
            }
        }

        if (CURRENT_STATE == CORRECAO_DOCUMENTO_CONTRATOS) {

            if (form.getValue("realizaAtividade") == "") {
                throw "Selecione uma das opções de quem realizará a atividade!";
            }
            if (form.getValue("observacaoCorrecaoDocumento") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da correção!";
            }
        }

        if (CURRENT_STATE == CORRECAO_DOCUMENTO_SOLICITANTE) {

            if (form.getValue("observacaoCorrecaoSolicitante") == "") {
            	
               // throw "Favor informar no campo de <b>Observação</b> o motivo da correção!";
            	
            }
        }


        if (CURRENT_STATE == VALIDACAO_ASSINATURA_FORNECEDOR) {

            if (form.getValue("aprovaValidaAssinatura") == "") {
                throw "Selecione uma das opções de <b>Aprovação</b>!";
            }
            if (form.getValue("aprovaValidaAssinatura") == "nao" && form.getValue("observacaoValidaAssinatura") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da reprovação!";
            }
        }

        if (CURRENT_STATE == REVISAO_CLAUSULAS) {

            if (form.getValue("observacaoRevisaoClausulas") == "") {
                throw "O campo de <b>Observação</b> não pode estar vazio!";
            }
        }

        /*if (CURRENT_STATE == CHANCELAMENTO_CONTRATO) {

            if (form.getValue("observacaoChancelamento") == "") {
                throw "O campo de <b>Observação</b> não pode estar vazio!";
            }
        }*/

        if (CURRENT_STATE == ASSINATURA_INTERNA || CURRENT_STATE == ASSINATURA_INTERNA_E_FORN) {
            if (form.getValue("validaJuridico") != "sim") {
                if (form.getValue("codAreaResponsavel") == "") {
                    throw "O campo <b>Área Responsável</b> do Contrato não pode estar vazio!";
                }
                if (form.getValue("dataIniContrato") == "") {
                    throw "O campo <b>Data de Inicio do Contrato</b> não pode estar vazio!";
                }
                if (form.getValue("dataAssinaContrato") == "") {
                    throw "O campo <b>Data de Assinatura do Contrato</b> não pode estar vazio!!";
                }
                if (form.getValue("avisoPrevio") == "") {
                    throw "O campo de <b>Aviso Previo</b> não pode estar vazio!";
                }
                if (form.getValue("contratoFisico") == "") {
                    throw "Selecione uma das opções do campo <b>Contrato Físico</b>!";
                }
                if (form.getValue("multa") == "") {
                    throw "Selecione uma das opções do campo <b>Multa</b>!";
                }
                if (form.getValue("renovacao") == "") {
                    throw "Selecione uma das opções do campo <b>Renovação</b>!";
                }
                if (form.getValue("servicoCritico") == "") {
                    throw "Selecione uma das opções do campo <b>Serviço Crítico</b>!";
                }
                /*if (form.getValue("observacaoAssinaturaInterna") == "") {
                    throw "O campo de <b>Observação</b> não pode estar vazio!";
                }*/


            }
            if (form.getValue("validaJuridico") == "sim") {
                if (form.getValue("motivoCorrecaoJuridico") == "") {
                    throw "O campo <b>Motivo Correção Juridico</b> do Contrato não pode estar vazio!";
                }
            }
        }

        if (CURRENT_STATE == APROVA_SOLICITANTE) {

            if (form.getValue("aprovaSolicitante") == "") {
                throw "Selecione uma das opções de <b>Aprovação</b>!";
            }
            if (form.getValue("aprovaSolicitante") == "nao" && form.getValue("observacaoSolicitante") == "") {
                throw "Favor informar no campo de <b>Observação</b> o motivo da reprovação!";
            }
        }

        if (CURRENT_STATE == SOLUCAO_INCONSISTENCIA) {

            if (form.getValue("observacaoSolucaoInconsist") == "") {
                throw "O campo de <b>Observação</b> não pode estar vazio!";
            }
        }

        if (CURRENT_STATE == ALCADA_APROVACAO) {
            var contadorAlcada = form.getValue("nivelAtualAprovacao");
            if (form.getValue("decisaoGestor" + contadorAlcada) == "") {
                throw "Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar";
            } else if (form.getValue("decisaoGestor" + contadorAlcada) == "nao") {
                if (form.getValue("motivoAprovGestor" + contadorAlcada) == "") {
                    throw "Descreva o <b>Motivo</b> da reprovação.</br>";
                }
            }
        }
    }
    
    
    // fim validate de contratos
    
    
    
    
    
}

function isTransferOrSave() {
    var WKNumState = getValue("WKNumState");
    var WKNextState = getValue("WKNextState");
    var WKCompletTask = getValue("WKCompletTask");

    if (WKCompletTask == "false" || WKNumState == WKNextState) {
        return true;
    } else {
        return false;
    }
}


function removeMascaraMonetaria(mask) {
    if (mask != undefined) {
        mask = mask.replace('R$', '');
        mask = mask.replace(' ', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');

        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}