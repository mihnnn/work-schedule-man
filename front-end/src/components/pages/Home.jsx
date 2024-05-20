import React from 'react'
import '../styles/App.css'
import Banner from '../home-comp/layout/Banner.jsx'
import Cards from '../home-comp/layout/Cards'
import Footer from '../home-comp/layout/Footer'

function Home () {
    return (
        <>
          <Banner />
          <Cards />
          <Footer />
        </>
    )
}
export default Home;