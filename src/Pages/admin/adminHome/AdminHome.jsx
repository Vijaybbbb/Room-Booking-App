import React, { useEffect } from 'react'
import { baseUrl } from '../../../utils'

const AdminHome = () => {


  useEffect(()=>{
    fetchAdminHome()
  },[])

  async function fetchAdminHome(){
    await axios.get(`${baseUrl}/admin`,{withCredentials:true}).then((res)=>{
        setAccess(true)
    }).catch(err=>setError(err))
  }

  return (
    <div>
      
    </div>
  )
}

export default AdminHome
