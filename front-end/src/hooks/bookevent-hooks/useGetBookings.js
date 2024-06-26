import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetBooking() {
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState([])

  const getBookings = async () => {
    try {
      const res = await fetch("/api/bookings") // /api/bookings?state=upcoming 
      const data = await res.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (Array.isArray(data.bookings)) {
        setBookings(data.bookings)
      } else {
        throw new Error("Data format error: expected an array of bookings")
      }

    } catch (error) {
      console.error(error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBookings();
  }, []);

  return { loading, bookings };
}

export default useGetBooking;
