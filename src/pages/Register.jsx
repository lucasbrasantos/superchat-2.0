import React, { useState } from 'react'
import Add from '../imgs/addAvatar.png';
import Swal from 'sweetalert2'
import GoogleBtn from '../components/GoogleBtn';

import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db, googleProvider } from "../firebase";
import {  useNavigate } from 'react-router-dom';


const Register = () => {


    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleButtonLoginGoogle = () => {

        signInWithPopup(auth, googleProvider);

    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try {
            
            let user;
            const res = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                user = userCredential.user;
                console.log(user);
                Swal.fire(
                    'Success',
                    ' ',
                    'success'
                );
            })
            .catch((error) => {
                
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}\n${errorMessage}`);
                setErr(true);

                errorCode === "auth/invalid-email" ? Swal.fire({
                    title: 'Error!',
                    text: "Invalid Email",
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === "auth/weak-password" ? Swal.fire({
                    title: 'Error!',
                    text: `Weak Password, password should be at least 6 characters`,
                    icon: 'error',
                    confirmButtonText: 'Return'
                })
                : errorCode === "auth/email-already-in-use" ? Swal.fire({
                    title: 'Error!',
                    text: `Email Already In Use! try again with another email`,
                    icon: 'error',
                    confirmButtonText: 'Return'
                })            
                : console.log(`${errorCode}\n${errorMessage}`);



            });

            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        console.log('File available at', downloadURL);
                        await updateProfile(user, {
                            displayName,
                            photoURL:downloadURL 
                        });

                        await setDoc(doc(db, "users", user.uid), {
                            uid: user.uid, 
                            displayName,
                            email,
                            photoURL: downloadURL
                        });

                        // await setDoc(doc(db, "userChats", user.uid), {});
                        
                        navigate("/");
                        console.log('asd');

                    });
                }
            );
            

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
            <p>Do you have an account? <a href="/login" >login</a></p>
            <p>Or</p>            
            <a className='btnGoogleWrapper' onClick={handleButtonLoginGoogle}><GoogleBtn/></a>
        </div>

    </div>
  )
}

export default Register