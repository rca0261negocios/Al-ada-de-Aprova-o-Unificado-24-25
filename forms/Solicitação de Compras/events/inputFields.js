function inputFields(form){
	var regEx = /^\d{4}-\d{2}-\d{2}$/;

	if (form.getValue("dtEmissao").match(regEx)) {
	var split = form.getValue("dtEmissao").split('-');
		form.setValue("dtEmissao", split[2] + '-' + split[1] + '-' + split[0]);
	}

	var indexes = form.getChildrenIndexes("tbItens");

	for (var i = 0; i < indexes.length; i++) {
		var index = indexes[i];
		if (form.getValue("dtNecessidadeProduto___"+index).match(regEx)) {
			var split = form.getValue("dtNecessidadeProduto___"+index).split('-');
			form.setValue("dtNecessidadeProduto___"+index, split[2] + '-' + split[1] + '-' + split[0]);
		}
	}
}
