function getMoneyValue(value) {
	if (value == "") {
		return 0;
	} else {
		return convertMoneyToFloat(value);
	}
}