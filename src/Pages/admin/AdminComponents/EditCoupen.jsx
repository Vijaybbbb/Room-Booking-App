import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { baseUrl } from '../../../utils' 
import axios from 'axios';


const EditCoupen = ({id,handleGoBack}) => {

       const { data, error, loading ,refetchData} = useFetch(`${baseUrl}/admin/viewCoupen/${id}`)
       const [singleCoupen, setViewSingleCoupen] = useState(data)

       const [coupenData, setCoupenData] = useState()

       useEffect(() => {
              if (data) {
                     setCoupenData(data);
                     setViewSingleCoupen(data);
              }
       }, [data]);



       async function handleUpdate(e) {
              e.preventDefault()
              await axios.post(`${baseUrl}/admin/updateCoupen/${id}`, coupenData, { withCredentials: true }).then((res) => {
                     handleGoBack()
                    
              }).catch(err => console.log(err))
       }

       function getValue(e) {
              e.preventDefault()
              setCoupenData({
                     ...coupenData,
                     [e.target.name]: e.target.value
              })
              console.log(coupenData);
       }


  return (
    <div>
      <div className='createUserByAdmin'>
                            <div className="wrapper">
                                   <div className="login-box">
                                          <h3 className="info-text">Update Coupen</h3>
                                          <form className="form-container" action="">
                                                 <div className="input-addon">
                                                        <input 
                                                        className="form-element
                                                         input-field"
                                                          placeholder="Coupen Code" 
                                                          type="text" 
                                                           name="code" 
                                                           value={coupenData?.code || data.code }
                                                           onChange={getValue} />
                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                 <select
                                                                        name='discountType'
                                                                        tabIndex="1"
                                                                        required
                                                                        autoFocus
                                                                        onChange={getValue}
                                                                        value={coupenData?.discountType || data.discountType}
                                                                 >
                                                                        <option value="">Select Coupen Type</option>
                                                                        <option value="percentage">percentage</option>
                                                                        <option value="fixed">fixed</option>
                                                                        {/* Add more options as needed */}
                                                                 </select>                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                        <input
                                                         className="form-element input-field" 
                                                        placeholder="Value"
                                                         type="text"
                                                         value={coupenData?.discountValue || data.discountValue}
                                                          name="discountValue"
                                                           onChange={getValue}/>
                                                        
                                                 </div>
                                                 <div className="input-addon">
                                                        <input 
                                                        className="form-element input-field"
                                                         placeholder="minimum order" 
                                                         value={coupenData?.minOrder || data.minOrder}
                                                         type="Number" 
                                                          name="minOrder"
                                                           onChange={getValue}/>
                                                        
                                                 </div>
                                                 
                                                 <br /><br />
                                                 <button className="form-element is-submit" type="submit" onClick={handleUpdate}>Update</button>
                                          </form>
                                      
                                   </div>
                            </div>
                     </div>
    </div>
  )
}

export default EditCoupen
