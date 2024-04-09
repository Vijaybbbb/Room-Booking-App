import React from 'react'
import './PropertyList.css'
import img9 from '../../assets/im9.webp'
import useFetch from '../../hooks/useFetch'


const PropertyList = () => {

       const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByType')
       
       const images  = [img9,img9,img9,img9,img9] 
    
  return (
   <>
   {loading ? ("laoding"):(
        <div className="pList">
       {data && images.map((image,index)=>
        <div className="pListItem" key={index}>
               <img src={image} alt="" className="pListImg" />
               <div className="pListTitles">
                      <h1>{data[index]?.type}</h1>
                      <h2>{data[index]?.count} Rooms</h2>
               </div>
        </div>
       )}
     </div>
   )}
   </>
  )
}

export default PropertyList
