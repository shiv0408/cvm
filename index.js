const express = require('express');
const app = express();
const bodyparser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

const assert = require('assert');

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Chocolates');
  // Find some documents
  collection.find({}).project({"Name":1, "Rate":1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
  });
};

const queryDocuments = function(db, id, callback) {
  // Get the documents collection
  const collection = db.collection('Chocolates');
  // Find some documents
  //console.log(id);
  collection.find({'_id': new ObjectId(id)}).project({"Name":1, "Rate":1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(docs);
  });
}

const updateDocument = function(db, id, callback){
	const collection = db.collection('Chocolates');
	console.log(id);
	collection.update({'_id': new ObjectId(id)},{ $inc: {"Remaining":-1, "Sold": +1}} , function (err, result) {
		assert.equal(err, null);
		callback(result);
	});
}

const salesReport =function (db, callback) {
	const collection = db.collection('Chocolates');
	collection.find({}).project({"Name":true, "Sold":true, "_id":false}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Sales Report");
    callback(docs);
  });
}
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'test';

app.get('/', function (req, res) {
  res.send('Please use /chocolates');
  console.log("Logged");
});

//API for getting Info of all Chocolates
app.get('/chocolates',function(req,res){
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
  		console.log("Connected successfully to server");
 		const db = client.db(dbName);
		findDocuments(db,function(docs){
			console.log(docs);
			res.jsonp(docs);
		});
	});
});

//API for getting info for one particular chocolate
app.get('/chocolate/:_id',function (req,res) {
	var id=req.params._id;
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
  		console.log("Connected successfully to server");
 		const db = client.db(dbName);
		queryDocuments(db,id,function(docs){
			console.log(docs[0]);
			res.send(docs[0]);
			client.close();
		});
	});
})

//API for carr
app.get('/buy/:_id',function(req,res){
	var id = req.params._id;
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
 		const db = client.db(dbName);
		updateDocument(db, id, function (docs) {
			res.send("You bought a chocolate");
			client.close();
		})
	});
});

//API for sales report
app.get('/report',function (req,res) {
	MongoClient.connect(url,function(err, client) {
		assert.equal(err, null);
		const db = client.db(dbName);
		salesReport(db,function(docs){
			res.send(docs);
			client.close();
		})
	})
})
app.listen(3000);
