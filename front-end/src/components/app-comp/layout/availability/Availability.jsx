import React from 'react'

function Availability() {
  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
        <header className='flex w-full max-w-full items-center truncate'>
          <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
            <h3 className=' text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden"'>
              Availability
            </h3>
            <p className='text-gray-100 hidden text-sm md:block'>
              Configure times when you are available for bookings.
            </p>
          </div>

          <div className='fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto'>
            <button className='btn btn-outline bg-white text-black'>
              + {" "} New
            </button>
          </div>
        </header>


      </div>
      <div className='divider'></div>
    </div>
  )
}

export default Availability
