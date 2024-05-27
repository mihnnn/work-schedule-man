import React from 'react'
import { useLocation } from 'react-router-dom'
import BookingsItem from './BookingsItem';

function BookingsNav() {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className='flex gap-4 text-gray-100'>
            <BookingsItem
                route="upcoming"
                routeName="Upcoming"
                isActive={currentPath === "/app/bookings/upcoming"}
            />
            <BookingsItem
                route="past"
                routeName="Past"
                isActive={currentPath === "/app/bookings/past"}
            />
            <BookingsItem
                route="canceled"
                routeName="Canceled"
                isActive={currentPath === "/app/bookings/canceled"}
            />
        </div>

  )
}

export default BookingsNav
