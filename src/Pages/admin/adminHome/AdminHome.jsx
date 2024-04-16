import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminHome = () => {

  const adminDetails = useSelector(state => state.adminDetails)
  const [access,setAccess]  = useState(false)
  const [error,setError]  = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    fetchAdminHome()
  },[access])

  async function fetchAdminHome(){
    await axios.post(`${baseUrl}/admin/adminHome?userId=${adminDetails?.userId}`,{},{withCredentials:true}).then((res)=>{
      console.log(res);
      res?.status === 200 ?  setAccess(true) :  setAccess(false)
    }).catch(err=>{
        setAccess(false)
    })
  }

  return (
    <div>
        {
          access ? (
              <div>
                Admin Panel
              </div>
          ):(
            <div><Link to={'/adminLogin'}>Authentication Failed PLease Login Again</Link></div>
          )
        }
    </div>
  )
}

export default AdminHome
