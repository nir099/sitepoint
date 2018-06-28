const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let User = mongoose.model('User');

passport.use( new LocalStrategy({
        usernameField: 'email',
    },
    (username , password , done ) => {
        User.findOne( { email: username } , ( err , user ) => {
            if (err) {
                return done( err); // return if user not found in database
            }
            if ( !user ) {
                return done( null , false , {
                    massage: 'user not found'
                });
            }
            if( !user.validPassword(password)) {
                return done( null , false , {
                    massage: 'password is wrong'
                });
            }
            return done(null, user);
        });
    }
));