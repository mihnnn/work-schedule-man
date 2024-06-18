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
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (defaultTime) {
      setInputValue(defaultTime);
    }
  }, [defaultTime]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredTimes(times.filter(time => time.toLowerCase().includes(value.toLowerCase())));
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && dropdownRef.current) {
      const defaultTimeIndex = filteredTimes.indexOf(defaultTime);
      if (defaultTimeIndex > -1) {
        // Calculate the approximate position to scroll to
        const itemHeight = 36; // Adjust if necessary based on item height
        dropdownRef.current.scrollTop = Math.max(0, (defaultTimeIndex - 2) * itemHeight); // Scroll a bit above the default time
      }
    }
  };

  const handleDropdownBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleTimeSelect = (time) => {
    setInputValue(time);
    setIsOpen(false);
  };

  return (
    <div className="block w-[90px] sm:w-[100px]">
      <input
        className="focus:ring-0 focus:ring-offset-0 !text-emphasis w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onClick={handleDropdownToggle}
        onBlur={handleDropdownBlur}
        aria-expanded={isOpen}
        style={{zIndex: 1}}
        role=''
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="mt-2 w-[100px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 h-[300px] overflow-auto bg-[#222] absolute"
          style={{ zIndex: 9999 }}
        >
          <div className="py-1">
            {filteredTimes.map((time, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(time)}
                className={`block px-4 py-2 text-sm text-emphasis hover:bg-gray-400 hover:bg-opacity-30 w-full text-left ${
                  time === defaultTime ? 'bg-gray-400' : ''
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;
