import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaRegTrashCan } from 'react-icons/fa6';
import useGetAvailById from '../../../../../hooks/availability-hooks/useGetAvailById';
import TimeZoneDropdown from './TimeZoneDropdown';
import TimeDropdown from './TimeDropdown';

const dayMapping = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};

function EditAvail() {
  const { availData, getAvailById } = useGetAvailById();
  const { availId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [toggledDays, setToggledDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  
  const [title, setTitle] = useState('');
  const [days, setDays] = useState({});
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    if (availData) {
      console.log(availData.availability)
      setTitle(availData.availability.title);
      setDays(availData.availability.days);
      setTimezone(availData.availability.timezone);
      const updatedToggledDays = { ...toggledDays };
      for (const dayKey in availData.availability.days) {
        const dayName = dayMapping[dayKey];
        if (dayName) {
          updatedToggledDays[dayName] = true;
        }
      }
      setToggledDays(updatedToggledDays);
    }
  }, [availData]);

  useEffect(() => {
    if (availId) {
      getAvailById(availId);
    }
  }, [availId]);

  const handleBackClick = () => {
    navigate("/app/availability");
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Save button clicked");
  };

  const handleToggleChange = (day) => {
    setToggledDays(prevState => ({
      ...prevState,
      [day]: !prevState[day]
    }));
  };

  const handleTimezoneChange = (newTimezone) => {
    setTimezone(newTimezone);
  };

  return (
    <div className="max-w-full px-2 py-4 lg:px-6">
      <header className="flex items-center md:mb-6 md:mt-0 lg:mb-8 mb-6">
        <div className="flex items-center mr-4 w-full">
          <FaArrowLeft
            onClick={handleBackClick}
            className="cursor-pointer w-5 h-5 text-emphasis"
            aria-label="Go back"
          />
          <h3 className="text-emphasis max-w-28 sm:max-w-72 md:max-w-80 inline truncate font-semibold tracking-wide sm:text-xl md:block xl:max-w-full text-xl ml-2">
            {title}
          </h3>
        </div>
        <div className="flex justify-end items-center">
          <div className="lg:flex flex-col items-center">
            <input type="checkbox" id="toggleAll" className="toggle toggle-sm" />
          </div>
          <svg className="mx-3 hidden lg:block" width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="2" height="16" fill="currentColor" />
          </svg>
          <div className="rounded-lg flex">
            <button className="rounded-md items-center transition flex justify-center border border-gray-400 h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 hover"
              aria-label="Delete"
            >
              <FaRegTrashCan className="w-5 h-5" />
            </button>
          </div>
          <svg className="mx-3 hidden lg:block" width="2" height="16" viewBox="0 0 2 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="2" height="16" fill="currentColor" />
          </svg>
          <button
            className="overflow-hidden text-sm font-semibold border border-gray-400 py-1.5 px-3 rounded-md btn-outline bg-gray-50 text-gray-800 hover:bg-opacity-95"
            onClick={handleSave}
            aria-label="Save"
          >
            Save
          </button>
        </div>
      </header>

      <div className="mt-4 w-full md:mt-0">
        <form className="flex flex-col sm:mx-0 xl:flex-row xl:space-x-6 ">
          <div className="flex-1 xl:mr-0">
            <div className="border-subtle mb-6 rounded-md border">
              <div className="p-2 sm:p-4">
                {Object.keys(dayMapping).map(key => {
                  const day = dayMapping[key];
                  return (
                    <div key={key} className="flex gap-4 mb-4">
                      <div className='flex min-h-[38px] items-center justify-between'>
                        <div>
                          <label className='flex flex-row items-center space-x-2'>
                            <input
                              type="checkbox"
                              id={day}
                              className="toggle toggle-sm"
                              onChange={() => handleToggleChange(day)}
                              checked={toggledDays[day]}
                            />
                            <span className="inline-block min-w-[88px] text-sm capitalize text-emphasis">{day}</span>
                          </label>
                        </div>
                      </div>
                      {toggledDays[day] && days[key] && (
                        <div className='flex sm:gap-2'>
                          <div className='flex flex-row gap-2 scrollbar-thin scrollbar-track-transparent'>
                            <TimeDropdown defaultTime={days[key].startTime} />
                            <span className="w-2 self-center"> - </span>
                            <TimeDropdown defaultTime={days[key].endTime} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="min-w-40 col-span-3 hidden space-y-2 md:block lg:col-span-1">
            <div className="xl:max-w-80 w-full pr-4 sm:ml-0 sm:mr-36 sm:p-0">
              <div>
                <label className="text-emphasis text-sm font-medium mb-0 inline-block leading-none">Timezone</label>
                <div className="border mt-1 block w-72 rounded-md text-sm">
                  <TimeZoneDropdown value={timezone} onChange={handleTimezoneChange} />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAvail;
