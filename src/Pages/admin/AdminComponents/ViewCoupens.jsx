import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import EditCoupen from './EditCoupen';

const ViewCoupens = ({compClick,showViewCoupen}) => {

  const { data, error, loading ,refetchData } = useFetch(`${baseUrl}/admin/allCoupens`)
  const [page, setPage] = useState(1)
  const [viewCoupenId, setViewCoupenId] = useState()
  const [viewCoupen, setViewCoupen] = useState(false)


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
    setViewCoupen(false)
    refetchData()
  }


    async function deleteCoupen(e,id){
        e.preventDefault()
        axios.delete(`${baseUrl}/admin/deleteCoupen/${id}`,{},{withCredentials: true}).then((res)=>{
          refetchData()
        }).catch((error)=>{
          console.log(error);
        })
    }


      


  return (
       <div>
       {viewCoupen?(
              <div>
                     <EditCoupen id={viewCoupenId} handleGoBack={handleGoBack}/>
              </div>
       ) :
         showViewCoupen ? (
           <div>
              <div className='allRoomsTable'>
               <div className="table">
                 <div className="table__body" >
                   <TableRow>  
                     <TableCell>Code</TableCell>
                     <TableCell>Type</TableCell>
                     <TableCell>Value</TableCell>
                     <TableCell>Min Order</TableCell>
                     <TableCell>Action</TableCell>
                   </TableRow>
                   {/* Repeat TableRow and TableCell components for each row */}
                   {/* Example of a row */}
                   {
                     data && data.slice((page - 1) * 5, page * 5).map(coupen=>(
                       <TableRow key={data._id}>
                       <TableCell>
                       <h3 className="table__crypto-name">{coupen?.code}</h3>
                     </TableCell>
                     <TableCell><input type="text" value={coupen?.discountType} className='detailsshowinput' readOnly /></TableCell>
                       
                     <TableCell><input type="text" value={coupen?.discountValue} className='detailsshowinput' readOnly /></TableCell>
                     <TableCell><input type="text" value={coupen?.minOrder} className='detailsshowinput' readOnly /></TableCell>

                     <TableCell>
                       <div className="buttons">
                         <button className="button button--outline buttons__venta" onClick={(e)=>{
                            setViewCoupen(true)
                            setViewCoupenId(coupen?._id)
                            }}>View Coupen</button>
                       <button className="button button--outline buttons__venta" onClick={(e)=>{
                            deleteCoupen(e,coupen?._id)
                            }}>Delete</button>
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
               <div className="col s6" onClick={() => { compClick(event, 'ViewCoupen') }}>
                 <div style={{ padding: '35px' }} align="center" className="card">
                   <div className="row">
                     <div className="left card-title">
                       <b>Coupens</b>
                      
                     </div>
                     <FontAwesomeIcon icon={faUser} className='adminPanelIcons'/> 
                   </div>
                  
                 </div>
               </div>
         )
       }
     </div>
  )
}

export default ViewCoupens
