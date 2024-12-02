function exportarDoc() {

    var fluigLoading = FLUIGC.loading('#content', {
        cursorReset: 'default',
        baseZ: 1000,
        centerX: true,
        centerY: true,
        bindEvents: true,
        fadeIn: 200,
        fadeOut: 400,
        timeout: 0,
        showOverlay: true,
        onBlock: null,
        onUnblock: null,
        ignoreIfBlocked: false
    });

    var dadosFilial = "";

    if ($("#hideContratoGuardChuva").val() == "true") {
        $("[name^=codFilial___]").each(function() {
            var indice = this.name.split("___")[1];

            var constraintDs_filial1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
            var constraintDs_filial2 = DatasetFactory.createConstraint('CGC', $("#cnpjFilial___" + indice).val(), $("#cnpjFilial___" + indice).val(), ConstraintType.MUST);
            var datasetDs_filial = DatasetFactory.getDataset('ds_fornecedor', null, new Array(constraintDs_filial1, constraintDs_filial2), null).values;

            var razaoSocialFilial = datasetDs_filial[0].DESCRICAO;
            var cnpjFilial = datasetDs_filial[0].CGC;
            var enderecoFilial = datasetDs_filial[0].ENDERECO;
            var complementoFilial = datasetDs_filial[0].COMPLEMENTO == undefined ? "" : datasetDs_filial[0].COMPLEMENTO;
            var bairroFilial = datasetDs_filial[0].BAIRRO;
            var cidadeFilial = datasetDs_filial[0].DESC_MUNICIPIO;
            var estadoFilial = datasetDs_filial[0].ESTADO;
            var cepFilial = datasetDs_filial[0].CEP;

            dadosFilial = dadosFilial + razaoSocialFilial.toUpperCase() + ", pessoa jurídica de direito privado, com sede na " + enderecoFilial.toUpperCase() + ", " + bairroFilial.toUpperCase() + " " + cidadeFilial.toUpperCase() + "/" + estadoFilial.toUpperCase() + " " + cepFilial + ", inscrita no CNPJ nº " + formatCgc(cnpjFilial) + ", "
        })
    } else {
        var constraintDs_filial1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
        var constraintDs_filial2 = DatasetFactory.createConstraint('CGC', $("#cgcFilial").val(), $("#cgcFilial").val(), ConstraintType.MUST);
        var datasetDs_filial = DatasetFactory.getDataset('ds_fornecedor', null, new Array(constraintDs_filial1, constraintDs_filial2), null).values;

        var razaoSocialFilial = datasetDs_filial[0].DESCRICAO;
        var cnpjFilial = datasetDs_filial[0].CGC;
        var enderecoFilial = datasetDs_filial[0].ENDERECO;
        var complementoFilial = datasetDs_filial[0].COMPLEMENTO == undefined ? "" : datasetDs_filial[0].COMPLEMENTO;
        var bairroFilial = datasetDs_filial[0].BAIRRO;
        var cidadeFilial = datasetDs_filial[0].DESC_MUNICIPIO;
        var estadoFilial = datasetDs_filial[0].ESTADO;
        var cepFilial = datasetDs_filial[0].CEP;

        dadosFilial = razaoSocialFilial.toUpperCase() + ", pessoa jurídica de direito privado, com sede na " + enderecoFilial.toUpperCase() + ", " + bairroFilial.toUpperCase() + " " + cidadeFilial.toUpperCase() + "/" + estadoFilial.toUpperCase() + " " + cepFilial + ", inscrita no CNPJ nº " + formatCgc(cnpjFilial) + ", "

    }

    var constraintDs_filial1 = DatasetFactory.createConstraint('sqlLimit', '1', '1', ConstraintType.MUST);
    var constraintDs_filial2 = DatasetFactory.createConstraint('CGC', $("#cgcFilial").val(), $("#cgcFilial").val(), ConstraintType.MUST);
    var datasetDs_filial = DatasetFactory.getDataset('ds_fornecedor', null, new Array(constraintDs_filial1, constraintDs_filial2), null).values;

    var razaoSocialFilial = datasetDs_filial[0].DESCRICAO;
    var cnpjFilial = datasetDs_filial[0].CGC;
    var enderecoFilial = datasetDs_filial[0].ENDERECO;
    var complementoFilial = datasetDs_filial[0].COMPLEMENTO;
    var bairroFilial = datasetDs_filial[0].BAIRRO;
    var cidadeFilial = datasetDs_filial[0].DESC_MUNICIPIO;
    var estadoFilial = datasetDs_filial[0].ESTADO;
    var cepFilial = datasetDs_filial[0].CEP;
    var constraintDs_fornecedor1 = DatasetFactory.createConstraint('sqlLimit', '100', '100', ConstraintType.MUST);
    var constraintDs_fornecedor2 = DatasetFactory.createConstraint('CODIGO', $("#codFornecedorProtheusContrato___1").val(), $("#codFornecedorProtheusContrato___1").val(), ConstraintType.MUST);
    var datasetDs_fornecedor = DatasetFactory.getDataset('ds_fornecedor', null, new Array(constraintDs_fornecedor1, constraintDs_fornecedor2), null).values;

    var descricaoForn = datasetDs_fornecedor[0].DESCRICAO;
    var cnpjForn = datasetDs_fornecedor[0].CGC;
    var enderecoForn = datasetDs_fornecedor[0].ENDERECO;
    var bairroForn = datasetDs_fornecedor[0].BAIRRO;
    var cidadeForn = datasetDs_fornecedor[0].DESC_MUNICIPIO;
    var estadoForn = datasetDs_fornecedor[0].ESTADO;
    var cepForn = datasetDs_fornecedor[0].CEP;
    var codBancoForn = datasetDs_fornecedor[0].BANCO;
    var agenciaForn = datasetDs_fornecedor[0].AGENCIA;
    var dvAgenciaForn = datasetDs_fornecedor[0].DV_AGENCIA;
    var contaForn = datasetDs_fornecedor[0].CONTA;
    var dvContaForn = datasetDs_fornecedor[0].DV_CONTA;

    var bancoForn = "";
    if (codBancoForn != "") {
        bancoForn = getNomeBanco(codBancoForn);
    }

    //Dados adicionais para a minuta
    var qtdParcelas = $('#qtdParcelas').val();
    var gestorContratante = $('#gestorContrato').val();
    var numPropostaComercial = $('#numPropComercial').val();
    var dataTermoContrato = $('#dtTermoContrato').val();
    var dtPagamento = $('#dtPagamento').val();
    var dtAssinatura = $('#dtAssinaContrato').val();
    var anexo1 = $("input[name='anexo1']:checked").val() == "on" || $("#anexo1").val() == "on" ? "X" : " ";
    var anexo2 = $("input[name='anexo2']:checked").val() == "on" || $("#anexo2").val() == "on" ? "X" : " ";
    var anexo3 = $("input[name='anexo3']:checked").val() == "on" || $("#anexo3").val() == "on" ? "X" : " ";
    var anexo4 = $("input[name='anexo4']:checked").val() == "on" || $("#anexo4").val() == "on" ? "X" : " ";
    var anexo5 = $("input[name='anexo5']:checked").val() == "on" || $("#anexo5").val() == "on" ? "X" : " ";
    var outrosAnexo5 = $('#anexoOutros').val();
    var condEspeciais = $('#codEspeciais').val();
    var nomeTestemunha1 = $('#nomeTestemunha1').val();
    var cpfTestemeunha1 = $('#cpfTestemunha1').val();
    var rgTestemunha1 = "";
    var nomeTestemunha2 = $('#nomeTestemunha2').val();
    var cpfTestemeunha2 = $('#cpfTestemunha2').val();
    var rgTestemunha2 = "";
    var rescisaoContrato = $('#rescisaoContrato').val();
    var numeroAditivo = $("#numeroAdivo").val();
    var valorExtenso = Extenso(removeMascaraMonetaria($('#valorTotalServico').val()));
    var valorContrato = $('#valorTotalServico').val();
    var valorParcela = parseFloat((removeMascaraMonetaria(valorContrato) / parseInt(qtdParcelas))).toFixed(2);
    var parcelaExtenso = Extenso(valorParcela);
    var objContrato = $('#objetoContrato').val();
    var unidadeVigencia = $('#unidadeVigencia').val();
    var vigenciaContrato = $('#vigenciaDoContrato').val();
    var condicaoPagamento = $('#condicaoPgto___1').val();
    var localEntrega = localPrestacaoSer($('#sLocalPrestServico').val());
    var refLocalEntrega = $('#referenciaEntrega').val();
    var prazoEntrega = $('#prazoEntrega___1').val();
    var contatoComercial = $('#contatoComercial').val();
    var telefoneContato = $('#telefoneComercial').val();
    var emailContato = $('#emailComercial').val();
    var dtNecessidadeProduto = $("#dtNecessidadeProduto").val();

    // Datas
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth();
    var mesExtenso = getMesExtenso(dataAtual.getMonth());
    var ano = dataAtual.getFullYear();

    var dtPag = dtPagamento.split("-");
    var diaPagamento = dtPag[2];
    var mesPagamento = dtPag[1];
    var anoPagamento = dtPag[0];

    var dtAss = dtAssinatura.split("-");
    var diaAssinatura = dtAss[2];
    var mesAssinatura = dtAss[1];
    var anoAssinatura = dtAss[0];

    var formaPagamento = "";

    if ($("#formaPagamento___1").val() == 1) {
        formaPagamento = "boleto bancário.";
    } else {
        formaPagamento = "depósito na conta corrente de titularidade da CONTRATADA, n.º " + contaForn + " – " + dvContaForn + ", agência " + agenciaForn + " – " + dvAgenciaForn + ", do Banco " + bancoForn + " - Código do Banco " + codBancoForn + ", valendo os respectivos comprovantes de depósitos como prova de pagamento e quitação.";
    }

    var dtTermo = dataTermoContrato.split("-");
    var diaTermo = dtTermo[2];
    var mesTermo = dtTermo[1];
    var anoTermo = dtTermo[0];

    var dtInicioAditivo = adicionarDiasData(1, mesTermo + "/" + diaTermo + "/" + anoTermo);

    var dtAditivo = dtInicioAditivo.split("/");
    var diaAditivo = dtAditivo[0];
    var mesAditivo = dtAditivo[1];
    var anoAditivo = dtAditivo[2];

    var tipoContrato = $("#tipoContratoCompras").val();
    var tipoProduto = $("#codServOuProd").val();
    var tipoDoc = "";
    var tipoSolicitacao = "";
    var minutaPadrao = $("#minutaPadrao").val();
    var extensaoDoArq = '';

    if (tipoContrato == "Aditivo") {
        tipoDoc = 'Contrato Aditivos';
        extensaoDoArq = '.docx';

        if (tipoProduto == "SV") {
            tipoSolicitacao = "Prestação de Serviços";

        } else {
            tipoSolicitacao = "fornecimento";
        }

    } else if (tipoContrato == "Novo Contrato") {
        extensaoDoArq = (minutaPadrao == "true") ? '.pdf' : '.docx';
        if (tipoProduto == "SV") {
            tipoDoc = (minutaPadrao == "true") ? 'Contrato Serviços - COM CHANCELA' : 'Contrato Serviços';
        } else {
            tipoDoc = (minutaPadrao == "true") ? 'Contrato Produtos - COM CHANCELA' : 'Contrato Produtos';
        }
    }

    var codCondicaoPrecos = $('#composicaoPrecos').val();
    var condicaoPrecosUnitario = " ";
    var condicaoPrecosFechado = " ";
    var textoPreco = "";
    if (codCondicaoPrecos == "F") {
        condicaoPrecosFechado = "X";
        textoPreco = "O valor total deste Contrato é de " + valorContrato + "(" + valorExtenso + "), a ser pago em " + qtdParcelas + " (" + NumExtenso(qtdParcelas) + ") parcelas mensais, iguais e sucessivas de R$ " + addMascaraMonetaria(valorParcela) + "(" + parcelaExtenso + ") cada uma, cuja modalidade de contratação será por, conforme Anexo IV:";
    } else if (codCondicaoPrecos == "E") {
        condicaoPrecosUnitario = "X";
        textoPreco = "O valor total deste Contrato é conforme demanda da CONTRATANTE, cuja modalidade de contratação será por, conforme Anexo IV:";
    }
    if (unidadeVigencia != "4") {
        vigenciaContrato = " de " + vigenciaContrato + " (" + NumExtenso(vigenciaContrato) + ")";
    } else {
        vigenciaContrato = "";
    }

    var dados = {
        // Contrato
        objContrato: objContrato,
        localEntrega: localEntrega,
        vigenciaContrato: vigenciaContrato,
        unidadeVigencia: unidadeVigenciaDesc(unidadeVigencia),
        valorContrato: valorContrato,
        valorExtenso,
        valorExtenso,
        contatoComercial: contatoComercial,
        telefoneContato: telefoneContato,
        emailContato: emailContato,
        anexo1: anexo1,
        anexo2: anexo2,
        anexo3: anexo3,
        anexo4: anexo4,
        anexo5: anexo5,
        outrosAnexo5: outrosAnexo5,
        qtdParcelas: qtdParcelas,
        qtdParcelasExtenso: NumExtenso(qtdParcelas),
        valorParcela: addMascaraMonetaria(valorParcela),
        parcelaExtenso: parcelaExtenso,
        numPropostaComercial: numPropostaComercial,
        condEspeciais,
        condEspeciais,
        gestorContratante: gestorContratante,
        dtNecessidadeProduto: dtNecessidadeProduto,
        condicaoPrecosUnitario: condicaoPrecosUnitario,
        condicaoPrecosFechado: condicaoPrecosFechado,
        refLocalEntrega: refLocalEntrega,
        tipoSolicitacao: tipoSolicitacao,
        tipoSolicitacaotitulo: tipoSolicitacao.toUpperCase(),
        rescisaoContrato: rescisaoContrato,
        rescisaoContratoExtenso: NumExtenso(rescisaoContrato),
        numeroAditivo: numeroAditivo,
        textoPreco: textoPreco,
        //Testemunhas
        nomeTestemunha1: nomeTestemunha1,
        cpfTestemeunha1: cpfTestemeunha1,
        rgTestemunha1: rgTestemunha1,
        nomeTestemunha2,
        nomeTestemunha2,
        cpfTestemeunha2: cpfTestemeunha2,
        rgTestemunha2: rgTestemunha2,
        // Filial
        dadosFilial: dadosFilial,
        filial: razaoSocialFilial.toUpperCase(),
        cnpj: formatCgc(cnpjFilial),
        enderecofilial: enderecoFilial.toUpperCase(),
        cidadefilial: cidadeFilial.toUpperCase(),
        estadoFilial: estadoFilial.toUpperCase(),
        bairroFilial: bairroFilial.toUpperCase(),
        complementoFilial: complementoFilial,
        cepFilial: cep(cepFilial),
        // Fornecedor
        fornecedor: descricaoForn.toUpperCase(),
        cnpjfornecedor: formatCgc(cnpjForn),
        enderecofornecedor: enderecoForn.toUpperCase(),
        bairrofornecedor: bairroForn.toUpperCase(),
        cidadefornecedor: cidadeForn.toUpperCase(),
        estadoForn: estadoForn.toUpperCase(),
        cepForn: cep(cepForn),
        // Dados bancarios fornecedor
        formaPagamento: formaPagamento,
        // Data
        dia: dia,
        mesextenso: mesExtenso,
        ano: ano,
        diaPagamento: diaPagamento,
        diaTermo: diaTermo,
        mesTermo: getMesExtenso(parseInt(mesTermo) - 1),
        anoTermo: anoTermo,
        diaAditivo: diaAditivo,
        mesAditivo: getMesExtenso(parseInt(mesAditivo) - 1),
        anoAditivo: anoAditivo,
        diaAssinatura: diaAssinatura,
        mesAssinatura: getMesExtenso(parseInt(mesAssinatura) - 1),
        anoAssinatura: anoAssinatura,
        versaoDoc: ''
    };


    var origem = window.location.origin;
    var pastaGED = "";
    
    if (origem == "https://oncoclinicastst.fluig.com") {
        pastaGED = "2298751"; // Pasta de melhoria continua no Juridico
    } else if (origem == "https://oncoclinicas.fluig.com") {
        pastaGED = "2298751"; // Raiz/Grupo Oncoclinicas
    } else if (origem == "https://oncoclinicasdev.fluig.com") {
        pastaGED = "2298751"; // Raiz/Grupo Oncoclinicas
    }

    var consultaDocGed = docGED(pastaGED, tipoDoc);
    var file = consultaDocGed.file;
    dados.versaoDoc = '' + consultaDocGed.versao;

    var nomeDoc = 'Contrato ' + $('#nomeFornecedor___1').val();

    fluigLoading.show();
    setTimeout(function() {
        gerarDocumentos(dados, nomeDoc, file, extensaoDoArq, fluigLoading);
    }, 100);
}

