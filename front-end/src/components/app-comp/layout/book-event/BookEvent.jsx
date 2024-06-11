import React from 'react';
import avatar from "../../../../assets/images/avatar.jpg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCalendarViewMonth } from "react-icons/md";
import { MdOutlineCalendarViewWeek } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";

function BookEvent() {
  return (
    <main className='flex h-full justify-center min-h-screen bg-gray-950'>
      <div className='flex flex-col min-h-full w-full items-center overflow-visible m-auto'>
        <div className='fixed top-4 z-10 right-4 flex gap-2'>
          {/* Need help? and switch layout */}
          <button className='btn btn-outline px-4 py-2.5'>Need help?</button>
          <div role='group' dir='ltr' className='min-h-9 border relative inline-flex gap-0.5 rounded-md p-1'>
            <button type='button' role='radio' aria-checked='true' className='aria-checked:bg-gray-400 aria-checked:bg-opacity-30 relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors [&[aria-checked=false]]:hover:text-emphasis' tabIndex={-1}>
              <FaRegCalendarAlt className='text-xl' />
            </button>
            <button type='button' role='radio' aria-checked='false' className='aria-checked:bg-gray-400 aria-checked:bg-opacity-30 relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors [&[aria-checked=false]]:hover:text-emphasis' tabIndex={-1}>
              <MdCalendarViewMonth className='text-xl' />
            </button>
            <button type='button' role='radio' aria-checked='false' className='aria-checked:bg-gray-400 aria-checked:bg-opacity-30 relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors [&[aria-checked=false]]:hover:text-emphasis' tabIndex={-1}>
              <MdOutlineCalendarViewWeek className='text-xl' />
            </button>
          </div>
        </div>

        <div className='flex flex-col md:flex-row w-full max-w-6xl mt-16 md:mt-0'>
          {/* User and event info */}
          <div className='[grid-area:meta] w-full md:w-1/2 p-6 flex flex-col items-center md:items-start text-center md:text-left'>
            <img className='aspect-square rounded-full w-24 h-24 mb-4' src={avatar} alt="user avatar" />
            <p className='text-gray-500 text-sm font-semibold'>Kita Ikuyo</p>
            <h1 className='text-xl font-semibold my-2'>Meeting Title</h1>
            <div className='space-y-4 font-medium mt-4'>
              <div className='flex items-center text-sm'>
                <FaRegClock className='w-4 h-4 mr-2' />
                <span>30 minutes</span>
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

          {/* Calendar view */}
          <div className='[grid-area:main] w-full md:w-1/2 p-6 flex flex-col items-center md:items-start'>
            <CalendarView />
          </div>

          <div className='[grid-area:timeslots] w-full md:w-1/2 p-6 flex flex-col items-center md:items-start'>
            <div className='w-full max-w-md mx-auto mt-6'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  9:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  10:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  11:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  12:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  13:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  14:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  15:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  16:00
                </div>
                <div className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
                  17:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const CalendarView = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className='w-full max-w-md mx-auto mt-6'>
      <div className='grid grid-cols-7 gap-2'>
        {days.map(day => (
          <div key={day} className='text-center font-semibold'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-2 mt-2'>
        {dates.map(date => (
          <div key={date} className='h-16 flex items-center justify-center bg-gray-800 text-white rounded'>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookEvent;
