// todos os metodos nessa classe se referem a conversoes para o padrao do protheus

function gerarCabecalhoXML(atividade) {
    var xml = "<?xml version='1.0' encoding='UTF-8'?>"
    xml += '<PreNota>'
    xml += '<Operacao>'
    if (atividade == 10) {
        xml += '<Id>1</Id>'
    } else if (atividade == 26) {
        xml += '<Id>3</Id>'
    }
    xml += '</Operacao>'
    xml += '<Cabecalho>'
    xml += '<F1_FILIAL>' + hAPI.getCardValue("cpCodFilial") + '</F1_FILIAL>' // codigo filial
    xml += '<F1_DOC>' + hAPI.getCardValue('cpNumNota') + '</F1_DOC>' // numero da nota fiscal
    xml += '<F1_SERIE>' + normalizeString(hAPI.getCardValue('cpSerieNota')) + '</F1_SERIE>' // serie da nota fiscal
    xml += '<F1_FORNECE>' + hAPI.getCardValue("cpCodFornecedor") + '</F1_FORNECE>' // codigo do fornecedor
    xml += '<F1_LOJA>' + hAPI.getCardValue("cpLojaFornecedor") + '</F1_LOJA>' // loja do fornecedor
    xml += '<F1_TIPO>Normal</F1_TIPO>' // tipo de nota
    xml += '<F1_EMISSAO>' + converteData(hAPI.getCardValue("dtEmissao")) + '</F1_EMISSAO>' // data emissoa
    xml += '<F1_ESPECIE>' + hAPI.getCardValue('cpCodEspecieNf') + '</F1_ESPECIE>' // especie da nota fiscal
    xml += '<F1_COND>' + hAPI.getCardValue('cpCodCondPagamento') + '</F1_COND>' // condiçao de pagamento. 089 == 180 dias
    xml += '<F1_CHVNFE>' + hAPI.getCardValue('cpCodigoBarras') + '</F1_CHVNFE>'
    
    if (hAPI.getCardValue("cpTipoLancamento") == "AUTONOMIA" || hAPI.getCardValue("cpNotaAtrasada") == "true" || hAPI.getCardValue("ddaVencido") == "true" || hAPI.getCardValue("prazoMenor2dias") == "true" ) {
        if(hAPI.getCardValue("ddaVencido") == "true"  || hAPI.getCardValue("prazoMenor2dias") == "true" ){
            xml += '<F1_ZVENCTO>' + converteData(hAPI.getCardValue("dtVencimento")) + '</F1_ZVENCTO>'
        }else{
            xml += '<F1_ZVENCTO>' + converteData(hAPI.getCardValue("dtPagamento")) + '</F1_ZVENCTO>'
        }

    } else {
        xml += '<F1_ZVENCTO>' + converteData(hAPI.getCardValue("dtVencimento")) + '</F1_ZVENCTO>'
    }

    xml += '</Cabecalho>'
    return xml;
}
// gera os o xml dos itens da pre nota
function gerarItensXmlGds() {
    var xml = '<Itens>'

    var linhas = hAPI.getCardValue("indiceGds")
    var numitem = 0001
    frete = true;

    for (var i = 1; i <= linhas; i++) {
        if (hAPI.getCardValue("cpQuantEntrada___" + i) > 0) {
            xml += '<Iten>'
            xml += '<D1_FILIAL>' + hAPI.getCardValue("cpCodFilial") + '</D1_FILIAL>'; // codigo da filial
            xml += '<D1_PEDIDO>' + hAPI.getCardValue("cpCodPedidoComp") + '</D1_PEDIDO>'; // numero do pedido de compras
            xml += '<D1_ITEMPC>' + hAPI.getCardValue("cpItem___" + i) + '</D1_ITEMPC>'; // numero do 
            xml += '<D1_ITEM>' + addZero(4, numitem) + '</D1_ITEM>';            
            if (hAPI.getCardValue("cpNovoCodProduto___" + i)!= ""){
            xml += '<D1_COD>' + hAPI.getCardValue("cpNovoCodProduto___" + i) + '</D1_COD>';
            }else{
            xml += '<D1_COD>' + hAPI.getCardValue("cpCodProduto___" + i) + '</D1_COD>';            
            }            
            xml += '<D1_UM>UN</D1_UM>';
            xml += '<D1_QUANT>' + hAPI.getCardValue("cpQuantEntrada___" + i) + '</D1_QUANT>';
            xml += '<D1_VUNIT>' + removeMask(hAPI.getCardValue("cpVlrUnit___" + i)) + '</D1_VUNIT>';
            xml += '<D1_TOTAL>' + removeMask(hAPI.getCardValue("cpVlrTotal___" + i)) + '</D1_TOTAL>';
            xml += '<D1_VALDESC>' + removeMask(hAPI.getCardValue("cpVlrDesc___" + i)) + '</D1_VALDESC>';
            if (hAPI.getCardValue("cpNovoCodProduto___" + i)!= ""){
            xml += '<D1_DESCPRO>' + normalizeString(hAPI.getCardValue("novoProduto___" + i)) + '</D1_DESCPRO>';
            }else{
            xml += '<D1_DESCPRO>' + normalizeString(hAPI.getCardValue("cpProduto___" + i)) + '</D1_DESCPRO>';	
            }
            xml += '<D1_VALFRE>0</D1_VALFRE>';
            
            xml += '<D1_SEGURO>0</D1_SEGURO>';
            xml += '<D1_DESPESA>0</D1_DESPESA>';
            if (hAPI.getCardValue("cpNotaAtrasada") == "true") {
                xml += '<D1_DTVALID>' + converteData(hAPI.getCardValue("dtPagamento")) + '</D1_DTVALID>'
            } else {
                xml += '<D1_DTVALID>' + converteData(hAPI.getCardValue("dtVencimento")) + '</D1_DTVALID>'
            }
            xml += '<D1_CC>' + hAPI.getCardValue("cpCodCentroCusto___" + i) + '</D1_CC>'
            if (frete == true) {
                xml += '<D1_VALFRE>' + removeMask(hAPI.getCardValue("cpVlrFrete")) + '</D1_VALFRE>'
                frete = false;
            }
            xml += '<D1_ZIDFLG>' + getValue("WKNumProces") + '</D1_ZIDFLG>';
            xml += '<D1_ALIQISS>' + hAPI.getCardValue('cpAliqISS') + '</D1_ALIQISS>' // Aliquita ISS
            xml += '<D1_ZCEPOM>' + hAPI.getCardValue('slCepom') + '</D1_ZCEPOM>' // Cepom
            xml += '<D1_TES>' + hAPI.getCardValue('cpTes') + '</D1_TES>'
            xml += '<D1_ALIQINS>' + hAPI.getCardValue('cpINSS') + '</D1_ALIQINS>' // aliquota INSS
            xml += '</Iten>'
            numitem++;
        }
    }
    xml += '</Itens>'
    xml += '</PreNota>'
    return xml;
}

