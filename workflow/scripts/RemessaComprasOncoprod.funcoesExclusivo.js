var CURRENT_STATE = getValue('WKNumState');

function exclusivo16() {

    var aprovacaoOncoprod = hAPI.getCardValue("aprovacaoOncoprod");
    var aprovacaoClinica = hAPI.getCardValue("aprovacaoClinica");
    var passarNaAlcada = hAPI.getCardValue("passarNaAlcada");

    if (aprovacaoOncoprod == "nao" || aprovacaoClinica == "nao") {
        return 1;//11
    }

    if (aprovacaoOncoprod == "sim" && aprovacaoClinica == "sim") {

        if (passarNaAlcada == "SIM") {
            return 2;//19
        } else {
            return 3;//30
        }
    }
}

