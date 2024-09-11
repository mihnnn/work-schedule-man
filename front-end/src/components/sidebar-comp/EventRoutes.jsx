import React from 'react';
import { useLocation } from 'react-router-dom';
import WsmItem from './WsmItem.jsx';
import { FaRegCalendar, FaRegClock } from "react-icons/fa6"
import { RiTeamLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BsCalendarCheck } from 'react-icons/bs';
import { IoIosPaper } from 'react-icons/io';





function EventRoutes() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className='py-2 flex flex-col text-lg h-10'>
      <WsmItem
        route="/app/dashboard"
        routeName="Dashboard"
        icon={MdDashboard}
        isActive={currentPath.startsWith("/app/dashboard")}
      />
      {/* <WsmItem
        route="/app/event-types"
        routeName="Event Types"
        icon={FaLink}
        isActive={currentPath.startsWith("/app/event-types")}
      /> */}
      <WsmItem
        route="/app/team-management"
        routeName={"Team Management"}
        icon={RiTeamLine}
        isActive={currentPath.startsWith("/app/team-management")}
      />

      <WsmItem
        route="/app/schedules"
        routeName="Schedules"
        icon={FaRegCalendar}
        isActive={currentPath.startsWith("/app/schedules")}
      />

      <WsmItem
        route="/app/meetings"
        routeName="Meetings"
        icon={BsCalendarCheck}
        isActive={currentPath.startsWith("/app/meetings")}
      />
      {/* <WsmItem
        route="/app/bookings/upcoming"
        routeName="Bookings"
        icon={FaRegCalendar}
        isActive={currentPath.startsWith("/app/bookings")}
      /> */}
      <WsmItem
        route="/app/availability"
        routeName="Availability"
        icon={FaRegClock}
        isActive={currentPath.startsWith("/app/availability")}
      />
      <WsmItem
        route="/app/requests"
        routeName="Requests"
        icon={FaRegClock}
        isActive={currentPath.startsWith("/app/requests")}
      />


    </div>
  );
}

export default EventRoutes;
