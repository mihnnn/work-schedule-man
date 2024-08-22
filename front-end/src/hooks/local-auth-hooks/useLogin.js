import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      // const res = await axios.post("/auth/login", {username, password});

      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
      // localStorage.setItem("jwt-token", data.token);
      setAuthUser(data.token);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    setLoading(true);
    try {
      window.location.href = "/auth/google";
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login, googleLogin };
}

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("All fields are required");
    return false;
  }
  return true;
}
