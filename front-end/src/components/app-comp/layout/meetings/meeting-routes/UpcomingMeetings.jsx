import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MeetingUpdateModal from '../MeetingUpdateModal';

function UpcomingMeetings({ meetings, teamInfo }) {
  const { currentUser } = useSelector((state) => state.user);
  // console.log('currentUser: ', currentUser);
  // console.log('meetings: ', meetings);

  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const currentDateTime = new Date();

  useEffect(() => {
    if (selectedMeeting) {
      const modal = document.getElementById('edit_modal');
      if (modal) {
        modal.showModal();
      }
    }
  })

  const handleModalClose = () => {
    setSelectedMeeting(null);
  };

  const handleModalOpen = (meeting) => {
    setSelectedMeeting(meeting);
  }


  // Cancel meeting handler
  const handleCancelMeeting = async (meetingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this meeting?');
    if (!confirmCancel) return;
    try {
      const res = await fetch(`/api/meetings/${meetingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: 'canceled' }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel meeting');
      }
      const data = await res.json();
      console.log('Canceled meeting: ', data);
    } catch (error) {
      console.error('Error canceling meeting: ', error);
    }
  };

  const renderManagerView = () => {
    const hostedMeetings = meetings.filter(meeting =>
      (meeting.host === currentUser.id ||
        meeting.participants.some(participant => participant.id === currentUser.id)) &&
      new Date(meeting.meetingDate) > currentDateTime && meeting.state !== 'canceled'
    );

    const otherMeetings = meetings.filter(meeting =>
      (meeting.host !== currentUser.id &&
        !meeting.participants.some(participant => participant.id === currentUser.id)) &&
      new Date(meeting.meetingDate) > currentDateTime && meeting.state !== 'canceled'
    );

    return (
      <>
        <div className='mb-6 pt-2 xl:pt-0 gap-3'>
          <h3 className='text-2xl text-emphasis font-bold mb-2'>Features you</h3>

          {/* Today's Meetings Section */}
          <div>
            <p className='mb-2 text-xs font-medium uppercase leading-4'>Today</p>
            <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
              <table className='w-full max-w-full table-fixed'>
                <tbody className='divide-current divide-y'>
                  {hostedMeetings.length > 0 ? (
                    hostedMeetings.map((meeting) => (
                      <tr key={meeting._id} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                        <td className='px-4'>
                          <a className='' href="">
                            <div className='cursor-pointer py-4 text-gray-100'>
                              <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full'>
                                {meeting.meetingTitle}
                              </div>
                              <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full'>
                                {meeting.meetingDescription}
                              </div>

                              <div className='text-sm'>
                                {meeting.participants.map((participant, idx) => (
                                  <span key={participant.id}>
                                    <div className='inline-block'>{participant.name}</div>
                                    {idx < meeting.participants.length - 1 && <span>{" "} - {" "}</span>}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </a>
                        </td>
                        <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                          <a href="">
                            <div className='py-4'>
                              <div className='text-gray-100 font-semibold text-sm leading-6'>{new Date(meeting.meetingDate).toLocaleDateString()}</div>
                              <div>
                                <small className='font-normal text-sm'>{meeting.time.start} - {meeting.time.end}</small>
                              </div>
                            </div>
                          </a>
                        </td>
                        <td className='flex w-full justify-end text-right py-4 px-4'>
                          <div className='flex gap-2 my-auto'>
                            <div className='bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border hover:bg-inherit hover:border-white' onClick={() => handleModalOpen(meeting)}>
                              <button className='items-center' >
                                Edit
                              </button>
                            </div>
                            <button
                              className='my-auto bg-inherit border-gray-400 btn rounded-md border hover:bg-inherit hover:border-white text-red-500'
                              onClick={() => handleCancelMeeting(meeting._id)}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='px-4 py-4'>
                        <p>No upcoming meetings for you today.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Other Meetings Section */}
          <div>
            <h3 className='text-2xl text-emphasis font-bold mb-2'>Other Meetings</h3>
            <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
              <table className='w-full max-w-full table-fixed'>
                <tbody className='divide-current divide-y'>
                  {otherMeetings.length > 0 ? (
                    otherMeetings.map((meeting) => (
                      <tr key={meeting._id} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                        <td className='px-4'>
                          <a className='' href="">
                            <div className='cursor-pointer py-4 text-gray-100'>
                              <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full' title={meeting.meetingDescription}>
                                {meeting.meetingTitle}
                              </div>
                              <div className='text-sm'>
                                {meeting.participants.map((participant, idx) => (
                                  <span key={participant.id}>
                                    <div className='inline-block'>{participant.name}</div>
                                    {idx < meeting.participants.length - 1 && <span>{" "} - {" "}</span>}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </a>
                        </td>
                        <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                          <a href="">
                            <div className='py-4'>
                              <div className='text-gray-100 font-semibold text-sm leading-6'>{new Date(meeting.meetingDate).toLocaleDateString()}</div>
                              <div>
                                <small className='font-normal text-sm'>{meeting.time.start} - {meeting.time.end}</small>
                              </div>
                            </div>
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='px-4 py-4'>
                        <p>No other upcoming meetings.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <MeetingUpdateModal meeting={selectedMeeting} onModalClose={handleModalClose} onModalOpen={handleModalOpen} members={teamInfo} />

      </>
    );
  };


  const renderEmployeeView = () => {
    const employeeMeetings = meetings.filter(meeting => {
      // Log the meeting details
      console.log("Meeting:", meeting);
    
      // Extract values for comparison
      const meetingDate = new Date(meeting.meetingDate);
      const isParticipant = meeting.participants.some(participant => (
        console.log("Participant:", participant),
        participant.user._id === currentUser?._id
      ));
      const isFutureMeeting = meetingDate > currentDateTime;
      const isNotCanceled = meeting.state !== 'canceled';
    
      // Return true if all conditions are met
      return isParticipant && isFutureMeeting && isNotCanceled;
    });
    

    return (
      <>
        <div className='mb-6 pt-2 xl:pt-0'>
          <h3 className='text-2xl text-emphasis font-bold mb-2'>Your meetings</h3>
          <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
            <table className='w-full max-w-full table-fixed'>
              <tbody className='divide-current divide-y'>
                {employeeMeetings.length > 0 ? (
                  employeeMeetings.map((meeting) => (
                    <tr key={meeting._id} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                      <td className='px-4'>
                        <a className='' href="">
                          <div className='cursor-pointer py-4 text-gray-100'>
                            <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full' >
                              {meeting.meetingTitle}
                            </div>
                            <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full'>
                              {meeting.meetingDescription}
                            </div>
                            <div className='text-sm'>
                              {meeting.participants.map((participant, idx) => (
                                <span key={participant.id}>
                                  <div className='inline-block'>{participant.name}</div>
                                  {idx < meeting.participants.length - 1 && <span>{" "} - {" "}</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        </a>
                      </td>
                      <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                        <a href="">
                          <div className='py-4'>
                            <div className='text-gray-100 font-semibold text-sm leading-6'>{new Date(meeting.meetingDate).toLocaleDateString()}</div>
                            <div>
                              <small className='font-normal text-sm'>{meeting.time.start} - {meeting.time.end}</small>
                            </div>
                          </div>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className='px-4 py-4'>
                      <p>No upcoming meetings for you today.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {currentUser.role === 'Manager' ? renderManagerView() : renderEmployeeView()}
    </div>
  );
}

export default UpcomingMeetings;
