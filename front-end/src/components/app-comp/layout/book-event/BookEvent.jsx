import React from 'react';
import avatar from "../../../../assets/images/avatar.jpg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCalendarViewMonth } from "react-icons/md";
import { MdOutlineCalendarViewWeek } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { generateDate } from '../../../../utils/calendar';
import cn from '../../../../utils/cn';

function BookEvent() {

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <main className='flex h-full w-full justify-center min-h-dvh bg-gray-950'>
      <div className='flex flex-col min-h-full w-full items-center overflow-visible'>
        <div className='md:flex-row' style={{ height: 'auto', minHeight: '450px' }}>
          <div className='fixed top-4 z-10 right-4 flex gap-2'>
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
              <img className='aspect-square rounded-full w-6 h-6 mb-4' src={avatar} alt="user avatar" />
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
            <div className=' min-w-[420px] '>
              <div className='w-full grid grid-cols-7'>
                {days.map((day, index) => {
                  return (
                    <div key={index} className=''>
                      <h1 className='h-14 grid place-content-center text-sm'>{day}</h1>
                    </div>
                  )
                })}
              </div>
              <div className='w-full grid grid-cols-7'>
                {generateDate().map(({ date, currentMonth, today }, index) => {
                  return (
                    <div key={index} className='h-14  border-t grid place-content-center text-sm'>
                      <h1 className={cn(
                        currentMonth ? "  text-gray-50 hover:border-2 hover:cursor-pointer" : "text-gray-400 opacity-30  ",
                        today ? "bg-gray-200  text-gray-700 rounded-xl" : "",
                        "h-10 w-10 grid place-content-center  rounded-xl  text-sm   "
                      )}>{date.date()}</h1>
                    </div>

                  )
                })}
              </div>

            </div>

            <div className='[grid-area:timeslots] w-full md:w-1/2 p-6 flex flex-col items-center md:items-start'>
              <div className='w-full max-w-md mx-auto mt-6'>
                <div className='grid grid-cols-1 gap-2'>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    9:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    10:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    11:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    12:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    13:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    14:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    15:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    16:00
                  </div>
                  <div className='h-12 flex items-center justify-center bg-gray-800 text-white rounded'>
                    17:00
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}


export default BookEvent;
