import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate=useNavigate();
    const [loginData,setLoginData]=useState(
       { email:"",
        password:""}
    )
    const handleSubmit=async (e)=>{
      e.preventDefault();
      try {
        const res=await axios.post('http://localhost:8080/user/login',loginData);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("reportTo", res.data.reportTo);
        localStorage.setItem("email", res.data.email);
        if(res.data.role=="manager"){
          navigate("/reportee");
        }else if(res.data.role=="lead"){
          navigate("/reportee");
        }else if(res.data.role=="developer"){
          navigate('/reportIssue');
        }
      } catch (error) {
        console.log(error)
      }
    
    }
  return (
    <div>
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>
        <input type="password" placeholder="Password" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})}/>
        <input type="submit" value="Login" />
        
      </form>
    </div>
  );
};

export default Login;
