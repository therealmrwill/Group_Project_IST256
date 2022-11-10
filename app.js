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
//var accountInfo = require('./public/data/accountInfo.json');

app.get("/getAccountInfo", function(req, res){
  res.setHeader('Content-Type', 'application/json');
  //res.end(JSON.stringify(accountInfo));

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("accountInfoDB");
    dbo.collection("accountInfo").find({}).toArray(function(err, result){
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
      db.close();
    });
  });
});

app.post("/setData", function (req, res){
  // trips(req.body.idx).rating = req.body.rating;

  //User Settings 
  //accountInfo[0].username = req.body.username;
  //accountInfo[0].password = req.body.password;
  //accountInfo[0].birthdayYr = req.body.birthdayYr;
  //accountInfo[0].birthdayMo = req.body.birthdayMo;
  //accountInfo[0].birthdayDay = req.body.birthdayDay;

  //Location settings
  //accountInfo[0].address = req.body.address;
  //accountInfo[0].city = req.body.city;
  //accountInfo[0].state = req.body.state;
  //accountInfo[0].postalCode = req.body.postalCode;
 // accountInfo[0].deliveryInstructions = req.body.deliveryInstructions;
  

  res.setHeader('Content-Type', 'application/json');
  //res.end(JSON.stringify(accountInfo)); 

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("accountInfoDB");
    dbo.collection("accountInfo").find({}, {projection: { _id: 0, username: 1, password: 1, address: 1, city: 1, state: 1, birthdayYr: 1, 
          birthdayMo: 1, birthdayDay: 1, postalCode: 1, deliveryInstructions: 1 }}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.end(JSON.stringify(result));
      db.close();
    });
  });
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
