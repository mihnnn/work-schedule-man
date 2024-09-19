import React, { useEffect, useState, useRef } from 'react';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './table.css';

function TeamManagement() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRole, setNewRole] = useState('');
  const currentUser = { name: 'Alice' }; // Simulating the current logged-in user for manager check
  const navigate = useNavigate(); // React Router navigate for updating URL

  const [dropdownOpen, setDropdownOpen] = useState(null); // For managing dropdown open state
  const [roleSubMenuOpen, setRoleSubMenuOpen] = useState(null); // For managing role submenu state
  const dropdownRef = useRef(null); // Ref for detecting click outside

  const availableRoles = selectedTeam?.roles || []; // Fix for conditional role access

  // Fetch teams
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
    navigate(`/app/team-management?currentTeam=${team.id}`);
  };

  const handleAddRole = () => {
    if (newRole && selectedTeam) {
      const updatedTeams = teams.map((team) =>
        team.id === selectedTeam.id
          ? { ...team, roles: [...team.roles, newRole] }
          : team
      );
      setTeams(updatedTeams);
      setNewRole('');
    }
  };

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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null); // Close dropdown if click is outside
        setRoleSubMenuOpen(null); // Also close submenus
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index); // Toggle dropdown per row
    setRoleSubMenuOpen(null); // Close submenus if dropdown is closed/opened
  };

  const handleRoleSubMenuToggle = (index) => {
    setRoleSubMenuOpen(roleSubMenuOpen === index ? null : index); // Toggle role submenu per row
  };

  const handleOptionClick = () => {
    setDropdownOpen(null); // Close the dropdown after selecting an option
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
                      <th className="px-4 py-2 border">Action</th>
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
                        <td className="px-4 py-2 border text-center relative">
                          <button
                            className="p-2 hover:bg-gray-200 rounded-full"
                            onClick={() => handleDropdownToggle(index)}
                          >
                            <FaEllipsisV />
                          </button>

                          {/* Dropdown Menu */}
                          {dropdownOpen === index && (
                            <div
                              ref={dropdownRef} // Reference for click detection
                              className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                            >
                              <ul className="py-2">
                                {/* Assign Role with submenu */}
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer relative"
                                  onMouseEnter={() => handleRoleSubMenuToggle(index)}
                                  onMouseLeave={() => setRoleSubMenuOpen(null)}
                                >
                                  Assign Role
                                  {/* Submenu for Assign Role */}
                                  {roleSubMenuOpen === index && (
                                    <ul className="absolute left-full top-0 mt-0 w-48 bg-white border rounded-lg shadow-lg z-50">
                                      {availableRoles.length > 0 ? (
                                        availableRoles.map((role, idx) => (
                                          <li
                                            key={idx}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleOptionClick} // Close dropdown on click
                                          >
                                            {role}
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
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={handleOptionClick} // Close dropdown on click
                                >
                                  Promote to Manager
                                </li>

                                {/* Delete Member (in red text) */}
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                  onClick={handleOptionClick} // Close dropdown on click
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeam.roles.map((role, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{index + 1}</td>
                        <td className="px-4 py-2 border">{role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Add Role Button */}
                {isManager(selectedTeam) && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="New role"
                      className="p-2 border rounded-md"
                    />
                    <button
                      className="ml-2 p-2 bg-blue-500 text-white rounded"
                      onClick={handleAddRole}
                    >
                      Add Role
                    </button>
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
