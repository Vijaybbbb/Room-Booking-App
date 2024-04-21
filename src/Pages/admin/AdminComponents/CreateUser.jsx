import React from 'react'
import '../AdminComponents/css/UserManagement.css'

const CreateUser = ({compClick,showUserCreation}) => {
  return (
         <div>
                {
                       showUserCreation ? (
                              <div>user</div>
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
