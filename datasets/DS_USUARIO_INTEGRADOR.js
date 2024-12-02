function createDataset(fields, constraints, sortFields) {
	// DEV ATUALIZADA ATE 13.09.24
	// TST ATUALIZADA - NAO APLICADA
	// PRD ATUALIZADA - NAO APLICADA
	
	var dsRetorno = DatasetBuilder.newDataset();
	try{
		dsRetorno.addColumn("user");
		dsRetorno.addColumn("password");
		// -- FLUIG x FLUIG
		dsRetorno.addRow(['integradorfluig','hUbust*7']);
	} catch (exception){
		dsRetorno.addColumn('erro');
		dsRetorno.addRow([exception.message + ' (' + exception.lineNumber + ')']);
	}
	return dsRetorno;
}

