import { useState } from "react";
import toast from "react-hot-toast";

function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null); //booking id returned from the server
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
      if (data) {
        setBookingId(data._id);
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
      }
      
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBooking, bookingId };
}

export default useCreateBooking;
