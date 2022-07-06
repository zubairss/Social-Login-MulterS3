const { JSONInput } = require('@aws-sdk/client-s3');
const Joi = require('joi');
const objectID = require('mongoose').Types.ObjectId;

const userValidationSchema = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        googleID: Joi.string(),
        password: Joi.string(),
        name: Joi.string().required(),
        type: Joi.allow('Normal', 'Social'),
        gender: Joi.allow('Male', 'Female')
    }).min(1)
}

const userLoginValidationScheme = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).min(1)
}


const userIdValidationSchema = {
    params: Joi.object().keys({
        id: Joi.custom((value, helper) => {
            if (objectID.isValid(value)) {
                return value;
            } else {
                return helper.error();
            }
        })
    }).min(1)
}

module.exports = { userValidationSchema, userLoginValidationScheme, userIdValidationSchema };