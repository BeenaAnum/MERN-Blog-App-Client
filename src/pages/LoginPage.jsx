// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axiosInstance from '../api/axiosInstance';
// import { useAuth } from '../context/AuthContext';
// import Swal from 'sweetalert2';

// const LoginPage = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.post('/auth/login', form);
//       login(data, data.token);
//       Swal.fire({ icon: 'success', title: `Welcome back, ${data.name}!`, background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981', timer: 1500, showConfirmButton: false });
//       navigate('/');
//     } catch (err) {
//       Swal.fire({ icon: 'error', title: 'Login Failed', text: err.response?.data?.message || 'Something went wrong', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
//       <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
//         <p className="text-gray-400 mb-8 text-sm">Sign in to continue writing</p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="text-gray-300 text-sm block mb-1">Email</label>
//             <input
//               type="email" required
//               value={form.email}
//               onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
//               className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
//               placeholder="you@example.com"
//             />
//           </div>
//           <div>
//             <label className="text-gray-300 text-sm block mb-1">Password</label>
//             <input
//               type="password" required
//               value={form.password}
//               onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
//               className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
//               placeholder="••••••••"
//             />
//           </div>
//           <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors mt-2">
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <p className="text-center text-gray-400 mt-6 text-sm">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-emerald-400 hover:text-emerald-300">Register</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/login', form);
      login(data, data.token);
      Swal.fire({ icon: 'success', title: `Welcome back, ${data.name}!`, background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981', timer: 1500, showConfirmButton: false });
      navigate('/');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Login Failed', text: err.response?.data?.message || 'Something went wrong', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8 text-sm">Sign in to continue writing</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-1">Email</label>
            <input
              type="email" required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm block mb-1">Password</label>
            <input
              type="password" required
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* FORGOT PASSWORD LINK START */}
          <div className="flex justify-end text-sm">
            <Link to="/forgot-password" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          {/* FORGOT PASSWORD LINK END */}

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-emerald-400 hover:text-emerald-300">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;