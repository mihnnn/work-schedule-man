import React, { useState } from 'react';
import MeetingCreationModal from './MeetingCreationModal';
import MeetingNav from './MeetingNav';
import MeetingPage from './MeetingPage';

function Meetings() {
  // const [selectedMeeting, setSelectedMeeting] = useState(null);
  // const [meetings, setMeetings] = useState([
  //   {
  //     id: 1,
  //     title: 'Project Kickoff Meeting',
  //     description: 'Discuss project scope and timeline',
  //     time: '08:00 - 09:00',
  //     date: '2024-09-23',
  //     participants: [
  //       { id: 1, name: 'Alice', role: 'Chef' },
  //       { id: 2, name: 'Bob', role: 'Waiter' },
  //     ],
  //   }
  // ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice', role: 'Chef' },
    { id: 2, name: 'Bob', role: 'Waiter' },
    { id: 3, name: 'Eve', role: 'Cleaner' },
    { id: 4, name: 'David', role: 'Waiter' },
    { id: 5, name: 'Frank', role: 'Chef' },
    { id: 6, name: 'Grace', role: 'Waiter' },
  ]);
  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {/* Header */}
      <div >
        <div className='flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0'>
          <header className='flex w-full max-w-full items-center truncate'>
            <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
              <h3 className=' text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden"'>
                Meetings
              </h3>
              <p className='text-gray-100 hidden text-sm md:block'>
                Create and manage meetings with your team members.
              </p>
            </div>

            <div className="fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto">
              <button
                className="btn btn-outline bg-white text-black"
                onClick={() => document.querySelector('#my_modal_3').showModal()}
              >
                + New
              </button>
              <MeetingCreationModal employees={employees} />
            </div>
          </header>
        </div>
      </div>
      <div className='divider'></div>

      <MeetingNav />
      
      <MeetingPage />
      
    </div>
  );
}
export default Meetings;
