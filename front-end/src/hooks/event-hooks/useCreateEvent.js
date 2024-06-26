import { useState } from 'react';
import toast from 'react-hot-toast';

function useCreateEvent() {
  const [loading, setLoading] = useState(false);

  const createEvent = async ({ title, suffix, description, duration }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/event-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          suffix,
          description,
          duration,
        }),
      });

      if (!res.ok) {
        // Handle non-JSON error response
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      toast.success(`Event ${title}  created successfully`, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#333',
        }
      });
      return data;
    } catch (error) {
      console.error(error);
      toast.error('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createEvent, loading };
}

export default useCreateEvent;
