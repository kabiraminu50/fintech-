const express = require('express');
const app = express();
app.use(express.json())
const port = 3000;
require ('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/auth',authroute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});