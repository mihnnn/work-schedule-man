import React from "react";
import { useSelector } from "react-redux";

function TeamOverview() {
  // Assume we get the current team from the Redux state
  const { currentUser } = useSelector((state) => state.user);
  const { team } = currentUser || { team: [] };

  return (
    <div className="p-8">
      {/* Team Overview */}

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Overview</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-gray-800 text-white text-left text-sm uppercase font-semibold">Name</th>
              <th className="py-4 px-6 bg-gray-800 text-white text-left text-sm uppercase font-semibold">Role</th>
              <th className="py-4 px-6 bg-gray-800 text-white text-left text-sm uppercase font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {team && team.length > 0 ? (
              team.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{member.name}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{member.role}</td>
                  <td className="py-4 px-6 border-b border-gray-200 text-gray-800">{member.status || 'Active'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamOverview;
