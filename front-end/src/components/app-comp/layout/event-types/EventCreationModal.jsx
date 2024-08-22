import React, { useEffect, useRef, useState } from 'react';
// import { useAuthContext } from '../../../../context/AuthContext';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useCreateEvent from '../../../../hooks/event-hooks/useCreateEvent';

function EventCreationModal({ onNewEventAdded }) {
  // const { authUser: { username } } = useAuthContext();
  const { currentUser: {username} } = useSelector((state) => state.user);
  const { createEvent, loading } = useCreateEvent();
  
  const modalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [suffix, setSuffix] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(15);

  const formatSuffix = (input) => {
    return input.toLowerCase().replace(/\s+/g, '-');
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('dialog') === 'new' && params.get('eventPage') === username) {
      modalRef.current.showModal();
    }
  }, [location.search, username]);

  useEffect(() => {
    setSuffix(formatSuffix(title));
  }, [title]);

  const handleContinueButtonClick = async () => {
    const formattedSuffix = formatSuffix(suffix);
    const newEvent = await createEvent({ title, suffix: formattedSuffix, description, duration });
    modalRef.current.close();
    onNewEventAdded(newEvent._id);
  };

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) {
      modalRef.current.close();
      navigate('/app/event-types');
    }
  };

  return (
    <dialog id="my_modal_3" className="modal text-white" ref={modalRef} onClick={handleCloseModal}>
      <div className="modal-box overflow-hidden border-none">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">Add a new event type</h3>
          <p>Create a new event type for people to book times with</p>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="Quick chat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label className="block text-sm">URL</label>
            <div className="flex overflow-hidden rounded-lg input input-bordered items-center mt-1">
              <span className="text-gray-400 bg-gray-700 m-auto rounded px-1">{`https://wsm.com/${username}/`}</span>
              <input
                type="text"
                className="flex-1 py-1 px-2 focus:outline-none"
                placeholder="quick-chat"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                required={true}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mt-4">Event Description</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="">
            <label className="block text-sm">Duration</label>
            <div className="flex overflow-hidden rounded-lg input input-bordered items-center mt-1">
              <input
                type="number"
                className="w-full"
                placeholder='15'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <span className="text-gray-400 bg-gray-700 m-auto rounded px-1">minutes</span>
            </div>
          </div>
        </div>

        <form method="dialog">
          <div className="mt-5 flex flex-row-reverse gap-2">
            <button
              className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
              onClick={async () => { 
                modalRef.current.close(); 
                navigate('/app/event-types'); 
                await handleContinueButtonClick(); 
              }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Continue'}
            </button>
            <button className="btn btn-ghost" onClick={() => { modalRef.current.close(); navigate('/app/event-types'); }}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default EventCreationModal;
