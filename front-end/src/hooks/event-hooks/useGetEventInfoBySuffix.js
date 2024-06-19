import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useGetEventInfoBySuffix = () => {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState([]);

  const getEventInfo = async (username, suffix) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public-events/${username}/${suffix}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setEvent(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, event, getEventInfo };
};

export default useGetEventInfoBySuffix;