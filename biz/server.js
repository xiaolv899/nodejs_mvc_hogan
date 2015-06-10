/**
 * Created by Administrator on 2015/6/8.
 */
var request = require('request');

exports = module.exports = function(method, postdata, callback, next) {
    postdata = postdata || {};
    //参数加密处理
    postdata.apiVersion = "1.0.0.0";
    postdata.appKey = "ycfgw82oiqldadrpqi84p1zda";
    postdata.timeStamp = "2015-05-27 16:11:45";
    postdata.sign = "C45D64F9C24D88322AE00A225EB4E828";
    postdata.channel = 4;
    postdata.version = "1.0.0.0";

    if(method=="Product/ProductGetList") {
        db(function (data) {
            var json = {data:[]};
            callback(200, json);
        });
        return;
    }
    var $start = new Date();
    request.post(
        {
            //url:'http://api.1caifu.com/api/'+method,
            url:'http://192.168.2.199:9000/api/'+method,
            //url:'http://localhost:9000/api/'+method,
            json:postdata,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent':'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022)'
            },
            encoding:'utf8',
            timeout: 10000
        },
        function(error, response, body){
            /*if(response.statusCode == 200){
                console.log(body);
                $return = body;
            }else{
                console.log(response.statusCode);
                $return = "";
            }*/
            //console.log(body);
            if(error){
                console.log(error);
                if(next)
                    next(error);
                else
                    callback(500, error);
            }else {
                console.log("API /" + method + " " + (new Date().getTime() - $start.getTime()) + "ms");
                callback(response.statusCode, body);
            }
        }
    );
}