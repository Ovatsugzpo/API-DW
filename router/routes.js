var express = require("express")
var router = express.Router();
const multer = require('multer')
const config = require('../src/config/multer')
let postController = require('../controller/postController')
let videoController = require('../controller/videoController')

router.post('/video',multer(config).single('file'), postController.uploadVideo)
router.get('/video', videoController.video)

module.exports = router;