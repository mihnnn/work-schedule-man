import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Custom hook to fetch public user
export const useGetPublicEvents = () => {
  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([]);

  const getPubEvents = async (username) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public-events/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setEvents(data.events);
    } catch(error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, events , getPubEvents };
};

export default useGetPublicEvents;