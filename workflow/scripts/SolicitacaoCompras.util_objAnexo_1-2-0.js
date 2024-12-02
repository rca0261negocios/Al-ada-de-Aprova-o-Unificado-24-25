/**
 * Objeto com funcionalidade de gerenciar o Nome do Diret�rio
 * 
 * @param type
 *            1-nomeDiretorio informado, espera string; 2-Ano/Mes atual, n�o
 *            necess�rio informar nomeDiretorios
 * @param nomeDiretorio
 *            Informar a string do nome do diret�rio, necess�rio type ser 1
 */
 var objParametro = function(type, nomeDiretorio) {
	var tipo = '';
	var nomePasta = '';
	/**
	 * Retonar o Tipo
	 * 
	 * @returns tipo Retonar o Tipo
	 */
	this.getTipo = function() {
		return tipo;
	};
	/**
	 * Retonar o nomePasta
	 * 
	 * @returns nomePasta Retonar o nomePasta
	 */
	this.getNomePasta = function() {
		return nomePasta;
	};
	/**
	 * Retornar o Tipo
	 * 
	 * @returns tipo Retornar o tipo
	 */
	this.getTipo = function() {
		return tipo;
	};
	/**
	 * Cadastrar o Parametro de nome de Pasta
	 * 
	 * @param type
	 *            1-nomeDiretorio informado, espera string; 2-Ano/Mes atual, n�o
	 *            necess�rio informar nomeDiretorios
	 * @param nomeDiretorio
	 *            Informar a string do nome do diret�rio, necess�rio type ser 1
	 */
	var setPasta = function(type, nomeDiretorio) {
		/*
		 * type = 1 (Espera string no nomeDiretorio)
		 */
		if (type == 1) {
			if (nomeDiretorio == '') {
				throw 'Falha ao utilizar o objAnexo.setParametro, necessário string para nomeDiretorio.';
			}

			tipo = type;
			nomePasta = nomeDiretorio;
		}
		/*
		 * type = 2 (Gera automaticamente o nomeDiretorio com Ano/Mes - YYYY/mm)
		 */
		else if (type == 2) {
			tipo = type;

			nomePasta = getAnoMes();
		} else {
			throw 'Falha ao utilizar o objAnexo.setParametro, necessário type válido.';
		}

	};
	var getAnoMes = function() {
		var dataAtual = new Date();
		var mes = ('0' + (dataAtual.getMonth() + 1)).slice(-2);
		var ano = dataAtual.getFullYear();
		var mesAno = ano + "/" + mes;

		return mesAno;
	};
	var __construct = function(type, nomeDiretorio) {
		setPasta(type, nomeDiretorio);
	}(type, nomeDiretorio);
};

/**
 * Objeto criado para efetuar a publica��o de Documentos e Anexos
 */
