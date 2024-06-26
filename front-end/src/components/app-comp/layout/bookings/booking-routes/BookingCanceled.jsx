import { MdCancel } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import useGetPubEventById from "../../../../../hooks/event-hooks/useGetPubEventById";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function BookingCanceled( {bookingData} ) {
  const { loading, eventData, getPubEventById } = useGetPubEventById();
  const [reason, setReason] = useState("No reason given");

  useEffect(() => {
    if (bookingData?.event) {
      getPubEventById(bookingData.event);
    }

  },[bookingData?.event]);

  useEffect(() => {
    if (bookingData?.cancelReason) {
      setReason(bookingData.cancelReason);
    }
  
  }, [bookingData?.cancelReason])

  // remove host from displaying in participants (still in db)
  useEffect(() =>{
    for (let i = 0; i < bookingData?.participants.length; i++) {
      if (bookingData?.participants[i].email === bookingData?.host.email) {
        bookingData?.participants.splice(i, 1);
      }
    }
  },[bookingData?.participants])


  return (
    <div className=''>
      <div className='h-screen '>

        <main className='mx-auto max-w-3xl '>
          <div className='z-50 '>
            <div className=' rounded-xl text-center flex items-end justify-center px-4 pb-20 pt-4 sm:flex sm:p-0'>
              <div className=' my-4 flex flex-col transition-opacity sm:my-0 inset-0'>
                <div className='inline-block transform rounded-lg border  sm:my-8 sm:max-w-xl bg-[#333] px-8 pb-4 pt-5 text-left align-bottom transition-all sm:w-full sm:py-8 sm:align-middle min-w-[540px]'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full'>
                    <MdCancel className='h-12 w-12 text-red-600 rounded-full' />
                  </div>

                  <div className='mb-8 mt-6 text-center last:mb-0'>
                    <h3 className='text-emphasis text-2xl font-semibold leading-6'>
                      This meeting is canceled
                    </h3>

                    <div className=' border-gray-600 border-t mt-8 grid grid-cols-3 pt-8 text-left rtl:text-right text-gray-200'>
                    <div className='font-medium'>Reason</div>
                    <div className='col-span-2 mb-6 last:mb-0'>{reason}</div>

                      <div className='font-medium'>What</div>
                      <div className='col-span-2 mb-6 last:mb-0 line-through'> {eventData?.title}</div>
                      <div className='font-medium'>When</div>
                      <div className='col-span-2 mb-6 last:mb-0 line-through'>
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

                      <div className='mt-9 font-medium'>Additional notes</div>
                      <div className="col-span-2 mb-2 mt-9">
                        <p>Some additional notes about event</p>
                      </div>

                      <div className='mt-8 text-left'></div>
                    </div>
                    
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

export default BookingCanceled
