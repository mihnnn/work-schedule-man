import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../../../context/AuthContext";
import useGetEvent from '../../../../hooks/event-hooks/useGetEvent';
import useDeleteEvent from '../../../../hooks/event-hooks/useDeleteEvent';
import { MdPreview } from 'react-icons/md';
import { FaLink } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa6";
import EventCreationModal from './EventCreationModal';

function EventTypes() {
  const navigate = useNavigate();
  
  const [dropdowns, setDropdowns] = useState({});
  const [newEventId, setNewEventId] = useState(null);
  const [shrinkIds, setShrinkIds] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  
  const { loading: loadingGet, events, refetchEvents } = useGetEvent();
  const { loading: loadingDelete, deleteEvent } = useDeleteEvent();
  const { authUser: { username } } = useAuthContext();

  useEffect(() => {
    if (!loadingGet) {
      setLocalEvents(events);
    }
  }, [loadingGet, events]);

  const handleOpenModal = () => {
    if (document.querySelector('#my_modal_3')) {
      navigate('/app/event-types?dialog=new&eventPage=' + username);
    } else {
      navigate('/app/event-types?dialog=new&eventPage=' + username, { state: { modal: true } });
    }
  };
  
  const onDropdownChange = (eventId) => {
    setDropdowns(prevDropdowns => ({
      ...prevDropdowns,
      [eventId]: !prevDropdowns[eventId],
    }));
  };

  const onDropdownBlur = (eventId) => {
    setTimeout(() => {
      setDropdowns(prevDropdowns => ({
        ...prevDropdowns,
        [eventId]: false,
      }));
    }, 200);
  };

  const handleDelete = async (eventId, title) => {
    try {
      setShrinkIds(prevShrinkIds => [...prevShrinkIds, eventId]);
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for the animation to complete
      await deleteEvent(eventId, title);
      setDropdowns(prevDropdowns => ({
        ...prevDropdowns,
        [eventId]: false,
      }));
      setShrinkIds(prevShrinkIds => prevShrinkIds.filter(id => id !== eventId));
      setLocalEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
    } catch (error) {
      console.error("Error in deleting events", error);
    }
  };

  const handleNewEventAdded = (eventId) => {
    setNewEventId(eventId);
    refetchEvents();
  };

  const handleEventClick = (eventId) => {
    navigate(`/app/event-types/${eventId}?tabName=setup`);
  };

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
        <header className='flex w-full max-w-full items-center truncate'>
          <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
            <h3 className='text-emphasis -maxw-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden'>
              Event Types
            </h3>
            <p className='text-emphasis hidden text-sm md:block'>
              Create events to share for people to book on your calendar.
            </p>
          </div>

          <div className='fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto'>
            <button
              className='btn btn-outline bg-white text-black'
              onClick={handleOpenModal}>
              + {" "} New
            </button>
            <EventCreationModal onNewEventAdded={handleNewEventAdded} />
          </div>
        </header>
      </div>
      
      <div className='divider'></div>

      <div className='flex w-full max-w-none items-center justify-between'>
        <div className='flex flex-col border-gray-500 mb-16 rounded-md border w-full animate-grow'>
          <ul className='!static w-full divide-[#888] divide-y'>
            {loadingGet ? (
              <li className='p-5'>Loading...</li>
            ) : localEvents.length === 0 ? (
              <li className='text-white text-xl'>
                <h1 className='text-5xl'> Create your first event type.</h1>
                <p>Click new "NEW" button in the corner to start creating an event.</p>
                <p>Event types enable you to share links that show available times on your calendar and allow people to make bookings with you.</p>
              </li>
            ) : (
              localEvents.map(event => (
                <li key={event._id} className={`${event._id === newEventId ? 'animate-grow' : ''} ${shrinkIds.includes(event._id) ? 'animate-shrink' : ''}`}>
                  <div className='flex w-full items-center justify-between transition hover:bg-gray-600 hover:bg-opacity-10 cursor-pointer'>
                    <div className='group flex w-full max-w-full items-center justify-between  px-4 py-4 sm:px-6'>
                      <a onClick={() => handleEventClick(event._id)} title={event.title} className='flex-1 pr-4 text-sm'>
                        <span className='text-emphasis font-semibold text-base'>{event.title}</span>
                        <small className='ml-1 hidden font-normal leading-4 sm:inline'>{`${username}/${event.suffix}`}</small>
                        <p className='py-1'>{`${event.description}`}</p>
                        <div className='text-emphasis mt-2 flex flex-wrap gap-x-2 gap-y-1'>
                          <div className='bg-gray-700 font-semibold inline-flex items-center justify-center rounded gap-x-1 py-1 px-1.5 text-xs leading-3'>
                            <FaRegClock/>{event.duration}m
                          </div>
                        </div>
                      </a>
                      <div className='mt-4 hidden sm:mt-0 sm:flex'>
                        <div className='flex justify-between space-x-2 rtl:space-x-reverse'>
                          <div className='flex items-center mr-2'>
                            <input type="checkbox" className="toggle" />
                          </div>
                          <div className='rounded-lg flex'>
                            <Link to={`/${username}/${event.suffix}`} className='first:rounded-l-md items-center relative transition flex justify-center border-subtle h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <MdPreview className='w-5 h-5' />
                            </Link>
                            <button className='items-center transition flex justify-center border-subtle h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <FaLink className='w-5 h-5' />
                            </button>
                            <div className='dropdown dropdown-end last:rounded-r-md items-center transition flex justify-center border-subtle h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
                              <button tabIndex={0} className='items-center' onClick={() => onDropdownChange(event._id)} onBlur={()=> onDropdownBlur(event._id)}>
                                <HiDotsHorizontal className='w-5 h-5' />
                              </button>
                              {dropdowns[event._id] && (
                                <ul tabIndex={0} className="dropdown-content right-0 top-full z-[9999] menu p-2 shadow bg-base-100 rounded-box w-52 mt-3" >
                                  <li><a href='event-types/testedit'>Edit</a></li>
                                  <li><button className='text-red-500' onClick={() => handleDelete(event._id, event.title)}>Delete</button></li>
                                </ul>
                              )}
                            </div>
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
