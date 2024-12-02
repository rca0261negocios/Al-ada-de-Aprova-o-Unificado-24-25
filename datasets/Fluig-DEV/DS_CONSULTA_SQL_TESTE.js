function createDataset(fields, constraints, sortFields) {
	var newDataset = DatasetBuilder.newDataset();
	
	//		"	LEFT OUTER JOIN ML0012662 IT3 ON D.NR_DOCUMENTO = IT3.documentid AND D.NR_VERSAO = IT3.version  "+
	var minhaQuery =
		"SELECT IT1.* "+
		"  FROM ML001259 ML, DOCUMENTO D "+
		"	LEFT OUTER JOIN ML0012660 IT1 ON D.NR_DOCUMENTO = IT1.documentid AND D.NR_VERSAO = IT1.version  "+
		"	LEFT OUTER JOIN ML0012661 IT2 ON D.NR_DOCUMENTO = IT2.documentid AND D.NR_VERSAO = IT2.version AND IT1.vlrNivel = IT2.aprovadorNivel "+
		"  WHERE ML.documentId  = D.NR_DOCUMENTO "+
		"    AND ML.version     = D.NR_VERSAO "+
		"    AND D.COD_EMPRESA  = 1 "+
		"    AND D.VERSAO_ATIVA = 1 ";
		
	log.info("start - DS_SQL_CONSULTA_FLUIG_TESTE QUERY: " + minhaQuery);
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
		log.error("### DS_SQL_CONSULTA_FLUIG_TESTE ERROr --> " + e.message);
		newDataset.addColumn('ERRROR');
		newDataset.addRow([e.message]);
	} finally {
		if (rs   != null) rs.close();
		if (stmt != null) stmt.close();
		if (conn != null) conn.close();
	}
	return newDataset;
}
