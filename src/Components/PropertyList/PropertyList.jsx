import React from 'react'
import './PropertyList.css'
import img9 from '../../assets/im9.webp'
import useFetch from '../../hooks/useFetch'


const PropertyList = () => {

       const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByType')
       console.log(data+'@@@@@@@@@@@');
       const images  = [img9,img9,img9,img9,img9] 
    
  return (
   <>
   {false ? ("laoding"):(
        <div className="pList">
       {images.map((image,index)=>
        <div className="pListItem" key={index}>
               <img src={image} alt="" className="pListImg" />
               <div className="pListTitles">
                      <h1>hotels</h1>
                      <h2>2333 Rooms</h2>
               </div>
        </div>
       )}
     </div>
   )}
   </>
  )
}

export default PropertyList
