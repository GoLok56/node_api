// Setting up the package
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

// Connecting to database
mongoose.createConnection(config.DATABASE, {useMongoClient: true});

// Setting up the middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', require('./router/api_router'));

// Starting the server
app.listen(config.PORT);
console.log('Server is running...');
