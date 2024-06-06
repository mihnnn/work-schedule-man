import { useState } from "react";
import toast from 'react-hot-toast'

function useEditEvent() {
  console.log("useEditEvent called");
  const [loading, setLoading] = useState(false);

  const editEvent = async (eventId, {title, description, suffix, duration}) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/event-types/${eventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, suffix, duration }),
      });

      if (!res.ok) {
        // Handle non-JSON error response
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toast.success(`Event "${title}" edited successfully`);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return { editEvent, loading };
}

export default useEditEvent;
