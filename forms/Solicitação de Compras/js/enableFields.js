//Carregue essa função como arquivo JS no arquivo HTML
//Necessita de jQuery
//No onload form ou ready jquery colocar a chamada enableFields()



function disableField($el, disabled){
	if(disabled){
		$("#" + $el.attr('id') + "_d").hide();
		$el.show();
	}
	else{
		if($("#" + $el.attr("id") + "_d").length > 0){
			$("#" + $el.attr("id") + "_d").show() 
		}else {
			($("#" + $el.attr("id") + "_d").length > 0) ? $("#" + $el.attr("id") + "_d").show() : $el.before($el.clone().attr({"id":($el.attr("id") + "_d"),"name":""}).attr("disabled",true));
		}
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
		var endWithDisabled = new RegExp(/_d$/);
		if($el.selector != undefined && $el.selector != "" && $el.selector != null) {
			$el = $("[name='"+$el.selector.replace("#","")+"']").filter(function(index, element) {
				return !endWithDisabled.test(element.id);
			});
		}
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

//	arr = $("select");
//	$.each(arr,function(index, item){
//		$(item).change();
//		if (item.disabled)item.className = item.className ? item.className + ' disabledSelect' : 'disabledSelect';
//		
//	});	
}

function enableInputElement(element){
	$("[name="+element.prop('name')+"_d]").detach();
	element.show();
}

function disableInputElement(element){
	$(element).each(function(){
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
			
			$(elementoClonado).prop("name", "");
			$(elementoClonado).prop("id", $(this).prop("id")+"_d");
			try {
				$(elementoClonado).prop("type", $(this).prop("type"));
			} catch (e) {
				//Textarea não possuí nenhum text
			}		
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
	});
}

function disableSelect(element){
	var clone = $(element).clone();
	$(clone).prop("name", "");
	$(clone).prop("id", element.prop("id")+"_d");
	$(clone).prop("text", element.prop("text"));
	$(clone).prop("class", element.prop("class"));
	$(clone).prop("disabled", true);
	$(clone).addClass('readonly');
	$(clone).insertBefore(element);
	element.hide();
}

function desabilitaSelect(idSelect){
	$(idSelect).addClass('readonly');
	$(idSelect).prop("disabled", true);
}


function enableFields(){
	
	if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1 && CURRENT_STATE != CORRECAO_SOLICITACAO){
		enableContainer($("#tbItens"), false);
		$("#tbItens").find("[name^=txtObsProduto___]").each(function(){
			enableField($(this), true);
		});
		
		enableField($("#nmFilial"), false);
		enableField($("#FILIAIS_CNPJ"), false);
		enableField($("#btnZoomCentroCusto"), false);
		enableField($("#nmFilialEntrega"), false);
		enableField($("#txtLocalEntrega"), false);
		enableField($("#prioridadeGeral"), false);
		enableField($("#motivoEmergencial"), false);
		$("#tbItens img").hide();
	}
	
	if(CURRENT_STATE != GERA_COTACAO_){
		disableInputElement($("#rdTipoCotacaoTabela"));
		disableInputElement($("#rdTipoCotacaoAberta"));
		disableInputElement($("#rdTipoCotacaoFechada"));
		enableField($("#btEnviaBionexo"), false);
		enableField($("#dtValidadeCotacao"), false);
		enableField($("#hrValidadeCotacao"), false);
		disableInputElement($("#ckImportado"));
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
		$("[name^=sFormaPagamento___]").each(function(){
			enableField($(this), false);
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
		desabilitaSelect('#icms_matmed');
	}
	
	if(CURRENT_STATE != DEFINIR_VENCEDOR){
		
		disableInputElement($("#rdContratoNao"));
		disableInputElement($("#rdContratoSim"));
		enableContainer($("divContrato"), false);
		$("[name^=vencedoraCotacao___]").each(function(){
			disableInputElement($(this));
			$(this).parent().addClass("readonly");
		});
		
		disableInputElement($("#txtJustificacaoCotacao"));
		
		disableInputElement($('#txtPropostaInic'));
		disableInputElement($('#txtDesconto'));
		disableInputElement($('#rdTeveNegociacaoSim'));
		disableInputElement($('#rdTeveNegociacaoNao'));
		desabilitaSelect('#icms_matmed');
	}
	
	if(CURRENT_STATE != APROVACAO_ALCADA && CURRENT_STATE != null){
		disableInputElement($("[name=rdAprovadoAlcada1]"));
		disableInputElement($("#txtJustificativaAlcada1"));
		disableSelect($("#slMotivoReprovacao" + $("contadorAlcada").val()));
		desabilitaSelect($('#icms_matmed'));
	}
	
	if(CURRENT_STATE != PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE){
		enableContainer(contratos,false);
		habilitaParecerContrato();		
		desabilitaSelect('#icms_matmed');
	}
	if(CURRENT_STATE == PRREENCHER_FORMULARIO_OBJETO_REAJUSTE_RECISAO_VALOR_VALIDADE){
		
		habilitaParecerContrato();
		
		if($("#contratoAprovado").val() == "true"){
			$("#divDocumentacaoContrato").show();
			enableContainer($('#divDocumentacaoContrato'),false);
			disableInputElement($("#ckFaltaDocumentacao"));
		}
		desabilitaSelect('#icms_matmed');
	}
		
	
	if(CURRENT_STATE == PARECER_SOLICITANTE){
		
		$("[name^=vencedoraCotacao___]").hide();
		
		var motivoReprovacao = $("#motivoReprovacao").val();
		if(motivoReprovacao == "filial"){
			enableField($("#nmFilial"), true);
		}else if(motivoReprovacao == "centroCusto"){
//			enableField($("#txtNomeCentroCusto"), true);
//			enableField($("#txtCodCentroCusto"), true);
			$("#btnZoomCentroCusto").show();
			
		}else if(motivoReprovacao == "parecerSolicitante"){
			var indice = $("#cdNivelAtualAprovacao").val();
			$("#divParecerSolicitante"+indice).show();
			
		}
		$("[name^=rdAprovadoAlcada]").attr('disabled', true);
		$("[name^=rdAprovadoAlcada]").addClass('readonly');
		desabilitaSelect('#icms_matmed');
	}
	if(CURRENT_STATE == APROVACAO_SOLICITANTE){
		enableField($("#retorno"), false);
		desabilitaSelect('#icms_matmed');
	}
	if(CURRENT_STATE == SOLUCAO_INCONSISTENCIA){
		enableField($("#aceite"), false);
		enableField($("#compSolicitante"), false);
		desabilitaSelect('#icms_matmed');
	}
	if(CURRENT_STATE == CORRECAO_COTACAO){
		$("#tbItens").find("[name^=aceitaJustificativa___]").each(function(){
			enableField($(this), false);
		});
	}
	if(CURRENT_STATE == null){
		enableContainer($('#aglutinacaoSolic'),false);
		enableContainer($('#itensDesvinculados'),false);
		desabilitaSelect('#icms_matmed');
	}

	if(CURRENT_STATE == ANALISE_COMPRADOR){
		enableField($("#prioridadeGeral"), true);
		enableField($("#motivoEmergencial"), true);
	}else{
		if(CURRENT_STATE != INICIO && CURRENT_STATE != INICIO_1){
			enableField($("#motivoEmergencial"), false);
		}
	}

	applyDisabledStyle();
}