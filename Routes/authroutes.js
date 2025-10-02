const express = require("express")
const router = express.Router()
const {register,login,prof} = require("../Controllers/authcontroller")
const {transerMoney} = require("../Controllers/transfer")
const authmiddleware = require("../Middleware/authmiddleware")

router.post("/register",register);
router.post("/login",login);
router.post("/profile",authmiddleware,prof);
router.post("/transferMoney",transerMoney)

module.exports = router
