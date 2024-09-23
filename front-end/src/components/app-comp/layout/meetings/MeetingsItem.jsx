import React from 'react'
import { Link } from 'react-router-dom'

function MeetingsItem({route, routeName, isActive}) {
  return (
    <Link to={route} className='mb-4'>
      <div
        className={`btn btn-ghost p-4 ${isActive ? "bg-gray-400 bg-opacity-30" : ""}`}
      >
        {routeName}
      </div>
    </Link>
  )
}

export default MeetingsItem
