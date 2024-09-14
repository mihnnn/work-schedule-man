import React, { useState, useEffect, useRef } from 'react';

const generateTimes = () => {
  const times = [];
  const pad = (num) => (num < 10 ? '0' : '') + num;
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? 'am' : 'pm';
      times.push(`${hour}:${pad(m)}${ampm}`);
    }
  }
  return times;
};

const times = generateTimes();

const TimeDropdown = ({ defaultTime }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredTimes, setFilteredTimes] = useState(times);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(defaultTime); // Track selected time
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (defaultTime) {
      setInputValue(defaultTime);
      setSelectedTime(defaultTime); // Set selected time initially
    }
  }, [defaultTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTimes(
      times.filter((time) => time.toLowerCase().includes(value.toLowerCase()))
    );
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current && selectedTime) {
      const selectedTimeIndex = times.indexOf(selectedTime);
      if (selectedTimeIndex > -1) {
        const itemHeight = 36; // Approximate height of each item
        dropdownRef.current.scrollTop = selectedTimeIndex * itemHeight;
      }
    }
  }, [isOpen, selectedTime]);

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleTimeSelect = (time) => {
    setInputValue(time);
    setSelectedTime(time); // Update selected time
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        className="input input-bordered w-full text-sm !text-emphasis"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleDropdownToggle}
        onBlur={handleDropdownBlur}
        aria-expanded={isOpen}
      />
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-[#222] border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {filteredTimes.length > 0 ? (
            filteredTimes.map((time, index) => (
              <li key={index}>
                <button
                  onClick={() => handleTimeSelect(time)}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    time === selectedTime ? 'bg-gray-500 text-emphasis'  : 'bg-[#222]'
                  } hover:bg-gray-300 hover:text-gray-700`}
                >
                  {time}
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-500">No matches</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TimeDropdown;
