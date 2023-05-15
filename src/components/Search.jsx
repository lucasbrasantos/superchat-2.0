import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  	// const [username, setUsername] = useState("");
  	const [user, setUser] = useState(null);
  	const [err, setErr] = useState(false);

	const {currentUser} = useContext(AuthContext)

	const handleSearch = async(x) => {

		const q = query(
			collection(db, 'users'),
			where("displayName", "==", x.toLowerCase())			
		);
					
		try {
			

			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			})
			
			querySnapshot.empty && setUser(null); //clear/removes user when search box does not match the user display name

		} catch (error) {
			setErr(true)
		}		

	}
	
	
	const handleSelect = async() => {		
		const combinedId = currentUser.uid > user.uid
			? currentUser.uid + user.uid
			: user.uid + currentUser.uid

		// console.log(user);
		try {
			const res = await getDoc(doc(db, "chats", combinedId));

			if (!res.exists()) {
				
				//create a chat in chats collection
				await setDoc(doc(db, "chats", combinedId), { messages: [] });

				//create user chats
				await updateDoc(doc(db, "userChats", currentUser.uid), {

					[combinedId+".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL
					},
					[combinedId+".date"]: serverTimestamp()
				});

				await updateDoc(doc(db, "userChats", user.uid), {

					[combinedId+".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL
					},
					[combinedId+".date"]: serverTimestamp()
				});

				document.getElementById("searchUser").value = "";				
				// console.log(user);
				setUser(null);
			}

		} catch (err) {
			setErr(true)
			console.log(err);
		}

	}
	

  return (
    <div className='search'>

        <div className="searchForm">
            <input type="text" id="searchUser" placeholder='find a user:' onChange={async(e) => {				
				handleSearch(e.target.value);
			}}/>
        </div>
		{err && <span>user not found</span>}
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="user profile" />
            <div className="userChatInfo">
                <span style={{textTransform:'capitalize'}}>{user.displayName}</span>
                <p></p>
            </div>
        </div>}

    </div>
  )
}

export default Search