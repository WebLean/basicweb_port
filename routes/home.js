// routers/home.js

const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get('/', function(req, res) {
    res.render('home/welcome');
});
router.get('/about', function(req, res) {
    res.render('home/about');
});

// Login

router.get('/login', function(req, res) {
    let username = req.flash('uesrname')[0];
    let errors = req.flash('errors')[0] || {};
    res.render('home/login', {
        username: username,
        errors: errors
    });
});

router.post(
    '/login',
    function(req, res, next) {
        let errors = {};
        let isValid = true;

        if (!req.body.username) {
            isValid = false;
            errors.username = 'Username is required!';
        }
        if (!req.body.password) {
            isValid = false;
            errors.password = 'Password is required!';
        }

        if (isValid) {
            next();
        } else {
            req.flash('errors', errors);
            res.redirect('/login');
        }
    },
    passport.authenticate('local-login', {
        successRedirect: '/posts',
        failureRedirect: '/login'
    })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;