function beforeTaskSave(colleagueId, nextSequenceId, userList) {
    GETSLA()
    Global();

    if (ATIVIDADE_ATUAL == analiseComprador) {

        if (hAPI.getCardValue("tipoCotacaoHidden") == "fechada" && hAPI.getCardValue("possuiExclusividadeHidden") == "false") {
            var anexos = hAPI.listAttachments();
            var qtdAnexos = anexos.size();
            if (qtdAnexos == 0) {
                throw "É necessário anexar as cotações realizadas para continuar o processo";
            }
        }
    }

}