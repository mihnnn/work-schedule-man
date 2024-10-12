import React from 'react';
import { useSelector } from 'react-redux';

const mockMeetings = [
  {
    title: "Project Kickoff Meeting",
    description: "Discuss project goals and timelines",
    date: "2024-09-23",
    time: "13:00 - 13:15",
    host: "ref to currentUser", //because only manager can host a meeting
    participants: [
      { id: 1, name: "First User", role: "Manager" },
      { id: 2, name: "Jeff", role: "Developer" }
    ],
    state: "upcoming", //upcoming | past | canceled, default is upcoming. Will be updated by a helpers function in the future
  },
  {
    title: "Weekly Sync",
    description: "Review progress and blockers",
    date: "2024-09-24",
    time: "14:00 - 14:30",
    participants: [
      { id: 1, name: "First User", role: "Manager" },
      { id: 3, name: "Alice", role: "Designer" }
    ],
    state: "upcoming",
  },
  {
    title: "Client Update",
    description: "Present updates to the client",
    date: "2024-09-26",
    time: "15:00 - 15:45",
    participants: [
      { id: 1, name: "First User", role: "Manager" },
      { id: 4, name: "Bob", role: "Marketing" }
    ],
    state: "upcoming",
  },
  {
    title: "Weekly Sync",
    description: "Review progress and blockers",
    date: "2024-09-24",
    time: "14:00 - 14:30",
    participants: [
      { id: 1, name: "First User", role: "Manager" },
      { id: '66f3cbe7e1aa259c47130401', name: "Employee 1", role: "Employee" }
    ],
    state: "canceled",
  }
];

function CanceledMeetings() {
  const { currentUser } = useSelector((state) => state.user);


  const filteredMeetings = mockMeetings.filter(
    (meeting) =>
      meeting.state === "past" &&
      meeting.participants.some((participant) => participant.id == currentUser._id)
  );

  return (
    <main className='w-full'>
      <div className='flex w-full flex-col' style={{ position: 'relative' }}>
        <div className='mb-6 pt-2 xl:pt-0'>
          <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
            <table className='w-full max-w-full table-fixed'>
              <tbody className='divide-current divide-y'>
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting, index) => (
                    <tr key={index} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                      <td className='px-4'>
                        <a className='' href="">
                          <div className='cursor-pointer py-4 text-gray-100'>
                            <div className='max-w-10/12 sm:max-w-56 text-sm leading-6 md:max-w-full line-through font-bold' title={meeting.description}>
                              {meeting.title}
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
                            <div className='text-gray-100 font-semibold text-sm leading-6'>{meeting.date}</div>
                            <div>
                              <small className='font-normal text-sm'>{meeting.time}</small>
                            </div>
                          </div>
                        </div>
                      </td>

                    </tr>
                  ))) : (
                  <tr>
                    <td className='px-4 py-4  text-center text-gray-100'>
                      No canceled meetings
                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CanceledMeetings;
