function afterTaskSave(colleagueId, nextSequenceId, userList) {

    var ATIVIDADE_ATUAL = getValue('WKNumState');

    hAPI.setCardValue("codSolicitacao", getValue("WKNumProces"));
    hAPI.setCardValue("hiddenQtdAnexos", hAPI.listAttachments().size());
              
    if (ATIVIDADE_ATUAL == 14) {
        var achou = false;
        var processo = getValue("WKNumProces");
        var campos = hAPI.getCardData(processo);
        var contador = campos.keySet().iterator();

        while (contador.hasNext()) {
            var id = contador.next();
            if (id.match(/codProd___/)) {
                var campo = campos.get(id);
                var seq = id.split("___")[1];
                var produto = campos.get("codProd___" + seq);

                var c1 = DatasetFactory.createConstraint("codProduto",produto, produto, ConstraintType.MUST);
                var filtro = new Array(c1);
                var dataset = DatasetFactory.getDataset("ds_servicos_obras_ti", null, filtro, null);
                log.info("TAMANHO DATASET" + dataset.rowsCount);
                if(dataset.rowsCount > 0){
                    for(var i = 0; i < dataset.rowsCount; i++) {
    
                        achou = true;
                        log.info("ACHOU ANTES" + achou);
    
                    }
                } 
            } 

        }
        log.info("ACHOU DEPOIS" + achou);

        if (achou == true) {
            enviaCorpoEmail();
        }

    }

    if (ATIVIDADE_ATUAL == analiseCompradorCotacao) {
        //Adiciona os motivos de reprovação nos comentarios da solicitação
        if (hAPI.getCardValue("correcaoSolicitacao") == "true") {
            hAPI.setTaskComments(getValue("WKUser"), getValue("WKNumProces"),
                0, "Solicitação reprovada pelo Comprador! \n" + hAPI.getCardValue("motivoAnaliseComprador"));
        }

    }

    if ((nextSequenceId == 11 || nextSequenceId == '11') && hAPI.getCardValue("decisaoSolicitante") != "sim") {
        notificacaoEncerramento(hAPI.getCardValue("emailSolicitante"), hAPI.getCardValue("nomeSolicitante"));
    }

    if (ATIVIDADE_ATUAL == alcadaAprovacaoCarta) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcadaCarta")) + 1;
        hAPI.setCardValue("contadorAlcadaCarta", proximaAlcada);
    }
    if (ATIVIDADE_ATUAL == 7) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcada")) + 1;
        hAPI.setCardValue("contadorAlcada", proximaAlcada);
    }
    if (ATIVIDADE_ATUAL == alcadaAprovacaoPA) {
        var proximaAlcada = parseInt(hAPI.getCardValue("contadorAlcadaPA")) + 1;
        hAPI.setCardValue("contadorAlcadaPA", proximaAlcada);
    }
}

