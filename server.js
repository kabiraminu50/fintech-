const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;
require ('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { register, login, prof } = require('./Controllers/authcontroller');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/auth',authroute)
app.use('/api/v1/register',register)
app.use('/api/v1/login',login)
app.use('/api/v1/prof',prof)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});