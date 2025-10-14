const express = require("express")
const router = express.Router()
const {register,login,prof} = require("../Controllers/authcontroller")
const {transferMoney} = require("../Controllers/transfer")
const authmiddleware = require("../Middleware/authmiddleware")
const {getMe,updateProfile} = require("../Controllers/userController")

// Authentication & User Management
router.post("/register",register);
router.post("/login",login);
router.get("/prof",authmiddleware,prof);
router.get("/getMe",authmiddleware,getMe)
// 

// User profile & KYC
router.get("/prof",authmiddleware,prof);
router.put("/updateProfile",authmiddleware,updateProfile)

// Wallet/Account

// payment and Transfer
router.post("/transferMoney",authmiddleware,transferMoney)
// Dashboard & Analytics

module.exports = router
