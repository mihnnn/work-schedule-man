import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRoleModal() {

  const modalRef = useRef(null);
  const navigate = useNavigate();

  const [roleName, setRoleName ] = useState('');

  const handleContinueButtonClick = async () => {
    console.log('Creating new role: ', roleName);
    // try {
    //   const newAvail = await createAvail({ title });
    //   modalRef.current.close();
    //   if (newAvail && newAvail.availability._id && newAvail.availability._id) {
    //     navigate(`/app/availability/${newAvail.availability._id}`);
    //   } else {
    //     console.error('Fail to create new role ', newAvail);
    //   } 
    // } catch (error){
    //   console.error('Failed to create availability: ', error);
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
