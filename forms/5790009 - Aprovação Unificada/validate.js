/**
 * VALIDACAO DOS CAMPOS DO FORMULARIO/ATIVIDADES
 * VERSAO 1.00
 */ 
var msg,arrayMsg,state;
var beforeSendValidate = function (numState, nextState) {
    // INICIAR CAMPOS DE CONTROLE
    msg      = "Favor verificar os seguintes campos: \n\n ";
    arrayMsg = [];
    state    = numState;

    //	ATIVIDADES
    var inicio =  4;

    if (state ==5) {
		if($('#rdAprovado-1')[0].checked==false && $('#rdAprovado-2')[0].checked==false) 
			arrayMsg.push(' &bull; É necessário confirmar se a solicitação foi aprovada ou não.');
		
		if($('#rdAprovado-2')[0].checked==true && $('#txtObservacao').val()=='') 
			arrayMsg.push(' &bull; Favor informar a observação para a reprovação.');
	}
    
	/** RESULTADO FINAL */
	var msgFinal = msg + arrayMsg.join('');
	if(msgFinal !== msg) {
		avisoMODAL('É necessário ajuste nas informações do formulário',arrayMsg);
		return false;
	} else {
		// TUDO VALIDADO - ADICIONAR REGISTRO NA TABELA targetAutorizacoes
		var apvMAIL       = parent.WCMAPI.userEmail;
		var apvSubstituto = '';
		var index         = wdkAddChild('targetAutorizacoes');
		$('#apvQuando___'	 +index).val(new Date().toLocaleDateString()); 
		$('#apvNome___'		 +index).val( $('#nomeAprovador').val()		);
		$('#apvSubstituto___'+index).val( apvSubstituto 				);
		$('#apvEMail___'	 +index).val( apvMAIL       				);
		$('#apvDecisao___'   +index).val( $('#rdAprovado-1').is(':checked') ? 'Aprovado' : 'Reprovado' );
		$('#apvObs___'		 +index).val( $('#txtObservacao').val()		);

		// LIBERAR CAMPOS PARA GRAVACAO
		$(':input, :radio, select, #tipoProposta, #numVenda').removeAttr('disabled');
		return true;
	}
}

function avisoMODAL(avTITULO,avMSG) {
	if(avMSG==null || avMSG=='')
		avMSG = 'Favor confirmar os dados do seu formulário';
	var xContent='';
	for (var iMSG = 0; iMSG < avMSG.length; iMSG++) 
		xContent +='<p>'+avMSG[iMSG]+'</p>';
	if(avTITULO==null || avTITULO=='')
		avTITULO = 'Atenção';
	FLUIGC.modal({
		title: avTITULO,
		content: xContent,
		id: 'fmWF_Aviso',
		size: 'large', // full | large | small
		actions: [{ 'label': 'Ok', 'autoClose': true }]
	});
}
