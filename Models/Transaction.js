const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    type:{
        type:String,
        enum:["deposit","transfer","withdraw"],
        require:true

    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
   
}, {timestamps:true})

module.exports = mongoose.model("Transaction", transactionSchema);