const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20')
const FacebookStrategy = require('passport-facebook');
const configAuth = require('./auth');
const User = require('../models/User');


//GOOGLE AUTHENTICATION

passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
},
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        console.log(profile);

        User.findOne({ googleId: profile.id }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (user) {
                done(null, user)
            }
            else {
                const newUser = new User({
                    googleId: profile.id,
                    username: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image:profile.photos[0].value

                })

                newUser.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        done(null, newUser)
                    }
                })
            }
        })
    }


))

//FACEBOOK AUTHENTICATION

passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileURL: configAuth.facebookAuth.profileURL,
    profileFields: configAuth.facebookAuth.profileFields
},
    function (accessToken, refreshToken, profile, done) {
        console.log(accessToken)
        console.log(profile)
        User.findOne({ facebook_id: profile.id }, (err, user) => {
            if (err) {
                return done(err)
            }
            if (user) {
                done(null, user)
            }
            else {
                const newUser = new User({
                    facebook_id: profile.id,
                    username: profile.name.givenName,
                    facebook_email: profile.emails[0].value,
                    facebook_profileurl: profile.photos[0].value
                })
                newUser.save(function (err) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        done(null, newUser)
                    }
                })
            }
        })
    }
))



module.exports = passport;
