/**
 * Created by Administrator on 2015/6/8.
 */
var request = require('request');

exports = module.exports = function(method, postdata, callback) {
    postdata = postdata || {};
    postdata.apiVersion = "1.0.0.0";
    postdata.appKey = "ycfgw82oiqldadrpqi84p1zda";
    postdata.timeStamp = "2015-05-27 16:11:45";
    postdata.sign = "C45D64F9C24D88322AE00A225EB4E828";
    postdata.channel = 4;
    postdata.version = "1.0.0.0";

    request.post(
        {
            url:'http://api.1caifu.com/api/'+method,
            //url:'http://192.168.2.199:9000/api/'+method,
            json:postdata,
            /*headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },*/
            encoding:'utf8'
        },
        function(error, response, body){
            /*if(response.statusCode == 200){
                console.log(body);
                $return = body;
            }else{
                console.log(response.statusCode);
                $return = "";
            }*/
            console.log(body);
            callback(response.statusCode, body);
        }
    );
}