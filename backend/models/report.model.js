const mongoose =require('mongoose');
const reportSchema=new mongoose.Schema({
    date: {
        type: Date,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      issue: {
        type: String,
        required: true
      },
      email:{
        type:String,
        required:true
      },
      reportTo:{
        type:String,
        required:true,
      }
})

const reportModel=mongoose.model('report',reportSchema);
module.exports={
    reportModel
}