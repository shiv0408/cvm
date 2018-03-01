const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

const data = require('./model.js');

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
 		const db = client.db(dbName);
		data.listChocolates(db,function(docs){
			res.send(docs);
			client.close();
		});
	});
});

//API for getting info for one particular chocolate
app.get('/chocolate/:_id',function (req,res) {
	var id=req.params._id;
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
 		const db = client.db(dbName);
		data.showChocolate(db,id,function(docs){
			res.send(docs[0]);
			client.close();
		});
	});
})

//API for carring out the transaction
app.get('/buy/:_id',function(req,res){
	var id = req.params._id;
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
 		const db = client.db(dbName);
		data.sellChocolate(db, id, function (docs) {
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
		data.salesReport(db,function(docs){
			res.send(docs);
			client.close();
		})
	})
});

app.listen(3000);
