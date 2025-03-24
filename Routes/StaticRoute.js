const express = require('express')
const router = express.Router()
const {  UrlModel } = require('../Models/url');

router.get('/' ,async (req ,res)=>{
    const Result = await UrlModel.find({})

     res.render('main' , {
        urls: Result
     } )
}
)

module.exports = router