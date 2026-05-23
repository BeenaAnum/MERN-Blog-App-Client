import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import Swal from 'sweetalert2';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post,     setPost]     = useState(null);
  const [comments, setComments] = useState([]);
  const [comment,  setComment]  = useState('');
  const [liked,    setLiked]    = useState(false);
  const [likes,    setLikes]    = useState(0);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          axiosInstance.get(`/posts/${id}`),
          axiosInstance.get(`/comments/${id}`),
        ]);
        setPost(postRes.data);
        setLikes(postRes.data.likes?.length || 0);
        setLiked(user ? postRes.data.likes?.includes(user._id) : false);
        setComments(commentRes.data);
      } catch { navigate('/404'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, [id]);

  const handleLike = async () => {
    if (!user) return Swal.fire({ icon: 'info', title: 'Login required', text: 'Please login to like posts', background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    try {
      const { data } = await axiosInstance.put(`/posts/${id}/like`);
      setLikes(data.likes);
      setLiked(data.liked);
    } catch (err) { console.error(err); }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const { data } = await axiosInstance.post(`/comments/${id}`, { text: comment });
      setComments(prev => [data, ...prev]);
      setComment('');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message, background: '#0f172a', color: '#e2e8f0', confirmButtonColor: '#10b981' });
    }
  };

  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({ title: 'Delete comment?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
    if (result.isConfirmed) {
      await axiosInstance.delete(`/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
    }
  };

  const handleDeletePost = async () => {
    const result = await Swal.fire({ title: 'Delete this post?', text: 'This cannot be undone!', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#475569', background: '#0f172a', color: '#e2e8f0' });
    if (result.isConfirmed) {
      await axiosInstance.delete(`/posts/${id}`);
      Swal.fire({ icon: 'success', title: 'Post deleted', background: '#0f172a', color: '#e2e8f0', timer: 1200, showConfirmButton: false });
      navigate('/');
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader size="lg"/></div>;
  if (!post) return null;

  const isAuthor = user && (user._id === post.author._id || user.role === 'admin');

  return (
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          {post.coverImage && (
            <img src={post.coverImage} alt={post.title} className="w-full h-72 object-cover rounded-2xl mb-8"/>
          )}

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">{post.category}</span>
            <span className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              {post.author.profilePic
                ? <img src={post.author.profilePic} className="w-10 h-10 rounded-full object-cover" alt={post.author.name}/>
                : <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold">{post.author.name?.[0]?.toUpperCase()}</div>
              }
              <div>
                <p className="text-white text-sm font-medium">{post.author.name}</p>
                <p className="text-gray-500 text-xs">{post.author.bio}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleLike} className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}>
                {liked ? '❤️' : '🤍'} {likes}
              </button>
              <span className="text-gray-500 text-sm">👁 {post.views}</span>
              {isAuthor && (
                <>
                  <Link to={`/edit/${post._id}`} className="text-emerald-400 hover:text-emerald-300 text-sm">Edit</Link>
                  <button onClick={handleDeletePost} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </>
              )}
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap mb-12">
            {post.content}
          </div>

          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/10">#{tag}</span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <section className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-bold text-white mb-6">Comments ({comments.length})</h3>

            {user && (
              <form onSubmit={handleComment} className="mb-8 flex gap-3">
                <input
                  value={comment} onChange={e => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-lg text-sm transition-colors">Post</button>
              </form>
            )}

            <div className="space-y-4">
              {comments.map(c => (
                <div key={c._id} className="glass rounded-xl p-4 flex gap-3">
                  {c.user?.profilePic
                    ? <img src={c.user.profilePic} className="w-8 h-8 rounded-full object-cover shrink-0" alt={c.user.name}/>
                    : <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs text-white font-bold shrink-0">{c.user?.name?.[0]?.toUpperCase()}</div>
                  }
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-medium">{c.user?.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
                        {user && (user._id === c.user?._id || user.role === 'admin') && (
                          <button onClick={() => handleDeleteComment(c._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{c.text}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && <p className="text-gray-500 text-sm text-center py-6">No comments yet. Be the first!</p>}
            </div>
          </section>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
