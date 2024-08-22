import React from 'react'
import { IoCopyOutline } from "react-icons/io5";
// import { useAuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function CopyPublicPageLink() {
  // const { authUser : {username} } = useAuthContext();
  const { currentUser: { username }} = useSelector(state => state.user);
  const handleCopy = () => {
    navigator.clipboard.writeText(`http://localhost:3001/${username}`);
    toast.success('Link copied to clipboard', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#333',
      }
    
    });
  }

  return (
    <button
      className='flex flex-row p-2 items-center text-white cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl hover:font-bold'
      onClick={handleCopy}
    >
          <IoCopyOutline className='w-6 h-6 mr-2 self-end' />
          <span className=''>Copy public page link </span>
        

    </button>
  )
}

export default CopyPublicPageLink
