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
    <main className='flex h-full justify-center min-h-dvh bg-gray-950'>
      <div className='flex min-h-full w-full flex-col items-center overflow-visible'>
        <div className='fixed top-4 z-10'>
          {/* Need help? and switch layout */}
          <div className='grid fixed top-4 z-10 right-4'>
            <div className='flex gap-2'>
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
          </div>

          {/* User and event info */}
          <div className='relative z-10 flex [grid-area:meta]' style={{ position: 'sticky', top: '0px' }}>
            <div className='[grid-area:meta] max-w-screen flex w-full flex-col'>
              <div className='relative z-10 p-6'>
                <div className='opacity-100 transform-none'>
                  <ul className='flex items-center border'>
                    <li className='-mr-1 inline-block'>
                      <img className='aspect-square rounded-full w-6 h-6 min-w-6 min-h-6' src={avatar} alt="user avatar" />
                    </li>
                  </ul>
                  <p className='text-gray-500 mt-2 text-sm font-semibold'>Kita Ikuyo</p>
                  <h1 className='text-xl font-semibold my-2'>Meeting Title</h1>
                </div>

                <div className='space-y-4 font-medium'>
                  <div className='flex items-start justify-start text-sm'>
                    <div className='flex my-auto'>
                      <FaRegClock className='w-4 h-4 mr-2' />
                    </div>
                    <span className='relative z-10 max-w-full break-words'>30 minutes</span>
                  </div>
                  <div className='flex items-start justify-start text-sm'>
                    <div className='flex my-auto'>
                      <IoLocationOutline className='w-4 h-4 mr-2' />
                    </div>
                    <span className='relative z-10 max-w-full break-words'>Online</span>
                  </div>
                  <div className='flex items-start justify-start text-sm'>
                    <div className='flex my-auto'>
                      <BsGlobe className='w-4 h-4 mr-2' />
                    </div>
                    <span className='relative z-10 max-w-full break-words'>Timezone dropdown</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar view */}
          <div className='[grid-area:main] md:border-subtle ml-[-1px] h-full flex-shrink px-5 py-3 md:border-l' style={{ opacity: 1, transform: 'none' }}>
            <CalendarView />
          </div>

          {/* Time slots */}
          
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
