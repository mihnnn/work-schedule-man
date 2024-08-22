import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const token = localStorage.getItem("jwt-token");
  if (token) {
    console.log("Token exists(in AuthContext.jsx): ", token);
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("/api/users/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setAuthUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// import { createContext, useContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt-token");
//     if (!token) {
//       setAuthUser(null);
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/auth/me", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });

//         const data = await res.json();
//         if (data.error) {
//           throw new Error(data.error);
//         }
//         setAuthUser(data.user);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//         // Optionally handle token invalidation, user logout, etc.
//         localStorage.removeItem("jwt-token");
//         setAuthUser(null);
//       }
//     };

//     fetchUser();

//     // Cleanup function to reset the state if component unmounts
//     return () => setAuthUser(null);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
