import React, { useState } from 'react'
import './PropertyList.css'
import img1 from '../../assets/ByTypeImages/hamburg-2976711_1280.jpg'
import img2 from '../../assets/ByTypeImages/hamburg-3071437_1280.jpg'
import img3 from '../../assets/ByTypeImages/hamburg-4103411_1280.jpg'
import img4 from '../../assets/ByTypeImages/hamburg-5974223_1280.jpg'
import img5 from '../../assets/ByTypeImages/warehouse-8589487_1280.webp'

import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'


const PropertyList = () => {

       const {data,loading,error} = useFetch('http://localhost:3000/hotels/countByType')
       const navigate = useNavigate()
       const images  = [img1,img2,img3,img4,img5] 
       const [type,setType] = useState() 
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

       function handleClick(type){
              setType(type)
              navigate('/hotels',{state:{date,options}})
       }
    
  return (
   <>
   {loading ? ("laoding"):(
        <div className="pList">
       {data && images.map((image,index)=>
        <div className="pListItem" key={index}>
               <img src={image} alt="" className="pListImg" onClick={()=>{
                     handleClick(data[index]?.type)
               }}/>
               <div className="pListTitles">
                      <h1 id='headdingTypeh1'>{data[index]?.type}</h1>
                      <h2 id='headdingTypeh2'>{data[index]?.count} Rooms</h2>
               </div>
        </div>
       )}
     </div>
   )}
   </>
  )
}

export default PropertyList
