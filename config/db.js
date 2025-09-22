const mongoose = require("mongoose")

const connectDb = async (req,res) => {
    try{ await mongoose.connect.env.MONGO_URL}
    catch(err){
        err.message
    }
}

module.exports = connectDb