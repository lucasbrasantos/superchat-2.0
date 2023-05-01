import React from 'react'
import Add from '../imgs/addAvatar.png';

const Login = () => {
  return (
    <div className='formContainer'>

        <div className="formWrapper">
            <span className='logo'>Superchat 2.0</span>
            <hr />
            <span className='title'>Login</span>
            <form action="">
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button>Sign in</button>
                <button>Sign in with google</button>
            </form>
            <p>Do you have an account? Register</p>
        </div>

    </div>
  )
}

export default Login