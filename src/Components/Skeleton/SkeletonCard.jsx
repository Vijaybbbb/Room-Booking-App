import React from 'react'
import './Skeleton.css'

const SkeletonCard = () => {
  return (
   <div className='skeletonCard'>
     <div className="card">
      <div className="header">
        
        <div className="details">
          <span className="name"></span>
          <span className="about"></span>
        </div>
      </div>
      <div className="description">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
        <div className="line line-3"></div>
      </div>
      
    </div>
   </div>
  )
}

export default SkeletonCard
