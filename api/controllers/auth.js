let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.register = function( req , res ) {
    let user = new User();
    user.name = req.name;
    user.email = req.email;

    user.setPassword( req.body.passport );

    user.save( (err) => {
        let token;
        token = user.genaratrJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
};

module.exports.login = function( req , res ) {
    passport.authenticate('local' , ( err , user , info ) => {
        let token ;
        if (err) {
            res.status(404).json(err);
            return;
        }
        if(user) {
            token = user.genaratrJwt();
            res.status(200);
            res.json( {
                "token" : token
            });
        } else {
            res.status(401).json(info);
        }
    })( req , res );
};