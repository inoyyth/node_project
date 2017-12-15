"use strict";
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    console.log('hello world');
    res.send('index');
});
app.get('/profile/:id', function (req, res) {
    res.send('<h1>hello profile ' + req.params.id + '</h1>');
});
app.post('/profile', function (req, res) {
    var data = { name: req.params.name, age: req.params.age };
    res.send('<h1>POST profile' + res.params.name + '</h1>');
});
app.put('/profile', function (req, res) {
    res.send('<h1>PUT profile</h1>');
});
app.delete('/profile/:id', function (req, res) {
    res.send('<h1>DELETE profile ' + req.params.id + '</h1>');
});
app.listen(3000);
console.log('server running on port 3000....');
