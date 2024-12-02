function Email(){}
//Define o corpo da tabela produtos que vai no email
var cabecarioTabela = '	<table border="1">'+
						'<thead>'+
							'<tr>'+
								'<th style="padding: 2px;">Código</th>'+
								'<th>Apresentação</th>'+
								'<th>Qtd. Pendente</th>'+
								'<th>Observação</th>'+
								'<th>Qtd. a Aguardar</th>'+
								'<th>Qtd. p/ Emergencial</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody>';


var fimTabela = '</tbody> </table>';
var linhasTabelaEmail = "";
/**
 * Envia email somente conhecimento
 * @param numeroAlcada O numero da alçada aprovada automaticamente
 * @param responsavelAlcada Número da matricula(Id) do responsavel pela alçada
 */
function enviaEmailSomenteConhecimento() {
	var data = buscaDadosEmail();
	var sender = 'imwn2dyhbuywfa0f1522083830483'; // INTEGRADOR FLUIG 13.06.24 GLPI  
		//       "4s2f7mmb7dfs64qv1452799368975"; // COMUNICACAO INTERNA 
	try {
		//Parametros de envio
		var parameters = new java.util.HashMap();
		parameters.put("subject","Contagem "+data.nomeFilial+" - "+data.codFilial+" - "+data.dateContagem);
		parameters.put("INSTANCE_ID", String(getValue("WKNumProces")));
		parameters.put("NUM_SOLICITACAO",String(getValue("WKNumProces")));
		parameters.put("NUM_PEDIDO",data.numPedido);
		parameters.put("DECISAO",data.decisaoClinica);
		parameters.put("TABELA_PRODUTOS",data.tabelaProdutos);
		//Seta os destinatarios
		var recipients = new java.util.ArrayList();
		for(var i  in data.listaEmail){
			recipients.add(data.listaEmail[i]);
		}
		recipients.add('compras.oncologia@oncoclinicas.com');

		//envia o email
		notifier.notify(sender, "template_email_compras_oncoprod", parameters, recipients, "text/html");
	} catch (e) {
		log.info("***** Ocorreu um erro ao tentar enviar o e-mail: " + e);
		throw "Ocorreu um erro ao tentar enviar o e-mail: " + e;
	}
}

//Busca os dados da solicitação para email
function buscaDadosEmail(){
	//busca dados do pai filho de produtos
	var dadosProdutos = consultaPaiFilho(['numProd','nomeProd','pendentesProd','obsOncoprod','qtdAguardarProd']);
	var tabelaProdutos = "";
	var decisaoClinica = "";
	for(var i = 0; i < dadosProdutos.length; i++){
		var row = dadosProdutos[i];
		if(row.pendentesProd != '0'){
			var qtdCompraEmergencial = parseInt(row.pendentesProd) - parseInt(row.qtdAguardarProd);//Informação importante para compras
			linhasTabelaEmail += "<tr>"+
								"<td style='padding: 3px;''>"+row.numProd+"</td>"+
								"<td>"+row.nomeProd+"</td>"+
								"<td>"+row.pendentesProd+"</td>"+
								"<td>"+row.obsOncoprod+"</td>"+
								"<td>"+row.qtdAguardarProd+"</td>"+
								"<td>"+qtdCompraEmergencial+"</td>"+
							"</tr>";
		}
	}

	if(linhasTabelaEmail == ""){
		tabelaProdutos = "<p><b>A solicitação não possui nenhum produto pendente.</b></p>";
	}else{
		tabelaProdutos = cabecarioTabela + linhasTabelaEmail +fimTabela;
	}

	var aprovacaoClinica = hAPI.getCardValue("aprovacaoCompras");
	if(aprovacaoClinica =='sim'){
		decisaoClinica = 'Aprovar';
	}else{
		decisaoClinica = 'Reprovar';
	}
	//Busca usuarios dos grupos para receber email
	var grupoFilial = hAPI.getCardValue('grupoFilial');
	grupoFilial = grupoFilial.substr(11);//Remove o prefixo Pool:Group
	var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', grupoFilial, grupoFilial, ConstraintType.SHOULD);
	var c2 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', 'ONCOPROD', 'ONCOPROD', ConstraintType.SHOULD);
	var ds = DatasetFactory.getDataset('colleagueGroup', new Array('colleagueGroupPK.colleagueId'), new Array(c1,c2), null);
	
	var listaEmail = [];
	for(var i = 0; i < ds.rowsCount; i++){
		listaEmail.push(ds.getValue(i,'colleagueGroupPK.colleagueId'))
	}

	return{
		'nomeFilial':hAPI.getCardValue("filial"),
		'codFilial':hAPI.getCardValue("codFilial"),
		'numPedido':hAPI.getCardValue("numPedido"),
		'dateContagem':hAPI.getCardValue("dataContagem"),
		'decisaoClinica':decisaoClinica,
		'tabelaProdutos':tabelaProdutos,
		'listaEmail': listaEmail
	}
}
