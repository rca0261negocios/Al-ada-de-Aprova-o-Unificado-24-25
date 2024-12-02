var mesesExtensoObj = {
    "01"  : "Janeiro",
    "02"  : "Fevereiro",
    "03"  : "Março",
    "04"  : "Abril",
    "05"  : "Maio",
    "06"  : "Junho",
    "07"  : "Julho",
    "08"  : "Agosto",
    "09"  : "Setembro",
    "10" : "Outubro",
    "11" : "Novembro",
    "12" : "Dezembro"
}

var mesesObj = {
		'Jan' : 1, 
		'Feb' : 2, 
		'Mar' : 3, 
		'Apr' : 4, 
		'May' : 5, 
		'Jun' : 6, 
		'Jul' : 7, 
		'Aug' : 8, 
		'Sep' : 9, 
		'Oct' : 10, 
		'Nov' : 11, 
		'Dec' : 12
	    
	}

var mesesIngles = {
		0 : "January", 
		1 : "February", 
		2 : "March", 
		3 : "April", 
		4 : "May", 
		5 : "June", 
		6 : "July", 
		7 : "August", 
		8 : "September", 
		9 : "October", 
		10 : "November", 
		11 : "December"
	    
	}


/**
 * 
 * @param dia
 * @param mes
 * @param ano
 * @param hora
 * @param minuto
 * @returns Hora no formato dd/mm/aaaa hh:mm
 */
function formatarDataAnalytics(dia, mes, ano, hora, minuto,segundos){
	if((dia+"").length == 1)
		dia = "0"+dia;	
	if((mes+"").length == 1)
		mes = "0"+mes;
	if((hora+"").length == 1)
		hora = "0"+hora;
	if((minuto+"").length == 1)
		minuto = "0"+minuto;
	if((segundos+"").length == 1)
		segundos = "0"+segundos;
	return dia+"/"+mes+"/"+ano+" "+hora+":"+minuto+":"+segundos;
}


function buscaDataFormatada(campoData, campoHora){
	var dataInicio = hAPI.getCardValue(campoData);
	if (dataInicio == null) {
		dataInicio="";
	}
	var dataFormatada = " ";
	if(dataInicio == "" || dataInicio == null){
		var dataAtual = new Date();
		dataFormatada = formatarDataAnalytics(dataAtual.getDate(), (dataAtual.getMonth()+1), dataAtual.getFullYear(), dataAtual.getHours(), dataAtual.getMinutes(), dataAtual.getSeconds());
	}else{
		dataFormatada = hAPI.getCardValue(campoData)+" "+hAPI.getCardValue(campoHora);
	}

	return dataFormatada;
}



function converteDateParaString(dataObj){
	var dataFormatada = formatarDataAnalytics(dataObj.getDate(), (dataObj.getMonth()+1), dataObj.getFullYear(), dataObj.getHours(), dataObj.getMinutes(), dataObj.getSeconds());
	return dataFormatada;
}

function montaTimeStamp(data, horario, tipoRetorno){
	
	var dia;
	var mes;
	var ano;
	
	dia = data.split(" ")[0].split("/")[0];
	
	mes = data.split(" ")[0].split("/")[1]+"";
	mes = parseInt(mes, 10);
	mes = mes;
	
	ano = data.split(" ")[0].split("/")[2];
	
	var dataRetorno
	if(tipoRetorno == "string"){
		var hora = horario.split(":")[0];
		var minuto = horario.split(":")[1];
		var segundos = horario.split(":")[2];
		dataRetorno = formatarDataAnalytics(dia, mes, ano, hora, minuto, segundos);
	}else{
		dataRetorno = new Date(mesesIngles[parseInt(mes)-1]+" "+dia+", "+ano+" "+horario);
		//dataRetorno.setSeconds(0);
		//dataRetorno.setMilliseconds(0);
	}
	
	return dataRetorno;
	
}




/**
 * Retorna o dataset com os valores do pré cadastro de prazos de SLA
 * 
 * 
 */
function buscaDatasetPrazosSLA(){
	
	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
	var dataset = DatasetFactory.getDataset("ds_prazo_sla_form",null,new Array(c1),null);
	
	
	return dataset;
}

/**
 * Retorna o dataset com os valores do pré cadastro de um SLA especifico
 * 
 * 
 */
// function buscaDatasetPrazosSLAEspecifico(codigo_sla){
	
// 	var sla = {
// 			codigo_sla : codigo_sla,
// 			prazo_sla : "",
// 			medida_prazo : ""
// 	};
	
