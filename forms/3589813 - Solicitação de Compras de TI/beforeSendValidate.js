var informaFaltaCotacao = true;

var beforeSendValidate = function (numState, nextState) {
  if (numState == 6) {
    var fonecedorExclusivo = $("#hideFornecedorExclu").val();
    var fonecedorExcluClassica = $("#hideFornecedorExcluClassica").val();
    if (fonecedorExclusivo == "false" && fonecedorExcluClassica == "false") {
      var valorTotalProd = $("#valorTotalSolicitacao")
        .val()
        .replace("R$ ", "")
        .replace(".", "")
        .replace(".", "")
        .replace(".", "")
        .replace(",", ".");
      var indexForn = $("#tbCotacao > tbody > tr:not(:first-child)").length;

      //if (valorTotalProd > 1000 && valorTotalProd <= 5000 && indexForn < 1) {
        //throw "O valor total das Cotações está entre R$1.001 à R$5.000. É necessário ter no mínimo 1 fornecedores. </br>";
      //}

      if (valorTotalProd >= 5001 && valorTotalProd <= 10000 && indexForn <= 1) {
        throw "O valor total das Cotações está entre R$5.001 à R$10.000. É necessário ter no mínimo 2 fornecedores. </br>";
      }

      if (valorTotalProd > 10000 && indexForn <= 2) {
        throw "O valor total das Cotações é maior que R$10.000. É necessário ter no mínimo 3 fornecedores. </br>";
      }
    }

    var qnt = $("table[tablename='tbProdAlterados'] tbody tr").length;
    if (qnt > 1) {
      // validar campos obrigatórios
      $("input[id^='alt_desc___']").each(function (index) {
        var id = $(this).attr("id").split("___")[1];

        if ($("#alt_obs___" + id).val() == "")
          throw (
            "Por favor preencher a justificativa de alteração na linha: " + id
          );
      });
    }

    if (informaFaltaCotacao && $("[name^=codCotacao___]").length > 0) {
      var lineBreaker = "</br>";
      var msg = "";

      var listaContacoes = "";
      $("[name^=codProd___]").each(function () {
        var cotacaoOK = false;
        var codItens = $(this).val();
        if (codItens) {
          var indexItem = $(this).attr("name").split("___")[1];
          $("[name^=codCotacao___]").each(function () {
            codCotacoes = $(this).val();
            if (codCotacoes) {
              var indexCotacao = $(this).attr("name").split("___")[1];
              if (codItens == codCotacoes) {
                cotacaoOK = true;
              }
            }
          });
          if (!cotacaoOK) {
            listaContacoes +=
              codItens +
              " - " +
              $("[name=nomeProd___" + indexItem).val() +
              lineBreaker;
          }
        }
      });

      if (listaContacoes != "") {
        msg +=
          "Aten\u00E7\u00E3o, n\u00E3o foram encontrados cota\u00E7\u00E3os para os seguintes itens: " +
          lineBreaker +
          listaContacoes +
          lineBreaker +
          "Sem as cota\u00E7\u00F5es acima <b>sua solicita\u00E7\u00E3o ainda pode ser movimentada</b>, porém os itens n\u00E3o ser\u00E3o inclu\u00EDdos na emiss\u00E3o do pedido de compra. ";
      }

      if (msg != "") {
        informaFaltaCotacao = false;
        throw msg;
      }

      if ($("#correcaoSolicitacao").val() == "false") {
        verificaFornecedorSemCadastro();
      }
    }
  }
};

