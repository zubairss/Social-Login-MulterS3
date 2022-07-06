var express = require('express');
var router = express.Router();
const { allUsers, socialUsers, localSignUp, localLogIn, googleAuthUserCreate } = require('./user.service'); //services
const passport = require('passport');
require('../util/passport-setup');


const getAllUsers = async (req, res) => {

    const result = await allUsers()
    res.send(result);
}


const getSocialUsers = async (req, res) => {

    const result = await socialUsers()
    res.send(result);
}


const localSignup = async (req, res) => {
    const result = await localSignUp(req.body);
    res.send(result);
}


const localLogin = async (req, res) => {

    const result = await localLogIn(req.body)
    res.send(result);
}




module.exports = {
    getAllUsers,
    getSocialUsers,
    localSignup,
    localLogin
    // googleAuth,
    // googleAuthCallback
}




