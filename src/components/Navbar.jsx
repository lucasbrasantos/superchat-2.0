import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">Superchat</span>
      <div className="user">
        <img  alt="profile picture" /> 
        <span  >user</span>
        <button onClick={() => { signOut(auth) }} >logout</button>
      </div>
    </div>
  )
}

export default Navbar