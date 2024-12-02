function createDataset(fields, constraints, sortFields) {
    var newDataset = DatasetBuilder.newDataset();
    var dataSource = "/jdbc/FluigDSRO"; 
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
	
	//-- VALOR CONFORME PARAMETROS
	var xPROCESSO='',xTABELA='';
    if (constraints !== null && constraints !== undefined) {
    	for (var i = 0; i < constraints.length; i++) {
    		if (constraints[i].fieldName == 'PROCESSO') {
    			xPROCESSO = "'"+constraints[i].initialValue+"'";
			}
    		if (constraints[i].fieldName == 'TABELA') {
    			if(xTABELA!=='')
    				xTABELA +=',';
    			xTABELA += "'"+constraints[i].initialValue+"'";
    		}
    	}
    }
	var myQuery = 
		"SELECT D.COD_LISTA,l.COD_LISTA_FILHO,l.COD_TABELA,d.NUM_DOCTO_PROPRIED,d.NUM_VERS_PROPRIED, d.COD_EMPRESA "+
		" FROM DEF_PROCES p "+  
		"  LEFT JOIN VERS_DEF_PROCES vp ON vp.COD_DEF_PROCES = p.COD_DEF_PROCES  AND vp.LOG_ATIV    = 1 "+ 
		"  LEFT JOIN DOCUMENTO       d  ON d.NR_DOCUMENTO    = vp.NUM_PASTA_FORM AND d.VERSAO_ATIVA = 1 "+ 
		"  LEFT JOIN SERV_DATASET    ds ON ds.COD_DATASET    = d.NM_DATASET "+
		"  LEFT JOIN META_LISTA_REL  l  ON l.COD_LISTA_PAI   = d.COD_LISTA ";
	//
	if(xPROCESSO==''){
		myQuery +=
			" WHERE p.COD_DEF_PROCES='AprovaçãoUnificada' ";
	} else if(xTABELA!==''){
		myQuery +=
			" WHERE p.COD_DEF_PROCES="+xPROCESSO+" AND L.COD_TABELA IN ("+xTABELA+")";
	} else {
		myQuery +=
			" WHERE p.COD_DEF_PROCES="+xPROCESSO;
	}
	//--
	log.info('### GD_GED-FORMS: '+myQuery);
 	try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = null;
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
        log.error("### GD_GED-FORMS ERROR ============================================= " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
}
