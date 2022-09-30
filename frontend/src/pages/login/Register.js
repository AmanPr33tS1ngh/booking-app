import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

const Register = () => {
    const [credentials,setCredentials]=useState({
        username:undefined,
        email:undefined,
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
            const res=await axios.post("/api/auth/register",{
                username:credentials.username,
                email:credentials.email,
                password:credentials.password,
                isAdmin:false,
            })
            localStorage.setItem('user',JSON.stringify({username:credentials.username,
                email:credentials.email,
                password:credentials.password,
                isAdmin:false}))

            console.log(res);
            // dispatch({type:"LOGIN_SUCCESS",payload:res.data})
            navigate("/");
        }catch(err){
            // dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
            console.log(err);
        }
    }
    console.log(credentials);
  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" className="lInput" placeholder='username' id='username' onChange={handleChange}/>
        <input type="password" className="lInput" placeholder='password' id='password' onChange={handleChange}/>
        <input type="email" className="lInput" placeholder='email' id='email' onChange={handleChange}/>
        <button disabled={loading} onClick={handleClick} className="lButton">
            Login
        </button>
      </div>
    </div>
  )
}

export default Register