// 	var c1 = DatasetFactory.createConstraint("metadata#active", "true", "true", ConstraintType.MUST);
// 	var c2 = DatasetFactory.createConstraint("codigo_sla", codigo_sla, codigo_sla, ConstraintType.MUST);
// 	var prazosSLA = DatasetFactory.getDataset("ds_prazo_sla_form",null,new Array(c1,c2),null);
	
// 	if(prazosSLA.rowsCount > 0){
// 		sla = {
// 				codigo_sla : codigo_sla,
// 				prazo_sla : prazosSLA.getValue(0,"prazo_sla"),
// 				medida_prazo : prazosSLA.getValue(0,"medida_prazo")
// 		};
// 	}
	
	
// 	return sla;
// }

/**
 * Retorno o objeto com os dados dos sla especifico
 * 
 * @param codigoSLA código do sla especifico
 * @param prazosSLA dataset com todos os dados
 * @returns obejto sla
 */

// function buscaSLA(codigoSLA, prazosSLA){
// 	var sla = null;
// 	for (var i = 0; i < prazosSLA.rowsCount; i++) {
// 		if(prazosSLA.getValue(i,"codigo_sla") == codigoSLA){
			
// 			sla = {
// 					codigo_sla : codigoSLA,
// 					prazo_sla : prazosSLA.getValue(i,"prazo_sla"),
// 					medida_prazo : prazosSLA.getValue(i,"medida_prazo")
// 			};
// 			break;
// 		}
// 	}
	
// 	return sla;
// }

/**
 * 
 * Metodo que lista as atividades que estão atrasadas em um processo
 * 
 * @param tempoGasto
 * @param codigoSLA
 * @returns {String}
 */

function listaAtividadesAtrasadas(tempoGasto, codigoSLA){
	var atividadeAtrasada = false;
	var currentState = parseInt(getValue("WKNumState"));
	
	var atividadesAtrasadas = hAPI.getCardValue("atividadesAtrasadas"); 
	var atividadesAtrasadasArray = atividadesAtrasadas.split(",");

	if(tempoGasto > 3){
		atividadeAtrasada = true;
		
		if(atividadesAtrasadas != ""){
			var atividadeAtrasadaCadastrada = false;
			
			for (var i = 0; i < atividadesAtrasadasArray.length; i++) {
				if(atividadesAtrasadasArray[i] == currentState){
					atividadeAtrasadaCadastrada = true;
					break;
				}
			}
			
			if(atividadeAtrasadaCadastrada == false){
				atividadesAtrasadas = atividadesAtrasadas + ","+currentState;
			}
		}else{
			atividadesAtrasadas = currentState;
		}
	}
	
	return atividadesAtrasadas;
	
}


/**
 * 
 * Retorna o prazo do SLA em segundos 
 * 
 * 
 * @param sla objeto sla
 * @returns prazo em minutos
 */
// function calculaPrazoSegundos(sla, expediente){
	
	
// 	var	 prazo = 0;
// 	var prazoSLA = sla.prazo_sla;
	
// 	if(sla.medida_prazo == "minutos"){
// 		prazo = prazoSLA *60;
// 	}else if(sla.medida_prazo == "horas"){
// 		prazo = prazoSLA * 60 * 60;
// 	}else if(sla.medida_prazo == "dias"){
		
// 		var c1 = DatasetFactory.createConstraint("businessPeriodPK.periodId", expediente, expediente, ConstraintType.MUST);
// 		var c2 = DatasetFactory.createConstraint("businessPeriodPK.weekDay", "2", "2", ConstraintType.MUST);
// 		var dataset_expediente = DatasetFactory.getDataset("businessPeriod", null, new Array(c1), null);
		
// 		var prazoDia = (parseInt(dataset_expediente.getValue(0,"finalHour")) - parseInt(dataset_expediente.getValue(0,"initialHour")));
// 		prazoDia = prazoDia + (parseInt(dataset_expediente.getValue(1,"finalHour")) - parseInt(dataset_expediente.getValue(1,"initialHour")));
		
// 		prazo = prazoSLA * prazoDia;
// 	}
		
// 	return prazo;
		
// }


/**
 * Calcula em segundos o tempo gasto da atividade, do prazo informado até a data atual ou até o prazo informado
 * 
 * @param dataInicialCampo
 * @param expediente
 * @param dataPrazoFinal
 * @returns tempo gasto
 *  
 */
