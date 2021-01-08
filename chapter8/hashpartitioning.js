var util = require("util");
var crypto = require('crypto');
var Partitioning = require("./partitioning.js");

function HashPartitioning(clients) {
	Partitioning.call(this, clients);
}

util.inherits(HashPartitioning, Partitioning);

HashPartitioning.prototype._getClient = function(key) {
	var index = this._hashFunction(key) % this.clients.length;
	return this.clients[index];
};


HashPartitioning.prototype._hashFunction = function(str) {
	var hash = crypto.createHash('md5').update(str).digest('hex');
	return parseInt(hash,16);
};



