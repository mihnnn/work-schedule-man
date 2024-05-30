import React, { useState } from 'react'
import toast from 'react-hot-toast'

function useDeleteEvent() {
    const [loading, setLoading] = useState(false);

    const deleteEvent = async (eventId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/event-types/${eventId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) {
                // Handle non-JSON error response
                const errorText = await res.text();
                throw new Error(errorText);
            }

            toast.success('Event deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
    return { deleteEvent, loading };
}

export default useDeleteEvent
