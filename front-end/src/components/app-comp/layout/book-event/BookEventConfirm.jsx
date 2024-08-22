import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useCreateBooking from '../../../../hooks/bookevent-hooks/useCreateBooking';
import useGetEventInfoBySuffix from '../../../../hooks/event-hooks/useGetEventInfoBySuffix';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

dayjs.extend(utc);

function BookEventConfirm({ username, suffix }) {
  const { currentUser } = useSelector(state => state.user);
  const { loading: loadBooking, createBooking, bookingId } = useCreateBooking();
  const { loading: loadPubEvent, getEventInfo, eventInfo } = useGetEventInfoBySuffix();

  const [eventDuration, setEventDuration] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [guests, setGuests] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      await getEventInfo(username, suffix);
    }
    fetchEventData();
  }, [username, suffix]);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

  useEffect(() => {
    parseQueryParams();
  }, [location.search]);

  // Move navigation logic here
  useEffect(() => {
    if (bookingId) {
      navigate(`/app/booking/${bookingId}`);
    }
  }, [bookingId, navigate]);

  const handleConfirmBooking = async () => {
    const event = eventInfo.id;
    const duration = eventInfo.duration;
    const endTime = dayjs.utc(startTime).add(duration, 'minute').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    console.log("Creating booking with data:", {
      event,
      host: {
        email,
        name: displayName,
      },
      participants: guests,
      startTime,
      endTime,
      additionalNotes
    });

    await createBooking({
      event,
      host: {
        email,
        name: displayName,
      },
      participants: guests,
      startTime,
      endTime,
      additionalNotes
    });

    console.log('Booking created with id:', bookingId);
  };

  const addGuests = () => {
    setGuests([...guests, { email: '' }])
  };

  const handleGuestsChange = (index, field, value) => {
    const newGuests = [...guests];
    newGuests[index][field] = value;
    setGuests(newGuests);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const selectedDate = searchParams.get('date');
    const selectedTimeSlot = searchParams.get('slot');

    if (selectedDate && selectedTimeSlot) {
      const timeSlot = dayjs(selectedTimeSlot).format('HH:mm:ss');
      const dateTime = dayjs(`${selectedDate}T${timeSlot}`).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
      setStartTime(dateTime);
    } else {
      setStartTime(null);
    }
  };

  return (
    <div className='min-w-[450px]'>
      <div className='h-full p-6 flex flex-col'>
        <div className='flex-grow'>
          <div className='mb-4'>
            <div className='w-full'>
              <div className='flex flex-col'>
                <label htmlFor='name-input' className='text-emphasis mb-2 block text-sm font-medium leading-none'>Your name *</label>
                <input
                  type='text'
                  id='name-input'
                  className='text-emphasis input input-bordered mt-1 focus:ring-emphasis focus:ring-white h-9 rounded-md px-3 py-2 text-sm leading-4 transition focus:ring-2 w-full'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='mb-2'>
            <div className='w-full'>
              <div className='flex flex-col'>
                <label htmlFor='email-input' className='text-emphasis mb-2 block text-sm font-medium leading-none'>Email Address *</label>
                <input
                  type='email'
                  id='email-input'
                  className='text-emphasis input input-bordered mt-1 focus:ring-emphasis focus:ring-white h-9 rounded-md px-3 py-2 text-sm leading-4 transition focus:ring-2 w-full'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='mb-4'>
            <div className='w-full'>
              <div className='flex flex-col'>
                <label htmlFor='notes-input' className='text-emphasis mb-2 block text-sm font-medium leading-none'>Additional notes</label>
                <textarea
                  id='notes-input'
                  className='text-emphasis textarea textarea-bordered w-full mt-1'
                  rows='3'
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder='Please provide any additional information that you think will be helpful for our meeting.'
                ></textarea>
              </div>
            </div>
          </div>

          {/* Add guest */}
          {guests.length > 0 && (
            <div className='mb-4'>
              {guests.map((guest, index) => (
                <div key={index}>
                  <div className='flex flex-col mb-3'>
                    <label className=' text-emphasis mb-1 block text-sm font-medium leading-none '> Guest {index + 1}</label>
                    <input
                      type="text"
                      placeholder='Email Address'
                      className='text-emphasis input input-bordered mt-1 focus:ring-emphasis focus:ring-white h-9 rounded-md px-3 py-2 text-sm leading-4 transition focus:ring-2 w-full'
                      value={guest.email}
                      onChange={(e) => handleGuestsChange(index, 'email', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className='btn flex items-center btn-ghost'
            onClick={addGuests}
          >
            <MdOutlinePersonAddAlt1 className='w-6 h-6' />
            <span className='text-emphasis text-sm ml-2'>Add guest</span>
          </button>

        </div>

        <div className='flex justify-end mt-4 gap-2'>
          <button className='btn btn-ghost' onClick={handleBackButton}>
            Back
          </button>
          <button
            className='btn bg-slate-100 text-gray-950 hover:bg-gray-400 hover:bg-opacity-70'
            onClick={handleConfirmBooking}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookEventConfirm;
