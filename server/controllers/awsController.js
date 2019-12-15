const
    multer = require('multer'),
    awsPhotoUpload = require("../awsPhotoUpload");

const awsController = {

    picUpload: function (req, res) {

        console.log("req.file", req.file);

        if (!req.file || Object.keys(req.file).length === 0) {
            return res.status(400).send("No files were uploaded.");
        }

        awsPhotoUpload(req, res);
    }
};

module.exports = awsController;