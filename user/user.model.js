const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { func } = require('joi');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: "Email Address is required",
        validate: [isEmail, 'Enter a valid email'],
        unique: true
    },
    googleID: String,
    password: String,
    name: {
        type: String,
        reqruired: true
    },
    type: {
        type: String,
        enum: ["Normal", "Social"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(8);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("PRE MD")
    next();
})

// userSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// })

const User = mongoose.model('User', userSchema);
module.exports = User;
