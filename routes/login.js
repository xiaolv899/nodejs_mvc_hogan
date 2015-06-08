/**
 * Created by Administrator on 2015/6/5.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.query.action == "logout"){
        //清除cookie
        res.clearCookie('username');
        res.redirect("/");
    }else {
        next();
    }
});
router.post('/', function(req, res, next) {
    if(req.body.name.trim()=="admin" && req.body.password == "admin")
    {
        //记录cookie
        res.cookie('username', req.body.name.trim(), { maxAge: 600000 });
        //res.send($cookie);
        res.redirect('/product/list');
    }else {
        res.render('login', {title: "Express", errmsg: "用户名或密码错误"});
    }
});

module.exports = router;
