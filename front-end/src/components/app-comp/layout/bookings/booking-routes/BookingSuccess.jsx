import React, { useEffect, useState } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import useGetPubEventById from '../../../../../hooks/event-hooks/useGetPubEventById';
import dayjs from 'dayjs';


function BookingSuccess({ bookingData }) {

  const { loading, eventData, getPubEventById } = useGetPubEventById();
  const [notes, setNotes] = useState("No notes given");

  useEffect(() => {
    if (bookingData?.event) {
      getPubEventById(bookingData.event);
    }

  },[bookingData?.event]);

  useEffect(() => {
    if (bookingData?.additionalNotes) {
      setNotes(bookingData.additionalNotes);
    }

  }, [bookingData?.additionalNotes])


  // remove host from displaying in participants (still in db)
  useEffect(() =>{
    for (let i = 0; i < bookingData?.participants.length; i++) {
      if (bookingData?.participants[i].email === bookingData?.host.email) {
        bookingData?.participants.splice(i, 1);
      }
    }
  },[bookingData?.participants])


  console.log(eventData)
  console.log(bookingData)

  return (
    <div className=''>
      <div className='h-screen '>

        <main className='mx-auto max-w-3xl '>
          <div className='z-50 '>
            <div className=' rounded-xl text-center flex items-end justify-center px-4 pb-20 pt-4 sm:flex sm:p-0'>
              <div className=' my-4 flex flex-col transition-opacity sm:my-0 inset-0'>
                <div className='inline-block transform rounded-lg border  sm:my-8 sm:max-w-xl bg-[#333] px-8 pb-4 pt-5 text-left align-bottom transition-all sm:w-full sm:py-8 sm:align-middle min-w-[540px]'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full'>
                    <FaCheckCircle className='h-12 w-12 text-green-400 rounded-full' />
                  </div>

                  <div className='mb-8 mt-6 text-center last:mb-0'>
                    <h3 className='text-emphasis text-2xl font-semibold leading-6'>
                      This meeting is scheduled
                    </h3>
                    <div className='mt-3'>
                      <p className=''>
                        We sent an email with a calendar invitation with the details to everyone.
                      </p>
                    </div>
                    <div className=' border-gray-600 border-t mt-8 grid grid-cols-3 pt-8 text-left rtl:text-right text-gray-200'>
                      <div className='font-medium'>What</div>
                      <div className='col-span-2 mb-6 last:mb-0'>{eventData?.title}</div>
                      <div className='font-medium'>When</div>
                      <div className='col-span-2 mb-6 last:mb-0'>
                        <div>
                          "{dayjs(bookingData?.startTime).format('ddd, MMMM D, YYYY')}"
                          <br /> 
                          "{dayjs(bookingData?.startTime).format('HH:mm')} - {dayjs(bookingData?.endTime).format('HH:mm')}"
                          <span> TimeZone</span>
                        </div>
                      </div>
                      <div className='font-medium'>Who</div>
                      <div className='col-span-2 last:mb-0'>
                        <div className="mb-3">
                          <div>
                            <span className='mr-2'>{bookingData?.host.name}</span>
                            <div className=' text-emphasis font-medium inline-flex items-center justify-center rounded gap-x-1 bg-blue-600 py-1 px-1.5 text-xs leading-3'>Host</div>
                          </div>
                          <p>{bookingData?.host.email}</p>
                        </div>
                        <div className="mb-3 last:mb-0">
                          {
                            bookingData?.participants.map((participant, index) => (
                              <div key={index}>
                                <span className='mr-2'>{participant.name}</span>
                                <p>{participant.email}</p>
                              </div>
                            ))
                          }
                        </div>
                      </div>

                      <div className='mt-3 font-medium'>Where</div>
                      <div className='col-span-2 mt-3'>
                        <a href="" className='text-default flex items-center gap-2' title="place-or-conference-room">
                          Place Or Conference Room
                          <FaExternalLinkAlt />
                        </a>
                      </div>

                      <div className='mt-9 font-medium'>Additional notes</div>
                      <div className="col-span-2 mb-2 mt-9">
                        <p>{notes}</p>
                      </div>

                      <div className='mt-8 text-left'></div>
                    </div>
                    <div className=' border-t border-gray-600 mb-8'></div>
                    <div className='text-center last:pb-0'>
                      <span className='text-emphasis ltr:mr-2 rtl:ml-2'>
                        Need to make a change?
                      </span>
                      <span className=' ml-2 underline'>
                        <a href="">Reschedule</a>
                      </span>
                      <span className="mx-2">or</span>
                      <button className='underline'>Cancel</button>
                    </div>
                    <div className=' border-t border-gray-600 mt-8'></div>

                    <div>Future add to calendar buttons</div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </main>

      </div>

    </div>
  )
}

export default BookingSuccess
