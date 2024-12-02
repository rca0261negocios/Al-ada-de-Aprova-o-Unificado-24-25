function beforeTaskSave(colleagueId,nextSequenceId,userList){
	GETSLA()
	var CURRENT_STATE = getValue('WKNumState');
	var idFluxo = hAPI.getCardValue("idFluxo");

	if(CURRENT_STATE == INICIO || CURRENT_STATE == 0){
		verificaAnexo();
	}else if (CURRENT_STATE == ANEXAR_NF){
		if(isTransferOrSave() == false && hAPI.getCardValue("controleAnexarNF") == "false"){
			verificaAnexo();
			hAPI.setCardValue("controleAnexarNF","true");
		}
	}
}

