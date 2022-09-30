import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../pages/AuthContext'
import './components.css'

const Navbar = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  console.log(user);
  return (
    <div className='navbar'>
      <div className="navContainer">
         <Link to='/' style={{color:"inherit",textDecoration:"none"}}>
        <span className='logo'>Booking App</span>
        </Link>
            {user?(<button className="headerBtn">{user.username}</button>
) : 
            (<div className="Header">
                <Link to={'/register'}><button className="headerBtn">Register</button></Link>
                <Link to={'/login'}><button className="headerBtn">Login</button></Link>
            </div>)}
        
      </div>
    </div>
  )
}

export default Navbar
