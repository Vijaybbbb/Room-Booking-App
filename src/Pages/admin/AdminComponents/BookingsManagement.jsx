import React, { useState } from 'react'
import '../adminHome/AdminHome.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import '../../admin/AdminComponents/css/bookingmgt.css'


const BookingsManagement = ({compClick,showBookings}) => {

  const {data,error,loading} = useFetch(`${baseUrl}/admin/allBookings`)
  
  const [order, setOrder] = useState()

  const [page, setPage] = useState(1)
  const [viewDetails,setViewDetails] = useState(false) 

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
   
  }


  async function handleViewDetails(e,booking) {
    e.preventDefault()
    setViewDetails(true)
    setOrder(booking)
    console.log(order);
  }

  function close(){
    setViewDetails(false)
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
                      <button className="button button--outline buttons__venta" onClick={(e)=>{handleViewDetails(e,booking)}}>View Order</button>
                      
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



    {
        viewDetails && (
          <div className='adminorderdetails'>
            <div className="reserve">
              <div className="rContainer" style={{ width: "750px", height: '500px', borderRadius: '10px', marginLeft: "350px" }}>
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={close} />
                
                  {
                    order.status == 'Processing' ? (
                      <div className="order-status order-process">
                      <div className="top-part">
                        <i className="far fa-check-circle"></i>
                        <h3>
                          Payment Processing
                          <span>Order ID: {order.bookingId} </span>
                        </h3>
                        <small>
                          The Payment is under Process and Not yet Recieved
                        </small>
                      </div>
                      </div>
                    ) :
                      order.status == 'Canceled' ? (
                        <div className="order-status order-error">
                        <div className="top-part">
                          <i className="far fa-times-circle"></i>
                          <h3>
                            Payment Failed
                            <span>Order ID: {order.bookingId} </span>
                          </h3>
                          <small>
                            Payment has been Failed check the users invoice or ckeck technical issue
                          </small>
                        </div>
                        </div>
                      ) : (
                        <div className="order-status order-success">
                        <div className="top-part">
                          <i className="far fa-check-circle"></i>
                          <h3>
                            Payment Successful
                            <span>Order ID: {order.bookingId} </span>
                          </h3>
                          <small>
                            Congratulation , yu have Received a Payment
                          </small>
                        </div>
                        </div>
                      )
                  }
                  <ul>
                    <li>
                      <div>Hotel Name</div>
                      <div>{order?.hotelName}</div>
                    </li>
                    <li>
                      <div>Price:</div>
                      <div>{order?.price}</div>
                    </li>
                    <li>
                      <div>Status:</div>
                      <div>{order?.status}</div>
                    </li>
                    <li>
                      <div>Check in:</div>
                      <div>{order?.allDates[0]}</div>
                    </li>
                    <li>
                      <div>Check Out::</div>
                      <div>{order?.allDates[order.allDates?.length - 1]}</div>
                    </li>
                    <li>
                      <div>Payer ID:</div>
                      <div>{order?.user}</div>
                    </li>
                   
                  </ul>
                </div>



            


            </div>
          </div>
      ) 
    }


  </div>
  )
}

export default BookingsManagement
