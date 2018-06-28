let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');

require('./models/db');
require('./config/passport');

app.use(passport.initialize());
app.use('/api', routesApi);

app.use( (err , req , res , next ) => {
    if( err.name === 'unauthorizedError') {
        res.status(401);
        res.json({"massage": err.name + ": " + err.massage});
    }
});