import React, { useEffect, useState } from 'react'
import '../adminHome/AdminHome.css'
import '../AdminComponents/css/UserManagement.css'
import axios from 'axios'
import useFetch from '../../../hooks/useFetch'
import {baseUrl} from '../../../utils'
import ViewUser from './ViewUser'

const UserManagement = ({compClick,showUsers}) => {

  const [openWindow,setOpenWindow] = useState(false)
  const {data,error,loading} = useFetch(`${baseUrl}/admin/users`)
  const [page, setPage] = useState(1)
  const [viewUser,setViewUser] = useState(false)
  const [userId, setUserId] = useState()

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
  
  async function handleViewUser(userId){
    console.log(userId);
    setViewUser(true)
    setUserId(userId)
  }


  function handleGoBack(){
      setViewUser(false)
  }
  
  return (
    <div>
      {viewUser ? (
              <ViewUser userId={userId} handleGoBack={handleGoBack}/>
          ):
        showUsers ? (
          <div className='allUsersTable'>
            <div className="table">
              <div className="table__body" >
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>UserID</TableCell>
                  <TableCell></TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
                {/* Repeat TableRow and TableCell components for each row */}
                {/* Example of a row */}
                {
                  data && data.slice((page - 1) * 5, page * 5).map(user=>(
                    <TableRow key={data._id}>
                    <TableCell>
                    <h3 className="table__crypto-name">{user?.username}</h3>
                  </TableCell>
                  <TableCell><input type="text" value={user?.email} className='detailsshowinput' readOnly /></TableCell>
                    
                  <TableCell><input type="text" value={user?._id} className='detailsshowinput' readOnly /></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="buttons">
                      <button className="button button--outline buttons__venta" onClick={()=>{handleViewUser(user?._id)}}>View User</button>
                      <button className="button button--primary buttons__comprar">Edit User</button>
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
          ):
          
          (
            <div className="col s6" onClick={()=>{compClick(event,'UserManagement')}}>
       <div style={{ padding: '35px' }} align="center" className="card">
         <div className="row">
           <div className="left card-title">
             <b>User management</b>
           </div>
         </div>
         <div className="row">
           <a href="#!">
             <div style={{ padding: '30px' }} className="grey lighten-3 col s5 waves-effect">
               <i className="indigo-text text-lighten-1 large material-icons">person</i>
               <span className="indigo-text text-lighten-1"><h5>Seller</h5></span>
             </div>
           </a>
           
           {/* Repeat the rest of the cards here */}
         </div>
       </div>
     </div>
          )
        }
      </div>
  )
}

export default UserManagement
