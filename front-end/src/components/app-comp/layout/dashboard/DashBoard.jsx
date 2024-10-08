import React from 'react';
import DashBoardContent from './DashBoardContent';
import DashBoardNav from './DashBoardNav';

function DashBoard() {
  return (
    <div className="max-w-full px-2 py-4 lg:px-6">
      <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
        <header className='flex w-full max-w-full items-center truncate'>
          <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
            <h3 className='text-emphasis -maxw-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden'>
              Dashboard
            </h3>
            <p className='text-emphasis hidden text-sm md:block'>
              Quick view of employees and schedules
            </p>
          </div>
        </header>
      </div>
      <div className='divider'></div>


      <div className="">
        <DashBoardNav />

        <div className='border border-gray-500 rounded-md w-full animate-grow'>
          <DashBoardContent />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
