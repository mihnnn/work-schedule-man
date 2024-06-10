import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import avatar from "../../assets/images/avatar.jpg";
import useGetEvent from '../../hooks/event-hooks/useGetEvent';
import { FaArrowRight } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

function PublicPage() {
  const { authUser: { displayName,username } } = useAuthContext();
  const { loading, events } = useGetEvent();

  return (
    <div className='flex bg-[#111] w-full h-screen overflow-auto'>
      <div className='mx-auto'>
        <main className='mx-auto max-w-3xl px-4 py-24'>
          <div className='mb-8 text-center'>
            <span className='w-24 h-24 rounded-full relative inline-flex aspect-square justify-center align-top overflow-hidden min-w-24 min-h-24'>
              <img className="aspect-square rounded-full w-24 h-24 min-w-24 min-h-24" src={avatar} alt="Kita Avatar" />
            </span>
            <h1 className='text-emphasis my-1 text-3xl font-bold'>{displayName}</h1>
          </div>

          <div className='w-full rounded-xl border-[#888] border divide-y divide-[#888] overflow-hidden'>
            {loading ? (
              <div>Loading...</div>
            ) : events.length === 0 ? (
              <div>No events found</div>
            ) : (
              events.map(event => (
                <div key={event._id} className=' bg-[#333] border-gray-500 transition group w-[720px] min-w-[320px]'>
                  <div className='relative  flex p-5 w-full group-hover:bg-gray-100 group-hover:bg-opacity-10'>
                    <div className='block w-full'>
                      <a href={`${username}/${event.suffix}`}>
                        <div>
                          <h2 className='text-emphasis font-semibold text-sm'>{event.title}</h2>
                          <p className='py-1 text-sm'>{event.description}</p>
                        </div>
                        <div className='text-emphasis mt-2 flex flex-wrap gap-x-2 gap-y-1'>
                          <div className='bg-gray-700 font-semibold inline-flex items-center justify-center rounded gap-x-1 py-1 px-1.5 text-xs leading-3'>
                            <FaRegClock />{event.duration}m
                          </div>
                        </div>
                      </a>
                    </div>
                    <FaArrowRight className='text-emphasis absolute right-4 top-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default PublicPage;
