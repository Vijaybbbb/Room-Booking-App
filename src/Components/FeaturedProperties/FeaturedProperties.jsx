import React, { useState } from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'

import { useNavigate } from 'react-router-dom'
import SkeletonCard from '../Skeleton/SkeletonCard'

const FeaturedProperties = () => {

  const {data,loading,error} = useFetch('http://localhost:3000/hotels/featured')
 const navigate = useNavigate()

 const tomorrowDate = new Date();
 tomorrowDate.setDate(tomorrowDate.getDate() + 1);
 


 const [date, setDate] = useState([
  {
    startDate: new Date(),
    endDate:tomorrowDate,
    key: 'selection'
  }
]);

const [options,setOptions] = useState({
  adults:1,
  children:0,
  room:1
})

  function handleClick(data){
      navigate(`/hotels/${data._id}`,{state:{date,options}})
  }

  return (
    <div className="fp">
      {loading ? (
       data?.map((data)=>
        <div className="fpItem" key={data._id} onClick={()=>{handleClick(data)}}>
           <SkeletonCard/>
        </div>
       )
      
      ) : (
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
