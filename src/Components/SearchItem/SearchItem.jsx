import React from 'react'
import './SearchItem.css'
import room from '../../assets/room.webp'
import { Navigate, useNavigate } from 'react-router-dom'

const SearchItem = () => {
  const navigate = useNavigate()
  return (
    <div className='searchItem'>
       <img src={room} alt="" className="siImg" />
       <div className="siDesc">
          <h1 className="siTitle">Tower Street Appartments</h1>
          <span className="siDistance">500m from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            Studio Apartments with air conditioning
          </span>
          <span className="siFeatures">
            Entire studio 1 bathroom 21m 1 full bed
          </span>
          <span className="siCancelOp">Free Cancelation</span>
    <span className="siCanceledOpSubtitle">
      you can cancel later ,  so lock in this great price today ! 
    </span>
       </div>
       <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">$123</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className='siCheckButton' onClick={()=>{navigate('/hotels/1')}}>See Avialbility</button>
        </div>
       </div>
      
    </div>
  )
}

export default SearchItem