function buscarDoc(idPasta) {
    var folder = fluigAPI.getFolderDocumentService().list(folderId);

    for (var i = 0; i < folder.size(); i++) {
        folder.get(i).getDocumentDescription();
    }
}

function adicionarDiasData(dias, dtAtual) {
    var hoje = new Date(dtAtual);
    var dataVenc = new Date(hoje.getTime() + (dias * 24 * 60 * 60 * 1000));
    return dataVenc.getDate() + "/" + (dataVenc.getMonth() + 1) + "/" + dataVenc.getFullYear();
}

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function gerarDocumentos(dados, nomeDoc, file, extensaoDoArquivoDonwload, fluigLoading) {

    loadFile(file, function(error, content) {
        fluigLoading.show();
        if (error) { throw error };
        var zip = new PizZip(content);
        var doc = new window.docxtemplater().loadZip(zip)
        doc.setData(dados);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        } catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({ error: e }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }


        if (extensaoDoArquivoDonwload == '.pdf') {
            var out = doc.getZip().generate({
                    type: "blob",
                    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                }) //Output the document using Data-URI
                // saveAs(out, nomeDoc + ".docx")
        } else {
            var out = doc.getZip().generate({
                base64: true,
                mimeType: "application/base64",
            });
        }




        if (extensaoDoArquivoDonwload == '.pdf') {
            var formData = new FormData();
            formData.append('File', out, nomeDoc + '.docx');
            fluigLoading.show();

            $.ajax({
                url: 'https://v2.convertapi.com/convert/docx/to/pdf?Secret=RnGrOawf866y4IPH',
                data: formData,
                processData: false,
                contentType: false,
                method: 'POST',
                success: function(data) {
                    if ($("#minutaPadrao").val() == "true") {
                        anexaArquivoSolicitacao(nomeDoc, extensaoDoArquivoDonwload, data);
                    }
                }
            })

        } else {
            saveAs(out, nomeDoc + extensaoDoArquivoDonwload);
            fluigLoading.show();
        }

        fluigLoading.show();

    });

    setInterval(() => {
        fluigLoading.hide();
    }, 100);

    loadFile(file, function(error, content) {
        fluigLoading.show();
        if (error) {
            throw error
        };
        var zip = new PizZip(content);
        var doc = new window.docxtemplater().loadZip(zip)
        doc.setData(dados);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        } catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({
                error: e
            }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }

        if (extensaoDoArquivoDonwload == '.pdf') {
            var out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            })

            var formData = new FormData();
            formData.append('File', out, nomeDoc + '.docx');
            fluigLoading.show();

            $.ajax({
                url: 'https://v2.convertapi.com/convert/docx/to/pdf?Secret=tARZsYSBCTlQ9wtE',
                data: formData,
                processData: false,
                contentType: false,
                method: 'POST',
                success: function(data) {

                }
            })
        } else {
            var out = doc.getZip().generate({
                base64: true,
                mimeType: "application/base64",
            });

            var linkSource = "data:application/pdf;base64," + out;
            var downloadLink = document.createElement("a");
            var fileName = nomeDoc + extensaoDoArquivoDonwload;

            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            fluigLoading.show();
        }

        fluigLoading.show();

    });

    setInterval(() => {
        fluigLoading.hide();
    }, 100);

}

