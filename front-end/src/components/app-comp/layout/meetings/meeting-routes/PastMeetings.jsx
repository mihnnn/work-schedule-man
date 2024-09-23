import React from 'react';

const mockMeetings = [
  {
    title: "Project Kickoff Meeting",
    description: "Discuss project goals and timelines",
    date: "2024-09-23",
    time: "13:00 - 13:15",
    participants: [
      { id: 1, name: "First User", role: "Manager" },
      { id: 2, name: "Jeff", role: "Developer" }
    ],
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
  },
];

function PastMeetings() {
  return (
    <main className='w-full'>
      <div className='flex w-full flex-col' style={{ position: 'relative' }}>
        <div className='mb-6 pt-2 xl:pt-0'>
          <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
            <table className='w-full max-w-full table-fixed'>
              <tbody className='divide-current divide-y'>
                {mockMeetings.map((meeting, index) => (
                  <tr key={index} className='group justify-between hover:bg-gray-100 hover:bg-opacity-10'>
                    <td className='px-4'>
                      <a className='' href="">
                        <div className='cursor-pointer py-4 text-gray-100'>
                          <div className='max-w-10/12 sm:max-w-56 text-sm font-semibold  leading-6 md:max-w-full' title={meeting.description}>
                            {meeting.title}
                          </div>
                          <div className='text-sm'>
                            {meeting.participants.map((participant, idx) => (
                              <span key={participant.id}>
                                <div className='inline-block'>{participant.name}</div>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PastMeetings;
