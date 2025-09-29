const mongoose = require("mongoose")

const connectDb = async (req,res) => {
    try { await mongoose.connect(process.env.MONGO_URL );
 console.log("DB connected")
      
    }
    catch(err){
        console.error("DB Connection Error:",err.message);

    }
}

module.exports = connectDb