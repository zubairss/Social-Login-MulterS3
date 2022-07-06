var express = require('express');
var router = express.Router();
const { getUserImages, putUserImages } = require('./image.service');
const Image = require('./image.model');

const downloadUserImages = async (req, res) => {


    const result = await getUserImages(req.params.id);
    res.send(result);


}

const uploadUserImages = async (req, res) => {

    const result = await putUserImages(req.params.id, req.files);

    res.send(result);

}

module.exports = {
    downloadUserImages,
    uploadUserImages
}
