import React from 'react';

function DashBoardActivity() {
  const teamNotices = [
    { id: 1, notice: 'New team member joined: David (Cleaner)', date: 'Sep 10, 2024' },
    { id: 2, notice: 'Upcoming meeting on Sep 12, 2024 at 2:00 PM', date: 'Sep 9, 2024' },
    { id: 3, notice: 'Reminder: Schedule deadline approaching', date: 'Sep 8, 2024' },
  ];

  return (
    <div className="p-6">
      <section>
        <h2 className="text-2xl font-semibold mb-2">Team Notices</h2>
        <ul className="space-y-3">
          {teamNotices.map(notice => (
            <li key={notice.id} className="bg-gray-700 text-white p-4 rounded-lg">
              <div className="flex justify-between">
                <p>{notice.notice}</p>
                <span className="text-sm text-gray-400">{notice.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DashBoardActivity;
