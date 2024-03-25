import React from 'react'
import './SearchItem.css'
import room from '../../assets/room.webp'

const SearchItem = () => {
  return (
    <div className='searchItem'>
       <img src={room} alt="" className="siImg" />
       <div className="siDesc"></div>
       <div className="siDetails"></div>
      
    </div>
  )
}

export default SearchItem