function verificaFornecedorSemCadastro() {
  var msgErro = "";
  var subprocessos = $("#tbFornVenc tbody tr").not(":first").length;
  var contadorProcessoAtivo = 0;

  if (subprocessos > 0) {
    $("[name^=numSubProcesso___]").each(function () {
      var indice = this.name.split("___")[1];
      var statusCad = verificaStatusCadastro(this.value);
      if (statusCad[0].status == 0) {
        contadorProcessoAtivo++;
        msgErro += "\n" + $("#numSubProcesso___" + indice).val();
      } else {
        var fornecedor = consultaFornecedorCadastrado(
          $("#cgcFornVenc___" + indice).val()
        );
        atualizaDadosFornecedor(fornecedor);
      }
    });

    if (contadorProcessoAtivo > 0) {
      $("#iniciarCadastro").val("false");

      throw (
        "Não é possível prosseguir com o chamado pois ainda existe(m) " +
        contadorProcessoAtivo +
        " fornecedor(es) na etapa de cadastro. Termine o cadastro antes de movimentar o chamado. Subprocesso(s) ativo(s): " +
        msgErro
      );
    } else {
      $("#iniciarCadastro").val("false");
    }

    $("#jsonFornACadastrar").val("");
  } else {
    var cgcSemCadastro = [];
    var dadosParaCadastroFornecedor = [];

    $("[name^=cnpjVencedorProd___]").each(function () {
      var indice = this.name.split("___")[1];
      if ($("#codFornVencedorProd___" + indice).val() == "") {
        if (
          !cgcSemCadastro.includes($("#cnpjVencedorProd___" + indice).val())
        ) {
          cgcSemCadastro.push($("#cnpjVencedorProd___" + indice).val());
          dadosParaCadastroFornecedor.push(
            dadosForn($("#cnpjVencedorProd___" + indice).val())
          );
        }
      }
    });

    $("#totalFornSemCadastro").val(dadosParaCadastroFornecedor.length);
    $("#jsonFornACadastrar").val(JSON.stringify(dadosParaCadastroFornecedor));
    
    // Pq esta forcando o cadastro de fornecedor mesmo que ele exista !!! 12.11.24
    dadosParaCadastroFornecedor.length <= 0
      ? $("#iniciarCadastro").val("false")
      : $("#iniciarCadastro").val("true");
  }
}

function dadosForn(cgc) {
  var dadosComprador = consultaDadosComprador($("#idComprador").val());
  var listaProduto = "";
  var dados = {
    codSolicitante: dadosComprador[0]["colleaguePK.colleagueId"],
    solicitante: dadosComprador[0].colleagueName,
    emailSolicitante: dadosComprador[0].mail,
    fornecedor: "",
    cpfCnpjOutros: "",
    cpf: "",
    cnpj: "",
    descFilial: $("#filial").val(),
    emailForn: "",
    endereco: "Desconhecido",
    bairro: "Desconhecido",
    municipio: "Desconhecido",
    uf: "Desconhecido",
    codPais: "105",
    tipoConta: "2",
    agencia: "0000",
    codBanco: "0",
    digVAgencia: "0",
    contaCorrente: "00000",
    digVConta: "0",
    complementoEnd: "Desconhecido",
    cep: "00000-000",
    ddi: "55 - Brasil",
    ddd: "00",
    telefone: "00000-0000",
    tipoFornecedor: "",
    localidadeFornecedor: "",
    tipoCadastro: "99",
    cadastroAutomatico: "true",
    cgc: cgc,
    motivoAprovContasReceber:
      "Solicitação original: " +
      $("#codSolicitacao").val() +
      " O fornecedor esteve cotado com o(s) produto(s): ",
  };

  $("[name^=nomeForn___]").each(function () {
    var indice = this.name.split("___")[1];

    if ($("#fornecedorProtheusSemCadastro___" + indice).val() == cgc) {
      if ($("#tipoFornSemCadastHidden___" + indice).val() == "F") {
        dados.cpf = $("#fornecedorProtheusSemCadastro___" + indice).val();
        dados.tipoFornecedor = "F";
        dados.localidadeFornecedor = "1";
      } else if ($("#tipoFornSemCadastHidden___" + indice).val() == "J") {
        dados.cnpj = $("#fornecedorProtheusSemCadastro___" + indice).val();
        dados.tipoFornecedor = "J";
        dados.localidadeFornecedor = "1";
      } else {
        dados.cpfCnpjOutros = $(
          "#fornecedorProtheusSemCadastro___" + indice
        ).val();
        dados.tipoFornecedor = "X";
        dados.localidadeFornecedor = "1";
      }

      dados.fornecedor = $("#nomeForn___" + indice).val();
      dados.emailForn = $("#emailFornecedor___" + indice).val();

      $("[name^=cnpjVencedorProd___]").each(function () {
        var index = this.name.split("___")[1];
        if ($("#cnpjVencedorProd___" + index).val() == cgc) {
          listaProduto +=
            $("#codProd___" + index).val() +
            " - " +
            $("#nomeProd___" + index).val() +
            " | ";
        }
      });

      dados.motivoAprovContasReceber =
        "Solicitação original: " +
        $("#codSolicitacao").val() +
        " O fornecedor esteve cotado com o(s) produto(s): " +
        listaProduto;
    }

    if ($("#formaFornHidden___" + indice).val() == "1") {
      if ($("#tipoFornSemCadastHidden___" + indice).val() == "1") {
        dados.tipoConta = "1";
      } else {
        dados.tipoConta = "2";
        dados.agencia = $("#agenciaForn___" + indice).val();
        dados.codBanco = $("#bancoForn___" + indice).val();
        dados.digVAgencia = $("#dvAgenciaForn___" + indice).val();
        dados.contaCorrente = $("#contaForn___" + indice).val();
        dados.digVConta = $("#dvContaForn___" + indice).val();
      }
    }
  });

  return dados;
}

