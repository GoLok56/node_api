// Setting up the package
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Set up a mongoose model
module.exports = mongoose.model('User', new Schema({
    name: String,
    email: String,
    username: String,
    password: String
}));
