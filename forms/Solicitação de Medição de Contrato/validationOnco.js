//INICIO
$(document).ready( () => { 
    //VALIDAÇÃO AO CARREGAR A PAGINA
    camposRequired()
    //FUNCAO QUE ATIVA VALIDACAO CAMPO TIPO ZOOM    
    setTimeout(setFilterZoom, 1000);
    //GATILHOS AUTOMATICOS DE VALIDAÇÃO
    $('input[type=text]:required').keyup(function(){validaInput(this)});
    $('input[type=money]:required').keyup(function(){validaInput(this)});
    $('input[type=text]:required').click(function(){validaInput(this)});
    $('textarea:required').keyup(function(){validaTextarea(this)});
    $('select:required').click(function(){validaInput(this)});
    $('input[type=radio]').click(function(){validaRadio(this)});    
    //VALIDA CAMPOS TIPO CHECKBOX BUTTON 
    $('input[type=checkbox][id^="checkbox"]').click(function(){validaCheckBox(this)});     

});

//ATUALIZA VALIDACAO NOVO CAMPO REQUIRED
$.fn.atualizaValid = function () {
    
    var $ele = $(this);
    
    switch($ele.prop("tagName")){
        case "TEXTAREA": 
            $ele.keyup(function(){validaTextarea(this)});
        break;
        case "SELECT": 
            $ele.click(function(){validaInput(this)});          
        break;
        case "INPUT": 
            
            if($ele.attr("type") == "text"){
                $ele.keyup(function(){validaInput(this)});
            }
            else if($ele.attr("type") == "radio"){
                $ele.click(function(){validaRadio(this)}); 
            }
            else if($ele.attr("type") == "checkbox"){
                $ele.click(function(){validaCheckBox(this)}); 
            }

        break;
    }

}
//FUNÇÕES DE VALIDAÇÃO DE CAMPOS 

//FUNCAO VALIDA CAMPOS OBRIGATORIOS INPUT E SELECT
function validaInput(field){ 
    if($('#' + field.id).is('[required]')){
        if(field.value.length == 0){
            if(!$('#' + field.id).parent().is(".has-error")){
                $('#' + field.id).parent().addClass("has-error" + " " + field.id)
                var helpBlock = '<p class="help-block'  + ' ' + field.id + '">Favor preencher o campo!</p>'
                $("." + field.id).append(helpBlock)    
            }
        
        } else if(field.value.length >= 1){
            $('#' + field.id).parent().removeClass("has-error").addClass("has-success")
            $('#' + field.id).parent().removeClass(field.id)
            $("p." + field.id).append(helpBlock).remove()
        }  
    }else{
        $('#' + field.id).parent().removeClass("has-error")
        $('#' + field.id).parent().removeClass("has-success")
        $('#' + field.id).parent().removeClass(field.id)
        $("p." + field.id).append(helpBlock).remove()
    }
}
//FUNCAO VALIDA CAMPOS OBRIGATORIOS INPUT E SELECT
function validaTextarea(field){ 
    
    var tamanhotexto = parseInt($("#tamanhoTextoValidationOnco").val()) + 30
    if($('[name="' + field.name + '"]').is('[required]')){
        if(field.name == 'descricao') {
            if(field.value.length <= tamanhotexto){
                if(!$('[name="' + field.name + '"]').parent().is(".has-error")){
                    $('[name="' + field.name + '"]').parent().addClass("has-error" + " " + field.name)
                    var helpBlock = '<p class="help-block'  + ' ' + field.name + '">Favor preencher o campo com mais 30 caracteres!</p>'
                    $("." + field.name).append(helpBlock)    
                }
            
            } else if(field.value.length >= tamanhotexto){
                $('[name="' + field.name + '"]').parent().removeClass("has-error").addClass("has-success")
                $('[name="' + field.name + '"]').parent().removeClass(field.name)
                $("p." + field.name).append(helpBlock).remove()
            }
        } else {
            if($('[name="' + field.name + '"]').is('[required]')){
                if(field.value.length < 5){
                    if(!$('[name="' + field.name + '"]').parent().is(".has-error")){
                        $('[name="' + field.name + '"]').parent().addClass("has-error" + " " + field.name)
                        var helpBlock = '<p class="help-block'  + ' ' + field.name + '">Favor preencher o campo com pelo menos 5 caracteres!</p>'
                        $("." + field.name).append(helpBlock)    
                    }
                
                } else if(field.value.length >= 5){
                    $('[name="' + field.name + '"]').parent().removeClass("has-error").addClass("has-success")
                    $('[name="' + field.name + '"]').parent().removeClass(field.name)
                    $("p." + field.name).append(helpBlock).remove()
                }  
            }else{
                $('[name="' + field.name + '"]').parent().removeClass("has-error")
                $('[name="' + field.name + '"]').parent().removeClass("has-success")
                $('[name="' + field.name + '"]').parent().removeClass(field.name)
                $("p." + field.name).append(helpBlock).remove()
            }
        }
          
    }else{
        $('[name="' + field.name + '"]').parent().removeClass("has-error")
        $('[name="' + field.name + '"]').parent().removeClass("has-success")
        $('[name="' + field.name + '"]').parent().removeClass(field.name)
        $("p." + field.name).append(helpBlock).remove()
    }
}
//VALIDA CAMPOS TIPO ZOOM
function validaZoom(field){   
    if($('#' + field).is('[required]') == true){     
        valorCampo = $('#' + field).val()
        $('#' + field).parent().addClass(field)    
        var el = document.getElementsByClassName(field)
        var helpBlock = '<p class="help-block'  + ' ' + field + '">Favor preencher o campo!</p>'    
        if(valorCampo == null){
            if(!$('#' + field).parent().is(".has-error")){
                $('#' + field).parent().addClass("has-error")          
                $('#' + field).parent().removeClass("has-success")       
                el[0].children[2].children[0].children[0].classList.add("zoomWarning")
                el[0].children[2].children[0].children[0].classList.remove("zoomSuccess")
                $("." + field).append(helpBlock) 
            }else if (!el[0].children[2].children[0].children[0].getElementsByClassName("zoomWarning") == false){
                el[0].children[2].children[0].children[0].classList.add("zoomWarning");
            }
        }else{        
            $('#' + field).parent().addClass("has-success")          
            $('#' + field).parent().removeClass("has-error")    
            el[0].children[2].children[0].children[0].classList.add("zoomSuccess")
            el[0].children[2].children[0].children[0].classList.remove("zoomWarning")
            $("p." + field).append(helpBlock).remove()
        } 
    }    
}

