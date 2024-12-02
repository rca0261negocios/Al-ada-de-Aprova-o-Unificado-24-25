function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();	
	var minhaQuery =
		"SELECT IT1.vlrNivel, IT1.vlrSemCarta, IT1.vlrComCarta, IT2.aprovadorNivel, IT2.tipoAprovacao, IT2.tipoCCOperacional, IT2.zoomCentroCusto, IT2.centroCusto_Id, IT2.zoomFilial, IT2.filial_Id ,IT2.apv_Usuario "+
		"	FROM ML0012659 ML, DOCUMENTO D  "+
		"		INNER JOIN ML0012660 IT1 ON D.NR_DOCUMENTO = IT1.documentid and D.NR_VERSAO = IT1.version "+
		"		INNER JOIN ML0012661 IT2 ON D.NR_DOCUMENTO = IT2.documentid and D.NR_VERSAO = IT2.version and IT1.vlrNivel = IT2.aprovadorNivel "+
		"	WHERE ML.documentId    = D.NR_DOCUMENTO "+
		"		AND ML.version     = D.NR_VERSAO "+
		"		AND D.COD_EMPRESA  = 1 "+
		"		AND D.VERSAO_ATIVA = 1 ";
	
    if (constraints !== null && constraints !== undefined) 
    	for (var i = 0; i < constraints.length; i++) 
    		if (constraints[i].fieldName == 'seCC_Operacional') 
    			minhaQuery += " AND IT2.tipoCCOperacional = '"+constraints[i].initialValue+"'";
    		else if (constraints[i].fieldName == 'CC') 
    			minhaQuery += " AND IT2.zoomCentroCusto = '"+constraints[i].initialValue+"'";
    		else if (constraints[i].fieldName == 'filial') 
    			minhaQuery += " AND IT2.zoomFilial = '"+constraints[i].initialValue+"'";
		
	log.info("start - DS_ALCADAS_UNIFICADAS QUERY: " + minhaQuery);
	var dataSource = "/jdbc/FluigDSRO";
	
	var conn = null;
	var stmt = null;
	var rs   = null;
	var ic   = new javax.naming.InitialContext();
	var ds   = ic.lookup(dataSource);
	var created = false;
	try {
		conn = ds.getConnection();
		stmt = conn.createStatement();
		rs = stmt.executeQuery(minhaQuery);
		var columnCount = rs.getMetaData().getColumnCount();
		while (rs.next()) {
			if (!created) {
				for (var i = 1; i <= columnCount; i++) 
					newDataset.addColumn(rs.getMetaData().getColumnName(i));
				created = true;
			}
			var Arr = new Array();
			for (var i = 1; i <= columnCount; i++) {
				var obj = rs.getObject(rs.getMetaData().getColumnName(i));
				if (null != obj)
					Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
				else
					Arr[i - 1] = null;
			}
			newDataset.addRow(Arr);	
		}
	} catch (e) {
		log.error("### DS_ALCADAS_UNIFICADAS ERROr --> " + e.message);
		newDataset.addColumn('ERRROR');
		newDataset.addRow([e.message]);
	} finally {
		if (rs   != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}
