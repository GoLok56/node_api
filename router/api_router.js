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
            // Generating a token
            var token = jwt.sign(
                user,
                config.SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                success: true,
                message: "Berhasil mendapatkan token!",
                token: token
            });
        }
    });
});

// Verifying the token
router.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.SECRET, function(err, decoded) {
        if (err) {
            return res.json({
                success: false,
                message: 'Terjadi kesalahan.'
            });
        } else {
            req.decoded = decoded;
            console.log(req.decoded);
            next();
        }
    });

    } else {
        return res.status(403).send({
            success: false,
            message: 'Token tidak ditemukan!'
        });
    }
});

// Retrieving all available user
router.get('/user', function(req, res){
    User.find({}, function(err, users){
        if(err) throw err;

        res.json(users);
    });
});

// Updating the user info
router.put('/user/:id', function(req, res){
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }, {new: true}, function(err, user){
        if(err) throw err

        res.json({ data: user });
    });
});

// Delete the user
router.delete('/user/:id', function(req, res){
    User.remove({ _id: req.params.id }, function(err, removed){
        if(err) throw err;

        res.json({
            success: true,
            deleted: removed.result.n
        });
    });
});

module.exports = router;
