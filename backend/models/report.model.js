const mongoose =require('mongoose');
const reportSchema=new mongoose.Schema({
    date: {
        type: Date,
        required: true
      },
      heading: {
        type: String,
        required: true
      },
      note: {
        type: String,
        required: true
      },
      email:{
        type:String,
        required:true
      }
})

const reportModel=mongoose.model('report',reportSchema);
module.exports={
    reportModel
}