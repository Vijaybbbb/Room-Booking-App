import React from 'react'
import './Featured.css'
import useFetch from '../../hooks/useFetch'
import img1 from '../../assets/TopCitiesImages/pexels-photo-169677.jpeg'
import img2 from '../../assets/TopCitiesImages/pexels-photo-219692.jpeg'
import img3 from '../../assets/TopCitiesImages/pexels-photo-421927.jpeg'
import img4 from '../../assets/TopCitiesImages/pexels-photo-773471.jpeg'


const Featured = () => {

 
  const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByCity?cities=berlin,madrid,london')
  const images  = [img1,img2,img3,img4]
  const places  = ['Mumbai','Chennai','Banglore','Delhi'] 
  return (
    <div>
      {loading ? (
      'Loading'
      ):(
      <div className="featured">
        {images && images.map((img,index)=>
       <div className="featuredItem" key={index}>
              <img src={img} alt="" className="featuredImg" />
              <div className="featuredTitles">
                <h1 style={{position:'relative',marginBottom:'2px'}}>{places[index]}</h1>
                <h2 style={{position:'relative',marginBottom:'33px'}}>{data[index]} Properties</h2>
              </div>
       </div>
      )}
      </div>
)} 
  </div>
  )
}

export default Featured
