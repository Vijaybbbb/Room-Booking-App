import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import ViewRoom from './ViewRoom'

const ViewRoomsOfSingleHotel = ({hotelId}) => {

  const {data,error,loading,refetchData} = useFetch(`${baseUrl}/hotels/getSingleHotelAllRooms/${hotelId}`) 
  const [page, setPage] = useState(1)
  const [roomId, setRoomId] = useState()
  const [viewRoom, setViewRoom] = useState(false)

  
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

     function handleViewRoom(id){
       setRoomId(id)
       setViewRoom(true)
     }
   

  return (
    <div>
       {
       viewRoom ? (
              <div>
                     <ViewRoom roomId={roomId} handleGoBack={handleGoBack} hotelId={hotelId}/>
              </div>
       ):(
              <div className='allRoomsTable'>
             <div className="table">
               <div className="table__body" >
                 <TableRow>  
                   <TableCell>Name</TableCell>
                   <TableCell>Price</TableCell>
                   <TableCell>RoomID</TableCell>
                   <TableCell></TableCell>
                <TableCell>Action</TableCell>
               </TableRow>
                 {/* Repeat TableRow and TableCell components for each row */}
                {/* Example of a row */}
                 {
                  data && data.slice((page - 1) * 5, page * 5).map(room=>(
                    <TableRow >
                    <TableCell>
                    <h3 className="table__crypto-name">{room?.title}</h3>
                  </TableCell>
                  <TableCell><input type="text" value={room?.price} className='detailsshowinput' readOnly /></TableCell>
                  <TableCell><input type="text" value={room?._id} className='detailsshowinput' readOnly /></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewRoom(room?._id)}}>View Room</button>
                     
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
       )
 }
    </div>
  )
}

export default ViewRoomsOfSingleHotel
