let mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
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
}