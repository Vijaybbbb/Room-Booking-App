import React, { useState } from 'react'
import '../adminHome/AdminHome.css'
import '../AdminComponents/css/RoomManagement.css'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import ViewRoom from './ViewRoom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faRestroom, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import ViewRoomsOfSingleHotel from './ViewRoomsOfSingleHotel'


const RoomManagement = ({compClick,showRooms}) => {

  const [openWindow,setOpenWindow] = useState(false)
  const {data,error,loading} = useFetch(`${baseUrl}/admin/hotels`)
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
    setViewRoom(false)
    refetchData()
  }




function handleHotel(id){
  setHotelId(id)
  setViewHotel(true)
}


  return (
    <div>
    {viewHotel ? (
              // <ViewRoom roomId={roomId} handleGoBack={handleGoBack}/>
              <ViewRoomsOfSingleHotel hotelId={hotelId}/>
          ):
      showRooms ? (
        

        <div>
             
              <div className='allHotelsTable'>
             <div className="table">
              <div className="table__body" >
                <TableRow>  
                  <TableCell>Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell></TableCell>
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
                  <TableCell></TableCell>
                  
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleHotel(hotel?._id)}}>Show Rooms</button>
                     
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
            <div className="col s6" onClick={() => { compClick(event, 'RoomManagement') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                <div className="row">
                  <div className="left card-title">
                    <b>RoomManagement</b>
                    <FontAwesomeIcon icon={faRestroom}  className='adminPanelIcons'/> 

                  </div>
                </div>
                
              </div>
            </div>
      )
    }
  </div>
  )
}

export default RoomManagement
