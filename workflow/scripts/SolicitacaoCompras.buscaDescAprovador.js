function buscaDescAprovador(codigo){
	
	var usuario = "";
		
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", codigo, codigo, ConstraintType.MUST);
	var constraints = new Array(c1);
	var usuarios = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	if (usuarios.rowsCount > 0) {
		usuario = usuarios.getValue(0,"colleagueName");
	}
	
	return usuario.toString();	
			
}