function gerarItensXmlReg() {
    var xml = '<Itens>'

    var linhas = hAPI.getCardValue("indiceReg")
    var numitem = 0001
    frete = true;
    rateio = ''
    for (var i = 1; i <= linhas; i++) {
        if (hAPI.getCardValue("cpCodProd___" + i) != '' &&
            hAPI.getCardValue("cpCodProd___" + i) != undefined &&
            hAPI.getCardValue("cpCodProd___" + i) != null) {

            xml += '<Iten>'
            xml += '<D1_FILIAL>' + hAPI.getCardValue("cpCodFilial") + '</D1_FILIAL>';
            xml += '<D1_ITEM>' + addZero(4, numitem) + '</D1_ITEM>';
            xml += '<D1_COD>' + hAPI.getCardValue("cpCodProd___" + i) + '</D1_COD>';
            xml += '<D1_UM>UN</D1_UM>';
            xml += '<D1_QUANT>' + hAPI.getCardValue("cpQuant___" + i) + '</D1_QUANT>';
            xml += '<D1_VUNIT>' + removeMask(hAPI.getCardValue("cpValorUnit___" + i)) + '</D1_VUNIT>';
            xml += '<D1_TOTAL>' + calcularTotal(hAPI.getCardValue("cpValorTotal___" + i),
                hAPI.getCardValue("cpValorIpi___" + i),
                hAPI.getCardValue("cpValorDesconto___" + i)) + '</D1_TOTAL>';
            xml += '<D1_VALDESC>' + removeMask(hAPI.getCardValue("cpValorDesconto___" + i)) + '</D1_VALDESC>';
            xml += '<D1_DESCPRO>' + normalizeString(hAPI.getCardValue("zoomProduto___" + i)) + '</D1_DESCPRO>';
            xml += '<D1_VALIPI>' + removeMask(hAPI.getCardValue("cpValorIpi___" + i)) + '</D1_VALIPI>';
            xml += '<D1_VALFRE>0</D1_VALFRE>';
            xml += '<D1_SEGURO>0</D1_SEGURO>';
            xml += '<D1_DESPESA>0</D1_DESPESA>';
            xml += '<D1_DTVALID>' + converteData(hAPI.getCardValue("dtPagamento")) + '</D1_DTVALID>'
            xml += '<D1_CC>' + hAPI.getCardValue("cpCodCentroCustos___1") + '</D1_CC>'
            xml += '<D1_ZIDFLG>' + getValue("WKNumProces") + '</D1_ZIDFLG>';
            xml += '<D1_ZTESPRE>141</D1_ZTESPRE>'
            xml += '<D1_XFORPAG>' + hAPI.getCardValue('cpTipoPagamento') + '</D1_XFORPAG>' // forma de pagamento
            if (hAPI.getCardValue('cpSimplesNacional') == 'Não') {
                xml += '<D1_ALIQISS>' + hAPI.getCardValue('cpAliqISS') + '</D1_ALIQISS>' // Aliquita ISS
            } else {
                xml += '<D1_ALIQISS>0</D1_ALIQISS>' // Aliquita ISS
                xml += '<D1_XISSRGE>' + hAPI.getCardValue('cpAliqISS') + '</D1_XISSRGE>'
            }
            xml += '<D1_XALQINS>' + hAPI.getCardValue('cpINSS') + '</D1_XALQINS>'
            xml += '<D1_XBASINS>' + removeMask(hAPI.getCardValue('cpBaseCalculo')) + '</D1_XBASINS>'
            xml += '<D1_TES>' + hAPI.getCardValue('cpTes') + '</D1_TES>'
            xml += '<D1_ZCEPOM>' + hAPI.getCardValue('slCepom') + '</D1_ZCEPOM>' // Cepom
            if (hAPI.getCardValue("indexRateio") > 1) {
                xml += '<D1_RATEIO>1</D1_RATEIO>' // Cepom 
            } else {
                xml += '<D1_RATEIO>2</D1_RATEIO>'
            }
            // xml += '<D1_ALIQINS>' + hAPI.getCardValue('cpINSS') + '</D1_ALIQINS>' // aliquota INSS
            xml += '</Iten>'
            rateio += geraRateio(addZero(4, numitem))
            numitem++;
        }
    }
    xml += '</Itens>'
    xml += '<ItensRateio>'
    xml += rateio
    xml += '</ItensRateio>'
    xml += '</PreNota>'
    log.info('XML ' + xml);
    return xml;
}

