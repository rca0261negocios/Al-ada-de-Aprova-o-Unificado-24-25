/*
 * ANALISTA RICARDO ANDRADE                                
 * 24.11.v05 
 */
var USER, subMAIL, userCode, cargoAprovador, qCargo, qMail, xData,
   PWSD, userNome, userMail, COMPANY, myInstance, myModalOBS, myLoading, qSO, gOBS = '',
   xMSGClick = 'Click sobre a linha da relação abaixo para aprovação individual',
   server, processoCI, userId, myURL, datasetFilhos, qBrowser, mydata,
   myTable, idAprovador, mailAprovador, nomeAprovador, ipINFO, ApprovalID,
   totWFS, totRET;

// CONTROLES PARA ENVIO DE LOTE DAS APROVACOES
var _LOG = "sim"; // GRAVAR LOG SIM/NÃO
var _ASYNC_COUNT = 0; // NUMERO DE REQUISICOES ATIVAS
var _ASYNC_MAX_REQUESTS = 3; // LIMITE MAXIMO DE REQUISICOES SIMULTANEAS
var _ASYNC_CALL_WAIT = 1000; // INTERVALO DE ESPERA ENTRE REQUISICOES EM
							 // MILISEGUNDOS
var _GIF_PROCESSANDO;
var dsParams;

