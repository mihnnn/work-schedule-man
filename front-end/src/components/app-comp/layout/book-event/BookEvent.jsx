import React, { useState } from 'react';
import avatar from "../../../../assets/images/avatar.jpg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCalendarViewMonth, MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft, MdOutlineCalendarViewWeek } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";



import { generateDate, months } from '../../../../utils/calendar';
import cn from '../../../../utils/cn';
import dayjs from 'dayjs';

function BookEvent() {



  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = dayjs();

  console.log(currentDate)
  const [today, setToday] = useState(currentDate);
  const [ selectedDate, setSelectedDate ] = useState(currentDate);

  return (

    <main className='flex h-full w-full justify-center min-h-dvh bg-gray-950'>
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
      <div className='flex flex-col my-auto min-h-full w-full items-center overflow-visible '>
        <div className='md:flex-row' style={{ height: 'auto', minHeight: '450px' }}>

          <div className='flex w-full max-w-6xl mt-16 md:mt-0 divide-x-[1px] divide-gray-500 bg-[#222] rounded-xl'>
            {/* User and event info */}
            <div className='w-full md:w-1/2 p-6 flex flex-col items-center md:items-start text-center md:text-left mr-20'>
              <img className='aspect-square rounded-full w-6 h-6 mb-2' src={avatar} alt="user avatar" />
              <p className='text-gray-400 text-sm font-semibold'>Kita Ikuyo</p>
              <h1 className='text-xl font-semibold my-2'>LONG AS FUCKING TExt</h1>
              <div className=' text-gray-100 space-y-4 font-medium mt-4'>
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
            <div className=' min-w-[420px] px-5 py-4'>
              <div className='flex justify-between items-center text-lg mb-1 text-emphasis'>
                <span className='w-1/2'>
                  <strong className=' text-emphasis font-semibold'> {months[today.month()]}</strong>
                  <span className=' font-medium text-gray-400'> {today.year()}</span>

                </span>
                <div className='flex items-center gap-1 cursor-pointer transition-all select-none'>
                  <span
                    className=' text-gray-500 p-2 hover:bg-gray-400 hover:bg-opacity-20 rounded-lg  hover:text-emphasis'
                    onClick={() => setToday(today.month(today.month() - 1))}
                  >
                    <MdOutlineKeyboardArrowLeft />
                  </span>
                  <span
                    className=' text-gray-500 p-2 hover:bg-gray-400 hover:bg-opacity-20 rounded-lg  hover:text-emphasis'
                    onClick={() => setToday(today.month(today.month() + 1))}
                  >
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </div>
              </div>

              <div className='w-full grid grid-cols-7 gap-4 mb-2 text-center'>
                {days.map((day, index) => {
                  return (
                    <div key={index} className='my-4 grid place-content-center text-sm font-medium text-emphasis uppercase tracking-widest'>
                      {day}
                    </div>
                  )
                })}
              </div>


              <div className='w-full grid grid-cols-7 grid-rows-6 pb-6 gap-1'>
                {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                  return (
                    <div key={index} className='relative grid place-content-center text-sm'>
                      <button className={cn(
                        currentMonth ? 'text-gray-50 hover:shadow-outline hover:cursor-pointer' : 'text-gray-400 opacity-30 cursor-not-allowed',
                        today ? 'border-2' : '',
                        selectedDate.toDate().toDateString() === today ? 'bg-gray-200 text-gray-700 rounded-xl' : '',
                        selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-gray-200 text-gray-700 rounded-xl" : '',
                        "w-full min-w-6 min-h-6 p-5 grid place-content-center rounded-xl text-sm overflow-visible"
                      )}
                        onClick={() => setSelectedDate(date)}
                      >
                        {date.date()} 
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='min-w-[240px] w-full md:w-1/2 px-5 py-5 flex flex-col pb-0 overflow-hidden'>
              <div className='flex mb-3'>
                <header>
                  <span className='text-emphasis font-semibold text-lg'>
                    <strong className='text-emphasis font-semibold'>
                      {selectedDate.format('ddd')}
                    </strong>
                    <span className=' inline-flex items-center justify-center rounded-3xl px-1 pt-0.5 font-medium text-sm'>
                      {selectedDate.format('D')}
                    </span>
                  </span>
                </header>
              </div>

              <div className=''>
                <div className='h-full w-full overflow-y-auto overflow-x-hidden'>
                  <div className='flex flex-col'>
                    <div className='h-full pb-4'>
                      <div className='flex gap-2'>
                        <button className='whitespace-nowrap items-center text-sm font-medium relative rounded-md transition disabled:cursor-not-allowed text-emphasis border border-default bg-default hover:bg-muted focus-visible:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-empthasis disabled:border-subtle disabled:bg-opacity-30 disabled:text-muted disabled:hover:bg-opacity-30 disabled:hover:text-muted disabled:hover:border-subtle disabled:hover:bg-default px-4 min-h-9 hover:border-brand-default mb-2 flex h-auto w-full flex-grow flex-col justify-center py-2 undefined'>
                          <div className='flex items-center gap-2'>
                            9:00 am
                          </div>
                        </button>
                      </div>
                    </div>

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
