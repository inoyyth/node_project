var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images/uploads'});
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/*var storage        = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    var filename = Date.now();
    switch (file.mimetype) {
      case 'image/png':
      filename = filename + ".png";
      break;
      case 'image/jpeg':
      filename = filename + ".jpeg";
      break;
      default:
      break;
    }
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });*/

router.get('/add', function(req, res, next) {
  var categories = db.get('categories');

  categories.find({},{}, function(err, categories){
    res.render('addpost',{
      'title': 'Add Post',
      'categories': categories
    });
  });
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();

  //Check Image Upload
  if (req.file) {
    var mainimage = req.file.filename;
  } else {
    var mainimage = 'noimage.jpg';
  }
  console.log(mainimage);
  //Form Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('body', 'Body field is required').notEmpty();
  //req.checkBody('category', 'Body field is required').notEmpty();
  
  //Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('addpost', {
      "errors": errors
      //"title": title,
      //"body": body
    });
  } else {
    var posts = db.get('posts');
    posts.insert({
      "title":title,
      "body": body,
      "category": category,
      "author": author,
      "date": date,
      "mainimage": mainimage
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
