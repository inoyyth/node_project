//var express = require('express');
//var app = express();


import * as express form 'express';

const router = express.Router();
router.get('/', function(req:any, res:any){
    console.log('hello world');
    res.send('index');
});

router.get('/profile/:id', function(req:any, res:any){
    res.send('<h1>hello profile '+req.params.id+'</h1>');
});

router.post('/profile', function(req:any, res:any){
    var data = {name:req.params.name,age:req.params.age}
    res.send('<h1>POST profile'+res.params.name+'</h1>');
});

router.put('/profile', function(req:any, res:any){
    res.send('<h1>PUT profile</h1>');
});

router.delete('/profile/:id', function(req:any, res:any){  
    res.send('<h1>DELETE profile '+req.params.id+'</h1>');
});

module.exports = router;
router.listen(3000);
console.log('server running on port 3000....')