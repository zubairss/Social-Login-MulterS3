const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3')

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIAWHR6MX2D3J54P4VW',
        secretAccessKey: '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',
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