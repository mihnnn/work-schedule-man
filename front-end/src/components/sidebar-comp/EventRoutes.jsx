import React from 'react'
import WsmItem from './WsmItem.jsx'
import { FaLink } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";



function EventRoutes() {
  return (
    <div className='py-2 flex flex-col text-lg h-10'>
      <WsmItem route="/app/event-types" routeName="Event Types" icon={ FaLink } />
      <WsmItem route="/app/bookings" routeName="Bookings" icon={ FaRegCalendar } />
      <WsmItem route="/app/availability" routeName="Availability" icon={ FaRegClock } />

    </div>
  )
}

export default EventRoutes
