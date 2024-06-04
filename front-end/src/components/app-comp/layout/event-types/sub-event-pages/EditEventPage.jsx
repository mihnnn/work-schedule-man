import React from 'react'
import { useAuthContext } from '../../../../../context/AuthContext'

function EditEventPage() {
  const { authUser: {username}} = useAuthContext();

  return (
    <div className='ml-5 flex flex-col max-w-full w-full text-emphasis'>
      <div className='border border-gray-400 rounded-lg p-4 flex flex-col input-border w-full mb-4'>
        <div className='mb-5'>
          <label className='block text-sm'>Title</label>
          <input type='text' className='input input-bordered w-full mt-1' value='Quick chat' />
        </div>

        <div className='mb-5'>
          <label className='block text-sm'>Event Description</label>
          <textarea className='textarea textarea-bordered w-full mt-1' value='Event Description'></textarea>
        </div>

        <div className='mb-5'>
          <label className='block text-sm'>URL</label>
          <div className='flex overflow-hidden rounded-lg input input-bordered items-center mt-1'>
            <span className='text-gray-400 bg-gray-700 m-auto rounded px-2'>{`https://wsm.com/${username}/`}</span>
            <input type='text' className='flex-1 py-1 px-2 focus:outline-none' value='quick-chat' />
          </div>
        </div>
      </div>

      <div className='border border-gray-400 rounded-lg p-4 flex flex-col input-border w-full'>
        <div>
          <label className='block text-sm'>Duration</label>
          <div className='flex overflow-hidden rounded-lg input input-bordered items-center mt-1'>
            <input type='number' className='w-full mt-1' value='15' />
            <span className='text-gray-400 bg-gray-700 m-auto rounded px-2'>minutes</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditEventPage
