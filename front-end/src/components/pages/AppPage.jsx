import React from 'react'
import SideBar from '../common/SideBar.jsx'
import AppContent from '../app-comp/AppContent.jsx'


//Will have SideBar compomemt amd AppContent component
function AppPage() {
  return (
    <div className='flex rounded-lg bg-[#333] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <SideBar />
      <AppContent />
    </div>
  )
}

export default AppPage
