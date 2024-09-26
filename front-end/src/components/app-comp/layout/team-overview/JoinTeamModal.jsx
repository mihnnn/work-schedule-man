import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoPerson } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { updateTeamMemberships } from '../../../../store/user/userSlice';

function JoinTeamModal() {
	const modalRef = useRef(null);

	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);

	const [teamCode, setTeamCode] = useState('');
	const [teamInfo, setTeamInfo] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

	const clearState = () => {
		setTeamCode('');
		setTeamInfo(null);
	}
	// Fetch team info using team code
	const handleShowTeam = async () => {
		setIsFetching(true);

		try {
			const res = await fetch('/api/teams/join-team', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					teamCode,
					userId: currentUser._id,
					action: 'show'
				}),
			});
			const result = await res.json();

			if (res.ok) {
				setTeamInfo(result.teamInfo);
			} else {
				toast.error(result.message || 'Team not found');
			}
		} catch (err) {
			toast.error('Error fetching team');
		}

		setIsFetching(false);
	};

	const handleJoinTeam = async () => {
		try {
			const res = await fetch('/api/teams/join-team', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					teamCode,
					userId: currentUser._id,
					action: 'join'
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				toast.error(errorData.message);
				return;
			}

			const data = await res.json();
			console.log(data);
			dispatch(updateTeamMemberships(data.team));
			toast.success(`Successfully joined team: ${data.team.name}`);

		} catch (err) {
			toast.error('Error joining team');
		}
	};

	const handleCloseModal = (e) => {
		if (e.target === modalRef.current) {
			setTeamCode('');
			setTeamInfo(null);
			modalRef.current.close();
		}
	};

	return (
		<dialog id="my_modal_3" className="modal text-white" ref={modalRef} onClick={handleCloseModal}>
			<div className="modal-box overflow-hidden border-none" onClick={(e) => e.stopPropagation()}>
				<div className="flex flex-col">
					<h3 className="text-lg font-semibold">Join a team</h3>
				</div>

				<div className="flex flex-col mt-4 gap-2">
					{/* Team code input */}
					<div>
						<input
							type="text"
							className="input input-bordered w-full mt-2"
							placeholder="Enter team code"
							value={teamCode}
							onChange={(e) => setTeamCode(e.target.value)}
							disabled={!!teamInfo}
						/>
					</div>

					{/* Team info display */}
					{teamInfo && (
						<div className="flex justify-between mt-6 p-4 bg-gray-700 rounded-lg gap-x-4">
							<div className=''>
								<h3 className='text-lg font-semibold text-emphasis'>{`Team: ${teamInfo.teamName}`}</h3>
								<p className='flex gap-x-1 text-emphasis'>
									<IoPerson className='h-5 w-5' />
									{`Members: ${teamInfo.memberCount}`}
								</p>
							</div>
						</div>
					)}

					<form method="dialog">
						<div className="mt-5 flex flex-row-reverse gap-2">
							{/* Join team button */}
							<button
								className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
								onClick={() => {handleJoinTeam(); modalRef.current.close(); clearState();}}
								disabled={!teamInfo}
							>
								Join
							</button>

							{/* Show team button */}
							<button
								className="btn btn-ghost"
								onClick={handleShowTeam}
								disabled={isFetching || teamInfo}
							>
								{isFetching ? 'Fetching...' : 'Show Team'}
							</button>

							{/* Close button */}
							<button
								className="btn btn-ghost"
								onClick={() => {modalRef.current.close(); clearState()}}
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

export default JoinTeamModal;
