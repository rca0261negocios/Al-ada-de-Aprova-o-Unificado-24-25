function servicetask355(attempt, message) {
       // Validando qtde mínima de anexo
       var anexosDosContratos = hAPI.listAttachments();
       var anexos = parseInt(hAPI.getCardValue("anexos"));
       var qtdeAnexos = anexosDosContratos.size() - anexos;
   
       // OBTENDO VALORES DOS CAMPOS
       var numProcesso = hAPI.getCardValue('codSolicitacao');
       var nomeRequisitanteCompras = hAPI.getCardValue('nomeSolicitante');
       var idSolicitante = hAPI.getCardValue('idSolicitante');
       var dataRequisitanteCompras = hAPI.getCardValue('dataSolicitacao');
       var filial = hAPI.getCardValue('filial');
       var codFilial = hAPI.getCardValue('codFilial');
       var centroDeCusto = hAPI.getCardValue('centroDeCusto')
       var codCentroCusto = hAPI.getCardValue('codCentroCusto');
       var localEntrega = hAPI.getCardValue('localEntrega');
       var emailContatoSolicitante = hAPI.getCardValue('emailContatSolicitante');
       var telContatSolicitante = hAPI.getCardValue('telContatSolicitante');
       var prioridade = hAPI.getCardValue('prioridade');
       var prioridadeHi = hAPI.getCardValue('prioridadeHidden');
       var dataNecessidade = hAPI.getCardValue('dataNecessidade');
       var sLocalPrestServico = hAPI.getCardValue('sLocalPrestServico');
       var hiddenLocalPrestServico = hAPI.getCardValue('hiddenLocalPrestServico');
       var hideFornecedorExclu = hAPI.getCardValue('hideFornecedorExclu');
       var setRespCompras = hAPI.getCardValue('setRespCompras');
       var infoAdicionaisComp = hAPI.getCardValue('infoAdicionaisComp');
       var codServOuProd = hAPI.getCardValue('codServOuProd');
       var emailSolicitante = hAPI.getCardValue('emailSolicitante');
       var cgcFilial = hAPI.getCardValue('cgcFilial');
       var numeroAdivo = hAPI.getCardValue("numeroAdivo");
       var campoIdentificador = hAPI.getCardValue("filial");
       var tipoCompra = hAPI.getCardValue('tipoCompra');
       var codSolicitacao = '';
   
       if (hAPI.getCardValue('prioridadeHidden') == 'E') {
           codSolicitacao = "2417787";
       } else {
           codSolicitacao = "2417407";
       }
   
       // CAMPOS ATIVIDADE FORM.CONTRATOS
       var indice = hAPI.getCardValue('indice');
       var tipoIndice = hAPI.getCardValue('tipoIndice');
       var rescisaoContrato = hAPI.getCardValue('rescisaoContrato');
       var objetoContrato = hAPI.getCardValue('objetoContrato');
       var unidadeVigencia = hAPI.getCardValue('unidadeVigencia');
       var vigenciaDoContrato = hAPI.getCardValue('vigenciaDoContrato');
       var codTipoContrato = hAPI.getCardValue('codTipoContrato');
       var tipoContrato = hAPI.getCardValue('tipoContrato');
       var contatoComercial = hAPI.getCardValue('contatoComercial');
       var emailComercial = hAPI.getCardValue('emailComercial');
       var telefoneComercial = hAPI.getCardValue('telefoneComercial');
       var valorContrato = hAPI.getCardValue('valorTotalSolicitacao');
       var composicaoPrecos = hAPI.getCardValue('composicaoPrecos');
       var qtdParcelas = hAPI.getCardValue('qtdParcelas');
       var gestorContrato = hAPI.getCardValue('gestorContrato');
       var numPropComercial = hAPI.getCardValue('numPropComercial');
       var dtTermoContrato = hAPI.getCardValue('dtTermoContrato');
       var dtPagamento = hAPI.getCardValue('dtPagamento');
       var codEspeciais = hAPI.getCardValue('codEspeciais');
       var anexo1 = hAPI.getCardValue('anexo1');
       var anexo2 = hAPI.getCardValue('anexo2');
       var anexo3 = hAPI.getCardValue('anexo3');
       var anexo4 = hAPI.getCardValue('anexo4');
       var anexo5 = hAPI.getCardValue('anexo5');
       var anexoOutros = hAPI.getCardValue('anexoOutros');
       var minutaPadrao = (hAPI.getCardValue('hiddenChkMinutaContrato') == "true") ? 'false' : 'true';
   
       // CONDIÇÕES
       var contratoGuardChuva;
       if (hAPI.getCardValue('hideContratoGuardChuva') == "true") {
           contratoGuardChuva = "on";
       } else {
           contratoGuardChuva = "";
       }
       var novoContratoOuAdt;
       if (hAPI.getCardValue('hideNovoContratoOuAdt') == "true") {
           novoContratoOuAdt = "Aditivo";
       } else {
           novoContratoOuAdt = "Novo Contrato";
       }
       var hideReajusteContrato;
       if (hAPI.getCardValue('hideReajusteContrato') == "true") {
           hideReajusteContrato = "1";
       } else {
           hideReajusteContrato = "2";
       }
   
       // OBTENDO O ÚLTIMO NÚMERO DE REGISTRO DO CONTRATO"
       var filtro1 = DatasetFactory.createConstraint("FILIAL", hAPI.getCardValue('codFilial'), hAPI.getCardValue('codFilial'), ConstraintType.MUST);
       var filtro2 = DatasetFactory.createConstraint("EMAIL", "liberaracesso", "liberaracesso", ConstraintType.MUST);
       var filtro3 = DatasetFactory.createConstraint("LOJA", "01", "01", ConstraintType.MUST);
       var constraints = new Array(filtro1, filtro2, filtro3);
       var dsContrato = DatasetFactory.getDataset("ds_contrato", null, constraints, null);
   
       log.info("### dsContrato: " + dsContrato.rowsCount);
   
       var arrayNumeroRG = new Array();
       for (var c = 0; c < dsContrato.rowsCount; c++) {
   
           log.info("### ENTREI NO PRIMEIRO FOR DO DSCONTRATO: " + dsContrato.getValue(c, "NUM_RG"));
   
           if (dsContrato.getValue(c, "NUM_RG") != "") {
               arrayNumeroRG.push(dsContrato.getValue(c, "NUM_RG"));
           }
       }
   
       log.info("### arrayNumeroRG: " + arrayNumeroRG.length);
   
       if (arrayNumeroRG.length == "" || arrayNumeroRG.length == "0") {
           var data = new Date();
           var ano = data.getFullYear();
   
           log.info("### ENTREI NO IF DO NUMERO RG. O ANO É: " + ano);
   
           if (hAPI.getCardValue("hideNovoContratoOuAdt") == "true") {
               hAPI.setCardValue("numRgContrato", ano + "000000000000001-" + hAPI.getCardValue("numeroAdivo"));
               log.info("### hideNovoContratoOuAdt == true ");
           } else {
               hAPI.setCardValue("numRgContrato", ano + "000000000000001");
               log.info("### hideNovoContratoOuAdt == false ");
           }
       } else {
           log.info("### ENTREI NO ELSE DO NUMERO RG.");
   
           var novoNumRgContrato = 0;
   
           // Obtendo o maior número do RG de contrato e somando mais 1
           for (var b = 0; b < arrayNumeroRG.length; b++) {
   
               log.info("### ENTREI NO FOR DOS NUMEROS RG.");
               log.info("### arrayNumeroRG[b]: " + arrayNumeroRG[b]);
               log.info("### novoNumRgContrato: " + novoNumRgContrato);
   
               if (arrayNumeroRG[b] > novoNumRgContrato) {
   
                   log.info("### ENTRE NO arrayNumeroRG[b] É maior que novoNumRgContrato ");
   
                   var geraData = new Date();
                   var anoAtual = geraData.getFullYear();
                   var numeroRgString = arrayNumeroRG[b].toString;
   
                   log.info("### numeroRgString " + numeroRgString);
   
                   if (numeroRgString == 9) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 8) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "0000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 7) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "00000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 6) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "000000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 5) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "0000000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 4) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "00000000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 3) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "000000000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 2) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "0000000000000" + arrayNumeroRG[b] + 1);
                   } else if (numeroRgString == 1) {
                       hAPI.setCardValue("numRgContrato", anoAtual + "00000000000000" + arrayNumeroRG[b] + 1);
                   }
               }
           }
       }
   
       log.info("### Valor aplicado em Numero do contrato: " + hAPI.getCardValue("numRgContrato"));
   
       try {
   
           var workflowEngineServiceProvider = ServiceManager.getServiceInstance("ECMWorkflowEngineService");
           var processAttachmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDtoArray');
           var processTaskAppointmentDtoArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessTaskAppointmentDtoArray');
           var campos = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
           var stringArray = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArray');
           var workflowEngineServiceLocator = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ECMWorkflowEngineServiceService');
           var workflowEngineService = workflowEngineServiceLocator.getWorkflowEngineServicePort();
           var cardData = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
   
           // ATRIBUINDO TODOS ANEXOS NO OBJETO processAttachmentDtoArray
           for (var i = 0; i < anexosDosContratos.size(); i++) {
   
               var doc = anexosDosContratos.get(i);
   
               var nfAttachmentDto = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.ProcessAttachmentDto');
               nfAttachmentDto.setAttachmentSequence(i);
               nfAttachmentDto.setCompanyId(1);
               nfAttachmentDto.setDocumentType(2);
               nfAttachmentDto.setFileName(doc.getDocumentDescription());
               nfAttachmentDto.setDescription(doc.getDocumentDescription());
               nfAttachmentDto.setNewAttach(true);
               nfAttachmentDto.setVersion(1000);
               nfAttachmentDto.setDocumentId(doc.getDocumentId());
   
               var attachment = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.Attachment');
               attachment.setAttach(true);
               attachment.setFileName(doc.getDocumentDescription());
               nfAttachmentDto.getAttachments().add(attachment);
               processAttachmentDtoArray.getItem().add(nfAttachmentDto);
   
           }
   
           // ADICIONANDO OS CAMPOS NO CARDDATA
           var fieldCampo1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo1.getItem().add("nomeUserCompras");
           fieldCampo1.getItem().add(nomeRequisitanteCompras);
           cardData.getItem().add(fieldCampo1);
   
           var fieldCampo2 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo2.getItem().add("codUserCompras");
           fieldCampo2.getItem().add(idSolicitante);
           cardData.getItem().add(fieldCampo2);
   
           var fieldCampo3 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo3.getItem().add("dataCompras");
           fieldCampo3.getItem().add(dataRequisitanteCompras);
           cardData.getItem().add(fieldCampo3);
   
           var fieldCampo4 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo4.getItem().add("numSolicitacao");
           fieldCampo4.getItem().add(numProcesso);
           cardData.getItem().add(fieldCampo4);
   
           var fieldCampo5 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo5.getItem().add("codFilialFluig");
           fieldCampo5.getItem().add(codFilial);
           cardData.getItem().add(fieldCampo5);
   
           var fieldCampo6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo6.getItem().add("filial");
           fieldCampo6.getItem().add(filial);
           cardData.getItem().add(fieldCampo6);
   
           var fieldCampo7 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo7.getItem().add("cpCc");
           fieldCampo7.getItem().add(centroDeCusto);
           cardData.getItem().add(fieldCampo7);
   
           var fieldCampo8 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo8.getItem().add("CTT_CUSTO");
           fieldCampo8.getItem().add(codCentroCusto);
           cardData.getItem().add(fieldCampo8);
   
           var fieldCampo9 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo9.getItem().add("tipoContratoCompras");
           fieldCampo9.getItem().add(novoContratoOuAdt);
           cardData.getItem().add(fieldCampo9);
   
           var fieldCampo20 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo20.getItem().add("sPrioridadeProduto");
           fieldCampo20.getItem().add(prioridadeHi);
           cardData.getItem().add(fieldCampo20);
   
           var fieldCampo24 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo24.getItem().add("dtNecessidadeProduto");
           fieldCampo24.getItem().add(dataNecessidade);
           cardData.getItem().add(fieldCampo24);
   
           // INFORMAÇÕES DO CONTRATO
           var fieldCampo28 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo28.getItem().add("reajusteContrato");
           fieldCampo28.getItem().add(hideReajusteContrato);
           cardData.getItem().add(fieldCampo28);
   
           var fieldCampo29 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo29.getItem().add("indice");
           fieldCampo29.getItem().add(indice);
           cardData.getItem().add(fieldCampo29);
   
           var fieldCampo30 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo30.getItem().add("rescisaoContrato");
           fieldCampo30.getItem().add(rescisaoContrato);
           cardData.getItem().add(fieldCampo30);
   
           var fieldCampo31 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo31.getItem().add("objetoContrato");
           fieldCampo31.getItem().add(objetoContrato);
           cardData.getItem().add(fieldCampo31);
   
           var fieldCampo32 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo32.getItem().add("unidadeVigencia");
           fieldCampo32.getItem().add(unidadeVigencia);
           cardData.getItem().add(fieldCampo32);
   
           var fieldCampo33 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo33.getItem().add("vigenciaDoContrato");
           fieldCampo33.getItem().add(vigenciaDoContrato);
           cardData.getItem().add(fieldCampo33);
   
           var fieldCampo34 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo34.getItem().add("codTipoContrato");
           fieldCampo34.getItem().add(codTipoContrato);
           cardData.getItem().add(fieldCampo34);
   
           var fieldCampo35 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo35.getItem().add("contatoComercial");
           fieldCampo35.getItem().add(contatoComercial);
           cardData.getItem().add(fieldCampo35);
   
           var fieldCampo36 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo36.getItem().add("emailComercial");
           fieldCampo36.getItem().add(emailComercial);
           cardData.getItem().add(fieldCampo36);
   
           var fieldCampo37 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo37.getItem().add("telefoneComercial");
           fieldCampo37.getItem().add(telefoneComercial);
           cardData.getItem().add(fieldCampo37);
   
           var fieldCampo38 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo38.getItem().add("valorTotalServico");
           fieldCampo38.getItem().add(valorContrato);
           cardData.getItem().add(fieldCampo38);
   
           var fieldCampo39 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo39.getItem().add("referenciaEntrega");
           fieldCampo39.getItem().add(localEntrega);
           cardData.getItem().add(fieldCampo39);
   
           var fieldCampo40 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo40.getItem().add("sLocalPrestServico");
           fieldCampo40.getItem().add(hiddenLocalPrestServico);
           cardData.getItem().add(fieldCampo40);
   
           var fieldCampo43 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo43.getItem().add("isContratoGuardChuva");
           fieldCampo43.getItem().add(contratoGuardChuva);
           cardData.getItem().add(fieldCampo43);
   
           var fieldCampo44 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo44.getItem().add("emailContatSolicitante");
           fieldCampo44.getItem().add(emailContatoSolicitante);
           cardData.getItem().add(fieldCampo44);
   
           var fieldCampo45 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo45.getItem().add("telContatSolicitante");
           fieldCampo45.getItem().add(telContatSolicitante);
           cardData.getItem().add(fieldCampo45);
   
           var fieldCampo477 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo477.getItem().add("hiddenPrioridade");
           fieldCampo477.getItem().add(prioridadeHi);
           cardData.getItem().add(fieldCampo477);
   
           var fieldCampo476 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo476.getItem().add("COD_SOLICITACAO");
           fieldCampo476.getItem().add(codSolicitacao);
           cardData.getItem().add(fieldCampo476);
   
           var fieldCampo48 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo48.getItem().add("hiddenLocalPrestServico");
           fieldCampo48.getItem().add(hiddenLocalPrestServico);
           cardData.getItem().add(fieldCampo48);
   
           var fieldCampo55 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo55.getItem().add("numRgContrato");
           fieldCampo55.getItem().add(hAPI.getCardValue("numRgContrato"));
           cardData.getItem().add(fieldCampo55);
   
           var fieldCampo56 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo56.getItem().add("tipoContrato");
           fieldCampo56.getItem().add(tipoContrato);
           cardData.getItem().add(fieldCampo56);
   
           var fieldCampo57 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo57.getItem().add("tipoIndice");
           fieldCampo57.getItem().add(tipoIndice);
           cardData.getItem().add(fieldCampo57);
   
           var fieldCampo58 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo58.getItem().add("setRespCompras");
           fieldCampo58.getItem().add(setRespCompras);
           cardData.getItem().add(fieldCampo58);
   
           var fieldCampo59 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo59.getItem().add("infoAdicionaisComp");
           fieldCampo59.getItem().add(infoAdicionaisComp);
           cardData.getItem().add(fieldCampo59);
   
           var fieldCampo60 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo60.getItem().add("codServOuProd");
           fieldCampo60.getItem().add(codServOuProd);
           cardData.getItem().add(fieldCampo60);
   
           var fieldCampo61 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo61.getItem().add("emailSolicitante");
           fieldCampo61.getItem().add(emailSolicitante);
           cardData.getItem().add(fieldCampo61);
   
           var fieldCampo62 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo62.getItem().add("composicaoPrecos");
           fieldCampo62.getItem().add(composicaoPrecos);
           cardData.getItem().add(fieldCampo62);
   
           var fieldCampo63 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo63.getItem().add("qtdParcelas");
           fieldCampo63.getItem().add(qtdParcelas);
           cardData.getItem().add(fieldCampo63);
   
           var fieldCampo64 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo64.getItem().add("gestorContrato");
           fieldCampo64.getItem().add(gestorContrato);
           cardData.getItem().add(fieldCampo64);
   
           var fieldCampo66 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo66.getItem().add("numPropComercial");
           fieldCampo66.getItem().add(numPropComercial);
           cardData.getItem().add(fieldCampo66);
   
           var fieldCampo67 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo67.getItem().add("dtTermoContrato");
           fieldCampo67.getItem().add(dtTermoContrato);
           cardData.getItem().add(fieldCampo67);
   
           var fieldCampo68 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo68.getItem().add("dtPagamento");
           fieldCampo68.getItem().add(dtPagamento);
           cardData.getItem().add(fieldCampo68);
   
           var fieldCampo69 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo69.getItem().add("codEspeciais");
           fieldCampo69.getItem().add(codEspeciais);
           cardData.getItem().add(fieldCampo69);
   
           var fieldCampo70 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo70.getItem().add("anexo1");
           fieldCampo70.getItem().add(anexo1);
           cardData.getItem().add(fieldCampo70);
   
           var fieldCampo71 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo71.getItem().add("anexo2");
           fieldCampo71.getItem().add(anexo2);
           cardData.getItem().add(fieldCampo71);
   
           var fieldCampo72 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo72.getItem().add("anexo3");
           fieldCampo72.getItem().add(anexo3);
           cardData.getItem().add(fieldCampo72);
   
           var fieldCampo73 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo73.getItem().add("anexo4");
           fieldCampo73.getItem().add(anexo4);
           cardData.getItem().add(fieldCampo73);
   
           var fieldCampo74 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo74.getItem().add("anexo5");
           fieldCampo74.getItem().add(anexo5);
           cardData.getItem().add(fieldCampo74);
   
           var fieldCampo75 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo75.getItem().add("anexoOutros");
           fieldCampo75.getItem().add(anexoOutros);
           cardData.getItem().add(fieldCampo75);
   
           var fieldCampo76 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo76.getItem().add("cgcFilial");
           fieldCampo76.getItem().add(cgcFilial);
           cardData.getItem().add(fieldCampo76);
   
           var fieldCampo77 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo77.getItem().add("numeroAdivo");
           fieldCampo77.getItem().add(numeroAdivo);
           cardData.getItem().add(fieldCampo77);
   
           var fieldCampo78 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo78.getItem().add("campoIdentificador");
           fieldCampo78.getItem().add(campoIdentificador);
           cardData.getItem().add(fieldCampo78);
   
           var fieldCampo79 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
           fieldCampo79.getItem().add("minutaPadrao");
           fieldCampo79.getItem().add(minutaPadrao);
           cardData.getItem().add(fieldCampo79);
   
           // TRANTANDO DE TODAS AS TABELAS PAIXFILHO DO PROCESSO 
           var campos = hAPI.getCardData(getValue("WKNumProces")).keySet().toArray();
           var arrayCodFornVencedor = new Array();
   
           log.info("#### arrayCodFornVencedor: " + arrayCodFornVencedor);
           log.info("#### TODOS OS CAMPOS: " + campos);
   
           for (var x in campos) {
               field = campos[x];
   
               log.info("#### FIELD: " + field);
   
               // TABELA PRODUTOS
               if (field.indexOf("codProd___") > -1) {
                   index = field.split("___")[1];
   
                   log.info("#### INDEX PRODUTO: " + index);
   
                   // Add produtos no cardDta
                   var fieldCampo10 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo10.getItem().add("txtCodItemProduto___" + index);
                   fieldCampo10.getItem().add(hAPI.getCardValue('codProd___' + index));
                   cardData.getItem().add(fieldCampo10);
   
                   var fieldCampo11 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo11.getItem().add("txtDescProduto___" + index);
                   fieldCampo11.getItem().add(hAPI.getCardValue('nomeProd___' + index));
                   cardData.getItem().add(fieldCampo11);
   
                   var fieldCampo12 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo12.getItem().add("txtUnidMedProduto___" + index);
                   fieldCampo12.getItem().add(hAPI.getCardValue('unidadeProd___' + index));
                   cardData.getItem().add(fieldCampo12);
   
                   var fieldCampo13 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo13.getItem().add("txtQuantidadeProduto___" + index);
                   fieldCampo13.getItem().add(hAPI.getCardValue('qtdProd___' + index));
                   cardData.getItem().add(fieldCampo13);
   
                   var fieldCampo14 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo14.getItem().add("txtObsProduto___" + index);
                   fieldCampo14.getItem().add(hAPI.getCardValue('infoAdicionais___' + index));
                   cardData.getItem().add(fieldCampo14);
   
                   var fieldCampo15 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo15.getItem().add("txtSeqItemProduto___" + index);
                   fieldCampo15.getItem().add(hAPI.getCardValue('itemProd___' + index));
                   cardData.getItem().add(fieldCampo15);
   
                   var fieldCampo41 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampo41.getItem().add("txtPrecoProduto___" + index);
                   fieldCampo41.getItem().add(hAPI.getCardValue('valorProd___' + index));
                   cardData.getItem().add(fieldCampo41);
   
                   // Fim SLA
   
                   var codFornVencedorProd = hAPI.getCardValue('codFornVencedorProd___' + index);
                   log.info("#### codFornVencedorProd: " + codFornVencedorProd);
                   arrayCodFornVencedor.push(codFornVencedorProd);
               }
   
               // TABELA FORNECEDOR
               if (field.indexOf("codForn___") > -1) {
                   index = field.split("___")[1];
   
                   log.info("#### TABELA FORNECEDOR + CODIGO DO FORNECEDOR VENCEDOR: " + arrayCodFornVencedor);
                   log.info("#### hAPI.getCardValue('codForn___' + index) " + hAPI.getCardValue('codForn___' + index));
   
                   for (var j in arrayCodFornVencedor) {
                       codigoFornecedor = arrayCodFornVencedor[j];
   
                       log.info("#### ENTREI NO ARRAY GRAÇAS A DEUS: " + codigoFornecedor);
   
                       if (codigoFornecedor == hAPI.getCardValue('codForn___' + index)) {
   
                           log.info("#### INDEX FORNECEDOR: " + index);
   
                           // Add Fornecedor no CardData
                           var fieldCampo16 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo16.getItem().add("codFornecedorProtheus___" + index);
                           fieldCampo16.getItem().add(hAPI.getCardValue('codForn___' + index));
                           cardData.getItem().add(fieldCampo16);
   
                           var fieldCampo17 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo17.getItem().add("nomeFornecedor___" + index);
                           fieldCampo17.getItem().add(hAPI.getCardValue('nomeForn___' + index));
                           cardData.getItem().add(fieldCampo17);
   
                           var fieldCampo18 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo18.getItem().add("codLojaFornecedor___" + index);
                           fieldCampo18.getItem().add(hAPI.getCardValue('lojaForn___' + index));
                           cardData.getItem().add(fieldCampo18);
   
                           var fieldCampo19 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo19.getItem().add("cnpjFornecedor___" + index);
                           fieldCampo19.getItem().add(hAPI.getCardValue('cnpjForn___' + index));
                           cardData.getItem().add(fieldCampo19);
   
                           var fieldCampo21 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo21.getItem().add("codCondPagamento___" + index);
                           fieldCampo21.getItem().add(hAPI.getCardValue('codCondForn___' + index));
                           cardData.getItem().add(fieldCampo21);
   
                           var fieldCampo22 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo22.getItem().add("condicaoPgto___" + index);
                           fieldCampo22.getItem().add(hAPI.getCardValue('condForn___' + index));
                           cardData.getItem().add(fieldCampo22);
   
                           var fieldCampo23 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo23.getItem().add("formaPagamento___" + index);
                           fieldCampo23.getItem().add(hAPI.getCardValue('formaForn___' + index));
                           cardData.getItem().add(fieldCampo23);
   
                           var fieldCampo25 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo25.getItem().add("prazoEntrega___" + index);
                           fieldCampo25.getItem().add(hAPI.getCardValue('prazoForn___' + index));
                           cardData.getItem().add(fieldCampo25);
   
                           var fieldCampo26 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo26.getItem().add("frete___" + index);
                           fieldCampo26.getItem().add(hAPI.getCardValue('tipoFreteForn___' + index));
                           cardData.getItem().add(fieldCampo26);
   
                           var fieldCampo27 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo27.getItem().add("VlrFrete___" + index);
                           fieldCampo27.getItem().add(hAPI.getCardValue('valorFreForn___' + index));
                           cardData.getItem().add(fieldCampo27);
   
                           var fieldCampo42 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo42.getItem().add("fornecedorProtheus___" + index);
                           fieldCampo42.getItem().add(hAPI.getCardValue('codForn___' + index));
                           cardData.getItem().add(fieldCampo42);
   
                           var fieldCampo46 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo46.getItem().add("formaFornHidden___" + index);
                           fieldCampo46.getItem().add(hAPI.getCardValue('formaFornHidden___' + index));
                           cardData.getItem().add(fieldCampo46);
   
                           var fieldCampo49 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo49.getItem().add("bancoForn___" + index);
                           fieldCampo49.getItem().add(hAPI.getCardValue('bancoForn___' + index));
                           cardData.getItem().add(fieldCampo49);
   
                           var fieldCampo50 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo50.getItem().add("agenciaForn___" + index);
                           fieldCampo50.getItem().add(hAPI.getCardValue('agenciaForn___' + index));
                           cardData.getItem().add(fieldCampo50);
   
                           var fieldCampo51 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo51.getItem().add("contaForn___" + index);
                           fieldCampo51.getItem().add(hAPI.getCardValue('contaForn___' + index));
                           cardData.getItem().add(fieldCampo51);
   
                           var fieldCampo52 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                           fieldCampo52.getItem().add("dvAgenciaForn___" + index);
                           fieldCampo52.getItem().add(hAPI.getCardValue('dvAgenciaForn___' + index));
                           cardData.getItem().add(fieldCampo52);
                       }
                   }
               }
   
               // TABELA FILIAL PARA CONTRATOS GUARDA-CHUVAS
               if (contratoGuardChuva == "on" && field.indexOf("filialGuardChu___") > -1) {
                   index = field.split("filialGuardChu___")[1];
   
                   log.info("#### INDEX FILIAL GUARDA-CHUVA: " + index);
   
                   var fieldCampoGuardaChuva1 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva1.getItem().add("filialGuardChu___" + index);
                   fieldCampoGuardaChuva1.getItem().add(hAPI.getCardValue('filialGuardChu___' + index));
                   cardData.getItem().add(fieldCampoGuardaChuva1);
   
                   var fieldCampoGuardaChuva2 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva2.getItem().add("cnpjFilial___" + index);
                   fieldCampoGuardaChuva2.getItem().add(hAPI.getCardValue('cnpjFilial___' + index));
                   cardData.getItem().add(fieldCampoGuardaChuva2);
   
                   var fieldCampoGuardaChuva3 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva3.getItem().add("enderecoFilial___" + index);
                   fieldCampoGuardaChuva3.getItem().add(hAPI.getCardValue('enderecoFilial___' + index));
                   cardData.getItem().add(fieldCampoGuardaChuva3);
   
                   var fieldCampoGuardaChuva4 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva4.getItem().add("valorUnitario___" + index);
                   fieldCampoGuardaChuva4.getItem().add(formatMoney(parseFloat(removeMascaraMonetaria(hAPI.getCardValue('valorTotalSolicitacao')) * (parseInt(hAPI.getCardValue('valorUnitario___' + index)) / 100))));
                   cardData.getItem().add(fieldCampoGuardaChuva4);
   
                   var fieldCampoGuardaChuva5 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva5.getItem().add("codFilial___" + index);
                   fieldCampoGuardaChuva5.getItem().add(hAPI.getCardValue('codFilialGuardChu___' + index));
                   cardData.getItem().add(fieldCampoGuardaChuva5);
   
                   var fieldCampoGuardaChuva6 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva6.getItem().add("hideContratoGuardChuva");
                   fieldCampoGuardaChuva6.getItem().add(hAPI.getCardValue('hideContratoGuardChuva'));
                   cardData.getItem().add(fieldCampoGuardaChuva6);
   
                   var fieldCampoGuardaChuva7 = workflowEngineServiceProvider.instantiate('br.com.oncoclinicas.fluig.StringArrayArray');
                   fieldCampoGuardaChuva7.getItem().add("valorPercent___" + index);
                   fieldCampoGuardaChuva7.getItem().add(hAPI.getCardValue("valorUnitario___" + index));
                   cardData.getItem().add(fieldCampoGuardaChuva7);
               }
           }
   
           // SERVIÇO DO STARTPROCESS
           var rest = workflowEngineService.startProcess("integrador.fluig@oncoclinicas.com",
               "hUbust*7",
               1,               
               "novoContratoOuAditivoHospitais",
               0,
               stringArray,
               "Solicitação iniciada através do Fluxo de Compras Diversos (Nº " + numProcesso + ").",
               idSolicitante,
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
   
               log.info("### key formulários contratos: " + key);
               log.info("####### Número da Solicitação aberta em contratos: " + value);
   
               if (key == "iProcess") {
                   iProcess = value;
   
                   log.info("####### iProcess: " + iProcess);
                   hAPI.setCardValue('numSolicitAbertaFilho', value);
                   log.info("####### numSolicitAbertaFilho " + hAPI.getCardValue('numSolicitAbertaFilho'));
   
                   // ADD O NÚMERO DA NOVA SOLIITAÇÃO NOS COMPLEMENTOS
                   var usuario = hAPI.getCardValue('idSolicitante'); //getValue('WKUser');
                   var mensagem = "Aberto a solicitação de Contratos através do Nº " + value;
   
                   hAPI.setTaskComments(usuario, numProcesso, 0, mensagem);
                   log.info("####### insere MGS - " + usuario + " - " + numProcesso + " - " + mensagem);
               }
           }
   
           if (iProcess == "") {
               log.info(numProcesso);
               throw "Erro na abertura da solicitação";
           }
   
       } catch (e) {
           throw "Ocorreu um erro ao tentar criar uma solicitação de Contratos " + e;
       }
   
}