import React from 'react'


function BookingsHeader() {
	return (
		<div >
			<div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
				<header className='flex w-full max-w-full items-center truncate'>
					<div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
						<h3 className=' text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden"'>
							Bookings
						</h3>
						<p className='text-gray-100 hidden text-sm md:block'>
							See upcoming and past events booked through your event type links.
						</p>
					</div>

				</header>
			</div>
		</div>
	)
}

export default BookingsHeader
