var beforeSendValidate = function(numState,nextState){
    //validação rodando no front-end colorindo os campos
    camposRequired()   
    if(nextState == 28){
        //INICIO PESQUISA DE SATISFAÇÃO
        if($('#codPesquisaSatisfacao').val() == ""){
            var codSolicitacao = $('#codSolicitacao').val()
            var c1 = DatasetFactory.createConstraint("codSolicOrigem", codSolicitacao, codSolicitacao, ConstraintType.MUST);
            var buscaSolicitacao = DatasetFactory.getDataset("ds_PesquisaSatisfacao", null, new Array(c1), null).values;    
            if (buscaSolicitacao.length > 0) {
                $('#codPesquisaSatisfacao').val(buscaSolicitacao[0]['metadata#id']);
            }else{
                if($('#decisaoAprovSol').val() == 'Sim'){
                    pesquisaSatisfacao()
                } else {
                    return true;
                }   //abertura do modal
            }
        }else{
            return true;    
        }
        
        //botao envia
        $("button[envia-pesquisa-satisfacao]").click(function(){
            $('#modalPesquisaOpen').val("")
            var codSolicitacao = $('#codSolicitacao').val()
            var c1 = DatasetFactory.createConstraint("codSolicOrigem", codSolicitacao, codSolicitacao, ConstraintType.MUST);
            var buscaSolicitacao = DatasetFactory.getDataset("ds_PesquisaSatisfacao", null, new Array(c1), null).values;    
            if (buscaSolicitacao.length > 0) {
                $('#codPesquisaSatisfacao').val(buscaSolicitacao[0]['metadata#id']);
                $('button[cancela-pesquisa]').click()
            } else {
                if($('#respostaPesquisa').val() != ""){
                    if($('#respostaPesquisa').val() == "4" || $('#respostaPesquisa').val() == "5"){
                        registroPesquisa()
                        if($('#codPesquisaSatisfacao').val() != ""){
                            window.parent.$('button[data-send]').first().click()
                        }
                    }else if($("[name='infoAddPesquisa']").val().length >= 5){
                        registroPesquisa()
                        if($('#codPesquisaSatisfacao').val() != ""){
                            window.parent.$('button[data-send]').first().click()
                        }  
                    }else{
                        FLUIGC.toast({
                            title: 'Atenção!',
                            message: 'Favor preencher o campo de observações!',
                            type: 'warning',
                            timeout: 6000
                            });
                    }
                }else{
                    window.parent.$('button[data-send]').first().click() 
                }        
            }
         })
        //botão cancela
        $('button[cancela-pesquisa]').click(function(){
            $('#modalPesquisaOpen').val("")
         })  
        return false;
    }
}

function pesquisaSatisfacao() {
    $('#modalPesquisaOpen').val("sim")

    var content = '<div class="row">' +
                    '<div class="form-group col-md-9" style="margin-top: 18px;">' +						
                        '<label for="respostaPesquisa">Em uma escala de 1 a 5, como você avalia o nosso atendimento?</label>' +								
                        '<input type="hidden" id="respostaPesquisa" name="respostaPesquisa">' +
                        '<div id="avaliacaoPesquisa"></div>' +						
                    '</div>' +
                    '<div class="form-group col-md-3" style="margin-top: 18px;">' +						
                        '<img src="img/lea.png" style="width: 96px;">' + 
                    '<div id="avaliacaoPesquisa"></div>' +						
                '</div>' +
                    '<div class="form-group col-md-12" style="margin-top: 18px;">' +				
                        '<label class="control-label" for="infoAddPesquisa">Deixe aqui sua observação para melhor atendê-los!</label>' +                       				
                        '<textarea class="form-control" name="infoAddPesquisa" id="infoAddPesquisa" style="height: 113px;"></textarea>' +					
                    '</div>' +
                  '</div>'

    var myModal = FLUIGC.modal({
        title: 'Pesquisa de Satisfação',
        content: content, 
        id: 'pesquisa-satisfacao',
         actions: [{
                'label' : 'Enviar',
                'bind' : "envia-pesquisa-satisfacao",
            },{
                'label': 'Cancelar',
                'bind': "cancela-pesquisa",
                'autoClose': true
            }]
    }, function(err, data) {
        if(err) {
            // do error handling
        } else {            
            // do something with data
        }
    });
    startRatingStars()
}