function calculaTempoGasto(dataInicialCampo ,expediente, dataPrazoFinal){
	
	//busca dataset de expediente e feriados
	var c1 = DatasetFactory.createConstraint("businessPeriodPK.periodId", expediente, expediente, ConstraintType.MUST);
	var dataset_expediente = DatasetFactory.getDataset("businessPeriod", null, new Array(c1), null);
	var dataset_feriados = DatasetFactory.getDataset("globalCalendar", null, null, null);
	
	//instancia data atual
	var dataAtual;
	if(dataPrazoFinal == undefined || dataPrazoFinal == null || dataPrazoFinal == ""){
		dataAtual = new Date();
		dataAtual.setSeconds(0);
		dataAtual.setMilliseconds(0);
	}else{
		
		dataAtual = montaTimeStamp(dataPrazoFinal.split(" ")[0], dataPrazoFinal.split(" ")[1], "data");
	}
	

	if(dataInicialCampo.split(" ")[0].indexOf("-") > -1){
		dataInicialCampo.replace("-","/");
	}
	
	var dataInicial = montaTimeStamp(dataInicialCampo.split(" ")[0], dataInicialCampo.split(" ")[1], "data");
	var dataInicialOriginal = montaTimeStamp(dataInicialCampo.split(" ")[0], dataInicialCampo.split(" ")[1], "data");
	
	var tentativas = 0;
	var tempoGasto = 0;
	
	
	
	while ((dataAtual.getTime() != dataInicial.getTime()) && tentativas < 300){
		tentativas = tentativas + 1;
		
		//validando dias uteis
		var isWorkingDay = true;
		var sabado_util = false;
		var domingo_util = false;
		var feriado = false;
		
		for (var s = 0; s < dataset_expediente.rowsCount; s++) {
			if (parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == 7) {
				sabado_util = true;
				break;
			}
		}
		if (dataInicial.getDay() == 6 && !(sabado_util)) {
			isWorkingDay = false;
		}
		
		for (var d = 0; d < dataset_expediente.rowsCount; d++) {
			if (parseInt(dataset_expediente.getValue(d,"businessPeriodPK.weekDay")) == 1) {
				domingo_util = true;
				break;
			}
		}
		if (dataInicial.getDay() == 0 && !(domingo_util)) {
			isWorkingDay = false;
		}
		
		for (var f = 0; f < dataset_feriados.rowsCount; f++) {
			if (parseInt(dataset_feriados.getValue(f,"holidayYear")) == 0 || dataInicial.getFullYear() == parseInt(dataset_feriados.getValue(f,"holidayYear"))) {
				if ((dataInicial.getMonth() + 1) == parseInt(dataset_feriados.getValue(f,"holidayMonth"))) {
					if (dataInicial.getDate() == parseInt(dataset_feriados.getValue(f,"holidayDay"))) {
						feriado = true;
						break;
					}
				}
			}
		}
		
		if (feriado) {
			isWorkingDay = false;
		}
		
		if (!isWorkingDay) {
			continue;
		}
		
		if((dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() > dataInicial.getMonth() &&
				dataAtual.getDate() > dataInicial.getDate()	) ||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() > dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate())||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() > dataInicial.getMonth() &&
				dataAtual.getDate() < dataInicial.getDate() ||
				
				dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() < dataInicial.getMonth() &&
				dataAtual.getDate() > dataInicial.getDate()	) ||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() < dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate())||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() < dataInicial.getMonth() &&
				dataAtual.getDate() < dataInicial.getDate() ||
				
				dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() > dataInicial.getDate()	) ||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate())||
				
				(dataAtual.getFullYear() > dataInicial.getFullYear() &&
				dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() < dataInicial.getDate()
				
				)
			){
				var horasCalculadas = retornaHorasUteisDia(dataInicialOriginal, dataInicial, dataset_expediente);
				tempoGasto = tempoGasto + horasCalculadas;
				dataInicial.setDate( dataInicial.getDate() +1 );
				
				var periodoInicial = buscaHoraInicial(dataInicial, dataset_expediente);
				dataInicial.setHours(parseInt(periodoInicial.split(":")[0]));
				dataInicial.setMinutes(parseInt(periodoInicial.split(":")[1]));
				//setar hora inicial proximo dia
		}else if((dataAtual.getMonth() > dataInicial.getMonth() &&
			dataAtual.getDate() > dataInicial.getDate()	) ||
			
			(dataAtual.getMonth() > dataInicial.getMonth() &&
			dataAtual.getDate() == dataInicial.getDate())||
			
			(dataAtual.getMonth() > dataInicial.getMonth() &&
			dataAtual.getDate() < dataInicial.getDate())
		){
				var horasCalculadas = retornaHorasUteisDia(dataInicialOriginal, dataInicial, dataset_expediente);
				tempoGasto = tempoGasto + horasCalculadas;
				dataInicial.setDate( dataInicial.getDate() +1 );
				var periodoInicial = buscaHoraInicial(dataInicial, dataset_expediente);
				dataInicial.setHours(parseInt(periodoInicial.split(":")[0]));
				dataInicial.setMinutes(parseInt(periodoInicial.split(":")[1]));
		}else if(dataAtual.getMonth() == dataInicial.getMonth() &&
			dataAtual.getDate() > dataInicial.getDate()	)
		{
				var horasCalculadas = retornaHorasUteisDia(dataInicialOriginal, dataInicial, dataset_expediente);
				tempoGasto = tempoGasto + horasCalculadas;
				var periodoInicial = buscaHoraInicial(dataInicial, dataset_expediente);
				dataInicial.setDate( dataInicial.getDate() +1 );
				dataInicial.setHours(parseInt(periodoInicial.split(":")[0]+""));
				dataInicial.setMinutes(parseInt(periodoInicial.split(":")[1]+""));
		}else if(dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate() &&
				dataAtual.getHours() > dataInicial.getHours())
		{
			var horasCalculadas =  calculaHoraDoPeriodo(dataInicial, dataAtual, dataset_expediente, "hora");
			tempoGasto = tempoGasto + horasCalculadas;//horasCalculadas;
			dataInicial.setHours( dataInicial.getHours() +1 );
		}else if(dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate() &&
				dataAtual.getHours() < dataInicial.getHours())
		{
//			var horasCalculadas =  calculaHoraDoPeriodo(dataInicial, dataset_expediente, "hora");
//			segundos = segundos - horasCalculadas;//horasCalculadas;
			dataInicial.setHours( dataInicial.getHours() -1 );
		}else if(dataAtual.getMonth() == dataInicial.getMonth() &&
				dataAtual.getDate() == dataInicial.getDate() &&
				dataAtual.getHours() == dataInicial.getHours() &&
				dataAtual.getMinutes() > dataInicial.getMinutes())
		{
			var horasCalculadas =  calculaMinutosDoPeriodo(dataInicial, dataset_expediente, "minuto");
			tempoGasto = tempoGasto + horasCalculadas;
			dataInicial.setMinutes( dataInicial.getMinutes() +1 );
		}
		
			
			
	}
	
	
	return tempoGasto;
}


