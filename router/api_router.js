var express = require('express');
var User = require('../model/User');

var router = express.Router();

// Register a new user to database
router.post('/register', function(req, res){
    User.create({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }, function(err, user){
        if(err) throw err;
        console.log("New user added!");
        res.json({data: user});
    });
});

// Get token for the user
router.post('/authenticate', function(req, res){
    res.send('POST');
});

// Retrieving all available user
router.get('/user', function(req, res){
    res.send("GET");
});

// Updating the user info
router.put('/user/:id', function(req, res){
    res.send('PUT');
});

// Delete the user
router.delete('/user/:id', function(req, res){
    res.send('DELETE');
});

module.exports = router;
