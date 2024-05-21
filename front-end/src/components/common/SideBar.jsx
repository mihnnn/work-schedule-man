import React, {useState} from "react";
import ProfileDropdown from "../sidebar-comp/ProfileDropdown.jsx";
import EventRoutes from "../sidebar-comp/EventRoutes.jsx";
import LogoutButton from "../sidebar-comp/LogoutButton.jsx";

function SideBar() {

  return (
    // profile dropdown on top, along with avatar and username
    // sidebar routes: /event-types, /bookings, /availability, /settings
    // bottom of sidebar: logout button
    <div className="text-white flex p-4 min-w-[16%] h-screen flex-col justify-start border-r-[white] border-r border-solid bg-[#333]">
      <ProfileDropdown />
      <div className="divider px-3"></div>
      <EventRoutes />
      <LogoutButton />
    </div>
  )
}

export default SideBar