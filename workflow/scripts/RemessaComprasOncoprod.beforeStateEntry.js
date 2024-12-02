function beforeStateEntry(sequenceId){
	var CURRENT_STATE = getValue('WKNumState');
	if(CURRENT_STATE == 37){
		enviaEmailSomenteConhecimento();
		
	}
}

