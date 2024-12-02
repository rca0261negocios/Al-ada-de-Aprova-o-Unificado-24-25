function servicetask303(attempt, message) {
    if (hAPI.getCardValue("hideContrato") != "true" && hAPI.getCardValue("hideContratoGuardChuva") != "true") {

        var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
        var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
        var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
        var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
        stringArray.getItem().add(hAPI.getCardValue('idSolicitante'));

        var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
        var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
        var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');


        var qtdeAcompanhamentosAGerar = parseInt(hAPI.getCardValue("qtdeAcompAGerar"));
        var arrayAcompanhamentos = JSON.parse(hAPI.getCardValue("jsonAcompanhamento"));

        for (var i = 0; i < qtdeAcompanhamentosAGerar; i++) {

            var acompanhamento = arrayAcompanhamentos[i];
            var qdteProdutos = parseInt(arrayAcompanhamentos[i].length);
            var prazo = retornaPrazoMenosUm(acompanhamento[0].prazoEntrega);
            var urlCompras = hAPI.getCardValue('linkParaChamadoCompras')

            var arrayCampos = []
            arrayCampos.push(["cpDataAberturaChamado", dataAtual()]);
            arrayCampos.push(["codSolicitante", hAPI.getCardValue('idSolicitante')]);
            arrayCampos.push(["solicitante", hAPI.getCardValue('nomeSolicitante')]);
            arrayCampos.push(["numSolicitacao", hAPI.getCardValue('codSolicitacao')]);
            arrayCampos.push(["emailSolicitante", hAPI.getCardValue('emailSolicitante')]);
            arrayCampos.push(["urlDoChamadoCompras", urlCompras]);
            arrayCampos.push(["avancouAtvDMenosQ", 'false']);
            arrayCampos.push(["dtAvancarParaAtv5", prazo]);
            arrayCampos.push(["campoIdentificador", hAPI.getCardValue('filial')]);
            arrayCampos.push(["fornecedor", acompanhamento[0].fornecedor]);
            arrayCampos.push(["prazoEntrega", acompanhamento[0].prazoEntrega]);
            arrayCampos.push(["codFornecedor", acompanhamento[0].codFornecedor]);
            arrayCampos.push(["atribCompras", hAPI.getCardValue('setRespCompras')]);

            for (var j = 0; j < qdteProdutos; j++) {
                arrayCampos.push(["codProduto___" + (j + 1), acompanhamento[j].codProduto]);
                arrayCampos.push(["descricao___" + (j + 1), acompanhamento[j].descProduto]);
                arrayCampos.push(["unidade___" + (j + 1), acompanhamento[j].unidade]);
                arrayCampos.push(["qtdeSolicitada___" + (j + 1), acompanhamento[j].quantidade]);
            }

            for (var index = 0; index < arrayCampos.length; index++) {
                var campoValor = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                var campoX = arrayCampos[index][0]
                var valorX = arrayCampos[index][1]

                campoValor.getItem().add(campoX);
                campoValor.getItem().add(valorX);
                cardData.getItem().add(campoValor);
            }


            log.info(getValue("WKNumProces") + ' stringArray:');
            log.dir(stringArray);
            log.info('___________________________')
            log.info(getValue("WKNumProces") + ' CardData:');
            log.dir(cardData);

            var rest = workflowEngineService.startProcess("integrador.fluig@oncoclinicas.com",
                "hUbust*7",
                1,
                "acompanhamentoEntregaCompras",
                0,
                stringArray,
                "Acompanhamento gerado a partir da solicitação: " + hAPI.getCardValue("codSolicitacao") + ".",
                hAPI.getCardValue('idSolicitante'),
                true,
                processAttachmentDtoArray,
                cardData,
                processTaskAppointmentDtoArray,
                false);

            var iProcess = "";
            for (var j = 0; j < rest.getItem().size(); j++) {
                var item = rest.getItem().get(j).getItem();
                var key = item.get(0);
                var value = item.get(1);
                if (key == "iProcess") {
                    iProcess = value;
                }
            }

            hAPI.setTaskComments(hAPI.getCardValue('idSolicitante'),
                hAPI.getCardValue("codSolicitacao"),
                0,
                'Gerado acompanhamento de entrega: ' + iProcess);
        }
    }
}

function retornaPrazoMenosUm(data) {
    data = data.split('/');
    data = new Date(data[2], data[1] - 1, data[0]);
    milissegundos_por_dia = 1000 * 60 * 60 * 24;
    data = new Date(data.getTime() - 1 * milissegundos_por_dia);

    if (data.getDay() == 0) { //se cair no domingo
        data = new Date(data.getTime() - 2 * milissegundos_por_dia);
    } else if (data.getDay() == 6) { //se cair no sábado
        data = new Date(data.getTime() - 1 * milissegundos_por_dia);
    }

    var dia = data.getDate() < 10 ? '0' + data.getDate() : data.getDate();
    var mes = (data.getMonth() + 1) < 10 ? '0' + (data.getMonth() + 1) : (data.getMonth() + 1);
    var ano = data.getFullYear();

    return (dia + '/' + mes + '/' + ano);
}