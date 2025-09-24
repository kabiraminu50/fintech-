const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require("dotenv")
const authroute = require("./Routes/authroutes");
const port = 3000;
require ('dotenv').config();
const mongoose = require('mongoose');
const connectDb = require('./config/db');
connectDb();
const jwt = require('jsonwebtoken');


app.use('/api/v1/auth',authroute)


app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});