var objAnexo = function(diretorioRaiz) {
	/*
	 * Vari�veis de acesso ao Web Service
	 */
	var usuarioPublicaDoc = "";
	var senhaPublicaDoc = "";
	var linkFolderServiceLocator = "";
	var linkDocumentServiceLocator = "";

	/*
	 * Vari�veis de Propriedade do Anexo
	 */
	var comentario = "Teste";
	var palavraschave = "Teste";
	var desc_versaorevisao = "Versão Inicial";
	var versaoRevisao = "1.000";
	var dtValido = "14/08/2014";
	var doc_expira = false;
	var dtExpira = "14/08/2014";
	var tipo_docto_H = "Contratos";
	var notificaEMail = false;
	var permiteDownload = true;
	var existeNivel = false;
	var idPastaCriada = 0;
	var assunto_H = "1";
	var usuarioLogado = buscarUsuarioLogado();
	var empresa = buscarEmpresa();
	var idSolicitacao = buscarIdSolicitacao();

	/*
	 * Vari�veis do WebService
	 */
	var folderServiceProvider = '';
	var folderServiceLocator = '';
	var folderService = '';
	var listDiretorios = [];
	var pastaRaiz = '';
	var pastaPublicacao = '';

	/*
	 * M�todos do Web Service
	 */
	var iniciarFolderService = function() {
		folderServiceProvider = ServiceManager
				.getServiceInstance("FolderService");
	};
	var iniciarServiceLocator = function() {
		folderServiceLocator = folderServiceProvider
				.instantiate(linkFolderServiceLocator);
	};
	var iniciarPortas = function() {
		folderService = folderServiceLocator.getFolderServicePort();
	};
	var buscarPastaPublicacao = function() {
		if (!checkListDiretorios()) {
			throw 'Falha ao utilizar a publicação de Documentos, necessário cadastrar paramentros usando objAnexo.setParametro';
			return false;
		}

		if (!checkPastaRaiz()) {
			throw 'Falha ao utilizar objAnexo sem informar Pasta Pai para publicação do anexo. Código Erro: 30.';
			return false;
		}

		var folders = '';
		var idPasta = '';

		var idPastaCriadaNova = '';
		var nome_pasta = '';
		var nome_pasta_publicacao = '';

		// for ( var x = 0; x < listDiretorios.length; x++) {
		for ( var x in listDiretorios) {
			idPasta = (idPastaCriada != 0) ? idPastaCriada : pastaRaiz;
			folders = folderService.getSubFolders(usuarioPublicaDoc,
					senhaPublicaDoc, empresa, idPasta, usuarioLogado);

			if (folders.getItem() != null) {
				listDiretorios: for ( var y = 0; y < folders.getItem().length; y++) {
					nome_pasta = '';
					nome_pasta_publicacao = '';

					var pasta = folders.getItem(y);
					nome_pasta = pasta.getDocumentDescription();

					if (nome_pasta != listDiretorios[x].getNomePasta()) {
						existeNivel = false;
						nome_pasta_publicacao = listDiretorios[x]
								.getNomePasta();
					} else {
						existeNivel = true;
						idPastaCriada = pasta.getDocumentId();
						break listDiretorios;
					}
				}
			} else {
				nome_pasta_publicacao = listDiretorios[x].getNomePasta();
			}

			if (existeNivel == false) {
				idPastaCriadaNova = folderService.createSimpleFolder(
						usuarioPublicaDoc, senhaPublicaDoc, java.lang
								.Integer(empresa), java.lang.Integer(idPasta),
						usuarioLogado, nome_pasta_publicacao);
				idPastaCriada = idPastaCriadaNova.getItem(0).getDocumentId();
			}
		}

		return idPastaCriada;
	};
	var checkPastaRaiz = function() {
		return (pastaRaiz != '');
	};
	var checkListDiretorios = function() {
		try {
			if (typeof listDiretorios[0].getTipo()) {
				return true;
			}
		} catch (e) {
			return false;
		}
	};
	var buscarAnexos = function() {
		// var pastaPublicacao = idPastaCriada;
		// pastaPublicacao = buscarPastaPublicacao_antigo();
		pastaPublicacao = buscarPastaPublicacao();

		if (!pastaPublicacao) {
			throw 'Falha ao selecionar o diret�rio para publicação do anexo. Código Erro: 10.';
			return false;
		}

		var cal = java.util.Calendar.getInstance();
		if (dtExpira == "") {
			cal.add(java.util.Calendar.YEAR, 1);
		} else {
			cal.setTime(new java.text.SimpleDateFormat("dd/MM/yyyy")
					.parse(dtExpira));
		}
		dtExpira = cal;

		var cal = java.util.Calendar.getInstance();
		cal.setTime(new java.text.SimpleDateFormat("dd/MM/yyyy")
				.parse(dtValido));
		dtValido = cal;
		var processConstraint = DatasetFactory.createConstraint(
				"processAttachmentPK.processInstanceId", idSolicitacao,
				idSolicitacao, ConstraintType.MUST);
		var companyConstraint = DatasetFactory.createConstraint(
				"processAttachmentPK.companyId", empresa, empresa,
				ConstraintType.MUST);
		var attachFields = new Array("documentId",
				"processAttachmentPK.attachmentSequence", "version");
		var attachConstList = new Array(processConstraint, companyConstraint);

		var attachDataset = DatasetFactory.getDataset("processAttachment",
				attachFields, attachConstList, new Array(
						"processAttachmentPK.attachmentSequence"));

		publicarAnexos(attachDataset);
	};
	var publicarAnexos = function(attachDataset) {
		var fichario = '';

		for ( var i = 0; i < attachDataset.rowsCount; i++) {
			if (attachDataset.getValue(i,
					"processAttachmentPK.attachmentSequence") == 1) {
				fichario = attachDataset.getValue(i, "documentId");
			}

			if (attachDataset.getValue(i, "documentId") != fichario) {
				var documentServiceProvider = ServiceManager
						.getServiceInstance("DocumentService");
				var documentServiceLocator = documentServiceProvider
						.instantiate(linkDocumentServiceLocator);
				var documentService = documentServiceLocator
						.getDocumentServicePort();
				var document = documentService.getDocumentVersion(
						usuarioPublicaDoc, senhaPublicaDoc, empresa,
						attachDataset.getValue(i, "documentId"), attachDataset
								.getValue(i, "version"), usuarioLogado);
				var doc = document.getItem(0);

				// Documento novo, seta o documentId e version para 0 para n�o
				// criar duplicado com o mesmo n�mero de documento
				doc.setDocumentId(0);
				doc.setVersion(0);
				doc.setParentDocumentId(new java.lang.Integer(pastaPublicacao));

				// doc.setDocumentDescription(codificacao +
				// hAPI.getCardValue("textDescricao"));
				doc.setAdditionalComments(comentario);
				doc.setKeyWord(palavraschave);
				doc.setVersionDescription(desc_versaorevisao);
				doc.setDocumentTypeId(tipo_docto_H);
				doc.setDownloadEnabled(permiteDownload);
				doc.setExpires(doc_expira);
				doc.setExpirationDate(dtExpira);
				doc.setUserNotify(notificaEMail);
				doc.setValidationStartDate(dtValido);
				doc.setTopicId(new java.lang.Integer(assunto_H));
				doc.setPublisherId(usuarioLogado);
				doc.setColleagueId(usuarioLogado);
				doc.setInheritSecurity(true);
				var pos = versaoRevisao.indexOf(".");
				doc.setVersion(new java.lang.Integer(versaoRevisao.substring(0,
						pos)
						+ versaoRevisao.substring(pos + 1)));

				doc.setVersionOption("0");

				doc.setVolumeId("Default");
				try {
					doc.setUpdateIsoProperties(false);
				} catch (e) {
				}
				document.setItem(0, doc);

				var fContent = documentService.getDocumentContent(
						usuarioPublicaDoc, senhaPublicaDoc, empresa,
						attachDataset.getValue(i, "documentId"), usuarioLogado,
						attachDataset.getValue(i, "version"), doc
								.getPhisicalFile());

				// Se��o para atachar o arquivo ao documento
				var attach = documentServiceProvider
						.instantiate("com.totvs.technology.ecm.dm.ws.Attachment");
				attach.setFileName(doc.getPhisicalFile());
				attach.setFilecontent(fContent);
				attach.setPrincipal(true);

				var listAttach = new Array();
				listAttach[0] = attach;
				attachArray = documentServiceProvider
						.instantiate("com.totvs.technology.ecm.dm.ws.AttachmentArray");
				attachArray.setItem(listAttach);

				var relatedArr = documentServiceProvider
						.instantiate("com.totvs.technology.ecm.dm.ws.RelatedDocumentDtoArray");
				// Cria o documento no Webdesk
				var createDoc = documentService.createDocument(
						usuarioPublicaDoc, senhaPublicaDoc, empresa, document,
						attachArray, null, null, relatedArr);

				createDoc.getItem(0);
			}
		}
	};
	var setPastaRaiz = function(diretorioRaiz) {
		if (diretorioRaiz == '' || diretorioRaiz == undefined) {
			throw 'Falha ao utilizar o método objAnexo sem informar o Diretório Raiz. Código Erro: 20.';
			return false;
		}

		pastaRaiz = diretorioRaiz;
	};
	/**
	 * M�todo para cadastro de Parametros, poder� ser registrado N parametros e
	 * ser� efetuado a publica��o a ordem respectivamente cadastrada.
	 * 
	 * @param type
	 *            1-nomeDiretorio informado, espera string; 2-Ano/Mes atual, n�o
	 *            necess�rio informar nomeDiretorios
	 * @param nomeDiretorio
	 *            Informar a string do nome do diret�rio, necess�rio type ser 1
	 */
	this.setParametro = function(type, nomeDiretorio) {
		listDiretorios.push(new objParametro(type, nomeDiretorio));
	};
	this.publicar = function() {
		iniciarFolderService();
		iniciarServiceLocator();
		iniciarPortas();
		buscarAnexos();
	};
	var setConfigServer = function() {
		var config = new objDataSet("configServer");
		config.buscar();
		var configServer = config.getDados();

		try {
			for ( var posValues in configServer.values) {
				usuarioPublicaDoc = configServer.getValue(posValues,
						"usuarioPublicaDoc");
				senhaPublicaDoc = configServer.getValue(posValues,
						"senhaPublicaDoc");
				linkFolderServiceLocator = configServer.getValue(posValues,
						"folderServiceLocator");
				linkDocumentServiceLocator = configServer.getValue(posValues,
						"documentServiceLocator");

				erroConfigServer = false;
			}
		} catch (e) {
			throw 'Falha ao utilizar o objAnexo, não encontrado dataSet configServer. Código Erro: 40.';
		}
	}
	var __construct = function(diretorioRaiz) {
		// listDiretorios = parametros;
		setPastaRaiz(diretorioRaiz);
		setConfigServer();
	}(diretorioRaiz);
};