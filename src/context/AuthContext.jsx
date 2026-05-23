// import { createContext, useContext, useState, useEffect } from 'react';
// import axiosInstance from '../api/axiosInstance';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user,    setUser]    = useState(null);
//   const [token,   setToken]   = useState(localStorage.getItem('token') || null);
//   const [loading, setLoading] = useState(true);

//   // On app load, fetch current user if token exists
//   useEffect(() => {
//     const fetchUser = async () => {
//       if (token) {
//         try {
//           const { data } = await axiosInstance.get('/auth/me');
//           setUser(data);
//         } catch {
//           logout();
//         }
//       }
//       setLoading(false);
//     };
//     fetchUser();
//   }, [token]);

//   const login = (userData, userToken) => {
//     setUser(userData);
//     setToken(userToken);
//     localStorage.setItem('token', userToken);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token');
//   };

//   const updateUser = (updatedData) => {
//     setUser(prev => ({ ...prev, ...updatedData }));
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// export default AuthContext;
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

// 🛠️ CONFIGURATION: Put your registered website email here!
const ADMIN_EMAIL_BYPASS = "beenaanam@gmail.com"; 

export const AuthProvider = ({ children }) => {
  const [user,   setUser]    = useState(null);
  const [token,  setToken]   = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // On app load, fetch current user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const { data } = await axiosInstance.get('/auth/me');
          
          // Intercept user payload and force admin if emails match
          if (data && data.email === ADMIN_EMAIL_BYPASS) {
            data.role = 'admin';
          }
          
          setUser(data);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (userData, userToken) => {
    // Intercept login payload and force admin if emails match
    if (userData && userData.email === ADMIN_EMAIL_BYPASS) {
      userData.role = 'admin';
    }

    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedData };
      // Maintain admin status during profile updates
      if (merged.email === ADMIN_EMAIL_BYPASS) {
        merged.role = 'admin';
      }
      return merged;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;