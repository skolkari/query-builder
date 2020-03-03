var express = require('express');
var fs = require("fs");
const cors = require("cors");

var app = express();

var PORT = 3000;

app.use(cors());

app.disable('x-powered-by');

app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.post('/saverow', function(req, res) {
  var data =  fs.readFileSync('./api/mock-response.json', 'utf8');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(data);
  res.end();
});

app.get('/gettabledata', function(req, res) {
  var data =  fs.readFileSync('./api/mock-tabledata.json', 'utf8');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(data);
  res.end();
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});