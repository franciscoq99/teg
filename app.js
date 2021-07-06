const http= require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var mysql = require('mysql');
var mysqlsession=require('express-mysql-session');
var myconnection= require('express-myconnection');
var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var materiasRouter = require('./routes/materias');
var authenticationRouter = require('./routes/authentication');
var bibliotecaRouter = require('./routes/biblioteca');
var chatsRouter = require('./routes/chats');
const {database}=require('./config/keys')

var authenticate = require("./middleware/authentication");

var app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
require('./socket')(io);

require('./config/passport');

//setting
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
//middlewares

app.use(session({ 
    secret:'secret', 
    resave: false,
    saveUninitialized: false,
    store: new mysqlsession(database)
}));

app.use(flash()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());
app.use(myconnection(mysql,database,'single'));
//variables globales 
app.use((req,res,next)=>{ 
  app.locals.success= req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user= req.user; 
  next(); 
});

app.use(express.static(path.join(__dirname, 'public')));

passport.setAuthenticatedUser = async function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = await User.findById(req.user, function (err, user) {
      if (err) {
        console.log('Error in finding user --> Passport');
      }
      return;
    });
  }
  next()
}

//rutas
app.use('/', indexRouter);
app.use('/', authenticationRouter);
app.use('/biblioteca', bibliotecaRouter);
app.use('/chats', chatsRouter);
app.use('/materias', materiasRouter); 

// error handler
app.use(handleErrors);

function handleErrors(err, req, res, next) {
  res.render('error', {error: err});
}

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

//STARTING SERVER
server.listen(app.get('port'), () => {
  console.log(`Server started on port`, app.get('port'));
});

module.exports = app;
