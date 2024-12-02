// funçoes utilizadas para decisoes dos exclusivos
function exclusivo24() {
    var destino = hAPI.getCardValue('slDestino');
    return destino
}

function exclusivo31() {
    var decisao = hAPI.getCardValue('cpDecisaoSolicitante');
    if (decisao == 'sim') {
        return 1;
    } else {
        return 0;
    }
}

function exclusivo65() {

    if (hAPI.getCardValue('cpTipoSolicitacao') == 'gds' ||
        hAPI.getCardValue('cpAlcada') == 'false') {

        if (hAPI.getCardValue('flagVencimento') == 'multa') {
            return 3
        }
        return 0

    } else if (hAPI.getCardValue('cpTipoLancamento') == 'AUTONOMIA') {

        return 1

    } else if (hAPI.getCardValue('cpTipoLancamento') == 'REGULARIZADORA') {

        return 2

    }


}

function exclusivo70() {
    if (hAPI.getCardValue('cpDecisaRegularizadora') == 'sim') {
        return 0
    }
    return 1
}

function exclusivo80() {
    if (hAPI.getCardValue('cpDecisaoGestor') == 'sim') {
        var TotalAprocacao = parseInt(hAPI.getCardValue('quantAprovadores'));
        var nivel = parseInt(hAPI.getCardValue('cpNivelAprovacao'));

        if ((nivel + 1) < TotalAprocacao) {
            return 0
        } else {
            if (hAPI.getCardValue('cpTipoLancamento') == 'REGULARIZADORA' &&
                hAPI.getCardValue('cpNotaAtrasada') == 'true') {

                hAPI.setCardValue('dtPagamento', dataVencimento())

            }

            hAPI.setCardValue('cpNivelAprovacao', TotalAprocacao)
            hAPI.setCardValue('cpAlcada', 'false');
            return 1

        }

    } else {
        return 2
    }
}

function exclusivo90() {
    var decisao = hAPI.getCardValue('slDestino').split(' ')[0];
    if (decisao == '1') {
        return 1
    } else if (decisao == '2') {
        return 2
    } else if (decisao == '3') {
        return 3
    }
}

function exclusivo135() {
    var motivo = hAPI.getCardValue('slMotivoRejeicao');

    if (hAPI.getCardValue('cpDecisaoFiscal') == 'sim') {

        return 0

    } else {

        if ((motivo == '5' || motivo == '7' || motivo == '4') &&
            hAPI.getCardValue('cpTipoSolicitacao') == 'gds') {
            hAPI.setCardValue('recarregarTable', true);
            return 1

        }
        hAPI.setCardValue('recarregarTable', false);
        return 2

    }



}

function dataVencimento() {
    var cst = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var dataset = DatasetFactory.getDataset("ds_configuracaoGDE", null, [cst], null);
    var prazo = parseInt(dataset.getValue(0, 'cpPrazoAtrasada'));
    var dtPagamento = new Date();
    while (prazo > 0) {
        if (dtPagamento.getDay() != 6 && dtPagamento.getDay() != 0) {
            dtPagamento.setDate(dtPagamento.getDate() + 1)
            prazo--;
            if (prazo == 0 && dtPagamento.getDay() == 6) {
                dtPagamento.setDate(dtPagamento.getDate() + 2)
            }
            if (prazo == 0 && dtPagamento.getDay() == 0) {
                dtPagamento.setDate(dtPagamento.getDate() + 1)
            }
        } else {
            dtPagamento.setDate(dtPagamento.getDate() + 1)
        }
    }

    var dia, mes, ano;

    if (dtPagamento.getDate() < 10) {
        dia = '0' + dtPagamento.getDate()
    } else {
        dia = dtPagamento.getDate()
    }

    if ((dtPagamento.getMonth() + 1) < 10) {
        mes = '0' + (dtPagamento.getMonth() + 1)
    } else {
        mes = dtPagamento.getMonth() + 1
    }
    ano = dtPagamento.getFullYear()

    return ano + '-' + mes + '-' + dia;
}

function exclusivo160() {
    if (hAPI.getCardValue('cpTipoNota') == '1') {
        return 1
    } else {
        return 2
    }
}