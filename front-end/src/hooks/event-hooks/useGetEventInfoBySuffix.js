import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useGetEventInfoBySuffix = () => {
  const [loading, setLoading] = useState(false);
  const [eventInfo, setEventInfo] = useState([]);

  const getEventInfo = async (username, suffix) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public-events/${username}/${suffix}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setEventInfo(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, eventInfo, getEventInfo };
};

export default useGetEventInfoBySuffix;