/**
 * Created by Administrator on 2015/6/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    res.render('login', { title: "Express", name: req.body.name });
});

module.exports = router;
