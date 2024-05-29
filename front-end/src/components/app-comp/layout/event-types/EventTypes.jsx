import React from 'react';
import EventCreationModal from './EventCreationModal';
import { MdPreview } from 'react-icons/md';
import { FaLink } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuthContext } from "../../../../context/AuthContext";
import useGetEvent from '../../../../hooks/useGetEvent';

function EventTypes() {
  const openModal = () => {
    document.getElementById('my_modal_3').showModal();
  }

  const { loading, events } = useGetEvent();
  console.log("Events:", events);

  const { authUser: { username } } = useAuthContext();

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
        <header className='flex w-full max-w-full items-center truncate'>
          <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
            <h3 className='text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden'>
              Event Types
            </h3>
            <p className='text-gray-100 hidden text-sm md:block'>
              Create events to share for people to book on your calendar.
            </p>
          </div>

          <div className='fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto'>
            <button
              className='btn btn-outline bg-white text-black'
              onClick={openModal}>
              + {" "} New
            </button>
            <EventCreationModal />
          </div>
        </header>
      </div>

      <div className='divider'></div>

      {/* Events container in a vertical list */}
      <div className='flex w-full max-w-none items-center justify-between overflow-hidden'>
        <div className='flex flex-col bg-default border-subtle mb-16 overflow-hidden rounded-md border w-full'>
          <ul className='divide-subtle !static w-full divide-y'>
            {loading ? (
              <li>Loading...</li>
            ) : events.length === 0 ? (
              <li>No events found.</li>
            ) : (
              events.map(event => (
                <li key={event._id}>
                  <div className='flex w-full items-center justify-between transition hover:bg-gray-100 hover:bg-opacity-10'>
                    <div className='group flex w-full max-w-full items-center justify-between overflow-hidden px-4 py-4 sm:px-6'>
                      <a href={event.URL} title={event.title} className='flex-1 overflow-hidden pr-4 text-sm'>
                        <span className='text-gray-200'>{event.title}</span>
                        <small className='ml-1 hidden font-normal leading-4 sm:inline'>{`${username}/${event.subfix}`}</small>
                        <div className='text-gray-200 mt-2 flex flex-wrap gap-x-2 gap-y-1'>
                          <div className='bg-gray-700 font-medium inline-flex items-center justify-center rounded gap-x-1 bg-subtle py-1 px-1.5 text-xs leading-3'>
                            {event.duration}m
                          </div>
                        </div>
                      </a>
                      <div className='mt-4 hidden sm:mt-0 sm:flex'>
                        <div className='flex justify-between space-x-2 rtl:space-x-reverse'>
                          <div className='flex items-center mr-2'>
                            <input type="checkbox" className="toggle" />
                          </div>
                          <div className='rounded-lg flex'>
                            <a className='first:rounded-l-md items-center relative transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <MdPreview className='w-5 h-5' />
                            </a>
                            <button className='items-center transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <FaLink className='w-5 h-5' />
                            </button>
                            <button className='last:rounded-r-md items-center transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <HiDotsHorizontal className='w-5 h-5' />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EventTypes;
