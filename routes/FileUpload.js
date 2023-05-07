const express = require("express");
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload, imageSizeUploader,} = require("../controllers/fileUpload");

//api route
router.post("/localFileUpload", localFileUpload);
// router.route("/localFileUpload").post(localFileUpload).get(localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeUploader", imageSizeUploader);



module.exports = router;