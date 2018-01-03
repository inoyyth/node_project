var express = require("express");
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
//var confirm = require('confirm-dialog');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local', {failureRedirect:'/users/login',failureFlash:'Invalid Username Or Password', successRedirect: '/',successFlash:'You are logged in'}), function(req, res, next) {
        console.log(req.body.password);
        req.flash('success','You are now logged in');
        res.redirect('/');
});

/*router.post('/login', upload.single('profileimage'), function (req, res, next) {
    console.log(req.body);
});*/

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done){
    console.log(username);
    console.log(password);
    User.getUserByUsername(username, function(err, user){
        if (err) throw err;
        if (!user) {
            console.log('not user');
            return done(null, false, {message: 'Unknown User'});
        }

        User.comparePassword(password, user.password, function (err, isMatch){
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                console.log('not match password');
                return done(null, false, {message: 'invalid Password'});
            }
        });
    });
}));

router.post('/register', upload.single('profileimage'), function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    if (req.file) {
        console.log('Uploading File...');
        var profileimage = req.file.filename;
    }
    else {
        console.log('No File Uploading...');
        var profileimage = 'noimage.jpg';
    }
    // Form Validator
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username field is required').notEmpty();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('password2', 'Password do not match').equals(req.body.password);
    // Check Errors
    var errors = req.validationErrors();
    if (errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password,
            profileimage: profileimage
        });
        User.createUser(newUser, function (err, user) {
            if (err) throw err
            console.log(user);
        });

        req.flash('success', 'You are now registerd and can login');

        res.location('/');
        res.redirect('/');
    }
});

router.get('/logout', function(req, res){
    confirm('Are you sure?').then(function() {
        req.logout();
        req.flash('success', 'you now logged out');
        res.redirect('/users/login');
    }, function() {
    // no 
    });
});

module.exports = router;
