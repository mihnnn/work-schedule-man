import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for buttons
import RequestsNav from './RequestsNav';
import RequestsPage from './RequestsPage';

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Time-Off', member: 'Alice', date: '2024-09-25', status: 'Pending', details: 'Vacation from Sep 25 to Sep 30' },
    { id: 2, type: 'Shift Change', member: 'Bob', date: '2024-09-20', status: 'Pending', details: 'Switch shift with Eve on Sep 20' },
    { id: 3, type: 'Meeting Request', member: 'Eve', date: '2024-09-23', status: 'Pending', details: 'Meeting with client on Sep 23' },
  ]);


  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {/* Header Section */}
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Requests
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              Be alerted of upcoming requests from your team
            </p>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      <RequestsNav />

      <RequestsPage />



      
    </div>
  );
}

export default Requests;
