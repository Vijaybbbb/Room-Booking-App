import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import './List.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'

const List = () => {

   const location = useLocation()
   console.log(location);
   const [destination,setDestination] = useState(location.state.destination)
   const [date,setDate] = useState(location.state.date)
   const [openDate,setOpenDate]   = useState(false)
   const [options,setOptions] = useState(location.state.options)
   

  return ( 
    <div>
       <Navbar/>
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
                    <span onClick={() => setOpenDate(!openDate)}> {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')} `}</span>
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
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Min price <small> per night</small></span>
                        <input type="text" className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText" placeholder={options.adults}>Adults</span>
                        <input type="text" className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText"  placeholder={options.children}>Children</span>
                        <input type="text" className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText"  placeholder={options.room}>Room</span>
                        <input type="text" className='lsOptionInput'/>
                      </div>


                   </div>
             </div>
             
             <div className="listResult">
              
             </div>
          </div>
       </div>
    </div>
  )
}

export default List
