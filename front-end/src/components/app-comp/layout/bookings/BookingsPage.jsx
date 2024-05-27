import React from 'react';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import UpcomingBookings from './booking-routes/UpcomingBookings';
import PastBookings from './booking-routes/PastBookings';
import CanceledBookings from './booking-routes/CanceledBookings';

function BookingsPage() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <nav className="flex gap-4 text-gray-100">
        <NavLink to="/app/bookings/upcoming" className={`btn btn-ghost px-4 ${currentPath === "/app/bookings/upcoming" ? "bg-gray-400 bg-opacity-30" : ""}`}>
          Upcoming
        </NavLink>
        <NavLink to="/app/bookings/past" className={`btn btn-ghost p-4 ${currentPath === "/app/bookings/past" ? "bg-gray-400 bg-opacity-30" : ""}`}>
          Past
        </NavLink>
        <NavLink to="/app/bookings/canceled" className={`btn btn-ghost p-4 ${currentPath === "/app/bookings/canceled" ? "bg-gray-400 bg-opacity-30" : ""}`}>
          Canceled
        </NavLink>
      </nav>

      <Routes>
        <Route path="/app/bookings/upcoming" element={<UpcomingBookings />} />
        <Route path="/app/bookings/past" element={<PastBookings />} />
        <Route path="/app/bookings/canceled" element={<CanceledBookings />} />
      </Routes>
    </div>
  );
}

export default BookingsPage;
