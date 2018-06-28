
let express = require('express');
let router = express.Router();
let jwt = require('express-jwt');
let auth = jwt({
    secret: 'mySecret',
    userProperty: 'payload'
});

let ctrlProfile = require('../controllers/profile');
let ctrlAuth = require('../controllers/auth');

router.get('/profile', auth, ctrlProfile.profileRead);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;