import React from 'react'
import Header from '../../components/Header'
import Navbar from '../../components/Navbar'
import Featured from '../Featured.js'
import FeaturedProperties from '../FeaturedProperties'
import Footer from '../Footer'
import MailList from '../MailList'
import PropertyList from '../PropertyList'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>

      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Home guests Love</h1>
        <FeaturedProperties/>
        <MailList/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
