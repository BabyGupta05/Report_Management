import { useEffect,useState } from "react"
import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
const SubordinateReport = () => {
  const [reports,setReports]=useState([])
  
  useEffect(() => {
    getReports();
  }, []);
  const token = localStorage.getItem("token");
  const getReports = async () => {
    try {
      const res = await axios.get("http://localhost:8080/report/subordinateReports", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports(res.data.reports);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
    <h3> SubordinateReport </h3> 
    
    {reports &&
      reports.map((report) => (
        <div key={report._id} className="container">
          <p>Date: {report.date}</p>
          <p>Title: {report.title}</p>
          <p>Report: {report.report}</p>
          <p>subordinate: {report.email}</p>
        </div>
      ))}

      <span>click here to <Link to='/register'>Register subordinate</Link></span>
  </div>
  )
}

export default SubordinateReport