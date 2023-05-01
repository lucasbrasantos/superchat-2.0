import React, { useState } from 'react'
import Add from '../imgs/addAvatar.png';
import Swal from 'sweetalert2'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Register = () => {
    const [err, setErr] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            Swal.fire(
                'Success',
                ' ',
                'success'
              )
          })
          .catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`${errorCode}\n${errorMessage}`);
            setErr(true);

            errorCode == "auth/invalid-email" ? Swal.fire({
                title: 'Error!',
                text: "Invalid Email",
                icon: 'error',
                confirmButtonText: 'Return'
            })
            : errorCode == "auth/weak-password" ? Swal.fire({
                title: 'Error!',
                text: `Weak Password, password should be at least 6 characters`,
                icon: 'error',
                confirmButtonText: 'Return'
            })
            : errorCode == "auth/email-already-in-use" ? Swal.fire({
                title: 'Error!',
                text: `Email Already In Use! try again with another email`,
                icon: 'error',
                confirmButtonText: 'Return'
            })            
            : console.log(`${errorCode}\n${errorMessage}`);



          });
        
    }
    


  return (
    <div className='formContainer'>

        <div className="formWrapper">
            <span className='logo'>Superchat 2.0</span>
            <hr />
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input style={{display:'none'}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button >Sign up</button>
            </form>
                {err && <span className='error'>something went wrong! </span>}
            <p>Do you have an account? Login</p>
        </div>

    </div>
  )
}

export default Register