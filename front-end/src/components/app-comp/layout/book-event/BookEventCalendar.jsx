import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { generateDate, months } from '../../../../utils/calendar';
import cn from '../../../../utils/cn';
import dayjs from 'dayjs';
import useGetEventInfoBySuffix from '../../../../hooks/event-hooks/useGetEventInfoBySuffix';
import { useParams } from 'react-router-dom';

function BookEventCalendar() {

  const { username, suffix } = useParams();
  const { loading, event, getEventInfo } = useGetEventInfoBySuffix();

  //get from availability: start time, end time
  //get from event: duration
  
  useEffect(() => {
    getEventInfo(username, suffix);
  }, [suffix, username])

  console.log("event from calendar",event);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // interval is based on event duration
  const generateTimeSlots = (interval=event.duration) => {
    const slots = [];
    const startTime = dayjs().startOf('day'); // start time will account work hour + be based on current time + 2 hours
    const endTime = dayjs().endOf('day'); // end time will be based on end of work hour end

    let current = startTime;

    while (current.isBefore(endTime)) {
      slots.push(current);
      current = current.add(interval, 'minute');
    }

    return slots;


  };
  return (
    <>
      <div className=' min-w-[420px] px-5 py-4'>
        <div className='flex justify-between items-center text-lg mb-1 text-emphasis'>
          <span className='w-1/2'>
            <strong className=' text-emphasis font-semibold'> {months[today.month()]}</strong>
            <span className=' font-medium text-gray-400'> {today.year()}</span>
          </span>
          <div className='flex items-center gap-1 cursor-pointer transition-all select-none'>
            <span
              className=' text-gray-500 p-2 hover:bg-gray-400 hover:bg-opacity-20 rounded-lg  hover:text-emphasis'
              onClick={() => setToday(today.month(today.month() - 1))}
            >
              <MdOutlineKeyboardArrowLeft />
            </span>
            <span
              className=' text-gray-500 p-2 hover:bg-gray-400 hover:bg-opacity-20 rounded-lg  hover:text-emphasis'
              onClick={() => setToday(today.month(today.month() + 1))}
            >
              <MdOutlineKeyboardArrowRight />
            </span>
          </div>
        </div>
        <div className='w-full grid grid-cols-7 gap-4 mb-2 text-center'>
          {days.map((day, index) => {
            return (
              <div key={index} className='my-4 grid place-content-center text-sm font-medium text-emphasis uppercase tracking-widest'>
                {day}
              </div>
            )
          })}
        </div>
        <div className='w-full grid grid-cols-7 grid-rows-6 pb-6 gap-1'>
          {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
            return (
              <div key={index} className='relative grid place-content-center text-sm'>
                <button className={cn(
                  currentMonth ? 'text-gray-50 hover:shadow-outline hover:cursor-pointer' : 'text-gray-400 opacity-30 cursor-not-allowed',
                  today ? 'shadow-outline' : '',
                  selectedDate.toDate().toDateString() === today ? 'bg-gray-200 text-gray-700 rounded-xl' : '',
                  selectedDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-gray-200 text-gray-700 rounded-xl" : '',
                  "w-full min-w-6 min-h-6 p-5 grid place-content-center rounded-xl text-sm overflow-visible"
                )}
                  onClick={() => setSelectedDate(date)}
                >
                  {date.date()}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className='min-w-[240px] h-full w-full md:w-1/2 px-5 py-5 flex flex-col pb-0 overflow-hidden' style={{opacity:1, transform:'none'}}>
        <div className='flex mb-3'>
          <header>
            <span className='text-emphasis font-semibold text-lg'>
              <strong className='text-emphasis font-semibold'>
                {selectedDate.format('ddd')}
              </strong>
              <span className=' inline-flex items-center justify-center rounded-3xl px-1 pt-0.5 font-medium text-sm'>
                {selectedDate.format('D')}
              </span>
            </span>
          </header>
        </div>

        <div className='scrollbar-track-transparent scrollbar-thin flex-grow overflow-auto md:h-[480px]'>
          <div className=' scrollbar-thin scrollbar-thumb-slate-500 h-full w-full overflow-y-auto overflow-x-hidden'>
            <div className='flex flex-col'>
              <div className=' h-full pb-4'>
                {generateTimeSlots().map((time,index) => (
                  <div key={index} className='flex gap-2'>
                    <button className='whitespace-nowrap items-center text-sm font-medium relative rounded-md transition text-emphasis border-subtle bg-gray-950 hover:bg-muted hover:border-gray-200 focus-visible:bg-subtle focus-visible:ring-2 px-4 min-h-9 mb-2 flex h-auto w-full flex-grow flex-col justify-center py-2'>
                      <div className='flex items-center gap-2'> 
                        {time.format('HH:mm')}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default BookEventCalendar
