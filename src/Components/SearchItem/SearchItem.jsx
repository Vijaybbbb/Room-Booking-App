import React from 'react'
import './SearchItem.css'
import room from '../../assets/room.webp'
import { useNavigate } from 'react-router-dom'

const SearchItem = ({item}) => {
  console.log(item);
  const navigate = useNavigate()
  return (
    <div className='searchItem'>
       <img src={`../../../src/images/${item.images[0]}`} alt="" className="siImg" />
       <div className="siDesc">
          <h1 className="siTitle">{item.name}</h1>
          <span className="siDistance">{item.distance} from center</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">
            {item.description} in {item.city}
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
          <span>{item.rating > 4.4 ? 'Excellent' : "Good"}</span>
          <button>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice"> Starting from ${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className='siCheckButton' onClick={()=>{navigate(`/hotels/${item._id}`)}}>See Avialbility</button>
        </div>
       </div>
      
    </div>
  )
}

export default SearchItem
