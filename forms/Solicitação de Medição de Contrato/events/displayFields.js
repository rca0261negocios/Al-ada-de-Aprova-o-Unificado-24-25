function displayFields(form, customHTML) {

    var ATIVIDADE = getValue("WKNumState");
    form.setValue("atvAtual", ATIVIDADE);
    customHTML.append("<script type='text/javascript'> var ATIVIDADE=" + getValue("WKNumState") + "</script>");
    customHTML.append("<script> var MODO_EDICAO = '" + form.getFormMode() + "';</script>");
    var usuario = buscaUsuario();
    var data = dataAtual();

    if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR_INCONSISTENCIA) {

        customHTML.append("<script type='text/javascript'> var mudancaCorrecao=" + 111 + "</script>");

        if ((form.getValue("idSolicitante") == "" || form.getValue("solicitante") == "") && form.getFormMode() != "VIEW") {
            form.setValue("idSolicitante", usuario.idUsuario);
            form.setValue("solicitante", usuario.nomeUsuario);
            form.setValue("emailSolicitante", usuario.emailUsuario);
            form.setValue("dataSolicitacao", data);
            form.setValue("nivelAtualAprovacao", "0");
        }

        ocultaCampo(customHTML, "cienciaMulta");
        ocultaCampo(customHTML, "slCepomShow");
        
       
        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        desabilitaCampo(form, "descFornecedor");

        if (form.getValue("descFornecedor1") == "") {
            ocultaCampo(customHTML, "descFornecedor");
        }

        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        if (form.getValue("obsMedicao") == "") {
            ocultaCampo(customHTML, "medicao");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

        ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");



    } else if (ATIVIDADE == VALIDACAO_FISCAL_PRODUTO) {
        desabilitaCampo(form, "justFornecedor");
        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        desabilitaCampo(form, "cadFornecedor");
        ocultaCampo(customHTML, "slCepomShow");

        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        if (form.getValue("obsMedicao") == "") {
            ocultaCampo(customHTML, "medicao");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

        ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");
        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "serieNF");
        desabilitaCampo(form, "dataVencimento");
        desabilitaCampo(form, "zmCentroCustosAprov");
        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML);

        /* ocultaCampo(customHTML, "medicao"); */

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        ocultaCampo(customHTML, "tratativaMedicao");

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        ocultaCampo(customHTML, "validacaoFiscal");

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        ocultaCampo(customHTML, "validacaoTitulo");

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        ocultaCampo(customHTML, "aprovacaoSolicitacao");

        desabilitaCampo(form, "solucaoInconsistencia");
        ocultaCampo(customHTML, "inconsistencia");


        exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
        exibePelaClasse(customHTML, 'pesquisa');



    } else if (ATIVIDADE == CORRIGIR_INCONSISTENCIA) {

        form.setValue("nivelAtualAprovacao", "0");
        form.setValue("proximoAprovador", "");

        form.setValue("idAprovGestor1", "");
        form.setValue("idAprovGestor2", "");
        form.setValue("idAprovGestor3", "");
        form.setValue("idAprovGestor4", "");
        form.setValue("idAprovGestor5", "");

        ocultaCampo(customHTML, "slCepomShow");
        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");
    } else if (ATIVIDADE == AVALIACAO_GESTOR) {

        ocultaCampo(customHTML, "slCepomShow");
        desabilitaCampo(form, "cadFornecedor");
        var nivelAtualAprovacao = form.getValue("nivelAtualAprovacao");

        var split = form.getValue("exampleCheck")
        var checkCiencia = form.getValue("exampleCheckrene")

        if (split == "checked" || checkCiencia == "checked") {
            exibePelaClasse(customHTML, "cienciaMulta");
        } else {
            if (split != "checked" || checkCiencia != "checked") {
                ocultaCampo(customHTML, "cienciaMulta");
            }

        }


        if (nivelAtualAprovacao == "1") {

            if (form.getFormMode() != "VIEW") {
                form.setValue("nomeAprovGestor1", usuario.nomeUsuario);
                form.setValue("dataAprovGestor1", data);
            }

            desabilitaCampo(form, "decisaoGestor2");
            desabilitaCampo(form, "motivoAprovGestor2");
            ocultaCampo(customHTML, "avaliacaoGestor2");

            desabilitaCampo(form, "decisaoGestor3");
            desabilitaCampo(form, "motivoAprovGestor3");
            ocultaCampo(customHTML, "avaliacaoGestor3");

            desabilitaCampo(form, "decisaoGestor4");
            desabilitaCampo(form, "motivoAprovGestor4");
            ocultaCampo(customHTML, "avaliacaoGestor4");

            desabilitaCampo(form, "decisaoGestor5");
            desabilitaCampo(form, "motivoAprovGestor5");
            ocultaCampo(customHTML, "avaliacaoGestor5");

        } else if (nivelAtualAprovacao == "2") {

            if (form.getFormMode() != "VIEW") {
                form.setValue("nomeAprovGestor2", usuario.nomeUsuario);
                form.setValue("dataAprovGestor2", data);
            }

            desabilitaCampo(form, "decisaoGestor1");
            desabilitaCampo(form, "motivoAprovGestor1");
            ocultaCampo(customHTML, "avaliacaoGestor1");

            desabilitaCampo(form, "decisaoGestor3");
            desabilitaCampo(form, "motivoAprovGestor3");
            ocultaCampo(customHTML, "avaliacaoGestor3");

            desabilitaCampo(form, "decisaoGestor4");
            desabilitaCampo(form, "motivoAprovGestor4");
            ocultaCampo(customHTML, "avaliacaoGestor4");

            desabilitaCampo(form, "decisaoGestor5");
            desabilitaCampo(form, "motivoAprovGestor5");
            ocultaCampo(customHTML, "avaliacaoGestor5");

        } else if (nivelAtualAprovacao == "3") {

            if (form.getFormMode() != "VIEW") {
                form.setValue("nomeAprovGestor3", usuario.nomeUsuario);
                form.setValue("dataAprovGestor3", data);
            }

            desabilitaCampo(form, "decisaoGestor1");
            desabilitaCampo(form, "motivoAprovGestor1");
            ocultaCampo(customHTML, "avaliacaoGestor1");

            desabilitaCampo(form, "decisaoGestor2");
            desabilitaCampo(form, "motivoAprovGestor2");
            ocultaCampo(customHTML, "avaliacaoGestor2");

            desabilitaCampo(form, "decisaoGestor4");
            desabilitaCampo(form, "motivoAprovGestor4");
            ocultaCampo(customHTML, "avaliacaoGestor4");

            desabilitaCampo(form, "decisaoGestor5");
            desabilitaCampo(form, "motivoAprovGestor5");
            ocultaCampo(customHTML, "avaliacaoGestor5");

        } else if (nivelAtualAprovacao == "4") {

            if (form.getFormMode() != "VIEW") {
                form.setValue("nomeAprovGestor4", usuario.nomeUsuario);
                form.setValue("dataAprovGestor4", data);
            }

            desabilitaCampo(form, "decisaoGestor1");
            desabilitaCampo(form, "motivoAprovGestor1");
            ocultaCampo(customHTML, "avaliacaoGestor1");

            desabilitaCampo(form, "decisaoGestor2");
            desabilitaCampo(form, "motivoAprovGestor2");
            ocultaCampo(customHTML, "avaliacaoGestor2");

            desabilitaCampo(form, "decisaoGestor3");
            desabilitaCampo(form, "motivoAprovGestor3");
            ocultaCampo(customHTML, "avaliacaoGestor3");

            desabilitaCampo(form, "decisaoGestor5");
            desabilitaCampo(form, "motivoAprovGestor5");
            ocultaCampo(customHTML, "avaliacaoGestor5");

        } else if (nivelAtualAprovacao == "5") {

            if (form.getFormMode() != "VIEW") {

                form.setValue("nomeAprovGestor5", usuario.nomeUsuario);
                form.setValue("dataAprovGestor5", data);
            }

            desabilitaCampo(form, "decisaoGestor1");
            desabilitaCampo(form, "motivoAprovGestor1");
            ocultaCampo(customHTML, "avaliacaoGestor1");

            desabilitaCampo(form, "decisaoGestor2");
            desabilitaCampo(form, "motivoAprovGestor2");
            ocultaCampo(customHTML, "avaliacaoGestor2");

            desabilitaCampo(form, "decisaoGestor3");
            desabilitaCampo(form, "motivoAprovGestor3");
            ocultaCampo(customHTML, "avaliacaoGestor3");

            desabilitaCampo(form, "decisaoGestor4");
            desabilitaCampo(form, "motivoAprovGestor4");
            ocultaCampo(customHTML, "avaliacaoGestor4");

        } else {

            desabilitaCampo(form, "decisaoGestor1");
            desabilitaCampo(form, "motivoAprovGestor1");
            ocultaCampo(customHTML, "avaliacaoGestor1");

            desabilitaCampo(form, "decisaoGestor2");
            desabilitaCampo(form, "motivoAprovGestor2");
            ocultaCampo(customHTML, "avaliacaoGestor2");

            desabilitaCampo(form, "decisaoGestor3");
            desabilitaCampo(form, "motivoAprovGestor3");
            ocultaCampo(customHTML, "avaliacaoGestor3");

            desabilitaCampo(form, "decisaoGestor4");
            desabilitaCampo(form, "motivoAprovGestor4");
            ocultaCampo(customHTML, "avaliacaoGestor4");

            desabilitaCampo(form, "decisaoGestor5");
            desabilitaCampo(form, "motivoAprovGestor5");
            ocultaCampo(customHTML, "avaliacaoGestor5");

        }

        

        desabilitaBotao(customHTML, "zoomFilial");
	    desabilitaBotao(customHTML, "zoomFornecedor");
	    desabilitaBotao(customHTML, "zoomContrato");
	    desabilitaBotao(customHTML, "Competencia");

        desabilitaCampo(form, "justCentral");
        desabilitaCampo(form, "dataVencNegociado");
        desabilitaCampo(form, "dataVencNegociadoDeposito");
        desabilitaCampo(form, "dataVencimentoSemTrava");
        execJquery("$('#_dataVencimentoSemTrava').prop('disabled',true)", customHTML)
        desabilitaCampo(form, "prioridadepagamento");
        desabilitaCampo(form, "valorliquido");
        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "tipoMedicao")
        desabilitaCampo(form, "serieNF")
        desabilitaCampo(form, "dataVencimento")
        desabilitaCampo(form, "zmCentroCustosAprov")
        ocultaCampo(customHTML, "descFornecedor")

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        /* ocultaCampo(customHTML, "medicao"); */

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        ocultaCampo(customHTML, "tratativaMedicao");

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        ocultaCampo(customHTML, "validacaoFiscal");

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        ocultaCampo(customHTML, "validacaoTitulo");

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        ocultaCampo(customHTML, "aprovacaoSolicitacao");

        desabilitaCampo(form, "solucaoInconsistencia");
        ocultaCampo(customHTML, "inconsistencia");

        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");
        ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
    } else if (ATIVIDADE == TRATATIVA_MEDICAO) {

        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeAprovTratativaMedicao", usuario.nomeUsuario);
            form.setValue("dataAprovTratativaMedicao", data);
        }

        ocultaCampo(customHTML, "descFornecedor")
        desabilitaCampo(form, "cadFornecedor");

        desabilitaBotao(customHTML, "zoomFilial");
		desabilitaBotao(customHTML, "zoomFornecedor");
		desabilitaBotao(customHTML, "zoomContrato");
		desabilitaBotao(customHTML, "Competencia");
		desabilitaBotao(customHTML, "CentroCustosAprov");
		


        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");
        ocultaCampo(customHTML, "avaliacaoGestor2");
        ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");


        customHTML.append("<script>$('#cpSimplesNacionalShow').show();</script>");
        customHTML.append("<script>$('#cpAliqISSShow').show();</script>");
        customHTML.append("<script>$('#cpINSSShow').show();</script>");
        customHTML.append("<script>$('#cpBaseCalculoShow').show();</script>");
        customHTML.append("<script>$('#cpCondicaoPagamentoShow').show();</script>");
        customHTML.append("<script>$('#cpDesBhShow').show();</script>");
        customHTML.append("<script>$('#cpSerieDesBhShow').show();</script>");
        customHTML.append("<script>$('#zoomEspecieNfShow').show();</script>");
        customHTML.append("<script>$('#cpCodigoBarrasShow').show();</script>");
        customHTML.append("<script>$('#informacoesFiscais').show();</script>");




        customHTML.append("<script>");
        customHTML.append("validarCpom();");
        customHTML.append("</script>");

    } else if (ATIVIDADE == VALIDACAO_FISCAL) {

        ocultaCampo(customHTML, "slCepomShow");

        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeAprovFiscal", usuario.nomeUsuario);
            form.setValue("dataAprovFiscal", data);
        }

        pegaDataVencimento(form, customHTML)

		ocultaCampo(customHTML, "cienciaMulta");
		desabilitaBotao(customHTML, "zoomFilial");
		desabilitaBotao(customHTML, "zoomFornecedor");
		desabilitaBotao(customHTML, "zoomContrato");
		desabilitaBotao(customHTML, "Competencia");
		desabilitaBotao(customHTML, "zoomCentroCusto");

        ocultaCampo(customHTML, "descFornecedor")
        pegaDataVencimento(form, customHTML)
        desabilitaCampo(form, "cadFornecedor");

        pegaDataVencimento(form, customHTML);
        
        		ocultaCampo(customHTML, "cienciaMulta");
        		desabilitaBotao(customHTML, "zoomFilial");
        		desabilitaBotao(customHTML, "zoomFornecedor");
        		desabilitaBotao(customHTML, "zoomContrato");
        		desabilitaBotao(customHTML, "Competencia");
        		desabilitaBotao(customHTML, "zoomCentroCusto");


        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "zmCentroCustosAprov")

        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

        if (form.getValue("passouAtvInsatifacao") == "nao") {
            ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
        }
        desabilitaCampo(form, "passouAtvInsatifacao");
        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");

    } else if (ATIVIDADE == PROGRAMACAO_TITULO) {

        ocultaCampo(customHTML, "slCepomShow");

        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeAprovTitulo", usuario.nomeUsuario);
            form.setValue("dataAprovTitulo", data);
        }

        ocultaCampo(customHTML, "descFornecedor")
        pegaDataVencimento(form, customHTML);
        desabilitaCampo(form, "cadFornecedor");

        pegaDataVencimento(form, customHTML);
        	ocultaCampo(customHTML, "cienciaMulta");
        	desabilitaBotao(customHTML, "zoomFilial");
        	desabilitaBotao(customHTML, "zoomFornecedor");
        	desabilitaBotao(customHTML, "zoomContrato");
        	desabilitaBotao(customHTML, "Competencia");
        	desabilitaBotao(customHTML, "zoomCentroCusto");

        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "zmCentroCustosAprov")

        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

        /*  if (form.getValue("passouAtvInsatifacao") == "nao") {
             ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
         }
         desabilitaCampo(form, "passouAtvInsatifacao"); */
        desabilitaCampo(form, "dataAprovSolicitacaoF");
        desabilitaCampo(form, "decisaoAprovSolicitacaoF");
        desabilitaCampo(form, "motivoAprovSolicitacaoF");
        desabilitaCampo(form, "solucaoTomada");

    } else if (ATIVIDADE == CORRECAO_SOLICITANTE) {

        ocultaCampo(customHTML, "slCepomShow");

        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeAprovSolicitacao", usuario.nomeUsuario);
            form.setValue("dataAprovSolicitacao", data);
        }

        ocultaCampo(customHTML, "descFornecedor")
        pegaDataVencimento(form, customHTML);
        desabilitaCampo(form, "cadFornecedor");
        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "serieNF");
        desabilitaCampo(form, "zmCentroCustosAprov")
        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        if (form.getValue("solucaoInconsistencia") == "") {
            ocultaCampo(customHTML, "inconsistencia");
        }

         if (form.getValue("passouAtvInsatifacao") == "nao") {
             ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
             desabilitaCampo(form, "solucaoTomada");
         } else {
             desabilitaCampo(form, "nomeAprovSolicitacao");
             desabilitaCampo(form, "dataAprovSolicitacao");
             desabilitaCampo(form, "aprovDataPrevistaSolici");
             desabilitaCampo(form, "decisaoAprovSol");
         }

         if (form.getValue("passouAtvInsatifacao") == "sim") {

             if (form.getFormMode() != "VIEW") {
                 form.setValue("nomeAprovSolicitacaoF", usuario.nomeUsuario);
                 form.setValue("dataAprovSolicitacaoF", data);
             }
             desabilitaCampo(form, "solucaoTomada");
            
             desabilitaCampo(form, "avaliacaoFornecedor");
             desabilitaCampo(form, "avaliacaoFornecedor2");
             desabilitaCampo(form, "avaliacaoFornecedor3");
             desabilitaCampo(form, "avaliacaoFornecedor4");
             desabilitaCampo(form, "avaliacaoFornecedor5");
             desabilitaCampo(form, "avaliacaoFornecedor6");
             desabilitaCampo(form, "ocorrenciaEPI");
             desabilitaCampo(form, "diaEnomeAusente");
             desabilitaCampo(form, "acidenteTrabalho");
             desabilitaCampo(form, "servicoRealizadoNoPrazo");
             desabilitaCampo(form, "docCobrancaEmitConfContrato");
             desabilitaCampo(form, "motivoAprovSolicitacao");
             exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
             exibePelaClasse(customHTML, 'aprovacaoSolucaoFornecedor');
         }


        /* desabilitaCampo(form, "decisaoAprovSolicitacao"); */// ** tirado para teste Wagner

        desabilitaCampo(form, "solucaoTomada");




        exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
        exibePelaClasse(customHTML, 'pesquisa');

        //(customHTML, "decisaoAprovSolicitacao");

        if (form.getValue("solucaoTomada") == "") {
            ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
        } else {
            exibePelaClasse(customHTML, 'aprovacaoSolucaoFornecedor');
        }

    } else if (ATIVIDADE == SOLUCAO_INCONSISTENCIA) {

        ocultaCampo(customHTML, "slCepomShow");

        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeInconsistencia", usuario.nomeUsuario);
            form.setValue("dataInconsistencia", data);
        }

        ocultaCampo(customHTML, "cienciaMulta");
       	desabilitaBotao(customHTML, "zoomFilial");
       	desabilitaBotao(customHTML, "zoomFornecedor");
       	desabilitaBotao(customHTML, "zoomContrato");
       	desabilitaBotao(customHTML, "Competencia");
       	desabilitaBotao(customHTML, "zoomCentroCusto");

        ocultaCampo(customHTML, "descFornecedor")
        desabilitaCampo(form, "cadFornecedor");
        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "serieNF");

        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "decisaoAprovSolicitacao");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        if (form.getValue("decisaoAprovSolicitacao") == "Sim" || form.getValue("motivoAprovSolicitacao") == "") {
            ocultaCampo(customHTML, "aprovacaoSolicitacao");
        }

        desabilitaCampo(form, "solucaoTomada");
        exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
        exibePelaClasse(customHTML, 'pesquisa');

        //(customHTML, "decisaoAprovSolicitacao");

        if (form.getValue("solucaoTomada") == "") {
            ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor");
        } else {
            exibePelaClasse(customHTML, 'aprovacaoSolucaoFornecedor');
        }
        ocultaCampo(customHTML, "motivoAprovSolicitacaoF");




    } else if (ATIVIDADE == INCONSISTENCIA_COMPRAS || ATIVIDADE == APROV_SOLICITANTE || ATIVIDADE == SOLUCAO_INCONSISTENCIA) {

        ocultaCampo(customHTML, "slCepomShow");
        if (form.getFormMode() != "VIEW") {
            form.setValue("nomeAprovSolicitacao", usuario.nomeUsuario);
            form.setValue("dataAprovSolicitacao", data);
        }

    /* desabilitaCampo(form, "justNegociacao"); */
	ocultaCampo(customHTML, "cienciaMulta");
	desabilitaBotao(customHTML, "zoomFilial");
	desabilitaBotao(customHTML, "zoomFornecedor");
	desabilitaBotao(customHTML, "zoomContrato");
	desabilitaBotao(customHTML, "Competencia");
	desabilitaBotao(customHTML, "zoomCentroCusto");


        ocultaCampo(customHTML, "descFornecedor")
        pegaDataVencimento(form, customHTML);
        desabilitaCampo(form, "cadFornecedor");

        desabilitaBotao(customHTML, "dataVencimento");

        desabilitaCampo(form, "notaFiscal");
        desabilitaCampo(form, "emissaoNota");
        desabilitaCampo(form, "tipoMedicao");
        desabilitaCampo(form, "serieNF");

        desabilitaBotao(customHTML, "addProduto");

        desabilitaTabela(form, customHTML, "tbProdutos");
        desabilitaTabelaRateio(form, customHTML)

        desabilitaCampo(form, "decisaoGestor1");
        desabilitaCampo(form, "motivoAprovGestor1");
        if (form.getValue("decisaoGestor1") == "Sim" || form.getValue("motivoAprovGestor1") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor1");
        }

        desabilitaCampo(form, "decisaoGestor2");
        desabilitaCampo(form, "motivoAprovGestor2");
        if (form.getValue("decisaoGestor2") == "Sim" || form.getValue("motivoAprovGestor2") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor2");
        }

        desabilitaCampo(form, "decisaoGestor3");
        desabilitaCampo(form, "motivoAprovGestor3");
        if (form.getValue("decisaoGestor3") == "Sim" || form.getValue("motivoAprovGestor3") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor3");
        }

        desabilitaCampo(form, "decisaoGestor4");
        desabilitaCampo(form, "motivoAprovGestor4");
        if (form.getValue("decisaoGestor4") == "Sim" || form.getValue("motivoAprovGestor4") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor4");
        }

        desabilitaCampo(form, "decisaoGestor5");
        desabilitaCampo(form, "motivoAprovGestor5");
        if (form.getValue("decisaoGestor5") == "Sim" || form.getValue("motivoAprovGestor5") == "") {
            ocultaCampo(customHTML, "avaliacaoGestor5");
        }

        desabilitaCampo(form, "decisaoTratativaMedicao");
        desabilitaCampo(form, "motivoAprovTratativaMedicao");
        if (form.getValue("decisaoTratativaMedicao") == "Sim" || form.getValue("motivoAprovTratativaMedicao") == "") {
            ocultaCampo(customHTML, "tratativaMedicao");
        }

        desabilitaCampo(form, "decisaoFiscal");
        desabilitaCampo(form, "motivoAprovFiscal");
        if (form.getValue("decisaoFiscal") == "Sim" || form.getValue("motivoAprovFiscal") == "") {
            ocultaCampo(customHTML, "validacaoFiscal");
        }

        desabilitaCampo(form, "decisaoTitulo");
        desabilitaCampo(form, "motivoAprovTitulo");
        if (form.getValue("decisaoTitulo") == "Sim" || form.getValue("motivoAprovTitulo") == "") {
            ocultaCampo(customHTML, "validacaoTitulo");
        }

        desabilitaCampo(form, "solucaoInconsistencia");
        // if (form.getValue("solucaoInconsistencia") == "") {
        //     ocultaCampo(customHTML, "inconsistencia");
        // }

        exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
        exibePelaClasse(customHTML, 'pesquisa');
        desabilitaCampo(form, "ocorrenciaEPI");
        desabilitaCampo(form, "acidenteTrabalho");
        desabilitaCampo(form, "servicoRealizadoNoPrazo");
        desabilitaCampo(form, "docCobrancaEmitConfContrato");
        desabilitaCampo(form, "motivoAprovSolicitacao");
        ocultaCampo(customHTML, "divBtPesquisaSatisfacao");
        exibePelaClasse(customHTML, "aprovacaoSolucaoFornecedor");
        ocultaCampo(customHTML, "aprovacaoSolucaoFornecedor3");

        if (ATIVIDADE != APROV_SOLICITANTE) {
            desabilitaCampo(form, "decisaoAprovSolicitacao");
        }

    } else if (!(ATIVIDADE == INICIO || ATIVIDADE == INICIO1 || ATIVIDADE == CORRIGIR_INCONSISTENCIA)) {
        desabilitaCampo(form, 'justCentral');
    }

    if (ATIVIDADE == FIM) {
        ocultaCampo(customHTML, "slCepomShow");
        exibePelaClasse(customHTML, 'pesquisaAvaliacaoFornecedor');
        exibePelaClasse(customHTML, 'pesquisa');
    }

    var linhasRateio = form.getChildrenIndexes("tbRateio").length
    form.setValue('indexRateio', linhasRateio)
    var linhasProd = form.getChildrenIndexes("tbProdutos").length
    form.setValue('indexProd', linhasProd)
    customHTML.append("<script>$('#indexRateio').prop('disabled',false);</script>");
	customHTML.append("<script>$('#indexProd').prop('disabled',false);</script>");

};

