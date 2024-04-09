import React from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'
import img1 from '../../assets/ByTypeImages/hamburg-2976711_1280.jpg'

const FeaturedProperties = () => {

   const {data,loading,error} = useFetch('http://localhost:3000/hotels')

  return (
    <div className="fp">
      {loading ? ('Loading') : (
      data.map((data)=>
       <div className="fpItem">
          <img className='fpImg' src={img1} alt="" />
          <span className="fpName">{data.name}</span>
          <span className="fpCity">{data.city}</span>
          <span className="fpPrice">Startting from ${data.cheapestPrice}</span>
          <div className="fpRating">
              <button>{data.rating}</button>
              <span>{data.rating > 4.4 ? 'Excellent' : "Good"}</span>
           </div>
       </div>
      ))}
    </div>
  )
}

export default FeaturedProperties
