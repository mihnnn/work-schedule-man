import React from 'react';
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Sample data for request history
const requestHistoryData = [
  {
    id: 1,
    maker: "John Doe",
    details: "Request to swap shift with Jane Smith on 2024-09-25",
    date: "2024-09-22",
    type: "Shift Change",
    status: "Approved",
    actionTakenOn: "2024-09-23", // Date when action was taken
  },
  {
    id: 2,
    maker: "Jane Smith",
    details: "Request for vacation from 2024-10-01 to 2024-10-05",
    date: "2024-09-20",
    type: "Time-Off",
    status: "Rejected",
    actionTakenOn: "2024-09-21",
  },
  {
    id: 3,
    maker: "Bob Johnson",
    details: "Request to schedule a team meeting on 2024-09-30",
    date: "2024-09-19",
    type: "Meeting",
    status: "Expired",
    actionTakenOn: "N/A", // No action taken
  },
  // Add more sample data as needed
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Approved":
      return <FaCheckCircle className="inline-block mr-1 text-green-600" />;
    case "Rejected":
      return <FaTimesCircle className="inline-block mr-1 text-red-600" />;
    case "Expired":
      return <FaHourglassHalf className="inline-block mr-1 text-gray-400" />;
    default:
      return null;
  }
};

function RequestHistory() {
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
          {requestHistoryData.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100 hover:bg-opacity-10">
              <td className="px-4 border border-gray-300 text-center">{request.id}</td>
              <td className="px-4 border border-gray-300">
                <div className="py-2">
                  <div className="text-sm font-semibold leading-6 text-emphasis">{request.details}</div>
                  <div className="text-sm">By {request.maker} on {request.date}</div>
                </div>
              </td>
              <td className="px-4 border border-gray-300 text-center">{request.type}</td>
              <td className="px-4 border border-gray-300 text-center">
                <div className="flex items-center justify-center text-emphasis">
                  {getStatusIcon(request.status)}
                  {request.status}
                </div>
              </td>
              <td className="px-4 border border-gray-300 text-center">{request.actionTakenOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestHistory;
