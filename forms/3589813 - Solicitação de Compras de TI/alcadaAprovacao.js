function buscarGestores() {

	var valor = $("#valorTotalServico").val();
	var CodFilial = $("#codFilialFluig").val();
	var codCentroCusto = $("#CTT_CUSTO").val();
	
	// Defina as constraints para buscar o ds do pai
	var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var datasetPai = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(constraintPai), null).values;

	for (var i in datasetPai) {
		//Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última). 
		var c1 = DatasetFactory.createConstraint("tablename", "tbCentroCusto", "tbCentroCusto", ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
		var c4 = DatasetFactory.createConstraint("CTT_CUSTO", codCentroCusto + ' ', codCentroCusto + ' ', ConstraintType.MUST);
		// Busca o dataset 
		var ds_centroCusto = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3, c4), null).values;
	}
	
	var ds_cad_Filiais = DatasetFactory.getDataset("cad_Filiais", null, null, null);
    var arrayFilial;
    
    // Comparando e atribuindo o código do protheus com o código do fichário Cad_Filiais
    for(var x = 0; x < ds_cad_Filiais.values.length; x ++){
        if(ds_cad_Filiais.values[x].filial_protheus == CodFilial){
            arrayFilial = ds_cad_Filiais.values[x].codigo;
        }
    }

    var ds_aprovadores = DatasetFactory.getDataset("ds_alcadas_diversos_2", [arrayFilial], null, null);
	
	// Localiza os aprovadores do centro de custo com base no valor
	var ObjAprovadores = new Array();
	valor = convertFloat(valor);
	
	if (ds_centroCusto.length > 0) {
		var aprovador = new Object();
		aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro'];
		aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentroDesc']
		ObjAprovadores.push(aprovador);

		if (valor > convertFloat(ds_centroCusto[0]['valorGerenteCentro'])) {
			var aprovador = new Object();
			aprovador.ID = ds_centroCusto[0]['usuarioGerenteCentro2'];
			aprovador.NOME = ds_centroCusto[0]['usuarioGerenteCentro2Desc']
			ObjAprovadores.push(aprovador);
		}
	}
	
	// Localiza os aprovadores da filial com base no valor informado
	if (ds_aprovadores.values.length > 0) {
		var aprovador = new Object();
		aprovador.ID = ds_aprovadores.values[0].usuarioGerente3;
		aprovador.NOME = ds_aprovadores.values[0].usuarioGerente3Desc;
		ObjAprovadores.push(aprovador);

		if (valor > convertFloat(ds_aprovadores.values[0].valorGerente3)) {
			var aprovador = new Object();
			aprovador.ID = ds_aprovadores.values[0].usuarioOperacoes;
			aprovador.NOME = ds_aprovadores.values[0].usuarioOperacoesDesc;
			ObjAprovadores.push(aprovador);
		}
		if (valor > convertFloat(ds_aprovadores.values[0].valorOperacoes)) {
			var aprovador = new Object();
			aprovador.ID = ds_aprovadores.values[0].usuarioFinanceiro;
			aprovador.NOME = ds_aprovadores.values[0].usuarioFinanceiroDesc
			ObjAprovadores.push(aprovador);
		}
		if (valor > convertFloat(ds_aprovadores.values[0].valorFinanceiro)) {
			var aprovador = new Object();
			aprovador.ID = ds_aprovadores.values[0].usuarioGeral;
			aprovador.NOME = ds_aprovadores.values[0].usuarioGeralDesc;
			ObjAprovadores.push(aprovador);
		}
    }
	
	// Retornando um array de gestores sem nomes duplicados
	b = {};
	for (var i = 0; i < ObjAprovadores.length; i++) {
	    b[ObjAprovadores[i].ID] = ObjAprovadores[i].ID;
	}
	gestores = [];
	for (var key in b) {
		gestores.push(key);
	}

	if(gestores.length > 0){
		
		var maxAlcadaAtual = gestores.length;
        var contAlcada = 1;
		if (maxAlcadaAtual >= contAlcada) {// Seta o primeiro aprovador	
			$("#idAprovGestor1").val(gestores[0]);
			$("#proximoAprovador").val(gestores[0]);
			$("#decisaoGestor1").val("");
			$("#motivoAprovGestor1").val("");
			$("#nomeAprovGestor1").val("");	
			contAlcada = contAlcada + 1;
		} else {
			$("#idAprovGestor1").val("");
			$("#proximoAprovador").val();
			$("#decisaoGestor1").val("");
			$("#motivoAprovGestor1").val("");
			$("#nomeAprovGestor1").val("");	
		}
		if (maxAlcadaAtual >= contAlcada) {
			$("#idAprovGestor2").val(gestores[1]);
			$("#decisaoGestor2").val("");
			$("#motivoAprovGestor2").val("");
			$("#nomeAprovGestor2").val("");	
			contAlcada = contAlcada + 1;
		} else {
			$("#idAprovGestor2").val("");
			$("#decisaoGestor2").val("");
			$("#motivoAprovGestor2").val("");
			$("#nomeAprovGestor2").val("");	
		}		
		if (maxAlcadaAtual >= contAlcada) {
			$("#idAprovGestor3").val(gestores[2]);
			$("#decisaoGestor3").val("");
			$("#motivoAprovGestor3").val("");
			$("#nomeAprovGestor3").val("");	
			contAlcada = contAlcada + 1;
		} else {
			$("#idAprovGestor3").val("");
			$("#decisaoGestor3").val("");
			$("#motivoAprovGestor3").val("");
			$("#nomeAprovGestor3").val("");	
		}		
		if (maxAlcadaAtual >= contAlcada) {
			$("#idAprovGestor4").val(gestores[3]);
			$("#decisaoGestor4").val("");
			$("#motivoAprovGestor4").val("");
			$("#nomeAprovGestor4").val("");	
			contAlcada = contAlcada + 1;
		} else {
			$("#idAprovGestor4").val("");
			$("#decisaoGestor4").val("");
			$("#motivoAprovGestor4").val("");
			$("#nomeAprovGestor4").val("");	
		}
		if (maxAlcadaAtual >= contAlcada) {
			$("#idAprovGestor5").val(gestores[4]);
			$("#decisaoGestor5").val("");
			$("#motivoAprovGestor5").val("");
			$("#nomeAprovGestor5").val("");	
			contAlcada = contAlcada + 1;
		} else {
			$("#idAprovGestor5").val("");
			$("#decisaoGestor5").val("");
			$("#motivoAprovGestor5").val("");
			$("#nomeAprovGestor5").val("");	
		}		
	}else{
		
		FLUIGC.toast({
            message: "Não identificada alçada de aprovação para este centro de custo nesta unidade. Gentileza acionar o time de Experiência do Cliente responsável pelo Processo de Gestão das Alçadas de Aprovação.",
            type: "danger",
            timeout: "slow",
          });
    	
    	window["centroDeCusto"].clear();
	}
	/*if($('#proximoAprovador').val() == ""){ 
		// Seta o primeiro aprovador
		$('#proximoAprovador').val(gestores[0]);
		$('#nivelAtualAprovacao').val("1");
	}
	else if($('#nivelAtualAprovacao').val() == "1" && $('#nivelAtualAprovacao').val() <= gestores.length){
		$('#proximoAprovador').val(gestores[1]);
		$('#nivel').val("1");
		$('#nivelAtualAprovacao').val("2");
	}
	else if($('#nivelAtualAprovacao').val() == "2" && $('#nivelAtualAprovacao').val() <= gestores.length){
		$('#proximoAprovador').val(gestores[2]);
		$('#nivel').val("2");
		$('#nivelAtualAprovacao').val("3");
	}
	else if($('#nivelAtualAprovacao').val() == "3" && $('#nivelAtualAprovacao').val() <= gestores.length){
		$('#proximoAprovador').val(gestores[3]);
		$('#nivel').val("3");
		$('#nivelAtualAprovacao').val("4");
	}
	else if($('#nivelAtualAprovacao').val() == "4" && $('#nivelAtualAprovacao').val() <= gestores.length){
		$('#proximoAprovador').val(gestores[4]);
		$('#nivel').val("4");
		$('#nivelAtualAprovacao').val("5");
	}
	else{
		$('#proximoAprovador').val("")
	}*/

    return gestores
    
}

