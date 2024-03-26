import React from 'react'
import './Hotels.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import src from '../../assets/room.webp'

const Hotel = () => {

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
            <div className="hotelWrapper">
                  <h1 className='hotelTitle'>Grand Hotel</h1>
                  <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <span>Elton St  125 New york</span>
                  </div>
                  <span className='hotelPriceHighlight'>
                    Book a stay over $114 at this prperty and get a free airport taxi
                  </span>
                  <div className="hotelImages">
                    {
                      photos.map(photo => (
                        <div className="hotelImagWrapper">
                          <img src={photo.src} alt="" className="hotelImg" />
                        </div>
                      ))
                    }
                  </div>
                  <div className="hoteldetails">
                    <div className="hotelDetailsTexts">
                          <h1 className='hotelTitle'>Stay in heart of krakow</h1>
              <p className="hotelDesc">
                At ibis Kochi Hotel, guests can make use of web-corner, currency exchange and car rental services. A well-equipped fitness centre and a 24-hour front desk are available. The hotel features state-of-the-art meeting spaces.

                Cochin Shipyard is 3 km from the property. The nearest airport is Kochi International Airport, 33 km from ibis Kochi City Centre - An Accor Brand. The Ernakulam Railway Station is 2 km. The Marine Drive and Broadway are 2 km away and the historic town of Fort Kochi is 12 km.

                Guests can enjoy the on-site 24 hour multi-cuisine restaurant that serves international and authentic regional delights. Guests can avail of a long breakfast from 4 AM until noon. Room service can be requested for in-room dining comforts.
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
                    <button>Reserve or Book Now !</button>

                </div>
                  </div>
            </div>
      </div> 
    </div>
  )
}

export default Hotel
