import { set } from 'mongoose';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

function MeetingUpdateModal({ meeting, members, onModalClose, onModalOpen }) {


	const [meetingTitle, setMeetingTitle] = useState('');
	const [meetingDescription, setMeetingDescription] = useState('');
	const [meetingStartTime, setMeetingStartTime] = useState('');
	const [meetingEndTime, setMeetingEndTime] = useState('');
	const [meetingDate, setMeetingDate] = useState('');
	const [participants, setParticipants] = useState([]);

	const modalRef = useRef(null);


	console.log('meeting: ', meeting);
	//meeting object field:
	/*
	{
		_id: '615f7b3b7b3b3b3b3b3b3b3b',
		meetingTitle: 'Meeting 1',
		meetingDescription: 'Meeting 1 description',
		meetingDate: '2022-10-07',
		time: { start: '09:00', end: '10:00' },
		host: '615f7b3b7b3b3b3b3b3b3b3b',
		participants: [],
		team,
		state,

	}
	*/
	// console.log('members: ', members);




	const formatDateForInput = (isoDateString) => {
		const date = new Date(isoDateString);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	};

	useEffect(() => {
		if (meeting) {
			onModalOpen(meeting);

			setMeetingTitle(meeting.meetingTitle || '');
			setMeetingDescription(meeting.meetingDescription || '');
			setMeetingDate(formatDateForInput(meeting.meetingDate));
			setMeetingStartTime(meeting.time?.start || '');
			setMeetingEndTime(meeting.time?.end || '');
			const initialParticipants = members.map((employee) => {
				const isParticipant = meeting.participants?.some((participant) => {
					// console.log('Comparing:', participant.user._id, employee.id);
					return participant.user._id === employee.id;
				});

				return {
					id: employee.id,
					name: employee.name,
					role: employee.role,
					isParticipant: isParticipant || false,
				};
			});
			setParticipants(initialParticipants);
			console.log('initialParticipants: ', initialParticipants);
		}
	}, [meeting, members, onModalOpen, onModalClose])

	const handleCloseModal = (e) => {
		if (e.target === modalRef.current) {
			setMeetingTitle('');
			setMeetingDescription('');
			setMeetingStartTime('');
			setMeetingEndTime('');
			setMeetingDate('');
			setParticipants([]);
			meeting = null;
			modalRef.current.close();
			onModalClose();
		}
	}

	const handleCheckboxChange = (id) => {
		setParticipants((prev) =>
			prev.map((participant) =>
				participant.id === id ? { ...participant, isParticipant: !participant.isParticipant } : participant
			)
		);
	};

	const handleSaveButtonClick = async () => {
		const updatedMeeting = {
			meetingTitle,
			meetingDescription,
			meetingDate,
			time: { start: meetingStartTime, end: meetingEndTime },
			participants: participants.filter(participant => participant.isParticipant),
		};

		console.log('posting to backend: ', updatedMeeting);
		try {
			const res = await fetch(`/api/meetings/${meeting._id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedMeeting),	
			});

			if (!res.ok) {
				throw new Error('Failed to update meeting');
			}

			const updatedMeetingData = await res.json();
			console.log('Meeting updated successfully:', updatedMeetingData);
			toast.success(`${updatedMeetingData.meetingTitle} updated successfully`);
		} catch (error) {
			console.error('Error updating meeting:', error);
			toast.error('Failed to update meeting');
		}
	};

	return (
		<dialog id='edit_modal' className='modal text-white' ref={modalRef} onClick={handleCloseModal}>
			<div className='modal-box overflow-hidden border-none'>
				<div className="flex flex-col">
					<h3 className="text-lg font-semibold">Edit Meeting</h3>
				</div>

				<div className="flex flex-col mt-4 gap-2">
					<div>
						<label className="block text-sm">Title</label>
						<input
							type="text"
							className="input input-bordered w-full mt-2"
							value={meetingTitle}
							onChange={(e) => setMeetingTitle(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className="block text-sm">Description</label>
						<textarea
							className="textarea textarea-bordered w-full mt-2"
							value={meetingDescription}
							onChange={(e) => setMeetingDescription(e.target.value)}
							required
						/>
					</div>

					<div>
						<label className='block text-sm'>Time</label>
						<div className='flex items-center mt-2 gap-x-3'>
							<div className='flex items-center'>
								<input
									type='time'
									className='input input-bordered'
									value={meetingStartTime}
									onChange={(e) => setMeetingStartTime(e.target.value)}
								/>
							</div>
							<span>-</span>
							<div className='flex items-center'>
								<input
									type='time'
									className='input input-bordered'
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
										checked={participant?.isParticipant || false}
										onChange={() => handleCheckboxChange(participant.id)}
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
								onClick={() => { handleSaveButtonClick(); modalRef.current.close(); onModalClose(); }}
							>
								Save Changes
							</button>
							<button
								className="btn btn-ghost"
								onClick={() => { modalRef.current.close(); onModalClose(); }}
							>
								Close
							</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
}

export default MeetingUpdateModal;
