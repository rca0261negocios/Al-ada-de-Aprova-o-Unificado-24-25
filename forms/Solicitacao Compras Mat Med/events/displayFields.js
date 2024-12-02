function displayFields(form,customHTML){
	// REVISAO ALCADAS 24-25 SM2 RCA 09.2024
	var atividade     = getValue("WKNumState");
  var getDocumentId = form.getDocumentId();
	var getVersion    = form.getVersion();

  customHTML.append("<script>");
	customHTML.append("  function getAtividade() { return '" + atividade     + "'; }");
  customHTML.append("  function getDocumentId(){ return '" + getDocumentId + "'};");
	customHTML.append("  function getVersion()   { return '" + getVersion    + "'};");
	customHTML.append("  $('span.fluig-style-guide.fs-md-space').removeClass('fs-md-space');");
	customHTML.append("  var CURRENT_STATE = "+atividade+";");
  customHTML.append("</script>");

  if(form.getValue("prioridade") == "E")
  form.setVisibleById("div_motivoEmergencial", true);
  
  // SEGURANCA CAMPO IDENTIFICADOR
  // SM2 - RCA 05.02.24
  if(parseInt(atividade) >4)
    if( form.getValue("prioridade") !='' && form.getValue("filial") !='')
      if( form.getValue('campoIdentificador') || form.getValue('campoIdentificador')==null)         
          form.setValue("campoIdentificador",form.getValue("prioridade")+" - "+form.getValue("filial")+" - TP");
}
