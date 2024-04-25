import React from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'
import img from '../../../src/images/1713957176605pexels-photo-219692.jpeg'
import { useNavigate } from 'react-router-dom'

const FeaturedProperties = () => {

  const {data,loading,error} = useFetch('http://localhost:3000/hotels/featured')
 const navigate = useNavigate()

  function handleClick(data){
      navigate(`/hotels/${data._id}`)
  }

  return (
    <div className="fp">
      {loading ? ('Loading') : (
      data?.map((data)=>
       <div className="fpItem" key={data._id} onClick={()=>{handleClick(data)}}>
          <img className='fpImg' src={`../../../src/images/${data.images[0]}`} alt="" />
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
