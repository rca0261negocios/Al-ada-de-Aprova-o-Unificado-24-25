function exibeMotivoEmergencial(campo) {
    var valorSelecionado = $("#" + campo.id + " option:selected").val()
    if(valorSelecionado == "E"){
        $('#div_motivoEmergencial').show();
    }else{
        $('#div_motivoEmergencial').hide();
    }
    $("#motivoReprovacao").val(valorSelecionado);
}


function VerMotivoEmergencial(qCampo) {
    $("#txtPrioridade").val(qCampo.value);
}