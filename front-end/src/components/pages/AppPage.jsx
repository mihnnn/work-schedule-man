import React from 'react';
import SideBar from '../common/SideBar.jsx';
import AppContent from '../app-comp/AppContent.jsx';
import { useAuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AppPage() {
  const { authUser } = useAuthContext();

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className='flex bg-[#333] bg-clip-padding bg-opacity-0 '>
      <SideBar />
      <AppContent />
    </div>
  );
}

export default AppPage;
