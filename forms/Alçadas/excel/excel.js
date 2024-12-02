var tbFluig='';
function Upload(qTabela) {
	// REFERENCE THE FILEUPLOAD ELEMENT.
	var fileUpload = document.getElementById("fileUpload");
	tbFluig = qTabela;
	
	// VALIDATE WHETHER FILE IS VALID EXCEL FILE.
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if(regex.test(fileUpload.value.toLowerCase())) 
		if(typeof (FileReader) != "undefined") {
			var reader = new FileReader();
			// FOR BROWSERS OTHER THAN IE.
			if(reader.readAsBinaryString) {
				reader.onload = function(e) {
					ProcessExcel(e.target.result);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			} else {
				// FOR IE BROWSER.
				reader.onload = function(e) {
					var data = "";
					var bytes = new Uint8Array(e.target.result);
					for(var i = 0; i < bytes.byteLength; i++) {
						data += String.fromCharCode(bytes[i]);
					}
					ProcessExcel(data);
				};
				reader.readAsArrayBuffer(fileUpload.files[0]);
			}
		} else 
			FLUIGC.toast({ message: 'Este navegador não suporta HTML5', type: 'danger' })
	else
		FLUIGC.toast({ message: 'Arquivo selecionado não é do tipo Excel valido', type: 'danger' });
};

function ProcessExcel(data) {
    // Ler os dados do arquivo Excel
    var workbook = XLSX.read(data, { type: 'binary' });

	// Obter o nome da primeira planilha
	var firstSheet = workbook.SheetNames[0];
    var sheet = workbook.Sheets[firstSheet];

    // Definir o número de linhas e colunas
    var linhas  = sheet['!ref'].split(':')[1].match(/\d+/)[0];
    var colunas = sheet['!ref'].split(':')[1].match(/[A-Z]+/)[0].charCodeAt(0) - 64;
	var niveis  = colunas-3;

	// LIMPAR TABELA
	if(tbFluig == 'tbAlcadas') 
		limparTabela('tbAlcadas');

	// Carregar dados e gravar tabela fazendo o de/para com os campos do formulário HTML
	var excelRows = [];
	for (var iLn = 2; iLn <= linhas; iLn++) {
		var row = {};
		row['tipoAprovacao'] = sheet[XLSX.utils.encode_col(0) + iLn] ? sheet[XLSX.utils.encode_col(0) + iLn].v : '';
		row['nomefilial'   ] = sheet[XLSX.utils.encode_col(1) + iLn] ? sheet[XLSX.utils.encode_col(1) + iLn].v : ''; // <-- USAR ESTE SE PLANILHA FOR POR FILIAL
		row['nomeCCusto'   ] = sheet[XLSX.utils.encode_col(1) + iLn] ? sheet[XLSX.utils.encode_col(1) + iLn].v : ''; // <-- USAR ESTE SE PLANILHA FOR POR CENTRO DE CUSTO
		row['seOperacional'] = sheet[XLSX.utils.encode_col(2) + iLn] ? sheet[XLSX.utils.encode_col(2) + iLn].v : ''; // <-- SE CC OPERACIONAL OU NAO
		for (var iCol = 3; iCol < colunas; iCol++) {
			var cellAddress = XLSX.utils.encode_col(iCol) + iLn;
			var cell = sheet[cellAddress];
			if (cell) 
				row['aprovadorNivel' + (iCol-2)] = cell.v;
		}
		excelRows.push(row);
	}

	// PREENCHER TABELA COM DADOS DO EXCEL
	for (var i = 0; i < excelRows.length; i++) {

		// LER COLUNAS DO EXCEL
		for (var j = 1; j <= niveis; j++) {
			if( excelRows[i]['aprovadorNivel'+j] !=='' && excelRows[i]['aprovadorNivel'+j] !== undefined && excelRows[i]['aprovadorNivel'+j] !== null ) {
				// INSERIR LINHA NA TABELA
				var index = wdkAddChild(tbFluig);
				console.log('index: ' + index);

				// NIVEL DE APROVACAO - SEQUENCIA
				$('#aprovadorNivel___' + index).val( j );

				// TIPO DE APROVACAO
				var tipoAprovacao = '';
				switch(excelRows[i]['tipoAprovacao']) {
					case 'Centro de Custo': 
						tipoAprovacao = 'CC';
						// CENTRO DE CUSTO CONF NIVEL
						$('#zoomCentroCusto___' + index).val( excelRows[i]['nomeCCusto'] );
						window['zoomCentroCusto___'+ index].setValue( excelRows[i]['nomeCCusto'] ); 
						break;
					case 'Suprimentos': 
						tipoAprovacao = 'SP'; 
						break;
					case 'Filial'         : 
						tipoAprovacao = 'FL'; 
						// FILIAL CONF NIVEL
						$('#zoomFilial___'    + index).val( excelRows[i]['nomefilial'] );
						window['zoomFilial___'+ index].setValue( excelRows[i]['nomefilial'] );
						break;
					default: 
						tipoAprovacao = 'nao_informado'; 
						break;	
				}	
				$('#tipoAprovacao___'+index).val( tipoAprovacao );

				// SE CC OPERACIONAL OU NAO
				var seOperacional = excelRows[i]['seOperacional'];
				if(seOperacional.toLowerCase() == 'sim' || seOperacional.toLowerCase() == 's')
					seOperacional = 'S';
				else
					if(seOperacional.toLowerCase() == 'não' || seOperacional.toLowerCase() == 'nao')
						seOperacional = 'N';

				$('#tipoCCOperacional___'+index).val( seOperacional  );	

				// APROVADOR CONF NIVEL
				$('#apv_Usuario___'		+index).val( excelRows[i]['aprovadorNivel'+j] );
				window['apv_Usuario___'	+index].setValue( excelRows[i]['aprovadorNivel'+j] );
			}
		}
	}
	// Exibir os dados processados (ou realizar outra ação necessária)
	FLUIGC.toast({ message: 'Final da carga de Dados', type: 'success' });
}

function Download(){
	// FAZER DOWNLOAD PARA EXCEL DA TABELA tbAlcadas
	var excelColsName = [],
		excelRows     = [];
	var tbAlcadas = document.getElementById("tbAlcadas");

	// BUSCAR NOME DAS COLUNAS
	for (var i = 0; i < tbAlcadas.rows[0].cells.length; i++) 
		excelColsName.push([tbAlcadas.rows[0].cells[i].innerHTML]);

	// BUSCAR VALORES DAS LINHAS
	var excelRows = [];
	for (var c = 2; c < tbAlcadas.rows.length; c++) {
		var row      = tbAlcadas.rows[c];
		var excelCol = [];
		for (var i = 0; i < row.cells.length; i++) {
			var linha = row.cells[i].children[0].value;
			if(linha == undefined)
				excelCol.push('');
			else
				excelCol.push(linha);
		}
		excelRows.push(excelCol);
	}

	// INICIAR XLSX
	exportaExcel("tbAlcadas", "alcadas");
};

function exportaExcel(id, nome) {
    var hoje = new Date();
    var data = ('0' + hoje.getDate()).slice(-2) + "-" + ('0' + (hoje.getMonth() + 1)).slice(-2) + "-" + hoje.getFullYear();

    var html = $("#" + id).clone();

    html.find('.remove').remove();
    html.find('a').each(function () {
        var txt = $(this).text();
        $(this).after(txt).remove();
    });
    html.find('input, textarea').each(function () {
        var txt = $(this).val();
        $(this).after(txt).remove();
    });
    html.find('select>option:selected').each(function () {
        var txt = $(this).text();
        $(this).after(txt).remove();
    });
    html.find('br').attr('style', "mso-data-placement:same-cell");

    var worksheet = XLSX.utils.table_to_sheet(html[0]);
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    var nome_arquivo = nome + "_" + data + ".xlsx";
    XLSX.writeFile(workbook, nome_arquivo);
}
