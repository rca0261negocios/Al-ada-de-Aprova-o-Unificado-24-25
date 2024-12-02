/*
 ANALISTA RICARDO ANDRADE       
     24.11.v05
 */
function meuIP(){
    $.ajax({
    	  url: 'http://meuip.com/api/meuip.php',
    	  type: "get",
    	  success: function(DATA) {
    	      console.log("Seu IP é: "+data.response);
    	  },
    	  error: function(jqXHR, textStatus, errorThrown) {
    	      console.log(textStatus + jqXHR.responseText);
    	  }
    	});
}
function topFORM() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function temAnexos(){
    // CONFIRMAR SE TEM ANEXOS
	var qSOLICITACAO,processAnexos; 
	var qLinhas = $('.regAprovacao td#Solicitacao').length -1;
	for(var itens2 = qLinhas; itens2 >=0; itens2--) {
		qSOLICITACAO   = $('.regAprovacao td#Solicitacao'   )[itens2].innerText;
	    processAnexos=
	        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">'+
	        '<soapenv:Header/>'+
	        '<soapenv:Body>'+
	        '   <ws:getAttachments>'+
	        '         <companyId>'+COMPANY+'</companyId>'+
	        '         <username>'+USER+'</username>'+
	        '         <password>'+PWSD+'</password>'+
	        '         <userId>'+userCode+'</userId>'+
	        '         <processInstanceId>'+qSOLICITACAO+'</processInstanceId>'+
	        '</ws:getAttachments>'+
	        '</soapenv:Body>'+
	        '</soapenv:Envelope>';
	    
	    // ENVIANDO REQUISICAO PARA LOCALIZAR ANEXCOS DA SOLICITACAO
	    var wsUrl2 = server + "/webdesk/ECMWorkflowEngineService?wsdl";
	    var parserprocessoCI=new DOMParser();
	    var xmlRequestprocessoCI=parserprocessoCI.parseFromString(processAnexos,"text/xml");
	    WCMAPI.Create({
	        url: wsUrl2,
	        async: false,
	        contentType: "text/xml; charset=UTF-8",
	        dataType: "xml",
	        data: xmlRequestprocessoCI,
	        success: function( data ){
	            var rows = data["children"][0]["children"][0]["children"][0]["children"][0]["children"].length;
	            if(rows ==1) {
	                var xArquivo = data["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][8].innerText;
	                if(xArquivo=="" ||xArquivo==undefined){
		                // VERIFICAR ANEXOS DA SOLICITACAO DE COMPRAS
		            	var const0 = new Array();
		            		const0.push( DatasetFactory.createConstraint("SOLICITACAO",qSOLICITACAO,qSOLICITACAO,ConstraintType.MUST) );
		            	var dsANEXO = DatasetFactory.getDataset('DS_GED-SOLICITACOES-ORC-RECEBIDOS',null,const0,null);
		            	if(dsANEXO.values==undefined || dsANEXO.values.length<=0)
               				$('.regAprovacao td#bVerAnexos')[itens2]["children"][0].setAttribute('style','background-color:aliceblue;border:none;');
	            	}
	            }
	        }
	        // FIM DOS ANEXOS
	    });    
	};
}
function getBrowserName() {
	// VERIFICA QUAL EH O NAVEGADOR
	if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) 
		return 'Edge';
	else if( navigator.userAgent.indexOf("Opera") !== -1 || navigator.userAgent.indexOf('OPR') !== -1 )
		return 'Opera';
	else if( navigator.userAgent.indexOf("Chrome") !== -1 )
		return 'Chrome';
	else if( navigator.userAgent.indexOf("Safari") !== -1)
		return 'Safari';
	else if( navigator.userAgent.indexOf("Firefox") !== -1 ) 
		return 'Firefox';
	else if( ( navigator.userAgent.indexOf("MSIE") !== -1 ) || (!!document.documentMode == true ) ) //IF IE > 10
		return 'IE';
	else 
		return 'unknown';
}
function isMobile(){
   var SO = !navigator.userAgent || navigator.userAgent.match(/FluigApp|Mobile|Android/i) || navigator.userAgent.match(/FluigApp|Mobile|iPhone|iPad|iPod/i) ? "mobile" : "web";
   
   if(WCMAPI.isMobileAppMode())
	   SO ='mobile';
   
   return SO;
}
// 31.03.20 NOVAS FUNCOES P/AUXILIAR NO MOBILE
function voltarHOME(){
	var server = WCMAPI.serverURL;
	var emp    = WCMAPI.organizationId;
	location = server+'/portal/p/'+emp+'/home';
}

