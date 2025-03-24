const express = require('express')
const { model } = require('mongoose')
const { CreateUser } = require('../Controllers/SIngupUser')
const router = express.Router()


router.post('/' , CreateUser )

router.get('/' , (req ,res)=>{
    res.render('signup')
})

module.exports = router