var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/', function(req, res, next) {
  var category = db.get('categories');
    //category.find({"name": /.*no.*/},{limit:10,sort:{name:1}}, function(err, category){
      category.find({},{},function(err, category){
      if (err) throw err;
      console.log(category);
      res.render('category',{
        'title': 'List Of Category',
        'category': category
      });
  });
});

router.get('/add', function(req, res, next) {
    res.render('addcategory',{
      'title': 'Add Cateogory'
    });
});

router.get('/update', function(req, res, next) {
  var id = req.query.id;
  var category = db.get('categories');
    category.find({'_id':id},{}, function(err, data){
    res.render('updatecategory',{
      'title': 'Update Category',
      'data': data
    });
  });
});

router.get('/delete', function(req, res, next){
  var id = req.query.id;
  var category = db.get('categories');
  category.remove({
    "_id":id
  }, function (err, category){
      if (err) {
        res.send(err);
      } else {
        req.flash('success', 'Category Deleted');
        res.location('/cateogries');
        res.redirect('/categories');
      }
  });
});

router.post('/save', function(req, res, next) {
  var id = req.body.id;
  var name = req.body.name;

  //Form Validation
  req.checkBody('name', 'Name field is required').notEmpty();
  
  //Check Errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('addcategory', {
      "errors": errors
    });
  } else {
    var categories = db.get('categories');
    if (id) {
      categories.update({'_id':id},{$set:{'name':name}}, function (err, categories){
          if (err) {
            res.send(err);
          } else {
            req.flash('success', 'Category Update');
            res.location('/categories');
            res.redirect('/categories');
          }
      });
    } else {
      categories.insert({
        "name":name
      }, function (err, categories){
          if (err) {
            res.send(err);
          } else {
            req.flash('success', 'Category Added');
            res.location('/cateogries');
            res.redirect('/categories');
          }
      });
    }
  }
});

module.exports = router;
