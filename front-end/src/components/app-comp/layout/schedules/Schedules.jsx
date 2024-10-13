import React, { useState, useRef, useEffect } from 'react';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";
import { MdPreview } from 'react-icons/md';
import ScheduleCreationModal from './ScheduleCreationModal';
import ScheduleEditModal from './ScheduleEditModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Schedules() {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [teamInfo, setTeamInfo] = useState([]);

  const [teamId, setTeamId] = useState(null);

  useEffect(() => {
    if (currentUser?.teamMemberships) {
      setTeamId(currentUser.teamMemberships[0].team);
    }
    // console.log(teamId);
  }, [currentUser.teamMemberships[0].team])


  const [teamSchedules, setTeamSchedules] = useState([]);
  const fetchTeamSchedules = async () => {
    if (teamId) {
      try {
        const res = await fetch(`/api/schedules/${teamId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch schedules');
        }
        const data = await res.json();
        setTeamSchedules(data);

      } catch (error) {
        console.error(error);
      }
    }
  }
  // console.log("Team Schedules: ", teamSchedules);
  const fetchTeamMembers = async () => {
    if (teamId) {
      try {
        const res = await fetch(`/api/teams/members/${teamId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch team members');
        }
        const data = await res.json();
        setTeamInfo(data.members);
      } catch (error) {
        console.error(error);
      }
    }
  }


  useEffect(() => {
    fetchTeamSchedules();
  }, [teamId]);

  useEffect(() => {
    fetchTeamMembers();
  }, [teamId]);



  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleDeleteSchedule = async (schedule) => {
    const { _id: id } = schedule;
    if (id) {
      const confirmed = window.confirm('Are you sure you want to delete this schedule?');
      if (confirmed) {
        try {
          const res = await fetch(`/api/schedules/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error('Failed to delete schedule');
          }

          const updatedSchedule = teamSchedules.filter(schedule => schedule._id !== id);
          setTeamSchedules(updatedSchedule);
          toast.success('Schedule deleted successfully');
        } catch (error) {
          console.error('Failed to delete schedule:', error);
          toast.error('Failed to delete schedule');
        }
      }
    } else {
      toast.error('Invalid schedule to delete');
    }
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

  // Manager View
  const renderManagerView = () => (
    <>
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
      <div className="flex w-full max-w-none items-center justify-between">
        <div className="flex flex-col border-gray-500 mb-16 rounded-md border w-full animate-grow">
          <ul className="!static w-full divide-[#888] divide-y">
            {teamSchedules.length > 0 ? (
              teamSchedules.map((schedule) => (
                <li key={schedule._id} className="relative">
                  <div className="flex w-full items-start justify-between transition hover:bg-gray-600 hover:bg-opacity-10 cursor-pointer">
                    <div className="group flex flex-row w-full max-w-full justify-between px-4 py-4 sm:px-6">
                      <div className="flex flex-row justify-start w-[500px]">
                        <div className="flex-1 text-sm">
                          <span className="text-emphasis font-semibold text-base">{schedule.title}</span>
                          <p className="py-1">{schedule.description}</p>
                          <p className="pb-1">{schedule.time}</p>
                        </div>

                        <div className="flex border border-r-0 border-gray-400 mx-4"></div>

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

                        <div className="text-sm flex flex-col">
                          <h5 className="flex flex-col justify-start text-emphasis text-base font-semibold items-center">Assigned Days</h5>
                          {Object.entries(schedule.assignedDays)
                            .filter(([day]) => day !== '_id')
                            .map(([day, assigned]) =>
                              assigned ? <p key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</p> : null
                            )}
                        </div>
                      </div>
                      <div className="hidden sm:mt-0 sm:flex items-center">
                        <button
                          className="p-2 hover:bg-gray-200 hover:opacity-30 hover:text-gray-700 rounded-full"
                          onClick={() => handleDropdownToggle(schedule._id)}
                        >
                          <FaEllipsisV />
                        </button>

                        {openDropdown === schedule._id && (
                          <div
                            ref={dropdownRef}
                            className="absolute right-5 top-16 shadow-2xl mt-2 w-48 bg-gray-900 border border-gray-500 rounded-md z-50"
                          >
                            <ul>
                              <li className="flex px-4 py-2 hover:bg-gray-600 hover:bg-opacity-30 cursor-pointer" onClick={() => handleModalOpen(schedule)}>
                                <MdPreview className="mr-2 my-auto" />
                                <span>Edit / Assign</span>
                              </li>
                              <li className="flex px-4 py-2 hover:bg-red-600 hover:bg-opacity-30 text-red-500 cursor-pointer" onClick={() => handleDeleteSchedule(schedule)}>
                                <FaTrash className="my-auto inline-block mr-2" /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="w-full text-center py-4 gap-y-3">
                <p className="text-4xl font-semibold text-emphasis">No schedules available</p>
                {/* plus icon */}
                <div className="flex justify-center my-2">
                  <FaPlusCircle className="text-6xl text-emphasis" />
                </div>
                <p className='text-2xl font-semibold text-emphasis'>Click the +New button to create schedules</p>


              </div>
            )}

          </ul>
        </div>
      </div>

      <ScheduleEditModal schedule={selectedSchedule} onModalClose={handleModalClose} onModalOpen={handleModalOpen} members={teamInfo} />
    </>
  );

  // Employee view
  const renderEmployeeView = () => {
    const employeeId = currentUser?._id;
    console.log("Employee ID: ", employeeId);

    const assignedShifts = teamSchedules.filter(schedule => 
      schedule.assignedEmployees.some(employee => employee.user._id === employeeId)
    );

    const otherShifts = teamSchedules.filter(schedule =>
      !schedule.assignedEmployees.some(employee => employee.user._id === employeeId)
    );

    return (
      <div className="">
        <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-0">
          <div className="flex w-full max-w-full items-center truncate">
            <div className="w-full truncate ltr:mr-4 rtl:ml-4 md:block">
              <h3 className="text-emphasis sm:max-w-72 md:max-w-80 truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl hidden">
                Schedules
              </h3>
              <p className="text-emphasis hidden text-sm md:block">
                View your assigned shifts and other available shifts
              </p>
            </div>
          </div>
        </header>

        <div className="divider"></div>

        {/* Assigned Shifts */}
        <h3 className="text-lg font-semibold mb-2 text-emphasis">Assigned Shifts</h3>
        <div className='flex w-full max-w-none items-center justify-between'>
          <div className='flex flex-col border-gray-500 mb-16 rounded-md border w-full animate-grow'>
            {assignedShifts.length > 0 ? (
              <ul className="!static w-full divide-[#888] divide-y">
                {assignedShifts.map(shift => (
                  <li key={shift._id} className="relative">
                    <div className="flex w-full items-start justify-between transition hover:bg-gray-600 hover:bg-opacity-10 cursor-pointer">
                      <div className='group flex flex-row w-full max-w-full justify-between px-4 py-4 sm:px-6'>
                        <div className='flex flex-row justify-start w-[500px]'>
                          <div className="flex-1 text-sm">
                            <span className="text-emphasis font-semibold text-base">{shift.title}</span>
                            <p className="py-1">{shift.description}</p>
                            <p className="pb-1">{shift.time}</p>
                          </div>

                          <div className="flex border border-r-0 border-gray-400 mx-4"></div>

                          <div className="text-sm flex flex-col w-[200px]">
                            <h5 className="flex flex-col justify-start text-emphasis text-base font-semibold items-center">Assigned Employees</h5>
                            {shift.assignedEmployees.length > 0 ? (
                              shift.assignedEmployees.map(employee => (
                                <p key={employee.user}>
                                  <strong>{employee.role}:</strong> {employee.name}
                                </p>
                              ))
                            ) : (
                              <p>No employees assigned</p>
                            )}
                          </div>

                          <div className="flex border border-r-0 border-gray-400 mx-4"></div>

                          <div className="text-sm flex flex-col">
                            <h5 className="flex flex-col justify-start text-emphasis text-base font-semibold items-center">Assigned Days</h5>
                            {Object.entries(shift.assignedDays)
                              .filter(([day]) => day !== '_id')
                              .map(([day, assigned]) =>
                                assigned ? <p key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</p> : null
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No shifts assigned to you.</p>
            )}
          </div>
        </div>

        <div className="divider"></div>

        {/* Other Shifts */}
        <h3 className="text-lg font-semibold mb-2 text-emphasis">Other Shifts</h3>
        {otherShifts.length > 0 ? (
          <div className="flex overflow-x-auto space-x-4 py-4 text-gray-600">
            {otherShifts.map(shift => (
              <div
                key={shift._id}
                className="bg-inherit border border-gray-500 hover:text-emphasis hover:border-gray-200 cursor-pointer shadow-md rounded-lg p-4 min-w-[250px] flex-shrink-0"
              >
                <h4 className="text-lg font-semibold ">{shift.title}</h4>
                <p className="text-sm ">{shift.time}</p>
                <p className="text-sm ">
                  Assigned Days: {Object.entries(shift.assignedDays)
                    .filter(([day, assigned]) => assigned)
                    .map(([day]) => day.charAt(0).toUpperCase() + day.slice(1))
                    .join(', ')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No other shifts available.</p>
        )}
      </div>
    );
  };



  return (
    <div className='max-w-full px-2 py-4 lg:px-6'>
      {currentUser?.role === 'Manager' ? renderManagerView() : renderEmployeeView()}
    </div>
  );
}

export default Schedules;