import React from 'react'
import { MdPreview } from 'react-icons/md';
import { FaLink } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import MiniBtn from '../MiniBtn';

function EventTypes() {
    return (
        <div className='bg-[#222] w-[100%]'>
            <div className='flex justify-between p-5'>
                <div className=' text-xl'>
                    <h1 className='font-bold'>Event Types</h1>
                    <p>Create events to share for people to book on your calendar </p>
                </div>
                <button className='mb-auto btn btn-outline bg-white text-black'>+ NEW </button>
            </div>

            {/* Events container in a vertical list */}
            <div className='p-5 group '>
                <div className='flex flex-col gap-4 border px-4 py-6 mt-auto'>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <div className='w-10 h-10 rounded-full bg-gray-300'></div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-bold'>Event Name</h2>
                                <p>Event Description</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <MiniBtn icon={MdPreview} text="React" />
                            <MiniBtn icon={FaLink} text="React" />
                            <MiniBtn icon={HiDotsHorizontal} text="React" />

                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <div className='w-10 h-10 rounded-full bg-gray-300'></div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-bold'>Event Name</h2>
                                <p>Event Description</p>
                            </div>
                        </div>
                        < div className='flex'>
                            <MiniBtn icon={MdPreview} text="React" />
                            <MiniBtn icon={FaLink} text="React" />
                            <MiniBtn icon={HiDotsHorizontal} text="React" />


                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-4'>
                            <div className='w-10 h-10 rounded-full bg-gray-300'></div>
                            <div className='flex flex-col'>
                                <h2 className='text-lg font-bold'>Event Name</h2>
                                <p>Event Description</p>
                            </div>
                        </div>
                        <div className='flex'>
                            <MiniBtn icon={MdPreview} text="React" />
                            <MiniBtn icon={FaLink} text="React" />
                            <MiniBtn icon={HiDotsHorizontal} text="React" />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventTypes
