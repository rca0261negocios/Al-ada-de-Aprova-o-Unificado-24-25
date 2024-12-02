function servicetask165(attempt, message) {
    try {
        var periodicService = ServiceManager.getService("OncoclinicasCriacaoTitulos");
        var serviceHelper = periodicService.getBean();
        var serviceLocator = serviceHelper.instantiate("br.com.oncoclinicas.FSWSP001Locator");
        var service = serviceLocator.getFSWSP001SOAP();

        if (hAPI.getCardValue("indexProd") > 0) {
            var prenota = gerarXML()
            hAPI.setCardValue('cpXmlPre', prenota)

            var webService = service.WSINTPNF(prenota);
            var mensagem = webService.getMENSAGEM();
            var retorno = webService.getRETORNO();

            if (retorno == 1 || retorno == 2) {
                hAPI.setCardValue("cpXmlPre", prenota);
            } else {
                hAPI.setCardValue("cpXmlPre", prenota);
                throw mensagem + ' || ' + prenota
            }
        } else {


        }

    } catch (error) {

        var prenota = gerarXML()
        log.info('XML INTEGRACAO PRE NOTA FLUIG ' + getValue("WKNumProces") + prenota)
        throw error + '||' + prenota;
    }

}

function gerarXML() {
    var xml = "<?xml version='1.0' encoding='UTF-8'?>"
    xml += '<PreNota>'
    xml += '<Operacao>'
    xml += '<Id>1</Id>'
    xml += '</Operacao>'
    xml += '<Cabecalho>'
    xml += '<F1_FILIAL>' + hAPI.getCardValue("codFilial") + '</F1_FILIAL>' // codigo filial
    xml += '<F1_DOC>' + hAPI.getCardValue('notaFiscal') + '</F1_DOC>' // numero da nota fiscal
    xml += '<F1_SERIE>' + normalizeString(hAPI.getCardValue('serieNF')) + '</F1_SERIE>' // serie da nota fiscal
    xml += '<F1_FORNECE>' + hAPI.getCardValue("codFornecedor") + '</F1_FORNECE>' // codigo do fornecedor
    xml += '<F1_LOJA>' + hAPI.getCardValue("lojFornecedor") + '</F1_LOJA>' // loja do fornecedor
    xml += '<F1_TIPO>Normal</F1_TIPO>' // tipo de nota
    xml += '<F1_EMISSAO>' + refactorDate(hAPI.getCardValue("emissaoNota")) + '</F1_EMISSAO>' // data emissoa
    xml += '<F1_ESPECIE>' + hAPI.getCardValue('cpCodEspecieNf') + '</F1_ESPECIE>' // especie da nota fiscal
    xml += '<F1_CHVNFE>' + hAPI.getCardValue('cpCodigoBarras') + '</F1_CHVNFE>'    
    /* xml += '<F1_ZVENCTO>' + hAPI.getCardValue('filtroDataVencimento') + '</F1_ZVENCTO>' */
    xml += '<F1_ZVENCTO>' + refactorDate(hAPI.getCardValue("DataVencimentoHide")) + '</F1_ZVENCTO>'
    xml += '</Cabecalho>'
    xml += '<Itens>'

    var linhas = hAPI.getCardValue("indexProd")
    for (var i = 1; i <= linhas; i++) {
        xml += '<Iten>'
        xml += '<D1_FILIAL>' + hAPI.getCardValue("codFilial") + '</D1_FILIAL>'; // codigo da filial
        xml += '<D1_PEDIDO>' + hAPI.getCardValue("pedidoMedicao").split(": ")[1] + '</D1_PEDIDO>'; // numero do pedido de compras
        xml += '<D1_ITEMPC>' + addZero(4, i) + '</D1_ITEMPC>'; // numero do 
        xml += '<D1_ITEM>' + addZero(4, i) + '</D1_ITEM>';
        xml += '<D1_COD>' + hAPI.getCardValue("codProduto___" + i) + '</D1_COD>';
        xml += '<D1_UM>UN</D1_UM>';
        xml += '<D1_QUANT>' + hAPI.getCardValue("quantProduto___" + i) + '</D1_QUANT>';
        xml += '<D1_VUNIT>' + removeMask(hAPI.getCardValue("vlrUnitProduto___" + i)) + '</D1_VUNIT>';
        xml += '<D1_TOTAL>' + removeMask(hAPI.getCardValue("vlrTotalProduto___" + i)) + '</D1_TOTAL>';
        xml += '<D1_VALDESC>0</D1_VALDESC>';
        xml += '<D1_DESCPRO>' + normalizeString(hAPI.getCardValue("descProduto___" + i)) + '</D1_DESCPRO>';
        xml += '<D1_VALIPI>0</D1_VALIPI>';
        xml += '<D1_VALFRE>0</D1_VALFRE>';
        xml += '<D1_MODNF>' + hAPI.getCardValue("cpDesBh") + '</D1_MODNF>';
        xml += '<D1_SERIENF>' + hAPI.getCardValue("cpSerieDesBh") + '</D1_SERIENF>';
        xml += '<D1_SEGURO>0</D1_SEGURO>';
        xml += '<D1_DESPESA>0</D1_DESPESA>';
        xml += '<D1_CC>' + hAPI.getCardValue("cpCodCentroCustos___1") + '</D1_CC>'
        xml += '<D1_ZIDFLG>' + getValue("WKNumProces") + '</D1_ZIDFLG>';
        xml += '<D1_ZTESPRE>141</D1_ZTESPRE>'
        if (hAPI.getCardValue('cpSimplesNacional') != 'Não') {
            xml += '<D1_ALIQISS>' + hAPI.getCardValue('cpAliqISS') + '</D1_ALIQISS>'
            xml += '<D1_XISSRGE>' + hAPI.getCardValue('cpAliqISS') + '</D1_XISSRGE>'
        } else {
            xml += '<D1_ALIQISS>' + hAPI.getCardValue('cpAliqISS') + '</D1_ALIQISS>'
        }
        // xml += '<D1_XISSRGE>' + hAPI.getCardValue('cpAliqISS') + '</D1_XISSRGE>' // Aliquota ISS
        xml += '<D1_ZCEPOM>' + hAPI.getCardValue('slCepom') + '</D1_ZCEPOM>' // Cepom
        xml += '<D1_XBASINS>' + removeMask(hAPI.getCardValue('cpBaseCalculo')) + '</D1_XBASINS>' // Base Calculo Reduzida
        xml += '<D1_TES>' + hAPI.getCardValue('cpTes') + '</D1_TES>'
        xml += '<D1_ALIQINS>' + hAPI.getCardValue('cpINSS') + '</D1_ALIQINS>' // aliquota INSS
        xml += '<D1_XALQINS>' + hAPI.getCardValue('cpINSS') + '</D1_XALQINS>'
        xml += '</Iten>'
    }
    xml += '</Itens>'
    xml += '</PreNota>'
    log.info('XML ' + xml);
    return xml;
}

