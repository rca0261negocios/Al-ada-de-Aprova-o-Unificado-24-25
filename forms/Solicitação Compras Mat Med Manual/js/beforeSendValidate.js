var beforeSendValidate = function(numState,nextState){
	// SEGURANCA CAMPO IDENTIFICADOR - strCriticidade, strUnidade, strDataInicial,strOutrosParam
    // SM2 - RCA 06.02.24
    if( $('#campoIdentificador').val() || 
    	$('#campoIdentificador').val() == null ){         
        $("#campoIdentificador").val($("#prioridade").val()+" - "+$("#filial"    ).val()+" - TP" );
    };
}
