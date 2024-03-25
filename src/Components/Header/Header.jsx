import React, { useEffect, useState } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom';

const Header = ({type}) => {
  const [openDate,setOpenDate] =  useState(false)
  const [destination,setDestination]  = useState('')
  const navigate = useNavigate()

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions,setOpenOptions] = useState(false)
  const [options,setOptions] = useState({
    adults:0,
    children:0,
    room:0
  })
  
  const handleOption = (name,operation)=>{
        setOptions(prev =>{return{
          ...prev,
          [name] : operation === 'i' ? options[name] + 1 : options[name] - 1,
        }})
        console.log(options);
  }

  const handleSearch = () =>{
    navigate('/hotels',{state:{destination,date,options}})
  }

  return (
    <div className='header'>
       <div className={type == 'list' ? 'headerContainer listMode' : 'headerContainer'}>
     <div className="headerList">
       <div className="headerListItem active">
       <FontAwesomeIcon icon={faBed}/>
       <span>Stays</span>
       </div>
       
       <div className="headerListItem">
       <FontAwesomeIcon icon={faPlane}/>
       <span>Flights</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faCar}/>
       <span>Car Rentals</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faBed}/>
       <span>Attrations</span>
       </div>
       <div className="headerListItem">
       <FontAwesomeIcon icon={faTaxi}/>
       <span>Airport Taxis</span>
       </div>
     </div>
    {type !== 'list' && <>
     <h1 className='headerTitle'>A lifetime of discounts ? its Genius.</h1>
     <p className='headerDesc'>
      Get rewarded for your travels - unlocks savings of 10 % or with a free booking account
     </p>
     <button className='headerBtn'>Sign in / Register</button>
     <div className="headerSearch">
        <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input 
            type="text"
            placeholder='Where are you going ? '
            className='headerSearchInput'
            onChange={e => setDestination(e.target.value)} 
          />
        </div>
     

   
        <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
            <span onClick={()=>{
              setOpenDate(!openDate)
            }} className='headerSearchText'>
              {`${format(date[0].startDate,'MM/dd/yyyy')} to ${format(date[0].endDate,'MM/dd/yyyy')} `}
            </span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className='date'
              minDate={new Date()}
            />}
        </div>
     
           <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
            <span className='headerSearchText' onClick={()=>{setOpenOptions(!openOptions)}}>
             {`${options.adults} adult - ${options.children} children - ${options.room} room `}
            </span>
           {openOptions &&  <div className="options">
              <div className="optionItem">
                <span className="optionText">Adults</span>
                <div className="optionCounter">
                    <button className="optionsCounterButton"  disabled={options.adults <=1 }  onClick={()=>{handleOption('adults','d')}}>-</button>
                   <span className='optionCounterNumber'>{options.adults}</span>
                   <button className="optionsCounterButton"  onClick={()=>{handleOption('adults','i')}}>+</button>
                </div>
              </div>
              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                    <button className="optionsCounterButton"  disabled={options.children <=0 }   onClick={()=>{handleOption('children','d')}}>-</button>
                    <span className='optionCounterNumber'>{options.children}</span>
                    <button className="optionsCounterButton"  onClick={()=>{handleOption('children','i')}}>+</button>
                </div>

              </div>
              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                    <button className="optionsCounterButton" disabled={options.room <=1 }  onClick={()=>{handleOption('room','d')}}>-</button>
                    <span className='optionCounterNumber'>{options.room}</span>
                    <button className="optionsCounterButton"  onClick={()=>{handleOption('room','i')}}>+</button>
                </div>

              </div>
            </div>
            }
            </div>

            <div className="headerSearchItem">
            <button className='headerBtn' onClick={()=>{handleSearch()}}>Search</button>
            </div>
        
     </div></>}
     </div>
    </div>
  )
}

export default Header
