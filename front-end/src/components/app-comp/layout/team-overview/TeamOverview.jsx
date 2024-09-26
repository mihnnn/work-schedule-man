import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RiTeamFill } from "react-icons/ri";
import './table.css';
import JoinTeamModal from './JoinTeamModal';

function TeamOverview() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [teamMemberships, setTeamMemberships] = useState(null);

  useEffect(() => {
    const fetchTeamMemberships = async () => {
      try {
        const res = await fetch(`/api/users/user/teams/${currentUser._id}`);

        if (!res.ok) {
          toast.error('Failed to fetch team memberships');
          return;
        }
        const data = await res.json();
        setTeamMemberships(data.teams.length ? data.teams : null);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTeamMemberships();
  }, [currentUser._id]);

  const handleSelectedTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleFetchTeamInfo = async (teamId) => {
    try {
      const res = await fetch(`/api/teams/${teamId}`);

      if (!res.ok) {
        throw new Error('Failed to fetch team info');
      }
      const data = await res.json();
      setTeamInfo(data.team);
      console.log('team info', data.team);
    } catch (error) {
      console.error('Error fetching team info', error);
    }
  };

  useEffect(() => {
    if (selectedTeam) {
      handleFetchTeamInfo(selectedTeam.team);
    }
  }, [selectedTeam]);

  return (
    <div className="max-w-full px-2 py-4 lg:px-6">
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Team Overview
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              View your team members and their roles
            </p>
          </div>
        </div>
        <div className="fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto">
          <button
            className="btn btn-outline bg-white text-black"
            onClick={() => document.querySelector('#my_modal_3').showModal()}
          >
            Join Team
          </button>
          <JoinTeamModal />
        </div>
      </header>

      <div className="divider"></div>

      {teamMemberships ? (
        <div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-emphasis">
              {selectedTeam ? `Your Team >> ${selectedTeam.teamName}` : 'Your Team'}
            </h3>
          </div>

          <div className='mb-6'>
            <div className='border border-gray-500 rounded-md p-5 w-full animate-grow flex flex-row gap-x-2'>
              {teamMemberships.map((team) => (
                console.log('team', team),
                <button
                  key={team._id}
                  className={`btn btn-ghost p-4 m-auto border border-gray-600 rounded-md ${selectedTeam && selectedTeam._id === team._id ? 'bg-gray-400 bg-opacity-30' : ''}`}
                  onClick={() => handleSelectedTeam(team)}
                >
                  {team.teamName}
                </button>
              ))}
            </div>
          </div>

          {selectedTeam && teamInfo && (
            <div className="border border-gray-500 rounded-md p-5 w-full space-y-4">
              <div className="flex flex-row justify-between items-center">
                <h3 className="flex w-full text-xl font-semibold text-emphasis">
                  <span>{teamInfo.name} - {teamInfo.memberCount} members </span>
                  <span className='ml-auto text-right'>{`Team code: ${teamInfo.teamCode}`}</span>
                </h3>
              </div>

              {/* Display team members in a table */}
              <table className="table-auto w-full border-separate">
                <thead>
                  <tr className="text-emphasis font-bold">
                    <th className="px-4 py-2 border">#</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Role</th>
                    <th className="px-4 py-2 border text-center">Manager</th>
                  </tr>
                </thead>
                <tbody>
                  {teamInfo.members.map((member, index) => (
                    <tr key={member.id} className="text-gray-300 relative">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">
                        {member.name}
                        {member.id === currentUser._id && ' (you)'} {/* Add "(you)" next to the current user */}
                      </td>
                      <td className="px-4 py-2 border">{member.email}</td>
                      <td className="px-4 py-2 border">{member.role}</td>
                      <td className="px-4 py-2 border text-center">
                        {member.isManager ? 'x' : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center border-subtle rounded-xl p-5">
          <p className="text-emphasis text-3xl font-bold">You haven't joined a team yet.</p>
          <span className='m-4'>
            <RiTeamFill className='w-20 h-20 text-emphasis bg-gray-500 rounded-full' />
          </span>
        </div>
      )}
    </div>
  );
}

export default TeamOverview;
