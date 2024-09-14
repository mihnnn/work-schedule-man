import React from 'react';

function DashBoardTeam() {
  const teamMembers = [
    { id: 1, name: 'Alice', role: 'Waiter', status: 'Active' },
    { id: 2, name: 'Bob', role: 'Chef', status: 'Off Duty' },
    { id: 3, name: 'Charlie', role: 'Security', status: 'Active' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Bob requested time off', date: 'Sep 10, 2024' },
    { id: 2, activity: 'Charlie swapped shifts with Alice', date: 'Sep 9, 2024' },
    { id: 3, activity: 'New schedule created', date: 'Sep 8, 2024' },
  ];

  return (
    <div className="p-6">
      {/* Team Overview Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Team Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Total Members</h3>
            <p className="text-3xl mt-2">{teamMembers.length}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Active Members</h3>
            <p className="text-3xl mt-2">{teamMembers.filter(member => member.status === 'Active').length}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
            <p className="text-3xl mt-2">3</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-3xl mt-2">1</p>
          </div>
        </div>
      </section>

      {/* Active Team Members Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Active Team Members</h2>
        <ul className="space-y-3">
          {teamMembers
            .filter(member => member.status === 'Active')
            .map(member => (
              <li key={member.id} className="flex justify-between items-center bg-gray-700 text-white p-4 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p>{member.role}</p>
                </div>
                <span className="px-2 py-1 bg-green-600 rounded-lg text-sm">Active</span>
              </li>
            ))}
        </ul>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Recent Activity</h2>
        <ul className="space-y-3">
          {recentActivities.map(activity => (
            <li key={activity.id} className="bg-gray-700 text-white p-4 rounded-lg">
              <div className="flex justify-between">
                <p>{activity.activity}</p>
                <span className="text-sm text-gray-400">{activity.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default DashBoardTeam;
