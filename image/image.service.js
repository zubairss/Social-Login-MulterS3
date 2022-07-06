const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Image = require('./image.model');
const User = require('../user/user.model');


const putUserImages = async (userId, files) => {


    if (files == undefined) {
        return { message: "No File Uploaded" };
    }

    const result = {
        message: 'Successfully uploaded',
        urls: files.map(function (file) {
            return { url: file.location, name: file.key, type: file.mimetype, size: file.size };
        })
    }
    const imagesURLs = files.map((file) => file.location);

    const imageData = await Image.find({ userId: userId });
    if (imageData.length == 0) {
        const newUserImages = new Image({
            userId: userId,
            images: imagesURLs
        })
        await newUserImages.save();
        return result;

    } else {
        imagesURLs.map(async (url) => {
            await Image.updateOne({ userId: userId }, { $push: { images: url } });
        });
        return result;
    }
}


const getUserImages = async (userID) => {
    const userImages = await Image.aggregate(
        [
            { '$match': { 'userId': mongoose.Types.ObjectId(userID) } },
            {
                '$lookup': {
                    'from': 'users',
                    'localField': 'userId',
                    'foreignField': '_id',
                    'as': 'userDetails'
                }
            }, {
                '$project': {
                    'userId': 1,
                    'userDetails.name': 1,
                    'userDetails.type': 1,
                    'images': 1,
                    'numberOfImages': {
                        '$size': '$images'
                    }
                }
            }
        ]
    )
    return userImages[0];
}




module.exports = {
    getUserImages,
    putUserImages
}
