var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {
    res.render('addcategory',{
      'title': 'Add Cateogory'
    });
});

router.post('/add', function(req, res, next) {
  var title = req.body.title;

  //Form Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  
  //Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('addpost', {
      "errors": errors
      //"title": title,
      //"body": body
    });
  } else {
    var posts = db.get('categories');
    posts.insert({
      "title":title
    }, function (err, post){
        if (err) {
          res.send(err);
        } else {
          req.flash('success', 'Post Added');
          res.location('/');
          res.redirect('/');
        }
    });
  }
});

module.exports = router;
