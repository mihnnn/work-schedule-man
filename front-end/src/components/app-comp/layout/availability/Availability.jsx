import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa6';
import CreateAvailabilityModal from './CreateAvailabilityModal';

function Availability() {

  const handleOpenModal = () => {
    document.querySelector('#my_modal_3').showModal();
  }
  // const navigate = useNavigate();

  // const onDropDownChange = (availId) => {
  //   setDropDowns(prevDropDowns => ({
  //     ...prevDropDowns,
  //     [availId]: !prevDropDowns[availId],
  //   }))
  // }

  // const onDropdownBlur = (availId) => {
  //   setTimeout(() => {
  //     setDropDowns(prevDropDowns => ({
  //       ...prevDropDowns,
  //       [availId]: false,
  //     }));
  //   }, 200);
  // }

  // const handleDelete = async (availId, title) => {
  //   try {
  //     await deleteAvailability(availId, title);
  //     setDropDowns(prevDropDowns => ({
  //       ...prevDropDowns,
  //       [availId]: false,
  //     }));
  //     await refetchAvailabilities();
  //   } catch (error) {
  //     console.error("Error in deleting availabilities", error);
  //   }



  

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

          <div className='flex w-full items-center justify-between transition hover:bg-gray-100 hover:bg-opacity-10 border-b border-gray-500'>
            <div className='group flex w-full max-w-full items-center justify-between  px-4 py-4 sm:px-6'>
              <a className='flex-1 pr-4 text-sm'>
                <span className='text-emphasis font-semibold text-base'>Working Hours</span>
                <p className='py-1'>Mon-Fri, 9 AM - 5 PM </p>
                <p className='py-1 flex items-center'>
                  <FaGlobe className='mr-1'/> 
                  Asia Bangkok</p>
              </a>
              <div className='mt-4 hidden sm:mt-0 sm:flex'>
                <div className='flex justify-between space-x-2 space-x-reverse'>
                  <div className='rounded-lg flex'>
                    <div className='dropdown rounded-md items-center transition flex justify-center border-gray-400 h-9 px-4 py-2.5 min-h-[36px] !p-2 hover'>
                      <button tabIndex={0} className='items-center'>
                        <HiDotsHorizontal className='w-5 h-5' />
                      </button>
                      <ul tabIndex={0} className='dropdown-content right-0 top-full z-50 menu p-2 shadow bg-base-100 rounded-box w-52 mt-3'>
                        <li>Set as default</li>
                        <li><button className='text-red-500'>Delete</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex w-full items-center justify-between transition hover:bg-gray-100 hover:bg-opacity-10'>
            <div className='group flex w-full max-w-full items-center justify-between  px-4 py-4 sm:px-6'>
              <a className='flex-1 pr-4 text-sm'>
                <span className='text-emphasis font-semibold text-base'>Working Hours</span>
                <p className='py-1'>Mon-Fri, 9 AM - 5 PM </p>
                <p className='py-1 flex items-center'>
                  <FaGlobe className='mr-1'/> 
                  Asia Bangkok</p>
              </a>
              <div className='mt-4 hidden sm:mt-0 sm:flex'>
                <div className='flex justify-between space-x-2 space-x-reverse'>
                  <div className='rounded-lg flex'>
                    <div className='dropdown rounded-md items-center transition flex justify-center border-gray-400 h-9 px-4 py-2.5 min-h-[36px] !p-2 hover'>
                      <button tabIndex={0} className='items-center'>
                        <HiDotsHorizontal className='w-5 h-5' />
                      </button>
                      <ul tabIndex={0} className='dropdown-content right-0 top-full z-50 menu p-2 shadow bg-base-100 rounded-box w-52 mt-3'>
                        <li> <button className='text-red-500'>Delete </button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>


    </div>
  )
}

export default Availability
