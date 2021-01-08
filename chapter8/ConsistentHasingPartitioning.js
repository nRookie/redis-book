var util = require("util");
var crypto = require("crypto");
var Partitioning = require("./partitioning.js");


function ConsistentHashingPartitioning(clients, vnodes) {
	this._values = vnodes || 256;
	this._ring = {};
	this._setUpRing(cleints);

}

util.inherits(ConsistentHashingPartitioning, Partitioning);

ConsistentHashingPartitioning.prototype._getClient = function(key) {

	var ringHashes = Object.keys(this._ring);
	var keyHash = this._hashFunction(key);
	ringHashes.sort();
	for(var i = 0 ; i < ringHashes.length ; i++ ) {
		var ringHash = ringHashes[i];
		if (ringHash >= keyHash) {
			return this._ring[ringHash];
		}
	}

	return this._ring[ringHashes[0]];

};

ConsistentHashingPartitioning.prototype._hashFunction = function(str)
{
	return crypto.createHash('md5').update(str).digest('hex');
};


ConsistentHashingPartitioning.prototype._setUpRing = 
	function(clients) {
	for (var i = 0; i < clients.length ; i++) {
		this.addClient(clients[i]);
	}
};


ConsistentHashingPartitioning.prototype.addClient = 
	function(client) {
		for(var i = 0; i <this_vnodes; i++ ) {
			var hash = this._hashFunction(client.address + ":" + i);
			this._ring[hash] = client;
		}
	};

ConsistentHashingPartitioning.prototype.removeClient = 
	function(client) {
	for ( var i = 0 ; i < this._vnodes; i++) {
		var hash = this._hashFunction(client.address + ":" + i);
		delete this._ring[hash];
	}
};


