import React, { useEffect, useState } from 'react'
import BookingSuccess from './BookingSuccess'
import BookingCanceled from './BookingCanceled'
import { useAuthContext } from '../../../../../context/AuthContext'
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useParams } from 'react-router-dom';
import useGetBookingById from '../../../../../hooks/bookevent-hooks/useGetBookingById';


function BookingConfirmation() {
  const { authUser } = useAuthContext(); 
  const { loading, getBookingById, bookingData } = useGetBookingById();
  const { bookingId } = useParams();
  const [bookingState, setBoookingState] = useState(null)

  const location = useLocation()

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId);
    }
  }, [bookingId])
  
  useEffect(()=>{
    if (bookingData?.state){
      setBoookingState(bookingData.state)
    }
  }, [bookingData?.state])


  return (

    <div className='bg-[#111] overflow-auto h-screen'>
      {authUser &&
        <div className='-mb-4 ml-4 mt-2 z-0'>
          <a href="/app/bookings/upcoming" className='mt-2 inline-flex items-center px-1 py-2 text-sm'>
            <FaArrowLeft className='w-5 h-5 mr-2' />
            <p className='text-xl'>Back to bookings</p>
          </a>
        </div>
      }
      {
        bookingState === 'upcoming'  &&
        <BookingSuccess bookingData={bookingData} />
      }
      {
        bookingState=== 'past' && 
        <BookingSuccess bookingData={bookingData} />
      }
      {
        bookingState === 'canceled' &&
        <BookingCanceled bookingData={bookingData} />
      }

    </div>
  )
}

export default BookingConfirmation
