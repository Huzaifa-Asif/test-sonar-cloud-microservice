const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
global.__basedir = __dirname;

// routes
const routeFilm = require('./app_server/routes/route.film.js');
const routeUser = require('./app_server/routes/route.user.js');
const routeComment = require('./app_server/routes/route.comment.js');

const cors = require('cors');

const app = express();
app.use(cors());

// Set up mongoose connection
const dev_db_url =
    'mongodb+srv://huzaifa:tech8580@cluster0.mfoye.mongodb.net/moviereview?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose
    .connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected…'))
    .catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// Api request limit increase to 250mb
app.use(express.json({ limit: '250mb', extended: true }));
app.use(express.urlencoded({ limit: '250mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// render home screen
app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to Movie Review App Backend' });
});

app.use('/film', routeFilm);
app.use('/user', routeUser);
app.use('/comment', routeComment);
// Introducing a security vulnerability: No Rate Limiting
app.post('/unprotected-login', (req, res) => {
    const { username, password } = req.body;
    // Simulate a login attempt without rate limiting
    if (username === 'admin' && password === 'password123') {
        res.json({ message: 'Logged in!' });
    } else {
        res.json({ message: 'Invalid credentials!' });
    }
});

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
    res.render('error');
});

module.exports = app;
