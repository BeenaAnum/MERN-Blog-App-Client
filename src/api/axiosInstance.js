import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: { 'Content-Type': 'application/json' },
// });
const axiosInstance = axios.create({
  // ✨ FIXED: Variable ka jhanjhat khatam, direct live backend URL aur cookies support
  baseURL: 'https://mern-blog-app-server-indol.vercel.app/api',
  withCredentials: true, 
  headers: { 'Content-Type': 'application/json' },
});
// Attach JWT token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally (token expired)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
