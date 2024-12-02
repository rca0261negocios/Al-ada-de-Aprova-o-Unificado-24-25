//fim atividades de contrato
$(document).ready(function() {
   MaskEvent.init();
   var MODO_EDICAO = $('#MODO').val()
   $('#div_contratos').hide();
   var INICIO_CONTRATO = '368';
   var ANALISE_CONTRATO = '369';
   var CORRECAO_SOLICITACAO_COMPRAS = '371';
   var VALIDACAO_DOCUMENTO = '372';
   var CORRECAO_DOCUMENTO_CONTRATOS = '374';
   var CORRECAO_DOCUMENTO_COMPRAS = '376';
   var CORRECAO_DOCUMENTO_SOLICITANTE = '377';
   var REVISAO_CLAUSULAS = '372';
   var APROVA_SOLICITANTE = '383';
   var SOLUCAO_INCONSISTENCIA = '384';
   var ALCADA_APROVACAO = '386';
   var ASSINATURA_INTERNA_E_FORN = '393';
   var ASSINATURA_INTERNA = '393';
   var VALIDACAO_ASSINATURA_FORNECEDOR = '393';
   if (MODO_EDICAO == 'VIEW') {
      //$('#div_contratos').hide();
   }
   
   if (MODO_EDICAO == 'VIEW') {
      if ($("#hiddenPrioridade").val() == "N") {
         $('#msgEmerg').hide();
         // $('#campoIdentificador').val($('filial').val())
      } else {
         // $('#campoIdentificador').val('EMERGENCIAL' + $('filial').val())
      }
   }
   
   var CURRENT_STATE = $('#CURRENT_STATE').val()
   //somaProdutos();
   FLUIGC.popover('.bs-docs-popover-click', {
      trigger: 'click',
      placement: 'auto'
   });
   
   adicionaMascaraMonetaria("valorTotalServico");
   if ($("#codServOuProd").val() != "SV") {
      $(".classLocalPrestServico").hide();
   } else {
      $(".classLocalPrestServico").show();
   }
   if ($("#sPrioridadeProduto").val() == "E") {
      $('#bordaEmerg').addClass('bordaEmergencial')
      $("#msgEmerg").show();
      $("#hiddenPrioridade").val('E');
   } else {
      $('#bordaEmerg').removeClass('bordaEmergencial')
      $("#msgEmerg").hide();
      $("#hiddenPrioridade").val("");
   }
   
   $("input[name=reajusteContrato]").change(function() {
      if ($("input[name='reajusteContrato']:checked").val() == 2) {
         $(".indice").hide();
      } else {
         $(".indice").show();
      }
   });
   $("#dtAssinaContrato").change(function() {
      var i = $("#dtAssinaContrato").val().split("-");
      $("#dataAssinaContrato").val(i[2] + "/" + i[1] + "/" + i[0]);
   });
   $("#sPrioridadeProduto").change(function() {
      if (this.value == 'E') {
         $('#bordaEmerg').addClass('bordaEmergencial')
         $("#msgEmerg").show();
         $("#hiddenPrioridade").val('E');
      } else {
         $('#bordaEmerg').removeClass('bordaEmergencial')
         $("#msgEmerg").hide();
         $("#hiddenPrioridade").val("");
      }
   });
   $("#anexo5").change(function() {
      if ($("input[name='anexo5']:checked").val() == "on" || $("input[name='anexo5']:checked").val() == "ON") {
         $("#anexoOutros").show()
      } else {
         $("#anexoOutros").hide()
      }
   })
   if ($("#tipoContratoCompras").val() == "Aditivo") {
      $("#numeroAdivo").show();
      $(".dtTermoContrato").show();
      $(".dtPagamento").hide();
   } else {
      $("#numeroAdivo").hide();
      $(".dtTermoContrato").hide()
      $(".dtPagamento").show()
   }

   if (CURRENT_STATE == INICIO_CONTRATO || CURRENT_STATE == "0") {
      configFilho();
      getParamsURL()
   }
   if ($("#minutaPadrao").val() == 'true') {
      $('#chancelamentoContrato').hide();
   }
   if (CURRENT_STATE == ANALISE_CONTRATO) {
      $('#div_contratos').show();
      $("#alteraValor").val($("#valorTotalServico").val());
      $("#aprovaAnaliseContrato").val("");
      $('#observacaoAnliseContrato').val("");
      $('#btnExportDoc').show();
      $('#btnExportDocEmpreitada').show();
      $('#totalFiliasGuard').val($('#tbFiliais tbody tr:not(:first)').length);
      $('#indiceCriacaoContrato').val("1");
      window.onload = function() {
         calcValorFilial()
      }
      //calcValorFilial();
      if ($("#executorAtvAnaliseContrato").val() == '') {
         $("#executorAtvAnaliseContrato").val($("#setRespCompras").val());
      }
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == ALCADA_APROVACAO) {
      $('#div_contratos').show();
      var contadorAlcadaCarta = parseInt($("#nivelAtualAprovacao").val());
      if (contadorAlcadaCarta < 5 && $("#idAprovGestor" + contadorAlcadaCarta).val() == $("#proximoAprovador").val()) {
         contadorAlcadaCarta++;
         $("#proximoAprovador").val($("#idAprovGestor" + contadorAlcadaCarta).val())
      } else {
         if (contadorAlcadaCarta == 5) {
            $("#proximoAprovador").val("");
         }
      }
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == CORRECAO_DOCUMENTO_CONTRATOS) {
      $('#div_contratos').show();
      // DESMARCANDO FUNÇÃO RADIOBUTTON
      $('input[name=realizaAtividade]').attr('checked', false);
      $('#observacaoCorrecaoDocumento').val("");
      $('#btnExportDoc').show();
      $('#btnExportDocEmpreitada').show();
   } else
   if (CURRENT_STATE == CORRECAO_SOLICITACAO_COMPRAS) {
      $('#div_contratos').show();
      buscarGestores();
      $("#nivelAtualAprovacao").val("1")
      $('input[name="valorTotalServico"]').on('blur', buscarGestores);
      $('#analiseContrato').show();
      
      // Se Contrato Guarda-Chuva realiza cálculo de cada filial	
      calcValorFilial()
   } else
   if (CURRENT_STATE == CORRECAO_DOCUMENTO_COMPRAS) {
      $('#div_contratos').show();
      $('.correcaoSolicitacao').hide();
      $('.observacaoUsuarioCompras').val("");
   } else
   if (CURRENT_STATE == VALIDACAO_DOCUMENTO) {
      $('#div_contratos').show();
      $("#aprovaValidaDocumento").val("");
      $('#observacaoValidaDocumento').val("");
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == VALIDACAO_ASSINATURA_FORNECEDOR) {
      $('#div_contratos').show();
      $("#aprovaValidaAssinatura").val("");
      $('#observacaoValidaAssinatura').val("");
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == REVISAO_CLAUSULAS) {
      $('#div_contratos').show();
      if ($("#validaJuridico").val() == "sim") {
         $("#divMotivoCorrecaoJuridico").show();
         $("#motivoCorrecaoJuridico").prop("readonly", true);
         $("#validaJuridico").val("");
      }
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == ASSINATURA_INTERNA || CURRENT_STATE == ASSINATURA_INTERNA_E_FORN) {
      $('#div_contratos').show();
      $("#validaJuridico").val("");
      $("#voltarJuridico").show();
      if ($('#minutaPadrao').val() == 'true') {
         $('#voltarJuridico').html('Voltar para o compras&nbsp;&nbsp;<span class="fluigicon fluigicon-taskcentral fluigicon-sm"></span>')
      }
      $("#voltarJuridico").click(function() {
         if ($("#validaJuridico").val() == "") {
            $("#validaJuridico").val("sim");
            $("#divMotivoCorrecaoJuridico").show();
         } else {
            $("#validaJuridico").val("");
            $("#divMotivoCorrecaoJuridico").hide();
         }
      })
      // Adicionando Mascaras
      if (MODO_EDICAO != 'VIEW') {
         FLUIGC.calendar('#dataIniContrato', {
            maxDate: $("#dataAssinaturaInterna").val()
         });
         FLUIGC.calendar('#dataAssinaContrato');
         $("#avisoPrevio").val($("#rescisaoContrato").val());
         $("input[name=contratoFisico][value='S']").prop("checked", true);
      }
      $("#dataIniContrato").change(function() {
         if (comparaData(this.value) == true) {
            this.value = "";
            showMessage("Atenção", "A data de Inicio Contrato não pode ser maior que a data atual.")
         }
      })
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == APROVA_SOLICITANTE) {
      $('#div_contratos').show();
      $("#aprovaSolicitante").val("");
      // Removendo a Lixeira e os espaços da tabela
      var primeriaColunaVazia = $("table")[3].tHead.firstElementChild.children[0];
      primeriaColunaVazia.hidden = true
      $(".bpm-mobile-trash-column").hide();
   } else
   if (CURRENT_STATE == SOLUCAO_INCONSISTENCIA) {
      ('#div_contratos').show();
   } else
   if (CURRENT_STATE == CORRECAO_DOCUMENTO_SOLICITANTE) {
      ('#div_contratos').show();
   } else
   if (CURRENT_STATE != INICIO_CONTRATO && CURRENT_STATE != "0" && CURRENT_STATE && CORRECAO_SOLICITACAO_COMPRAS) {
      // Exibe campo indice se tem reajuste
      if ($("#reajusteContrato").val() == "1") {
         $(".indice").show();
      } else {
         $(".indice").hide();
      }
      // Inibindo lixeira das tabelas
      //$(".bpm-mobile-trash-column").hide();
      var removeLixeiraTbFilial = $("table")[0].tHead.firstElementChild.children[0];
      removeLixeiraTbFilial.hidden = true;
      var removeLixeiraTbFornecedor = $("table")[1].tHead.firstElementChild.children[0];
      removeLixeiraTbFornecedor.hidden = true;
   } else
   if (CURRENT_STATE != INICIO_CONTRATO && CURRENT_STATE != "0" && CURRENT_STATE != CORRECAO_DOCUMENTO_SOLICITANTE) {
      // Desabilitando o flag de contrato Guarda-chuva
      FLUIGC.switcher.isReadOnly('#isContratoGuardChuvaContrato', true);
   }
   
   // Link para abrir a solicitação iniciada no Fluxo de Compras
   $('#linkNumSolicitacao').on('click', function() {
      var numSolicitacao = $("#numSolicitacao").val();
      var origem = window.location.origin;
      var linkProcess = origem + "/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolicitacao;
      $("a#linkNumSolicitacao").prop('href', linkProcess);
      $("a#linkNumSolicitacao").trigger("click");
      //window.open(linkProcess);
   });
   // Botão para adicionar Filiais
   $("#btAddLinhaFilial").click(function() {
      var tabela = 'tbFiliais';
      var index = wdkAddChild(tabela);
      configFilho(index);
      campoValor();
   });
   // Botão para adicionar Produtos
   $("#btAddLinha").click(function() {
      var tabela = 'tbItens';
      var index = wdkAddChild(tabela);
      configFilho(index);
      $("#txtSeqItemProduto___" + index).val(index).change();
      FLUIGC.calendar('#dtNecessidadeProduto___' + index);
      adicionaMascaraMonetaria("txtPrecoProduto___" + index);
   });
   $("#btAddLinhaFornecedor").click(function() {
      var tabela = 'tbFornecedores';
      var index = wdkAddChild(tabela);
      configFilho(index);
      FLUIGC.calendar('#prazoEntrega___' + index)
      $("#txtSeqItemProduto___" + index).val(index).change();
      FLUIGC.calendar('#dtNecessidadeProduto___' + index);
      MaskEvent.init();
   });

   // Eventos de mudanças
   $('#tabs a[href="#itens"]').on('change', exibeItens);
   $('#tabs a[href="#contratos"]').on('change', exibeContratos);
   $('#tabs a[href="#fornecedores"]').on('change', exibeFornecedores);

   btnAprov();
   
   if ($("input[name='reajusteContrato']:checked").val() == 2) {
      $(".indice").hide();
   }
});

