const express =require('express');
const cors=require('cors')
const {DBConnect}=require('./db')
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
DBConnect();

app.use('/user',userRouter);

app.listen(process.env.config,()=>{
    console.log("server started ")
})