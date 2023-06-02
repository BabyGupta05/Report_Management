import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [signUpData,setsignUpData]=useState(
       {fname:"",
        lname:"",
        email:"",
        password:"",
        role:"",
        reportTo:""
      }
    )
    useEffect(() => {
      const email = localStorage.getItem("email");
      if (email) {
        setsignUpData({
          ...signUpData,
          reportTo: email
        });
      }
    }, []);
    const navigate=useNavigate();
    
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const res=await axios.post('http://localhost:8080/user/signup',signUpData);
      console.log(res);
      setsignUpData( {fname:"",
      lname:"",
      email:"",
      password:"",
      role:"",
      reportTo:""})
      
    }
    const getRoleOptions = () => {
      const Role = localStorage.getItem("role");
      if (Role === "manager") {
        return (
          <>
            <option value="">Select Role</option>
            <option value="lead">Lead</option>
            <option value="developer">Developer</option>
          </>
        );
      } else if (Role === "lead") {
        return (
          <>
            <option value="">Select Role</option>
            <option value="developer">Developer</option>
          </>
        );
      } 
    };
  return (
    <div>
      <h3>Registe subordinates</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={signUpData.fname} onChange={(e)=>setsignUpData({...signUpData,fname:e.target.value})}/>
        <input type="text" placeholder="Last Name" value={signUpData.lname} onChange={(e)=>setsignUpData({...signUpData,lname:e.target.value})}/>
        <input type="email" placeholder="Email" value={signUpData.email} onChange={(e)=>setsignUpData({...signUpData,email:e.target.value})}/>
        <input type="password" placeholder="Password" value={signUpData.password} onChange={(e)=>setsignUpData({...signUpData,password:e.target.value})}/>

        <select name="role" value={signUpData.role} onChange={(e)=>setsignUpData({...signUpData,role:e.target.value})}>
          
          {getRoleOptions()}
        </select>
        <input type="text" placeholder="Report To" value={signUpData.reportTo} onChange={(e)=>setsignUpData({...signUpData,reportTo:e.target.value})}/>
        <input type="submit" value="signup" />
        
      </form>
    </div>
  );
};

export default Signup;