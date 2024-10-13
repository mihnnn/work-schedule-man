import React, { useEffect, useState } from 'react';
import MeetingCreationModal from './MeetingCreationModal';
import MeetingsNav from './MeetingsNav';
import MeetingsPage from './MeetingsPage';
import { useSelector } from 'react-redux';

function Meetings() {
  const { currentUser } = useSelector((state) => state.user);
  const [teamInfo, setTeamInfo] = useState([]);
  const [teamId, setTeamId] = useState(null);
  const [meetings, setMeetings] = useState([]);



  useEffect(() => {
    if (currentUser.teamMemberships) {
      setTeamId(currentUser.teamMemberships[0].team);
    }
    // console.log('teamId: ', teamId);
  }, [currentUser.teamMemberships[0].team]);

  const fetchTeamMembers = async () => {
    if (teamId) {
      try {
        const res = await fetch(`/api/teams/members/${teamId}`);
        if (!res.ok) {
          throw new Error('Error fetching team members');
        }
        const data = await res.json();
        setTeamInfo(data.members);
      } catch (error) {
        console.log('Error fetching team members: ', error);
      }
    }
  };

  const fetchMeetings = async () => {
    if (teamId) {
      try {
        const res = await fetch(`/api/meetings/${teamId}`);
        if (!res.ok) {
          throw new Error('Error fetching meetings');
        }
        const data = await res.json();
        setMeetings(data);
      } catch (error) {
        console.log('Error fetching meetings: ', error);
      }
    }
  }

  // console.log('teamInfo: ', teamInfo);
  // console.log('meetings: ', meetings);

  useEffect(() => {
    fetchTeamMembers();
    fetchMeetings();
  }, [teamId]);


  const renderManagerView = () => {
    return (
      <>
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
                <MeetingCreationModal teamInfo={teamInfo} />
              </div>
            </header>
          </div>
        </div>
        <div className='divider'></div>

        <MeetingsNav />
        <MeetingsPage teamInfo={teamInfo} meetings={meetings} />
      </>
    );
  }

  const renderEmployeeView = () => {
    return (
      <>
        <header className='flex w-full max-w-full items-center truncate'>
          <div className='w-full truncate ltr:mr-4 rtl:ml-4 md:block'>
            <h3 className=' text-gray-50 max-w-28 sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden"'>
              Meetings
            </h3>
            <p className='text-gray-100 hidden text-sm md:block'>
              View your upcoming meetings here
            </p>
          </div>
        </header>
        <div className="divider"></div>
        <MeetingsNav />
        <MeetingsPage meetings={meetings} />
      </>
    );
  }

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {currentUser?.role === 'Manager' ? renderManagerView() : renderEmployeeView()}
    </div>
  );
}

export default Meetings;
