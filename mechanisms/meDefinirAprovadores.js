function resolve(process,colleague){
	// DEFINIR APROVADOR CONF SEQUENCIA DE APROVACAO
	var userList = new java.util.ArrayList();
	var indexes = hAPI.getChildrenIndexes( ('targetAprovadores') );
	if(indexes.length<=0)
		userList.add( 'integrador.fluig' );
	else
		for (var iREG = 0; iREG < indexes.length; iREG++) {
			var status = hAPI.getCardValue("apvStatus___"+indexes[iREG]);
			if(status == "nao_confirmado") {
				var usuario = hAPI.getCardValue("apvLogin___"+indexes[iREG]);
					userList.add( usuario );
				break;
			}
		}

	// FINALIZADA
	return userList;
}
