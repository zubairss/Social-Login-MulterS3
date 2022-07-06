var express = require('express');
var router = express.Router();
const { downloadUserImages, uploadUserImages } = require('./image.controller'); //controllers
const uploadS3 = require('../util/multer-s3');
const { userExists, authenticate } = require('../user/user.auth');
const validate = require('../user/user.validation');//validator
const validation = require('../user/userValidationSchema');//validationSchema


router.post('/userImages/:id', authenticate, validate(validation.userIdValidationSchema), userExists, uploadS3.array('image', 24), uploadUserImages);


router.get('/userImages/:id', authenticate, validate(validation.userIdValidationSchema), userExists, downloadUserImages);


// router.post('/userImages', uploadLocal.array('image', 24), (req, res) => {
//     console.log("Image Uploaded Succsess");
//     res.send("Image upload success")
// });

// router.post('/userImages', async (req, res) => {

//     const _image = new Image({
//         userId: req.body.userId,
//         images: [`S3URL1 - ${req.body.userId}}`, `S3URL2 - ${req.body.userId}}`, `S3URL3 - ${req.body.userId}}`]
//     })

//     try {
//         await _image.save();
//         res.send("Images Saved")

//     } catch (err) {
//         // throw err;
//         res.send(err)
//     }
// });



module.exports = router;
