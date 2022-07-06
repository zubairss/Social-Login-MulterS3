const Joi = require('joi');
const pick = require("../util/pick");
const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
    console.log(schema.body, schema.params, schema.query)
    const validSchema = pick(schema, ["params", "query", "body"]); const object = pick(req, Object.keys(validSchema));
    console.log(schema.body);
    console.log(req.body)

    const { value, error } = Joi.compile(validSchema).prefs({ errors: { label: "key" } }).validate(object);
    if (error) {
        const errorMessage = error.details
            .map((details) => {
                if (details && details.message && details.message.includes('ref:')) {
                    details.message = details.message.replace('"', "").replace("ref:", '')
                    return details.message
                } else {
                    //details.message?details.message.replace(/\\$/,''):''
                    if (details.message.includes == '"') {
                        return details.message.replaceAll('"', "")
                    } else {
                        return details.message
                    }

                }
            })
            .join(", ");

        // return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        // res.send("Validation Error");
        res.send({
            Error: "Validation Error",
            // Message: value
        })
        return
        // return next("Error")
    }
    Object.assign(req, value); return next();
};

module.exports = validate;


