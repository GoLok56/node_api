// Setting up the package
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

// Connecting to database
mongoose.createConnection(config.DATABASE, {useMongoClient: true});

// Setting up the middleware
app.use('/api', require('./router/api_router'));

// Starting the server
app.listen(config.PORT);
console.log('Server is running...');
