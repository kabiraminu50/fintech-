const express = require("express")
const router = express.Router()
const {register,login,prof} = require("../Controllers/authcontroller")
const {transerMoney} = require("../Controllers/transfer")
const authmiddleware = require("../Middleware/authmiddleware")
const {getMe} = require("../Controllers/userController")
router.post("/register",register);
router.post("/login",login);
router.get("/prof",authmiddleware,prof);
router.post("/transferMoney",authmiddleware,transerMoney)
router.get("/getMe",getMe)

module.exports = router