var painelAUTORIZACAO = SuperWidget.extend({
   init: function() {
      // TIPO DE USUARIO
      myLoading = FLUIGC.loading(window, {
         textMessage: 'Processando...'
      });
      var tipUSU = tipoUSUARIO();
      if(!tipUSU) {
         $('.super-widget').hide();
         FLUIGC.toast({
            message: 'Usuário sem permissão de acesso.',
            type: 'danger'
         });
         return false;
      } else {
         // FORCAR PERMANECER NO WS SE STATE=0
         $(document).ajaxError(function(e, jqXHR, settings, exception) {
            if(jqXHR.readyState == 0 || jqXHR.status == 0) {
               // HORA DO RETORNO
               xHora = new Date();
               xHora = pad(xHora.getHours()) + ':' + pad(xHora.getMinutes()) + ':' + pad(xHora.getSeconds());

               // DATASET LOG
               callbackFactory = new Object();
               callbackFactory.success = function(data) {};
               callbackFactory.error = function(xhr, txtStatus, error) {};
               var constLOG = new Array();
                  constLOG.push(DatasetFactory.createConstraint("jqXHR-timer", xHora, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("jqXHR-error", jqXHR, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("jqXHR-error", settings, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("jqXHR-error", exception, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("jqXHR-error", jqXHR.getAllResponseHeaders(), null, ConstraintType.MUST));
               DatasetFactory.getDataset("DS_AUTORIZAR_LOGS", null, constLOG, null, callbackFactory);
               return; // Skip this error
            }
         });

         qSO = isMobile();
         if(qSO !== 'mobile') {
            // VERIFICA QUAL O NAVEGADOR EM USO
            qBrowser = getBrowserName();
            if((qBrowser !== 'Chrome' && qSO == 'web') && qBrowser !== 'Safari' && qBrowser !== 'unknown')
               FLUIGC.toast({
                  message: 'Navegador não homologado:' + qBrowser,
                  type: 'warning'
               });
         } else {
            // AJUSTAR QUADRO DE APROVACAO
            $('.noMobile').hide();
            $('.simMobile').show();
         }
         // DATASET COM PARAMETROS LOG/LOTES APROVACOES
         var dsPARAM = DatasetFactory.getDataset("DS_WF-PARAM", null, null, null);
         _ASYNC_COUNT         = 0;
         _LOG                 = dsPARAM.values[0]["ASYNC_LOG"];
         _ASYNC_MAX_REQUESTS  = parseInt(dsPARAM.values[0]["ASYNC_MAX_REQUESTS"]);
         _ASYNC_CALL_WAIT     = parseInt(dsPARAM.values[0]["ASYNC_CALL_WAIT"]);
         _GIF_PROCESSANDO     = dsPARAM.values[0]["GIF_PROCESSANDO"];

         // DATASET COM USUARIO E SENHA DO USUARIO ADM
         var ds_usuarioIntegrador = DatasetFactory.getDataset("DS_USUARIO_INTEGRADOR");
         USER = ds_usuarioIntegrador.values[0]["user"];
         PWSD = ds_usuarioIntegrador.values[0]["password"];

         // DADOS DO USUARIO APROVADOR
         server         = WCMAPI.serverURL;
         COMPANY        = WCMAPI.getOrganizationId();
         userNome       = WCMAPI["user"];
         userMail       = WCMAPI["userEmail"];
         ApprovalID     = WCMAPI["userId"];
         userCode       = WCMAPI["userCode"];
         cargoAprovador = '';

         $('#userNOME')[0].innerHTML = userNome.toUpperCase();
         $('#imgCOLABORADOR')[0].src = server + '/social/api/rest/social/image/profile/' + userCode + '/SMALL_PICTURE';

         // CARREGAR TABELA COM PENDENCIAS
         myInstance = this.instanceId;

         // ALTA DIRECAO e VERIFICAR SE O COLABORADOR/FORNECEDOR OU CLIENTE
         // EH O PROPRIO SUPERIOR IMEDIATO
         idAprovador   = [];
         mailAprovador = [];
         nomeAprovador = [];

         // CARREGAR TAREFAS
         myLoading.show();
         setTimeout(function() {
            loadTable();
            ajustaCSSCards();
            temAnexos();
         }, 300);
      }
   }
});

function loadTable(){
   // INICIAR PROCEDIMENTO DE CARREGAR APROVACOES
   processoCI = [];
   subMAIL    = [];
   qCargo     = [];
   qMail      = [];
   userId;
   myURL;
   
   // USUARIO APROVADOR
   myURL = server + '/api/public/2.0/tasks/findWorkflowTasks/' + userCode;
   FLUIGC.ajax({
      dataType: 'json',
      url: myURL,
      type: 'GET',
      contenttype: 'application/json',
      async: false,
      success: function(result) {
         processoCI[0] = result;
         // INSERIR NOVO CAMPO NO VETOR processoCI
         for (var iResult = 0; iResult < processoCI[0].content.length; iResult++)
            processoCI[0].content[iResult]["code"] = userCode;
      },
      error: function(request, status, error) {
         FLUIGC.toast({
            message: 'Não foi possível abrir a consulta de pendências do usuário. \n' + error,
            type: 'danger'
         });
         return false;
      }
   });

   // USUARIO SUBSTITUTO
   myURL = server + '/api/public/bpm/substituteUser/getValidSubstitutedUsers/' + COMPANY + '/' + userCode;
   FLUIGC.ajax({
      url: myURL,
      dataType: 'json',
      type: 'GET',
      contenttype: 'application/json',
      async: false,
      success: function(result) {
         userId = result;
      },
      error: function(request, status, error) {
         FLUIGC.toast({
            message: 'Não foi possível abrir a consulta de usuário substituto. \n' + error,
            type: 'danger'
         });
         return false;
      }
   });

   // CARREGAR DADOS
   for (var iDadosS = 0; iDadosS< userId["content"].length; iDadosS++) {
      var qUser = userId["content"][iDadosS].userId;
      //
      var qDT1 = userId["content"][iDadosS].validationFinalDate;
      qDT1 = qDT1.split('/');
      qDT1 = qDT1[2] +
             qDT1[1] +
             qDT1[0];

      var qNOW = new Date();
      var qDT2 = '' + qNOW.getFullYear() +
         pad(parseInt(qNOW.getMonth() + 1)) +
         pad(qNOW.getDate());

      // VERIFICAR SOMENTE SE ESTIVER DENTRO DO PERIODO DE VALIDADE DA
      // SUBSTITUICAO
      if(qDT1 >= qDT2) {
         myURL = server + '/api/public/2.0/tasks/findWorkflowTasks/' + qUser;
         FLUIGC.ajax({
            dataType: 'json',
            url: myURL,
            type: 'GET',
            contenttype: 'application/json',
            async: false,
            success: function(result) {
               if (result && result.content.length>0) {
                  processoCI.push(result);
                  qPush = processoCI.length-1;
                  // INSERIR NOVO CAMPO NO VETOR processoCI
                  for (var iResult = 0; iResult< processoCI[1].content.length; iResult++)
                	  try {
                		  if(processoCI[qPush].content[iResult]["code"]==null || processoCI[qPush].content[iResult]["code"]=='' )
                			  processoCI[qPush].content[iResult]["code"] = qUser;
                	  } catch (e) {
                		  // QDO NAO ENCONTRAR SUBSTITUICAO DO USUARIO
                		  
                	  }
               }
            },
            error: function(request, status, error) {
               FLUIGC.toast({
                  message: 'Não foi possível abrir a consulta de pendências do usuário ' + qUser + '. \n' + JSON.stringify(request),
                  type: 'danger'
               })
            }
         });
      }
   }

   // PASSO 2 - CARREGAR TABELA DE APROVACAO COM AS PENDENCIAS DO APROVADOR
   var that = this,
      record;
   //
   totalAPVS   = 0;
   myWF        = [];
   mydata      = [];
   
   /**
   {
       "processDescription": "Movimentacao Interna",
       "processId": "Movimentacao_Interna",
       "companyId": 1,
       "processInstanceId": 236,
       "version": 57,
       "requesterId": "admin",
       "requesterName": "Admin Fluig",
       "active": true,
       "attachmentSeqId": 1,
       "sourceProcess": 0,
       "sourceThreadSequence": 0,
       "stateId": 46,
       "stateDescription": "Parecer RH",
       "deadlineDate": null,
       "deadlineText": "Sem prazo definido",
       "documentDescription": "25 Maio, 2023 - Admin Fluig",
       "colleagueName": "Admin Fluig",
       "movementSequence": 14,
       "mainAttachmentDocumentId": 2264,
       "mainAttachmentDocumentVersion": 0,
       "rowId": 0,
       "movementHour": null,
       "mobileReady": false,
       "canCancel": false,
       "canTake": false,
       "url": null,
       "code": null
   }
   */

   // CARREGAR DATASET PROCESSOS E ATVIDADES QUE POSSUEM APROVACAO PENDENTE CONF PARAMETROS
   dsParams = DatasetFactory.getDataset("ds_ParamsWF_Aprovacao",null,null,null);

   // LER PENDENCIAS
   for (var i = 0; i < processoCI.length; i++) {
      // LER OS PROCESSOS QUE FORAM VALIDADOS
      if(processoCI[i] !== undefined)
    	  for (var a = 0; a < processoCI[i]["content"].length; a++) {
    		  // VALIDAR PROCESSOS
    		  processId = processoCI[i].content[a]["processId"];
    		  stateId   = processoCI[i].content[a]["stateId"];
    		  for (var iParams = 0; iParams < dsParams.values.length; iParams++) 
    			  if(processId==dsParams.values[iParams].CodDEF_Proces) 
    				  if(stateId == dsParams.values[iParams].code_activities){
    					// GRAVAR LINHA DE SOLICITACAO PENDENTE DE APROVACAO OU REPROVACAO
                  totalAPVS += 1;
    					mydata.push({
							Selecionado	                  : null,
							Decisao		                  : "Analisar",
		               processDescription 		      :  processoCI[i].content[a]["processDescription"		      ], // "Movimentacao Interna"
		               processId 				         :  processoCI[i].content[a]["processId"					      ], // "Movimentacao_Interna"
		               processInstanceId 		      :  processoCI[i].content[a]["processInstanceId"			      ], // 236
		               version 					         :  processoCI[i].content[a]["version"					         ], // 57
		               requesterId 				      :  processoCI[i].content[a]["requesterId"				         ], // "admin"
		               requesterName 			         :  processoCI[i].content[a]["requesterName"				      ], // "Admin Fluig"
		               stateId 					         :  processoCI[i].content[a]["stateId"					         ], // 46
		               stateDescription 			      :  processoCI[i].content[a]["stateDescription"			      ], // "Parecer RH"
		               deadlineDate 				      :  processoCI[i].content[a]["deadlineDate"				      ], // null
		               deadlineText 				      :  processoCI[i].content[a]["deadlineText"				      ], // "Sem prazo definido"
		               colleagueName 			         :  processoCI[i].content[a]["colleagueName"				      ], // "Admin Fluig"
		               movementSequence 			      :  processoCI[i].content[a]["movementSequence"			      ], // 14
		               mainAttachmentDocumentId	   :  processoCI[i].content[a]["mainAttachmentDocumentId"	  	], // 2264
		               mainAttachmentDocumentVersion :  processoCI[i].content[a]["mainAttachmentDocumentVersion"	], // 0
		               idAprovador					      :  processoCI[i].content[a]["code"                          ], // usuario aprovador
		               Obs							      :  ''
    					  });
    					  break;
    				  }
    	  }
   }

  // TOTALIZADORES
  $('#numTOTAL_'+that.myInstance)[0].innerText = totalAPVS
  $('#apvTOTAL_'+that.myInstance)[0].innerText = '0';
  $('#repTOTAL_'+that.myInstance)[0].innerText = '0';

  // HEADER
  var xHeader = new Array();
  if(qSO == 'mobile') {
	  xHeader.push({
                     'title': 'Sel'
                  }, {'title': 'Decisão','display': false
                  }, {'title': 'Processo'
                  }, {'title': 'Nº WF'
                  }, {'title': 'Requerente','display': false
                  }, {'title': 'Atividade','display': false
                  }, {'title': 'Aprovador','display': false
                  }, {'title': 'Obs'
                  }, {'title': 'Anexo'
                  }, {'title': 'Docto'
	  });
  } else
  xHeader.push({   'title': 'Sel'
               }, {'title': 'Decisão'
               }, {'title': 'Processo'
               }, {'title': 'Nº WF'
               }, {'title': 'Requerente'
               }, {'title': 'Atividade'
               }, {'title': 'Aprovador'
               }, {'title': 'Obs'
               }, {'title': 'Anexo'
               }, {'title': 'Docto'
               });

  //
  var qSearch = {
		  enabled: true,
		  onlyEnterkey: true,
		  searchAreaStyle: 'col-md-4 col-xs-12',
		  onSearch: function(res) {
			  myTable.reload(that.tableData);
			  var bResult;
			  if(res) {
				  var data = myTable.getData();
				  var search = data.filter(function(el) {
					  for (var [key, value] of Object.entries(el)) {
						  if(typeof value === "string") {
							  if(value.toUpperCase().indexOf(res.toUpperCase()) >= 0)
								  return el;
						  } else {
							  if(typeof value === "number") {
								  if(value.toString().toUpperCase().indexOf(res.toUpperCase()) >= 0)
									  return el;
							  }
						  }
					  }
				  });
				  myTable.reload(search);

				  if(search && search.length) {
					  myTable.reload(search);
					  bResult = true;
				  } else {
					  bResult = false;
				  }
			  }

			  if(!bResult && res) {
				  FLUIGC.toast({
					  title: 'Procurando por ' + res + ': ',
					  message: 'Não localizado',
					  type: 'warning'
				  });
			  } else {
				  temAnexos();
			  }
		  }
  };
  var qTemplate = '.template_area_buttons';
  if(qSO == 'mobile') {
	  qSearch = {
			  enabled: false
	  }
	  $('.template_area_buttons').hide();
	  qTemplate = '';
  }
  myTable = FLUIGC.datatable('#tabREQUERENTES_' + that.myInstance, {
	  dataRequest: that.mydata,
	  emptymessage: '<div class="text-center" style="color:red;"><b>Nenhuma pendência encontrada até o momento.</b></div>',
	  navButtons: {
		  enabled: false
	  },
	  draggable: {
		  enabled: false
	  },
	  classSelected: 'warning',
	  renderContent: '.tarefas_datatable',
	  header: xHeader,
	  tableStyle: 'table-hover',
	  search: qSearch,
	  actions: {
		  enabled: true,
		  template: qTemplate,
		  actionAreaStyle: 'col-md-8'
	  },
	  scroll: {
		  target: '#tabREQUERENTES_' + that.myInstance,
		  enabled: false
	  },
  }, function(err, data) {
	  if(err) {
		  FLUIGC.toast({
			  message: 'Erro ao tentar carregar o portal. \n ' + err,
			  type: 'danger'
		  });
	  } else {
		  if(qSO == 'mobile')
			  $('#msgClick').hide();
	  }
  });

  myTable.on('fluig.datatable.loadcomplete', function() {
	  if(!that.tableData) {
		  that.tableData = myTable.getData();
	  }
  });

  // ON CLICK SOLICITACAO
  $('#tabREQUERENTES_' + myInstance + ' tbody').on('click', 'tr', function() {
	  var xK = event.target.id;
	  var data = this.cells;
	  var myIndice = this.rowIndex - 1;

	  // SEGURANCA NENHUMA APROVACAO
	  if(data[0].children[0].innerHTML == 'Não há dados para serem exibidos.') {
		  FLUIGC.toast({
			  title: 'ATENÇÃO',
			  message: "Não há dados para serem exibidos. Você pode clicar no botão Atualizar para nova busca!",
			  type: 'info'
		  });
		  return false;
	  }

	  //
	  if(xK !== 'itSelecionado' && xK !== 'btnVerAnexos' & xK !== 'btnVerDoc') {
		  var Requerente  = data.Solicitante.textContent,
		  	  Decisao     = data.Decisao.textContent,
		  	  Workflow    = data.Workflow.textContent,
		  	  Solicitacao = data.Solicitacao.textContent

		  avaliarREQUERENTE(myIndice,Requerente,Decisao,Workflow,Solicitacao);
	  } else
		  if(xK == 'itSelecionado') {
			  // SOMAR ITEN SELECIONADO
			  var data = this.cells;
			  var myIndice = this.rowIndex - 1;
			  var qValor = data.Selecionado["children"]["itSelecionado"].checked;
			  var qSomar;
			  if(qValor) {
				  qSomar = +1;
			  } else {
				  qSomar = -1;
			  }
			  qSomar += parseInt($('.apvTOTAL')[0].innerText);
			  $('.apvTOTAL')[0].innerText = qSomar;
			  $('.repTOTAL')[0].innerText = qSomar;
		  } else
			  if(xK == 'btnVerAnexos') {
				  verAnexos(data.Solicitacao.textContent);
			  } else
				  if(xK == 'btnVerDoc') {
					  openDocument(data.Formulario.textContent, data.Versao.textContent, data.Solicitacao.textContent);
				  }
  });

  // ON CLICK GRAVAR OBSERVACAO REPROVACAO GLOBAL
  $(document).on("click", "[data-open-modal03]", function(ev) {
	  if($('#globalOBS').val() == '' || $('#globalOBS').val() == undefined || $('#globalOBS').val() == null) {
		  FLUIGC.toast({
			  title: 'ATENÇÃO',
			  message: "É preciso preencher a observação.",
			  type: 'warning',
			  timeout: 3000
		  });
	  } else {
		  // REPROVAR
		  var xAchei = false;
		  myModalOBS.remove();
		  var qLinhas = $('.regAprovacao td#Decisao').length;
		  qOBS = $('#globalOBS').val();
		  if(qLinhas > 0) {
			  for (var i = 0; i < qLinhas; i++) {
				  if($('.regAprovacao td#Selecionado input#itSelecionado')[i].checked) {
					  $('.regAprovacao td#Decisao')[i].innerText = 'Reprovado';
					  $('.regAprovacao td#Obs')[i].innerText = gOBS;
					  xAchei = true;
				  }
			  }
			  //
			  if(xAchei) {
				  // PROCESSAR DECISAO
				  $('#pbACOMPANHA').show();
				  setTimeout(function() {
					  confirmarENVIO(-1);
				  }, 300);
				  $('#pbACOMPANHA').hide();
			  } else {
				  $('#pbACOMPANHA').hide();
				  FLUIGC.toast({
					  title: 'ATENÇÃO',
					  message: "Nenhuma solicitação selecionada para ação de reprovação",
					  type: 'warning',
					  timeout: 3000
				  });
			  }
		  } else {
			  $('#pbACOMPANHA').hide();
			  FLUIGC.toast({
				  title: 'ATENÇÃO',
				  message: "Nenhuma solicitação encontrada",
				  type: 'warning',
				  timeout: 3000
			  });
		  }
	  }
	  $('#pbACOMPANHA').hide();
  });
}

function avaliarREQUERENTE(gbLinha,gbRequerente,gbDecisao,gbWorkflow,gbSolicitacao) {
   // APROVACOES NAS ATIVIDADES
   // FORUMULARIO PARA VISUALIZACAO
   var qLinha = gbLinha;
   
   var elDOCTO     = $('.regAprovacao td#Formulario' )[qLinha].innerText,
       elVERSAO    = $('.regAprovacao td#Versao'     )[qLinha].innerText,
       ATIVIDADE   = $('.regAprovacao td#stateId'    )[qLinha].innerText,
       SOLICITACAO = $('.regAprovacao td#Solicitacao')[qLinha].innerText,
       qTXT        = 'Aprovar Solicitação';
   
   // MONTAR CONSULTA
   var divConsulta =
      '<input type="hidden" id="qLinha" value="' + qLinha + '" />' +
      '<h5 style="text-align: center;">'+gbWorkflow+'</h5>'+
   	  '<h5 style="text-align: center;">('+SOLICITACAO+')</h5>';
   //
   var modo = WCMAPI.isMobileAppMode();
   if(modo == false) {
      divConsulta +=
         '<div class="pointer" style="text-align:center;text-decoration:underline;" onclick="openDocument(' + elDOCTO + ',' + elVERSAO + ',' + SOLICITACAO + ')">Visualizar Documento' +
         '</div>' +
         '<div class="pointer" style="text-align:center;text-decoration:underline;" onclick="verAnexos(' + SOLICITACAO + ')">Visualizar Anexos' +
         '</div>';
   }
   //

   divConsulta +=
      '<div id="mdDecisao">' +
      '   <p style="text-align: center">Decisão:&nbsp;</p>' +
      '   <input type="hidden" id="txtDecisao" name="txtDecisao" />' +
      '   <div class="row">' +
      '   	<div class="col-md-12 col-xs-12" style="text-align:center">' +
      '         <button type="button" class="btn btn-success" btn-avalia-Aprovado  id="btn1" style="font-size:x-small;">Aprovado</button> ' +
      '         <button type="button" class="btn btn-danger"  btn-avalia-Reprovado id="btn2" style="font-size:x-small;">Reprovado</button> ' +
   // '         <button type="button" class="btn btn-info"    btn-avalia-Revisar   id="btn3" style="font-size:x-small;">Recusado</button> '+ // ATIVAR SOMENTE SE O PROCEDIMENTO DE REVISAO FOR IMPLEMENTADO NO CLIENTE
      '   	</div>' +
      '   </div>' +
      '   <div class="row">' +
      '   	<div class="col-md-12 col-xs-12">' +
      '          <label>Obs</label>' +
      '   		<input type="text" class="form-control" id="txtObs" name="txtObs" style="text-align: center" />' +
      '   	</div>' +
      '   </div>' +
      '   <!-- PROGRESSO DECISAO -->' +
      '   <br />' +
      '   <div class="row">' +
      '     <div id="mdACOMPANHA" class="progress col-lg-12 col-md-10 col-xs-12" style="display:none;" >' +
      '       <div class="progress-bar-gif" role="progressbar" style="width:100%;"></div>' +
      '     </div>' +
      '   </div>' +
      '</div>';
   //
   var myModal1 = FLUIGC.modal({
      title: qTXT,
      content: divConsulta,
      id: 'fluig-modal01',
      size: 'small', // 'full | large | small'
      actions: [{
         'label': 'Confirmar',
         'bind': 'data-open-modal01'
      }, {
         'label': 'Fechar',
         'autoClose': true
      }]
   }, function(err, data) {
      if(err) {
         // FALHA AO TENTAR CARREGAR AVALIACAO
         FLUIGC.toast({
            title: 'ATENÇÃO',
            message: "Falha ao tentar carregar a tela de aprovação. MSG: " + err,
            type: 'danger'
         });
      }
   });

   // FUNCOES AUXILIARES
   // OBS PADRAO
   var retLinha = $('#qLinha').val();
   if($('.regAprovacao td#Obs')[retLinha].innerText !== '' && $('.regAprovacao td#Obs')[retLinha].innerText != undefined && $('.regAprovacao td#Obs')[retLinha].innerText != null)
      $('#txtObs').val($('.regAprovacao td#Obs')[retLinha].innerText);

   // GRAVAR ITEM
   $(document).on("click", "[data-open-modal01]", function(ev) {
      // RECUPERAR LINHA ATUAL DE EDICAO
      var retLinha = $('#qLinha').val();

      if($('#txtDecisao').val() !== '' && $('#txtDecisao').val() !== undefined) {
         // GRAVAR RESULTADO DA AVALIACAO
         $('.regAprovacao td#Decisao')[retLinha].innerText = $('#txtDecisao').val();
         if($('#txtObs').val() !== '' && $('#txtObs').val() !== undefined)
            $('.regAprovacao td#Obs')[retLinha].innerText = $('#txtObs').val();

         // VERIFICAR E SEGUIR
         if($('#txtDecisao').val() !== 'Aprovado' &&
            ($('#txtObs').val() == '' || $('#txtObs').val() == undefined || $('#txtObs').val() == null)) {
            FLUIGC.toast({
               message: 'é necessário preencher o campo Obs.',
               type: 'danger'
            });
         } else {
            // PROCESSAR DECISAO
            $('#pbACOMPANHA').show();
            setTimeout(function() {
               confirmarENVIO(retLinha);
            }, 300);
            myModal1.remove();
            $('#pbACOMPANHA').hide();
         }
      }
   })
   
   // APROVADO
   $(document).on("click", "[btn-avalia-Aprovado]", function(ev) {
      $('#txtDecisao').val('Aprovado');
      $('#btn1').attr('style', 'opacity: 1;font-size:x-small;');
      $('#btn2').attr('style', 'opacity:.5;font-size:x-small;');
      $('#btn3').attr('style', 'opacity:.5;font-size:x-small;');
   })
   // REPROVADO
   $(document).on("click", "[btn-avalia-Reprovado]", function(ev) {
      $('#txtDecisao').val('Reprovado');
      $('#btn1').attr('style', 'opacity:.5;font-size:x-small;');
      $('#btn2').attr('style', 'opacity: 1;font-size:x-small;');
      $('#btn3').attr('style', 'opacity:.5;font-size:x-small;');
      // PEDIR OBS
      $('#txtObs').focus();
   })
   // REVISAR
   $(document).on("click", "[btn-avalia-Revisar]", function(ev) {
      $('#txtDecisao').val('Revisar');
      $('#btn1').attr('style', 'opacity:.5;font-size:x-small;');
      $('#btn2').attr('style', 'opacity:.5;font-size:x-small;');
      $('#btn3').attr('style', 'opacity: 1;font-size:x-small;');
      // PEDIR OBS
      $('#txtObs').focus();
   })
   // FINAL FNC
}

function SelecionaTodos() {
   var qLinhas = $('.regAprovacao td#Decisao').length;
   if(qLinhas > 0) {
      var qSomar = 0;
      for (var i = 0; i < qLinhas; i++) {
         $('.regAprovacao td#Selecionado input#itSelecionado')[i].checked = true;
         qSomar += 1;
      }
      $('.apvTOTAL')[0].innerText = qSomar;
      $('.repTOTAL')[0].innerText = qSomar;
      // REFAZER VALOR TOTAL/SELECIONADOS
      FLUIGC.toast({
         title: 'ATENÇÃO',
         message: 'Todos os itens foram selecionados.',
         type: 'info'
      });
   }
}

function DesmarcarTodos() {
   var qLinhas = $('.regAprovacao td#Decisao').length;
   if(qLinhas > 0) {
      var qSomar = 0;
      for (var i = 0; i < qLinhas; i++) {
         $('.regAprovacao td#Selecionado input#itSelecionado')[i].checked = false;
      }
      $('.apvTOTAL')[0].innerText = qSomar;
      $('.repTOTAL')[0].innerText = qSomar;
      // REFAZER VALOR TOTAL/SELECIONADOS
      FLUIGC.toast({
         title: 'ATENÇÃO',
         message: 'Todos os itens foram desmarcados.',
         type: 'info'
      });
   }
}

function AprovaTodos(sender, e) {
   // e.preventDefault();
   var xAchei = false;
   var qLinhas = $('.regAprovacao td#Decisao').length;
   for (var i = 0; i < qLinhas; i++) {
      if($('.regAprovacao td#Selecionado input#itSelecionado')[i].checked) {
         $('.regAprovacao td#Decisao')[i].innerText = 'Aprovado';
         xAchei = true;
      }
   }
   //
   if(xAchei) {
      // PROCESSAR DECISAO
      $('#pbACOMPANHA').show();
      setTimeout(function() {
         confirmarENVIO(-1);
      }, 300);
      $('#pbACOMPANHA').hide();
   } else {
      $('#pbACOMPANHA').hide();
      FLUIGC.toast({
         title: 'ATENÇÃO',
         message: "Nenhuma solicitação selecionada para ação de aprovação",
         type: 'warning',
         timeout: 3000
      });
   }
}

function ReprovaTodos(sender, e) {
   // e.preventDefault();
   // SOLICITAR MOTIVO REPROVACAO GLOBAL
   // BUSCA OBSERVACAO REPROVACAO TODOS
   var divDigValor =
      '<div class="row">' +
      '	<div class="col-md-12 col-xs-12">' +
      '       <label>Observação Reprovação Selecionados</label>' +
      '		<input type="text" class="form-control" id="globalOBS" name="globalOBS" />' +
      '	</div>' +
      '</div>';
   //
   myModalOBS = FLUIGC.modal({
      title: 'Observação',
      content: divDigValor,
      id: 'fluig-modal01Valor',
      size: 'small', // 'full | large | small'
      actions: [{
         'label': 'Confirmar',
         'bind': 'data-open-modal03'
      }, {
         'label': 'Voltar',
         'autoClose': true
      }]
   }, function(err, data) {
      if(err) {
         // FALHA AO TENTAR CARREGAR MODAL
         FLUIGC.toast({
            title: 'ATENÇÃO',
            message: "Falha ao tentar carregar a tela observação. MSG: " + err,
            type: 'warning',
            timeout: 3000
         });
      }
   });
}

function openDocument(id, version, docSolicitacao) {
   if(id == undefined || id == null) {
      var index = myTarefas.selectedRows()[0];
      var selected = myTarefas.getRow(index);
      id = selected.Formulario;
      docSolicitacao = selected.Solicitacao;
      
   }
   var paramDOC = new Array();
	   paramDOC.push(DatasetFactory.createConstraint("activeVersion",true,true,ConstraintType.MUST));
	   paramDOC.push(DatasetFactory.createConstraint("documentPK.documentId"   ,id  ,id  ,ConstraintType.MUST));
   var dsDOC = DatasetFactory.getDataset("document", null, paramDOC, null);
   version = dsDOC.values[0]['documentPK.version']; 

   var xContent = '<iframe id="imgVIEWER" src="/webdesk/streamcontrol/0/' + id + '/' + version + '/" width="100%" height="350px" frameborder="0" style="background:url(' + _GIF_PROCESSANDO + ') center center no-repeat;"></iframe>';
   var myModalDocto = FLUIGC.modal({
      title: "Visualizar: " + docSolicitacao,
      content: xContent,
      id: 'fluig-document',
      size: 'full',
      actions: [{
         'label': 'Voltar',
         'autoClose': true
      }]
   }, function(err, data) {
      if(err) {
         console.log(err)
      }
   });
}

function pad(num) {
   var numRet = num;
   if(parseInt(num) <= 9) {
      numRet = "0" + num;
   }
   return numRet;
}

function verAnexos(qSOLICITACAO) {
   // LISTAR ANEXOS E VISUALIZAR
   if(qSOLICITACAO == undefined || qSOLICITACAO == null) {
      var index = myTarefas.selectedRows()[0];
      var selected = myTarefas.getRow(index);
      qSOLICITACAO = selected.Solicitacao;
   }
   var qARQUIVOS = [];
   var processAnexos =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      ' <ws:getAttachments>' +
      '  <companyId>' + COMPANY + '</companyId>' +
      '  <username>' + USER + '</username>' +
      '  <password>' + PWSD + '</password>' +
      '  <userId>' + userCode + '</userId>' +
      '  <processInstanceId>' + qSOLICITACAO + '</processInstanceId>' +
      ' </ws:getAttachments>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>';

   // ENVIANDO REQUISICAO PARA LOCALIZAR ANEXCOS DA SOLICITACAO
   var wsUrl2 = server + "/webdesk/ECMWorkflowEngineService?wsdl";
   var parserprocessoCI = new DOMParser();
   var xmlRequestprocessoCI = parserprocessoCI.parseFromString(processAnexos, "text/xml");
   WCMAPI.Create({
      url: wsUrl2,
      async: false,
      contentType: "text/xml; charset=UTF-8",
      dataType: "xml",
      data: xmlRequestprocessoCI,
      error: function(data) {
         FLUIGC.toast({
            message: 'Não foi possível verificar os anexos da solicitação nº ' + qSOLICITACAO + '. \n' + JSON.stringify(data),
            type: 'danger'
         })
      },
      success: function(data) {
         var rows = data["children"][0]["children"][0]["children"][0]["children"][0]["children"].length;
         for (var row = 1; row < rows; row++) {
            var xArquivo    = data["children"][0]["children"][0]["children"][0]["children"][0]["children"][row]["children"][8].innerHTML;
            var xFormulario = data["children"][0]["children"][0]["children"][0]["children"][0]["children"][row]["children"][7].innerHTML;
            var xVersao     = data["children"][0]["children"][0]["children"][0]["children"][0]["children"][row]["children"][14].innerHTML;
            //
            var xURL = '';
            var xARQ = server + "/api/public/2.0/documents/getDownloadURL/" + xFormulario;
            WCMAPI.Create({
               async: false,
               dataType: 'json',
               url: xARQ,
               type: 'GET',
               contenttype: 'application/json',
               success: function(data) {
                  xURL = data.content;
                  qARQUIVOS.push({
                     Arquivos: xArquivo,
                     Formulario: xFormulario,
                     Versao: xVersao,
                     meuLink: xURL
                  });
               },
               error: function(request, status, error) {
                  FLUIGC.toast({
                     message: 'Não foi possível localizar o anexo ' + xFormulario + ' \n' + error,
                     type: 'danger'
                  });
               }
            });
         }
         // FIM DOS ANEXOS
      }
   });

   // INSERIR RELACAO DE ANEXOS
   var divConsulta = '<div class="row" id="verANEXOS">';
   qSO = isMobile();
   if(qSO !== 'mobile')
      divConsulta += '<div class="alert alert-success" role="alert" style="text-align:center;font-size:small;"><b>Clique sobre o nome do arquivo para visualizar</b></div> ';
   divConsulta += '<div class="col-md-12 col-xs-12" id="tabANEXOS"></div></div>';
   //
   var myModalAnexos = FLUIGC.modal({
      title: 'ARQUIVOS ANEXOS',
      content: divConsulta,
      id: 'fluig-modalAnexos',
      size: 'large', // 'full | large | small'
      actions: [{
         'label': 'Fechar',
         'autoClose': true
      }]
   }, function(err, data) {
      if(err) {
         // FALHA AO TENTAR CARREGAR ANEXOS
         FLUIGC.toast({
            title: 'ATENÇÃO',
            message: "Falha ao tentar carregar relação de anexos. MSG: " + err,
            type: 'danger'
         });
      } else {
         // CARREGAR DATATABLE COM RELACAO DE ANEXOS
         myTableAnexos = FLUIGC.datatable('#tabANEXOS', {
            dataRequest: qARQUIVOS,
            emptymessage: '<div class="text-center" style="color:red;"><b>Nenhum anexo localizado.</b></div>',
            search: {
               enabled: false
            },
            navButtons: {
               enabled: false
            },
            draggable: {
               enabled: false
            },
            classSelected: 'danger',
            renderContent: '.arquivos_Anexos',
            header: [{
               'title': 'Nome Arquivo'
            }, {
               'title': ''
            }, {
               'title': ''
            }, {
               'title': 'Formulario',
               'display': false
            }, {
               'title': 'Versao',
               'display': false
            }],
            scroll: {
               target: '#tabANEXOS',
               enabled: true
            },
         }, function(err, data) {
            if(err) {
               FLUIGC.toast({
                  message: 'Erro ao tentar carregar relação de anexos. ' + err,
                  type: 'danger'
               });
            }
         });
      }
   });

   // ON CLICK VER ANEXO
   $('#tabANEXOS tbody').on('click', 'tr', function() {
      var xK = event.target.id;
      // **if(xK=='Arquivos' || xK=='Visualizar' || xK=='myVer') {
      if(xK == 'myVer' || (qSO !== 'mobile') && xK == 'Arquivos') {
         var data = this.cells;
         var myForm = this.cells.Formulario.innerText;
         var myVers = this.cells.Versao.innerText;
         var myFile = this.cells.Baixar.children.myLink.href;
         var myName = this.cells.Arquivos.innerText;
         // 
         openAttachmentView(myForm, myVers, myName);
      }
   });
}

function openAttachmentView(docId, docVersion, fileName) {
   // SE FORM IMAGEM OU GIF ABRE O ANEXO NO PROCESSO PADRÃO
   qSO = isMobile();
   if(qSO !== 'mobile') {
      // /stream/documentview
      var myURL = server + "/ecm_documentview/documentView.ftl";
      ECM.documentView = {};
      var cfg = {
         url: myURL,
         width: 750,
         height: 500,
         maximized: true,
         showbtclose: false,
         title: "Processando...",
         callBack: function() {
            ECM.documentView.getDocument(docId, docVersion);
         },
         customButtons: []
      };
      ECM.documentView.panel = WCMC.panel(cfg);
      $('#ecm-documentview-toolbar').hide();
      ECM.documentView.panel.bind("panel-close", function() {
         ECM.documentView.hideIFrame();
         if(ECM.documentView.toUndefined == undefined || ECM.documentView.toUndefined) {
            ECM.documentView = undefined;
         }
      });
   } else {

      // O primeiro passo é checarmos se estamos no mobile
      // RETORNO TOTVS CHAMADO 7279630 EM 18.05.2020
      // if(WCMAPI.isMobileAppMode()) {
      // var config = {
      // documentId: docId, // Código do documento que será aberto
      // title: fileName // Título que será usado na janela (Opcional)
      // };
      //	 
      // // Por fim abrimos o documento.
      // var configString = JSON.stringify(config);
      // JSInterface.openDocument(configString);
      // }

      var xARQ = server + "/api/public/2.0/documents/getDownloadURL/" + docId;
      WCMAPI.Create({
         async: false,
         dataType: 'json',
         url: xARQ,
         type: 'GET',
         contenttype: 'application/json',
         success: function(data) {
            var divConsulta = '';
            if(/\.(jpe?g|png|gif)$/i.test(fileName))
               divConsulta =
               '<div id="windowAnexo" class="col-lg-12 col-md-12 col-xs-12 col-sm-12">' +
               '<img src="' + data.content + '" alt="Houve um problema na exibição desta imagem." style="width:100%;"></img>' +
               '</div>';
            else
               divConsulta =
               '<iframe id="windowAnexo" class="col-lg-12 col-md-12 col-xs-12 col-sm-12" src="https://docs.google.com/viewerng/viewer?url=' + data.content + '&embedded=true" frameborder="0" style="padding:0;margin:0;background-color:gray;" width="100%" height="100%" allowfullscreen></iframe>';
            //
            myModalShowAnexos = FLUIGC.modal({
               title: fileName,
               content: divConsulta,
               id: 'fluig-showAnexos',
               size: 'full' // 'full | large | small'
            }, function(err, data) {
               if(err) {
                  // FALHA AO TENTAR CARREGAR VISUALIZACAO DO ANEXO
                  FLUIGC.toast({
                     title: 'ATENÇÃO',
                     message: "Falha ao tentar carregar o anexo. MSG: " + err,
                     type: 'warning',
                     timeout: 3000
                  });
               }
            });
            $('#fluig-showAnexos')[0].style.width = window.innerWidth - 5 + 'px';
            $('#fluig-showAnexos')[0].style.height = window.innerHeight - 5 + 'px';
            $("#fluig-showAnexos .modal-content")[0].style.height = window.innerHeight - 50 + 'px';
            $("#fluig-showAnexos .modal-content .modal-body")[0].style.height = window.innerHeight - 5 + 'px';
            $("#fluig-showAnexos .modal-content .modal-body")[0].style.maxHeight = window.innerHeight - 100 + 'px';
         },
         error: function(request, status, error) {
            FLUIGC.toast({
               message: 'Não foi possível localizar o anexo ' + xFormulario + ' \n' + error,
               type: 'danger'
            });
         }
      });
   }
}

function DTAgora() {
   var dtAgora = new Date();
   dtAgora.setDate(dtAgora.getDate());
   //
   var fData = pad(dtAgora.getDate()) + "/" +
      pad(parseInt(dtAgora.getMonth() + 1)) + "/" +
      dtAgora.getFullYear();
   //
   var hrAgora = new Date();
   hrAgora = pad(hrAgora.getHours()) + ':' + pad(hrAgora.getMinutes());
   //
   fData = fData + ' as ' + hrAgora;

   // VERIFICA SO
   fData = fData + ' / ' + qSO;

   return fData;
}

// CONTROLE
var 
   qItem,totWFS,totRET,xData,decisao,obs,xActualThreadprocessDescription,processId,
   processInstanceId,version,requesterId,requesterName,stateId,stateDescription,
   deadlineDate,deadlineText,colleagueName,movementSequence,mainAttachmentDocumentId,
   mainAttachmentDocumentVersion; 

function confirmarENVIO(qItem) {
   // CONTROLE DE LINHA OU LINHAS SELECIONADAS
   qItem              = parseInt(qItem);
   totWFS             = 0;
   totRET             = 0;
   xData              = DTAgora();
   obs                = [];
   decisao            = [];
   xActualThread      = [];
   processDescription = []; 		     
   processId          = []; 				        
   processInstanceId  = []; 		        
   stateId            = []; 					        
   proximaTarefa      = [];
   tarefaFinal        = [];
   xResult            = [];
   mainAttachmentDocumentId=[];
   requesterId        = []; 				        

   // SOMENTE QUANDO UM PROCESSO LIBERADO
   var qLinhas = $('.regAprovacao td#Decisao').length;
   if(qLinhas == 0) {
      // NENHUM ITEM SELECIONADO
      FLUIGC.toast({
         message: 'Nenhum item pendente de aprovação até o momento. Favor atualizar o teu painel.',
         type: 'warning',
         timeout: 3000
      });
   } else {
      var qLinha = 0;
      if(qItem >= 0) {
         qLinha = qItem;
         qLinhas = qItem + 1;
      }
      if(qLinha < 0)
         qLinha = 0;
      //
      for (var itens1 = qLinha; itens1 < qLinhas; itens1++) {
         // SOMENTE ITENS AVALIADOS
         decisao[itens1] = $('.regAprovacao td#Decisao')[itens1].innerText;
         if(decisao[itens1] !== 'Analisar') {
            // LOCALIZAR LINHA PARA GRAVAR DECISAO
            var xOBS = $('.regAprovacao td#Obs')[itens1].innerText;
            if(xOBS == '' || xOBS == null || xOBS == undefined)
               xOBS = gOBS;
            obs[itens1] = xOBS;

            processDescription[itens1]      	=  $('.regAprovacao td#Workflow'      )[itens1].innerText; 
            processId[itens1] 			     	=  $('.regAprovacao td#cdProcesso'    )[itens1].innerText; 
            processInstanceId[itens1] 	     	=  $('.regAprovacao td#Solicitacao'   )[itens1].innerText; 
            stateId[itens1] 					=  $('.regAprovacao td#stateId'       )[itens1].innerText; 
            mainAttachmentDocumentId[itens1]	=  $('.regAprovacao td#Formulario'    )[itens1].innerText; 
            requesterId[itens1] 				=  $('.regAprovacao td#idSolicitante' )[itens1].innerText; 
            idAprovador[itens1] 				=  $('.regAprovacao td#idAprovador'   )[itens1].innerText; 
        
            // CONTROLE DE APROVACAO/REPROVACAO
            switch (decisao[itens1]) {
	            case "Aprovado": 
                  for (var iParams = 0; dsParams.values.length; iParams++) 
                     if(processId[itens1]==dsParams.values[iParams].CodDEF_Proces)
                    	   if(stateId[itens1]==dsParams.values[iParams].code_activities){
	                        proximaTarefa[itens1] = dsParams.values[iParams].sequence_approved;
	                        tarefaFinal[itens1]   = dsParams.values[iParams].final_approved;
	                        xResult[itens1]       = dsParams.values[iParams].value_approved;
	                        break;
	                     }
   	            break;

	            case "Reprovado":
	               for (var iParams = 0; dsParams.values.length; iParams++) 
                     if(processId[itens1]==dsParams.values[iParams].CodDEF_Proces)
                    	 if(stateId[itens1]==dsParams.values[iParams].code_activities){
	                        proximaTarefa[itens1] = dsParams.values[iParams].sequence_reproved;
	                        tarefaFinal[itens1]   = dsParams.values[iParams].final_reproved;
	                        xResult[itens1]       = dsParams.values[iParams].value_reproved;
	                        break;
	                     }
	            	break;
	
	            case "Recusado":
                  for (var iParams = 0; dsParams.values.length; iParams++) 
                     if(processId[itens1]==dsParams.values[iParams].CodDEF_Proces)
                    	 if(stateId[itens1]==dsParams.values[iParams].code_activities){
	                        proximaTarefa[itens1] = dsParams.values[iParams].sequence_refused;
	                        tarefaFinal[itens1]   = dsParams.values[iParams].final_refused;
	                        xResult[itens1]       = dsParams.values[iParams].value_refused;
	                        break;
	                     }
	            	break;
            }

            // CONTROLE WF
            totWFS += 1;
            movimentar164(itens1);
         }
      }

      // ELIMINAR SOMENTE ITENS AVALIADOS SOMENTE QUANDO UM PROCESSO LIBERADO
      $('#apvTOTAL_' + myInstance)[0].innerText = '0';
      $('#repTOTAL_' + myInstance)[0].innerText = '0';

      var qLinhas = $('.regAprovacao td#Decisao').length - 1;
      for (var itens2 = qLinhas; itens2 >= 0; itens2--) {
         var iDecisao = $('.regAprovacao td#Decisao')[itens2].innerText;
         if(iDecisao !== 'Analisar') {
            // ATUALIZAR PAINEL
            totalAPVS -= 1;
            $('#numTOTAL_' + myInstance)[0].innerText = totalAPVS;
            $('.regAprovacao')[itens2].remove();
         }
      };
   }
}

function wfRetorno() {
   totRET += 1;
   if(totRET >= totWFS) {
      // FINALIZADO
      $('#pbACOMPANHA').hide();
      FLUIGC.toast({
         message: 'Processo de Aprovações finalizado!',
         type: 'success',
         timeout: 10000
      });
   }
}

String.prototype.replaceAll = function(de, para) {
   var str = this;
   var pos = str.indexOf(de);
   while (pos > -1) {
      str = str.replace(de, para);
      pos = str.indexOf(de);
   }
   return (str);
}

function ajustaCSSCards() {
   var xTamCards = 0;
   var qCards = document.getElementsByClassName('panel').length;
   if(qCards > 1) {
      for (var index1 = 0; index1 < qCards; index1++) {
         if(xTamCards == 0) {
            xTamCards = document.getElementsByClassName('panel')[index1].offsetHeight;
         } else {
            if(xTamCards < document.getElementsByClassName('panel')[index1].offsetHeight) {
               xTamCards = document.getElementsByClassName('panel')[index1].offsetHeight;
            }
         }
      }
      if(xTamCards > 0)
         for (var index1 = 0; index1 < qCards; index1++) {
            document.getElementsByClassName('panel')[index1].style.height = xTamCards + 'px';
         }
   }
}

function tipoUSUARIO() {
   // CONFIGURAR ACESSO MENUS DE ACORDO COM OS GRUPOS DE USUARIOS
   // (grp__Aprovadores)
   var adm = false,
      myUSER = WCMAPI.userCode,
      myServer = WCMAPI.serverURL,
      myURL = myServer + '/api/public/2.0/groups/containsUser/grp_Aprovadores/' + myUSER;
   FLUIGC.ajax({
      url: myURL,
      type: 'GET',
      dataType: 'json',
      contenttype: 'application/json',
      async: false,
      success: function(result) {
         adm = result["content"];
      },
      error: function(request, status, error) {
         FLUIGC.toast({
            message: 'Não foi possivel localizar a permissão de acesso do usuário logado. \n' + error,
            type: 'danger'
         })
      }
   });
   return adm;
}

function atualizaCIs() {
   // CARREGAR TAREFAS
   myLoading.show();
   setTimeout(function() {
      loadTable();
      temAnexos();
   }, 300);
}

function _async_remote_Call(options) {
   // EXECUCAO EM LOTE FORCAR A EXECUCAO CONFORME PARAMETROS EM DS_-PARAM
   if(_ASYNC_COUNT >= _ASYNC_MAX_REQUESTS) {
      // GERAR LOG
      console.log('@ ' + _ASYNC_COUNT + ' de ' + options.process);
      setTimeout(function() {
         _async_remote_Call(options)
      }, _ASYNC_CALL_WAIT);
   } else {
      // GERAR LOG
      console.log('# ' + _ASYNC_COUNT + ' de ' + options.process);

      // HORA DO INICIO
      xHora = new Date();
      xHora = pad(xHora.getHours()) + ':' + pad(xHora.getMinutes()) + ':' + pad(xHora.getSeconds());
      xParams = '' + _ASYNC_MAX_REQUESTS + ':' + _ASYNC_COUNT + ':' + _LOG;
      tSOAP = options.txtSOAP.replaceAll(' <', '<').replace(USER, '************').replace(PWSD, '************');

      // DATASET LOG
      var constLOG = new Array();

      // ** constLOG.push( DatasetFactory.createConstraint("meuIP",ipINFO["responseJSON"]["ip"],null,ConstraintType.MUST) );
      constLOG.push(DatasetFactory.createConstraint("timer", xHora, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("param", xParams, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("process/num", options.process, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/url", options.url, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/async", options.async, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/setTimeout", options.setTimeout, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/timeout", options.timeout, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/contentType", options.contentType, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/dataType", options.dataType, null, ConstraintType.MUST));
      constLOG.push(DatasetFactory.createConstraint("options/data", tSOAP, null, ConstraintType.MUST));
      //
      WCMAPI.Create({
         url: options.url,
         async: options.async,
         setTimeout: options.setTimeout,
         timeout: options.timeout,
         contentType: options.contentType,
         dataType: options.dataType,
         data: options.data,
         success: function(response, status, jqXHR) {
            if(options.success) 
               options.success(response);
         },
         error: function(jqXHR, status, errorThrown) {
            if(options.error) {
               options.error(jqXHR, status, errorThrown, options);
               // GERAR LOG
               if(_LOG == "sim") {
                  // HORA DO RETORNO
                  xHora = new Date();
                  xHora = pad(xHora.getHours()) + ':' + pad(xHora.getMinutes()) + ':' + pad(xHora.getSeconds());

                  // DATASET LOG
                  callbackFactory = new Object();
                  callbackFactory.success = function(data) {};
                  callbackFactory.error = function(xhr, txtStatus, error) {};
                  constLOG.push(DatasetFactory.createConstraint("timer " + options.process, xHora, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("error " + options.process, jqXHR, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("error " + options.process, status, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("error " + options.process, errorThrown, null, ConstraintType.MUST));
                  constLOG.push(DatasetFactory.createConstraint("error " + options.process, jqXHR.getAllResponseHeaders(), null, ConstraintType.MUST));
                  DatasetFactory.getDataset("DS_AUTORIZAR_LOGS", null, constLOG, null, callbackFactory);
               }
            }
         },
         complete: function(jqXHR, status) {
            _ASYNC_COUNT--;
            if(options.complete) {
               options.complete();
            }
            // GERAR LOG
            if(_LOG == "sim") {
               // HORA DO RETORNO
               xHora = new Date();
               xHora = pad(xHora.getHours()) + ':' + pad(xHora.getMinutes()) + ':' + pad(xHora.getSeconds());
               // DATASET LOG
               callbackFactory = new Object();
               callbackFactory.success = function(data) {};
               callbackFactory.error = function(xhr, txtStatus, error) {};
               constLOG.push(DatasetFactory.createConstraint("timer " + options.process, xHora, null, ConstraintType.MUST));
               constLOG.push(DatasetFactory.createConstraint("status " + options.process, status, null, ConstraintType.MUST));
               constLOG.push(DatasetFactory.createConstraint("complete " + options.process, "Ok", null, ConstraintType.MUST));
               constLOG.push(DatasetFactory.createConstraint("complete " + options.process, jqXHR.getAllResponseHeaders(), null, ConstraintType.MUST));
               DatasetFactory.getDataset("DS_AUTORIZAR_LOGS", null, constLOG, null, callbackFactory);
            }
         }
      });
      // PROXIMO
      _ASYNC_COUNT++;
   }
}

function movimentar164(qITEM) {
   $('#pbACOMPANHA').show();

   var msgSolicitacao = processInstanceId[qITEM];
   var wsUrl1 = server + "/webdesk/ECMCardService?wsdl";
   var wsUrl2 = server + "/webdesk/ECMWorkflowEngineService?wsdl";

   // VERIFICA SE O APROVADOR EH O SUBSTITUTO
   var substituto = 'não';
   if(idAprovador[qITEM] != userCode)
      substituto = 'sim';
   
   // TRANSFORMAR A DATA E HORA EM UM NUMERO INTEIRO
   var iData   = new Date();
   var nIndice = pad(iData.getHours()) + '' + pad(iData.getMinutes()) + '' + pad(iData.getSeconds());

   // RECUPERAR INDICE DA LINHA DO APROVADOR CONF SEQUENCIA DE APROVACAO
   var constAPV = new Array();
       constAPV.push(DatasetFactory.createConstraint("documentId", mainAttachmentDocumentId[qITEM], null, ConstraintType.MUST));
   var dsAPV = DatasetFactory.getDataset("DS_ALCADAS_QUEMAPROVA", null, constAPV, null);
   var statusIndice = -1;
   if(dsAPV.values != undefined && dsAPV.values.length > 0)
      statusIndice = dsAPV.values[0].apvSequencia;

   // PASSO 1 - GRAVAR DECISAO NO FORMULARIO
   var divConsulta =
         '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">' +
         '   <soapenv:Header/>' +
         '   <soapenv:Body>' +
         '      <ws:updateCardData>' +
         '         <companyId>'+ COMPANY + '</companyId>' +
         '         <username>' + USER + '</username>' +
         '         <password>' + PWSD + '</password>' +
         '         <cardId>'   + mainAttachmentDocumentId[qITEM] + '</cardId>' +
         '         <cardData>' ;

      var qLinhas = dsParams.values.length;
      for (var iParams = 0; iParams < qLinhas; iParams++) {
         if(processId[qITEM] == dsParams.values[iParams].CodDEF_Proces)
            if(stateId[qITEM] == dsParams.values[iParams].code_activities) {
               // CASO O INDICE DE APROVACAO SEJA MAIOR QUE ZERO PQ O CARDDATA NAO FOI PREENCHIDO 
               if(statusIndice>0)
                  divConsulta +=
                     '  <item>' + // SEAPROVADO - tabela dos aprovadores
                     '     <field>apvStatus___'+statusIndice+'</field>' +
                     '     <value>'+xResult[qITEM]+'</value>' +
                     '  </item>' ;

               // PEGAR CAMPOS DOS PARAMETROS PARA GRAVAR NO FORMULARIO VINCULADO AO PROCESSO A DECISAO TOMADA E DADOS DA DECISAO
               divConsulta += 
                  '  <item>' + // SEAPROVADO
                  '     <field>seAprovado</field>' +
                  '     <value>'+xResult[qITEM]+'</value>' +
                  '  </item>' + 
                  '  <item>' + // QUANDO 
                  '     <field>apvQuando___'+nIndice+'</field>' +
                  '     <value>'+xData+'</value>' +
                  '  </item>' +
                  '  <item>' + // RESPONSAVEL
                  '     <field>apvNome___'+nIndice+'</field>' +
                  '     <value>'+userNome+'</value>' +
                  '  </item>' +
                  '  <item>' + // SUBSTITUTO 
                  '     <field>apvSubstituto___'+nIndice+'</field>' +
                  '     <value>'+substituto+'</value>' +
                  '  </item>' +
                  '  <item>' + // EMAIL
                  '     <field>apvEMail___'+nIndice+'</field>' +
                  '     <value>'+userMail+'</value>' +
                  '  </item>' +
                  '  <item>' + // DECISAO
                  '     <field>apvDecisao___'+nIndice+'</field>' +
                  '     <value>'+xResult[qITEM]+ '</value>' +
                  '  </item>' +
                  '  <item>' + // obs
                  '     <field>apvObs___'+nIndice+'</field>' +
                  '     <value>' +obs[qITEM]+ '</value>' +
                  '  </item>' +
                  '';
                              
               break;
            }
      }

      divConsulta +=
         '         </cardData>' +
         '      </ws:updateCardData>' +
         '   </soapenv:Body>' +
         '</soapenv:Envelope>';

   // ENVIANDO DECISAO PARA FORMULARIO
   var parserCAT = new DOMParser();
   var xmlRequestCAT = parserCAT.parseFromString(divConsulta, "text/xml");
   _async_remote_Call({
      process: 'updateCardData:' + processId[qITEM],
      txtSOAP: divConsulta,
      url: wsUrl1,
      async: true,
      setTimeout: 84000,
      timeout: 84000,
      contentType: "text/xml; charset=UTF-8",
      dataType: "xml",
      data: xmlRequestCAT,
      error: function(jqXHR, status, errorThrown) {
         // ERRO NA HORA DE GRAVAR A CARDDATA JSON.stringify(data)
         FLUIGC.toast({
            message: 'WF ' + msgSolicitacao + ' updateCardData error ' + qSO + ' \n' + JSON.stringify(jqXHR),
            type: 'danger'
         });
      },
      success: function(data) {
         // PASSO 2 - RECUPERAR THREAD DA SOLICITACAO A SER MOVIMENTADO
         var threadProcess =
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/"> ' +
            '   <soapenv:Header/> ' +
            '   <soapenv:Body> ' +
            '      <ws:getActualThread> ' +
            '         <companyId>' + COMPANY + '</companyId>' +
            '         <username>' + USER + '</username>' +
            '         <password>' + PWSD + '</password>' +
            '         <processInstanceId>' + processInstanceId[qITEM] + '</processInstanceId> ' +
            '         <stateSequence>' + parseInt(stateId[qITEM]) + '</stateSequence> ' +
            '      </ws:getActualThread> ' +
            '   </soapenv:Body> ' +
            '</soapenv:Envelope> ';

         var parserprocessoCI = new DOMParser();
         var xmlRequestprocessoCI = parserprocessoCI.parseFromString(threadProcess, "text/xml");
         xActualThread[qITEM] = 0;

         _async_remote_Call({
            process: 'getActualThread:' + processInstanceId[qITEM],
            txtSOAP: threadProcess,
            url: wsUrl2,
            async: true,
            setTimeout: 84000,
            timeout: 84000,
            contentType: "text/xml; charset=UTF-8",
            dataType: "xml",
            data: xmlRequestprocessoCI,
            error: function(jqXHR, status, errorThrown) {
               // ERRO NA TENTATIVA DE RECUPERAR A THREAD
               // JSON.stringify(data)
               FLUIGC.toast({
                  message: 'getActualThread error ' + qSO + ' \n' + JSON.stringify(jqXHR),
                  type: 'danger'
               });
            },
            success: function(data) {
               if(data.key == 'ERROR') {
                  FLUIGC.toast({
                     message: 'Erro ao tentar recuperar a Thread da solicitação nº ' + processInstanceId[qITEM] + ' MSG: ' + data.content.message,
                     type: 'danger'
                  })
               } else {
                  // PASSO 3 - MOVIMENTAR SOLICITACAO
                  // VALOR THREAD
                  if(qBrowser == 'Chrome')
                     xActualThread[qITEM] = parseInt($(data)[0]["children"][0]["children"][0]["children"][0]["children"][0].innerHTML);
                  else
                     xActualThread[qITEM] = parseInt($(data)[0]["children"][0]["children"][0]["children"][0]["children"][0].innerHTML);

                  if(idAprovador[qITEM] !== userCode) {
                     // SUBSTITUTO
                     var qMovProcesso = 'saveAndSendTaskByReplacement';
                     var movprocesso =
                        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">' +
                        '   <soapenv:Header/>' +
                        '   <soapenv:Body>' +
                        '      <ws:saveAndSendTaskByReplacement>' +
                        '         <companyId>' + COMPANY + '</companyId>' +
                        '         <username>' + USER + '</username>' +
                        '         <password>' + PWSD + '</password>' +
                        '         <userId>' + idAprovador[qITEM] + '</userId>' +
                        '         <replacementId>' + userCode + '</replacementId>' +
                        '         <processInstanceId>' + processInstanceId[qITEM] + '</processInstanceId>' +
                        '         <choosedState>' + proximaTarefa[qITEM] + '</choosedState>' +
                        '         <colleagueIds>' + requesterId[qITEM] + '</colleagueIds>' +
                        '         <comments>Decisão via Painel de Aprovação como ' + decisao[qITEM] + '/substituto: ' + userNome + '</comments>' +
                        '         <completeTask>true</completeTask>' +
                        '         <threadSequence>' + xActualThread[qITEM] + '</threadSequence>' +
                        '         <attachments></attachments>' +
                        '         <cardData></cardData>' +
                        '         <appointment></appointment>' +
                        '         <managerMode>false</managerMode>' +
                        '      </ws:saveAndSendTaskByReplacement>' +
                        '   </soapenv:Body>' +
                        '</soapenv:Envelope>';
                  } else {
                     // APROVADOR
                     var qMovProcesso = 'saveAndSendTask';
                     var movprocesso =
                        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">' +
                        '   <soapenv:Header/>' +
                        '   <soapenv:Body>' +
                        '      <ws:saveAndSendTask>' +
                        '         <companyId>' + COMPANY + '</companyId>' +
                        '         <username>' + USER + '</username>' +
                        '         <password>' + PWSD + '</password>' +
                        '         <userId>' + userCode + '</userId>' +
                        '         <processInstanceId>' + processInstanceId[qITEM] + '</processInstanceId>' +
                        '         <choosedState>' + proximaTarefa[qITEM] + '</choosedState>' +
                        '         <colleagueIds></colleagueIds>' +
                        '         <comments>Decisão via Painel de Aprovação como ' + decisao[qITEM] + '</comments>' +
                        '         <completeTask>true</completeTask>' +
                        '         <threadSequence>' + xActualThread[qITEM] + '</threadSequence>' +
                        '         <managerMode>false</managerMode>' +
                        '         <attachments></attachments>' +
                        '         <cardData></cardData>' +
                        '         <appointment></appointment>' +
                        '      </ws:saveAndSendTask>' +
                        '   </soapenv:Body>' +
                        '</soapenv:Envelope>';
                  }
                  var parserprocessoCI = new DOMParser();
                  var xmlRequestprocessoCI = parserprocessoCI.parseFromString(movprocesso, "text/xml");
                  var paramsTeste = {
                     process: qMovProcesso + ':' + processId[qITEM],
                     txtSOAP: movprocesso,
                     url: wsUrl2,
                     async: true,
                     setTimeout: 84000,
                     timeout: 84000,
                     contentType: "text/xml; charset=UTF-8",
                     dataType: "xml",
                     data: xmlRequestprocessoCI,
                     nr_tentativa: 0,
                     error: function(jqXHR, status, errorThrown, memory) {
                        var error = JSON.stringify(jqXHR);
                        // ERRO NA TENTATIVA DE MOVIMENTAR A SOLICITACAO
                        // JSON.stringify(data)
                        FLUIGC.toast({
                           message: 'Não foi possível liberar a solicitação nº ' + msgSolicitacao + '. \n' +
                              qSO + ' \n' +
                              JSON.stringify(jqXHR),
                           type: 'danger'
                        });
                        //
                     },
                     success: function(data) {
                        var wsResult;
                        if(qBrowser == 'Chrome')
                           wsResult = $(data)[0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0].innerHTML;
                        else
                           wsResult = $(data)[0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0].innerHTML;
                        //
                        wsResult = wsResult.rtrim();
                        if(wsResult == 'ERROR:' || wsResult == 'ERROR') {
                           if(qBrowser == 'Chrome')
                              xMSG = $(data)[0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][1].innerHTML;
                           else
                              xMSG = $(data)[0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][0]["children"][1].innerHTML;
                           FLUIGC.toast({
                              message: 'Não foi possível liberar a solicitação nº ' + msgSolicitacao + '. ' + xMSG,
                              type: 'danger'
                           })
                        } else {
                           FLUIGC.toast({
                              message: 'WF ' + msgSolicitacao + ' processado',
                              type: 'info'
                           });
                           wfRetorno();
                        }
                     }
                  };
                  //
                  _async_remote_Call(paramsTeste);
               }
            }
         });
     }
   });
}
