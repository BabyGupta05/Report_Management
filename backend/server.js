const express =require('express');
const cors=require('cors')
const {DBConnect}=require('./db')
DBConnect();
const PORT=8080
const app=express();
require('dotenv').config();
const {userRouter}=require('./Routes/user.route')


app.use(express.json());
app.use(cors());


app.use('/user',userRouter);

app.listen(PORT,()=>{
    console.log("server started ")
})