function beforeStateEntry(sequenceId) {

	var CURRENT_STATE = getValue('WKNumState');

	if (CURRENT_STATE == AtividadeEnum.EMITIR_PEDIDO_COMPRA &&
		sequenceId == AtividadeEnum.ANEXAR_NF) {
		enviarEmailListaCompra("fornecedores");
	}

	if (sequenceId == AtividadeEnum.VALIDACAO_ENTREGA) {
		enviarEmailListaCompra("Solicitante");
	}
}

function enviarEmailListaCompra(notificar) {

	var ds_config = DatasetFactory.getDataset('ds_configRemessaDelife', new Array('ckEnviaEmail'), null, null);

	if (ds_config && ds_config.rowsCount > 0 && ds_config.getValue(0, 'ckEnviaEmail') == 'on') {
		try {
			//Monta mapa com parâmetros do template
			var parametros = new java.util.HashMap();

			//Monta lista de destinatários
			var destinatarios = new java.util.ArrayList();
			if (notificar == "fornecedores") {
				//Este parâmetro é obrigatório e representa o assunto do e-mail
				parametros.put("subject", "Remessa de Compras Delife - Solicitação #" + getValue('WKNumProces'));

				var listaEmail = hAPI.getCardValue("emails").split(";");
				for (var i = 0; i < listaEmail.length; i++) {
					if (listaEmail[i]) {
						log.info("## Remessa:" + listaEmail[i]);
						destinatarios.add(listaEmail[i]);
					}
				}
			} else {
				//Este parâmetro é obrigatório e representa o assunto do e-mail
				parametros.put("subject", "Remessa de Compras Delife - Notificação de envio#" + getValue('WKNumProces'));
				// monta consulta para pegar o id do usuario solicitante
				var constraint = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', getValue('WKNumProces'), getValue('WKNumProces'), ConstraintType.MUST);
				var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', null, new Array(constraint), null);
				// monta consulta para pegar o email do usuario solicitante
				var constraintColleague1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', datasetWorkflowProcess.getValue(0, 'requesterId'), datasetWorkflowProcess.getValue(0, 'requesterId'), ConstraintType.MUST);
				var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague1), null);

				destinatarios.add(datasetColleague.getValue(0, 'mail'));
				log.info("Lucas Geordane Says: " + datasetColleague.getValue(0, 'mail'))
			}


			var listaPedidos = consultaPaiFilho(["dataInclusaoPedido",
				"matriculaPaciente",
				"nomePaciente",
				"dataNascPaciente",
				"cpfPaciente",
				"telPaciente",
				"emailPaciente",
				"enderPaciente",
				"cidadeUFPaciente",
				"cepPaciente",
				"codProd",
				"desProd",
				"qtdProd",
				"qtdEntregProd",
				"crmMedico",
				"prevEntrega"]);

			parametros.put("LISTA_PEDIDOS", preencheListaPedidos(listaPedidos));

			//Envia e-mail notifier.notify("4s2f7mmb7dfs64qv1452799368975", "notifRemessaCompraDelife", parametros, destinatarios, "text/html");
			notifier.notify("1umcvsru1dngvu8n1539114285072", "notifRemessaCompraDelife", parametros, destinatarios, "text/html");

		} catch (e) {
			log.error(e);
		}
	} else {
		log.error("### Não foi encontrado configuração para solicitação Remessas de Compras Delife ###");
	}


}

function preencheListaPedidos(listaPedidos) {
	var linhas = "";
	for (var item in listaPedidos) {
		linhas += "<tr>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].dataInclusaoPedido + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].matriculaPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].nomePaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].dataNascPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].cpfPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].telPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].emailPaciente + "</p></td>";
		linhas += "<td style='width: 300px;'><p>" + listaPedidos[item].enderPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].cidadeUFPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].cepPaciente + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].codProd + " - " + listaPedidos[item].desProd + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].qtdProd + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].qtdEntregProd + "</p></td>";
		linhas += "<td style='width: 200px;'><p>" + listaPedidos[item].crmMedico + "</p></td>";
		linhas += "<td style='width: 100px;'><p>" + listaPedidos[item].prevEntrega + "</p></td>";
		linhas += "</tr>";
	}
	return linhas;
}


