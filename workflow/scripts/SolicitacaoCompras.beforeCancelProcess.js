function beforeCancelProcess(colleagueId,processId){
	
	var dataAtual = new Date();
	var dataFormatada = formatarDataAnalytics(dataAtual.getDate(), (dataAtual.getMonth()+1), dataAtual.getFullYear(), dataAtual.getHours(), dataAtual.getMinutes(), dataAtual.getSeconds());
	
	
	hAPI.setCardValue("analyticsDtFim", dataFormatada.split(" ")[0]);
	hAPI.setCardValue("analyticsHrFim", dataFormatada.split(" ")[1]);
}