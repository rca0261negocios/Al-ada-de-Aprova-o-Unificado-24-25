function servicetask170(attempt, message) {

    log.info("###--- Entrei no envio de e-mail cancelamento de compras.");
    var emailSolicitante = hAPI.getCardValue('emailSolicitante');
    var emailComprador = hAPI.getCardValue('emailComprador');
    log.info("###--- emailSolicitante" + emailSolicitante);
    log.info("###--- emailComprador" + emailComprador);

    if (emailSolicitante != "") {
        log.info("###--- Entrei no if solicitante");
        enviaEmail(emailSolicitante);
    }
    if (emailComprador != "") {
        log.info("###--- Entrei no if comprador");
        enviaEmail(emailComprador);
    }
}

/**
 * Envia email de credenciais de acesso de rede
 */
function enviaEmail(email) {
    log.info("###--- Entrei na funcão");
    var sender = "4s2f7mmb7dfs64qv1452799368975";
    try {
        //Parametros de envio
        var parameters = new java.util.HashMap();
        parameters.put("subject", "Notificação de Cancelamento de Chamado [" + hAPI.getCardValue("codSolicitacao") + "]");
        parameters.put("COD_SOLICITACAO", hAPI.getCardValue("codSolicitacao"));
        //Seta os destinatarios
        var recipients = new java.util.ArrayList();
        recipients.add(email);
        notifier.notify(sender, "email_cancelamento", parameters, recipients, "text/html");

    } catch (e) {
        log.info("Ocorreu um erro ao tentar enviar o e-mail de cancelamento compras" + e);
    }
}