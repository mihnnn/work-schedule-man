import { useState } from "react";
import toast from "react-hot-toast";

function useGetBookingById() {
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const getBookingById = async (bookingId) => {
    console.log("Fetching booking with ID:", bookingId); // Add this line
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`);
      if (!res.ok) {
        toast.error("Wrong booking ID provided");
        throw new Error("Wrong booking ID provided");
      }
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setBookingData(data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, bookingData, getBookingById };
}

export default useGetBookingById;