function anexaArquivoSolicitacao(nomeDoc, extensaoDoArquivoDonwload, data) {

    var dadosSolicitacao = {
        nomeAnexo: nomeDoc + extensaoDoArquivoDonwload,
        numSolicitacao: $('#codSolicitacao').val(),
        userName: 'integrador.fluig@oncoclinicas.com',
        password: 'hUbust*7',
        userId: 'imwn2dyhbuywfa0f1522083830483'
    }

    var xmlAnexo = '';
    xmlAnexo += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">';
    xmlAnexo += '  <soapenv:Header/>';
    xmlAnexo += '  <soapenv:Body>';
    xmlAnexo += '     <ws:saveAndSendTaskClassic>';
    xmlAnexo += '         <username>' + dadosSolicitacao.userName + '</username>';
    xmlAnexo += '         <password>' + dadosSolicitacao.password + '</password>';
    xmlAnexo += '         <companyId>1</companyId>';
    xmlAnexo += '         <processInstanceId>' + dadosSolicitacao.numSolicitacao + '</processInstanceId>';
    xmlAnexo += '         <choosedState>5</choosedState>';
    xmlAnexo += '         <colleagueIds></colleagueIds>';
    xmlAnexo += '         <comments/>';
    xmlAnexo += '         <userId>' + dadosSolicitacao.userId + '</userId>';
    xmlAnexo += '         <completeTask>false</completeTask>';
    xmlAnexo += '         <attachments>';
    xmlAnexo += '            <item>';
    xmlAnexo += '               <attachmentSequence>0</attachmentSequence>';
    xmlAnexo += '               <attachments>';
    xmlAnexo += '                    <fileName>' + dadosSolicitacao.nomeAnexo + '</fileName>';
    if (extensaoDoArquivoDonwload == '.pdf') {
        xmlAnexo += '                    <filecontent>' + data.Files[0].FileData + '</filecontent>';
    } else {
        xmlAnexo += '                    <filecontent>' + data + '</filecontent>';
    }

    xmlAnexo += '               </attachments>';
    xmlAnexo += '               <companyId>1</companyId>';
    xmlAnexo += '               <description>' + dadosSolicitacao.nomeAnexo + '</description>';
    xmlAnexo += '               <processInstanceId>' + dadosSolicitacao.numSolicitacao + '</processInstanceId>';
    xmlAnexo += '           </item>';
    xmlAnexo += '        </attachments>';
    xmlAnexo += '        <cardData></cardData>';
    xmlAnexo += '        <appointment></appointment>';
    xmlAnexo += '        <managerMode>true</managerMode>';
    xmlAnexo += '        <threadSequence>0</threadSequence>';
    xmlAnexo += '    </ws:saveAndSendTaskClassic>';
    xmlAnexo += ' </soapenv:Body>';
    xmlAnexo += ' </soapenv:Envelope>';

    // Convertendo para XML, para facilitar a manipulação
    var parser = new DOMParser();
    var xmlRequest = parser.parseFromString(xmlAnexo, "text/xml");

    // Enviando a requisição
    parent.WCMAPI.Create({
        url: window.location.origin + '/webdesk/ECMWorkflowEngineService?wsdl',
        contentType: 'text/xml',
        dataType: 'xml',
        data: xmlRequest,
        success: function() {
            FLUIGC.toast({
                title: '',
                message: 'Contrato anexado com sucesso',
                type: 'success'
            });


        },
        error: function(msg) {
            console.log('ERRO AO ANEXAR ARQUIVO')
            console.log(msg);
        }
    });

    setInterval(() => {
        parent.window.location.reload();
    }, 3000);
}

