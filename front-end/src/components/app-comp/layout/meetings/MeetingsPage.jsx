import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UpcomingMeetings from './meeting-routes/UpcomingMeetings'
import PastMeetings from './meeting-routes/PastMeetings'
import CanceledMeetings from './meeting-routes/CanceledMeetings'



function MeetingsPage() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="upcoming" />} />
        <Route path="upcoming" element={<UpcomingMeetings />} />
        <Route path="past" element={<PastMeetings />} />
        <Route path="canceled" element={<CanceledMeetings />} />
      </Routes>
    </div>
  )
}

export default MeetingsPage
