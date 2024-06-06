import React from 'react'

function SetUpAvailability() {
    return (
        <div className='ml-5 flex flex-col max-w-full w-full text-emphasis animate-grow'>
            <div className='border border-gray-400 rounded-lg flex flex-col input-border w-full mb-4'>
                <form id="event-type-form">
                    <div>
                        <div className=' border-subtle rounded-t-md border p-6'>
                            <label className='block text-sm'>Availability</label>
                            <div className='flex flex-col mt-2'>
                                <div className='flex items-center'>
                                    <input type='checkbox' className='checkbox' />
                                    <label className='ml-2'>Enable availability</label>
                                </div>
                                <div className='flex items-center mt-2'>
                                    <input type='checkbox' className='checkbox' />
                                    <label className='ml-2'>Show availability in the event page</label>
                                </div>
                            </div>
                        </div>
                        <div className='border border-subtle p-6'>
                            <label className='block text-sm'>Working Hours</label>
                            <div className='flex flex-col mt-2'>
                                <div className='flex items-center'>
                                    <label className='block text-sm'>Start Time</label>
                                    <input type='time' className='input input-bordered w-36 ml-2' />
                                </div>
                                <div className='flex items-center mt-2'>
                                    <label className='block text-sm'>End Time</label>
                                    <input type='time' className='input input-bordered w-36 ml-2' />
                                </div>
                            </div>

                        </div>
                        <div className='border border-subtle rounded-b-md p-6'>
                            <label className='block text-sm'>Timezone</label>
                            <div className='flex flex-col mt-2'>
                                <div className='flex items-center'>
                                    <label className='block text-sm'>Timezone</label>
                                    <select className='input input-bordered w-36 ml-2'>
                                        <option value=''>Select timezone</option>
                                        <option value=''>GMT</option>
                                        <option value=''>UTC</option>
                                        <option value=''>PST</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SetUpAvailability
