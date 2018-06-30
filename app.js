let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let cors = require('cors');

require('dotenv').config();
require('./api/config/db');
require('./api/config/passport');

let routesApi = require('./api/routes/index');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api', routesApi);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use( (err , req , res , next ) => {
    if( err.name === 'unauthorizedError') {
        console.log('here');
        res.status(401);
        res.json({"massage": err.name + ": " + err.massage});
    } else {
        res.status(err.status || 404);
        res.render('error', {
            message: err.message,
            error: {}
        });
    }
});

module.exports = app;