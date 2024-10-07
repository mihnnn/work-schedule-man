import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './table.css';
import AddRoleModal from './AddRoleModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function TeamManagement() {
  const { currentUser } = useSelector((state) => state.user);

  const [teamMembership, setTeamMembership] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  const [editingRoleIndex, setEditingRoleIndex] = useState(null);
  const [editedRoleName, setEditedRoleName] = useState("");

  const [memberDropdownOpen, setMemberDropdownOpen] = useState(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(null);
  const [roleSubMenuOpen, setRoleSubMenuOpen] = useState(null);
  const dropdownRef = useRef(null);
  const availableRoles = teamInfo?.roles || [];

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

  const handleEditRole = (index) => {
    setEditingRoleIndex(index);
    console.log('Editing role: ', teamInfo.roles[index].name);
    setEditedRoleName(teamInfo.roles[index].name);
    handleOptionClick();
  };


  const handleSaveRole = async (index) => {
    const updatedRoles = [...teamInfo.roles];

    updatedRoles[index].name = editedRoleName;

    try {
      const requestBody = {
        roles: updatedRoles,
        // teamName: teamInfo.name if updating
      };

      const res = await fetch(`/api/teams/${teamInfo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error('Failed to update team');
      }

      const data = await res.json();
      console.log(data.message); // Handle success message if needed

      setEditingRoleIndex(null);
    } catch (error) {
      console.error("Error updating role:", error);
      // Handle error state, show error message to the user
    }
  };

  const getRoleNameById = (roleId) => {
    const role = availableRoles.find(role => role._id === roleId);
    return role ? role.name : '';
  };

  const handleOptionClick = () => {
    setMemberDropdownOpen(null);
    setRoleDropdownOpen(null);
  }

  const handleAssignRole = async (userId, roleId) => {
    try {
      const response = await fetch(`/api/teams/${teamInfo.id}/assign-role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, roleId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign role');
      }

      const data = await response.json();
      console.log(data.message);


    } catch (error) {
      console.error("Error assigning role:", error);
      // Handle error, show error message to the user
    }
  };


  // router.delete("/:id/roles/:roleId", verifyToken, deleteRole); 
  const handleDeleteRole = async (index) => {
    const roleId = teamInfo.roles[index]._id;
    try {
      const res = await fetch(`/api/teams/${teamInfo.id}/roles/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser._id,
        })
      });

      if (!res.ok) {
        throw new Error('Failed to delete role');
      }

      const data = await res.json();
      console.log('Role deleted: ', data);

      toast.success('Role deleted successfully');
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error('Failed to delete role');
    }
  };

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
                        console.log('member', member),
                        <tr key={index} className='text-gray-300 relative'>
                          <td className='px-4 py-2 border'>{index + 1}</td>
                          <td className='px-4 py-2 border'>
                            {member.name}
                            {member.id === currentUser._id && ' (you)'}
                          </td>
                          <td className='px-4 py-2 border'>{member.email}</td>
                          <td className='px-4 py-2 border'>{getRoleNameById(member.role)}</td>
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
                              {/* dropdown menu */}
                              {memberDropdownOpen === index && (
                                <div
                                  ref={dropdownRef}
                                  className='absolute right-0 w-48 bg-gray-900 border-gray-500 rounded-md shadow-lg z-50'
                                >
                                  <ul>
                                    {/* Assign Role Options */}
                                    <li
                                      className='px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer relative'
                                      onMouseEnter={() => handleRoleSubMenuToggle(index)}
                                      onMouseLeave={() => setRoleSubMenuOpen(null)}
                                    >
                                      <div className='flex'>
                                        <span>Assign Role</span>
                                        <IoIosArrowForward className='ml-[55px] my-auto' />
                                      </div>
                                      {roleSubMenuOpen === index && (
                                        <ul className='absolute left-full top-0 mt-0 w-48 bg-gray-900 rounded-lg shadow-lg z-50'>
                                          {availableRoles.length > 0 ? (
                                            availableRoles.map((role, i) => (
                                              <li
                                                key={i}
                                                className='px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer min-w-[80px]'
                                                onClick={() => {
                                                  handleAssignRole(member.id.toString(), role._id);
                                                  handleOptionClick();
                                                }}
                                              >
                                                <div className='flex'>
                                                  {role.name}
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

                                          <li
                                            className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer text-red-500"
                                            onClick={() => {
                                              handleAssignRole(member.id.toString(), null);
                                              handleOptionClick();
                                            }}
                                          >
                                            <div className='flex'>
                                              <span>
                                                Remove Role
                                              </span>
                                            </div>
                                          </li>
                                        </ul>
                                      )}
                                    </li>
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
                      {teamInfo.roles.map((role, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border">{index + 1}</td>
                          <td className="px-4 py-2 border">
                            {editingRoleIndex === index ? (
                              <input
                                type="text"
                                value={editedRoleName}
                                onChange={(e) => setEditedRoleName(e.target.value)}
                                onBlur={() => handleSaveRole(index)}
                                className="border rounded p-1 w-full"
                              />
                            ) : (
                              role.name
                            )}
                          </td>
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
                                    <li
                                      className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
                                      onClick={() => handleEditRole(index)}
                                    >
                                      <div className="flex">
                                        <span>Edit</span>
                                      </div>
                                    </li>
                                    <li
                                      className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer text-red-500"
                                      onClick={() => { handleDeleteRole(index); handleOptionClick(); }}
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
                      ))}

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
                      <AddRoleModal currentTeam={teamInfo} currentUser={currentUser} />
                    </div>
                  )}
                </div>
                {/* end of role table */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>No teams found. Consider joining or creating a team.</p>
        </div>
      )}
    </div>
  );
}

export default TeamManagement;
