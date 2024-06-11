import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Tos from './components/pages/Tos';
import AppPage from './components/pages/AppPage';
import PublicPage from './components/pages/PublicPage';
import PageNotFound from './components/pages/PageNotFound';
import BookEvent from './components/app-comp/layout/book-event/BookEvent';
import './components/styles/App.css';
import { useAuthContext } from './context/AuthContext';


function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/app/*" element={authUser ? <AppPage /> : <Navigate to="/" />} />

        {/* Public route for username profiles */}
        <Route path="/:username" element={<PublicPage />} /> 
        <Route path="/:username/*" element={<BookEvent />} /> 


        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
