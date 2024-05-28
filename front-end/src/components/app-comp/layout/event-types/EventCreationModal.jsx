// EventCreationModal.jsx
import React from 'react';
import { useAuthContext } from '../../../../context/AuthContext';

function EventCreationModal() {
    const { authUser } = useAuthContext();
  return (
    <dialog id="my_modal_3" className="modal">
        <div className="modal-box overflow-hidden border-none">
            <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div className="">
                <h3 className="text-lg font-semibold">Add a new event type</h3>
                <p>Create a new event type for people to book times with</p>
                <div className="mt-4">
                    <div>
                        <label className="block text-sm">Title</label>
                        <input type="text" className="input input-bordered w-full" placeholder="Quick chat" />
                    </div>

                    <div>
                        <label className='block text-sm'>URL</label>
                        <div className='flex overflow-hidden rounded-lg input input-bordered items-center'>
                            <span className="text-gray-400 bg-gray-700 m-auto rounded">https://wsm.com/</span>
                            {/* Actual input field */}
                            <input type="text" className="flex-1 py-1 px-2 focus:outline-none" placeholder="quick-chat" />
                        </div>
                    </div>



                    <div>
                        <label className="block text-sm mt-4"></label>
                        <textarea className="textarea textarea-bordered w-full" placeholder="Event Description"></textarea>

                    </div>



                </div>    
            </div>
        </div>
    </dialog>
  );
}

export default EventCreationModal;
