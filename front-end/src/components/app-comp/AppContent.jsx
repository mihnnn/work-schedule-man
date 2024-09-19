import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventTypes from './layout/event-types/EventTypes.jsx'
import Bookings from './layout/bookings/Bookings.jsx'
import Availability from './layout/availability/Availability.jsx'
import EditEvent from './layout/event-types/sub-event-pages/EditEvent.jsx'
import EditAvail from './layout/availability/sub-avail-pages/EditAvail.jsx'
import DashBoard from './layout/dashboard/DashBoard.jsx'
import TeamManagement from './layout/team-management/TeamManagement.jsx'
import TeamOverview from './layout/team-overview/TeamOverview.jsx'
import Schedules from './layout/schedules/Schedules.jsx'
import Meetings from './layout/meetings/Meetings.jsx'
import Requests from './layout/requests/Requests.jsx'



function AppContent() {
  return (
    <div className="bg-[#222] ml-[16%] flex-1 overflow-auto h-screen">
      <Routes>
        {/* Manager UI */}
        <Route path="dashboard/*" element={<DashBoard />} />
        <Route path="team-management" element={<TeamManagement />} />
        <Route path="schedules" element={<Schedules />}/>
        <Route path="meetings" element={<Meetings />} />
        <Route path="requests" element={<Requests />} />

    
        {/* Employee UI */}
        <Route path="team-overview" element={<TeamOverview />} />

        {/* Shared UI */}
        <Route path="availability" element={<Availability />} />

        {/* Unused UI */}
        <Route path="event-types" element={<EventTypes />} />
        <Route path="bookings/*" element={<Bookings />} />
        <Route path='event-types/:eventId' element={<EditEvent />} />
        <Route path='availability/:availId' element={<EditAvail />} />
      </Routes>
    </div>
  )
}

export default AppContent
