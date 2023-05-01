import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className="logo">Superchat</span>
      <div className="user">
        <img  alt="a" /> 
        <span  >user</span>
        <button  >logout</button>
      </div>
    </div>
  )
}

export default Navbar