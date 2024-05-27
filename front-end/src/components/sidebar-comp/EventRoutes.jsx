import React from 'react';
import { useLocation } from 'react-router-dom';
import WsmItem from './WsmItem.jsx';
import { FaLink, FaRegCalendar, FaRegClock } from "react-icons/fa6";

function EventRoutes() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className='py-2 flex flex-col text-lg h-10'>
      <WsmItem
        route="/app/event-types"
        routeName="Event Types"
        icon={FaLink}
        isActive={currentPath === "/app/event-types"}
      />
      
      <WsmItem
        route="/app/bookings/upcoming"
        routeName="Bookings"
        icon={FaRegCalendar}
        isActive={currentPath === "/app/bookings/upcoming" || currentPath === "/app/bookings/past" || currentPath === "/app/bookings/canceled"}
      />
      <WsmItem
        route="/app/availability"
        routeName="Availability"
        icon={FaRegClock}
        isActive={currentPath === "/app/availability"}
      />
    </div>
  );
}

export default EventRoutes;
