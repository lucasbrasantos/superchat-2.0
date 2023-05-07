import React, { useState } from 'react'
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const Search = () => {

  	// const [username, setUsername] = useState("");
  	const [user, setUser] = useState(null);
  	const [err, setErr] = useState(false);



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
			
			// querySnapshot.empty && setUser(null); //clear/removes user when search box does not match the user display name

		} catch (error) {
			setErr(true)
		}
		
		// console.log(user);

	}


	const handleSelect = () => {
		
	}


  return (
    <div className='search'>

        <div className="searchForm">
            <input type="text" placeholder='find a user:' onChange={async(e) => {				
				handleSearch(e.target.value);
			}}/>
        </div>
		{err && <span>user not found</span>}
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="user profile picture" />
            <div className="userChatInfo">
                <span style={{textTransform:'capitalize'}}>{user.displayName}</span>
                <p>hello</p>
            </div>
        </div>}

    </div>
  )
}

export default Search