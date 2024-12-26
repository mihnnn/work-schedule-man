import React, { useEffect, useState } from 'react';
import './table.css';
import { useSelector } from 'react-redux';

function DashBoardTeam() {
  const { currentUser } = useSelector((state) => state.user);

  const [teamId, setTeamId] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log("teamId", teamId);
  console.log("teamInfo", teamInfo);
  console.log("schedules", schedules);

  const calculateRoleBreakdown = (roles, members) => {
    return roles.map((role) => {
      const count = members.filter((member) => member.role === role._id).length;
      return {
        ...role,
        count,
      };
    });
  };

  useEffect(() => {
    const getTeamMembership = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/users/user/teams/${currentUser._id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch team membership');
        }
        const data = await res.json();
        setTeamId(data.teams.length ? data.teams[0].team : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTeamMembership();
  }, [currentUser._id]);

  const fetchTeamData = async (teamId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch team data');
      }
      const data = await res.json();

      const teamData = data.team;
      const { roles, members } = teamData;

      const updatedRoles = calculateRoleBreakdown(roles, members);

      setTeamInfo({
        ...teamData,
        roles: updatedRoles,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    if (!teamId) return;
    try {
      const res = await fetch(`/api/schedules/${teamId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch schedules');
      }
      const data = await res.json();
      setSchedules(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (teamId) {
      fetchTeamData(teamId);
      fetchSchedules(teamId);
    }
  }, [teamId]);

  const isShiftActive = (shift) => {
    const currentDay = new Date().toLocaleString('en-US', { weekday: 'short' }).toLowerCase();
    const currentTime = new Date();

    if (shift.assignedDays[currentDay]) {
      const [startTime, endTime] = shift.time.split(' - ');
      const start = new Date();
      const end = new Date();

      // Parse the start and end times
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);

      start.setHours(startHours, startMinutes, 0, 0);
      end.setHours(endHours, endMinutes, 0, 0);

      // Check if the current time is between start and end time
      return currentTime >= start && currentTime <= end;
    }

    return false;
  };
  const getRoleName = (roleId) => {
    const role = teamInfo.roles.find((r) => r._id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Overview</h2>
        <div className="flex justify-evenly md:grid-cols-4 gap-4">
          <div className='bg-inherit border border-gray-700 p-4 text-emphasis rounded-lg'>
            <h3 className="text-lg font-semibold">Manager</h3>
            <p className="text-2xl mt-2">
              {teamInfo?.managers.map((manager, index) => (
                <span key={index}>{manager.name}</span>
              ))}
            </p>
          </div>
          <div className="bg-inherit border border-gray-700 text-emphasis p-4 rounded-lg flex-auto">
            <h3 className="text-lg font-semibold">Total Members</h3>
            <p className="text-2xl mt-2">{teamInfo?.memberCount}</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">Team Role Breakdown</h2>
        <div className="flex gap-4 justify-evenly w-full">
          {teamInfo?.roles.map((role, index) => (
            <div key={index} className="bg-inherit border border-gray-700 p-4 text-emphasis rounded-lg flex-auto">
              <h3 className="text-lg font-semibold">{role.name}</h3>
              <p className="text-2xl mt-2">{role.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-emphasis">On-shift Team Members</h2>
        <table className="min-w-full text-emphasis">
          <thead>
            <tr className='border bg-gray-700 border-gray-500'>
              <th className="py-2 px-4 text-center">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-center">Manager</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {teamInfo?.members.map((member, index) => {
              const memberShifts = schedules.filter(schedule =>
                schedule.assignedEmployees.some(emp => emp._id === member._id)
              );

              const status = memberShifts.some(isShiftActive) ? 'Active' : 'Off duty';

              const isManager = member.isManager === true;

              return (
                <tr key={member._id} className="border-b border-gray-600">
                  <td className="py-2 px-4 text-center border border-gray-500 rounded-xl">{index + 1}</td>
                  <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{member.name}</td>
                  <td className="py-2 px-4 text-left border border-gray-500 rounded-xl">{getRoleName(member.role)}</td>
                  <td className="py-2 px-4 text-center border border-gray-500 rounded-xl">
                    {isManager ? 'x' : ''}
                  </td>
                  <td className={`py-2 px-4 text-left border border-gray-500 rounded-xl ${status === 'Active' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}`}>
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default DashBoardTeam;
