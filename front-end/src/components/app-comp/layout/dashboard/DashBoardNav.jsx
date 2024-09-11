import React from 'react'
import { useLocation } from 'react-router-dom'
import DashBoardItem from './DashBoardItem';

function DashBoardNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='flex gap-4 text-gray-100'>
            <DashBoardItem
                route="team"
                routeName="Team"
                isActive={currentPath === "/app/dashboard/team"}
            />
            <DashBoardItem
                route="schedule"
                routeName="Schedule"
                isActive={currentPath === "/app/dashboard/schedule"}
            />
            <DashBoardItem
                route="activity"
                routeName="Activity"
                isActive={currentPath === "/app/dashboard/activity"}
            />
        </div>

  )
}

export default DashBoardNav
