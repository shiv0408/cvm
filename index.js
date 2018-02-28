const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

Chocolate = require('./model.js');

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function(){
	console.log("Connected to database");
});

app.get('/', function (req, res) {
  res.send('Please use /chocolates');
  console.log("Logged");
});

//API for getting Info of all Chocolates
app.get('/chocolates',function(req,res){
	//send
});
app.listen(3000);