function configFilho(index) {
   // Remove o espaçamento indevido dos ícones de remoção de linhas das tabelas.
   $(".fs-md-space").removeClass("fs-md-space");
}

// Adicionando visibilidade para as abas Itens, Contratos, Fornecedores
function exibeItens() {
   $("#contratos").removeClass("active");
   $("#fornecedores").removeClass("active");
   $('#tabs a[href="#itens"]').addClass("active");
}

function exibeContratos() {
   $("#itens").removeClass("active");
   $("#fornecedores").removeClass("active");
   $('tabs a[href="#contratos"]').addClass("active");
}

function exibeFornecedores() {
   $("#itens").removeClass("active");
   $("#contratos").removeClass("active");
   $('tabs a[href="#fornecedores"]').addClass("active");
}

// Adicionando visibilidade para os botões de aprovação
function aprovador(id) {
   var origemAprovado = id.split('aprovado');
   var indexAprovado = origemAprovado.pop();
   var aprovado = "aprovado" + indexAprovado;
   var origemReprovado = id.split('reprovado');
   var indexReprovado = origemReprovado.pop();
   var reprovado = "reprovado" + indexReprovado;
   if (id == aprovado) {
      $("#like" + indexAprovado).removeClass("hide");
      $("#noLike" + indexAprovado).addClass("hide");
      $("#aprova" + indexAprovado).val("sim");
      $(".obrigaObservacao" + indexAprovado).hide();
   } else if (id == reprovado) {
      $("#noLike" + indexReprovado).removeClass("hide");
      $("#like" + indexReprovado).addClass("hide");
      $("#aprova" + indexReprovado).val("nao");
      $(".obrigaObservacao" + indexReprovado).show();
   }
}

