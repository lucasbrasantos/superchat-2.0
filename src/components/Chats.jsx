import React from 'react'

const Chats = () => {
  return (
    <div className='chats'>
      <div className="userChat">
            <img src="https://images.pexels.com/photos/936049/pexels-photo-936049.jpeg" alt="" />
            <div cl assName="userChatInfo">
                <span>John</span>
                <p>hello</p>
            </div>
      </div>
      <div className="userChat">
            <img src="https://images.pexels.com/photos/936049/pexels-photo-936049.jpeg" alt="" />
            <div className="userChatInfo">
                <span>John</span>
                <p>hello</p>
            </div>
        </div>
    </div>
  )
}

export default Chats