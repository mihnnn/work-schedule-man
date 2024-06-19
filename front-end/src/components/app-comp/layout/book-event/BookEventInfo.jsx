import React, { useEffect } from 'react'
import avatar from "../../../../assets/images/avatar.png";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import useGetPublicUser from '../../../../hooks/event-hooks/useGetPublicUser';
import { useGetEventInfoBySuffix } from '../../../../hooks/event-hooks/useGetEventInfoBySuffix';

function BookEventInfo() {
  const { username, suffix } = useParams();
  const { loading: loadPubEvent, getEventInfo, event } = useGetEventInfoBySuffix(username,suffix);
  const { loading: loadPubUser, getPubUser, user } = useGetPublicUser(username);
  useEffect(() => {
    getPubUser(username);
    getEventInfo(username, suffix);
  }, [username, suffix])


  return (
    <div className='w-full md:w-1/2 p-6 flex flex-col items-center md:items-start text-center md:text-left mr-20'>
      <img className='aspect-square rounded-full w-6 h-6 mb-2' src={avatar} alt="user avatar" />
      <p className='text-gray-400 text-sm font-semibold'>{user?.username}</p>
      <h1 className='text-xl font-semibold my-2'>{event.title} </h1>
      <p>{event.description}</p>
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
          <span>Timezone dropdown</span>
        </div>
      </div>
    </div>
  )
}

export default BookEventInfo
