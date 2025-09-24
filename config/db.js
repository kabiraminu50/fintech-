const mongoose = require("mongoose")

const connectDb = async (req,res) => {
    try{ await mongoose.connect(process.env.MONGO_URL) 

        console.log("db connected")
    }
    catch(err){
        err.message
    }
}

module.exports = connectDb