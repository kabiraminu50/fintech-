const Transaction = require("../Models/Transaction");
 const User = require("../Models/User");
const mongoose = require("mongoose")

 const transferMoney = async (req,res) => {
try{
const {email,amount} = req.body

const senderId = req.user.id;
// find sender and recipient
const sender = await User.findById(req.user.id)
const recipient = await User.findOne({email})

if (!sender|| !recipient){
 return   res.status(400).json({
        success:false,
        message:"sender or recipient not found",
        
    })
}

if (sender.balance < amount){
    return res.status(400).json({
        success:false,
        messages:"insuficient balance"
    })
}
// preventing recipient to transfer to him self

if (sender._id.toString() === recipient._id.toString()){
    
    return res.status(400).json({
        success:false,
        message:"invalid Transfer Type"
    })
}

// transaction Limitt
 
if (amount >= 1000000){
    return res.status(400).json({
        success:false,
        message:"Transaction Limit Exceeded"
    })
}

if (amount <= 49){
    return res.status(400).json({
        success:false,
        message:"Minimum transfer amount is 50)"
    })
}



// charges
const charges = 20

// deducting vaue from the sender

const transferAmount = Number(amount)
console.log(typeof (sender.balance))
sender.balance -= transferAmount + charges
await sender.save()


// adding value to the receipient
recipient.balance += transferAmount
await recipient.save()

 // finding admin 
const admin = await User.findOne({role:"admin"})


if (admin){
    admin.balance += charges
    await admin.save()
}

// recording transaction 
const transaction =  new Transaction({
    userId: sender._id,
    type:"transfer",
    amount,
    recipient:recipient._id
});
await transaction.save()

res.json({messages:"Transfer Successfully",transaction})

}

catch(err){
    return res.status(500).json({
        success:false,
        messages:err.message
    })
}
 };

 module.exports = {transferMoney}