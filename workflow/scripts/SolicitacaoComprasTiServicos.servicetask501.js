function servicetask501(attempt, message) {

    log.info("### compras.servicetask403 - Iniciado");
    var result = emitirPedidoCompra();
    return result;
}
function emitirPedidoCompra() {
    // MONTAR ESTRUTURA DE ITENS ANTES DE data CONFORME TABELA tbItens
    var gson = new com.google.gson.Gson();

    // Dados do cabeçalho
    var classeORC   = hAPI.getCardValue("classeOrcamentaria").split(' - ')[0];
    var classeVAL   = hAPI.getCardValue("classeValor"       ).split(' - ')[0];
    var filial      = hAPI.getCardValue("codFilial"         );
    var centroCusto = hAPI.getCardValue("centroDeCusto"     ).split(' - ')[0];
    var solicitante = hAPI.getCardValue("emailContatSolicitante"  ).split('@'  )[0];
    var dataPrevista = hAPI.getCardValue("dataNecessidade").split('/');
    var DataEmissao = new Date().toISOString().slice(0,10).replace(/-/g,"");

    // Obtenha o número de linhas da tabela
    var indexes = hAPI.getChildrenIndexes( "tbProd");
    var itens   = []; 
    for (var iREG = 0; iREG < indexes.length; iREG++) {
        var indice = indexes[iREG];
            dataPrevista = dataPrevista[2] + dataPrevista[1] + dataPrevista[0];

            var item = {};
                item["material"]     = hAPI.getCardValue("codProd___"    +indice);
                item["Quantidade"]   = hAPI.getCardValue("qtdProd___" 	 +indice);
                item["VlrUnit"]      = removeMascaraMonetaria(hAPI.getCardValue("valorProd___"  +indice));
                item["CCustos"]      = centroCusto;
                item["DataPrevista"] = dataPrevista;
                item["ClasseOrcam"]  = classeORC;
                item["ClasseValor"]  = classeVAL;
                item["Prioridade"]   = "N";
                item["Observacao"]   = hAPI.getCardValue("infoAdicionais___"        +indice);

            itens.push(item);
    }

    // NUMERO DO WORKFLOW
    var idFluig = ''+getValue("WKNumProces");
    var data = 
         {  "Filial"      : filial,
            "DataEmissao" : DataEmissao,
            "IdFluig"     : idFluig,
            "Solicitante" : solicitante,
            "items"       : itens
        };
        
    log.info("### compras.servicetask403 - data: ")
    log.dir(data);
    
    // http://oncoclinicasdo138877.protheus.cloudtotvs.com.br:4050/rest_des/WSRESTSC
    // Enviar data como raw
    var requestData = 
    {
        companyId     : "1",
        serviceCode   : "ProtheusSC",
        endpoint      : "/WSRESTSC",
        method        : "POST",
        timeoutService: "180",
        params        : data, 
        options: {
            mediaType: "application/json",
            encoding : "UTF-8"
        },
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    };

    var xmlTransf = gson.toJson(requestData);

    log.info("### compras.servicetask403 - xmlTransf: ")
    log.dir(xmlTransf);

    var ClientService = fluigAPI.getAuthorizeClientService();
    var response      = ClientService.invoke( xmlTransf ); 
    var httpStatus    = response.getHttpStatusResult();
    var result        = response.getResult();

    log.info("### compras.servicetask403 - httpStatus: " + httpStatus);
    log.dir(result);

    if (httpStatus == 200 || httpStatus == 201) {
		log.info("#### compras.servicetask403 - Protheus - STATUS OK");
        // pegar o numero da sc criada no Protheus -  {"observacao":"Solicitacao de Compra numero: 001440 , Incluida com sucesso no ERP.","numero_sc":"001440","status":"true"} 
        
        var dados = JSON.parse(result);
        var numSC = dados.numero_sc;
        log.info("#### compras.servicetask403 - Protheus - NumSC: " + numSC);
        hAPI.setCardValue("txtNumeroProtheus", numSC);
        return true; 
	} else if (httpStatus >= 400) {
		throw "compras.servicetask403 - Protheus - Falha ao atualizar no Protheus: "+result;
    } 

}

function removeMascaraMonetaria(mask) {
    if (mask != undefined && mask != '') {
        mask = mask.replace('R$', '');
        mask = mask.replace(' ', '');
        //mask = mask = mask.replace(/[\.]/g, '');

        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');

        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}
/*
    {
        "companyId": 1,
        "serviceCode": "ProtheusSC",
        "endpoint": "/WSRESTSC",
        "method": "POST",
        "timeoutService": "100",
        "params": {
            "Filial": "00101",
            "DataEmissao": "20241126",
            "IdFluig": "2226555",
            "Solicitante": "paulo.felipe",
            "items": [
            {
                "material": "012550",
                "Quantidade": 2,
                "VlrUnit": 10,
                "CCustos": "21010103",
                "DataPrevista": "20241025",
                "ClasseOrcam": "000003",
                "ClasseValor": "0003",
                "Prioridade": "N",
                "Observacao": "Teste de integrração fluig x Protheus",
            }
            ]
        },
        "options": {
            "Content-Type": "text/plain"
        }
        }        
*/
