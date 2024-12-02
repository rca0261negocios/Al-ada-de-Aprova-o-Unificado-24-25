function afterTaskSave(colleagueId,nextSequenceId,userList){
    var ATIVIDADE_ATUAL = getValue('WKNumState');
    log.info('xxxxxxComprasMatMed_ATIVIDADE_ATUAL: ' + ATIVIDADE_ATUAL);
	hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
	
	if ((nextSequenceId == 4 || nextSequenceId == '4') && hAPI.getCardValue("aceite") != "S") {
        notificacaoEncerramento(hAPI.getCardValue('emailSolicitante'), hAPI.getCardValue('nomeSolicitante'))

    }


	if(ATIVIDADE_ATUAL == alcadaAprovacao){
		var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcada"))+1;
		hAPI.setCardValue("contadorAlcada", proximaAlcada);
	}
	
	if (ATIVIDADE_ATUAL == analiseComprador){
		//Adiciona os motivos de reprovação nos comentarios da solicitação
		if (hAPI.getCardValue("correcaoSolicitacao") == "true"){
			hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"), 
				0, "Solicitação reprovada pelo Comprador! \n" + hAPI.getCardValue("motivoAnaliseComprador"));
        }
        
        log.info('xxxxxx prioridadeOriginal: ' + hAPI.getCardValue("prioridadeOriginal") );
        log.info('xxxxxx prioridadeHidden: ' + hAPI.getCardValue("prioridadeHidden") );
        if(hAPI.getCardValue("prioridadeOriginal") != hAPI.getCardValue("prioridadeHidden")){
            try {
                var prioridade =  hAPI.getCardValue("prioridadeHidden");
                if(prioridade == 'N'){
                    prioridade = 'NORMAL';
                }else if(prioridade == 'O'){
                    prioridade = 'ONCOPROD';
                }else{
                    prioridade = 'EMERGENCIAL';
                }

                var parametros = new java.util.HashMap();
                parametros.put("NUMSOLICITACAO", hAPI.getCardValue("codSolicitacao"));
                parametros.put("NOMESOLICITANTE", hAPI.getCardValue("nomeSolicitante"));
                parametros.put("PRIORIDADE", prioridade);
                parametros.put("RESP_ALTERACAO", hAPI.getCardValue("responsavelAltPriori"));
                parametros.put("JUSTIFICATIVA", hAPI.getCardValue("justicativaAltPrioridade").trim());  
    
                var assuntoEmail = 'Alteração de prioridade do chamado ';
                assuntoEmail += hAPI.getCardValue("codSolicitacao");
                parametros.put("subject", assuntoEmail);
                var destinatarios = new java.util.ArrayList();
                destinatarios.add(hAPI.getCardValue("emailSolicitante"));


               

                notifier.notify("imwn2dyhbuywfa0f1522083830483", "notifica_alteracao_prioridade", parametros, destinatarios, "text/html");

                log.info('xxxxxx email do chamado '+  hAPI.getCardValue("codSolicitacao") +' enviado');

    
            } catch (e) {
                log.info('Erro ao enviar email de alteração de prioridade do Compras Mat/Med: ' + e);
            }
        }
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