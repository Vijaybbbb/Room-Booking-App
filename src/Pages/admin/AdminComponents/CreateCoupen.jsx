import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendarDays, faCar, faIdCard, faPerson, faPlane, faTaxi, faTicket, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';

const CreateCoupen = ({compClick,showCoupenCreation,setShow}) => {


       const [coupenData,setCoupenData]  = useState() 



       async function handleCreate(e){
              e.preventDefault()
              await axios.post(`${baseUrl}/admin/createCoupen`,coupenData,{withCredentials:true}).then((res)=>{
                    setShow(false)
              }).catch(err=>console.log(err))
       }


       function getValue(e){
              e.preventDefault()
              setCoupenData({
                     ...coupenData,
                     [e.target.name]: e.target.value
                 })
       }
       console.log(coupenData);


  return (
       <div>
       {
              showCoupenCreation ? (
                     <div className='createUserByAdmin'>
                            <div className="wrapper">
                                   <div className="login-box">
                                          <h3 className="info-text">New Coupen Creation</h3>
                                          <form className="form-container" action="">
                                                 <div className="input-addon">
                                                        <input className="form-element input-field" placeholder="Coupen Code" type="text"  name="code" onChange={getValue} />
                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                 <select
                                                                        name='discountType'
                                                                        tabIndex="1"
                                                                        required
                                                                        autoFocus
                                                                        onChange={getValue}
                                                                 >
                                                                        <option value="">Select Coupen Type</option>
                                                                        <option value="percentage">percentage</option>
                                                                        <option value="fixed">fixed</option>
                                                                        {/* Add more options as needed */}
                                                                 </select>                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                        <input className="form-element input-field" placeholder="Value" type="text"  name="discountValue" onChange={getValue}/>
                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                        <input className="form-element input-field" placeholder="minimum order" type="text"  name="minOrder" onChange={getValue}/>
                                                        
                                                 </div>
                                                 
                                                 <br /><br />
                                                 <button className="form-element is-submit" type="submit" onClick={handleCreate}>Create</button>
                                          </form>
                                      
                                   </div>
                            </div>
                     </div>
              ) : (
                     <div className="col s6" onClick={() => { compClick(event, 'CreateCoupen') }}>
                            <div style={{ padding: '35px' }} align="center" className="card">
                                   <div className="row">
                                          <div className="left card-title">
                                                 <b>Create Coupen</b>
                    <FontAwesomeIcon icon={faTicket} className='adminPanelIcons'/> 

                                          </div>
                                   </div>
                            </div>
                     </div>
              )
       }
</div>
  )
}

export default CreateCoupen
