var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let loginRouter = require('./routes/login');
let email_loginRouter = require('./routes/login_email.js');
let signup = require('./routes/signup.js');
let profile = require('./routes/profile.js');
let getprofile = require('./routes/getprofile.js');
let email_veri = require('./routes/email_veri.js');
let forget = require('./routes/forget_password.js');
let forgetcode = require('./routes/email_code_check.js');
let forgetpass = require('./routes/password_reset.js');
let get_pic = require('./routes/get_pic.js');
let update_pic = require('./routes/update_pic.js');
let post_seat = require('./routes/post_seat.js');
let cancel_post = require('./routes/cancel_post.js');
let search_seat = require('./routes/search_seat.js');
let logout = require('./routes/logout.js');
let resume = require('./routes/resume.js');
let check_match = require('./routes/check_match.js');

var app = express();
var bodyParser = require('body-parser');

/*app.configure(function() {
  app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp' }));
});
*/

// view engine setup
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.method=="OPTIONS") res.send(200);
  else  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // for parsing application/json
app.post('/', function (req, res) {
  console.log(req.body);
  res.json(req.body);
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/email_login', email_loginRouter);
app.use('/signup', signup);
app.use('/updateprofile', profile);
app.use('/getprofile', getprofile);
app.use('/email_veri', email_veri);
app.use('/forget', forget);
app.use('/forgetcode', forgetcode);
app.use('/forgetpass', forgetpass);
app.use('/get_pic', get_pic);
app.use('/update_pic', update_pic);
app.use('/post_seat', post_seat);
app.use('/cancel_post', cancel_post);
app.use('/search_seat', search_seat);
app.use('/logout', logout);
app.use('/resume', resume);
app.use('/check_match', check_match);

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

var oneHour = 60 * 60 * 1000;
var clear_timeout = require('./routes/clear_timeout.js');

clear_timeout();

module.exports = app;
