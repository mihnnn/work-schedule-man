import { useState } from "react";
import toast from "react-hot-toast";

function useGetEventById() {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);

  const getEventById = async (eventId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwt-token");

      const res = await fetch(`/api/event-types/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setEventData(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, eventData ,getEventById };
}

export default useGetEventById;
