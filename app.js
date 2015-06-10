__appSessionKey = "username";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('web-auth');
var userlogger = require('web-log');
var FileStreamRotator = require('file-stream-rotator');
var fs = require('fs');
var NodeSession = require('node-session');
var session = new NodeSession({
  secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXL7TD',
  'lifetime': 60000, // 5 minutes(300000)
  'expireOnClose': true,
});
//var stream = fs.createWriteStream('./log.txt');
var logDirectory = __dirname + '/log';
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var userLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  frequency: 'daily',//写文件频率 1m 1分钟
  verbose: true,
  date_format: "YYYY-MM-DD"
});


var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var product = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('partials',{head:"head"});

app.use(function(req, res, next){
  session.startSession(req,res,next);
});
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev',{stream:stream}));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(auth({path:["/product","/users"],login:"/",key:__appSessionKey}));
// setup the logger
app.use(userlogger({key: __appSessionKey,stream: userLogStream}));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/product', product);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
