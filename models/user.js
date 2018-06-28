let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.method.setPassword = function( password ) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync( password , this.salt , 1000 , 64 , 'sha512').toString('hex');
};

userSchema.method.validPassword = function( password ) {
    let hash = crypto.pbkdf2Sync( password , this.salt , 1000 , 64 , 'sha512').toString('hex');
    return this.hash === hash ;
};

userSchema.method.genarateJwt = function() {
    let expiry = new Date();
    expiry.setDate( expiry.getDate() + 7); // valid for 7 days

    return jwt.sign( {
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt( expiry.getTime() / 1000 ),
    }, "secret"); // set secret as enviroment variable
};