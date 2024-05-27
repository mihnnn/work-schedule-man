import React from 'react'
import BookingsTitle from './BookingsTitle.jsx'
import BookingsPage from './BookingsPage.jsx'


function Bookings() {
  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
        <BookingsTitle />
        <BookingsPage />
        
    </div>
  )
}

export default Bookings
