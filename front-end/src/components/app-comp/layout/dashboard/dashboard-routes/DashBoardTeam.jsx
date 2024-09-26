import React, { useEffect, useState } from 'react';
import './table.css';
import { useSelector } from 'react-redux';

function DashBoardTeam() {
  const { currentUser } = useSelector((state) => state.user);

  const [teamId, setTeamId] = useState(null);
  console.log('teamId', teamId);

  const [teamInfo, setTeamInfo] = useState(null);
  console.log('teamInfo', teamInfo);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the user's team membership
  useEffect(() => {
    const getTeamMembership = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const res = await fetch(`/api/users/user/teams/${currentUser._id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch team membership');
        }
        const data = await res.json();
        // console.log('team info', data);
        setTeamId(data.teams.length ? data.teams[0].team : null);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    getTeamMembership();
  }, [currentUser._id]); // Add dependency on currentUser._id

  // Fetch team data based on the current team's ID
  const fetchTeamData = async (teamId) => {
    setLoading(true); // Set loading to true when starting to fetch
    try {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await res.json();
      // console.log('team data', data);
      setTeamInfo(data.team);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch team data whenever the current team info changes
  useEffect(() => {
    if (teamId) {
      fetchTeamData(teamId); // Use the correct property from currentTeamInfo
    } 
  }, [teamId]); // Trigger when currentTeamInfo changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      {/* Team Overview Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Overview</h2>
        <div className="flex justify-evenly md:grid-cols-4 gap-4">
          <div className='bg-inherit border border-gray-700 p-4 text-emphasis rounded-lg'>
            <h3 className="text-lg font-semibold">Manager</h3>
            <p className="text-2xl mt-2">
              {teamInfo?.managers.map((manager, index) => (
                <span key={index}>
                  {manager.name}
                </span>
              ))}
            </p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg flex-auto">
            <h3 className="text-lg font-semibold">Total Members</h3>
            <p className="text-2xl mt-2">{teamInfo?.memberCount}</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg flex-auto">
            <h3 className="text-lg font-semibold">On-shift</h3>
            <p className="text-2xl mt-2">2</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg flex-auto">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
            <p className="text-2xl mt-2">0</p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg flex-auto">
            <h3 className="text-lg font-semibold">Pending Requests</h3>
            <p className="text-2xl mt-2">2</p>
          </div>
        </div>
      </section>

      {/* Team Role Breakdown Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Role Breakdown</h2>
        <div className="flex gap-4 justify-evenly w-full">
          {/* {Object.keys(roleBreakdown).map(role => (
            <div key={role} className="text-emphasis flex-auto p-4 rounded-lg bg-inherit border border-gray-700">
              <h3 className="text-lg font-semibold">{role}</h3>
              <p className="text-3xl mt-2">{roleBreakdown[role]}</p>
            </div>
          ))} */}
        </div>
      </section>

      {/* On-shift members */}
      <section>
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">On-shift Team Members</h2>
        <table className="min-w-full text-emphasis">
          <thead>
            <tr className='border bg-gray-700 border-gray-500'>
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {teamMembers.map((member, index) => (
              <tr key={member.id} className="border-b border-gray-600">
                <td className="py-2 px-4 text-center border border-gray-500 rounded-xl">{index + 1}</td>
                <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{member.name}</td>
                <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{member.role}</td>
                <td className={`py-2 px-4 text-left border border-gray-500 rounded-xl ${member.status === 'Active' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>
                  {member.status}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default DashBoardTeam;
