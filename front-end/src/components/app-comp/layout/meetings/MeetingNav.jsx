import React from 'react'
import { useLocation } from 'react-router-dom'
import MeetingsItem from './MeetingsItem';

function MeetingNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='flex gap-4 text-gray-100'>
            <MeetingsItem
                route="upcoming"
                routeName="Upcoming"
                isActive={currentPath === "/app/meetings/upcoming"}
            />
            <MeetingsItem
                route="past"
                routeName="Past"
                isActive={currentPath === "/app/meetings/past"}
            />
            <MeetingsItem
                route="canceled"
                routeName="Canceled"
                isActive={currentPath === "/app/meetings/canceled"}
            />
        </div>

  )
}

export default MeetingNav
