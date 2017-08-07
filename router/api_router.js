var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config.js')
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
    User.findOne({
        username: req.body.username,
        password: req.body.password
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.json({
                success: false,
                message: 'Gagal mendapatkan token!'
            });
        } else {
            // Generation a token
            var token = jwt.sign(user, config.SECRET, {
                expiresIn: '1h' // Expire in an hour
            });

            res.json({
                success: true,
                message: "Berhasil mendapatkan token!",
                token: token
            });
        }
    });
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