function desabilitaCampo(form, idCampo) {
    form.setEnabled(idCampo, false);
}

function desabilitaBotao(html, idBotao) {

    if (idBotao == "zoomProduto") {
        html.append("<script>$('.produto').attr('disabled', 'disabled');</script>");
        html.append("<script>$('.produto').attr('onclick', '');</script>");
    } else {
        html.append("<script>$('#" + idBotao + "').attr('disabled', 'disabled');</script>");
        html.append("<script>$('#" + idBotao + "').attr('onclick', '');</script>");
        html.append("<script>$('#" + idBotao + "').attr('id', '" + idBotao + 1 + "');</script>");
    }

}

function ocultaCampo(html, idCampo) {
    html.append("<script>$('#" + idCampo + "').hide();</script>");
}

function exibePelaClasse(html, idCampo) {
    html.append("<script>$('." + idCampo + "').show();</script>");
}

function desabilitaTabela(form, html, idTabela) {

    form.setHideDeleteButton(true);

    var indexes = form.getChildrenIndexes("tbProdutos");

    for (var x = 0; x < indexes.length; x++) {
        var index = indexes[x];

        desabilitaCampo(form, "descProduto___" + index);
        desabilitaCampo(form, "quantProduto___" + index);
        desabilitaCampo(form, "vlrUnitProduto___" + index);

    }

    desabilitaBotao(html, "zoomProduto");

}