function verificaStatusCadastro(subprocesso) {
  var c1 = DatasetFactory.createConstraint(
    "workflowProcessPK.processInstanceId",
    subprocesso,
    subprocesso,
    ConstraintType.MUST
  );
  var datasetWorkflowProcess = DatasetFactory.getDataset(
    "workflowProcess",
    null,
    new Array(c1),
    null
  );

  return datasetWorkflowProcess.values;
}

function consultaDadosComprador(idComprador) {
  var constraintColleague2 = DatasetFactory.createConstraint(
    "colleaguePK.colleagueId",
    idComprador,
    idComprador,
    ConstraintType.MUST
  );
  var datasetColleague = DatasetFactory.getDataset(
    "colleague",
    null,
    new Array(constraintColleague2),
    null
  );

  return datasetColleague.values;
}

function consultaFornecedorCadastrado(cgc) {
  var c1 = DatasetFactory.createConstraint(
    "CGC",
    cgc,
    cgc,
    ConstraintType.MUST
  );
  var datasetDs_fornecedor = DatasetFactory.getDataset(
    "ds_fornecedor",
    null,
    new Array(c1),
    null
  );

  return datasetDs_fornecedor.values;
}

function atualizaDadosFornecedor(fornecedor) {
  $("[name^=cnpjForn___]").each(function () {
    var index = this.name.split("___")[1];
    if (this.value == fornecedor[0].CGC) {
      $("#fornCadastrado___" + index).val("1");
      $("#fornCadastrado___" + index).change();
      $("#codForn___" + index).val(fornecedor[0].CODIGO);
      $("#emailFornecedor___" + index).val(fornecedor[0].EMAIL);
      $("#nomeForn___" + index).val(fornecedor[0].DESCRICAO);
      $("#cnpjForn___" + index).val(fornecedor[0].CGC);
      $("#hiddenBancoForn___" + index).val(fornecedor[0].BANCO);
      $("#hiddenAgenciaForn___" + index).val(fornecedor[0].AGENCIA);
      $("#hiddenContaForn___" + index).val(fornecedor[0].CONTA);
      $("#hiddenDvContaForn___" + index).val(fornecedor[0].DV_CONTA);
      $("#hiddenDvAgenciaForn___" + index).val(fornecedor[0].DV_AGENCIA);
      window["fornecedorProtheus___" + index].setValue(fornecedor[0].FILTRO);
    }
  });

  $("[name^=cnpjFornCotacao___]").each(function () {
    var index = this.name.split("___")[1];
    if (this.value == fornecedor[0].CGC) {
      $("#codFornecedorCotacao___" + index).val(fornecedor[0].CODIGO);
    }
  });

  $("[name^=cnpjVencedorProd___]").each(function () {
    var indice = this.name.split("___")[1];
    if ($("#cnpjVencedorProd___" + indice).val() == fornecedor[0].CGC) {
      $("#codFornVencedorProd___" + indice).val(fornecedor[0].CODIGO);
    }
  });
}
