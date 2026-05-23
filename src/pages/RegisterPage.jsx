import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      return Swal.fire({ icon: 'warning', title: 'Password too short', text: 'Minimum 6 characters', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/register', form);
      login(data, data.token);
      Swal.fire({ icon: 'success', title: 'Account Created!', text: `Welcome, ${data.name}!`, background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981', timer: 1500, showConfirmButton: false });
      navigate('/');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Registration Failed', text: err.response?.data?.message || 'Something went wrong', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold gradient-text mb-2">Create Account</h1>
        <p className="text-gray-400 mb-8 text-sm">Join the community of writers</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[['Name','text','name','Your full name'],['Email','email','email','you@example.com'],['Password','password','password','Min 6 characters']].map(([label,type,key,ph]) => (
            <div key={key}>
              <label className="text-gray-300 text-sm block mb-1">{label}</label>
              <input type={type} required value={form[key]}
                onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                placeholder={ph}
              />
            </div>
          ))}
          <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors mt-2">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 hover:text-emerald-300">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
