import React from 'react'
import './Skeleton.css'

const SkeletonCard = ({list}) => {
  return (
   <div className='skeletonCard'>
    <div className="card" style={{ maxWidth: list ? '950px' : '350px' }}>
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
