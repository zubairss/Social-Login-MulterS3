const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3')
require('dotenv').config();

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 's3-multer-upload-learn',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileExtension = "." + file.mimetype.split("/")[1];
            cb(null, req.params.id + "-" + (Date.now().toString().concat(fileExtension)));
        },

    })
});


module.exports = uploadS3;