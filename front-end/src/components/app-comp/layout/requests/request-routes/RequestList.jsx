import React, { useState } from 'react';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Types of Requests:
// - Shift Change
// - Time-Off
// - Meeting
// - Work Update
// - Team Update

// Request Status:
// - Pending
// - Approved
// - Rejected
// - Expired


const initialRequests = [
  {
    id: 1,
    maker: "John Doe",
    type: "Shift Change",
    date: "2024-09-22",
    details: "Request to swap shift with Jane Smith on 2024-09-25",
    status: "Pending",
  },
  {
    id: 2,
    maker: "Jane Smith",
    type: "Time-Off",
    date: "2024-09-20",
    details: "Request for vacation from 2024-10-01 to 2024-10-05",
    status: "Pending",
  },
  {
    id: 3,
    maker: "Bob Johnson",
    type: "Meeting",
    date: "2024-09-19",
    details: "Request to schedule a team meeting on 2024-09-30",
    status: "Pending",
  },
  {
    id: 4,
    maker: "Alice Cooper",
    type: "Work Update",
    date: "2024-09-18",
    details: "Request to update work report for September",
    status: "Pending",
  },
  {
    id: 5,
    maker: "Michael Scott",
    type: "Shift Change",
    date: "2024-09-17",
    details: "Request to swap shifts with Dwight on 2024-09-24",
    status: "Pending",
  },
  {
    id: 6,
    maker: "Pam Beesly",
    type: "Time-Off",
    date: "2024-09-16",
    details: "Request for personal leave on 2024-10-03",
    status: "Pending",
  },
  {
    id: 7,
    maker: "Jim Halpert",
    type: "Work Update",
    date: "2024-09-15",
    details: "Request to update weekly progress",
    status: "Pending",
  },
  {
    id: 8,
    maker: "Dwight Schrute",
    type: "Meeting",
    date: "2024-09-14",
    details: "Request for 1:1 performance meeting on 2024-09-22",
    status: "Pending",
  },
];

function RequestList() {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("");

  const handleApprove = (id) => {
    setRequests((prevRequests) => {
      const updatedRequests = prevRequests.map((req) =>
        req.id === id && req.status === "Pending"
          ? { ...req, status: "Approved" }
          : req
      );
      return moveToBottom(updatedRequests, id);
    });
  };

  const handleReject = (id) => {
    setRequests((prevRequests) => {
      const updatedRequests = prevRequests.map((req) =>
        req.id === id && req.status === "Pending"
          ? { ...req, status: "Rejected" }
          : req
      );
      return moveToBottom(updatedRequests, id);
    });
  };

  const moveToBottom = (requests, id) => {
    const reqIndex = requests.findIndex((req) => req.id === id);
    const updatedRequest = requests.splice(reqIndex, 1)[0];
    return [...requests, updatedRequest];
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredRequests = requests.filter((request) =>
    filter ? request.type === filter : true
  );

  const sortedRequests = filteredRequests.sort((a, b) => new Date(b.date) - new Date(a.date));

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <FaHourglassHalf className="inline-block mr-1" />;
      case "Approved":
        return <FaCheckCircle className="inline-block mr-1 text-green-600" />;
      case "Rejected":
        return <FaTimesCircle className="inline-block mr-1 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-emphasis">List of Requests</h1>

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold text-emphasis">Filter by Type:</label>
        <select
          id="filter"
          className="border rounded px-2 py-1"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="Shift Change">Shift Change</option>
          <option value="Time-Off">Time-Off</option>
          <option value="Meeting">Meeting</option>
          <option value="Work Update">Work Update</option>
        </select>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300 rounded-lg">
        <thead>
          <tr className="text-emphasis font-bold">
            <th className="px-4 py-3 text-center border border-gray-300">Request Type</th>
            <th className="px-4 py-3 text-left border border-gray-300">Request Details</th>
            <th className="px-4 py-3 text-center border border-gray-300">Date</th>
            <th className="px-4 py-3 text-center border border-gray-300">Status</th>
            <th className="px-4 py-3 text-center border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedRequests.map((request, index) => (
            <tr key={index} className="group justify-between hover:bg-gray-100 hover:bg-opacity-10">
              <td className="px-4 border border-gray-300">
                <div className="py-4">
                  <div className="text-sm font-semibold text-emphasis leading-6">{request.type}</div>
                </div>
              </td>
              <td className="px-4 border border-gray-300">
                <a href="#">
                  <div className="cursor-pointer py-4">
                    <div className="text-sm font-semibold leading-6 text-emphasis" title={request.details}>
                      {request.details}
                    </div>
                    <div className="text-sm">By {request.maker}</div>
                  </div>
                </a>
              </td>
              <td className="px-4 border border-gray-300">
                <div className="py-4">
                  <div className="text-sm font-semibold text-center leading-6">{request.date}</div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-center border border-gray-300">
                <div className="flex items-center justify-center text-emphasis">
                  {getStatusIcon(request.status)}
                  {request.status}
                </div>
              </td>
              <td className="flex w-full justify-center text-center py-4 px-4 border border-gray-300">
                <div className="flex gap-2">
                  {request.status === "Pending" && (
                    <>
                      <button className="bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border hover:bg-inherit hover:border-green-600 text-green-600"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </button>
                      <button className="bg-inherit border-gray-400 btn rounded-md border hover:bg-inherit hover:border-red-600 text-red-600"
                        onClick={() => handleReject(request.id)}>
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
