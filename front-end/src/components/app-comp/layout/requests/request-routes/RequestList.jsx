import React, { useState } from 'react';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function RequestList({ requests, handleApprove, handleReject }) {
  const { currentUser } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("");

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const renderManagerView = () => {
    return (
      <>
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
            <option value="Team Update">Team Update</option>
          </select>
        </div>

        {sortedRequests.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            No requests found.
          </div>
        ) : (
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
                        <div className="text-sm">By {request.maker.displayName}</div> {/* Displaying maker's ID */}
                      </div>
                    </a>
                  </td>
                  <td className="px-4 border border-gray-300">
                    <div className="py-4">
                      <div className="text-sm font-semibold text-center leading-6">{formatDate(request.date)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-center border border-gray-300">
                    <div className="flex items-center justify-center text-emphasis">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </div>
                  </td>
                  <td className="my-auto text-center py-4 px-4 border border-gray-300">
                    {request.status === "Pending" ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          className="bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border hover:bg-inherit hover:border-green-600 text-green-600"
                          onClick={() => handleApprove(request._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-inherit border-gray-400 btn rounded-md hover:bg-inherit transition flex justify-center border hover:border-red-600 text-red-600"
                          onClick={() => handleReject(request._id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Action Taken: {formatDate(request.actionTakenOn) || 'N/A'}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    )
  }

  const renderEmployeeView = () => {
    // Filter requests to show only those made by the current user
    const employeeRequests = sortedRequests.filter(
      (request) => request.maker._id === currentUser._id && (filter ? request.type === filter : true)
    );
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-4 text-emphasis">Your Requests</h1>

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
            <option value="Team Update">Team Update</option>
          </select>
        </div>

        {employeeRequests.length === 0 ? (
          <div className="text-center text-gray-500 py-6">No requests found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300 rounded-lg">
            <thead>
              <tr className="text-emphasis font-bold">
                <th className="px-4 py-3 text-center border border-gray-300">Request Type</th>
                <th className="px-4 py-3 text-left border border-gray-300">Request Details</th>
                <th className="px-4 py-3 text-center border border-gray-300">Date</th>
                <th className="px-4 py-3 text-center border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {employeeRequests.map((request, index) => (
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
                        <div className="text-sm">By {request.maker.displayName}</div> {/* Displaying maker's displayName */}
                      </div>
                    </a>
                  </td>
                  <td className="px-4 border border-gray-300">
                    <div className="py-4">
                      <div className="text-sm font-semibold text-center leading-6">{formatDate(request.date)}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-center border border-gray-300">
                    <div className="flex items-center justify-center text-emphasis">
                      {getStatusIcon(request.status)}
                      {request.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  };

  return (
    <div className="container">
      {currentUser.role === "Manager" ? renderManagerView() : renderEmployeeView()}
    </div>
  );
}

export default RequestList;
