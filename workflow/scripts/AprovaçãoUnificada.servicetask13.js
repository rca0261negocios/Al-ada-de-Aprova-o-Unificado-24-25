function servicetask13(attempt, message) {
	// OPERACAO: 
	//    value="nao_informada"
	//    value="cd" - Compras Diversas
	//    value="sv" - Serviços
	//    value="ob" - Obras

	// TIPO DE SOLICITACAO: 
	//    value="nao_informada"
	//    value="com_carta"    
	//    value="sem_carta"    

	// NIVEL TIPO DE VALIDACAO 
	//    value="nao_informado" 
	//    value="CC"            - Centro de Custo
	//    value="SP"            - Suprimentos
	//    value="FL"            - Filial	
	
	// PARAMETROS
    var seCC_Operacional  ='S',
    	CC                = hAPI.getCardValue( "centroCusto"  ).substring(11),	 
    	filial            = hAPI.getCardValue( "filial"       ).substring(8),
		cartaExcecao      = hAPI.getCardValue( "cartaExcecao" ),
    	valorCartaExcecao = hAPI.getCardValue( "valorCartaExcecao" );
    
    // TRANSFORMAR VALOR CARTA EXCECAO - R$ 33.000,00
    valorCartaExcecao = valorCartaExcecao.replace('R$ ','').replace('R$','');
    valorCartaExcecao = valorCartaExcecao.replace('.','');
    valorCartaExcecao = valorCartaExcecao.replace(',','.');
    valorCartaExcecao = parseFloat(valorCartaExcecao);
    if(isNaN(valorCartaExcecao))
        valorCartaExcecao = 0;

    // SEGURANCA CARTA DE EXCECAO
    if(cartaExcecao=='true'){
    	hAPI.setCardValue( "cartaExcecao",'Sim' );
    	cartaExcecao = 'Sim';
    } else {
    	hAPI.setCardValue( "cartaExcecao",'Não' );
    	cartaExcecao = 'Não';
    }
    
	// VALOR DA SOLICITACAO 
	var valorSolicitado = hAPI.getCardValue( "valorSolicitado" );

	// SE CATA DE EXCESSAO TROCAR VALOR PELO VALOR DA CARTA
	if(cartaExcecao == 'S' || cartaExcecao == 'on' || cartaExcecao == "Sim" || cartaExcecao=='sim' )
		valorSolicitado = hAPI.getCardValue( "valorCartaExcecao" );

	// FORMATAR VALOR SOLICITADO
		valorSolicitado = replaceAll( valorSolicitado,'R$',''  );
		valorSolicitado = replaceAll( valorSolicitado,".", ""  );
		valorSolicitado = replaceAll( valorSolicitado,",", "." );
		valorSolicitado = parseFloat( valorSolicitado );
	if(isNaN(valorSolicitado) || valorSolicitado == null || valorSolicitado == "")
		throw "Valor solicitado invalido";

	// CAMPOS OBRIGATORIOS
	if(filial == null || filial == "")
		throw "Filial não informada";

	// VALOR PADRAO PARA CARTA DE EXCECAO
	if(cartaExcecao == null || cartaExcecao == "")
		cartaExcecao = "N";

	// REMOVER TODOS OS REGISTROS DA TABELA targetAprovadores
	var cardData = hAPI.getCardData(getValue("WKNumProces"));
	var keys = cardData.keySet().iterator();
	while (keys.hasNext()) {
		var key = keys.next();
		if (key.match(/^targetAprovadores___/)) {
			var index = parseInt(key.split("___")[1]);
			if (index > 0)
				hAPI.deleteCardChild("targetAprovadores", index);
		}
	}

	//  params.push( DatasetFactory.createConstraint("seCC_Operacional", seCC_Operacional, seCC_Operacional, ConstraintType.MUST) );
	var xSequencia = 1;
	var usuarios   = new Array();
	var origem     = hAPI.getCardValue("numChamadoOrigem");

	// VERIFICAR SE EXISTE OUTROS SUBPROCESSOS DE APROVACAO PARA O PROCESSO PAI E NAO CONSIDERAR AS APROVACOES JA INSERIDAS E QUE O STATUS SEJA IGUAL A "Aprovado"
	var params = new Array();
		params.push( DatasetFactory.createConstraint("processoPai",origem,'',ConstraintType.MUST) );
	var dsAprovados = DatasetFactory.getDataset("DS_ALCADAS_EXECUTADAS",null,params,null);
	if(dsAprovados.rowsCount > 0)
		for (var i = 0; i < dsAprovados.rowsCount; i++) {
			var usuario = dsAprovados.getValue(i, "apv_Usuario");
			usuarios.push(usuario);
		}

	for (var iGrupo = 0; iGrupo < 2; iGrupo++) {
		// PRIMEIRO GRUPO DE APROVACAO CONF CENTRO DE CUSTO
		var params = new Array();
		if(iGrupo==0)
			// GRUPO 1 - CENTRO DE CUSTO
			params.push( DatasetFactory.createConstraint("CC",CC,CC,ConstraintType.MUST) );
		else
			// GRUPO 2 - FILIAL
			params.push( DatasetFactory.createConstraint("filial",filial,filial,ConstraintType.MUST) );

		var dsAprovadores = DatasetFactory.getDataset("DS_ALCADAS_UNIFICADAS",null,params,null); 
	
		// SENAO RETORNAR VALOR VERIFICAR AINDA SE EXISTE ALCADA CONF FILIAL
		if (dsAprovadores.rowsCount >0) {
			// GRAVAR APROVADORES NA TABELA targetAprovadores
			for (var i = 0; i < dsAprovadores.rowsCount; i++) {
		
				// SE APROVACAO SERA COM BASE NO MOVIMENTO COM OU SEM CARTA DE EXCECAO
				var base;
				if(cartaExcecao == "Sim") 
					base = dsAprovadores.getValue(i, "vlrComCarta"); // COM CARTA DE EXCECAO
				else
					base = dsAprovadores.getValue(i, "vlrSemCarta"); // SEM CARTA DE EXCECAO

				base = base.toString();
				base = replaceAll( base,'R$',''  );
				base = replaceAll( base,".", ""  );
				base = replaceAll( base,",", "." );
				base = parseFloat(base);
				if(isNaN(base))
					throw "Valor base do aprovador invalido a- "+base;
		
				// SE VALOR SOLICITADO FOR MAIOR QUE O VALOR TETO DO APROVADOR
				if(valorSolicitado >= base) {
		
					// PEGAR LOGIN DO USUARIO CONFORME DATASET ALCADAS x COLLEAGUE
					var usuario = dsAprovadores.getValue(i, "apv_Usuario");
					if(usuario =='Flavio Costa Miranda')
						usuario = 'Ricardo de Castro Andrade';

					// VERIFICAR SE O USUARIO JA NAO FOI INSERIDO NA TABELA targetAprovadores
					if(usuarios.indexOf(usuario) == -1){
						usuarios.push(usuario);
					
						var paramColleague = new Array();
							paramColleague.push( DatasetFactory.createConstraint('colleagueName',usuario,usuario,ConstraintType.MUST) );
						var dsColleague = DatasetFactory.getDataset("colleague", null, paramColleague, null);
						if(dsColleague.rowsCount == 0)
							throw "Cadastro não encontrado para o usuário "+usuario;
						
						var colleague = dsColleague.getValue(0, "colleaguePK.colleagueId");
			
						// INSERIR APROVADOR NA TABELA targetAprovadores
						var newRow = new java.util.HashMap();
							newRow.put("apvSequencia", ''+xSequencia       );
							newRow.put("apvLogin"    , ''+colleague        );
							newRow.put("apvValorTeto", ''+base.toFixed(2)  );
							newRow.put("apvStatus"   , "nao_confirmado"    );
			
						hAPI.addCardChild("targetAprovadores", newRow);
						xSequencia +=1;

						// QUANDO PROCESSO ORIGEM = jornadaFornecedorV360 PEGAR SOMENTE 2 APROVADORES
						if(hAPI.getCardValue("operacao") == 'jornadaFornecedorV360')
							if(xSequencia == 3)
								break;
					}
				}
			}
		}
	}
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}
