const express = require("express")
const router = express.Router()
const {register,login,prof} = require("../Controllers/authcontroller")
const {} = require("../Middleware/authmiddleware")
const authmiddleware = require("../Middleware/authmiddleware")

router.post("/register",register);
router.post("/login",login);
router.post("/profile",authmiddleware,prof);

module.exports = router
