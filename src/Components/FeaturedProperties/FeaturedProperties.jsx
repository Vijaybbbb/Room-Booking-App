import React from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'
import img1 from '../../assets/ByTypeImages/hamburg-2976711_1280.jpg'
import img2 from '../../assets/ByTypeImages/hamburg-3071437_1280.jpg'
import img3 from '../../assets/ByTypeImages/hamburg-4103411_1280.jpg'
import img4 from '../../assets/ByTypeImages/hamburg-5974223_1280.jpg'


const FeaturedProperties = () => {

   const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByType')

  return (
    <div className="fp">
       <div className="fpItem">
          <img className='fpImg' src={img1} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img className='fpImg' src={img2} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img  className='fpImg' src={img3} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img  className='fpImg'  src={img4} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div> 

    </div>
  )
}

export default FeaturedProperties