// Função responsável pela remoção da mascara monetaria
function removeMascaraMonetaria(mask) {
   if (mask != undefined && mask != null && mask != '') {
      mask = mask.replace(/[^0-9,.]/g, '');
      mask = mask.replace(' ', '');
      mask = mask = mask.replace(/[\.]/g, '');
      mask = mask.replace(',', '.');
      return parseFloat(mask);
   } else {
      return 0.00;
   }
}

// Exibe mensagem de erro (CNPJ inválido) 
function showMessage(titulo, mensagem, functionDone) {
   FLUIGC.toast({
      title: titulo,
      message: mensagem,
      type: 'warning',
      timeout: 5000
   })
}

//Remove um iten da tabela de produtos 
function campoIten(oElement) {
   fnWdkRemoveChild(oElement);
   somaProdutos();
}

// Exibe campo Valor se for contrato guarda-chuva para cada filial
function campoValor(oElement) {
   fnWdkRemoveChild(oElement); // Função padrão da lixeira
   calcValorFilial();
   if ($("#tbFiliais tbody tr").length <= 2) {
      $(".valorUnitario").hide();
   } else {
      $(".valor").show();
      $(".valorUnitario").show();
   }
}

// Realiza o Cálculo dos valores de cada filial
function calcValorFilial() {
	
	debugger;
	
   var total = 0;
   var percentual = 0;
   var valorTotal = removeMascaraMonetaria($("#valorTotalServico").val());
   $('[name^=valorPercent___]').each(function() {
      var indice = this.name.split('___')[1];
      percentual = $('#valorPercent___' + indice).val() == "" ? "0" : $('#valorPercent___' + indice).val();
      total = total + parseFloat(percentual);
      $("#valorUnitario___" + indice).val(addMascaraMonetaria(parseFloat(valorTotal * (percentual / 100))));
      $("#valorUnitarioContrato___" + indice).val(addMascaraMonetaria(parseFloat(valorTotal * (percentual / 100))));
      if (total > 100) {
         showMessage("Erro", "O valor do percentual total das filiais não podem ser maior que 100%.");
         $('#valorPercent___' + indice).val("");
         return 0;
      }
      $("#totalPercFilial").val(total);
   });
}

