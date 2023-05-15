import React, { useContext, useState } from 'react'

import Img from '../imgs/img.png'
import Attach from '../imgs/attach.png'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore' 
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuid } from "uuid";


const Input = () => {

	const {currentUser} = useContext(AuthContext)
    const {data} = useContext(ChatContext)

	const [text, setText] = useState("")
	const [img, setImg] = useState(null)

	const handleSend = async() => {
	  
		if (img) {
			
			const storageRef = ref(storage, uuid());
			const uploadTask = uploadBytesResumable(storageRef, img);

			uploadTask.on(
				(error) => {
					//setErr(true)
					console.log(error);
				},
				() => {

					getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
						// console.log('File available at', downloadURL);

						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text,
								senderId:currentUser.uid,
								date:Timestamp.now(),
								img:downloadURL,
							}),
						});
					});
				}
			);
		}else{
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text,
					senderId: currentUser.uid,
					date:Timestamp.now(),
				}),
				
			});
		}

		await updateDoc(doc(db, "userChats", currentUser.uid), {
			[data.chatId + ".lastMessage"]: {
				text
			},
			[data.chatId+".date"]: serverTimestamp()
		})

		await updateDoc(doc(db, "userChats", data.user.uid), {
			[data.chatId+".lastMessage"]: {
				text
			},
			[data.chatId+".date"]: serverTimestamp()
		})

		setText("");
		setImg(null);
	
	}

  return (
    <div className='input'>

        <input type="text" placeholder='type something...' onChange={(e) => {setText(e.target.value)}} value={text} />
        <div className="send">
            <input type="file" style={{display:'none'}} id="file" onChange={(e) => {setImg(e.target.files[0])}}/>
            
			<label htmlFor="file">
				<img src={Img} alt=""/>
			</label>
            <label htmlFor="file">
                <img src={Attach} alt="" />                
            </label>
            <button onClick={handleSend}>send</button>
        </div>
    </div>
  )
}

export default Input