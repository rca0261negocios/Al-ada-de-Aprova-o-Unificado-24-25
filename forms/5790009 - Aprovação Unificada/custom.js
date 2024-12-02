$(function(){
   $("document").ready(function() {
      var ATIVIDADE = parseInt(getAtividade());
      if(ATIVIDADE == 5) {
         $('#pnlAprovador' ).show();
         $('#nomeAprovador').val( getUser() );
         $('#seAprovado').val("nao_confirmado");
      } else
      if(ATIVIDADE <5){
         $('#pnlAprovador' ).hide();
         $('#pnlAprovacoes').hide();
      } else {
         $('#pnlAprovador' ).show();
         $('#pnlAprovacoes').show();
      }
      if(ATIVIDADE == 7 && nextState == 5){
          $('#seAprovado').val("nao_confirmado");  
      }

      // SOMENTE TESTE
      if($('#orig_documentid').val() == ''){
         $("#orig_documentid").val(81178);  
         $("#orig_version"   ).val(1000);  
      }
      
      // EXIBIR DOCUMENTO ORIGINAL
      setTimeout(function() {
         showDocument($("#orig_documentid").val(), $("#orig_version").val());
      },1000);
   });

   $('#rdAprovado-1, #rdAprovado-2').on('click', function() {
      if($(this).val() == 'sim') {
         $('#txtObservacao').val('De acordo com a solicitação.');
         $('#seAprovado').val('sim');
      } else {
         $('#txtObservacao').val('');
         $('#seAprovado').val('nao');
      }
   });
});

function showDocument(qDocumentID,qVersion) {
   var xContent = '<iframe id="imgVIEWER" src="/webdesk/streamcontrol/0/' + qDocumentID + '/' + qVersion + '/" width="100%" height="500px" frameborder="0"></iframe>';
   $('#divDocument').html(xContent);
}

function openDocument() {
   var id             = $("#orig_documentid").val(),    
       version        = $("#orig_version").val() ? $("#orig_version").val() : "1000",
       docSolicitacao = $("#orig_docSolicitacao").val() ? $("#orig_docSolicitacao").val() : "Documento";

   if(id == undefined || id == null) {
      avisoMODAL('Atenção', 'Documento não encontrado. Favor acionar o suporte.', 'danger');
      return false;
   }
   
   // CARREGAR DOCUMENTO
   var xContent = '<iframe id="imgVIEWER" src="/webdesk/streamcontrol/0/' + id + '/' + version + '/" width="100%" height="350px" frameborder="0"></iframe>';
   FLUIGC.toast({title: 'Aguarde...', message: 'Buscando documento...', type: 'info'});
   var myModalDocto = FLUIGC.modal({
      title   : "Visualizar: " + docSolicitacao,
      content : xContent,
      id      : 'fluig-document',
      size    : 'full',
      actions : [{
         'label': 'Voltar',
         'autoClose': true
      }]
   }, function(err, data) {
      if(err) 
         console.log(err)
   });
}


function MostrarOcultarDIV(valor) {
	var buscaDiv = document.getElementById(valor);
	if (buscaDiv.style.display == 'none') 
		buscaDiv.style.display = 'block';
	else
		buscaDiv.style.display = 'none';
}

function openDocument(qSOLICITACAO) {
    // LOCALIZAR O ID NO DATASET PROCES_WORKFLOW
    fluigc.toast({title: 'Aguarde...', message: 'Buscando documento...', type: 'info'});

    var qEMPRESA = getValue("WKCompany");

    var param = new Array();
        param.push(DatasetFactory.createConstraint("COD_EMPRESA",qEMPRESA    ,qEMPRESA    ,ConstraintType.MUST));
        param.push(DatasetFactory.createConstraint("NUM_PROCES" ,qSOLICITACAO,qSOLICITACAO,ConstraintType.MUST));
    var ds = DatasetFactory.getDataset("PROCES_WORKFLOW", null, param, null);
    var id = ds.values[0]['NR_DOCUMENTO_CARD'];

    var paramDOC = new Array();
        paramDOC.push(DatasetFactory.createConstraint("activeVersion"        ,true,true,ConstraintType.MUST));
        paramDOC.push(DatasetFactory.createConstraint("documentPK.documentId",id  ,id  ,ConstraintType.MUST));
    var dsDOC   = DatasetFactory.getDataset("document", null, paramDOC, null);
    var version = dsDOC.values[0]['documentPK.version']; 
 
    var xContent = '<iframe id="imgVIEWER" src="/webdesk/streamcontrol/0/' + id + '/' + version + '/" width="100%" height="350px" frameborder="0" style="center no-repeat;"></iframe>';
    var myModalDocto = FLUIGC.modal({
       title   : "Visualizar: " + qSOLICITACAO,
       content : xContent,
       id      : 'fluig-document',
       size    : 'full',
       actions : [{
          'label': 'Voltar',
          'autoClose': true
       }]
    }, function(err, data) {
       if(err) 
          console.log(err)
    });
 }
 
 function pad(num) {
    var numRet = num;
    if(parseInt(num) <= 9) 
       numRet = "0" + num;
    return numRet;
 }
 
