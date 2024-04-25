import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Featured from '../../Components/Featured/Featured'
import PropertyList from '../../Components/PropertyList/PropertyList'
import FeaturedProperties from '../../Components/FeaturedProperties/FeaturedProperties'
import MailList from '../../Components/MailList/MailList'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Home = () => {

  const userDetails = useSelector(state => state.userDetails)
  const [access,setAccess]  = useState(false)
  const [error,setError]  = useState()


  useEffect(()=>{
    fetchHome()
  },[])

  async function fetchHome(){
    await axios.get(`http://localhost:3000?userId=${userDetails?.userId}`,{withCredentials:true}).then((res)=>{
      console.log(res);
        setAccess(true)
    }).catch(err=>setError(err))
  }


  return (
    <div>
      {access ? (
    <div>
      <Navbar access={access}/>
      <Header access={access}/>
      <div className="homeContainer">
        <Featured access={access}/>
        <h1 className="homeTitle"> Browse Property By Type</h1>
        <PropertyList access={access}/>
        <h1 className="homeTitle"> Home guests love</h1>
        <FeaturedProperties access={access}/>
        <MailList access={access}/>
        <Footer/>
      </div>
    </div>
):(
   <div>
      <Navbar access={access}/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle"> Browse Property By Type</h1>
        <PropertyList/>
        <h1 className="homeTitle"> Home guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
)}
    </div>
  )
}

export default Home
