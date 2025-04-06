const mongoose = require('mongoose')
const  {UserModel} = require('../Models/signup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {setUser , GetUser} = require('../service/auth')
const  secreteTable = 'omnagare'
const { v4: uuidv4 } = require('uuid');

const CreateUser = async (req , res) =>{
    const {name , email , password} = req.body
    const gensalt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password , gensalt)


    const userCreated = await UserModel.create({
        name,
        email,
        password : hashpassword
    })
    
    if (userCreated && userCreated.id) {  // Assuming 'id' exists when user is created
        
        res.redirect('/');
    } else {
        res.json({ message: "Failed to Generate User" });
    }
    
    
}

const loginUser = async (req ,res)=>{
    const {email , password} = req.body

    const finduser = await UserModel.findOne({email})

    const Result = bcrypt.compare(password , finduser.password , (err , Result) =>{
        const SingedUser = {email: finduser.email , name: finduser.name }


        if (!Result){
            res.send('Password is Wrong')
        }

        token = jwt.sign(SingedUser , secreteTable)

        res.cookie('_uid' , token)

        res.redirect('/urlshortner')
        
          
    })
    

    
} 

module.exports = {CreateUser, loginUser}

