// Funções utilizadas para as alçadas de aprovação

function alterouValordaCarta() {
    var usuario = getValue('WKUser');
    var numSolicitacao = getValue("WKNumProces");
    var mensagem = 'O valor da carta foi alterado. Será reenviado para alçadas de aprovação.';
    if (parseFloat(hAPI.getCardValue('hiddenUltValorAprovCarta')) < parseFloat(removeMascaraMonetaria(hAPI.getCardValue('hiddenValorCompraExclu')))) {
        hAPI.setTaskComments(usuario, numSolicitacao, 0, mensagem);
        return true;
    }
    return false;
}

function validaAlcadaCarta() {
    var contadorAlcada = hAPI.getCardValue('contadorAlcadaCarta');
    var decisao = hAPI.getCardValue('decisaoAlcadaCarta' + contadorAlcada);

    if (decisao == 'nao' && hAPI.getCardValue('hideFornecedorExcluClassica') == 'true') // Analise Comprador/cotação
        return "a";
    else if (decisao == 'nao') // Corrige solicitante
        return "n";
    else if (decisao == 'sim' && hAPI.getCardValue('aprovAlcadaAtualCarta') != '') // Proximo aprovador
        return "s";
    else if (decisao == 'sim' && hAPI.getCardValue('aprovAlcadaAtualCarta') == '' && hAPI.getCardValue('hideFornecedorExcluClassica') == 'true') { // Validar se a alçada é do comprador
        hAPI.setCardValue('isAlcadaCartaComprador', 'false');
        hAPI.setCardValue('cartaAprovada', 'sim');
        return "d";
    } else if (decisao == 'sim' && hAPI.getCardValue('aprovAlcadaAtualCarta') == '' && hAPI.getCardValue('alteraValorCartaExecao') == 'true') { // Validar se a alçada é do comprador
        log.info("## --- validaCarta " + hAPI.getCardValue('alteraValorCartaExecao'));
        hAPI.setCardValue('alteraValorCartaExecao', 'false');
        hAPI.setCardValue('cartaAprovada', 'sim');
        hAPI.setCardValue('alterouValorCarta', 'nao');
        return "d";
    } else if (decisao == 'sim' && hAPI.getCardValue('aprovAlcadaAtualCarta') == '') { // Analise Comprador/cotação
        hAPI.setCardValue('isAlcadaCarta', 'false');
        hAPI.setCardValue('cartaAprovada', 'sim');

        if (hAPI.getCardValue('tipoCompra') == '5') {
            if (hAPI.getCardValue('tomarCienciaObra') == true || hAPI.getCardValue('tomarCienciaObra') == 'true')
                return "obras";
            else
                return "a";
        } else
            return "a";
    }
}

function exclusivo97() {
    var contadorAlcada = hAPI.getCardValue('contadorAlcadaPA');
    var decisao = hAPI.getCardValue('decisaoAlcadaPA' + contadorAlcada);

    log.info("##-- decisao - " + decisao);
    log.info("##-- aprovAlcadaAtualPA - " + hAPI.getCardValue('aprovAlcadaAtualPA'));
    log.info("##-- hideContrato - " + hAPI.getCardValue('hideContrato'));
    log.info("##-- hideContratoGuardChuva - " + hAPI.getCardValue('hideContratoGuardChuva'));

    if (decisao == 'sim') {
        if (hAPI.getCardValue('aprovAlcadaAtualPA') == '') {
            if (hAPI.getCardValue('hideContrato') == "true" || hAPI.getCardValue('hideContratoGuardChuva') == "true") // Validar se a alçada é do comprador
                return 1; // integra PA apos Contratos
            else {
                hAPI.setCardValue('isAlcadaPA', 'false');
                return 2; // Emitir pedido
            }
        } else
            return 3; // proximo aprovador
    } else
        return 0; // recusado
}

function decisivo8() {
    var contadorAlcada = hAPI.getCardValue("contadorAlcada");
    var decisao = hAPI.getCardValue('decisaoAlcada' + contadorAlcada);
    log.info("--- Alcada Atual ---" + hAPI.getCardValue("aprovAlcadaAtual"))
    log.info("--- HideContrados ---" + hAPI.getCardValue("hideContrato"))
    log.info("--- hideGuardachuva ---" + hAPI.getCardValue("hideContratoGuardChuva"))
    log.info("--- HIDEPA ---" + hAPI.getCardValue("hidePA"))
    log.info("--- Motivo ---" + hAPI.getCardValue('sMotivoReprovAlcada' + contadorAlcada))

    if (decisao == "sim") {
        var contador = parseInt('' + hAPI.getCardValue("contadorAlcada"))
        var maxAlcada = parseInt('' + hAPI.getCardValue("maxAlcadaAtual"))

        if (hAPI.getCardValue("aprovAlcadaAtual") == "")
            contador = maxAlcada;

        if (contador < maxAlcada)
            return 3 // Proxima Alcada
        else if (contador >= maxAlcada) {
            if (hAPI.getCardValue("hidePA") == "true") {
                hAPI.setCardValue("isAlcadaDiversos", "false");
                return 1; // PA
            } else if (hAPI.getCardValue("hideContrato") == "true" ||
                hAPI.getCardValue("hideContratoGuardChuva") == "true") {
                hAPI.setCardValue("isAlcadaDiversos", "false");
                return 2; // CONTRATOS
            } else {
                hAPI.setCardValue("isAlcadaDiversos", "false");
                return 4; // Emitir Pedido de compras
            }
        }
    } else {
        var motivo = hAPI.getCardValue('sMotivoReprovAlcada' + contadorAlcada);
        if (motivo == 'valorAcimaAprov')
            return 5; // comprador
        else if (motivo == 'centroCusto')
            return 6; // solicitante
        else if (motivo == 'prodServIncorret')
            return 6; // solicitante
        else if (motivo == 'filialIncorret')
            return 6; // solicitante
        else if (motivo == 'encerrar')
            return 7; // calcela chamado
        else if (motivo == 'outros')
            return 5; // comprador
    }
}

