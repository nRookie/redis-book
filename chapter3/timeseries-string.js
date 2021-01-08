function TimeSeries(client,namespace) {
	this.namespace = namespace;
	this.client = client;
	this.units = {
	second: 1,
	minute: 60,
	hour: 60 * 60,
	day: 24 * 60 * 60
};


this.granularities = {
	'1sec' : { name: 'lsec', ttl: this.units.hour *2,
	duration: this.units.second},
	'1min' : { name: 'lmin', ttl: this.units.day * 7,
	duration: this.units.minute},
	'1hour': { name: 'lhour', ttl: this.units.day * 60,
	duration: this.units.hour},
	'1day' : { name: 'lday', ttl:null, duration: this.units.day}
	};
};


TimeSeries.prototype.insert = function(timestampInSeconds){
for(var granularityName in this.granularities){
	var granularity = this.granularities[granularityName];
	var key = this._getKeyName(granularity, timestampInSeconds);
	this.client.incr(key);
	if(granularity.ttl != null) {
		this.client.expire(key,granularity.ttl);
	}
  }
};

TimeSeries.prototype._getKeyName =  function(granularity,timestampInSeconds){
var roundedTimestamp = this._getRoundedTimestamp(timestampInSeconds,granularity.duration);
	return [this.namespace,granularity.name,roundedTimestamp].join(':');
};

TimeSeries.prototype._getRoundedTimestamp = 
function(timestampInSeconds, precision) {
	return Math.floor(timestampInSeconds/precision) * precision;
};

TimeSeries.prototype.fetch = function(granularityName, beginTimestamp,endTimestamp,onComplete) {
	var granularity = this.granularities[granularityName];
	var begin = this._getRoundedTimestamp(beginTimestamp, granularity. duration);
	var end = this._getRoundedTimestamp(endTimestamp, granularity.duration);

	var keys = [];

	for (var timestamp = begin; timestamp <= end; timestamp += granularity.duration) {
	var key = this._getKeyName(granularity, timestamp);
	keys.push(key);
	}

	this.client.mget(keys,function(err,replies) {
	var results = [];
	for (var i = 0 ; i < replies.length ; i++) {
		var timestamp = beginTimestamp + i * granularity.duration;
		var value = parseInt(replies[i], 10) ||0;
		results.push({timestamp: timestamp, value: value});
	}
	onComplete(granularityName, results);
	});
};

exports.TimeSeries = TimeSeries;

