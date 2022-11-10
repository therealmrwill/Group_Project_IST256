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
  //trips(req.body.idx).rating = req.body.rating;
  //User Settings 
  //Location settings
  
  res.setHeader('Content-Type', 'application/json');
  //res.end(JSON.stringify(accountInfo)); 

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("accountInfoDB");
      var myquery = { };
      var newvalues = { $set: {username: req.body.username, password: req.body.password,
        birthdayYr: req.body.birthdayYr,
        birthdayMo: req.body.birthdayMo,
        birthdayDay: req.body.birthdayDay,  
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        deliveryInstructions: req.body.deliveryInstructions} };
      dbo.collection("accountInfo").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        res.end(JSON.stringify(newvalues));
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
