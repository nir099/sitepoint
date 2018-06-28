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