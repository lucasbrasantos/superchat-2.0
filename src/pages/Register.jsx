import React, { useState } from 'react'
import Add from '../imgs/addAvatar.png';
import Swal from 'sweetalert2';
import GoogleBtn from '../components/GoogleBtn';
import noProfilePic from '../imgs/userIcon.png';

import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {


    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const alertTime = 1600;

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
    
    async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], name, {
          type: data.type || defaultType,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = {x:e.target[3].files[0]}

        if (!file.x) {            
            file.x = await getFileFromUrl(noProfilePic, 'userIcon.jpg');
        }
        
        // console.log(file);

        
        try {
            
            let user;
            const res = await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setErr(false);
                user = userCredential.user;
                // console.log(user);
                Swal.fire({
                    title: 'Success',
                    text: ' ',
                    icon: 'success',
                    timer: alertTime
                });
            })
            .catch((error) => {
                
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn(`${errorCode}\n${errorMessage}`);
                setErr(true);                

                errorCode === "auth/invalid-email" ? Swal.fire({
                    title: 'Error!',
                    text: "Invalid email",
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/weak-password" ? Swal.fire({
                    title: 'Error!',
                    text: `Weak password, password should be at least 6 characters`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/email-already-in-use" ? Swal.fire({
                    title: 'Error!',
                    text: `Email already in use! try again with another email`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })
                : errorCode === "auth/missing-email" ? Swal.fire({
                    title: 'Error!',
                    text: `Missing email`,
                    icon: 'error',
                    confirmButtonText: 'Return',
                    timer: alertTime
                })             
                : console.warn(`Diferent error: ${errorCode}\n${errorMessage}`);

                
            });
            
            err === true ? (function(){throw new Error(`\nreturn error: ${err}`)}()) : console.log(err);
            
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file.x);

            console.log(uploadTask);
            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    setErr(false);
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        // console.log('File available at', downloadURL);
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

                        await setDoc(doc(db, "userChats", user.uid), {uid: user.uid});
                        
                        navigate("/");
                    });
                }
            );
            

        }catch(err){
            setErr(true)
            console.log(`l.145 ${err}`);
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
                {err && <span className='error'>something went wrong!</span>}
            <p>Do you have an account? <Link to="/login">Login</Link> </p>
            <p>Or</p>            
            <a className='btnGoogleWrapper' onClick={handleButtonLoginGoogle}><GoogleBtn/></a>
        </div>

    </div>
  )
}

export default Register