function geraRateio(item) {
    rateio = ''
    var linhas = hAPI.getCardValue("indexRateio")
    log.info('<<<LINHAS>>>' + linhas);
    for (var i = 1; i <= linhas; i++) {
        rateio += '<Iten>'
        rateio += '<DE_FILIAL>' + hAPI.getCardValue("cpCodFilial") + '</DE_FILIAL>'
        rateio += '<DE_FORNECE>' + hAPI.getCardValue("cpCodFornecedor") + '</DE_FORNECE>'
        rateio += '<DE_LOJA>' + hAPI.getCardValue("cpLojaFornecedor") + '</DE_LOJA>'
        rateio += '<DE_ITEMNF>' + item + '</DE_ITEMNF>'
        rateio += '<DE_ITEM>' + addZero(2, i) + '</DE_ITEM>'
        rateio += '<DE_PERC>' + hAPI.getCardValue('cpPercentualRateio___' + i) + '</DE_PERC>'
        rateio += '<DE_CC>' + hAPI.getCardValue('cpCodCentroCustos___' + i) + '</DE_CC>'
        rateio += '</Iten>'
    }

    return rateio

}
// adcicioa os 0 necessarios para alguns padroes do protheus e retorna o valor que foi inserido no formato
function addZero(quantidade, numero) {
    numero = numero.toString()
    for (var i = numero.length; i < quantidade; i++) {
        numero = "0" + numero
    }
    return numero;
}
// retorna a tada atual no padrao do protheus
function currentDate() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    if (dia < 10) {
        dia = "0" + dia
    }
    if (mes < 10) {
        mes = "0" + mes
    }
    return '' + ano + mes + dia;
}
// remove os caracteres especias da string de entra e a retorna
function normalizeString(string) {
    string = new java.lang.String(string);
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
// converte a data do padrao YYYY-mm-DD para o padrao do protheus DDmmYYYY
function converteData(data) {
    var dia = data.split("-")[2];
    var mes = data.split("-")[1];
    var ano = data.split("-")[0];
    return ano + mes + dia
}

function calcularTotal(valor, ipi, desconto) {
    var valor = parseFloat(removeMask(valor));
    var ipi = parseFloat(removeMask(ipi));
    var desconto = parseFloat(removeMask(desconto));

    return valor - ipi + desconto;

}