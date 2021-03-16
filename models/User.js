const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const UserSchema = Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    googleId: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,

    },

    lastName: {
        type: String
    },
    
    image:{
        type:String
    },

    facebook_id: {
        type: String,
        require: true
    },
    username: {
        type: String
    },
    facebook_email: {
        type: String
    },
    facebook_profileurl: {
        type: String
    }
})

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('user', UserSchema);