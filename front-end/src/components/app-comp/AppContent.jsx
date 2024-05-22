import React from 'react'
import MiniBtn from './MiniBtn.jsx'
import { Route, Routes } from 'react-router-dom'
import EventTypes from './layout/EventTypes'
import Bookings from './layout/Bookings'
import Availability from './layout/Availability'



function AppContent() {
  // return different content for different routes
  //this is example of /app/event-types
  return (
    <div className="flex-grow bg-[#222]">
      <Routes>
        <Route path="event-types" element={<EventTypes />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="availability" element={<Availability />} />
      </Routes>
    </div>
  )
}

export default AppContent
