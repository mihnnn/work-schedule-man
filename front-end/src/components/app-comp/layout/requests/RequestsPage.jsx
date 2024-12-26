import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RequestList from './request-routes/RequestList'
import RequestHistory from './request-routes/RequestHistory'


function RequestsPage({ requests, handleApprove, handleReject, getCurrentDate }) {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navigate to="list" />} />
				<Route path="list" element={
					<RequestList
						requests={requests}
						handleApprove={handleApprove}
						handleReject={handleReject}
						getCurrentDate={getCurrentDate}
					/>}
				/>
				<Route path="history" element={
					<RequestHistory
						requests={requests}
						getCurrentDate={getCurrentDate}

					/>
				} />
			</Routes>
		</div>
	)
}

export default RequestsPage
