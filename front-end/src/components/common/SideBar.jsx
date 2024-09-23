import React, { useState } from "react";
import ProfileDropdown from "../sidebar-comp/ProfileDropdown.jsx";
import EventRoutes from "../sidebar-comp/EventRoutes.jsx";
import LogoutButton from "../sidebar-comp/LogoutButton.jsx";
// import CopyPublicPageLink from "../sidebar-comp/CopyPublicPageLink.jsx";
// import PublicPageButton from "../sidebar-comp/PublicPageButton.jsx";

function SideBar() {

  return (
    // profile dropdown on top, along with avatar and username
    // sidebar routes: /event-types, /bookings, /availability, /settings
    // bottom of sidebar: logout button
    <div className="fixed top-0 left-0 h-screen w-[16%] text-white text-sm flex flex-col justify-start border-r border-[#888] bg-[#333] p-4">
      <div>
        <ProfileDropdown />
      </div>
      <div className="divider px-3"></div>
      <div className="h-full">
        <EventRoutes />
      </div>
      {/* <PublicPageButton />
      <CopyPublicPageLink /> */}
      <div className="justify-end">
        <LogoutButton />

      </div>
    </div>
  )
}

export default SideBar