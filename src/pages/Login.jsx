import React from 'react'
import Add from '../imgs/addAvatar.png';
import GoogleBtn from '../components/GoogleBtn';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';

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