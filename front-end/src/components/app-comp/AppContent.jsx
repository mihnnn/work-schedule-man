import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventTypes from './layout/event-types/EventTypes.jsx'
import Bookings from './layout/bookings/Bookings.jsx'
import Availability from './layout/availability/Availability.jsx'



function AppContent() {
  return (
    <div className="bg-[#222] ml-[16%] flex-1 overflow-auto h-full">
      <Routes>
        <Route path="event-types" element={<EventTypes />} />
        <Route path="bookings/*" element={<Bookings />} />
        <Route path="availability" element={<Availability />} />
      </Routes>
    </div>
  )
}

export default AppContent
