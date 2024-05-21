import React from 'react'
import '../styles/App.css'
import Banner from '../home-comp/layout/Banner.jsx'
import Cards from '../home-comp/layout/Cards'
import Footer from '../home-comp/layout/Footer'
import Navbar from '../common/Navbar.jsx'


function Home () {
    return (
        <>
          <Navbar />
          <Banner />
          <Cards />
          <Footer />
        </>
    )
}
export default Home;