// remove a mascara monetaria da string de entrada e a retorna
function removeMask(valor) {
    if (valor != undefined && valor != "" && valor != null) {
        valor = valor.replace("R$", "");
        valor = valor.replace(" ", "");
        valor = valor.replace(".", "");
        valor = valor.replace(".", "");
        valor = valor.replace(".", "");
        valor = valor.replace(".", "");
        valor = valor.replace(".", "");
        valor = valor.replace(",", ".");
        valor = parseFloat(valor);
        return valor.toFixed(4);
    } else {
        return 0.0000;
    }
}

// remove os caracteres especias da string de entra e a retorna
function normalizeString(string) {
    //string = new java.lang.String(string);
    string = string.toUpperCase();
    string = string.replaceAll("Á|À|Â|Ã|Ä", "A");
    string = string.replaceAll("É|È|Ê|Ë", "E");
    string = string.replaceAll("Í|Ì|Î|Ï", "I");
    string = string.replaceAll("Ó|Ò|Ô|Õ|Ö", "O");
    string = string.replaceAll("Ú|Ù|Û|Ü", "U");
    string = string.replaceAll("Ç", "C");
    string = string.replaceAll("-", " ");
    return string
}

// adcicioa os 0 necessarios para alguns padroes do protheus e retorna o valor que foi inserido no formato
function addZero(quantidade, numero) {
    numero = numero.toString()
    for (var i = numero.length; i < quantidade; i++) {
        numero = "0" + numero
    }
    return numero;
}

function refactorDate(date) {
    var dia = date.split("/")[0];
    var mes = date.split("/")[1];
    var ano = date.split("/")[2];
    return ano + '' + mes + '' + dia
    
}

function refactorDate1(date) {
    novaData = date.replaceAll("-", "")
    return novaData;    
}

function removePercentual(string) {
    if (string != undefined && string != "" && string != null) {
        string = string.replace("%", "");
        string = string.replace(",", ".");
        return parseFloat(string);
    } else {
        return 0.00;
    }
}