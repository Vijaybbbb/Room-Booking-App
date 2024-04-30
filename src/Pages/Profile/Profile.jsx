import React, { useEffect, useState } from 'react';
import './Profile.css'; // Import your custom CSS file
import Navbar from '../../Components/Navbar/Navbar';
import ProfileDeails from '../../Components/ProfileInfo/ProfileDeails';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../utils';

const Profile = () => {
       const [access, setAccess] = useState(false)
       const userDetails = useSelector(state => state.userDetails)
       const {data,loading,error,refetchData} = useFetch(`${baseUrl}/user/singleUser?id=${userDetails?.userId}`)
       useEffect(() => {
              window.scrollTo(0, 0);
              fetchHome()
       }, [])

       async function fetchHome() {
              await axios.get(`http://localhost:3000?userId=${userDetails?.userId}`, { withCredentials: true }).then((res) => {
                     setAccess(true)
              }).catch(err => setError(err))
       }



       return (
              <div>
                     <Navbar access={access}/>
                     <ProfileDeails userId={userDetails?.userId} email={data.email} username={data.username}/>
              </div>

       );
};

export default Profile;
