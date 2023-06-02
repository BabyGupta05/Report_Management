const { Router } = require("express");
const reportRouter = Router();
const { reportModel } = require("./../models/report.model");

reportRouter.get("/", async (req, res) => {
  try {
    const report = await reportModel.find({ email: req.body.email });
    res.status(200).send({reports:report});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
reportRouter.get("/subordinateReports", async (req, res) => {
  try {
    const report = await reportModel.find({ reportTo: req.body.email });
    res.status(200).send({reports:report});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
reportRouter.post("/create", async (req, res) => {
  try {
    const{date,title,report,email,reportTo}=req.body;
    const newReport=await reportModel({date,title,report,email,reportTo});
    await newReport.save();
    res.status(200).send({message:"Report created!",newReport});
  } catch (error) {
    res.status(500).send("Internal Server Error");

  }
});
reportRouter.delete("/delete/:reportId", async (req, res) => {
    try {
     const {reportId}=req.params;
     const email=req.body.email;
     const deleteReport= await reportModel.deleteOne({_id:reportId,email:email});
     if(deleteReport)
     {
        return res.status(200).send({message:"delete successful","report":deleteReport});
     }else{
        return res.status(500).send({message:"delete failed"});
     }
   
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });
  reportRouter.patch("/edit/:reportId", async (req, res) => {
    try {
     const {reportId}=req.params;
     const email=req.body.email;
     const filter ={_id:reportId,email:email};
     const update = {title:req.body.title,report:req.body.report};
     const updateReport= await reportModel.findOneAndUpdate(filter,update);
     if(updateReport)
     {
        return res.status(200).send({message:"update successful","report":updateReport});
     }else{
        return res.status(500).send({message:"update failed"});
     }
    
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  });

  
module.exports = {
    reportRouter,
};
