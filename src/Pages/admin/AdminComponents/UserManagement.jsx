import React, { useEffect, useState } from 'react'
import '../adminHome/AdminHome.css'
import '../AdminComponents/css/UserManagement.css'
import axios from 'axios'
import useFetch from '../../../hooks/useFetch'
import {baseUrl} from '../../../utils'
import ViewUser from './ViewUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const UserManagement = ({compClick,showUsers}) => {

  const [openWindow,setOpenWindow] = useState(false)
  const {data,error,loading} = useFetch(`${baseUrl}/admin/users`)
  const [page, setPage] = useState(1)
  const [viewUser,setViewUser] = useState(false)
  const [userId, setUserId] = useState()
  const [prevData,setPrevData] = useState(data)

  useEffect(() => {
    if (data) {
      setPrevData(data);
    }
  }, [data]);

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
            <div className="col s6" onClick={() => { compClick(event, 'UserManagement') }}>
              <div style={{ padding: '35px' }} align="center" className="card">
                <div className="row">
                  <div className="left card-title">
                    <b>User management</b>
                    <FontAwesomeIcon icon={faUsers} className='adminPanelIcons'/> 

                  </div>
                </div>
            
              </div>
            </div>
          )
        }
      </div>
  )
}

export default UserManagement
