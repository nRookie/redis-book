var redis = require("redis");
var client = redis.createClient();

if (process.argv.length < 3){

console.log("Error: You need to specify a data type!");
console.log("$ node using-timeseries.js [string|hash]");
process.exit(1);

}

var dataType = process.argv[2];

client.flushall();


var timeseries = require("./timeseries-" + dataType);

var item1Purchases = new timeseries.TimeSeries(client,"purchases:item1");
var beginTimestamp = 0;

item1Purchases = new timeseries.TimeSeries(client,"purchases:item1");
var beginTimestamp = 0;


item1Purchases.insert(beginTimestamp);
item1Purchases.insert(beginTimestamp + 1);
item1Purchases.insert(beginTimestamp + 1);
item1Purchases.insert(beginTimestamp + 3);
item1Purchases.insert(beginTimestamp + 61);

function displayResults(granularityName,results) {
	console.log("Results from " + granularityName + ":");
	console.log("Timestamp \t | Value");
	console.log("---------| -----");
	for (var i = 0; i < results.length ; i++) {
		console.log('\t' + results[i].timestamp + '\t| ' + 
		results[i].value);
	}
	console.log();
	}

item1Purchases.fetch("1sec",beginTimestamp,beginTimestamp + 120, displayResults);

item1Purchases.fetch("1min",beginTimestamp,beginTimestamp + 120, displayResults);

item1Purchases.fetch("1hour",beginTimestamp,beginTimestamp + 2*60*60, displayResults);
client.quit();

