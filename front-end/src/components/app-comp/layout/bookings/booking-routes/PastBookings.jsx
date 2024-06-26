import React from 'react'

function PastBookings() {
  return (
    <main className='w-full'>
      <div className='flex w-full flex-col' style={{ position: 'relative' }}>
        <div className='mb-6 pt-2 xl:pt-0'>
          <div className='border-gray-400 overflow-hidden rounded-md border animate-grow'>
            <table className='w-full max-w-full table-fixed'>
              <tbody className=' divide-current divide-y'>
                <tr className='group justify-between sm:flex-row hover:bg-gray-100 hover:bg-opacity-10'>
                  <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                    <a href="">
                      <div className='py-4'>
                        <div className=' text-gray-100 font-semibold text-sm leading-6'>Mon, 3 Jun</div>
                        <div>
                          <small className='font-normal text-sm'> 1:00pm - 1:15pm</small>
                        </div>
                        <div></div>
                      </div>
                    </a>
                  </td>
                  <td className='px-4'>
                    <a className='' href="">
                      <div className='cursor-pointer py-4 text-gray-100'>
                        <div className='max-w-10/12 sm:max-w-56 text-sm font-medium leading-6 md:max-w-full' title='15 between kita and kita'> 15 between kita and kita</div>
                        <div className=' font-semibold text-sm'>
                          <div className=' inline-block'> You</div>
                          <span>{" "} and {" "}</span>
                          <a className='hover:text-blue-500' href="">Kita</a>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td className='flex w-full justify-end text-right py-4 px-4 '>
                    <div className='flex'>
                      <a href="" className=' bg-inherit border-gray-400 btn rounded-md border h-9 min-h-[36px] min-w-[36px] !p-2 px-4 py-2.5 hover:bg-inherit hover:border-white'> Cancel event</a>
                      <div className=' bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 ml-2 hover:bg-inherit hover:border-white'>
                        <button tabIndex={0} className='items-center'> Edit</button>
                      </div>
                    </div>

                  </td>
                </tr>
                <tr className='hover:bg-gray-100 hover:bg-opacity-10'>
                  <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                    <a href="">
                      <div className='py-4'>
                        <div className=' font-semibold text-sm leading-6'>Mon, 3 Jun</div>
                        <div>
                          <small className='font-normal text-sm'> 1:00pm - 1:15pm</small>
                        </div>
                        <div></div>

                      </div>

                    </a>
                  </td>
                  <td className=' px-4'>
                    <a href="">
                      <div>
                        <div title='15 between kita and kita'> 15 between kita and kita</div>
                        <div>
                          <div className=' inline-block'> You</div>
                          <span>{" "} and {" "}</span>
                          <a href="">Kita</a>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <div className='flex'>
                      <a href="" className=' bg-inherit border-gray-400 btn rounded-md border h-9 min-h-[36px] min-w-[36px] !p-2 px-4 py-2.5 hover:bg-inherit hover:border-white'> Cancel event</a>
                      <div className=' bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 ml-2 hover:bg-inherit hover:border-white'>
                        <button tabIndex={0} className='items-center'> Edit</button>
                      </div>
                    </div>

                  </td>
                </tr>                  <tr className='hover:bg-gray-100 hover:bg-opacity-10'>
                  <td className='hidden align-top pl-6 sm:table-cell sm:min-w-[12rem]'>
                    <a href="">
                      <div className='py-4'>
                        <div className=' font-semibold text-sm leading-6'>Mon, 3 Jun</div>
                        <div>
                          <small className='font-normal text-sm'> 1:00pm - 1:15pm</small>
                        </div>
                        <div></div>

                      </div>

                    </a>
                  </td>
                  <td className=' px-4'>
                    <a href="">
                      <div>
                        <div title='15 between kita and kita'> 15 between kita and kita</div>
                        <div>
                          <div className=' inline-block'> You</div>
                          <span>{" "} and {" "}</span>
                          <a href="">Kita</a>
                        </div>
                      </div>
                    </a>
                  </td>
                  <td>
                    <div className='flex'>
                      <a href="" className=' bg-inherit border-gray-400 btn rounded-md border h-9 min-h-[36px] min-w-[36px] !p-2 px-4 py-2.5 hover:bg-inherit hover:border-white'> Cancel event</a>
                      <div className=' bg-inherit border-gray-400 dropdown btn rounded-md items-center transition flex justify-center border h-9 px-4 py-2.5 min-h-[36px] min-w-[36px] !p-2 ml-2 hover:bg-inherit hover:border-white'>
                        <button tabIndex={0} className='items-center'> Edit</button>
                      </div>
                    </div>

                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

  )
}

export default PastBookings