// Validador de email
function validacaoEmail(field) {
   usuario = field.value.substring(0, field.value.indexOf("@"));
   dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);
   if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
      $("#validaEmail").val("E-mail válido");
   } else {
      FLUIGC.toast({
         title: "E-mail inválido. ",
         message: "Favor verificar.",
         type: 'warning',
         timeout: 5000
      })
      $("#validaEmail").val("");
   }
}

// Verifica o click no botão aprovar
function btnAprov() {
   // BOTAO DE APROVACAO
   $(".btnAprov").on("click", function() {
      var botao = $(this).attr("id").split("Btn")
      var decisao = botao[0];
      var btnAprov = decisao + "BtnAprov";
      var btnReprov = decisao + "BtnReprov";
      var acao = botao[1];
      decisaoSolicitacao(decisao, btnAprov, btnReprov, acao);
   });
}

//Verifica a decisao da aprovação
function decisaoSolicitacao(decisao, btnAprov, btnReprov, acao) {
   if (acao == "Aprov") {
      $("#" + decisao).val("sim");
      $("#iniciarPesquisa").show();
   } else {
      $("#" + decisao).val("nao");
      $("#iniciarPesquisa").hide();
   }
   altBtnAprov(decisao, btnAprov, btnReprov);
}

//Alterar a cor do botao de aprovação
function altBtnAprov(decisao, btnAprov, btnReprov) {
   if ($("#" + decisao).val() == "sim") {
      $("#" + btnAprov).removeClass("btn-default").addClass("btn-success active");
      $("#" + btnReprov).removeClass("btn-danger active").addClass("btn-default");
   } else if ($("#" + decisao).val() == "nao") {
      $("#" + btnAprov).removeClass("btn-success active").addClass("btn-default");
      $("#" + btnReprov).removeClass("btn-default").addClass("btn-danger active");
   }
}

