const mongoose = require('mongoose')
const  {UserModel} = require('../Models/signup')
const bcrypt = require('bcrypt')

const {setUser , GetUser} = require('../service/auth')

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
          if (err){
            console.log(`Failed to generate`)
          }
          if( !Result){
            return res.send("Incorrectuser And Pass")
          }

        const SesionID =  uuidv4()
        setUser(SesionID , finduser)
        res.cookie("uid" , SesionID)
        return res.redirect('http://localhost:8000/urlshortner')
          
    })
    

    
} 

module.exports = {CreateUser, loginUser}

