function beforeTaskSave(colleagueId, nextSequenceId, userList) {
	GETSLA()
	var CURRENT_STATE = getValue('WKNumState');

	if (CURRENT_STATE == INICIO || CURRENT_STATE == 0) {
		verificaAnexo();
	}


}