const jwt = require("jsonwebtoken")

const authmiddleware = (req,res,next) => {

    const token = req.headers.authorization?.split(" ")[1];
    if (!token){
        return res.status(401).json({
            success:false,
            message:"token not provided"
        });
    }
    try{
        const decoded = jwt.verify(token,"anewsecret");
        req.user = decoded
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:err.message
        })
    }
}

module.exports = authmiddleware