//VALIDA CAMPOS TIPO RADIO
function validaRadio(field){    
    $('[name="' + field.name + '"]').parent().parent().addClass(field.name)   
    var helpBlock = '<p class="help-block'  + ' ' + field.name + '">Favor selecionar uma opção!</p>'   
    if($('[name="' + field.name + '"]').is('[required]')){  
        if($('[name="' + field.name + '"]:checked').val() == undefined){
            if(!$('[name="' + field.name + '"]').parent().parent().is(".has-error")){
                $('[name="' + field.name + '"]').parent().parent().addClass("has-error")  
                $('[name="' + field.name + '"]').parent().parent().removeClass("has-success")  
                $("." + field.name).append(helpBlock) 
            }
        }else{
            $('[name="' + field.name + '"]').parent().parent().addClass("has-success")  
            $('[name="' + field.name + '"]').parent().parent().removeClass("has-error")  
            $("p." + field.name).append(helpBlock).remove()
        }
    }    
}
//VALIDA CAMPOS TIPO CHECKBOX
function validaCheckBox(field){    
    $('#checkbox1').is(":checked")
    $('[type="checkbox"]').each(function(){validaCampo(this)}); 
}

//FUNCAO QUE LIMPA VALIDAÇÕES INPUT SELECT E TEXT
//SE FOR RADIO O FIELD DEVERÁ SER O NAME
function removeValid(field){
    if($('#' + field).is('[type=radio]') == true || $('[name="' + field + '"]').is('[type=radio]') == true){
        var helpBlock = '<p class="help-block'  + ' ' + field + '">Favor selecionar uma opção!</p>'   
        $('[name="' + field + '"]').parent().parent().removeClass(field)  
        $('[name="' + field + '"]').parent().parent().removeClass("has-success")  
        $('[name="' + field + '"]').parent().parent().removeClass("has-error")  
        $("p." + field).append(helpBlock).remove()
        $('[name="' + field + '"]').prop("required",false); 
    }else{
        $('#' + field).parent().removeClass("has-error")
        $('#' + field).parent().removeClass("has-success")
        $('#' + field).parent().removeClass(field)
        var helpBlock = '<p class="help-block'  + ' ' + field + '">Favor preencher o campo!</p>'
        $("p." + field).append(helpBlock).remove()
        $('#' + field).prop("required",false); 
    }
}
//FUNCAO QUE LIMPA TODAS VALIDAÇÕES
function limpaAllValid(){
    $("input[type='text']").each(function(){removeValid(this.id)});
    $("select").each(function(){removeValid(this.id)});
    $("textarea").each(function(){removeValid(this.id)});
    $("input[type='radio']").each(function(){removeValid(this.name)});    
}

