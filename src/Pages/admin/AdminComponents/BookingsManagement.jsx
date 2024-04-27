import React, { useState } from 'react'
import '../adminHome/AdminHome.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const BookingsManagement = ({compClick,showBookings}) => {

  const {data,error,loading} = useFetch(`${baseUrl}/admin/allBookings`)
  console.log(data); 
  const [page, setPage] = useState(1)
  const [viewRoom,setViewRoom] = useState(false) 

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
    setViewRoom(false)
  }


  function handleViewRoom(id) {
    setRoomId(id)
    setViewRoom(true)
  }
  return (
    <div>
    {
      showBookings ? (
        <div>
           <div className='allRoomsTable'>
            <div className="table">
              <div className="table__body" >
                <TableRow>  
                  <TableCell>Hotel </TableCell>
                  <TableCell>Payer </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
                {/* Repeat TableRow and TableCell components for each row */}
                {/* Example of a row */}
                {
                  data && data.slice((page - 1) * 5, page * 5).map(booking=>(
                    <TableRow key={data._id}>
                    <TableCell>
                    <h3 className="table__crypto-name">{booking?.hotelName}</h3>
                  </TableCell>
                  <TableCell><input type="text" value={booking?.user} className='detailsshowinput' readOnly /></TableCell>
                    
                  <TableCell><input type="text" value={booking?.status} className={booking?.status == 'Canceled' ? 'detailsshowinput1' : booking?.status == 'Processing' ? 'detailsshowinput3' : 'detailsshowinput2'} readOnly /></TableCell>
                  <TableCell><input type="text" value={booking?.price} className='detailsshowinput' readOnly /></TableCell>

                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewRoom(room?._id)}}>View Order</button>
                      
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
        </div>
      ):(
            <div className="col s6" onClick={() => { compClick(event, 'BookingsManagement') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                <div className="row">
                  <div className="left card-title">
                    <b>BookingsManagement</b>
                    <FontAwesomeIcon icon={faUser} className='adminPanelIcons'/> 
                    

                  </div>
                </div>
               
              </div>
            </div>
      )
    }
  </div>
  )
}

export default BookingsManagement