/**
 * Retorna a quantidade de horas uteis em um dia
 * 
 * @param dataInicialOriginal 
 * @param data
 * @param dataset_expediente
 * @returns {Number}
 */
function retornaHorasUteisDia(dataInicialOriginal, data, dataset_expediente){
	var segundos = 0;
	
	var horaInicio1 = 0;
	var horaFim1 = 0;
	var horaInicio2 = 0;
	var horaFim2 = 0;
	
	for (var s = 0; s < dataset_expediente.rowsCount; s++) {
		
		if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 1){
			
			horaInicio1 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim1 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		
		}else if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 2){
			horaInicio2 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim2 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		}
	}
	
	
	if(data.getDay() == dataInicialOriginal.getDay() && 
			data.getMonth() == dataInicialOriginal.getMonth() &&
			data.getFullYear() == dataInicialOriginal.getFullYear() ){
		
		var horaPrazo = (dataInicialOriginal.getMinutes() * 60) + (dataInicialOriginal.getHours() * 3600);
		horaPrazo = parseInt(horaPrazo+"");
		
		
		//:::::::1::::::   :::::::::::::::::::::2:::::::::::::::::::	:::::::3::::::	   ::::::::::::::::::::4:::::::::::::::::::	:::::::5::::::
		//			       ::horaInicio1::::::::::::::::::horaFim1::                       ::horaInicio2:::::::::::::::::horaFim2::
		
		if(horaPrazo < horaInicio1){
			
			//////////1
			segundos = segundos + (horaFim1 - horaInicio1);
			segundos = segundos + (horaFim2 - horaInicio2);
			
		}else if(horaPrazo >= horaInicio1 && 
				horaPrazo <= horaFim1 ){
				
			//////////2
			segundos = segundos + (horaFim1 - horaPrazo);
			segundos = segundos + (horaFim2 - horaInicio2);
			
		}else if(horaPrazo > horaFim1 && 
				horaPrazo < horaInicio2 ){
			
			//////////3
			segundos = segundos + (horaFim2 - horaInicio2);
			
		}else if(horaPrazo >= horaInicio2 && 
				horaPrazo <= horaFim2 ){
			
			//////////5
			segundos = segundos + (horaFim2 - horaPrazo);
			
		}
	}else{
		segundos = segundos + (horaFim1 - horaInicio1);
		segundos = segundos + (horaFim2 - horaInicio2);
	}
	return segundos;
}


