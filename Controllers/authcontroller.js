const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Registering a new user as a customer
const  register = async (req,res)  =>{
    try{
        const {firstName,lastName,email,BVN,password,role} = req.body;

//checking if user already exist

 const existingUser = await User.findOne({email})
if (existingUser)
{

return res.status(400).json({
        success:false,
        message:"user already exists"
    })
}

 // Saves new user in DB
const newUser = new User({firstName,lastName,email,BVN,password,role})
await newUser.save()

return res.status(201).json({
    success:true,
    message:"User registered sucessfully"
})

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
    

// login funtionality

const login = async (req,res) => {

    try{
const  {email,password} = req.body;

    // checking login credentils
    if (!email || !password)
    {
        res.status(400).json({
            success:false,
            message:"invalid credentials"

        })
    }

// find user and include password filed

const user = await user.findOne({email}).select(("+password"));

if (!user){
    return res.status(400).json({
        success:false,
        message:"invalid credentials"
    });
}


// generating jwt

 const token = jwt.sign({id: User._id, role: User.role}, "anewsecret", {expiresIn: '5h'})

        return res.status(200).json({
            token
        })


    }
    catch(err){
res.status(500).json({
 message:"something whent wrong"   
})
    }

}


// login user profile

const prof = async (req, res) => {
    try{
        const id = req.user.id 
        
        const user = await user.findByid(id).select("-password");// hide password
if (!user){
    
    return res.status(400).json({
        success:false,
        message:"user not found"
    });
}
       return res.status(200).json({
        success:true,
        user,
       });    
        

            
        }
    
    catch(err){
        return res.status(500).json({
            success:false,
            message: err.message
        })
    }
}




module.exports = {register,login,prof}