//Bloqueia todos os botoes de aprovação
function blqAllBtnAprov() {
   $(".btnAprov").each(function() {
      var botao = $(this).attr("id").split("Btn")
      var decisao = botao[0];
      blqBtnAprov(decisao);
   });
}

// Bloqueia unitariamente o botão de aprovação
function blqBtnAprov(decisao) {
   var btnAprov = decisao + "BtnAprov";
   var btnReprov = decisao + "BtnReprov";
   altBtnAprov(decisao, btnAprov, btnReprov);
   $("#" + btnAprov).prop("disabled", true);
   $("#" + btnReprov).prop("disabled", true);
}

function somaProdutos() {
   var valorAtual = 0;
   parseFloat(soma);
   var soma = 0;
   $('[name^=txtSeqItemProduto___]').each(function() {
      var indice = this.name.split('___')[1];
      if ($("#txtDescProduto___" + indice).val() != "") {
         valorAtual = removeMascaraMonetaria($('#txtPrecoProduto___' + indice).val() == "" ? "0" : $('#txtPrecoProduto___' + indice).val());
         var qtd = $('#txtQuantidadeProduto___' + indice).val() == "" ? "1" : $('#txtQuantidadeProduto___' + indice).val();
         valorItem = valorAtual * qtd
         soma = soma + valorItem; //parseFloat(valorAtual);
      }
      adicionaMascaraMonetaria("txtPrecoProduto___" + indice);
   });
   $("#valorTotalServico").val(addMascaraMonetaria(soma));
   calcValorFilial();
   //console.log(addMascaraMonetaria(soma));
}

// Função responsável pela máscara monetaria no campo 
function adicionaMascaraMonetaria(campo) {
   $('#' + campo).maskMoney('destroy');
   $('#' + campo).maskMoney({
      prefix: "R$ ",
      thousands: '.',
      decimal: ',',
      affixesStay: true,
      allowZero: true
   });
}

// Função responsável pela máscara monetaria no valor 
function addMascaraMonetaria(valor) {
   if (valor == '' || valor == undefined) {
      return 'R$ 0,00';
   } else {
      var inteiro = null,
         decimal = null,
         c = null,
         j = null;
      var aux = new Array();
      valor = "" + valor;
      c = valor.indexOf(".", 0);
      //encontrou o ponto na string
      if (c > 0) {
         //separa as partes em inteiro e decimal
         inteiro = valor.substring(0, c);
         decimal = valor.substring(c + 1, valor.length);
      } else {
         inteiro = valor;
      }
      //pega a parte inteiro de 3 em 3 partes
      for (j = inteiro.length, c = 0; j > 0; j -= 3, c++) {
         aux[c] = inteiro.substring(j - 3, j);
      }
      //percorre a string acrescentando os pontos
      inteiro = "";
      for (c = aux.length - 1; c >= 0; c--) {
         inteiro += aux[c] + '.';
      }
      //retirando o ultimo ponto e finalizando a parte inteiro
      inteiro = inteiro.substring(0, inteiro.length - 1);
      if (isNaN(decimal) || decimal == null || decimal == undefined) {
         decimal = "00";
      } else if (decimal.length === 1) {
         decimal = decimal + "0";
      }
      valor = "R$ " + inteiro + "," + decimal;
      return valor;
   }
}

function comparaData(dataString) { //recebe data no formato 12/09/2019
   var dataMenor = false;
   var hoje = new Date();
   var dat = dataString.split('/');
   dat = new Date(dat[2], dat[1] - 1, dat[0]);
   if (dat > hoje) {
      dataMenor = true;
      console.log('Data menor que hoje');
   }
   return dataMenor;
}
