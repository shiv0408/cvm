const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');


module.exports = 
{
//lisiting all chocolates
listChocolates: function(db, callback) {
	const collection = db.collection('Chocolates');
	console.log('Listing all chocolates');
	collection.find({}).project({"Name":1, "Rate":1}).toArray(function(err, docs) {
	    assert.equal(err, null);
    	callback(docs);
  	});
},

//Show info about a chocolate
showChocolate: function(db, id, callback) {
	const collection = db.collection('Chocolates');
	console.log('Info of chocolate ID: '+id);
  	collection.find({'_id': new ObjectId(id)}).project({"Name":1, "Rate":1}).toArray(function(err, docs) {
    	assert.equal(err, null);
    	callback(docs);
  	});
},

//Update database after selling a chocolate
sellChocolate: function(db, id, callback){
	const collection = db.collection('Chocolates');
	console.log('Sold a chocolate with ID: '+id);
	collection.update({'_id': new ObjectId(id)},{ $inc: {"Remaining":-1, "Sold": +1}} , function (err, result) {
		assert.equal(err, null);
		callback(result);
	});
},

//Sales Report
salesReport: function (db, callback) {
	const collection = db.collection('Chocolates');
	collection.find({}).project({"Name":true, "Sold":true, "_id":false}).toArray(function(err, docs) {
    	assert.equal(err, null);
    	console.log("Showing Sales Report");
    	callback(docs);
  	});
}
};