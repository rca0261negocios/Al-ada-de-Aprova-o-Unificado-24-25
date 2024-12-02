Date.prototype.now = function(){
	return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};
Date.prototype.isGreater = function(d){
	return (this > d);
};
Date.prototype.addDays = function(days){
	this.setDate(this.getDate() + days);
	return this;
};
