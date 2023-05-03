import React from 'react'
import Add from '../imgs/addAvatar.png';
import GoogleBtn from '../components/GoogleBtn';


import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {

    const handleButtonLoginGoogle = () => {

        signInWithPopup(auth, googleProvider);

    }


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
            </form>
            <p>Does not have an account? <a href="/register">register</a></p>
            <p>Or</p>
            <a className='btnGoogleWrapper' onClick={handleButtonLoginGoogle}><GoogleBtn/></a>
        </div>

    </div>
  )
}

export default Login