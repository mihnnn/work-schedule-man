import React, { useState, useRef, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { MdPreview } from 'react-icons/md';
import ScheduleCreationModal from './ScheduleCreationModal';
import ScheduleEditModal from './ScheduleEditModal';

function Schedules() {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  console.log("selectedSchedule: ", selectedSchedule);

  const [schedules, setSchedules] = useState([
    {
      id: 1,
      title: 'Breakfast Shift',
      description: 'Prepare and serve breakfast',
      time: '08:00 - 12:00',
      assignedDays: {
        mon: true,
        tue: true,
        wed: false,
        thu: false,
        fri: false,
      },
      assignedEmployees: [
        { id: 1, name: 'Alice', role: 'Chef' },
        { id: 2, name: 'Bob', role: 'Waiter' },
      ],
    },
    {
      id: 2,
      title: 'Lunch Shift',
      description: 'Prepare and serve lunch',
      time: '12:00 - 16:00',
      assignedDays: {
        mon: false,
        tue: false,
        wed: true,
        thu: true,
        fri: true,
      },
      assignedEmployees: [
        { id: 1, name: 'Alice', role: 'Chef' },
        { id: 3, name: 'Eve', role: 'Cleaner' },
        { id: 5, name: 'Frank', role: 'Chef' },
      ],
    },
    {
      id: 3,
      title: 'Dinner Shift',
      description: 'Prepare and serve dinner',
      time: '16:00 - 20:00',
      assignedDays: {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
      },
      assignedEmployees: [],
    },
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice', role: 'Chef' },
    { id: 2, name: 'Bob', role: 'Waiter' },
    { id: 3, name: 'Eve', role: 'Cleaner' },
    { id: 4, name: 'David', role: 'Waiter' },
    { id: 5, name: 'Frank', role: 'Chef' },
    { id: 6, name: 'Grace', role: 'Waiter' },
  ]);

  // const [newSchedule, setNewSchedule] = useState({ member: '', date: '', time: '', title: '', assignedDays: { mon: false, tue: false, wed: false, thu: false, fri: false } });
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleAddSchedule = () => {
    const newId = schedules.length + 1;
    setSchedules([...schedules, { id: newId, ...newSchedule }]);
    setNewSchedule({ member: '', date: '', time: '', title: '', assignedDays: { mon: false, tue: false, wed: false, thu: false, fri: false } });
  };

  useEffect(() => {
    if (selectedSchedule) {
      const modal = document.getElementById('edit_modal');
      if (modal) {
        modal.showModal();
      }
    }
  }, [selectedSchedule]);

  const handleModalClose = () => {
    setSelectedSchedule(null);
  };

  const handleModalOpen = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleDeleteSchedule = (id) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
  };

  const handleDropdownToggle = (scheduleId) => {
    setOpenDropdown(openDropdown === scheduleId ? null : scheduleId);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        <div className="fixed bottom-20 z-40 ltr:right-4 rtl:left-4 md:z-auto md:ltr:right-0 md:rtl:left-0 flex-shrink-0 [-webkit-app-region:no-drag] md:relative md:bottom-auto md:right-auto">
          <button
            className="btn btn-outline bg-white text-black"
            onClick={() => document.querySelector('#my_modal_3').showModal()}
          >
            + New
          </button>
          <ScheduleCreationModal />
        </div>
      </header>

      <div className="divider"></div>

      <h4 className="text-lg font-semibold mb-2 text-emphasis">Schedules</h4>
      {/* Schedules List */}
      <div className="flex w-full max-w-none items-center justify-between">
        <div className="flex flex-col border-gray-500 mb-16 rounded-md border w-full animate-grow">
          <ul className="!static w-full divide-[#888] divide-y">
            {schedules.map((schedule) => (
              <li key={schedule.id} className="relative">
                <div className="flex w-full items-start justify-between transition hover:bg-gray-600 hover:bg-opacity-10 cursor-pointer">
                  {/* Schedule Info */}
                  <div className="group flex flex-row w-full max-w-full justify-between px-4 py-4 sm:px-6">
                    <div className='flex flex-row justify-start w-[500px]'>
                      <div className="flex-1 text-sm">
                        <span className="text-emphasis font-semibold text-base">{schedule.title}</span>
                        <p className="py-1">{schedule.description}</p>
                        <p className='pb-1'> {schedule.time} </p>
                      </div>

                      <div className="flex border border-r-0 border-gray-400 mx-4"></div>

                      {/* Assigned Employees */}
                      <div className="text-sm flex flex-col w-[200px]">
                        <h5 className="flex flex-col justify-start text-emphasis text-base font-semibold items-center">Assigned Employees</h5>
                        {schedule.assignedEmployees.length > 0 ? (
                          schedule.assignedEmployees.map(employee => (
                            <p key={employee.id}>
                              <strong>{employee.role}:</strong> {employee.name}
                            </p>
                          ))
                        ) : (
                          <p>No employees assigned</p>
                        )}
                      </div>


                      <div className="flex border border-r-0 border-gray-400 mx-4"></div>

                      {/* Assigned Days */}
                      <div className="text-sm flex flex-col">
                        <h5 className="flex flex-col justify-start text-emphasis text-base font-semibold items-center">Assigned Days</h5>
                        {Object.entries(schedule.assignedDays).map(([day, assigned]) => (
                          assigned ? <p key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</p> : null
                        ))}
                      </div>
                    </div>
                    <div className="hidden sm:mt-0 sm:flex items-center">
                      <button
                        className="p-2 hover:bg-gray-200 hover:opacity-30 hover:text-gray-700 rounded-full"
                        onClick={() => handleDropdownToggle(schedule.id)}
                      >
                        <FaEllipsisV />
                      </button>

                      {/* Action Dropdown */}
                      {openDropdown === schedule.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute right-5 top-16 shadow-2xl mt-2 w-48 bg-gray-900 border border-gray-500 rounded-md z-50"
                        >
                          <ul>
                            <li
                              className=" flex px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer"
                              onClick={() => handleModalOpen(schedule)}
                            >
                              <MdPreview className="mr-2 my-auto" />
                              <span>Edit / Assign</span>
                            </li>
                            <li
                              className=" flex px-4 py-2 hover:bg-red-600 hover:bg-opacity-30 text-red-500 cursor-pointer"
                              onClick={() => handleDeleteSchedule(schedule.id)}
                            >
                              <FaTrash className="my-auto inline-block mr-2" /> Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Edit Schedule Modal */}
      <ScheduleEditModal
        schedule={selectedSchedule}
        onModalClose={handleModalClose}
        onModalOpen={handleModalOpen}
        employees={employees}
      />
    </div>
  );
}

export default Schedules;
