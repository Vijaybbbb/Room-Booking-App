import React from 'react'
import '../AdminComponents/css/UserManagement.css'
import '../AdminComponents/css/createUser.css'

const CreateUser = ({compClick,showUserCreation}) => {

       function handleCreate(e){
              e.preventDefault();
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
                                                                 <input className="form-element input-field" placeholder="Name" type="text" />
                                                                 
                                                          </div>
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Email" type="email" />
                                                                 
                                                          </div>
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Password" type="password" />
                                                                 
                                                          </div>
                                                          <div className="input-addon">
                                                                 <input className="form-element input-field" placeholder="Re-type password" type="password" />
                                                                 
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
