import React from 'react'
import { IoCopyOutline } from "react-icons/io5";

function CopyPublicPageLink() {
  return (
    <div
      className='flex p-2 items-center mt-auto text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl'
    >
        <div>
          <IoCopyOutline className='w-6 h-6 mr-2 self-end' />
          <span className='font-bold'>Copy public page link </span>
        </div>

    </div>
  )
}

export default CopyPublicPageLink
