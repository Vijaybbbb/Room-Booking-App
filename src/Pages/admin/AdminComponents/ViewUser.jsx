import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import '../AdminComponents/css/viewProfilePage.css'

const ViewUser = ({userId,handleGoBack}) => {

       const {data,loading,error,refetchData} = useFetch(`${baseUrl}/user/singleUser?id=${userId}`)
       const [showEditBox,setShowEditBox] = useState(false)
 
       function handleEdit(){
              setShowEditBox(!showEditBox)
       }

  return (
    <div className='userProfilePage'>
      <button onClick={handleGoBack}>back</button>
      <div className="card">
      <div className="container">
        <img src="https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="profile-img" />
        <h2>{data.username}</h2>
        <small>{data.email}</small>
        <div className="bar">
          <button className="btn" onClick={()=>{handleEdit()}}>
            <i className="far fa-smile"></i>
            <span>Edit</span>
          </button>
          <button className="btn btn-more">
            <i className="fas fa-ellipsis-h"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>

    </div>
    </div>
  )
}

export default ViewUser

