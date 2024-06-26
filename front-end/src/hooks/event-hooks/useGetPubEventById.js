import React, { useState } from "react";

function useGetPubEventById() {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);
  //   data: {_id, title, description, duration, suffix}
  const getPubEventById = async (eventId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/public/event/${eventId}`);
      const data = await response.json();
      setEventData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error in getPubEventById:", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, eventData, getPubEventById}
}

export default useGetPubEventById;
