import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../utils';
import axios from 'axios';

const ProfileDeails = ({userId,email,username}) => {


       const {data,loading} = useFetch(`${baseUrl}/user/singleUserDetails/${userId}`)
       const [predetails,setPrevDetails]  = useState(data)
       const [image,setImage]  = useState([])

       const ref = useRef()

       useEffect(() => { 
              if (data) {
                setDetails({
                  username: username,
                  firstname: data.firstname,
                  lastname: data.lastname,
                  state: data.state,
                  location: data.location,
                  email: email,
                  phone: data.phone,
                  pincode: data.pincode,
                });
              }
            }, [data]);

       const [details,setDetails]  = useState({
              
              username:'',
              firstname:'',
              lastname:'',
              state:'',
              location:'',
              email:email,
              phone:'',
              pincode:''

       })
             
       function getValue(e){
              setDetails({
                     ...details,
                     [e.target.name]: e.target.value
              })
       }
       

       async function handleClick(e){ 
              e.preventDefault();
              const formData = new FormData();
             
              if (image) { // Check if image is not null
                     formData.append('image', image);
                   }
               
                   for (const key in details) {
                     formData.append(key, details[key]);
                   }
                    
              await axios.post(`${baseUrl}/user/updateUserDetails/${userId}`,formData,{withCredentials:true,headers: {
                     'Content-Type': 'multipart/form-data'
              }}).then((res)=>{
                     console.log(res);
              }).catch((err)=>{
                     console.log(err);
              })

              await axios.put(`${baseUrl}/user/updateUser?id=${userId}`,details,{withCredentials:true}).then((res)=>{
                     console.log(res);
              }).catch((err)=>{
                     console.log(err);
              })
       }

       function onInputChange(e){
              const file = e.target.files[0]; // Take only the first file
              setImage(file);
               console.log(file);
        }

  return (
       <html lang="en">
       <head>
         <link rel="stylesheet" href="./sample.css" />
         <link
           rel="stylesheet"
           href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
         />
       </head>
       <body>
        <div className='profilePageView'>
         <div className="container-xl px-4 mt-4">
           <hr className="mt-0 mb-4" />
           <div className="row">
             <div className="col-xl-4">
               <div className="card mb-4 mb-xl-0">
                 <div className="card-header">Profile Picture</div>
                 <div className="card-body text-center">
                   <img
                     className="img-account-profile rounded-circle mb-2"
                     id="profile-image"
                     src={`../../../src/images/${data?.profileImg}`}
                     alt=""
                   />
                   <div className="small font-italic text-muted mb-4">
                     JPG or PNG no larger than 5 MB
                   </div>
                   <form id="image-upload-form">
                     <input
                       type="file"
                       id="image-upload"
                       onChange={onInputChange}
                       style={{ display: 'none' }}
                     />
                     <label
                       htmlFor="image-upload"
                       className="btn btn-primary"
                     >
                       Upload new image
                     </label>
                   </form>
                 </div>
               </div>
             </div>
             <div className="col-xl-8">
               <div className="card mb-4">
                 <div className="card-header">Account Details</div>
                 <div className="card-body">
                   <form >
                     <div className="mb-3">
                       <label className="small mb-1" htmlFor="inputUsername">
                         Username (how your name will appear to other users on
                         the site)
                       </label>
                       <input
                         className="form-control"
                         ref={ref}
                         id="inputUsername"
                         name="username"
                         type="text"
                         value={details?.username || username}
                         placeholder="Enter your username"
                         onChange={getValue}
                       />
                     </div>
                     <div className="row gx-3 mb-3">
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputFirstName">
                           First name
                         </label>
                         <input
                           className="form-control"
                           id="inputFirstName"
                           name="firstname"
                           type="text"
                           placeholder="Enter your first name"
                           onChange={getValue}
                           value={details?.firstname || data?.firstname}
                         />
                       </div>
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputLastName">
                           Last name
                         </label>
                         <input
                           className="form-control"
                           id="inputLastName"
                           name="lastname"
                           type="text"
                           placeholder="Enter your last name"
                           onChange={getValue}
                           value={details?.lastname || data?.lastname}
                         />
                       </div>
                     </div>
                     <div className="row gx-3 mb-3">
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputOrgName">
                           State
                         </label>
                         <input
                           className="form-control"
                           id="inputOrgName"
                           name="state"
                           type="text"
                           placeholder="Enter your organization name"
                           onChange={getValue}
                           value={details?.state  || data?.state}
                         />
                       </div>
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputLocation">
                           Location
                         </label>
                         <input
                           className="form-control"
                           id="inputLocation"
                           name="location"
                           type="text"
                           placeholder="Enter your location"
                           onChange={getValue}
                           value={details?.location  || data?.location}
                         />
                       </div>
                     </div>
                     <div className="mb-3">
                       <label
                         className="small mb-1"
                         htmlFor="inputEmailAddress"
                       >
                         Email address
                       </label>
                       <input
                         className="form-control"
                         id="inputEmailAddress"
                         name="email"
                         type="email"
                         value={email  || data?.email}
                         placeholder="Enter your email address"
                         onChange={getValue}
                       />
                     </div>
                     <div className="row gx-3 mb-3">
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputPhone">
                           Phone number
                         </label>
                         <input
                           className="form-control"
                           id="inputPhone"
                           name="phone"
                           type="tel"
                           placeholder="Enter your phone number"
                           onChange={getValue}
                           value={details?.phone  || data?.phone}
                         />
                       </div>
                       <div className="col-md-6">
                         <label className="small mb-1" htmlFor="inputBirthday">
                       Pin code
                         </label>
                         <input
                           className="form-control"
                           id="inputBirthday"
                           name="pincode"
                           type="text"
                           placeholder="Enter your birthday"
                           onChange={getValue}
                           value={details?.pincode  || data?.pincode}
                         />
                       </div>
                     </div>
                     <button className="btn btn-primary" onClick={(e)=>{handleClick(e)}}> 
                       Save changes
                     </button>
                   </form>
                 </div>
               </div>
             </div>
             </div>
           </div>
         </div>
       </body>
     </html>
    
  )
}

export default ProfileDeails
