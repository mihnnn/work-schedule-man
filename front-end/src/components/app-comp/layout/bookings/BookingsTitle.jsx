import React from 'react'
import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom'
import UpcomingBookings from './booking-routes/UpcomingBookings'
import PastBookings from './booking-routes/PastBookings'

function Bookings() {
  const location = useLocation()
  const currentPath = location.pathname

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

					<div className='fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto'>
						<button className='btn btn-outline bg-white text-black'>
							+ {" "} New
						</button>
					</div>
				</header>
			</div>
{/* 
      <nav>
        <ul className="flex gap-4">
          <li className="btn btn-ghost p-0">
            <NavLink to="/bookings/upcoming" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Upcoming
            </NavLink>
          </li>
          <li className="btn btn-ghost p-0">
            <NavLink to="/bookings/past" className="flex items-center justify-center w-full h-full px-4 py-2 text-sm font-medium transition rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emphasis">
              Past
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/bookings/upcoming" element={<UpcomingBookings />} />
        <Route path="/bookings/past" element={<PastBookings />} />
      </Routes> */}
    </div>
  )
}

export default Bookings
