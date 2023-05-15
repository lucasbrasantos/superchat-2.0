import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'

import Cam from '../imgs/cam.png'
import More from '../imgs/more.png'
import Add from '../imgs/add.png'
import { ChatContext } from '../context/ChatContext'


const Chat = () => {

	const { data } = useContext(ChatContext);
	// console.log(data);
	return (
		<div className="chat">
		<div className="chatInfo">
			{data.user.photoURL && <img src={data.user.photoURL} alt='profile'/>}
			<span>{data.user?.displayName}</span>
			<div className="chatIcons">
			<img src={Cam} alt="icon" />
			<img src={Add} alt="icon" />
			<img src={More} alt="icon" />
			</div>
		</div>
		<Messages />
		<Input/>
		</div>
	)
}

export default Chat