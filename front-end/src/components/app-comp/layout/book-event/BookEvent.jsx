import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCalendarViewMonth, MdOutlineCalendarViewWeek } from "react-icons/md";
import BookEventInfo from './BookEventInfo';
import BookEventCalendar from './BookEventCalendar';

function BookEvent() {
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
            <BookEventInfo />
            <BookEventCalendar />
          </div>
        </div>
      </div>
    </main>
  );
}


export default BookEvent;
