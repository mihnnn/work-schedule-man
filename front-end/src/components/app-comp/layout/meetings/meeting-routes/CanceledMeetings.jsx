import React from 'react';
import { useSelector } from 'react-redux';

function CanceledMeetings({ meetings }) {
  const { currentUser } = useSelector((state) => state.user);


  const renderManagerView = () => {
    // Sort canceled meetings
    const canceledMeetings = meetings.filter(meeting => meeting.state === "canceled");

    return (
      <div className='mb-6 pt-2 xl:pt-0'>
        <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
          <table className='w-full max-w-full table-fixed'>
            <tbody className='divide-current divide-y'>
              {canceledMeetings.length > 0 ? (
                canceledMeetings.map((meeting, index) => (
                  <tr key={index} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                    <td className='px-4'>
                      <a className='' href="">
                        <div className='cursor-pointer py-4 text-gray-100'>
                          <div className='max-w-10/12 sm:max-w-56 text-sm leading-6 md:max-w-full line-through font-bold' title={meeting.description}>
                            {meeting.meetingTitle}
                          </div>
                          <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full line-through'>
                            {meeting.meetingDescription}
                          </div>
                          <div className='text-sm'>
                            {meeting.participants.map((participant, idx) => (
                              <span key={participant.id}>
                                <div className='inline-block line-through'>{participant.name}</div>
                                {idx < meeting.participants.length - 1 && <span>{" "} and {" "}</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                      <div>
                        <div className='py-4'>
                          <div className='text-gray-100 font-semibold text-sm leading-6'>{new Date(meeting.meetingDate).toLocaleDateString()}</div>
                          <div>
                            <small className='font-normal text-sm'>{meeting.time.start} - {meeting.time.end}</small>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-4 text-center text-gray-100'>
                    No canceled meetings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderEmployeeView = () => {
    const filteredEmployeeMeetings = meetings.filter(
      (meeting) =>
        meeting.state === "canceled" && // Ensure we are filtering by "canceled"
        meeting.participants.some((participant) => participant.user._id === currentUser._id)
    );
    return (
      <div className='mb-6 pt-2 xl:pt-0'>
        <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
          <table className='w-full max-w-full table-fixed'>
            <tbody className='divide-current divide-y'>
              {filteredEmployeeMeetings.length > 0 ? (
                filteredEmployeeMeetings.map((meeting, index) => (
                  <tr key={index} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                    <td className='px-4'>
                      <a className='' href="">
                        <div className='cursor-pointer py-4 text-gray-100'>
                          <div className='max-w-10/12 sm:max-w-56 text-sm leading-6 md:max-w-full line-through font-bold' title={meeting.description}>
                            {meeting.meetingTitle}
                          </div>
                          <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold leading-6 md:max-w-full line-through'>
                            {meeting.meetingDescription}
                          </div>
                          <div className='text-sm'>
                            {meeting.participants.map((participant, idx) => (
                              <span key={participant.id}>
                                <div className='inline-block line-through'>{participant.name}</div>
                                {idx < meeting.participants.length - 1 && <span>{" "} and {" "}</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      </a>
                    </td>
                    <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                      <div>
                        <div className='py-4'>
                          <div className='text-gray-100 font-semibold text-sm leading-6'>{new Date(meeting.meetingDate).toLocaleDateString()}</div>
                          <div>
                            <small className='font-normal text-sm'>{meeting.time.start} - {meeting.time.end}</small>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-4 text-center text-gray-100'>
                    No canceled meetings
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
        {currentUser.role === "Manager" ? renderManagerView() : renderEmployeeView()}
      </div>
    </main>
  );
}

export default CanceledMeetings;
