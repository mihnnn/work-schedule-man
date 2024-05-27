import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/app/*" element={authUser ? <AppPage /> : <Navigate to="/" />} />
        <Route path="/app/" element= {authUser? <Navigate to="/app/event-types/" /> : <Navigate to="/" /> }></Route>
        <Route path="/app/bookings/*" element={<Navigate to="/app/bookings/upcoming" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
