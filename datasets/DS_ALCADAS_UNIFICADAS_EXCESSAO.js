function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();	
	var minhaQuery =
		"SELECT IT3.excessaoNivel, IT3.tipoExcessao, IT3.ccExcessao, IT3.ccExcessao_Id, IT3.justificaExcessao "+
		"  FROM ML0012659 ML, DOCUMENTO D "+
		"   INNER JOIN ML0012660 IT1 ON D.NR_DOCUMENTO = IT1.documentid and D.NR_VERSAO = IT1.version "+ 
		"   INNER JOIN ML0012662 IT3 ON IT1.vlrNivel = IT3.excessaoNivel "+
		"  WHERE ML.documentId  = D.NR_DOCUMENTO "+
		"    AND ML.version     = D.NR_VERSAO "+
		"    AND D.COD_EMPRESA  = 1 "+
		"    AND D.VERSAO_ATIVA = 1 ";
	
    if (constraints !== null && constraints !== undefined) 
    	for (var i = 0; i < constraints.length; i++) 
    		if (constraints[i].fieldName == 'CC') 
    			minhaQuery += " AND IT2.ccExcessao_Id = '"+constraints[i].initialValue+"'";
		
	log.info("start - DS_ALCADAS_UNIFICADAS_EXCESSAO QUERY: " + minhaQuery);
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
		log.error("### DS_ALCADAS_UNIFICADAS_EXCESSAO ERROr --> " + e.message);
		newDataset.addColumn('ERRROR');
		newDataset.addRow([e.message]);
	} finally {
		if (rs   != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}
