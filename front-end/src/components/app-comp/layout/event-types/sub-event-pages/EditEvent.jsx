import React from 'react'
import EditEventPage from './EditEventPage'
import EditEventSideBar from './EditEventSideBar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";


function EditEvent() {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabName = queryParams.get('tabName' || 'setup');

  const handleBackClick = () => {
    navigate(-1);
  }

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      <header className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-6'>
        <div className='flex items-center mr-4 w-full'>
          <FaArrowLeft onClick={handleBackClick} className='cursor-pointer w-5 h-5 text-emphasis'/>
          <h3 className='text-emphasis max-w-28 sm:max-w-72 md:max-w-80 inline truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl ml-2'>15</h3>
        </div>
        <div className='flex justify-end items-center'>
          <div className='lg:flex items-center'>
            <input type="checkbox" className="toggle" />
          </div>
          <svg className='mx-3 hidden lg:block' width="2" height="16" viewBox='0 0 2 1 6' ry="6" fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='2' height='16' fill='currentColor'/>
          </svg>
          <div className='rounded-lg flex'>
            <a className='first:rounded-l-md items-center relative transition flex justify-center border border-gray-400  h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
              <MdPreview className='w-5 h-5' />
            </a>
            <button className='items-center transition flex justify-center border border-gray-400 h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
              <FaLink className='w-5 h-5' />
            </button>
            <button className=' last:rounded-r-md items-center transition flex justify-center border border-gray-400 h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover'>
              <FaRegTrashCan className='w-5 h-5' />
            </button>
          </div>
          <svg className='mx-3 hidden lg:block' width="2" height="16" viewBox='0 0 2 1 6' ry="6" fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='2' height='16' fill='currentColor'/>
          </svg>
          <button className=' overflow-hidden text-sm font-semibold border border-gray-400 py-1.5 px-3 rounded-md btn-outline bg-gray-50 text-gray-800 hover:bg-opacity-95'>
            Save
          </button>
        </div>


      </header>
      <div className='flex'>
        <EditEventSideBar eventId={eventId} tabName={tabName} />
        <EditEventPage eventId={eventId} tabName={tabName} />
      </div>
    </div>
  )
}

export default EditEvent
