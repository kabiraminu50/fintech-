const Transaction = require("../Models/Transaction");
 const User = require("../Models/User");
const mongoose = require("mongoose")

 const transerMoney = async (req,res) => {
try{
const {recipientId,amount} = req.body

const senderId = req.user._id;
// find sender and recipient
const sender = await User.findById(senderId);
const recipient = await User.findById(recipientId)

if (!sender || !recipient){
 return   res.status(400).json({
        success:false,
        message:"sender or recipient not found"
    })
}

if (sender.balance < amount){
    return res.status(400).json({
        success:false,
        messages:"insuficient balance"
    })
}
// preventing recipient to transfer to him self

if (recipient._id.toString() === senderId.toString()){
    
    return res.status(400).json({
        success:false,
        message:"invalid Transfer Types"
    })
}

// transaction Limitt
 
if (amount >= 1000000){
    return res.status(400).json({
        success:false,
        message:"Transaction Limit Exceeded"
    })
}

if (amount <= 50){
    return res.status(400).json({
        success:false,
        message:"Minimum transfer amount is 50)"
    })
}



// charges
const charges = 20

// deducting vaue from the sender
sender.balance -= (amount+charges)
await sender.save()


// adding value to the receipient
recipient.balance += amount
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

 module.exports = {transerMoney}