const { func } = require('joi');
var jwt = require('jsonwebtoken');
const User = require("./user.model")


const authenticate = async (req, res, next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.body = user;
        next();
    })

}


const userExists = async (req, res, next) => {
    // res.send(req.params.id);
    const result = await User.find({ _id: req.params.id });
    if (result.length == 0) {
        res.send("User Not Found / Invalid Credentials");
    } else {
        console.log("User Exists MD");
        next();
    }
}


module.exports = { userExists, authenticate };






