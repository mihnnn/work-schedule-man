import React from 'react';

function DashBoardTeam() {
  const managerName = "Manager A";
  const teamMembers = [
    { id: 1, name: 'Alice', role: 'Waiter', status: 'Active' },
    { id: 2, name: 'Bob', role: 'Chef', status: 'Off Duty' },
    { id: 3, name: 'Charlie', role: 'Security', status: 'Active' },
  ];

  const roleBreakdown = {
    Waiter: 1,
    Chef: 1,
    Security: 1,
    Cleaner: 0,
  };

  return (
    <div className="p-6">
      {/* Team Overview Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Overview</h2>
        <div className="flex md:grid-cols-4 gap-4">
          <div className='bg-inherit border border-gray-700 p-4 text-emphasis rounded-lg min-w-56'>
            <h3 className="text-lg font-semibold">Manager</h3>
            <p className="text-3xl mt-2">{managerName}</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg min-w-5">
            <h3 className="text-lg font-semibold">Total Members</h3>
            <p className="text-3xl mt-2">{teamMembers.length}</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg min-w-5">
            <h3 className="text-lg font-semibold">On-shift</h3>
            <p className="text-3xl mt-2">{teamMembers.filter(member => member.status === 'Active').length}</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg min-w-5">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
            <p className="text-3xl mt-2">0</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg min-w-5">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-3xl mt-2">2</p>
          </div>
        </div>
      </section>

      {/* Team Role Breakdown Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Role Breakdown</h2>
        <div className="flex gap-4">
          {Object.keys(roleBreakdown).map(role => (
            <div key={role} className=" text-emphasis p-4 rounded-lg bg-inherit border border-gray-700 min-w-28">
              <h3 className="text-lg font-semibold">{role}</h3>
              <p className="text-3xl mt-2">{roleBreakdown[role]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Onshift members */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">On-shift Team Members</h2>
        <table className="min-w-full  text-emphasis">
          <thead>
            <tr className='border border-gray-500'>
              <th className="py-2 px-4 bg-gray-700 text-center">#</th>
              <th className="py-2 px-4 bg-gray-700 text-left">Name</th>
              <th className="py-2 px-4 bg-gray-700 text-left">Role</th>
              <th className="py-2 px-4 bg-gray-700 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={member.id} className="border-b border-gray-600">
                <td className="py-2 px-4 text-center border border-gray-500 rounded-xl">{index + 1}</td>
                <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{member.name}</td>
                <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{member.role}</td>
                <td className={`py-2 px-4 text-left border border-gray-500 rounded-xl ${member.status === 'Active' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>
                  {member.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default DashBoardTeam;
