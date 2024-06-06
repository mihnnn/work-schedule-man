import React, { useEffect } from 'react';
import { FaLink } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { CiCalendar } from 'react-icons/ci';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGetEventById from '../../../../../hooks/event-hooks/useGetEventById';

function EditEventSideBar({ tabName }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {eventData, getEventById } = useGetEventById();

  const { eventId } = useParams();
  useEffect( () => {
    if (eventId) {
      getEventById(eventId);
    }    
  }, [eventId]);


  const handleTabClick = (tab) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('tabName', tab);
    navigate({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  };

  return (
    <div>
      <nav className="no-scrollbar flex flex-col space-y-0.5 overflow-scroll primary-navigation sticky top-0 -mt-7">
        <div className="pt-6"></div>
        <button
          onClick={() => handleTabClick('setup')}
          className={`text-sm font-medium leading-none min-h-7 hover:bg-subtle group flex w-64 flex-row rounded-md px-3 py-2 transition h-auto items-start text-emphasis ${
            tabName === 'setup' ? 'bg-gray-400 bg-opacity-30' : ''
          }`}
        >
          <FaLink className="w-4 h-4 mr-2" />
          <div className="h-fit">
            <span className="flex items-center space-x-2 space-x-reverse">
              <p className="max-w-36 min-h-4 truncate font-medium" title="Event Setup">
                Event Setup
              </p>
            </span>
            <p className=" flex justify-start max-w-44 mt-1 truncate text-sx font-medium" title={`${eventData?.duration}`}>
              {eventData?.duration} {" "} mins
            </p>
          </div>
          <div className={` ${tabName === 'setup' ? 'ml-auto self-center' : 'hidden'} `}>
            <IoIosArrowForward className="w-5 h-5" />
          </div>
        </button>
        <button
          onClick={() => handleTabClick('availability')}
          className={`text-sm font-medium leading-none min-h-7 hover:bg-subtle group flex w-64 flex-row rounded-md px-3 py-2 transition h-auto items-start text-emphasis ${
            tabName === 'availability' ? 'bg-gray-400 bg-opacity-30' : ''
          }`}
        >
          <CiCalendar className="w-4 h-4 mr-2" />
          <div className="h-fit">
            <span className="flex items-center space-x-2 space-x-reverse">
              <p className="max-w-36 min-h-4 truncate font-medium" title="Availability">
                Availability
              </p>
            </span>
            <p className="max-w-44 mt-1 truncate text-sx font-normal" title="Working Hours">
              Working Hours
            </p>
          </div>
          <div className={` ${tabName === 'availability' ? 'ml-auto self-center' : 'hidden'} `}>
            <IoIosArrowForward className="w-5 h-5" />
          </div>
        </button>
      </nav>
    </div>
  );
}

export default EditEventSideBar;
