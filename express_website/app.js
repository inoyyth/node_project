var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.render('index',{title: 'Computer Not Working?'});
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.post('/contact/send', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'supri170845@gmail.com',
            pass: '170845inoyAa!'
        }
    });

    var mailOption = {
        from: 'Inoy Yth <inoy@info.com>',
        to: 'supriyadin.170845@gmail.com',
        subject: 'Website Submission',
        message: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
    }

    transporter.sendMail(mailOption, function(error, info){
        if(error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('message sent '+info.response);
            res.redirect('/contact');
        }
    });
});

app.listen(3000);
console.log('server running on port 3000....')