import React, { useEffect } from 'react'
import './Featured.css'
import img1 from '../../assets/img8.webp'
import useFetch from '../../hooks/useFetch'

const Featured = () => {

 
    const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByCity?cities=berlin,madrid,london')
    console.log(data);

  return (
    <div>
      <div className="featured">
       <div className="featuredItem">
              <img src={img1} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>533 Propertie</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img1} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>533 Propertie</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img1} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>533 Propertie</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img1} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>533 Propertie</h2>
              </div>
       </div>
      </div>
    </div>
  )
}

export default Featured
