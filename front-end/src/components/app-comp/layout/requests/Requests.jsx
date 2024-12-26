import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import RequestsNav from './RequestsNav';
import RequestsPage from './RequestsPage';
import RequestCreationModal from './RequestCreationModal';

function Requests() {
  // const [requests, setRequests] = useState([
  //   { id: 1, type: 'Time-Off', member: 'Alice', date: '2024-09-25', status: 'Pending', details: 'Vacation from Sep 25 to Sep 30' },
  //   { id: 2, type: 'Shift Change', member: 'Bob', date: '2024-09-20', status: 'Pending', details: 'Switch shift with Eve on Sep 20' },
  //   { id: 3, type: 'Meeting Request', member: 'Eve', date: '2024-09-23', status: 'Pending', details: 'Meeting with client on Sep 23' },
  // ]);

  const { currentUser } = useSelector((state) => state.user);
  const [teamId, setTeamId] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (currentUser.teamMemberships) {
      setTeamId(currentUser.teamMemberships[0].team);
    }
  }, [currentUser.teamMemberships[0].team]);

  const fetchRequests = async () => {
    if (teamId) {
      try {
        const res = await fetch(`/api/requests/${teamId}`);
        if (!res.ok) {
          throw new Error('Error fetching requests');
        }
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.log('Error fetching requests: ', error);
      }
    }
  }
  useEffect(() => {
    fetchRequests();
  }, [teamId]);

  const getCurrentDate = () => {
    const hoChiMinhTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });
    const currentDate = new Date(hoChiMinhTime);
    return currentDate.toISOString().split('T')[0];  // Format YYYY-MM-DD
  };

  const handleApprove = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === id && req.status === 'Pending'
          ? { ...req, status: 'Approved', managerAction: 'Approved', actionTakenOn: new Date().toISOString() }
          : req
      )
    );
  };
  const handleReject = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === id && req.status === 'Pending'
          ? { ...req, status: 'Rejected', managerAction: 'Rejected', actionTakenOn: new Date().toISOString() }
          : req
      )
    );
  };

  // console.log('requests: ', requests);

  const renderManagerView = () => {
    return (
      <>
        {/* Header Section */}
        <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
          <div className="flex w-full max-w-full items-center truncate">
            <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
              <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
                Requests
              </h3>
              <p className="text-emphasis hidden text-sm md:block">
                Manage upcoming requests from your team members
              </p>
            </div>
          </div>
        </header>
        <div className="divider"></div>
        <RequestsNav />
        <RequestsPage
          requests={requests}
          handleApprove={handleApprove}
          handleReject={handleReject}
          getCurrentDate={getCurrentDate}
        />
      </>
    )
  }

  const renderEmployeeView = () => {
    return (
      <>
        <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
          <div className="flex w-full max-w-full items-center truncate">
            <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
              <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
                Requests
              </h3>
              <p className="text-emphasis hidden text-sm md:block">
                Submit your requests to your manager here
              </p>
            </div>
          </div>
          <div className="fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto">
            <button
              className="btn btn-outline bg-white text-black"
              onClick={() => document.querySelector('#my_modal_3').showModal()}
            >
              + New Request
            </button>
            <RequestCreationModal currentUser={currentUser} teamId={teamId} getCurrentDate={getCurrentDate} />
          </div>

        </header>
        <div className="divider"></div>
        <RequestsNav />
        <RequestsPage
          requests={requests}
          handleApprove={handleApprove}
          handleReject={handleReject}
          getCurrentDate={getCurrentDate}
        />
      </>
    )
  }

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {currentUser?.role === 'Manager' ? renderManagerView() : renderEmployeeView()}
    </div>
  );


  //   return (
  //     <div className='max-w-full px-2 py-4 lg:px-6'>
  //       {/* Header Section */}
  //       <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
  //         <div className="flex w-full max-w-full items-center truncate">
  //           <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
  //             <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
  //               Requests
  //             </h3>
  //             <p className="text-emphasis hidden text-sm md:block">
  //               Be alerted of upcoming requests from your team
  //             </p>
  //           </div>
  //         </div>
  //       </header>
  //       <div className="divider"></div>
  //       <RequestsNav />
  //       <RequestsPage />
  //     </div>
  //   );
}

export default Requests;
