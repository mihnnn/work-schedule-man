import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddRoleModal({ currentTeam, currentUser }) {
  const [userId, setUserId] = useState(null);
  const [teamId, setTeamId] = useState(null);


  useEffect(() => {
    if (currentTeam && currentUser) {
      setUserId(currentUser._id);
      setTeamId(currentTeam.id);
    }
  })

  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState('');

  const handleContinueButtonClick = async () => {
    const handleAddRole = async () => {
      try {
        const res = await fetch(`/api/teams/${teamId}/roles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId,
            roleName: roleName
          })
        })

        if (!res.ok) {
          throw new Error('Failed to create role');
        }

        const data = await res.json();
        console.log('Role created: ', data);
        toast.success(`Role ${data.role.name} created successfully. Please refresh the page.`);
        navigate(`/app/team-management`);

      } catch (error) {
        toast.error('Failed to create role');
      }
    }
    handleAddRole();
    console.log('Creating new role: ', roleName);
  }

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <dialog id='my_modal_2' className='modal text-white' ref={modalRef} onClick={handleCloseModal}>
      <div className='modal-box overflow-hidden border-none'>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Add a new role</h3>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="Role name, e.g: Cashier, Chef, Waiter,..."
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required={true}
            />
          </div>

          <form method="dialog">
            <div className="mt-5 flex flex-row-reverse gap-2">
              <button
                className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
                onClick={() => { modalRef.current.close(); handleContinueButtonClick(); }}
              >
                Continue
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => modalRef.current.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddRoleModal
