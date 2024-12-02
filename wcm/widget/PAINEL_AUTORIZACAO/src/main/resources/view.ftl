<!-- 
    ANALISTA RICARDO ANDRADE
     *** NAO IDENTAR ESTE CODIGO ***
        24.11.v05
-->
<script>
   <!-- RESPONSIVO  -->
   $('head').append("<meta name='viewport' content='width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no' />");
   $('head').append("<base href='/'>");
   $('head').append("<meta http-equiv='Cache-Control' content='no-cache, no-store, must-revalidate' />");
   $('head').append("<meta http-equiv='Pragma' content='no-cache' />");
   $('head').append("<meta http-equiv='Expires' content='0' />");
</script>

<!-- CUSTOMIZADOS -->
<script type="application/javascript" src="/webdesk/vcXMLRPC.js" charset="utf-8"></script> 

<div id="painelAUTORIZACAO_${instanceId}" 
	class="super-widget wcm-widget-class fluig-style-guide" 
	data-params="painelAUTORIZACAO.instance()"
	 style="margin-right:15px;margin-left:15px;margin-top:15px;">
	<!--  -->
	<div class="row simMobile" style="display:none;text-align:center;">
		<h5 style="margin:0px;" id="nVersao">24.11.v05</h5>
	</div>
	<!--  -->
	<div class="row noMobile">
		<div class="col-sm-8" style="text-align:center;">
			<h2 style="font-family:fantasy;margin:0px;">APROVAÇÃO WORKFLOW'S</h2>
			<h5 style="margin:0px;">24.11.v05</h5>
		</div>
		<div class="col-sm-3" style="text-align:right;">
			<h5 id="userNOME"></h5>
		</div>
		<div class="col-sm-1">
			<img style="width:42px;height:42px;border-radius:20px;" 
			     id="imgCOLABORADOR"  
			     src="/social/api/rest/social/image/profile/admin.financeiro/SMALL_PICTURE" 
			     class="fluig-style-guide thumb-profile thumb-profile-xs fa-3x pointer"></img>
		</div>
	</div>
	
	<!--  -->
	<input type="hidden" name="ipaddr" readonly>
	<input type="hidden" id="minhaURL" name="minhaURL"/>
	<div class="fluig-style-guide noMobile" data-back-to-top="" style="position: fixed; right: 60px; bottom: 15px; z-index: 1050;">
		<button type="button" data-back-to-top-button="" title="Voltar para Home!" onclick="voltarHOME()" class="btn btn-primary btn-btn-lg">
			<span class="fluigicon fluigicon-home fluigicon-fluigicon-sm">&nbsp;-Home</span>
		</button>
		<button type="button" data-back-to-top-button="" title="Atualizar pendências!" onclick="atualizaCIs()" class="btn btn-primary btn-btn-lg">
			<span class="fluigicon fluigicon-time fluigicon-fluigicon-sm">&nbsp;-Atualizar</span>
		</button>
 		<button type="button" data-back-to-top-button="" title="Voltar ao topo!" onclick="topFORM()" class="btn btn-primary btn-btn-lg"> 
 			<span class="fluigicon fluigicon-arrow-up fluigicon-fluigicon-sm">&nbsp;-Topo</span>
 		</button>
	</div>
	<!-- TITULO -->
	<div class="row mysticky">
		<div class="col-lg-4 col-md-4 col-xs-4 col-sm-4 thpanel" style="padding:0px 0px 0px 7px !important">
			<div class="panel panel-blue">
				<div class="panel-heading">
					<div class="row">
						<div class="col-xs-4">
							<i class="fluigicon fluigicon-discuss fa-4x"></i>
						</div>
						<div class="col-xs-9 text-right">
							<div id="numTOTAL_${instanceId}" class="huge numTOTAL">0</div>
							<div class="noMobile">Nº de Solicitações!</div>
						</div>
					</div>
				</div>
				<a href="javascript:void(0)">
					<div class="panel-footer" style="padding-top: 5px;padding-bottom: 5px;padding-right: 10px;padding-left: 10px;">
						<span class="pull-left"></span>
						<span class="pull-right">
							<i class="fluigicon fluigicon-certificate icon-sm"></i>
						</span>
						<div class="clearfix"></div>
					</div>
				</a>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 col-xs-4 col-sm-4 thpanel" style="padding:0px !important;">
			<div class="panel panel-green">
				<div class="panel-heading">
					<div class="row">
						<div class="col-xs-4">
							<i class="fluigicon fluigicon-thumbs-up fa-4x pointer" onclick="AprovaTodos()"></i>
						</div>
						<div class="col-xs-9 text-right">
							<div id="apvTOTAL_${instanceId}" name="apvTOTAL" class="huge apvTOTAL">0</div>
							<div class="noMobile">Aprovar selecionados!</div>
						</div>
					</div>
				</div>
				<a href="javascript:void(0)">
					<div class="panel-footer" style="padding-top: 5px;padding-bottom: 5px;padding-right: 10px;padding-left: 10px;">
						<span class="pull-left noMobile" onclick="AprovaTodos()">Clique para aprovar</span>
						<span class="pull-right">
							<i class="fluigicon fluigicon-check-circle-on icon-sm"></i>
						</span>
						<div class="clearfix"></div>
					</div>
				</a>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 col-xs-4 col-sm-4 thpanel" style="padding:0px 7px 0px 0px !important">
			<div class="panel panel-red">
				<div class="panel-heading">
					<div class="row">
						<div class="col-xs-4">
							<i class="fluigicon fluigicon-thumbs-down fa-4x pointer" onclick="ReprovaTodos()"></i>
						</div>
						<div class="col-xs-9 text-right">
							<div id="repTOTAL_${instanceId}" name="repTOTAL" class="huge repTOTAL">0</div>
							<div class="noMobile">Reprovar selecionados!</div>
						</div>
					</div>
				</div>
				<a href="javascript:void(0)">
					<div class="panel-footer" style="padding-top: 5px;padding-bottom: 5px;padding-right: 10px;padding-left: 10px;">
						<span class="pull-left noMobile" onclick="ReprovaTodos()">Clique para reprovar</span>
						<span class="pull-right">
							<i class="fluigicon fluigicon-remove-sign icon-sm"></i>
						</span>
						<div class="clearfix"></div>
					</div>
				</a>
			</div>
		</div>

		<!-- PROGRESSO DECISOES -->
		<div class="row" id="pbACOMPANHA" style="display:none;">
			<div class="progress col-lg-12 col-md-10 col-xs-12 col-sm-12">
		    	<div class="progress-bar-gif" role="progressbar" style="width: 100%;">
		    	</div>
			</div>
		</div>
	</div>

	<!-- TABELA DE DECISOES -->
	<div class="row">
		<div id="verSOLICITACOES" class="table-responsive col-lg-12 col-md-12 col-xs-11 col-sm-12">
			<div id="tabREQUERENTES_${instanceId}" class="tabREQUERENTES">
			</div>
		</div>
	</div>