// ATIVA VALIDAÇÃO
function camposRequired(){    
    $("input[type='text']:required").each(function(){validaInput(this)});
    $("select:required").each(function(){validaInput(this)});
    $("textarea:required").each(function(){validaTextarea(this)});
    $("input[type='radio']:required").each(function(){validaRadio(this)});    

    $('input[type=money]:required').keyup(function(){validaInput(this)});
} 

//ATIVA VALIDAÇÃO MANUAL DO CAMPO ZOOM
function setFilterZoom(){ 
    if($("#arrZoomRequired").val() != "" && $("#arrZoomRequired").val() != undefined){
        var arrayZoom = JSON.parse($('#arrZoomRequired').val());
        for (var i = 0; i < arrayZoom.length; i++) {        
            $('#' + arrayZoom[i]).prop("required",true);        
        }            
        $("select[type='zoom']:required").each(function(){validaZoom(this.id)});      
        $("select[type='zoom']:required").on('select2:close', function (e) {
            validaZoom(e.target.id)            
        });  
    }
};

// RECEBE OS CAMPOS ZOOM QUE VÃO TER VALIDAÇAO
function zoomRequiredTrue(field){
    if($("#arrZoomRequired").val() != "" && $("#arrZoomRequired").val() != undefined){
        var array = [];
        array = JSON.parse($("#arrZoomRequired").val());
        array.push(field);
        $("#arrZoomRequired").val(JSON.stringify(array));
    }else{
        var array = [];
        array.push(field);
        $("#arrZoomRequired").val(JSON.stringify(array));
    }
    setFilterZoom()
}

//LIMPA A VALIDACAO DOS CAMPOS ZOOM
function removeZoomValid(field){
    if($("#arrZoomRequired").val() != "" && $("#arrZoomRequired").val() != undefined){
        var array = [];
        array = JSON.parse($("#arrZoomRequired").val());
        array.splice(array.indexOf(field),1)
        if(array == []){
            $("#arrZoomRequired").val("");
        }else{
            $("#arrZoomRequired").val(JSON.stringify(array));
        }
    }       
    var el = document.getElementsByClassName(field)
    var helpBlock = '<p class="help-block'  + ' ' + field + '">Favor preencher o campo!</p>'    
    $('#' + field).parent().removeClass("has-success")
    el[0].children[2].children[0].children[0].classList.remove("zoomSuccess")       
    $('#' + field).parent().removeClass("has-error")
    el[0].children[2].children[0].children[0].classList.remove("zoomWarning")
    $("p." + field).append(helpBlock).remove()
    $('#' + field).parent().removeClass(field) 
    $('#' + field).prop("required",false); 
    setFilterZoom()
}

//transforma um float em um string com mascara monetaria
function convertReal_(string) {
	if (string != '0' && string != '' && string != undefined && string != NaN) {
		string = this.convertFloat(string)
		string = parseFloat(string).toFixed(2)
		string = string.split('.');
		string[0] = string[0].split(/(?=(?:...)*$)/).join('.');
		string.join(',');
		return string;
	} else {
		return '0,00'
	}
}

function convertReal(string) {
	if (string != '0' && string != '' && string != undefined && string != NaN) {
		string = this.convertFloat(string)
		string = parseFloat(string).toFixed(2)
		string = string.split('.');
		string[0] = string[0].split(/(?=(?:...)*$)/).join('.');
		string.join(',');
		return "R$ " + string;
	} else {
		return 'R$ 0,00'
	}
}
// transforma um valor com mascara em um float sem mascara
function convertFloat(valor) {
	if (valor != 0 && valor != undefined && valor != null) {
		valor = valor.toString()
		if (valor.indexOf(',') != -1) {

			valor = valor.replace(/[R$.]/g, '');
			valor = valor.replace(',', '.');
			return parseFloat(valor);

		} else {

			valor = valor.replace(/[R$]/g, '');
			return parseFloat(valor);

		}
	}
	return 0;
}