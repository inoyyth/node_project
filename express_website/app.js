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
    res.send('index');
});

app.get('/profile/:id', function(req, res){
    res.send('<h1>hello profile '+req.params.id+'</h1>');
});

app.post('/profile', function(req, res){
    var data = {name:req.params.name,age:req.params.age}
    res.send('<h1>POST profile'+res.params.name+'</h1>');
});

app.put('/profile', function(req, res){
    res.send('<h1>PUT profile</h1>');
});

app.delete('/profile/:id', function(req, res){
    res.send('<h1>DELETE profile '+req.params.id+'</h1>');
});


app.listen(3000);
console.log('server running on port 3000....')