var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', function(req, res, next) {
  var posts = db.get('posts');
  posts.find({},{}, function(err, posts){
    res.render('index',{
      'title': 'Add Post',
      'article': posts
    });
    console.log(path.join(__dirname, "uploads"));
  });
});

module.exports = router;
