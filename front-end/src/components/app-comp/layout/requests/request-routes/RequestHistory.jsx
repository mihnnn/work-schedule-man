import React from 'react';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Function to get the appropriate icon based on request status
const getStatusIcon = (status) => {
  switch (status) {
    case "Approved":
      return <FaCheckCircle className="inline-block mr-1 text-green-600" />;
    case "Rejected":
      return <FaTimesCircle className="inline-block mr-1 text-red-600" />;
    case "Pending":
      return <FaHourglassHalf className="inline-block mr-1 text-yellow-500" />;
    case "Expired":
      return <FaHourglassHalf className="inline-block mr-1 text-gray-400" />;
    default:
      return null;
  }
};

function RequestHistory({ requests, getCurrentDate }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-emphasis">Request History</h1>
      <table className="min-w-full divide-y divide-gray-200 text-sm border border-gray-300 rounded-lg">
        <thead>
          <tr className="text-emphasis font-bold">
            <th className="px-4 py-3 text-center border border-gray-300">ID</th>
            <th className="px-4 py-3 text-left border border-gray-300">Request Details</th>
            <th className="px-4 py-3 text-center border border-gray-300">Request Type</th>
            <th className="px-4 py-3 text-center border border-gray-300">Status</th>
            <th className="px-4 py-3 text-center border border-gray-300">Action Taken On</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100 hover:bg-opacity-10">
                <td className="px-4 border border-gray-300 text-center">{request._id}</td>
                <td className="px-4 border border-gray-300">
                  <div className="py-2">
                    <div className="text-sm font-semibold leading-6 text-emphasis">{request.details}</div>
                    <div className="text-sm">By {request.maker.displayName} on {request.date}</div>
                  </div>
                </td>
                <td className="px-4 border border-gray-300 text-center">{request.type}</td>
                <td className="px-4 border border-gray-300 text-center">
                  <div className="flex items-center justify-center text-emphasis">
                    {getStatusIcon(request.status)}
                    {request.status}
                  </div>
                </td>
                <td className="px-4 border border-gray-300 text-center">{"N/A" || getCurrentDate(request.actionTakenOn)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestHistory;
