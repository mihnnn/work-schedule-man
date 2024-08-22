import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

function useGetEvent() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/event-types")
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (Array.isArray(data.events)) {
        setEvents(data.events);
      } else {
        throw new Error("Data format error: expected an array of events");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const refetchEvents = async () => {
    console.log("Refetching events");
    await getEvents();
  };

  return { loading, events, refetchEvents };
}

export default useGetEvent;
