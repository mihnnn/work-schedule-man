import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import UpcomingBookings from './booking-routes/UpcomingBookings';
import PastBookings from './booking-routes/PastBookings';
import CanceledBookings from './booking-routes/CanceledBookings'; // Import CanceledBookings component

function BookingsPage() {
  return (
    <div>
      <nav>
        <ul className="flex gap-4">
          <li className="btn btn-ghost p-0">
            <NavLink to="/app/bookings/upcoming" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Upcoming
            </NavLink>
          </li>
          <li className="btn btn-ghost p-0">
            <NavLink to="/app/bookings/past" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Past
            </NavLink>
          </li>
          <li className="btn btn-ghost p-0">
            <NavLink to="/app/bookings/canceled" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Canceled
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/app/bookings/*" element={<Navigate to="/app/bookings/upcoming" />} />
        <Route path="/app/bookings/upcoming" element={<UpcomingBookings />} />
        <Route path="/app/bookings/past" element={<PastBookings />} />
        <Route path="/app/bookings/canceled" element={<CanceledBookings />} />
      </Routes>
    </div>
  );
}

export default BookingsPage;
