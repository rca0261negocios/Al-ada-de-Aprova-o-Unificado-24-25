function createDataset(fields, constraints, sortFields) {
    // CRIA AS COLUNAS
	log.info("### ds_ParamsWF_Aprovacao INICIADO...");
    var dataset = DatasetBuilder.newDataset(); 
	    dataset.addColumn( "CodDEF_Proces"		);
	    dataset.addColumn( "code_activities"	);
	    dataset.addColumn( "control_field" 		); // "|aux_|<nome>|ordem|" 
		dataset.addColumn( "control_name"		);
		dataset.addColumn( "control_date"		);
	    dataset.addColumn( "sequence_approved"	);
	    dataset.addColumn( "final_approved"		);
	    dataset.addColumn( "value_approved"		);
	    dataset.addColumn( "sequence_reproved"	);
	    dataset.addColumn( "final_reproved"		);
	    dataset.addColumn( "value_reproved"		);
	    dataset.addColumn( "sequence_refused"	);
	    dataset.addColumn( "final_refused"		);
	    dataset.addColumn( "value_refused"		);
	
	try {
	    var params = new Array();
	    	params.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));
	    var datasetPrincipal = DatasetFactory.getDataset("ds_Parametros_Aprovacoes", null, params, null);
	
	    for (var i = 0; i < datasetPrincipal.values.length; i++) {
	        var documentId      = datasetPrincipal.getValue(i, "metadata#id");
	        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");
	
	        // CRIA AS PARAMS PARA BUSCAR OS CAMPOS FILHOS
	        var paramsFilhos = new Array();
	        	paramsFilhos.push(DatasetFactory.createConstraint("aux_approval_activities","sim"              ,"sim"             ,ConstraintType.MUST));
		        paramsFilhos.push(DatasetFactory.createConstraint("tablename"              , "table-activities","table-activities",ConstraintType.MUST));
		        paramsFilhos.push(DatasetFactory.createConstraint("metadata#id"            , documentId        ,documentId        ,ConstraintType.MUST));
		        paramsFilhos.push(DatasetFactory.createConstraint("metadata#version"       , documentVersion   ,documentVersion   ,ConstraintType.MUST));
	        var datasetFilhos = DatasetFactory.getDataset("ds_Parametros_Aprovacoes", null, paramsFilhos, null);
	
	        // "|aux_|<nome>|ordem|" 
	        for (var j = 0; j < datasetFilhos.values.length; j++) 
	            dataset.addRow(new Array(
	            		datasetPrincipal.getValue(i, "process_id" 		 ), 
	            	       datasetFilhos.getValue(j, "code_activities"	 ),
	            	       datasetFilhos.getValue(j, "control_field" 	 ), 
						   datasetFilhos.getValue(j, "control_name"		 ),
						   datasetFilhos.getValue(j, "control_date"		 ),
						   datasetFilhos.getValue(j, "sequence_approved" ),
	            	       datasetFilhos.getValue(j, "final_approved"	 ),
	            	       datasetFilhos.getValue(j, "value_approved"	 ),
	            	       datasetFilhos.getValue(j, "sequence_reproved" ),
	            	       datasetFilhos.getValue(j, "final_reproved"	 ),
	            	       datasetFilhos.getValue(j, "value_reproved"	 ),
	            	       datasetFilhos.getValue(j, "sequence_refused"  ),
	            	       datasetFilhos.getValue(j, "final_refused"	 ),
	            	       datasetFilhos.getValue(j, "value_refused"	 )
	            ));
	    }
	} catch (e) {
		// ERRO DE EXECUCAO
		log.info("### ds_ParamsWF_Aprovacao ERROR:");
		log.dir(e);
        dataset.addRow(new Array('erro',e.string)); 	
    }
    // FINALIZADO
    return dataset;
}
