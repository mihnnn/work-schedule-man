import React from 'react';
import { Routes, Route, Navigate, } from 'react-router-dom';
import UpcomingBookings from './booking-routes/UpcomingBookings';
import PastBookings from './booking-routes/PastBookings';
import CanceledBookings from './booking-routes/CanceledBookings';



function BookingsPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="upcoming" />} />
        <Route path="upcoming" element={<UpcomingBookings />} />
        <Route path="past" element={<PastBookings />} />
        <Route path="canceled" element={<CanceledBookings />} />
      </Routes>
    </div>
  );
}

export default BookingsPage;
