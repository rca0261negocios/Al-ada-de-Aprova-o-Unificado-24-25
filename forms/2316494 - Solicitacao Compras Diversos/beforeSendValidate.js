var informaFaltaCotacao = true,MSG = [];
var beforeSendValidate = function(numState, nextState) {
	MSG = [];

	// VALIDAÇÕES DE CAMPOS OBRIGATÓRIOS
	if (numState == 6) { 
		var fonecedorExclusivo = $("#hideFornecedorExclu").val();
		var fonecedorExcluClassica = $("#hideFornecedorExcluClassica").val();
		if (fonecedorExclusivo == "false" && fonecedorExcluClassica == "false" ) {
			var valorTotalProd = $("#valorTotalSolicitacao").val().replace("R$ ","").replace(".","").replace(".","").replace(".","").replace(",",".");
			var indexForn = $("#tbCotacao > tbody > tr:not(:first-child)").length;	
			if ((valorTotalProd > 5000 && valorTotalProd <= 10000 && indexForn < 2)) 
				MSG.push("O valor total das Cotações está entre R$ 5.001 à R$ 10.000. É necessário ter no mínimo 2 fornecedores. ");
			if ((valorTotalProd > 10000 && indexForn < 3 ))  
				MSG.push("O valor total das Cotações é maior que R$ 10.000,00. É necessário ter no mínimo 3 fornecedores. ");                  
		}
		var qnt = $("table[tablename='tbProdAlterados'] tbody tr").length;
		if (qnt > 1) { // validar campos obrigatórios
			$("input[id^='alt_desc___']").each(function(index) {
				var id = $(this).attr("id").split("___")[1];
				if ($("#alt_obs___" + id).val() == "")
					MSG.push("Por favor preencher a justificativa de alteração na linha: "+id);
			});
		}
		var corrigirSol = $("#correcaoSolicitacao").val(); 
		if (informaFaltaCotacao && $("[name^=codCotacao___]").length > 0 && corrigirSol != "true") {
			var lineBreaker = "";
			var listaContacoes = "";
			$("[name^=codProd___]").each(function() {
				var cotacaoOK = false;
				var codItens = $(this).val();
				if (codItens) {
					var indexItem = $(this).attr("name").split("___")[1];
					$("[name^=codCotacao___]").each(function() {
						codCotacoes = $(this).val();
						if (codCotacoes) {
							var indexCotacao = $(this).attr("name").split("___")[1];
							if (codItens == codCotacoes) 
								cotacaoOK = true;
						}
					});
					if (!cotacaoOK) 
						listaContacoes += codItens + " - " + $("[name=nomeProd___" + indexItem).val() + lineBreaker;
				}
			});
			if (listaContacoes != "") {
				MSG.push("Aten\u00E7\u00E3o, n\u00E3o foram encontrados cota\u00E7\u00E3os para os seguintes itens: " + lineBreaker +
						listaContacoes + lineBreaker +"Sem as cota\u00E7\u00F5es acima <b>sua solicita\u00E7\u00E3o ainda pode ser movimentada</b>, porém os itens n\u00E3o ser\u00E3o inclu\u00EDdos na emiss\u00E3o do pedido de compra.");
			}
			if (MSG != "") {
				informaFaltaCotacao = false;
				MSG.push(msg);
			}
			if ($('#correcaoSolicitacao').val() == 'false') {
				verificaFornecedorSemCadastro();
			}
		}
	}

	if (numState == 410){
		// SALDOS PCO
		var tipoDespesa = $("#auxTipoDespesa").val();
		var fCAMPO;
		if (tipoDespesa == "nao_confirmado" || tipoDespesa == "") 
			MSG.push("O campo Tipo Despesa é obrigatório.");
		else 
			if (tipoDespesa == "capex") {
				// PEGAR OS ITENS DA TABELA COTACOES E VERIFICAR SE TEM SALDO DE PROJETO PARA CADA ITEM DA COTAÇÃO QUE POSSUI VENCEDOR SINALIZADO
				var indexes = $("table[tablename=tbCotacao] tbody tr").length - 1;
				if (indexes == null || indexes == undefined) 
					MSG.push("Nao consigo ler as cotações. Favor acionar o suporte" + lineBreaker);
				else {
					var total = 0,
					projetoExiste = false;

					for (var i=1; i<=indexes; i++) {
						var index = $("table[tablename=tbCotacao] tbody tr")[i].children[1].children[0].id.split("___")[1];

						var codigoItem    = $("#codCotacao___" + index).val();
						var descricaoItem = $("#nomeCotacao___" + index).val();

						if ($("#valorCotacao___" + index).val() == null ||
								$("#valorCotacao___" + index).val().trim() == "" ||
								converteMoedaFloat($("#valorCotacao___" + index).val()) <= 0) {

							MSG.push("[Item " + codigoItem + " - " + descricaoItem + "] O Valor Unitário é obrigatório!" + lineBreaker);
						}

						campoObrigatorioValidate("codCentroCusto", "Centro De Custo");

						var CONTA_ORC = $("#classeOrcamentaria").val();
						try {
							CONTA_ORC = CONTA_ORC.split(' - ')[0];
						} catch (e) {
							CONTA_ORC = "";
						}

						var CLASSE_VLR = $("#classeValor").val();
						try {
							CLASSE_VLR = CLASSE_VLR.split(' - ')[0];
						} catch (e) {
							CLASSE_VLR = "";
						}

						var FILIAL = $("#codFilial").val();
						if (FILIAL == "") 
							MSG.push("O campo Filial é obrigatório.");

						if (CONTA_ORC.trim()  == "") MSG.push("O campo Classe Orçamentária é obrigatório para despesas Capex.");
						if (CLASSE_VLR.trim() == "") MSG.push("O campo Classe de Valor é obrigatório para despesas Capex.");
						if (CONTA_ORC != '' && CLASSE_VLR != '' && FILIAL != '') {
							var indexProd = $("table[tablename=tbCotacao] tbody tr").length - 1;
							if (indexProd > 0)

								var constraints = [
								                   DatasetFactory.createConstraint("FILIAL"	    , FILIAL	, '', ConstraintType.MUST),
								                   DatasetFactory.createConstraint("ITEM"		, codigoItem, '', ConstraintType.MUST),
								                   DatasetFactory.createConstraint("CLASSE_ORC" , CONTA_ORC	, '', ConstraintType.MUST),
								                   DatasetFactory.createConstraint("CLASSE_VLR" , CLASSE_VLR, '', ConstraintType.MUST)
								                   ];
							var dataset = DatasetFactory.getDataset("DS_PCO_SALDOS", null, constraints, null);
							try {
								if (dataset && dataset.values && dataset.values.length > 0) {
									projetoExiste = true;
									var saldo = parseFloat(dataset.values[0].SALDO);
									if (!isNaN(saldo)) 
										total += saldo;
								}
							} catch (erro) {
								log.error("Erro ao consultar saldo: " + erro);
							}
						}
					}
				}

				// VALIDAR TOTAL PROJETO X COTACAO
				if(projetoExiste){
					var VALOR_SOLICITACAO = removeMascaraMonetaria( $("#valorTotalSolicitacao").val() );
					VALOR_SOLICITACAO     = parseFloat(VALOR_SOLICITACAO);
					if (isNaN(VALOR_SOLICITACAO)) 
						VALOR_SOLICITACAO = 0;

					if (VALOR_SOLICITACAO <= 0) 
						MSG.push("O valor total da solicitação deve ser maior que zero.");

					if (VALOR_SOLICITACAO > total) 
						MSG.push("Saldo insuficiente de projeto para a solicitação.");	
				} else 
					MSG.push("Projeto não encontrado para os parâmetros informados.");
			}
	}

	// PROJETO PCO - SM2CE NOV.24
	if (numState <= 5) { 
		if(getCompletaTarefa() =='null' || getCompletaTarefa() == "false" || getAtividade() == getProximaAtividade()){
			if ($("#isAlcadaCarta").val() == "erro") 
				MSG.push($("#isAlcadaMsg").val());

			if ($("#isAlcadaDiversos").val() == "erro") 
				MSG.push($("#isAlcadaMsg").val());

			if ($("#isAlcadaPA").val() == "erro") 
				MSG.push($("#isAlcadaMsg").val());

			if (numState == INICIO || numState == 0) {
				campoObrigatorioValidate("codFilial"				, "Filial");
				campoObrigatorioValidate("centroDeCusto"			, "Centro De Custo");
				campoObrigatorioValidate("emailContatSolicitante"	, "Email de Contato");
				campoObrigatorioValidate("telContatSolicitante"		, "Telefone para o Contato");
				campoObrigatorioValidate("prioridade"				, "Tipo");
				campoObrigatorioValidate("dataNecessidade"			, "Data Necessidade");

				// PROJETO PCO - SM2CE NOV.24
				var CONTA_ORC 	= $("#classeOrcamentaria").val();
				try {
					CONTA_ORC   = CONTA_ORC[0].split(' - ')[0];
				} catch (e) {
					CONTA_ORC = "";
				}

				var CLASSE_VLR 	= $("#classeValor").val();
				try {
					CLASSE_VLR  = CLASSE_VLR[0].split(' - ')[0];
				} catch (e) {
					CLASSE_VLR = "";
				}

				var FILIAL 		= $("#codFilial").val();
				if (FILIAL == "") 
					MSG.push("O campo Filial é obrigatório.");

				var tipoDespesa = $("#auxTipoDespesa").val();
				if (tipoDespesa == "nao_confirmado" || tipoDespesa == "") 
					MSG.push("O campo Tipo Despesa é obrigatório.");
				else
					if (tipoDespesa == "capex") {
						if (CONTA_ORC.trim() == "") 
							MSG.push("O campo Classe Orçamentária é obrigatório para despesas Capex.");

						if (CLASSE_VLR.trim() == "") 
							MSG.push("O campo Classe de Valor é obrigatório para despesas Capex.");

						if (CONTA_ORC!='' && CLASSE_VLR!='' && FILIAL!='') {
							var total = 0;
							var projetoExiste = false;
							var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
							for (var i=1; i<=indexProd; i++) {
								var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1]
								var ITEM   = $("#codProd___" + indice).val();
								if (ITEM==undefined || ITEM.trim() == "") {
									MSG.push("O código do produto é obrigatório para todos os itens.");
									continue;
								}
								var constraints = [ DatasetFactory.createConstraint("FILIAL"	, FILIAL	, '', ConstraintType.MUST),
								                    DatasetFactory.createConstraint("ITEM"		, ITEM		, '', ConstraintType.MUST),
								                    DatasetFactory.createConstraint("CLASSE_ORC", CONTA_ORC	, '', ConstraintType.MUST),
								                    DatasetFactory.createConstraint("CLASSE_VLR", CLASSE_VLR, '', ConstraintType.MUST)
								                    ];
								var dataset = DatasetFactory.getDataset("DS_PCO_SALDOS", null, constraints, null);
								try {
									if (dataset && dataset.values && dataset.values.length > 0) {
										projetoExiste = true;
										var saldo = parseFloat(dataset.values[0].SALDO);
										if (!isNaN(saldo)) {
											total += saldo;
										}
									}
								} catch (erro) {
									log.error("Erro ao consultar saldo: " + erro);
								}
							}
							if (!projetoExiste) 
								MSG.push("Não foi encontrado projeto para os parâmetros informados.");
							else 
								if (VALOR_SOLICITACAO > total) 
									MSG.push("Saldo insuficiente para a solicitação.");
						}
					}

				// VALIDACAO SALDO PCO - SM2CE NOV.24
				var VALOR_SOLICITACAO = removeMascaraMonetaria($("#valorTotalSolicitacao").val());
				VALOR_SOLICITACAO = parseFloat(VALOR_SOLICITACAO);
				if (isNaN(VALOR_SOLICITACAO)) 
					VALOR_SOLICITACAO = 0;
				if (VALOR_SOLICITACAO <= 0) 
					MSG.push("O valor total da solicitação deve ser maior que zero.");


				var tipoCompra = $("#tipoCompra").val();
				if (tipoCompra == "1") {
					campoObrigatorioValidate("descreveEscopoServ"		, "Descreva o escopo completo do serviço");
					campoObrigatorioValidate("pqCompraNecessariaServ"	, "Porque esta compra é necessária");
					campoObrigatorioValidate("ondeRealizadoServ"		, "Onde será realizado o serviço");
					campoObrigatorioValidate("quandoIniciadoServ"		, "Quando deverá ser iniciado e concluído o serviço");
					campoObrigatorioValidate("quaisCriteriosForServ"	, "Quais os critérios mínimos o fornecedor precisa atender");
					campoObrigatorioValidate("exigenciasServPrestado"	, "Há exigências especificas de como o serviço deve ser prestado");
					campoObrigatorioValidate("expectativaPrecoServ"		, "Informar o valor aprovado em orçamento.");
					campoObrigatorioValidate("visitaServ"				, "Informe nome, telefone, email e horários disponiveis pararecebimento da visita técnica");
					campoObrigatorioValidate("uniContratoAtivo"			, "A unidade já possui algum contrato ativo para esse serviço");
				}

				if (tipoCompra == "2") {
					campoObrigatorioValidate("caracMaterial"				, "Observações");
					campoObrigatorioValidate("pqCompraNecessariaDiversos"	, "Porque esta compra é necessária");
					campoObrigatorioValidate("ondeMaterialEntregue"			, "Onde o material será entregue");
					campoObrigatorioValidate("quandoMeterialEntregue"		, "Quando deverá ser entregue o material");
					campoObrigatorioValidate("quemRecebeDiversos"			, "Quem vai receber o material");
					campoObrigatorioValidate("CriteriosFornecedorDiversos"	, "Quais os critérios mínimos o fornecedor precisa atender");
					campoObrigatorioValidate("exigenciasMaterial"			, "Há exigências especificas de como o material deve ser entregue");
					campoObrigatorioValidate("expectativaPrecoDiversos"		, "Informar o valor aprovado em orçamento.");

					if ($("#hidePedidoGuardChuva").val() == "true") {
						var indexProdutos = $("table[tablename=tbProd] tbody tr:gt(0)");
						if (indexProdutos < 1) {
							MSG.push("É obrigatório adicionar um ou mais produtos na solicitação.");
						} else {
							for (var i=1; i<=indexProdutos; i++) {
								var indice = indexProdutos[i];
								var codprodutoat = $("#codProd___" + indice).val();
								var codquantprodutoat = $("#qtdProd___" + indice).val();

								var somaqtd = 0;
								var indexPedidos = $("table[tablename=tbFiliaisQtdPedido] tbody tr").length-1;
								for (var j=1; j<=indexPedidos.length; j++) {
									var indice2 = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
									var codprodutofilial = $("#codProdutoQtdPedido___" + indice2).val();

									if(codprodutofilial == codprodutoat)
										somaqtd += parseInt($("#qtdPedido___" + indice2).val());
								}
								if(somaqtd != codquantprodutoat)
									MSG.push("A soma da quantidade de itens na tabela Filial X Produto X Quantidade deve ser igual à quantidade indicada na tabela de produtos");
							}
						}

					}  
				}

				if (tipoCompra == "3") {
					campoObrigatorioValidate("descrevaTi", "Descreva o escopo completo do serviço ou descrição detalhada do materiaial");
					campoObrigatorioValidate("pqCompraNecessariaTi", "Porque esta compra é necessária");
					campoObrigatorioValidate("ondeEntregaTi", "Onde será realizado o serviço ou entregue o material");
					campoObrigatorioValidate("quandoMeterialEntregueTi", "Quando deverá ser iniciado e concluído o serviço ou quando deverá ser entregue o material");
					campoObrigatorioValidate("CriteriosFornecedorTi", "Quais os critérios mínimos o fornecedor precisa atender");
					campoObrigatorioValidate("exigenciasServicoTI", "Há exigências especificas de como o serviço deve ser prestado ou o material entregue");
					campoObrigatorioValidate("expectativaPrecoTi", "Informar o valor aprovado em orçamento.");
					campoObrigatorioValidate("quemRecebeTi", "Quem vai receber o material");

					if ($("#hidePedidoGuardChuva").val() == "true") {
						var indexProdutos = $("table[tablename=tbProd] tbody tr").length-1;
						if (indexProdutos < 1) {
							MSG.push("É obrigatório adicionar um ou mais produtos na solicitação.");
						} else {
							for (var i=1; i<=indexProdutos; i++) {
								var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
								var codprodutoat = $("#codProd___" + indice).val();
								var codquantprodutoat = $("#qtdProd___" + indice).val();

								var somaqtd = 0;
								var indexPedidos = $("table[tablename=tbFiliaisQtdPedido] tbody tr").length-1;
								for (var j = 0; j < indexPedidos.length; j++) {
									var indice2 = $("table[tablename=tbFiliaisQtdPedido] tbody tr")[i].lastChild.children[0].id.split('___')[1];
									var codprodutofilial = $("#codProdutoQtdPedido___" + indice2).val();
									if(codprodutofilial == codprodutoat){
										somaqtd += parseInt($("#qtdPedido___" + indice2).val());
									}

								}

								if(somaqtd != codquantprodutoat){
									MSG.push("A soma da quantidade de itens na tabela Filial X Produto X Quantidade deve ser igual à quantidade indicada na tabela de produtos");
								}

							}
						}

					}  

				}

				if ($("#tipoCompra").val() == '5') {
					campoObrigatorioValidate("target", "Target");
					campoObrigatorioValidate("tipoProjeto", "Tipo Projeto");
					campoObrigatorioValidate("descEscopoServ", "Descreva o escopo completo do serviço ou descrição detalhada do material");
					campoObrigatorioValidate("pqCompraNecessaria", "Porque esta compra é necessária");
					campoObrigatorioValidate("ondeReliazadoServ", "Onde será realizado o serviço ou entregue o material");
					campoObrigatorioValidate("quandoInicioConclusao", "Quando deverá ser iniciado e concluído o serviço ou quando deverá ser entregue o material");
					campoObrigatorioValidate("CriteriosFornecedor", "Quais os critérios mínimos o fornecedor precisa atender");
					campoObrigatorioValidate("exigenciasEspecificas", "Há exigências especificas de como o serviço deve ser prestado ou o material entregue");
					campoObrigatorioValidate("expectativaPreco", "Informar o valor aprovado em orçamento.");
					campoObrigatorioValidate("visitaTecnicaObras", "Informe nome, telefone, email e horários disponiveis para recebimento de visita tecnica");
				}

				if ($("#hideContratoGuardChuva").val() == 'true') {
					if ($("#totalPercFilial").val()  != 100) {
						MSG.push("O valor do percentual total das filiais tem que ser igual a 100%.");
					}
					// Validar valores da tabela Filiais (PaiFilho)
					var indexFiliais = $("table[tablename=tbFiliaisQtdPedido] tbody tr").length-1;
					if (indexFiliais < 1) {
						MSG.push("É obrigatório adicionar uma ou mais <b>Filiais</b> na solicitação");
					} else {
						var filiais = [];
						for (var i=1; i<=indexFiliais; i++) {
							var indice = $("table[tablename=tbFiliaisQtdPedido] tbody tr")[i].lastChild.children[0].id.split('___')[1];
							var filial = $("#codFilialGuardChu___" + indice).va();
							filiais.push.filial;

							if (filial == "") {
								MSG.push("O campo <b>Filial</b> não pode estar vazio!");
							}
							if (indexFiliais.length > 1 && $("#valorUnitario___" + indice).val() == "") {
								MSG.push("O campo <b>% Filial</b> da filial " + $("#filialGuardChu___" + indice).val() + " não pode estar vazio!");
							}

							for (var f = 0; f < filiais.length; f++) {
								if (filial == filiais[f]) {
									MSG.push("A Filial <b>" + filial + "</b> esta duplicada. Favor remover uma delas!");
								}
							}
						}
					}

				}

				// Validar valores da tabela Produtos (PaiFilho) 
				var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
				if (indexProd < 1) {
					MSG.push("É obrigatório adicionar um ou mais produtos na solicitação.");
				} else {
					for (var i=1; i<=indexProd; i++) {
						var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
						campoObrigatorioValidate("codProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("nomeProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("qtdProd___" + indice, "Quantidade na linha " + indice);
					}
				}

				if ($("#codServOuProd").val() == 'SV') {
					campoObrigatorioValidate("sLocalPrestServico", "Local Prestação de Servico");
				}

				if ($("#hideFornecedorExclu").val() == 'true') {
					campoObrigatorioValidate("codFornExclus", "Fornecedor Exclusivo");
					campoObrigatorioValidate("valorCompraExclu", "Valor Total da Compra Exclusiva");
					var qtdeCaracteresCampoDescri = $("#descDetalhada").val();
					if (qtdeCaracteresCampoDescri.length < 30) {
						MSG.push("Favor descrever no minimo 30 caracteres no campo de <b>Descrição</b>.");
					}
					if ($("#excluTecknowhow").val() == '' && $("#excluTecTempoDesenv").val() == '' && $("#excluTecSolucaoTecnica").val() == '' && $("#excluTecOutros").val() == '') {
						MSG.push("Favor selecionar uma ou mais opções para a Exclusividade Técnica.");
					}
					if (FLUIGC.switcher.getState("#excluTecOutros") && $("#descriExcluTecOutros").val() == '') {
						MSG.push("Ao selecionar a opção <b>Outros</b>, é necessário descrever a Exclusividade Técnica.");
					}
					var qtdeExcluTecOutros = $("#descriExcluTecOutros").val();
					if ($("#descriExcluTecOutros").val()  != '' && qtdeExcluTecOutros.length() < 30) {
						MSG.push("Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>.");
					}
				}

				// EVENTO FORMULÁRIO
				var validado = $("#excluTecOutros").val() == "on" ? true : false;

			} else if (numState == CORRECAO_SOLICITANTE) {
				if ($("#hideFornecedorExclu").val() == 'true') {
					campoObrigatorioValidate("fornecedorExclusProtheus", "Fornecedor Exclusivo");
					campoObrigatorioValidate("valorCompraExclu", "Valor Total da Compra Exclusiva");
					var qtdeCaracteresCampoDescri = $("#descDetalhada").val();
					if (qtdeCaracteresCampoDescri.length() < 30) {
						MSG.push("Favor descrever no minimo 30 caracteres no campo de <b>Descrição</b>.");
					}
					if ($("#excluTecknowhow").val() == '' && $("#excluTecTempoDesenv").val() == '' && $("#excluTecSolucaoTecnica").val() == '' && $("#excluTecOutros").val() == '') {
						MSG.push("Favor selecionar uma ou mais opções para a Exclusividade Técnica.");
					}
					if ($("#excluTecOutros").val()  != '' && $("#descriExcluTecOutros").val() == '') {
						MSG.push("Ao selecionar a opção <b>Outros</b>, é necessário descrever a Exclusividade Técnica.")
					}
					var qtdeExcluTecOutros = $("#descriExcluTecOutros").val();
					if ($("#descriExcluTecOutros").val()  != '' && qtdeExcluTecOutros.length() < 30) {
						MSG.push("Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>.")
					}
				}
				// Validar valores da tabela Produtos (PaiFilho) 
				var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
				if (indexProd < 1) {
					MSG.push("É obrigatório adicionar um ou mais produtos na solicitação.");
				} else {
					for (var i=1; i<=indexProd; i++) {
						var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
						campoObrigatorioValidate("codProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("nomeProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("qtdProd___" + indice, "Quantidade na linha " + indice);
					}
				}
			} else if (numState == ANALISE_COMPRADOR_COTACAO) {

				var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
				if (indexProd < 1) {
					MSG.push("É obrigatório adicionar um ou mais produtos na solicitação.");
				} else {
					for (var i=1; i<=indexProd; i++) {
						var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
						campoObrigatorioValidate("codProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("nomeProd___" + indice, "Produto na linha " + indice);
						campoObrigatorioValidate("qtdProd___" + indice, "Quantidade na linha " + indice);

						if($("#correcaoSolicitacao").val()  != 'true'){
							campoObrigatorioValidate("fornecedorVencedorProd___" + indice, "Necessário incluir cotação/Fornecedor " + indice);
						}
					}
				}

				if ($("#correcaoSolicitacao").val()  != 'true') {
					if ($("#hidePA").val() == "true" && $("#dataVencimentoPA").val() == "") 
						MSG.push("Necessário informar a <b>Data de Vencimento PA</b>.");
					if ($("#hidePA").val() == "true" && $("#valorPA").val() == "") 
						MSG.push("Necessário informar o <b>Valor do PA</b>.");
					if ($("#tipoCotacaoHidden").val() == "") 
						MSG.push("Necessário informar o <b>Tipo de Cotação</b>.");
					if ($("#hideNegociacao").val() == 'true' && $("#valorIniciProd").val() == '') 
						MSG.push("Se houve negociação, favor informar o <b>Valor Inicial do Produto</b>.");

					var indexForn = $("#tbFornecedor > tbody > tr:not(:first-child)").length;
					if ($("#hideFornecedorExcluClassica").val() == 'true') {
						if ($("#excluClasOutros").val()  != '' && $("#descriExcluClasOutros").val() == '') 
							MSG.push("Ao selecionar a opção <b>Outros</b>, é necessário descrever a <b>Exclusividade Clássica</b>.");

						var qtdeExcluTecOutros = $("#descriExcluClasOutros").val();
						if ($("#descriExcluClasOutros").val()  != '' && qtdeExcluTecOutros.length() < 30) 
							MSG.push("Favor descrever no minimo 30 caracteres no campo de <b>OUTROS</b>.");

						if (indexForn.length > 1) 
							MSG.push("Favor selecionar apenas um fornecedor quando for exclusivo.");            	                    	
					}

					if ($("#hideFornecedorExclu").val() == 'true') 
						if (indexForn.length > 1)     	
							MSG.push("Favor selecionar apenas um fornecedor quando for exclusivo.");              	                    	

					if ($("#alteraValorCartaExecao").val() == 'true' && $("#justificaCotacaoMaiorCartaEx").val() == '') 
						MSG.push("Favor descrever a justificativa pelo valor da Cotação ser maior que a Carta de Exceção.");

					if ($("#infoAdicionaisComp").val() == "") 
						campoObrigatorioValidate("infoAdicionaisComp", "Informações Adicionais");

					// Pegar referencia do PaiFilho Fornecedor 
					var analiseFiscal = $("#analiseFiscalH").val();
					if ((analiseFiscal == false) || (analiseFiscal == 'false')) {
						if (indexForn.length > 0) {
							for (var i=1; i<=indexForn; i++) {
								var indice = indexForn[i];

								if ($("#fornCadastrado___" + indice).val() == '1') 
									campoObrigatorioValidate("fornecedorProtheus___" + indice, "Fornecedor na linha " + indice);
								else {
									campoObrigatorioValidate("fornecedorProtheusSemCadastro___" + indice, "Fornecedor na linha " + indice);
									campoObrigatorioValidate("tipoFornSemCadastHidden___" + indice, "Tipo fornecedor (Jurídico, Fisico ou Outros) na linha " + indice);
								}

								campoObrigatorioValidate("emailFornecedor___"   + indice, "Email fornecedor na linha " + indice);
								campoObrigatorioValidate("prazoForn___"         + indice, "Prazo na linha " + indice);
								campoObrigatorioValidate("condForn___"          + indice, "Condição de Pagamento na linha " + indice);
								campoObrigatorioValidate("codCondForn___"       + indice, "Condição de Pagamento na linha " + indice);
								campoObrigatorioValidate("formaFornHidden___"   + indice, "Forma de Pagamento na linha " + indice);

								if ($("#fornCadastrado___" + indice) == '1') 
									campoObrigatorioValidate("fornecedorProtheus___" + indice, "Fornecedor na linha " + indice);

								var item = $("#itemForn___" + indice).val();
								if ($("#fornCadastrado___"  + indice).val() == '1' &&
										$("#formaFornHidden___" + indice).val() == '2' &&
										($("#bancoForn___"      + indice).val() == ''  ||
												$("#agenciaForn___" + indice).val() == ''  ||
												$("#contaForn___" + indice).val() == '')) 
									MSG.push("Ao se tratar de <b>Depósito Bancário</b> no item " + item + ", é obrigatorio que o fornecedor tenha os dados bancários cadastrados no <b>PROTHEUS</b> (Banco, Agência, Conta e o Digíto da Conta). Favor realizar o cadastro no Protheus para prosseguir.");

								if ($("#valorFreForn___" + indice).val() != '' && $("#tipoFreteForn___" + indice).val() == '') 
									campoObrigatorioValidate("tipoFreteForn___" + indice, "Tipo do Frete na linha " + indice + ", devido a existir valor de frete ele");
							}
						} else 
							MSG.push("Não existe <b>Fornecedor</b> cadastrado.");

					} else {
						if ($("#fornecedorVincular").val() == "") 
							MSG.push("Necessário informar o fornecedor que deseja vincular</b>.");
					}

					if ($("#tipoCotacaoHidden").val() == "tabela") {
						// Pegar referencia do PaiFilho Produtos 
						var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
						for (var i=1; i<=indexProd; i++) {
							var indice = $("table[tablename=tbProd] tbody tr")[i].lastChild.children[0].id.split('___')[1];
							if ($("#valorProd___" + indice).val() == '') 
								MSG.push("Necessário cadastrar o valor do produto <b>" + $("#nomeProd___" + indice).val() + "</b> na tabela de preços ");
						}
					}

					if ($("#tipoCotacaoHidden").val() == "fechada") {
						// Pegar referencia do PaiFilho Cotação 
						var indexCot = $("table[tablename=tbCotacao] tbody tr").length-1;
						var fornecedor = "";
						var valorTotalProd = removeMascaraMonetaria($("#valorTotalSolicitacao").val());
						log.info("valorTotalProd: "+valorTotalProd);
						if (indexCot.length > 0) {
							var achouCotacao = false;
							for (var i=1; i<=indexCot; i++) {
								var indice = $("table[tablename=tbCotacao] tbody tr")[i].lastChild.children[0].id.split('___')[1];
								log.info("Abner valorCotacao___" + indice + " = " + $("#valorCotacao___" + indice).val());
								if ($("#valorCotacao___" + indice).val() != '') 
									achouCotacao = true;
							}
							if (!achouCotacao) 
								MSG.push("Não foram encontrados cotações aos Produtos selecionados.");
						}

						if ($("#hideFornecedorExclu").val() == 'false' && $("#hideFornecedorExcluClassica").val() == 'false' ) {
							if ((valorTotalProd > 5000 && valorTotalProd <= 10000 && indexForn < 2)) 
								MSG.push("O valor total das Cotações está entre R$5.000,01 à R$ 10.000,00. É necessário ter no mínimo 2 fornecedores. ");

							if ((valorTotalProd > 10000 && indexForn < 3 ))  
								MSG.push("O valor total das Cotações é maior que R$ 10.000,00. É necessário ter no mínimo 3 fornecedores. ");
						}
					}

					if ($("#hideContratoGuardChuva").val() == "true" || $("#hideContrato").val() == "true") {
						if ($("#hideReajusteContrato").val() == "true" && $("#indice").val() == null) {
							campoObrigatorioValidate("indice", "Indice");
						}
						campoObrigatorioValidate("rescisaoContrato", "Rescisão de Contrato");
						campoObrigatorioValidate("objetoContrato", "Objeto de Contrato");
						campoObrigatorioValidate("unidadeVigencia", "Unidade de Vigência");
						if ($("#hiddenUnidadeVigencia").val()  != 4) {
							campoObrigatorioValidate("vigenciaDoContrato", "Vigência Do Contrato");
						}
						campoObrigatorioValidate("codTipoContrato", "Tipo Contrato");
						if($("#codTipoContrato").val() == "017"){
							campoObrigatorioValidate("selectTipoPessoa", "Tipo de Pessoa");
						}
						campoObrigatorioValidate("contatoComercial", "Contato Comercial");
						campoObrigatorioValidate("emailComercial", "E-mail Comercial");
						campoObrigatorioValidate("telefoneComercial", "Telefone Comercial");
						campoObrigatorioValidate("composicaoPrecos", "Composição de Preços");
						campoObrigatorioValidate("qtdParcelas", "Quantidade Parcelas");
						campoObrigatorioValidate("gestorContrato", "Gestor Contratante");
						if ($("#hiddenAnexo4").val() == "sim") 
							campoObrigatorioValidate("numPropComercial", "Proposta da Contratada");
					}
					var indexProd = $("table[tablename=tbProd] tbody tr").length-1;
					log.info("Abner indexProd:" + indexProd.length);
					if (indexProd < 1) 
						MSG.push("É obrigatório possuir um ou mais produtos na solicitação.");

				} else 
					campoObrigatorioValidate("motivoAnaliseComprador", "Motivo para correção");

			} else if (numState == ALCADA_APROVACAO) {
				var contadorAlcada = $("#contadorAlcada").val();
				var nivel = parseInt($("#nivel").val()) + 1;

				if ($("#decisaoAlcada" + contadorAlcada).val() == "") 
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				else 
					if ($("#decisaoAlcada" + contadorAlcada).val() == "nao") {
						if (numState == ALCADA_APROVACAO && $("#sMotivoReprovAlcada" + contadorAlcada).val() == null) 
							MSG.push("Selecione uma das opções para o <b>Motivo</b> da reprovação.");

						if ($("#motivoAprovAlcada" + contadorAlcada).val() == "") 
							MSG.push("Descreva o <b>Motivo</b> da reprovação.");
					}
			} else if (numState == ALCADA_APROVACAO_CARTA) {
				var contadorAlcada = $("#contadorAlcadaCarta").val();
				var nivel = parseInt($("#nivel").val()) + 1;

				if ($("#decisaoAlcadaCarta" + contadorAlcada) == "") {
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				} else if ($("#decisaoAlcadaCarta" + contadorAlcada).val() == "nao") {
					if ($("#motivoAprovAlcadaCarta" + contadorAlcada).val() == "") {
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
					}
				}
			} else if (numState == ALCADA_APROVACAO_PA) {
				var contadorAlcada = $("#contadorAlcadaPA").val();
				var nivel = parseInt($("#nivel").val()) + 1;

				if ($("#decisaoAlcadaPA" + contadorAlcada) .val()== "") {
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				} else if ($("#decisaoAlcadaPA" + contadorAlcada).val() == "nao") {
					if ($("#motivoAprovAlcadaPA" + contadorAlcada).val() == "") {
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
					}
				}
			} else if (numState == ENVIO_EMAIL_FORNECEDOR) {
				var indexPedido = $("#tbPedidosGerados tbody tr").not(':first').length;
				if (indexPedido.length > 0) {
					for (var i=1; i<=indexPedido; i++) {
						var indice = $("#tbPedidosGerados tbody tr")[i].lastChild.children[0].id.split('___')[1];
						if ($("#emailFornVencedorProd___" + indice).val() == '') 
							MSG.push("O campo de <b>Email</b> do fornecedor " + $("#nomefornecedorPedido___" + indice).val() + " é obrigatório.");
					}
				}
				if ($("#emailEnviado").val()  != 'true' && $("#codFilial").val()  != '06601') 
					MSG.push("É necessário encaminhar o <b>Email para Cotação</b>. Favor clicar no botão <b>Enviar E-mail</b> e aguardar o retorno de 'Sucesso'.");

			} else if (numState == APROVACAO_SOLICITANTE) {
				campoObrigatorioValidate("decisaoSolicitante", "Aprovar ou reprovar a solicitação");
				if ($("#decisaoSolicitante").val() == "nao") 
					campoObrigatorioValidate("motivoAprovSolicitante", "Motivo da reprovação");
			} else if (numState == REAVALIAR_PA) {
				campoObrigatorioValidate("justificaPA", "Obrigatório a justificativa do Pagamento antecipado");
			} else if (numState == VALIDAR_CURSOS) {
				if ($("#decisaoAprovValidarCursos").val() == "") {
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				} else if ($("#decisaoAprovValidarCursos").val() == "nao") {
					if ($("#motivoAprovValidarCursos").val() == "") 
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
				}
			} else if (numState == ANALISE_RH) {
				if ($("#decisaoAprovAnaliseRH").val() == "") {
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				} else if ($("#decisaoAprovAnaliseRH").val() == "nao") {
					if ($("#motivoAprovAnaliseRH").val() == "") 
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
				}
			} else if (numState == ANALISE_OBRAS) {
				if ($("#decisaoAprovAnaliseObras").val() == "") {
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
				} else if ($("#decisaoAprovAnaliseObras").val() == "nao") {
					if ($("#motivoAprovAnaliseObras").val() == "") 
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
				}
			} else if (numState == APROVACAO_TECNICA) {
				if ($("#decisaoAprovaprovTecnica").val() == "") 
					MSG.push("Seleciona uma das opções de <b>Decisão</b> - Aprovar ou Reprovar");
			} else 
				if ($("#decisaoAprovaprovTecnica").val() == "nao") {
					if ($("#motivoAprovaprovTecnica").val() == "") 
						MSG.push("Descreva o <b>Motivo</b> da reprovação.");
				}

		} else if (numState == ANALISE_COMPRADOR_COTACAO) 
			$("#setRespCompras").val("Pool:Group:CD");
	}   
	// FINAL DA VALIDACAO
	if(MSG != ""){
		informaFaltaCotacao = false;
		avisoMODAL('Atenção',MSG);
		return false;
	}
	return true;
}
function avisoMODAL(avTITULO,avMSG) {
	if(avMSG==null || avMSG=='')
		avMSG = 'Favor confirmar os dados do seu formulário';

	var xContent='';
	for (var iMSG = 0; iMSG < avMSG.length; iMSG++) 
		xContent += '<p id="p' + iMSG + '"></p>';

	if(avTITULO==null || avTITULO=='')
		avTITULO = 'Atenção';

	FLUIGC.modal({
		title: avTITULO,
		content: xContent,
		id: 'fmWF_Aviso',
		size: 'large', // full | large | small
		actions: [{ 'label': 'Ok', 'autoClose': true }]
	});

	for (var iMSG = 0; iMSG < avMSG.length; iMSG++) 
		typeWriter(avMSG[iMSG], iMSG);
}
function typeWriter(text, iMSG) {
	var i = 0;
	var speed = 20; // Velocidade da digitação
	function typing() {
		if (i < text.length) 
			try {
				document.getElementById('p' + iMSG).innerHTML += text.charAt(i);
				i++;
				setTimeout(typing, speed);
			} catch (e) {
				// NENHUMA ACAO
				document.getElementById('p' + iMSG).innerHTML += text;
			}
	}
	typing();
}

function verificaFornecedorSemCadastro() {
	var msgErro = ''
		var subprocessos = $('#tbFornVenc tbody tr').not(':first').length;
	var contadorProcessoAtivo = 0;
	if (subprocessos > 0) {
		$('[name^=numSubProcesso___]').each(function() {
			var indice = this.name.split('___')[1];
			var statusCad = verificaStatusCadastro(this.value);
			console.log('statusCad: '+statusCad);
			if (statusCad[0].status == 0) {
				contadorProcessoAtivo++;
				msgErro += '\n' + $('#numSubProcesso___' + indice).val();
			} else {
				var fornecedor = consultaFornecedorCadastrado($('#cgcFornVenc___' + indice).val());
				atualizaDadosFornecedor(fornecedor);
			}
		});
		if (contadorProcessoAtivo > 0) {
			$('#iniciarCadastro').val('false');
			MSG.push("Não é possível prosseguir com o chamado pois ainda existe(m) " + contadorProcessoAtivo +
					"fornecedor(es) na etapa de cadastro. Termine o cadastro antes de movimentar o chamado. Subprocesso(s) ativo(s): " + msgErro);
		} else 
			$('#iniciarCadastro').val('false');
		$('#jsonFornACadastrar').val('');

	} else {
		var cgcSemCadastro = [];
		var dadosParaCadastroFornecedor = [];
		$('[name^=cnpjVencedorProd___]').each(function() {
			var indice = this.name.split('___')[1];
			if ($('#codFornVencedorProd___' + indice).val() == '') {
				if ((!cgcSemCadastro.includes($('#cnpjVencedorProd___' + indice).val()))) {
					cgcSemCadastro.push($('#cnpjVencedorProd___' + indice).val());
					dadosParaCadastroFornecedor.push(dadosForn($('#cnpjVencedorProd___' + indice).val()));
				}
			}
		});
		$('#totalFornSemCadastro').val(dadosParaCadastroFornecedor.length);
		$('#jsonFornACadastrar').val(JSON.stringify(dadosParaCadastroFornecedor));
		if (dadosParaCadastroFornecedor.length <= 0) 
			$('#iniciarCadastro').val('false')
			else
				$('#iniciarCadastro').val('true');
	}
}
function campoObrigatorioValidate(campo, textoCampo) {
	try {
		if ( $('#'+campo).val() == "" || $('#'+campo).val() == null) 
			MSG.push("O campo <b>" + textoCampo + "</b> é obrigatório");
	} catch (e) {
		MSG.push("Não consigo validar o campo informado: " + campo);   
		console.log('Erro ao validar campo obrigatório: ' + e);
	}
}
function dadosForn(cgc) {
	var dadosComprador = consultaDadosComprador($('#idComprador').val())
	var listaProduto = '';
	var dados = {
			codSolicitante: dadosComprador[0]['colleaguePK.colleagueId'],
			solicitante: dadosComprador[0].colleagueName,
			emailSolicitante: dadosComprador[0].mail,
			fornecedor: '',
			cpfCnpjOutros: '',
			cpf: '',
			cnpj: '',
			descFilial: $('#filial').val(),
			emailForn: '',
			endereco: 'Desconhecido',
			bairro: 'Desconhecido',
			municipio: 'Desconhecido',
			uf: 'Desconhecido',
			codPais: '105',
			tipoConta: '2',
			agencia: '0000',
			codBanco: '0',
			digVAgencia: '0',
			contaCorrente: '00000',
			digVConta: '0',
			complementoEnd: 'Desconhecido',
			cep: '00000-000',
			ddi: '55 - Brasil',
			ddd: '00',
			telefone: '00000-0000',
			tipoFornecedor: '',
			localidadeFornecedor:'',
			tipoCadastro: "99",
			cadastroAutomatico: "true",
			cgc: cgc,
			motivoAprovContasReceber: "Solicitação original: " + $("#codSolicitacao").val() + " O fornecedor esteve cotado com o(s) produto(s): "
	}
	$('[name^=nomeForn___]').each(function() {
		var indice = this.name.split('___')[1];
		if ($('#fornecedorProtheusSemCadastro___' + indice).val() == cgc) {
			if ($('#tipoFornSemCadastHidden___' + indice).val() == 'F') {
				dados.cpf = $('#fornecedorProtheusSemCadastro___' + indice).val();
				dados.tipoFornecedor = 'F'
					dados.localidadeFornecedor = "1"
			} else if ($('#tipoFornSemCadastHidden___' + indice).val() == 'J') {
				dados.cnpj = $('#fornecedorProtheusSemCadastro___' + indice).val();
				dados.tipoFornecedor = 'J'
					dados.localidadeFornecedor = "1"
			} else {
				dados.cpfCnpjOutros = $('#fornecedorProtheusSemCadastro___' + indice).val();
				dados.tipoFornecedor = 'X'
					dados.localidadeFornecedor = "1"
			}
			dados.fornecedor = $('#nomeForn___' + indice).val();
			dados.emailForn = $('#emailFornecedor___' + indice).val();
			$('[name^=cnpjVencedorProd___]').each(function() {
				var index = this.name.split('___')[1];
				if ($('#cnpjVencedorProd___' + index).val() == cgc) {
					listaProduto += $('#codProd___' + index).val() + ' - ' + $('#nomeProd___' + index).val() + ' | ';
				}
			});
			dados.motivoAprovContasReceber = "Solicitação original: " + $("#codSolicitacao").val() + " O fornecedor esteve cotado com o(s) produto(s): " + listaProduto;
		}
		if ($('#formaFornHidden___' + indice).val() == '1') {
			if ($('#tipoFornSemCadastHidden___' + indice).val() == '1') {
				dados.tipoConta = '1'
			} else {
				dados.tipoConta = '2';
				dados.agencia = $('#agenciaForn___' + indice).val();
				dados.codBanco = $('#bancoForn___' + indice).val();
				dados.digVAgencia = $('#dvAgenciaForn___' + indice).val();
				dados.contaCorrente = $('#contaForn___' + indice).val();
				dados.digVConta = $('#dvContaForn___' + indice).val();
			}
		}
	});
	return dados;
}
function verificaStatusCadastro(subprocesso) {
	var c1 = DatasetFactory.createConstraint('workflowProcessPK.processInstanceId', subprocesso, subprocesso, ConstraintType.MUST);
	var datasetWorkflowProcess = DatasetFactory.getDataset('workflowProcess', null, new Array(c1), null);
	return datasetWorkflowProcess.values;
}
function consultaDadosComprador(idComprador) {
	var constraintColleague2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', idComprador, idComprador, ConstraintType.MUST);
	var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(constraintColleague2), null);
	return datasetColleague.values;
}
function consultaFornecedorCadastrado(cgc) {
	var c1 = DatasetFactory.createConstraint('CGC', cgc, cgc, ConstraintType.MUST);
	var datasetDs_fornecedor = DatasetFactory.getDataset('ds_fornecedor', null, new Array(c1), null);
	return datasetDs_fornecedor.values;
}
function atualizaDadosFornecedor(fornecedor) {
	$('[name^=cnpjForn___]').each(function() {
		var index = this.name.split('___')[1];
		if (this.value == fornecedor[0].CGC) {
			$('#fornCadastrado___' + index).val('1');
			$('#fornCadastrado___' + index).change();
			$('#codForn___' + index).val(fornecedor[0].CODIGO);
			$('#emailFornecedor___' + index).val(fornecedor[0].EMAIL);
			$('#nomeForn___' + index).val(fornecedor[0].DESCRICAO);
			$('#cnpjForn___' + index).val(fornecedor[0].CGC);
			$("#hiddenBancoForn___" + index).val(fornecedor[0].BANCO);
			$("#hiddenAgenciaForn___" + index).val(fornecedor[0].AGENCIA);
			$("#hiddenContaForn___" + index).val(fornecedor[0].CONTA);
			$("#hiddenDvContaForn___" + index).val(fornecedor[0].DV_CONTA);
			$("#hiddenDvAgenciaForn___" + index).val(fornecedor[0].DV_AGENCIA);
			window['fornecedorProtheus___' + index].setValue(fornecedor[0].FILTRO);
		}
	});
	$('[name^=cnpjFornCotacao___]').each(function() {
		var index = this.name.split('___')[1];
		if (this.value == fornecedor[0].CGC) {
			$('#codFornecedorCotacao___' + index).val(fornecedor[0].CODIGO);
		}
	});
	$('[name^=cnpjVencedorProd___]').each(function() {
		var indice = this.name.split('___')[1];
		if ($('#cnpjVencedorProd___' + indice).val() == fornecedor[0].CGC) {
			$('#codFornVencedorProd___' + indice).val(fornecedor[0].CODIGO)
		}
	});
}

function converteMoedaFloat(valor) {
	if(valor == undefined || valor == "")
		valor = "0";
	if(!(typeof valor === 'string'))
		valor = valor+"";
	valor = valor.replace("R$ ",'');
	if(valor.indexOf(",") > -1){
		valor = valor.replace(/\./g,'');
		valor = valor.replace(",",".");
	}
	valor = parseFloat(valor);
	return valor;
}
