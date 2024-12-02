
function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    	newDataset.addColumn("MENSAGEM",DatasetFieldType.TEXT);  

	// 
    if(constraints.length>0) 
	for (var i = 0; i < constraints.length; i++) {
		logValor = constraints[i].fieldName+':'+constraints[i].initialValue;
		log.info("### PAINEL AUTORIZACOES ### " +logValor);
		newDataset.addRow(new Array( logValor ));
	} else 
		newDataset.addRow(new Array( '### PAINEL AUTORIZACOES ### Sem dados para exibir' ));
	return newDataset
}