function formatCgc(cgc) {
    if (cgc != null && cgc != undefined) {
        if (cgc.length <= 11) {
            cgc = cgc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3\-\$4")
        } else {
            cgc = cgc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3\/\$4\-\$5");
        }
    }
    return cgc
}

function localPrestacaoSer(idLocal) {
    if (idLocal == 1) {
        return "Contratante";
    } else if (idLocal == 2) {
        return "Contratada";
    } else if (idLocal == 3) {
        return "Contratante e Contratada";
    }
}

function getMesExtenso(mes) {
    var arrayMes = new Array(12);
    arrayMes[0] = "Janeiro";
    arrayMes[1] = "Fevereiro";
    arrayMes[2] = "Março";
    arrayMes[3] = "Abril";
    arrayMes[4] = "Maio";
    arrayMes[5] = "Junho";
    arrayMes[6] = "Julho";
    arrayMes[7] = "Agosto";
    arrayMes[8] = "Setembro";
    arrayMes[9] = "Outubro";
    arrayMes[10] = "Novembro";
    arrayMes[11] = "Dezembro";

    return arrayMes[mes];
}

function getDiaExtenso(dia) {
    var arrayDia = new Array(7);
    arrayDia[0] = "Domingo";
    arrayDia[1] = "Segunda";
    arrayDia[2] = "Terça";
    arrayDia[3] = "Quarta";
    arrayDia[4] = "Quinta";
    arrayDia[5] = "Sexta";
    arrayDia[6] = "Sábado";

    return arrayDia[dia];
}

