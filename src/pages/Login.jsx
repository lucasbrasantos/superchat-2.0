import React, { useState } from 'react'
import Add from '../imgs/addAvatar.png';
import Swal from 'sweetalert2'
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

            .then((response) => {
                setErr(false);
                const res = response;
                
                // console.log(res);                
                // Swal.fire('Success', ' ', 'success');
                navigate("/");

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}\n${errorMessage}`);
                setErr(true);

                errorCode === 'auth/user-not-found' ? Swal.fire({
                    title: 'Error!',
                    text: "User not found",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === 'auth/wrong-password' ? Swal.fire({
                    title: 'Error!',
                    text: "Wrong password",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === 'auth/missing-password' ? Swal.fire({
                    title: 'Error!',
                    text: "Missing password",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === 'auth/invalid-email' ? Swal.fire({
                    title: 'Error!',
                    text: "Invalid email",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === 'auth/too-many-requests' ? Swal.fire({
                    title: 'Error!',
                    text: "Access to this account has been temporarily disabled due to many failed login attempts. Please, try again later.",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : console.log(`${errorCode}\n${errorMessage}`);


            })
            

        }catch(err){
            setErr(true)
            console.log(`erro: ${err}`);                        
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
            {err && <span className='error'>something went wrong!</span>}
            <p>Does not have an account?  <Link to="/register">Register</Link></p>
            <p>Or</p>
            <a className='btnGoogleWrapper' onClick={handleButtonLoginGoogle}><GoogleBtn/></a>
        </div>

    </div>
  )
}

export default Login