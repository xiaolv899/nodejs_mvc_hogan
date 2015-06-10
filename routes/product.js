/**
 * Created by Administrator on 2015/6/8.
 */
var express = require('express');
var api = require('../biz/server');
var db = require('../biz/db_mssql');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
    //read db
    db.query('select top 10 * from products', function (err, data) {
        //var $prevpage = 1, $nextpage = 1;
        var $hour = new Date().getHours();
        res.render('product/list', {
            partials: {head:"head"},
            title: "Express",
            name: req.session.get("username"),
            am: ($hour >= 6 && $hour < 12),
            pm: ($hour >= 12 && $hour < 18),
            night: ($hour >= 18 || $hour < 6),
            //prevpage: $prevpage,
            //nextpage: $nextpage,
            list: data
        });
    });
    /*var postdata = {pageIndex:parseInt(req.query.page)||1,pageSize:10};
    api("Product/ProductGetList",postdata, function(status, json){
        console.log(json.runSpanTime);
        var $hour = new Date().getHours();
        var $prevpage = postdata.pageIndex - 1, $nextpage = postdata.pageIndex + 1;
        if ($prevpage < 1)$prevpage = 1;
        res.render('product/list', {
            partials: {head:"head"},
            title: "Express",
            name: req.session.get("username"),
            am: ($hour >= 6 && $hour < 12),
            pm: ($hour >= 12 && $hour < 18),
            night: ($hour >= 18 || $hour < 6),
            prevpage: $prevpage,
            nextpage: $nextpage,
            list: json.data/*[
             {"title":"title1","price":100, "image":"http://img.1caifu.com/Upload/Private/20150607/16_228.jpg","description":"descrpition 1"},
             {"title":"title2","price":9.9, "image":"http://img.1caifu.com/Upload/Private/20150419/17D2_72.jpg","description":"descrpition 2"},
             {"title":"title3","price":89.9,"image":"http://img.1caifu.com/Upload/Private/20150607/16_228.jpg","description":"descrpition 3"},
             {"title":"title4","price":85.2,"image":"http://img.1caifu.com/Upload/Private/20150608/%E5%BC%A0%E5%BC%BA_175.jpg","description":"descrpition 4"},
             {"title":"title5","price":43,  "image":"http://img.1caifu.com/Upload/Private/20150607/16_228.jpg","description":"descrpition 5"},
             ]* /
        });
    },next);*/
});
router.get('/detail/:id', function(req, res, next) {
    var postdata = { id:parseInt(req.params.id)||0};
    api("Product/ProductGet",postdata, function(status, json){
        res.render('product/detail', {
            title: "Express",
            name: req.session.get("username"),
            data:json.data
        });
    });
});

router.post('/save',function(req, res, next){
    console.log(req.body);
    var _id = parseInt(req.body.id)||0;
    if(_id>0){
        db.query("update products set name='"+req.body.name+"',image='"+req.body.image+"',des='"+req.body.des+"' where id="+_id, function (err, data) {
            res.send({
                isSuccess: true
            });
        });
    }else {
        db.insert({
            name: req.body.name,
            image: req.body.image,
            des: req.body.des
        }, function (err, data) {
            res.send({
                isSuccess: true
            });
        });
    }
});
router.post('/delete',function(req, res, next){
    db.query('delete from products where id='+(parseInt(req.body.id)||0),function (err, data) {
        res.send({
            isSuccess: true
        });
    });
});

module.exports = router;