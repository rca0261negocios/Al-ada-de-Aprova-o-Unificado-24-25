function beforeCancelProcess(colleagueId, processId) {
    if (hAPI.getCardValue('isAlcada') == 'none') {
        hAPI.setCardValue('isAlcada', '');
    }
}