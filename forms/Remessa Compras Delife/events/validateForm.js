var errorMsg = "";
var indiceTbProd = {"itemProd":"do Item"};
function validateForm(form){
	var CURRENT_STATE = getValue("WKNumState") ? getValue("WKNumState") : 0;
	if(isTransferOrSave() == false){
		var idFluxo = form.getValue("idFluxo");
		if(CURRENT_STATE == 0 ||
		   CURRENT_STATE == AtividadeEnum.INICIO ||
		   CURRENT_STATE == AtividadeEnum.CORRECAO_SOLICITANTE){
			validaFormPrincipal(form);
		}else if(CURRENT_STATE == AtividadeEnum.VALIDACAO_ONCOPROD){
			if(form.getValue('aprovacaoOncoprod') == 'nao'){
				campoObrigatorio(form, 'motivoRepovacaoOncoprod', 'Motivo da reprovação');
			}else{
				campoObrigatorioPaiFilho(form,'tbProd',{"prevEntrega" : "Prazo de Entrega"}, indiceTbProd);
			}
			campoObrigatorio(form, 'nomeAprovadorOncoprod', 'Nome do aprovador');
			campoObrigatorio(form, 'idAprovadorOncoprod', 'Código do aprovador');
			campoObrigatorio(form, 'dataAprovacaoOncoprod', 'Data de aprovação');
			campoObrigatorio(form, 'aprovacaoOncoprod', 'Decisão');
		}else if(CURRENT_STATE == AtividadeEnum.ALCADA_APROVACAO){
			var numAlcada = form.getValue('contadorAlcada');
			campoObrigatorio(form, 'aprovacaoAlcada'+numAlcada, 'Decisão');
			if(form.getValue('aprovacaoAlcada'+numAlcada) == 'nao'){
				campoObrigatorio(form, 'motivoRepovacaoAlcada'+numAlcada, 'Motivo da reprovação');
			}
		}else if(CURRENT_STATE == AtividadeEnum.ANEXAR_NF){
			campoObrigatorioPaiFilho(form,'tbProd',{"dataEntrega" : "Data da Entrega"}, indiceTbProd);
		}else if(CURRENT_STATE == AtividadeEnum.VALIDACAO_ENTREGA){
			if(form.getValue('aprovacaoEntrega') == 'nao'){
				campoObrigatorio(form, 'motivoRepovacaoEntrega', 'Motivo da reprovação');
			}
			campoObrigatorio(form, 'nomeAprovadorEntrega', 'Nome do aprovador');
			campoObrigatorio(form, 'idAprovadorEntrega', 'Código do aprovador');
			campoObrigatorio(form, 'dataAprovacaoEntrega', 'Data de aprovação');
			campoObrigatorio(form, 'aprovacaoEntrega', 'Decisão');
		}
			
		if(errorMsg != ''){
			throw "<br/>"+errorMsg;
		}
	}
}

function validaFormPrincipal(form){
	campoObrigatorio(form, 'filial', 'Filial');
	campoObrigatorio(form, 'emails', 'E-mail');
	campoObrigatorio(form, 'fornecedor', 'Fornecedor');
	campoObrigatorio(form, 'centroDeCusto', 'Centro De Custo');
	campoObrigatorio(form, 'infoAdicionais', 'Informações Adicionais');
	campoObrigatorio(form, 'tabelaPreco', 'Tabela de Preço');
	campoObrigatorio(form, 'prazoEntrega', 'Prazo de entrega');
	campoObrigatorio(form, 'valorTotal', 'Valor Total dos Produtos', true)
	campoObrigatorio(form, 'localEntrega', 'Local da entrega');
	
	//Verifica se existe produtos e valida a zoom
	var qtdProdutos = form.getChildrenIndexes('tbProd').length;
	if(qtdProdutos > 0){
		var camposPaiFilho = {
				"itemProd"			: "Item",
				"dataInclusaoPedido": "Data de inclusão do pedido",
				"matriculaPaciente"	: "Matrícula",
				"nomePaciente"		: "Nome do paciente",
				"cpfPaciente"		: "CPF do paciente",
				"codProd"			: "Código do medicamento",
				"unidProd"			: "Unidade do medicamento",
//				"qtdEntregProd"		: "Entregas (Qtd)",
				"crmMedico"			: "CRM - Médico"
		};
		var camposPaiFilhoNumerico = {
				"qtdProd"			: "Qtd. Protheus",
				"valProd"			: "Valor do produto",
				"valTotalProd"		: "Total do valor do produto",
		}
		campoObrigatorioPaiFilho(form,'tbProd',camposPaiFilho, indiceTbProd, camposPaiFilhoNumerico);
		campoObrigatorio(form, 'prazoPagamento', 'Prazo de Pagamento');
	}else{
		errorMsg +='Produtos são obrigatórios na solicitação.</br>';
	}
}

