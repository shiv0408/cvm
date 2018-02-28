const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
  console.log("Logged");
});

app.listen(3000);