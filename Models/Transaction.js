const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    type:{
        type:String,
        enum:["deposit","transfer","withdraw"],
        require:true

    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    amount:{
        type:String,
        require:true
    }
   
}, {timestamps:true})

module.exports = mongoose.model("Transaction", transactionSchema);