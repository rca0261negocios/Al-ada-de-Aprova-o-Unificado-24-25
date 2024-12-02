var Solicitante = function () {

	var self = this;
	this.userId = parent.WCMAPI.userCode;
	this.userName = parent.WCMAPI.user;
	this.tabelaPreco;
	this.init = function () {
		zoomFilial();
		$("#zoomFilial").removeAttr("disabled");
		getParamsURL()
		$("#tbProd").tableHeadFixer({
			"head": true,
			"left": 2
		});
		$('#addProd').click(function () {
			if ($("#filial").val() != '') {
				var indice = wdkAddChild("tbProd");
				$("#codProd").parent().attr('style', '');
				$("#codProd").parent().prev().attr('style', '');
				self.configRowProd(indice);
			} else {
				showMessage("Atenção!", "Selecione a Filial antes de adicionar um produto.", null);
			}
			mostraInfoPaciente();
		}).parent().removeClass('hidden');

		$("#btnApagaItens").click(function () {
			//Apaga todos os intens de um Pai Filho
			FLUIGC.message.confirm({
				message: 'Deseja remover TODOS os produtos?',
				title: 'Remover Produtos',
				labelYes: 'Remover',
				labelNo: 'Cancelar'
			}, function (result, el, ev) {
				if (result == true) {
					$('#tbProd tbody tr').not(':first').each(function (count, tr) {
						fnWdkRemoveChild($(this).find('input')[0]);
					});
				}
			});
		}).parent().removeClass('hidden');
		$("tbProd").attr("nodeletebutton", "false");


		$('#valorTotal').change(function () {
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
		})

		//Configuarção import csv
		FLUIGC.utilities.parseInputFile("#btnImportCsv");
		$("#btnImportCsv").change(function (event) {
			self.readCSV(event.target.files[0]);
		});

		//Busca o ambiente do fluig
		if (window.location.host == 'oncoclinicas.fluig.com') {
			$('#ambiente').val('producao');
		} else {
			$('#ambiente').val('devTst');
		}

		$('#prazoPagamento').val("60 DIAS");
		$('#codPrazoPagamento').val("008");

		configZoom();
		self.buscaTabelaPreco();
		ocultaInfoPaciente();
		$("[name^=zoomProd]").show();
		$('.containerBtnImportCsv').show();

		$("[data-prevEntrega]").removeClass("required");
		$("[data-dataEntrega]").removeClass("required");
	}
	//Seta as configuarções dos campos da tabela de produtos
	this.configRowProd = function (indice) {
		//ajusta layout do campo pai filho
		$(".fs-md-space").each(function () {
			$(this).removeClass("fs-md-space");
		});
		$("#itemProd___" + indice).val(indice);
		addMaskMonetaria("#valorProd___" + indice);
		$("#codProd___" + indice).next("span").on("click", function () {
			openZoom("ds_produtos",
				"CODIGO, Codigo, DESCRICAO, Descrição",
				"CODIGO, DESCRICAO,COD_TIPO,DESC_TIPO,UM,ULTIMO_PRECO,CONTA_CONTABIL,FABRICANTE",
				"",
				"produto___" + indice);
		});
		$("#qtdProd___" + indice).change(function () {
			$(this).removeClass("error-field");
			var qtd = $(this).val();
			var valor = $("#valProd___" + indice).val();
			if (qtd == "") {
				qtd = 0;
			}
			if (valor == "" || valor == "Não encontrado") {
				valor = "R$ 0,00";
			}
			valor = removeMascaraMonetaria(valor);

			$("#valTotalProd___" + indice).val(addMascaraMonetaria((valor * qtd).toFixed(2)));
			//Seta o valor total da solicitacao
			$("#valorTotal").val(self.sumTotal("valTotalProd", "totalValorProd", true)).change();

		});
		$("#valorProd___" + indice).change(function () {
			var valor = $(this).val();
			$(this).removeClass('error-field');
			if (valor == "" || valor == "Não encontrado") {
				valor = 0;
				$(this).addClass('error-field');
			}
			var qtd = parseInt($("#qtdProd___" + indice).val());
			if (qtd != "" && qtd != 0) {
				valor = removeMascaraMonetaria(valor);
				$("#valorTotalProd___" + indice).val(addMascaraMonetaria((valor * qtd).toFixed(2)));
				//Seta o valor total da solicitacao
				sumTotal("valProd", "totalValorProd", true);
				$("#valorTotal").val(sumTotal("valTotalProd", "totalValorProd", true)).change();
			}
		});
		$("#codProd___" + indice).change(function () {
			//Define o prazo de pagamento
			var fabricante = $("#fabricanteProd___" + indice).val();
			var valorICMS = $("#numICMS").val();
			var codigo = $(this).val();
			var valorProduto = self.getValorProduto(codigo);
			if (valorProduto != null) {
				//busca valor do produto
				$("#valProd___" + indice).val(addMascaraMonetaria(valorProduto)).change();
			} else {
				$("#valProd___" + indice).val("Não encontrado");
				$("#valProd___" + indice).addClass("error-field");
			}

			//Calcula a quantidade de produto por caixa
			var filtro = DatasetFactory.createConstraint('numProd', codigo, codigo, ConstraintType.MUST);
			var ds_fatorCaixa = DatasetFactory.getDataset('ds_fatorCaixa', null, new Array(filtro), null);
			if (ds_fatorCaixa.values.length > 0) {
				var undInBox = ds_fatorCaixa.values[0].unidade;
				if (undInBox > 0) {
					var qtdCaixa = $('#qtdDelife___' + indice).val();
					$('#qtdProd___' + indice).val(undInBox * qtdCaixa).change();
				} else {
					$("#qtdProd___" + indice).addClass("error-field");
				}
			} else {
				$("#qtdProd___" + indice).addClass("error-field");
			}
			$("#codProd___" + indice).removeClass("error-field");
		});

		$("#dataInclusaoPedido___" + indice).prop("readonly", "");
		$("#matriculaPaciente___" + indice).prop("readonly", "");
		$("#nomePaciente___" + indice).prop("readonly", "");
		$("#cpfPaciente___" + indice).prop("readonly", "");
		$("#qtdProd___" + indice).prop("readonly", "");
		$("#qtdEntregProd___" + indice).prop("readonly", "");
		$("#crmMedico___" + indice).prop("readonly", "");
		$("#telPaciente___" + indice).prop("readonly", "");
		$("#emailPaciente___" + indice).prop("readonly", "");
		$("#enderPaciente___" + indice).prop("readonly", "");
		$("#cidadeUFPaciente___" + indice).prop("readonly", "");
		$("#cepPaciente___" + indice).prop("readonly", "");

		$("#dataInclusaoPedido___" + indice).prop("readonly", "");
		$("#dataNascPaciente___" + indice).prop("readonly", "");
		FLUIGC.calendar("#dataInclusaoPedido___" + indice);
		FLUIGC.calendar("#dataNascPaciente___" + indice);

		$("#cpfPaciente___" + indice).mask('000.000.000-00', {
			reverse: true
		})
		$("#cepPaciente___" + indice).mask('00.000-000', {
			reverse: false
		})
	}

	this.getValorProduto = function (codProduto) {
		if (self.tabelaPreco != undefined) {
			for (var i in self.tabelaPreco) {
				var produto = self.tabelaPreco[i];
				if (codProduto == produto.COD_PRODUTO) {
					return produto.VALOR;
				}
			}
		}
		return null;
	}

	this.readCSV = function (csvfile) {
		$("#fieldsetProd").hide();
		var reader = new FileReader();
		reader.readAsText(csvfile);
		reader.onload = function (event) {
			var csv = event.target.result;
			csv = replaceAll(csv, "'", '"');
			var x = csv.split('"');
			if (x.length > 1) {
				var y = "";
				for (var i = 0; i < x.length; i++) {
					if (i % 2 == 0) {
						y += x[i];
					} else {
						y += replaceAll(x[i], ",", ".");
					}
				}
				csv = y;
			}
			csv = replaceAll(csv, '"', '');

			var virgula = csv.indexOf(",");
			var pontovirgula = csv.indexOf(";");


			if (virgula != -1 && pontovirgula != -1) {
				if (virgula < pontovirgula) {
					var separator = {
						"separator": ","
					};
				} else {
					var separator = {
						"separator": ";"
					};
				}
			} else if (virgula == -1 && pontovirgula != -1) {
				var separator = {
					"separator": ";"
				};
			} else if (virgula != -1 && pontovirgula == -1) {
				var separator = {
					"separator": ","
				};
			} else {
				FLUIGC.toast({
					title: 'Importação do arquivo CSV:',
					message: 'Não foram encontrados pradrões exigidos para a leitura do arquivo CSV, não foi encontrado caractecter separador que devem ser vírgula ou ponto e vírgula.',
					type: 'danger'
				});
				return false;
			}

			var data = $.csv.toArrays(csv, separator);
			var listProdCsv = new Array();
			var listConstraintProd = new Array();
			for (var row = 1; row < data.length; row++) {
				var codigoProd = data[row][10];

				listProdCsv.push({
					itemProd: row,
					dataInclusaoPedido: data[row][0],
					matriculaPaciente: data[row][1],
					nomePaciente: data[row][2],
					dataNascPaciente: data[row][3],
					cpfPaciente: data[row][4],
					telPaciente: data[row][5],
					emailPaciente: data[row][6],
					enderPaciente: data[row][7],
					cidadeUFPaciente: data[row][8],
					cepPaciente: data[row][9],
					codProd: codigoProd,
					desProd: data[row][11],
					qtdDelife: data[row][12],
					qtdEntregProd: data[row][14],
					crmMedico: data[row][15]
				});

				if (codigoProd != '') {
					listConstraintProd.push(DatasetFactory.createConstraint('CODIGO', codigoProd, codigoProd, ConstraintType.SHOULD));
				}
			}
			self.addProdByCsv(listProdCsv, listConstraintProd);
			$("#fieldsetProd").show();
		}
	};
	this.addProdByCsv = function (listProdCsv, listConstraintProd) {
		var ds_Produto = DatasetFactory.getDataset('ds_produtos', null, listConstraintProd, null).values;

		var listaNaoEncontrados = [];

		for (var i in listProdCsv) {
			var indice = wdkAddChild("tbProd");
			self.configRowProd(indice);

			$("#itemProd___" + indice).val(listProdCsv[i].itemProd);
			$("#dataInclusaoPedido___" + indice).val(listProdCsv[i].dataInclusaoPedido);
			$("#matriculaPaciente___" + indice).val(listProdCsv[i].matriculaPaciente);
			$("#nomePaciente___" + indice).val(listProdCsv[i].nomePaciente);
			$("#dataNascPaciente___" + indice).val(listProdCsv[i].dataNascPaciente);
			$("#cpfPaciente___" + indice).val(listProdCsv[i].cpfPaciente);
			$("#telPaciente___" + indice).val(listProdCsv[i].telPaciente);
			$("#emailPaciente___" + indice).val(listProdCsv[i].emailPaciente);
			$("#enderPaciente___" + indice).val(listProdCsv[i].enderPaciente);
			$("#cidadeUFPaciente___" + indice).val(listProdCsv[i].cidadeUFPaciente);
			$("#cepPaciente___" + indice).val(listProdCsv[i].cepPaciente);

			$("#qtdDelife___" + indice).val(listProdCsv[i].qtdDelife);
			$("#qtdEntregProd___" + indice).val(listProdCsv[i].qtdEntregProd);
			$("#crmMedico___" + indice).val(listProdCsv[i].crmMedico);

			var achouProdutoProtheus = false;
			for (var j in ds_Produto) {
				var codProdutoDs = ds_Produto[j]["CODIGO"].substring(1, ds_Produto[j]["CODIGO"].length);
				if (listProdCsv[i].codProd == codProdutoDs) {
					$("#codProd___" + indice).val(ds_Produto[j]["CODIGO"]);
					$("#codProd___" + indice).removeClass("error-field");
					$("#desProd___" + indice).val(ds_Produto[j]["DESCRICAO"]);
					$("#unidProd___" + indice).val(ds_Produto[j]["UM"]);
					$("#fabricanteProd___" + indice).val(ds_Produto[j]["FABRICANTE"]);
					$("#contaContabilProd___" + indice).val(ds_Produto[j]["CONTA_CONTABIL"]);

					$("#codProd___" + indice).change();
					achouProdutoProtheus = true;
					break;
				}
			}

			if (!achouProdutoProtheus) {
				listaNaoEncontrados.push(indice);
				$("#codProd___" + indice).addClass("error-field");
			}
		}

		if (listaNaoEncontrados.length > 0) {
			FLUIGC.toast({
				title: 'Importação do arquivo CSV:',
				message: 'Alguns códigos de produtos não foram encontrados no Protheus, por gentileza, verifique as informações do arquivo csv ou realize uma nova busca.',
				type: 'danger'
			});
		}
	}

	this.sumTotal = function (nomeCampoPaiFilho, campoTotal, addMaskMonetareia) {
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

	//Função executada ao apertar o botão enviar que gera o xml
	$('.fixedTopBar, #page-header', parent.document).find('button:first').bind("click", function () {
		var pedidoCompra = new PedidoCompra();
		pedidoCompra.createXml();
	});
	//Seta o valor total da solicitacao
	$("#valorTotal").val(self.sumTotal("valTotalProd", "totalValorProd", true));

	//As clinicasdoEspirito Santo e Distrito Federal usarãoa tabela de 17% ICMS,
	//a tabela de 20% para as que estão  localizadas  no Rio  de  Janeiro  e
	//as  demais clinicas  a  tabela de  18%.
	this.buscaTabelaPreco = function () {
		var uf = $("#ufFilial").val();
		var fornecedor = $('#codFornecedor').val();
		var loja = $('#lojFornecedor').val();
		var codigoTabelaPreco = '029';
		var f1 = DatasetFactory.createConstraint('COD_FORNECEDOR', fornecedor, fornecedor, ConstraintType.MUST);
		var f2 = DatasetFactory.createConstraint('LOJA_FORNECEDOR', loja, loja, ConstraintType.MUST);
		var f3 = DatasetFactory.createConstraint('CODIGO', codigoTabelaPreco, codigoTabelaPreco, ConstraintType.MUST);
		self.tabelaPreco = DatasetFactory.getDataset('ds_tabelaPrecoCompras', null, new Array(f1, f2, f3), null).values;
		$("#tabelaPreco").val(self.tabelaPreco[0].DESCRICAO);
		$("#numICMS").val(codigoTabelaPreco);
	}
}