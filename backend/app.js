require ('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("./db/conn");
const users = require('./models/userSchema');
const cors = require('cors');
// const router = require("./routes/router");

const port = 8000;

app.use(cors());
app.use(express.json());
app.use(require('./routes/router'));


 app.listen(port,()=>{
    console.log(`server is started at port number ${port}`);
 });