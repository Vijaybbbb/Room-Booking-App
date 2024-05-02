import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils'
import '../AdminComponents/css/viewProfilePage.css'
import axios from 'axios'

const ViewUser = ({userId,handleGoBack}) => {

       const {data,loading,error,refetchData} = useFetch(`${baseUrl}/user/singleUser?id=${userId}`)
       const [showEditBox,setShowEditBox] = useState(true)
       const [userData,setUserData]  = useState({
        username:data.username,
        email:data.email
       })
       

       useEffect(()=>{
          refetchData()
       },[data])


      async function handleEdit(){
              await axios.put(`${baseUrl}/user/updateUser?id=${data._id}`,userData,{withCredentials:true}).then((res)=>{
                  console.log(res);
                  handleGoBack()
              }).catch(err => console.log(err))
       }
       
       async function handleBlock(e,blocked){
                e.preventDefault()
               console.log(blocked);
              await axios.post(`${baseUrl}/user/blockUser?id=${data._id}`,{blocked:blocked},{withCredentials:true}).then((res)=>{
                  console.log(res);
              
                 // handleGoBack()
              }).catch(err => console.log(err))
       }
       


       function handlechange(e){
            setUserData({
              ...userData,
            [e.target.name]: e.target.value
             
            })
            setShowEditBox(false)
           
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
          <button className="btn"  style={{backgroundColor:showEditBox ? '#8fc493' : '#39853f'}} disabled={showEditBox} onClick={()=>{handleEdit()}}>
           
            <span>Update User</span>
          </button>
          <button className="btn btn-more" style={{backgroundColor:'#cb2005'}} onClick={(e)=>{handleBlock(e,data?.isBlocked)}}>
            <span>{data?.isBlocked ? "UnBlock" : "Block"}</span>
          </button>
        </div>
        
        <div style={{display:'flex',flexDirection:'column',gap:'20px',marginTop:'20px'}}>
          <input type="text" name='username' required value={userData.username || data.username} onChange={handlechange}/>
          <input type="email" name='email' required value={userData.email || data.email} onChange={handlechange}/>
        </div>

      </div>
    </div>
    </div>
  )
}

export default ViewUser

