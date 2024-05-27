import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import UpcomingBookings from './booking-routes/UpcomingBookings'
import PastBookings from './booking-routes/PastBookings'


function BookingsPage() {
  return (
    <div>
      <nav>
        <ul className="flex gap-4">
          <li className="btn btn-ghost p-0">
            <NavLink to="/bookings/upcoming" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Upcoming
            </NavLink>
          </li>
          <li className="btn btn-ghost p-0">
            <NavLink to="/bookings/past" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Past
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/bookings/upcoming" element={<UpcomingBookings />} />
        <Route path="/bookings/past" element={<PastBookings />} />
      </Routes>
    </div>
  )
}

export default BookingsPage
