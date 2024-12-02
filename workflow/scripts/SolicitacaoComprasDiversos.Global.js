var ATIVIDADE_ATUAL = null;
var inicio = 5;
var analiseCompradorCotacao = 6;
var alcadaAprovacao = 7;
var solucaoInconsistencia = 10;
var exclusivoCorrigirSolicitacao = 12;
var correcaoSolicitante = 13;
var aprovSolicitante = 14;
var execaoIntegracao = 16;
var validarPedidoCompra = 19;
var alcadaAprovacaoCarta = 20;
var formularioContrato = 26;
var analiseTI = 376;
var alcadaAprovacaoPA = 96;
var anexaSolicitacao = 109;
var execao_anexo_integracao = 111;
var envio_email_fornecedor = 116;
var validar_cursos = 367;

function Global() {
    ATIVIDADE_ATUAL = getValue('WKNumState');
}

//Funcao para remover a mascara monetaria
function removeMascaraMonetaria(mask) {
    if (mask != undefined && mask != '') {
        mask = mask.replace('R$', '');
        mask = mask.replace(' ', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');
        mask = mask.replace('.', '');

        mask = mask.replace(',', '.');
        return parseFloat(mask);
    } else {
        return 0.00;
    }
}

function myLog(msng, obj) {
    log.info('KAKAROTO>>: ' + msng + ' ' + obj);
}

function addZero(x, n) {
    if (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

function converteDataProtheus(dataFluig) {
    if (dataFluig != undefined) {
        var arrayData = dataFluig.split("/");
        var data = '';
        if (arrayData.length == 3) {
            var ano = arrayData[2];
            var mes = arrayData[1];
            var dia = arrayData[0];
            data = ano + '' + mes + '' + dia;
        }
        return data;
    } else {
        return '';
    }
}

function getCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = addZero(now.getMonth() + 1, 2);
    var day = addZero(now.getDate(), 2);
    var currentDate = day + '/' + month + '/' + year;
    return currentDate;
}

/**
 * 
 * @param {Valor a ser formatado} n 
 * @param {*} c 
 * @param {*} d 
 * @param {*} t 
 */
function formatMoney(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return "R$ " + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/**
 * Consulta campos de Pai Filho no formulário
 * @param fieldList Array de strings dos atributos "Name" (sem "___") dos campos do pai filho
 * @return Array de objetos, cada index do array corresponde a uma linha do pai filho com o
 * "Name" de cada campo como seletor do atributo
 */
function consultaPaiFilho(fildList) {
    var resultPaiFilho = [];
    var numProcess = getValue("WKNumProces");
    //Consulta todos os campos do formulário apartir do WKNumProces
    var mapa = hAPI.getCardData(parseInt(numProcess));
    var it = mapa.keySet().iterator();
    //Loop para percorrer todos os campos do formulário
    while (it.hasNext()) {
        var campo = it.next();
        //Verifica se o campo atual do loop pertence a um Pai Filho
        if (campo.indexOf("___") > -1) {
            var nomeCampo = campo.split("___")[0];
            var indexCampo = parseInt(campo.split("___")[1]);

            //Percorre a lista de campos informada como parametro
            for (var i = 0; i < fildList.length; i++) {
                if (fildList[i] == nomeCampo) {
                    if (resultPaiFilho[indexCampo - 1] == undefined) {
                        resultPaiFilho[indexCampo - 1] = {};
                    }
                    //Adiciona um atributo com o nome do campo contendo seu valor ao array de resultado
                    //Cada linha do array corresponde a uma linha da tabela com a primeira linha sendo o index 0
                    resultPaiFilho[indexCampo - 1][nomeCampo] = mapa.get(campo);
                }
            }
        }
    }
    return resultPaiFilho;
}

/**
 * Recebe uma String como paramentro e a retorna sem os acentos
 * @param string
 * @returns
 */
function removeAcentos(string) {
    if (string != "" && string != null) {
        string = new java.lang.String(string);
        string = string.toUpperCase();
        string = string.replaceAll("Á|À|Â|Ã|Ä", "A");
        string = string.replaceAll("É|È|Ê|Ë", "E");
        string = string.replaceAll("Í|Ì|Î|Ï", "I");
        string = string.replaceAll("Ó|Ò|Ô|Õ|Ö", "O");
        string = string.replaceAll("Ú|Ù|Û|Ü", "U");
        string = string.replaceAll("Ç", "C");
        string = string.replaceAll("/", "-");
        string = string.replaceAll("[^A-Za-z0-9- ]", "");
    }
    return string;
}