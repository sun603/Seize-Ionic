var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "cs307-spring19-team31.c2n62lnzxryr.us-east-2.rds.amazonaws.com",
  user: "shao44",
  password: "ShaoZH0923?",
  database: "cs307_sp19_team31"
});

var sql = "SELECT * from userlogin";
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log('uid:      ',result[0].uid);
    console.log('username: ',result[0].username);
    console.log('pswd:     ',result[0].pswd);
    console.log('email:    ',result[0].email);
  });
});

module.exports = app;
