import React, { useState } from 'react'
import Add from '../imgs/addAvatar.png';
import GoogleBtn from '../components/GoogleBtn';

import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleButtonLoginGoogle = () => {
        
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(async(result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            // console.log(credential);
            // console.log(token);
            // console.log(user);

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid, 
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            });


            navigate("/");

        }).catch((error) => {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email
            const credential = GoogleAuthProvider.credentialFromError(error);
            return;
        });
    }

    const [err, setErr] = useState()
    const handleSubmit = async(e) => {
        setErr(false);
        e.preventDefault();
        
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password)

            navigate("/")

        }catch(err){
            setErr(true)
            console.log(err);
        }
        
    }

  return (    

    <div className='formContainer'>

        <div className="formWrapper">
            <span className='logo'>Superchat 2.0</span>
            <hr />
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <button >Sign in</button>
            </form>
            <p>Does not have an account?  <Link to="/register">Register</Link></p>
            <p>Or</p>
            <a className='btnGoogleWrapper' onClick={handleButtonLoginGoogle}><GoogleBtn/></a>
        </div>

    </div>
  )
}

export default Login