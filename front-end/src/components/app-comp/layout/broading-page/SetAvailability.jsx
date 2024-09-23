import React, { useState } from 'react';
import TimeDropdown from '../availability/sub-avail-pages/TimeDropdown';
import { useSelector } from 'react-redux';
import useOnboardAvail from '../../../../hooks/availability-hooks/useOnboardAvail';

const SetAvailability = ({ nextStep, previousStep }) => {
  // get current user
  const currentUser = useSelector((state) => state.user.currentUser);
  const { createAvail, loading } = useOnboardAvail();

  const defaultStartTime = '09:00';
  const defaultEndTime = '17:00';

  const [availability, setAvailability] = useState({
    monday: { allDay: false, startTime: defaultStartTime, endTime: defaultEndTime, available: true },
    tuesday: { allDay: false, startTime: defaultStartTime, endTime: defaultEndTime, available: true },
    wednesday: { allDay: false, startTime: defaultStartTime, endTime: defaultEndTime, available: true },
    thursday: { allDay: false, startTime: defaultStartTime, endTime: defaultEndTime, available: true },
    friday: { allDay: false, startTime: defaultStartTime, endTime: defaultEndTime, available: true },
    saturday: { allDay: false, startTime: '', endTime: '', available: false },
    sunday: { allDay: false, startTime: '', endTime: '', available: false },
  });

  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');

  const timezones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Asia/Ho_Chi_Minh',
    'Australia/Sydney',
    'America/Los_Angeles',
  ];

  const handleDayChange = (day) => {
    setAvailability((prev) => (
      {
        ...prev,
        [day]: {
          ...prev[day],
          available: !prev[day].available,
          startTime: !prev[day].available ? defaultStartTime : '',
          endTime: !prev[day].available ? defaultEndTime : '',
        },
      }
    ));
  };

  const handleTimeChange = (day, timeType, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [timeType]: value },
    }));
  };

  const handleAllDayToggle = (day) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { allDay: !prev[day].allDay, startTime: '', endTime: '', available: prev[day].available },
    }));
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleSkip = () => {
    nextStep();
  }
  const handleSubmit = async () => {
    const title = "Working hours";

    try {
      const userId = currentUser._id;
      await createAvail({ title, userId, days: availability, timezone })
      nextStep();
    } catch (error) {
      console.error('Failed to create availability: ', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-emphasis font-bold">Set availability</h2>
        <div className="flex items-center space-x-3">
          <label htmlFor="timezone" className="font-bold text-2xl text-emphasis">Timezone:</label>
          <select
            id="timezone"
            className="select select-bordered"
            value={timezone}
            onChange={handleTimezoneChange}
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
      </div>

      <form>
        {Object.keys(availability).map((day) => (
          <div
            key={day}
            className="flex items-center justify-between my-4"
            style={{ minHeight: '50px' }}
          >
            {/* First column: Toggle and Day */}
            <div className="flex items-center space-x-3 w-1/5">
              <input
                type="checkbox"
                checked={availability[day].available}
                onChange={() => handleDayChange(day)}
                className="toggle bg-[#ccc] border border-gray-500 hover:border-gray-200"
              />
              <span className="text-lg text-emphasis font-bold select-none">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
            </div>

            {/* Second column: Available All Day checkbox */}
            {availability[day].available && (
              <div className="left-0 ml-20 mr-2 flex items-center space-x-3 w-1/5">
                <input
                  type="checkbox"
                  className="checkbox border border-gray-200"
                  checked={availability[day].allDay}
                  onChange={() => handleAllDayToggle(day)}
                />
                <label className="label-text select-none">Available All Day</label>
              </div>
            )}

            {/* Third column: Time Slots */}
            {availability[day].available && !availability[day].allDay && (
              <div className="flex space-x-4 w-3/5 items-center select-none">
                <TimeDropdown
                  defaultTime={availability[day].startTime}
                  onChange={(value) => handleTimeChange(day, 'startTime', value)}
                />
                <span className="mx-2">-</span>
                <TimeDropdown
                  defaultTime={availability[day].endTime}
                  onChange={(value) => handleTimeChange(day, 'endTime', value)}
                />
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button type="button" className="btn" onClick={previousStep}>
            Back
          </button>
          <div>
            <button type="button" className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200" onClick={handleSkip}>
              Skip
            </button>
            <button type="button" className="btn bg-gray-200 text-black hover:opacity-70 hover:bg-gray-200" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetAvailability;
