import React from 'react'
import Messages from './Messages'
import Input from './Input'

import Cam from '../imgs/cam.png'
import More from '../imgs/more.png'
import Add from '../imgs/add.png'


const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>name</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  )
}

export default Chat