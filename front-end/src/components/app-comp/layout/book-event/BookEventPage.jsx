import React from 'react'
import { useAuthContext } from '../../../../context/AuthContext'
import { Route } from 'react-router-dom';

function BookEventPage() {
    const { authUser } = useAuthContext();
    return (
<>
{/* page components here */}
</>
        )
}

export default BookEventPage
