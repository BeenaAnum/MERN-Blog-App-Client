import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import Swal from 'sweetalert2';

const DashboardPage = () => {
  const { user } = useAuth();
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = async () => {
    try {
      const { data } = await axiosInstance.get('/posts/my');
      setPosts(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchMyPosts(); }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({ title: 'Delete this post?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
    if (result.isConfirmed) {
      await axiosInstance.delete(`/posts/${id}`);
      setPosts(prev => prev.filter(p => p._id !== id));
      Swal.fire({ icon: 'success', title: 'Deleted!', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
    }
  };

  const totalLikes = posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0);
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text">My Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
            </div>
            <Link to="/create" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg transition-colors text-sm font-medium">
              + New Post
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[['📝', 'Total Posts', posts.length], ['❤️', 'Total Likes', totalLikes], ['👁', 'Total Views', totalViews]].map(([icon, label, value]) => (
              <div key={label} className="glass rounded-xl p-5 text-center">
                <div className="text-3xl mb-1">{icon}</div>
                <div className="text-2xl font-bold text-emerald-400">{value}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>

          {/* Posts Table */}
          {loading ? <Loader /> : (
            posts.length === 0
              ? <div className="glass rounded-xl p-12 text-center"><p className="text-gray-500 mb-4">You haven't written any posts yet.</p><Link to="/create" className="text-emerald-400 hover:text-emerald-300">Write your first post →</Link></div>
              : (
                <div className="glass rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-400 text-sm">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Likes</th>
                        <th className="text-left p-4">Views</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map(post => (
                        <tr key={post._id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                          <td className="p-4">
                            <Link to={`/blog/${post._id}`} className="text-white hover:text-emerald-400 transition-colors text-sm font-medium line-clamp-1 max-w-xs block">
                              {post.title}
                            </Link>
                          </td>
                          <td className="p-4"><span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">{post.category}</span></td>
                          <td className="p-4 text-gray-400 text-sm">❤️ {post.likes?.length || 0}</td>
                          <td className="p-4 text-gray-400 text-sm">👁 {post.views || 0}</td>
                          <td className="p-4 text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex gap-3">
                              <Link to={`/edit/${post._id}`} className="text-emerald-400 hover:text-emerald-300 text-xs">Edit</Link>
                              <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
