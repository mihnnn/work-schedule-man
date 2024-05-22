import React from 'react';
import { Link } from 'react-router-dom';
import WsmItem from './WsmItem.jsx';
import { FaLink } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";

function EventRoutes() {
  return (
    <div className='py-2 flex flex-col text-lg h-10'>
      <Link to="/app/event-types">
        <WsmItem routeName="Event Types" icon={FaLink} />
      </Link>
      <Link to="/app/bookings">
        <WsmItem routeName="Bookings" icon={FaRegCalendar} />
      </Link>
      <Link to="/app/availability">
        <WsmItem routeName="Availability" icon={FaRegClock} />
      </Link>
    </div>
  );
}

export default EventRoutes;
