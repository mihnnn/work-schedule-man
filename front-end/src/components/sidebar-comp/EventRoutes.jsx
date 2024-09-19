import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WsmItem from './WsmItem.jsx';
import { FaRegCalendar, FaRegClock } from "react-icons/fa6"
import { RiTeamLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { BsCalendarCheck } from 'react-icons/bs';
import { IoIosPaper } from 'react-icons/io';
import { FaRegBell } from "react-icons/fa";



function EventRoutes() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentUserRole = useSelector(state => state.user.currentUser.role);

  return (
    <div className='py-2 flex flex-col text-lg h-10'>
      {currentUserRole === "Manager" && (
        <>
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
            icon={FaRegBell}
            isActive={currentPath.startsWith("/app/requests")}
          />
        </>
      )}

      {currentUserRole === "Employee" && (
        <>
          <WsmItem
            route="/app/team-overview"
            routeName="Team Overview"
            icon={MdDashboard}
            isActive={currentPath.startsWith("/app/team-overview")}
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
        </>
      )}
    </div>
  );
}

export default EventRoutes;
