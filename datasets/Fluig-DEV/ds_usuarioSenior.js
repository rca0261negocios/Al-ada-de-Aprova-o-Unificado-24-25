function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("LOGIN");
    dataset.addColumn("TIPO_COLABORADOR");
    dataset.addColumn("COD_COLABORADOR");
    dataset.addColumn("NOME_COLABORADOR");
    dataset.addColumn("TIPO_ADMISSAO");
    dataset.addColumn("COD_CARGO");
    dataset.addColumn("DESC_CARGO");
    dataset.addColumn("COD_FILIAL");
    dataset.addColumn("COD_CENTROCUSTOS");
    dataset.addColumn("ESTADO_CIVIL");
    dataset.addColumn("DT_NASCIMENTO");
    dataset.addColumn("COD_HIERARQUIA")
    dataset.addColumn("HIERARQUIA");
    dataset.addColumn("CPF");
    dataset.addColumn("RG");
    dataset.addColumn("EMAIL");
    dataset.addColumn("TELEFONE");
    dataset.addColumn("FILTRO");
    dataset.addColumn("CGC_FILIAL");


    var properties = {};
    properties["log.soap.messages"] = "true";
    properties["receive.timeout"] = "300000";

    var periodicService = ServiceManager.getService('ws_consultaSenior');
    var serviceHelper = periodicService.getBean();
    var serviceLocator = serviceHelper.instantiate('br.com.senior.services.G5SeniorServices');
    var service = serviceLocator.getRubiSynccomSeniorG5RhFpConsultarColaboradorFluigPort();

    /********************FILTROS********************
     * NOME_COLABORADOR                            *
     * CGC_FILIAL                                  *
     ***********************************************/
    // Apliaca os valores aos objetos de filtro
    var cgcFilial
    var paramsConsulta = serviceHelper.instantiate('br.com.senior.services.ConsultarColaboradorFluigconsultarColaboradorFluigIn');
    for (var key in constraints) {
        if (constraints[key].fieldName == 'NOME_COLABORADOR') {

            var nomead = new javax.xml.bind.JAXBElement(new javax.xml.namespace.QName("usuarioad"), java.lang.String, constraints[key].initialValue)
            paramsConsulta.setUsuarioad(nomead);

        } else if (constraints[key].fieldName == 'CGC_FILIAL') {
            cgcFilial = constraints[key].initialValue
            var cgc = new javax.xml.bind.JAXBElement(new javax.xml.namespace.QName("numerocgc"), java.lang.Double, constraints[key].initialValue)
            paramsConsulta.setNumerocgc(cgc);

        } else if (constraints[key].fieldName == 'FILTRO') {
            var nomead = new javax.xml.bind.JAXBElement(new javax.xml.namespace.QName("usuarioad"), java.lang.String, constraints[key].initialValue)
            paramsConsulta.setUsuarioad(nomead);
        }
    }

    var client = serviceHelper.getCustomClient(service, "br.com.senior.services.RubiSynccomSeniorG5RhFpConsultarColaboradorFluig", properties);
    var resultObj = client.consultarColaboradorFluig('webservices', 'VsIW^A*X^=(4Bb28d?uH', 0, paramsConsulta);

    if (resultObj.getErroExecucao().getValue() == null ||
        resultObj.getErroExecucao().getValue() == 'null') {

        var response = JSON.parse(resultObj.getXmlSaida().getValue())

        for (var key in response) {

            var campoFiltro = response[key].login + ' - ' + response[key].nomeColaborador

            dataset.addRow(new Array(
                response[key].login,
                response[key].tipoColaborador,
                response[key].codColaborador,
                response[key].nomeColaborador,
                response[key].tipoAdmissao,
                response[key].CodCargo,
                response[key].descricaoCargo,
                response[key].codFilial,
                response[key].codCentroCustos,
                response[key].estadoCivil,
                response[key].dtNascimento,
                response[key].codHierarquia,
                response[key].hierarquia,
                response[key].CPF,
                response[key].RG,
                response[key].Email,
                response[key].Telefone,
                campoFiltro,
                cgcFilial
            ))
        }

    } else {

        dataset.addRow(new Array(
            resultObj.getErroExecucao().getValue(),
            resultObj.getXmlSaida().getValue()
        ))
    }

    return dataset;

}