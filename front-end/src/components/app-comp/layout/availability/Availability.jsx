import React, { useEffect, useState } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa6';
import CreateAvailabilityModal from './CreateAvailabilityModal';
import useGetAvail from '../../../../hooks/availability-hooks/useGetAvail';
import useDeleteAvail from '../../../../hooks/availability-hooks/useDeleteAvail';

function Availability() {
  const [dropdowns, setDropdowns] = useState({});
  const [newAvailId, setNewAvailId] = useState(null);
  const [shrinkIds, setShrinkIds] = useState([]);
  const [localAvails, setLocalAvails] = useState([]); //store the avails fetch from backend

  const { loading: loadingGet, avails } = useGetAvail();
  const { deleteAvail } = useDeleteAvail();

  useEffect(() => {
    if (!loadingGet) {
      setLocalAvails(avails);
    }
  }, [loadingGet, avails]);

  const navigate = useNavigate();

  const handleOpenModal = () => {
    document.querySelector('#my_modal_3').showModal();
  }

  const onDropDownChange = (availId) => {
    setDropdowns(prevDropdowns => ({
      ...prevDropdowns,
      [availId]: !prevDropdowns[availId],
    }));
  }

  const onDropDownBlur = (availId) => {
    setTimeout(() => {
      setDropdowns(prevDropdowns => ({
        ...prevDropdowns,
        [availId]: false,
      }));
    }, 200);
  }

  const handleDelete = async (availId, title) => {
    try {
      setShrinkIds(prevShrinkIds => [...prevShrinkIds, availId]);
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for the animation to complete
      await deleteAvail(availId, title);
      setDropdowns(prevDropdowns => ({
        ...prevDropdowns,
        [availId]: false,
      }));
      setShrinkIds(prevShrinkIds => prevShrinkIds.filter(id => id !== availId));
      setLocalAvails(prevAvails => prevAvails.filter(avail => avail._id !== availId));
    } catch (error) {
      console.error("Error in deleting avail", error);
    }
  }

  const handleAvailClick = (availId) => {
    navigate(`/app/availability/${availId}`);
  }

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
            <button className='btn btn-outline bg-white text-black'
              onClick={handleOpenModal}
            >
              + {" "} New
            </button>
            <CreateAvailabilityModal />
          </div>
        </header>
      </div>
      <div className='divider'></div>

      <div className='flex w-full max-w-none items-center justify-between'>
        <div className='flex flex-col border-gray-500 mb-16 rounded-md border w-full animate-grow'>
          <ul className='!static w-full divide-[#888] divide-y'>
            { loadingGet ? (
              <li className='p-5'> Loading ......</li>
            ) : localAvails.length === 0 ? (
              <li className='text-white text-xl'> 
                <h1 className='text-5xl'> No Availability set up yet!</h1>
                <p>Click "+NEW" button to create your schedules</p>
              </li>
            ) : (
              localAvails.map(avail => (
                <li key={avail._id} className={`${avail._id === newAvailId ? 'animate-grow' : ''} ${shrinkIds.includes(avail._id) ? 'animate-shrink' : ''}`}>
                  <div className='flex w-full items-center justify-between transition hover:bg-gray-600 hover:bg-opacity-10'>
                    <div className='group flex w-full max-w-full items-center justify-between px-4 py-4 sm:px-6'>
                      <a onClick={() => handleAvailClick(avail._id)} title={avail.title} className='flex-1 pr-4 text-sm'>
                        <span className=' text-emphasis font-semibold text-base'> {avail.title}</span>
                        <p className='py-1'> Days of the Weeks</p> 
                        <p className='py-1 flex items-center'>
                          <FaGlobe className='mr-1'/>
                          {avail.timezone}
                        </p>
                      </a>
                      <div className='mt-4 hidden sm:mt-0 sm:flex'>
                        <div className='flex justify-between space-x-2 space-x-reverse'>
                          <div className="rounded-lg flex">
                            <div className="dropdown dropdown-end rounded-md items-center transition flex justify-center border-subtle h-9 px-4 py-2.5 min-h-[36px] !p-2 hover">
                              <button tabIndex={0} className="items-center" onClick={() => onDropDownChange(avail._id)} onBlur={() => onDropDownBlur(avail._id)}>
                                <HiDotsHorizontal className="w-5 h-5" />
                              </button>
                              {dropdowns[avail._id] && (
                                <ul tabIndex={0} className="dropdown-content right-0 top-full z-50 menu p-2 shadow bg-base-100 rounded-box w-52 mt-3">
                                  <li>
                                    <button className="text-red-500" onClick={() => handleDelete(avail._id, avail.title)}>Delete</button>
                                  </li>
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

export default Availability;
