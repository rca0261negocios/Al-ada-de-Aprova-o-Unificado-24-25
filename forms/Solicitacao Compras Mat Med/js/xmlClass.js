function renderXmlSolicitacaoMatMed(vueApp, listProduto, classificao) {
   var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.workflow.ecm.technology.totvs.com/">' +
    '<soapenv:Header />' +
    '<soapenv:Body>' +
        '<ws:startProcessClassic>' +
            '<username/>' +
            '<password/>' +
            '<companyId>1</companyId>' +
            '<processId>SolicitacaoComprasMatMed</processId>' +
            '<choosedState>0</choosedState>' +
            '<colleagueIds/>' +
            '<comments/>' +
            '<userId>' + vueApp.form.idSolicitante + '</userId>' +
            '<completeTask>true</completeTask>' +
            '<attachments/>' +
            '<cardData>' +
                '<item>' +
                    '<key>ehSugestaoCompras</key>' +
                    '<value>' + vueApp.form.ehSugestaoCompras + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>poolAbertura</key>' +
                    '<value>' + $("#poolAbertura").val() + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>nomeSolicitante</key>' +
                    '<value>' + vueApp.form.nomeSolicitante + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>emailSolicitante</key>' +
                    '<value>' + vueApp.form.emailSolicitante + '</value>' +
                '</item>' +
                 '<item>' +
                    '<key>idSolicitante</key>' +
                    '<value>' + vueApp.form.idSolicitante + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>dataSolicitacao</key>' +
                    '<value>' + $("#dataSolicitacao").val().replace(/[/"]/g, '-') + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>codFilialFluig</key>' +
                    '<value>' + vueApp.form.codFilialFluig + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>codFilial</key>' +
                    '<value>' + vueApp.form.codFilial + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>ufFilial</key>' +
                    '<value>' + vueApp.form.ufFilial + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>filial</key>' +
                    '<value>' + vueApp.form.filial + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>codCentroCusto</key>' +
                    '<value>' + vueApp.form.codCentroCusto + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>centroDeCusto</key>' +
                    '<value>' + vueApp.form.centroDeCusto + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>infoAdicionais</key>' +
                    '<value>' + vueApp.form.infoAdicionais + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>localEntrega</key>' +
                    '<value>' + vueApp.form.localEntrega + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>dataNecessidade</key>' +
                    '<value>' + $("#dataNecessidade").val().replace(/[/"]/g, '-') + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>prioridadeHidden</key>' +
                    '<value>' + vueApp.form.prioridade + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>prioridadeOriginal</key>' +
                    '<value>' + vueApp.form.prioridade + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>prioridade</key>' +
                    '<value>' + vueApp.form.prioridade + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>motivoEmergencial</key>' +
                    '<value>' + vueApp.form.txtPrioridade + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>isAlcada</key>' +
                    '<value>' + vueApp.form.isAlcada + '</value>' +
                '</item>' +
                '<item>' +
                    '<key>campoIdentificador</key>' +
                    '<value>' + vueApp.form.prioridade + " - " + vueApp.form.filial + " - TF" +'</value>' +
                '</item>';
                if(classificao == 'cotacaoFechada'){
                    xml += '<item>' +
                        '<key>codSolicitacaoVinculada</key>' +
                        '<value>' + vueApp.form.codSolicitacao + '</value>' +
                    '</item>';
                
                }else if (classificao == 'desvinculado'){
                    xml += '<item>' +
                        '<key>refSolicitacaoDesvinculada</key>' +
                        '<value>' + vueApp.form.codSolicitacao + '</value>' +
                    '</item>';
                }
                '<item>' +
                    '<key>listPedidoCompra</key>' +
                    '<value>{}</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA5</key>' +
                    '<value>' + $("#SLA5").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA48</key>' +
                    '<value>' + $("#SLA48").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA22</key>' +
                    '<value>' + $("#SLA22").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA25</key>' +
                    '<value>' + $("#SLA25").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA30</key>' +
                    '<value>' + $("#SLA30").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA59</key>' +
                    '<value>' + $("#SLA59").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA107</key>' +
                    '<value>' + $("#SLA107").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA53</key>' +
                    '<value>' + $("#SLA53").val() + '</value>' +
                '</item>'+
                '<item>' +
                    '<key>SLA41</key>' +
                    '<value>' + $("#SLA41").val() + '</value>' +
                '</item>';

                //ADICIONA OS PRODUTOS DINAMICAMENTE
                for (var p in listProduto) {
                    var produtoAtual = listProduto[p];
                    var i = parseInt(p) + 1;
                    xml +=
                    '<item>' +
                        '<key>itemProd___' + i + '</key>' +
                        '<value>' + produtoAtual.item + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>tdSelectPrimeiraCompra___' + i + '</key>' +
                        '<value>' + " " + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>codProd___' + i + '</key>' +
                        '<value>' + produtoAtual.codigo + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>nomeProd___' + i + '</key>' +
                        '<value>' + produtoAtual.nome + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>unidadeProd___' + i + '</key>' +
                        '<value>' + produtoAtual.unidade + '</value>' +
                    '</item>'+
                    '<item>' +
                        '<key>qtdProd___' + i + '</key>' +
                        '<value>' + produtoAtual.qtd + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>valorProd___' + i + '</key>' +
                        '<value>' + produtoAtual.valor + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>valorTotalProd___' + i + '</key>' +
                        '<value>' + produtoAtual.valorTotal + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>valIpiProd___' + i + '</key>' +
                        '<value>' + produtoAtual.valorIpi + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>fabricanteProd___' + i + '</key>' +
                        '<value>' + produtoAtual.fabricante + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>contaContabilProd___' + i + '</key>' +
                        '<value>' + produtoAtual.contaContabil + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>isFechadaProd___' + i + '</key>' +
                        '<value>' + produtoAtual.isFechada + '</value>' +
                    '</item>' +
                    '<item>' +
                        '<key>custoMensalProd___' + i + '</key>' +
                        '<value>' + produtoAtual.custoMensal + '</value>' +
                    '</item>';
                }
                
               
            xml += '</cardData>' +
            '<appointment />' +
            '<managerMode>0</managerMode>' +
        '</ws:startProcessClassic>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

    return xml
}
