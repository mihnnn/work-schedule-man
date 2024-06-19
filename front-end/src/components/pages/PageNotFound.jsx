// src/components/pages/PageNotFound.js
import React from 'react';
import img_404 from '../../assets/images/img_404.jpg';

function PageNotFound() {
  return (
    <main className=' bg-[#222] text-emphasis flex m-auto items-center text-center flex-col'>
      <h1 className=' text-9xl mb-10'>404 - Page Not Found</h1>
      <p className='text-3xl'>The page you are looking for does not exist.</p>
      {/* logo */}
        <img
            src={img_404}
            alt='404'
            className='w-96 h-96 mt-10'
        />
    </main>
  );
}

export default PageNotFound;
