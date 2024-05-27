import React from 'react'
import { Link } from 'react-router-dom'

function BookingsItem({ route, routeName, isActive }) {
  return (
    <Link to={route} className='w-full'>
        <div
            className={`btn btn-ghost p-4 ${isActive ? "bg-gray-400 bg-opacity-30" : ""}`}
        >
            {routeName}
        </div>
    </Link>
  )
}

export default BookingsItem
