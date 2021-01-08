var util = require("util");
var Partitioning = require("./partitioning.js");


function RangePartitioning(clients) {
	Partitioning.call(this, clients);
}

util.inherits(RangePartitioning, Partitioning);


RangePartitioning.prototype._getClient = function(key) {
	var possibleValues = '0123456789abcdefghijklmnopqrstuvwxyz';
	var rangeSize = possibleValues.length

	for (var i = 0 , clientIndex = 0 ; i < possibleValues.length; i+= rangeSize,clientIndex++) {
	var range = possibleValues.slice(i, i + rangeSize);

		if (range.indexOf(key[0].toLowerCase() ) != -1) {
			return this.clients[clientIndex];
		}
	}
	// if key does not start with 0 to 9 neither A to Z,
	// fall back to always using the first client.
	return this.clients[0];
};