/**
 * Retorna (em segundos) as horas uteis em um período
 * 
 * @param data - data inicial para calculo
 * @param dataset_expediente
 * @returns tempo gasto em segundos 
 */
function calculaHoraDoPeriodo(data, dataFinal, dataset_expediente, tipoCalculo){
	
	var segundos = 0;
	
	var horaInicio1 = 0;
	var horaFim1 = 0;
	var horaInicio2 = 0;
	var horaFim2 = 0;
	
	var multiplicador = 0;
	var multiplicadorPrazo = 0;
	
	if(tipoCalculo == "hora"){
		multiplicador = 3600;
		multiplicadorPrazo = 3600;
	}else{
		multiplicador = 60;
		multiplicadorPrazo = 1;
	}	
	
	for (var s = 0; s < dataset_expediente.rowsCount; s++) {		
		
		if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 1){
			
			horaInicio1 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim1 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		
		}else if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 2){
			horaInicio2 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim2 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		}
	}
	
	var horaPrazo = (data.getMinutes() * 60) + (data.getHours() * 3600);
	horaPrazo = parseInt(horaPrazo+"");	

	var horaFimPrazo = (data.getMinutes() * 60) + (data.getHours() * 3600) + 3600;
	var horaFimPrazoOriginal = (dataFinal.getMinutes() * 60) + (dataFinal.getHours() * 3600);
	horaFimPrazo = parseInt(horaFimPrazo+"");
	horaFimPrazoOriginal = parseInt(horaFimPrazoOriginal+"");
	
	//         :::::::1::::::	:::::::2::::::	:::::::3::::::	:::::::4::::::	:::::::5::::::	:::::::6::::::	:::::::7::::::
	//            ::horaInicio1::::::::::::::::::horaFim1::                        ::horaInicio2:::::::::::::::::horaFim2::
	
	if(horaPrazo < horaInicio1 && 
			horaFimPrazo <= horaInicio1){
		
	}else if(horaPrazo < horaInicio1 && 
			horaFimPrazo > horaInicio1 && 
			horaFimPrazo <= horaFim1 ){
		
		//////////1
		segundos = horaFimPrazo - horaInicio1;
		
	}else if(horaPrazo >= horaInicio1 && 
			horaFimPrazo <= horaFim1 ){
			
		//////////2
		//segundos = multiplicador;
		if ((horaFimPrazoOriginal - horaPrazo) > multiplicador) {
			segundos = multiplicador;
		} else {
			segundos = horaFimPrazoOriginal - horaPrazo;
		}
		
	}else if(horaPrazo < horaFim1 && 
			horaFimPrazo > horaFim1 && 
			horaPrazo >= horaInicio1 && 
			horaFimPrazo <= horaInicio2){

		//////////3
		segundos = horaFim1 - horaPrazo;
		
	}else if(horaPrazo >= horaFim1 && 
			horaFimPrazo <= horaInicio2 ){
		
		//////////4
		
	}else if(horaPrazo < horaInicio2 && 
			horaFimPrazo > horaInicio2 && 
			horaFimPrazo <= horaFim2 &&
			horaPrazo >= horaFim1){
		
		//////////5
		segundos = horaFimPrazo - horaInicio2;
		
	}else if(horaPrazo >= horaInicio2 && 
			horaFimPrazo <= horaFim2 ){		
		//////////6
		//segundos = multiplicador;
		if ((horaFimPrazoOriginal - horaPrazo) > multiplicador) {
			segundos = multiplicador;
		} else {
			segundos = horaFimPrazoOriginal - horaPrazo;
		}
		
	}else if(horaPrazo > horaInicio2 && 
			horaPrazo < horaFim2 && 
			horaFimPrazo > horaFim2){
		
		//////////7
		segundos = horaFim2 - horaPrazo;
		
	}

	return segundos;
}


/**
 * Retorna (em segundos) os minutos uteis em um período
 * 
 * @param data data inicial para calculo
 * @param dataset_expediente
 * @returns tempo gasto segundos
 */
