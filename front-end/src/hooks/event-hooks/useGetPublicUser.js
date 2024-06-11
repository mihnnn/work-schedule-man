import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Custom hook to fetch public user
export const useGetPublicUser = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null);

  const getPubUser = async (username) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public-user/${username}`);
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        throw new Error(data.error);
      }

      setUser(data);
    } catch(error) {
      console.error(error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, user ,getPubUser };
};

export default useGetPublicUser;