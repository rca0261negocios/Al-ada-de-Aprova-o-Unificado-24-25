function aprovaAnaliseContrato() {

    if (hAPI.getCardValue('aprovaAnaliseContrato') == 'sim') {

        if (hAPI.getCardValue('minutaPadrao') == 'true') {

            if (hAPI.getCardValue('tipoContratoCompras') == 'Aditivo') {

                return 3; //Validação do documento

            } else {
                return 2; //Integração protheus
            }

        } else {
            return 3; //Validação do documento
        }
    } else {
        return 1; //Correção da Solicitação
    }

}

function aprovaAssinatInternEFornecedor() {

    if (hAPI.getCardValue('validaJuridico') == 'sim') {
        return 2; //Correção da Solicitação 
    } else {

        if (hAPI.getCardValue('tipoContratoCompras') != "Aditivo" && hAPI.getCardValue('codTipoContrato') != "016") {
            return 1; //integração protheus   
        } else {
            return 3; //aprovaão do solicitante
        }
    }

}

function contratoAGerar() {

    if ((hAPI.getCardValue('hideContratoGuardChuva') == "true")) {
        var indiceCriacaoContrato = parseInt(hAPI.getCardValue('indiceCriacaoContrato'))
        var totalFiliasGuard = parseInt(hAPI.getCardValue('totalFiliasGuard'))

        if (indiceCriacaoContrato <= totalFiliasGuard) {
            return 1; //integração
        } else {
            return 2; // aprovação do solicitante
        }
    } else {
        log.info(getValue('WKNumProces') + ' NAO É GUARDA CHUVA');
        return 2;
    }

}