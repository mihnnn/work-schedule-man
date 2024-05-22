import React from 'react'
import { Link } from 'react-router-dom'

function WsmItem({ route, routeName , icon: Icon}) {
  return (
    <div className='flex items-center mt-auto cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl p-2'>
      {Icon && <Icon />}
      <Link to={route} className='ml-2'>
        {routeName}
      </Link>
    </div>
  )
}

export default WsmItem
