function convertMoneyToFloat(value) {
	value = value.trim().replace("R$ ", "");
	while(value.indexOf(".") != -1){
		value = value.replace(".", "");
	}
	value = value.replace(",", ".");
	if(isNaN(value)){
		value = 0.00;
	}
	return parseFloat(value);
}