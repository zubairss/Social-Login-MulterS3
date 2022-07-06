const User = require("./user.model")
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { connect } = require("mongoose");
const { func } = require("joi");

const allUsers = async () => await User.find();

const socialUsers = async () => await User.find({ type: "Social" });

const localSignUp = async (user) => {

    const newUser = { ...user, type: "Normal" }
    const _user = new User(newUser);
    try {
        await _user.save();
        const accessToken = jwt.sign(newUser, process.env.SECRET_TOKEN);
        return {
            message: "User Created Successfully",
            accessToken: accessToken
        }
    } catch (err) {
        return "User Not Created"
    }

};

const localLogIn = async (userCredentials) => {
    const result = await User.find({ email: userCredentials.email });
    if (result.length == 0) {
        return "User Not Found / Invalid Credentials"
    } else {
        if (await bcrypt.compare(userCredentials.password, result[0].password)) {

            const userResult = {
                _id: result[0].id,
                email: result[0].email,
                password: result[0].password,
                name: result[0].name,
                type: result[0].type,
                gender: result[0].gender
            }
            // console.log(userResult)
            const accessToken = jwt.sign(userResult, process.env.SECRET_TOKEN);
            return {
                user: result[0],
                message: "Login Succesful",
                authToken: accessToken
            }
        } else {
            return "Incorrect Password";
        }
    }

};

const googleAuthUserCreate = async (user) => {
    const newUser = {
        email: user.profile._json.email,
        googleID: user.profile.id,
        name: user.profile.displayName,
        type: "Social"
    };

    const _user = new User(newUser);

    try {
        await _user.save();
        const accessToken = jwt.sign(newUser, process.env.SECRET_TOKEN);
        return {
            message: "User Created Successfully",
            user: newUser,
            // googleAccessToken: user.accessToken,
            accessToken: accessToken
        }
    } catch (err) {
        console.log(err)
        return "User Not Created"
    }

    // console.log(newUser);
    // return user;
};




// http://localhost:3100/users/googleAuth

module.exports = {
    allUsers,
    socialUsers,
    localSignUp,
    localLogIn,
    googleAuthUserCreate
}


