function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRO"; 
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	
	// VALOR CONFORME PARAMETROS
	var xDATASET = "'ds_Alcadas'",
		xTABELA  = '',
		xEMPRESA = 1;
	
    if (constraints !== null && constraints !== undefined) 
    	for (var i = 0; i < constraints.length; i++) 
    		if (constraints[i].fieldName == 'DATASET') 
    			xDATASET = "'"+constraints[i].initialValue+"'";
    
	var myQuery =
		"SELECT "+
		"  d.COD_LISTA, l.COD_LISTA_FILHO, "+
		"  d.NUM_DOCTO_PROPRIED,d.NUM_VERS_PROPRIED "+
		" from DOCUMENTO d "+
		"  INNER JOIN SERV_DATASET   ds ON ds.COD_DATASET =d.NM_DATASET "+ 
		"   LEFT JOIN META_LISTA_REL l  ON l.COD_LISTA_PAI=d.COD_LISTA "+
		" WHERE d.COD_EMPRESA  = 1 "+
		"   AND d.VERSAO_ATIVA = 1 "+
		"   AND ds.COD_DATASET = "+xDATASET;

	//--
	log.info('### TH-FORMS-SIMPLES: '+myQuery);
 	try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
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
    	newDataset.addColumn('STATUS');
    	newDataset.addRow(new Array("ERROR ---> " + e.message));
        log.error("### TH-FORMS-SIMPLES ERROR ---> " + e.message);
        return newDataset;
    } finally {
        if (stmt != null) stmt.close();      
        if (conn != null) conn.close();
    }
    return newDataset;
}
