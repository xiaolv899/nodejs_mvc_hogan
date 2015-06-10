/**
 * Created by Administrator on 2015/6/10.
 */
var mssql = require('mssql');
var config = {
    user: 'sa',
    password: 'sql@123',
    server: '192.168.2.199', // You can use 'localhost\\instance' to connect to named instance
    database: 'testing',

    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}
var moduleconfig = {
    //"product"
};

/*exports = module.exports = function(callback){
    getproductlist(callback);
};*/
function execute(sql, callback){
    var connection = new mssql.Connection(config, function(err) {
        console.log(sql);
        if(err) {
            console.log(err);
            return;
        }
        var request = new mssql.Request(connection); // or: var request = connection.request();
        request.query(sql, callback);
        //connection.close();
    });
}
function getFieldValue(val) {
    if (typeof val === 'string') {
        return "'" + val + "'";
    }else if(typeof val === 'number'){
        return "" + val + "";
    }else{
        return "'" + (val||"") + "'";
    }
}

exports.query = function(sql,callback){
    execute(sql, callback);
};
exports.insert = function(data, callback){
    var insert1 = "";
    var insert2 = "";
    for(var k in data){
        insert1+=",["+k+"]";
        insert2+=","+getFieldValue(data[k]);
    }
    var sql = "insert into [products]("+insert1.substr(1)+") values("+insert2.substr(1)+")";
    execute(sql, callback);
}