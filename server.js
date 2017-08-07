var express = require('express');
var config = require('./config');

var app = express();

app.listen(config.PORT);
console.log('Server is running...');
