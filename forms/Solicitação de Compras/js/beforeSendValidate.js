var informaFaltaCotacao = true;

var beforeSendValidate = function(numState,nextState){
	// SEGURANCA CAMPO IDENTIFICADOR - strCriticidade, strUnidade, strDataInicial,strOutrosParam
    // SM2 - RCA 06.02.24
    if($("#campoIdentificador").val() == "" || $("#campoIdentificador").val() == null){ 
		var campoIdentificador = $("#prioridadeGeral"       ).val() +" - "+
								 $("#filial"           ).val() +" - DA "+
								 $("#dtEmissao"        ).val() +" - "+
								 $("#hiddenTipoProduto").val();  
		$("#campoIdentificador").val(campoIdentificador);
	}

	// REVISADO EM 18.09.24 SM2CE - ANDRADE
	var lineBreaker = "</br>";
	var msg = "";
	var listaCotacoes = "";
	if(numState == COTACAO && informaFaltaCotacao && $("[name^=codItemCotacao___]").length > 0){
		$("[name^=txtCodItemProduto___]").each(function() {
			var codItens = $(this).val();
			if (codItens) {
				var indexItem = $(this).attr("name").split("___")[1];
				var cotacaoOK = $("[name^=codItemCotacao___]").toArray().some(function(cotacao) {
					var codCotacoes = $(cotacao).val();
					return codCotacoes && codItens === codCotacoes;
				});

				if (!cotacaoOK) {
					listaCotacoes += codItens + " - " + $("[name=txtDescProduto___" + indexItem + "]").val() + lineBreaker;
				}
			}
		});

		if(listaCotacoes != ""){
			msg += "Aten\u00E7\u00E3o, n\u00E3o foram encontrados cota\u00E7\u00E3os para os seguintes itens: "+ lineBreaker +
					listaCotacoes + lineBreaker + 
					"Sem as cota\u00E7\u00F5es acima sua solicita\u00E7\u00E3o ainda pode ser movimentada, porém os itens n\u00E3o ser\u00E3o inclu\u00EDdos na emiss\u00E3o do pedido de compra. ";
		}
		
		if(msg != ""){
			informaFaltaCotacao = false;
			throw(msg);
		}
	}
}

/* Original code
var listaCotacoes = "";
$("[name^=txtCodItemProduto___]").each(function(){
	var cotacaoOK = false;
	var codItens = $(this).val();
	if(codItens){
		var indexItem = $(this).attr("name").split("___")[1];
			$("[name^=codItemCotacao___]").each(function(){
				codCotacoes = $(this).val();
				if(codCotacoes){
					var indexCotacao = $(this).attr("name").split("___")[1];
					if(codItens == codCotacoes){
						cotacaoOK = true;
						return false;
					}
				}
			});
			if(!cotacaoOK){
				listaCotacoes += codItens+" - "+$("[name=txtDescProduto___"+indexItem).val()+lineBreaker;
			}
		}
});
*/

