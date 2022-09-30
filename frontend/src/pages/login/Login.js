import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

const Login = () => {
    const [credentials,setCredentials]=useState({
        username:undefined,
        password:undefined,
    })

    const {user,loading,error,dispatch}=useContext(AuthContext);

    const navigate=useNavigate();

    const handleChange=(e)=>{
        setCredentials(prev=>({...prev,[e.target.id]:e.target.value}))
    }
    const handleClick=async (e)=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
          const res=await axios.post("/auth/login",credentials)
          console.log(res);
          localStorage.setItem('user',JSON.stringify(credentials))

            // dispatch({type:"LOGIN_SUCCESS",payload:res.data})
          }catch(err){
            // dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
            console.log(err);
          }
          navigate("/");
    }
  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" className="lInput" placeholder='username' id='username' onChange={handleChange}/>
        <input type="password" className="lInput" placeholder='password' id='password' onChange={handleChange}/>
        <button disabled={loading} onClick={handleClick} className="lButton">
            Login
        </button>
      </div>
    </div>
  )
}

export default Login
