import { useState } from "react";
import toast from "react-hot-toast";

function useCreateBooking() {
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
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
      console.log("Booking created:", data);
      if (data) {
        setBookingId(data._id);
        console.log("Booking ID set:", data._id);
        console.log("bookingId:", bookingId);
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
