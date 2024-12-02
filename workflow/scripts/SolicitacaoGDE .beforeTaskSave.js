function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    GETSLA()
    var atividade = getValue('WKNumState')
    if (atividade == 0 || atividade == 5) {
        verificaAnexo()
        setIdentificador()
    } else if (atividade == 16) {
        setIdentificador()
    } else if (atividade == 76) {
        setRegistroAprovadores();
        verificarProximoAprovador();
    }
}
//Verifica a existencia de anexo
function verificaAnexo() {
    qtdAnexos = hAPI.listAttachments().size();
    if (qtdAnexos == 0) {
        throw "É preciso anexar ao menos um documento para continuar o processo";
    }
}
// configuração do campo identificador
function setIdentificador() {
    var filial = hAPI.getCardValue('zoomFilial')
    var data;
    if (hAPI.getCardValue('cpNotaAtrasada') == 'true' || hAPI.getCardValue("cpTipoSolicitacao") == "reg") {
        data = hAPI.getCardValue('dtPagamento');
        data = data.replace('-', '/');
        data = data.replace('-', '/');
    } else {
        var data = hAPI.getCardValue('dtVencimento');
        data = data.replace('-', '/');
        data = data.replace('-', '/');
    }
    hAPI.setCardValue('cpIdentificador', data + ' - ' + filial)
}

function setRegistroAprovadores() {
    var nivel = hAPI.getCardValue('cpNivelAprovacao');
    var aprovador = hAPI.getCardValue('cpAprovGestor')
    var dataAprov = hAPI.getCardValue('dtAprovGestor')
    var decisao = hAPI.getCardValue('cpDecisaoGestor')

    hAPI.setCardValue('aprovador' + nivel, aprovador)
    hAPI.setCardValue('dataAprov' + nivel, dataAprov)
    hAPI.setCardValue('decisaoAprov' + nivel, decisao)

}


function verificarProximoAprovador() {

    if (hAPI.getCardValue('cpDecisaoGestor') == 'sim') {
        var TotalAprocacao = parseInt(hAPI.getCardValue('quantAprovadores'));
        var nivel = parseInt(hAPI.getCardValue('cpNivelAprovacao'));

        if ((nivel + 1) < TotalAprocacao) {
            hAPI.setCardValue('cpNivelAprovacao', (nivel + 1))
        } else {
            hAPI.setCardValue('cpNivelAprovacao', TotalAprocacao)
        }

    }

}