import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import './List.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../Components/SearchItem/SearchItem'
import { baseUrl } from '../../utils'
import useFetch from '../../hooks/useFetch'
import  axios  from 'axios'
import { useSelector } from 'react-redux'

const List = () => {
   const userDetails = useSelector(state => state.userDetails)
   const location = useLocation()
   const [destination,setDestination] = useState(location.state?.destination)
   const [date,setDate] = useState(location.state?.date)
   const [openDate,setOpenDate]   = useState(false)
   const [options,setOptions] = useState(location.state?.options)
   const [access,setAccess]  = useState(false)

   const [min,setMin]   = useState(undefined)
   const [max,setMax]   = useState(undefined)

   useEffect(()=>{
      fetchHome()
    },[])
  
    async function fetchHome(){
      await axios.get(`http://localhost:3000?userId=${userDetails?.userId}`,{withCredentials:true}).then((res)=>{
          setAccess(true)
      }).catch(err=>setError(err))
    }


   const {data,loading,error,refetchData} = useFetch(`${baseUrl}/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`)

   const handleClick = async() =>{
      refetchData()
   } 
   

  return ( 
    <div>
       <Navbar access={access}/>
       <Header type='list'/>
       <div className="listContainer">
          <div className="listWrapper">
             <div className="listSearch">
                  <h1 className="isTitle">Search</h1>
                  <div className="lsItem">
                      <label htmlFor="">Designation</label>
                      <input type="text" placeholder={destination}/>
                   </div>
                 <div className="lsItem">
                    <label htmlFor="">Check-in Date</label>
                    <span onClick={() => setOpenDate(!openDate)}> {`${format(date[0]?.startDate, 'MM/dd/yyyy')} to ${format(date[0]?.endDate, 'MM/dd/yyyy')} `}</span>
                    {openDate &&
                       <DateRange
                          onChange={item => setDate([item.selection])}
                          minDate={new Date()}
                          ranges={date}
                       />
                    }
                 </div>
                 <div className="lsItem">
                      <label htmlFor="">Options</label>
                      <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Min price <small> per night</small></span>
                        <input type="text" onChange={e=> setMin(e.target.value)} className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Max price <small> per night</small></span>
                        <input type="text" onChange={e=> setMax(e.target.value)} className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adults</span>
                        <input type="number" className='lsOptionInput'  placeholder={options.adults} min={1}/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText" >Children</span>
                        <input type="number" className='lsOptionInput'  placeholder={options.children} min={0}/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText" >Room</span>
                        <input type="number" className='lsOptionInput'  placeholder={options.room} min={1}/>
                      </div>
                      </div>

                   </div>
                   <button onClick={handleClick}>Search</button>
             </div>
             
             <div className="listResult">
                 {loading ? (
                    'Loading'
                 ) : (
                    data?.map((item) => (
                       <SearchItem item={item} key={item._id}/>
                    ))
                 )}  
             </div>
          </div>
       </div>
    </div>
  )
}

export default List
