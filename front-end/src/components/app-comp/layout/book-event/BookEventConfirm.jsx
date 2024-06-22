import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useCreateBooking from '../../../../hooks/bookevent-hooks/useCreateBooking';
import useGetEventInfoBySuffix from '../../../../hooks/event-hooks/useGetEventInfoBySuffix';
import { MdOutlinePersonAddAlt1 } from "react-icons/md";

function BookEventConfirm({username, suffix}) {

  const { authUser } = useAuthContext();

  const { loading:loadBooking, createBooking } = useCreateBooking();
  const { loading:loadPubEvent, getEventInfo, event } = useGetEventInfoBySuffix(username, suffix);

  const [eventId, setEventId] = useState(''); //event id
  const [displayName, setDisplayName] = useState(''); //host name
  const [email, setEmail] = useState(''); //host email
  const [additionalNotes, setAdditionalNotes] = useState('');
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    getEventInfo(username, suffix);
  }, [username, suffix]);

  useEffect(() => {
    if (authUser) {
      setDisplayName(authUser.displayName || '');
      setEmail(authUser.email || '');
    }
  }, [authUser]);


  const handleConfirmBooking = async () => {
    console.log('Confirm button');
    const newBooking = await createBooking({
      
    })
  }

  const handleBackButton = () => {
    console.log('Back button')

    // navigate(-1);
  }

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

          <div className='mb-4'>
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

          {/* add guest: */}
          <div className='mb-4'>
            <div className=''>
              <div className=''>
                <button className='btn flex items-center btn-ghost'>
                  <MdOutlinePersonAddAlt1 className='w-6 h-6' />
                  <span className='text-emphasis text-sm ml-2'>Add guest</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className='flex justify-end mt-4 gap-2'>
          <button className='btn btn-ghost'
            onClick={handleBackButton}
          >
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
