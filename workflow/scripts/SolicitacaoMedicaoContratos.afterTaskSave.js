function afterTaskSave(colleagueId, nextSequenceId, userList) {

    var ATIVIDADE = getValue("WKNumState");

    if (ATIVIDADE == INICIO || ATIVIDADE == INICIO1) {

        var constraintDs_filial1 = DatasetFactory.createConstraint('CODIGO', hAPI.getCardValue('codFilial'), hAPI.getCardValue('codFilial'), ConstraintType.MUST);
        var datasetDs_filial = DatasetFactory.getDataset('ds_filial', null, new Array(constraintDs_filial1), null);

        var constraintDs_fornecedor1 = DatasetFactory.createConstraint('CODIGO', hAPI.getCardValue('codFornecedor'), hAPI.getCardValue('codFornecedor'), ConstraintType.MUST);
        var datasetDs_fornecedor = DatasetFactory.getDataset('ds_fornecedor', null, new Array(constraintDs_fornecedor1), null);

        hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
        hAPI.setCardValue("nomeFilial", datasetDs_filial.getValue(0, "FILTRO"));
        hAPI.setCardValue("nomeFornecedor", datasetDs_fornecedor.getValue(0, "FILTRO"));

    }

    if (ATIVIDADE == INCONSISTENCIA_COMPRAS) {
        hAPI.setCardValue("passouAtvInsatifacao", "sim");
    }

    if ((nextSequenceId == APROV_SOLICITANTE || nextSequenceId == '13') && hAPI.getCardValue("decisaoAprovSol") != "Sim") {
        notificacaoEncerramento(hAPI.getCardValue('emailSolicitante'), hAPI.getCardValue('solicitante'))
    }

    var unidade = hAPI.getCardValue("nomeFilial");

    var dataVencimento = hAPI.getCardValue("dataVencimento");

    var dataVencimentoSemTrava = hAPI.getCardValue("dataVencimentoSemTrava");

    var dataFormatada = '';

    var dataFormatadatrava = '';



    if (unidade == undefined) {

        unidade = ""

    }



     if (dataVencimento != '') {



         hAPI.setCardValue("campoIdentificador", 'N -' + unidade);

         var dataFormatada = dataVencimento.split('/')[2];

         dataFormatada += '/' + dataVencimento.split('/')[1];

         dataFormatada += '/' + dataVencimento.split('/')[0];



         hAPI.setCardValue("campoIdentificador", dataFormatada + ' - N - ' + unidade);



     } else if(dataVencimentoSemTrava != ''){

        var dataFormatadatrava = dataVencimentoSemTrava.replace("-", "/");



        hAPI.setCardValue("campoIdentificador", dataFormatadatrava + ' - N - ' + unidade);



         

     } else{

        hAPI.setCardValue("campoIdentificador", 'N -' + unidade);  



     }
}


function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array()
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST))
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}