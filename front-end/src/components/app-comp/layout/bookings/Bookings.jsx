import React from 'react'
import BookingsHeader from './BookingsHeader.jsx'
import BookingsPage from './BookingsPage.jsx'
import BookingsNav from './BookingsNav.jsx'


function Bookings() {
  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
        <BookingsHeader />
        <div className='divider'></div>
        <BookingsNav />
        <BookingsPage />
        
    </div>
  )
}

export default Bookings
