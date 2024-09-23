import React, { useEffect, useMemo, useRef, useState } from 'react';

function ScheduleEditModal({ schedule, employees, onModalClose, onModalOpen }) {
	const [selectedEmployees, setSelectedEmployees] = useState([]);
	const [scheduleTitle, setScheduleTitle] = useState('');
	const [scheduleDescription, setScheduleDescription] = useState('');
	const [scheduleStartTime, setScheduleStartTime] = useState('');
	const [scheduleEndTime, setScheduleEndTime] = useState('');
	const [selectedDays, setSelectedDays] = useState({
		mon: false,
		tue: false,
		wed: false,
		thu: false,
		fri: false,
	});
	const modalRef = useRef(null);
	console.log("schedule", schedule);
	console.log("title: ", scheduleTitle);
	console.log("description: ", scheduleDescription);
	console.log("start time: ", scheduleStartTime);
	console.log("end time: ", scheduleEndTime);

	const groupedEmployees = useMemo(() => {
		return employees.reduce((acc, employee) => {
			if (!acc[employee.role]) {
				acc[employee.role] = [];
			}
			acc[employee.role].push(employee);
			return acc;
		}, {});
	}, [employees]);

	console.log("schedule: ", schedule);
	console.log("selectedEmployees: ", selectedEmployees);
	useEffect(() => {
		if (schedule) {
			onModalOpen(schedule);

			// initialize schedule details
			setScheduleTitle(schedule.title || '');
			setScheduleDescription(schedule.description || '');
			setScheduleStartTime(schedule.time?.split(' - ')[0] || '');
			setScheduleEndTime(schedule.time?.split(' - ')[1] || '');

			// Initialize selected employees 
			const initialSelectedEmployees = employees.map((employee) => {
				const isAssigned = schedule.assignedEmployees?.some(
					(assignedEmp) => assignedEmp.id === employee.id
				);


				return {
					id: employee.id,
					name: employee.name,
					role: employee.role,
					isSelected: isAssigned || false,
				};
			});

			console.log('Initial Employees:', initialSelectedEmployees);
			setSelectedEmployees(initialSelectedEmployees);

			const initialDays = {
				mon: schedule.assignedDays?.mon || false,
				tue: schedule.assignedDays?.tue || false,
				wed: schedule.assignedDays?.wed || false,
				thu: schedule.assignedDays?.thu || false,
				fri: schedule.assignedDays?.fri || false,
			};
			console.log('Initial Days:', initialDays);
			setSelectedDays(initialDays);
		}

		return () => {
			onModalClose();
		};
	}, [schedule, employees, onModalOpen, onModalClose]);

	const handleCheckboxChange = (id) => {
		setSelectedEmployees((prevEmployees) =>
			prevEmployees.map((employee) =>
				employee.id === id ? { ...employee, isSelected: !employee.isSelected } : employee
			)
		);
	};
	

	const handleDayChange = (day) => {
		setSelectedDays((prevDays) => ({
			...prevDays,
			[day]: !prevDays[day],
		}));
	};

	const handleSaveButtonClick = () => {
		const assignedEmployees = selectedEmployees
			.filter((employee) => employee.isSelected) // Use isSelected instead of checked
			.map((employee) => ({
				id: employee.id,
				name: employee.name,
				role: employees.find((emp) => emp.id === employee.id)?.role || '', // Get the role from the employees array
			}));
	
		const assignedDays = {
			mon: selectedDays.mon,
			tue: selectedDays.tue,
			wed: selectedDays.wed,
			thu: selectedDays.thu,
			fri: selectedDays.fri,
		};
	
		const updatedSchedule = {
			...schedule,
			title: scheduleTitle,
			description: scheduleDescription,
			time: `${scheduleStartTime} - ${scheduleEndTime}`,
			assignedDays,
			assignedEmployees,
		};
	
		console.log('Saving Schedule:', updatedSchedule);
	};
	

	const handleCloseModal = (e) => {
		if (e.target === modalRef.current) {

			setScheduleTitle('');
			setScheduleDescription('');
			setScheduleStartTime('');
			setScheduleEndTime('');
			setSelectedEmployees([]);
			setSelectedDays({
				monday: false,
				tuesday: false,
				wednesday: false,
				thursday: false,
				friday: false,
			});
			schedule = null;
			modalRef.current.close();
			onModalClose();
		}
	};

	return (
		<dialog id="edit_modal" className="modal text-white" ref={modalRef} onClick={handleCloseModal}>
			<div className="modal-box border-none text-emphasis flex flex-col">
				<div className="max-h-[80vh] overflow-y-auto">
					<h3 className="font-bold text-lg">Schedule Details</h3>
					<div className="flex flex-col mt-4 gap-2">
						<div>
							<label className="block text-sm">Schedule Title</label>
							<input
								type="text"
								placeholder="Title"
								className="input input-bordered w-full"
								value={scheduleTitle}
								onChange={(e) => setScheduleTitle(e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm">Schedule Description</label>
							<textarea
								className="textarea textarea-bordered w-full"
								placeholder="Description"
								value={scheduleDescription}
								onChange={(e) => setScheduleDescription(e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm">Working Hours</label>
							<div className="flex items-center mt-2 gap-x-3">
								<input
									type="time"
									className="input input-bordered"
									min="07:00"
									max="18:00"
									value={scheduleStartTime}
									onChange={(e) => setScheduleStartTime(e.target.value)}
								/>
								<span>-</span>
								<input
									type="time"
									className="input input-bordered"
									min="07:00"
									max="18:00"
									value={scheduleEndTime}
									onChange={(e) => setScheduleEndTime(e.target.value)}
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-col mt-4 gap-2">
						<label className="block text-sm">Schedule Days</label>
						<div className="flex mt-2 gap-x-2">
							{['mon', 'tue', 'wed', 'thu', 'fri'].map((day) => (
								<label key={day} className="flex items-center">
									<input
										type="checkbox"
										className="checkbox checkbox-bordered"
										checked={selectedDays[day]}  // Use the object property for checked state
										onChange={() => handleDayChange(day)}
									/>
									<span className="ml-2 capitalize">{day}</span>
								</label>
							))}
						</div>
					</div>

					<h4 className="text-lg font-semibold mb-2 mt-4">Assign Employees</h4>
					{Object.keys(groupedEmployees).map((role) => (
						<div key={role} className="mb-4">
							<p className="text-md font-bold">{role}:</p>
							<div className="flex flex-col">
								{groupedEmployees[role].map((employee) => {
									const selectedEmployee = selectedEmployees.find((e) => e.id === employee.id);
									return (
										<label key={employee.id} className="flex items-center">
											<input
												type="checkbox"
												className="checkbox checkbox-bordered"
												// Check the `isSelected` property to determine if the checkbox should be checked
												checked={selectedEmployee?.isSelected || false}
												onChange={() => handleCheckboxChange(employee.id)}
											/>
											<span className="ml-2">{employee.name}</span>
										</label>
									);
								})}
							</div>
						</div>
					))}
				</div>

				<form method='dialog'>
					<div className="mt-5 flex flex-row-reverse gap-2">
						<button
							className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
							onClick={() => { handleSaveButtonClick(); modalRef.current.close(); onModalClose(); }}
						>
							Save
						</button>
						<button className="btn btn-ghost" onClick={() => { modalRef.current.close(); onModalClose(); }}>
							Close
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
}

export default ScheduleEditModal;
