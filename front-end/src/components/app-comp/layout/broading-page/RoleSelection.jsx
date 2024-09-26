import React, { useState, useEffect } from 'react';
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { updateTeamMemberships, updateUserInfo, updateUserRole } from '../../../../store/user/userSlice';
import toast from 'react-hot-toast';

function RoleSelection({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [selectedRole, setSelectedRole] = useState('');
  const [activeManagerOption, setActiveManagerOption] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [joinedTeam, setJoinedTeam] = useState(null);

  useEffect(() => {
    if (currentUser && (currentUser.role === 'Manager' || currentUser.role === 'Employee')) {
      setSelectedRole(currentUser.role);
    } else {
      setSelectedRole(null);
    }
  }, [currentUser]);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setActiveManagerOption('');
    dispatch(updateUserRole(role));

    if (role === 'Manager' && activeManagerOption === 'create') {
      handleCreateTeam();
    }
  };
  const handleCreateTeam = async () => {
    if (!teamName) {
      toast.error("Team name is required");
      return;
    }
    try {
      const res = await fetch('/api/teams/create-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName,
          userId: currentUser._id
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error creating team:', errorData.message);
        return;
      }

      const data = await res.json();
      dispatch(updateTeamMemberships(data.team));
      console.log('Team created successfully:', data);
      toast.success(`Team ${data.team.name} created successfully!`);
      nextStep();
    } catch (error) {
      console.error('Error in handleCreateTeam RoleSelection:', error);
    }
  };

  const handleShowTeamInfo = async () => {
    if (!teamCode) {
      toast.error('Please enter a valid team code');
      return;
    }

    try {
      const res = await fetch('/api/teams/join-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode,
          userId: currentUser._id,
          action: 'show',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error fetching team info:', errorData.message);
        toast.error(errorData.message);
        return;
      }

      const data = await res.json();
      if (data.teamInfo) {
        setJoinedTeam(data.teamInfo);
      }
      toast.success(`You found ${data.teamInfo.teamName}!`);

    } catch (error) {
      console.error('Error in handleShowTeamInfo:', error);
      toast.error('Error fetching team info');
    }
  };

  const handleJoinTeam = async () => {
    try {
      const res = await fetch('/api/teams/join-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamCode,
          userId: currentUser._id,
          action: 'join',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error joining team:', errorData.message);
        return;
      }

      const data = await res.json();
      dispatch(updateTeamMemberships(data.team));
      console.log('Team joined successfully:', data);
      toast.success(`You joined ${data.team.name} successfully!`);

    } catch (error) {
      toast.error('Error in handleJoinTeam RoleSelection:', error);
    }
  }

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleTeamCodeChange = (e) => {
    setTeamCode(e.target.value);
  };

  const handleNextClick = async () => {
    try {
      const res = await fetch(`/api/users/user/${currentUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: currentUser.displayName,
          email: currentUser.email,
          role: currentUser.role,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error updating user role:', errorData.message);
        return;
      }

      const data = await res.json();
      console.log('User role updated successfully:', data);
      toast.success('User role updated successfully!');
      nextStep();
    } catch (error) {
      console.error('Error in handleNextClick RoleSelection:', error);
      toast.error('Error updating user role');
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
      <div className="form-control mb-6">
        <select
          className="select select-bordered"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">{`<Choose a role>`}</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      {selectedRole === 'Manager' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Would you like to:</h3>
          <div className="mt-4 flex justify-between gap-x-1">
            <button
              className="btn w-[48%]"
              onClick={() => setActiveManagerOption('create')}
            >
              Create Your Team
            </button>
            <button
              className="btn w-[48%]"
              onClick={() => setActiveManagerOption('join')}
            >
              Join a Team
            </button>
          </div>

          {activeManagerOption === 'create' && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Team Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={teamName}
                onChange={handleTeamNameChange}
                placeholder="Enter your team name"
              />
              <button className="btn w-full mt-4" onClick={handleCreateTeam}>Create Team</button>
            </div>
          )}

          {activeManagerOption === 'join' && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Team Code</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={teamCode}
                onChange={handleTeamCodeChange}
                placeholder="Enter your team's code"
              />
              {!joinedTeam ? (
                <button className="btn w-full mt-4" onClick={handleShowTeamInfo}>Join Team</button>
              ) : (
                <div className="flex justify-between mt-6 p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">{`Team: ${joinedTeam.teamName}`}</h3>
                    <p className='flex gap-x-1'>
                      <IoPerson className='h-5 w-5' />
                      {`Members: ${joinedTeam.memberCount}`}
                    </p>

                  </div>
                  <button className="btn px-6 my-auto" onClick={handleJoinTeam}>Join</button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {selectedRole === 'Employee' && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Join a Team</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Team Code</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={teamCode}
              onChange={handleTeamCodeChange}
              placeholder="Enter your team's code"
              disabled={joinedTeam}
            />
          </div>
          {/* If !joinedTeam then show button */}


          {!joinedTeam ? (
            <button className="btn w-full mt-4" onClick={handleShowTeamInfo}>Join Team</button>
          ) : (
            <div className="flex justify-between mt-6 p-4 bg-gray-700 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">{`Team: ${joinedTeam.teamName}`}</h3>
                <p className='flex gap-x-1'>
                  <IoPerson className='h-5 w-5' />
                  {`Members: ${joinedTeam.memberCount}`}
                </p>

              </div>
              <button className="btn px-6 my-auto" onClick={handleJoinTeam}>Join</button>
            </div>
          )}

        </div>
      )}

      <div className="flex justify-between mt-8">
        <button className="btn" onClick={previousStep}>Back</button>
        <div className="flex gap-x-2">
          <button className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200" disabled={!selectedRole} onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
