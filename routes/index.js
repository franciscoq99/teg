var express = require('express');
var router = express.Router();
const authorize = require("../middleware/authentication");

/* GET home page. */
router.get('/', authorize(), function (req,res,next){
    res.render('index', {title: "entorno"});
});

module.exports = router;
