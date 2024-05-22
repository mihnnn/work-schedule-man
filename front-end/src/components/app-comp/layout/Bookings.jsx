import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import UpcomingBookings from './booking-routes/UpcomingBookings'
import PastBookings from './booking-routes/PastBookings'

function Bookings() {
  return (
    <div>
        <div className='flex p-5'>
            <div>
                <h1 className="text-2xl font-semibold">Bookings</h1>
                <p>See upcoming and past events booked through your event type links.</p>

            </div>

        </div>


      <nav>
        <ul className="flex p-5 gap-4">
          <li className='btn btn-ghost'>
            <NavLink to="/bookings/upcoming" activeClassName="text-blue-500">
              Upcoming
            </NavLink>
          </li>
          <li className='btn btn-ghost'>
            <NavLink to="/bookings/past" activeClassName="text-blue-500">
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

export default Bookings
