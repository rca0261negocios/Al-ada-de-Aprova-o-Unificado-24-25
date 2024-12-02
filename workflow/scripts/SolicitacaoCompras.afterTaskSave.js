var ativPosInicial = 137;
function afterTaskSave(colleagueId, nextSequenceId, userList) {

	if ((nextSequenceId == 62 || nextSequenceId == '62') && hAPI.getCardValue("aceite") != "S") {

		hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
        try {
            //Monta mapa com parâmetros do template
            var parametros = new java.util.HashMap();
            parametros.put("NUMSOLICITACAO", hAPI.getCardValue("codSolicitacao"));
            parametros.put("NOMESOLICITANTE", hAPI.getCardValue("txtNmRequisitante"));

            var assuntoEmail = 'ENCERRAMENTO AUTOMÁTICO SOLICITAÇÃO ';
            assuntoEmail += hAPI.getCardValue("codSolicitacao");

            //Este parâmetro é obrigatório e representa o assunto do e-mail
            parametros.put("subject", assuntoEmail);
            //Monta lista de destinatários
            var destinatarios = new java.util.ArrayList();
            //destinatarios.add("ae74d6181db511eabd7a726acb7f424e");
            //destinatarios.add(hAPI.getCardValue("codAprovador"));
            destinatarios.add(hAPI.getCardValue("emailSolicitante"));
              //Envia e-mail
            notifier.notify("imwn2dyhbuywfa0f1522083830483", "notifica_finalizacao_automatica", parametros, destinatarios, "text/html");

        } catch (e) {
            log.info(e);
        }
    }

	var currentId = getValue("WKNumState");

	if (nextSequenceId == ativPosInicial) {
		preencherIdentificador();
	}
	if(currentId == ''){
		var dsPedido = DatasetFactory.getDataset('ds_gerarPedidoCompra',  new Array(xmlPedido),null, null);
		var codRetorno = dsPedido.getValue(0, "codigoPedido");
		var statusRetorno = dsPedido.getValue(0, "statusRetorno");
		if(codRetorno == 'ERRO'){
			throw "Erro na integração. \n"+statusRetorno;
		}else{
			hAPI.setCardValue("numPedido", codRetorno);
		}
	}

	if (currentId == '14' || currentId == 14 ) {
	
		if (hAPI.getCardValue("hiddenPrioridadeGeralOrig") != hAPI.getCardValue("hiddenPrioridadeGeral")) {
			try {

				var prioridade = hAPI.getCardValue("hiddenPrioridadeGeral");
				if (prioridade == 'N') {
					prioridade = 'NORMAL';
				} else if (prioridade == 'O') {
					prioridade = 'ONCOPROD';
				} else {
					prioridade = 'EMERGENCIAL';
				}

				var parametros = new java.util.HashMap();
				parametros.put("NUMSOLICITACAO", hAPI.getCardValue("txtSolicitacao"));
				parametros.put("NOMESOLICITANTE", hAPI.getCardValue("txtNmRequisitante"));
				parametros.put("PRIORIDADE", prioridade);
				parametros.put("RESP_ALTERACAO", hAPI.getCardValue("respAlteracaoPriori"));
				parametros.put("JUSTIFICATIVA", hAPI.getCardValue("motivoAlteracaoPrioridade").trim());
				var assuntoEmail = 'Alteração de prioridade do chamado ';
				assuntoEmail += hAPI.getCardValue("txtSolicitacao");
				parametros.put("subject", assuntoEmail);
				var destinatarios = new java.util.ArrayList();
				destinatarios.add(hAPI.getCardValue("emailSolicitante"));
				notifier.notify("imwn2dyhbuywfa0f1522083830483", "notifica_alteracao_prioridade", parametros, destinatarios, "text/html");
			} catch (e) {
				log.info('Erro ao enviar email de alteração de prioridade do Compras: ' + e);
			}
		}
	}
}

function preencherIdentificador() {
	var prioridade = hAPI.getCardValue("prioridadeGeral");

	var unidade = hAPI.getCardValue("hiddenFilial");
	var dataInicial = hAPI.getCardValue("dtEmissao");
	var outrosParam = [];

	// outrosParam.push(hAPI.getCardValue("hiddenTipoProdSolicitacao"));
	outrosParam.push(hAPI.getCardValue("hiddenTipoProduto"));

	var identificador = new objIdentificador(prioridade, unidade, dataInicial,
			outrosParam);

}
