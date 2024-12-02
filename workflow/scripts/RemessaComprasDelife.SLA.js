function GETSLA() {
    var active = getValue('WKNumState')

    if (active == 0 || active == getStartActive().getValue(0, "processStatePK.sequence")) {

        var codigo = hAPI.getCardValue('COD_SOLICITACAO');
        var dataSLA;
        // verifica se o processo foi iniciado com o campo COD_SOLICITACAO para consultar o sla
        // do contrario consulta o sla do processo default
        if (codigo != '' && codigo != undefined) {
            dataSLA = getSlaById(codigo)
            if (dataSLA.rowsCount <= 0) {
                dataSLA = getSlaDefault()
                hAPI.setCardValue('ISDEFAULT', '' + true)
            }
        } else {
            dataSLA = getSlaDefault();
            hAPI.setCardValue('ISDEFAULT', '' + true)
        }
        // valida se o chamado possui SLA
        if (dataSLA.rowsCount > 0) {

            // seta o valor id do documento e a versao
            hAPI.setCardValue('COD_SOLICITACAO', '' + dataSLA.getValue(0, 'documentid'))
            hAPI.setCardValue('VERSAO', '' + dataSLA.getValue(0, 'version'))
            // converte a string JsonSla em objeto e popula os campos
            dataSLA = dataSLA.getValue(0, 'jsonSLA')
            dataSLA = JSON.parse(dataSLA)
            hAPI.setCardValue('SLA_TOTAL', '' + dataSLA.slaTotal)


            for (var key in dataSLA.SLA) {
                var sla = dataSLA.SLA[key]
                hAPI.setCardValue('SLA' + sla.codAtividade, sla.sla)
            }

        } else {

            throw "Não foi encontrado um registro de SLA para essa solicitacao," +
                " portanto ela nao pode ser iniciada!!! Contate a equipe de melhorias Continuas"

        }

    }
}

// consulta o sla pelo codigo da solicitaçã
function getSlaById(id) {

    var cons = []
    cons.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('isActive', 'true', 'true', ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('documentid', id, id, ConstraintType.MUST))
    return DatasetFactory.getDataset('ds_ficharioSLA', null, cons, null);
}
// consulta o SLA pelo codigo do processo
function getSlaDefault() {
    var codProcess = getValue("WKDef");

    var cons = []
    cons.push(DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('idProcesso', codProcess, codProcess, ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('isActive', true, true, ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('isDefault', true, true, ConstraintType.MUST))
    return DatasetFactory.getDataset('ds_ficharioSLA', null, cons, null);

}
// consulta qual o Id da atividade inicial do fluxo()
function getStartActive() {
    var idProcess = getValue("WKDef")
    var versionProcess = getValue("WKVersDef")

    var cons = []
    cons.push(DatasetFactory.createConstraint('initialState', 'true', 'true', ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('processStatePK.processId', idProcess, idProcess, ConstraintType.MUST))
    cons.push(DatasetFactory.createConstraint('processStatePK.version', versionProcess, versionProcess, ConstraintType.MUST))
    return DatasetFactory.getDataset('processState', null, cons, null);
}