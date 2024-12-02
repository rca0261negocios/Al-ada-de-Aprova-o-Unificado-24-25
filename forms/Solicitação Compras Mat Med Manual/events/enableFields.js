function enableFields(form) {

    var currentState = parseInt(getValue('WKNumState'));
    var currentState = parseInt(getValue("WKNumState"));

    if (currentState == 0 || currentState == 4 || currentState == 5) {

        form.setEnabled("prioridade", true);
        form.setEnabled("motivoEmergencial", true);
        form.setEnabled("_motivoEmergencial", true);

    }else{

        form.setEnabled("prioridade", false);
        form.setEnabled("motivoEmergencial", false);
        form.setEnabled("_motivoEmergencial", false);

    }

}