function startRatingStars(){
    var starsCallBack = FLUIGC.stars("#avaliacaoPesquisa", {
        stars: 5,
        value: parseInt($("#respostaPesquisa").val()) || 0,
        sizeClass: 'fluigicon-xl',
        text: ['Péssimo', 'Ruim', 'Regular', 'Bom', 'Ótimo']
    })
    starsCallBack.on("click", function () {
        let index = parseInt($("#avaliacaoPesquisa").find("i").index(this)) + 1;
        $("#respostaPesquisa").val(index);
        if(index > 3){
            removeValid("infoAddPesquisa")
        }else{
            $("#infoAddPesquisa").prop("required",true).atualizaValid()
            camposRequired()
        }        
    })
}

function registroPesquisa() {
    let url = parent.WCMAPI.serverURL + "/webdesk/ECMCardService?wsdl";

    let xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.dm.ecm.technology.totvs.com/">'
        +'<soapenv:Header/>'
        +'<soapenv:Body>'
        +'<ws:create>'
        +'<companyId>1</companyId>'
            +'<username>integrador.fluig@oncoclinicas.com</username>'
            +'<password>hUbust*7</password>'
            +'<card>'
            +'<item>'
                +'<attachs></attachs>'
                    +'<cardData>'
                        +'<field>nomeSolic</field>'
                        +'<value>' + $('#solicitante').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>codSolic</field>'
                        +'<value>' + $('#idSolicitante').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>emailSolic</field>'
                        +'<value>' + $('#emailSolicitante').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>dataSolicitacao</field>'
                        +'<value>' + $('#dataSolicitacao').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>nomeProcesso</field>'
                        +'<value>Medicao de Contratos</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>codSolicOrigem</field>'
                        +'<value>' + $('#codSolicitacao').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>notaAvaliacao</field>'
                        +'<value>' + $('#respostaPesquisa').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>observacao</field>'
                        +'<value>' + $('#infoAddPesquisa').val() +'</value>'
                    +'</cardData>'
                    +'<cardData>'
                        +'<field>dataAvaliacao</field>'
                        +'<value>' + dataAtual() +'</value>'
                    +'</cardData>'
                    +'<colleagueId>imwn2dyhbuywfa0f1522083830483</colleagueId>'
                    +'<docapprovers></docapprovers>'
                    +'<docsecurity></docsecurity>'
                    +'<documentDescription>' + $('#codSolicitacao').val() + ' - ' + 'Medicao de Contratos</documentDescription>' // producao: 4875548   teste: 4733487
                    +'<expires>false</expires>'
                    +'<inheritSecurity></inheritSecurity>'
                    +'<parentDocumentId>4875548</parentDocumentId>'
                    +'<reldocs></reldocs>'
                    +'</item>'
                +'</card>'
        +'</ws:create>'
        +'</soapenv:Body>'
        +'</soapenv:Envelope>';

    requestXML(url, xml);
}

function requestXML(url, xml){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = (this.responseText);  
            console.log(response);    
            var corte1 = response.slice(response.indexOf("<documentId>"))
            var corte2 = corte1.slice(corte1.indexOf("</documentId>"))
            var corte3 = corte1.split(corte2)[0]
            var final = corte3.split('<documentId>')[1]//retorna o codigo da pesquisa respondida
            $('#codPesquisaSatisfacao').val(final); 
            FLUIGC.toast({
                title: 'Obrigado!',
                message: 'Sua avaliação foi registrada com sucesso!',
                type: 'info',
                timeout: 10000
                });           
        }
    };
    xhr.open("POST", url, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(xml);
}

function dataAtual() {
    var now = new Date();
    var year = now.getFullYear();
    var month = addZero(now.getMonth() + 1, 2);
    var day = addZero(now.getDate(), 2);
    var currentDate = year + '-' + month + '-' + day;
    return currentDate;
};

function removeAcento (text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}