function notificacaoEncerramento(emailSolicitante, solicitante) {
    var filter = new Array();
    filter.push(DatasetFactory.createConstraint('SOLICITACAO', getValue("WKNumProces"), '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('SOLICITANTE', solicitante, '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('EMAIL_SOLICITANTE', emailSolicitante, '', ConstraintType.MUST));
    filter.push(DatasetFactory.createConstraint('PROCESSO', getValue("WKDef"), '', ConstraintType.MUST))
    var ds_envioEmailEncerramento = DatasetFactory.getDataset('ds_envioEmailEncerramento', null, filter, null);
}

function enviaCorpoEmail() {

    var filialEmail = hAPI.getCardValue('codFilial');
    var nomeFilialEmail = hAPI.getCardValue('filial');
    var centroCustoEmail = hAPI.getCardValue('codCentroCusto');
    var nomeCentroDeCusto = hAPI.getCardValue('centroDeCusto');
    var localEntregaEmail = hAPI.getCardValue('localEntrega');
    var inicioServicoEmail = hAPI.getCardValue('quandoIniciadoServ');
    
    var codFilial = null;

    //var recipients = [];
    //recipients.push("sesmtcso@oncoclinicas.com");
    
    var recipientsSesmt = [];
    //
  //Cria a constraint para buscar os formulários ativos
    var c_active = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
    var parameters = new Array();
    parameters.push(c_active);
            
    if (codFilial != null) {
    	var c_codFilial = DatasetFactory.createConstraint("codFilial", filialEmail, filialEmail, ConstraintType.MUST);
    	parameters.push(c_codFilial);
    }        	    	    	    
     
    var datasetPrincipal = DatasetFactory.getDataset("ds_emails_sesmet", null, parameters, null);
    
    log.info("numero de linhas: "+datasetPrincipal.rowsCount);
    												  
	if (datasetPrincipal != null && datasetPrincipal.rowsCount > 0) {
    	for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
            var documentId = datasetPrincipal.getValue(i, "metadata#id");
            var documentVersion = datasetPrincipal.getValue(i, "metadata#version");            
                    
            //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
            var constraintsFilhos = new Array();				  
            var c1 = DatasetFactory.createConstraint("tablename", "tbColaboradores" ,"tbColaboradores", ConstraintType.MUST);
            var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
            var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);
            var c4 = DatasetFactory.createConstraint("filialUser", filialEmail, filialEmail, ConstraintType.MUST);
            constraintsFilhos.push(c1);
            constraintsFilhos.push(c2);
            constraintsFilhos.push(c3);
            constraintsFilhos.push(c4);
                   
            //Busca o dataset
            var datasetFilhos = DatasetFactory.getDataset("ds_emails_sesmet", null, constraintsFilhos, null);
            
            if (datasetFilhos != null && datasetFilhos.rowsCount > 0) { 
	            for (var j = 0; j < datasetFilhos.rowsCount; j++) {
	            	recipientsSesmt.push(datasetFilhos.getValue(j, 'email')+'');
	            }
            }
        }	
	}
	
	if (recipientsSesmt.length == 0) {		
		recipientsSesmt.push("clelio.junior@oncoclinicas.com");		
	}
		
	   
    var html = "";
    html += '<h2>Prezados(as),</h2>'
    html += '<p>Informo que o chamado <strong>' + getValue('WKNumProces') + '</strong> foi aberto por <strong>' + hAPI.getCardValue('nomeSolicitante') + '</strong>. Segue as informações do chamado: </p>';
    html += '<p><strong>Código da Filial: </strong>'  + nomeFilialEmail + '</p>'
    html += '<p><strong>Centro de Custo: </strong>'  + nomeCentroDeCusto + '</p>'
    html += '<p><strong>Referência do Local: </strong>' + localEntregaEmail + '</p>'
    html += '<p><strong>Data de início das atividades: </strong>' + inicioServicoEmail + '</p>'    

    var processo = getValue("WKNumProces");
    var campos = hAPI.getCardData(processo);
    var contador = campos.keySet().iterator();

    while (contador.hasNext()) {
        var id = contador.next();
        if (id.match(/codProd___/)) {
            var campo = campos.get(id);
            var seq = id.split("___")[1];
            var produto = campos.get("codProd___" + seq);

            var c1 = DatasetFactory.createConstraint("codProduto", produto, produto, ConstraintType.MUST);
            var filtro = new Array(c1);
            var dataset = DatasetFactory.getDataset("ds_servicos_obras_ti", null, filtro, null);

            if(dataset.rowsCount > 0){
               for(var i = 0; i < dataset.rowsCount; i++){

                var descricao = campos.get("nomeProd___" + seq);
                var quantidade = campos.get("unidadeProd___" + seq);
                var seguranca = campos.get("qtdProd___" + seq);

                html += "</tr>";
                html += " <td style='text-align:center'><strong>Tipo de serviço a ser realizado:&nbsp;</strong>" + produto + "</td>";
                html += " <td style='text-align:center'>" + descricao + "</td>";
                html += " <td style='text-align:center'>" + quantidade + "</td>";
                html += " <td style='text-align:center'>" + seguranca + "</td>";
                html += "</tr>";

               }
            }
        } // if while
        html += "</tbody></table>"
    }
 
    var jsonSesmt = {
        assunto: "Serviços Contratados",
        destinatario: recipientsSesmt,
        template: "templateEmailPadrao",
        sender: hAPI.getCardValue("remetente") + "",
        html: html
    }

    
    var consSesmt = DatasetFactory.createConstraint("JSON", JSON.stringify(jsonSesmt), "", ConstraintType.MUST);
    var ds_envioEmailSesmt = DatasetFactory.getDataset("ds_envioEmail", null, [consSesmt], null).values;

        if (ds_envioEmailSesmt [0].SUCESSO != "TRUE") {
            log.info("Erro ds_envioEmail " + getValue("WKNumProces"));    
        }      
   

}