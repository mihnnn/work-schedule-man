import React, { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function RequestCreationModal({ currentUser, teamId, getCurrentDate }) {
	const modalRef = useRef(null);
	// console.log("current date: ", getCurrentDate());

	const [formData, setFormData] = useState({
		type: '',
		details: '',
		date: getCurrentDate(),
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const clearForm = () => {
		setFormData({
			type: '',
			details: '',
			date: getCurrentDate(),
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.type || !formData.details) {
			alert("All fields are required.");
			return;
		}

		const requestData = {
			maker: currentUser._id,
			type: formData.type,
			date: formData.date,
			details: formData.details,
			team: teamId,
		};

		try {
			console.log("submitting data:", requestData);
			const res = await fetch('/api/requests', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestData),
			});

			if (!res.ok) {
				throw new Error('Error submitting request');
			}

			const data = await res.json();
			console.log("Request submitted successfully:", data);
			toast.success("Request submitted successfully");

			clearForm();
			modalRef.current.close(); 
		} catch (error) {
			console.error("Error submitting request:", error);
		}
	};

	const handleCloseModal = (e) => {
		if (e.target === modalRef.current) {
			clearForm();
			modalRef.current.close();
		}
	};

	return (
		<dialog id='my_modal_3' className='modal text-white' ref={modalRef} onClick={handleCloseModal}>
			<div className="modal-box overflow-hidden border-none">
				<div className="flex flex-col">
					<h3 className="text-lg font-semibold">New Request</h3>
					<p>Make a new request to the manager</p>
					<div className="flex flex-col mt-4 gap-2">
						<div>
							<label className=" block text-sm">Request Type</label>
							<select
								name="type"
								value={formData.type}
								onChange={handleChange}
								className="select select-bordered w-full mt-2"
								required
							>
								<option value="">Select Type</option>
								<option value="Shift Change">Shift Change</option>
								<option value="Time-Off">Time-Off</option>
								<option value="Meeting">Meeting</option>
								<option value="Work Update">Work Update</option>
								<option value="Team Update">Team Update</option>
							</select>
						</div>

						<div>
							<label className="text-sm block">Details</label>
							<textarea
								name="details"
								value={formData.details}
								onChange={handleChange}
								className="textarea textarea-bordered w-full mt-2"
								placeholder="Provide details of your request"
								required
							/>
						</div>

						<form method="dialog">
							<div className="mt-5 flex flex-row-reverse gap-4">
								<button type="submit" className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50e" onClick={handleSubmit}>
									Submit
								</button>
								<button
									type="button"
									className="btn btn-ghost"
									onClick={() => modalRef.current.close()}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</dialog>
	);
}

export default RequestCreationModal;
