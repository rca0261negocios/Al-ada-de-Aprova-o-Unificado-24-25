var myLOADING = FLUIGC.loading(window, {
    textmessage: 'Processando...'
});
function removeMascaraMonetaria(mask) {
    if (mask != undefined) {
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

function calcularValorTotalSolicitacao(qCAMPO) {
    var index = qCAMPO.id.split('___')[1];
    var qtdProduto = parseFloat($('#qtdProd___' + index).val()) || 0;
    var valorProduto = removeMascaraMonetaria( $('#valorProd___' + index).val().replace('.',',') );
    var valorTotal = qtdProduto * valorProduto;
 
    // Atualiza o valor total do produto atual
    $('#valorTotalProd___' + index).val(addMascaraMonetaria(valorTotal));
 
    // Calcula o total de todos os produtos
    var somaTotal = 0;
    $('[name^=valorTotalProd___]').each(function() {
        somaTotal += valorTotal;
    });
 
    // Adiciona o valor do IPI
    $('[name^=valIpiProd___]').each(function() {
        somaTotal += removeMascaraMonetaria( $(this).val().replace('.',',') );
    });
 
    // Atualiza o valor total da solicitação
    $('#valorTotalSolicitacao').val( addMascaraMonetaria(somaTotal) );
}
