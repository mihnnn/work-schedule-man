import React from 'react'
import '../styles/App.css'
import Banner from '../home-comp/layout/Banner.jsx'
import Cards from '../home-comp/layout/Cards'
import Footer from '../home-comp/layout/Footer'
import Navbar from '../common/Navbar.jsx'
// import { useAuthContext } from '../../context/AuthContext.jsx'
import { useSelector } from 'react-redux'


function Home () {
  // const { authUser } = useAuthContext();
  // const {currentUser} = useSelector((state) => state.user);

  // if (currentUser) {
  //   console.log("authUser saved in persist:root:  ",currentUser);
  // } else {
  //   console.log("No authUser found in the persist:root");
  // }
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