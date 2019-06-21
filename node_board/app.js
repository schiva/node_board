'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const hbs = require('express-handlebars');   // handlebars 템플릿 엔진
var pool = require('./models/mysqlpool');


var routes = require('./routes/index');
var users = require('./routes/users');
var process = require('./routes/process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//** handlebars 핵심 설정 시작 **//
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',                      // 기본 레이아웃 파일 main.hbs 지정, 요청에 따라 레이아웃을 변경할수 있다.
    layoutsDir: __dirname + '/views/layouts/',  // 헨들바템플릿의 레이아웃 파일의 위치
    partialsDir: __dirname + '/views/partials/' // 파티셜이란: 레이아웃을 채울 header.hbs, left.hbs, footer.hbs 파일의 위치
}));

app.set('view engine', 'hbs');                  // handlebars파일의 확장자를 hbs로 사용.
app.enable('view cache');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/process', process);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', 8081);
//app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('server listening on port ' + server.address().port);
});