function desabilitaTabelaRateio(form, customHTML) {


    var indexes = form.getChildrenIndexes("tbRateio");

    for (var x = 0; x < indexes.length; x++) {
        var index = indexes[x];

        desabilitaCampo(form, "zmCentroCustos___" + index);
        desabilitaCampo(form, "cpValorRateio___" + index);

    }

    desabilitaBotao(customHTML, "btnRemoveRateio");
    desabilitaBotao(customHTML, "btnAddCC");

}

function execJquery(string, customHTML) {
    customHTML.append("<script>" + string + "</script>")
}

function buscaUsuario() {

    var user = {};

    user.idUsuario = getValue("WKUser");

    var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user.idUsuario, user.idUsuario, ConstraintType.MUST);
    var constraints = new Array(c1);
    var ds_colleague = DatasetFactory.getDataset("colleague", null, constraints, null);

    user.nomeUsuario = ds_colleague.getValue(0, "colleagueName");
    user.emailUsuario = ds_colleague.getValue(0, "mail");

    return user;

}

function dataAtual() {
    var data = new Date();
    return pad(data.getUTCDate()) + "/" + pad(data.getUTCMonth() + 1) + "/" + data.getUTCFullYear();
};

function pad(num) {
    var num_formatado = num;
    if (num < 10) {
        num_formatado = "0" + num;
    }
    return num_formatado;
};

