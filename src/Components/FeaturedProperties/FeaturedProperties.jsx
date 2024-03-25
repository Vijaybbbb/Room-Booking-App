import React from 'react'
import './FeaturedProperties.css'
import img from '../../assets/im9.webp'

const FeaturedProperties = () => {
  return (
    <div className="fp">
       <div className="fpItem">
          <img className='fpImg' src={img} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img className='fpImg' src={img} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img  className='fpImg' src={img} alt="" />
          <span className="fpName">aptrrts Hotel</span>
          <span className="fpCity">Madrid</span>
          <span className="fpPrice">Startting form $200</span>
          <div className="fpRating">
              <button>8.9</button>
              <span>Excellent</span>
           </div>
       </div>
       <div className="fpItem">
          <img  className='fpImg'  src={img} alt="" />
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
