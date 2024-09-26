import React, { useState } from 'react';

const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`); // Ensuring time is in XX:XX format
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const mockShifts = [
	{ id: 7, day: 'Monday', startTime: "14:00", endTime: "16:00", name: "Afternoon Shift", employees: [{ role: "Chef", names: ["Alice"] }, { role: "Waiter", names: ["Elise"] }] },
	{ id: 1, day: 'Monday', startTime: '07:00', endTime: '11:00', name: 'Morning Shift', employees: [{ role: 'Chef', names: ['Alice', 'Jayce'] }, { role: 'Waiter', names: ['Elise', 'Camille'] }] },
	{ id: 2, day: 'Monday', startTime: '13:00', endTime: '17:00', name: 'Afternoon Shift', employees: [{ role: 'Chef', names: ['Alice'] }, { role: 'Waiter', names: ['Elise'] }] },
	{ id: 3, day: 'Tuesday', startTime: '09:00', endTime: '14:00', name: 'Brunch Shift', employees: [{ role: 'Chef', names: ['Bob'] }, { role: 'Security', names: ['Tom'] }] },
	{ id: 4, day: 'Wednesday', startTime: '12:00', endTime: '16:00', name: 'Lunch Shift', employees: [{ role: 'Waiter', names: ['Eva', 'Alex'] }] },
	{ id: 5, day: 'Friday', startTime: '18:00', endTime: '22:00', name: 'Evening Shift', employees: [{ role: 'Chef', names: ['Jayce', 'Mark'] }] },
	{ id: 6, day: 'Thursday', startTime: '00:00', endTime: '05:00', name: 'Night Shift', employees: [{ role: 'Cleaner', names: ['Jayce', 'Mark'] }] },
];

const shiftColors = ['#FF9F89', '#FFCC5C', '#48C774', '#3498db', '#9B59B6'];

function DashBoardSchedule() {
	const [selectedShift, setSelectedShift] = useState(null);

	const handleClick = (shift) => {
		setSelectedShift(shift);
	};

	const closeDetails = () => {
		setSelectedShift(null);
	};

	const today = new Date().getDay();

	const timeToMinutes = (time) => {
		const [hours, minutes] = time.split(':').map(Number);
		return hours * 60 + minutes;
	};

	// Function to get the current week dates
	const getCurrentWeek = () => {
		const currentDate = new Date();
		const currentDay = currentDate.getDay();
		const startOfWeek = new Date(currentDate);
		startOfWeek.setDate(currentDate.getDate() - currentDay); // Move to the first day of the week (Sunday)

		const daysOfWeek = [];
		for (let i = 0; i < 7; i++) {
			const day = new Date(startOfWeek);
			day.setDate(startOfWeek.getDate() + i);
			daysOfWeek.push(day.getDate()); // Push only the day of the month
		}
		return daysOfWeek;
	};


	// Map days to the current week
	const weekDays = getCurrentWeek();
	const dayMapping = {
		Sunday: 0,
		Monday: 1,
		Tuesday: 2,
		Wednesday: 3,
		Thursday: 4,
		Friday: 5,
		Saturday: 6,
	};

	const calculateBlockStyle = (startTime, endTime) => {
		const gridStartHour = 24;
		const pixelsPerHour = 48;

		const startMinutes = timeToMinutes(startTime);
		const endMinutes = timeToMinutes(endTime) + 60;

		const gridStartMinutes = gridStartHour * 60;

		const top = ((startMinutes - gridStartMinutes) / 60) * pixelsPerHour; // calc top position
		const height = ((endMinutes - startMinutes) / 60) * pixelsPerHour; // calc color block height

		const adjustedTop = Math.max(0, top);
		const adjustedHeight = height + 48;

		return {
			top: `${adjustedTop}px`,
			height: `${adjustedHeight}px`,
			position: 'absolute',
			width: '100%',
		};
	};

	const groupedShifts = {};
	mockShifts.forEach((shift) => {
		if (!groupedShifts[shift.day]) {
			groupedShifts[shift.day] = [];
		}
		groupedShifts[shift.day].push(shift);
	});

	return (
		<div className='p-5 gap-6 h-full'>

			<div>
				<h2 className="text-2xl font-semibold mb-4 text-emphasis">Weekly Schedule</h2>
			</div>
			<div className="p-5 flex flex-row gap-6 h-full">
				{/* Week Grid */}
				<div className="w-3/4 relative border border-gray-500">
					<div className="sticky top-0 grid grid-cols-8 bg-base-200 z-10">
						{/* Header Row: Days and Dates */}
						<div className="col-span-1 bg-base-200 text-center py-3 font-bold border">
							<div className="flex flex-col">
								<div className="flex m-auto">Time</div>
							</div>
						</div>
						{days.map((day, index) => (
							<div
								key={day}
								className={`border col-span-1 bg-base-200 text-center text-emphasis py-3 font-bold relative ${today === index ? '' : ''}`}
							>
								<div className="text-xs">{day.substring(0, 3).toUpperCase()}</div>
								<div className={`text-2xl ${today === index ? 'bg-blue-500 text-white rounded-full' : ''}`}>
									{weekDays[index]}
								</div>
							</div>
						))}
					</div>

					<div className="overflow-y-scroll h-[calc(100vh-80px)] relative">
						{/* Time Slots and Shifts */}
						{hours.map((hour, hourIndex) => (
							<div key={hour} className="grid grid-cols-8 relative">
								<div className="col-span-1 text-center py-3 font-bold border-b border-l">{hour}</div>
								{days.map((day) => (
									<div key={day} className="col-span-1 relative border-r border-l border-b">
										{/* Render shifts  */}
										{groupedShifts[day] &&
											groupedShifts[day].map((shift, index) => {
												const dayIndex = dayMapping[shift.day];
												const assignedDate = weekDays[dayIndex]; // Correct date for that day
												const startMinutes = timeToMinutes(shift.startTime);
												const endMinutes = timeToMinutes(shift.endTime);
												const startHour = startMinutes / 60;
												const endHour = (endMinutes / 60) + 1; // Add 1 to include the last hour 

												if (startHour <= hourIndex && endHour > hourIndex) {
													const shiftDuration = endMinutes - startMinutes + 60;
													const blockHeight = shiftDuration / 60;

													return (
														<div
															key={shift.id}
															className="block"
															style={{
																height: `${blockHeight}px`,
																...calculateBlockStyle(shift.startTime, shift.endTime),
																overflow: 'hidden',
															}}
														>
															<div
																className="absolute left-0 w-full bg-blue-500 text-white p-2 rounded-md shadow-md cursor-pointer "
																style={{
																	backgroundColor: shiftColors[index % shiftColors.length],
																}}
																onClick={() => handleClick(shift)}
															>
																<div className="font-semibold">{shift.name}</div>
																<div className="text-xs">{shift.startTime} - {shift.endTime}</div>
															</div>
														</div>
													);
												}
												return null;
											})}
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Selected Shift Details */}
				{selectedShift && (
					<div className="p-6 bg-inherit shadow-lg rounded-md w-64 relative text-emphasis border border-gray-600">
						<button className="absolute top-2 right-2 text-lg" onClick={closeDetails}>
							&#10005;
						</button>
						<h3 className="text-lg font-bold mb-4">Shift Details</h3>
						<p>
							<strong>Title:</strong> {selectedShift.name}
						</p>
						<p>
							<strong>Time:</strong> {selectedShift.startTime} - {selectedShift.endTime}
						</p>
						<h4 className="font-bold mt-4">On-shift:</h4>
						{selectedShift.employees.map((employeeGroup, index) => (
							<div key={index}>
								<strong>{employeeGroup.role}</strong>: {employeeGroup.names.join(', ')}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default DashBoardSchedule;
