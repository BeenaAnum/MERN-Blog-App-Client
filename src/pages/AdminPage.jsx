// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axiosInstance from '../api/axiosInstance';
// import Swal from 'sweetalert2';
// import Loader from '../components/common/Loader';

// const AdminPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosInstance.get('/users').then(({ data }) => { setUsers(data); setLoading(false); });
//   }, []);

//   const handleDelete = async (id, name) => {
//     const result = await Swal.fire({ title: `Delete user "${name}"?`, text: 'This will delete all their posts too.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
//     if (result.isConfirmed) {
//       await axiosInstance.delete(`/users/${id}`);
//       setUsers(prev => prev.filter(u => u._id !== id));
//       Swal.fire({ icon: 'success', title: 'User deleted', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
//       <div className="max-w-5xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <h1 className="text-3xl font-bold gradient-text mb-2">Admin Dashboard</h1>
//           <p className="text-gray-400 mb-8">Manage all registered users</p>

//           <div className="grid grid-cols-2 gap-4 mb-8">
//             <div className="glass rounded-xl p-5 text-center">
//               <div className="text-2xl font-bold text-emerald-400">{users.length}</div>
//               <div className="text-gray-400 text-sm">Total Users</div>
//             </div>
//             <div className="glass rounded-xl p-5 text-center">
//               <div className="text-2xl font-bold text-amber-400">{users.filter(u => u.role === 'admin').length}</div>
//               <div className="text-gray-400 text-sm">Admins</div>
//             </div>
//           </div>

//           {loading ? <Loader /> : (
//             <div className="glass rounded-xl overflow-hidden">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-white/10 text-gray-400 text-sm">
//                     <th className="text-left p-4">User</th>
//                     <th className="text-left p-4">Email</th>
//                     <th className="text-left p-4">Role</th>
//                     <th className="text-left p-4">Joined</th>
//                     <th className="text-left p-4">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map(u => (
//                     <tr key={u._id} className="border-b border-white/5 hover:bg-white/3">
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           {u.profilePic
//                             ? <img src={u.profilePic} className="w-8 h-8 rounded-full object-cover" alt={u.name}/>
//                             : <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs text-white font-bold">{u.name?.[0]?.toUpperCase()}</div>
//                           }
//                           <span className="text-white text-sm">{u.name}</span>
//                         </div>
//                       </td>
//                       <td className="p-4 text-gray-400 text-sm">{u.email}</td>
//                       <td className="p-4">
//                         <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
//                           {u.role}
//                         </span>
//                       </td>
//                       <td className="p-4 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
//                       <td className="p-4">
//                         {u.role !== 'admin' && (
//                           <button onClick={() => handleDelete(u._id, u.name)} className="text-red-400 hover:text-red-300 text-xs transition-colors">Delete</button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import Swal from 'sweetalert2';
import Loader from '../components/common/Loader';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // 🛠️ Track security block errors

  useEffect(() => {
    axiosInstance.get('/users')
      .then(({ data }) => { 
        setUsers(data); 
        setLoading(false); 
      })
      .catch((err) => {
        setLoading(false);
        // Extract server message or fallback to standard error string
        const errorText = err.response?.data?.message || "Failed to fetch users dashboard data.";
        setErrorMessage(errorText);
        
        Swal.fire({
          icon: 'error',
          title: 'Access Blocked',
          text: `${errorText} (Status: ${err.response?.status || 'Network Error'})`,
          background: '#0f172a',
          color: '#e2e8f0',
          confirmButtonColor: '#10b981'
        });
      });
  }, []);

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({ 
      title: `Delete user "${name}"?`, 
      text: 'This will delete all their posts too.', 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#ef4444', 
      cancelButtonColor: '#475569', 
      background: '#0f172a', 
      color: '#e2e8f0' 
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        setUsers(prev => prev.filter(u => u._id !== id));
        Swal.fire({ 
          icon: 'success', 
          title: 'User deleted', 
          background: '#0f172a', 
          color: '#e2e8f0', 
          timer: 1200, 
          showConfirmButton: false 
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Action Failed',
          text: err.response?.data?.message || 'Could not complete deletion.',
          background: '#0f172a',
          color: '#e2e8f0',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mb-8">Manage all registered users</p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-emerald-400">{users.length}</div>
              <div className="text-gray-400 text-sm">Total Users</div>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-amber-400">{users.filter(u => u.role === 'admin').length}</div>
              <div className="text-gray-400 text-sm">Admins</div>
            </div>
          </div>

          {/* Render states smoothly */}
          {loading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="text-center py-12 bg-red-950/20 border border-red-500/20 rounded-xl">
              <p className="text-red-400 font-medium mb-2">🚨 Backend Connection Problem</p>
              <p className="text-gray-400 text-sm">{errorMessage}</p>
              <p className="text-xs text-gray-500 mt-4">Make sure you have logged out and back in after your role was elevated in your server file.</p>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-150">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-sm bg-white/5">
                      <th className="text-left p-4">User</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Joined</th>
                      <th className="text-left p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {u.profilePic ? (
                              <img src={u.profilePic} className="w-8 h-8 rounded-full object-cover border border-white/10" alt={u.name}/>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs text-white font-bold">
                                {u.name?.[0]?.toUpperCase()}
                              </div>
                            )}
                            <span className="text-white text-sm font-medium">{u.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400 text-sm">{u.email}</td>
                        <td className="p-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            u.role === 'admin' 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-gray-500 text-xs">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-4">
                          {u.role !== 'admin' && (
                            <button 
                              onClick={() => handleDelete(u._id, u.name)} 
                              className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors"
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;