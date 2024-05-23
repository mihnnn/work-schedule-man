import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import Navbar from './components/common/Navbar';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Tos from './components/pages/Tos';
import AppPage from './components/pages/AppPage';
import './components/styles/App.css';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tos' element={<Tos />} />
        <Route path="/app/*" element={<AppPage />} />
      </Routes>
      <Toaster />

    </>
  );
}

export default App;