function unidadeVigenciaDesc(idVigencia) {
    if (idVigencia == 1) {
        return "Dias";
    } else if (idVigencia == 2) {
        return "Meses";
    } else if (idVigencia == 3) {
        return "Anos";
    } else if (idVigencia == 4) {
        return "Indeterminado";
    }
}

function getNomeBanco(cod) {
    var nomeBanco;
    $.ajax({
        type: "get",
        dataType: 'json',
        url: 'https://www.pagueveloz.com.br/api/v1/Bancos?codigo=' + cod,
        async: false,
        contentType: 'application/json; charset=utf-8',
    }).done(function(data) {
        if (data.status != 'ERROR') {
            nomeBanco = data.Nome;
            //console.log(nomeBanco);
        } else {
            //console.log('ERRO');
            nomeBanco = "";
        }
    })
    return nomeBanco;
}

function cep(d) {
    d = d.replace(/\D/g, "");
    d = d.replace(/^(\d{5})(\d)/, "$1-$2");
    return d;
}

function docGED(pastaPai, tipoDoc) {
    var origem = window.location.origin;
    var docGED = {
        versao: '',
        file: ''
    }

    $.ajax({
        type: "get",
        dataType: 'json',
        url: origem + '/api/public/ecm/document/listDocumentWithChildren/' + pastaPai,
        async: false,
        contentType: 'application/json; charset=utf-8',
    }).done(function(data) {
        for (var i = 0; i < data.content[0].children.length; i++) {
            if (data.content[0].children[i].description == tipoDoc) {
                var idDoc = data.content[0].children[i].children[0].id;
                docGED.versao = data.content[0].children[i].children[0].version;
                $.ajax({
                    async: false,
                    type: "GET",
                    dataType: 'json',
                    url: origem + '/api/public/2.0/documents/getDownloadURL/' + idDoc,
                }).done(function(doc) {
                    docGED.file = doc.content;
                })
            }
        }
    })
    return docGED;
}

