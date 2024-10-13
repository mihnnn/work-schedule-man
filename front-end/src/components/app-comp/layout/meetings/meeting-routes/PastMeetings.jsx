import React from 'react';
import { useSelector } from 'react-redux';

function PastMeetings({ meetings }) {
  const { currentUser } = useSelector((state) => state.user);
  // console.log('currentUser: ', currentUser);
  // console.log('meetings: ', meetings);

  const currentDateTime = new Date();

  const renderManagerView = () => {
    const hostedMeetings = meetings.filter(meeting =>
      (meeting.host === currentUser.id ||
        meeting.participants.some(participant => participant.id === currentUser.id)) &&
      new Date(meeting.meetingDate) < currentDateTime
    );

    // console.log('hosted past meetings: ', hostedMeetings);

    const otherMeetings = meetings.filter(meeting =>
      (meeting.host !== currentUser.id &&
        !meeting.participants.some(participant => participant.id === currentUser.id)) &&
      new Date(meeting.meetingDate) < currentDateTime
    );

    return (
      <>
        <div className='mb-6 pt-2 xl:pt-0 gap-3'>
          <h3 className='text-2xl text-emphasis font-bold mb-2'>Features you</h3>
          <div>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className='px-4 py-4'>
                        <p>No past meetings for you.</p>
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
                        <p>No other past meetings.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderEmployeeView = () => {
    const pastEmployeeMeetings = meetings.filter(meeting => {
      const isPastMeeting = new Date(meeting.meetingDate) < currentDateTime;
      const isParticipant = meeting.participants.some(participant => participant.user._id === currentUser?._id);
  
      // Debugging logs
      // console.log(`Meeting Title: ${meeting.meetingTitle}, Is Past: ${isPastMeeting}, Is Participant: ${isParticipant}`);
  
      return isPastMeeting && isParticipant;
    });
  
    // console.log("Filtered Past Employee Meetings:", pastEmployeeMeetings);
  
    return (
      <div className='mb-6 pt-2 xl:pt-0'>
        <h3 className='text-2xl text-emphasis font-bold mb-2'>Your Past Meetings</h3>
        <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
          <table className='w-full max-w-full table-fixed'>
            <tbody className='divide-current divide-y'>
              {pastEmployeeMeetings.length > 0 ? (
                pastEmployeeMeetings.map((meeting, index) => (
                  <tr key={index} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
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
                              <span key={participant._id}>
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
                          <div className='text-gray-100 font-semibold text-sm leading-6'>
                            {new Date(meeting.meetingDate).toLocaleDateString()}
                          </div>
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
                    <p>No past meetings for you.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  



  return (
    <main className='w-full'>
      <div className='flex w-full flex-col'>
        {currentUser.role === 'Manager' ? renderManagerView() : renderEmployeeView()}
      </div>
    </main>
  );
}

export default PastMeetings;
