/**
 * Created by Administrator on 2015/6/5.
 */
var express = require('express');
var api = require('../biz/server');
var md5 = require('../biz/md5');
var auth = require('web-auth');
var router = express.Router();

/* GET home page. */
router.route('/').get(function(req, res, next) {
    if(req.query.action == "logout"){
        //清除cookie
        //res.clearCookie('username');
        req.session.flush();
        res.redirect("/");
    }else {
        next();
    }
}).post(function(req, res, next) {
    var postdata = {userName:req.body.name.trim(),passWord:md5(req.body.password)};
    if(postdata.userName==""||req.body.password==""){
        res.render('login', {title: "Express", required:true });
    }else {
        api("user/login", postdata, function (status, json) {
            if (json.isSuccess) {
                //记录cookie
                //res.cookie('username', postdata.userName, {maxAge: 600000});
                req.session.put(__appSessionKey,postdata.userName);
                res.redirect('/product/list');
                /*auth.add(req, res,postdata.userName,function(){
                    res.redirect('/product/list');
                });*/
                //res.send("login in"+req.cookies.username);
            } else {
                res.render('login', {title: "Express", errmsg: json.errMsg});
            }
        },next);
    }
});

module.exports = router;
