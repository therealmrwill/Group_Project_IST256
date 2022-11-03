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
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Us generated code
var accountInfo = require('./public/data/accountInfo.json');

app.get("/getAccountInfo", function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(accountInfo));
});

// app.post("/setPassword", function(req, res){
//   for(let i = 0; i < accountInfo.length; i++) {
//     if(accountInfo[i].username === req.body.name) {
//       accountInfo[i].password = req.body.password;
//       break;
//     }
//   }

app.post("/setData", function (req, res){
  // trips(req.body.idx).rating = req.body.rating;

  accountInfo[0].username = req.body.username;
  accountInfo[0].password = req.body.password;
  accountInfo[0].address = req.body.address;
  accountInfo[0].city = req.body.city;
  accountInfo[0].state = req.body.state;
  accountInfo[0].birthdayYr = req.body.birthdayYr;
  accountInfo[0].birthdayMo = req.body.birthdayMo;
  accountInfo[0].birthdayDay = req.body.birthdayDay;
  

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(accountInfo)); 

});


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

module.exports = app;
