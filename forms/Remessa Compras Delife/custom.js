$(document).ready(function () {
	var solicitante = new Solicitante();

	$(".fixedHeader").css('z-index', 1);

	switch (CURRENT_STATE) {
		case 0:
		case AtividadeEnum.INICIO:
			solicitante.init();
			$('#nomeSolicitante').val(solicitante.userName);
			$("#emailSolicitante").val(parent.WCMAPI.userEmail)
			$('#dataSolicitacao').val(getCurrentDate());
			$('#infoAdicionais').prop("readonly", "");
			$('#localEntrega').prop("readonly", "");
			$('#prazoEntrega').prop("readonly", "");
			FLUIGC.calendar("#prazoEntrega");
			$("#idFluxo").val(parent.ecm_wkfview.processId);//Seta o id do Fluxo
			break;
		case AtividadeEnum.CORRECAO_SOLICITANTE:
			//Ativa as configurações dos campos
			solicitante.init();
			$("[name^='codProd___']").each(function () {
				var indice = $(this).attr('id').split('___');
				solicitante.configRowProd(indice[1]);
			})
			$('#infoAdicionais').prop("readonly", "");
			$('#localEntrega').prop("readonly", "");
			$('#prazoEntrega').prop("readonly", "");
			//Exibe o fieldset de reprovação
			showMotivoReprovacao();
			//Reseta as alcadas de aprovação
			$('#aprovadorAlcadaAtual').val('');
			$('#contadorAlcada').val('1');
			$('#existeAlcada').val('nao');
			var valorTotal = $('#valorTotal').val();
			if (valorTotal != "") {
				var alcadaAprovacao = new AlcadaAprovacao();
				var aprovadores = alcadaAprovacao.getAprovadores($('#codFilialFluig').val(), valorTotal);
				if (aprovadores.length > 0) {
					$('#existeAlcada').val('sim');
					for (var i in aprovadores) {
						var aprovador = aprovadores[i];
						$("#aprovadorAlcada" + (parseInt(i) + 1)).val(aprovador.id);
					}
					$('#aprovadorAlcadaAtual').val(aprovadores[0].id);
				} else {
					$('#existeAlcada').val('nao');
				}
				//Limpa os campos que não possue aprovadores
				for (var i = aprovadores.length; i < 4; i++) {
					$("#aprovadorAlcada" + (parseInt(i) + 1)).val('');
				}
			}
			break;
		case AtividadeEnum.VALIDACAO_ONCOPROD:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			$('[name^=prevEntrega___').each(function () {
				$(this).prop("readonly", "");
				FLUIGC.calendar($(this));
			})
			$("#nomeAprovadorOncoprod").val(solicitante.userName);
			$("#idAprovadorOncoprod").val(solicitante.userId);
			$('#dataAprovacaoOncoprod').val(getCurrentDate());
			$("[name^=aprovacaoOncoprod]").prop("checked", "");
			configMotivo('[name="aprovacaoOncoprod"]', '#motivoRepovacaoOncoprod');
			$('[name^="motivoRepovacao"]').val("");
			//Remove a lixeira do paiFilho
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			escondeZoom();
			$("[data-prevEntrega]").addClass("required");
			break;
		case AtividadeEnum.ALCADA_APROVACAO:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			var alcadaAprovacao = new AlcadaAprovacao();
			var alcadaAtual = parseInt(alcadaAprovacao.contadorAlcada);

			$('#fieldset' + alcadaAtual + 'Alcada').show();
			//Seta o nome do aprovador da alcada atual
			$('#nomeAprovadorAlcada' + alcadaAtual).val(solicitante.userName);
			$('#dataAprovacaoAlcada' + alcadaAtual).val(getCurrentDate());

			//Quando reprovação exibe o campo de motivo
			configMotivo('[name="aprovacaoAlcada' + alcadaAtual + '"]', '#motivoRepovacaoAlcada' + alcadaAtual);
			var proximaAlcada = parseInt(alcadaAprovacao.contadorAlcada) + 1;
			var proximoAprovador = $("#aprovadorAlcada" + proximaAlcada).val();
			if (proximoAprovador != "") {
				$('#aprovadorAlcadaAtual').val(proximoAprovador);
			} else {
				$("#existeAlcada").val("nao");
			}
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			escondeZoom();
			break;
		case AtividadeEnum.EXCECAO_INTEGRACAO:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			//Função executada ao apertar o botão enviar que gera o xml
			showMotivoReprovacao();
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			escondeZoom();
			break;
		case AtividadeEnum.ANEXAR_NF:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			$('[name^=dataEntrega___').each(function () {
				$(this).prop("readonly", "");
				FLUIGC.calendar($(this));
			})
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			$("[data-dataentrega]").addClass("required");
			escondeZoom();
			//Exibe o fieldset de reprovação
			showMotivoReprovacao();
			break;
		case AtividadeEnum.VALIDACAO_ENTREGA:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			$("#nomeAprovadorEntrega").val(solicitante.userName);
			$("#idAprovadorEntrega").val(solicitante.userId);
			$('#dataAprovacaoEntrega').val(getCurrentDate());
			$("[name^=aprovacaoEntrega]").prop("checked", "");
			configMotivo('[name="aprovacaoEntrega"]', '#motivoRepovacaoEntrega');
			$('[name^="motivoRepovacao"]').val("");
			//Remove a lixeira do paiFilho
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			escondeZoom();
			break;
		case AtividadeEnum.FIM:
			$("#tbProd").tableHeadFixer({ "head": true, "left": 1 });
			$("#tbProd > tbody > tr > td:first-child, #tbProd > thead > tr > th:first-child, #tbProd > tfoot > tr > td:first-child").hide();
			escondeZoom();
			break;
	}

	//ajusta layout do campo pai filho
	$(".fs-md-space").each(function () {
		$(this).removeClass("fs-md-space");
	});

	infoPaciente();
})

