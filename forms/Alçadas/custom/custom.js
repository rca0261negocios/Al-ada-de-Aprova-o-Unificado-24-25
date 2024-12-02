$(function(){
   $("document").ready(function() {
      // ESCONDER TODOS OS BOTOES DO FORMULARIO
      if(getFormMode()=='VIEW'){
         $('.btn'      ).hide();
         $('.btnExport').show();
      } else {
         $('.btn'      ).show();
         $('.btnExport').hide();
      }

      // remover class de todas as linhas que possuem index ___x
      var rows = document.querySelectorAll('tr');
      for (var i = 0; i < rows.length; i++) {
         if(rows[i].id.indexOf('___') > 0)
            $('#'+rows[i].id).removeAttr('class');
      }

   });

   // EXECUTAR INCLUSAO DE ITENS DA TABELA DE APROVADORES
   $(document).on('click', '#btnInserirAprovador', function(){
         var index = wdkAddChild('tbAlcadas');
         $('#aprovadorNivel___'  +index).val(index);
         $('#lnAPV___'           +index).removeAttr('class');
         $('#zoomCentroCusto___' +index).prop('readonly', true ).prop('disabled', true);
         $('#zoomFilial___'      +index).prop('readonly', true ).prop('disabled', true);
      
         var inputs = $("[mask]");
         MaskEvent.initMask(inputs);
   });

   // EXECUTAR INCLUSAO DE ITENS DA TABELA DE FAIXA DE VALORES
   $(document).on('click', '#btnInserirValor', function(){
         var index = wdkAddChild('tbValores');
         $('#vlrNivel___' +index).val(index);

         var inputs = $("[mask]");
         MaskEvent.initMask(inputs);
   });

   // EXECUTAR INCLUSAO DE ITENS DA TABELA DE EXCESSAO
   $(document).on('click', '#btnInserirExcessao', function(){
         var index = wdkAddChild('tbExcessoes');
         $('#excessaoNivel___'+index).val(index);
        
         var inputs = $("[mask]");
         MaskEvent.initMask(inputs);
   });
});

function limparTabela(qTABELA){
   $('table[tablename=' + qTABELA + '] tbody tr').not(':first').remove();
   return;
}

function verTipoAprovacao(qCAMPO){
   var valorSelecionado = $("#" + qCAMPO.id + " option:selected").val()
   var id = qCAMPO.id.split('___')[1];
   switch(valorSelecionado){
      case 'CC': // CENTRO DE CUSTO
         $('#zoomCentroCusto___'    +id).prop('readonly', false).prop('disabled', false);
         $('#zoomFilial___'         +id).prop('readonly', true ).prop('disabled', true);
         window['zoomFilial___'     +id].clear().setValues('');;
         break;
      case 'FL': // FILIAL
         $('#zoomCentroCusto___'    +id).prop('readonly', true ).prop('disabled', true);
         $('#zoomFilial___'         +id).prop('readonly', false).prop('disabled', false);
         window['zoomCentroCusto___'+id].clear().setValues('');;
         break;
      default: // TODOS OS DEMAIS
         $('#zoomCentroCusto___'    +id).prop('readonly', true ).prop('disabled', true);
         $('#zoomFilial___'         +id).prop('readonly', true ).prop('disabled', true);
         window['zoomCentroCusto___'+id].clear().setValues('');;
         window['zoomFilial___'     +id].clear().setValues('');
         break;
   }
}

function MostrarOcultarDIV(valor) {
	var buscaDiv = document.getElementById(valor);
	if (buscaDiv.style.display == 'none') 
		buscaDiv.style.display = 'block';
	else
		buscaDiv.style.display = 'none';
}
 
function pad(num) {
    var numRet = num;
    if(parseInt(num) <= 9) 
       numRet = "0" + num;
    return numRet;
 }
 
function setSelectedZoomItem(selectedItem) {
   var id    = selectedItem.inputId.split('___');
   if(id[0] == 'apv_ccOperacionais') 
      $('#ccOperacionais_Id___'   +id[1]).val(selectedItem.colleagueId);
   
   else if(id[0] == 'apv_ccNaoOperacionais')
      $('#ccNaoOperacionais_Id___'+id[1]).val(selectedItem.colleagueId);
   
   else if(id[0] == 'apv_holding')
      $('#holding_Id___'          +id[1]).val(selectedItem.colleagueId);

   else if(id[0] == 'zoomCentroCusto')
      $('#centroCusto_Id___'        +id[1]).val(selectedItem.CODIGO);

   else if(id[0] == 'zoomFilial')
      $('#filial_Id___'             +id[1]).val(selectedItem.CODIGO);
}

function removedZoomItem(removedItem) {
   var id = removedItem.inputId.split('___');
   if(id[0] == 'apv_ccOperacionais') 
      $('#ccOperacionais_Id___'   +id[1]).val('');
   
   else if(id[0] == 'apv_ccNaoOperacionais')
      $('#ccNaoOperacionais_Id___'+id[1]).val('');
   
   else if(id[0] == 'apv_holding')
      $('#holding_Id___'          +id[1]).val('');
}  
