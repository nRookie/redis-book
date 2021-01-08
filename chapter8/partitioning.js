function Partitioning(clients){
	this.client = clients;
}

Partitioning.prototype = {
	_getClient: function(key) { //2
		throw "Subclass should implement _getClient() method";
	},
	set: function (key,value) { //3
		var client = this._getClient(key);
		client.set.apply(client, arguments);
	},
	get: function(key) {//
		var client = this._getClient(key);
		client.get.apply(client, arguments);
	}

};

module.exports = Partitioning;


