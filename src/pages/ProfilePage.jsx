// import { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import axiosInstance from '../api/axiosInstance';
// import { useAuth } from '../context/AuthContext';
// import Swal from 'sweetalert2';

// const ProfilePage = () => {
//   const { user, updateUser } = useAuth();
//   const [form, setForm]       = useState({ name: user?.name || '', bio: user?.bio || '', password: '' });
//   const [preview, setPreview] = useState(user?.profilePic || '');
//   const [image,   setImage]   = useState(null);
//   const [loading, setLoading] = useState(false);
//   const fileRef = useRef();

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImage(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!form.name.trim()) {
//       return Swal.fire({ icon: 'warning', title: 'Name required', text: 'Display name cannot be empty', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
//     }
//     if (form.password && form.password.length < 6) {
//       return Swal.fire({ icon: 'warning', title: 'Password too short', text: 'Minimum 6 characters', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
//     }
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append('name', form.name);
//       formData.append('bio',  form.bio);          // always send — even empty string to clear it
//       if (form.password) formData.append('password', form.password);
//       if (image)         formData.append('profilePic', image);

//       const { data } = await axiosInstance.put('/users/profile', formData);
//       updateUser(data);
//       setForm(p => ({ ...p, password: '' }));
//       setImage(null);
//       Swal.fire({ icon: 'success', title: 'Profile Updated!', background: '#0f172a', color: '#e2e8f0', timer: 1500, showConfirmButton: false });
//     } catch (err) {
//       Swal.fire({ icon: 'error', title: 'Update Failed', text: err.response?.data?.message || 'Something went wrong', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
//     } finally { setLoading(false); }
//   };

//   const handleDeletePic = async () => {
//     const result = await Swal.fire({ title: 'Remove profile picture?', icon: 'question', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
//     if (result.isConfirmed) {
//       await axiosInstance.delete('/users/profile/picture');
//       updateUser({ profilePic: '' });
//       setPreview('');
//       Swal.fire({ icon: 'success', title: 'Picture removed', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
//       <div className="max-w-2xl mx-auto">
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
//           <h1 className="text-3xl font-bold gradient-text mb-8">Edit Profile</h1>

//           <div className="glass rounded-2xl p-8">
//             {/* Avatar */}
//             <div className="flex flex-col items-center mb-8">
//               <div className="relative">
//                 {preview
//                   ? <img src={preview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500"/>
//                   : <div className="w-28 h-28 rounded-full bg-emerald-700 flex items-center justify-center text-5xl text-white font-bold border-4 border-emerald-500">
//                       {user?.name?.[0]?.toUpperCase()}
//                     </div>
//                 }
//                 <button onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors">
//                   ✎
//                 </button>
//               </div>
//               <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage}/>
//               <p className="text-gray-400 text-xs mt-2">Click the pencil to change photo</p>
//               {(preview || user?.profilePic) && (
//                 <button onClick={handleDeletePic} className="text-red-400 hover:text-red-300 text-xs mt-1 transition-colors">
//                   Remove picture
//                 </button>
//               )}
//             </div>

//             <form onSubmit={handleSave} className="space-y-5">
//               <div>
//                 <label className="text-gray-300 text-sm block mb-1">Display Name</label>
//                 <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
//                   className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"/>
//               </div>
//               <div>
//                 <label className="text-gray-300 text-sm block mb-1">Bio</label>
//                 <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3}
//                   className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
//                   placeholder="Tell the world about yourself..."/>
//               </div>
//               <div>
//                 <label className="text-gray-300 text-sm block mb-1">New Password <span className="text-gray-500">(leave blank to keep current)</span></label>
//                 <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
//                   className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
//                   placeholder="Min 6 characters"/>
//               </div>
//               <div>
//                 <label className="text-gray-300 text-sm block mb-1">Email</label>
//                 <input value={user?.email} disabled className="w-full bg-white/3 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"/>
//               </div>
//               <button type="submit" disabled={loading}
//                 className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors">
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', password: '' });
  const [preview, setPreview] = useState(user?.profilePic || '');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  // Keep the form and image state beautifully synced if Context changes behind the scenes
  useEffect(() => {
    if (user) {
      setForm(p => ({ ...p, name: user.name || '', bio: user.bio || '' }));
      setPreview(user.profilePic || '');
    }
  }, [user]);

  // Cleanly clear out the browser favicon console 404 alert row on component mount
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = 'data:image/x-icon;,';
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file)); // Safely provisions a local virtual browser rendering link
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      return Swal.fire({ icon: 'warning', title: 'Name required', text: 'Display name cannot be empty', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    }
    if (form.password && form.password.length < 6) {
      return Swal.fire({ icon: 'warning', title: 'Password too short', text: 'Minimum 6 characters', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('bio', form.bio);
      if (form.password) formData.append('password', form.password);
      if (image) formData.append('profilePic', image);

      const { data } = await axiosInstance.put('/users/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' } // Guarantees proper binary layout parsing
      });

      // Extract the absolute fresh user profile structure whether your API responds with { user } or raw payload
      const updatedData = data.user || data;
      
      updateUser(updatedData);
      setPreview(updatedData.profilePic || '');
      setForm(p => ({ ...p, password: '' }));
      setImage(null);
      
      Swal.fire({ icon: 'success', title: 'Profile Updated!', background: '#0f172a', color: '#e2e8f0', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Update Failed', text: err.response?.data?.message || 'Something went wrong', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    } finally { 
      setLoading(false); 
    }
  };

  const handleDeletePic = async () => {
    const result = await Swal.fire({ title: 'Remove profile picture?', icon: 'question', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
    if (result.isConfirmed) {
      try {
        await axiosInstance.delete('/users/profile/picture');
        
        // Ensure BOTH global authentication context state and local display state reset instantly
        updateUser({ ...user, profilePic: '' });
        setPreview('');
        setImage(null);
        if (fileRef.current) fileRef.current.value = ''; // Wipes memory hooks out of file node input
        
        Swal.fire({ icon: 'success', title: 'Picture removed', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Action Failed', text: err.response?.data?.message || 'Could not drop profile photo', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold gradient-text mb-8">Edit Profile</h1>

          <div className="glass rounded-2xl p-8 bg-white/5 border border-white/10 backdrop-blur-md">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500"/>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-emerald-700 flex items-center justify-center text-5xl text-white font-bold border-4 border-emerald-500">
                    {form.name?.[0]?.toUpperCase() || user?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                )}
                <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-0 right-0 bg-emerald-500 hover:bg-emerald-400 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors shadow-lg">
                  ✎
                </button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage}/>
              <p className="text-gray-400 text-xs mt-2">Click the pencil to change photo</p>
              
              {(preview || user?.profilePic) && (
                <button type="button" onClick={handleDeletePic} className="text-red-400 hover:text-red-300 text-xs mt-1 transition-colors font-medium">
                  Remove picture
                </button>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-gray-300 text-sm block mb-1">Display Name</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"/>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-1">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell the world about yourself..."/>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-1">New Password <span className="text-gray-500">(leave blank to keep current)</span></label>
                <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Min 6 characters"/>
              </div>
              <div>
                <label className="text-gray-300 text-sm block mb-1">Email</label>
                <input value={user?.email || ''} disabled className="w-full bg-white/3 border border-white/5 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"/>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;