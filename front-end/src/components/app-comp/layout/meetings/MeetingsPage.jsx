import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import UpcomingMeetings from './meeting-routes/UpcomingMeetings'
import PastMeetings from './meeting-routes/PastMeetings'
import CanceledMeetings from './meeting-routes/CanceledMeetings'



function MeetingsPage({meetings, teamInfo}) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="upcoming" />} />
        <Route path="upcoming" element={<UpcomingMeetings meetings={meetings} teamInfo={teamInfo}/>} />
        <Route path="past" element={<PastMeetings meetings={meetings}/>} />
        <Route path="canceled" element={<CanceledMeetings meetings={meetings}/>} />
      </Routes>
    </div>
  )
}

export default MeetingsPage
