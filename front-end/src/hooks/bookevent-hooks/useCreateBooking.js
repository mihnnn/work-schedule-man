import React, { useState } from "react";
import toast from "react-hot-toast";

function useCreateBooking() {
  const [loading, setLoading] = useState(false);

  const createBooking = async ({
    event,
    host,
    participants,
    startTime,
    endTime,
    additionalNotes,
  }) => {
    setLoading(true);
    try {
      // check if event exists in db
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event,
          host,
          participants,
          startTime,
          endTime,
          additionalNotes,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      toast.success(`Booking created successfully`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#333",
        },
      });
      return data;
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBooking };
}

export default useCreateBooking;
