import React, { useEffect, useState } from 'react';
import avatar from "../../../../assets/images/avatar.png";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useGetPublicUser from '../../../../hooks/event-hooks/useGetPublicUser';
import { useGetEventInfoBySuffix } from '../../../../hooks/event-hooks/useGetEventInfoBySuffix';
import dayjs from 'dayjs';
import { FaRegCalendar } from 'react-icons/fa';

function BookEventInfo({username, suffix}) {
  const { loading: loadPubEvent, getEventInfo, event } = useGetEventInfoBySuffix(username, suffix);
  const { loading: loadPubUser, getPubUser, user } = useGetPublicUser(username);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  useEffect(() => {
    getPubUser(username);
    getEventInfo(username, suffix);
    parseQueryParams();
  }, [username, suffix, location.search]);

  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(location.search);
      if (!searchParams.has('slot')) {
        setSelectedDateTime(null); // Clear selectedDateTime if slot is not present
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location]);

  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const selectedDate = searchParams.get('date');
    const selectedTimeSlot = searchParams.get('slot');

    // console.log('selectedDate:', selectedDate);
    // console.log('selectedTimeSlot:', selectedTimeSlot);

    if (selectedDate && selectedTimeSlot) {
      // Convert the selectedTimeSlot to the proper format
      const timeSlot = dayjs(selectedTimeSlot).format('HH:mm:ss');
      const dateTime = dayjs(`${selectedDate}T${timeSlot}`).format();
      // console.log('dateTime:', dateTime);
      setSelectedDateTime(dateTime);
    } else {
      setSelectedDateTime(null); // Clear selectedDateTime if slot is not present
    }
  };

  return (
    <div className='w-full md:w-1/2 p-6 flex flex-col items-center md:items-start text-center md:text-left mr-20'>
      <img className='aspect-square rounded-full w-6 h-6 mb-2' src={avatar} alt="user avatar" />
      <p className='text-gray-400 text-sm font-semibold'>{user?.username}</p>
      <h1 className='text-xl font-semibold my-2'>{event.title}</h1>
      <p>{event.description}</p>
      {selectedDateTime && (
        <div className='text-gray-100 space-y-4 font-medium mt-4'>
          <div className='flex items-center text-sm'>
            <FaRegCalendar className='w-4 h-4 mr-2' />
            <div>
              <span>{dayjs(selectedDateTime).format('ddd, MMMM D, YYYY')}</span>
              <br />
              <span>{dayjs(selectedDateTime).format('HH:mm')} - {dayjs(selectedDateTime).add(event.duration, 'minute').format('HH:mm')}</span>
            </div>
          </div>
        </div>
      )}
      <div className=' text-gray-100 space-y-4 font-medium mt-4'>
        <div className='flex items-center text-sm'>
          <FaRegClock className='w-4 h-4 mr-2' />
          <span>{event.duration} minutes</span>
        </div>
        <div className='flex items-center text-sm'>
          <IoLocationOutline className='w-4 h-4 mr-2' />
          <span>Online</span>
        </div>
        <div className='flex items-center text-sm'>
          <BsGlobe className='w-4 h-4 mr-2' />
          <span>Timezone Asia/HoChiMinh</span>
        </div>
      </div>
    </div>
  );
}

export default BookEventInfo;
