import React from 'react'
import { useLocation } from 'react-router-dom'
import RequestsItem from './RequestsItem';

function RequestsNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className='flex gap-4 text-gray-100'>
      <RequestsItem
        route="list"
        routeName="List"
        isActive={currentPath === "/app/requests/list"}
      />
      <RequestsItem
        route="history"
        routeName="History"
        isActive={currentPath === "/app/requests/history"}
      />
    </div>

  )
}

export default RequestsNav
