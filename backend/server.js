const express =require('express');
const {Auth} =require('./controller/middleware/Auth')
const cors=require('cors')
const {DBConnect}=require('./db')
DBConnect();
const PORT=8080
const app=express();
require('dotenv').config();
const {userRouter}=require('./Routes/user.route')
const { reportRouter } = require('./Routes/report.route');

app.use(express.json());
app.use(cors());


app.use('/user',userRouter);
app.use(Auth);
app.use('/report',reportRouter)
app.listen(PORT,()=>{
    console.log("server started ")
})