function calculaMinutosDoPeriodo(data, dataset_expediente, tipoCalculo){
	
	var segundos = 0;
	
	var horaInicio1 = 0;
	var horaFim1 = 0;
	var horaInicio2 = 0;
	var horaFim2 = 0;
	
	var multiplicador = 0;
	var multiplicadorPrazo = 0;
	
	if(tipoCalculo == "hora"){
		multiplicador = 3600;
		multiplicadorPrazo = 3600;
	}else{
		multiplicador = 60;
		multiplicadorPrazo = 1;
	}	
	
	for (var s = 0; s < dataset_expediente.rowsCount; s++) {
		
		if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 1){
			
			horaInicio1 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim1 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		
		}else if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == data.getDay()+1  && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 2){
			horaInicio2 = parseInt(dataset_expediente.getValue(s,"initialHour"));
			horaFim2 = parseInt(dataset_expediente.getValue(s,"finalHour"));
		}
	}
	
	
	
	var horaPrazo = (data.getMinutes() * 60) + (data.getHours() * 3600);
	horaPrazo = parseInt(horaPrazo+"");
	
	//:::::::1::::::   :::::::::::::::::::::2:::::::::::::::::::	:::::::3::::::	   ::::::::::::::::::::4:::::::::::::::::::	:::::::5::::::
	//			       ::horaInicio1::::::::::::::::::horaFim1::                       ::horaInicio2:::::::::::::::::horaFim2::
	
	if(horaPrazo < horaInicio1){
		
		//////////1
//		segundos = segundos + (horaFim1 - horaInicio1);
//		segundos = segundos + (horaFim2 - horaInicio2);
		
	}else if(horaPrazo >= horaInicio1 && 
			horaPrazo <= horaFim1 ){
			
		//////////2
		segundos = 60;
//		segundos = segundos + (horaFim1 - horaPrazo);
//		segundos = segundos + (horaFim2 - horaInicio2);
		
	}else if(horaPrazo > horaFim1 && 
			horaPrazo < horaInicio2 ){
		
		//////////3
//		segundos = segundos + (horaFim2 - horaInicio2);
		
	}else if(horaPrazo >= horaInicio2 && 
			horaPrazo <= horaFim2 ){
		
		//////////5
		segundos = 60;
//		segundos = segundos + (horaFim2 - horaPrazo);
		
	}
	return segundos;
}


/**
 * retira os 0 para não dar problema no parseInt parseInt("09") / parseInt("9")
 * 
 * @param valor para retirar os zeros
 * @returns data sem zero
 */
function removeZeroEsquerdaData(valor){
	if((valor+"").indexOf("0") == 0){
		valor = (valor+"").substring(1,2);
	}
	
	return valor;
}



/**
 * 
 * @returns Nome da atividade
 */
