import React, { useRef } from 'react'

function CreateAvailabilityModal() {

  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) {
      modalRef.current.close();
    }
  }

  const handleContinueButtonClick = async () => {
    // const newEvent = await createEvent({ title, suffix, description, duration });
    // modalRef.current.close();
    // onNewEventAdded(newEvent._id);
  };
  

  return (
    <dialog id='my_modal_3' className='modal text-white' ref={modalRef} onClick={{handleCloseModal}}>
      <div className='modal-box overflow-hidden border-none'>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Add a new schedule</h3>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <div>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="Working hours"
              
              onChange={(e) => setTitle(e.target.value)}
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
            <button className="btn btn-ghost" onClick={() => { modalRef.current.close();}}>Close</button>
          </div>
        </form>



          


        </div>
      </div>
    </dialog>
  )
}

export default CreateAvailabilityModal
