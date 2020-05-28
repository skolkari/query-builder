var express = require('express');
var bodyParser     =        require("body-parser");
var fs = require("fs");
const cors = require("cors");
var generator = require('./routes/generator')
var app = express();
var PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/generate', generator)

app.disable('x-powered-by');

app.get('/', function(req, res) {
    res.status(200).send({
        message: 'Hello world'
    });
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

module.exports = app;