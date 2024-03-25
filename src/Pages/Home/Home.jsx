import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import Featured from '../../Components/Featured/Featured'
import PropertyList from '../../Components/PropertyList/PropertyList'
import FeaturedProperties from '../../Components/FeaturedProperties/FeaturedProperties'
import MailList from '../../Components/MailList/MailList'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle"> Browse Property By Type</h1>
        <PropertyList/>
        <h1 className="homeTitle"> Home guests love</h1>
        <FeaturedProperties/>
        <MailList/>
      </div>
      
    </div>
  )
}

export default Home
