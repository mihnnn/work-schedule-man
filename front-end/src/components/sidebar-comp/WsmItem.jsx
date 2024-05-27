import React from 'react';
import { Link } from 'react-router-dom';

function WsmItem({ route, routeName, icon: Icon, isActive }) {
  return (
    <Link to={route} className='w-full'>
      <div
        className={`flex items-center mt-auto cursor-pointer hover:bg-gray-400 hover:bg-opacity-20 rounded-xl p-2 mb-1 ${
          isActive ? 'bg-gray-400 bg-opacity-30' : ''
        }`}
      >
        {Icon && <Icon />}
        <span className='ml-2'>
          {routeName}
        </span>
      </div>
    </Link>
  );
}

export default WsmItem;