function getAprovadorCentroCusto(codCentroCusto){
	
	var constraintPai = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
    var datasetPai = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(constraintPai), null).values;
    for (var i in datasetPai) {
        //Cria as constraints para buscar os campos filhos, passando o tablename, número da ficha e versão (no caso a última).
        var c1 = DatasetFactory.createConstraint("tablename", "tbCentroCusto", "tbCentroCusto", ConstraintType.MUST);
        var c2 = DatasetFactory.createConstraint("metadata#id", datasetPai[i]['metadata#id'], datasetPai[i]['metadata#id'], ConstraintType.MUST);
        var c3 = DatasetFactory.createConstraint("metadata#version", datasetPai[i]["metadata#version"], datasetPai[i]["metadata#version"], ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("CTT_CUSTO", codCentroCusto + ' ', codCentroCusto + ' ', ConstraintType.MUST);
        // // Busca o dataset
        var ds_centroCusto = DatasetFactory.getDataset("ds_alcadas_aprov_v2", null, new Array(c1, c2, c3, c4), null).values;
    }
       
    if (ds_centroCusto.length > 0) {
        
        var aprovador = ds_centroCusto[0]['usuarioGerenteCentro'];                                                      
        
    }else{
    	
    	FLUIGC.toast({
            message: "Não identificada alçada de aprovação para este centro de custo nesta unidade. Gentileza acionar o time de Experiência do Cliente responsável pelo Processo de Gestão das Alçadas de Aprovação",
            type: "danger",
            timeout: "slow",
          });
    	
    	window["centroDeCusto"].clear();
    	
    }         	
	
}

function convertFloat(valor) {
	if (typeof (valor) == 'number') {
		return valor
	}
	valor = valor.replace(/[R$.]/g, '')
	valor = parseFloat(valor.replace(',', '.'))
	return valor;
}