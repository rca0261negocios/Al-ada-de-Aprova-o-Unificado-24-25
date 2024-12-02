//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()

function disableField($el, disabled){
	if(disabled){
		$("#" + $el.attr('id') + "_d").hide();
		$el.show();
	}
	else{
		($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":($el.attr("name") + "_d")}).attr("disabled",true));
		$el.hide();
	}
}

function enableContainer($el, enabled){
	$($el).find("input[type='radio'],input[type='text'],input[type='checkbox'],textarea,select,input[type='button'],img,span").each(function (i) {
		enableField($(this), enabled);
	});
};

function enableField($el, enabled){
	if($el.attr("type") == "text"){
		$el.prop("readonly",!enabled);
	}
	else if($el.prop("tagName") == "TEXTAREA"){
		$el.prop("readonly",!enabled);;
	}
	else if($el.prop("tagName") == "SELECT"){
		
		disableField($el, enabled);
		if(!enabled){
			disableSelect($el);
		}
	}
	else if($el.prop("tagName") == "SPAN"){
		if(!enabled && $el.hasClass("input-group-addon")){
			$el.hide();
		}else if($el.hasClass("btn-primary")){
			$el.prop("disabled",!enabled);
			$el.removeClass("input-group-addon");
			$el.addClass("disabledBtnPrimary");
			
		}else{
			$el.prop("readonly",!enabled);
		}
//		$el.prop("disabled",!enabled);
//		$el.click(function(){return false; });
//		$el.bind("click");
//		$el.off();
	}
	else if($el.attr("type") == "button" || $el.prop("tagName") == "IMG"){
		$el.prop("disabled",!enabled);
		if(enabled){
			$el.css("opacity", 1);
			$el.css("filter", "");
		} else {
			$el.css("opacity", 0.4);
			$el.css("filter", "alpha(opacity=40)");
		}
	}
	else if($el.attr("type") == "radio" || $el.attr("type") == "checkbox" || $el.attr("type") == undefined){
		
		if( $el.selector !=undefined){
			var endWithDisabled = new RegExp(/_d$/);
			$el = $("[name='"+$el.selector.replace("#","")+"']").filter(function(index, element) {
				return !endWithDisabled.test(element.id);
			});
			
			if($el.length && $el.length > 0 && ($el.attr("type") == "radio" || $el.attr("type") == "checkbox")){
				$el.each(function(i){
					$("label[for^='"+$(this).prop("id")+"']").each(function (i) {
						var suffix = (endWithDisabled.test($(this).prop("for"))) ? "_d" : "";
						if(enabled){
							$(this).prop("for", $(this).prop("for").replace(endWithDisabled,""));
						}
						else if(suffix == ""){
							$(this).prop("for", $(this).prop("for")+"_d");
						}
					});
					disableField($(this), enabled);
				});
			}
		}
	}
}

function applyDisabledStyle(){
	var arr = $("input");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("textarea");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});
	
	arr = $("span");
	$.each(arr,function(index, item){
		if (item.readOnly || item.disabled)item.className = item.className ? item.className + ' readonly' : 'readonly';
	});

	arr = $("select");
	$.each(arr,function(index, item){
		$(item).change();
		if (item.disabled)item.className = item.className ? item.className + ' disabledSelect' : 'disabledSelect';
		
	});	
}

function enableInputElement(element){
	$("[name="+element.prop('name')+"_d]").detach();
	element.show();
}

var xErro = false;
function disableInputElement(element){
	
	$(element).each(function(){
		
		try {
			var elementoDesabilitado = $("#"+$(this).prop("id")+"_d"); 
			
			if(elementoDesabilitado.length > 0){
				$(this).hide();
			}else{
				var elementoClonado;
				
				if($(this).prop("tagName") == "TEXTAREA"){
					elementoClonado = $("<textarea></textarea>");
					elementoClonado.prop("rows",$(this).prop("rows"))
				}
				else
					elementoClonado = $("<input>");
				
				$(elementoClonado).prop("name", $(this).prop("name")+"_d");
				$(elementoClonado).prop("id", $(this).prop("id")+"_d");
				$(elementoClonado).prop("type", $(this).prop("type"));
				$(elementoClonado).prop("class", $(this).prop("class"));
				
				if( $(this).prop("type") != undefined && 
						($(this).prop("type").toLowerCase() == "checkbox" || 
								$(this).prop("type").toLowerCase() == "radio")){
					$(elementoClonado).prop("checked", $(this).prop("checked"));
				}else{
					$(elementoClonado).val($(this).val());
				}
				$(elementoClonado).prop("disabled", true);
				$(elementoClonado).insertBefore($(this));
				$(this).hide();
			}
			
		} catch (e) {
			// ERRO AO TENTAR BLOQUEAR CAMPOS
			xErro = true;
		}
	});
	
	//if(xErro)
		//avisoMODAL("Atenção",["Favor acionar o suporte. Dados para edição de campos está apresentando falha"]);
}
function avisoMODAL(avTITULO,avMSG) {
	if(avMSG==null || avMSG=='')
		avMSG = 'Favor confirmar os dados do seu formulário';
	var xContent='';
	for (var iMSG = 0; iMSG < avMSG.length; iMSG++) 
		xContent +='<p>'+avMSG[iMSG]+'</p>';
	if(avTITULO==null || avTITULO=='')
		avTITULO = 'Atenção';
	FLUIGC.modal({
		title: avTITULO,
		content: xContent,
		id: 'fmWF_Aviso',
		size: 'large', // full | large | small
		actions: [{ 'label': 'Ok', 'autoClose': true }]
	});
}
function disableSelect(element){
	var clone = $(element).clone();
	$(clone).prop("name", element.prop("name")+"_d");
	$(clone).prop("id", element.prop("id")+"_d");
	$(clone).prop("text", element.prop("text"));
	$(clone).prop("class", element.prop("class"));
	$(clone).prop("disabled", true);
	$(clone).insertBefore(element);
	element.hide();
}


