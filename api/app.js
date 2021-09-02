// imports
const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const User = require('./models/User')

// created express app;
const app = express();
app.use(cookieParser());
// body parser inbuilt in express means we want to use json part of body parser.
app.use(express.json())

mongoose.connect('mongodb+srv://username:password@sl.fnwbh.mongodb.net/clustername?retryWrites=true&w=majority',()=>{
    console.log('Successfully connected to Database')
});

// Routes
const userRouter = require('./routes/User')
const todoRouter = require('./routes/Todo')
app.use('/user',userRouter)
app.use('/users',todoRouter)

app.listen(5000,()=>{
    console.log("Server started at port 5000");
});
