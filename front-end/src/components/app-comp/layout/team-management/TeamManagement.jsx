import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './table.css';
import AddRoleModal from './AddRoleModal';
import { useSelector } from 'react-redux';
import JoinTeamModal from '../team-overview/JoinTeamModal';
import toast from 'react-hot-toast';

function TeamManagement() {
  const { currentUser } = useSelector((state) => state.user);

  const [teamMembership, setTeamMembership] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  const [newRole, setNewRole] = useState('');
  const navigate = useNavigate();

  const [memberDropdownOpen, setMemberDropdownOpen] = useState(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(null);
  const [roleSubMenuOpen, setRoleSubMenuOpen] = useState(null);
  const dropdownRef = useRef(null);
  const availableRoles = selectedTeam?.roles || [];

  useEffect(() => {
    const fetchTeamMemberships = async () => {
      try {
        const res = await fetch(`/api/users/user/teams/${currentUser._id}`);
        if (!res.ok) {
          toast.error('Failed to fetch team memberships');
          return;
        }
        const data = await res.json();
        setTeamMembership(data.teams.length ? data.teams : null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeamMemberships();
  }, [currentUser._id]);


  useEffect(() => {
    if (selectedTeam) {
      handleFetchTeamInfo(selectedTeam.team);
    }
  }, [selectedTeam]);

  console.log("selectedTeam", selectedTeam);
  console.log("teamInfo", teamInfo);

  const isManager = () => {
    if (!teamInfo) return false;
    return teamInfo.managers.some(manager => manager.email === currentUser.email);
  };

  useEffect(() => {
    function handleClickoutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMemberDropdownOpen(null);
        setRoleDropdownOpen(null);
        setRoleSubMenuOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClickoutside);
    return () => {
      document.removeEventListener('mousedown', handleClickoutside);
    }
  }, []);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleMemberDropdownToggle = (index) => {
    setMemberDropdownOpen(memberDropdownOpen === index ? null : index);
    setRoleSubMenuOpen(null);
  };

  const handleRoleDropdownToggle = (index) => {
    setRoleDropdownOpen(roleDropdownOpen === index ? null : index);
    setRoleSubMenuOpen(null);
  };

  const handleRoleSubMenuToggle = (index) => {
    setRoleSubMenuOpen(roleSubMenuOpen === index ? null : index);
  };

  const handleOptionClick = () => {
    setMemberDropdownOpen(null);
    setRoleDropdownOpen(null);
  }

  const handleFetchTeamInfo = async (teamId) => {
    try {
      const res = await fetch(`/api/teams/${teamId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch team info');
      }
      const data = await res.json();
      setTeamInfo(data.team);
    } catch (error) {
      console.error('Error fetching team info', error);
    }
  };

  const handleOpenModal = (open) => {
    if (open) {
      document.querySelector('#my_modal_2').showModal();
    } else {
      document.querySelector('#my_modal_2').close();
    }
  }


  return (
    <div className="max-w-full px-2 py-4 lg:px-6">
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Team Management
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              View and manage your teams and team members
            </p>
          </div>
        </div>

        {/* <div className="fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto">
          <button
            className="btn btn-outline bg-white text-black"
            onClick={() => document.querySelector('#my_modal_3').showModal()}
          >
            Join Team
          </button>
          <JoinTeamModal />
        </div> */}
      </header>
      <div className="divider"></div>

      {/* Team Selection */}
      {teamMembership ? (
        <div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-emphasis">
              {selectedTeam ? `Your Team >> ${selectedTeam.teamName}` : 'Your Team'}
            </h3>
          </div>

          <div className='mb-6'>
            <div className='border border-gray-500 rounded-md p-5 w-full animate-grow flex flex-row gap-x-2'>
              {teamMembership.map((team) => (
                <button
                  key={team._id}
                  className={`btn btn-ghost p-4 m-auto border border-gray-600 rounded-md ${selectedTeam && selectedTeam._id === team._id ? 'bg-gray-400 bg-opacity-30' : ''}`}
                  onClick={() => handleSelectTeam(team)}
                >
                  {team.teamName}
                </button>
              ))}
            </div>
          </div>

          {selectedTeam && teamInfo && (
            <div className='border border-gray-500 rounded-md p-5 w-full space-y-4'>
              <div className='flex flex-row items-center'>
                <div className='flex w-full justify-between text-xl font-semibold text-emphasis'>
                  <div className='flex'>
                    <span>{teamInfo.name} - {teamInfo.memberCount} members</span>
                    <span className='my-auto align-middle'>
                      {isManager() && (
                        <button onClick={() => {/* Handle edit action */ }}>
                          <FaEdit className=" ml-2 w-30 h-30 text-blue-500" />
                        </button>
                      )}
                    </span>
                  </div>
                  <span className='ml-auto text-right'>{`Team code: ${selectedTeam.teamCode}`}</span>
                </div>
              </div>

              {/* Member + roles table */}
              <div className=' flex w-full gap-x-10 justify-between'>
                {/* Member table */}
                <div className='flex-grow'>
                  <h4 className='text-lg font-semibold mb-2 text-emphasis'>
                    Members
                  </h4>

                  <table className='table-auto w-full border-separate'>
                    <thead>
                      <tr className='text-emphasis font-bold'>
                        <th className='px-4 py-2 border'>#</th>
                        <th className='px-4 py-2 border'>Name</th>
                        <th className='px-4 py-2 border'>Email</th>
                        <th className='px-4 py-2 border'>Role</th>
                        <th className='px-4 py-2 border text-center'>Manager</th>
                        {isManager() && (
                          <th className='px-4 py-2 border text-center'>Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {teamInfo.members.map((member, index) => (
                        <tr key={index} className='text-gray-300 relative'>
                          <td className='px-4 py-2 border'>{index + 1}</td>
                          <td className='px-4 py-2 border'>
                            {member.name}
                            {member.id === currentUser._id && ' (you)'}
                          </td>
                          <td className='px-4 py-2 border'>{member.email}</td>
                          <td className='px-4 py-2 border'>{member.role}</td>
                          <td className='px-4 py-2 border text-center'>
                            {member.isManager ? 'x' : ''}
                          </td>
                          {isManager() && (
                            <td className='px-4 py-2 border text-center'>
                              <button
                                onClick={() => { handleMemberDropdownToggle(index) }}
                              >
                                <FaEllipsisV className='w-30 h-30' />
                              </button>

                              {/* dropdown menu */}
                              {memberDropdownOpen === index && (
                                <div
                                  ref={dropdownRef}
                                  className='absolute right-0 w-48 bg-gray-900 border-gray-500 rounded-md shadow-lg z-50'
                                >
                                  <ul>
                                    {/* menu options */}
                                    <li
                                      className='px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer relative'
                                      onMouseEnter={() => handleRoleSubMenuToggle(index)}
                                      onMouseLeave={() => setRoleSubMenuOpen(null)}
                                    >
                                      <div className='flex'>
                                        <span>Assign Role</span>
                                        <IoIosArrowForward className='ml-[55px] my-auto' />
                                      </div>
                                      {/* submenu for assigning roles */}
                                      {roleSubMenuOpen === index && (
                                        <ul className='absolute left-full top-0 mt-0 w-48 bg-gray-900 rounded-lg shadow-lg z-50'>
                                          {availableRoles.length > 0 ? (
                                            availableRoles.map((role, i) => (
                                              <li
                                                key={i}
                                                className='px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer min-w-[80px]'
                                                onClick={handleOptionClick}
                                              >
                                                <div className='flex'>
                                                  {role}
                                                </div>
                                              </li>
                                            ))
                                          ) : (
                                            <ul>
                                              <li className='px-4 py-2 text-gray-400 cursor-default'>
                                                No roles available
                                              </li>
                                            </ul>
                                          )}
                                        </ul>
                                      )}
                                    </li>

                                    {/* Promote to Manager */}
                                    <li
                                      className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
                                      onClick={handleOptionClick}
                                    >
                                      <div className='flex'>
                                        <span>
                                          Promote to Manager
                                        </span>
                                      </div>
                                    </li>

                                    {/* Delete Member */}
                                    <li
                                      className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer text-red-500"
                                      onClick={handleOptionClick}
                                    >
                                      <div className='flex'>
                                        <span>
                                          Delete
                                        </span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </td>
                          )}

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Role table */}
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold mb-2 text-emphasis">Roles</h4>
                  <table className="table-auto w-full border-separate">
                    <thead>
                      <tr className="text-emphasis font-bold">
                        <th className="px-4 py-2 border">#</th>
                        <th className="px-4 py-2 border">Role Name</th>
                        {isManager(selectedTeam) && (
                          <th className="px-4 py-2 border text-center">Actions</th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {teamInfo.roles.length === 0 ? (
                        <tr>
                          <td className="px-4 py-2 border" colSpan={isManager(selectedTeam) ? 3 : 2}>
                            No roles available
                          </td>
                        </tr>
                      ) : (
                        teamInfo.roles.map((role, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{role}</td>
                            {isManager(selectedTeam) && (
                              <td className="px-4 py-2 border text-center relative">
                                <button
                                  className="p-2 hover:bg-gray-200 hover:opacity-30 hover:text-gray-700 rounded-full"
                                  onClick={() => handleRoleDropdownToggle(index)}
                                >
                                  <FaEllipsisV />
                                </button>

                                {/* Dropdown Menu */}
                                {roleDropdownOpen === index && (
                                  <div
                                    ref={dropdownRef}
                                    className="absolute right-0 w-48 bg-gray-900 border border-gray-500 rounded-md shadow-lg z-50"
                                  >
                                    <ul>
                                      {/* Edit Role */}
                                      <li
                                        className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
                                        onClick={() => handleEditRole(index)}
                                      >
                                        <div className="flex">
                                          <span>Edit</span>
                                        </div>
                                      </li>

                                      {/* Delete Role */}
                                      <li
                                        className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer text-red-500"
                                        onClick={() => handleDeleteRole(index)}
                                      >
                                        <div className="flex">
                                          <span>Delete</span>
                                        </div>
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Add Role Button */}
                  {isManager(selectedTeam) && (
                    <div className="mt-4">
                      <button
                        className="btn btn-outline"
                        onClick={() => handleOpenModal(true)}
                      >
                        Add Role
                      </button>
                      <AddRoleModal />
                    </div>
                  )}
                </div>


              </div>


            </div>
          )}
        </div>
      ) : (
        <div>
          <p>No teams found. Consider joining a team.</p>
        </div>
      )}
    </div>
  );
}

export default TeamManagement;
