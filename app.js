'use strict';

// External dependencies

const path = require('path');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Handlebars = require('handlebars');
var exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// Internal dependencies

const env = require('./config/environment');
const { initCart, setLocals } = require('./middleware/initSession');

// Initialization

const app = express();

mongoose
  .connect(env.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.error(err));
mongoose.connection.on('open', () => console.log('MongoDB running'));
mongoose.connection.on('error', (err) => console.error(err));

// Routers

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');

// View Engine setup

app.set('views', path.join(__dirname, 'views')); //we say that my view templates are in this folder.
app.set('view engine', 'hbs'); //we say that we will use handlebars as template language.

//use express-handlebars to render our templates
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    //layoutsDir: path.join(__dirname, 'views','layouts')
    //defaultLayout: 'main'
    //partialsDir: path.join(__dirname,'views','partials')
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

// Middleware: Logging and Request Parsing

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // For form parsing
//app.use(cookieParser());

//Middleware: Session(this middleware gives us 'req.session' and creates cookie for us and associate it with the session)
app.use(
  session({
    secret: env.secrets.session,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Initialize the Cart in the Session to reattach the Cart methods
app.use(initCart, setLocals);

// Middleware: Static Assets
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
