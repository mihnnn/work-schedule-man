import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RequestList from './request-routes/RequestList'
import RequestHistory from './request-routes/RequestHistory'


function RequestsPage() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="list" />} />
                <Route path="list" element={< RequestList />}   />
                <Route path="history" element={< RequestHistory/>}   />
            </Routes>
        </div>
    )
}

export default RequestsPage
