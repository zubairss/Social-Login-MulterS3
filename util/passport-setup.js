const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleAuthUserCreate } = require('../user/user.service');


passport.use(new GoogleStrategy({
    clientID: "452969629851-acnjbctbeu39gb9daei41rtr9h5lgn7p.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3100/users/googleAuth/callback"
},
    async function (accessToken, refreshToken, profile, cb) {

        const user = { accessToken, refreshToken, profile }

        const result = await googleAuthUserCreate(user);
        console.log(result);
        return cb(null, result);

    }
));

// http://localhost:3100/users/googleAuth