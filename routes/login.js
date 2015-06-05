/**
 * Created by Administrator on 2015/6/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    if(req.body.name.trim()=="")
    {
        res.send("ERROR：请输入用户名。");
    }else {
        res.render('login', {title: "Express", name: req.body.name});
    }
});

module.exports = router;