function buscaNomeAtividade(){
	var nomeAtividade = "";
	var processo = getValue("WKDef");
	var versao = getValue("WKVersDef");
	var atividade = getValue("WKNextState");
	var c1 = DatasetFactory.createConstraint("processStatePK.processId", processo, processo, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("processStatePK.version", versao , versao, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("processStatePK.sequence", atividade , atividade, ConstraintType.MUST);
	var dataset_atividades = DatasetFactory.getDataset("processState", null, new Array(c1,c2,c3), null);
	
	if(dataset_atividades != null && dataset_atividades.rowsCount > 0){
		nomeAtividade = dataset_atividades.getValue(0,"stateDescription");
	}
	return nomeAtividade;
}

/**
 * Retorna o status da solicitação se ela esta no prazo ou atrasado
 * 
 * @param tempoGasto  - tempo gasto em segundos pela atividade
 * @param prazoSLAMinutos - prazo da atividade tambem em segundos
 * @returns status (No Prazo / Atrasada)
 */
function validaSituacao(tempoGasto, prazoSLAMinutos){
	
	var situacao = "";
	
	if(parseInt(tempoGasto) > parseInt(prazoSLAMinutos)){
		situacao = "Atrasada";
	}else{
		situacao = "No Prazo";
	}
	
	return situacao;
}


/**
 * 
 * Retorna o mes por extenso para usar nos filtros
 * 
 * @param data
 * @returns mes por extenso
 */
function retornaMesExtenso(data){
	var dataSplit;
	var mesExtenso = " ";
	if(data != null && data != ""){
		if(data.indexOf("-") != -1){
			dataSplit = data.split("-");
			mesExtenso = mesesExtensoObj[dataSplit[1]+""]+"/"+dataSplit[0];
		}else{
			dataSplit = data.split("/");
			mesExtenso = mesesExtensoObj[dataSplit[1]+""]+"/"+dataSplit[2];
		}
	}
	return mesExtenso;
	
}

/**
 * Busca hora inicial do periodo conforme o expediente
 * 
 * @param dataInicial - data a ser consultada
 * @param dataset_expediente
 * @returns hora inicio do periodo (8:00)
 */
function buscaHoraInicial(dataInicial, dataset_expediente){
	var diaDaSemana = dataInicial.getDay();
	var segundos = 0;
	var periodoInicial;
	var periodoInicialSplit;
	var periodoInicialRetorno;
	for (var s = 0; s < dataset_expediente.rowsCount; s++) {
		if (parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == diaDaSemana && 
				parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 1) {
				segundos = dataset_expediente.getValue(s,"initialHour");
			break;
		}
	}
	
	periodoInicial = parseInt(segundos) / 3600;
	
	if((periodoInicial+"").indexOf(".") > -1){
		periodoInicialSplit = (periodoInicial+"").split(".");
		periodoInicialSplit[1] = (parseInt(periodoInicialSplit[1]) * 60) / 100;
		periodoInicialRetorno = periodoInicialSplit[0]+":"+periodoInicialSplit[1];
	}else{
		periodoInicialRetorno = periodoInicial+":0";
	}
	
	return periodoInicialRetorno;
}


/**
 * 
 * Converte o tempo gasto de segundos para o especificado no pre cadastro de sla (minutos/horas/dias)
 * 
 * @param tempoGasto - tempo gasto em segundos na atividade
 * @param sla - sla especifico do item
 * @param dataset_expediente dataset de expediente
 * @returns prazo na medida especifoca do sla
 */
// function converteTempoGasto(tempoGasto, sla, expediente){
	
// 	var c1 = DatasetFactory.createConstraint("businessPeriodPK.periodId", expediente, expediente, ConstraintType.MUST);
// 	var dataset_expediente = DatasetFactory.getDataset("businessPeriod", null, new Array(c1), null);
	
// 	var prazo = 0;
// 	if(sla.medida_prazo == "minutos"){
// 		prazo = tempoGasto / 60;
// 	}else if(sla.medida_prazo == "horas"){
// 		prazo = tempoGasto / 3600;
// 	}else if(sla.medida_prazo == "dias"){
		
// 		var horaInicio1 = 0;
// 		var horaFim1 = 0;
// 		var horaInicio2 = 0;
// 		var horaFim2 = 0;
		
// 		for (var s = 0; s < dataset_expediente.rowsCount; s++) {
			
// 			if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == 2  && 
// 					parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 1){
				
// 				horaInicio1 = parseInt(dataset_expediente.getValue(s,"initialHour"));
// 				horaFim1 = parseInt(dataset_expediente.getValue(s,"finalHour"));
			
// 				break;
// 			}else if(parseInt(dataset_expediente.getValue(s,"businessPeriodPK.weekDay")) == 2  && 
// 					parseInt(dataset_expediente.getValue(s,"businessPeriodPK.sequence")) == 2){
// 				horaInicio2 = parseInt(dataset_expediente.getValue(s,"initialHour"));
// 				horaFim2 = parseInt(dataset_expediente.getValue(s,"finalHour"));
// 				break;
// 			}
// 		}
		
// 		var horasDia = parseInt(((horaFim2 - horaInicio2) + (horaFim1 - horaInicio1)) / 3600);
		
		
// 		prazo = (tempoGasto / 3600) / horasDia;
// 	}	
	
// 	return prazo;
// }


// function calculaPrazoConclusao(sla, expediente, atividadesDescartadas, primeirasAtividadesDescartadas, dataInicioParam, horaIncioParam, sequenceId){
	
	
// 	var dataInicio = montaTimeStamp(dataInicioParam, horaIncioParam, "data");
	
// 	var segundosPrazoDepoisMeiaNoite = (dataInicio.getMinutes() * 60) + (dataInicio.getHours() * 3600);
	
// 	var prazoMinutos = 0;
	
// 	if(sla.medida_prazo == "minutos"){
// 		prazoMinutos = sla.prazo_sla;
// 	}else if(sla.medida_prazo == "horas"){
// 		prazoMinutos = sla.prazo_sla * 60;
// 	}else if(sla.medida_prazo == "dias"){
		
// 		var c1 = DatasetFactory.createConstraint("businessPeriodPK.periodId", expediente, expediente, ConstraintType.MUST);
// 		var c2 = DatasetFactory.createConstraint("businessPeriodPK.weekDay", "2", "2", ConstraintType.MUST);
// 		var dataset_expediente = DatasetFactory.getDataset("businessPeriod", null, new Array(c1,c2), null);
		
// 		var minutosDia = parseInt(dataset_expediente.getValue(0,"finalHour")+"") - parseInt(dataset_expediente.getValue(0,"initialHour")+""); 
// 		minutosDia = minutosDia + (parseInt(dataset_expediente.getValue(1,"finalHour")+"") - parseInt(dataset_expediente.getValue(1,"initialHour")+""));
		
// 		minutosDia = minutosDia / 60;
		
// 		prazoMinutos = sla.prazo_sla * minutosDia;
// 	}
	
// 	if(atividadesDescartadas != ""){
// 		var dataset_data_tarefas = DatasetFactory.getDataset("sql_consulta_ultimo_movto_atividade", new Array(getValue("WKNumProces"),atividadesDescartadas),null, null);
		
// 		if(dataset_data_tarefas != null && dataset_data_tarefas.rowsCount > 0){
// 			var minutosDesconsiderados = calculaHorasDesconsiderar(dataset_data_tarefas);
// 			prazoMinutos = parseInt(prazoMinutos) + parseInt(minutosDesconsiderados);
// 		}
		
// 	}
	
// 	if(primeirasAtividadesDescartadas != ""){
// 		var primeirasAtividadesDescartadasArray;
// 		if(primeirasAtividadesDescartadas.indexOf(",") != -1){
// 			primeirasAtividadesDescartadasArray = primeirasAtividadesDescartadas.split(",");
// 		}
// 		else{
// 			primeirasAtividadesDescartadasArray = [primeirasAtividadesDescartadas];
// 		}
// 		for (var i = 0; i < primeirasAtividadesDescartadasArray.length; i++) {
// 			var dataset_data_tarefas_sem_ultima = DatasetFactory.getDataset("sql_consulta_data_tarefas_ultima_descartada", new Array(getValue("WKNumProces"),primeirasAtividadesDescartadasArray[i]),null, null);
			
// 			var minutosDesconsiderados = calculaHorasDesconsiderar(dataset_data_tarefas_sem_ultima);
// 			prazoMinutos = parseInt(prazoMinutos) + parseInt(minutosDesconsiderados);
// 		}
		
// 	}
	
// 	if(sla.medida_prazo == "minutos" && sla.prazo_sla != prazoMinutos){		
// 		hAPI.setCardValue('analyticsPrazoSLA', prazoMinutos);
		
// 	}else if(sla.medida_prazo == "horas" && sla.prazo_sla != prazoMinutos){
// 		var prazoHoras = prazoMinutos / 60;
// 		hAPI.setCardValue('analyticsPrazoSLA', prazoHoras);
// 	} 
// 	var objDataRetorno = hAPI.calculateDeadLineTime(dataInicio, segundosPrazoDepoisMeiaNoite, prazoMinutos, expediente, 1);
// 	var dataArray = (objDataRetorno[0]+"").split(" ");
// 	var prazoSegundos = parseInt(objDataRetorno[1]+"") / 3600;
	
// //	"Fri Aug 21 10:43:15 BRT 2015";	
	
// 	if((dataArray[2]+"").indexOf("0") == 0){
// 		dataArray[2] = (dataArray[2]+"").replace("0","");
// 	}
	
// 	var dia = parseInt(dataArray[2]+"");
// 	var mes = parseInt(mesesObj[dataArray[1]]+"");
// 	var ano = dataArray[5];
	
// 	var segundos = parseInt(objDataRetorno[0].getSeconds());
	
// 	var prazoOrigianl = parseInt(objDataRetorno[1]+"");
// 	var prazoSegundos = prazoOrigianl / 3600;
// 	var horas = parseInt((prazoSegundos+"").split(".")[0]);
	
// 	var minutos = prazoOrigianl - (horas * 3600);

	
// 	minutos = Math.ceil(minutos / 60);
	
// 	var dataPrazo = montaTimeStamp(dia+"/"+mes+"/"+ano, horas+":"+minutos+":"+segundos, "data");
	
// 	return dataPrazo;
	
// }

function calculaHorasDesconsiderar(dataset){
	
var total = 0;
	
	var data1;
	var data2;
	var diferenca = 0; 
	var total = 0;
	for (var i = 0; i < dataset.rowsCount; i++) {
			
			var dataInicio = (dataset.getValue(i,"DAT_INICIO")+"").split("-");
			var dataFim = (dataset.getValue(i,"DAT_FIM")+"").split("-");
			var horarioInicio = (dataset.getValue(i,"HRA_INICIO")+"").split(":");
			var horarioFim = (dataset.getValue(i,"HRA_FIM")+"").split(":");
			
			var dataForamatadaInicio = dataInicio[2]+"/"+dataInicio[1]+"/"+dataInicio[0]+" "+horarioInicio[0]+":"+horarioInicio[1]+":"+horarioInicio[2];
			var dataForamatadaFim = dataFim[2]+"/"+dataFim[1]+"/"+dataFim[0]+" "+horarioFim[0]+":"+horarioFim[1]+":"+horarioFim[2];			
			totalSegundos = calculaTempoGasto(dataForamatadaInicio, "Default", dataForamatadaFim);
			
			total = total + (parseInt(totalSegundos) /60);		
	}
	return total;
}