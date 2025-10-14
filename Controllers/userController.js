const User = require("../Models/User")
 
const mongoose = require("mongoose")

// fecthing loggen user details

const getMe = async (req,res) => {
    try{
        
const user = await User.findById(req.user.id).select("-updatedAt -createdAt +password -firstName -lastName -_id -BVN -role -balance ");
if (!user) {
  return  res.status(400).json({
        success:false,
        message:"user not find"
    })
    
}
return res.status(200).json({
    success:true,
    user
})


    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}

// updating user data
const updateProfile =  async (req,res) => {
try{

   // verifying user 
    const user = await User.findById(req.user.id)

     if (!user){
        return res.status(404).json({
            success:false,
            message:"message user not found"
        })
    }

// user data that can be updated
    const {firstName,lastName,email} = req.body
    
    if (firstName)
user.firstName = firstName;
    if (lastName) user.lastName =lastName;
    if (email) user.email = email;

    await user.save()
    



}catch(err){
    err.message
}

} 


module.exports = {getMe,updateProfile};