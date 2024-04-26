import React, { useEffect, useState } from 'react'
import '../adminHome/AdminHome.css'
import { baseUrl } from '../../../utils'
import useFetch from '../../../hooks/useFetch'
import '../AdminComponents/css/HotelManagement.css'
import ViewHotel from './ViewHotel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faHotel, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';


const HotelManagement = ({compClick,showHotels}) => {



  const [openWindow,setOpenWindow] = useState()
  const {data,error,loading,refetchData} = useFetch(`${baseUrl}/admin/hotels`)
  const [page, setPage] = useState(1)
  const [viewHotel,setViewHotel] = useState(false) 
  const [hotelId, setHotelId] = useState() 

  const TableRow = ({ children }) => {
    return <div className="table__row">{children}</div>;
  };
  const TableCell = ({ children }) => {
    return <div className="table__cell">{children}</div>;
  };


  //function for indicate pagination
  function selectedPage(selectedPage) {
    if (
      selectedPage >= 1 &&
      selectedPage <= data.length &&
      selectedPage !== page
    )
      setPage(selectedPage)
  }

  
  function handleGoBack() {
    setViewHotel(false)
    refetchData()
  }



  function handleViewHotel(id) {
    setHotelId(id)
    setViewHotel(true)
  }

  return (
    <div>
    {viewHotel ? (
              <ViewHotel hotelId={hotelId} handleGoBack={handleGoBack}/>
          ):
      showHotels ? (
        <div className='allHotelsTable'>
            <div className="table">
              <div className="table__body" >
                <TableRow>  
                  <TableCell>Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>HotelID</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
                {/* Repeat TableRow and TableCell components for each row */}
                {/* Example of a row */}
                {
                  data && data.slice((page - 1) * 5, page * 5).map(hotel=>(
                    <TableRow key={data._id}>
                    <TableCell>
                    <h3 className="table__crypto-name">{hotel?.name}</h3>
                  </TableCell>
                  <TableCell><input type="text" value={hotel?.city} className='detailsshowinput' readOnly /></TableCell>
                    
                  <TableCell><input type="text" value={hotel?._id} className='detailsshowinput' readOnly /></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewHotel(hotel?._id)}}>View Hotel</button>
                      <button className="button button--primary buttons__comprar">Edit Hotel</button>
                    </div>
                  </TableCell>
                </TableRow>
                  ))
                }
                 <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>

                <TableCell colSpan="5">
                  <div style={{alignItems:'center'}}>
                  <div className="page-btn">
                    <span onClick={() => selectedPage(page - 1)}>{'<'}</span>
                    {[...Array(Math.ceil(data.length / 5))].map((_, i) => (
                      <span
                        key={i + 1}
                        onClick={() => selectedPage(i + 1)}
                        className={page === i + 1 ? 'pagination_selected' : ''}
                      >{i + 1}</span>
                    ))}
                    <span onClick={() => selectedPage(page + 1)}>{'>'}</span>
                  </div>
                  </div>
                </TableCell>
              </TableRow>
                {/* Repeat this structure for each row */}
              </div>
            </div>
          </div>
       ):(
            <div className="col s6" onClick={() => { compClick(event, 'HotelManagement') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                <div className="row">
                  <div className="left card-title">
                    <b>HotelManagement</b>
                    <FontAwesomeIcon icon={faHotel} style={{color:'black',fontSize:'40px'}}/> 

                  </div>
                </div>
                
              </div>
            </div>
      )
    }
  </div>
  )
}

export default HotelManagement