function Extenso(vlr) {

    var Num = parseFloat(vlr);
    if (vlr == 0) {
        return "zero";
    } else {

        var inteiro = parseInt(vlr);; // parte inteira do valor
        if (inteiro < 1000000000000000) {

            var resto = Num.toFixed(2) - inteiro.toFixed(2); // parte fracionária do valor
            resto = resto.toFixed(2)
            var vlrS = inteiro.toString();

            var cont = vlrS.length;
            var extenso = "";
            var auxnumero;
            var auxnumero2;
            var auxnumero3;

            var unidade = ["", "um", "dois", "três", "quatro", "cinco",
                "seis", "sete", "oito", "nove", "dez", "onze",
                "doze", "treze", "quatorze", "quinze", "dezesseis",
                "dezessete", "dezoito", "dezenove"
            ];

            var centena = ["", "cento", "duzentos", "trezentos",
                "quatrocentos", "quinhentos", "seiscentos",
                "setecentos", "oitocentos", "novecentos"
            ];

            var dezena = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
                "sessenta", "setenta", "oitenta", "noventa"
            ];

            var qualificaS = ["reais", "mil", "milhão", "bilhão", "trilhão"];
            var qualificaP = ["reais", "mil", "milhões", "bilhões", "trilhões"];

            for (var i = cont; i > 0; i--) {
                var verifica1 = "";
                var verifica2 = 0;
                var verifica3 = 0;
                auxnumero2 = "";
                auxnumero3 = "";
                auxnumero = 0;
                auxnumero2 = vlrS.substr(cont - i, 1);
                auxnumero = parseInt(auxnumero2);


                if ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2)) {
                    auxnumero2 = vlrS.substr(cont - i, 2);
                    auxnumero = parseInt(auxnumero2);
                }

                if ((i == 15) || (i == 12) || (i == 9) || (i == 6) || (i == 3)) {
                    extenso = extenso + centena[auxnumero];
                    auxnumero2 = vlrS.substr(cont - i + 1, 1)
                    auxnumero3 = vlrS.substr(cont - i + 2, 1)

                    if ((auxnumero2 != "0") || (auxnumero3 != "0"))
                        extenso += " e ";

                } else

                if (auxnumero > 19) {
                    auxnumero2 = vlrS.substr(cont - i, 1);
                    auxnumero = parseInt(auxnumero2);
                    extenso = extenso + dezena[auxnumero];
                    auxnumero3 = vlrS.substr(cont - i + 1, 1)

                    if ((auxnumero3 != "0") && (auxnumero2 != "1"))
                        extenso += " e ";
                } else if ((auxnumero <= 19) && (auxnumero > 9) && ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2))) {
                    extenso = extenso + unidade[auxnumero];
                } else if ((auxnumero < 10) && ((i == 13) || (i == 10) || (i == 7) || (i == 4) || (i == 1))) {
                    auxnumero3 = vlrS.substr(cont - i - 1, 1);
                    if ((auxnumero3 != "1") && (auxnumero3 != ""))
                        extenso = extenso + unidade[auxnumero];
                }

                if (i % 3 == 1) {
                    verifica3 = cont - i;
                    if (verifica3 == 0)
                        verifica1 = vlrS.substr(cont - i, 1);

                    if (verifica3 == 1)
                        verifica1 = vlrS.substr(cont - i - 1, 2);

                    if (verifica3 > 1)
                        verifica1 = vlrS.substr(cont - i - 2, 3);

                    verifica2 = parseInt(verifica1);

                    if (i == 13) {
                        if (verifica2 == 1) {
                            extenso = extenso + " " + qualificaS[4] + " ";
                        } else if (verifica2 != 0) {
                            extenso = extenso + " " + qualificaP[4] + " ";
                        }
                    }
                    if (i == 10) {
                        if (verifica2 == 1) {
                            extenso = extenso + " " + qualificaS[3] + " ";
                        } else if (verifica2 != 0) {
                            extenso = extenso + " " + qualificaP[3] + " ";
                        }
                    }
                    if (i == 7) {
                        if (verifica2 == 1) {
                            extenso = extenso + " " + qualificaS[2] + " ";
                        } else if (verifica2 != 0) {
                            extenso = extenso + " " + qualificaP[2] + " ";
                        }
                    }
                    if (i == 4) {
                        if (verifica2 == 1) {
                            extenso = extenso + " " + qualificaS[1] + " ";
                        } else if (verifica2 != 0) {
                            extenso = extenso + " " + qualificaP[1] + " ";
                        }
                    }
                    if (i == 1) {
                        if (verifica2 == 1) {
                            extenso = extenso + " " + qualificaS[0] + " ";
                        } else {
                            extenso = extenso + " " + qualificaP[0] + " ";
                        }
                    }
                }
            }
            resto = resto * 100;
            var aexCent = 0;
            if (resto <= 19 && resto > 0)
                extenso += " e " + unidade[resto] + " Centavos";
            if (resto > 19) {
                aexCent = parseInt(resto / 10);

                extenso += " e " + dezena[aexCent]
                resto = resto - (aexCent * 10);

                if (resto != 0)
                    extenso += " e " + unidade[resto] + " Centavos";
                else extenso += " Centavos";
            }

            return extenso;
        } else {
            return "";
        }
    }
}

