function defineStructure() {
	addColumn("STATUS");
	addColumn("CODIGO");
	addColumn("CODIGO_FLUIG");
	addColumn("DESCRICAO");
	addColumn("DESCRICAO_PROTHEUS");
	addColumn("RAZAO_SOCIAL");
	addColumn("CGC");
	addColumn("CEP");
	addColumn("ENDERECO");
	addColumn("COMPLEMENTO");
	addColumn("BAIRRO");
	addColumn("CIDADE");
	addColumn("ESTADO");
	addColumn("ATIVA");
	addColumn("RADIOTERAPIA");
	addColumn("LOGIN_BIONEXO");
	addColumn("SENHA_BIONEXO");
	addColumn("ID_GESTOR");
	addColumn("NOME_GESTOR");
	addColumn("CLASSIFICAÇÃO");
	addColumn("INSCRICAO_ESTADUAL");
	addColumn("TASY");
	addColumn("FILTRO");
	addColumn("USABILIDADE");

	// CHAVE PRIMARIA
	setKey([ "CODIGO" ]);

	// INDICES PARA PESQUISA
	addIndex([ "CODIGO" ]);
	addIndex([ "DESCRICAO" ]);
}

function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetFactory.newDataset();
	
	log.info('### ds_filiais iniciado...');

	var filtro = "";
	var codigo = "";
	var descricao = "";
	var cgc = "";
	var cidade = "";

	if (constraints !== undefined && constraints !== '' && constraints != null) 		
		for (var i in constraints) 
			if (constraints[i].fieldName == "CODIGO") 
				codigo = constraints[i].initialValue.trim();
			else
			if (constraints[i].fieldName == "DESCRICAO") 
				descricao = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "CGC") 
				cgc = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "FILTRO") 
				filtro = constraints[i].initialValue;
			else
			if (constraints[i].fieldName == "CIDADE") 
				cidade = constraints[i].initialValue;
	
	// CHAMAR A CONSULTA REST 
    var data = {
        companyId  : '1',
        serviceCode: 'ProtheusWS2', 	
        endpoint   : '/wsfilial', 		
        method     : 'GET', 			 
        timeoutService: '100', 			
        params     : {},   				
        options: {
            encoding: 'UTF-8',
            mediaType: 'application/json'
		},
		headers: {
			ContentType: 'application/json;charset=UTF-8'
        }
    }

    var ClientService = fluigAPI.getAuthorizeClientService();
    var response      = ClientService.invoke(JSONUtil.toJSON(data));
    var httpStatus    = response.getHttpStatusResult();
    var result        = JSON.parse( response.getResult() );
    
    log.info('### ds_filiais - result:');
    log.dir(result); // x.result[0].RAZAO_SOCIAL

    /**
      "result": [
        {
            "CODIGO": "00101",
            "DESCRICAO": "HOLDING",
            "RAZAO_SOCIAL": "ONCOCLINICAS BRASIL SERVICOS MEDICOS",
            "CGC": "12104241000160",
            "CEP": "30150274",
            "ENDERECO": "R DOS OTONI , 742",
            "CIDADE": "BELO HORIZONTE",
            "ESTADO": "MG",
            "BAIRRO": "SANTA EFIGENIA",
            "COMPLEMENTO": "AND. 8,9 SALAS 801 A 804",
            "INSCRICAO_ESTADUAL": "ISENTO",
            "TASY": "NAO"
        }
     */
    if (httpStatus == 200) {
		var result = result.result;
		for (var x in result) {
			if (result[x].DESCRICAO !== "") {
				var filialFluig = dadosFluig(result[x].CODIGO);

				if ((codigo    == "" || result[x].CODIGO.indexOf(codigo) !== -1) &&
					(descricao == "" || filialFluig.filial.toUpperCase().indexOf(descricao.toUpperCase()) !== -1) &&
					(cgc       == "" || result[x].CGC.indexOf(cgc)       !== -1) &&
					(cidade    == "" || result[x].CIDADE.indexOf(cidade) !== -1) &&
					(filtro    == "" || result[x].CODIGO.indexOf(filtro) !== -1 || filialFluig.filial.toUpperCase().indexOf(filtro.toUpperCase()) !== -1)
				) {
					dataset.addRow(new Array(
						'ok',
						result[x].CODIGO,
						filialFluig.codFluig,
						filialFluig.filial,
						result[x].DESCRICAO,
						result[x].RAZAO_SOCIAL,
						result[x].CGC,
						result[x].CEP,
						result[x].ENDERECO,
						result[x].COMPLEMENTO,
						result[x].BAIRRO,
						result[x].CIDADE,
						result[x].ESTADO,
						filialFluig.ativa,
						filialFluig.filialRadioterapia,
						filialFluig.login_bionexo,
						filialFluig.senha_bionexo,
						filialFluig.codGstFluig,
						filialFluig.nomeGestor,
						filialFluig.tipoClassificacao,
						result[x].INSCRICAO_ESTADUAL,
						result[x].TASY,
						result[x].CODIGO + " - " + filialFluig.filial,
						filialFluig.usabilidade
					));
				}
			}
		}	
		log.info('### ds_filiais finalizado.');
		return dataset;
    } else {
    	log.error('### ds_filiais error: ');
    	log.dir(result);
		dataset.addRow(new Array(result));
		return dataset;
    }
}

function dadosFluig(codigo) {

	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("filial_protheus", codigo, codigo, ConstraintType.MUST);
	var constraints = new Array(c1, c2);
	var cad_Filiais = DatasetFactory.getDataset("cad_Filiais", null, constraints, null);

	var filialFluig = {};

	if (cad_Filiais.rowsCount != 0) {
		for (var i = 0; i < cad_Filiais.rowsCount; i++) {
			filialFluig.ativa = cad_Filiais.getValue(i, "status");
			filialFluig.filial = cad_Filiais.getValue(i, "filial");
			filialFluig.codFluig = cad_Filiais.getValue(i, "codigo");
			filialFluig.filialRadioterapia = cad_Filiais.getValue(i, "filialRadioterapia");
			filialFluig.login_bionexo = cad_Filiais.getValue(i, "login_bionexo");
			filialFluig.senha_bionexo = cad_Filiais.getValue(i, "senha_bionexo");
			filialFluig.codGstFluig = cad_Filiais.getValue(i, "codGstFluig");
			filialFluig.nomeGestor = cad_Filiais.getValue(i, "nomeGestor");
			filialFluig.tipoClassificacao = cad_Filiais.getValue(i, "tipoClassificacao");
			filialFluig.usabilidade = cad_Filiais.getValue(i, "tipoClassificacao"); // ACRESCENTADO PARA FAZER FILTRO NOS PRODUTOS DE ACORDO COM O TIPO DE FILIAL
		}
	} else {
		filialFluig.ativa = "";
		filialFluig.filial = "";
		filialFluig.codFluig = "";
		filialFluig.filialRadioterapia = "";
		filialFluig.login_bionexo = "";
		filialFluig.senha_bionexo = "";
		filialFluig.codGstFluig = "";
		filialFluig.nomeGestor = "";
		filialFluig.tipoClassificacao = "";
		filialFluig.usabilidade = "";
	}

	return filialFluig;
}
