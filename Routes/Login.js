const express = require('express')
const { route } = require('./UrlRoute')
const  {loginUser} = require('../Controllers/SIngupUser')
const router = express.Router()


router.post('/' , loginUser)

router.get('/' , (req ,res)=>{
    res.render('Login')
})

module.exports = router