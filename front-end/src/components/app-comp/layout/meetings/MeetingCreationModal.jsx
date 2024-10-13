import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function MeetingCreationModal({ teamInfo }) {
  const modalRef = useRef(null);
  // console.log("teamInfo: ", teamInfo);
  const { currentUser } = useSelector((state) => state.user);
  // console.log('currentUser: ', currentUser);

  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingStartTime, setMeetingStartTime] = useState('');
  const [meetingEndTime, setMeetingEndTime] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const initialParticipants = teamInfo.map(employee => ({
      id: employee.id,
      name: employee.name,
      role: employee.role,
      isParticipant: false,
    }));
    setParticipants(initialParticipants);
  }, [teamInfo]);

  const handleSaveButtonClick = async () => {
    if (teamInfo) {
      const meetingData = {
        meetingTitle,
        meetingDescription,
        meetingDate,
        time: {
          start: meetingStartTime,
          end: meetingEndTime
        },
        host: currentUser?._id,
        participants: participants
          .filter(participant => participant.isParticipant)
          .map(participant => ({
            user: participant.id,
            name: participant.name,
            role: participant.role,
          })),
        team: currentUser?.teamMemberships[0].team,
      };

      // Send the POST request to the backend
      try {
        const response = await fetch('/api/meetings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meetingData),
        });

        if (!response.ok) {
          throw new Error('Failed to create meeting: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Meeting created successfully:', result);

        // Clear form fields after successful creation
        setMeetingTitle('');
        setMeetingDescription('');
        setMeetingStartTime('');
        setMeetingEndTime('');
        setMeetingDate('');
        setParticipants(teamInfo.map(employee => ({
          id: employee.id,
          name: employee.name,
          role: employee.role,
          isParticipant: false,
        })));

        modalRef.current.close(); // Close the modal

      } catch (error) {
        console.error('Error creating meeting:', error);
      }
    }
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
                onClick={handleSaveButtonClick}
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
