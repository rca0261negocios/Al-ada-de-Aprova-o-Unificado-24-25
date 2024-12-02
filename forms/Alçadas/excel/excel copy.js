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
    // READ THE EXCEL FILE DATA.
    var workbook = XLSX.read(data, { type: 'binary' });

    // FETCH THE NAME OF FIRST SHEET.
    var firstSheet = workbook.SheetNames[0];
    var sheet = workbook.Sheets[firstSheet];

    // Definir o número de linhas e colunas
    var linhas  = sheet['!ref'].split(':')[1].match(/\d+/)[0];
    var colunas = sheet['!ref'].split(':')[1].match(/[A-Z]+/)[0].charCodeAt(0) - 64;

	// LIMPAR TABELA
	if(tbFluig == 'tbAlcadas') 
		limparTabela('tbAlcadas');
	else
		if(tbFluig == 'tbExcessoes')
			limparTabela('tbExcessoes');

	// CARREGAR NOME DAS COLUMAS E FAZER O DE PARA COM OS CAMPOS DO FORMULARIO HTML
	var excelColsName = [];
	for (var iCol = 0; iCol < colunas; iCol++) {
		var cellAddress = String.fromCharCode(iCol) + 1;
		var cell = sheet[cellAddress];
		if (cell) 
			excelColsName.push(cell.v);
	}

	// CARREGAR DADOS E GRAVAR TABELA FAZENDO O DE PARA COM OS CAMPOS DO FORMULARIO HTML
	var excelRows  = [];
	var xSequencia = 0;
	for (var iLn = 2; iLn <= linhas; iLn++) {
        var index = wdkAddChild(tbFluig);
		xSequencia +=1;

        // GRAVAR DADOS DE ACORDO COM TABELA INFORMADA
		if(tbFluig == 'tbAlcadas') {
			// ATENCAO - SE AS COLUNAS FOREM ALTERADAS TANTO NO EXCEL QUANTO NO FORMULARIO HTML, DEVE-SE ALTERAR AQUI TAMBEM
			$('#aprovadorNivel___'	+index).val( xSequencia ); 

			// TIPO DE APROVACAO
			var tipoAprovacao = sheet['A'+iLn]['v'];
			switch(tipoAprovacao) {
				case 'Centro de Custo': tipoAprovacao = 'CC'; break;
				case 'Suprimentos'    : tipoAprovacao = 'SP'; break;
				case 'Filial'         : tipoAprovacao = 'FL'; break;
				default               : tipoAprovacao = 'nao_informado'; break;
			}
			$('#tipoAprovacao___'+index).val( tipoAprovacao );


			$('#aprovadorNivel___'			+index).val( sheet['B'+iLn]['v'] ); 


			// FORMATAR VALOR DO vlr_ccOperacionais___ SENDO SEPARADOR DE MILHAR COM PONTO DECIMAL E SEPARADOR DECIMAL COM VIRGULA
			var vlr_ccOperacionais = sheet['C'+iLn]['v'];
				vlr_ccOperacionais = parseFloat(vlr_ccOperacionais).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				if(vlr_ccOperacionais == 'NaN') vlr_ccOperacionais = '';
			$('#vlr_ccOperacionais___'		+index).val( vlr_ccOperacionais );

			if(sheet['D'+iLn]['v'].trim() !='')	{
				$('#apv_ccOperacionais___'		+index).val( sheet['D'+iLn]['v'] );
				window['apv_ccOperacionais___'	+index].setValue( sheet['D'+iLn]['v'] );
			}

			// FORMATAR VALOR DO vlr_ccNaoOperacionais___ SENDO SEPARADOR DE MILHAR COM PONTO DECIMAL E SEPARADOR DECIMAL COM VIRGULA
			var vlr_ccNaoOperacionais = sheet['E'+iLn]['v'];
				vlr_ccNaoOperacionais = parseFloat(vlr_ccNaoOperacionais).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
				if(vlr_ccNaoOperacionais == 'NaN') vlr_ccNaoOperacionais = '';
			$('#vlr_ccNaoOperacionais___'	 +index).val( vlr_ccNaoOperacionais );

			if(sheet['F'+iLn]['v'].trim() !=''){
				$('#apv_ccNaoOperacionais___'	 +index).val( sheet['F'+iLn]['v'] );
				window['apv_ccNaoOperacionais___'+index].setValue( sheet['F'+iLn]['v'] );
			}

			// FORMATAR VALOR DO vlr_holding___ SENDO SEPARADOR DE MILHAR COM PONTO DECIMAL E SEPARADOR DECIMAL COM VIRGULA
			var vlr_holding = sheet['G'+iLn]['v'];
				vlr_holding = parseFloat(vlr_holding).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				if(vlr_holding == 'NaN') vlr_holding = '';
			$('#vlr_holding___'		+index).val( vlr_holding );

			if(sheet['H'+iLn]['v'].trim() !='') {
				$('#apv_holding___'		+index).val( sheet['H'+iLn]['v'] );
				window['apv_holding___'	+index].setValue( sheet['H'+iLn]['v'] );
			}

			// CAMPOS OCULTOS
			if(sheet['I'+iLn]!=undefined) $('#ccOperacionais_Id___'		+index).val( sheet['I'+iLn]['v'] );
			if(sheet['J'+iLn]!=undefined) $('#ccNaoOperacionais_Id___'	+index).val( sheet['J'+iLn]['v'] );
			if(sheet['K'+iLn]!=undefined) $('#holding_Id___'			+index).val( sheet['K'+iLn]['v'] );
		} else
			if(tbFluig == 'tbExcessoes') {
				// ATENCAO - SE AS COLUNAS FOREM ALTERADAS TANTO NO EXCEL QUANTO NO FORMULARIO HTML, DEVE-SE ALTERAR AQUI TAMBEM
				$('#excessaoNivel___'		+index).val( sheet['A'+iLn]['v'] );
				$('#tipoExcessao___'		+index).val( sheet['B'+iLn]['v'] );
				$('#ccExcessao___'			+index).val( sheet['C'+iLn]['v'] );
				$('#justificaExcessao___'	+index).val( sheet['D'+iLn]['v'] );
				$('#ccExcessao_Id___'		+index).val( sheet['E'+iLn]['v'] );
			}

		FLUIGC.toast({ message: 'Dados carregados com sucesso', type: 'success' });
    }
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
