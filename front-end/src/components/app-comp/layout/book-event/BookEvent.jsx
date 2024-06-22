import React, { useEffect } from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCalendarViewMonth, MdOutlineCalendarViewWeek } from "react-icons/md";
import { useLocation, useParams } from 'react-router-dom';
import BookEventInfo from './BookEventInfo';
import BookEventCalendar from './BookEventCalendar';
import BookEventConfirm from './BookEventConfirm';

function BookEvent() {
  const { username, suffix } = useParams();

  const location = useLocation();


  // Check if query parameters meet the condition to render BookEventConfirm
  const shouldRenderConfirm = location.search.includes('slot=');

  return (
    <main className='flex h-full w-full justify-center min-h-dvh bg-gray-950'>
      <div className='fixed top-4 z-10 right-4 flex gap-2'>
        <button className='btn btn-outline px-4 py-2.5'>Need help?</button>
        <div role='group' dir='ltr' className='min-h-9 border relative inline-flex gap-0.5 rounded-md p-1'>
          <button type='button' role='radio' aria-checked={!shouldRenderConfirm} className='relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors text-emphasis'>
            <FaRegCalendarAlt className='text-xl' />
          </button>
          <button type='button' role='radio' aria-checked={!shouldRenderConfirm} className='relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors '>
            <MdCalendarViewMonth className='text-xl' />
          </button>
          <button type='button' role='radio' aria-checked={shouldRenderConfirm} className='relative rounded-[4px] px-3 py-1 text-sm leading-tight transition-colors'>
            <MdOutlineCalendarViewWeek className='text-xl' />
          </button>
        </div>
      </div>

      <div className='flex flex-col my-auto min-h-[540px] h-full w-full items-center overflow-visible '>
        <div className='md:flex-row' >
          <div className='flex w-full max-w-6xl mt-16 md:mt-0 divide-x-[1px] divide-gray-500 bg-[#222] rounded-xl min-h-[540px]'>
            <BookEventInfo username={username} suffix={suffix}/>
            {shouldRenderConfirm ? <BookEventConfirm /> : <BookEventCalendar />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookEvent;
