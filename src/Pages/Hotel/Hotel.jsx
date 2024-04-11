import React, { useContext, useState } from 'react'
import './Hotels.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import src from '../../assets/room.webp'
import MailList from '../../Components/MailList/MailList'
import Footer from '../../Components/Footer/Footer'
import useFetch from '../../hooks/useFetch'
import { baseUrl } from '../../utils'
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext'



const Hotel = () => {

const location  = useLocation()

// takinn id from url
const id = location.pathname.split('/')[2];

const [slideNumber,setSlideNumber] = useState(0)
const [open,setOpen] = useState(false)

const {data,loading,error,refetchData} =useFetch(`${baseUrl}/hotels/${id}`)

const handleOpen  = (index) =>{
  setSlideNumber(index)
  setOpen(true)
}

const {date}  = useContext(SearchContext)
console.log(date);

const handleMove=(direction)=>{
    let newSlideNumber;
    if(direction == 'l'){
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    }
    else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1

    }
    setSlideNumber(newSlideNumber)
}

  const photos = [
    {
      src:src
    },
    {
      src:src
    },
    {
      src:src
    },
    {
      src:src
    },
    {
      src:src
    },
    {
      src:src
    },
  ]


  return (
    <div>
       <Navbar/> 
       <Header type='list'/> 
       <div className="hotelContainer">
     
        {open &&   <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>{setOpen(false)}}/>
          <FontAwesomeIcon icon={faArrowLeft} className='arrow' onClick={()=>{handleMove('l')}}/>
          <div className="sliderWrapper">
            <img className='sliderImg' src={photos[slideNumber].src} alt="" />
          </div>
          <FontAwesomeIcon icon={faArrowRight}  className='arrow'  onClick={()=>{handleMove('r')}}/>


          </div>}

            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now </button>
                  <h1 className='hotelTitle'>{data.name}</h1>
                  <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <span>{data.address}</span>
                  </div>
                  <span className='hotelDistance'>
                    Excellent location - {data.distance} from center
                  </span>
                  <span className='hotelPriceHighlight'>
                    Book a stay over ${data.cheapestPrice} at this prperty and get a free airport taxi
                  </span>
                  <div className="hotelImages">
                    {
                      photos.map((photo,index)=> (
                        <div className="hotelImagWrapper" key={index}>
                          <img onClick={()=>{handleOpen(index)}} src={photo.src} alt="" className="hotelImg" />
                        </div>
                      ))
                    }
                  </div>
                  <div className="hoteldetails">
                    <div className="hotelDetailsTexts">
                          <h1 className='hotelTitle'>Stay in heart of {data.city}</h1>
              <p className="hotelDesc">
                    {data.description}
              </p>
                    </div>
                <div className="hotelsDetailsPrice">
                    <h1>Perfect for a  9-night Stay</h1>
                    <span>
                      Located in the heart of koaroe , this propty has an excelletn location score  of 9.7
                    </span>
                    <h2>
                      <b>$945</b> (9 nights)
                    </h2>
                    <button>Reserve or Book Now</button>

                </div>

                
                  </div>
                 
            </div>
            
      </div> 
      <MailList/>
      <Footer/>
      
    </div>
  )
}

export default Hotel
