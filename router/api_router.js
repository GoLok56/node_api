var express = require('express');
var router = express.Router();

// Get token for the user
router.post('/authenticate', function(req, res){
    res.send('POST');
});

// Retrieving all available user
router.get('/user', function(req, res){
    res.send("GAY GAY GAY GAY GAY GAY");
});

// Updating the user info
router.put('/user/:id', function(req, res){

});

// Delete the user
router.delete('/user/:id', function(req, res){

});

module.exports = router;
