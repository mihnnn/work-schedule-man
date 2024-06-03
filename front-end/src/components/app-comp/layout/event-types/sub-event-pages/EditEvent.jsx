import React from 'react'
import EditEventPage from './EditEventPage'
import EditEventSideBar from './EditEventSideBar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

function EditEvent() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get('tabName' || 'setup');

  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-6'>

        <div className='flex text-white'>
          <FaArrowLeft onClick={handleBackClick} className='cursor-pointer w-5 h-5'/>
          <span className=' text-base ml-2'>15</span>
        </div>
          



      </div>
      <div className='flex'>
        <EditEventSideBar eventId={eventId} tabName={tabName} />
        <EditEventPage eventId={eventId} tabName={tabName} />
      </div>
    </div>
  )
}

export default EditEvent
