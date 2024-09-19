import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Icons for buttons

function Schedules() {
  const [schedules, setSchedules] = useState([
    { id: 1, member: 'Alice', date: '2024-09-20', time: '09:00 AM - 05:00 PM', shift: 'Morning' },
    { id: 2, member: 'Bob', date: '2024-09-20', time: '01:00 PM - 09:00 PM', shift: 'Afternoon' },
    { id: 3, member: 'Eve', date: '2024-09-21', time: '09:00 AM - 05:00 PM', shift: 'Morning' },
  ]);
  const [newSchedule, setNewSchedule] = useState({ member: '', date: '', time: '', shift: '' });

  const handleAddSchedule = () => {
    const newId = schedules.length + 1;
    setSchedules([...schedules, { id: newId, ...newSchedule }]);
    setNewSchedule({ member: '', date: '', time: '', shift: '' }); // Reset form
  };

  const handleDeleteSchedule = (id) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
  };

  return (
    <div className="max-w-full px-2 py-4 lg:px-6">
      {/* Header Section */}
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Schedules
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              Create and manage schedules for your team members
            </p>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* Filter Section */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Filter Schedules</h4>
        <div className="flex gap-x-4">
          <input type="date" className="input input-bordered w-40" placeholder="Select date" />
          <select className="select select-bordered w-40">
            <option>All Members</option>
            <option>Alice</option>
            <option>Bob</option>
            <option>Eve</option>
          </select>
          <select className="select select-bordered w-40">
            <option>All Shifts</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Night</option>
          </select>
          <button className="btn btn-primary">Filter</button>
        </div>
      </section>

      {/* Schedules Table */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Schedules</h4>
        <table className="table-auto w-full border border-gray-500">
          <thead>
            <tr className="text-emphasis font-bold">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Team Member</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Shift</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={schedule.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{schedule.member}</td>
                <td className="px-4 py-2 border">{schedule.date}</td>
                <td className="px-4 py-2 border">{schedule.time}</td>
                <td className="px-4 py-2 border">{schedule.shift}</td>
                <td className="px-4 py-2 border">
                  <button className="btn btn-ghost text-blue-500 mr-2">
                    <FaEdit />
                  </button>
                  <button className="btn btn-ghost text-red-500" onClick={() => handleDeleteSchedule(schedule.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Schedule */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Add New Schedule</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            className="select select-bordered w-full"
            value={newSchedule.member}
            onChange={(e) => setNewSchedule({ ...newSchedule, member: e.target.value })}
          >
            <option value="">Select Member</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Eve">Eve</option>
          </select>
          <input
            type="date"
            className="input input-bordered w-full"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Time (e.g. 09:00 AM - 05:00 PM)"
            value={newSchedule.time}
            onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
          />
          <select
            className="select select-bordered w-full"
            value={newSchedule.shift}
            onChange={(e) => setNewSchedule({ ...newSchedule, shift: e.target.value })}
          >
            <option value="">Select Shift</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>
        </div>
        <button className="btn btn-primary mt-4" onClick={handleAddSchedule}>
          <FaPlus className="mr-2" /> Add Schedule
        </button>
      </section>

      {/* Upcoming Schedules */}
      <section>
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Upcoming Schedules</h4>
        <div className="space-y-4">
          {schedules.slice(0, 3).map(schedule => (
            <div key={schedule.id} className="p-4 bg-gray-800 rounded-lg">
              <h5 className="text-emphasis font-semibold">{schedule.member}</h5>
              <p className="text-gray-400">{schedule.date} | {schedule.time}</p>
              <p className="text-gray-400">Shift: {schedule.shift}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Schedules;
