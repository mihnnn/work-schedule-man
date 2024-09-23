import React, { useEffect, useRef, useState } from 'react';

function MeetingCreationModal({ employees }) {
  const modalRef = useRef(null);

  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [participants, setParticipants] = useState([]);

  // Initialize participants whenever employees change or modal opens
  useEffect(() => {
    const initialParticipants = employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      role: employee.role,
      isParticipant: false,
    }));
    setParticipants(initialParticipants);
  }, [employees]); // Run effect whenever employees change

  const handleSaveButtonClick = async () => {
    console.log('creating meeting: ', {
      meetingTitle,
      meetingDescription,
      meetingStartTime,
      meetingEndTime,
      meetingDate,
      participants: participants.filter(participant => participant.isParticipant).map(participant => ({
        id: participant.id,
        name: participant.name,
        role: participant.role,
      })),
    });

    // Clear form fields and participants
    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingStartTime('');
    setMeetingEndTime('');
    setMeetingDate('');
    setParticipants(employees.map(employee => ({
      id: employee.id,
      name: employee.name,
      role: employee.role,
      isParticipant: false,
    }))); // Reset participants
  };

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) {
      setMeetingTitle('');
      setMeetingDescription('');
      setMeetingStartTime('');
      setMeetingEndTime('');
      setMeetingDate('');
      setParticipants(participants.map(participant => ({ ...participant, isParticipant: false })));

      modalRef.current.close();
    }
  };

  const toggleParticipant = (id) => {
    setParticipants(participants.map(participant =>
      participant.id === id ? { ...participant, isParticipant: !participant.isParticipant } : participant
    ));
  };

  return (
    <dialog id='my_modal_3' className='modal text-white' ref={modalRef} onClick={handleCloseModal}>
      <div className='modal-box overflow-hidden border-none'>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">New Meeting</h3>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="e.g. Project Kickoff Meeting"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <textarea
              type="text"
              className="textarea textarea-bordered w-full mt-2"
              placeholder="About this meeting"
              value={meetingDescription}
              onChange={(e) => setMeetingDescription(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label className='block text-sm'>Time</label>
            <div className='flex items-center mt-2 gap-x-3'>
              <div className='flex items-center'>
                <input
                  type='time'
                  className='input input-bordered'
                  min="07:00"
                  max="18:00"
                  value={meetingStartTime}
                  onChange={(e) => setMeetingStartTime(e.target.value)}
                />
              </div>
              <span className=''>-</span>
              <div className='flex items-center'>
                <input
                  type='time'
                  className='input input-bordered'
                  min="07:00"
                  max="18:00"
                  value={meetingEndTime}
                  onChange={(e) => setMeetingEndTime(e.target.value)}
                />
              </div>

              <div className='flex items-center'>
                <input
                  type='date'
                  className='input input-bordered'
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                />
              </div>
            </div>

            <div className='flex flex-col mt-2'>
              <label className='block text-sm'>Participants</label>
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className='checkbox checkbox-bordered'
                    checked={participant.isParticipant}
                    onChange={() => toggleParticipant(participant.id)}
                  />
                  <span className='ml-2'>{participant.name} - {participant.role}</span>
                </div>
              ))}
            </div>
          </div>

          <form method="dialog">
            <div className="mt-5 flex flex-row-reverse gap-2">
              <button
                className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
                onClick={() => { modalRef.current.close(); handleSaveButtonClick(); }}
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

export default MeetingCreationModal;