function NumExtenso(vlr) {

    var Num = parseFloat(vlr);
    if (vlr == 0) {
        return "zero";
    } else {

        var inteiro = parseInt(vlr);; // parte inteira do valor
        if (inteiro < 1000000000000000) {

            var resto = Num.toFixed(2) - inteiro.toFixed(2); // parte fracionária do valor
            resto = resto.toFixed(2)
            var vlrS = inteiro.toString();

            var cont = vlrS.length;
            var extenso = "";
            var auxnumero;
            var auxnumero2;
            var auxnumero3;

            var unidade = ["", "um", "dois", "três", "quatro", "cinco",
                "seis", "sete", "oito", "nove", "dez", "onze",
                "doze", "treze", "quatorze", "quinze", "dezesseis",
                "dezessete", "dezoito", "dezenove"
            ];

            var centena = ["", "cento", "duzentos", "trezentos",
                "quatrocentos", "quinhentos", "seiscentos",
                "setecentos", "oitocentos", "novecentos"
            ];

            var dezena = ["", "", "vinte", "trinta", "quarenta", "cinquenta",
                "sessenta", "setenta", "oitenta", "noventa"
            ];

            for (var i = cont; i > 0; i--) {
                var verifica1 = "";
                var verifica2 = 0;
                var verifica3 = 0;
                auxnumero2 = "";
                auxnumero3 = "";
                auxnumero = 0;
                auxnumero2 = vlrS.substr(cont - i, 1);
                auxnumero = parseInt(auxnumero2);


                if ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2)) {
                    auxnumero2 = vlrS.substr(cont - i, 2);
                    auxnumero = parseInt(auxnumero2);
                }

                if ((i == 15) || (i == 12) || (i == 9) || (i == 6) || (i == 3)) {
                    extenso = extenso + centena[auxnumero];
                    auxnumero2 = vlrS.substr(cont - i + 1, 1)
                    auxnumero3 = vlrS.substr(cont - i + 2, 1)

                    if ((auxnumero2 != "0") || (auxnumero3 != "0"))
                        extenso += " e ";

                } else

                if (auxnumero > 19) {
                    auxnumero2 = vlrS.substr(cont - i, 1);
                    auxnumero = parseInt(auxnumero2);
                    extenso = extenso + dezena[auxnumero];
                    auxnumero3 = vlrS.substr(cont - i + 1, 1)

                    if ((auxnumero3 != "0") && (auxnumero2 != "1"))
                        extenso += " e ";
                } else if ((auxnumero <= 19) && (auxnumero > 9) && ((i == 14) || (i == 11) || (i == 8) || (i == 5) || (i == 2))) {
                    extenso = extenso + unidade[auxnumero];
                } else if ((auxnumero < 10) && ((i == 13) || (i == 10) || (i == 7) || (i == 4) || (i == 1))) {
                    auxnumero3 = vlrS.substr(cont - i - 1, 1);
                    if ((auxnumero3 != "1") && (auxnumero3 != ""))
                        extenso = extenso + unidade[auxnumero];
                }

                if (i % 3 == 1) {
                    verifica3 = cont - i;
                    if (verifica3 == 0)
                        verifica1 = vlrS.substr(cont - i, 1);

                    if (verifica3 == 1)
                        verifica1 = vlrS.substr(cont - i - 1, 2);

                    if (verifica3 > 1)
                        verifica1 = vlrS.substr(cont - i - 2, 3);

                    verifica2 = parseInt(verifica1);

                    if (i == 13) {
                        if (verifica2 == 1) {
                            extenso = extenso;
                        } else if (verifica2 != 0) {
                            extenso = extenso;
                        }
                    }
                    if (i == 10) {
                        if (verifica2 == 1) {
                            extenso = extenso;
                        } else if (verifica2 != 0) {
                            extenso = extenso;
                        }
                    }
                    if (i == 7) {
                        if (verifica2 == 1) {
                            extenso = extenso;
                        } else if (verifica2 != 0) {
                            extenso = extenso;
                        }
                    }
                    if (i == 4) {
                        if (verifica2 == 1) {
                            extenso = extenso;
                        } else if (verifica2 != 0) {
                            extenso = extenso;
                        }
                    }
                    if (i == 1) {
                        if (verifica2 == 1) {
                            extenso = extenso;
                        } else {
                            extenso = extenso;
                        }
                    }
                }
            }
            resto = resto * 100;
            var aexCent = 0;
            if (resto <= 19 && resto > 0)
                extenso += " e " + unidade[resto] + " Centavos";
            if (resto > 19) {
                aexCent = parseInt(resto / 10);

                extenso += " e " + dezena[aexCent]
                resto = resto - (aexCent * 10);

                if (resto != 0)
                    extenso += " e " + unidade[resto] + " Centavos";
                else extenso += " Centavos";
            }

            return extenso;
        } else {
            return "";
        }
    }
}