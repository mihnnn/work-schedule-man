import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Icons for buttons

function Meetings() {
  const [meetings, setMeetings] = useState([
    { id: 1, member: 'Alice', date: '2024-09-21', time: '10:00 AM - 11:00 AM', topic: 'Project Kickoff' },
    { id: 2, member: 'Bob', date: '2024-09-22', time: '02:00 PM - 03:00 PM', topic: 'Team Sync' },
    { id: 3, member: 'Eve', date: '2024-09-23', time: '01:00 PM - 02:00 PM', topic: 'Client Meeting' },
  ]);
  const [newMeeting, setNewMeeting] = useState({ member: '', date: '', time: '', topic: '' });

  const handleAddMeeting = () => {
    const newId = meetings.length + 1;
    setMeetings([...meetings, { id: newId, ...newMeeting }]);
    setNewMeeting({ member: '', date: '', time: '', topic: '' }); // Reset form
  };

  const handleDeleteMeeting = (id) => {
    const updatedMeetings = meetings.filter(meeting => meeting.id !== id);
    setMeetings(updatedMeetings);
  };

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {/* Header Section */}
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Meetings
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              Create and manage meetings with your team members
            </p>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* Filter Section */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Filter Meetings</h4>
        <div className="flex gap-x-4">
          <input type="date" className="input input-bordered w-40" placeholder="Select date" />
          <select className="select select-bordered w-40">
            <option>All Members</option>
            <option>Alice</option>
            <option>Bob</option>
            <option>Eve</option>
          </select>
          <button className="btn btn-primary">Filter</button>
        </div>
      </section>

      {/* Meetings Table */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Meetings</h4>
        <table className="table-auto w-full border border-gray-500">
          <thead>
            <tr className="text-emphasis font-bold">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Team Member</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Topic</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <tr key={meeting.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{meeting.member}</td>
                <td className="px-4 py-2 border">{meeting.date}</td>
                <td className="px-4 py-2 border">{meeting.time}</td>
                <td className="px-4 py-2 border">{meeting.topic}</td>
                <td className="px-4 py-2 border">
                  <button className="btn btn-ghost text-blue-500 mr-2">
                    <FaEdit />
                  </button>
                  <button className="btn btn-ghost text-red-500" onClick={() => handleDeleteMeeting(meeting.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Add New Meeting */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Add New Meeting</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            className="select select-bordered w-full"
            value={newMeeting.member}
            onChange={(e) => setNewMeeting({ ...newMeeting, member: e.target.value })}
          >
            <option value="">Select Member</option>
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
            <option value="Eve">Eve</option>
          </select>
          <input
            type="date"
            className="input input-bordered w-full"
            value={newMeeting.date}
            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Time (e.g. 10:00 AM - 11:00 AM)"
            value={newMeeting.time}
            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
          />
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Topic (e.g. Project Kickoff)"
            value={newMeeting.topic}
            onChange={(e) => setNewMeeting({ ...newMeeting, topic: e.target.value })}
          />
        </div>
        <button className="btn btn-primary mt-4" onClick={handleAddMeeting}>
          <FaPlus className="mr-2" /> Add Meeting
        </button>
      </section>

      {/* Upcoming Meetings */}
      <section>
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Upcoming Meetings</h4>
        <div className="space-y-4">
          {meetings.slice(0, 3).map(meeting => (
            <div key={meeting.id} className="p-4 bg-gray-800 rounded-lg">
              <h5 className="text-emphasis font-semibold">{meeting.member}</h5>
              <p className="text-gray-400">{meeting.date} | {meeting.time}</p>
              <p className="text-gray-400">Topic: {meeting.topic}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Meetings;
