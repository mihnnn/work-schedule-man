import React from 'react'
import { MdPreview } from 'react-icons/md';
import { FaLink } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import MiniBtn from '../MiniBtn';

function EventTypes() {
    return (
        <div>
            <div className='flex justify-between p-5'>
                <div>
                    <h1 className='text-2xl font-semibold'>Event Types</h1>
                    <p>Create events to share for people to book on your calendar </p>
                </div>
                <button className='mb-auto btn btn-outline bg-white text-black'>+ NEW </button>
            </div>

            {/* Events container in a vertical list */}
            <div className='p-5 group '>
                <div className='flex flex-col gap-4 border px-4 py-6 mt-auto'>
                    <div className='flex justify-between'>
                        <a href="" title='chat' className='flex-1 overflow-hidden pr-4 text-sm'>
                            <span className='text-default font-semibold.ltr:mr-1 rtl:ml-1'> chat</span>
                            <small className='text-subtle hidden font-normal leading-4 sm:inline'>/username/chat</small>
                        </a>
                        <ul className="menu menu-horizontal bg-base-200 rounded-box">
                            <li className="tooltip" data-tip="Home">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </a>
                            </li>
                            <li className="tooltip" data-tip="Details">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </a>
                            </li>
                            <li className="tooltip" data-tip="Stats">
                                <a href="">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='flex justify-between'>
                        <a href="" title='chat' className='flex-1 overflow-hidden pr-4 text-sm'>
                            <span className='text-default font-semibold ltr:mr-1 rtl:ml-1'> chat</span>
                            <small className='text-subtle hidden font-normal leading-4 sm:inline'>/username/chat</small>
                        </a>
                        <ul className="menu menu-horizontal bg-base-200 rounded-box">
                            <li>
                                <a className="tooltip" data-tip="Home">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Details">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Stats">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='flex justify-between items-center'>
                        <a href="" title='chat' className='flex-1 overflow-hidden pr-4 text-sm'>
                            <span className='text-default font-semibold ltr:mr-1 rtl:ml-1'> chat</span>
                            <small className='text-subtle hidden font-normal leading-4 sm:inline'>/username/chat</small>
                        </a>
                        <ul className="menu menu-horizontal bg-base-200 rounded-box">
                            <li>
                                <a className="tooltip" data-tip="Home">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Details">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </a>
                            </li>
                            <li>
                                <a className="tooltip" data-tip="Stats">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventTypes
