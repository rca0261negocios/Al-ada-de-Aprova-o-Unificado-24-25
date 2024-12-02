function beforeStateEntry(sequenceId) {

	if (sequenceId == AVALIACAO_GESTOR) {

		var nivelAtualAprovacao = hAPI.getCardValue("nivelAtualAprovacao");
		var nivelMaximoAprovacao = hAPI.getCardValue("nivelMaximoAprovacao");

		if (nivelAtualAprovacao < nivelMaximoAprovacao) {

			nivelAtualAprovacao = parseInt(nivelAtualAprovacao) + 1;
			hAPI.setCardValue("proximoAprovador", hAPI.getCardValue("idAprovGestor" + nivelAtualAprovacao));

		} else {
			hAPI.setCardValue("proximoAprovador", "");
		}
	}
}