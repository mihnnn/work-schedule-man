// import React from 'react';

// function ShiftDetailsModal({ shift, onClose }) {
//   if (!shift) return null; // Don't show modal if no shift is selected

//   return (
//     <dialog id="shift-detail-modal" className="modal">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">{shift.title}</h3>
//         <p>{shift.description}</p>
//         <p>
//           <strong>Time:</strong> {shift.time}
//         </p>
//         <p>
//           <strong>Assigned Days:</strong>{' '}
//           {Object.entries(shift.assignedDays)
//             .filter(([day, assigned]) => assigned)
//             .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
//             .join(', ')}
//         </p>
//         <p>
//           <strong>Assigned Employees:</strong>{' '}
//           {shift.assignedEmployees.length > 0 ? (
//             <ul>
//               {shift.assignedEmployees.map((employee) => (
//                 <li key={employee.id}>
//                   {employee.name} ({employee.role})
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             'No employees assigned'
//           )}
//         </p>

//         <div className="modal-action">
//           <button className="btn" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </dialog>
//   );
// }

// export default ShiftDetailsModal;
