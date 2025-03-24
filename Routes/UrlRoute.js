const express = require('express')
const { HandleUrl } = require('../Controllers/url')
const router = express.Router()


router.post('/' , HandleUrl)


module.exports = router