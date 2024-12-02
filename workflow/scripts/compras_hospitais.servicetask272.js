function servicetask272(attempt, message) {
    iniciarSolicitacao();
}

function iniciarSolicitacao() {

    var indiceCadastro = parseInt(hAPI.getCardValue('indiceCadastro'));
    var totalFornSemCadastro = parseInt(hAPI.getCardValue("totalFornSemCadastro"));
    var arrayFornecedor = JSON.parse(hAPI.getCardValue("jsonFornACadastrar"));

    for (indiceCadastro; indiceCadastro < totalFornSemCadastro; indiceCadastro++) {
        log.info('indiceCadstro: ' + indiceCadastro)

        var user = new java.util.ArrayList();
        user.add(arrayFornecedor[indiceCadastro].codSolicitante);

        var formData = new java.util.HashMap();
        formData.put("codSolicitante", arrayFornecedor[indiceCadastro].codSolicitante);
        formData.put("solicitante", arrayFornecedor[indiceCadastro].solicitante);
        formData.put("emailSolicitante", arrayFornecedor[indiceCadastro].emailSolicitante);
        formData.put("fornecedor", arrayFornecedor[indiceCadastro].fornecedor);
        formData.put("cpfCnpjOutros", arrayFornecedor[indiceCadastro].cpfCnpjOutros);
        formData.put("cpf", arrayFornecedor[indiceCadastro].cpf);
        formData.put("cnpj", arrayFornecedor[indiceCadastro].cnpj);
        formData.put("descFilial", arrayFornecedor[indiceCadastro].descFilial);
        formData.put("emailForn", arrayFornecedor[indiceCadastro].emailForn);
        formData.put("endereco", arrayFornecedor[indiceCadastro].endereco);
        formData.put("bairro", arrayFornecedor[indiceCadastro].bairro);
        formData.put("municipio", arrayFornecedor[indiceCadastro].municipio);
        formData.put("uf", arrayFornecedor[indiceCadastro].uf);
        formData.put("codPais", arrayFornecedor[indiceCadastro].codPais);
        formData.put("tipoConta", arrayFornecedor[indiceCadastro].tipoConta);
        formData.put("agencia", arrayFornecedor[indiceCadastro].agencia);
        formData.put("codBanco", arrayFornecedor[indiceCadastro].codBanco);
        formData.put("digVAgencia", arrayFornecedor[indiceCadastro].digVAgencia);
        formData.put("contaCorrente", arrayFornecedor[indiceCadastro].contaCorrente);
        formData.put("digVConta", arrayFornecedor[indiceCadastro].digVConta);
        formData.put("complementoEnd", arrayFornecedor[indiceCadastro].complementoEnd);
        formData.put("cep", arrayFornecedor[indiceCadastro].cep);
        formData.put("ddi", arrayFornecedor[indiceCadastro].ddi);
        formData.put("ddd", arrayFornecedor[indiceCadastro].ddd);
        formData.put("telefone", arrayFornecedor[indiceCadastro].telefone);
        formData.put("tipoFornecedor", arrayFornecedor[indiceCadastro].tipoFornecedor);
        formData.put("tipoCadastro", arrayFornecedor[indiceCadastro].tipoCadastro);
        formData.put("cadastroAutomatico", arrayFornecedor[indiceCadastro].cadastroAutomatico);
        formData.put("motivoAprovContasReceber", arrayFornecedor[indiceCadastro].motivoAprovContasReceber);
        formData.put("cpDataAberturaChamado", dataAtual());

        log.info(getValue("WKNumProces") + ' - formdata cadastro fornecedor');
        log.dir(formData);

        var subprocesso = hAPI.startProcess("cadastroFornecedor", 0, user, "Solicitação inicializada a partir da solicitacao " + hAPI.getCardValue("codSolicitacao"), true, formData, false);
        var numSubProcesso = subprocesso.get("iProcess")
        log.info(getValue("WKNumProces") + ' - Gerou cadastroFornecedor ' + numSubProcesso);

        // ADD O NÚMERO DA NOVA SOLIITAÇÃO NOS COMPLEMENTOS
        var usuario = hAPI.getCardValue('idSolicitante'); //getValue('WKUser');
        var numProcesso = hAPI.getCardValue("codSolicitacao");
        var mensagem = "Aberto a solicitação de Cadastro de Fornecedor Nº " + numSubProcesso;

        hAPI.setTaskComments(usuario, numProcesso, 0, mensagem);

        // Adiciona na tabela paiXfilho
        var childData = new java.util.HashMap();
        childData.put("cgcFornVenc", arrayFornecedor[indiceCadastro].cgc);
        childData.put("numSubProcesso", numSubProcesso);
        hAPI.addCardChild("tbFornVenc", childData);
        hAPI.setCardValue("indiceCadastro", indiceCadastro + 1);

    }

    hAPI.setCardValue("iniciarCadastro", "false");
};

function dataAtual() {
    var data = new Date;
    var dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var mes = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    var ano = data.getFullYear();

    return dia + '/' + mes + '/' + ano;
}