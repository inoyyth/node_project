var express = require("express");
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var student = require('../models/student');
/* GET student index page. */
router.get('/', ensureAuthenticated , function (req, res, next) {
    res.render('student', { title: 'Students' });
});

function ensureAuthenticated(req ,res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
