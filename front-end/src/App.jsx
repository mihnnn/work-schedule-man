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
import './components/styles/App.css';
import { useAuthContext } from './context/AuthContext';
import BookEventPage from './components/app-comp/layout/book-event/BookEvent'; 
import useGetEventById from './hooks/event-hooks/useGetEventById';

function App() {
  const { authUser } = useAuthContext();
  const { loading, eventData, getEventById} = useGetEventById();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/app/*" element={authUser ? <AppPage /> : <Navigate to="/" />} />
        {/* this page shouldnt require auth user */}
        <Route path={`/${authUser.username}`} element={<PublicPage />} /> 

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
