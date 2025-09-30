const Transaction = require("../Models/Transaction");
 const User = require("../Models/User");


 const transerMoney = async (req,res) => {
try{
const {receipientId,amount} = req.body

const senderId = req.user .senderId
// find sender and recipient
const sender = await User.findById(senderId);
const receipient = await User.findById(receipientId)

if (!sender || !receipient){
    res.status(400).json({
        success:false,
        messages:"sender or recipient not found"
    })
}

if (sender.balance < amount){
    return res.status(400).json({
        success:false,
        messages:"insuficient balance"
    })
}

// charges
const charges = 20

// deducting vaue from the sender
sender.balance -= (amount+charges)
await sender.save()


// adding value to the receipient
receipient.balance += amount
await receipient.save()

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
    receipient:receipient._id
});
await transaction.save()

res.json({messages:"Transfer Successfully",transaction})

}

catch(err){
    return res.status(500).json({
        success:false,
        messages:err.messages
    })
}
 };
