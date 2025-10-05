const express = require("express")
const router = express.Router()
const {register,login,prof} = require("../Controllers/authcontroller")
const {transferMoney} = require("../Controllers/transfer")
const authmiddleware = require("../Middleware/authmiddleware")
const {getMe} = require("../Controllers/userController")

// Authentication & User Management
router.post("/register",register);
router.post("/login",login);
router.get("/prof",authmiddleware,prof);
router.get("/getMe",getMe)
// 

// User profile & KYC

// Wallet/Account

// payment and Transfer
router.post("/transferMoney",authmiddleware,transferMoney)
// Dashboard & Analytics

module.exports = router
