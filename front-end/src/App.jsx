import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Cookies from 'js-cookie';

// import { useAuthContext } from './context/AuthContext';
import { useSelector } from 'react-redux';

import Home from './components/pages/Home';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Tos from './components/pages/Tos';
import AppPage from './components/pages/AppPage';
import PublicPage from './components/pages/PublicPage';
import PageNotFound from './components/pages/PageNotFound';
import BookEvent from './components/app-comp/layout/book-event/BookEvent';
import BookingConfirmation from './components/app-comp/layout/bookings/booking-routes/BookingConfirmation';
import PrivateRoute from './components/app-comp/PrivateRoute';
import OnboardingPage from './components/app-comp/layout/broading-page/OnboardingPage';
// import GoogleAuthCallback from './components/pages/GoogleAuthCallback';

function App() {
  // const { authUser } = useAuthContext();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth/google/callback" element={<GoogleAuthCallback />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path='/onboarding' element={<OnboardingPage />} />
          <Route path="/app/*" element={<AppPage />} />
        </Route>
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/app/booking/:bookingId" element={<BookingConfirmation />} />

        <Route path="/:username" element={<PublicPage />} />
        <Route path="/:username/:suffix" element={<BookEvent />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