function deleteRateio(oElement) {
	if (CURRENT_STATE == AtividadeEnum.INICIO ||
		CURRENT_STATE == 0 ||
		CURRENT_STATE == AtividadeEnum.CORRECAO_SOLICITANTE) {
		//Apaga linha
		fnWdkRemoveChild(oElement);
		//Seta o valor total da solicitacao
		sumTotal("saldoAberto", "totalSaldoAberto");
		sumTotal("inventarioProd", "totalInventarioProd");
		sumTotal("custoMensalProd", "totalCustoMensalProd");
		sumTotal("caixaProd", "totalCaixaProd");
		sumTotal("valorProd", "totalValorProd", true);
		sumTotal("qtdProd", "totalQtdProd");
		$("#valorTotal").val(sumTotal("valTotalProd", "totalValorProd", true)).change();
	}
}

function configZoom() {

}
function setSelectedZoomItem(item) {
	if (item.type != undefined) {
		if (item.type.indexOf('produto') != -1) {
			var indexRow = item.type.split('___');
			var tipo = item["COD_TIPO"];
			//Verifica se o produto é matmed
			if (tipo == "MD" || tipo == "MM" || tipo == "MQ" || tipo == "so") {
				$("#desProd___" + indexRow[1]).val(item["DESCRICAO"]);
				$("#unidProd___" + indexRow[1]).val(item["UM"]);
				$("#fabricanteProd___" + indexRow[1]).val(item["FABRICANTE"]);
				$("#contaContabilProd___" + indexRow[1]).val(item["CONTA_CONTABIL"]);
				$("#codProd___" + indexRow[1]).val(item["CODIGO"]).change();
			} else {
				showMessage("Atenção!", "Apenas produdos Matmed podem ser selecionados", null);
			}
		}else if(item.type == "zoomFilial"){
			$("#codFilialFluig").val(item.codigo);
			$("#codFilial").val(item.filial_protheus);
			$("#ufFilial").val(item.uf_filial);
			$("#filial").val(item.filial);
		}
	} else if (item.inputId == 'zoomEmail') {
		var email;
		if ($('#emails').val() == '') {
			$('#emails').val(item.EMAIL + ';')
		} else {
			email = $('#emails').val().split(';')
			if (email[email.length - 1] == '') { email.pop() }
			var add = true
			email.forEach(element => {
				if (element == item.EMAIL) { add = false }
			});
			if (add == true) {
				email.push(item.EMAIL + ';')
				$('#emails').val(email.join(';'));
			}
		}
	}
}
function removedZoomItem(item) {
	if (item.inputId == 'zoomEmail') {
		email = $('#emails').val().split(';')
		email.splice(email.indexOf(item.EMAIL), 1)
		if (email.length > 0) {
			if (email.length == 1) {
				$('#emails').val(email + ';')
			} else {
				$('#emails').val(email.join(';'));
			}
		} else {
			$('#emails').val('');
		}
	}
}

function sumTotal(nomeCampoPaiFilho, campoTotal, addMaskMonetareia) {
	var total = 0;
	$('[name^="' + nomeCampoPaiFilho + '"]').each(function () {
		total += removeMascaraMonetaria($(this).val());
	})
	if (addMaskMonetareia == true) {
		total = addMascaraMonetaria(total.toFixed(2));
		$("#" + campoTotal).val(total);
		return total;
	} else {
		$("#" + campoTotal).val(total);
		return total;
	}
}


function infoPaciente() {
	ocultaInfoPaciente();
	$("#infoPaciente").on("click", function () {
		if ($("#infoPaciente").data("visibility") == "hide") {
			mostraInfoPaciente();
		} else {
			ocultaInfoPaciente();
		}
	});
}

function mostraInfoPaciente() {
	$(".tdProdHidden").show(500);
	$("#infoPaciente").data("visibility", "show");
}

function ocultaInfoPaciente() {
	$(".tdProdHidden").hide(500);
	$("#infoPaciente").data("visibility", "hide");
}

function zoomFilial(){
	$("#zoomFilial").on("click", function(event) {
		openZoom("filiais",
				"codigo,Código,filial,Filial,cnpj_filial,CNPJ",
				"codigo,filial,cnpj_filial,filial_protheus,cidade_filial,endereco_filial,uf_filial", "&filterValues=",
				event.target.id);
	})
}