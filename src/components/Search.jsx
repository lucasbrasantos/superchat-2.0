import React from 'react'

const Search = () => {
  return (
    <div className='search'>

        <div className="searchForm">
            <input type="text" placeholder='find a user:'/>
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

export default Search