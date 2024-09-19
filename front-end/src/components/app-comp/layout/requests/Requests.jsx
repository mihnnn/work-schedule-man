import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for buttons

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Time-Off', member: 'Alice', date: '2024-09-25', status: 'Pending', details: 'Vacation from Sep 25 to Sep 30' },
    { id: 2, type: 'Shift Change', member: 'Bob', date: '2024-09-20', status: 'Pending', details: 'Switch shift with Eve on Sep 20' },
    { id: 3, type: 'Meeting Request', member: 'Eve', date: '2024-09-23', status: 'Pending', details: 'Meeting with client on Sep 23' },
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Approved' } : request));
  };

  const handleReject = (id) => {
    setRequests(requests.map(request => request.id === id ? { ...request, status: 'Rejected' } : request));
  };

  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {/* Header Section */}
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
        <div className="flex w-full max-w-full items-center truncate">
          <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
            <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
              Requests
            </h3>
            <p className="text-emphasis hidden text-sm md:block">
              Be alerted of upcoming requests from your team
            </p>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* Filter Section */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Filter Requests</h4>
        <div className="flex gap-x-4">
          <select className="select select-bordered w-40">
            <option>All Types</option>
            <option>Time-Off</option>
            <option>Shift Change</option>
            <option>Meeting Request</option>
          </select>
          <select className="select select-bordered w-40">
            <option>All Members</option>
            <option>Alice</option>
            <option>Bob</option>
            <option>Eve</option>
          </select>
          <button className="btn btn-primary">Filter</button>
        </div>
      </section>

      {/* Requests Table */}
      <section className="mb-6">
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Requests</h4>
        <table className="table-auto w-full border border-gray-500">
          <thead>
            <tr className="text-emphasis font-bold">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Team Member</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Details</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request.id}>
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{request.type}</td>
                <td className="px-4 py-2 border">{request.member}</td>
                <td className="px-4 py-2 border">{request.date}</td>
                <td className="px-4 py-2 border">{request.details}</td>
                <td className={`px-4 py-2 border ${request.status === 'Approved' ? 'text-green-500' : request.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                  {request.status}
                </td>
                <td className="px-4 py-2 border">
                  {request.status === 'Pending' && (
                    <>
                      <button className="btn btn-ghost text-green-500 mr-2" onClick={() => handleApprove(request.id)}>
                        <FaCheck />
                      </button>
                      <button className="btn btn-ghost text-red-500" onClick={() => handleReject(request.id)}>
                        <FaTimes />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Request History */}
      <section>
        <h4 className="text-lg font-semibold mb-2 text-emphasis">Request History</h4>
        <div className="space-y-4">
          {requests.filter(request => request.status !== 'Pending').map(request => (
            <div key={request.id} className="p-4 bg-gray-800 rounded-lg">
              <h5 className="text-emphasis font-semibold">{request.member}</h5>
              <p className="text-gray-400">{request.date} | {request.type}</p>
              <p className="text-gray-400">Details: {request.details}</p>
              <p className={`font-bold ${request.status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                {request.status}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Requests;
