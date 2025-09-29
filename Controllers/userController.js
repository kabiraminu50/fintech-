const User = require("../Models/User")

const getMe = async (req,res) => {
    try{
const user = await User.findById(req.User).select("-password");
if (!user) {
  return  res.status(400).json({
        success:false,
        message:"User not find"
    })
}
    }
    catch(err){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
}


module.exports = {getMe};