function pegaDataVencimento(form, customHTML) {

    var filial = form.getValue("codFilial");
    var pedido = form.getValue("pedidoMedicao").split(" ");
    var codFornecedor = form.getValue("codFornecedor");
    var lojFornecedor = form.getValue("lojFornecedor");
    var num = "";

    if (pedido[0] != "Pedido:") {
        num = "NUMERO";
    } else {
        num = "PEDIDO";
    }

    var c1 = DatasetFactory.createConstraint("FILIAL", filial, filial, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint(num, pedido[1], pedido[1], ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("COD_FORNECEDOR", codFornecedor, codFornecedor, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("LOJA_FORNECEDOR", lojFornecedor, lojFornecedor, ConstraintType.MUST);
    var constraints = new Array(c1, c2, c3, c4);

    var ds_contasPagar = DatasetFactory.getDataset("ds_contasPagar", null, constraints, null);
    form.setValue("aprovDataPrevista", ds_contasPagar.getValue(0, "DT_VENCTO_REAL"));
    form.setValue("dataPrevista", ds_contasPagar.getValue(0, "DT_VENCTO_REAL"));
    form.setValue("aprovDataPrevistaSolici", ds_contasPagar.getValue(0, "DT_VENCTO_REAL"));

    if (ds_contasPagar.getValue(0, "SALDO") == '0') {
        form.setValue("statusPagamento", "Titulo Baixado");
    } else {
        form.setValue("statusPagamento", "Titulo em Aberto");
    }

}