function enableFields(){
	
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRIGIR_SOLICITACAO){
			enableContainer($("#tbItens"), false);
			$("#tbItens").find("[name^=txtObsProduto___]").each(function(){
				enableField($(this), true);
			});
		
		enableField($("#nmFilial"), false);
		enableField($("#FILIAIS_CNPJ"), false);
		enableField($("#btnZoomCentroCusto"), false);
		enableField($("#nmFilialEntrega"), false);
		enableField($("#txtLocalEntrega"), false);
		$("#tbItens img").hide();
	}
	
	if(CURRENT_STATE != GERAR_COTACAO_FORNECEDOR){
		disableInputElement($("#rdTipoCotacaoTabela"));
		disableInputElement($("#rdTipoCotacaoAberta"));
		disableInputElement($("#rdTipoCotacaoFechada"));
		enableField($("#btEnviaBionexo"), false);
		//enableField($("#dtValidadeCotacao"), false);
		//enableField($("#hrValidadeCotacao"), false);
		disableInputElement($("#ckImportado"));
		
	}
	
	if(CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		enableContainer($("#cabecCompras"), false);
		enableField($("#ckImportado"), true);
		//enableContainer($("#itensPedidos"), false);
		$("#tbItens").find("[name^=btEmailCotacao___]").each(function(){
			enableField($(this), true);
		});
		//enableField($("#btEmailCotacao"), true);
	}
	
	if(CURRENT_STATE == DEFINIR_VENCEDOR){
		enableContainer($("#cabecCompras"), false);
		//enableContainer($("#itensPedidos"), false);
		$("#tbItens").find("[name^=btEmailCotacao___]").each(function(){
			enableField($(this), true);
		});
	}
	
	if(CURRENT_STATE == COTACAO){
		enableContainer($("#cabecCompras"), false);
	}
		
	if(CURRENT_STATE != COTACAO){
		var inputsCotacao = $('#tbCotacoes tbody tr:gt(0) td :text');
		inputsCotacao.each(function(){
			enableField($(this), false);
		});
		
		var imgCotacao = $('#tbCotacoes tbody tr:gt(0) td img');
		imgCotacao.each(function(){
			$(this).hide();
		});
		
		$("[name^=sModalidadeFrete___]").each(function(){
			enableField($(this), false);
		});
		$("[name^=vlrFrete___]").each(function(){
			enableField($(this), false);
		});
		$("[name^=prazoFornec___]").each(function(){
			enableField($(this), false);
		});
	}
	
	if(CURRENT_STATE != DEFINIR_VENCEDOR){
		
		disableInputElement($("#rdContratoNao"));
		disableInputElement($("#rdContratoSim"));
		enableContainer($("divContrato"), false);
	/*	$("[name^=vencedoraCotacao___]").each(function(){
			disableInputElement($(this));
			$(this).parent().addClass("readonly");
		});*/
		
		disableInputElement($("#txtJustificacaoCotacao"));
		
		disableInputElement($('#txtPropostaInic'));
		disableInputElement($('#txtDesconto'));
		disableInputElement($('#rdTeveNegociacaoSim'));
		disableInputElement($('#rdTeveNegociacaoNao'));
	}
	if(CURRENT_STATE == ANEXAR_MINUTA_PARA_VALIDACAO){
		enableContainer($("#cabecCompras"), false);
		var contador = $("#contadorAlcada").val();
		mostraAbaAprovacao(APROVACAO_ALCADA);
	}
	if(CURRENT_STATE == APROVACAO_ALCADA){
		enableContainer($("#cabecCompras"), false);
	}
	
	//alterado de PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE para PREENCHER_FORMULARIO_CONTRATO
	if(CURRENT_STATE != PREENCHER_FORMULARIO_CONTRATO){
		enableContainer(contratos,false);
		habilitaParecerContrato();		
	}
	//alterado de PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE para PREENCHER_FORMULARIO_CONTRATO
	if(CURRENT_STATE == PREENCHER_FORMULARIO_CONTRATO){
		
		habilitaParecerContrato();
		
		if($("#contratoAprovado").val() == "true"){
			$("#divDocumentacaoContrato").show();
			enableContainer($('#divDocumentacaoContrato'),false);
			disableInputElement($("#ckFaltaDocumentacao"));
		}
	}
		
	
	if(CURRENT_STATE == PARECER_DO_SOLICITANTE){
		
		$("[name^=vencedoraCotacao___]").hide();
		
		var motivoReprovacao = $("#motivoReprovacao").val();
		if(motivoReprovacao == "filial"){
			enableField($("#nmFilial"), true);
		}else if(motivoReprovacao == "centroCusto"){
			$("#btnZoomCentroCusto").show();
			
		}else if(motivoReprovacao == "parecerSolicitante"){
			var indice = $("#cdNivelAtualAprovacao").val();
			$("#divParecerSolicitante"+indice).show();
			
		}
	}
	
	if(CURRENT_STATE == PARECER_SOLICITANTE || CURRENT_STATE == GERAR_COTACAO_FORNECEDOR){
		
		$("[name^=vencedoraCotacao___]").hide();
		
		var motivoReprovacao = $("#motivoReprovacao").val();
		if(motivoReprovacao == "filial"){
			enableField($("#nmFilial"), true);
		}else if(motivoReprovacao == "centroCusto"){
//			enableField($("#txtNomeCentroCusto"), true);
//			enableField($("#txtCodCentroCusto"), true);
			$("#btnZoomCentroCusto").show();
			
		}else if(motivoReprovacao == "parecerSolicitante"){
			
		}
		var indice = $("#cdNivelAtualAprovacao").val();
		$("#divParecerSolicitante"+indice).show();
		$("[name^=rdAprovadoAlcada]").css('cursor', "not-allowed");
		$("[name^=rdAprovadoAlcada]").css('pointer-events', "none");
		$("[name^=rdAprovadoAlcada]").addClass('readonly');
		$("[name^=txtJustificativaAlcada]").addClass('readonly');
		$("[name^=txtJustificativaAlcada2]").prop("readonly", "readonly");
		$("[name^=slMotivoReprovacao]").addClass('readonly');
		$("[name^=slMotivoReprovacao]").css('cursor', "not-allowed");
		$("[name^=slMotivoReprovacao]").css('pointer-events', "none");
	}

	if(CURRENT_STATE == APROVACAO_DO_SOLICITANTE){
		enableField($("#retorno"), false);
	}
	if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		enableField($("#aceite"), false);
		enableField($("#compSolicitante"), false);
	}
	if(CURRENT_STATE == null){
		enableContainer($('#aglutinacaoSolic'),false);
		enableContainer($('#itensDesvinculados'),false);
	}
	if(CURRENT_STATE == VALIDAR_PROPOSTA){
		enableContainer($('#cabecCompras'),false);
		//enableContainer($('#itensPedidos'),false);
	}
	if(CURRENT_STATE == VALIDAR_MINUTA){
		enableContainer($('#cabecCompras'),false);
	}
	if(CURRENT_STATE == CORRIGIR_MINUTA){
		enableContainer($('#cabecCompras'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		enableField($("#txtJustificaContrato"),false);
	}
	if(CURRENT_STATE == RECOLHER_ASSINATURA_DIGITALIZAR_CONTRATO){
		enableContainer($('#cabecCompras'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		enableField($("#txtJustificaContrato"),false);
	}
	if(CURRENT_STATE == GERAR_CONTRATO_PROTHEUS){
		enableContainer($('#cabecCompras'),false);
		enableContainer($('#aprovacoesContrato'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		disableInputElement($("#rdAcordoEntreAsPartesSim"));
		disableInputElement($("#rdAcordoEntreAsPartesNao"));
	}
	if(CURRENT_STATE == APROVACAO_DO_SOLICITANTE){
		enableContainer($('#cabecCompras'),false);
		enableContainer($('#aprovacoesContrato'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		disableInputElement($("#rdAcordoEntreAsPartesSim"));
		disableInputElement($("#rdAcordoEntreAsPartesNao"));
	}
	if(CURRENT_STATE == CORRIGIR_INCONSISTENCIA){
		enableContainer($('#cabecCompras'),false);
		enableContainer($('#aprovacoesContrato'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		disableInputElement($("#rdAcordoEntreAsPartesSim"));
		disableInputElement($("#rdAcordoEntreAsPartesNao"));
	}
	if(CURRENT_STATE == EMITIR_PEDIDO_DE_COMPRA){
		enableContainer($('#cabecCompras'),false);
		enableContainer($('#aprovacoesContrato'),false);
		disableInputElement($("#rdAprovadoContratoSim"));
		disableInputElement($("#rdAprovadoContratoNao"));
		disableInputElement($("#rdAcordoEntreAsPartesSim"));
		disableInputElement($("#rdAcordoEntreAsPartesNao"));
	}
	
		
	applyDisabledStyle();
}