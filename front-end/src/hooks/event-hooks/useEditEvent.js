import React from 'react'

function useEditEvent() {
    const [loading, setLoading] = useState(false);

    const getEventById = async (eventId) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/event-types/${eventId}`);
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data.event;
        } catch (error) {
            console.error(error);
            toast.error('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    const editEvent = async (eventId, title) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/event-types/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });

            if (!res.ok) {
                // Handle non-JSON error response
                const errorText = await res.text();
                throw new Error(errorText);
            }

            toast.success(`Event "${title}" edited successfully`);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred: ' + error.message);
        } finally {
            setLoading(false);
        }
    }
  return (
    { getEventById, editEvent, loading}
  )
}

export default useEditEvent
