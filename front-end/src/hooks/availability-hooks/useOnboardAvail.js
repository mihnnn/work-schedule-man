import { useState } from "react";
import toast from "react-hot-toast";

function useOnboardAvail() {
  const [loading, setLoading] = useState(false);

  const createAvail = async ({title, userId , days, timezone }) => {
    setLoading(true);


    try {
      console.log("userId in hook:", userId);
      const res = await fetch("/api/availability/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          userId,
          days,
          timezone,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to create availability.");
      }

      const data = await res.json();

      toast.success(`Availability ${title} created successfully`, {
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
      console.error("Failed to create availability:", error);
      toast.error("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return { createAvail, loading };
}

export default useOnboardAvail;
