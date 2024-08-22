import React, { useState } from "react";

function CalendarHeader() {
  const [dropdown, setDropdown] = useState(false);

  const onDropdownChange = () => {
    setDropdown(!dropdown);
  };

  const onDropdownBlur = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 200);
  };

  return (
    <div className="flex items-center gap-2 bg-inherit rounded-lg shadow-md mb-4">
      <div className="dropdown" onBlur={onDropdownBlur}>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline m-1"
          onClick={onDropdownChange}
        >
          Week
        </div>
        {dropdown && (
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-w-full"
          >
            <li><a>Month</a></li>
          </ul>
        )}
      </div>
      <button className="btn btn-outline">Today</button>
    </div>
  );
}

  
function EmployeeSidebar() {
    return (
      <div className="bg-base-100 p-4 border-r shadow-md w-1/4">
        <p className="text-lg font-semibold mb-2">Employees</p>
        <ul>
          <li className="mb-2">Employee 1</li>
          <li className="mb-2">Employee 2</li>
          <li className="mb-2">Employee 3</li>
        </ul>
      </div>
    );
  }
  
function Calendar() {
    return (
      <div className="bg-base-100 p-4 shadow-md flex-1">
        <p className="text-lg font-semibold mb-2">Calendar</p>
        <p>
          Details for the selected week <br />
          Mon, Tue, Wed, Thu, Fri, Sat, Sun (columns) <br />
          8:00 AM - 5:00 PM (rows - 1 hour intervals, by employee's availability) <br/>
          Content of the cell: Event name, Employee name, Time <br/>
        </p>
      </div>
    );
  }

  export default function DashBoardContent() {
    return (
      <div className="">

  
        <div className="calendar-section">
          <CalendarHeader />
          <div className="flex border border-gray-400 overflow-hidden rounded-lg">
            <EmployeeSidebar />
            <Calendar />
          </div>
        </div>
      </div>
    );
  }