import React, { useContext, useEffect, useRef, useState } from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Header = ({type,access}) => {

//set initial dates 
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);


  const [destinationFilled, setDestinationFilled] = useState(false);
  const [openDate,setOpenDate] =  useState(false)
  const [destination,setDestination]  = useState('')
  const navigate = useNavigate()
  const {dispatch}  = useContext(SearchContext)
  const [placeHolder,setPlaceHolder] = useState(false)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate:tomorrowDate,
      key: 'selection'
    }
  ]);
  const [openOptions,setOpenOptions] = useState(false)
  const [options,setOptions] = useState({
    adults:1,
    children:0,
    room:1
  })
  
  const handleOption = (name,operation)=>{
        setOptions(prev =>{return{
          ...prev,
          [name] : operation === 'i' ? options[name] + 1 : options[name] - 1,
        }})
  }

  const handleSearch = () =>{
    if (!destinationFilled) {
      setPlaceHolder(true)
      return;
    }
    dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
    navigate('/hotels',{state:{destination,date,options}})
  }

  function getValue(e){
    setDestinationFilled(!!e.target.value); 
    setDestination(e.target.value)
  }
   

  //set deafult dates  const tomorrowDate = new Date();
  



  return (
    <div className='header1'>
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
     {
      access ? (
        <h1 style={{marginBottom:'0px',fontFamily:' var(--bui_font_display_3_font-family)',fontSize:'40px'}}>find your next stay ...</h1>
      ):(
        <button className='headerBtn' onClick={()=>{navigate('/login')}}>Sign in / Register</button>
      )
     }
     <div className="headerSearch">
        <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
            <input
            
            required
            type="text"
            placeholder={!placeHolder ? 'Where are you going' : ' Please enter a destination...?'} 
            className={!placeHolder ? 'headerSearchInput' : 'headerSearchInputError'}
            onChange={getValue} 
            
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
