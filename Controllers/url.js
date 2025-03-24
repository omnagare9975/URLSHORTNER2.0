const express = require('express')
const mongoose = require('mongoose')
const {UrlModel} = require('../Models/url')
const shortid  = require('shortid')


const HandleUrl = async(req , res)=>{
    const {url} = req.body;
    console.log(url)
    const ID = shortid.generate();

    await UrlModel.create({
        ShortURL : ID,
        ReDirect : url,
        VistedHistory : []
    })
      
    if(!url){
       return res.status(400).json({Error: 'Enter The URL'})
    }
    return res.render('main' , {ids: ID})
}
  
module.exports = { HandleUrl,}