function validaProdutoTI() {
    if (hAPI.getCardValue('decisaoAprovAnaliseTI') == 'sim') {
        if (hAPI.getCardValue('hideFornecedorExclu') == 'true')
            return "alcadaExc";
        else
            return 'analiseComp';
    } else
        return 'reprova';
}

function validaDecisaoInicial() {
    if (hAPI.getCardValue('isProdutoTI') == 'sim' && hAPI.getCardValue('decisaoAprovAnaliseTI') != 'sim')
        return "TI";
    else if (hAPI.getCardValue('hideFornecedorExclu') == 'true')
        return "carta";
    else if (hAPI.getCardValue('hideFornecedorExclu') == 'false' && hAPI.getCardValue('isProdutoTI') == 'nao') {
        if (hAPI.getCardValue('tipoCompra') == '5') {
            if (hAPI.getCardValue('tomarCienciaObra') == 'true')
                return "obras";
            else
                return "compra";
        } else
            return 'compra';
    }
}

function validaExclusivoRH() {
    if (hAPI.getCardValue('isAlcadaCartaComprador') == 'true' && hAPI.getCardValue('decisaoAprovAnaliseRH') == 'sim')
        return 3; // Alçada Carta Exceção
    else {
        if (hAPI.getCardValue('decisaoAprovAnaliseRH') == 'sim')
            return 1; // alcada aprovacao
        else
            return 2; // Correção da Solicitacao
    }
}

function exclusivo296() { // REMOVER SE NAO HOUVER EXCLUISIVO DIRETO
    if (hAPI.getCardValue('correcaoSolicitacao') == 'true')
        return 1 // correção do solicitante
    else
        return 2; // aprovação técnica
}

function exclusivoAnaliseCompradorCotacao() {
    if (hAPI.getCardValue('analiseFiscalH') == 'true')
        return 8 // cadastro de fornecedor
    else {
        if (hAPI.getCardValue('iniciarCadastro') == 'true')
            return 5 // cadastro de fornecedor
        else {
            if (hAPI.getCardValue('tipoCompra') == '5') {
                if (hAPI.getCardValue('correcaoSolicitacao') == 'true')
                    return 1 // correção do solicitante
                else {
                    if (hAPI.getCardValue('decisaoAprovaprovTecnica') == 'nao')
                        return 6 // análise comprador/cotação
                    else if (hAPI.getCardValue('decisaoAprovaprovTecnica') == 'sim')
                        return funcaoDoExxlusivoAntigo()
                    else
                        return 7; // Aprovação técnica
                }
            } else {
                if (hAPI.getCardValue('correcaoSolicitacao') == 'true')
                    return 1 // correção do solicitante
                else
                    return funcaoDoExxlusivoAntigo()
            }
        }
    }
}

function exclusivoTratativaFornecedor() {
    if (hAPI.getCardValue('cadastroExterno') == 'true')
        return 1
    else
        return 2
}

function funcaoDoExxlusivoAntigo() {
    if (hAPI.getCardValue('hiddenAprovadorRH') == 'true' && (hAPI.getCardValue('decisaoAprovAnaliseRH') == 'nao' || hAPI.getCardValue('decisaoAprovAnaliseRH') == '')) {
        if (hAPI.getCardValue('alteraValorCartaExecao') == 'true' && hAPI.getCardValue('hideFornecedorExclu') == 'true') // 2
            return 1 // correção do solicitante
        else
            return 2 // RH
    } else {
        if (hAPI.getCardValue('alteraValorCartaExecao') == 'true' && hAPI.getCardValue('hideFornecedorExclu') == 'true') // 2
            return 1 // correção do solicitante
        else {
            if (hAPI.getCardValue('isAlcadaCartaComprador') == 'true')
                return 3 // Carta excecao
            else
                return 4 // alcada
        }
    }
}

function exclusivo192() {
    if (hAPI.getCardValue('hideContrato') == "true" || hAPI.getCardValue('hideContrato') == "on")
        return 1
    else if (hAPI.getCardValue('hideContratoGuardChuva') == 'true' || hAPI.getCardValue('hideContratoGuardChuva') == 'on')
        return 1
    else
        return 2
}

function decisaoEquipeObras() {
    if (hAPI.getCardValue('decisaoAprovAnaliseObras') == 'sim')
        return 1 // Analise
    else
        return 2 // correção
}
