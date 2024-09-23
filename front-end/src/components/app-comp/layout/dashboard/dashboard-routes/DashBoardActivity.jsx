import React from 'react';
import { Link } from 'react-router-dom';

function DashBoardActivity() {
  const teamNotices = [
    { id: 1, type: "Team" ,notice: 'New team member joined: David (Cleaner)', date: 'Sep 10, 2024' },
    { id: 2, type: "Schedule" ,notice: 'Upcoming meeting on Sep 12, 2024 at 2:00 PM', date: 'Sep 9, 2024' },
    { id: 3, type: "Remind" ,notice: 'Schedule deadline approaching', date: 'Sep 8, 2024' },
  ];

  return (
    <div className="p-6">
      <section>
        <div className='flex'>
          <h2 className="text-2xl font-semibold mb-4 text-emphasis">Team Notifications</h2>
          <Link to="/app/requests" className="ml-auto text-blue-400 underline">View requests</Link>
        </div>
        <ul className="space-y-1">
          {teamNotices.map(notice => (
            <li key={notice.id} className="bg-inherit border border-gray-700 text-white p-4 rounded-lg">
              <div className="flex flex-row justify-between">
                {/* If type team, click will direct to Team Management (app/team-management)
                    If type Schedule, direct to Schedule subtab (app/dashboard/schedule)
                    If type Remind, direct to Schedule subtab (app/dashboard/schedule)
                */}
                <div>
                  <h3 className="text-lg font-semibold">{notice.type}</h3>
                  <p>{notice.notice}</p>
                </div>
                <span className="my-auto text-sm text-gray-400">{notice.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DashBoardActivity;
