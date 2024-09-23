import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './table.css';
import AddRoleModal from './AddRoleModal';

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRole, setNewRole] = useState('');

  const currentUser = { name: 'Alice' };
  const navigate = useNavigate();

  const [memberDropdownOpen, setMemberDropdownOpen] = useState(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(null);
  const [roleSubMenuOpen, setRoleSubMenuOpen] = useState(null);
  const dropdownRef = useRef(null);

  const availableRoles = selectedTeam?.roles || [];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockTeams = [
          {
            id: '1',
            name: 'Team Alpha',
            members: [
              { name: 'Alice', role: 'Manager', email: 'alice@example.com' },
              { name: 'Bob', role: 'Employee', email: 'bob@example.com' },
            ],
            roles: ['Manager', 'Employee'],
            code: 'ALPHA123',
          },
          {
            id: '2',
            name: 'Team Beta',
            members: [
              { name: 'Charlie', role: 'Manager', email: 'charlie@example.com' },
              { name: 'David', role: 'Employee', email: 'david@example.com' },
            ],
            roles: ['Manager', 'Employee'],
            code: 'BETA123',
          },
        ];

        setTeams(mockTeams);
      } catch (err) {
        setError('Failed to fetch teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
  };

  const handleAddRole = () => {
    if (newRole.trim() === '') {
      alert('Role name cannot be empty');
      return;
    }
    console.log(`New role added: ${newRole}`);
    setNewRole('');
  };

  const handleOpenModal = () => {
    document.querySelector('#my_modal_3').showModal();
  }

  const handleDeleteMember = (memberName) => {
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeam.id
        ? {
          ...team,
          members: team.members.filter((member) => member.name !== memberName),
        }
        : team
    );
    setTeams(updatedTeams);
  };

  const isManager = (team) =>
    team.members.some(
      (member) => member.name === currentUser.name && member.role === 'Manager'
    );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMemberDropdownOpen(null);
        setRoleDropdownOpen(null);
        setRoleSubMenuOpen(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p>{error}</p>;

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
      <main>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-emphasis">
            {selectedTeam ? `Your Team > ${selectedTeam.name}` : 'Your Team'}
          </h3>
          <div className="">
            {teams.length === 0 ? (
              <p>No teams found.</p>
            ) : (
              <div className="border border-gray-500 rounded-md p-5 w-full animate-grow flex flex-row gap-x-2">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    className={`btn btn-ghost p-4 m-auto border border-gray-600 rounded-md ${selectedTeam && selectedTeam.id === team.id
                      ? 'bg-gray-400 bg-opacity-30'
                      : ''
                      }`}
                    onClick={() => handleSelectTeam(team)}
                  >
                    {team.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Management Section */}
        {selectedTeam && (
          <div className="border border-gray-500 rounded-md p-5 w-full space-y-4">
            {/* Team Name, Edit Button, and Code */}
            <div className="flex justify-between items-center">
              <h3 className="flex w-full justify-between text-xl font-semibold text-emphasis ">
                <span>{selectedTeam.name}</span>
                {isManager(selectedTeam) && (
                  <button className="ml-2 text-blue-500">
                    <FaEdit size={20} />
                  </button>
                )}
                <span className="ml-auto text-right">{selectedTeam.code}</span>
              </h3>
            </div>

            <div className="flex w-full gap-x-10 justify-between ">
              {/* Employees Table */}
              <div className="flex-grow">
                <h4 className="text-lg font-semibold mb-2 text-emphasis ">
                  Employees
                </h4>
                <table className="table-auto w-full border-separate ">
                  <thead>
                    <tr className="text-emphasis font-bold">
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Role</th>
                      <th className="px-4 py-2 border">Manager</th>
                      {isManager(selectedTeam) && (
                        <th className="px-4 py-2 border">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeam.members.map((member, index) => (
                      <tr key={member.name} className="text-gray-300 relative">
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{member.name}</td>
                        <td className="px-4 py-2 border">{member.email}</td>
                        <td className="px-4 py-2 border">{member.role}</td>
                        <td className="px-4 py-2 border text-center">
                          {member.role === 'Manager' ? 'x' : ''}
                        </td>
                        {/* Action Dropdown */}
                        {isManager(selectedTeam) && (
                          <td className="px-4 py-2 border text-center relative">
                            <button
                              className="p-2 hover:bg-gray-200 hover:opacity-30 hover:text-gray-700 rounded-full"
                              onClick={() => handleMemberDropdownToggle(index)}
                            >
                              <FaEllipsisV />
                            </button>

                            {/* Dropdown Menu */}
                            {memberDropdownOpen === index && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-0 w-48 bg-gray-900 border border-gray-500 rounded-md shadow-lg z-50"
                              >
                                <ul className="">
                                  {/* Assign Role with submenu */}
                                  <li
                                    className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer relative"
                                    onMouseEnter={() => handleRoleSubMenuToggle(index)}
                                    onMouseLeave={() => setRoleSubMenuOpen(null)}
                                  >
                                    <div className='flex'>
                                      <span> Assign Role</span>
                                      <IoIosArrowForward className="ml-[55px] my-auto" />

                                    </div>
                                    {/* Submenu for Assign Role */}
                                    {roleSubMenuOpen === index && (
                                      <ul className="absolute left-full top-0 mt-0 w-48 bg-gray-900 rounded-lg shadow-lg z-50">
                                        {availableRoles.length > 0 ? (
                                          availableRoles.map((role, idx) => (
                                            <li
                                              key={idx}
                                              className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer min-w-[80px]"
                                              onClick={handleOptionClick}
                                            >
                                              <div className='flex'>
                                                {role}

                                              </div>
                                            </li>
                                          ))
                                        ) : (
                                          <li className="px-4 py-2 text-gray-400 cursor-default">
                                            No roles
                                          </li>
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

              {/* Roles Table */}
              <div className="flex-grow">
                <h4 className="text-lg font-semibold mb-2 text-emphasis">Roles</h4>
                <table className="table-auto w-full border-separate">
                  <thead>
                    <tr className='text-emphasis font-bold'>
                      <th className="px-4 py-2 border">#</th>
                      <th className="px-4 py-2 border">Role Name</th>
                      {isManager(selectedTeam) && (
                        <th className="px-4 py-2 border">Action</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeam.roles.map((role, index) => (
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
                                <ul className="">
                                  {/* Edit Role */}
                                  <li
                                    className="px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
                                    onClick={handleOptionClick}
                                  >
                                    <div className='flex'>
                                      <span>
                                        Edit
                                      </span>
                                    </div>
                                  </li>

                                  {/* Delete Role */}
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
                {/* Add Role Button */}
                {isManager(selectedTeam) && (
                  <div className="mt-4">
                    {/* Button to show the modal */}
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
      </main>
    </div>
  );
}

export default TeamManagement;
