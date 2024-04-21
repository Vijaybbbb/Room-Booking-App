import React, { useState } from 'react'
import '../AdminComponents/css/UserManagement.css'
import '../AdminComponents/css/createUser.css'
import axios from 'axios'
import { baseUrl } from '../../../utils'

const CreateUser = ({compClick,showUserCreation,setShow}) => {

       const [userData, setUserData] = useState({
              username: '',
              email: '',
              password: ''
          })


          let getValue = (e) => {
              setUserData({
                  ...userData,
                  [e.target.name]: e.target.value
              })
      
          }

       async function handleCreate(e){
              e.preventDefault();
              await axios.post(`${baseUrl}/admin/createUser`,userData,{withCredentials:true}).then((res)=>{
                     console.log(res);
                     setShow(false)
              }).catch((err)=>{
                     console.log(err);
              })
       }
  return (
         <div>
                {
                       showUserCreation ? (
                              <div className='createUserByAdmin'>
                                     <div className="wrapper">
                                            <div className="login-box">
                                                   <h3 className="info-text">User Creation</h3>
                                                   <form className="form-container" action="">
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Name" type="text"  name="username" onChange={getValue} />
                                                                 
                                                          </div>
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Email" type="email" name="email" onChange={getValue} />
                                                                 
                                                          </div>
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Password" type="password"  name="password" onChange={getValue}/>
                                                                 
                                                          </div>
                                                          
                                                          <br /><br />
                                                          <button className="form-element is-submit" type="submit" onClick={handleCreate}>Create</button>
                                                   </form>
                                               
                                            </div>
                                     </div>
                              </div>
                       ) : (
                              <div className="col s6" onClick={() => { compClick(event, 'CreateUser') }}>
                                     <div style={{ padding: '35px' }} align="center" className="card">
                                            <div className="row">
                                                   <div className="left card-title">
                                                          <b>Create User</b>
                                                   </div>
                                            </div>
                                     </div>
                              </div>
                       )
                }
         </div>
  )
}

export default CreateUser