</div> 

<!-- TEMPLATE DATATABLE -->
<script type="text/template" class="tarefas_datatable">
    <tr class="regAprovacao">
        <td id="Selecionado" 	  >{{Selecionado}}
        	<input type="checkbox" id="itSelecionado" name="itSelecionado" style="width:16px;height:16px;"/> 
        </td>
        <td id="Decisao" 	 style="font-size: smaller;">{{Decisao}}</td>
        <td id="Workflow"    style="font-size: smaller;">{{processDescription}}</td>
        <td id="Solicitacao" style="font-size: smaller;">{{processInstanceId}}</td>
        <td id="Solicitante" style="font-size: smaller;">{{requesterName}}</td>
        <td id="Atividade"   style="font-size: smaller;">{{stateDescription}}</td>
        <td id="Responsavel" style="font-size: smaller;">{{colleagueName}}</td>
        <td id="Obs"         style="font-size: smaller;">{{Obs}}</td>

        <!-- BOTAO ANEXOS -->
   	    <td id="bVerAnexos"><button type="button" id="btnVerAnexos" name="btnVerAnexos" 
   	    		title="Ver Arquivos anexados"
				class="btn btn-info btnVerAnexos"><i class="fluigicon fluigicon-paperclip icon-sm" id="btnVerAnexos"></i></button>
		</td>

		<!-- BOTAO DOCUMENTO -->		
		<td><button type="button" id="btnVerDoc" name="btnVerDoc" 
   	    		title="Ver Documento"
				class="btn btn-info btnVerDoc">
				<i class="fluigicon fluigicon-form icon-sm" id="btnVerDoc"></i>
			</button>
		</td> 

        <!-- CAMPOS OCULTOS -->
        <td id="stateId"       style="display:none;">{{stateId}}</td>
        <td id="Formulario"    style="display:none;">{{mainAttachmentDocumentId}}</td>
        <td id="Versao"        style="display:none;">{{mainAttachmentDocumentVersion}}</td>
        <td id="idSolicitante" style="display:none;">{{requesterId}}</td>
        <td id="idAprovador"   style="display:none;">{{idAprovador}}</td>
        <td id="cdProcesso"    style="display:none;">{{processId}}</td>
    </tr>
</script>

<!-- TEMPLATE ACOES NO DATATABLE -->
<script type="text/template" class="template_area_buttons">
	<div class="col-md-5">
		<button type="button" class="btn btn-default" onclick="SelecionaTodos()" class="warning" >Selecionar todos</button>
		<button type="button" class="btn btn-default" onclick="DesmarcarTodos()" class="warning" >Desmarcar todos</button>
	</div>
	<div class="col-md-7">
    	<div class="alert alert-info" role="alert" align="center" id="msgClick"
    		 style="padding-left:0px;padding-right:0px;padding-top:5px;padding-bottom:5px;margin-bottom:0px;">Click sobre a linha para aprovação individual</div>
	</div>
</script>

<!-- TEMPLATE ARQUIVOS ANEXOS -->
<script type="text/template" class="arquivos_Anexos">
    <tr class="regAnexos">
        <td id="Arquivos">{{Arquivos}}</td>
        <td id="Baixar">
	        <a href={{meuLink}} id="myLink">
	        <i class="fluigicon fluigicon-download icon-sm"></i></a>
        </td>
        <td id="Formulario" style="display:none;">{{Formulario}}</td>
        <td id="Versao"     style="display:none;">{{Versao}}</td>
    </tr>
</script>
