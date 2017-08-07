var express = require('express');
var config = require('./config');

var app = express();

app.use('/', require('./router/api_router'));

app.listen(config.PORT);
console.log('Server is running...');
