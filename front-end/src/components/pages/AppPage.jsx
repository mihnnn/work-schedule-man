import React from 'react';
import SideBar from '../common/SideBar.jsx';
import AppContent from '../app-comp/AppContent.jsx';
// import { useAuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AppPage() {
  // const { authUser } = useAuthContext();
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className='flex bg-[#333] '>
      <SideBar />
      <AppContent />
    </div>
  );
}

export default AppPage;
