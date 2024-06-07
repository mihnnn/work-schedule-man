import React, {useState} from "react";
import ProfileDropdown from "../sidebar-comp/ProfileDropdown.jsx";
import EventRoutes from "../sidebar-comp/EventRoutes.jsx";
import LogoutButton from "../sidebar-comp/LogoutButton.jsx";
import CopyPublicPageLink from "../sidebar-comp/CopyPublicPageLink.jsx";
import PublicPageButton from "../sidebar-comp/PublicPageButton.jsx";

function SideBar() {

  return (
    // profile dropdown on top, along with avatar and username
    // sidebar routes: /event-types, /bookings, /availability, /settings
    // bottom of sidebar: logout button
    <div className="fixed top-0 left-0 h-screen w-[16%] text-white flex flex-col justify-start border-r border-white bg-[#333] p-4">
      <ProfileDropdown />
      <div className="divider px-3"></div>
      <EventRoutes />
      <PublicPageButton />
      <CopyPublicPageLink />
      <LogoutButton />
    </div>
  )
}

export default SideBar