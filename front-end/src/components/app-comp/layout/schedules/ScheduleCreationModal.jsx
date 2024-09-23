import React, { useRef, useState } from 'react';
import 'flowbite';

function ScheduleCreationModal() {
  const modalRef = useRef(null);

  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleDescription, setScheduleDescription] = useState('');
  const [scheduleStartTime, setScheduleStartTime] = useState('');
  const [scheduleEndTime, setScheduleEndTime] = useState('');
  const [scheduleDays, setScheduleDays] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const handleSaveButtonClick = async () => {
    console.log('creating schedule: ', {
      scheduleTitle,
      scheduleDescription,
      scheduleStartTime,
      scheduleEndTime,
      scheduleDays,
    });
    setScheduleTitle('');
    setScheduleDescription('');
    setScheduleStartTime('');
    setScheduleEndTime('');
    setScheduleDays({
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
    });
  };

  const handleCloseModal = (e) => {
    if (e.target === modalRef.current) {
      setScheduleTitle('');
      setScheduleDescription('');
      setScheduleStartTime('');
      setScheduleEndTime('');
      setScheduleDays({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
      });
      modalRef.current.close();
    }
  };

  const handleDayChange = (day) => {
    setScheduleDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  return (
    <dialog id='my_modal_3' className='modal text-white' ref={modalRef} onClick={handleCloseModal}>
      <div className='modal-box overflow-hidden border-none'>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">New Schedule</h3>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <div>
            <label className="block text-sm">Title</label>
            <input
              type="text"
              className="input input-bordered w-full mt-2"
              placeholder="e.g. Morning Shift"
              value={scheduleTitle}
              onChange={(e) => setScheduleTitle(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <textarea
              type="text"
              className="textarea textarea-bordered w-full mt-2"
              placeholder="About this schedule"
              value={scheduleDescription}
              onChange={(e) => setScheduleDescription(e.target.value)}
              required={true}
            />
          </div>

          <div>
            <label className='block text-sm'>Working Hours</label>
            <div className='flex items-center mt-2 gap-x-3'>
              <div className='flex items-center'>
                <input
                  type='time'
                  className='input input-bordered'
                  min="07:00"
                  max="18:00"
                  value={scheduleStartTime}
                  onChange={(e) => setScheduleStartTime(e.target.value)}
                />
              </div>
              <span className=''>-</span>
              <div className='flex items-center'>
                <input
                  type='time'
                  className='input input-bordered'
                  min="07:00"
                  max="18:00"
                  value={scheduleEndTime}
                  onChange={(e) => setScheduleEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm">Days</label>
            <div className="flex flex-col mt-2 gap-1">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-bordered"
                    checked={scheduleDays[day]}
                    onChange={() => handleDayChange(day)}
                  />
                  <span className="ml-2 capitalize">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <form method="dialog">
            <div className="mt-5 flex flex-row-reverse gap-2">
              <button
                className="btn btn-outline bg-gray-50 text-[#222] hover:bg-opacity-50"
                onClick={() => { modalRef.current.close(); handleSaveButtonClick(); }}
              >
                Continue
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => modalRef.current.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ScheduleCreationModal;
