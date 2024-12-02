function fornecedorAprovado() {



}

function aprovadoPeloSolicitante() {

    var aprovado = hAPI.getCardValue("decisaoAprovSol");

    if (aprovado == "Sim") {
        return 1;     
    } else {
        return 2; //Solucao da Inconsistencia
    }
}



function exclusivo37() {
    var nivel = hAPI.getCardValue("nivelAtualAprovacao")
    var nivelAtualAprovacao = hAPI.getCardValue("nivelAtualAprovacao");
    var nivelMaximoAprovacao = hAPI.getCardValue("nivelMaximoAprovacao");

    if (hAPI.getCardValue("decisaoGestor" + nivel) == "Nao") {
        return 0
    } else if (hAPI.getCardValue("proximoAprovador") == "") {
        return 2
    } else if (nivelAtualAprovacao < nivelMaximoAprovacao) {
        return 1
    } else {
        return 2
    }

}

function analise() {

    var aprovAnaliseServ = hAPI.getCardValue("exampleForn");

    if (aprovAnaliseServ == "checked") {
        return 1;
    } else {
        if (aprovAnaliseServ == "notchecked" || aprovAnaliseServ == "") {

            return 2;
        }

    }
}