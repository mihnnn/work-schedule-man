import React from 'react'

function EditEventPage() {
  return (
    <div className='ml-5 flex max-w-full w-full'>
      <div className='border rounded-lg p-4 flex flex-col input-border w-full'>
        <input type="text" className="input mb-5 bg-white text-black" />
        <input type="text" className="input mb-5 bg-white text-black" />
        <textarea type="text" className="input textarea mb-5 bg-white text-black" />
        <input type="text" className="input mb-5 bg-white text-black" />
        <input type="text" className="input mb-5 bg-white text-black" />
      </div>
    </div>
  )
}

export default EditEventPage
