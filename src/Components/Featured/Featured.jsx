import React from 'react'
import './Featured.css'
import useFetch from '../../hooks/useFetch'
import img1 from '../../assets/TopCitiesImages/pexels-photo-169677.jpeg'
import img2 from '../../assets/TopCitiesImages/pexels-photo-219692.jpeg'
import img3 from '../../assets/TopCitiesImages/pexels-photo-421927.jpeg'
import img4 from '../../assets/TopCitiesImages/pexels-photo-773471.jpeg'


const Featured = () => {

 
  const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByCity?cities=berlin,madrid,london')
  const images  = []

  return (
    <div>
      {loading ? (
      'Loading'
      ):(
      <div className="featured">
       <div className="featuredItem">
              <img src={img1} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>{data[0]} Properties</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img2} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>{data[1]} Properties</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img3} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>{data[2]} Properties</h2>
              </div>
       </div>
       <div className="featuredItem">
              <img src={img4} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1>ooty</h1>
                <h2>{data[1]} Properties</h2>
              </div>
       </div>
      </div>
)} 
  </div>
  )
}

export default Featured
