var express = require('express');
var router = express.Router();
const { getAllUsers, getSocialUsers, localSignup, localLogin, getUserImages, setUserImages } = require('./user.controller'); //controllers
const validate = require('./user.validation');//validator
const validation = require('./userValidationSchema');//validationSchema
//authenticator
const { authenticate } = require('./user.auth');
const passport = require('passport');
require('../util/passport-setup');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('Users Route');
});

/* GET all users */
router.get('/all', authenticate, getAllUsers);

/* GET SOCIAL USERS */

router.get('/socialUsers', authenticate, getSocialUsers);

/* CREATE Local User -- SIGNUP */

router.post('/localSignup', validate(validation.userValidationSchema), localSignup);

/* Local LOGIN */

router.post('/localLogin', validate(validation.userLoginValidationScheme), localLogin);

/* CREATE SOCIAL USER  -- SOCIAL Auth */

// router.get('/googleAuth', googleAuth);
router.get('/googleAuth', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/googleAuth/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3100/users/failedLoginGoogle', session: false }),
    (req, res) => {
        res.send({ message: "Google Login Successful", ...req.user })
    });

// http://localhost:3100/users/googleAuth

router.get('/failedLoginGoogle', (req, res) => res.send("Google Login Failed"));



module.exports = router;
