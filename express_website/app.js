var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
    console.log('hello world');
    res.render('index');
});

app.get('/profile', function(req, res){
    res.send('<h1>hello profile</h1>');
});

app.listen(3000);
console.log('server running on port 3000....')