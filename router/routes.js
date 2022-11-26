var express = require("express")
var router = express.Router();
const multer = require('multer')
const config = require('../src/config/multer')
let postController = require('../controller/postController')
let epsController = require('../controller/epsController')

router.post('/episode',multer(config).single('file'), postController.uploadEpisode)

router.get('/eps', epsController.AllEpisodes)
router.get('/temps', epsController.AllTemps)
router.get('/ep/:ep/:temp?', epsController.ChooseEp)
router.get('/temp/:temp', epsController.ChooseTemp)

module.exports = router;