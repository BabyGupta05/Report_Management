require('dotenv').config();
const  mongoose = require('mongoose');
//Set up default mongoose connection
const DBConnect = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
        console.log("Db Connected")
    } catch (error) {
        console.log({error});
        
    }
 
} 

module.exports={
   DBConnect
}